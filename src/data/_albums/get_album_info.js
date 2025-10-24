#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import config from "./config.js";

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App-specific configuration
const APP_CONFIG = {
  ENFORCE_TARGET_YEAR: false,
  INTERACTIVE_MODE: true,
  COUNTRY: "US",
  SEARCH_LIMIT: 10,
  VERIFY_MODE: false, // Only check for matches, don't add new entries
  VERBOSE: false, // Control detailed logging output
  SELECTION_MODE: false, // Allow selecting from multiple search results
  HYBRID_MODE: true // Try automatic matching first, fallback to selection
};

// Path to problematic albums JSON file
const PROBLEMATIC_ALBUMS_FILE = path.join(__dirname, "problematic_albums.json");

// Store loaded problematic albums
let problematicAlbums = { specialCases: [] };

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg === "--non-interactive" || arg === "-n") {
      APP_CONFIG.INTERACTIVE_MODE = false;
      console.log("Running in non-interactive mode");
    }
    if (arg === "--verify" || arg === "-v") {
      APP_CONFIG.VERIFY_MODE = true;
      console.log("Running in verification mode (just checking for matches)");
    }
    if (arg === "--verbose" || arg === "-d") {
      APP_CONFIG.VERBOSE = true;
      console.log("Running with verbose debugging output");
    }
    if (arg === "--selection" || arg === "-s") {
      APP_CONFIG.SELECTION_MODE = true;
      console.log("Running in selection mode (choose from search results)");
    }
    if (arg === "--hybrid" || arg === "-h") {
      APP_CONFIG.HYBRID_MODE = true;
      console.log(
        "Running in hybrid mode (auto-match first, fallback to selection)"
      );
    }
  }
}

// Variables
let rl;

/**
 * Initialize the script
 */
function initialize() {
  // Parse command line arguments
  parseArgs();

  // Create directories if they don't exist
  if (!fs.existsSync(config.INPUT_DIR)) {
    fs.mkdirSync(config.INPUT_DIR, { recursive: true });
  }

  if (!fs.existsSync(config.OUTPUT_DIR)) {
    fs.mkdirSync(config.OUTPUT_DIR, { recursive: true });
  }

  // Load problematic albums list
  loadProblematicAlbums();

  // Initialize readline
  initReadline();
}

/**
 * Load problematic albums from JSON file
 */
function loadProblematicAlbums() {
  try {
    if (fs.existsSync(PROBLEMATIC_ALBUMS_FILE)) {
      problematicAlbums = JSON.parse(
        fs.readFileSync(PROBLEMATIC_ALBUMS_FILE, "utf8")
      );
      console.log(
        `Loaded ${problematicAlbums.specialCases.length} problematic album cases`
      );
    } else {
      console.log("No problematic_albums.json file found, using empty list");
      problematicAlbums = { specialCases: [] };
    }
  } catch (error) {
    console.error(`Error loading problematic albums: ${error.message}`);
    problematicAlbums = { specialCases: [] };
  }
}

/**
 * Check if an album is in the problematic list
 * @param {string} albumTitle - Album title to check
 * @param {string} artistName - Artist name to check
 * @returns {boolean} - Whether the album is problematic
 */
function isProblematicAlbum(albumTitle, artistName) {
  if (!albumTitle || !artistName) return false;

  return problematicAlbums.specialCases.some(
    (entry) => entry.album === albumTitle && entry.artist === artistName
  );
}

/**
 * Get blocked matches for a problematic album
 * @param {string} albumTitle - Album title to check
 * @param {string} artistName - Artist name to check
 * @returns {Array} - Array of blocked matches or empty array if none
 */
function getBlockedMatches(albumTitle, artistName) {
  if (!albumTitle || !artistName) return [];

  const problematicEntry = problematicAlbums.specialCases.find(
    (entry) => entry.album === albumTitle && entry.artist === artistName
  );

  return problematicEntry ? problematicEntry.blockedMatches : [];
}

/**
 * Initialize the readline interface
 */
function initReadline() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Helper function to prompt for user input
 * @param {string} question - The question to ask
 * @returns {Promise<string>} - User's answer
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Load album list from JSON file
 * @param {string} filepath - Path to the JSON file
 * @returns {Array|null} Album list or null if error
 */
function loadAlbumListFromFile(filepath) {
  try {
    const data = fs.readFileSync(filepath, "utf8");
    const albumList = JSON.parse(data);

    if (
      !Array.isArray(albumList) ||
      !albumList.every(
        (item) =>
          typeof item === "object" && "album" in item && "artist" in item
      )
    ) {
      console.log(
        `Error: Input file '${filepath}' must contain a JSON array of objects, each with 'album' and 'artist' keys.`
      );
      return null;
    }

    return albumList;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`Error: Input file '${filepath}' not found.`);
    } else if (error instanceof SyntaxError) {
      console.log(
        `Error: Could not decode JSON from '${filepath}'. Please ensure it is valid JSON.`
      );
    } else {
      console.log(
        `An unexpected error occurred while loading '${filepath}': ${error.message}`
      );
    }
    return null;
  }
}

/**
 * Sleep function to add delay between API calls
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - Promise that resolves after the given time
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Normalize text for comparison
 * @param {string} text - Text to normalize
 * @returns {string} - Normalized text
 */
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[''']/g, "'") // normalize apostrophes
    .replace(/[&]/g, "and") // normalize ampersands
    .replace(/[^a-zA-Z0-9' ]/g, "") // remove all other special chars
    .replace(/\s+/g, " ") // normalize spaces
    .trim();
};

/**
 * Advanced text normalize that handles more edge cases for improved matching
 * @param {string} text - Text to normalize
 * @param {boolean} removeParentheses - Whether to remove content in parentheses
 * @returns {string} - Normalized text
 */
const advancedNormalizeText = (text, removeParentheses = false) => {
  if (!text) return "";

  let normalized = text.toLowerCase();

  // Handle diacritics/accents
  normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Special case for Icelandic "ÁTTA" album which normalizes to "atta"
  if (text.toUpperCase() === "ÁTTA") {
    normalized = "atta";
  }

  // Replace common separators and punctuation
  normalized = normalized
    .replace(/[''']/g, "'")
    .replace(/[&]/g, "and")
    .replace(/[@+]/g, " ")
    .replace(/[-_]/g, " ")
    .replace(/[\/\\]/g, " ");

  // Remove common album qualifiers
  normalized = normalized
    .replace(
      /(deluxe|deluxe edition|deluxe version|special edition|limited edition|remastered|anniversary edition|expanded edition|collectors edition|bonus tracks)/gi,
      ""
    )
    .replace(
      /(feat|featuring|ft|with|produced by)(\.|:)?\s+([^()[\]{}]+)/gi,
      ""
    );

  // Remove content in parentheses if requested (for edition info, featured artists, etc.)
  if (removeParentheses) {
    normalized = normalized.replace(/\([^)]*\)/g, "");
    normalized = normalized.replace(/\[[^\]]*\]/g, "");
    normalized = normalized.replace(/\{[^}]*\}/g, "");
  }

  // Remove prefixes like "the", "a", "an" for more robust matching
  normalized = normalized.replace(/^(the|a|an)\s+/i, "");

  // Remove special characters and normalize spaces
  normalized = normalized
    .replace(/[^a-zA-Z0-9' ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return normalized;
};

/**
 * Calculate Levenshtein distance between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - The Levenshtein distance
 */
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // Create a matrix of size (m+1) x (n+1)
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  // Base cases: empty string transformations
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No operation needed
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // Deletion
            dp[i][j - 1], // Insertion
            dp[i - 1][j - 1] // Substitution
          );
      }
    }
  }

  return dp[m][n];
}

/**
 * Calculate normalized Levenshtein distance (0-1 scale, where 0 is perfect match)
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Normalized distance between 0 and 1
 */
function normalizedLevenshteinDistance(str1, str2) {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);

  // If both strings are empty, they're identical
  if (maxLength === 0) return 0;

  // Return normalized distance between 0 and 1
  return distance / maxLength;
}

/**
 * Calculate similarity score between 0 and 1 where 1 is perfect match
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Similarity score between 0 and 1
 */
function calculateStringSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;

  // Get normalized versions with and without parenthetical content
  const normalized1 = advancedNormalizeText(str1, false);
  const normalized2 = advancedNormalizeText(str2, false);

  const normalized1NoParens = advancedNormalizeText(str1, true);
  const normalized2NoParens = advancedNormalizeText(str2, true);

  // Direct match after normalization is a perfect score
  if (normalized1 === normalized2) return 1.0;
  if (normalized1NoParens === normalized2NoParens) return 0.95; // High score for matches when ignoring parenthetical content

  // Calculate Levenshtein distance for both versions
  const levDistance = normalizedLevenshteinDistance(normalized1, normalized2);
  const levDistanceNoParens = normalizedLevenshteinDistance(
    normalized1NoParens,
    normalized2NoParens
  );

  // Convert to similarity score (1 - distance)
  const levSimilarity = 1 - levDistance;
  const levSimilarityNoParens = 1 - levDistanceNoParens;

  // Take the better score from the two approaches
  const bestLevSimilarity = Math.max(levSimilarity, levSimilarityNoParens);

  // Split into words for token-based matching
  const words1 = normalized1NoParens
    .split(" ")
    .filter((word) => word.length > 2);
  const words2 = normalized2NoParens
    .split(" ")
    .filter((word) => word.length > 2);

  // If one is completely contained in the other (for short names)
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    const containmentScore = 0.9; // High but not perfect score
    return Math.max(containmentScore, bestLevSimilarity);
  }

  // Word by word matching (token-based scoring)
  let matchCount = 0;
  for (const word1 of words1) {
    if (words2.includes(word1)) {
      matchCount++;
    }
  }

  // Calculate word overlap percentage based on the shorter text
  const tokenMatchScore =
    words1.length > 0 && words2.length > 0
      ? matchCount / Math.min(words1.length, words2.length)
      : 0;

  // Combine Levenshtein-based similarity and token-based similarity
  // with more weight to the token approach for meaningful word matches
  const combinedScore = bestLevSimilarity * 0.4 + tokenMatchScore * 0.6;

  return combinedScore;
}

/**
 * Advanced text match that handles partial matches and word order
 * @param {string} text1 - First text to compare
 * @param {string} text2 - Second text to compare
 * @returns {boolean} - Whether the texts match with advanced matching
 */
const advancedTextMatch = (text1, text2) => {
  if (!text1 || !text2) return false;

  // Normalize both texts (use the basic normalization for backward compatibility)
  const normalized1 = normalizeText(text1);
  const normalized2 = normalizeText(text2);

  // Direct match after normalization
  if (normalized1 === normalized2) return true;

  // Use the new string similarity calculation for a more nuanced comparison
  const similarityScore = calculateStringSimilarity(text1, text2);

  // Calculate a dynamic threshold based on the input length
  // Shorter strings need higher similarity to match
  const minLength = Math.min(text1.length, text2.length);
  const isShort = minLength <= 5;
  const baseThreshold = isShort ? 0.8 : 0.65;

  // For short words, we need higher similarity
  if (isShort) {
    return similarityScore >= baseThreshold;
  }

  // The similarity threshold determines if it's a match
  return similarityScore >= baseThreshold;
};

// Use this for iTunes API search queries
const normalizeForSearch = (text) => {
  if (!text) return "";
  return text
    .replace(/[''']/g, "'")
    .replace(/[&]/g, "and")
    .replace(/[^a-zA-Z0-9'\s]/g, "") // Only allow letters, numbers, apostrophes and spaces
    .trim()
    .replace(/\s+/g, "+"); // Replace spaces with + for API
};

/**
 * Converts itunesId to a number if it's in string format
 * @param {string|number} id - The iTunes ID to convert
 * @returns {number|null} - The numeric iTunes ID or null if invalid
 */
function normalizeItunesId(id) {
  if (!id) return null;
  if (typeof id === "number") return id;
  if (typeof id === "string") {
    const parsed = parseInt(id, 10);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
}

/**
 * Ensure consistent property order in album entries
 * @param {Object} entry - The album entry to normalize
 * @returns {Object} - Entry with consistent property order
 */
function normalizePropertyOrder(entry) {
  // Create a new object with properties in the desired order
  const ordered = {
    album: entry.album,
    artist: entry.artist,
    link: entry.link || "",
    cover: entry.cover || ""
  };

  // Add genre if it exists
  if (entry.genre) {
    ordered.genre = entry.genre;
  }

  // Add itunesId if it exists
  if (entry.itunesId) {
    ordered.itunesId = entry.itunesId;
  }

  return ordered;
}

/**
 * Display search results and let the user select one
 * @param {Array} results - Array of iTunes search results
 * @param {string} albumTitle - Original album title query
 * @param {string} artistName - Original artist name query
 * @param {Array} existingData - Existing albums from the output file
 * @returns {Object|null} - Selected album or null if no selection
 */
async function selectFromResults(
  results,
  albumTitle,
  artistName,
  existingData = []
) {
  // First check if this album already exists in the output file by flexible matching
  if (existingData && existingData.length > 0) {
    const normalizedAlbum = normalizeText(albumTitle);
    const normalizedArtist = normalizeText(artistName);

    const existingEntry = existingData.find((entry) => {
      // Try exact normalized match
      const exactMatch =
        normalizeText(entry.album) === normalizedAlbum &&
        normalizeText(entry.artist) === normalizedArtist;

      // Try advanced matching
      const advancedMatch =
        !exactMatch &&
        advancedTextMatch(entry.artist, artistName) &&
        advancedTextMatch(entry.album, albumTitle);

      return exactMatch || advancedMatch;
    });

    if (existingEntry) {
      console.log(
        `  Skipping: "${albumTitle}" by "${artistName}" (already in output file)`
      );
      return existingEntry;
    }
  }

  if (!results || results.length === 0) {
    console.log("  No results found to select from.");
    return await handleManualUrlEntry(albumTitle, artistName);
  }

  console.log(`\n  Search results for "${albumTitle}" by "${artistName}":`);
  console.log("  ----------------------------------------------------");

  // Display each result with relevant info
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const releaseDate = result.releaseDate
      ? new Date(result.releaseDate).getFullYear()
      : "N/A";
    const albumName = result.collectionName || result.trackName || "Unknown";
    const artist = result.artistName || "Unknown";
    const genre = result.primaryGenreName || "Unknown";

    console.log(`  ${i + 1}. Album: "${albumName}"`);
    console.log(`     Artist: "${artist}"`);
    console.log(`     Year: ${releaseDate}`);
    console.log(`     Genre: ${genre}`);
    console.log(`     iTunes ID: ${result.collectionId || "N/A"}`);
    console.log("  ----------------------------------------------------");
  }

  console.log("  0. None of these / Enter Apple Music URL manually");

  let selection = await askQuestion("  Enter number of correct album: ");
  const selectionNum = parseInt(selection, 10);

  if (
    isNaN(selectionNum) ||
    selectionNum < 0 ||
    selectionNum > results.length
  ) {
    console.log("  Invalid selection, skipping this album.");
    return null;
  }

  if (selectionNum === 0) {
    console.log("  No matching album selected.");
    // Pass the first result as the rejected match
    return await handleManualUrlEntry(albumTitle, artistName, results[0]);
  }

  return results[selectionNum - 1];
}

/**
 * Handle manual Apple Music URL entry and lookup
 * @param {string} albumTitle - Original album title
 * @param {string} artistName - Original artist name
 * @param {Object|null} automaticMatch - The automatic match that was rejected (if applicable)
 * @returns {Object|null} - Album details or null if failed
 */
async function handleManualUrlEntry(
  albumTitle,
  artistName,
  automaticMatch = null
) {
  const response = await askQuestion(
    "  Would you like to enter an Apple Music URL for this album? (y/n): "
  );

  if (response.toLowerCase() !== "y") {
    console.log("  Skipping this album.");
    return null;
  }

  // Add this album to problematic albums list since it required manual intervention
  saveProblematicAlbum(albumTitle, artistName, automaticMatch);

  const url = await askQuestion("  Enter Apple Music URL: ");
  if (!url || !url.includes("music.apple.com")) {
    console.log("  Invalid Apple Music URL. Skipping this album.");
    return null;
  }

  // Extract iTunes ID from URL
  let itunesId = null;
  const match = url.match(/\/album\/[^/]+\/(\d+)(?:\?|$)/);
  if (match && match[1]) {
    itunesId = normalizeItunesId(match[1]);
    console.log(`  Extracted iTunes ID: ${itunesId}`);
  } else {
    console.log("  Could not extract iTunes ID from URL. Skipping this album.");
    return null;
  }

  // Use iTunes lookup API to get album details
  const lookupUrl = `https://itunes.apple.com/lookup?id=${itunesId}&entity=album`;

  if (APP_CONFIG.VERBOSE) {
    console.log(`  Looking up album by iTunes ID: ${lookupUrl}`);
  }

  try {
    const response = await fetch(lookupUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.resultCount > 0) {
      const result = data.results[0];
      console.log(
        `  Found: "${result.collectionName}" by "${result.artistName}"`
      );
      return result;
    } else {
      console.log(
        "  No album found for the provided iTunes ID. Skipping this album."
      );
      return null;
    }
  } catch (error) {
    console.error(`  Error looking up album by iTunes ID: ${error.message}`);
    return null;
  }
}

/**
 * Check if an album title is generic/common and requires stricter artist matching
 * @param {string} albumTitle - The album title to check
 * @returns {boolean} - Whether the album title is considered generic
 */
function isGenericAlbumTitle(albumTitle) {
  if (!albumTitle) return false;

  // List of common/generic album titles that need stricter artist matching
  const genericTitles = [
    "honey",
    "romance",
    "self-titled",
    "untitled",
    "debut",
    "deluxe",
    "greatest hits",
    "live",
    "acoustic",
    "anthology",
    "collection",
    "complete",
    "best of",
    "hits",
    "singles",
    "demos",
    "rarities",
    "soundtrack",
    "original soundtrack",
    "ost",
    "score",
    "remix",
    "ep",
    "album",
    "lp",
    "mixtape",
    "vol",
    "volume",
    "part",
    "chapter",
    "day",
    "night"
  ];

  // Normalized album title for comparison
  const normalizedTitle = albumTitle.toLowerCase().trim();

  // Check for exact matches with generic titles
  if (genericTitles.includes(normalizedTitle)) return true;

  // Check for titles containing "soundtrack" or "OST"
  if (
    normalizedTitle.includes("soundtrack") ||
    normalizedTitle.includes(" ost")
  )
    return true;

  // Check for single word titles (often generic)
  if (
    normalizedTitle.split(/\s+/).length === 1 &&
    normalizedTitle.length < 10
  ) {
    return true;
  }

  return false;
}

/**
 * Check if a match is in the blacklist for a specific input
 * @param {string} inputAlbumTitle - Original album title
 * @param {string} inputArtistName - Original artist name
 * @param {string} resultTitle - Result album title
 * @param {string} resultArtist - Result artist name
 * @returns {boolean} - Whether the match is blacklisted
 */
function isBlacklistedMatch(
  inputAlbumTitle,
  inputArtistName,
  resultTitle,
  resultArtist
) {
  // Use the new problematic albums system
  const blockedMatches = getBlockedMatches(inputAlbumTitle, inputArtistName);

  if (blockedMatches.length > 0) {
    for (const blockedMatch of blockedMatches) {
      if (
        resultTitle.includes(blockedMatch.album) ||
        blockedMatch.album.includes(resultTitle) ||
        resultArtist.includes(blockedMatch.artist) ||
        blockedMatch.artist.includes(resultArtist)
      ) {
        if (APP_CONFIG.VERBOSE) {
          console.log(
            `  Blacklist match found: "${resultTitle}" by "${resultArtist}" is blacklisted for "${inputAlbumTitle}" by "${inputArtistName}"`
          );
        }
        return true;
      }
    }
  }

  return false;
}

/**
 * Find the best automatic match from search results
 * @param {Array} results - Search results from iTunes API
 * @param {string} albumTitle - Target album title
 * @param {string} artistName - Target artist name
 * @returns {Object|null} - Best match or null if no good match found
 */
function findBestMatch(results, albumTitle, artistName) {
  if (!results || results.length === 0) return null;

  // Normalize inputs for comparison (basic normalization for initial filtering)
  const normalizedTitle = normalizeText(albumTitle);
  const normalizedArtist = normalizeText(artistName);

  // Advanced normalized inputs (for better matching with edge cases)
  const advNormalizedTitle = advancedNormalizeText(albumTitle, true);
  const advNormalizedArtist = advancedNormalizeText(artistName, true);

  // Increase strictness for very short titles or artist names (more prone to false matches)
  const isShortTitle = normalizedTitle.length <= 5;
  const isShortArtist = normalizedArtist.length <= 3;

  // Check if album title is generic/common and requires stricter artist matching
  const isGenericTitle = isGenericAlbumTitle(albumTitle);

  // For very short titles or artists, require exact matches
  if (isShortTitle || isShortArtist) {
    const exactMatch = results.find((result) => {
      const resultTitle = normalizeText(
        result.collectionName || result.trackName || ""
      );
      const resultArtist = normalizeText(result.artistName || "");

      return (
        resultTitle === normalizedTitle && resultArtist === normalizedArtist
      );
    });

    if (exactMatch) {
      if (APP_CONFIG.VERBOSE) {
        console.log(
          `  Found exact match for short title/artist: "${exactMatch.collectionName}" by "${exactMatch.artistName}"`
        );
      }
      return exactMatch;
    }

    // For very short titles/artists, if no exact match, return null
    return null;
  }

  // First, look for exact match on both album title and artist
  const exactMatch = results.find((result) => {
    const resultTitle = normalizeText(
      result.collectionName || result.trackName || ""
    );
    const resultArtist = normalizeText(result.artistName || "");

    return resultTitle === normalizedTitle && resultArtist === normalizedArtist;
  });

  if (exactMatch) {
    if (APP_CONFIG.VERBOSE) {
      console.log(
        `  Found exact match: "${exactMatch.collectionName}" by "${exactMatch.artistName}"`
      );
    }
    return exactMatch;
  }

  // Look for exact match with advanced normalization (handles editions, etc.)
  const advExactMatch = results.find((result) => {
    const resultTitle = advancedNormalizeText(
      result.collectionName || result.trackName || "",
      true
    );
    const resultArtist = advancedNormalizeText(result.artistName || "", true);

    return (
      resultTitle === advNormalizedTitle && resultArtist === advNormalizedArtist
    );
  });

  if (advExactMatch) {
    if (APP_CONFIG.VERBOSE) {
      console.log(
        `  Found advanced normalized exact match: "${advExactMatch.collectionName}" by "${advExactMatch.artistName}"`
      );
    }
    return advExactMatch;
  }

  // Calculate match scores for all results
  const scoredResults = results.map((result) => {
    const resultTitle = result.collectionName || result.trackName || "";
    const resultArtist = result.artistName || "";

    // Calculate match scores
    const titleScore = calculateMatchScore(resultTitle, albumTitle);
    const artistScore = calculateMatchScore(resultArtist, artistName);

    // Check if this is one of our known problematic albums
    const isProblemAlbum = isProblematicAlbum(albumTitle, artistName);

    // For known problematic albums, check if the artist matches exactly
    const isExactArtistMatch = resultArtist
      .toLowerCase()
      .includes(artistName.toLowerCase());

    // For generic/common album titles, increase the artist score weight significantly
    // to avoid matching different artists with common album names
    let artistWeight = isGenericTitle ? 0.85 : 0.6;
    let titleWeight = isGenericTitle ? 0.15 : 0.4;

    // For very common titles like "Honey", "Romance", etc., weight artist match even more heavily
    if (normalizedTitle.length <= 6 && isGenericTitle) {
      artistWeight = 0.9;
      titleWeight = 0.1;
    }

    // For problematic albums, use extreme weights to prioritize artist match
    if (isProblemAlbum) {
      artistWeight = 0.95;
      titleWeight = 0.05;

      // If this isn't an exact artist match for problematic albums, severely penalize the score
      if (!isExactArtistMatch) {
        artistScore *= 0.3;
      }
    }

    // For soundtrack titles, especially ensure the correct specific version
    if (
      normalizedTitle.includes("soundtrack") ||
      albumTitle.includes("FINAL FANTASY") ||
      albumTitle.includes("OST")
    ) {
      // For soundtracks, exact title match is more important to get the right version
      titleWeight = 0.5;
      artistWeight = 0.5;
    }

    // Combined score with weights
    const combinedScore = titleScore * titleWeight + artistScore * artistWeight;

    return {
      result,
      titleScore,
      artistScore,
      combinedScore,
      isGenericTitle,
      isProblemAlbum,
      isExactArtistMatch
    };
  });

  // Sort by combined score
  scoredResults.sort((a, b) => {
    // For problematic albums, prioritize exact artist matches above all else
    if (a.isProblemAlbum && b.isProblemAlbum) {
      if (a.isExactArtistMatch && !b.isExactArtistMatch) return -1;
      if (!a.isExactArtistMatch && b.isExactArtistMatch) return 1;
    }

    // Then sort by combined score
    return b.combinedScore - a.combinedScore;
  });

  // Get the best match if it exceeds our thresholds
  const bestMatch = scoredResults[0];

  if (bestMatch) {
    // For generic titles, require higher combined score and specifically a high artist score
    let requiredCombinedScore = isGenericTitle ? 0.85 : 0.8;
    let requiredArtistScore = isGenericTitle ? 0.7 : 0.5;

    // For very common short titles, be even more strict
    if (normalizedTitle.length <= 6 && isGenericTitle) {
      requiredCombinedScore = 0.9;
      requiredArtistScore = 0.8;
    }

    // For soundtrack titles, require high title score to ensure correct version
    if (
      normalizedTitle.includes("soundtrack") ||
      albumTitle.includes("FINAL FANTASY") ||
      albumTitle.includes("OST")
    ) {
      requiredCombinedScore = 0.85;
      // Require a reasonable title match for soundtracks to get the right version
      if (bestMatch.titleScore < 0.7) {
        if (APP_CONFIG.VERBOSE) {
          console.log(
            `  Rejected soundtrack match due to low title score: ${bestMatch.titleScore.toFixed(
              2
            )}`
          );
        }
        return null;
      }
    }

    if (
      bestMatch.combinedScore >= requiredCombinedScore &&
      bestMatch.artistScore >= requiredArtistScore
    ) {
      if (APP_CONFIG.VERBOSE) {
        console.log(
          `  Found best match by score: "${bestMatch.result.collectionName}" by "${bestMatch.result.artistName}"`
        );
        console.log(
          `  Scores: title=${bestMatch.titleScore.toFixed(
            2
          )}, artist=${bestMatch.artistScore.toFixed(
            2
          )}, combined=${bestMatch.combinedScore.toFixed(2)}`
        );
        if (isGenericTitle) {
          console.log(`  Applied stricter matching for generic album title`);
        }
      }
      return bestMatch.result;
    }
  }

  // If no good match found, return null
  return null;
}

/**
 * Validate a match against input data
 * @param {Object} match - The match result from iTunes API
 * @param {string} inputAlbumTitle - Original album title
 * @param {string} inputArtistName - Original artist name
 * @returns {Object|null} - Validated match or null if validation fails
 */
function validateMatch(match, inputAlbumTitle, inputArtistName) {
  if (!match) return null;

  const resultTitle = match.collectionName || match.trackName || "";
  const resultArtist = match.artistName || "";

  // Debug for known problematic cases
  if (isProblematicAlbum(inputAlbumTitle, inputArtistName)) {
    console.log(
      `  VALIDATION CHECK for problematic case: "${resultTitle}" by "${resultArtist}" against "${inputAlbumTitle}" by "${inputArtistName}"`
    );
  }

  // Check explicit blacklist first - highest priority rejection
  if (
    isBlacklistedMatch(
      inputAlbumTitle,
      inputArtistName,
      resultTitle,
      resultArtist
    )
  ) {
    return null;
  }

  // Calculate match percentages for validation
  const titleMatchScore = calculateMatchScore(resultTitle, inputAlbumTitle);
  const artistMatchScore = calculateMatchScore(resultArtist, inputArtistName);

  // Special handling for short titles/artists (more strict validation)
  const isShortTitle = inputAlbumTitle.length <= 5;
  const isShortArtist = inputArtistName.length <= 3;

  // Check if album title is generic/common and requires stricter artist matching
  const isGenericTitle = isGenericAlbumTitle(inputAlbumTitle);

  // Higher validation thresholds for short inputs
  let titleValidationThreshold = isShortTitle ? 0.85 : 0.7;
  let artistValidationThreshold = isShortArtist ? 0.9 : 0.7;

  // For generic titles, raise the artist threshold to ensure we don't match wrong artists
  if (isGenericTitle) {
    artistValidationThreshold = Math.max(artistValidationThreshold, 0.8);
    if (APP_CONFIG.VERBOSE) {
      console.log(
        `  Applying stricter artist validation threshold (${artistValidationThreshold.toFixed(
          2
        )}) for generic album title`
      );
    }
  }

  // Special validation for soundtrack albums
  if (
    inputAlbumTitle.includes("Soundtrack") ||
    inputAlbumTitle.includes("OST") ||
    inputAlbumTitle.includes("FINAL FANTASY")
  ) {
    // For soundtrack albums, especially ensure we get the right version/game
    // Require the result title to contain unique identifiers from the input title

    // For FINAL FANTASY titles, make sure the correct game number is included
    if (inputAlbumTitle.includes("FINAL FANTASY")) {
      // Extract the roman numeral or number from the title (e.g., "VII" from "FINAL FANTASY VII")
      const ffNumberMatch = inputAlbumTitle.match(
        /FINAL FANTASY\s+([IVXLCDM0-9]+)/i
      );
      if (ffNumberMatch && ffNumberMatch[1]) {
        const ffNumber = ffNumberMatch[1];
        // If the result doesn't contain this specific FF number, reject it
        if (!resultTitle.includes(ffNumber)) {
          if (APP_CONFIG.VERBOSE) {
            console.log(
              `  Rejecting match: Final Fantasy title doesn't match correct game number: ${ffNumber}`
            );
          }
          return null;
        }
      }
    }
  }

  // Check for false positives based on score thresholds
  if (
    titleMatchScore < titleValidationThreshold ||
    artistMatchScore < artistValidationThreshold
  ) {
    if (APP_CONFIG.VERBOSE) {
      console.log(
        `  Rejecting false positive match: Validation scores: title=${titleMatchScore.toFixed(
          2
        )}, artist=${artistMatchScore.toFixed(2)}`
      );
      console.log(
        `  "${resultTitle}" by "${resultArtist}" doesn't match input "${inputAlbumTitle}" by "${inputArtistName}" closely enough`
      );
    }
    return null;
  }

  // If verbose, log match details
  if (APP_CONFIG.VERBOSE) {
    console.log(
      `  Match validated with scores: title=${titleMatchScore.toFixed(
        2
      )}, artist=${artistMatchScore.toFixed(2)}`
    );
  }

  return match;
}

/**
 * Calculate match score between two text strings
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {number} - Match score between 0 and 1
 */
function calculateMatchScore(text1, text2) {
  if (!text1 || !text2) return 0;

  // Use our new sophisticated similarity algorithm
  return calculateStringSimilarity(text1, text2);
}

/**
 * Search for an album in iTunes API
 * @param {string} albumTitle - Album title to search for
 * @param {string} artistName - Artist name to search for
 * @returns {Promise<Object|null>} - Best match or null if no good match found
 */
async function searchForAlbum(albumTitle, artistName) {
  const baseUrl = "https://itunes.apple.com/search";

  // Log specific problematic search combinations
  if (isProblematicAlbum(albumTitle, artistName)) {
    console.log(
      `  WARNING: Handling known problematic case: "${albumTitle}" by "${artistName}"`
    );
  }

  // Special case handling for albums with non-Latin characters like "ÁTTA"
  let searchTerm = albumTitle;
  if (albumTitle === "ÁTTA") {
    searchTerm = "atta sigur ros"; // Explicit search term override
    if (APP_CONFIG.VERBOSE) {
      console.log(
        `  Using special search term for "${albumTitle}": "${searchTerm}"`
      );
    }
  } else if (artistName === "Sigur Rós") {
    searchTerm = `${searchTerm} sigur ros`; // Always include "sigur ros" with normal spelling
    if (APP_CONFIG.VERBOSE) {
      console.log(`  Using special search term for Sigur Rós: "${searchTerm}"`);
    }
  }

  // Special handling for soundtrack albums
  if (
    albumTitle.includes("FINAL FANTASY") ||
    albumTitle.includes("soundtrack") ||
    albumTitle.includes("OST")
  ) {
    // For soundtrack albums, include the game number/specific identifiers in search
    const ffNumberMatch = albumTitle.match(/FINAL FANTASY\s+([IVXLCDM0-9]+)/i);
    if (ffNumberMatch && ffNumberMatch[1]) {
      searchTerm = `${searchTerm} ${ffNumberMatch[1]}`;
      if (APP_CONFIG.VERBOSE) {
        console.log(`  Including FF game number in search: "${searchTerm}"`);
      }
    }

    // For soundtracks, always include the artist name to disambiguate
    searchTerm = `${searchTerm} ${artistName}`;
  }

  // Normalize for iTunes API
  const normalizedSearchTerm = normalizeForSearch(searchTerm);

  // If not handling a special case, combine album and artist for more specific search
  let query = `term=${normalizedSearchTerm}`;

  // Add country and limit parameters
  query += `&country=${APP_CONFIG.COUNTRY}&limit=${APP_CONFIG.SEARCH_LIMIT}&media=music&entity=album`;

  // If enforcing target year, add year to query
  if (APP_CONFIG.ENFORCE_TARGET_YEAR && targetYear) {
    query += `&attribute=releaseYearTerm&releaseYearTerm=${targetYear}`;
  }

  const searchUrl = `${baseUrl}?${query}`;

  if (APP_CONFIG.VERBOSE) {
    console.log(`  Searching with query: ${searchUrl}`);
  }

  try {
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (APP_CONFIG.VERBOSE) {
      console.log(`  Found ${data.resultCount} results`);
    }

    if (data.resultCount === 0) {
      return null;
    }

    // Find the best match among the results
    const bestMatch = findBestMatch(data.results, albumTitle, artistName);

    // Always validate matches to ensure quality
    return validateMatch(bestMatch, albumTitle, artistName);
  } catch (error) {
    console.error(`  Error searching for album: ${error.message}`);
    return null;
  }
}

/**
 * Save problematic album to the problematic_albums.json file
 * @param {string} albumTitle - Album title to add
 * @param {string} artistName - Artist name to add
 * @param {Object|null} automaticMatch - The automatic match that was rejected (if applicable)
 * @returns {boolean} - Whether the save was successful
 */
function saveProblematicAlbum(albumTitle, artistName, automaticMatch = null) {
  if (!albumTitle || !artistName) return false;

  // Check if this album is already in problematic albums list
  if (isProblematicAlbum(albumTitle, artistName)) {
    if (APP_CONFIG.VERBOSE) {
      console.log(
        `  Album "${albumTitle}" by "${artistName}" is already in problematic albums list`
      );
    }
    return true;
  }

  try {
    // Create a new entry
    const newEntry = {
      album: albumTitle,
      artist: artistName,
      blockedMatches: []
    };

    // If we have an automatic match that was rejected, add it to blockedMatches
    if (automaticMatch) {
      const resultTitle =
        automaticMatch.collectionName || automaticMatch.trackName || "";
      const resultArtist = automaticMatch.artistName || "";

      if (resultTitle && resultArtist) {
        newEntry.blockedMatches.push({
          album: resultTitle,
          artist: resultArtist
        });

        if (APP_CONFIG.VERBOSE) {
          console.log(
            `  Adding blocked match: "${resultTitle}" by "${resultArtist}"`
          );
        }
      }
    }

    // Add new entry to problematic albums
    problematicAlbums.specialCases.push(newEntry);

    // Save to file
    fs.writeFileSync(
      PROBLEMATIC_ALBUMS_FILE,
      JSON.stringify(problematicAlbums, null, 2),
      "utf8"
    );

    console.log(
      `  Added "${albumTitle}" by "${artistName}" to problematic albums list`
    );
    return true;
  } catch (error) {
    console.error(`  Error saving problematic album: ${error.message}`);
    return false;
  }
}

/**
 * Check if album is already in the list (duplicate detection)
 * @param {Object} album - Album to check
 * @param {Array} albumList - Existing album list
 * @returns {boolean} - Whether the album is a duplicate
 */
function isDuplicate(album, albumList) {
  if (!album || !albumList || !Array.isArray(albumList)) return false;

  const normalizedInputAlbum = normalizeText(album.album);
  const normalizedInputArtist = normalizeText(album.artist);

  return albumList.some((existingAlbum) => {
    const normalizedExistingAlbum = normalizeText(existingAlbum.album);
    const normalizedExistingArtist = normalizeText(existingAlbum.artist);

    // Check for exact normalized match
    return (
      normalizedExistingAlbum === normalizedInputAlbum &&
      normalizedExistingArtist === normalizedInputArtist
    );
  });
}

/**
 * Saves processed data to output file
 * @param {string} year - Year (used for filename)
 * @param {Array} data - Data to save
 * @returns {boolean} - Whether the save was successful
 */
function saveProcessedData(year, data) {
  try {
    // Remove any duplicate entries
    const uniqueMap = {};
    const uniqueData = [];

    data.forEach((album) => {
      const key = `${normalizeText(album.album)}|${normalizeText(
        album.artist
      )}`;
      if (!uniqueMap[key]) {
        uniqueMap[key] = true;
        uniqueData.push(album);
      } else {
        console.log(
          `Removing duplicate: "${album.album}" by "${album.artist}"`
        );
      }
    });

    // Save to file
    const outputPath = path.join(config.OUTPUT_DIR, `${year}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(uniqueData, null, 2), "utf8");
    console.log(`Saved ${uniqueData.length} albums to ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error saving data: ${error.message}`);
    return false;
  }
}

/**
 * Main function to process album lists
 * @param {string|null} inputFilePath - Optional specific input file to process
 */
async function main(inputFilePath = null) {
  // Initialize the script
  initialize();

  try {
    let files = [];

    // If specific file is provided, process that file
    if (inputFilePath) {
      const fullPath = path.isAbsolute(inputFilePath)
        ? inputFilePath
        : path.join(config.INPUT_DIR, inputFilePath);

      if (fs.existsSync(fullPath)) {
        files.push(fullPath);
      } else {
        console.error(`File not found: ${fullPath}`);
        return;
      }
    } else {
      // Otherwise, get all JSON files in the input directory
      files = fs
        .readdirSync(config.INPUT_DIR)
        .filter((file) => file.endsWith(".json"))
        .map((file) => path.join(config.INPUT_DIR, file));
    }

    // Process each file
    for (const file of files) {
      const albums = loadAlbumListFromFile(file);

      if (!albums) {
        console.error(`Unable to load albums from ${file}`);
        continue;
      }

      console.log(`Processing ${albums.length} albums from ${file}...`);

      // Extract year from filename (e.g., "2024.json" => "2024")
      const year = path.basename(file, ".json");
      console.log(`Year: ${year}`);

      // Create output array
      const outputData = [];

      // Load existing data if available
      let existingData = [];
      const outputFile = path.join(config.OUTPUT_DIR, `${year}.json`);

      if (fs.existsSync(outputFile) && !APP_CONFIG.VERIFY_MODE) {
        try {
          existingData = JSON.parse(fs.readFileSync(outputFile, "utf8"));
          console.log(
            `Loaded ${existingData.length} existing entries from ${outputFile}`
          );
        } catch (error) {
          console.error(`Error loading existing data: ${error.message}`);
        }
      }

      // Process each album
      for (const album of albums) {
        const { album: albumTitle, artist: artistName } = album;

        console.log(`\nProcessing "${albumTitle}" by "${artistName}"`);

        // Check if this is in the existing data with flexible matching
        if (existingData.length > 0) {
          const existingEntry = existingData.find(
            (entry) =>
              advancedTextMatch(entry.album, albumTitle) &&
              advancedTextMatch(entry.artist, artistName)
          );

          if (existingEntry) {
            console.log(`  Found existing entry, reusing it`);
            outputData.push(existingEntry);
            continue;
          }
        }

        let result = null;

        // Try automatic matching first in hybrid mode
        if (APP_CONFIG.HYBRID_MODE) {
          console.log(`  Trying automatic matching...`);
          result = await searchForAlbum(albumTitle, artistName);

          if (result) {
            console.log(
              `  Automatic match found: "${result.collectionName}" by "${result.artistName}"`
            );
          } else {
            console.log(
              `  No automatic match found, falling back to selection mode`
            );
          }
        }

        // If automatic matching failed or in selection mode, search and select
        if (!result && (APP_CONFIG.SELECTION_MODE || APP_CONFIG.HYBRID_MODE)) {
          const searchResult = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
              albumTitle + " " + artistName
            )}&country=${APP_CONFIG.COUNTRY}&limit=${
              APP_CONFIG.SEARCH_LIMIT
            }&media=music&entity=album`
          );
          const data = await searchResult.json();
          result = await selectFromResults(
            data.results,
            albumTitle,
            artistName,
            existingData
          );
        }

        // If we found a result, process it
        if (result) {
          const processedAlbum = {
            album: albumTitle,
            artist: artistName,
            link: `https://music.apple.com/us/album/${result.collectionId}`,
            cover: result.artworkUrl100
              ? result.artworkUrl100.replace("100x100", "600x600")
              : ""
          };

          // Add genre if available
          if (result.primaryGenreName) {
            processedAlbum.genre = result.primaryGenreName;
          }

          // Add iTunes ID
          processedAlbum.itunesId = result.collectionId;

          // Normalize property order
          const orderedAlbum = normalizePropertyOrder(processedAlbum);

          // Add to output if not a duplicate
          if (!isDuplicate(orderedAlbum, outputData)) {
            outputData.push(orderedAlbum);
            console.log(`  Added album to output data`);
          } else {
            console.log(`  Duplicate album, skipping`);
          }
        } else {
          console.log(
            `  No match found for "${albumTitle}" by "${artistName}"`
          );
        }

        // Add a short delay between API requests to avoid rate limiting
        await sleep(500);
      }

      // Save the processed data
      if (!APP_CONFIG.VERIFY_MODE) {
        saveProcessedData(year, outputData);
      } else {
        console.log(
          `Verify mode: would have saved ${outputData.length} albums to ${outputFile}`
        );
      }
    }
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
    console.error(error.stack);
  } finally {
    // Clean up
    if (rl) {
      rl.close();
    }
  }
}

// Only run the script if it's being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Run the main function with command line arguments
  const inputFile = process.argv.slice(2).find((arg) => !arg.startsWith("-"));
  main(inputFile).catch((error) => {
    console.error(`Unhandled error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  });
}

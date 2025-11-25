#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

/* Create __dirname equivalent in ESM */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Directory paths */
const INPUT_DIR = path.join(__dirname, "_input");
const OUTPUT_DIR = path.join(__dirname, "_output");

/* App-specific configuration */
const APP_CONFIG = {
  COUNTRY: "US",
  SEARCH_LIMIT: 10,
  VERBOSE: false
};

/* Parse command line arguments */
function parseArgs() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg === "--verbose" || arg === "-d") {
      APP_CONFIG.VERBOSE = true;
      console.log("Running with verbose debugging output");
    }
  }
}

/* Variables */
let rl;

/**
 * Initialize the script
 */
function initialize() {
  parseArgs();

  /* Create directories if they don't exist */
  if (!fs.existsSync(INPUT_DIR)) {
    fs.mkdirSync(INPUT_DIR, { recursive: true });
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  initReadline();
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
    /* Ensure readline is initialized */
    if (!rl || rl.closed) {
      initReadline();
    }
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
 * Check if an entry is already successfully matched in output
 * Uses EXACT matching only - "Album" and "Album II" are different albums
 * @param {string} albumTitle - Album title to check
 * @param {string} artistName - Artist name to check
 * @param {Array} existingData - Existing albums from the output file
 * @returns {Object|null} - Existing entry if found, null otherwise
 */
function findExistingEntry(albumTitle, artistName, existingData) {
  if (!existingData || existingData.length === 0) return null;

  const normalizedAlbum = normalizeText(albumTitle);
  const normalizedArtist = normalizeText(artistName);

  const existingEntry = existingData.find((entry) => {
    /* Check if entry has valid data (was successfully matched) */
    if (!entry.link || !entry.itunesId) return false;

    /* Require exact match - no fuzzy matching for checking existing entries */
    return (
      normalizeText(entry.album) === normalizedAlbum &&
      normalizeText(entry.artist) === normalizedArtist
    );
  });

  return existingEntry || null;
}

/**
 * Handle manual Apple Music URL entry and lookup
 * @param {string} albumTitle - Original album title
 * @param {string} artistName - Original artist name
 * @returns {Object|null} - Album details or null if failed
 */
async function handleManualUrlEntry(albumTitle, artistName) {
  console.log(`  No automatic match found for "${albumTitle}" by "${artistName}"`);

  const url = await askQuestion("  Enter Apple Music URL (or press Enter to skip): ");

  if (!url || !url.trim()) {
    console.log("  Skipping this album.");
    return null;
  }

  if (!url.includes("music.apple.com")) {
    console.log("  Invalid Apple Music URL. Skipping this album.");
    return null;
  }

  /* Extract iTunes ID from URL */
  const match = url.match(/\/album\/[^/]+\/(\d+)(?:\?|$)/);
  if (!match || !match[1]) {
    console.log("  Could not extract iTunes ID from URL. Skipping this album.");
    return null;
  }

  const itunesId = normalizeItunesId(match[1]);
  console.log(`  Extracted iTunes ID: ${itunesId}`);

  /* Use iTunes lookup API to get album details */
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

  const normalizedTitle = albumTitle.toLowerCase().trim();

  if (genericTitles.includes(normalizedTitle)) return true;

  if (
    normalizedTitle.includes("soundtrack") ||
    normalizedTitle.includes(" ost")
  )
    return true;

  if (
    normalizedTitle.split(/\s+/).length === 1 &&
    normalizedTitle.length < 10
  ) {
    return true;
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

  const normalizedTitle = normalizeText(albumTitle);
  const normalizedArtist = normalizeText(artistName);

  const advNormalizedTitle = advancedNormalizeText(albumTitle, true);
  const advNormalizedArtist = advancedNormalizeText(artistName, true);

  const isShortTitle = normalizedTitle.length <= 5;
  const isShortArtist = normalizedArtist.length <= 3;
  const isGenericTitle = isGenericAlbumTitle(albumTitle);

  /* For very short titles or artists, require exact matches */
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

    if (exactMatch && APP_CONFIG.VERBOSE) {
      console.log(
        `  Found exact match for short title/artist: "${exactMatch.collectionName}" by "${exactMatch.artistName}"`
      );
    }
    return exactMatch || null;
  }

  /* Look for exact match on both album title and artist */
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

  /* Look for exact match with advanced normalization */
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

  /* Calculate match scores for all results */
  const scoredResults = results.map((result) => {
    const resultTitle = result.collectionName || result.trackName || "";
    const resultArtist = result.artistName || "";

    const titleScore = calculateMatchScore(resultTitle, albumTitle);
    const artistScore = calculateMatchScore(resultArtist, artistName);

    /* For generic/common album titles, increase the artist score weight */
    let artistWeight = isGenericTitle ? 0.85 : 0.6;
    let titleWeight = isGenericTitle ? 0.15 : 0.4;

    if (normalizedTitle.length <= 6 && isGenericTitle) {
      artistWeight = 0.9;
      titleWeight = 0.1;
    }

    /* For soundtrack titles, balance title and artist equally */
    if (
      normalizedTitle.includes("soundtrack") ||
      albumTitle.includes("FINAL FANTASY") ||
      albumTitle.includes("OST")
    ) {
      titleWeight = 0.5;
      artistWeight = 0.5;
    }

    const combinedScore = titleScore * titleWeight + artistScore * artistWeight;

    return {
      result,
      titleScore,
      artistScore,
      combinedScore,
      isGenericTitle
    };
  });

  scoredResults.sort((a, b) => b.combinedScore - a.combinedScore);

  const bestMatch = scoredResults[0];

  if (bestMatch) {
    let requiredCombinedScore = isGenericTitle ? 0.85 : 0.8;
    let requiredArtistScore = isGenericTitle ? 0.7 : 0.5;

    if (normalizedTitle.length <= 6 && isGenericTitle) {
      requiredCombinedScore = 0.9;
      requiredArtistScore = 0.8;
    }

    if (
      normalizedTitle.includes("soundtrack") ||
      albumTitle.includes("FINAL FANTASY") ||
      albumTitle.includes("OST")
    ) {
      requiredCombinedScore = 0.85;
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
      }
      return bestMatch.result;
    }
  }

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

  /* Calculate match percentages for validation */
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

  /* Special case handling for albums with non-Latin characters like "ÁTTA" */
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

  /* Normalize for iTunes API */
  const normalizedSearchTerm = normalizeForSearch(searchTerm);

  const query = `term=${normalizedSearchTerm}&country=${APP_CONFIG.COUNTRY}&limit=${APP_CONFIG.SEARCH_LIMIT}&media=music&entity=album`;

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
    const outputPath = path.join(OUTPUT_DIR, `${year}.json`);
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
        : path.join(INPUT_DIR, inputFilePath);

      if (fs.existsSync(fullPath)) {
        files.push(fullPath);
      } else {
        console.error(`File not found: ${fullPath}`);
        return;
      }
    } else {
      // Otherwise, get all JSON files in the input directory
      files = fs
        .readdirSync(INPUT_DIR)
        .filter((file) => file.endsWith(".json"))
        .map((file) => path.join(INPUT_DIR, file));
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

      /* Load existing data if available */
      let existingData = [];
      const outputFile = path.join(OUTPUT_DIR, `${year}.json`);

      if (fs.existsSync(outputFile)) {
        try {
          existingData = JSON.parse(fs.readFileSync(outputFile, "utf8"));
          console.log(
            `Loaded ${existingData.length} existing entries from ${outputFile}`
          );
        } catch (error) {
          console.error(`Error loading existing data: ${error.message}`);
        }
      }

      /* Process each album */
      for (const album of albums) {
        const { album: albumTitle, artist: artistName } = album;

        console.log(`\nProcessing "${albumTitle}" by "${artistName}"`);

        /* Check if this entry already exists in output with valid data */
        const existingEntry = findExistingEntry(albumTitle, artistName, existingData);

        if (existingEntry) {
          console.log(`  Already matched successfully, reusing existing entry`);
          outputData.push(existingEntry);
          continue;
        }

        /* Try automatic matching */
        console.log(`  Trying automatic matching...`);
        let result = await searchForAlbum(albumTitle, artistName);

        /* If automatic matching failed, prompt for manual URL entry */
        if (!result) {
          result = await handleManualUrlEntry(albumTitle, artistName);
        }

        /* If we found a result, process it */
        if (result) {
          const processedAlbum = {
            album: albumTitle,
            artist: artistName,
            link: `https://music.apple.com/us/album/${result.collectionId}`,
            cover: result.artworkUrl100
              ? result.artworkUrl100.replace("100x100", "600x600")
              : ""
          };

          /* Add genre if available */
          if (result.primaryGenreName) {
            processedAlbum.genre = result.primaryGenreName;
          }

          /* Add iTunes ID */
          processedAlbum.itunesId = result.collectionId;

          /* Normalize property order */
          const orderedAlbum = normalizePropertyOrder(processedAlbum);

          /* Add to output if not a duplicate */
          if (!isDuplicate(orderedAlbum, outputData)) {
            outputData.push(orderedAlbum);
            console.log(`  Added album to output data`);
          } else {
            console.log(`  Duplicate album, skipping`);
          }
        } else {
          console.log(
            `  Skipped "${albumTitle}" by "${artistName}"`
          );
        }

        /* Add a short delay between API requests to avoid rate limiting */
        await sleep(500);
      }

      /* Save the processed data */
      saveProcessedData(year, outputData);
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

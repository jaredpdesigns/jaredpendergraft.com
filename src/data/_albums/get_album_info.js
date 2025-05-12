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
  VERBOSE: false // Control detailed logging output
};

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

  // Initialize readline
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
 * Advanced text match that handles partial matches and word order
 * @param {string} text1 - First text to compare
 * @param {string} text2 - Second text to compare
 * @returns {boolean} - Whether the texts match with advanced matching
 */
const advancedTextMatch = (text1, text2) => {
  if (!text1 || !text2) return false;

  // Normalize both texts
  const normalized1 = normalizeText(text1);
  const normalized2 = normalizeText(text2);

  // Direct match after normalization
  if (normalized1 === normalized2) return true;

  // Split into words for more flexible matching
  const words1 = normalized1.split(" ").filter((word) => word.length > 2); // Only consider words > 2 chars
  const words2 = normalized2.split(" ").filter((word) => word.length > 2);

  // If one is completely contained in the other (for short names)
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    return true;
  }

  // Word by word matching
  let matchCount = 0;
  for (const word1 of words1) {
    if (words2.includes(word1)) {
      matchCount++;
    }
  }

  // Calculate word overlap percentage
  const totalUniqueWords = new Set([...words1, ...words2]).size;
  const matchPercentage = matchCount / Math.min(words1.length, words2.length);

  // For artists, we want a higher threshold since artist names are often distinct
  const isArtist = !text1.includes(" ") || !text2.includes(" "); // Simple heuristic
  const threshold = isArtist ? 0.75 : 0.6; // 75% match for artists, 60% for album titles

  return matchPercentage >= threshold;
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
 * Process a single album file
 * @param {string} inputFilePath - Path to the input file
 * @returns {Promise<boolean>} - Success status
 */
async function processAlbumFile(inputFilePath) {
  const fileName = path.basename(inputFilePath);
  const outputFilename = path.join(config.OUTPUT_DIR, fileName);

  // Load existing data if the output file already exists
  let existingData = [];
  if (fs.existsSync(outputFilename)) {
    try {
      const existingFileContent = fs.readFileSync(outputFilename, "utf8");
      existingData = JSON.parse(existingFileContent);

      // Normalize itunesId to be numbers in existing data
      existingData = existingData.map((entry) => {
        if (entry.itunesId) {
          entry.itunesId = normalizeItunesId(entry.itunesId);
        }
        // Normalize property order
        return normalizePropertyOrder(entry);
      });
    } catch (error) {
      console.error(
        `Error reading existing file '${outputFilename}': ${error.message}`
      );
    }
  }

  // Extract year from filename (e.g., "2024.json" -> "2024")
  const filenameYear = path.basename(inputFilePath, ".json");
  const year = /^\d{4}$/.test(filenameYear) ? filenameYear : null;

  if (!year) {
    console.log(
      `Warning: Could not extract valid year from filename: ${path.basename(
        inputFilePath
      )}`
    );
  } else {
    console.log(`Processing albums from year: ${year}`);
  }

  const albumList = loadAlbumListFromFile(inputFilePath);
  if (!albumList) return false;

  console.log(
    `\nProcessing ${path.basename(inputFilePath)} with ${
      albumList.length
    } albums...`
  );

  // Stats for verification mode
  let matchedCount = 0;
  let missingCount = 0;
  let missingEntries = [];

  // Create a new ordered result array instead of appending to existing data
  const orderedAlbumData = [];
  const baseUrl = "https://itunes.apple.com/search";
  const lookupUrl = "https://itunes.apple.com/lookup";

  for (let i = 0; i < albumList.length; i++) {
    const item = albumList[i];
    const albumTitleQuery = item.album;
    const artistNameQuery = item.artist;
    let processedSuccessfully = false;
    let albumEntry = null;

    if (APP_CONFIG.VERBOSE) {
      console.log(
        `\n  Processing album: "${albumTitleQuery}" by "${artistNameQuery}"`
      );
    }

    // Extract iTunes ID from link if it exists in input
    let inputItunesId;
    if (item.link) {
      const match = item.link.match(/\/album\/[^/]+\/(\d+)\?/);
      if (match && match[1]) {
        inputItunesId = normalizeItunesId(match[1]);
        if (APP_CONFIG.VERBOSE) {
          console.log(`  Found iTunes ID in link: ${inputItunesId}`);
        }
      }
    } else if (item.itunesId) {
      // If itunesId is directly provided in the input
      inputItunesId = normalizeItunesId(item.itunesId);
      if (APP_CONFIG.VERBOSE) {
        console.log(`  Using provided iTunes ID: ${inputItunesId}`);
      }
    }

    // Check if we already have this album by iTunes ID
    const existingEntryById =
      inputItunesId &&
      existingData.find((entry) => entry.itunesId === inputItunesId);

    // Normalize input for text matching
    const normalizedAlbum = normalizeText(albumTitleQuery);
    const normalizedArtist = normalizeText(artistNameQuery);

    // If no ID match, try text matching as fallback with more flexible matching
    const existingEntryByText =
      !existingEntryById &&
      existingData.find((entry) => {
        const entryAlbum = normalizeText(entry.album);
        const entryArtist = normalizeText(entry.artist);

        // First try exact normalized match
        const exactMatch =
          entryAlbum === normalizedAlbum && entryArtist === normalizedArtist;

        // Then try advanced matching if exact match fails
        const advancedMatch =
          !exactMatch &&
          advancedTextMatch(entry.artist, artistNameQuery) &&
          advancedTextMatch(entry.album, albumTitleQuery);

        // Log the normalized values for debugging
        if (APP_CONFIG.VERBOSE && (exactMatch || advancedMatch)) {
          console.log(
            `  Match found: "${entry.artist}" vs "${artistNameQuery}"`
          );
          console.log(
            `  Album comparison: "${entry.album}" vs "${albumTitleQuery}"`
          );
          if (advancedMatch) {
            console.log(`  Using advanced text matching algorithm`);
          }
        }

        return exactMatch || advancedMatch;
      });

    // If we found a match, add the existing entry to the ordered result
    if (existingEntryById || existingEntryByText) {
      const existingEntry = existingEntryById || existingEntryByText;
      console.log(`  Skipping: "${albumTitleQuery}" by "${artistNameQuery}"`);
      processedSuccessfully = true;
      matchedCount++;
      // Add the existing entry at this position in the output array
      orderedAlbumData.push(normalizePropertyOrder(existingEntry));
      continue;
    }

    // If in verify mode, just record the missing entry and continue
    if (APP_CONFIG.VERIFY_MODE) {
      console.log(
        `  No match found for "${albumTitleQuery}" by "${artistNameQuery}" (would be processed in normal mode)`
      );
      missingCount++;
      missingEntries.push({ album: albumTitleQuery, artist: artistNameQuery });
      continue;
    }

    try {
      // If we have iTunes ID, use lookup endpoint directly
      if (inputItunesId) {
        const lookupUrlWithId = `${lookupUrl}?id=${inputItunesId}&entity=album`;
        if (APP_CONFIG.VERBOSE) {
          console.log(`  Looking up album by iTunes ID: ${lookupUrlWithId}`);
        }

        const response = await fetch(lookupUrlWithId);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.resultCount > 0) {
          const foundAlbum = data.results[0];

          const title = foundAlbum.collectionName;
          const artist = foundAlbum.artistName;
          const appleMusicLink = foundAlbum.collectionViewUrl;
          let artworkUrl = foundAlbum.artworkUrl100;

          if (artworkUrl) {
            artworkUrl = artworkUrl
              .replace("100x100bb.jpg", "640x640bb.jpg")
              .replace("100x100bb", "640x640bb");
          }

          albumEntry = {
            album: title,
            artist: artist,
            link: appleMusicLink,
            cover: artworkUrl,
            genre: foundAlbum.primaryGenreName || "",
            itunesId: normalizeItunesId(foundAlbum.collectionId)
          };

          processedSuccessfully = true;
          console.log(`  Album found by iTunes ID and added successfully.`);
        }
      } else {
        // First try searching for artist only to avoid issues with special characters
        const searchTerm = encodeURIComponent(
          normalizeForSearch(artistNameQuery)
        );
        const searchUrl = `${baseUrl}?term=${searchTerm}&media=music&entity=album,song&country=${APP_CONFIG.COUNTRY}&limit=${APP_CONFIG.SEARCH_LIMIT}`;

        // Log the search URL for debugging
        if (APP_CONFIG.VERBOSE) {
          console.log(`  Searching iTunes API: ${searchUrl}`);
        }

        const response = await fetch(searchUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let foundAlbum = null;
        let foundGenre = null;

        if (data.resultCount > 0) {
          const candidates = data.results.map((result) => {
            const apiArtistName = (result.artistName || "").toLowerCase();
            const apiAlbumName = (
              result.collectionName ||
              result.trackName ||
              ""
            ).toLowerCase();
            const releaseDate = result.releaseDate
              ? new Date(result.releaseDate)
              : null;
            const releaseDateStr = releaseDate
              ? releaseDate.toISOString().split("T")[0]
              : "unknown";
            const releaseYear = releaseDate
              ? releaseDate.getFullYear()
              : "unknown";
            const isTargetYearRelease =
              releaseDate && year
                ? releaseDate.getFullYear().toString() === year
                : false;

            let matchScore = 0;
            if (apiArtistName === artistNameQuery.toLowerCase())
              matchScore += 100;
            if (apiAlbumName === albumTitleQuery.toLowerCase())
              matchScore += 100;
            if (isTargetYearRelease) matchScore += 75;

            return { result, matchScore, releaseDateStr, releaseYear };
          });

          candidates.sort((a, b) => b.matchScore - a.matchScore);

          // Try to find an exact match first
          foundAlbum =
            candidates.find(
              (c) =>
                c.result.artistName.toLowerCase() ===
                  artistNameQuery.toLowerCase() &&
                (c.result.collectionName?.toLowerCase() ===
                  albumTitleQuery.toLowerCase() ||
                  c.result.trackName?.toLowerCase() ===
                    albumTitleQuery.toLowerCase())
            )?.result || candidates[0]?.result;

          if (foundAlbum) {
            // Try to get genre from various fields
            foundGenre =
              foundAlbum.primaryGenreName ||
              candidates.find((c) => c.result.primaryGenreName)?.result
                .primaryGenreName;
          }

          // Log detailed match information
          if (APP_CONFIG.VERBOSE) {
            console.log(
              `  Match details for '${albumTitleQuery}' by '${artistNameQuery}':`
            );
            console.log(
              `    → Found: '${
                foundAlbum.collectionName || foundAlbum.trackName
              }' by '${foundAlbum.artistName}'`
            );
            console.log(
              `    → Release date: ${candidates[0].releaseDateStr} (${candidates[0].releaseYear})`
            );
            console.log(`    → Genre: ${foundGenre || "Not found"}`);
          }

          // If we still don't have a genre, try searching by artist only
          if (!foundGenre && foundAlbum) {
            const artistParams = new URLSearchParams({
              term: encodeURIComponent(normalizeForSearch(artistNameQuery)),
              media: "music",
              entity: "musicArtist,song",
              attribute: "artistTerm",
              country: APP_CONFIG.COUNTRY,
              limit: "1"
            });

            // Log the artist search URL for debugging
            if (APP_CONFIG.VERBOSE) {
              const artistSearchUrl = `${baseUrl}?${artistParams.toString()}`;
              console.log(
                `  Searching iTunes API for artist: ${artistSearchUrl}`
              );
            }

            const artistResponse = await fetch(
              `${baseUrl}?${artistParams.toString()}`
            );
            if (artistResponse.ok) {
              const artistData = await artistResponse.json();
              if (artistData.resultCount > 0) {
                foundGenre = artistData.results[0].primaryGenreName;
              }
            }
            await sleep(1000); // Add delay for the additional API call
          }
        }

        if (foundAlbum) {
          const title = foundAlbum.collectionName || foundAlbum.trackName;
          const artist = foundAlbum.artistName;
          const appleMusicLink = foundAlbum.collectionViewUrl;
          let artworkUrl = foundAlbum.artworkUrl600 || foundAlbum.artworkUrl100;

          if (artworkUrl) {
            artworkUrl = artworkUrl
              .replace("100x100bb.jpg", "640x640bb.jpg")
              .replace("100x100bb", "640x640bb");
          }

          if (title && artist && appleMusicLink && artworkUrl) {
            albumEntry = {
              album: title,
              artist: artist,
              link: appleMusicLink,
              cover: artworkUrl,
              itunesId: normalizeItunesId(foundAlbum.collectionId)
            };

            // If iTunes provides a genre, use it directly
            if (foundGenre) {
              albumEntry.genre = foundGenre;
            } else {
              // Only prompt for genre if iTunes doesn't provide one
              const manualGenre = await askQuestion(
                "  No genre found. Enter genre (press Enter to skip): "
              );
              if (manualGenre) {
                albumEntry.genre = manualGenre;
              }
            }

            processedSuccessfully = true;
            console.log(`  Added: "${title}" by "${artist}"`);
          }
        }
      }
    } catch (error) {
      console.error(`  Error processing album: ${error.message}`);
    } finally {
      if (processedSuccessfully && albumEntry) {
        // Add the new entry to the ordered result
        orderedAlbumData.push(normalizePropertyOrder(albumEntry));

        if (APP_CONFIG.VERBOSE) {
          console.log(
            `  Album ${i + 1} of ${
              albumList.length
            } ('${albumTitleQuery}') processed successfully.`
          );
        }
      } else if (!processedSuccessfully) {
        console.log(
          `  Album ${i + 1} of ${
            albumList.length
          } ('${albumTitleQuery}') not processed.`
        );

        if (!APP_CONFIG.INTERACTIVE_MODE) {
          console.log("  Skipping manual entry (interactive mode disabled)");
          continue;
        }

        const manualEntry = await askQuestion(
          "  Would you like to manually enter album details? (y/n/s - 's' to skip remaining albums): "
        );

        if (manualEntry.toLowerCase() === "s") {
          console.log("  Skipping all remaining albums as requested.");
          break;
        }

        if (manualEntry.toLowerCase() === "y") {
          // Allow manual entry
          const manualArtist = await askQuestion(
            "  Enter correct artist name: "
          );
          const manualAlbum = await askQuestion(
            "  Enter correct album title: "
          );
          const manualLink = await askQuestion(
            "  Enter Apple Music link (or press Enter to skip): "
          );
          const manualCover = await askQuestion(
            "  Enter album cover URL (or press Enter to skip): "
          );
          const manualGenre = await askQuestion(
            "  Enter genre (or press Enter to skip): "
          );

          // Offer to extract iTunes ID from link if provided
          let manualItunesId = "";
          if (manualLink) {
            const match = manualLink.match(/\/album\/[^/]+\/(\d+)\?/);
            if (match && match[1]) {
              manualItunesId = normalizeItunesId(match[1]);
              console.log(`  Extracted iTunes ID: ${manualItunesId}`);
            } else {
              const inputId = await askQuestion(
                "  Enter iTunes ID if known (or press Enter to skip): "
              );
              manualItunesId = normalizeItunesId(inputId);
            }
          }

          if (manualArtist && manualAlbum) {
            const manualAlbumEntry = {
              album: manualAlbum,
              artist: manualArtist,
              link: manualLink || "",
              cover: manualCover || ""
            };

            if (manualItunesId) {
              manualAlbumEntry.itunesId = manualItunesId;
            }

            if (manualGenre) {
              manualAlbumEntry.genre = manualGenre;
            }

            // Add the manual entry to the ordered result
            orderedAlbumData.push(normalizePropertyOrder(manualAlbumEntry));
            processedSuccessfully = true;
            console.log("  Manual entry added successfully.");
          }
        }
      }

      await sleep(1000);
    }

    // Write the file after each album processing
    fs.writeFileSync(
      outputFilename,
      JSON.stringify(orderedAlbumData, null, 4),
      "utf8"
    );
  }

  // Find entries in existingData that aren't in the input list (extras that should be preserved)
  const albumTitleArtistPairs = albumList.map(
    (item) => `${normalizeText(item.album)}|${normalizeText(item.artist)}`
  );

  const preserveEntries = existingData
    .filter((existingEntry) => {
      // Skip entries that we've already included in orderedAlbumData
      const existingNormalized = `${normalizeText(
        existingEntry.album
      )}|${normalizeText(existingEntry.artist)}`;
      return !albumTitleArtistPairs.some((pair) => pair === existingNormalized);
    })
    .map(normalizePropertyOrder); // Apply normalized property order to preserve entries too

  // Add any entries that exist in the output file but weren't in the input
  // (This preserves entries that might have been added manually or from other sources)
  if (preserveEntries.length > 0) {
    if (APP_CONFIG.VERBOSE) {
      console.log(
        `  Preserving ${preserveEntries.length} additional entries from existing data`
      );
    }
    orderedAlbumData.push(...preserveEntries);
  }

  // Write the final result
  fs.writeFileSync(
    outputFilename,
    JSON.stringify(orderedAlbumData, null, 4),
    "utf8"
  );

  // In verify mode, output a summary
  if (APP_CONFIG.VERIFY_MODE) {
    console.log(`\nVerification summary for ${path.basename(inputFilePath)}:`);
    console.log(`  Total entries: ${albumList.length}`);
    console.log(`  Matched entries: ${matchedCount}`);
    console.log(`  Missing entries: ${missingCount}`);

    if (missingCount > 0) {
      console.log("\nMissing entries:");
      missingEntries.forEach((entry, index) => {
        console.log(`  ${index + 1}. "${entry.album}" by "${entry.artist}"`);
      });
    }
  }

  console.log(
    `Processing complete for ${path.basename(
      inputFilePath
    )}. File saved to ${outputFilename}.`
  );
  return true;
}

/**
 * Main function
 */
async function main() {
  // Check minimum Node.js version for fetch API (18+)
  const nodeVersion = process.versions.node;
  const majorVersion = parseInt(nodeVersion.split(".")[0], 10);

  if (majorVersion < 18) {
    console.error(
      "\nError: This script requires Node.js version 18 or higher for the native fetch API."
    );
    console.error(`Your current Node.js version is ${nodeVersion}.`);
    console.error(
      "Please upgrade Node.js or modify the script to use an alternative HTTP client."
    );
    process.exit(1);
  }

  // Initialize everything
  initialize();

  try {
    // Process all JSON files in the INPUT_DIR
    const files = fs.readdirSync(config.INPUT_DIR);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    if (jsonFiles.length === 0) {
      console.log(`No JSON files found in ${config.INPUT_DIR}`);
      return;
    }

    console.log(`Found ${jsonFiles.length} JSON files to process`);

    let successfulFiles = 0;

    // Process files in alphabetical order
    const sortedFiles = jsonFiles.sort();
    for (const file of sortedFiles) {
      const filePath = path.join(config.INPUT_DIR, file);
      const success = await processAlbumFile(filePath);
      if (success) {
        successfulFiles++;
      }
    }

    console.log(
      `\nProcessing summary: ${successfulFiles} of ${jsonFiles.length} files processed successfully`
    );
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  } finally {
    // Always close the readline interface
    rl.close();
  }
}

// Only run the script if it's being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

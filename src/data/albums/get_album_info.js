#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory constants
const INPUT_DIR = path.join(__dirname, "_input");
const OUTPUT_DIR = path.join(__dirname);

// Configuration
const CONFIG = {
  ENFORCE_TARGET_YEAR: false,
  INTERACTIVE_MODE: true,
  COUNTRY: "US",
  SEARCH_LIMIT: 10
};

// Variables
let rl;

/**
 * Initialize the script
 */
function initialize() {
  // Create directories if they don't exist
  if (!fs.existsSync(INPUT_DIR)) {
    fs.mkdirSync(INPUT_DIR, { recursive: true });
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
 * Process a single album file
 * @param {string} inputFilePath - Path to the input file
 * @returns {Promise<boolean>} - Success status
 */
async function processAlbumFile(inputFilePath) {
  const outputFilename = path.join(OUTPUT_DIR, path.basename(inputFilePath));

  // Load existing data if the output file already exists
  let existingData = [];
  if (fs.existsSync(outputFilename)) {
    try {
      const existingFileContent = fs.readFileSync(outputFilename, "utf8");
      existingData = JSON.parse(existingFileContent);
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

  const allAlbumData = [...existingData];
  const baseUrl = "https://itunes.apple.com/search";

  const isCompleteEntry = (entry) => {
    return (
      entry.album && entry.artist && entry.link && entry.cover && entry.genre
    );
  };

  for (let i = 0; i < albumList.length; i++) {
    const item = albumList[i];
    const albumTitleQuery = item.album;
    const artistNameQuery = item.artist;
    let processedSuccessfully = false;

    // Extract iTunes ID from link if it exists in input
    let inputItunesId;
    if (item.link) {
      const match = item.link.match(/\/album\/[^/]+\/(\d+)\?/);
      if (match && match[1]) {
        inputItunesId = match[1];
      }
    }

    // First check if we already have this album by iTunes ID
    const existingEntryById =
      inputItunesId &&
      allAlbumData.find((entry) => entry.itunesId === inputItunesId);

    // If no ID match, try text matching as fallback
    const existingEntryByText =
      !existingEntryById &&
      allAlbumData.find((entry) => {
        const normalizedEntry = {
          album: normalizeText(entry.album),
          artist: normalizeText(entry.artist)
        };
        const normalizedQuery = {
          album: normalizeText(albumTitleQuery),
          artist: normalizeText(artistNameQuery)
        };
        return (
          normalizedEntry.album === normalizedQuery.album &&
          normalizedEntry.artist === normalizedQuery.artist
        );
      });

    // If we found a match either way, skip this entry
    if (existingEntryById || existingEntryByText) {
      const matchType = existingEntryById ? "iTunes ID" : "text matching";
      console.log(
        `  Skipping existing entry for "${albumTitleQuery}" by "${artistNameQuery}" (matched by ${matchType})`
      );
      processedSuccessfully = true;
      continue;
    }

    try {
      // First try searching for artist only to avoid issues with special characters
      const searchTerm = encodeURIComponent(
        normalizeForSearch(artistNameQuery)
      );
      const searchUrl = `${baseUrl}?term=${searchTerm}&media=music&entity=album,song&country=${CONFIG.COUNTRY}&limit=${CONFIG.SEARCH_LIMIT}`;

      // Log the search URL for debugging
      console.log(`  Searching iTunes API: ${searchUrl}`);

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
          if (apiAlbumName === albumTitleQuery.toLowerCase()) matchScore += 100;
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
        console.log(
          `    → Genre: ${foundAlbum.primaryGenreName || "Alternative"}`
        );

        // If we still don't have a genre, try searching by artist only
        if (!foundGenre && foundAlbum) {
          const artistParams = new URLSearchParams({
            term: encodeURIComponent(normalizeForSearch(artistNameQuery)),
            media: "music",
            entity: "musicArtist,song",
            attribute: "artistTerm",
            country: CONFIG.COUNTRY,
            limit: "1"
          });

          // Log the artist search URL for debugging
          const artistSearchUrl = `${baseUrl}?${artistParams.toString()}`;
          console.log(`  Searching iTunes API for artist: ${artistSearchUrl}`);

          const artistResponse = await fetch(artistSearchUrl);
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
          const albumEntry = {
            album: title,
            artist: artist,
            link: appleMusicLink,
            cover: artworkUrl,
            itunesId: foundAlbum.collectionId
          };

          // If iTunes provides a genre, use it directly
          if (foundAlbum.primaryGenreName) {
            albumEntry.genre = foundAlbum.primaryGenreName;
          } else {
            // Only prompt for genre if iTunes doesn't provide one
            const manualGenre = await askQuestion(
              "  No genre found. Enter genre (press Enter to skip): "
            );
            if (manualGenre) {
              albumEntry.genre = manualGenre;
            }
          }

          allAlbumData.push(albumEntry);
          processedSuccessfully = true;
        }
      }
    } catch (error) {
      console.error(`  Error processing album: ${error.message}`);
    } finally {
      if (processedSuccessfully) {
        console.log(
          `  Album ${i + 1} of ${
            albumList.length
          } ('${albumTitleQuery}') processed successfully.`
        );
      } else {
        console.log(
          `  Album ${i + 1} of ${
            albumList.length
          } ('${albumTitleQuery}') not processed fully or encountered an error.`
        );

        const manualEntry = await askQuestion(
          "  Would you like to manually enter album details? (y/n): "
        );
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

          if (manualArtist && manualAlbum) {
            const albumEntry = {
              album: manualAlbum,
              artist: manualArtist,
              link: manualLink || "",
              cover: manualCover || ""
            };
            if (manualGenre) {
              albumEntry.genre = manualGenre;
            }
            allAlbumData.push(albumEntry);
            processedSuccessfully = true;
            console.log("  Manual entry added successfully.");
          }
        }
      }

      await sleep(1000);
    }

    // Always write the file as we might have cleaned up unknown genres
    fs.writeFileSync(
      outputFilename,
      JSON.stringify(allAlbumData, null, 4),
      "utf8"
    );
  }

  console.log(
    `Processing complete for ${path.basename(
      inputFilePath
    )}. File updated with cleaned genres.`
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
    const files = fs.readdirSync(INPUT_DIR);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    if (jsonFiles.length === 0) {
      console.log(`No JSON files found in ${INPUT_DIR}`);
      return;
    }

    console.log(`Found ${jsonFiles.length} JSON files to process`);

    let successfulFiles = 0;

    // Process files in alphabetical order
    const sortedFiles = jsonFiles.sort();
    for (const file of sortedFiles) {
      const filePath = path.join(INPUT_DIR, file);
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

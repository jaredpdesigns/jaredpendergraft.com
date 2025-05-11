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
const OUTPUT_DIR = path.join(__dirname); // Changed from "_output" to use root albums directory

// Configuration
const CONFIG = {
  ENFORCE_TARGET_YEAR: false, // Set to true to only accept albums released in the target year
  INTERACTIVE_MODE: true, // Set to false to disable all interactive prompts
  COUNTRY: "US",
  SEARCH_LIMIT: 10 // Increased from 5 to 10 for better chances of finding correct matches
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
 * Process a single album file
 * @param {string} inputFilePath - Path to the input file
 * @returns {Promise<boolean>} - Success status
 */
async function processAlbumFile(inputFilePath) {
  // Output file will have same name in the root albums directory
  const outputFilename = path.join(OUTPUT_DIR, path.basename(inputFilePath));

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

  // Load album list
  const albumList = loadAlbumListFromFile(inputFilePath);
  if (!albumList) return false;

  console.log(
    `\nProcessing ${path.basename(inputFilePath)} with ${
      albumList.length
    } albums...`
  );

  const allAlbumData = [];
  const baseUrl = "https://itunes.apple.com/search";

  for (let i = 0; i < albumList.length; i++) {
    const item = albumList[i];
    const albumTitleQuery = item.album;
    const artistNameQuery = item.artist;
    let processedSuccessfully = false;

    try {
      // Build request URL with query parameters
      const queryParams = new URLSearchParams({
        term: `${artistNameQuery} ${albumTitleQuery}`,
        media: "music",
        entity: "album",
        country: CONFIG.COUNTRY,
        limit: CONFIG.SEARCH_LIMIT.toString()
      });

      // Separate artist-only search if the first one fails
      let shouldTryArtistOnlySearch = true;

      // Make the API request using native fetch
      const response = await fetch(baseUrl + "?" + queryParams.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      let foundAlbum = null;

      if (data.resultCount > 0) {
        // Debug log for first album to help diagnose the issue
        if (i === 0) {
          console.log(
            `\n  Debug: Found ${data.resultCount} raw results for the first album.`
          );
          console.log(`  Query: "${artistNameQuery} ${albumTitleQuery}"`);
        }

        // Search for the best match
        const candidates = [];

        for (const result of data.results) {
          const apiArtistName = (result.artistName || "").toLowerCase();
          const apiAlbumName = (result.collectionName || "").toLowerCase();
          const queryArtistLower = artistNameQuery.toLowerCase();
          const queryAlbumLower = albumTitleQuery.toLowerCase();
          const releaseDate = result.releaseDate
            ? new Date(result.releaseDate)
            : null;
          const isTargetYearRelease =
            releaseDate && year
              ? releaseDate.getFullYear().toString() === year
              : false;

          // Calculate a match score
          let matchScore = 0;

          // Exact artist match
          if (apiArtistName === queryArtistLower) {
            matchScore += 100;
          } else if (apiArtistName.includes(queryArtistLower)) {
            matchScore += 50;
          } else if (queryArtistLower.includes(apiArtistName)) {
            matchScore += 30; // Added case where query contains the API artist name
          }

          // Exact album match
          if (apiAlbumName === queryAlbumLower) {
            matchScore += 100;
          } else if (apiAlbumName.includes(queryAlbumLower)) {
            matchScore += 50;
          } else if (queryAlbumLower.includes(apiAlbumName)) {
            matchScore += 30; // Added case where query contains the API album name
          }

          // Bonus for matching year release
          if (isTargetYearRelease) {
            matchScore += 75;
          }

          candidates.push({
            result,
            matchScore,
            isTargetYearRelease
          });
        }

        // Sort by match score (highest first)
        candidates.sort((a, b) => b.matchScore - a.matchScore);

        // Interactive mode - determine if we should ask the user
        if (candidates.length > 0) {
          // Check if top match has a low score (less than 100) or if we have multiple good matches
          const bestMatch = candidates[0];
          const shouldPromptUser =
            CONFIG.INTERACTIVE_MODE &&
            (bestMatch.matchScore < 75 || // Reduced from 100 to 75 for more tolerance
              (candidates.length > 1 && candidates[1].matchScore > 75)); // Multiple good matches

          if (shouldPromptUser) {
            console.log(
              `\n  Found ${candidates.length} potential matches for '${albumTitleQuery}' by '${artistNameQuery}':`
            );

            // Show top 3 matches
            const showCount = Math.min(3, candidates.length);
            for (let j = 0; j < showCount; j++) {
              const candidate = candidates[j];
              const releaseDateStr = candidate.result.releaseDate
                ? new Date(candidate.result.releaseDate)
                    .toISOString()
                    .split("T")[0]
                : "unknown";
              console.log(
                `    ${j + 1}. '${candidate.result.collectionName}' by '${
                  candidate.result.artistName
                }' (${releaseDateStr})`
              );
            }

            // Ask user to choose
            const choice = await askQuestion(
              "  Select the correct album (1-" +
                showCount +
                "), or 'n' for none of these: "
            );

            if (choice.toLowerCase() === "n") {
              // User rejected all suggestions
              console.log("  All suggestions rejected.");

              // Ask if user wants to enter details manually
              const manualEntry = await askQuestion(
                "  Would you like to enter album details manually? (y/n): "
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

                if (manualArtist && manualAlbum) {
                  allAlbumData.push({
                    album: manualAlbum,
                    artist: manualArtist,
                    link: manualLink || "",
                    cover: manualCover || ""
                  });
                  processedSuccessfully = true;
                  console.log("  Manual entry added successfully.");
                }
              }

              continue;
            } else {
              // Parse user choice
              const selectedIndex = parseInt(choice, 10) - 1;
              if (selectedIndex >= 0 && selectedIndex < showCount) {
                foundAlbum = candidates[selectedIndex].result;
              } else {
                // Default to best match if invalid choice
                foundAlbum = bestMatch.result;
              }
            }
          } else {
            // Confidence is high enough, use best match
            foundAlbum = bestMatch.result;
          }
        }
      }

      // If no matches found, try artist-only search as fallback
      if (!foundAlbum && shouldTryArtistOnlySearch) {
        console.log(
          `\n  Trying artist-only search for '${artistNameQuery}'...`
        );

        const artistOnlyParams = new URLSearchParams({
          term: artistNameQuery,
          media: "music",
          entity: "album",
          country: CONFIG.COUNTRY,
          limit: CONFIG.SEARCH_LIMIT.toString()
        });

        const artistOnlyUrl = `${baseUrl}?${artistOnlyParams.toString()}`;
        const artistOnlyResponse = await fetch(artistOnlyUrl);

        if (artistOnlyResponse.ok) {
          const artistData = await artistOnlyResponse.json();

          if (artistData.resultCount > 0) {
            console.log(
              `  Found ${artistData.resultCount} albums by '${artistNameQuery}'.`
            );

            // Now search for album title match
            for (const result of artistData.results) {
              const apiAlbumName = (result.collectionName || "").toLowerCase();
              const queryAlbumLower = albumTitleQuery.toLowerCase();

              if (
                apiAlbumName.includes(queryAlbumLower) ||
                queryAlbumLower.includes(apiAlbumName) ||
                apiAlbumName
                  .replace(/[^\w\s]/g, "")
                  .includes(queryAlbumLower.replace(/[^\w\s]/g, ""))
              ) {
                foundAlbum = result;
                console.log(
                  `  Found match: '${result.collectionName}' by '${result.artistName}'`
                );
                break;
              }
            }
          }
        }

        // Add a delay to avoid rate limiting
        await sleep(1000);
      }

      // If no matches found, ask user if they want to enter details manually
      if (!foundAlbum) {
        console.log(
          `\n  No matches found for '${albumTitleQuery}' by '${artistNameQuery}'.`
        );

        // Debug output to help diagnose the issue
        if (i === 0 && data.resultCount > 0) {
          console.log(
            `  Debug: Found ${data.resultCount} results, but none matched our criteria.`
          );
          console.log(`  Showing first result details for debugging:`);
          if (data.results[0]) {
            console.log(`    - Artist: ${data.results[0].artistName}`);
            console.log(`    - Album: ${data.results[0].collectionName}`);
            console.log(
              `    - Release Date: ${data.results[0].releaseDate || "unknown"}`
            );
          }
        }

        // Ask if user wants to enter details manually
        if (CONFIG.INTERACTIVE_MODE) {
          const manualEntry = await askQuestion(
            "  Would you like to enter album details manually? (y/n): "
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

            if (manualArtist && manualAlbum) {
              allAlbumData.push({
                album: manualAlbum,
                artist: manualArtist,
                link: manualLink || "",
                cover: manualCover || ""
              });
              processedSuccessfully = true;
              console.log("  Manual entry added successfully.");
            }
          }
        }

        continue;
      }

      if (foundAlbum) {
        const title = foundAlbum.collectionName;
        const artist = foundAlbum.artistName;
        const appleMusicLink = foundAlbum.collectionViewUrl;
        let artworkUrl = null;

        // Extract release date information
        const releaseDate = foundAlbum.releaseDate
          ? new Date(foundAlbum.releaseDate)
          : null;
        const releaseDateStr = releaseDate
          ? releaseDate.toISOString().split("T")[0]
          : "unknown";
        const releaseYear = releaseDate
          ? releaseDate.getFullYear().toString()
          : "unknown";

        // Log detailed match information
        console.log(
          `  Match details for '${albumTitleQuery}' by '${artistNameQuery}':`
        );
        console.log(`    → Found: '${title}' by '${artist}'`);
        console.log(`    → Release date: ${releaseDateStr} (${releaseYear})`);

        // Check if we should enforce the target year
        if (CONFIG.ENFORCE_TARGET_YEAR && year && releaseYear !== year) {
          console.log(
            `    → Skipping: Release year ${releaseYear} doesn't match target year ${year}`
          );
          continue;
        }

        // Ask for confirmation if the album title or artist differs significantly
        if (
          CONFIG.INTERACTIVE_MODE &&
          (title.toLowerCase() !== albumTitleQuery.toLowerCase() ||
            artist.toLowerCase() !== artistNameQuery.toLowerCase())
        ) {
          const confirm = await askQuestion(
            "  Is this the correct album? (y/n, default=y): "
          );
          if (confirm.toLowerCase() === "n") {
            // User rejected the match, ask if they want to enter details manually
            const manualEntry = await askQuestion(
              "  Would you like to enter album details manually? (y/n): "
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

              if (manualArtist && manualAlbum) {
                allAlbumData.push({
                  album: manualAlbum,
                  artist: manualArtist,
                  link: manualLink || "",
                  cover: manualCover || ""
                });
                processedSuccessfully = true;
                console.log("  Manual entry added successfully.");
              }
            }

            continue;
          }
        }

        if (foundAlbum.artworkUrl600) {
          artworkUrl = foundAlbum.artworkUrl600;
        } else if (foundAlbum.artworkUrl100) {
          artworkUrl = foundAlbum.artworkUrl100;
          // Try to get 640x640 from 100x100
          artworkUrl = artworkUrl
            .replace("100x100bb.jpg", "640x640bb.jpg")
            .replace("100x100bb", "640x640bb");
        }

        if (title && artist && appleMusicLink && artworkUrl) {
          allAlbumData.push({
            album: title,
            artist: artist,
            link: appleMusicLink,
            cover: artworkUrl
          });
          processedSuccessfully = true;
        }
      }
    } catch (error) {
      // Error will be reported in the finally block
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
      }
    }

    // Add a delay to avoid rate limiting
    await sleep(1000);
  }

  if (allAlbumData.length > 0) {
    fs.writeFileSync(
      outputFilename,
      JSON.stringify(allAlbumData, null, 4),
      "utf8"
    );
    console.log(
      `Processing complete for ${path.basename(inputFilePath)}. ${
        allAlbumData.length
      } albums saved to ${outputFilename}`
    );
    return true;
  } else {
    console.log(
      `No album data was processed successfully from ${path.basename(
        inputFilePath
      )}.`
    );
    return false;
  }
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

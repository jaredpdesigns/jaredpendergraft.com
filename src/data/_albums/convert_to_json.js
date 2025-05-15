#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import config from "./config.js";

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--file" || arg === "-f") {
      if (i + 1 < args.length) {
        return {
          mode: "file",
          filePath: args[i + 1]
        };
      }
    } else if (arg === "--no-skip-duplicates") {
      config.SKIP_DUPLICATES = false;
    } else if (arg === "--non-interactive" || arg === "-n") {
      config.CHECK_INTERACTIVE = false;
    } else if (arg === "--help" || arg === "-h") {
      showHelp();
      process.exit(0);
    }
  }

  return { mode: "interactive" };
}

// Show help information
function showHelp() {
  console.log(`
Convert Apple Music playlist text to JSON format

Usage:
  node convert_to_json.js [options]

Options:
  --file, -f <path>       Read input from file instead of interactive mode
  --no-skip-duplicates    Don't skip entries that already exist in output files
  --non-interactive, -n   Don't interactively confirm uncertain parsing
  --help, -h              Show this help message

Examples:
  node convert_to_json.js                     # Interactive mode
  node convert_to_json.js -f input.txt        # Process from file
  node convert_to_json.js -f input.txt -n     # Process file non-interactively
  `);
}

// Variables
let rl;
let artistWhitelist = {};
let existingEntries = [];

/**
 * Initialize the script
 */
function initialize() {
  // Create input directory if it doesn't exist
  if (!fs.existsSync(config.INPUT_DIR)) {
    fs.mkdirSync(config.INPUT_DIR, { recursive: true });
  }

  // Load artist whitelist (or create empty if doesn't exist)
  try {
    if (fs.existsSync(config.ARTIST_WHITELIST_FILE)) {
      artistWhitelist = JSON.parse(
        fs.readFileSync(config.ARTIST_WHITELIST_FILE, "utf8")
      );
      console.log(
        `Loaded ${
          Object.keys(artistWhitelist).length
        } known artists from whitelist.`
      );
    }
  } catch (error) {
    console.log(
      "Error loading artist whitelist, starting with empty list:",
      error.message
    );
    artistWhitelist = {};
  }

  // Load existing entries from output to avoid duplicates
  if (config.SKIP_DUPLICATES && fs.existsSync(config.OUTPUT_DIR)) {
    try {
      const files = fs.readdirSync(config.OUTPUT_DIR);
      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(config.OUTPUT_DIR, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          existingEntries = [...existingEntries, ...data];
        }
      }
      console.log(
        `Loaded ${existingEntries.length} existing albums for duplicate detection.`
      );
    } catch (error) {
      console.error(`Error loading existing entries: ${error.message}`);
    }
  }

  // Set up readline interface
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
 * Save the artist whitelist to disk
 */
function saveArtistWhitelist() {
  fs.writeFileSync(
    config.ARTIST_WHITELIST_FILE,
    JSON.stringify(artistWhitelist, null, 2),
    "utf8"
  );
  console.log(
    `Saved ${Object.keys(artistWhitelist).length} artists to whitelist.`
  );
}

/**
 * Determine if an artist name is complete based on common patterns
 * @param {string} name - Potential artist name to check
 * @returns {boolean} - Whether the name seems complete
 */
function isCompleteArtistName(name) {
  // Common band name prefixes that suggest an incomplete name
  const incompleteIndicators = [
    "the",
    "and",
    "feat",
    "feat.",
    "featuring",
    "with",
    "&"
  ];

  // If the last word of the name is in the incomplete indicators list, it's likely incomplete
  const lastWord = name.split(" ").pop().toLowerCase();
  return !incompleteIndicators.includes(lastWord);
}

/**
 * Check if we know the correct artist name from our whitelist
 * @param {string} firstWord - First word of an artist name
 * @returns {string|null} - Full artist name if found, null otherwise
 */
function checkArtistWhitelist(firstWord) {
  // Case insensitive check
  const firstWordLower = firstWord.toLowerCase();

  // Check if we have this exact first word in our whitelist
  if (artistWhitelist[firstWordLower]) {
    return artistWhitelist[firstWordLower];
  }

  return null;
}

/**
 * Check if an album entry already exists in our output files
 * @param {Object} entry - The album entry to check
 * @returns {boolean} - Whether the entry exists
 */
function isDuplicateEntry(entry) {
  if (!config.SKIP_DUPLICATES || existingEntries.length === 0) {
    return false;
  }

  // Normalize for comparison
  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/[''']/g, "'")
      .replace(/[&]/g, "and")
      .replace(/[^a-zA-Z0-9' ]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normalizedAlbum = normalizeText(entry.album);
  const normalizedArtist = normalizeText(entry.artist);

  return existingEntries.some((existing) => {
    return (
      normalizeText(existing.album) === normalizedAlbum &&
      normalizeText(existing.artist) === normalizedArtist
    );
  });
}

/**
 * Convert pasted Apple Music text to JSON format
 * @param {string} text - The pasted text from Apple Music
 */
async function convertTextToJson(text) {
  const lines = text.trim().split("\n");

  // Skip header line if it exists
  const startIndex =
    lines[0].includes("Artist") && lines[0].includes("Album") ? 1 : 0;

  const albums = [];
  let artistsCorrected = 0;
  let duplicatesSkipped = 0;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // First, identify the numeric columns at the end
    const parts = line.split(/\s+/);

    // Find the first numeric column from the end (which should be "# Items")
    let numItemsIndex = -1;
    for (let j = parts.length - 2; j >= 0; j--) {
      if (/^\d+$/.test(parts[j])) {
        numItemsIndex = j;
        break;
      }
    }

    // If we couldn't find a numeric column, use the default approach
    if (numItemsIndex === -1 || parts.length < 4) {
      console.log(`Could not identify column structure for line: ${line}`);
      console.log("Using default parsing (first word = artist, rest = album)");

      let artist = parts[0];
      let album = parts.slice(1, -2).join(" ");

      const entry = { album, artist };

      // Check for duplicates
      if (isDuplicateEntry(entry)) {
        console.log(`Skipping duplicate: "${album}" by "${artist}"`);
        duplicatesSkipped++;
        continue;
      }

      albums.push(entry);
      continue;
    }

    // Check if the first word matches a known artist in our whitelist
    const knownArtist = checkArtistWhitelist(parts[0]);
    let artist, album;

    if (knownArtist) {
      // Use the full artist name from whitelist, and adjust album accordingly
      artist = knownArtist;

      // Find where the artist name would end in the parts array
      const artistWords = artist.split(/\s+/).length;
      album = parts.slice(artistWords, numItemsIndex).join(" ");
      console.log(
        `Using known artist: '${artist}' for line starting with '${parts[0]}'`
      );
    } else {
      // We found the "# Items" column, so everything after it is non-album data
      // Now we need to determine where the artist name ends and album begins

      // Start with a simple approach: assume first word is artist
      let artistEndIndex = 0;
      artist = parts[0];

      // Try to intelligently detect if we need more words for the artist
      // Strategy: start with 1 word, then add words until the name seems complete
      for (let j = 1; j < numItemsIndex - 1; j++) {
        const potentialArtist = parts.slice(0, j + 1).join(" ");
        if (isCompleteArtistName(potentialArtist)) {
          artistEndIndex = j;
          artist = potentialArtist;
          break;
        }
      }

      // The album is between artist and numItemsIndex
      album = parts.slice(artistEndIndex + 1, numItemsIndex).join(" ");
    }

    // Create the entry object
    const entry = { album, artist };

    // Check for duplicates
    if (isDuplicateEntry(entry)) {
      console.log(`Skipping duplicate: "${album}" by "${artist}"`);
      duplicatesSkipped++;
      continue;
    }

    // Only prompt for confirmation if the parsing seems uncertain and interactive mode is enabled
    let shouldPrompt = config.CHECK_INTERACTIVE;

    // No need to prompt if we used a whitelisted artist
    if (!knownArtist && shouldPrompt) {
      // Heuristics to determine if this parsing might be wrong:
      // 1. Very short album titles (1 word) are suspicious
      if (album.split(" ").length <= 1) shouldPrompt = true;
      else shouldPrompt = false;

      // 2. Artist names that are very long (more than 4 words) might be wrong
      if (artist.split(" ").length > 4) shouldPrompt = true;
      else if (!shouldPrompt) shouldPrompt = false;

      // 3. Album titles that begin with words often found in artist names
      const suspiciousAlbumStarts = [
        "the",
        "and",
        "featuring",
        "feat",
        "feat.",
        "with"
      ];
      const albumFirstWord = album.split(" ")[0].toLowerCase();
      if (suspiciousAlbumStarts.includes(albumFirstWord)) shouldPrompt = true;
      else if (!shouldPrompt) shouldPrompt = false;
    } else {
      shouldPrompt = false;
    }

    // Only show confirmation prompt if any of our heuristics were triggered and interactive mode is on
    if (shouldPrompt) {
      console.log(`\nLine: ${line}`);
      console.log(`Parsed: Artist='${artist}', Album='${album}'`);

      const correct = await askQuestion("Is this correct? (y/n, default=y): ");
      if (correct.toLowerCase() === "n") {
        // If not correct, ask user to enter the correct artist manually
        const correctedArtist = await askQuestion(
          "Enter the correct artist name: "
        );
        album = await askQuestion("Enter the correct album name: ");

        // Add to whitelist for future use
        artistWhitelist[parts[0].toLowerCase()] = correctedArtist;
        artistsCorrected++;

        artist = correctedArtist;
        console.log(`Updated: Artist='${artist}', Album='${album}'`);
        console.log(
          `Added '${parts[0]}' → '${correctedArtist}' to artist whitelist`
        );

        // Update the entry with corrected values
        entry.artist = artist;
        entry.album = album;
      }
    }

    albums.push(entry);
  }

  // Save whitelist if we added new artists
  if (artistsCorrected > 0) {
    saveArtistWhitelist();
  }

  // Prompt for year
  const currentYear = config.getCurrentYear();
  const yearInput = await askQuestion(
    `\nEnter year for the output file (default: ${currentYear}): `
  );
  const year = yearInput || currentYear;

  // Create output file path
  const outputFile = path.join(config.INPUT_DIR, `${year}.json`);

  // Sort albums alphabetically by artist
  albums.sort((a, b) => a.artist.localeCompare(b.artist));

  // Write the output file
  fs.writeFileSync(outputFile, JSON.stringify(albums, null, 2), "utf8");

  console.log(`\nProcessed ${albums.length} albums and saved to ${outputFile}`);
  if (duplicatesSkipped > 0) {
    console.log(`Skipped ${duplicatesSkipped} duplicate entries`);
  }
  console.log(`You can now run: node get_album_info.js`);

  return albums;
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
 * Process input from a file rather than interactive input
 * @param {string} filePath - Path to the input file
 */
async function processFile(filePath) {
  try {
    console.log(`Reading from file: ${filePath}`);
    const text = fs.readFileSync(filePath, "utf8");
    await convertTextToJson(text);
    rl.close();
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main function to collect user input and process it
 */
async function main() {
  // Parse command line arguments
  const args = parseArgs();

  // Initialize everything
  initialize();

  if (args.mode === "file") {
    await processFile(args.filePath);
  } else {
    console.log(
      "Paste your Apple Music playlist text below (press Enter twice when done):"
    );

    const lines = [];
    let lastLineEmpty = false;

    rl.on("line", (line) => {
      if (!line && lines.length > 0 && !lastLineEmpty) {
        lastLineEmpty = true;
        return;
      }

      if (lastLineEmpty && !line) {
        // Double empty line signals end of input
        const text = lines.join("\n");
        convertTextToJson(text).then(() => {
          rl.close();
        });
      } else {
        lastLineEmpty = !line;
        lines.push(line);
      }
    });
  }
}

// Only run the script if it's being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

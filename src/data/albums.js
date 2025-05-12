// src/data/albums.js - Auto-detect and load album data from _output directory
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Album directory paths
const ALBUMS_DIR = path.join(__dirname, "_albums");
const OUTPUT_DIR = path.join(ALBUMS_DIR, "_output");

// Scan and load album data from output directory
function loadAlbumData() {
  const data = {};

  try {
    // Check if output directory exists
    if (fs.existsSync(OUTPUT_DIR)) {
      // Get all JSON files
      const files = fs
        .readdirSync(OUTPUT_DIR)
        .filter((file) => file.endsWith(".json"));

      // Process each file
      files.forEach((file) => {
        // Extract year from filename (e.g., "2024.json" → "2024")
        const yearMatch = file.match(/^(\d{4})\.json$/);
        if (yearMatch) {
          const year = yearMatch[1];
          const filePath = path.join(OUTPUT_DIR, file);

          // Read and parse file
          const fileContent = fs.readFileSync(filePath, "utf8");
          const albumArray = JSON.parse(fileContent);

          // Create clean array of album objects
          data[year] = albumArray;
        }
      });
    }
  } catch (error) {
    // Silent error handling - no console logs
  }

  return data;
}

// Export a clean data object
export default loadAlbumData();

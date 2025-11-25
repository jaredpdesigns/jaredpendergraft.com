/*
 * Load and format album data from _output directory
 * Returns an array sorted by year (newest first) for Eleventy pagination
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALBUMS_DIR = path.join(__dirname, "_albums");
const OUTPUT_DIR = path.join(ALBUMS_DIR, "_output");

function loadAlbumData() {
  const data = {};

  try {
    if (fs.existsSync(OUTPUT_DIR)) {
      const files = fs
        .readdirSync(OUTPUT_DIR)
        .filter((file) => file.endsWith(".json"));

      files.forEach((file) => {
        const yearMatch = file.match(/^(\d{4})\.json$/);
        if (yearMatch) {
          const year = yearMatch[1];
          const filePath = path.join(OUTPUT_DIR, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const albumArray = JSON.parse(fileContent);
          data[year] = albumArray;
        }
      });
    }
  } catch (error) {
    /* Silent error handling */
  }

  /* Transform to array format and sort by year (newest first) */
  return Object.keys(data)
    .sort((a, b) => b - a)
    .map((year) => ({
      year,
      albums: data[year]
    }));
}

export default loadAlbumData();

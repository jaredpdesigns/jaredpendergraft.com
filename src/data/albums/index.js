import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Safely load JSON data from a file
 * @param {string} filePath - Path to the JSON file
 * @returns {Array|null} - Parsed JSON data or empty array if file doesn't exist
 */
function loadJsonSafely(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (error) {
    console.error(`Error loading ${filePath}: ${error.message}`);
  }
  return [];
}

// Load album data for different years
const albums2024 = loadJsonSafely(path.join(__dirname, "2024.json"));
const albums2025 = loadJsonSafely(path.join(__dirname, "2025.json"));

export default {
  2024: albums2024,
  2025: albums2025
};

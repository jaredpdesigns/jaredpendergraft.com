import path from "path";
import { fileURLToPath } from "url";

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow overriding directories through environment variables
const getEnvPath = (envVar, defaultPath) =>
  process.env[envVar] ? process.env[envVar] : defaultPath;

// Central configuration
const config = {
  // Directories
  INPUT_DIR: getEnvPath("ALBUMS_INPUT_DIR", path.join(__dirname, "_input")),
  OUTPUT_DIR: getEnvPath("ALBUMS_OUTPUT_DIR", path.join(__dirname, "_output")),

  // Files
  ARTIST_WHITELIST_FILE: path.join(__dirname, "artist_whitelist.json"),

  // Settings
  SKIP_DUPLICATES: true,
  CHECK_INTERACTIVE: true,

  // Year settings
  getCurrentYear: () => new Date().getFullYear(),
  getNextYear: () => new Date().getFullYear() + 1,

  // File patterns
  YEAR_FILE_PATTERN: /^(\d{4})\.json$/
};

export default config;

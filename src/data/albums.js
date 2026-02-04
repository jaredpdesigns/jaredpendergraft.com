/*
 * Load album data from _albums directory
 * Supports both legacy format and Savorite export format
 * Returns an array sorted by year (newest first) for Eleventy pagination
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALBUMS_DIR = path.join(__dirname, "_albums");

/*
 * Format release date as "January 30"
 */
function formatReleaseDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

/*
 * Normalize album data to Savorite format
 * Converts legacy format (album, artist, link, cover) to Savorite format (name, artistName, url, artwork)
 */
function normalizeAlbum(album) {
  return {
    name: album.name,
    artistName: album.artistName,
    url: album.url,
    artwork: album.artwork,
    genre: album.genre,
    id: album.id,
    releaseDate: album.releaseDate,
    releaseDateFormatted: formatReleaseDate(album.releaseDate)
  };
}

function loadAlbumData() {
  const data = {};

  try {
    if (fs.existsSync(ALBUMS_DIR)) {
      const files = fs
        .readdirSync(ALBUMS_DIR)
        .filter((file) => file.endsWith(".json"));

      files.forEach((file) => {
        const yearMatch = file.match(/^(\d{4})\.json$/);
        if (yearMatch) {
          const year = yearMatch[1];
          const filePath = path.join(ALBUMS_DIR, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const albumArray = JSON.parse(fileContent);
          data[year] = albumArray.map(normalizeAlbum);
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

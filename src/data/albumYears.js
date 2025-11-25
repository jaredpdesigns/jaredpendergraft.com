/*
 * Convert albums data into an array suitable for Eleventy pagination
 * Sorted from newest to oldest year
 */
import albums from "./albums.js";

export default Object.keys(albums)
  .sort((a, b) => b - a) // Sort years descending (newest first)
  .map((year) => ({
    year,
    albums: albums[year]
  }));

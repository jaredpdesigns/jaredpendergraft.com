const { minify } = require("terser");
const fs = require("fs-extra");
const htmlmin = require("html-minifier");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Markdown Support
const markdown = require("markdown-it")({
  html: true,
});

// Components
const componentsDir = "src/_includes/components";
const ClientGrid = require(`./${componentsDir}/client_grid.js`);
const Gallery = require(`./${componentsDir}/gallery.js`);
const Grid = require(`./${componentsDir}/grid.js`);
const Icon = require(`./${componentsDir}/icon.js`);
const Process = require(`./${componentsDir}/process.js`);
const ProjectDetail = require(`./${componentsDir}/project_detail.js`);
const ProjectDetailCaption = require(`./${componentsDir}/project_detail_caption.js`);
const ProjectGallery = require(`./${componentsDir}/project_gallery.js`);
const ProjectGrid = require(`./${componentsDir}/project_grid.js`);
const ProjectHeader = require(`./${componentsDir}/project_header.js`);
const Recommendation = require(`./${componentsDir}/recommendation.js`);

module.exports = (eleventyConfig) => {
  // Shortcodes
  eleventyConfig.addShortcode("Year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("Markdown", (content) =>
    markdown.render(content)
  );
  eleventyConfig.addShortcode("Client", ClientGrid);
  eleventyConfig.addShortcode("Icon", Icon);
  eleventyConfig.addShortcode("Process", Process);
  eleventyConfig.addShortcode("ProjectGallery", ProjectGallery);
  eleventyConfig.addShortcode("ProjectGrid", ProjectGrid);
  eleventyConfig.addShortcode("ProjectDetail", ProjectDetail);
  eleventyConfig.addShortcode("ProjectDetailCaption", ProjectDetailCaption);
  eleventyConfig.addShortcode("ProjectHeader", ProjectHeader);
  eleventyConfig.addShortcode("Recommendation", Recommendation);
  eleventyConfig.addPairedShortcode("Gallery", Gallery);
  eleventyConfig.addPairedShortcode("Grid", Grid);

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Build stuff
  eleventyConfig.addPassthroughCopy({
    "static": "/",
  });

  // Filters
  eleventyConfig.addFilter("featured", (arr) => {
    return arr.filter((item) => {
      return item.featured;
    });
  });
  eleventyConfig.addFilter("filteredProject", (arr, name) => {
    return arr.filter((item) => {
      return item.name === name;
    })[0];
  });
  eleventyConfig.addFilter("projectHue", (arr, name) => {
    return arr.filter((item) => {
      return item.name === name;
    })[0].hue;
  });
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async (code, callback) => {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      callback(null, code);
    }
  });

  // 404 handling
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("dist/404.html");
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  // HTML minification
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

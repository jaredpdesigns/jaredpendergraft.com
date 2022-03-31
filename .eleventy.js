const { minify } = require("terser");
const fs = require("fs-extra");
const htmlmin = require("html-minifier");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// Components
const componentsDir = "src/_includes/components";
const Client = require(`./${componentsDir}/client_grid.js`);
const Code = require(`./${componentsDir}/code_grid.js`);
const Gallery = require(`./${componentsDir}/gallery.js`);
const Grid = require(`./${componentsDir}/grid.js`);
const Icon = require(`./${componentsDir}/icon.js`);
const Process = require(`./${componentsDir}/process.js`);
const ProjectDetail = require(`./${componentsDir}/project_detail.js`);
const ProjectDetailCaption = require(`./${componentsDir}/project_detail_caption.js`);
const ProjectGallery = require(`./${componentsDir}/project_gallery.js`);
const ProjectGrid = require(`./${componentsDir}/project_grid.js`);
const ProjectHeader = require(`./${componentsDir}/project_header.js`);
const ProjectSection = require(`./${componentsDir}/project_section.js`);
const Recommendation = require(`./${componentsDir}/recommendation.js`);
const Tags = require(`./${componentsDir}/tags.js`);

module.exports = (eleventyConfig) => {
  // Shortcodes
  eleventyConfig.addShortcode("Year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("Markdown", (content) =>
    markdown.render(content)
  );
  eleventyConfig.addShortcode("Client", Client);
  eleventyConfig.addShortcode("Code", Code);
  eleventyConfig.addShortcode("Icon", Icon);
  eleventyConfig.addShortcode("Process", Process);
  eleventyConfig.addShortcode("ProjectGallery", ProjectGallery);
  eleventyConfig.addShortcode("ProjectGrid", ProjectGrid);
  eleventyConfig.addShortcode("ProjectDetail", ProjectDetail);
  eleventyConfig.addShortcode("ProjectDetailCaption", ProjectDetailCaption);
  eleventyConfig.addShortcode("ProjectHeader", ProjectHeader);
  eleventyConfig.addShortcode("ProjectSection", ProjectSection);
  eleventyConfig.addShortcode("Recommendation", Recommendation);
  eleventyConfig.addShortcode("Tags", Tags);
  eleventyConfig.addPairedShortcode("Gallery", Gallery);
  eleventyConfig.addPairedShortcode("Grid", Grid);

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Build stuff
  eleventyConfig.addPassthroughCopy({
    static: "/",
  });

  // Filters
  eleventyConfig.addFilter("selected", (arr, type = "featured") => {
    return arr.filter((item) => {
      return item.type === type && !item.hidden;
    });
  });
  eleventyConfig.addFilter("filteredProject", (arr, name) => {
    return arr.filter((item) => {
      return item.name === name;
    })[0];
  });
  eleventyConfig.addFilter("currency", (value) => {
    if (value) {
      if (value.toString().includes(".")) {
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
      } else {
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        });
      }
    }
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

  // Markdown support
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    renderHref: false,
    tabIndex: false,
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

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

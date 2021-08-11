const htmlmin = require("html-minifier");
const sass = require("sass");
const fs = require("fs-extra");

// Markdown Support
const markdown = require("markdown-it")({
  html: true,
});

// Components
const componentsDir = "src/site/_includes/components";
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

  eleventyConfig.addPassthroughCopy({
    "src/static": "/",
  });
  eleventyConfig.addWatchTarget("src/scss/");
  eleventyConfig.addWatchTarget("src/site/_includes/components/");

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

  // Compile Sass before a build
  eleventyConfig.on("beforeBuild", () => {
    let result = sass.renderSync({
      file: "src/scss/style.scss",
      sourceMap: false,
      outputStyle: "compressed",
    });
    fs.ensureDirSync("dist/css/");
    fs.writeFile("dist/css/style.css", result.css, (err) => {
      if (err) throw err;
    });
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
      input: "src/site",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

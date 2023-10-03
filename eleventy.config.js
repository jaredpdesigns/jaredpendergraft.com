const fs = require("fs-extra");
const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginWebC = require("@11ty/eleventy-plugin-webc");
const postcss = require("postcss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginWebC, {
    components: "src/_includes/**/*.webc"
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  // Make CSS mo-betta
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (inputContent) {
      const result = await postcss([
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-each"),
        require("autoprefixer")
      ]).process(inputContent);

      return async () => result.css;
    }
  });

  // Filters
  eleventyConfig.addFilter("filteredProject", (arr, value) => {
    return arr.find((project) => project.name === value);
  });

  // Markdown support
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    renderHref: false,
    tabIndex: false
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  // 404 handling
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, bs) => {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("_site/404.html");
          console.log(content_404);
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // HTML minification
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Passthrough static stuffs
  eleventyConfig.addPassthroughCopy({
    static: "/"
  });
  eleventyConfig.setServerPassthroughCopyBehavior("copy");

  return {
    dir: {
      input: "src/pages",
      includes: "../_includes",
      layouts: "../layouts",
      data: "../data",
      output: "dist"
    },
    markdownTemplateEngine: "njk"
  };
};

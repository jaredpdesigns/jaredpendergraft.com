import fs from "fs-extra";
import htmlmin from "html-minifier";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import pluginWebC from "@11ty/eleventy-plugin-webc";
import postcss from "postcss";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import postcssEach from "postcss-each";
import autoprefixer from "autoprefixer";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { execSync } from "child_process";

export default function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginWebC, {
    components: "src/_includes/**/*.webc"
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    statsOnly: true,
    cacheOptions: {
      duration: "365d",
      directory: ".cache/eleventy-img",
      removeUrlQueryParams: false
    },
    formats: ["avif", "webp", "jpeg"],
    widths: [320, 640],
    htmlOptions: {
      imgAttributes: {
        decoding: "async",
        fetchPriority: "high",
        loading: "lazy",
        sizes: "(min-width: 36em) 33.3vw, 100vw"
      }
    },
    urlFormat: ({ src, width, format }) => {
      /*
       * Skip transformation for SVGs - always return original URL
       * SVG is a vector format and shouldn't be converted to raster formats
       */
      if (src.endsWith(".svg")) {
        return src;
      }

      /*
       * Use Cloudflare's image resizing service for R2-hosted images
       * Skip transformation for non-R2 images
       */
      if (!src.startsWith("https://projects.jaredpendergraft.com/")) {
        return src;
      }

      const params = [`w=${width}`, `f=${format}`, "q=auto", "metadata=none"];

      const finalUrl = src.replace(
        /^https:\/\/([^\/]+)/,
        `$&/cdn-cgi/image/${params.join(",")}`
      );

      return finalUrl;
    }
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  // Make CSS mo-betta
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (inputContent) {
      const result = await postcss([
        postcssImport,
        postcssNested,
        postcssEach,
        autoprefixer
      ]).process(inputContent, { from: undefined, to: undefined });

      return async () => result.css;
    }
  });

  // Global data - Git commit hash for cache busting
  eleventyConfig.addGlobalData("gitHash", () => {
    try {
      return execSync("git rev-parse --short HEAD").toString().trim();
    } catch (e) {
      // Fallback to timestamp if git is not available
      return Date.now().toString();
    }
  });

  // Filters
  eleventyConfig.addFilter("filteredProject", (arr, value) => {
    return arr.find((project) => project.name === value);
  });

  eleventyConfig.addFilter("cacheBust", (url) => {
    try {
      const gitHash = execSync("git rev-parse --short HEAD").toString().trim();
      return `${url}?v=${gitHash}`;
    } catch (e) {
      return `${url}?v=${Date.now()}`;
    }
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
      input: "src",
      includes: "_includes",
      layouts: "layouts",
      data: "data",
      output: "dist"
    },
    markdownTemplateEngine: "njk"
  };
}

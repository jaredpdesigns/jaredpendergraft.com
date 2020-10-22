import { clients } from "./data/clients";
import { projects } from "./data/projects";
let dynamicClients = () => {
  return new Promise((resolve) => {
    resolve(clients.map((client) => `clients/${client.type}/${client.slug}`));
  });
};
let dynamicProjects = () => {
  return new Promise((resolve) => {
    resolve(projects.map((project) => `projects/${project.slug}`));
  });
};

export default {
  target: "static",
  head: {
    htmlAttrs: {
      lang: "en",
    },
    title: "Jared Pendergraft",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "The personal website of Jared Pendergraft",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "jared pendergraft, jared pendergraft designs, design, website, graphic design hawaii, web design hawaii, graphic design maui, web design maui",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "The personal website of Jared Pendergraft",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://jaredpendergraft.com/img/social.jpg",
      },
      {
        hid: "og:image:width",
        property: "og:image:width",
        content: "1200",
      },
      {
        hid: "og:image:height",
        property: "og:image:height",
        content: "630",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "Jared Pendergraft",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Jared Pendergraft",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://jaredpendergraft.com/",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "photo",
      },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: "jaredpdesigns",
      },
      {
        name: "theme-color",
        content: "#6BBD94",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black translucent",
      },
      {
        name: "apple-mobile-web-app-title",
        content: "Jared",
      },
      {
        name: "msapplication-TileImage",
        content: "/img/icons/msapplication-icon-144x144.png",
      },
      {
        name: "msapplication-TileColor",
        content: "#6BBD94",
      },
      {
        name: "google-site-verification",
        content: "yqWN87GgYt9qA0xe6d0YbPulnIcXMxmw5ZSJS6M2MtQ",
      },
    ],
    link: [
      {
        hid: "canonical",
        rel: "canonical",
        href: "https://jaredpendergraft.com/",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "mask-icon",
        href: "/img/icons/safari-pinned-tab.svg",
        color: "#6BBD94",
      },
      { rel: "manifest", href: "/manifest.json" },
      {
        rel: "apple-touch-icon",
        href: "/img/icons/apple-touch-icon-152x152.png",
      },
      {
        rel: "preconnect",
        href: "https://use.typekit.net",
      },
      {
        rel: "preload",
        href: "https://use.typekit.net/vkr4fst.css",
        as: "style",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://use.typekit.net/vkr4fst.css",
      },
      {
        rel: "preconnect",
        href: "https://www.google-analytics.com",
      },
      {
        rel: "preload",
        href: "https://www.googletagmanager.com/gtag/js?id=UA-57033104-3",
        as: "script",
        crossorigin: "anonymous",
      },
      {
        rel: "preconnect",
        href: "https://www.google.com",
      },
      {
        rel: "preload",
        href: "/js/google-analytics.js",
        as: "script",
        crossorigin: "anonymous",
      },
    ],
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=UA-5081288-1",
        defer: true,
      },
      {
        src: "/js/google-analytics.js",
        defer: true,
      },
    ],
  },

  css: [
    "@/assets/css/reset.scss",
    "@/assets/css/helpers.scss",
    "@/assets/css/base.scss",
  ],
  styleResources: {
    scss: ["@/assets/css/variables.scss"],
  },

  plugins: ["@/plugins/vue-plugins.js"],

  components: true,

  modules: ["@nuxtjs/style-resources", "@nuxtjs/sitemap", "@nuxtjs/markdownit"],

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
  },

  generate: {
    routes: dynamicClients,
    dynamicProjects,
    fallback: true,
  },

  sitemap: {
    hostname: "https://jaredpendergraft.com",
    gzip: true,
    routes: dynamicProjects,
  },
};

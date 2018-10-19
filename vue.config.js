module.exports = {
  assetsDir: "assets",
  outputDir: "docs",
  pwa: {
    name: "Jared",
    themeColor: "#428069",
    msTileColor: "#428069",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black translucent"
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/css/variables.scss";`
      }
    }
  }
};

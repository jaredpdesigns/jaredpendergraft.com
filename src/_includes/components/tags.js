module.exports = function (tags) {
  return `
  <nav class="tags flow__grid flow__align--h-start flow__direction--column flow__gap--s padding__bottom--xl">
  ${
    tags
      ? tags
          .filter((tag) => tag !== "code")
          .map(
            (tag) =>
              `<a href="/tags/${tag}" class="radius__xs"><p><code>${tag}</code></p></a>`
          )
          .join("\n")
      : null
  }
  </nav>
  `;
};

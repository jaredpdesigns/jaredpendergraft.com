module.exports = function (item) {
  return `
<a href="${
    item.url
  }" class="grid__item border__all color__bg--highlight--ghost color__border--highlight--light radius__m shadow">
<figure class="color__bg--contrast radius__tl--m radius__tr--m">
  <span class="radius__tl--m radius__tr--m">
  <img class="radius__tl--m radius__tr--m" alt="${`Featured image for ${
    item.data.title.split(" • ")[0]
  }`}" src="${`/img/code/${item.fileSlug}.svg`}" decoding="async" fetchpriority="high" height="180" width="320" style="aspect-ratio: 16/9; width: 100%"/>
  </span>
  <figcaption class="border__top color__border--base--light oomph__v--m padding__all--m">
  <h2>${item.data.title.split(" • ")[0]}</h2>
  <p>${item.data.description}</p>
  </figcaption>
  </figure>
  <footer class="border__top color__border--highlight--light flow__grid flow__align--h-start flow__direction--column flow__gap--xs padding__bottom--s padding__left--m padding__right--m padding__top--s">
  ${
    item.data.tags
      ? item.data.tags
          .filter((tag) => tag !== "code")
          .map((tag) => `<p><code>${tag}</code></p>`)
          .join("\n")
      : null
  }
  </footer>
</a>
`;
};

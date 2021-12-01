module.exports = function (item) {
  return `
<a href="${
    item.url
  }" class="grid__item border__all color__bg--highlight--ghost color__border--highlight--light radius__m shadow">
<section class="color__bg--contrast padding__all--m radius__tl--m oomph__v--m radius__tr--m">
<h2>${item.data.title.split(" • ")[0]}</h2>
<p>${item.data.description}</p>
  </section>
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

module.exports = function (item) {
  const Icon = require("./icon.js");
  return `
<a href="${item.slug ? "/projects/" + item.slug + "/" : item.external}" ${
    item.slug ? "" : 'target="_blank" rel="noopener"'
  } class="grid__item ${
    item.type === "featured" ? "featured border__all" : "side padding__all--m"
  } radius__m" style="--brand: ${item.hue}">
<figure class="${
    item.type === "side"
      ? "flow__grid flow__align--v-start flow__gap--m"
      : "flow__grid"
  }">
  ${
    item.type === "featured"
      ? `<section><picture><source
      type="image/avif"
      srcset="${item.img}?h=180&w=320&fm=avif 320w, ${item.img}?h=360&w=640&fm=avif 480w, ${item.img}?h=540&w=960&fm=avif 640w"
      sizes="(max-width: 640px) 100vw, 640px"
    />
    <source
      type="image/webp"
      srcset="${item.img}?h=180&w=320&fm=webp 320w, ${item.img}?h=360&w=640&fm=webp 480w, ${item.img}?h=540&w=960&fm=webp 640w"
      sizes="(max-width: 640px) 100vw, 640px"
    />
    <img
      class="radius__tl--m radius__tr--m width__full"
      srcset="${item.img}?h=180&w=320 320w, ${item.img}?h=360&w=640 480w, ${item.img}?h=540&w=960 640w"
      sizes="(max-width: 640px) 100vw, 640px"
      src="${item.img}?h=90&w=160"
      alt="${item.name} featured image"
      decoding="async"
      fetchpriority="low"
      height="180"
      width="320"
      style="aspect-ratio: 16/9;"
    />
</picture></section>`
      : `<img
        class="border__all color__border--base--light radius__s shadow"
        loading="lazy"
        src="${item.img}"
        alt="${item.name} featured image"
        height="72"
        width="72"
      />`
  }
<figcaption class="${
    item.type === "featured"
      ? "flow__self--center oomph__v--m padding__all--m"
      : "oomph__v--m"
  }">
  <h2>${item.name}</h2>
  <p class="${item.type === "featured" ? "type__size--l-l" : ""}">${
    item.description
  }</p>
  ${
    item.type === "featured"
      ? `<section><p class="project__link flow__inline flow__align--v-center type__weight--semibold">View Project${Icon(
          "arrow-right"
        )}</p></section>`
      : ""
  }
</figcaption>
  </figure>
</a>
`;
};

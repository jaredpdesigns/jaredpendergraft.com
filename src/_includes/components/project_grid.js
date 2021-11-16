module.exports = function (item) {
  const Icon = require("./icon.js");
  return `
<a href="${item.slug ? "/projects/" + item.slug + "/" : item.external}" ${
    item.slug ? "" : 'target="_blank" rel="noopener"'
  } class="grid__item ${
    item.featured ? "featured border__all" : "side padding__all--m"
  } radius__m" style="--brand: ${item.hue}">
<figure class="${
    !item.featured
      ? "flow__grid flow__align--v-start flow__gap--m"
      : "flow__grid"
  }">
  ${
    item.featured
      ? `<section class="padding__left--s padding__right--s padding__top--s"><picture>
  <source
    media="(min-width: 1em)"
    srcset="${item.img}?h=800&w=1280&fm=webp  1024w, ${
          item.img
        }?h=400&w=640&fm=webp 400w, ${item.img}?h=200&w=320&fm=webp 100w"
    sizes="33.3vw"
    type="image/webp"
  />
  <source
    media="(min-width: 35em)"
    srcset="${item.img}?h=800&w=1280  1024w"
    sizes="33.3vw" />
  <img
    class="radius__tl--xs radius__tr--xs width__full"
    loading="lazy"
    src="${item.img}?h=200&w=320"
    srcset="${item.img}?h=400&w=640 2x"
    alt="${item.name} featured image"
    height="200"
    width="320"
  />
</picture>${
          item.imgDark
            ? `<picture style="display: none">
<source
  media="(min-width: 1em)"
  srcset="${item.imgDark}?h=800&w=1280&fm=webp  1024w, ${item.imgDark}?h=400&w=640&fm=webp 400w, ${item.imgDark}?h=200&w=320&fm=webp 100w"
  sizes="33.3vw"
  type="image/webp"
/>
<source
  media="(min-width: 35em)"
  srcset="${item.imgDark}?h=800&w=1280  1024w"
  sizes="33.3vw" />
<img
  class="radius__tl--xs radius__tr--xs width__full"
  loading="lazy"
  src="${item.imgDark}?h=200&w=320"
  srcset="${item.imgDark}?h=400&w=640 2x"
  alt="${item.name} featured image"
  height="200"
  width="320"
/>
</picture>`
            : ``
        }
</section>`
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
    item.featured
      ? "flow__self--center oomph__v--m padding__all--m"
      : "oomph__v--m"
  }">
  <h2 class="${
    item.featured ? "type__size--xxl-xxl width__m" : ""
  } type__family--secondary">${item.name}</h2>
  <p class="${item.featured ? "type__size--l-l width__m" : ""}">${
    item.description
  }</p>
  ${
    item.featured
      ? `<section class="width__m"><p class="project__link flow__inline flow__align--v-center type__weight--semibold">View Project${Icon(
          "arrow-right"
        )}</p></section>`
      : ""
  }
</figcaption>
  </figure>
</a>
`;
};

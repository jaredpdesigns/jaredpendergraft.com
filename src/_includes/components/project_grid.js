module.exports = function (item) {
  return `
<a href="${item.slug ? "/projects/" + item.slug : item.external}" ${
    item.slug ? "" : 'target="_blank" rel="noopener"'
  } class="grid__item ${
    item.featured
      ? "featured color__bg--highlight--ghost"
      : "side padding__all--m"
  } radius__m">
<figure class="${
    !item.featured ? "flow__align--v-start flow__gap--m" : "flow__grid"
  }">
  ${
    item.featured
      ? `<picture>
  <source
    media="(min-width: 1em)"
    srcset="${item.img}?h=800&w=1280&fm=webp  1024w, ${item.img}?h=400&w=640&fm=webp 400w, ${item.img}?h=200&w=320&fm=webp 100w"
    sizes="33.3vw"
    type="image/webp"
  />
  <source
    media="(min-width: 35em)"
    srcset="${item.img}?h=800&w=1280  1024w"
    sizes="33.3vw" />
  <img
    class="width__full"
    loading="lazy"
    src="${item.img}?h=200&w=320"
    srcset="${item.img}?h=400&w=640 2x"
    alt="${item.name} featured image"
    height="200"
    width="320"
  />
</picture>
<picture style="display: none">
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
    class="width__full"
    loading="lazy"
    src="${item.imgDark}?h=200&w=320"
    srcset="${item.imgDark}?h=400&w=640 2x"
    alt="${item.name} featured image"
    height="200"
    width="320"
  />
</picture>`
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
      ? "flow__self--center oomph__v--l padding__bottom--l padding__left--l padding__right--l padding__top--m"
      : "oomph__v--m padding__top--m"
  }">
  <h2 class="${
    item.featured ? "color__type--highlight type__family--secondary type__size--xxl-xxl width__m" : ""
  }">${item.name}</h2>
  <p class="${item.featured ? "type__size--l-l width__m" : ""}">${
    item.description
  }</p>
</figcaption>
  </figure>
</a>
`;
};

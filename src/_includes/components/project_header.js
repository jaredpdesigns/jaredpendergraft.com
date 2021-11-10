module.exports = function (item) {
  const Icon = require("./icon.js");
  return `
<header class="project__header margin__bottom--l padding__left--m padding__right--m width__xl">
<section class="project__header--inner color__bg--highlight--ghost flow__grid flow__align--v-stretch flow__grid--columns-auto overflow__hidden radius__m">
  <section class="flow__self--center oomph__v--l padding__all--m">
    <h1 class="width__m">${item.name}</h1>
    <p class="type__size--l-l width__m">${item.description}</p>
    ${
      item.external
        ? `<p class="width__m"><a class="flow__inline flow__align--v-center type__weight--semibold" href="${
            item.external
          }" title="View ${
            item.name
          } project details" target="_blank" rel="noopener">View Project${Icon(
            "external"
          )}</a></p>`
        : ""
    }
  </section>
  <figure class="border__top color__bg--contrast color__border--highlight--light">
    <picture>
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
        class="overflow__hidden radius__bl--m radius__br--m width__full"
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
        srcset="${item.imgDark}?h=800&w=1280&fm=webp  1024w, ${
    item.imgDark
  }?h=400&w=640&fm=webp 400w, ${item.imgDark}?h=200&w=320&fm=webp 100w"
        sizes="33.3vw"
        type="image/webp"
      />
      <source
        media="(min-width: 35em)"
        srcset="${item.imgDark}?h=800&w=1280  1024w"
        sizes="33.3vw" />
      <img
        class="overflow__hidden radius__bl--m radius__br--m width__full"
        loading="lazy"
        src="${item.imgDark}?h=200&w=320"
        srcset="${item.imgDark}?h=400&w=640 2x"
        alt="${item.name} featured image"
        height="200"
        width="320"
      />
    </picture>
  </figure>
  </section>
</header>
`;
};

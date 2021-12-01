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
      ? `<section class="padding__left--s padding__right--s padding__top--s"><picture><source
      type="image/avif"
      srcset="${item.img}?h=200&w=320&fm=avif 320w, ${
          item.img
        }?h=400&w=640&fm=avif 480w, ${item.img}?h=600&w=960&fm=avif 640w"
      sizes="(max-width: 640px) 100vw, 640px"
    />
    <source
      type="image/webp"
      srcset="${item.img}?h=200&w=320&fm=webp 320w, ${
          item.img
        }?h=400&w=640&fm=webp 480w, ${item.img}?h=600&w=960&fm=webp 640w"
      sizes="(max-width: 640px) 100vw, 640px"
    />
    <img
      class="radius__tl--xs radius__tr--xs width__full"
      srcset="${item.img}?h=200&w=320 320w, ${item.img}?h=400&w=640 480w, ${
          item.img
        }?h=600&w=960 640w"
      sizes="(max-width: 640px) 100vw, 640px"
      src="${item.img}?h=160&w=160"
      alt="${item.name} featured image"
      decoding="async"
      height="200"
      width="320"
    />
</picture>${
          item.imgDark
            ? `<picture style="display: none"><source
            type="image/avif"
            srcset="${item.imgDark}?h=200&w=320&fm=avif 320w, ${item.imgDark}?h=400&w=640&fm=avif 480w, ${item.imgDark}?h=600&w=960&fm=avif 640w"
            sizes="(max-width: 640px) 100vw, 640px"
          />
          <source
            type="image/webp"
            srcset="${item.imgDark}?h=200&w=320&fm=webp 320w, ${item.imgDark}?h=400&w=640&fm=webp 480w, ${item.imgDark}?h=600&w=960&fm=webp 640w"
            sizes="(max-width: 640px) 100vw, 640px"
          />
          <img
            class="radius__tl--xs radius__tr--xs width__full"
            srcset="${item.imgDark}?h=200&w=320 320w, ${item.imgDark}?h=400&w=640 480w, ${item.imgDark}?h=600&w=960 640w"
            sizes="(max-width: 640px) 100vw, 640px"
            src="${item.imgDark}?h=160&w=160"
            alt="${item.name} featured image"
            decoding="async"
            height="200"
            width="320"
          /></picture>`
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
  <h2>${item.name}</h2>
  <p class="${item.featured ? "type__size--l-l" : ""}">${
    item.description
  }</p>
  ${
    item.featured
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

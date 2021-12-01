module.exports = function (item) {
  return `
<a href="/projects/${
    item.slug
  }" class="gallery__item border__all color__bg--contrast radius__s shadow" style="--brand: ${
    item.hue
  }">
  <figure>
    <section class="padding__left--s padding__right--s padding__top--s">
    <picture>
    <source
  type="image/avif"
  srcset="${item.img}?h=200&w=320&fm=avif 320w, ${
    item.img
  }?h=400&w=640&fm=avif 480w, ${item.img}?h=600&w=960&fm=avif 640w"
  sizes="(max-width: 480px) 100vw, 480px"
/>
<source
  type="image/webp"
  srcset="${item.img}?h=200&w=320&fm=webp 320w, ${
    item.img
  }?h=400&w=640&fm=webp 480w, ${item.img}?h=600&w=960&fm=webp 640w"
  sizes="(max-width: 480px) 100vw, 480px"
/>
<img
  class="radius__tl--xs radius__tr--xs width__full"
  srcset="${item.img}?h=200&w=320 320w, ${item.img}?h=400&w=640 480w, ${
    item.img
  }?h=600&w=960 640w"
  sizes="(max-width: 480px) 100vw, 480px"
  src="${item.img}?h=160&w=160"
  alt="${item.name} featured image"
  decoding="async"
  height="200"
  width="320"
/>
  </picture>
  ${
    item.imgDark
      ? `<picture style="display: none"><source
      type="image/avif"
      srcset="${item.imgDark}?h=200&w=320&fm=avif 320w, ${item.imgDark}?h=400&w=640&fm=avif 480w, ${item.imgDark}?h=600&w=960&fm=avif 640w"
      sizes="(max-width: 480px) 100vw, 480px"
    />
    <source
      type="image/webp"
      srcset="${item.imgDark}?h=200&w=320&fm=webp 320w, ${item.imgDark}?h=400&w=640&fm=webp 480w, ${item.imgDark}?h=600&w=960&fm=webp 640w"
      sizes="(max-width: 480px) 100vw, 480px"
    />
    <img
      class="radius__tl--xs radius__tr--xs width__full"
      srcset="${item.imgDark}?h=200&w=320 320w, ${item.imgDark}?h=400&w=640 480w, ${item.imgDark}?h=600&w=960 640w"
      sizes="(max-width: 480px) 100vw, 480px"
      src="${item.imgDark}?h=160&w=160"
      alt="${item.name} featured image"
      decoding="async"
      height="200"
      width="320"
    />
    </picture>`
      : ``
  }
</section>
<figcaption class="border__top padding__bottom--m padding__left--m padding__right--m padding__top--s radius__bl--s radius__br--s"><h3 class="color__type--base--ish">${
    item.name
  }</h3></figcaption>
</figure>
</a>
`;
};

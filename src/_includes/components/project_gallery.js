module.exports = function (item) {
  return `
<a href="/projects/${item.slug}" class="gallery__item border__all color__bg--contrast radius__s shadow" style="--brand: ${item.hue}">
  <figure>
    <section class="padding__left--s padding__right--s padding__top--s">
    <picture>
    <source
      media="(min-width: 1em)"
      srcset="${item.img}?h=400&w=640&fm=webp 400w, ${item.img}?h=200&w=320&fm=webp 100w"
      sizes="33.3vw"
      type="image/webp"
    />
    <img
      class="radius__tl--xs radius__tr--xs width__full"
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
      srcset="${item.imgDark}?h=400&w=640&fm=webp 400w, ${item.imgDark}?h=200&w=320&fm=webp 100w"
      sizes="33.3vw"
      type="image/webp"
    />
    <img
      class="radius__tl--xs radius__tr--xs width__full"
      loading="lazy"
      src="${item.imgDark}?h=200&w=320"
      srcset="${item.imgDark}?h=400&w=640 2x"
      alt="${item.name} featured image"
      height="200"
      width="320"
    />
  </picture>
    </section>
    <figcaption class="border__top padding__bottom--m padding__left--m padding__right--m padding__top--s radius__bl--s radius__br--s"><h3 class="color__type--base--ish">${item.name}</h3></figcaption>
  </figure>
</a>
`;
};

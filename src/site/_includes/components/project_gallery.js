module.exports = function (item) {
  return `
<a href="/projects/${item.slug}" class="gallery__item border__all color__bg--highlight--ghost color__border--highlight--light radius__m shadow">
  <figure>
    <picture>
    <source
      media="(min-width: 1em)"
      srcset="${item.img}?h=400&w=640&fm=webp 400w, ${item.img}?h=200&w=320&fm=webp 100w"
      sizes="33.3vw"
      type="image/webp"
    />
    <img
      class="radius__tl--m radius__tr--m width__full"
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
      class="radius__tl--m radius__tr--m width__full"
      loading="lazy"
      src="${item.imgDark}?h=200&w=320"
      srcset="${item.imgDark}?h=400&w=640 2x"
      alt="${item.name} featured image"
      height="200"
      width="320"
    />
  </picture>
    <figcaption class="border__top color__bg--contrast color__border--highlight--light padding__bottom--m padding__left--l padding__right--l padding__top--s radius__bl--m radius__br--m"><h3 class="color__type--highlight">${item.name}</h3></figcaption>
  </figure>
</a>
`;
};

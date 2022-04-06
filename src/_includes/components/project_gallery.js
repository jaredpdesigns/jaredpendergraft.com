module.exports = function (item) {
  return `
<a href="/projects/${item.slug}" class="gallery__item border__all color__bg--contrast radius__s shadow" style="--brand: ${item.hue}">
  <figure>
  <picture>
      <source
        type="image/avif"
        srcset="${item.img}?h=180&w=320&fm=avif 320w, ${item.img}?h=540&w=640&fm=avif 480w, ${item.img}?h=540&w=960&fm=avif 640w"
        sizes="(max-width: 480px) 100vw, 480px"
      />
      <source
        type="image/webp"
        srcset="${item.img}?h=180&w=320&fm=webp 320w, ${item.img}?h=360&w=640&fm=webp 480w, ${item.img}?h=540&w=960&fm=webp 640w"
        sizes="(max-width: 480px) 100vw, 480px"
      />
      <img
        class="radius__tl--xs radius__tr--xs width__full"
        srcset="${item.img}?h=180&w=320 320w, ${item.img}?h=360&w=640 480w, ${item.img}?h=540&w=960 640w"
        sizes="(max-width: 480px) 100vw, 480px"
        src="${item.img}?h=90&w=160"
        alt="${item.name} featured image"
        decoding="async"
        fetchpriority="low"
        height="180"
        width="320"
        style="aspect-ratio: 16/9;"
      />
  </picture>
  <figcaption class="border__top padding__bottom--m padding__left--m padding__right--m padding__top--s radius__bl--s radius__br--s"><h3 class="color__type--base--ish">${item.name}</h3></figcaption>
</figure>
</a>
`;
};

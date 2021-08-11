module.exports = function (item) {
  return `
<a href="/projects/${item.slug}" class="gallery__item">
  <figure>
    <picture>
    <source
      media="(min-width: 1em)"
      srcset="${item.img}?h=400&w=640&fm=webp 400w, ${item.img}?h=200&w=320&fm=webp 100w"
      sizes="33.3vw"
      type="image/webp"
    />
    <img
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
      loading="lazy"
      src="${item.imgDark}?h=200&w=320"
      srcset="${item.imgDark}?h=400&w=640 2x"
      alt="${item.name} featured image"
      height="200"
      width="320"
    />
  </picture>
    <figcaption><h3>${item.name}</h3></figcaption>
  </figure>
</a>
`;
};

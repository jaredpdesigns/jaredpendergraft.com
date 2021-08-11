module.exports = function (item) {
  return `
<figure class="grid__item">
  <picture>
    <source
      media="(min-width: 1em)"
      srcset="${item.img}?h=2560&w=2560&fm=webp 1400w, ${item.img}?h=1280&w=1280&fm=webp  1024w, ${item.img}?h=640&w=640&fm=webp 400w, ${item.img}?h=320&w=320&fm=webp 100w"
      sizes="33.3vw"
      type="image/webp"
    />
    <source
      media="(min-width: 35em)"
      srcset="${item.img}?h=2560&w=2560&fm=png 1400w, ${item.img}?h=1280&w=1280&fm=png  1024w"
      sizes="33.3vw" />
    <img
      loading="lazy"
      src="${item.img}?h=320&w=320&fm=png"
      srcset="${item.img}?h=640&w=640&fm=png 2x"
      alt="${item.title}"
      height="320"
      width="320"
    />
  </picture>
  <picture style="display: none">
    <source
      media="(min-width: 1em)"
      srcset="${item.imgDark}?h=2560&w=2560&fm=webp 1400w, ${item.imgDark}?h=1280&w=1280&fm=webp  1024w, ${item.imgDark}?h=640&w=640&fm=webp 400w, ${item.imgDark}?h=320&w=320&fm=webp 100w"
      sizes="33.3vw"
      type="image/webp"
    />
    <source
      media="(min-width: 35em)"
      srcset="${item.imgDark}?h=2560&w=2560&fm=png 1400w, ${item.imgDark}?h=1280&w=1280&fm=png  1024w"
      sizes="33.3vw" />
    <img
      loading="lazy"
      src="${item.imgDark}?h=320&w=320&fm=png"
      srcset="${item.imgDark}?h=640&w=64&fm=png0 2x"
      alt="${item.title}"
      height="320"
      width="320"
    />
  </picture>
</figure>
`;
};

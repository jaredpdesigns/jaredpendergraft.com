module.exports = function (item) {
  return `
<a href="${item.slug ? "/projects/" + item.slug : item.external}" ${
    item.slug ? "" : 'target="_blank" rel="noopener"'
  } class="grid__item ${item.featured ? "featured" : ""}">
  <figure>
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
        loading="lazy"
        src="${item.imgDark}?h=200&w=320"
        srcset="${item.imgDark}?h=400&w=640 2x"
        alt="${item.name} featured image"
        height="200"
        width="320"
      />
    </picture>
    <figcaption>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
    </figcaption>
  </figure>
</a>
`;
};

module.exports = function (item) {
  return `
<header class="project__header">
<section class="project__header--inner">
  <section>
    <h1>${item.name}</h1>
    <p>${item.description}</p>
    ${
      item.external
        ? `<p><a href="${item.external}" title="Follow me on Dribbble" target="_blank" rel="noopener">View Project<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M15 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V3.414L1.707 15.707a1 1 0 1 1-1.414-1.414L12.586 2H8a1 1 0 1 1 0-2h7z"></path></svg></a></p>`
        : ""
    }    
  </section>
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
  </figure>
  </section>
</header>
`;
};

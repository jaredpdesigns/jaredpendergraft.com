module.exports = function (item) {
  const Icon = require("./icon.js");
  return `
<header class="project__header padding__left--m padding__right--m width__xxl">
<section class="project__header--inner border__all flow__grid flow__align--v-stretch flow__grid--columns-fixed overflow__hidden radius__m">
<figure class="flow__grid flow__align--v-end padding__left--s padding__right--s padding__top--s">
    <picture>
    <source
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
    fetchpriority="high"
    height="200"
    width="320"
  />
    </picture>
  </figure>
  <section class="flow__self--center oomph__v--m padding__all--m">
    <h1>${item.name}</h1>
    <p class="type__size--l-l">${item.description}</p>
${
  item.external
    ? `<p><a class="flow__inline flow__align--v-center radius__xs type__weight--semibold" href="${
        item.external
      }" title="Visit ${
        item.name
      } website" target="_blank" rel="noopener">Visit Site${Icon(
        "external"
      )}</a></p>`
    : ``
}
${
  item.role
    ? `<footer class="oomph__v--s"><p class="color__type--base--mid type__tranform--uppercase type__weight--semibold">Role</p><p>${item.role
        .map((value) => `<code>${value}</code>`)
        .join("\n")}</p></footer>`
    : ``
}
  </section>
  </section>
</header>
`;
};

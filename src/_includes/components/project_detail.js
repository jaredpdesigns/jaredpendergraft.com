module.exports = function (item) {
  return `
<figure class="grid__item">
  <img
    class="width__full"
    loading="lazy"
    decoding="async"
    fetchpriority="low"
    src="${item.img}"
    alt="${item.title}"
    height="320"
    width="320"
    style="aspect-ratio: 1/1;"
  />
  ${
    item.imgDark
      ? `<img
  class="width__full"
  loading="lazy"
  decoding="async"
  fetchpriority="low"
  src="${item.imgDark}"
  alt="${item.title}"
  height="320"
  width="320"
  style="aspect-ratio: 1/1; display: none;"
/>`
      : ``
  }
</figure>
`;
};

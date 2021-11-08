module.exports = function (item) {
  return `
<figure class="grid__item">
  <img
    class="radius__m width__full"
    loading="lazy"
    src="${item.img}"
    alt="${item.title}"
    height="320"
    width="320"
  />
  <img
    class="radius__m width__full"
    loading="lazy"
    src="${item.imgDark}"
    alt="${item.title}"
    height="320"
    width="320"
    style="display: none"
  />
</figure>
`;
};

module.exports = function (item) {
  return `
<figure class="grid__item">
  <img
    loading="lazy"
    src="${item.img}"
    alt="${item.title}"
    height="320"
    width="320"
  />
  <img
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

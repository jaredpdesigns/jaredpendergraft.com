module.exports = function (item) {
  return `
<blockquote class="grid__item">
  <section class="grid__item--wrap">
    ${item.comment}
  </section>
  <footer>
    <h4>${item.author}</h4>
  </footer>
</blockquote>
`;
};

module.exports = function (item) {
  return `
<blockquote class="grid__item">
  <section class="grid__item--wrap">
    ${item.comment}
  </section>
  <footer>
    <p><strong>${item.author}</strong></p>
  </footer>
</blockquote>
`;
};

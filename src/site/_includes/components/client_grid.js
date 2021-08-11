module.exports = function (item) {
  return `
<a href="/clients/${item.type}/${item.slug}/" class="grid__item">
  <section>
    <h2>${item.title}</h2>
    <p>${item.client.name}</p>
  </section>
  <footer>
  <p>${item.type}</p>
  </footer>
</a>
`;
};

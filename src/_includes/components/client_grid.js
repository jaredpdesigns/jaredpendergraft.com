module.exports = function (item) {
  return `
<a href="/clients/${item.type}/${item.slug}/" class="grid__item border__all color__bg--highlight--ghost color__border--highlight--light radius__m type__align--center shadow">
  <section class="color__bg--contrast padding__all--m radius__tl--m radius__tr--m">
    <h2>${item.title}</h2>
    <p>${item.client.name}</p>
  </section>
  <footer class="border__top color__border--highlight--light padding__bottom--s padding__left--m padding__right--m padding__top--s">
  <p><code>${item.type}</code></p>
  </footer>
</a>
`;
};

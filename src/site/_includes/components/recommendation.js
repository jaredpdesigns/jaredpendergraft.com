module.exports = function (item) {
  return `
<blockquote class="padding__all--none radius__m shadow">
  <section class="oomph__v--m padding__bottom--m padding__left--l padding__right--l padding__top--m">
    ${item.comment}
  </section>
  <footer class="border__top color__border--highlight--light margin__top--none padding__all--m">
    <p class="color__type--base--semi">—<strong class="color__type--base--ish">${item.author}</strong></p>
  </footer>
</blockquote>
`;
};

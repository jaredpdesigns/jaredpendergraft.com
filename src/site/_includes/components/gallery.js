module.exports = function (content) {
  return `
<section class="gallery flow__grid margin__top--none padding__bottom--l padding__top--l">
  <section class="gallery__wrap flow__flex flow__align--v-start flow__gap--l">
    ${content}
  </section>
</section>
`;
};

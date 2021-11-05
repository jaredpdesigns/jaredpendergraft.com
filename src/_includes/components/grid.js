module.exports = function (content) {
  return `
<section class="grid flow__grid flow__align--v-start flow__gap--l flow__grid--columns-auto padding__all--l width__xl">
${content}
</section>
`;
};

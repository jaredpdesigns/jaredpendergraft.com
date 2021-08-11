module.exports = function (content, complex = false) {
  return `
<section class="${complex ? "grid grid--complex" : "grid"}">
${content}
</section>
`;
};

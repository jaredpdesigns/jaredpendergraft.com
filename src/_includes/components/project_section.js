module.exports = function (title) {
  return `
<header id="${title.toLowerCase().replace(" ", "-")}" class="project__section">
<p class="color__type--base--mid type__align--center type__tranform--uppercase type__weight--semibold">${title}</p>
</header>
`;
};

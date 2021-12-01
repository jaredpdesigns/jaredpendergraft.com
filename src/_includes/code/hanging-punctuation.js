let els = document.getElementsByTagName("article")[0].children;

for (let el of els) {
  switch (el.innerHTML.charAt(0)) {
    case `“`:
      el.classList.add("hung__double--fancy");
      break;
    case `"`:
      el.classList.add("hung__double");
      break;
    case `‘`:
      el.classList.add("hung__single--fancy");
      break;
    case `'`:
      el.classList.add("hung__single");
      break;
  }
}

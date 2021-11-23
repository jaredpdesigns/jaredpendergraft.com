const root = document.getElementsByTagName("html")[0];

function getTheme() {
  if (localStorage.getItem("theme") === null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
  root.setAttribute("data-theme", localStorage.getItem("theme"));
}

function setTheme() {
  if (root.getAttribute("data-theme") === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
  root.setAttribute("data-theme", localStorage.getItem("theme"));
}

function toggleColophon() {
  let colophon = document.getElementsByTagName("dialog")[0];
  colophon.toggleAttribute("open");
}

window.onload = () => {
  getTheme();
  root.classList.add("loaded");
};

function getTheme() {
  if (localStorage.getItem("theme") === null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("theme")
  );
}

function setTheme() {
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("theme")
  );
}

function toggleColophon() {
  let colophon = document.getElementsByTagName("dialog")[0];
  colophon.addEventListener("keydown", (e) => {
    if ((e.keyCode || e.which) === 27) {
      colophon.removeAttribute("open");
    }
  });
  colophon.toggleAttribute("open");
  colophon.focus();
}

window.onload = () => {
  getTheme();
  document.documentElement.classList.add("loaded");
};

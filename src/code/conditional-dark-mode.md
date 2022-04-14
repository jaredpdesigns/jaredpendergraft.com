---
title: Conditional Dark Mode • Code • Jared Pendergraft
description: A flexible approach to supporting dark mode in projects
img: https://jaredpendergraft.com/img/code/conditional-dark-mode.svg
layout: layouts/base.njk
class: code darkMode
tags:
- code
- CSS
- JavaScript
---

# Conditional Dark Mode

I love dark mode in projects and try and support it as often as I can. Forcing users to _experience_ dark mode however is not great. The approach I take on most projects is to first detect whether a user is using dark mode on their device and then enable that feature by adding an attribute to the root element of the page.

```js
function getTheme() {
	// First check if there is a preference already set
  
  if (localStorage.getItem("theme") === null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
  // Adds an attribute to the root-level element in the page, in  this case the `html` tag
  
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
}
```

After implementing the data-attribute you can access this value in your CSS like this:

```scss
:root[data-theme="dark"] {
  --color__hue--base: 218deg 100% 100%;
  --color__hue--contrast: 218deg 16% 12%;
  --color__hue--contrast--extra: 218deg 32% 4%;
  --shadow__color: var(--color__hue--contrast--extra);
  --shadow__value: 0.75;
}
```

***

## Provide An Override

After setting the theme by default it’s always a good idea to allow users to set their own preference if in fact they don’t want a dark theme experience. In my example, I would then append this function to a button click. Notice the <code>{% Icon 'contrast' %}</code> icon in the footer of this page.

```js
// This function is attached a button’s `onclick` event

function setTheme() {
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
}
```

***

## Remember Me

If you noticed in the code above, in addition to attaching a new data-attribute to the root, we are also storing the user’s preference inside a `localStorage` item—making it easy for the user to navigate through the rest of the site without _losing_ the value the previously enabled. 

> **Note:** if you wanna be  _extra user friendly_ you could switch out `localStorage` for `sessionStorage` so that their preference sticks around even if they close the page.
---
title: Dropdown Menu • Interfaces • Jared Pendergraft
component: Dropdown Menu
description: An exploration of a dropdown menu element
social: https://jaredpendergraft.com/img/interfaces/dropdown-menu.jpg
layout: interfaces.webc
tags:
  - interface
---

# Dropdown Menu

<code-block webc:nokeep>

<theme-wrap webc:nokeep>
  <get-component component="Dropdown Menu" webc:nokeep></get-component>
</theme-wrap>

```html
<details
  class="dropdownMenu dropdownMenuSelections flow__inline position__relative"
>
  <summary
    class="border__all color__bg--contrast color__border--base--light flow__inline flow__align--block-center flow__gap--s padding__inline--m radius__s"
  >
    <span class="type__size--m-l--fluid">Toppings</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      ></path>
    </svg>
  </summary>
  <section
    class="border__all color__bg--contrast--adaptive color__border--base--light flow__grid overflow__hidden position__absolute radius__s shadow"
  >
    <button
      class="selected border__bottom color__border--base--light color__type--base flow__flex flow__align--block-center flow__align--inline-between flow__gap--s padding__inline--m"
    >
      <span class="type__size--m-l--fluid">Cherries</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        ></path>
      </svg>
    </button>
    <button
      class="border__bottom color__border--base--light color__type--base flow__flex flow__align--block-center flow__align--inline-between flow__gap--s padding__inline--m"
    >
      <span class="type__size--m-l--fluid">Sprinkles</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        ></path>
      </svg>
    </button>
    <button
      class="border__bottom color__border--base--light color__type--base flow__flex flow__align--block-center flow__align--inline-between flow__gap--s padding__inline--m"
    >
      <span class="type__size--m-l--fluid">Whip Cream</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        ></path>
      </svg>
    </button>
  </section>
</details>
```

```css
.dropdownMenu {
  --elementHeight: var(--size__xl);

  > summary {
    block-size: var(--elementHeight);
    cursor: pointer;
    user-select: none;

    svg {
      color: var(--color__base--mid);
    }
  }

  &[open] > summary {
    border-color: var(--color__base--semi);
  }

  /* Bringing in sizing/stroke styling to CSS */
  svg {
    block-size: 1.625cap;
    stroke-width: 3;
  }

  > section {
    --block-end: calc(var(--size__xs) * -1);
    --inline-start: 50%;
    inline-size: 12.5rem;
    /* Centers the menu relative to the button */
    transform: translate(-50%, 100%);

    button {
      --outline__offset: calc(var(--size__xs) * -1);
      background: unset;
      block-size: var(--elementHeight);
      border-left: unset;
      border-right: unset;
      border-top: unset;
      text-align: unset;
      /* Baby transition */
      transition: background-color 0.375s ease-in;

      &:focus,
      &:hover {
        background-color: var(--color__highlight--ghost);
      }

      /* Last item is border-less */
      &:last-child {
        border-bottom: unset;
      }

      svg {
        color: var(--color__highlight);
        opacity: 0;
        /* Baby transition */
        transition: opacity 0.1875s ease-in;
      }

      &.selected svg {
        opacity: 1;
      }
    }
  }
}
```

```js
const queryDropdownMenus = () => {
  const dropdownMenus = document.querySelectorAll(".dropdownMenu");
  dropdownMenus.forEach((dropdownMenu) => {
    const dropdownMenuSummary = dropdownMenu.querySelector("summary");
    const dropdownMenuButtons = dropdownMenu.querySelectorAll("button");
    dropdownMenu.addEventListener("toggle", (e) => {
      // Focus on the first selected button
      const selectedButton = document.querySelector(".selected");
      selectedButton?.focus();

      // Only attach events IF the `details` is actually open
      if (dropdownMenu.open) {
        document.addEventListener(
          "click",
          (e) => {
            // Only toggle `open` if my click is outside the menu
            if (!dropdownMenu.contains(e.target)) {
              dropdownMenu.removeAttribute("open");
            }
          },
          false
        );

        document.addEventListener("keydown", (e) => {
          // Escape closes the menu
          if (e.key === "Escape") {
            dropdownMenu.removeAttribute("open");
          }

          // If I tab forward and reach the last element
          if (
            e.key === "Tab" &&
            !(e.shiftKey && e.key === "Tab") &&
            document.activeElement === [...dropdownMenuButtons].pop()
          ) {
            dropdownMenu.removeAttribute("open");
          }

          // If I tab backwards and reach the first element or am
          // currently focused on the `summary` element.
          if (
            e.shiftKey &&
            e.key === "Tab" &&
            (document.activeElement === [...dropdownMenuButtons].shift() ||
              document.activeElement === dropdownMenu.querySelector("summary"))
          ) {
            dropdownMenu.removeAttribute("open");
          }
        });
      } else {
        // Cleanup my listeners before the `toggle` event is
        document.removeEventListener("click", () => null);
        document.removeEventListener("keydown", () => null);
      }
    });
  });
};

const queryDropdownMenuSelections = () => {
  const dropdownMenus = document.querySelectorAll(
    ".dropdownMenuSelections, .dropdownMenuSelect"
  );
  dropdownMenus.forEach((dropdownMenu) => {
    const dropdownMenuButtons = dropdownMenu.querySelectorAll("button");

    // Toggles the clicked button to have the `.selected` class
    dropdownMenuButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("selected");
      });
    });
  });
};

// This function is is you want to implement a single selection
const queryDropdownMenuSelect = () => {
  const dropdownMenus = document.querySelectorAll(".dropdownMenuSelect");

  dropdownMenus.forEach((dropdownMenu) => {
    const dropdownMenuSummary = dropdownMenu.querySelector("summary");
    const dropdownMenuButtons = dropdownMenu.querySelectorAll("button");

    dropdownMenuButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Update the selection label
        const label = dropdownMenuSummary.querySelector("span");
        label.textContent = e.srcElement.innerText;

        // Remove all other `.selected` classes
        [...dropdownMenuButtons]
          .filter((item) => item !== e.currentTarget)
          .map((item) => item.classList.remove("selected"));

        // Close the dropdown
        dropdownMenu.removeAttribute("open");
      });
    });
  });
};
```

</code-block>

## Highlights

For this demo I utilized the `details` element primarily because you get the open/close paradigm of this type of control for free without having to manage state via Javascript. I also love the association that this is basically an accordion type of element. I’m also using the great [Feather](https://feathericons.com/) library for the icons throughout the demos.

I also find it really interesting that with this type of control you can put _whatever_ you want inside the menu and the overall behavior is maintained. For example, in this demo we are utilizing buttons to represent menu items and listening for a `click` event to make the SVG visible. You could easily reach a `checkbox` or `radio` or just as easily turn it into a link of anchor tags to provide a nav menu.

I was recently reminded of the awesomeness of the `cap` unit for sizing SVGs for icon use, to find a great balance for icons aligned to adjacent text. I am also setting the `stroke-width` for the SVG in the CSS to make it a bit easier to tweak:

```css
svg {
  block-size: 1.625cap;
  stroke-width: 3;
}
```

## Adding the Selected State

By adding a `click` event listener to the buttons in the menu, we can toggle the respected state:

```js
const dropdownMenu = document.querySelector(".dropdownMenu");
const dropdownMenuButtons = dropdownMenu.querySelectorAll("button");

dropdownMenuButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Remove selection from all the other buttons
    [...dropdownMenuButtons]
      .filter((item) => item !== e.currentTarget)
      .map((item) => item.classList.remove("selected"));
    // Only apply it to my current selection
    e.currentTarget.classList.toggle("selected");
  });
});
```

## Clicking Outside + Focus Events

I love that `details` has the ability to open/close the associated _hidden_ block of content (i.e. anything not in `summary`) when you click the summary, but using this element to display a menu has some associated expectations that don’t come for free and need to be supplied via Javascript, in particular:

- Clicking anywhere outside the menu itself should close the menu.
- Using my `tab` key should close the menu when I reach the end, or if I `shift+tab` when I tab out of the menu should close the menu.

```js
const dropdownMenu = document.querySelector(".dropdownMenu");
const dropdownMenuSummary = dropdownMenu.querySelector("summary");
const dropdownMenuButtons = dropdownMenu.querySelectorAll("button");

dropdownMenu.addEventListener("toggle", (e) => {
  // Focus on the first selected button
  const selectedButton = document.querySelector(".selected");
  selectedButton?.focus();

  // Only attach events IF the `details` is actually open
  if (dropdownMenu.open) {
    document.addEventListener(
      "click",
      (e) => {
        // Only toggle `open` if my click is outside the menu
        if (!dropdownMenu.contains(e.target)) {
          dropdownMenu.removeAttribute("open");
        }
      },
      false
    );

    document.addEventListener("keydown", (e) => {
      // Escape closes the menu
      if (e.key === "Escape") {
        dropdownMenu.removeAttribute("open");
      }

      // If I tab forward and reach the last element
      if (
        e.key === "Tab" &&
        !(e.shiftKey && e.key === "Tab") &&
        document.activeElement === [...dropdownMenuButtons].pop()
      ) {
        dropdownMenu.removeAttribute("open");
      }

      // If I tab backwards and reach the first element or am
      // currently focused on the `summary` element.
      if (
        e.shiftKey &&
        e.key === "Tab" &&
        (document.activeElement === [...dropdownMenuButtons].shift() ||
          document.activeElement === dropdownMenu.querySelector("summary"))
      ) {
        dropdownMenu.removeAttribute("open");
      }
    });
  } else {
    // Cleanup my listeners before the `toggle` event is
    document.removeEventListener("click", () => null);
    document.removeEventListener("keydown", () => null);
  }
});
```

## Alternates

<theme-wrap webc:nokeep>
  <dropdown-menu-alt-1 webc:nokeep></dropdown-menu-alt-1>
</theme-wrap>

Here’s an example of a list of links presented inside a Dropdown Menu.

<theme-wrap webc:nokeep>
  <dropdown-menu-alt-2 label="Ascending" :items="['Ascending', 'Descending']" webc:nokeep></dropdown-menu-alt-2>
</theme-wrap>

Here’s a more straight forward implementation of the initial demo, but behaves more like a `select` (i.e. making a single selection closes the menu).

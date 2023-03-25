---
title: Hanging Punctuation • Code • Jared Pendergraft
description: Enabling hanging punctuation with Javascript and CSS
img: https://jaredpendergraft.com/img/code/hanging-punctuation.jpg
layout: page-code.webc
pageClass: code hangingPunctuation
tags:
  - code
  - CSS
  - JavaScript
---

# “Hanging” Punctuation

I love beautifully typeset books, where small details like dialog between characters—often beginning with quotation marks—has a visual overhang so the first letter lines up with subsequent lines of text below in the paragraph. However, a lot of the finesse associated with that type of design is limited on the web—including hanging punctuation.

With a small query to auto tag the elements you’d like to style, you can achieve this in a fairly straightforward manner:

```js
const children = document.querySelector("article").children;
if (children) {
  for (let el of children) {
    // Targeting only the first character makes
    // this effect look more consistent
    switch (el.textContent.charAt(0)) {
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
}
```

Trying to keep the styling simple, I defaulted to indentation application for _non-fancy_ quotes, which are more narrow by default. Depending on which typefaces you’re using in your design, you may need to adjust the overall indentation. I added a dashed border on the left side of the main container to make it easier to see how indentation can “hang over” the edge of the design.

> **Note:** With my primary typeface, the indentation for both _fancy_ and _non-fancy_ quotes happens to be the same, but in my experiment with system typefaces they were not the same width.

```scss
// All of these values are very subjective,
// and should be adjusted based on visual preference
// and typeface use

.hung__double {
  text-indent: -0.75ch;
}
.hung__double--fancy {
  text-indent: -1ch;
}
.hung__single {
  text-indent: -0.375ch;
}
.hung__single--fancy {
  text-indent: -0.625ch;
}
```

---

## Examples

### Classes

"`.hung__double`"

“`.hung__double--fancy`”

'`.hung__single`'

‘`.hung__single--fancy`’

### Example Dialog

Calvin licked his lips. “Where are we going?”

“Up.” Charles continued his lecture. “On Camazotz we are all happy because we are all alike. Differences create problems. You know that, don’t you, dear sister?”

“No,” Meg said.

“Oh, yes, you do. You’ve seen at home how true it is. You know that you’re not happy at school. Because you’re different.”

“I’m different, and I’m happy,” Calvin said.

“But you pretend that you aren’t different.”

“I’m different, and I like being different.” Calvin’s voice was unnaturally loud.

“Maybe I don’t like being different,” Meg said, “but I don’t want to be like everybody else, either.”

—_A Wrinkle in Time_, by Madeleine L’Engel

<style>
  .hanging-punctuation article {
    position: relative;
  }
  .hanging-punctuation article:before {
    block-size: 100%;
    border-left: var(--size__xxs) dashed var(--color__base--light);
    content: "";
    display: block;
    left: var(--size__l);
    position: absolute;
  }
  .hung__double {
    text-indent: -0.75ch;
  }
  .hung__double--fancy {
    text-indent: -0.75ch;
  }
  .hung__single {
    text-indent: -0.375ch;
  }
  .hung__single--fancy {
    text-indent: -0.375ch;
  }
</style>
<script>
  setTimeout(() => {
    const children = document.querySelector("article").children;
    if (children) {
      for (let el of children) {
        switch (el.textContent.charAt(0)) {
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
    }
  }, 100);
</script>

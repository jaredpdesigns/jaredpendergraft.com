---
title: Segmented Controller • Interfaces • Jared Pendergraft
component: Segmented Controller
description: An exploration of a segmented controller element
social: https://jaredpendergraft.com/img/interfaces/segmented-controller.jpg
layout: interfaces.webc
tags:
  - interface
---

# Segmented Controller

<code-block webc:nokeep>

<theme-wrap webc:nokeep>
  <get-component component="Segmented Controller" webc:nokeep></get-component>
</theme-wrap>

```html
<fieldset
  class="segmentedController color__bg--base--light flow__inline flow__align--block-center padding__xxs radius__xs"
>
  <label
    for="coffee"
    class="color__type--base--mid flow__align--block-center"
  >
    <input
      type="radio"
      id="coffee"
      name="drink"
      value="Coffee"
      checked="true"
      class="radius__xs"
    />
    <span
      class="flow__inline flow__align--block-center flow__align--inline-center padding__inline--m type__size--m-l--fluid"
      >Coffee</span
    >
  </label>
  <label
    for="tea"
    class="color__type--base--mid flow__align--block-center"
  >
    <input
      type="radio"
      id="tea"
      name="drink"
      value="Tea"
      class="radius__xs"
    />
    <span
      class="flow__inline flow__align--block-center flow__align--inline-center padding__inline--m"
      >Tea</span
    >
  </label>
  <label
    for="kombucha"
    class="color__type--base--mid flow__align--block-center"
  >
    <input
      type="radio"
      id="kombucha"
      name="drink"
      value="Kombucha"
      class="radius__xs"
    />
    <span
      class="flow__inline flow__align--block-center flow__align--inline-center padding__inline--m"
      >Kombucha</span
    >
  </label>
</fieldset>
```

```css
.segmentedController {
  /* Height control */
  --element__height: var(--size__xl);

  /* Fixes height accommodating for border */
  block-size: calc(var(--element__height) + (var(--size__xxs) * 2));

  label {
    block-size: var(--element__height);
    display: grid;
    justify-items: stretch;
    /* If `--min__size` is defined use that, otherwise set it to 0 */
    min-inline-size: var(--min__size, 0);

    /* Grid pile FTW! */
    > * {
      cursor: pointer;
      grid-area: 1/1;
    }

    > input {
      --outline__offset: calc(var(--size__xs) * -1);
      appearance: none;
      block-size: var(--element__height);
    }

    > span {
      block-size: calc(var(--element__height) - (var(--size__s)));
      border-left: 0.0625rem solid var(--color__base--semi);
    }

    &:has(input:checked) {
      background-color: var(--color__contrast--adaptive);
      border-radius: var(--size__xs);
      color: var(--color__base);
    }

    /* Hide the border if it’s the first item or adjacent to selected */
    &:has(input:checked),
    &:has(input:checked) + *,
    &:first-child {
      > span {
        border-color: transparent;
      }
    }
  }
}
```

```js
const querySegmentedControllers = () => {
  // Find all the segmentedControllers
  const segmentedControllers = document.querySelectorAll(
    ".segmentedController"
  );
  // and iterate over them
  segmentedControllers.forEach((segmentedController) => {
    // Find all the labels
    const labels = segmentedController.querySelectorAll("label");
    // Measure their widths
    const labelWidths = [...labels].map((label) =>
      Number(label.getBoundingClientRect().width)
    );
    // Find largest width, round it, and convert it to REMs
    const largestLabelWidthAsRem =
      Math.round(Math.max(...labelWidths)) / 16 + "rem";

    // Lastly apply the value as a CSS variable for the component to consume
    segmentedController.style = `--min__size: ${largestLabelWidthAsRem}`;
  });
};
```

</code-block>

## Highlights

It's an interesting idea to utilize a radio button to represent one of a possible number of options. Philsophically a `segmentedController` is really a `radiogroup`, so why not utilize the features of a radio button to limit users to choose only one possible item at a time?

In this exploration I opted to use the pattern of a `label` holding both an `input` and a `span` (to represent the label). Each item in the `fieldset` represent a single possible choice. It's also a plus to be able to utilze the “I can click anywhere” on the label to trigger a selection.

> **Tip:** Another really cool feature of using radio buttons is native focus-trapping (in Chrome at least), where if you `focus` into the first radio button, then use either the left/right or up/down arrow keys, you can cycle through the selection options.

Using the wonderful “grid pile” technique, we can stack the `input` and `span` on top of eachother, keeping the `focus` functionality of the `input` without it having to _look_ like an input.

```css
label {
  > * {
    grid-area: 1/1;
  }

  > input {
    appearance: none;
  }
}
```

## Setting a Minimum Width

In this demo, it would be a little weird if the word “tea” was only as wide as the word, sometimes it feels better to set a minimum width for items so things feel balanced, I opted to utilize JavaScript for this. By querying all of the labels, we can then measure their widths and return the widest one using `Math.round`:

```js
// Find all the labels
const labels = segmentedController.querySelectorAll("label");
// Measure their widths
const labelWidths = [...labels].map((label) =>
  Number(label.getBoundingClientRect().width)
);
// Find largest width, round it, and convert it to REMs
const largestLabelWidthAsRem =
  Math.round(Math.max(...labelWidths)) / 16 + "rem";

// Lastly apply the value as a CSS variable for the component to consume
segmentedController.style = `--min__size: ${largestLabelWidthAsRem}`;
```

## Alternates

<theme-wrap webc:nokeep>
  <segmented-controller-alt-1 webc:nokeep></segmented-controller-alt-1>
</theme-wrap>

You could easily create a version of this component that behaved more like other common UI elements like a text-alignment selection, using only icons.

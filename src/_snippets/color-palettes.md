---
title: Color Palettes
categories: css
layout: snippet
class: snippets
---

A process I’ve found a lot of success with when deriving color palettes for the web is to define a `$color-base` and `$color-highlight` value and letting SASS do the heavy-lifting to determine appropriate HEX values.

Using a simple mix function, you can either tint(lighten) or shade(darken) colors by adding white or black to the base color using a specific percentage. The only real trick is figuring out what to name each step in your scale.

#### Variables
``` scss
$color-base: #4E5250;
$color-highlight: #8CADA2;
$color-luma: #FFF;

@function tint($color, $percent) { @return mix(#fff, $color, $percent); }
@function shade($color, $percent) { @return mix(#000, $color, $percent); }

$color-base-dark: shade($color-base,31.25%);
$color-base-ish: tint($color-base,25%);
$color-base-mid: tint($color-base,50%);
$color-base-light: tint($color-base,75%);
$color-base-ghost: tint($color-base,95%);

$color-highlight-dark: shade($color-highlight,10%);
$color-highlight-ish: tint($color-highlight,25%);
$color-highlight-mid: tint($color-highlight,50%);
$color-highlight-light: tint($color-highlight,75%);
$color-highlight-ghost: tint($color-highlight,95%);

$color-luma-ish-o: rgba($color-luma,0.75);
$color-luma-mid-o: rgba($color-luma,0.5);
$color-luma-light-o: rgba($color-luma,0.25);
$color-luma-ghost-o: rgba($color-luma,0.10);
```

I also like to throw an opacity scale for white values since that’s the best way to actually vary the tone of white—especially on dark backgrounds.

#### In Use

``` scss
.btn {
  border: $border $color-highlight-mid;
  background-color: $color-luma;
  color: $color-highlight;
  &:hover { border-color: $color-highlight-ish; }
}
```
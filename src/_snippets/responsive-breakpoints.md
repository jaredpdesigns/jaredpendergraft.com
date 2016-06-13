---
title: Responsive Breakpoints
categories: css
layout: snippet
class: snippets
---

I rely on a set of widths related to common device sizes at enough breakpoints that catch most issues with layout adjustments. With the exception of `bp(xs)`, I opt for `min-width` to build upon mobile-first selector inheritance.

My `em` values relate to common sizes like 768px (current iPad portrait width), converted to em (768/16) and then minus 1em to catch a broader amount of device widths.

#### Mixin

``` scss
@mixin bp($point) {
  @if $point == xs { @media (min-width: 1em) and (max-width: 46em) { @content; } }
  @else if $point == xsl { @media (min-width: 29em)  { @content; } }
  @else if $point == s { @media (min-width: 47em)  { @content; } }
  @else if $point == m { @media (min-width: 63em)  { @content; } }
  @else if $point == l { @media (min-width: 79em)  { @content; } }
  @else if $point == ml { @media (min-width: 89em)  { @content; } }
  @else if $point == xl { @media (min-width: 99em)  { @content; } }
  @else if $point == xxl { @media (min-width: 101em) { @content; } }
}
```

#### In Use

``` scss
@mixin legible {
  @include bp(ml) {
    max-width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
  @include bp(xl) { max-width: 62.5%; }
}
```
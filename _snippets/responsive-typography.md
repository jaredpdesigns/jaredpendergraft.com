---
title: Responsive Typography
categories: css
layout: snippet
class: snippets
---

Variables allude to the type scale you have in mind for your project, the numbers are unit-less, but refer to a value you can easily pull from a design application (points or pixels).

#### Variables
``` css
$type-xs: 14;
$type-s: 18;
$type-m: 20;
$type-ml: 22;
$type-l: 24;
$type-xl: 27;
$type-xxl: 32;
$type-xxxl: 40;
$type-baseline: 24;
```

The initial `type` mixin converts the variable number to <abbr title="Relative Em">REM</abbr>s and creates a baseline rhythm dependent on a desired ideal `line-height` — in my case I’m using 24px or 1.5em. You can easily tweak this value depending on how visually close your type appears at various sizes.

I like to scale-down or scale-up type sizes depending on the screen size, this is easily done by passing a breakpoint mixin to the core type size mixin as seen below.

#### Mixin
``` scss
@mixin type($px,$lh: 1.5) {
  font-size: ($px/16)+rem;
  line-height: ($lh*$type-baseline)/($px);
}
@mixin type-xs {
  @include type($type-xs);
  @include bp(xs) { @include type($type-xs,1); }
  @include bp(xl) { @include type($type-s); }
}
@mixin type-s {
  @include type($type-s);
  @include bp(xs) { @include type($type-xs); }
  @include bp(xl) { @include type($type-m); }
}
@mixin type-m {
  @include type($type-m);
  @include bp(xs) { @include type($type-s); }
  @include bp(xl) { @include type($type-ml); }
}
@mixin type-ml {
  @include type($type-ml);
  @include bp(xs) { @include type($type-m); }
  @include bp(xl) { @include type($type-l); }
}
@mixin type-l {
  @include type($type-l);
  @include bp(xs) { @include type($type-ml) }
  @include bp(xl) { @include type($type-xl); }
}
@mixin type-xl {
  @include type($type-xl);
  @include bp(xs) { @include type($type-l,1.25); }
  @include bp(xl) { @include type($type-xxl); }
}
@mixin type-xxl {
  @include type($type-xxl);
  @include bp(xs) { @include type($type-xl); }
  @include bp(xl) { @include type($type-xxxl,2); }
}
```

Because we define breakpoint adjustments for overall type size within the above mixins, we don't have touch our core typographic tags outside of setting our initial value.

#### In Use

``` scss
h1 { @include type-xxl; }
h2 { @include type-xl; }
h3 { @include type-l; }
p, h4, li { @include type-m; }
h5 { @include type-s; }
```
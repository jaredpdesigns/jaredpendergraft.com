---
title: Color Systems • Code • Jared Pendergraft
description: A simple approach to HSL color systems
img: https://jaredpendergraft.com/img/code/color-systems.svg
layout: layouts/base.njk
class: code colorSystems
tags:
- code
- CSS
---

# Color Systems

I’ve explored color in a lot of ways in different projects from static HEX values to SCSS-mixing `tint($colorValue, 25%)` to add values of white or black with functions:

```scss
// Make a color darker by adding black

@function shade($color, $percent) {
  @return mix(black, $color, $percent);
}

// Make a color lighter by adding white

@function tint($color, $percent) {
  @return mix(white, $color, $percent);
}
```

However, something’s always rubbed me the wrong way with these methods, specifically the lack of flexibility to adjust colors without having to process a number of color variations again and again.

Recently, HSL has really taken off and I’m happy to report on a system I’m rather pleased with. I’m currently using this structure in [Pasta](https://pasta.jaredpendergraft.com)—you should check that project out if you haven’t seen it yet!

***

## Structure

The basic structure of making this system work is to define hues which we’ll eventually process into HSL strings using different opacity values. The biggest benefit to this system is that if you support dark mode in your projects you can easily flip the hue value without having to re-map  variables.

```scss
:root {
  --color__hue--base: 218deg 24% 24%;
  --color__hue--highlight: 158deg 32% 38%;
  --color__hue--contrast: 218deg 100% 100%;
  --color__hue--contrast--extra: 218deg 48% 12%;
}
```

After you set-up your basic hues, it’s time to figure out how many _variations_ you want of that color in your project. In my experience providing opacity scales for `base` and `highlight` colors usually is enough.

In my example I sort of do double-work by defining hue values for `contrast` and `contrast--extra` where I could simply create a standalone value for `--color__contrast` without also defining the hue, but my thought was always to leave those values open for opacity scales later.

```scss
:root {
  --color__hue--base: 218deg 24% 24%;
  --color__hue--highlight: 158deg 32% 38%;
  --color__hue--contrast: 218deg 100% 100%;
  --color__hue--contrast--extra: 218deg 48% 12%;
  
  // By wrapping the hue value in an HSL function, we are affirming the model is HSL
  
  --color__base: hsl(var(--color__hue--base));
  
  // This also allows easy transparency, without modifying the core hue variable
  
  --color__base--ish: hsl(var(--color__hue--base) / 0.75);
  --color__base--mid: hsl(var(--color__hue--base) / 0.625);
  --color__base--semi: hsl(var(--color__hue--base) / 0.25);
  --color__base--light: hsl(var(--color__hue--base) / 0.125);
  --color__base--ghost: hsl(var(--color__hue--base) / 0.0625);
  --color__highlight: hsl(var(--color__hue--highlight));
  --color__highlight--ish: hsl(var(--color__hue--highlight) / 0.75);
  --color__highlight--mid: hsl(var(--color__hue--highlight) / 0.625);
  --color__highlight--semi: hsl(var(--color__hue--highlight) / 0.25);
  --color__highlight--light: hsl(var(--color__hue--highlight) / 0.125);
  --color__highlight--ghost: hsl(var(--color__hue--highlight) / 0.0625);
  --color__contrast: hsl(var(--color__hue--contrast));
  --color__contrast--extra: hsl(var(--color__hue--contrast--extra));
}
```

> **Note:** I came up with the color naming scale of `ish, mid, semi, light, ghost` but do whatever suits your project. In the above code by passing a value of ` / 0.75` to the end of your HSL declaration you are saying this color should have an opacity of that value. I made my opacity values the same for both `base` and `highlight` but if you have a particularly bright `highlight` color you may want to adjust the amount of opacity you apply.

***

## Dark Mode Support

As noted earlier, one of the best parts of this system is [dark mode](/code/conditional-dark-mode) support is effortless by simply re-defining the hue values for a few values:

```scss
:root {
  @media (prefers-color-scheme: dark) {
    // Bumping the lightness value to 100% effectively makes this white
    --color__hue--base: 218deg 100% 100%;
    --color__hue--contrast: 218deg 32% 12%;
    --color__hue--contrast--extra: 218deg 32% 8%;
  }
}
```

> **Note:** Because I’m making my `contrast` variable a dark color, it’s necessary to make `contrast--extra` darker, depending on how _dark_ you go you may not need to restructure this.
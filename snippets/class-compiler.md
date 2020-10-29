An easy way to use the power of SCSS arrays and auto-generate a bunch of utility classes throughout your project. You can access one of the above classes by using the class `color__bg--base` for example.

``` scss
// Variables
$colors: (
  base: hsl(218, 24%, 24%),
  base--mid: hsl(218, 12%, 48%),
  base--light: hsl(218, 12%, 88%),
  base--ghost: hsl(218, 12%, 92%),
  brand: hsl(158, 32%, 38%),
  contrast: #ffffff,
  secondary: hsl(48, 12%, 96%),
);

$directions: (bottom, left, right, top);

$sizes: (
  xxs: rem(1),
  xs: rem(4),
  s: rem(8),
  m: rem(16),
  l: rem(32),
  xl: rem(40),
  xxl: rem(48),
  xxxl: rem(64),
);

$type__sizes: (
  xxs: rem(12),
  xs: rem(14),
  s: rem(16),
  m: rem(18),
  ml: rem(22),
  l: rem(24),
  xl: rem(28),
  xxl: rem(40),
  xxxl: rem(48),
);

$type__lineheights: (
  xs: rem(12),
  s: rem(16),
  m: rem(24),
  l: rem(32),
  xl: rem(40),
  xxl: rem(48),
  xxxl: rem(56),
);

$type__families: (
  body: (
    sans-serif,
  ),
  display: (
    sans-serif,
  ),
  mono: (
    monospace,
  ),
);

$widths: (
  xxs: rem(160),
  xs: rem(240),
  s: rem(320),
  m: rem(480),
  ml: rem(640),
  l: rem(960),
  xl: rem(1280),
  xxl: rem(1680),
  xxxl: rem(2432),
);

// Class Compilers
@each $colorName, $colorValue in $colors {
  .color__bg--#{$colorName} {
    background-color: var(--color__#{$colorName});
  }
  .color__border--#{$colorName} {
    border-color: var(--color__#{$colorName});
  }
  .color__type--#{$colorName} {
    color: var(--color__#{$colorName});
  }
}

@each $directionKey, $value in $directions {
  @each $sizeKey, $value in $sizes {
    .margin__#{$directionKey}--#{$sizeKey} {
      margin-#{$directionKey}: var(--size__#{$sizeKey});
    }
    .padding__#{$directionKey}--#{$sizeKey} {
      padding-#{$directionKey}: var(--size__#{$sizeKey});
    }
  }
}

@each $sizeKey, $value in $sizes {
  .margin__all--#{$sizeKey} {
    margin: var(--size__#{$sizeKey});
  }
  .oomph__h--#{$sizeKey} > * + *:not([class*="margin"]) {
    margin-left: var(--size__#{$sizeKey});
  }
  .oomph__v--#{$sizeKey} > * + *:not([class*="margin"]) {
    margin-top: var(--size__#{$sizeKey});
  }
  .padding__all--#{$sizeKey} {
    padding: var(--size__#{$sizeKey});
  }
  .radius--#{$sizeKey} {
    border-radius: var(--size__#{$sizeKey});
    overflow: hidden;
  }
  .radius__bl--#{$sizeKey} {
    border-bottom-left-radius: var(--size__#{$sizeKey});
    overflow: hidden;
  }
  .radius__br--#{$sizeKey} {
    border-bottom-right-radius: var(--size__#{$sizeKey});
    overflow: hidden;
  }
  .radius__tl--#{$sizeKey} {
    border-top-left-radius: var(--size__#{$sizeKey});
    overflow: hidden;
  }
  .radius__tr--#{$sizeKey} {
    border-top-right-radius: var(--size__#{$sizeKey});
    overflow: hidden;
  }
}

@each $type-family, $value in $type__families {
  .type__family--#{$type-family} {
    font-family: $value;
  }
}

@each $sizeKey, $value in $type__sizes {
  @each $lineheightKey, $value in $type__lineheights {
    .type__size--#{$sizeKey}-#{$lineheightKey} {
      font-size: var(--typeSize__#{$sizeKey});
      line-height: var(--typeLineheight__#{$lineheightKey});
    }
  }
}

@each $width, $value in $widths {
  .width__#{$width} {
    margin-left: auto;
    margin-right: auto;
    max-width: var(--width__#{$width});
    width: 100%;
  }
}
```
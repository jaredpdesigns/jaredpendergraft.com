`pre`
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
```
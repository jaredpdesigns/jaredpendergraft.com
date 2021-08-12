---
title: Type Tester • Jared Pendergraft
description: A playground for testing out new typefaces
img: https://jaredpendergraft.com/img/social.jpg
layout: layouts/base.njk
class: type
---

`h1`

# Headline 1

`h2`

## Headline 2

`h3`

### Headline 3

`h4`

#### Headline 4

`h5`

##### Headline 5

***

`p`

The *quick* [brown fox](https://en.wikipedia.org/wiki/The_quick_brown_fox_jumps_over_the_lazy_dog) jumps over the **lazy dog**. But has anyone asked *why*? What motivates the fox—and what makes the dog so lazy—or is the dog simply exhausted?

Let us investigate foxes and their habits to dive a little deeper, shall we? Foxes are traditionally predatory creatures, whereas dogs have long been domesticated.

***

`ul`

- Item #1
	- Nested Item #1
	- Nested Item #2
		- Nested-Nested Item #1
		- Nested-Nested Item #2
- Item #2
- Item #3
- Item #4

***

`ol`

1. Item #1
	1. Nested Item #1
	2. Nested Item #2
		1. Nested-Nested Item #1
		2. Nested-Nested Item #2
2. Item #2
3. Item #3
4. Item #4

***

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
    background-color: var(--color__#{$colorName}) !important;
  }
  .color__border--#{$colorName} {
    border-color: var(--color__#{$colorName});
  }
  .color__type--#{$colorName} {
    color: var(--color__#{$colorName});
  }
}
```

``` javascript
const arr = [
  { title: "Cool Video", description: "Really really cool video" },
  {
    title: "Regular Video",
    description:
      "Really really regular, standard video without anything interesting"
  }
];

const searchTerm = "cool";

function findInObject() {
  return arr.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
console.log(findInObject());

// [{title: "Cool Video", description: "Really really cool video"}]
```

***

`glyphs`

A B C D E F G H I J K L M N O P Q R S T U V W X Y Z Æ Ǽ Á Ă Â Ä À Ā Ą Å Ǻ Ã Ć Č Ç Ĉ Ċ Ď Đ É Ĕ Ě Ê Ë Ė È Ē Ŋ Ę Ð Ğ Ĝ Ġ Ħ Ĥ I J Í Ĭ Î Ï İ Ì Ī Į Ĩ Ĵ Ĺ Ľ L Ł Ń Ň Ñ Œ Ó Ŏ Ô Ö Ò Ő Ō Ø Ǿ Õ Ŕ Ř Ś Š Ş Ŝ Ŧ Ť Þ Ú Ŭ Û Ü Ù Ű Ū Ų Ů Ũ Ẃ Ŵ Ẅ Ẁ Ý Ŷ Ÿ Ź Ž Ż a b c d e f g h i j k l m n o p q r s t u v w x y z á ă â ä æ ǽ à ā ą å ǻ ã ć č ç ĉ ċ ď đ ı é ĕ ě ê ë ė è ē ŋ ę ð ğ ĝ ġ ß ħ ĥ í ĭ î ï ì i j ī į ĩ ĵ ĸ ĺ ľ l · ł ń ʼ n ň ñ ó ŏ ô ö œ ò ő ō ø ǿ õ ŕ ř ś š ş ŝ ŧ ť þ ú ŭ û ü ù ű ū ų ů ũ ẃ ŵ ẅ ẁ ý ŷ ÿ ź ž ż 0 1 2 3 4 5 6 7 8 9 $ £ ¥ € . , : ; … · • & ! ¡ ? ¿ “ ” ‘ ’ « » ‹ › - – — / / ( ) [ ] { } † ‡ ^ ~ ¶ § @ © ® ™ * ¢ # % ‰ + − < > = × ÷ ← ↑ → ↓
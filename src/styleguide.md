---
layout: page
description: A styleguide, silly.
class: styleguide
social: assets/img/social/social-styleguide.jpg
---

***

### Typographic Elements

***

`<hl>`

# Headline 1

`<h2>`

## Headline 2

`<h3>`

### Headline 3

`<h4>`

#### Headline 4

`<h5>`

##### Headline 5

`<p>`

Aenean lacinia *bibendum nulla sed consectetur*. **Nullam I’d dolor I’d nibh ultricies** vehicula ut I’d elit. [An inline link](#), <abbr>HTML</abbr> & <abbr>CSS</abbr> Ligatures anyone? official flourishing figurines. Dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod.

***

### Lists

***

`<ul>`

- Unordered item 1
- Unordered item 2
- Unordered item 3

`<ol>`

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3

***

### Code Samples

***

Let’s add `.this` and `.that` to our `<h1>` tag.

``` css
.this { font-size: 4.5rem; }
.that { color: $super-sweet; }
```

``` html
<h1 class="this">Oh <span class="that">Yeah</span></h1>
```

``` js
// Lazy Loading
$(document).ready(function() {
  $('.lazy').unveil(24,function() {
    $(this).load(function() { $(this).addClass('lazy--loaded'); } );
  });
});
```

***

### Colors

***

> <span class="color"><span class="color__bg--base"></span> `.color__bg--base`</span>
<span class="color"><span class="color__bg--base-dark"></span> `.color__bg--base-dark`</span>
<span class="color"><span class="color__bg--base-75"></span> `.color__bg--base-75`</span>
<span class="color"><span class="color__bg--base-62"></span> `.color__bg--base-62`</span>
<span class="color"><span class="color__bg--base-50"></span> `.color__bg--base-50`</span>
<span class="color"><span class="color__bg--base-38"></span> `.color__bg--base-38`</span>
<span class="color"><span class="color__bg--base-25"></span> `.color__bg--base-25`</span>
<span class="color"><span class="color__bg--base-12"></span> `.color__bg--base-12`</span>
<span class="color"><span class="color__bg--base-5"></span> `.color__bg--base-5`</span>

> <span class="color"><span class="color__bg--highlight"></span> `.color__bg--highlight`</span>
<span class="color"><span class="color__bg--highlight-dark"></span> `.color__bg--highlight-dark`</span>
<span class="color"><span class="color__bg--highlight-75"></span> `.color__bg--highlight-75`</span>
<span class="color"><span class="color__bg--highlight-62"></span> `.color__bg--highlight-62`</span>
<span class="color"><span class="color__bg--highlight-50"></span> `.color__bg--highlight-50`</span>
<span class="color"><span class="color__bg--highlight-38"></span> `.color__bg--highlight-38`</span>
<span class="color"><span class="color__bg--highlight-25"></span> `.color__bg--highlight-25`</span>
<span class="color"><span class="color__bg--highlight-12"></span> `.color__bg--highlight-12`</span>
<span class="color"><span class="color__bg--highlight-5"></span> `.color__bg--highlight-5`</span>
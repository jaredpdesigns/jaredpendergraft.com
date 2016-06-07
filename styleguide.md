---
layout: page
description: A styleguide, silly.
class: styleguide
social: assets/img/social/styleguide-social.jpg
---

***

### Typographic Elements

***

# h1 tag

## h2 tag

### h3 tag

#### h4 tag

##### h5 tag

p tag - Aenean lacinia *bibendum nulla sed consectetur*. **Nullam I’d dolor I’d nibh ultricies** vehicula ut I’d elit. [An inline link](#), <abbr>HTML</abbr> & <abbr>CSS</abbr> Ligatures anyone? official flourishing figurines. Dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod.

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

- <span class="color__bg--base"></span> `.base`
- <span class="color__bg--base-dark"></span> `.base-dark`
- <span class="color__bg--base-ish"></span> `.base-ish`
- <span class="color__bg--base-mid"></span> `.base-mid`
- <span class="color__bg--base-light"></span> `.base-light`
- <span class="color__bg--base-ghost"></span> `.base-ghost`
- <span class="color__bg--highlight"></span> `.highlight`
- <span class="color__bg--highlight-dark"></span> `.highlight-dark`
- <span class="color__bg--highlight-ish"></span> `.highlight-ish`
- <span class="color__bg--highlight-mid"></span> `.highlight-mid`
- <span class="color__bg--highlight-light"></span> `.highlight-light`
- <span class="color__bg--highlight-ghost"></span> `.highlight-ghost`
- <span class="color__bg--luma"></span> `.luma`
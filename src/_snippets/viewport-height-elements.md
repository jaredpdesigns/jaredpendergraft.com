---
title: Viewport-Height Elements
categories: js
layout: snippet
class: snippets
---

Full-height, full-bleed images are all the rage right now on the inter-webs, here’s a handy snippet to make it really easy, and let the browser handle the height for you. I also set-up a listener that if a user resizes their window the height is recalculated.

``` js
var Height = $(window).height();
$('.full-height').css({'min-height': Height});

$(window).resize(function() {
  var Height = $(window).height();  
  $('.full-height').css({'min-height': Height });
});
```

#### Update

This can more easily be achieved using `vh` (viewport height) units in CSS for browsers that support it.

```css
.full-height {
  min-height: 100vh;
}
```

Another neat thing about this is you can totally adapt for fixed-position headers (providing you know that size).

```css
.full-height {
  min-height: calc(100vh - 3.75rem);
}
```
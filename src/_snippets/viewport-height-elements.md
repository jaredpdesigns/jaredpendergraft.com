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
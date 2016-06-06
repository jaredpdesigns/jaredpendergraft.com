---
---

{% include_relative _partials/ga.js %}
{% include_relative _partials/jquery.unveil.js %}

$(document).ready(function() {
  $('.lazy').unveil(24,function() {
    $(this).load(function() { $(this).addClass('lazy--loaded'); } );
  });
});

{% include_relative _partials/autopager.js %}

$.autopager({
  link: '.next',
  content: '.tumblr-holder'
});
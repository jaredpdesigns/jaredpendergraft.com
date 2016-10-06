---
---

{% include_relative _partials/ga.js %}

{% include_relative _partials/jquery.unveil.js %}

$(document).ready(function() {
  $('.lazy').unveil(240,function() {
    $(this).load(function() {
      $(this).parent().addClass('loaded');
    } );
  });
});
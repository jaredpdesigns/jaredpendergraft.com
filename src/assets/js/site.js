---
---

{% include_relative _partials/ga.js %}
{% include_relative _partials/unveil.js %}

$(document).ready(function() {
  $('.lazy').unveil(240,function() {
    $(this).load(function() {
      $(this).parent().addClass('loaded');
    } );
  });
});

{% include_relative _partials/stayInWebApp.js %}

$(function() {
  $.stayInWebApp();
});
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

function setNight() {
  if(sessionStorage.getItem('theme')) {
    sessionStorage.clear();
  } else {
    sessionStorage.setItem('theme', 'dark');
  }
}

$('.day-night').click(function () {
  $(this).toggleClass('is-night');
  $('html').toggleClass('dark');
  setNight();
});

//$(document).ready(function() {
//var currentDate = new Date();
//var currentHour = currentDate.getHours();
//var theme = sessionStorage.getItem('theme');
//if(currentHour >= 19 && currentHour <= 23) {
//$('html').addClass('dark');
//$('.day-night').addClass('is-night');
//} else if(sessionStorage.getItem('theme')) {
//$('html').addClass(theme);
//$('.day-night').addClass('is-night');
//} else {
//$('html').removeClass('dark');
//$('.day-night').removeClass('is-night');
//}
//});

{% include_relative _partials/autopager.js %}

$.autopager({
  link: '.next',
  content: '.tumblr-holder'
});
<template>
  <svg class="deviceTablet" role="img" :aria-label="alt" xmlns="http://www.w3.org/2000/svg" :width="968" :height="1290" viewBox="0 0 968 1290" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>{{ alt }}</title>
    <g fill="none" fill-rule="evenodd">
      <path fill="var(--contrast)" d="M42.002 0C18.805 0 0 18.806 0 41.99v1174.02C0 1239.2 18.794 1258 42.002 1258h883.996c23.197 0 42.002-18.806 42.002-41.99V41.99C968 18.8 949.206 0 925.998 0H42.002z"/>
      <path fill="var(--contrast)" d="M42.993 8C23.667 8 8 23.675 8 43.006v1171.988C8 1234.327 23.668 1250 42.993 1250h882.014c19.326 0 34.993-15.675 34.993-35.006V43.006C960 23.673 944.332 8 925.007 8H42.993z"/>
      <path fill="var(--bg)" d="M96 111l776 3.998v1024.004c0 2.2-1.786 3.998-3.99 3.998H99.99c-2.19 0-3.99-1.79-3.99-3.998V114.998 111z"/>
      <path fill="var(--bg)" d="M484 67c-4.418 0-8-3.358-8-7.5 0-4.142 3.582-7.5 8-7.5s8 3.358 8 7.5c0 4.142-3.582 7.5-8 7.5zm0 1160c-16.57 0-30-13.43-30-30s13.43-30 30-30 30 13.43 30 30-13.43 30-30 30zm0-4c14.36 0 26-11.64 26-26s-11.64-26-26-26-26 11.64-26 26 11.64 26 26 26z"/>
      <path fill="var(--bg)" d="M100 115v1024h768V115z"/>
      <image :xlink:href="'/img/projects/' + img" x="100" y="115" height="1024" width="768"/>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'Tablet',
  props: {
    alt: { default: null },
    img: { default: 'http://via.placeholder.com/768x1024' }
  }
}
</script>
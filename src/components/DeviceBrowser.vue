<template>
  <svg class="deviceBrowser" role="img" :aria-label="alt" xmlns="http://www.w3.org/2000/svg" :width="1440" :height="924" viewBox="0 0 1440 924" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>{{ alt }}</title>
    <g fill="none" fill-rule="evenodd">
      <mask id="browser-mask" fill="white">
        <rect width="1440" height="924" rx="8"/>
      </mask>
      <rect fill="var(--contrast)" width="1440" height="924" mask="url(#browser-mask)"/>
      <path fill="var(--bg)" d="M6 12c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm20 0c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm20 0c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" transform="translate(8 6)"/>
      <image :xlink:href="'/img/projects/' + img" x="0" y="24" height="900" width="1440" mask="url(#browser-mask)"/>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'Browser',
  props: {
    alt: { default: null },
    img: { default: 'http://via.placeholder.com/1440x900' }
  }
}
</script>
<template>
  <svg
    :class="$options.name"
    role="img"
    :aria-label="alt"
    xmlns="http://www.w3.org/2000/svg"
    :width="383"
    :height="820"
    viewBox="0 0 383 820"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>{{ alt }}</title>
    <g fill="none" fill-rule="evenodd">
      <mask id="screenPhone" fill="#fff">
        <rect width="375" height="812" x="4" y="4" rx="32" />
      </mask>
      <rect width="383" height="820" fill="var(--contrast)" rx="32" />
      <image :xlink:href="img" x="4" y="4" height="812" width="375" mask="url(#screenPhone)" />
      <path
        fill="var(--contrast)"
        d="M92 4h200v8c0 13.255-10.745 24-24 24H116c-13.255 0-24-10.745-24-24V4z"
      />
    </g>
  </svg>
</template>
<script>
export default {
  name: "Phone",
  props: {
    alt: { default: null },
    img: { default: "http://via.placeholder.com/375x812" }
  }
};
</script>
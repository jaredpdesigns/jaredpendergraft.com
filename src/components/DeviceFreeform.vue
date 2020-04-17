<template>
  <section>
    <svg
      :class="$options.name"
      role="img"
      :aria-label="alt"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="'0 0 ' + width + ' ' + height"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>{{ alt }}</title>
      <g fill="none" fill-rule="evenodd">
        <mask :id="this._uid + '-freeform-mask'" fill="white">
          <rect :width="width" :height="height" rx="8" />
        </mask>
        <rect
          fill="white"
          :width="width"
          :height="height"
          :mask="'url(#' + this._uid + '-freeform-mask)'"
        />
        <image
          :xlink:href="img"
          :width="width"
          :height="height"
          :mask="'url(#' + this._uid + '-freeform-mask)'"
        />
      </g>
    </svg>
  </section>
</template>
<script>
export default {
  name: "Freeform",
  props: {
    alt: { default: null },
    height: { default: 320, type: Number },
    img: { default: "http://via.placeholder.com/320x320" },
    width: { default: 320, type: Number },
  },
};
</script>

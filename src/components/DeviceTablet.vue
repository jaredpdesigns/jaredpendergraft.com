<template>
  <section>
    <svg
      :class="$options.name + '--' + orientation"
      role="img"
      :aria-label="alt"
      xmlns="http://www.w3.org/2000/svg"
      :width="orientation === 'portrait' ? 832 : 1088"
      :height="orientation === 'portrait' ? 1088 : 832"
      :viewBox="orientation === 'portrait' ? '0 0 832 1088' : '0 0 1088 832'"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>{{ alt }}</title>
      <g fill="none" fill-rule="evenodd">
        <mask :id="'browser-mask' + this._uid + orientation" fill="#fff">
          <rect
            :height="orientation === 'portrait' ? 1024 : 768"
            :width="orientation === 'portrait' ? 768 : 1024"
            x="32"
            y="32"
            rx="16"
          />
        </mask>
        <rect
          :width="orientation === 'portrait' ? 832 : 1088"
          :height="orientation === 'portrait' ? 1088 : 832"
          fill="var(--color__contrast)"
          rx="32"
        />
        <image
          :xlink:href="img"
          :height="orientation === 'portrait' ? 1024 : 768"
          :width="orientation === 'portrait' ? 768 : 1024"
          x="32"
          y="32"
          :mask="'url(#phone-mask' + this._uid + orientation + ')'"
        />
      </g>
    </svg>
  </section>
</template>
<script>
export default {
  name: "Tablet",
  props: {
    alt: { default: null },
    img: { default: "http://via.placeholder.com/768x1024" },
    orientation: { default: "portrait" },
  },
};
</script>

<template>
  <section :class="[$options.name, 'padding__all--m']">
    <picture>
      <source
        :srcset="
          ($store.state.theme === 'dark'
            ? imgDark
            : img + '?&w=320&fm=webp 320w',
          $store.state.theme === 'dark' ? imgDark : img + '?w=640&fm=png 640w',
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?w=1280&fm=png 1280w')
        "
        type="image/webp"
      />
      <img
        loading="lazy"
        :src="$store.state.theme === 'dark' ? imgDark : img + '?&w=320&fm=png'"
        :srcset="
          ($store.state.theme === 'dark' ? imgDark : img + '?w=640&fm=png 640w',
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?w=1280&fm=png 1280w')
        "
        :alt="title"
        height="320"
        width="320"
      />
    </picture>
  </section>
</template>
<script>
export default {
  name: "ProjectImg",
  props: {
    img: { default: null },
    imgDark: { default: null },
    title: { default: "" },
  },
};
</script>
<style lang="scss">
.ProjectImg {
  @include breakpoint(xsl) {
    padding: var(--size__l);
  }
  img {
    aspect-ratio: attr(width) / attr(height);
    width: 100%;
  }
}
</style>

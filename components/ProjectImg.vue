<template>
  <section :class="[$options.name, 'padding__all--m']">
    <picture>
      <source
        sizes="(min-width: 63rem) 1280px, (min-width: 29rem) 640px, 320px"
        :srcset="
          ($store.state.theme === 'dark'
            ? imgDark
            : img + '?&w=640&fm=webp 640w',
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?&w=1280&fm=webp 1280w')
        "
        type="image/webp"
      />
      <source
        sizes="(min-width: 63rem) 1280px, (min-width: 29rem) 640px, 320px"
        :srcset="
          ($store.state.theme === 'dark'
            ? imgDark
            : img + '?&w=640&fm=png 640w',
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?&w=1280&fm=png 1280w')
        "
        type="image/png"
      />
      <img
        loading="lazy"
        :src="
          ($store.state.theme === 'dark' ? imgDark : img) + '?&w=320&fm=png'
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
    width: 100%;
  }
}
</style>

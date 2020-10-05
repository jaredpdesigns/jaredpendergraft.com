<template>
  <section :class="[$options.name, 'padding__all--m']">
    <picture>
      <source
        :srcset="
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?h=1280&w=1280&fm=webp'
        "
        media="(min-width: 47rem)"
        type="image/webp"
      />
      <source
        :srcset="
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?h=1280&w=1280&fm=png'
        "
        media="(min-width: 47rem)"
      />
      <source
        :srcset="
          $store.state.theme === 'dark' ? imgDark : img + '?h=640&w=640&fm=webp'
        "
        type="image/webp"
      />
      <img
        loading="lazy"
        :src="
          $store.state.theme === 'dark' ? imgDark : img + '?h=640&w=640&fm=png'
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

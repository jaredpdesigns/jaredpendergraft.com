<template>
  <section :class="[$options.name, 'padding__all--m']">
    <picture>
      <source
        :srcset="
          ($store.state.theme === 'dark'
            ? imgDark + '?&w=320&fm=webp 1x'
            : img + '?&w=320&fm=webp 1x',
          $store.state.theme === 'dark'
            ? imgDark + '?w=640&fm=webp 2x'
            : img + '?w=640&fm=webp 2x',
          $store.state.theme === 'dark'
            ? imgDark + '?w=960&fm=webp 3x'
            : img + '?w=960&fm=webp 3x')
        "
        type="image/webp"
      />
      <img
        loading="lazy"
        :src="
          $store.state.theme === 'dark'
            ? imgDark + '?&w=320&fm=png'
            : img + '?&w=320&fm=png'
        "
        :srcset="
          ($store.state.theme === 'dark'
            ? imgDark + '?w=640&fm=png 2x'
            : img + '?w=640&fm=png 2x',
          $store.state.theme === 'dark'
            ? imgDark + '?w=960&fm=png 3x'
            : img + '?w=960&fm=png 3x')
        "
        :alt="title"
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

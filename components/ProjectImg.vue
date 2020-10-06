<template>
  <section :class="[$options.name, 'padding__all--m']">
    <picture>
      <source
        sizes="(min-width: 99rem) 960px, (min-width: 63rem) 640px, 320px"
        :srcset="
          ($store.state.theme === 'dark'
            ? imgDark
            : img + '?&w=320&fm=webp 320w',
          $store.state.theme === 'dark' ? imgDark : img + '?w=640&fm=png 640w',
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?w=960&fm=png 960w')
        "
        type="image/webp"
      />
      <img
        loading="lazy"
        sizes="(min-width: 99rem) 960px, (min-width: 63rem) 640px, 320px"
        :src="$store.state.theme === 'dark' ? imgDark : img + '?&w=320&fm=png'"
        :srcset="
          ($store.state.theme === 'dark' ? imgDark : img + '?w=640&fm=png 640w',
          $store.state.theme === 'dark'
            ? imgDark
            : img + '?w=960&fm=png 960w')
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

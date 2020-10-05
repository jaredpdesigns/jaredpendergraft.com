<template>
  <section :class="[$options.name, 'padding__all--m']">
    <picture>
      <source
        :srcset="
          $store.state.theme === 'dark' ? imgDark : img + '?w=1280&fm=webp'
        "
        media="(min-width: 63rem)"
        type="image/webp"
      />
      <source
        :srcset="
          $store.state.theme === 'dark' ? imgDark : img + '?w=1280&fm=png'
        "
        media="(min-width: 63rem)"
      />
      <source
        :srcset="
          $store.state.theme === 'dark' ? imgDark : img + '?w=640&fm=webp'
        "
        media="(min-width: 47rem)"
        type="image/webp"
      />
      <source
        :srcset="
          $store.state.theme === 'dark' ? imgDark : img + '?w=640&fm=png'
        "
        media="(min-width: 47rem)"
      />
      <source
        :srcset="
          $store.state.theme === 'dark' ? imgDark : img + '?w=320&fm=webp'
        "
        type="image/webp"
      />
      <img
        loading="lazy"
        :src="$store.state.theme === 'dark' ? imgDark : img + '?w=320&fm=png'"
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

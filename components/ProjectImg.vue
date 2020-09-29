<template>
  <section :class="[$options.name, 'padding__all--m']">
    <img
      loading="lazy"
      :src="$store.state.theme === 'dark' ? imgDark : img"
      :alt="title"
      height="640"
      width="640"
    />
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
}
</style>

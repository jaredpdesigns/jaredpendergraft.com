<template>
  <figure :class="$options.name">
    <section :class="$options.name + '__images'">
      <ProjectImg
        v-for="(item, index) in images"
        :key="index"
        :img="item.img"
        :imgDark="item.imgDark"
        :title="item.title"
      />
    </section>
    <figcaption
      v-if="caption"
      :class="[
        $options.name + '__caption',
        'color__bg--secondary  color__type--base--mid padding__all--m radius--m',
      ]"
    >
      <p class="type__align--left type__size--m-l">
        {{ caption }}
      </p>
    </figcaption>
  </figure>
</template>
<script>
export default {
  name: "ProjectImgWrap",
  props: {
    caption: { default: "" },
    images: { default: () => [], type: Array },
  },
};
</script>
<style lang="scss">
.ProjectImgWrap {
  &__images {
    display: grid;
    @include breakpoint(m) {
      grid-template-columns: 1fr 1fr;
    }
  }
  &__caption {
    display: inline-block;
    @include breakpoint(m) {
      margin-left: auto;
      margin-right: auto;
      max-width: calc(60% + var(--size__xxxl));
    }
    @include breakpoint(l) {
      max-width: calc(50% - var(--size__m));
    }
  }
}
</style>

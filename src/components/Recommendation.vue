<template>
  <blockquote :class="$options.name">
    <section :class="$options.name + '__text'">
      <slot/>
    </section>
    <footer :class="$options.name + '__footer'">
      <h4>—&thinsp;{{ person }}</h4>
    </footer>
  </blockquote>
</template>
<script>
export default {
  name: "Recommendation",
  props: {
    person: { default: null },
    img: { default: null }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/variables";
.Recommendation {
  @include box;
  &__text {
    padding: rem(24);
    position: relative;
    @include breakpoint(m) {
      padding-left: rem(56);
    }
    &:before {
      color: var(--highlight-50);
      font-family: "basic-sans", sans-serif;
      font-size: rem(64);
      left: rem(16);
      position: absolute;
      top: rem(12);
      @include breakpoint(m) {
        content: "“";
      }
    }
    > * + * {
      margin-top: rem(24);
    }
  }
  &__footer {
    align-items: center;
    background-color: var(--highlight);
    display: flex;
    padding: rem(8) rem(24);
    h4 {
      color: var(--contrast);
    }
  }
}
</style>
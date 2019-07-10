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
<style lang="scss">
.Recommendation {
  background-color: var(--contrast);
  border: rem(1) solid var(--base-ghost);
  border-radius: rem(8);
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 0 !important;
  &__text {
    padding: rem(16);
    position: relative;
    @include breakpoint(m) {
      padding-left: rem(64);
    }
    &:before {
      color: var(--highlight);
      font-size: rem(64);
      left: rem(16);
      position: absolute;
      top: rem(4);
      @include breakpoint(m) {
        content: "“";
      }
    }
    > * + * {
      margin-top: rem(16);
    }
  }
  &__footer {
    align-items: center;
    background-color: var(--highlight);
    display: flex;
    padding: rem(16) rem(32);
    h4 {
      color: var(--contrast);
    }
  }
}
</style>
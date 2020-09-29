<template>
  <blockquote :class="[$options.name, 'color__bg--contrast radius--s']">
    <section :class="[$options.name + '__text', 'oomph__v--m padding__all--m']">
      <slot />
    </section>
    <footer
      :class="[
        $options.name + '__footer',
        'color__bg--brand padding__bottom--m padding__left--l padding__right--l padding__top--m',
      ]"
    >
      <p class="color__type--contrast type__family--display type__size--ml-l">
        <strong>—&thinsp;{{ person }}</strong>
      </p>
    </footer>
  </blockquote>
</template>
<script>
export default {
  name: "Recommendation",
  props: {
    person: { default: null },
  },
};
</script>
<style lang="scss" scoped>
.Recommendation {
  border-left: none;
  overflow: hidden;
  padding: 0 !important;
  @media print {
    box-shadow: none;
  }
  &__text {
    position: relative;
    text-align: left;
    @include breakpoint(xsl) {
      padding-left: calc(var(--size__l) + var(--size__s));
    }
    &:before {
      color: var(--color__brand);
      font-size: var(--typeSize__xxl);
      left: var(--size__m);
      position: absolute;
      top: var(--size__xs);
      @include breakpoint(xsl) {
        content: "“";
      }
    }
    > *:last-child:after {
      color: var(--color__brand);
      content: "”";
      font-size: var(--typeSize__xxl);
      line-height: var(--typeLineheight__s);
      position: relative;
      top: var(--size__xs);
    }
  }
  &__footer {
    align-items: center;
    display: flex;
    @media print {
      border-top: rem(1) solid;
    }
  }
}
</style>

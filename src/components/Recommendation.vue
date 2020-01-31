<template>
  <blockquote
    :class="[
      $options.name,
      'border__all color__bg--contrast color__border--base-ghost radius--s'
    ]"
  >
    <section :class="[$options.name + '__text', 'oomph__v--m padding__all--m']">
      <slot />
    </section>
    <footer
      :class="[
        $options.name + '__footer',
        'color__bg--brand padding__bottom--m padding__left--l padding__right--l padding__top--m'
      ]"
    >
      <h4 class="color__type--contrast">—&thinsp;{{ person }}</h4>
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
.Recommendation {
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 0 !important;
  @media (prefers-color-scheme: dark) {
    background-color: var(--color__contrast-extra);
    border-color: var(--color__contrast-extra);
  }
  @media print {
    box-shadow: none;
  }
  &__text {
    position: relative;
    @include breakpoint(xsl) {
      padding-left: calc(var(--size__l) + var(--size__m) + var(--size__s));
    }
    &:before {
      color: var(--color__brand);
      font-size: var(--size__xl);
      left: var(--size__m);
      position: absolute;
      top: var(--size__xs);
      @include breakpoint(xsl) {
        content: "“";
      }
    }
    p {
      font-family: var(--typeFamily__secondary);
    }
  }
  &__footer {
    align-items: center;
    display: flex;
    h4 {
      @media (prefers-color-scheme: dark) {
        color: var(--color__contrast-extra);
      }
    }
  }
}
</style>

<template>
  <blockquote
    :class="[
      $options.name,
      'color__bg--contrast oomph__v--m radius--s padding__bottom--m padding__top--m type__align--left',
    ]"
  >
    <slot />
    <p class="border__top color__border--base--light padding__top--m type__family--display">
      —&thinsp;<strong>{{ person }}</strong>
    </p>
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
  p {
    padding-left: var(--size__m);
    padding-right: var(--size__m);
    @include breakpoint(xsl) {
      padding-left: calc(var(--size__l) + var(--size__s));
      padding-right: var(--size__l);
    }
    &:first-child:before,
    &:nth-last-child(2):after {
      color: var(--color__base--mid);
      font-family: var(--typeFamily__display);
      font-size: var(--typeSize__xxl);
      font-weight: 500;
      line-height: 0;
      opacity: 0.5;
      position: relative;
      [data-theme="dark"] & {
        opacity: 1;
      }
    }
    &:first-child {
      position: relative;
      &:before {
        content: "“";
        top: calc(var(--size__s) + var(--size__xs));
        @include breakpoint(xsl) {
          left: var(--size__m);
          position: absolute;
        }
      }
    }
    &:nth-last-child(2):after {
      content: "”";
      top: var(--size__s);
    }
    &:last-child {
      padding-left: var(--size__m);
    }
  }
}
</style>

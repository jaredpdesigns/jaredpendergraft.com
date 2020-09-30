<template>
  <section :class="$options.name">
    <section :class="[$options.name + '__container', 'width__xxl']">
      <section :class="$options.name + '__guide'"></section>
      <section :class="$options.name + '__guide'"></section>
      <section :class="$options.name + '__guide'"></section>
      <section :class="$options.name + '__guide'"></section>
      <section :class="$options.name + '__guide'"></section>
      <section :class="$options.name + '__guide'"></section>
      <section :class="$options.name + '__guide'"></section>
    </section>
  </section>
</template>
<script>
export default {
  name: "Guides",
};
</script>
<style lang="scss">
.Guides {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  left: var(--size__m);
  right: var(--size_m);
  top: 0;
  width: calc(100% - 2rem);
  z-index: 0;
  @media print {
    display: none;
  }
  @include breakpoint(xsl) {
    left: var(--size__l);
    right: var(--size_l);
    width: calc(100% - 4rem);
  }
  &__container {
    display: grid;
    grid: 1fr / repeat(6, 1fr);
    height: 100%;
    position: relative;
    @include breakpoint(l) {
      grid: 1fr / repeat(4, 1fr);
    }
  }
  &__guide {
    background: linear-gradient(
      180deg,
      var(--color__secondary),
      var(--color__secondary) 50%,
      transparent 0,
      transparent
    );
    background-size: var(--size__xxs) var(--size__s);
    width: var(--size__xxs);
    &:first-of-type,
    &:last-of-type {
      background: var(--color__secondary);
    }
    &:last-of-type {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
    &:nth-of-type(even) {
      @media (orientation: portrait) and (max-width: 47rem) {
        opacity: 0;
      }
    }
  }
}
</style>

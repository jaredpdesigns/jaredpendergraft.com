<template>
  <router-link class="btn" :to="link">
    <Icon v-if="arrow && arrowDirection === 'left'" name="arrow-left" :size="16"/>
    <span class="btn__label">{{ label }}</span>
    <Icon v-if="arrow && arrowDirection === 'right'" name="arrow-right" :size="16"/>
  </router-link>
</template>
<script>
import Icon from '@/components/Icon.vue'
export default {
  name: 'Button',
  components: { Icon },
  props: {
    label: { default: null },
    link: { default: null },
    arrow: { default: null },
    arrowDirection: { default: "right" }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variables';
.btn {
  @include smooth;
  align-items: center;
  background-color: var(--contrast);
  box-shadow: 0 rem(4) rem(8) rem(-4) rgba(black,0.25);
  border-radius: rem(8);
  display: inline-flex;
  font-size: rem(16);
  height: rem(40);
  padding: 0 rem(8);
  &:hover, &:focus {
    border-color: transparent;
    svg:first-child { transform: translateX(rem(-2)); }
    svg:last-child { transform: translateX(rem(2)); }
  }
  svg {
    @include smooth;
    &:first-child { margin-right: rem(8); }
    &:last-child { margin-left: rem(8); }
  }
}
</style>
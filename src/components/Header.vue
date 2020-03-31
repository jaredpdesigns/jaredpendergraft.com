<template>
  <header
    :class="[
      $options.name,
      'border__bottom color__bg--contrast color__border--base-ghost color__type--base-mid padding__bottom--s padding__left--l padding__right--l padding__top--s'
    ]"
  >
    <h3>
      <router-link to="/" activeClass exactActiveClass
        >Jared Pendergraft</router-link
      >
    </h3>
    <nav
      :class="[$options.name + '__nav--main', 'oomph__h--l']"
      role="navigation"
    >
      <router-link
        to="/"
        exactActiveClass="active"
        class="border__bottom color__border--contrast padding__bottom--s padding__top--s"
        >About</router-link
      >
      <router-link
        to="/projects"
        activeClass="active"
        exactActiveClass="active"
        class="border__bottom color__border--contrast padding__bottom--s padding__top--s"
        >Projects</router-link
      >
      <router-link
        to="/hire"
        activeClass="active"
        exactActiveClass="active"
        class="border__bottom color__border--contrast padding__bottom--s padding__top--s"
        >Hire Me</router-link
      >
    </nav>
    <nav
      :class="[$options.name + '__nav--social', 'margin__top--xs oomph__h--l']"
      role="navigation"
    >
      <a
        href="mailto:hello@jaredpendergraft.com?subject=Hey Jared, love the site, how’s it going?"
        title="Send me an email"
      >
        <Icon name="email" :size="20" />
      </a>
      <a
        href="https://twitter.com/jaredpdesigns"
        title="Follow me on Twitter"
        target="_blank"
        rel="noopener"
      >
        <Icon name="twitter" :size="20" />
      </a>
      <a
        href="https://dribbble.com/jaredpdesigns"
        title="Follow me on Dribbble"
        target="_blank"
        rel="noopener"
      >
        <Icon name="dribbble" :size="20" />
      </a>
    </nav>
  </header>
</template>
<script>
import Icon from "@/components/Icon.vue";
export default {
  name: "Header",
  components: { Icon }
};
</script>
<style lang="scss" scoped>
.Header {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: calc(var(--size__xl) * 2);
  justify-content: center;
  position: fixed;
  top: env(safe-area-inset-top);
  width: 100%;
  z-index: 100;
  @media print {
    border-color: #ccc;
    position: static;
    * {
      color: black;
    }
    &:after {
      color: black;
      content: "jaredpendergraft.com • jaredpdesigns@gmail.com • 503-474-7437";
    }
  }
  @include breakpoint(xsl) {
    height: var(--size__xl);
    justify-content: space-between;
  }
  a {
    &:focus,
    &:hover {
      color: var(--color__base);
    }
  }
  &__nav {
    &--main,
    &--social {
      align-items: center;
      display: inline-flex;
      height: var(--size__l);
      justify-content: center;
      width: 100%;
      @media print {
        display: none;
      }
      @include breakpoint(xsl) {
        width: auto;
      }
    }
    &--main {
      > * {
        font-weight: 600;
        &.active {
          border-color: var(--color__base-mid);
          color: var(--color__base);
          &:focus {
            color: var(--color__brand);
          }
        }
      }
    }
    &--social {
      > * {
        align-items: center;
        display: inline-flex;
        justify-content: center;
        opacity: 0.5;
        &:focus,
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>

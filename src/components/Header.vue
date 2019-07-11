<template>
  <header :class="$options.name">
    <h3>
      <router-link to="/" exactActiveClass="currentPage">Jared Pendergraft</router-link>
    </h3>
    <nav :class="$options.name + '__nav--main'" role="navigation">
      <router-link to="/" exactActiveClass="currentPage">About</router-link>
      <router-link
        to="/projects"
        activeClass="currentParent"
        exactActiveClass="currentPage"
      >Projects</router-link>
      <router-link to="/hire" activeClass="currentParent" exactActiveClass="currentPage">Hire Me</router-link>
    </nav>
    <nav :class="$options.name + '__nav--social'" role="navigation">
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
      <button @click="updateTheme" aria-label="Switch site theme">
        <Icon v-if="theme === 'dark'" name="sun" :size="20" />
        <Icon v-else name="moon" :size="20" />
      </button>
    </nav>
  </header>
</template>
<script>
import Icon from "@/components/Icon.vue";
export default {
  name: "Header",
  components: { Icon },
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  },
  methods: {
    updateTheme() {
      let root = document.getElementsByTagName("html")[0];
      root.setAttribute("data-theme", this.theme);
      if (this.theme === "dark") {
        this.$store.dispatch("updateTheme", "light");
      } else {
        this.$store.dispatch("updateTheme", "dark");
      }
    }
  }
};
</script>
<style lang="scss">
.Header {
  align-items: center;
  background-color: var(--contrast);
  color: var(--base-mid);
  display: flex;
  flex-wrap: wrap;
  height: rem(120);
  justify-content: center;
  padding: rem(8) rem(32);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  @include breakpoint(xsl) {
    height: rem(64);
    justify-content: space-between;
  }
  @include breakpoint(l) {
    padding: rem(16) rem(32);
  }
  a {
    @include smooth;
  }
  h3 a {
    display: inline-block;
    transform-origin: left;
    &:focus,
    &:hover {
      color: var(--highlight);
      transform: scale(1.0625);
    }
  }
  &__nav {
    &--main,
    &--social {
      align-items: center;
      display: inline-flex;
      height: rem(32);
      > * {
        transform-origin: center;
        &:focus,
        &:hover {
          color: var(--highlight);
          transform: scale(1.0625);
        }
      }
    }
    &--main {
      > * {
        font-weight: 600;
        margin: 0 rem(8);
        @include breakpoint(s) {
          margin: 0 rem(16);
        }
      }
      .currentParent,
      .currentPage {
        border-bottom: rem(1) solid var(--highlight);
      }
    }
    &--social {
      margin-top: rem(8);
      @include breakpoint(xsl) {
        margin-top: 0;
      }
      > * {
        @include smooth;
        align-items: center;
        display: inline-flex;
        justify-content: center;
        opacity: 0.5;
        &:focus, &:hover {
          opacity: 1;
        }
      }
      > * + * {
        margin-left: rem(16);
      }
    }
  }
}
</style>
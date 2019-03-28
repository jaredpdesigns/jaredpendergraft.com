<template>
  <header class="header" role="heading">
    <h3>
      <router-link to="/" exactActiveClass="currentPage">Jared Pendergraft</router-link>
    </h3>
    <nav class="mainNav" role="navigation">
      <ul>
        <li>
          <router-link to="/" exactActiveClass="currentPage">About</router-link>
        </li>
        <li>
          <router-link
            to="/projects"
            activeClass="currentParent"
            exactActiveClass="currentPage"
          >Projects</router-link>
        </li>
        <li>
          <router-link to="/hire" exactActiveClass="currentPage">Hire Me</router-link>
        </li>
      </ul>
    </nav>
    <nav class="socialNav" role="navigation">
      <a
        href="mailto:hello@jaredpendergraft.com?subject=Hey Jared, love the site, how’s it going?"
        title="Send me an email"
      >
        <Icon name="email" :size="20"/>
      </a>
      <a
        href="https://twitter.com/jaredpdesigns"
        title="Follow me on Twitter"
        target="_blank"
        rel="noopener"
      >
        <Icon name="twitter" :size="20"/>
      </a>
      <a
        href="https://dribbble.com/jaredpdesigns"
        title="Follow me on Dribbble"
        target="_blank"
        rel="noopener"
      >
        <Icon name="dribbble" :size="20"/>
      </a>
      <a @click="updateTheme">
        <Icon v-if="theme === 'dark'" name="sun" :size="20"/>
        <Icon v-else name="moon" :size="20"/>
      </a>
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
<style lang="scss" scoped>
.header {
  align-items: center;
  background-color: var(--contrast);
  color: var(--base);
  display: flex;
  height: 3rem;
  justify-content: space-between;
  padding: rem(8) rem(32);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  @include breakpoint(xs-only) {
    flex-wrap: wrap;
    height: rem(80);
    justify-content: center;
    padding: rem(8) rem(24);
  }
  @include breakpoint(l) {
    height: rem(64);
    padding: rem(16) rem(32);
  }
  h3 {
    color: inherit;
    font-weight: 600;
  }
  a {
    @include smooth;
    color: inherit;
    text-decoration: none;
    &:hover,
    &:focus {
      color: var(--highlight);
    }
  }
  nav {
    @include breakpoint(xs-only) {
      text-align: center;
      width: 100%;
    }
    .currentParent,
    .currentPage {
      color: var(--highlight);
    }
  }
}

.mainNav ul {
  align-items: center;
  display: inline-flex;
  li + li {
    margin-left: 1rem;
  }
}

.socialNav {
  @include breakpoint(xs-only) {
    align-items: center;
    background-color: var(--contrast);
    bottom: 0;
    display: flex;
    height: rem(64);
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 100;
  }
  a {
    color: var(--base-38);
    + * {
      margin-left: 1rem;
      @include breakpoint(xs) {
        margin-left: 2rem;
      }
    }
    &:after {
      content: none;
    }
    &:hover,
    &:focus {
      border-color: transparent;
    }
  }
}
</style>
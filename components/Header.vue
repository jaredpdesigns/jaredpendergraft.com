<template>
  <header
    :class="[
      $options.name,
      'border__bottom color__bg--contrast color__border--base--ghost color__type--base--mid padding__left--m padding__right--m',
    ]"
  >
    <nuxt-link
      to="/"
      activeClass
      exactActiveClass
      class="padding__top--s type__family--display type__size--ml-l"
      >Jared Pendergraft</nuxt-link
    >
    <nav :class="$options.name + '__nav--main'">
      <nuxt-link to="/" exactActiveClass="active" class="type__size--m-l"
        >About</nuxt-link
      >
      <nuxt-link
        to="/projects/"
        activeClass="active"
        exactActiveClass="active"
        class="type__size--m-l"
        >Projects</nuxt-link
      >
      <nuxt-link
        to="/hire/"
        activeClass="active"
        exactActiveClass="active"
        :class="[$route.path.includes('clients') ? 'active' : '', 'type__size--m-l']"
        >Hire Me</nuxt-link
      >
      <nuxt-link
        to="/snippets/"
        activeClass="active"
        exactActiveClass="active"
        class="type__size--m-l"
        >Snippets</nuxt-link
      >
    </nav>
    <nav :class="$options.name + '__nav--social'">
      <a
        href="mailto:hello@jaredpendergraft.com?subject=Hey Jared, love the site, how’s it going?"
        title="Send me an email"
      >
        <Icon name="email" />
      </a>
      <a
        href="https://twitter.com/jaredpdesigns"
        title="Follow me on Twitter"
        target="_blank"
        rel="noopener"
      >
        <Icon name="twitter" />
      </a>
      <a
        href="https://dribbble.com/jaredpdesigns"
        title="Follow me on Dribbble"
        target="_blank"
        rel="noopener"
      >
        <Icon name="dribbble" />
      </a>
      <button title="Toggle website theme" @click="setTheme">
        <Icon name="contrast" />
      </button>
    </nav>
  </header>
</template>
<script>
export default {
  name: "Header",
  methods: {
    setTheme() {
      let root = document.getElementsByTagName("html")[0];
      if (root.getAttribute("data-theme") === "dark") {
        root.setAttribute("data-theme", "light");
        this.$store.dispatch("setTheme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        this.$store.dispatch("setTheme", "dark");
      }
    },
  },
};
</script>
<style lang="scss">
.Header {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: var(--header);
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 100;
  @media print {
    border-color: #ccc;
    padding-left: var(--size__xxl);
    padding-right: var(--size__xxl);
    position: static;
    * {
      color: black;
    }
    > a {
      font-size: var(--typeSize__s) !important;
    }
    &:after {
      color: black;
      content: "jaredpendergraft.com • jaredpdesigns@gmail.com • 503-474-7437";
      font-size: var(--typeSize__xs) !important;
    }
  }
  @include breakpoint(xsl) {
    flex-direction: row;
    justify-content: space-between;
  }
  @include breakpoint(m) {
    padding-left: var(--size__l);
    padding-right: var(--size__l);
  }
  > a {
    display: inline-flex;
    font-weight: 500;
    position: relative;
    top: calc(var(--size__xs) * -1);
    &:focus,
    &:hover {
      transform: scale(1.0125);
    }
  }
  + main {
    padding-top: calc(var(--header) + var(--size__m));
    @media (max-width: 47rem) {
      padding-bottom: var(--size__xxxl);
    }
    @include breakpoint(xsl) {
      padding-top: calc(var(--header) + var(--size__l));
    }
  }
  a {
    @include smooth;
  }
  &__nav {
    &--main,
    &--social {
      align-items: center;
      display: inline-flex;
      flex-wrap: wrap;
      justify-content: center;
      @media print {
        display: none;
      }
      @include breakpoint(xsl) {
        flex-shrink: 0;
      }
    }
    &--main {
      > * {
        font-weight: 600;
        position: relative;
        &:focus,
        &:hover {
          color: var(--color__base);
        }
        &.active {
          color: var(--color__base);
          &:after {
            background-color: var(--color__brand);
            border-radius: calc(var(--size__xs) / 4);
            bottom: 0;
            content: "";
            height: calc(var(--size__xs) / 2);
            left: 0;
            position: absolute;
            width: 100%;
          }
          &:hover {
            color: var(--color__brand);
          }
          &:focus {
            color: var(--color__brand);
          }
        }
        + * {
          margin-left: var(--size__m);
          @include breakpoint(m) {
            margin-left: var(--size__l);
          }
        }
      }
    }
    &--social {
      min-width: calc(var(--size__xl) * 4);
      @media (max-width: 47rem) {
        background-color: var(--color__contrast);
        border-top: var(--size__xxs) solid var(--color__base--light);
        bottom: 0;
        height: var(--size__xxxl);
        left: 0;
        position: fixed;
        right: 0;
        > * + * {
          margin-left: var(--size__m);
        }
      }
      > * {
        align-items: center;
        display: inline-flex;
        flex: 0 0 var(--size__xl);
        height: var(--size__xl);
        justify-content: center;
        &:focus,
        &:hover {
          color: var(--color__brand);
        }
      }
    }
  }
}
</style>

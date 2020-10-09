<template>
  <main :class="[$options.name, 'padding__left--m padding__right--m']">
    <figure>
      <picture>
        <source :srcset="img + 'giphy.webp'" type="image/webp" />
        <img loading="lazy" :src="img + 'source.gif'" />
      </picture>
    </figure>
    <article class="oomph__v--l padding__all--m radius--m type__align--center">
      <h1 class="color__type--base">
        The page you’re looking for is unavailable
      </h1>
      <p>
        Return
        <nuxt-link to="/">home</nuxt-link> or check out my
        <nuxt-link to="/projects">projects</nuxt-link>.
      </p>
      <p>
        Interested in working together? Read more about
        <nuxt-link to="/hire#process">my creative process</nuxt-link>.
      </p>
    </article>
  </main>
</template>
<script>
export default {
  name: "Error",
  data() {
    return {
      img: "https://i.giphy.com/media/de5bARu0SsXiU/",
    };
  },
  head() {
    return {
      title: "Oops • Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "The page you’re looking for is unavailable",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "The page you’re looking for is unavailable",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: "The page you’re looking for is unavailable",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.Error {
  display: grid;
  height: 100vh;
  place-items: center;
  position: relative;
  figure {
    height: 100%;
    position: absolute;
    width: 100%;
    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }
  article {
    background-color: rgba(white, 0.5);
    backdrop-filter: blur(32px);
    [data-theme="dark"] & {
      background-color: hsla(218, 12%, 16%, 0.5);
    }
    @include breakpoint(xsl) {
      padding: var(--size__l);
    }
    p {
      margin-left: auto;
      margin-right: auto;
      max-width: 38ch;
      a:hover {
        color: var(--color__base--mid);
      }
    }
  }
}
</style>

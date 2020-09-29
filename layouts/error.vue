<template>
  <main :class="[$options.name, 'padding__all--m']">
    <article class="oomph__v--l padding__all--m radius--m type__align--center">
      <h1 class="color__type--base">
        The page you’re looking for is unavailable
      </h1>
      <p>
        Return
        <router-link to="/">home</router-link> or check out my
        <router-link to="/projects">projects</router-link>.
      </p>
      <p>
        Interested in working together? Read more about
        <router-link to="/hire#process">my creative process</router-link>.
      </p>
    </article>
  </main>
</template>
<script>
export default {
  name: "Error",
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
  background-image: url("https://i.giphy.com/media/de5bARu0SsXiU/giphy.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
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
    }
  }
}
</style>

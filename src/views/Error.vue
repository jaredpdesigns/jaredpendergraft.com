<template>
  <main :class="$options.name">
    <Head
      title="Uh-oh | Jared Pendergraft"
      description="The page you’re looking for is unavailable."
      url="https://jaredpendergraft.com/error"
    />
    <article>
      <h1>The page you’re looking for is unavailable.</h1>
      <hr />
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
  name: "Error"
};
</script>
<style lang="scss">
.Error {
  background-image: url("https://i.giphy.com/media/de5bARu0SsXiU/giphy.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  position: relative;
  &:before {
    background-color: black;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: 0;
  }
  article {
    align-items: center;
    color: white;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 7.5rem);
    justify-content: center;
    position: relative;
    text-align: center;
    text-shadow: 0 rem(1) rem(2) rgba(black, 0.25);
    @include breakpoint(xsl) {
      height: calc(100vh - 4rem);
    }
    h1,
    a {
      color: inherit;
    }
    * + * {
      margin-top: rem(24);
    }
  }
}
</style>
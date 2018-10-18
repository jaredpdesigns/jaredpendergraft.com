<template>
  <main :class="$options.name">
    <Head
      title="Uh-oh | Jared Pendergraft"
      description="The page you’re looking for is unavailable."
    />
    <article>
      <h1>The page you’re looking for is unavailable.</h1>
      <p>Return <router-link to="/">home</router-link> or check out my <router-link to="/projects">projects</router-link>.</p>
      <p>Interested in working together? Read more about <router-link to="/hire#process">my creative process</router-link>.</p>
    </article>
  </main>
</template>
<script>
export default {
  name: "Error"
};
</script>
<style lang="scss" scoped>
@import "../assets/css/variables";
.Error {
  background-image: url("https://i.giphy.com/media/de5bARu0SsXiU/giphy.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  &:before {
    background-color: black;
    bottom: rem(16);
    content: "";
    left: rem(16);
    opacity: 0.5;
    position: absolute;
    right: rem(16);
    top: 0;
  }
  article {
    align-self: center;
    color: white;
    position: relative;
    text-align: center;
    text-shadow: 0 rem(1) rem(2) rgba(black, 0.25);
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
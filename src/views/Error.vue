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
  name: 'Error'
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variables';
.Error article {
  align-self: center;
  text-align: center;
  h1 { color: var(--highlight); }
  * + * { margin-top: rem(24); }
}
</style>
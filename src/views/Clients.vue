<template>
  <main :class="$options.name">
    <Head
      title="Clients | Jared Pendergraft"
      description="Portal for hosting client files, agreements and invoices"
    />
    <header>
      <h1>Clients</h1>
      <hr />
    </header>
    <section :class="$options.name + '__wrap'">
      <router-link
        :to="'/clients/' + client.type + '/' + client.slug"
        v-for="client in clients"
        :key="client.slug"
        :class="$options.name + '__wrap--item'"
      >
        <h3>{{ client.title }}</h3>
        <p>{{ client.client.name }}</p>
        <footer>
          <small>{{ client.type }}</small>
        </footer>
      </router-link>
    </section>
  </main>
</template>
<script>
export default {
  name: "Clients",
  data() {
    return {
      clients: this.$store.state.clients
    };
  }
};
</script>
<style lang="scss">
.Clients {
  padding: rem(16);
  h1 {
    color: var(--highlight);
  }
  header {
    margin: rem(32) 0;
    padding-top: rem(16);
    text-align: center;
    > * {
      margin-left: auto;
      margin-right: auto;
      max-width: rem(640);
      padding-left: rem(16);
      padding-right: rem(16);
      @include breakpoint(xl) {
        max-width: rem(960);
      }
      + * {
        margin-top: rem(16);
      }
    }
  }
  &__wrap {
    align-items: start;
    display: grid;
    grid-gap: rem(32);
    grid-template-columns: repeat(auto-fit, minmax(rem(320), 1fr));
    margin: rem(16) auto;
    max-width: rem(1280);
    &--item {
      @include smooth;
      background-color: var(--contrast);
      border: rem(1) solid var(--base-ghost);
      border-radius: rem(8);
      box-shadow: var(--shadow);
      overflow: hidden;
      padding-top: rem(8);
      transform-origin: center;
      h3,
      p,
      footer {
        padding: rem(8) rem(16);
      }
      p {
        padding-top: 0;
      }
      h3 {
        color: var(--base-mid);
      }
      footer {
        background-color: var(--base-ghost);
        small {
          color: var(--base-mid);
          font-weight: 600;
          text-transform: uppercase;
        }
      }
      &:focus,
      &:hover {
        animation: zoom 0.5s ease-in;
      }
    }
  }
}
</style>
<template>
  <main :class="$options.name">
    <Head
      title="Clients | Jared Pendergraft"
      description="Portal for hosting client files, agreements and invoices"
    />
    <article class="oomph__v--l">
      <header class="oomph__v--m type__align--center">
        <h1 class="color__type--brand">Clients</h1>
        <hr />
      </header>
      <section :class="$options.name + '__wrap'">
        <router-link
          :to="'/clients/' + client.type + '/' + client.slug"
          v-for="client in $store.state.clients"
          :key="client.slug"
          :class="[
            $options.name + '__item',
            'border__all color__bg--contrast color__border--base-ghost radius--s type__align--center'
          ]"
        >
          <header
            class="border__bottom color__border--base-ghost oomph__v--s padding__bottom--m padding__left--s padding__right--s padding__top--m"
          >
            <h3 class="color__type--base-mid">{{ client.title }}</h3>
            <p>{{ client.client.name }}</p>
          </header>
          <footer class="padding__all--m">
            <span class="color__type--base-mid type__size--s-m">{{
              client.type
            }}</span>
          </footer>
        </router-link>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Clients"
};
</script>
<style lang="scss" scoped>
.Clients {
  &__wrap {
    align-items: start;
    display: grid;
    grid-gap: var(--size__l);
    grid-template-columns: repeat(auto-fit, minmax(rem(320), 1fr));
    @include breakpoint(m) {
      grid-template-columns: repeat(auto-fit, minmax(rem(400), 1fr));
    }
  }
  &__item {
    box-shadow: var(--shadow);
    @media (prefers-color-scheme: dark) {
      background-color: var(--color__contrast-extra);
      border-color: var(--color__contrast-extra);
    }
    &:focus,
    &:hover {
      transform: scale(1.005);
    }
    footer {
      font-weight: 600;
      text-transform: uppercase;
    }
  }
}
</style>

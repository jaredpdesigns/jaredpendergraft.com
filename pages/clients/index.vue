<template>
  <main :class="$options.name">
    <article class="oomph__v--l">
      <header class="padding__left--m padding__right--m type__align--center">
        <h1>Client Projects</h1>
        <hr />
      </header>
      <section
        :class="[
          $options.name + '__wrap',
          'padding__left--l padding__right--l width__xxl',
        ]"
      >
        <nuxt-link
          :to="'/clients/' + client.type + '/' + client.slug"
          v-for="client in $store.state.clients"
          :key="client.slug"
          :class="$options.name + '__item'"
        >
          <section
            :class="[
              $options.name + '__item--wrap',
              'color__bg--secondary radius--s type__align--center shadow',
            ]"
          >
            <header
              class="border__bottom color__border--base--light oomph__v--s padding__bottom--m padding__left--s padding__right--s padding__top--m"
            >
              <h3>{{ client.title }}</h3>
              <p>{{ client.client.name }}</p>
            </header>
            <footer class="padding__all--s">
              <span class="color__type--base--mid type__size--s-m">{{
                client.type
              }}</span>
            </footer>
          </section>
        </nuxt-link>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Clients",
  head() {
    return {
      title: "Clients • Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Portal for hosting client files, agreements and invoices",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Portal for hosting client files, agreements and invoices",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: "Portal for hosting client files, agreements and invoices",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.Clients {
  &__wrap {
    align-items: start;
    display: grid;
    grid-gap: var(--size__m);
    @include breakpoint(xsl) {
      grid-gap: var(--size__l);
      grid-template-columns: 1fr 1fr;
      padding-left: var(--size__xxl);
      padding-right: var(--size__xxl);
    }
  }
  &__item {
    @include smooth;
    display: block;
    &:focus,
    &:hover {
      transform: scale(1.0125);
    }
    span {
      font-weight: 600;
      text-transform: uppercase;
    }
  }
}
</style>

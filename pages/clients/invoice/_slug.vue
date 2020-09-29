<template>
  <main :class="$options.name">
    <article
      :class="[
        $options.name + '__wrap',
        'padding__bottom--l padding__left--m padding__right--m',
      ]"
    >
      <header class="oomph__v--m type__align--center width__xxl">
        <h1>{{ invoice.title }}</h1>
        <hr />
        <p>
          {{ invoice.end.month }} {{ invoice.end.day }}, {{ invoice.end.year }}
        </p>
      </header>
      <section
        :class="[
          $options.name + '__content',
          'margin__top--l oomph__v--l width__xxl',
        ]"
      >
        <section
          class="border__bottom color__border--base--light padding__bottom--l"
        >
          <p>
            <strong>{{ invoice.client.name }}</strong>
            <br v-if="invoice.client.street" />
            {{ invoice.client.street }}
            <br v-if="invoice.client.street" />
            {{ invoice.client.city }}, {{ invoice.client.state }}
            {{ invoice.client.zip }}
          </p>
        </section>
        <section
          class="border__bottom color__border--base--light padding__bottom--l"
          v-html="invoice.description"
        ></section>
        <h3>Final invoice amount</h3>
        <p class="color__type--base margin__top--s type__size--xl-l">
          ${{ total(invoice.total) }}
        </p>
        <footer
          class="border__top color__border--base--light oomph__v--l padding__top--l"
        >
          <p>
            <strong
              >Please send invoice payment to the following address:</strong
            >
          </p>
          <blockquote>
            <p>
              <em>
                Jared Pendergraft
                <br />127 Ho‘owaiwai Loop #2006 <br />Wailuku, HI 96793
              </em>
            </p>
          </blockquote>
          <p>
            Alternatively, payments can be made directly via debit card by
            visiting:
            <a
              href="https://cash.me/$jaredpdesigns"
              title="Pay Jared Pendergraft"
              target="_blank"
              rel="noopener"
              >cash.me/jaredpdesigns</a
            >
          </p>
          <p>
            <em>Thank you for this creative opportunity!</em>
          </p>
        </footer>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Invoice",
  data() {
    return {
      invoice: this.$store.state.clients.filter(
        (item) => item.slug === this.$route.params.slug
      )[0],
    };
  },
  head() {
    return {
      title: this.invoice.title + " • Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Client invoice for " + this.invoice.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Client invoice for " + this.invoice.title,
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: "Client invoice for " + this.invoice.title,
        },
      ],
    };
  },
  methods: {
    total(value) {
      let total = value.toFixed(2);
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style lang="scss">
.Invoice {
  &__wrap {
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
  }
  &__content {
    section > p,
    footer > p,
    h3 + p,
    h3,
    h4,
    blockquote {
      padding-left: var(--size__m);
      padding-right: var(--size__m);
      @include breakpoint(xsl) {
        margin-left: auto;
        margin-right: auto;
        max-width: calc(60% + (var(--size__l) * 2));
        padding-left: var(--size__l);
        padding-right: var(--size__l);
        width: 100%;
      }
      @include breakpoint(l) {
        max-width: 50%;
      }
    }
  }
}
</style>

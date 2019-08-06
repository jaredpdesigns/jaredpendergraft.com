<template>
  <main :class="$options.name">
    <article v-for="invoice in invoices" :key="invoice.title">
      <header>
        <h1>{{ invoice.title }}</h1>
        <p>{{ invoice.end.month }} {{ invoice.end.day }}, {{ invoice.end.year }}</p>
        <hr/>
      </header>
      <p>
        <strong>{{ invoice.client.name }}</strong>
        <br v-if="invoice.client.street" />
        {{ invoice.client.street }}
        <br v-if="invoice.client.street" />
        {{ invoice.client.city }}, {{ invoice.client.state }} {{ invoice.client.zip }}
      </p>
      <hr />
      <section :class="$options.name + '__content'" v-html="invoice.description"></section>
      <h4>Final invoice amount</h4>
      <p class="total">${{ total(invoice.total) }}</p>
      <hr />
      <p>
        <strong>Please send invoice payment to the following address:</strong>
      </p>
      <blockquote>
        <p>
          <em>
            Jared Pendergraft
            <br />127 Ho‘owaiwai Loop #2006
            <br />Wailuku, HI 96793
          </em>
        </p>
      </blockquote>
      <p>
        Alternatively, payments can be made directly via debit card by visiting:
        <a
          href="https://cash.me/$jaredpdesigns"
          title="Pay Jared Pendergraft"
          target="_blank"
          rel="noopener"
        >cash.me/jaredpdesigns</a>
      </p>
      <p>
        <em>Thank you for this creative opportunity!</em>
      </p>
    </article>
  </main>
</template>
<script>
export default {
  name: "Invoice",
  computed: {
    invoices() {
      const invoiceSlug = this.invoice;
      return this.$store.state.clients.filter(client => {
        return client.slug === this.$route.params.slug;
      });
    }
  },
  methods: {
    total(value) {
      let total = value.toFixed(2);
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>
<style lang="scss">
.Invoice {
  article {
    margin: 0 auto;
    max-width: rem(960);
    padding: rem(32) rem(16);
    @include breakpoint(s) {
      padding: rem(32);
    }
    h1 {
      color: var(--highlight);
    }
    > header {
      text-align: center;
      > * + * {
        margin-top: rem(8);
      }
    }
    blockquote {
      border-left: rem(4) solid var(--base-ghost);
      padding-left: rem(16);
    }
    > * + * {
      margin-top: rem(16);
    }
  }
  &__content {
    > * + * {
      margin-top: rem(16);
    }
  }
  .total {
    color: var(--highlight);
    margin-top: rem(8);
  }
}
</style>
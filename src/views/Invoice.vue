<template>
  <main :class="$options.name">
    <Head
      v-for="invoice in invoices"
      :key="invoice.slug"
      :title="invoice.title + ' • ' + invoice.client.name + ' | Invoice'"
      :description="'Invoice for working on: ' + invoice.title"
      :url="'jaredpendergraft.com/clients/invoice/' + invoice.slug"
    />
    <article
      v-for="invoice in invoices"
      :key="invoice.title"
      class="legible oomph__v--l"
    >
      <header class="oomph__v--m padding__all--m type__align--center">
        <h1 class="color__type--brand">{{ invoice.title }}</h1>
        <p class="legible margin__top--s">
          {{ invoice.end.month }} {{ invoice.end.day }}, {{ invoice.end.year }}
        </p>
        <hr />
      </header>
      <section :class="[$options.name + '__content', 'oomph__v--l']">
        <section
          class="border__bottom color__border--base-ghost padding__bottom--l"
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
          class="border__bottom color__border--base-ghost padding__bottom--l"
          v-html="invoice.description"
        ></section>
        <h3>Final invoice amount</h3>
        <p class="color__type--brand margin__top--s type__size--l-l">
          ${{ total(invoice.total) }}
        </p>
        <footer
          class="border__top color__border--base-ghost oomph__v--l padding__top--l"
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

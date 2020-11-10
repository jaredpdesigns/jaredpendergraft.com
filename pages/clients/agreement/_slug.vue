<template>
  <main :class="$options.name">
    <article
      :class="[
        $options.name + '__wrap',
        'oomph__v--l padding__bottom--l padding__left--m padding__right--m width__xxl',
      ]"
    >
      <header class="type__align--center">
        <h1>Consulting Agreement</h1>
        <hr />
      </header>
      <p>
        This consulting agreement is effective as of
        <em
          >{{ agreement.start.month }} {{ agreement.start.day }},
          {{ agreement.start.year }}</em
        >
        between the following parties:
      </p>
      <p>
        <strong>Client</strong>
        <br />
        {{ agreement.client.name }}
        <br v-if="agreement.client.street" />
        {{ agreement.client.street }}
        <br v-if="agreement.client.street" />
        {{ agreement.client.city }}, {{ agreement.client.state }}
        {{ agreement.client.zip }}
      </p>
      <p>
        <strong>Consultant</strong>
        <br />
        {{ consultant }}
        <br />127 Ho‘owaiwai Loop #2006 <br />Wailuku, HI 96793
      </p>
      <section class="oomph__v--m type__align--center">
        <h2>The parties agree as follows</h2>
        <hr />
      </section>
      <ol>
        <li>
          <strong>Services.</strong>
          {{ consultant }} will provide services (the “Services”) to
          {{ agreement.client.name }} as specified in <em>Schedule A.</em> All
          design and development efforts will be done remotely unless otherwise
          stated.
        </li>
        <li>
          <strong>Expenses.</strong>
          {{ agreement.client.name }} will reimburse {{ consultant }} for
          expenses incurred in providing the Services, but only if those
          expenses have been approved in advance and in writing.
        </li>
        <li>
          <strong>Payment.</strong> Unless otherwise specified in
          <em>Schedule A</em>
          , {{ consultant }} will invoice {{ agreement.client.name }} upon
          completion of Services and for expenses.
          {{ agreement.client.name }} will pay the invoice within 7 days of
          receipt (the “Due Date”) if {{ consultant }} performed the Services as
          required. {{ agreement.client.name }} agrees to pay
          {{ consultant }} ${{ agreement.hourly }} per hour for additional
          services not outlined in
          <em>Schedule A</em>
          —additional tasks will not be undertaken without the explicit written
          approval of {{ agreement.client.name }}.
        </li>
        <li>
          <strong>Interest.</strong>
          {{ agreement.client.name }} will pay {{ consultant }} simple interest
          on all overdue payments at a rate of 5% per month. Interest is
          calculated from the date payment was due until the date payment,
          including accumulated interest, is made in full.
        </li>
        <li>
          <strong>Term.</strong> This Agreement will be in effect until the
          Services are completed, unless ended earlier as specified in
          <em>section 6</em>.
        </li>
        <li>
          <strong>Termination by Consultant.</strong>
          {{ consultant }} may end this Agreement if:
          <ol>
            <li>
              {{ agreement.client.name }} fails to pay any amounts owing to
              {{ consultant }} within 7 days after the Due Date, or
            </li>
            <li>
              {{ agreement.client.name }} breaches any other fundamental
              obligation in this Agreement and does not remedy the breach within
              5 days after receiving written notice of the breach from
              {{ consultant }}.
            </li>
            <li>
              {{ agreement.client.name }} does not respond to the correspondence
              from {{ consultant }} within 5 days.
            </li>
          </ol>
        </li>
        <li>
          <strong>Effect of Termination.</strong> When this Agreement ends for
          any reason:
          <ol>
            <li>
              {{ agreement.client.name }} will immediately pay
              {{ consultant }} all outstanding expenses and Fees for Services
              performed as required, up to the date of termination;
            </li>
            <li>
              sections
              <em>9, 10, 11, 12</em> will survive the end of this Agreement.
            </li>
          </ol>
        </li>
        <li>
          <strong>Confidentiality.</strong>
          <ol>
            <li>
              “Confidential Information” means all information (whether in oral,
              written or electronic form) relating to the business, technology,
              personnel, marketing, customers, finances, products or services of
              {{ agreement.client.name }}, and includes confidential information
              received by {{ agreement.client.name }} from third parties, but
              excludes any information that:
              <ol>
                <li>
                  was lawfully in the possession of {{ consultant }} before
                  receiving it from {{ agreement.client.name }};
                </li>
                <li>
                  is provided in good faith to {{ consultant }} by a third party
                  without breaching any rights of {{ agreement.client.name }} or
                  any other party;
                </li>
                <li>
                  is or becomes generally available to, or accessible by, the
                  public through no fault of {{ consultant }}; or
                </li>
                <li>
                  is independently developed by {{ consultant }} without use of
                  the disclosed Confidential Information.
                </li>
              </ol>
            </li>
            <li>
              {{ consultant }} may use {{ agreement.client.name }}’s
              Confidential Information only for the purpose of performing the
              Services and only to the extent required for that purpose.
              {{ consultant }} must not use {{ agreement.client.name }}’s
              Confidential Information for any other purpose without the
              explicit written approval of {{ agreement.client.name }}.
            </li>
            <li>
              {{ consultant }} will keep {{ agreement.client.name }}’s
              Confidential Information confidential, and will also cause its
              directors, officers, employees and agents to keep
              {{ agreement.client.name }}’s Confidential Information
              confidential. {{ consultant }} will take all necessary steps
              (including those steps that {{ consultant }} takes to protect its
              own information that it regards as confidential) to maintain the
              confidentiality of {{ agreement.client.name }}’s Confidential
              Information.
            </li>
            <li>
              {{ consultant }} will not disclose the Confidential Information to
              any third party, nor the fact that he has obtained the
              Confidential Information, without the explicit written approval of
              {{ agreement.client.name }}.
            </li>
            <li>
              If {{ consultant }} receives notice indicating that it may or will
              be legally required to disclose any of
              {{ agreement.client.name }}’s Confidential Information, it will
              notify {{ agreement.client.name }} promptly in writing so that
              {{ agreement.client.name }} may seek a protective order or other
              appropriate remedy, or waive compliance with this Agreement. If a
              protective order or other remedy is not obtained for whatever
              reason, or if {{ agreement.client.name }} waives compliance with
              this Agreement, ￼{{ consultant }} will disclose no more than that
              portion of the Confidential Information required to be disclosed.
            </li>
          </ol>
        </li>
        <li>
          <strong>Intellectual Property.</strong>
          {{ consultant }} agrees that {{ agreement.client.name }} will have
          exclusive ownership in all work product (the “Work Product”) that
          {{ consultant }} produces under this Agreement, after all invoices
          have been paid in-full, including {{ consultant }}’s copyright
          interest in the Work Product, except for the materials (the
          “Consultant’s Materials”) specified in
          <em>Schedule A.</em>
          All rights to work product will remain with {{ consultant }} until all
          invoices are paid in full. {{ consultant }} retains the right to
          display images of the Work Product and its branding on their
          portfolio. All Work Product must be original work by
          {{ consultant }} and must not infringe the rights (including
          intellectual property rights) of any third party.
          {{ consultant }} hereby grants {{ agreement.client.name }} a
          perpetual, non-exclusive license to make copies and to modify
          {{ consultant }}’s Materials, without any additional payments, to the
          extent that {{ consultant }}’s Materials are incorporated in the Work
          Product or are reasonably necessary to use the Work Product.
        </li>
        <li>
          <strong>Assignment and Moral Rights.</strong>
          {{ consultant }} hereby assigns to {{ agreement.client.name }} all
          rights, title and interest {{ consultant }} may now or in the future
          have in and to the Work Product. {{ consultant }} waives
          {{ consultant }}’s moral rights to any and all copyrights subsisting
          in the Work Product. If required by {{ agreement.client.name }},
          {{ consultant }} also agrees to sign, and to cause {{ consultant }} to
          sign, any applications or other documents
          {{ agreement.client.name }} may reasonably request: [a] to obtain or
          maintain patent, copyright, industrial design, trade-mark or other
          similar protection for the Work Product, [b] to transfer ownership of
          the Work Product to {{ agreement.client.name }}, and [c] to assist
          {{ agreement.client.name }} in any proceeding necessary to protect and
          preserve the Work Product. {{ agreement.client.name }} will pay for
          all expenses associated with preparing and filing such documents.
        </li>
        <li>
          <strong>Consultant’s Obligations.</strong>
          <ol>
            <li>
              {{ consultant }} will perform the Services in a competent and
              professional manner. {{ consultant }} represents that he has the
              skills and qualifications necessary to perform the Services.
            </li>
            <li>{{ consultant }} will comply with all applicable laws.</li>
          </ol>
        </li>
        <li>
          <strong>Entire Agreement.</strong>
          This Agreement contains the whole agreement between
          {{ agreement.client.name }} and {{ consultant }}, and there are no
          warranties, representations, terms, conditions or collateral
          agreements—express, implied or statutory—other than as expressly set
          out in this Agreement.
        </li>
      </ol>
      <p>
        In witness whereof, the Parties hereto have executed this Consulting
        Agreement as of the date first written above.
      </p>
      <section id="signatures" class="oomph__v--m type__align--center">
        <h2>Signatures</h2>
        <hr />
      </section>
      <h4>Consultant’s Signature</h4>
      <p class="signature margin__top--s">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="71.2"
          width="252.1"
          viewBox="0 0 252.1 71.2"
        >
          <path
            fill="currentColor"
            d="M224.3 41.4c0 2.9-10.6 15.1-12.7 14.6-2.5-.5 1.1-12.9 4-13.5.7-.1 2.8-.6 4.6-1.1 4.2-1 4.1-1 4.1 0m-9.9-9.9c-.8.3-5.8 7-7 9.4-.5 1-1.6 2-2.6 2.3-1.2.4-1.6.8-1.3 1.5.4 1-4.2 8.2-5 7.9-1-.3-2.5-4-2.3-5.5.1-.9-.1-1.7-.5-2.1-.6-.5-1.2-.2-2.9 1.3s-2.4 1.8-3.1 1.4c-.7-.4-1.5-.3-2.6.3-1.6.8-1.7.8-2.1-.1-.2-.6 0-1.2.8-1.8 1.4-.9 1.6-2.9.4-2.9-.8 0-4.2 4.1-4.2 5.1 0 .3.6.7 1.4 1s1.4.7 1.4 1c0 .2.2.8.5 1.2.4.6.7.6 1.7.1 1.1-.6 1.4-.5 2.2.6.8 1 1.1 1.1 2.1.6 1.4-.8 2.1-2.3 1-2.3-.9 0-1.1-.9-.3-1.4 1-.6 2.8.8 3.6 2.8.6 1.4 1.2 2 2.5 2.3 2 .4 2.1.8.5 2.2-2.3 2.1-3.4 5.8-1.7 5.8 1 0 8.3-6.7 9.5-8.6 1.6-2.6 2.2-2.4 2.2.5 0 2.3 1 4.2 2.2 4.2 1.5 0 4.6-2 7.2-4.5 3.1-3.1 5.7-6.8 7.8-11.1l1.2-2.6 4.8-.9c6.4-1.2 13.6-2 16.9-2 2.6 0 3.9-.7 2.9-1.7-.7-.7-13.6.4-19.6 1.7-10.1 2.1-14.2 2.9-16.4 2.9-2.4.1-5 2-4.4 3.4.5 1.3-2.1 5.1-6.4 9.7-4.6 4.9-6.1 4.9-2.8 0 1.3-1.8 2.8-4.5 3.4-5.8.6-1.5 1.7-2.8 2.7-3.3 1.2-.6 1.5-1.1 1.3-2.1-.2-.9.5-2.1 2.7-4.6 4.4-5 4.5-5 3.7-5.7-.4-.2-1-.3-1.4-.2m-36.4 17.2c.2.6-1.5 1.5-1.9 1-.1-.1-.1-.7.1-1.2.3-.8 1.4-.8 1.8.2m-16.6-16.1c-2.5 4.2-4.9 8.4-5.3 9.5-.8 2-1.3 2.2-2.3 1.1-.6-.6-.8-.5-1.2.3-.8 1.4-4 4.3-4.7 4.3-1.2 0-1.3-.7-.5-2.3.8-1.6.7-2.7-.3-2.7-.3 0-1 .9-1.7 2-1 1.7-1.3 1.9-1.7 1.1-.7-1.3-1.4-1.1-3.1.7-1.8 1.9-4.2 2.5-4.5 1-.1-.6.4-1.3 1.6-1.8 1.1-.6 1.7-1.2 1.6-1.8-.3-1.6-1.7-1.3-4.3.9l-2.4 2.1.9 1.7c1 1.9 2.1 2.1 4.2.9 1.8-1.1 2-1 2.4.3.4 1.6 1.3 1.4 2.4-.6 1.2-2 1.6-2.1 2-.6.3 1.3 1.6 1.5 2.6.3.6-.7.9-.7 2.3 0 1.5.8 1.6.7 3.1-1l1.5-1.8 1.2 1.5c1 1.3 1.5 1.4 3.5 1.2 1.4-.2 2.4-.1 2.7.3.6.9 2.4.8 5.6-.4l2.8-1 2.9 1.9c1.6 1.1 2.9 2 2.9 2.2 0 .7-6.7 7.8-9.6 10.1-3 2.4-3.9 4-2.7 4.8 1.1.7 13-11 15.1-14.7.4-.8.7-1.7.6-2.1-.1-.4.2-1.2.7-1.7 3-3.4.5-4.9-3.2-2-2.2 1.6-2.9 1.7-3.3.2-.3-.8-.7-1-1.4-.8-.7.2-1.1 0-1.4-.8-.5-1.6-1.1-1.4-2.6.5-1.5 2.1-4.2 3.3-5.1 2.3-.5-.5-.3-1 .9-2 1.8-1.6 2-2.5.3-2.5-.7 0-2.1 1-3.3 2.2-2.1 2.2-3.9 2.6-3.9.7 0-.5 2.6-5.2 5.8-10.5 3.2-5.3 5.8-9.9 5.8-10.2 0-.3-.5-.6-1.1-.6-.9.2-2.5 2.3-5.8 7.8m-69.8 9.1c0 1.6-.2 2-1.2 2.1-.8.1-1.4-.2-1.8-1-.9-1.6.2-3.5 1.8-3.3 1 .2 1.2.6 1.2 2.2m8.7-17.1c-1.6 2.7-2.8 3.7-4.9 4.1-2.2.4-3.4-.4-4.5-3-.9-2.1-2-2.1-2.3 0-.2 1.8 2.2 4.7 4.3 5.2.9.2 2.4 0 3.6-.5 1.8-.8 2.1-.8 2.4 0 .4.9-2.8 8.8-4.1 10.2-.7.7-.8.7-1.3 0-.3-.5-.5-1.3-.5-1.8 0-1.9-3.6-1.9-5.7 0-1.2 1.1-1.3 5.2-.2 6.2.4.4 1.6.6 2.6.5 1.5-.1 1.9.1 2.5 1.2 1 2 2.2 2.4 4.4 1.7 1.5-.5 2.4-.5 3.9.1 1.7.6 2.1.6 2.9-.2.9-.9.8-1-.8-1.6-1-.3-1.8-.8-1.8-1.1 0-.8-1.4-.6-3.6.4-1.6.8-2.1.8-2.8.2-1.2-1-1.1-1.3 1.6-4.5 2.6-3.1 4.7-7.7 4.7-10.5 0-.9.4-2.6.8-3.9 1.7-4.4.8-6.2-1.2-2.7m47.1-11.2c1.6 1.6.7 4.2-2.8 8.9-5.2 6.9-9 10.8-10.1 10.3-.5-.2-.9-.7-.9-1.2 0-1 3.6-8.2 7.1-14.3 2.3-4 2.6-4.3 4.3-4.3.9 0 2 .3 2.4.6m-5.9-.8c-1.2 1.2-3 3.9-4 6.1-1 2.1-2.2 4.1-2.6 4.4-.4.3-1.1 1.5-1.5 2.5-1 2.5-1.6 3-4.8 4.1-3.2 1.1-4.7 1.1-5.6 0-.6-.7-.5-1.2.2-2.8.8-1.8.8-2 0-2.3-2.6-1-3.8 5.1-1.4 7.1 1.7 1.4 3.7 1.3 6.5-.1 2.3-1.2 3.6-1.4 3.6-.6 0 .3-1 3.7-2.2 7.6-1.2 3.9-2.4 8.2-2.6 9.6-.3 2.2-.2 2.4.7 2.2 1.1-.2 1.5-1.3 3.9-11 1.1-4.2 2-5.6 4-5.6.8 0 2-.4 2.6-1 1.5-1.3 9-10.4 10.6-13 2.6-4.1 1-8.5-3.3-9.2-1.8-.2-2.2 0-4.1 2m-70.2-11.7c-14 6.5-24.4 14.3-29.7 22.3-4.1 6.1-8.2 14-8 15.3.1.9.7.4 2.5-2.4 1.3-2 3-4.8 3.8-6.4 3.2-5.8 5.3-8.6 9.4-12.3 7.2-6.7 22.6-16.1 22.6-13.7 0 .2-1.8 2.5-4 5.1-4.6 5.6-13.8 14.7-22.2 22.1-3.2 2.8-6.8 6.2-7.8 7.6-1.3 1.6-2.4 2.4-3.4 2.5-.9 0-2.3 1-3.8 2.5-1.3 1.4-6.9 6-12.4 10.4-14.6 11.3-20.6 17.3-17.5 17.3.3 0 2.4-1.7 4.6-3.8 4.3-4.1 10.5-9.3 18.4-15.4 2.8-2.1 6.4-5.1 8-6.5 1.7-1.5 3.4-2.7 3.8-2.7 1 0 .9 1.2-.1 2.5-2.1 2.8.1 4.2 2.5 1.6 1.3-1.4 3-1.8 3.6-.8.6.9 1.9.6 3.8-.8 2.1-1.6 2.6-1.4 2.6 1.2 0 2.1.4 2.2 2.9 1 1.6-.8 1.8-.8 2.2 0 .3.5.8.9 1.1.9.9 0 6.1-6 9.1-10.5 3-4.6 5-6.2 3.2-2.5-3.1 6.1-3.6 11.6-1.1 11.2.8-.1 1.1-.5 1-1-1-3.4.3-7.3 7-21 2.6-5.3-.1-4.6-3 .8-1 1.8-3.8 5.8-6.2 8.8-2.4 3.1-4.8 6.2-5.2 7-1 1.8-1.4 2.1-2.9 1.8-.8-.2-1.7.3-2.8 1.5-2.5 2.6-4.7 2-2.5-.7 1.6-2 1.4-2.5-1.2-2.3-1.6.1-2.8.6-3.8 1.6-2.1 2-3.4 1.9-3.4-.2s-.8-2.1-1.9-.1c-1.2 2.3-2.4 3.2-3.2 2.4-.5-.5-.1-1.2 1.5-2.9 1.8-1.8 2-2.3 1.4-2.8-1-.6-1.5-.1 7-7.3 7.7-6.6 19.3-18.1 22.6-22.5 1.4-1.8 3.2-4.6 4-6.2 1.8-3.7 1.3-4.3-2.5-2.6"
          />
        </svg>
      </p>
      <p class="border__top color__border--base--light padding__top--m">
        {{ consultant }}
      </p>
      <h4>Client’s Signature</h4>
      <p
        class="border__top color__border--base--light margin__top--xl padding__top--m"
      >
        {{ agreement.client.name }}
      </p>
      <section id="scheduleA" class="oomph__v--m type__align--center">
        <h2>Schedule A</h2>
        <hr />
      </section>
      <h3>Description of Services</h3>
      <section class="oomph__v--l" v-html="agreement.description"></section>
      <p>
        <em
          >Please note there is a 25% deposit of
          <strong>${{ total(agreement.total * 0.25) }}</strong> required to
          begin this engagement.</em
        >
      </p>
      <footer
        class="border__top color__border--base--light oomph__v--l padding__top--l"
      >
        <p>
          <strong>Send deposits to the following address:</strong>
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
          Alternatively, deposits can be made directly via debit card by
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
    </article>
  </main>
</template>
<script>
export default {
  name: "Agreement",
  data() {
    return {
      agreement: this.$store.state.clients.filter(
        (item) => item.slug === this.$route.params.slug
      )[0],
      consultant: "Jared Pendergraft",
    };
  },
  head() {
    return {
      title: this.agreement.title + " • Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Client agreement form for " + this.agreement.title + "project",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Client agreement form for " + this.agreement.title + "project",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.agreement.title + " • Jared Pendergraft",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.$store.state.domain + "img/social.jpg",
        },
        {
          hid: "og:url",
          property: "og:url",
          content:
            this.$store.state.domain +
            "clients/agreement/" +
            this.agreement.slug,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href:
            this.$store.state.domain +
            "clients/agreement/" +
            this.agreement.slug,
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
.Agreement {
  &__wrap {
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-left: var(--size__l);
    }
    > p,
    h3,
    h4,
    footer > p,
    blockquote,
    section > p {
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
    ul,
    > ol {
      text-align: left;
      margin-left: auto;
      margin-right: auto;
      max-width: calc(100% - var(--size__l));
      width: 100%;
      @include breakpoint(xsl) {
        max-width: calc(60% + var(--size__xxl));
      }
      @include breakpoint(m) {
        max-width: calc(60% + var(--size__xxl) + var(--size__m));
      }
      @include breakpoint(l) {
        max-width: 50%;
      }
    }
    h2 {
      padding-left: var(--size__m);
      padding-right: var(--size__m);
    }
    footer > p em {
      border-bottom: var(--size__xxs) solid var(--color__base--light);
      font-family: var(--typeFamily__script);
      font-size: var(--typeSize__m);
    }
  }
  .signature {
    svg {
      @include breakpoint(m) {
        margin-left: rem(-32);
      }
    }
    + * {
      margin-top: rem(-24);
    }
  }
  @media print {
    padding-top: var(--size__l) !important;
    * {
      border-color: rgba(black, 0.25);
      color: black;
    }
    &__wrap {
      > * + * {
        margin-top: var(--size__m) !important;
      }
    }
    p,
    ol,
    ul,
    h3,
    h4,
    blockquote,
    footer > p,
    section > p {
      padding-left: var(--size__m);
      padding-right: var(--size__m);
      max-width: 100%;
    }
    h1 {
      font-size: var(--typeSize__l) !important;
    }
    h2 {
      font-size: var(--typeSize__ml) !important;
    }
    h3 {
      font-size: var(--typeSize__m) !important;
    }
    h4,
    p,
    li {
      font-size: var(--typeSize__s) !important;
      line-height: var(--typeLineheight__m) !important;
    }
    footer > p em {
      font-size: var(--typeSize__xs) !important;
    }
    hr {
      display: none;
    }
    h1 {
      font-size: var(--typeSize__xl);
    }
    h2,
    h3 {
      font-size: var(--typeSize__m);
    }
    li::marker {
      color: rgba(black, 0.5);
    }
    #scheduleA {
      page-break-before: always;
    }
  }
}
</style>

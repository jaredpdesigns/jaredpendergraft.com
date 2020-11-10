<template>
  <main :class="$options.name">
    <article :class="[$options.name, 'oomph__v--m width__xxl']">
      <nav class="oomph__h--m padding__bottom--m type__align--center">
        <button
          :class="[
            activeView === 'Overview' ? 'active' : null,
            'color__type--base--mid type__size--m-l',
          ]"
          @click="activeView = 'Overview'"
        >
          Overview
        </button>
        <button
          :class="[
            activeView === 'List' ? 'active' : null,
            'color__type--base--mid type__size--m-l',
          ]"
          @click="activeView = 'List'"
        >
          List
        </button>
        <button
          :class="[
            activeView === 'Glyphs' ? 'active' : null,
            'color__type--base--mid type__size--m-l',
          ]"
          @click="activeView = 'Glyphs'"
        >
          Glyphs
        </button>
      </nav>
      <section
        v-if="activeView === 'Overview'"
        :class="$options.name + '__wrap'"
      >
        <section
          v-for="(item, index) in blocks"
          :key="index"
          v-html="item"
          class="border__all color__bg--contrast color__border--base--light radius--s padding__all--m shadow"
        ></section>
      </section>
      <section
        v-if="activeView === 'List'"
        :class="[$options.name + '__styles', 'oomph__v--m width__ml']"
      >
        <h3>Typeface mapping</h3>
        <section
          class="border__all color__bg--contrast color__border--base--light oomph__v--m padding__all--m radius--s shadow"
        >
          <p v-for="(item, index) in typeValues" :key="index">
            <code>{{ item.variable }}: {{ item.value }};</code>
          </p>
        </section>
      </section>
      <section
        v-if="activeView === 'Glyphs'"
        :class="[$options.name + '__styles', 'oomph__v--xl width__ml']"
      >
        <section v-for="(item, index) in type" :key="index" class="oomph__v--m">
          <h3>
            {{ item.family }}
          </h3>
          <section
            v-for="(weight, index) in item.weights"
            :key="index"
            class="border__all color__bg--contrast color__border--base--light oomph__v--m radius--s padding__all--m shadow"
          >
            <p>
              <code>{{ weight }}</code>
            </p>
            <section
              class=""
              v-html="glyphs"
              :style="{
                fontFamily: 'var(--typeFamily__' + item.family + ')',
                fontWeight: weight,
              }"
            ></section>
            <p v-if="item.variants">
              <code>{{ weight + ", italic" }}</code>
            </p>
            <section
              v-for="(variant, index) in item.variants"
              :key="index"
              v-html="glyphs"
              :style="{
                fontFamily: 'var(--typeFamily__' + item.family + ')',
                fontStyle: variant,
                fontWeight: weight,
              }"
            ></section>
          </section>
        </section>
      </section>
    </article>
  </main>
</template>
<script>
import blockquote from "@/markdown/blockquote.md";
import code from "@/markdown/code.md";
import glyphs from "@/markdown/glyphs.md";
import headlines from "@/markdown/headlines.md";
import ol from "@/markdown/ol.md";
import p from "@/markdown/p.md";
import ul from "@/markdown/ul.md";
export default {
  name: "TypeTester",
  data() {
    return {
      activeView: "Overview",
      blocks: [headlines, p, blockquote, ul, ol, code],
      glyphs: glyphs,
      social: {
        title: "TypeTester • Jared Pendergraft",
        description: "A place to test out new type combinations",
        image: this.$store.state.domain + "img/social.jpg",
        slug: this.$store.state.domain + "type",
      },
      type: [
        {
          family: "body",
          variants: ["italic"],
          weights: [400, 600, 700],
        },
        {
          family: "display",
          variants: ["italic"],
          weights: [500, 700],
        },
        { family: "mono", weights: [400, 700] },
        { family: "script", weights: [400] },
      ],
      typeValues: [],
    };
  },
  head() {
    return {
      title: this.social.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.social.description,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.social.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.social.title,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.social.image,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.social.slug,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: this.social.slug,
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Trispace:wght@400;700&family=Work+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap",
        },
      ],
    };
  },
  methods: {
    getTypeValues() {
      const scope = document.body;
      // const scope = document.querySelector("main");
      const variables = this.type.map((item) => item.family);
      let array = [];
      variables.forEach((item) => {
        array.push({
          variable: "--typeFamily__" + item,
          value: getComputedStyle(scope)
            .getPropertyValue("--typeFamily__" + item)
            .trim(),
        });
      });
      this.typeValues = array;
    },
  },
  beforeMount() {
    this.getTypeValues();
  },
};
</script>
<style lang="scss">
.TypeTester {
  // --typeFamily__body: "Epilogue", sans-serif;
  // --typeFamily__display: "Work Sans", sans-serif;
  // --typeFamily__mono: "Trispace", monospace;
  // --typeFamily__script: "Trispace", monospace;
  nav button {
    @include smooth;
    font-weight: 600;
    position: relative;
    &:focus,
    &:hover {
      color: var(--color__base);
    }
    &.active {
      color: var(--color__base);
      &:after {
        background-color: var(--color__brand);
        border-radius: calc(var(--size__xs) / 4);
        bottom: 0;
        content: "";
        height: calc(var(--size__xs) / 2);
        left: 0;
        position: absolute;
        width: 100%;
      }
      &:hover {
        color: var(--color__brand);
      }
      &:focus {
        color: var(--color__base);
      }
    }
  }
  &__wrap {
    align-items: start;
    display: grid;
    grid-gap: var(--size__l);
    padding-left: var(--size__m);
    padding-right: var(--size__m);
    @media (orientation: landscape) {
      grid-template-columns: 1fr 1fr;
    }
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    > section {
      @media (orientation: landscape) {
        padding: var(--size__l);
      }
      > section {
        * + * {
          margin-top: var(--size__m);
        }
      }
    }
  }
  &__styles {
    padding-left: var(--size__m);
    padding-right: var(--size__m);
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    @include breakpoint(l) {
      max-width: var(--width__l);
    }
  }
  blockquote {
    border-left: var(--size__xs) solid var(--color__brand);
    padding-bottom: var(--size__m);
    padding-left: calc(var(--size__m) - var(--size__xs));
    padding-top: var(--size__m);
    p {
      font-size: var(--typeSize__l);
      padding-left: calc(
        var(--typeSize__xxxl) - var(--size__m) - var(--size__s)
      );
      padding-right: calc(
        var(--typeSize__xxxl) - var(--size__m) - var(--size__s)
      );
      position: relative;
      &:after,
      &:before {
        color: var(--color__base--mid);
        font-size: var(--typeSize__xxxl);
        font-style: normal;
        position: absolute;
        top: var(--size__xs);
      }
      &:after {
        content: "”";
        right: 0;
      }
      &:before {
        content: "“";
        left: 0;
      }
    }
    strong:last-child {
      display: block;
      margin-left: calc((var(--size__m) + var(--size__s)) * -1);
      margin-top: var(--size__m);
      &:before {
        content: "—";
        font-weight: normal;
      }
    }
  }
}
</style>

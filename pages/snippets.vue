<template>
  <main :class="$options.name">
    <article
      :class="[
        $options.name + '__wrap',
        'oomph__v--l padding__bottom--l padding__left--l padding__right--l width__xxl',
      ]"
    >
      <section
        :id="item.title.replace(/\s+/g, '-').toLowerCase()"
        :class="$options.name + '__item'"
        v-for="(item, index) in $store.state.snippets"
        :key="index"
      >
        <header class="oomph__v--m padding__all--m type__align--center">
          <h1>
            <nuxt-link
              :to="'#' + item.title.replace(/\s+/g, '-').toLowerCase()"
              >{{ item.title }}</nuxt-link
            >
          </h1>
          <p>
            <code>{{ item.language }}</code>
          </p>
          <hr />
        </header>
        <section
          :class="$options.name + '__item--content'"
          v-html="item.content"
        ></section>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Snippets",
  data() {
    return {
      social: {
        title: "Snippets • Jared Pendergraft",
        description: "Helpful chunks of code",
        image: this.$store.state.domain + "img/social.jpg",
        slug: this.$store.state.domain + 'snippets',
      },
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
      ],
    };
  },
};
</script>
<style lang="scss">
.Snippets {
  &__item {
    h1,
    p {
      @include breakpoint(xsl) {
        margin-left: auto;
        margin-right: auto;
        max-width: calc(60% + var(--size__l));
        width: 100%;
      }
      @include breakpoint(l) {
        max-width: calc(50% - var(--size__xxl));
      }
    }
    pre {
      @include breakpoint(xsl) {
        margin-left: auto;
        margin-right: auto;
        max-width: var(--width__l);
        width: 100%;
      }
    }
    &--content {
      > section {
        padding: var(--size__m);
        > * + * {
          margin-top: var(--size__l);
        }
      }
      code {
        .hljs-comment {
          color: var(--color__base--mid);
          font-family: var(--typeFamily__script);
        }
        .hljs-attribute,
        .hljs-doctag,
        .hljs-keyword,
        .hljs-meta-keyword,
        .hljs-name,
        .hljs-section,
        .hljs-selector-tag,
        .hljs-strong,
        .hljs-title {
          font-weight: bold;
        }
        .hljs-deletion,
        .hljs-number,
        .hljs-quote,
        .hljs-selector-class,
        .hljs-selector-id,
        .hljs-string,
        .hljs-template-tag,
        .hljs-type {
          color: var(--color__base--mid);
        }
        .hljs-addition,
        .hljs-built_in,
        .hljs-bullet,
        .hljs-code,
        .hljs-link,
        .hljs-literal,
        .hljs-meta,
        .hljs-meta-string,
        .hljs-regexp,
        .hljs-section,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-symbol,
        .hljs-template-variable,
        .hljs-title,
        .hljs-variable {
          color: var(--color__base--mid);
        }
      }
    }
  }
}
</style>

<template>
  <main :class="$options.name">
    <article>
      <header
        :class="[
          $options.name + '__callout',
          'border__bottom color__border--base--light',
        ]"
      >
        <section
          :class="[
            $options.name + '__callout--content',
            'color__bg--contrast padding__all--m',
          ]"
        >
          <section
            :class="[
              $options.name + '__callout--content-wrap',
              'oomph__v--l padding__all--m width__ml',
            ]"
          >
            <h1>{{ project.name }}</h1>
            <p class="type__size--l-l">{{ project.description }}</p>
            <a
              v-if="project.external"
              :href="project.external"
              rel="noopener"
              target="_blank"
              class="color__type--base--mid type__size--m-m"
              >Visit Site
              <Icon class="margin__left--s" name="external" :size="14"
            /></a>
          </section>
        </section>
        <figure
          :class="[
            $options.name + '__callout--img',
            'padding__all--m type__align--center',
          ]"
          :style="{ backgroundColor: project.color }"
        >
          <picture>
            <source
              sizes="(min-width: 99rem) 1280px, (min-width: 47rem) 960px, (min-width: 29rem) 480px, 240px"
              :srcset="
                ($store.state.theme === 'dark'
                  ? project.imgDark
                  : project.img + '?w=480&fm=webp 480w',
                $store.state.theme === 'dark'
                  ? project.imgDark
                  : project.img + '?w=960&fm=webp  960w',
                $store.state.theme === 'dark'
                  ? project.imgDark
                  : project.img + '?w=1280&fm=webp 1280w')
              "
              type="image/webp"
            />
            <source
              sizes="(min-width: 99rem) 1280px, (min-width: 47rem) 960px, (min-width: 29rem) 480px, 240px"
              :srcset="
                ($store.state.theme === 'dark'
                  ? project.imgDark
                  : project.img + '?w=480 480w',
                $store.state.theme === 'dark'
                  ? project.imgDark
                  : project.img + '?w=960 960w',
                $store.state.theme === 'dark'
                  ? project.imgDark
                  : project.img + '?w=1280 1280w')
              "
            />
            <img
              loading="lazy"
              :src="
                $store.state.theme === 'dark'
                  ? project.imgDark
                  : project.img + '?w=240'
              "
              :alt="project.name + ' featured image'"
              class="radius--s"
              height="150"
              width="240"
            />
          </picture>
        </figure>
      </header>
      <Nuxt
        :class="[
          $options.name + '__content',
          'oomph__v--l padding__bottom--l padding__left--l padding__right--l padding__top--xxl type__align--center width__xxl',
        ]"
      />
    </article>
  </main>
</template>
<script>
export default {
  name: "DetailWrap",
  data() {
    return {
      project: this.$store.state.projects.filter(
        (item) => item.slug === this.$route.path.split("/").filter(Boolean)[1]
      )[0],
    };
  },
  head() {
    return {
      title: this.project.name + " • Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.project.description,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.project.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.project.name + " • Jared Pendergraft",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.project.img + "?w=1200&h=630&fit=fill&f=face",
        },
        {
          hid: "og:url",
          property: "og:url",
          content:
            this.$store.state.domain + "projects/" + this.project.slug + "/",
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href:
            this.$store.state.domain + "projects/" + this.project.slug + "/",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.DetailWrap {
  padding-bottom: var(--size__l);
  padding-top: var(--header) !important;
  &__callout {
    display: grid;
    @media (orientation: landscape) {
      align-items: stretch;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
    }
    &--content {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include breakpoint(xsl) {
        padding: var(--size__l);
      }
      a {
        align-items: center;
        font-weight: 600;
        display: inline-flex;
        &:focus,
        &:hover {
          color: var(--color__brand);
        }
        svg {
          position: relative;
          top: calc(var(--size__xxs) * 2);
        }
      }
    }
    &--img {
      align-items: center;
      display: grid;
      order: -1;
      @media (orientation: landscape) {
        order: unset;
      }
      @include breakpoint(l) {
        padding: var(--size__l);
      }
      img {
        width: 100%;
      }
    }
  }
  &__content {
    @include breakpoint(xsl) {
      padding-left: var(--size__xxl);
      padding-right: var(--size__xxl);
    }
    > p,
    > h3 {
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
    > p {
      text-align: left;
    }
    > h3,
    .ProjectImgWrap {
      margin-top: var(--size__xxxl) !important;
    }
    > * + hr {
      margin-top: var(--size__m) !important;
    }
  }
}
</style>

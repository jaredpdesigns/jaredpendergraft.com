<template>
  <main :class="$options.name">
    <article class="oomph__v--l padding__bottom--xxl width__xxl">
      <header class="oomph__v--l padding__all--l type__align--center">
        <h1 class="color__type--base--mid">Featured Projects</h1>
        <hr />
      </header>
      <section
        :class="[
          $options.name + '__wrap--featured',
          'padding__left--l padding__right--l',
        ]"
      >
        <nuxt-link
          v-for="(project, index) in $store.state.projects.filter(
            (item) => item.slug
          )"
          :key="index"
          :to="'/projects/' + project.slug + '/'"
          :class="[
            $options.name + '__item',
            'color__bg--secondary radius--s shadow',
          ]"
        >
          <figure
            class="padding__all--s"
            :style="{ backgroundColor: project.color }"
          >
            <picture>
              <source
                sizes="(min-width: 99rem) 1280px, (min-width: 63rem) 960px, (min-width: 29rem) 640px, 320px"
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img + '?w=640&fm=webp 640w',
                  $store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img + '?w=960&fm=webp 960w',
                  $store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img + '?w=1280&fm=webp 1280w')
                "
                type="image/webp"
              />
              <source
                sizes="(min-width: 99rem) 1280px, (min-width: 63rem) 960px, (min-width: 29rem) 640px, 320px"
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img + '?w=640 640w',
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
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=320'
                "
                :alt="project.name + ' featured image'"
                class="radius--xs"
              />
            </picture>
          </figure>
          <section
            class="oomph__v--m padding__all--m radius__bl--s radius__br--s"
          >
            <span class="color__type--base--mid">
              <h2>{{ project.name }}</h2>
              <Icon name="arrow-right" />
            </span>
            <p>{{ project.description }}</p>
          </section>
        </nuxt-link>
      </section>
      <section
        id="passion"
        :class="[
          $options.name + '__wrap--passion',
          'padding__left--l padding__right--l',
        ]"
      >
        <a
          v-for="(project, index) in $store.state.projects.filter(
            (item) => !item.slug
          )"
          :key="index"
          :href="project.external"
          rel="noopener"
          target="_blank"
          :class="[
            $options.name + '__item',
            'color__bg--secondary radius--s shadow',
          ]"
        >
          <figure
            class="padding__all--s"
            :style="{ backgroundColor: project.color }"
          >
            <picture>
              <source
                sizes="(min-width: 29rem) 640px, 320px"
                :srcset="
                  $store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img + '?w=640&fm=webp 640w'
                "
                type="image/webp"
              />
              <source
                sizes="(min-width: 29rem) 640px, 320px"
                :srcset="
                  $store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img + '?w=640 640w'
                "
              />
              <img
                loading="lazy"
                :src="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=320'
                "
                :alt="project.name + ' featured image'"
                class="radius--xs"
              />
            </picture>
            <span class="color__bg--contrast color__type--base--mid radius--m">
              <Icon name="external" :size="12" />
            </span>
          </figure>
          <section
            class="oomph__v--m padding__all--m radius__bl--s radius__br--s"
          >
            <h2>{{ project.name }}</h2>
            <p>{{ project.description }}</p>
          </section></a
        >
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Projects",
  data() {
    return {
      social: {
        title: "Featured Projects • Jared Pendergraft",
        description: "A selection of creative projects I’ve worked on",
        image: this.$store.state.domain + "img/social-projects.jpg",
        slug: this.$store.state.domain + "projects/",
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
.Projects {
  &__wrap {
    &--featured {
      align-items: start;
      display: grid;
      grid-gap: var(--size__m);
      @include breakpoint(xsl) {
        grid-gap: var(--size__l);
        grid-template-columns: repeat(auto-fit, 1fr);
        > * {
          margin-left: auto;
          margin-right: auto;
          max-width: calc(100% - var(--size__l));
        }
      }
      @include breakpoint(m) {
        grid-template-columns: 1fr 1fr;
        padding-left: var(--size__xxl);
        padding-right: var(--size__xxl);
        > * {
          max-width: 100%;
          &:first-child {
            flex-direction: row;
            grid-column: 1 /-1;
            > * {
              flex-basis: 50%;
              &:last-child {
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            }
          }
        }
      }
      @include breakpoint(xl) {
        padding-left: var(--size__m);
        padding-right: var(--size__m);
      }
      .Projects__item img {
        @include breakpoint(xsl) {
          border-radius: var(--size__s);
        }
      }
    }
    &--passion {
      align-items: start;
      display: grid;
      grid-gap: var(--size__m);
      @include breakpoint(xsl) {
        grid-gap: var(--size__l);
        grid-template-columns: 1fr 1fr;
        padding-left: var(--size__xxl);
        padding-right: var(--size__xxl);
      }
      @include breakpoint(l) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
      @include breakpoint(xl) {
        padding-left: var(--size__m);
        padding-right: var(--size__m);
      }
    }
  }
  &__item {
    @include smooth;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &:focus,
    &:hover {
      transform: scale(1.0125);
      figure span {
        transform: translate(calc(var(--size__xs) * -1), var(--size__xs));
      }
      section span svg {
        transform: translate(var(--size__xs), var(--size__xs));
      }
    }
    &:focus-visible {
      box-shadow: 0 0 0 var(--size__xs) var(--color__base--light);
    }
    figure {
      position: relative;
      @include breakpoint(l) {
        padding: var(--size__m);
      }
      span {
        @include smooth;
        align-items: center;
        display: inline-flex;
        height: var(--size__l);
        justify-content: center;
        position: absolute;
        right: var(--size__xs);
        top: var(--size__xs);
        width: var(--size__l);
      }
      img {
        width: 100%;
      }
    }
    section {
      @include breakpoint(xl) {
        padding-left: var(--size__l);
        padding-right: var(--size__l);
      }
      span {
        align-items: center;
        display: flex;
        justify-content: space-between;
        svg {
          @include smooth;
          opacity: 0.5;
          transform: translateY(var(--size__xs));
        }
      }
    }
  }
}
</style>

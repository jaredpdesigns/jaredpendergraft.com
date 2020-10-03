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
          :to="'/projects/' + project.slug"
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
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=1280&fm=webp'
                "
                media="(min-width: 63rem)"
                type="image/webp"
              />
              <source
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=1280'
                "
                media="(min-width: 63rem)"
              />
              <source
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=960&fm=webp'
                "
                media="(min-width: 47rem)"
                type="image/webp"
              />
              <source
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=960'
                "
                media="(min-width: 47rem)"
              />
              <source
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=480&fm=webp'
                "
                type="image/webp"
              />
              <img
                loading="lazy"
                :src="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=480'
                "
                :alt="project.name + ' featured image'"
                height="289"
                width="480"
                class="radius--s"
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
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=960&fm=webp'
                "
                media="(min-width: 63rem)"
                type="image/webp"
              />
              <source
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=960'
                "
                media="(min-width: 63rem)"
              />
              <source
                :srcset="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=480&fm=webp'
                "
                type="image/webp"
              />
              <img
                :src="
                  ($store.state.theme === 'dark'
                    ? project.imgDark
                    : project.img) + '?w=480'
                "
                :alt="project.name + ' featured image'"
                height="289"
                width="480"
                class="radius--s"
              />
            </picture>
            <span class="color__bg--contrast color__type--base--mid radius--m">
              <Icon name="external" :size="12" />
            </span>
          </figure>
          <section
            class="oomph__v--m padding__all--m radius__bl--s radius__br--s"
          >
            <h3>{{ project.name }}</h3>
            <p class="type__size--m-m">{{ project.description }}</p>
          </section></a
        >
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Projects",
  head() {
    return {
      title: "Projects • Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "A selection of creative projects I’ve worked on",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "A selection of creative projects I’ve worked on",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: "A selection of creative projects I’ve worked on",
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
      @include breakpoint(m) {
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
        @include breakpoint(l) {
          border-radius: var(--size__m);
        }
      }
    }
    section {
      @include breakpoint(l) {
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

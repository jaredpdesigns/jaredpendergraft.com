<template>
  <main :class="$options.name">
    <Head
      title="Projects | Jared Pendergraft"
      description="A selection of creative projects I’ve worked on."
      url="https://jaredpendergraft.com/projects"
    />
    <article>
      <header
        class="oomph__v--m padding__bottom--xl padding__top--xl type__align--center"
      >
        <h1 class="color__type--brand">Featured Projects</h1>
        <hr />
      </header>
      <section
        :class="[
          $options.name + '--featured',
          'padding__bottom--xl padding__left--l padding__right--l',
        ]"
      >
        <figure
          v-for="(project, index) in $store.state.projects.filter(
            (item) => item.slug
          )"
          :key="'project--featured__' + index"
          :class="[
            $options.name + '--featured__item',
            'border__all color__bg--contrast color__border--base-light radius--m',
          ]"
        >
          <section
            :class="$options.name + '--featured__item--img'"
            :style="{ backgroundColor: project.color }"
          >
            <picture>
              <source
                :srcset="project.img + '?f=left&fit=fill&h=1280&w=1280&fm=webp'"
                media="(min-width: 89rem)"
              />
              <source
                :srcset="project.img + '?f=left&fit=fill&h=1280&w=1280'"
                media="(min-width: 89rem)"
              />
              <source
                :srcset="project.img + '?f=left&fit=fill&h=960&w=960&fm=webp'"
                media="(min-width: 36rem)"
              />
              <source
                :srcset="project.img + '?f=left&fit=fill&h=960&w=960'"
                media="(min-width: 36rem)"
              />
              <img
                :src="project.img + '?w=320'"
                :alt="project.name + ' featured image'"
              />
            </picture>
          </section>
          <figcaption class="oomph__v--l padding__all--l">
            <h3 class="color__type--base-mid">{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <router-link
              class="color__bg--base color__type--contrast padding__left--m padding__right--m type__size--s-l"
              :to="'/projects/' + project.slug"
              >View Case Study<Icon
                class="margin__left--s"
                name="arrow-right"
                :size="14"
            /></router-link>
          </figcaption>
        </figure>
      </section>
      <section
        :class="[
          $options.name + '--passion',
          'color__bg--tertiary padding__bottom--xl padding__left--l padding__right--l padding__top--xl',
        ]"
      >
        <header class="padding__bottom--l type__align--center">
          <h2 class="color__type--secondary">Passion Projects</h2>
        </header>
        <a
          :class="[$options.name + '--passion__item', 'radius--m']"
          v-for="(project, index) in $store.state.projects.filter(
            (item) => !item.slug
          )"
          :key="'project--passions__' + index"
          :href="project.external"
          rel="noopener"
          target="_blank"
        >
          <figure class="color__bg--contrast radius--m">
            <section
              :class="$options.name + '--passion__item--img'"
              :style="{ backgroundColor: project.color }"
            >
              <picture>
                <source
                  :srcset="project.img + '?w=640'"
                  media="(min-width: 36rem)"
                />
                <img
                  :src="project.img + '?w=320'"
                  :alt="project.name + ' featured image'"
                />
              </picture>
              <span class="color__bg--base color__type--contrast"
                ><Icon name="external" :size="14"
              /></span>
            </section>
            <figcaption class="oomph__v--s padding__all--l">
              <h3 class="color__type--base-mid">{{ project.name }}</h3>
              <p>{{ project.description }}</p>
            </figcaption>
          </figure>
        </a>
      </section>
    </article>
  </main>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Projects",
  components: { Icon },
};
</script>
<style lang="scss">
.Projects {
  &--featured {
    align-items: start;
    display: grid;
    grid-gap: var(--size__l);
    justify-items: center;
    @include breakpoint(xl) {
      grid-template-columns: repeat(auto-fit, minmax(rem(960), 1fr));
    }
    &__item {
      box-shadow: var(--shadow);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(rem(300), 1fr));
      overflow: hidden;
      &--img {
        overflow: hidden;
        img {
          transform: translate(var(--size__m), var(--size__m));
          @include breakpoint(xsl) {
            transform: translateX(var(--size__m));
          }
        }
      }
      figcaption {
        align-self: center;
      }
      a {
        align-items: center;
        border-radius: calc(var(--size__xs) + var(--size__s) + var(--size__m));
        display: inline-flex;
        font-weight: 600;
        height: calc(var(--size__m) + var(--size__l));
        &:focus,
        &:hover {
          background-color: var(--color__brand);
        }
      }
    }
  }
  &--passion {
    align-items: start;
    display: grid;
    grid-gap: var(--size__l);
    grid-template-columns: repeat(auto-fit, minmax(rem(300), 1fr));
    justify-content: center;
    justify-items: center;
    @include breakpoint(m) {
      grid-template-columns: repeat(auto-fit, minmax(rem(360), 1fr));
    }
    > header {
      grid-column: 1 / -1;
    }
    &__item {
      &:focus,
      &:hover {
        box-shadow: var(--shadow);
        span {
          transform: scale(1.0625);
        }
      }
      figure {
        overflow: hidden;
      }
      &--img {
        overflow: hidden;
        position: relative;
        img {
          transform: translate(var(--size__m), var(--size__m));
        }
        span {
          @include smooth;
          align-items: center;
          border-radius: calc(var(--size__s) + var(--size__m));
          display: inline-flex;
          height: calc(var(--size__s) + var(--size__l));
          justify-content: center;
          position: absolute;
          right: var(--size__m);
          top: var(--size__m);
          width: calc(var(--size__s) + var(--size__l));
        }
      }
    }
  }
}
</style>

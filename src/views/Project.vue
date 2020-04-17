<template>
  <main
    :class="$options.name"
    :style="{
      '--color__project': projectColor,
      '--color__project-contrast':
        contrast.ratio > 4 ? '#FFF' : darkenColor(projectColor, -0.7),
    }"
  >
    <Head
      v-for="project in projectFiltered"
      :key="project.slug"
      :title="project.name + ' | A Project by Jared Pendergraft'"
      :description="project.description"
      :image="
        'https://jaredpendergraft.com/img/projects/' +
          project.slug +
          '/' +
          project.slug +
          '-social.jpg'
      "
      :url="'https://jaredpendergraft.com/projects/' + project.slug"
    />
    <header
      v-for="project in projectFiltered"
      :key="project.name"
      :class="[
        $options.name + '__header',
        'border__bottom color__border--base-light',
      ]"
      :style="{ backgroundColor: 'var(--color__project)' }"
    >
      <figure
        :class="[
          $options.name + '__header--img',
          'padding__all--l type__align--center',
        ]"
      >
        <picture>
          <source
            :srcset="project.img + '?w=1440&fm=webp'"
            media="(min-width: 100rem)"
          />
          <source
            :srcset="project.img + '?w=1440'"
            media="(min-width: 100rem)"
          />
          <source
            :srcset="project.img + '?h=960&fm=webp'"
            media="(min-width: 80rem)"
          />
          <source :srcset="project.img + '?h=960'" media="(min-width: 80rem)" />
          <source
            :srcset="project.img + '?h=720&fm=webp'"
            media="(min-width: 63rem)"
          />
          <source :srcset="project.img + '?h=720'" media="(min-width: 63rem)" />
          <source
            :srcset="project.img + '?h=560&fm=webp'"
            media="(min-width: 36rem)"
          />
          <source :srcset="project.img + '?h=560'" media="(min-width: 36rem)" />
          <img :src="project.img + '?h=320'" :alt="project.name" />
        </picture>
      </figure>
      <section
        :class="[$options.name + '__header--text', 'color__bg--contrast']"
      >
        <section
          class="oomph__v--l padding__bottom--xl padding__left--l padding__right--l padding__top--xl"
        >
          <h1>{{ project.name }}</h1>
          <p>{{ project.description }}</p>
          <a
            v-if="project.external"
            class="color__bg--base color__type--contrast padding__left--m padding__right--m type__size--s-l"
            :href="project.external"
            target="_blank"
            rel="noopener"
          >
            Visit Site
            <Icon class="margin__left--s" :size="12" name="external" />
          </a>
        </section>
      </section>
    </header>
    <component
      id="content"
      :is="projectContent"
      :class="[
        $options.name + '__content',
        'oomph__v--l padding__bottom--xl padding__top--xl',
      ]"
    />
  </main>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Project",
  components: { Icon },
  computed: {
    project() {
      return this.$route.params.slug;
    },
    projectColor() {
      return this.projectFiltered.map((project) => project.color).toString();
    },
    projectContent() {
      return () => import(`@/projects/${this.project}.vue`);
    },
    projectFiltered() {
      const projectSlug = this.project;
      return this.$store.state.projects.filter((project) => {
        return project.slug === projectSlug;
      });
    },
  },
  data() {
    return {
      contrast: {},
    };
  },
  methods: {
    darkenColor(hex, lum) {
      hex = String(hex).replace(/[^0-9a-f]/gi, "");
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;
      var rgb = "#",
        c,
        i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
      }
      return rgb;
    },
    getContrast(hex) {
      fetch(
        "https://webaim.org/resources/contrastchecker/?fcolor=FFFFFF&bcolor=" +
          hex.replace("#", "") +
          "&api"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.contrast = data;
        });
    },
  },
  mounted() {
    this.getContrast(this.projectColor);
  },
};
</script>
<style lang="scss" scoped>
.Project {
  &__header {
    &--img {
      @include breakpoint(l) {
        padding-bottom: var(--size__xl);
        padding-top: var(--size__xl);
      }
    }
    &--text {
      > section {
        margin-left: auto;
        margin-right: auto;
        max-width: rem(960);
      }
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
  &__content {
    ::v-deep h2 {
      color: var(--color__base-mid);
    }
    ::v-deep p,
    ::v-deep .Project__content--separator {
      margin-left: auto;
      margin-right: auto;
      max-width: rem(960);
      padding-left: var(--size__l);
      padding-right: var(--size__l);
      @media print {
        max-width: 100%;
      }
    }
    ::v-deep .Project__content--separator {
      padding-top: var(--size__l);
      text-align: center;
      hr {
        margin-top: var(--size__m);
      }
    }
    ::v-deep figure {
      background-color: var(--color__project);
      margin-top: var(--size__xl);
      padding-bottom: var(--size__l);
      text-align: center;
      > section {
        padding: var(--size__l);
        + section {
          padding-top: 0;
        }
      }
      svg {
        margin-left: auto;
        margin-right: auto;
      }
      figcaption {
        background-color: var(--color__contrast);
        border-radius: var(--size__m);
        margin-left: auto;
        margin-right: auto;
        max-width: rem(960);
        padding: var(--size__m) var(--size__l);
        p {
          color: var(--color__base-mid);
          padding: 0;
        }
      }
      + figure {
        margin-top: 0;
        padding-top: 0;
      }
    }
    ::v-deep .full {
      svg + svg {
        margin-top: var(--size__l);
      }
    }
    ::v-deep .multi {
      align-items: center;
      display: grid;
      grid-gap: var(--size__l);
      @include breakpoint(xsl) {
        grid-template-columns: repeat(auto-fit, minmax(rem(160), 1fr));
      }
    }
  }
}
</style>

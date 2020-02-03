<template>
  <main
    :class="$options.name"
    :style="{
      '--color__project': projectColor,
      '--color__project-contrast':
        contrast.ratio > 4 ? '#FFF' : darkenColor(projectColor, -0.7)
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
      :url="'jaredpendergraft.com/projects/' + project.slug"
    />
    <header
      v-for="project in projectFiltered"
      :key="project.name"
      :class="$options.name + '__header'"
    >
      <section
        :class="[
          $options.name + '__header--text',
          'legible oomph__v--m padding__all--m type__align--center'
        ]"
      >
        <h1>{{ project.name }}</h1>
        <hr />
        <p>{{ project.description }}</p>

        <a
          v-if="project.external"
          :class="[
            $options.name + '__header--text-badge',
            'oomph__h--s padding__bottom--xs padding__left--m padding__right--m padding__top--xs radius--m'
          ]"
          :href="project.external"
          target="_blank"
          rel="noopener"
        >
          <h5>
            Visit Live Site
          </h5>
          <Icon :size="12" name="external" />
        </a>
      </section>
      <figure
        :class="[
          $options.name + '__header--img',
          'padding__left--m padding__right--m padding__top--m type__align--center'
        ]"
      >
        <picture>
          <source
            :srcset="project.img + '?w=1440'"
            media="(min-width: 100rem)"
          />
          <source :srcset="project.img + '?h=960'" media="(min-width: 80rem)" />
          <source :srcset="project.img + '?h=720'" media="(min-width: 63rem)" />
          <source :srcset="project.img + '?h=560'" media="(min-width: 36rem)" />
          <img :src="project.img + '?h=320'" :alt="project.name" />
        </picture>
      </figure>
    </header>
    <component
      id="content"
      :is="projectContent"
      :class="[
        $options.name + '__content',
        'oomph__v--l padding__bottom--l padding__top--l'
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
      return this.projectFiltered.map(project => project.color).toString();
    },
    projectContent() {
      return () => import(`@/projects/${this.project}.vue`);
    },
    projectFiltered() {
      const projectSlug = this.project;
      return this.$store.state.projects.filter(project => {
        return project.slug === projectSlug;
      });
    }
  },
  data() {
    return {
      contrast: {}
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
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.contrast = data;
        });
    }
  },
  mounted() {
    this.getContrast(this.projectColor);
  }
};
</script>
<style lang="scss" scoped>
.Project {
  padding: 0;
  &__header {
    background-color: var(--color__project);
    &--img {
      picture img {
        margin-left: auto;
        margin-right: auto;
      }
    }
    &--text {
      color: var(--color__project-contrast);
      @include breakpoint(xsl) {
        padding: var(--size__xl);
      }
      &-badge {
        align-items: center;
        background-color: var(--color__project-contrast);
        display: inline-flex;
        color: var(--color__project);
      }
      hr {
        background-color: var(--color__project-contrast);
        opacity: 0.25;
      }
    }
  }
  &__content {
    @include breakpoint(l) {
      padding: var(--size__xl) 0;
    }
    ::v-deep h2 {
      color: var(--color__base-mid);
    }
    ::v-deep p,
    ::v-deep .Project__content--separator {
      margin-left: auto;
      margin-right: auto;
      max-width: 75ch;
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
      padding: var(--size__l);
      text-align: center;
      svg {
        margin-left: auto;
        margin-right: auto;
      }
      figcaption {
        padding-bottom: var(--size__l);
        padding-top: var(--size__xl);
        p {
          color: var(--color__project-contrast);
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

<template>
  <main :class="$options.name" :style="{ '--color__project': projectColor }">
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
        <p v-if="project.external">
          <a :href="project.external" target="_blank" rel="noopener">
            Visit site
            <Icon :size="14" name="external" />
          </a>
        </p>
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
            media="(min-width: 1600px)"
          />
          <source
            :srcset="project.img + '?h=960'"
            media="(min-width: 1280px)"
          />
          <source
            :srcset="project.img + '?h=720'"
            media="(min-width: 1024px)"
          />
          <source :srcset="project.img + '?h=560'" media="(min-width: 600px)" />
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
      return this.projectFiltered.map(project => project.color);
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
      @include breakpoint(xsl) {
        padding: var(--size__xl);
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
          color: white;
          font-family: var(--typeFamily__secondary);
          font-size: rem(20);
          font-style: italic;
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

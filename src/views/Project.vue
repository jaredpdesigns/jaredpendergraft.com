<template>
  <main :class="$options.name" :style="'--project:' + this.projectColor">
    <Head
      v-for="project in projectFiltered"
      :key="project.slug"
      :title="project.name + ' | A Project by Jared Pendergraft'"
      :description="project.description"
      :image="'https://jaredpendergraft.com/img/projects/' + project.slug + '-social.jpg'"
      :url="'jaredpendergraft.com/projects/' + project.slug"
    />
    <header
      v-for="project in projectFiltered"
      :key="project.name"
      :class="$options.name + '__header'"
    >
      <section :class="$options.name + '__header--img'" :style="projectImg"></section>
      <section :class="$options.name + '__header--text'">
        <h1 :style="'color: '+ project.color">{{ project.name }}</h1>
        <hr />
        <p>{{ project.description }}</p>
      </section>
    </header>
    <component :is="projectContent" :class="$options.name + '__content'" />
  </main>
</template>
<script>
export default {
  name: "Project",
  computed: {
    project() {
      return this.$route.params.slug;
    },
    projects() {
      return this.$store.state.projects;
    },
    projectColor() {
      return this.projectFiltered.map(project => project.color);
    },
    projectContent() {
      return () => import(`@/projects/${this.project}.vue`);
    },
    projectFiltered() {
      const projectSlug = this.project;
      return this.projects.filter(project => {
        return project.slug === projectSlug;
      });
    },
    projectImg() {
      const img = this.projectFiltered.map(project => project.img);
      return {
        backgroundImage: "url(" + img + ")"
      };
    }
  }
};
</script>
<style lang="scss">
.Project {
  &__header {
    display: grid;
    grid-gap: rem(32);
    padding: rem(16);
    @media (orientation: landscape) {
      grid-template-columns:
        minmax(0, 1fr) minmax(0, 1fr) minmax(auto, rem(360)) minmax(
          auto,
          rem(360)
        )
        minmax(0, 1fr) minmax(0, 1fr);
      height: calc(100vh - 4rem);
    }
    @include breakpoint(xl) {
      grid-template-columns:
        minmax(0, 1fr) minmax(0, 1fr) minmax(auto, rem(480)) minmax(
          auto,
          rem(480)
        )
        minmax(0, 1fr) minmax(0, 1fr);
      grid-gap: rem(64);
    }
    &--img {
      background-color: var(--project);
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: rem(8);
      box-shadow: var(--shadow);
      grid-column: 1 / span 6;
      min-height: 38vh;
      overflow: hidden;
      @include breakpoint(s) {
        min-height: 50vh;
      }
      @media (orientation: landscape) {
        grid-column: 1 / span 3;
      }
    }
    &--text {
      align-self: center;
      grid-column: 2 / span 4;
      @include breakpoint(xsl) {
        grid-column: 4 / span 1;
      }
      > * + * {
        margin-top: rem(16);
      }
      a {
        align-items: center;
        color: var(--base-mid);
        display: inline-flex;
        svg {
          margin-left: rem(8);
        }
      }
    }
  }
  &__content {
    padding: rem(32) rem(16);
    > *,
    figcaption p {
      margin-left: auto;
      margin-right: auto;
      max-width: rem(640);
      @include breakpoint(xl) {
        max-width: rem(960);
      }
      + * {
        margin-top: rem(32);
      }
    }
    figure {
      align-items: center;
      background-color: var(--project);
      border: rem(1) solid var(--base-ghost);
      border-radius: rem(8);
      box-shadow: var(--shadow);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: auto;
      overflow: hidden;
      padding-top: rem(16);
      text-align: center;
      &.full {
        max-width: 100%;
      }
      svg {
        margin: rem(16);
        @include breakpoint(m) {
          margin-left: rem(32);
          margin-right: rem(32);
        }
      }
      figcaption {
        background-color: var(--contrast);
        color: var(--base-mid);
        margin-top: rem(16);
        padding: rem(16);
        width: 100%;
      }
      .Phone {
        @include breakpoint(xsl) {
          max-width: rem(300);
        }
        @include breakpoint(l) {
          max-width: rem(378);
        }
      }
      .Tablet--portrait {
        max-width: 75%;
        @include breakpoint(m) {
          max-width: 100%;
        }
      }
    }
    &--separator {
      margin-top: rem(64);
      text-align: center;
      h2 {
        color: var(--base-mid);
      }
      hr {
        margin-top: rem(16);
      }
    }
  }
}
</style>
<template>
  <main :class="$options.name" :style="'--project:' + this.projectColor">
    <Head
      v-for="project in projectFiltered"
      :key="project.slug"
      :title="project.name + ' | A Project by Jared Pendergraft'"
      :description="project.description"
      :image="'https://jaredpendergraft.com/img/projects/' + project.slug + '/' + project.slug + '-social.jpg'"
      :url="'jaredpendergraft.com/projects/' + project.slug"
    />
    <header
      v-for="project in projectFiltered"
      :key="project.name"
      :class="$options.name + '__header'"
    >
      <section :class="$options.name + '__header--img'" :style="projectImg"></section>
      <section :class="$options.name + '__header--text'">
        <h1>{{ project.name }}</h1>
        <hr />
        <p>{{ project.description }}</p>
      </section>
      <router-link :class="$options.name + '__header--skip'" to="#content" title="Skip to project content"><Icon name="arrow-right" :size="14"/></router-link>
    </header>
    <component id="content" :is="projectContent" :class="$options.name + '__content'" />
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
  padding-bottom: rem(16);
  padding-left: rem(16);
  padding-right: rem(16);
  &__header {
    display: grid;
    grid-gap: rem(32);
    padding: rem(16);
    position: relative;
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
        minmax(0, 1fr) minmax(0, 1fr) minmax(auto, rem(560)) minmax(
          auto,
          rem(560)
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
      h1 {
        color: var(--highlight);
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
    @keyframes float {
      from { transform: translate(-50%,0); }
      to { transform: translate(-50%,rem(8)); }
    }
    &--skip {
      @include smooth;
      align-items: center;
      animation: float 0.5s ease-in infinite;
      animation-direction: alternate-reverse;
      animation-fill-mode: both;
      background-color: var(--contrast);
      border: rem(1) solid var(--base-ghost);
      border-radius: 50%;
      bottom: rem(32);
      box-shadow: var(--shadow);
      color: var(--base-mid);
      display: none;
      height: rem(40);
      justify-content: center;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: rem(40);
      z-index: 10;
      @media (orientation: landscape) {
        display: inline-flex;
      }
      &:focus, &:hover {
        animation-play-state: paused;
        color: var(--highlight);
      }
      svg {
        transform: rotate(90deg);
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
      overflow: hidden;
      padding-top: rem(16);
      text-align: center;
      &.full {
        max-width: 100%;
      }
      .multi {
        align-items: center;
        display: inline-flex;
        flex: 1 1 auto;
        flex-wrap: wrap;
        justify-content: center;
        @include breakpoint(xsl) {
          flex-wrap: nowrap;
        }
      }
      svg {
        flex-shrink: 1;
        margin: rem(16);
        max-width: 100%;
        + svg {
          margin-left: 0;
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
          max-width: calc(100vw / 3.75);
        }
        @include breakpoint(l) {
          max-width: rem(383);
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
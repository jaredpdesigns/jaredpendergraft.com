<template>
  <main :class="$options.name">
    <Head
      title="Projects | Jared Pendergraft"
      description="A selection of creative projects I’ve worked on."
    />
    <article v-for="project in projects" :key="project.name" :class="$options.name + '__item'">
      <figure
        :class="$options.name + '__item--img'"
        :style="projectStyles(project.color, project.img)"
      ></figure>
      <figcaption :class="$options.name + '__item--text'">
        <h1>
          <a
            v-if="project.external"
            :href="project.external"
            target="_blank"
            rel="noopener"
          >{{ project.name }}</a>
          <router-link v-else :to="'/projects/' + project.slug">{{ project.name }}</router-link>
        </h1>
        <hr />
        <p>{{ project.description }}</p>
        <p>
          <a v-if="project.external" :href="project.external" target="_blank" rel="noopener">
            View project
            <Icon :size="14" name="external" />
          </a>
          <router-link v-else :to="'/projects/' + project.slug">
            View project
            <Icon :size="14" name="arrow-right" />
          </router-link>
        </p>
      </figcaption>
    </article>
  </main>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Projects",
  components: { Icon },
  computed: {
    projects() {
      return this.$store.state.projects;
    }
  },
  methods: {
    projectStyles(color, img) {
      return {
        backgroundColor: color,
        backgroundImage: "url(" + img + ")"
      };
    }
  }
};
</script>
<style lang="scss">
.Projects {
  padding-bottom: rem(16);
  padding-left: rem(16);
  padding-right: rem(16);
  &__item {
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
      grid-gap: rem(64);
    }
    + .Projects__item {
      @media (orientation: portrait) {
        margin-top: rem(16);
      }
    }
    &--img {
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
      a,
      a svg {
        @include smooth;
      }
      h1 a {
        display: block;
        transform-origin: left;
        &:focus,
        &:hover {
          transform: scale(1.0625);
        }
      }
      p a {
        align-items: center;
        color: var(--base-mid);
        display: inline-flex;
        &:focus,
        &:hover {
          color: var(--highlight);
          svg {
            transform: translateX(rem(2));
          }
        }
        svg {
          margin-left: rem(8);
        }
      }
    }
  }
}
</style>
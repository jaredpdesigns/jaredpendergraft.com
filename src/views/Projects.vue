<template>
  <main :class="$options.name">
    <Head
      title="Projects | Jared Pendergraft"
      description="A selection of creative projects I’ve worked on."
    />
    <article :class="$options.name + '__holder'">
      <header>
        <h4>Featured Projects</h4>
        <hr>
      </header>
      <figure
        v-for="project in projects"
        :key="project.name"
        class="Project"
        :style="'background-color:' + project.color"
      >
        <figcaption class="Project__text">
          <h1>{{ project.name }}</h1>
          <p>{{ project.description }}</p>
          <Button
            label="Project Details"
            :link="'/projects/' + project.slug"
            :arrow="true"
            :projectName="project.name"
          />
        </figcaption>
        <span class="Project__img">
          <img :src="'/img/projects/' + project.slug + '/' + project.img + '.png'">
        </span>
      </figure>
    </article>
    <article class="Sides">
      <header>
        <h4>Side Projects</h4>
        <hr>
      </header>
      <figure v-for="side in sides" :key="side.name" class="Side">
        <a :href="side.url" target="_blank" rel="noopener" :title="side.name">
          <span class="Side__img">
            <img :src="'/img/projects/sides/' + side.img + '.svg'">
          </span>
          <figcaption class="Side__text">
            <h3>{{ side.name }}</h3>
            <p>{{ side.description }}</p>
          </figcaption>
        </a>
      </figure>
    </article>
  </main>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  name: "Projects",
  components: { Button },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
    sides() {
      return this.$store.state.sides;
    }
  }
};
</script>
<style lang="scss" scoped>
.Projects {
  flex-direction: column;
  header {
    text-align: center;
  }
}
.Projects__holder {
  padding-left: rem(8);
  padding-right: rem(8);
}
.Project {
  @include box;
  overflow: hidden;
  position: relative;
  &:before {
    background-image: linear-gradient(
      to bottom,
      rgba(white, 0.125),
      rgba(white, 0)
    );
    bottom: 0;
    content: "";
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
  }
  + * {
    margin-top: rem(48);
  }
  &__text {
    padding: rem(24);
    text-align: center;
    @include breakpoint(m) {
      padding: rem(32);
    }
    > h1,
    p {
      color: var(--contrast);
    }
    > p {
      @include legible;
      text-align: left;
      @include breakpoint(m) {
        text-align: center;
      }
    }
    > * + * {
      margin-top: rem(24);
    }
  }
  &__img {
    display: block;
    padding-left: rem(16);
    padding-right: rem(16);
    @include breakpoint(m) {
      padding-left: rem(24);
      padding-right: rem(24);
    }
    img {
      transform: translateY(rem(6));
    }
  }
}
.Sides {
  padding-top: rem(16);
  @include breakpoint(s) {
    display: flex;
    flex-wrap: wrap;
  }
  header {
    width: 100%;
  }
}
.Side {
  flex-grow: 1;
  padding: rem(8);
  padding-top: rem(16);
  @include breakpoint(xsl) {
    flex-basis: 50%;
  }
  @include breakpoint(m) {
    flex-basis: 25%;
  }
  &__img,
  &__text {
    padding: rem(16);
  }
  &__img {
    text-align: center;
    img {
      border-radius: rem(4);
      overflow: hidden;
    }
  }
  &__text {
    padding-top: 0;
  }
  a {
    @include box;
    display: flex;
    flex-direction: column;
    transition-property: transform;
    &:focus,
    &:hover {
      border-color: transparent;
      transform: translateY(rem(-4));
    }
  }
  h3 {
    text-align: center;
  }
  p {
    text-align: center;
    @include breakpoint(s) {
      margin-left: auto;
      margin-right: auto;
      max-width: 75%;
    }
  }
}
</style>
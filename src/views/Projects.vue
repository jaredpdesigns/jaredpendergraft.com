<template>
  <main :class="$options.name">
    <Head
      title="Projects | Jared Pendergraft"
      description="A selection of creative projects I’ve worked on."
    />
    <article v-for="project in $store.state.projects" :key="project.name">
      <Project :color="project.color" :description="project.description" :external="project.external" :img="project.img" :slug="project.slug" :title="project.name"/>
    </article>
  </main>
</template>
<script>
import Project from "@/components/Project";
export default {
  name: "Projects",
  components: { Project }
};
</script>
<style lang="scss">
.Projects {
  display: grid;
  grid-gap: var(--size__l);
  @include breakpoint(l) {
    grid-template-columns: repeat(auto-fit, minmax(rem(560), 1fr));
  }
  @include breakpoint(xl) {
    grid-template-columns: repeat(auto-fit, minmax(rem(640), 1fr));
  }
}
</style>

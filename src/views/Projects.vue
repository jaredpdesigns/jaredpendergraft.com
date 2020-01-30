<template>
  <main :class="$options.name">
    <Head
      title="Projects | Jared Pendergraft"
      description="A selection of creative projects I’ve worked on."
    />
    <article v-for="project in $store.state.projects" :key="project.name">
      <router-link
        :class="[$options.name + '__item', 'legible radius--s']"
        :style="{ backgroundColor: project.color }"
        activeClass
        exactActiveClass
        to
        :target="project.slug ? false : '_blank'"
        :rel="project.slug ? false : 'noopener'"
        @click.native="
          resolveURL(project.slug ? project.slug : project.external)
        "
      >
        <section
          :class="[
            $options.name + '__item--text',
            'oomph__v--m padding__all--l'
          ]"
        >
          <h2>
            {{ project.name }}
          </h2>
          <hr />
          <p class="margin__top--l">{{ project.description }}</p>
        </section>
        <figure
          :class="[
            $options.name + '__item--img',
            'padding__left--s padding__right--s'
          ]"
        >
          <picture>
            <source
              :srcset="project.img + '?f=left&fit=fill&h=480&w=640'"
              media="(min-width: 600px)"
            />
            <img :src="project.img + '?w=320'" :alt="project.name" />
          </picture>
        </figure>
      </router-link>
    </article>
  </main>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Projects",
  components: { Icon },
  methods: {
    resolveURL(URL) {
      if (URL.includes("http")) {
        this.$router.push("/projects");
        window.open(URL, "_blank");
      } else {
        this.$router.push("/projects/" + URL);
      }
    }
  }
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
  &__item {
    align-items: start;
    box-shadow: var(--shadow);
    display: grid;
    @include breakpoint(xsl) {
      grid-template-columns: 1fr 1fr;
    }
    @include breakpoint(l) {
      margin-top: 0;
      max-width: 100%;
      min-height: rem(360);
    }
    &:focus,
    &:hover {
      transform: scale(1.005);
    }
    &--img {
      align-self: center;
      @include breakpoint(xsl) {
        padding: var(--size__s) 0;
      }
    }
    &--text {
      align-self: center;
    }
  }
}
</style>

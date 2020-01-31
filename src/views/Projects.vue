<template>
  <main :class="$options.name">
    <Head
      title="Projects | Jared Pendergraft"
      description="A selection of creative projects I’ve worked on."
    />
    <article v-for="project in $store.state.projects" :key="project.name">
      <router-link
        v-if="project.slug"
        :class="[$options.name + '__item', 'legible radius--s']"
        :style="{ backgroundColor: project.color }"
        activeClass
        exactActiveClass
        :to="'/projects/' + project.slug"
      >
        <section
          :class="[
            $options.name + '__item--text',
            'oomph__v--m padding__all--l'
          ]"
        >
          <h1>
            {{ project.name }}
          </h1>
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
              :srcset="project.img + '?f=left&fit=fill&h=640&w=640'"
              media="(min-width: 36rem)"
            />
            <img :src="project.img + '?w=320'" :alt="project.name" />
          </picture>
        </figure>
      </router-link>
      <a
        v-else
        :class="[$options.name + '__item', 'legible radius--s']"
        :style="{ backgroundColor: project.color }"
        activeClass
        exactActiveClass
        target="_blank"
        rel="noopener"
        :href="project.external"
        ><section
          :class="[
            $options.name + '__item--text',
            'oomph__v--m padding__all--l'
          ]"
        >
          <h1>
            {{ project.name }}
          </h1>
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
              :srcset="project.img + '?f=left&fit=fill&h=640&w=640'"
              media="(min-width: 36rem)"
            />
            <img :src="project.img + '?w=320'" :alt="project.name" />
          </picture></figure
      ></a>
    </article>
  </main>
</template>
<script>
export default {
  name: "Projects"
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
        padding: 0;
      }
    }
    &--text {
      align-self: center;
    }
  }
}
</style>

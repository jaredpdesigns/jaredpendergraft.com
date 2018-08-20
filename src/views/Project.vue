<template>
  <main :class="$options.name">
    <Head v-for="project in projectFiltered" :key="project.slug"
      :title="project.name + ' | A Project by Jared Pendergraft'"
      :description="project.description"
      :image="'http://jaredpendergraft.com/assets/img/projects/' + project.slug + '-social.jpg'"
      :url="'jaredpendergraft.com/projects/' + project.slug"
    />
    <header v-for="project in projectFiltered" :key="project.name" :class="$options.name + '__header'" :style="'background-color: '+ project.color + ';'">
      <section :class="$options.name + '__header--text'">
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
      </section>
      <section :class="$options.name + '__header--img'">
        <img :src="'/img/projects/' + project.slug + '/' + project.img + '.png'"/>
      </section>
    </header>
    <component :is="projectContent" :class="$options.name + '__content'"/>
  </main>
</template>
<script>
import {_} from 'vue-underscore'
export default {
  name: 'Project',
  computed: {
    project() { return this.$route.params.slug },
    projects() { return this.$store.state.projects },
    projectContent() { return () => import(`@/projects/${this.project}.vue`) },
    projectFiltered() {
      const projectSlug = this.project
      return this.projects.filter( project => { return project.slug === projectSlug } )
    }
  }
}
</script>
<style lang="scss">
@import '../assets/css/variables';
.Project {
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: rem(16);
  padding-right: rem(16);
  padding-top: 0;
  &__header {
    overflow: hidden;
    position: relative;
    width: 100%;
    &:before {
      background-image: linear-gradient(to bottom, rgba(white,0.125), rgba(white,0));
      bottom: 0;
      content: '';
      left: 0;
      right: 0;
      position: absolute;
      top: 0;
    }
    .themeDark & {
      opacity: 0.5;
      transition: opacity 0.375s ease-in;
      &:hover { opacity: 1; }
    }
    &--text {
      padding: rem(24);
      text-align: center;
      @include breakpoint(m) { padding: rem(32); }
      > h1, p { color: var(--contrast); }
      > p {
        @include legible;
        text-align: left;
        @include breakpoint(m) { text-align: center; }
      }
      > * + * { margin-top: rem(24); }
    }
    &--img {
      padding-left: rem(16);
      padding-right: rem(16);
      text-align: center;
      img { transform: translateY(rem(6)); }
    }
  }
  &__content {
    padding: rem(24);
    @include breakpoint(l) { padding: rem(48) rem(24); }
    > * + * { margin-top: rem(24); }
    > * + h2 { margin-top: rem(48); }
    h2, > p, pre, blockquote { @include legible; }
    blockquote {
      background-color: var(--contrast);
      border-left: rem(4) solid var(--highlight-50);
      color: var(--base-50);
      padding: rem(8) rem(16);
      p { text-align: left; }
    }
    figure {
      text-align: center;
      &.multi {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        @include breakpoint(xsl) {
          flex-wrap: nowrap;
        }
        > * {
          margin: rem(8);
          @include breakpoint(xsl) { margin: 0 rem(16); }
        }
      }
      .devicePhone { @include breakpoint(xsl) { max-width: rem(378); } }
      .deviceTablet { max-width: rem(800); }
      svg image {
        .themeDark & {
          opacity: 0.5;
          transition: opacity 0.375s ease-in;
          &:hover { opacity: 1; }
        }
      }
    }
  }
}
</style>
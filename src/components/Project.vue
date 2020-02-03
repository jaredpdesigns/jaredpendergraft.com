<template>
  <router-link
    v-if="slug"
    :class="[$options.name, 'legible radius--s']"
    activeClass
    exactActiveClass
    :to="'/projects/' + slug"
    :style="{
      '--color__project': color,
      '--color__project-contrast':
        contrast.ratio > 8 ? '#FFFFFF' : darkenColor(color, -0.7)
    }"
  >
    <section :class="[$options.name + '__text', 'oomph__v--m padding__all--l']">
      <h1>
        {{ title }}
      </h1>
      <hr />
      <p class="margin__top--l">{{ description }}</p>
      <h5
        :class="[
          $options.name + '__text--badge',
          'padding__bottom--xs padding__left--m padding__right--m padding__top--xs radius--m'
        ]"
      >
        Case Study
      </h5>
    </section>
    <figure
      :class="[$options.name + '__img', 'padding__left--s padding__right--s']"
    >
      <picture>
        <source
          :srcset="img + '?f=left&fit=fill&h=640&w=640'"
          media="(min-width: 36rem)"
        />
        <img :src="img + '?w=320'" :alt="title + ' featured image'" />
      </picture>
    </figure>
  </router-link>
  <a
    v-else
    :class="[$options.name, 'legible radius--s']"
    activeClass
    exactActiveClass
    target="_blank"
    rel="noopener"
    :href="external"
    :style="{
      '--color__project': color,
      '--color__project-contrast':
        contrast.ratio > 8 ? '#FFFFFF' : darkenColor(color, -0.7)
    }"
    ><section
      :class="[$options.name + '__text', 'oomph__v--m padding__all--l']"
    >
      <h1>
        {{ title }}
      </h1>
      <hr />
      <p class="margin__top--l">{{ description }}</p>
    </section>
    <figure
      :class="[$options.name + '__img', 'padding__left--s padding__right--s']"
    >
      <picture>
        <source
          :srcset="img + '?f=left&fit=fill&h=640&w=640'"
          media="(min-width: 36rem)"
        />
        <img :src="img + '?w=320'" :alt="title + ' featured image'" />
      </picture></figure
  ></a>
</template>
<script>
export default {
  name: "Project",
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
    this.getContrast(this.color);
  },
  props: {
    color: { default: "" },
    description: { default: "" },
    external: { default: "" },
    img: { default: "" },
    slug: { default: "" },
    title: { default: "" }
  }
};
</script>
<style lang="scss" scoped>
.Project {
  align-items: start;
  background-color: var(--color__project);
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
  &__img {
    align-self: center;
    @include breakpoint(xsl) {
      padding: 0;
    }
  }
  &__text {
    align-self: center;
    color: var(--color__project-contrast);
    &--badge {
      background-color: var(--color__project-contrast);
      display: inline-block;
      color: var(--color__project);
    }
    hr {
      background-color: var(--color__project-contrast);
      opacity: 0.25;
    }
  }
}
</style>

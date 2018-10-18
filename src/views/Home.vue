<template>
<main>
  <Head
    title="About | Jared Pendergraft"
    description="The personal website of Jared Pendergraft"
    keywords="jared pendergraft, jared pendergraft designs, design, website, graphic design hawaii, web design hawaii, graphic design maui, web design maui"
    image="http://jaredpendergraft.com/img/social.jpg"
    url="jaredpendergraft.com"
  />
  <article :class="$options.name">
    <figure :class="$options.name + '__img'">
      <img src="../assets/img/profile.jpg"/>
    </figure>
    <figcaption :class="$options.name + '__text'">
      <h1>Hello, it’s nice to meet you.</h1>
      <p>I’m a multi-disciplinary designer focusing on the <em>intersection of design and development</em>. I care deeply about how something works as much as its outward appearance and am always looking to <em>improve, optimize and scale my ideas</em>.</p>
      <p>I approach design challenges holistically, building solutions from beginning to end with <em>extensibility and modularity</em> in mind. I enjoy building out designs to fully-functional front-end code—bridging the gap between design and development seamlessly.</p>
      <p>View <router-link to="/projects">projects</router-link> I’ve worked on or learn more about my <router-link to="/hire#process">creative process</router-link>.</p>
    </figcaption>
  </article>
</main>
</template>
<script>
export default {
  name: "Profile"
};
</script>
<style lang="scss">
@import "../assets/css/variables";
.Profile {
  @include box;
  align-items: stretch;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  overflow: hidden;
  @include breakpoint(m) {
    flex-wrap: nowrap;
  }
  &__img,
  &__text {
    flex-grow: 1;
    flex-shrink: 1;
    padding: rem(24);
    @include breakpoint(m) {
      flex-basis: 50%;
    }
  }
  &__img {
    background-color: var(--base-50);
    background-image: url("../assets/img/profile-big.jpg");
    background-position: 50% 25%;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 38vh;
    padding-bottom: 0;
    text-align: center;
    @include breakpoint(l) {
      min-height: 50vh;
    }
    img {
      visibility: hidden;
    }
    .themeDark & {
      opacity: 0.5;
      transition: opacity 0.375s ease-in;
      &:hover {
        opacity: 1;
      }
    }
  }
  &__text {
    @include breakpoint(m) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: rem(32);
    }
    h1 {
      color: var(--highlight);
    }
    > * + * {
      margin-top: rem(16);
    }
  }
}
</style>
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
      <header>
        <h1>Hello, it’s nice to meet you.</h1>
        <hr />
      </header>
      <figure :class="$options.name + '__img'">
        <img src="../assets/img/profile-big.jpg" alt="My smiling face, greeting you." />
      </figure>
      <figcaption :class="$options.name + '__text'">
        <p>
          I’m a multi-disciplinary designer focusing on the
          <em>intersection of design and development</em>. I care deeply about how something works as much as its outward appearance and am always looking to
          <em>improve, optimize and scale my ideas</em>.
        </p>
        <p>
          I approach design challenges holistically, building solutions from beginning to end with
          <em>extensibility and modularity</em> in mind. I enjoy building out designs to fully-functional front-end code—bridging the gap between design and development seamlessly.
        </p>
        <p>
          View
          <router-link to="/projects">projects</router-link> I’ve worked on or learn more about my
          <router-link to="/hire#process">creative process</router-link>.
        </p>
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
.Profile {
  align-items: start;
  display: grid;
  grid-gap: rem(32);
  grid-template-columns:
    minmax(0, 1fr) minmax(0, 1fr) minmax(auto, rem(480)) minmax(auto, rem(480))
    minmax(0, 1fr) minmax(0, 1fr);
  padding: rem(16);
  @include breakpoint(xl) {
    grid-template-columns:
      minmax(0, 1fr) minmax(0, 1fr) minmax(auto, rem(560)) minmax(
        auto,
        rem(560)
      )
      minmax(0, 1fr) minmax(0, 1fr);
    grid-gap: rem(64);
  }
  > header {
    grid-column: 3 / span 2;
    padding-top: rem(16);
    text-align: center;
    h1 {
      color: var(--highlight);
    }
  }
  > figure {
    border-radius: rem(8);
    box-shadow: var(--shadow);
    justify-self: end;
    grid-column: 1 / span 6;
    overflow: hidden;
    @include breakpoint(xsl) {
      grid-column: 1 / span 3;
    }
    img {
      vertical-align: middle;
      @include breakpoint(m) {
        max-height: 75vh;
      }
    }
  }
  > figcaption {
    align-self: center;
    grid-column: 2 / span 4;
    @include breakpoint(xsl) {
      grid-column: 4 / span 1;
    }
    > * + * {
      margin-top: rem(16);
    }
  }
}
</style>
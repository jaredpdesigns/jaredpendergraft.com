<template>
  <main :class="$options.name">
    <Head
      title="About | Jared Pendergraft"
      description="The personal website of Jared Pendergraft"
      keywords="jared pendergraft, jared pendergraft designs, design, website, graphic design hawaii, web design hawaii, graphic design maui, web design maui"
      image="http://jaredpendergraft.com/img/social.jpg"
      url="jaredpendergraft.com"
    />
    <article>
      <header class="oomph__v--m padding__all--l type__align--center">
        <h1 class="color__type--brand">Hello, it’s nice to meet you.</h1>
        <hr />
      </header>
      <section
        :class="[
          $options.name + '__img',
          'border__all color__bg--contrast color__border--base-ghost radius--s'
        ]"
      >
        <figure :class="$options.name + '__img--wrap'">
          <picture>
            <source
              :srcset="img + '?f=face&fit=fill&h=960&w=960'"
              media="(min-width: 99rem)"
            />
            <source
              :srcset="img + '?f=face&fit=fill&h=960&w=640'"
              media="(orientation: landscape), (min-width: 63rem)"
            />
            <img
              :src="img + '?f=face&fit=fill&h=640&w=960'"
              alt="My smiling face, greeting you"
            />
          </picture>
        </figure>
        <figcaption
          :class="[
            $options.name + '__img--text',
            'oomph__v--l padding__all--m'
          ]"
        >
          <p>
            I’m a multi-disciplinary designer focusing on the
            <em>intersection of design and development</em>. I care deeply about
            how something works as much as its outward appearance and am always
            looking to <em>improve, optimize and scale my ideas</em>.
          </p>
          <p>
            I approach design challenges holistically, building solutions from
            beginning to end with
            <em>extensibility and modularity</em> in mind. I enjoy building out
            designs to fully-functional front-end code—bridging the gap between
            design and development seamlessly.
          </p>
          <p>
            View
            <router-link to="/projects">projects</router-link>&nbsp;I’ve worked
            on or learn more about my
            <router-link to="/hire#process">creative process</router-link>.
          </p>
        </figcaption>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Profile",
  data() {
    return {
      img:
        "https://images.ctfassets.net/cuehicrlqnvu/48OC0pyrFD6iWSokRiz3Zs/f9fb4d4df16062af7a4eb885b1abc08e/profile-big.jpg"
    };
  }
};
</script>
<style lang="scss" scoped>
.Profile {
  &__img {
    box-shadow: var(--shadow);
    margin-left: auto;
    margin-right: auto;
    max-width: rem(960);
    overflow: hidden;
    @media (orientation: landscape), (min-width: 63rem) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(rem(320), 1fr));
    }
    @include breakpoint(xl) {
      max-width: rem(1280);
    }
    @media (prefers-color-scheme: dark) {
      background-color: var(--color__contrast-extra);
      border-color: var(--color__contrast-extra);
    }
    &--wrap {
      @media (orientation: landscape), (min-width: 63rem) {
        position: relative;
        picture img {
          height: 100%;
          object-fit: cover;
          position: absolute;
          width: 100%;
        }
      }
    }
    &--text {
      align-self: center;
      @include breakpoint(xsl) {
        padding: var(--size__l);
      }
      @include breakpoint(l) {
        padding-bottom: var(--size__xl);
        padding-top: var(--size__xl);
      }
    }
  }
}
</style>

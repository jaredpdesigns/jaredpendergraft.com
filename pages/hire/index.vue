<template>
  <main :class="$options.name">
    <article>
      <header
        class="oomph__v--l padding__bottom--xxxl padding__left--m padding__right--m padding__top--l type__align--center width__xxl"
      >
        <h1
          class="color__type--base--mid padding__left--m padding__right--m width__ml"
        >
          Let’s create something great together!
        </h1>
        <hr />
        <p class="type__align--left">
          I’m not currently looking for any full-time work but feel free to view
          my
          <nuxt-link to="/hire/resume">résumé</nuxt-link> to get a little more
          information about my background.
        </p>
        <p class="type__align--left">
          I’m always interested in creative freelance opportunities—if you'd
          like to work together send me an
          <a
            href="mailto:hello@jaredpendergraft.com?subject=Hey Jared, love the site, how’s it going?"
            >email</a
          >.
        </p>
      </header>
      <section
        id="process"
        class="color__bg--secondary oomph__v--l padding__bottom--xxxl padding__top--xxxl"
      >
        <header
          class="oomph__v--l padding__left--m padding__right--m type__align--center width__xxl"
        >
          <h2>My Creative Process</h2>
          <hr />
          <p class="type__align--left">
            While each project requires different approaches to problem-solving,
            here are a few examples of common ways I approach design challenges:
          </p>
        </header>
        <section
          class="oomph__v--m padding__left--m padding__right--m padding__top--l width__xxl"
        >
          <figure
            class="color__bg--contrast radius--m"
            v-for="(process, index) in processes"
            :key="index"
          >
            <section class="padding__all--m">
              <Process :name="process.img" :size="48" />
            </section>
            <figcaption class="oomph__v--m padding__all--m">
              <h3>
                {{ process.label }}
              </h3>
              <p>
                {{ process.description }}
              </p>
            </figcaption>
          </figure>
        </section>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Hire",
  data() {
    return {
      processes: {
        one: {
          label: "Initial Discovery & Research",
          description:
            "Figure out what we’re building and what problems we’re trying to solve.",
          img: "Research",
        },
        two: {
          label: "Style & Tone",
          description:
            "Explore visual ideas and establish the voice of the project.",
          img: "Style",
        },
        three: {
          label: "Present Ideas & Determine Constraints",
          description:
            "Finalize approval of visual direction and confirm what was designed can be built.",
          img: "Present",
        },
        four: {
          label: "Finalize Architecture & Build",
          description:
            "Confirm our design supports established content models and begin development.",
          img: "Build",
        },
        five: {
          label: "Test, Optimize & Iterate",
          description:
            "Perform A/B testing when applicable to confirm assumptions, optimize content for best performance, and determine what can be improved in the next cycle.",
          img: "Iterate",
        },
      },
    };
  },
  head() {
    return {
      title: "Hire Me • Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Let’s create something great together",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Let’s create something great together",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: "Let’s create something great together",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.Hire {
  padding-bottom: 0;
  header {
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    > p {
      padding-left: var(--size__m);
      padding-right: var(--size__m);
      @include breakpoint(xsl) {
        margin-left: auto;
        margin-right: auto;
        max-width: calc(60% + (var(--size__l) * 2));
        padding-left: var(--size__l);
        padding-right: var(--size__l);
        width: 100%;
      }
      @include breakpoint(l) {
        max-width: 50%;
      }
    }
  }

  #process {
    > section {
      @include breakpoint(xsl) {
        padding-left: var(--size__l);
        padding-right: var(--size__l);
      }
      @include breakpoint(l) {
        align-items: start;
        display: grid;
        grid-gap: var(--size__l);
        grid-template-columns: 1fr 1fr;
      }
    }
    figure {
      display: flex;
      @include breakpoint(m) {
        margin-left: auto;
        margin-right: auto;
        max-width: var(--width__ml);
        width: 100%;
      }
      @include breakpoint(l) {
        margin-top: 0;
        max-width: 100%;
      }
      > section {
        flex-shrink: 0;
      }
    }
  }
}
</style>

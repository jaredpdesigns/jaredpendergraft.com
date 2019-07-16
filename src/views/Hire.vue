<template>
  <main :class="$options.name">
    <Head title="Hire Me | Jared Pendergraft" description="Let’s create something great together!" />
    <header>
      <h1>Let’s create something great together!</h1>
      <hr/>
      <p>
        I’m not currently looking for any full-time work but feel free to view my
        <router-link to="/hire/resume">résumé</router-link> to get a little more information about my background.
      </p>
      <p>
        I’m always interested in creative freelance opportunities—if you'd like to work together send me an
        <a
          href="mailto:hello@jaredpendergraft.com?subject=Hey Jared, love the site, how’s it going?"
        >email</a>.
      </p>
    </header>
    <article id="process">
      <header>
        <h2>My Creative Process</h2>
        <hr/>
        <p>While each project requires different approaches to problem-solving, here are a few examples of common ways I approach design challenges:</p>
      </header>
      <section :class="$options.name + '__process'">
        <section
          v-for="process in processes"
          :key="process.label"
          :class="$options.name + '__process--item'"
        >
          <figure>
            <Process :name="process.img" :size="64" />
          </figure>
          <figcaption>
            <h4>{{ process.label }}</h4>
            <p>{{ process.description }}</p>
          </figcaption>
        </section>
      </section>
    </article>
  </main>
</template>
<script>
import Process from "@/components/Process.vue";
export default {
  name: "Hire",
  components: { Process },
  data() {
    return {
      processes: {
        one: {
          label: "Initial Discovery & Research",
          description:
            "Figure out what we’re building and what problems we’re trying to solve.",
          img: "Research"
        },
        two: {
          label: "Style & Tone",
          description:
            "Explore visual ideas and establish the voice of the project.",
          img: "Style"
        },
        three: {
          label: "Present Ideas & Determine Constraints",
          description:
            "Finalize approval of visual direction and confirm what was designed can be built.",
          img: "Present"
        },
        four: {
          label: "Finalize Architecture & Build",
          description:
            "Confirm our design supports established content models and begin development.",
          img: "Build"
        },
        five: {
          label: "Test, Optimize & Iterate",
          description:
            "Perform A/B testing when applicable to confirm assumptions, optimize content for best performance, and determine what can be improved in the next cycle.",
          img: "Iterate"
        }
      }
    };
  }
};
</script>
<style lang="scss">
.Hire {
  padding: rem(16);
  h1 {
    color: var(--highlight);
  }
  h2, h4 {
    color: var(--base-mid);
  }
  header {
    padding-top: rem(16);
    text-align: center;
    > * {
      margin-left: auto;
      margin-right: auto;
      max-width: rem(640);
      padding-left: rem(16);
      padding-right: rem(16);
      @include breakpoint(xl) {
        max-width: rem(960);
      }
      + * {
        margin-top: rem(16);
      }
    }
    > p {
      text-align: left;
    }
  }
  article > header {
    margin: rem(32) 0;
  }
  &__process {
    align-items: start;
    display: grid;
    grid-gap: rem(32);
    grid-template-columns: repeat(auto-fit, minmax(rem(320), 1fr));
    margin: rem(16) auto;
    max-width: rem(1280);
    &--item {
      @include smooth;
      background-color: var(--contrast);
      border: rem(1) solid var(--base-ghost);
      border-radius: rem(8);
      box-shadow: var(--shadow);
      padding: rem(16);
      transform-origin: center;
      * + * {
        margin-top: rem(16);
      }
      &:hover {
        animation: zoom 0.5s ease-in;
      }
      figure {
        text-align: center;
      }
      figcaption {
        padding: rem(16);
      }
    }
  }
}
</style>
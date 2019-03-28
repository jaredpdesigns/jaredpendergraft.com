<template>
  <main :class="$options.name">
    <Head title="Hire Me | Jared Pendergraft" description="Let’s create something great together!"/>
    <header>
      <h1>Let’s create something great together!</h1>
      <p>
        I’m not currently looking for any full-time work but feel free to view my
        <router-link to="resume">résumé</router-link>to get a little more information about my background.
      </p>
      <p>
        I’m always interested in creative freelance opportunities—if you'd like to work together send me an
        <a
          href="mailto:hello@jaredpendergraft.com?subject=Hey Jared, love the site, how’s it going?"
        >email</a>.
      </p>
    </header>
    <article id="process" class="Process">
      <section class="Process__wrapper">
        <header>
          <h2>My Creative Process</h2>
        </header>
        <section v-for="process in processes" :key="process.label" class="Process__item">
          <figure>
            <Process :name="process.img" :size="64"/>
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
<style lang="scss" scoped>
.Hire {
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0;
  padding-right: 0;
  > header {
    margin: 0 auto;
    max-width: rem(960);
    padding: rem(32);
    h1 {
      color: var(--highlight);
      padding: rem(16) 0;
      text-align: center;
    }
    * + * {
      margin-top: rem(24);
    }
  }
}
.Process {
  @include box;
  max-width: 100%;
  padding: rem(16);
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    max-width: rem(1280);
    > header {
      padding: rem(24);
      text-align: center;
      width: 100%;
    }
  }
  &__item {
    flex: 1 1 100%;
    padding: 1.5rem;
    @include breakpoint(s) {
      flex: 1 1 45%;
      max-width: 50%;
    }
    @include breakpoint(l) {
      flex: 1 1 32%;
      max-width: calc(100% / 3);
    }
    figure {
      padding-bottom: rem(24);
      text-align: center;
      svg {
        margin: 0 auto;
      }
    }
    h4 {
      color: var(--highlight);
      margin-bottom: rem(8);
    }
  }
}
</style>
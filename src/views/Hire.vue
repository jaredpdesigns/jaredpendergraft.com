<template>
  <main :class="$options.name">
    <Head
      title="Hire Me | Jared Pendergraft"
      description="Let’s create something great together!"
      url="https://jaredpendergraft.com/hire"
    />
    <article>
      <header
        class="oomph__v--m padding__bottom--xl padding__left--l padding__right--l padding__top--xl type__align--center"
      >
        <h1 class="color__type--brand">
          Let’s create something great together!
        </h1>
        <hr />
        <p class="legible margin__top--l type__align--left">
          I’m not currently looking for any full-time work but feel free to view
          my
          <router-link to="/hire/resume">résumé</router-link> to get a little
          more information about my background.
        </p>
        <p class="legible margin__top--l type__align--left">
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
        class="color__bg--tertiary oomph__v--xl padding__bottom--xl padding__left--l padding__right--l padding__top--xl"
      >
        <header class="oomph__v--m type__align--center">
          <h2 class="color__type--secondary">My Creative Process</h2>
          <p class="legible margin__top--l type__align--left">
            While each project requires different approaches to problem-solving,
            here are a few examples of common ways I approach design challenges:
          </p>
        </header>
        <section :class="$options.name + '__process'">
          <section
            v-for="process in processes"
            :key="process.label"
            :class="[
              $options.name + '__process--item',
              'color__bg--contrast radius--s',
            ]"
          >
            <figure
              class="border__bottom color__border--base-ghost padding__all--m type__align--center"
            >
              <Process :name="process.img" :size="64" />
            </figure>
            <figcaption
              class="oomph__v--m padding__bottom--l padding__left--m padding__right--m padding__top--l"
            >
              <h3 class="color__type--base-mid">{{ process.label }}</h3>
              <p>{{ process.description }}</p>
            </figcaption>
          </section>
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
};
</script>
<style lang="scss" scoped>
.Hire {
  &__process {
    --max: #{rem(480)};
    align-items: start;
    display: grid;
    grid-gap: var(--size__l);
    grid-template-columns: repeat(auto-fit, minmax(rem(320), 1fr));
    @include breakpoint(l) {
      grid-template-columns: repeat(auto-fit, minmax(rem(400), 1fr));
    }
    @include breakpoint(xl) {
      margin-left: auto;
      margin-right: auto;
      max-width: calc(var(--max) * 3.5);
    }
    &--item {
      margin-left: auto;
      margin-right: auto;
      max-width: var(--max);
    }
  }
}
</style>

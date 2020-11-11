<template>
  <div>
    <LazyHeader />
    <LazyDetailWrap v-if="$route.name.includes('projects-')" />
    <LazyResumeWrap v-else-if="$route.name === 'hire-me'" />
    <Nuxt v-else />
    <LazyGuides />
  </div>
</template>
<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: "og:url",
          property: "og:url",
          content: this.$store.state.domain + this.$route.path,
        },
        {
          hid: "twitter:url",
          property: "twitter:url",
          content: this.$store.state.domain + this.$route.path,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: this.$store.state.domain + this.$route.path,
        },
      ],
    };
  },
  methods: {
    setInitialTheme() {
      let root = document.getElementsByTagName("html")[0];
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.setAttribute("data-theme", "dark");
        this.$store.dispatch("setTheme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        this.$store.dispatch("setTheme", "light");
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setInitialTheme();
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          this.setInitialTheme();
        });
    });
  },
};
</script>

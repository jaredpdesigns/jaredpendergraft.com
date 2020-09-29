<template>
  <div>
    <LazyHeader />
    <DetailWrap v-if="$route.path.includes('/projects/')" />
    <ResumeWrap v-else-if="$route.name === 'hire-resume'" />
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
};
</script>

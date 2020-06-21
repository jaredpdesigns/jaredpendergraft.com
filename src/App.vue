<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  components: { Header },
};
</script>
<style lang="scss">
@import "assets/css/reset";
@import "assets/css/base";
@import "assets/css/helpers";
.legible {
  margin-left: auto;
  margin-right: auto;
  max-width: 60ch;
  width: 100%;
  @include breakpoint(m) {
    max-width: 75ch;
  }
  @media print {
    max-width: 7in;
  }
}

@media print {
  .Invoice,
  .Agreement,
  .Resume {
    * {
      border-color: #ccc !important;
      color: black !important;
      &:before {
        color: #666 !important;
      }
    }
  }
  .Resume article {
    padding-top: var(--size__l);
    > header {
      display: none;
    }
    > section {
      margin-top: var(--size__m);
      hr {
        margin-top: 0 !important;
      }
    }
    > * + * {
      margin-top: var(--size__s) !important;
    }
  }
  #signatures,
  #scheduleA,
  #technologies,
  .Resume .Recommendation:nth-of-type(3) {
    page-break-before: always;
  }
}
</style>

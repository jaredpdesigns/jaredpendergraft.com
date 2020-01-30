<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  components: { Header }
};
</script>
<style lang="scss">
@import "assets/css/reset";
@import "assets/css/base";
@import "assets/css/helpers";
.legible {
  margin-left: auto;
  margin-right: auto;
  max-width: 75ch;
  @media print {
    max-width: 100%;
  }
}

.Invoice,
.Agreement {
  * {
    @media print {
      border-color: #ccc !important;
      color: black !important;
    }
  }
  #signatures,
  #scheduleA {
    page-break-before: always;
  }
}

.Projects__item--text,
.Project__header {
  color: white;
  p a {
    border-color: rgba(white, 0.25);
  }
  hr {
    background-color: rgba(white, 0.25);
  }
}
</style>

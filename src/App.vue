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

@media print {
  .Invoice,
  .Agreement,
  .Resume {
    * {
      border-color: #ccc !important;
      color: black !important;
      &:before {
        color: #666;
      }
    }
  }
  .Resume aside {
    max-width: 100%;
  }
  #signatures,
  #scheduleA,
  .Resume article section:nth-of-type(3),
  .Resume article h4:nth-of-type(3) {
    page-break-before: always;
  }
}
</style>

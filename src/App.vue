<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  components: { Header },
  mounted() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      let root = document.getElementsByTagName("html")[0];
      root.setAttribute("data-theme", "dark");
      this.$store.dispatch("updateTheme", "dark");
    }
  }
};
</script>
<style lang="scss">
@import url("https://use.typekit.net/zkw5aru.css");

:root {
  --hue: 158;
  --base: hsl(var(--hue), 12%, 25%);
  --base-50: hsl(var(--hue), 4%, 50%);
  --base-38: hsl(var(--hue), 4%, 62%);
  --base-12: hsl(var(--hue), 4%, 88%);
  --bg: hsl(var(--hue), 4%, 98%);
  --contrast: white;
  --highlight: hsl(var(--hue), 32%, 38%);
  --highlight-50: hsl(var(--hue), 32%, 75%);
}

:root[data-theme="dark"] {
  --base: hsl(var(--hue), 4%, 75%);
  --base-38: hsl(var(--hue), 4%, 38%);
  --base-12: hsl(var(--hue), 4%, 12%);
  --bg: hsl(var(--hue), 4%, 12%);
  --contrast: hsl(var(--hue), 12%, 4%);
  --highlight-50: hsl(var(--hue), 32%, 24%);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}

html {
  background-color: var(--bg);
  color: var(--base);
  font-family: "source-sans-pro", sans-serif;
  height: 100%;
  padding-top: rem(48);
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
  @include breakpoint(xs-only) {
    padding-top: rem(80);
  }
  @include breakpoint(l) {
    padding-top: rem(64);
  }
}

::selection {
  background-color: var(--highlight);
  color: white;
}

h1,
h2,
h3,
h4,
.btn {
  font-family: "basic-sans", sans-serif;
}

h1,
h2,
h3,
h4 {
  color: var(--base-50);
}

h1 {
  font-size: rem(28);
  line-height: rem(32);
}

h2 {
  font-size: rem(22);
  line-height: rem(32);
}

h3 {
  font-size: rem(20);
  line-height: rem(32);
}

h4 {
  font-size: rem(16);
  letter-spacing: rem(1);
  line-height: rem(24);
  text-transform: uppercase;
}

p,
li {
  font-size: rem(18);
  line-height: rem(32);
}

p {
  @include breakpoint(xl) {
    font-size: rem(20);
    line-height: rem(40);
  }
}

small {
  font-size: rem(16);
  line-height: rem(24);
}

ul,
ol {
  li {
    list-style: none;
    position: relative;
  }
  li:before {
    color: var(--highlight);
    display: inline-block;
  }
}

ol {
  counter-reset: custom-counter;
  li {
    padding-left: rem(40);
    @include breakpoint(m) {
      padding-left: 0;
    }
    &:before {
      content: counter(custom-counter) ".";
      counter-increment: custom-counter;
      display: inline-block;
      left: 0;
      position: absolute;
      text-align: right;
      width: rem(24);
      @include breakpoint(m) {
        left: rem(-32);
      }
    }
  }
}

ul li {
  padding-left: rem(16);
  @include breakpoint(m) {
    padding-left: 0;
  }
  &:before {
    content: "•";
    display: inline-block;
    left: 0;
    position: absolute;
    @include breakpoint(m) {
      left: rem(-16);
    }
  }
}

nav li {
  padding: 0;
  &:before {
    content: none;
  }
}

pre {
  background-color: var(--contrast);
  overflow: hidden;
  overflow-x: auto;
  padding: rem(24);
  code {
    font-size: rem(12);
    line-height: rem(24);
    @include breakpoint(xl) {
      font-size: rem(14);
    }
  }
  .hljs-variable {
    color: var(--highlight);
  }
  .hljs-number {
    color: var(--base-38);
  }
}
code {
  color: var(--base-50);
  font-family: "source-code-pro", monospace;
  p > & {
    background-color: var(--contrast);
    padding: rem(4) rem(8);
  }
}

a {
  border: none;
  border-bottom: rem(2) solid transparent;
  color: var(--highlight);
  cursor: pointer;
  text-decoration: none;
  transition: 0.375s ease-in;
  transition-property: color, border-color;
  &:focus {
    outline: none;
  }
  p & {
    border-color: var(--highlight-50);
    &:focus,
    &:hover {
      border-color: var(--base-50);
      color: var(--base);
    }
  }
}

a:hover,
a:focus,
nav .currentPage,
nav .currentParent {
  border-color: var(--highlight-50);
}

hr {
  background-color: var(--highlight-50);
  border-radius: rem(2);
  display: inline-block;
  height: rem(4);
  width: rem(64);
}

img {
  -ms-interpolation-mode: bicubic;
  max-width: 100%;
  height: auto;
}

svg {
  max-width: 100%;
  height: auto;
}

main {
  box-shadow: inset rem(16) 0 0 0 var(--contrast),
    inset rem(-16) 0 0 0 var(--contrast), inset 0 rem(-16) 0 0 var(--contrast);
  display: flex;
  min-height: calc(100vh - 4.25em);
  justify-content: center;
  padding: rem(16) rem(24);
  @include breakpoint(xs-only) {
    padding-bottom: rem(72);
  }
}

article {
  margin-left: auto;
  margin-right: auto;
  max-width: rem(960);
  width: 100%;
  @include breakpoint(l) {
    max-width: rem(1280);
  }
  > header {
    padding: rem(16) rem(24);
    @include breakpoint(l) {
      padding: rem(32);
    }
  }
}
</style>
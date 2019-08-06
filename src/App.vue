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
@import url("https://use.typekit.net/zkw5aru.css");

:root {
  --base: hsl(158, 4%, 16%);
  --base-mid: hsl(158, 4%, 32%);
  --base-ghost: hsl(158, 4%, 90%);
  --highlight: hsl(158, 32%, 38%);
  --contrast: white;
  --shadow: #{0 rem(16) rem(32) rem(-16) rgba(0, 0, 0, 0.25)};
}

:root[data-theme="dark"] {
  --base: hsl(158, 4%, 100%);
  --base-mid: hsla(158, 4%, 100%, 0.5);
  --base-ghost: hsla(158, 4%, 100%, 0.1);
  --contrast: hsl(158, 4%, 8%);
  --shadow: #{0 rem(16) rem(32) rem(-16) black};
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
  background-color: var(--contrast);
  color: var(--base);
  font-family: source-sans-pro, sans-serif;
  height: 100%;
  padding-top: rem(120);
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
  @include breakpoint(xsl) {
    padding-top: rem(64);
  }
  @media print {
    padding-top: 0;
  }
}

::selection {
  background-color: var(--highlight);
  color: var(--contrast);
}

h1,
h2,
h3,
.Recommendation__text:before {
  font-family: nazare, sans-serif;
  font-weight: 600;
}

h1,
.total {
  font-size: rem(32);
  line-height: rem(40);
}

h2 {
  font-size: rem(24);
  line-height: rem(32);
}

h3 {
  font-size: rem(22);
  line-height: rem(32);
}

h4,
.Projects__item--text p a {
  font-size: rem(18);
  font-weight: 600;
  letter-spacing: rem(1);
  line-height: rem(24);
  text-transform: uppercase;
}

p,
li,
.Header:after {
  font-size: rem(20);
  line-height: rem(32);
}

nav a {
  font-size: rem(18);
  line-height: rem(32);
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
    + li {
      margin-top: rem(16);
    }
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
    ol {
      padding-left: rem(24);
      li:before {
        content: counter(custom-counter, lower-alpha) ".";
      }
      ol {
        padding-left: rem(24);
        li:before {
          content: counter(custom-counter, lower-roman) ".";
        }
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

pre {
  background-color: var(--base-ghost);
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
  color: var(--base-mid);
  font-family: "source-code-pro", monospace;
  p > & {
    background-color: var(--contrast);
    padding: rem(4) rem(8);
  }
}

a,
button {
  background: none;
  border: none;
  border-bottom: rem(2) solid transparent;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: 0.375s ease-in;
  transition-property: color, border-color;
  &:focus {
    outline: none;
  }
}

p a {
  border-bottom: rem(1) solid var(--highlight);
  &:focus,
  &:hover {
    color: var(--highlight);
  }
}

hr {
  background-color: var(--base-ghost);
  border-radius: rem(2);
  display: inline-block;
  height: rem(4);
  margin-left: auto;
  margin-right: auto;
  width: rem(64);
  @media print {
    border-bottom: rem(4) solid var(--base-ghost);
  }
}

img {
  -ms-interpolation-mode: bicubic;
  height: auto;
  figure > & {
    max-width: 100%;
  }
}

svg {
  max-width: 100%;
  height: auto;
}
</style>
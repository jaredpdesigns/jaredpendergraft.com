<template>
  <figure>
    <img :src="'/img/projects/' + img" :alt="alt"/>
  </figure>
</template>
<script>
export default {
  name: "Img",
  props: {
    alt: { default: null },
    description: { default: null },
    img: { default: "http://via.placeholder.com/1024x1024" }
  }
};
</script>
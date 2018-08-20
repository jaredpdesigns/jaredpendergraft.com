<template>
<article>
  <p>The idea for mdia came when I wanted a single hub for all the media things I was consuming. I love sharing recommendations with friends about what albums I’ve recently listened to or great films I’d seen, but with all the disparate services we use, it’s hard to centralize that information.</p>
  <p>The core feature of mdia would be an integration with <abbr title="Application Program Interface">API</abbr>s from different services like Netflix, Hulu and Rdio—making it easy for users to sign-in once to those services and let the app do the data entry. There’s even an option to add an item you enjoyed offline—like a book on your couch or a film you’d seen in a theater.</p>
  <p>Because our data is important to us, another core feature of the app is a monthly overview and breakdown of content you consumed—imagine a “Year In Review” of all the films, music and books you’ve read—I’d love to see this data!</p>
  <figure class="multi">
    <Phone alt="mdia activity feed" img="mdia/mdia-feed.jpg"/>
    <Phone alt="mdia item detail" img="mdia/mdia-detail-1.jpg"/>
  </figure>
  <blockquote>
    <p><em>The core value of the home feed is the ability to easily link to something you’ve consumed recently without going through a secondary site. Most users are familiar with an album or film they’d recently seen but easily sharing it can be an arduous task.</em></p>
  </blockquote>
  <figure class="multi">
    <Phone alt="mdia stats" img="mdia/mdia-stats.jpg"/>
    <Phone alt="mdia stats detail" img="mdia/mdia-stats-detail.jpg"/>
  </figure>
  <blockquote>
    <p><em>Data is great, especially when it automatically aggregates for you! Over time mdia would make it is for users to share stats of how many albums they listened to in a month or a year or which application they use the most  for consumption.</em></p>
  </blockquote>
</article>
</template>
<script>
import Phone from '@/components/DevicePhone.vue'
export default {
  components: { Phone }
}
</script>
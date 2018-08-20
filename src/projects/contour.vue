<template>
<article>
  <p>Designing and assisting in the development of the Contour application has been a very rewarding experience. It’s provided me several opportunities to learn and grow as a designer while building an application that affects the world positively.</p>
  <p>The application itself has been developed through several iterations for 10+ years and is used predominantly by the <a href="http://www.pdc.org/">Pacific Disaster Center</a> as well as other government agencies throughout the world. My involvement in the project began in late 2015 when the application was being rewritten from scratch to incorporate the latest in agile development techniques with a focus on performance and modularity.</p>
  <p>While the project first began as a tool for the PDC, the long-term goal of the framework we developed was to be able to break apart and restructure the application to serve multiple industries including disaster preparedness, business resilience and reinsurance sectors.</p>
  <p>My contributions to the project included UI/UX design, front-end optimizations for HTML and CSS and ownership over our icon system and theme development. I would work closely with product managers to develop new features requested by shareholders, present visual mock-ups and review components created by other engineers for consistency and optimizations.</p>
  <p>As a UX designer, the best part about the application was the quantity of active users we could easily tap into for feedback about features. With regular builds, we knew when things weren’t working and needed refinement.</p>
  <h2>Icon System</h2>
  <p>In the beginning of the project we had a large quantity of icons used throughout the application that were pulled together via multiple icon sets and suffered from several inconsistencies. In mid-2016 I was put in charge of unifying our icon system, which was a lot of fun, I’d created small icon sets before for various projects, but with 150+ icons it was a completely different experience.</p>
  <p>Around the same time based on performance requests we converted our icon system from a font to an SVG-sprite system. I built a small <a href="https://github.com/jaredpdesigns/contour-icons-themes/">Jekyll project</a> that allowed easy management and creation of the sprite itself plus the documentation pages shared amongst my colleagues for implementation. Using a <a href="https://jekyllrb.com/docs/datafiles/">data-file</a>, I was able to bundle the SVG path information for each icon, as well as additional meta-data including the unicode values we used in the icon font—making it easy for our engineering team to assist in the conversion from the font to the sprite.</p>
  <p>From a design perspective, when I reviewed the system, one thing I cared a lot about was making the icons feel warm and human. We opted for the iOS outlined variation of most forms. When I re-drew all the icons I added a lot of roundness and made the edges as soft as possible. I also increased the stroke-width and reduced as many complicated forms as possible to instill clarity of purpose for each icon.</p>
  <figure>
    <Freeform alt="Contour default icon set" img="contour/contour-icons-primary.svg" :height="768" :width="1588" />
  </figure>
  <blockquote>
    <p>The default icon set is used throughout the application at multiple sizes including sizes as small as 10px—clarity of form was key.</p>
  </blockquote>
  <figure>
    <Freeform alt="Contour shaded icon set" img="contour/contour-icons-shaded.svg" :height="236" :width="1476" />
  </figure>
  <blockquote>
    <p>In addition to the default set, we also use a ‘multi-colored’ variation which includes two paths overlaid on top of each other with the bottom-most path having opacity applied to it, creating a nice tonal variation.</p>
  </blockquote>
  <h2>Themes</h2>
  <p>Around the same time the icon system was refined, I was also tasked with creating multiple themes for the application. This entailed doing an extensive audit of our CSS to find 30+(!) variations of gray used plus multiple blues uninformed by any standard logic.</p>
  <p>Using the powers of SASS, creating a multi-tonal color palette is easy. Our base theme uses a dark gray <code>#222222</code> and a nice blue <code>#1978d4</code>, using tint functions in SASS we could easily find various tones of either color by applying percentages of white—giving our app a huge variety of colors that were tonally consisted and all informed by each other.</p>
  <pre><code>$color-base: #222222;
$color-highlight: #1978d4;

@function tint($color, $percent) { @return mix(#fff, $color, $percent); }

$color-base-75: tint($color-base,25%);
$color-base-62: tint($color-base,38%);
$color-base-50: tint($color-base,50%);
$color-base-38: tint($color-base,62%);
$color-base-25: tint($color-base,75%);
$color-base-12: tint($color-base,88%);
$color-base-5:  tint($color-base,95%);

$color-highlight-75: tint($color-highlight,25%);
$color-highlight-62: tint($color-highlight,38%);
$color-highlight-50: tint($color-highlight,50%);
$color-highlight-38: tint($color-highlight,62%);
$color-highlight-25: tint($color-highlight,75%);
$color-highlight-12: tint($color-highlight,88%);
$color-highlight-5:  tint($color-highlight,95%);</code></pre>
  <figure>
    <Freeform alt="Contour default theme" img="contour/contour-palette-night.svg" :height="256" :width="1312" />
  </figure>
  <blockquote>
    <p>Our default theme called ‘Night’.</p>
  </blockquote>
  <p>Creating additional themes was easy. I used a tool called <a href="http://colorsafe.co/">Color Safe</a>, which allows you to find complimentary colors based on WCAG Standards for contrast. Using <code>#222222</code> as a starting point I’d choose a lovely highlight color as my <code>$color-highlight</code>, use HSL blending to find a dark variation of this color for <code>$color-base</code> and rock-n-roll we’d have a new palette.</p>
  <figure>
    <Freeform alt="Contour secondary themes" img="contour/contour-palette-secondary.svg" :height="256" :width="1216" />
  </figure>
  <blockquote>
    <p>Other theme palettes used throughout the application.</p>
  </blockquote>
  <figure>
    <Freeform alt="Contour theme comparison" img="contour/contour-themes.jpg" :height="192" :width="1810" />
  </figure>
  <blockquote>
    <p>Comparison of how themes work throughout the application.</p>
  </blockquote>
  <h2>Application</h2>
  <p>The application is structured in sets of ‘panels’, each panel includes multiple views and depths—users drill into different depths to view specific details about an item. Each panel is essentially a mini-application into itself—which makes it really easy to restructure the experience of the application by including or removing certain panels.</p>
  <p>Once we began creating components used throughout the app, designing different views became a lot easier. We knew what list-views, detail-views and expandable-tree-views looked liked, so adjusting the data sources to fit the overall UI felt a lot less complicated—restrictions were good.</p>
  <figure>
    <Browser alt="Contour hazard overview" img="contour/contour-hazard-browser.jpg"/>
  </figure>
  <blockquote>
    <p>It was important to have access to as much of the panel and map at the same time as possible—the panels split vertically on smaller screens to allow users to interact with the underlying map.</p>
  </blockquote>
  <p>The coolest part of the application is the complexity of layer-types offered by our service. You can render a visualization of all historic earthquakes on top of information about population density and tide conditions with a few checkboxes.</p>
  <Img alt="Contour app stylized layers" img="contour/contour-layers.png"/>
  <blockquote>
    <p>Layers can easily be toggled on or off creating complex layers of data visualization.</p>
  </blockquote>
  <p>Additional services the application offers is the ability to see all tweets within a specific geographic area with additional filters for specific keywords. When users of the app are trying to monitor events as they are happening Twitter can provide invaluable insight.</p>
  <Img alt="Contour app twitter feed" img="contour/contour-twitter.png"/>
  <blockquote>
    <p>With a built-in filterable Twitter feed, it’s easy to see reports from the ground as events happen. You can even filter by post type.</p>
  </blockquote>
  <p>Using a secondary proprietary service our company has engineered, the application can tap into live-feeds of thousands of traffic cameras throughout the world. The biggest plus of this feature is being able to see live examples of storms or other natural disasters happening, allowing service members to reroute traffic or provide updates on hazardous road conditions.</p>
  <Img alt="Contour app traffic cameras" img="contour/contour-cams.png"/>
  <blockquote>
    <p>Need eyes on the ground? Tap into thousands of traffic cameras around the world, providing real-time insight into road conditions and more.</p>
  </blockquote>
</article>
</template>
<script>
import Browser from '@/components/DeviceBrowser.vue'
import Freeform from '@/components/DeviceFreeform.vue'
import Img from '@/components/Img.vue'
import Phone from '@/components/DevicePhone.vue'
import Tablet from '@/components/DeviceTablet.vue'
export default {
  components: { Browser, Freeform, Img, Phone, Tablet }
}
</script>
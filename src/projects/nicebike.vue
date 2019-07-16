<template>
  <article>
    <p>Nice Bike is a small bike shop based in Boulder, Colorado that custom builds high-end bicycles for a diverse clientele. The level of detail and craft involved with each bike is astonishing and results speak for themselves. I’ve had the pleasure of designing several bike jerseys for David and Sacha over the last few years and was really excited to help bring their vision of a new website to life.</p>
    <figure class="full">
      <Browser alt="Landing page" img="/img/projects/nicebike/nicebike-home-browser.jpg" />
      <figcaption>
        <p>
          <em>First impression are important—solution was a giant hero image of a featured bike in all its glory.</em>
        </p>
      </figcaption>
    </figure>
    <section class="Project__content--separator">
      <h2>Small details</h2>
      <hr />
    </section>
    <p>Because a lot the details surrounding a build are unseen, we wanted a way to bring details forward—so whomever was interested—could geek out over each build. Large hero-images and a flat gallery of supporting images paired with lots of specs for each bike provide layers of information for each type of customer checking out the site.</p>
    <p>Lightning fast searching on the primary builds page allows users to narrow their search by any keyword present in a build—from specs to descriptions.</p>
    <figure class="full">
      <Browser
        alt="Build specs - overview"
        img="/img/projects/nicebike/nicebike-specs-1-browser.jpg"
      />
      <Browser
        alt="Build specs - detailed"
        img="/img/projects/nicebike/nicebike-specs-2-browser.jpg"
      />
      <Browser
        alt="Builds search narrowing results"
        img="/img/projects/nicebike/nicebike-builds-search-browser.jpg"
      />
      <figcaption>
        <p>
          <em>Focusing on the specs of each bike help customers truly appreciate what goes into each custom build.</em>
        </p>
      </figcaption>
    </figure>
    <section class="Project__content--separator">
      <h2>Excellence without ego</h2>
      <hr />
    </section>
    <p>David and Sacha welcome each customer into their shop as if they are family and we wanted to put them—and their adorable pups—in the foreground of what makes Nice Bike a special place.</p>
    <figure class="full">
      <Browser
        alt="Build specs - overview"
        img="/img/projects/nicebike/nicebike-about-browser.jpg"
      />
      <figcaption>
        <p>
          <em>Nice Bike is a shop for dog lovers and bike lovers alike.</em>
        </p>
      </figcaption>
    </figure>
    <section class="Project__content--separator">
      <h2>Built to grow</h2>
      <hr />
    </section>
    <p>One of the primary concerns about a new site was the ability to easily make changes without having tinker with any code. I fell in love with <a href="https://www.contentful.com" target="_blank" rel="noopener">Contentful</a> as a headless-CMS. With the flexibility of defining your own content-models I was able to easily structure each type of content to be just the fields we care about in an easy-to-use flow. From shop hours in the footer to build specs for a bike, making a change to the site is a snap and with a simple page refresh all the content is up-to-date.</p>
    <p>Behind the scenes the site is built as a progressive web application (PWA) powered by Vue which makes caching offline content a breeze and each page loads incredibly quickly.</p>
    <figure class="full">
      <section class="multi">
        <Phone alt="Home mobile view" img="/img/projects/nicebike/nicebike-home-phone.jpg" />
        <Phone alt="News article mobile view" img="/img/projects/nicebike/nicebike-news-phone.jpg" />
        <Phone
          alt="Contact map mobile view"
          img="/img/projects/nicebike/nicebike-contact-phone.jpg"
        />
      </section>
      <figcaption>
        <p>
          <em>A selection of pages highlighting the mobile design of the site.</em>
        </p>
      </figcaption>
    </figure>
  </article>
</template>
<script>
import Browser from "@/components/DeviceBrowser";
import Freeform from "@/components/DeviceFreeform";
import Phone from "@/components/DevicePhone";
export default {
  components: { Browser, Freeform, Phone }
};
</script>
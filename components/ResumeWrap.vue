<template>
  <main :class="$options.name">
    <article class="oomph__v--l type__align--center">
      <Nuxt
        :class="[
          $options.name + '__content',
          'oomph__v--l padding__left--m padding__right--m width__xxl',
        ]"
      />
      <section
        id="reccommendations"
        :class="[
          $options.name + '__reccomendations',
          'color__bg--secondary oomph__v--l padding__bottom--xxxl padding__top--xxxl',
        ]"
      >
        <section class="oomph__v--l padding__left--m padding__right--m">
          <h2>Reccommendations</h2>
          <hr />
        </section>
        <section
          :class="[
            $options.name + '__reccomendations--wrap',
            'padding__left--m padding__right--m padding__top--l width__xxl',
          ]"
        >
          <Recommendation class="width__l" person="Bristol Dunlap">
            <p>
              Jared is an exceptional worker and person. I felt very lucky to
              have the chance to work with him while at Kontur Labs. He is
              honest, knowledgable and delivers quality results. Everything he
              does is done with integrity as he cares about the work he puts out
              into the world. He has a great sense of humor and is a great team
              player. Our office called him the unicorn as he is the unique
              combination of designer and coder.
            </p>
            <p>
              I would highly recommend Jared to anyone looking for an art
              director, designer or developer.
            </p>
          </Recommendation>
          <Recommendation class="width__l" person="Peter Liu">
            <p>
              I hired Jared to design the Playbill for our big summer show,
              <em>The Hunchback of Notre Dame</em>, in addition to a variety of
              advertisements, both print and digital, and other marketing
              material. Jared did a superb job and delivered all the materials
              well ahead of his deadlines. He made it all look easy. Prior to
              this, Jared and I were co-workers at Kontur Labs for two years,
              where he demonstrated the same level of professionalism, talent
              and expertise. He is one of the few designers I’ve met who also
              understands programming and the world of code.
            </p>
            <p>
              I continue to collaborate with Jared as projects come up. I
              recommend him highly for any endeavor that requires a talented and
              well trained designer.
            </p>
          </Recommendation>
          <Recommendation class="width__l" person="Alexis Wogan">
            <p>
              As a designer at Kontur Labs, and also as a contract designer for
              hire, Jared demonstrated a consistent ability to design creative
              and purpose driven experiences. Initially, he was hired as a
              visual designer but we soon discovered he is actually a hybrid of
              UX, visual design and front end dev.
            </p>
            <p>
              When working within the constraints of an agency contract, there
              isn’t often budget for usability testing and extensive customer
              discovery. Jared was able compensate by leveraging best practices
              and low budget user testing to make sure his designs were
              accomplishing the desired goals.
            </p>
            <p>
              His ability to “design with code” allowed us to pick up
              considerable speed in the “design to HTML” creation phases of our
              projects. We were able to remove hours spent wire framing and
              working with a visual designer and go right form IA, content
              curation/gathering and sketches into HTML and CSS.
            </p>
            <p>
              This resulted in a boost in profitability of our agency contracts.
              Furthermore, he would test his HTML/CSS for browser compatibility
              before handing off to engineering. This allowed us to spend less
              time on quality assurance.
            </p>
            <p>
              Jared is also a change agent. He is constantly expanding his skill
              sets and encouraged us to use new tools and explore new ways of
              working together that were more collaborative—not just as a team
              but with our clients. He is a pleasure to work with and I highly
              recommend him as an addition to any agency or product team.
            </p>
          </Recommendation>
        </section>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Resume",
};
</script>
<style lang="scss">
.Resume {
  &__content {
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    p,
    h3 {
      padding-left: var(--size__m);
      padding-right: var(--size__m);
      text-align: left;
      @include breakpoint(xsl) {
        margin-left: auto;
        margin-right: auto;
        max-width: calc(60% + (var(--size__xxxl)));
        padding-left: var(--size__l);
        padding-right: var(--size__l);
        width: 100%;
      }
      @include breakpoint(l) {
        max-width: 50%;
      }
    }
    ul {
      text-align: left;
      margin-left: auto;
      margin-right: auto;
      max-width: calc(100% - var(--size__l));
      width: 100%;
      @include breakpoint(xsl) {
        max-width: calc(60% + var(--size__xxl));
      }
      @include breakpoint(m) {
        max-width: calc(60% + var(--size__xxl) + var(--size__m));
      }
      @include breakpoint(l) {
        max-width: 50%;
      }
    }
    li + li {
      margin-top: var(--size__m);
    }
    > * + h2 {
      margin-top: var(--size__xxxl) !important;
    }
    h3 + p {
      margin-top: var(--size__m) !important;
    }
    p em {
      border-bottom: var(--size__xxs) solid var(--color__base--light);
      font-family: var(--typeFamily__script);
      font-size: var(--typeSize__m);
    }
  }
  &__reccomendations--wrap {
    display: grid;
    grid-gap: var(--size__m);
    @include breakpoint(xsl) {
      grid-gap: var(--size__l);
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    @include breakpoint(m) {
      align-items: start;
      grid-template-columns: 1fr 1fr;
    }
    > *:last-child {
      grid-column: 1/-1;
    }
  }
}
</style>

<template>
  <main :class="$options.name">
    <article
      :class="[
        $options.name + '__wrap',
        'padding__bottom--l padding__left--m padding__right--m width__xxl',
      ]"
    >
      <figure
        :class="[$options.name + '__img', 'padding__left--m padding__right--m']"
      >
        <picture>
          <source
            :srcset="img + '?f=face&fit=fill&h=1280&w=960&fm=webp'"
            media="(min-width: 99rem)"
            type="image/webp"
          />
          <source
            :srcset="img + '?f=face&fit=fill&h=1280&w=960'"
            media="(min-width: 99rem)"
          />
          <source
            :srcset="img + '?f=face&fit=fill&h=640&w=480&fm=webp'"
            media="(min-width: 63rem)"
            type="image/webp"
          />
          <source
            :srcset="img + '?f=face&fit=fill&h=640&w=480'"
            media="(min-width: 63rem)"
          />
          <source
            :srcset="img + '?f=face&fit=fill&h=360&w=480&fm=webp'"
            type="image/webp"
          />
          <img
            class="width__m"
            loading="lazy"
            :src="img + '?f=face&fit=fill&h=360&w=480'"
            alt="My smiling face, greeting you"
            height="360"
            width="480"
          />
        </picture>
        <svg height="0" width="0" :style="{ position: 'absolute' }">
          <defs>
            <clipPath id="blobby" clipPathUnits="objectBoundingBox">
              <path
                d="M0.104,0.936 c0.139,0.159,0.268,-0.026,0.431,-0.067 c0.163,-0.041,0.268,0.137,0.406,-0.021 c0.138,-0.158,0.021,-0.424,-0.184,-0.658 C0.551,-0.043,0.237,-0.064,0.057,0.141 c-0.18,0.205,0.119,0.269,0.147,0.437 C0.232,0.746,-0.035,0.777,0.104,0.936"
              />
            </clipPath>
          </defs>
        </svg>
      </figure>
      <section
        :class="[
          $options.name + '__content',
          'oomph__v--l padding__all--m type__align--center',
        ]"
      >
        <h1>Hello, it’s nice to meet you.</h1>
        <hr />
        <p>
          I’m a multi-disciplinary designer focusing on the
          <em class="border__bottom color__border--base--light"
            >intersection of design and development</em
          >. I care deeply about how something works as much as its outward
          appearance and am always looking to
          <em class="border__bottom color__border--base--light"
            >improve, optimize and scale my ideas</em
          >.
        </p>
        <p>
          I approach design challenges holistically, building solutions from
          beginning to end with
          <em class="border__bottom color__border--base--light"
            >extensibility and modularity</em
          >
          in mind. I enjoy building out designs to fully-functional front-end
          code—bridging the gap between design and development seamlessly.
        </p>
        <p>
          View
          <nuxt-link to="/projects">projects</nuxt-link>&nbsp;I’ve worked on or
          learn more about my
          <nuxt-link to="/hire#process">creative process</nuxt-link>.
        </p>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: "Profile",
  data() {
    return {
      img:
        "https://images.ctfassets.net/cuehicrlqnvu/48OC0pyrFD6iWSokRiz3Zs/f9fb4d4df16062af7a4eb885b1abc08e/profile-big.jpg",
    };
  },
  head() {
    return {
      title: "Jared Pendergraft",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "The personal website of Jared Pendergraft",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "The personal website of Jared Pendergraft",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: "The personal website of Jared Pendergraft",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.Profile {
  &__wrap {
    display: grid;
    place-items: center;
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    @include breakpoint(m) {
      grid-template-columns: 1fr 1fr;
    }
  }
  &__img {
    justify-self: center;
    @include breakpoint(xsl) {
      padding-left: var(--size__l);
      padding-right: var(--size__l);
    }
    img {
      aspect-ratio: attr(width) / attr(height);
      clip-path: url("#blobby");
      @include breakpoint(m) {
        aspect-ratio: attr(height) / attr(width);
      }
    }
  }
  &__content {
    @include breakpoint(xsl) {
      padding: var(--size__l);
    }
    h1 {
      margin-left: auto;
      margin-right: auto;
      max-width: 12ch;
      @include breakpoint(l) {
        max-width: 100%;
      }
    }
    p {
      text-align: left;
      @include breakpoint(xsl) {
        margin-left: auto;
        margin-right: auto;
        max-width: calc(60% + var(--size__l));
      }
      @include breakpoint(m) {
        max-width: 65ch;
      }
      em {
        border-style: dashed;
      }
    }
  }
}
</style>

<template>
  <main :class="$options.name">
    <Head
      title="About | Jared Pendergraft"
      description="The personal website of Jared Pendergraft"
      keywords="jared pendergraft, jared pendergraft designs, design, website, graphic design hawaii, web design hawaii, graphic design maui, web design maui"
      image="http://jaredpendergraft.com/img/social.jpg"
      url="https://jaredpendergraft.com"
    />
    <article class="padding__bottom--xl padding__top--xl">
      <figure
        :class="[$options.name + '__img', 'padding__left--l padding__right--l']"
      >
        <picture>
          <source
            :srcset="img + '?f=face&fit=fill&w=640&fm=webp'"
            media="(min-width: 63rem)"
            type="image/webp"
          />
          <source
            :srcset="img + '?f=face&fit=fill&w=640'"
            media="(min-width: 63rem)"
            type="image/jpeg"
          />
          <source
            :srcset="img + '?f=face&fit=fill&h=360&w=480&fm=webp'"
            media="(min-width: 47rem)"
            type="image/webp"
          />
          <source
            :srcset="img + '?f=face&fit=fill&h=360&w=480'"
            media="(min-width: 47rem)"
            type="image/jpeg"
          />
          <img
            :src="img + '?f=face&fit=fill&h=240&w=360'"
            alt="My smiling face, greeting you"
          />
        </picture>
        <svg height="0" width="0">
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
        :class="[$options.name + '__content', 'oomph__v--l padding__all--l']"
      >
        <h1 class="color__type--brand">Hello, it’s nice to meet you.</h1>
        <hr class="margin__top--m" />
        <p>
          I’m a multi-disciplinary designer focusing on the
          <em>intersection of design and development</em>. I care deeply about
          how something works as much as its outward appearance and am always
          looking to <em>improve, optimize and scale my ideas</em>.
        </p>
        <p>
          I approach design challenges holistically, building solutions from
          beginning to end with
          <em>extensibility and modularity</em> in mind. I enjoy building out
          designs to fully-functional front-end code—bridging the gap between
          design and development seamlessly.
        </p>
        <p>
          View
          <router-link to="/projects">projects</router-link>&nbsp;I’ve worked on
          or learn more about my
          <router-link to="/hire#process">creative process</router-link>.
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
};
</script>
<style lang="scss" scoped>
.Profile {
  article {
    align-items: center;
    display: grid;
    justify-content: center;
    @include breakpoint(m) {
      grid-template-columns: repeat(auto-fit, minmax(rem(300), 1fr));
    }
  }
  &__img {
    justify-self: center;
    @include breakpoint(m) {
      justify-self: end;
    }
    img {
      clip-path: url("#blobby");
    }
  }
  &__content {
    p {
      max-width: 52ch;
    }
  }
}
</style>

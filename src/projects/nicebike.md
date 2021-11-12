---
title: Nice Bike • Jared Pendergraft
description: Fresh website to showcase custom-built bicycles with an emphasis on craft and details
img: https://images.ctfassets.net/cuehicrlqnvu/6qtQSpxRwd2kOkn0DT3YNT/103258554d089d5ab2e21e7e2b06be0a/nicebike-featured-light.jpg?h=630&w=1200&fit=fill&f=face
slug: /projects/nicebike/
layout: layouts/base.njk
class: detail padding__top--m
imgBlock1:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/3rZyMEl14oCFggX6yphXmY/7a9e7cc2246ced9773b48f35e25e744b/nicebike-1-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/7a4TrMGYaxO9lVadmRm3mv/d9ff5e6c803c91e7985bff9db57d1e68/nicebike-1-dark.svg",
      title: "Overview",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/7cv1mjLvWI7OcgkAyHglnd/2309077312f5a24b0eaf76168505534d/nicebike-2-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/62QKXpOloQq8Quen5PJdhd/9106a5e8ac4b5292ad6edf4edbe27889/nicebike-2-dark.svg",
      title: "Overview",
    },
  ]
imgBlock2:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/5vLKXWpiTxe5qlr4gctsNI/a898827c51ccbb5f052584efdf8b8fa4/nicebike-3-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/4zdXZVq0YTdeln1vxAt9Ef/d4f5613d3ac216c9be68dba582b08d35/nicebike-3-dark.svg",
      title: "Bike details",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/1Uy2subjxzfAnTQe7jyT4O/2ad275f8129b22227ed0d0b3c0fea412/nicebike-4-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/1lhR89hL3rd0P8HrrcV229/79f4b9e6aa3a4635d9f4d4e1816ed0e4/nicebike-4-dark.svg",
      title: "Spec Details",
    },
  ]
eleventyComputed:
  style: "--brand: {{ projects |  projectHue('Nice Bike') }}"
---

{% ProjectHeader projects |  filteredProject('Nice Bike') %}

Nice Bike is a small bike shop based in Boulder, Colorado that custom builds high-end bicycles for a diverse clientele. The level of detail and craft involved with each bike is astonishing and results speak for themselves. I’ve had the pleasure of designing several bike jerseys for David and Sacha over the last few years and was really excited to help bring their vision of a new website to life.

{% Grid %}
{% for item in imgBlock1 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Images were made as big as possible and paired with minimal typography' %}

---

## Small Details

Because a lot the details surrounding a build are unseen, we wanted a way to bring details forward—so whomever was interested—could geek out over each build. Large hero-images and a flat gallery of supporting images paired with lots of specs for each bike provide layers of information for each type of customer checking out the site.

Lightning fast searching on the primary builds page allows users to narrow their search by any keyword present in a build—from specs to descriptions.

{% Grid %}
{% for item in imgBlock2 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Project detail pages are for the bike geeks out there who want to see as much as possible and know exactly which part went into a build' %}

---

## Built to Grow

One of the primary concerns about a new site was the ability to easily make changes without having tinker with any code. I fell in love with [Contentful](https://www.contentful.com/) as a headless-CMS. With the flexibility of defining your own content-models I was able to easily structure each type of content to be just the fields we care about in an easy-to-use flow. From shop hours in the footer to build specs for a bike, making a change to the site is a snap and with a simple page refresh all the content is up-to-date.

Behind the scenes the site is built as a progressive web application (PWA) powered by [Vue](https://vuejs.org/) which makes caching offline content a breeze and each page loads incredibly quickly.

---
layout: layouts/base.njk
class: detail padding__top--m
imgBlock1:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/1XCMNEb84pc8IUe6qXvu6y/793e360c201bbc5adc7d0728a26f7f17/eai-1.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/1NEhS687PhuC5M1Bjat3ne/22bb59681d2bc2769df366ee74360f84/eai-1-dark.svg",
      title: "Primary brand elements",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/6OjwgxwRqUgIPyXAEg312i/b4feb108a1071bd6a8eb3730bcd2809e/eai-2.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/42CrqRMJDVZxPKK6tKoo6o/4184e4bce94400a5fe371a3cf02341e2/eai-2-dark.svg",
      title: "TestHound product elements",
    },
  ]
imgBlock2:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/ZfAqV7XR99w4WqMUUVv63/bf9b16a54b75663f2e021dc9582d091e/eai-3.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/4ghNsm5w3kQvivtAGfxLsR/29d6c75325c480c37ae5638cd850f302/eai-3-dark.svg",
      title: "Testimonial and blog elements",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/0NFMW0jDobnLBp5cw0ucJ/420461607bb90911a5bf53cb962850ce/eai-4.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/01liN2TxBPH53G6uryxjjP/5a1bc33970694b17880c685defa0a180/eai-4-dark.svg",
      title: "Why EAI elements + event info",
    },
  ]
imgBlock3:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/yduK6G6MwDIQplWDQ1iOv/34dffa0bc5bfa7b94ec15074239d9723/eai-5.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/zBRxphXLq7JMxb6GBej9k/977b2fe08d3d751db09d4f549c816d90/eai-5-dark.svg",
      title: "Profile page elements",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/70GrFdp8SDWfjSRN50AQu5/8cccb2f12edff1455f6a02d929f9eeec/eai-6.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/3d6Vy8r7v1vZnPZo2iFUP3/1727aa6d3da66dc8dac98018f5a0e488/eai-6-dark.svg",
      title: "Email signature tool elements",
    },
  ]
eleventyComputed:
  description: "{{ (projects | filteredProject('Education Advanced')).description }}"
  img: "{{ (projects | filteredProject('Education Advanced')).img }}?h=630&w=1200&fit=fill&f=face"
  slug: "/projects/{{ (projects | filteredProject('Education Advanced')).slug }}/"
  style: "--brand: {{ (projects | filteredProject('Education Advanced')).hue }}"
  title: "{{ (projects | filteredProject('Education Advanced')).name }} • Jared Pendergraft"
---

{% ProjectHeader projects |  filteredProject('Education Advanced') %}

For the last four years I’ve been leading the efforts in developing a design system for my organization as our _Lead UI/UX Developer_. It’s been a very rewarding experience and helped us mature as an organization in a scalable way as we develop the next iteration of our two flagship products [Cardonex](https://educationadvanced.com/products/cardonex/) and [TestHound](https://educationadvanced.com/products/testhound/).

---

## Organize & Conquer

When I first joined the team, we had separate marketing sites for each product, very different design vernacular between our products, and a small team—compounding the difficulties of _updating and improving_ the next iterations of our applications. After spending several cycles producing mock-ups for both applications and pursuing _separate but similar_ design systems it was decided we’d have a single marketing site for all our products and emphasize our products as being offerings of _Education Advanced_—not standalone products.

This decision had a surprising benefit: instead of having to differentiate each product in their own right, we could focus on making them feel like they were coming from the _same place_. This worked out very well for us because we primarily cross-sell our products in the same school districts.

{% Grid %}
{% for item in imgBlock1 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Various UI elements highlighting our primary brand and individual product elements' %}

---

## Many Parts, Different Functions

While our products are actively being developed, the marketing site has become a great showcase for the design system. Similar to the UI of our applications, many smaller components are combined to create compositions that serve many different purposes across our marketing efforts. From grids of testimonials, to blog posts with dynamic calls to actions—they are all compiled with the smaller defined parts of our system.

Using a series of design tokens, brand color systems and product-specific typography, we are able to introduce many elements our users will eventually encounter in our products in a friendly and familiar way. The marketing site context has also helped us develop our brand guidelines for things outside of our application UI including product photography and more diverse color palettes.

{% Grid %}
{% for item in imgBlock2 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Compositions highlighting different design tokens combined to be bring expression and function to various UI elements including Testimonials and various tiles used throughout the marketing site' %}

---

## Scalable Tools

As we’ve grown, our marketing site has changed from being a place to house information to a series of tools to help our organization work smarter. A good example is [standalone profile pages](https://educationadvanced.com/team/operations/kelly-manlove/) where we reference upcoming events our team members will be at in addition to thought leadership articles they’ve written. Providing an automated way to aggregate information across the site into an easily referenced page they can share out to their social/sales channels.

To find information for different sales funnels our team can refer to our [library](https://educationadvanced.com/library/), which references content we share throughout the site based on what sales funnel stage and target persona it has been tagged with. Creating a centralized location which eliminates the need to search through multiple pages of content entries has become an invaluable tool.

Because so much of our company information is housed in our CMS, creating a [dynamic email signature](https://educationadvanced.com/email-signatures/) tool was a breeze. Instead of relying on employees to find a headshot on their computer, we pull their photo, name and title from our CMS—and if they’ve provided a meeting link, we include that as well. All of the information matches the content on their profile pages, so consistent messaging between different channels has no friction.

{% Grid %}
{% for item in imgBlock3 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Elements from individual profile pages for or our employees and a glimpse at the email signature tool developed to improve internal communication channels' %}
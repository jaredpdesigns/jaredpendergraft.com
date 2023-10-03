---
layout: page-project.webc
pageClass: detail
imgBlock1:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/1j1KcBV2yn4ZiUzJY0oRit/269bdde9967579dda9adffcea58485e9/hypothesis-1-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/XvrIwRwUZi8U6IH1GxX18/024f581b438f89e40182e188798112e7/hypothesis-1-dark.svg",
      title: "Hypothicons icon set",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/RUNxVZaK5lb9uQfebmORL/e6cedb742ac1667b3f475d5c16fee533/hypothesis-2-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/2L0dcNSRPprQlybFxTjkKV/33e4ccbad7f0d8ef3f825584f8f7dafe/hypothesis-2-dark.svg",
      title: "Color palette and main UI",
    },
  ]
imgBlock2:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/4FNLPRtN2YQlJP8rmJEwxg/d598ffa9f0acee3a4436c1bcfc76d506/hypothesis-3-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/2AcOAJHHCvPQn0qvmPvnTZ/6022d764e2bd18e6735cd1639f84c38b/hypothesis-3-dark.svg",
      title: "Annotations on the web",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/4JnZXRX4xEa5HLgpnIVZm2/91bff02f1d234dd57ddcaf45d33b20d6/hypothesis-4-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/2vdErfXcsgKbVqiMznXzp4/66d69a08811caae6ff1a5f8be010a869/hypothesis-4-dark.svg",
      title: "Additional UI including search and group management",
    },
  ]
imgBlock3:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/5yyv7PaUvq7oEJCaLEnRZM/1127fda1b11743f91023c00b1158d1a8/hypothesis-5-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/7egVbKt234cMMeMponsIPp/e6f34daf6b667d56c3a7ee4231c3a8b4/hypothesis-5-dark.svg",
      title: "Share and help dialog boxes",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/2Quc5oEmTGCXVWBFyJPbIg/46aa90ffd6f5b5bd4d7f2f68fa2efa32/hypothesis-6-light.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/4FVMO7ESJ6q0uAiHUDYoSj/338cf2dcaf7634f4223e2c482f6e8054/hypothesis-6-dark.svg",
      title: "Additional annotation states",
    },
  ]
eleventyComputed:
  title: "{{ (projects | filteredProject('Hypothesis')).name }} • Jared Pendergraft"
  description: "{{ (projects | filteredProject('Hypothesis')).description }}"
  project:
    name: "{{ (projects | filteredProject('Hypothesis')).name }}"
    img: "{{ (projects | filteredProject('Hypothesis')).img }}"
    external: "{{ (projects | filteredProject('Hypothesis')).external }}"
    role: "{{ (projects | filteredProject('Hypothesis')).role }}"
    style: "--brand: {{ (projects | filteredProject('Hypothesis')).hue }}"
---

Hypothesis is a primarily experienced through a Google Chrome extension which allows users to select text on the web, and highlight or annotate that selection. Through one of these actions the selected text is saved automatically to a user’s account and they can easily share them through social media.

Users can also interact with other users’s annotations and form a conversation about important text excerpts. Hypothesis is used throughout educational institutions and research groups—you can even use it for your favorite quotes from articles that you don’t want to forget about.

---

## Realign Not Redesign

I was hired to help Hypothesis organize and clarify the design of their application. The application had been relying on a lot of open-source icons and had upwards of 12 shades of gray used throughout the interface UI. There were also many user flows that needed some tightening up.

I’m a big fan of figuring out what’s working well with a design and amplifying those elements. There were a few examples in the icons that emphasized the personality of the application so I took that approach to creating the new set.

In addition, I helped slim down the quantity of grays used throughout the application and found a cool-gray tint that worked well for light and dark themes and helped the core brand red stand out.

<project-detail-image-wrap :images="this.imgBlock1" webc:nokeep></project-detail-image-wrap>

> Custom icon set, color palette and main UI for the tool

---

## Annotations

In addition to seeing annotations in the browser extension, annotations are also available through a web application that groups them by article—so you can see all annotations that users throughout the system have made on a particular article.

Search within the application allows users to sort by multiple parameters, including user and popular tags—making sure users can find exactly the annotation they are looking for.

A new feature I helped design was group management. Users can be part of multiple groups—essentially buckets they put annotations into. It was important to allow for users to manage their groups through the extension and provide easy access to seeing all annotations in a particular group.

<project-detail-image-wrap :images="this.imgBlock2" webc:nokeep></project-detail-image-wrap>

> Examples of how annotations appear on the web, searching using search parameters, and managing groups within the tool

---

## Further Refinements

There were a lot of other areas in the UI that needed clarity, including the share dialog and how users get help when they’re having trouble with the tool.

Additional annotation states were improved including making it clearer when users were editing their annotation comments. Nested replies within annotations were also more clearly emphasized—enveloping them within the core frame of the primary annotation.

<project-detail-image-wrap :images="this.imgBlock3" webc:nokeep></project-detail-image-wrap>

> Additional UI element including additional annotation states—editing and nested replies

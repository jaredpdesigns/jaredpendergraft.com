---
layout: layouts/base.njk
class: detail padding__top--m
imgBlock1:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/2oNtTJ5yMhTsc0x7rSMHOc/53a08b1b022853e262f70ee879720450/cx-1.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/6EajJezGLPw9sU1hlmLAce/d91ff0aa9a12373c0974173953d068e6/cx-1-dark.svg",
      title: "Logo revamp & color palette",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/3kq7S128W3vKNfBXMilYtw/013c79ee49ff551cdece133075227a5f/cx-2.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/3HZ5fQbruAoq8tKbqXrfc9/7d5494607652d1d80ca8ba277ae53669/cx-2-dark.svg",
      title: "Onboarding steps",
    },
  ]
imgBlock2:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/42ch0XKQ2ED6iP0JFujCpG/ed6ae6f50d7e143861203d7b5b781a8c/cx-3.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/2SPEN8NeVOmZ3CTy8i07e1/43eafe416589667c5dbce7a4fdf0ad9e/cx-3-dark.svg",
      title: "Teacher assignments overview",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/1OaNEjiUrnsUVYPoghD7AY/baa905575fda31f41b9b48633e45b0e1/cx-4.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/5ROU3yIV05dXnO7xwAZAec/b60649dd0168a4756d0c89d097965ae4/cx-4-dark.svg",
      title: "Course size designations",
    },
  ]
imgBlock3:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/5k0b4MCFCpXUgSIvByhSg0/1df982c455e12ddb51af0f1ae7343d51/cx-5.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/3TAPHepvb6RVZWbsKuwNiI/efe4a6a4f35afcb84daedcc5625ad7e6/cx-5-dark.svg",
      title: "Staffing plan overview",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/7BhtfcdRaEiyQyDNlJr0Ht/1bcf30aaa04632f712134574e8624601/cx-6.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/4DBRDGHNOAqr6UR3jYnNnb/b864bce7c6bc22848a6067f9f666f05f/cx-6-dark.svg",
      title: "Teacher section adjustments",
    },
  ]
imgBlock4:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/BkgSsuimX9gaVwrnRtcQ8/e87c6a2e8d59a075bc89ef49c824f67b/cx-7.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/Op2vS959F6z63ZqsWKxea/318c6d12e1820d855dc97a0caf12c41b/cx-7-dark.svg",
      title: "Chip configuration interaction",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/2brA27m3k1eqXXrxVouoxW/75edbbfac330d34579d3548cdfb12df3/cx-8.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/1Y14gwkuJLl81dh2G2QJxH/4a17a12c3f48a41c06e4b6cb597fabb3/cx-8-dark.svg",
      title: "Scheduler chip drag-and-drop",
    },
  ]
eleventyComputed:
  description: "{{ (projects | filteredProject('Cardonex')).description }}"
  img: "{{ (projects | filteredProject('Cardonex')).img }}?h=630&w=1200&fit=fill&f=face"
  style: "--brand: {{ (projects | filteredProject('Cardonex')).hue }}"
  title: "{{ (projects | filteredProject('Cardonex')).name }} • Jared Pendergraft"
---

{% ProjectHeader projects |  filteredProject('Cardonex') %}

## How Can We Make This Better?

When I first joined Education Advanced, my primary task was to imagine what the next iteration of Cardonex would look like. We had a strong MVP tool built on top of Bootstrap, and styled very lightly. As time progressed and Cardonex proved itself in the market, more resources were put into iterating on the next phase of the product.

Because Cardonex had a smaller user-base, we didn’t want to abandon what the current users were getting used to, but instead we focused on clarifying those ideas and organized a lot of the flows around reducing as many steps as possible, while still having an instructional nature.

We aligned branding to be consistent with our other products and focused on an accessible color palette. We also use color as a meaningful differentiator inside the application to help users associate course subjects with color (i.e., Career & Technical Ed is blue and Athletics is pink).

{% Grid %}
{% for item in imgBlock1 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Logo brand alignment and onboarding steps to guide users' %}

## A Guiding Hand

Many users are new to the process of staffing and master schedule building, the tool does a really good job guiding them through each step of the process to be successful. We focus on clearly defining new vernacular and pointing out features that can provide “short-cuts” in the process.

A good example of this are “tip” messages—peppered throughout the UI, we supply useful details on how to use key parts of the interface to speed things up. Pointing features out like using advanced search functionality early, exposes patterns the users will see throughout other areas of the application as they move through future steps in the process.

{% Grid %}
{% for item in imgBlock2 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Teacher assignment management and course metric adjustments' %}

## Fine-Tuning for Best Results

One of Cardonex’s biggest benefits is the ability to get an accurate assessment of how teachers are being utilized in a school. This can lead to re-balancing of teacher workloads and sometimes even letting some go if they aren’t being utilized properly. This is a difficult subject, but once users see how Cardonex can provide the insights needed to make these decisions, it becomes invaluable—ultimately saving a school district multitudes of money and resources.

The important part of this process if providing as accurate information as possible about current teachers workloads as well as the needs of upcoming courses. Users spend a good amount of time in the application fine-tuning these details, and the interface provides many “levers and knobs” to improve the accuracy of the data input into the system.

{% Grid %}
{% for item in imgBlock3 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Staffing plan overview and course reconciliation' %}

## An Accurate Staffing Plan

The end result is a comprehensive _Staffing Plan_ which provides insights of where sections of courses are over—or—under-staffed. Once users have a clear picture of where they need to make decisions, they can “snapshot” the plan, and tweak it further until they reach a result that works for them.

After staffing concerns have been addressed, the next part of the process includes _reconciling_ course assignments. It’s critical to have the correct amount of teachers for assignment before designating how many sections they might teach. The application even warns you if you try to over-assign a teacher—which of course isn’t optimal for scheduling.

{% Grid %}
{% for item in imgBlock4 %}
{% ProjectDetail item %}
{% endfor %}
{% endGrid%}

{% ProjectDetailCaption 'Chip configuration and scheduler drag-and-drop interaction' %}

## The Schedule Students Want

The essence of Cardonex is the Master Schedule builder—it’s presented as a large grid of available “slots” to place “chips” on. A chip is representative of a portion of a course, that’s been broken down into digestible teaching segments. For example, a teacher can only teach a specific number of students within a pre-defined timeframe per day—a chip is a great visual metaphor for what that portion of a course may be.

Users drag-and-drop chips on to various positions of the scheduling board—with visual feedback when chips can be prioritized for best results—until they’ve achieved an ideal schedule for each teacher at the school. There is an order of operations for how chips are placed, and there are multiple ways to filter chips to work around how different users prefer to schedule.

At the end of this process users are presented with a report indicating the schedule for all the teachers at their school. The schedule takes into account all student course requests, balanced with valuable data-points about proper course assignment that yields a schedule where students get over 90% of the courses they’ve requested.

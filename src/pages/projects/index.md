---
title: Featured Projects • Jared Pendergraft
description: A selection of creative projects I’ve worked on
img: https://jaredpendergraft.com/img/social-projects.jpg
slug: /projects/
pageClass: projects
layout: page.webc
---

Case Studies

<grid webc:nokeep>
  <project-tiles :projects="this.projects.filter(project => project.type === 'featured')" webc:nokeep>
</grid>

Passion Projects

<grid webc:nokeep>
  <project-tiles-side :projects="this.projects.filter(project => project.type === 'side')" webc:nokeep>
</grid>

<style>
  .projects article > p {
    color: var(--color__base--ish);
    font-size: var(--type__size--s--fluid);
    font-variation-settings: 'wght' 600;
    font-weight: 600;
    letter-spacing: 0.0625rem;
    line-height: var(--type__lineheight--m--fluid);
    text-align: center;
    text-transform: uppercase;
  }
</style>

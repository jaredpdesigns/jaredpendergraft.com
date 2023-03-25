---
title: Featured Projects • Jared Pendergraft
description: A selection of creative projects I’ve worked on
img: https://jaredpendergraft.com/img/social-projects.jpg
slug: /projects/
pageClass: projects
layout: page.webc
---

Case Studies

<script webc:type="render" webc:is="template">
  function() {
    return `<grid webc:nokeep>${this.projects.filter(project => project.type === 'featured').map(project => `<project-tile projectdescription="${project.description}" projectimg="${project.img}" projectname="${project.name}" projectslug="${project.slug}" projectstyle="--brand: ${project.hue}" webc:nokeep></project-tile>`).join("")}</grid>`;
  }
</script>

Passion Projects

<script webc:type="render" webc:is="template">
  function() {
    return `<grid webc:nokeep>${this.projects.filter(project => project.type === 'side').map(project => `<project-tile-side projectdescription="${project.description}" projectimg="${project.img}" projectname="${project.name}" projectslug="${project.external}" webc:nokeep></project-tile-side>`).join("")}</grid>`;
  }
</script>

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

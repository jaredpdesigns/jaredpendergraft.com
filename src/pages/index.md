---
title: Jared Pendergraft
description: The personal website of Jared Pendergraft
img: https://jaredpendergraft.com/img/social.jpg
pageClass: profile
layout: page.webc
---

<profile-img webc:nokeep></profile-img>

<!-- <profile-img webc:nokeep src="48OC0pyrFD6iWSokRiz3Zs/f9fb4d4df16062af7a4eb885b1abc08e/profile-big.jpg"></profile-img> -->

# Hello, It’s Nice to Meet You

I’m a multi-disciplinary designer focusing on the _intersection of design and development_—specifically _Design Systems_ and how teams works together to build amazing products.

I care deeply about how something works as much as its outward appearance and am always looking to **improve, optimize and scale my ideas**. I approach design challenges holistically, building solutions from beginning to end with **extensibility and modularity** in mind.

> I’m currently serving as **Front End Engineer** at [Follow Up Boss](https://followupboss.com/). View [projects](/projects/) I’ve worked on or learn more about my [creative process](/hire/#my-creative-process).

---

## Featured Projects

<gallery webc:nokeep>
  <project-tiles :projects="this.projects.filter(project => project.type === 'featured')" small="true" webc:nokeep>
</gallery>

<style>
  .profile article {
    margin-inline: 0;
    max-inline-size: 100%;
    grid-template-columns: minmax(calc(var(--size__l) + env(safe-area-inset-left)), 1fr) minmax(0, var(--maxWidth)) minmax(calc(var(--size__l) + env(safe-area-inset-left)), 1fr);
    padding-inline: 0;
  }
  .profile article > * {
    grid-column: 2;
  }
</style>

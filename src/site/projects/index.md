---
title: Jared Pendergraft
description: A selection of creative projects I’ve worked on
img: https://jaredpendergraft.com/img/social-projects.jpg
slug: /projects/
layout: layouts/base.njk
class: projects
---

# Projects

A selection of creative projects I’ve worked on.

{% Grid %}
{% for item in projects %}
  {% ProjectGrid item %}
{% endfor %}
{% endGrid %}
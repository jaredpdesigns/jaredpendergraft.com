---
title: Featured Projects • Jared Pendergraft
description: A selection of creative projects I’ve worked on
img: https://jaredpendergraft.com/img/social-projects.jpg
slug: /projects/
layout: layouts/base.njk
class: projects
---

{% ProjectSection 'Case Studies' %}

{% Grid %}
{% for item in projects | selected %}
{% ProjectGrid item %}
{% endfor %}
{% endGrid %}

{% ProjectSection 'Passion Projects' %}

{% Grid %}
{% for item in projects | selected('side') %}
{% ProjectGrid item %}
{% endfor %}
{% endGrid %}

---
title: Code Explorations • Jared Pendergraft
description: Code explorations
img: https://jaredpendergraft.com/img/social.jpg
layout: layouts/base.njk
class: code
---

# Code Explorations

{% Grid %}
{% for item in collections.code %}
  {% Code item %}
{% endfor %}
{% endGrid %}

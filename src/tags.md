---
title: Tags • Jared Pendergraft
description: Code explorations tagged
img: https://jaredpendergraft.com/img/social.jpg
layout: layouts/base.njk
class: code
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/
---

# Tagged “{{ tag }}”

{% Grid %}
{% for item in collections[tag] %}
  {% Code item %}
{% endfor %}
{% endGrid %}
---
title: Clients • Jared Pendergraft
description: Portal for hosting client files, agreements and invoices
img: https://jaredpendergraft.com/img/social.jpg
slug: /clients/
layout: layouts/base.njk
class: clients
---

# Client Projects

{% Grid %}
{% for item in clients %}
  {% Client item %}
{% endfor %}
{% endGrid %}
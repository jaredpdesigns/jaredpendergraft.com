---
eleventyComputed:
  title: "{{ client.title }} • Jared Pendergraft"
  description: "Details about “{{ client.title }}” project"
  slug: "/clients/{{ client.type }}/{{ client.slug }}"
  class: "{{ client.type }}"
layout: layouts/base.njk
---

{% if client.type === 'invoice' %}
{% include 'content/invoice.md' %}
{% endif %}

{% if client.type === 'agreement' %}
{% include 'content/agreement.md' %}
{% endif %}
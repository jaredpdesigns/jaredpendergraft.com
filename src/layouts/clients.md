---
eleventyComputed:
  title: "{{ client.title }} • Jared Pendergraft"
  description: "Details about “{{ client.title }}” project"
  slug: "/clients/{{ client.type }}/{{ client.slug }}"
  class: "{{ client.type }}"
layout: base.webc
---

{% if client.type === 'invoice' %}
{% include 'components/clients/invoice.md' %}
{% endif %}

{% if client.type === 'agreement' %}
{% include 'components/clients/agreement.md' %}
{% endif %}

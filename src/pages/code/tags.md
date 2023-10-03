---
title: Tags • Jared Pendergraft
description: Code explorations tagged
img: https://jaredpendergraft.com/img/social.jpg
layout: page.webc
pageClass: code
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /code/tags/{{ tag }}/
---

# Code Explorations

Tagged `{{ tag }}` • See all [Code](/code)

<script webc:type="render" webc:is="template">
  function() {
    return `<grid webc:nokeep>${this.collections[this.tag].map(post => `<code-post webc:nokeep posthref="${post.url}" postimg="${post.data.img}" posttitle="${post.data.title}" postdescription="${post.data.description}" posttags="${post.data.tags}"></code-post>`).join("")}</grid>`;
  }
</script>

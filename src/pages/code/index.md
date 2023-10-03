---
title: Code Explorations • Jared Pendergraft
description: Helpful code snippets I continually refer to
img: https://jaredpendergraft.com/img/social.jpg
pageClass: code
layout: page.webc
---

# Code Explorations

<script webc:type="render" webc:is="template">
  function() {
    return `<grid webc:nokeep>${this.collections.code.map(post => `<code-post webc:nokeep posthref="${post.url}" postimg="${post.data.img}" posttitle="${post.data.title}" postdescription="${post.data.description}" posttags="${post.data.tags}"></code-post>`).join("")}</grid>`;
  }
</script>

---
title: Hire Me • Jared Pendergraft
description: Let’s create something great together!
img: https://jaredpendergraft.com/img/social-hire.jpg
slug: /hire/
pageClass: hire
layout: page.webc
---

# Let’s Create Something Great Together

> I’m currently serving as **Front End Engineer** at [Follow Up Boss](https://followupboss.com/), view my [résumé](/hire/me/) for more about my background.
>
> I’m always interested in creative freelance opportunities—if you'd like to work together send me an [email](mailto:hello@jaredpendergraft.com).

---

## My Creative Process

While each project requires different approaches to problem-solving, here are a few examples of common ways I approach design challenges:

<script webc:type="render" webc:is="template">
  function() {
    return `<grid webc:nokeep>${this.processes.map(process => `<process processimage="${process.img}" processlabel="${process.label}" processdescription="${process.description}" webc:nokeep></process>`).join("")}</grid>`;
  }
</script>

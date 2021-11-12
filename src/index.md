---
title: Jared Pendergraft
description: The personal website of Jared Pendergraft
img: https://jaredpendergraft.com/img/social.jpg
layout: layouts/base.njk
class: profile
profileImg: https://images.ctfassets.net/cuehicrlqnvu/48OC0pyrFD6iWSokRiz3Zs/f9fb4d4df16062af7a4eb885b1abc08e/profile-big.jpg
---

{% include 'components/profile_img.njk' %}

# Hello, It’s Nice to Meet You

I’m a multi-disciplinary designer focusing on the *intersection of design and development*. I care deeply about how something works as much as its outward appearance and am always looking to *improve, optimize and scale my ideas*.

I approach design challenges holistically, building solutions from beginning to end with *extensibility and modularity* in mind. I enjoy building out designs to fully functional front-end code—bridging the gap between design and development seamlessly.

View [projects](/projects/) I’ve worked on or learn more about my [creative process](/hire/#process).

***
## Featured Projects

{% Gallery %}
{% for item in projects | featured %}
  {% ProjectGallery item %}
{% endfor %}
{% endGallery%}
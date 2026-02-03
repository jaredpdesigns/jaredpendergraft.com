---
title: Jared Pendergraft
description: My favorite albums from {{ albums[0].year }}
pageClass: albums
layout: base.webc
---

# Favorite Albums

<albums-nav :albums="albums" :current-year="albums[0].year" webc:nokeep></albums-nav>

<album webc:for="(album, index) of albums[0].albums" :album="album" webc:nokeep></album>

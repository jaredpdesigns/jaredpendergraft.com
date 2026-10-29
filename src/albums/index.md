---
title: Jared Pendergraft
description: My favorite albums from {{ albums[0].year }}
pageClass: albums
layout: albums.webc
---

# Favorite Albums

<albums-nav :albums="albums" :current-year="albums[0].year" webc:nokeep></albums-nav>

<section class="albums flow__align--block-start flow__grid flow__grid--columns-auto flow__gap--m">
<album webc:for="(album, index) of albums[0].albums" :album="album" webc:nokeep></album>
</section>

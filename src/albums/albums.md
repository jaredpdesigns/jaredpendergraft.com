---
pagination:
  data: albums
  size: 1
  alias: yearData
permalink: "albums/{{ yearData.year }}/"
title: Jared Pendergraft
description: My favorite albums from {{ yearData.year }}
pageClass: albums
layout: albums.webc
---

# Favorite Albums

<albums-nav :albums="albums" :current-year="yearData.year" webc:nokeep></albums-nav>

<section class="albums flow__align--block-start flow__grid flow__grid--columns-auto flow__gap--m">
<album webc:for="(album, index) of yearData.albums" :album="album" webc:nokeep></album>
</section>

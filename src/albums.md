---
pagination:
  data: albums
  size: 1
  alias: yearData
permalink: "albums/{% if pagination.pageNumber == 0 %}index.html{% else %}{{ yearData.year }}/{% endif %}"
title: Jared Pendergraft
description: My favorite albums from {{ yearData.year }}
pageClass: albums
layout: base.webc
---

# Favorite Albums

<nav webc:if="pagination.pages.length > 1">
  <section class="flow__inline flow__gap--m type__size--m-l--fluid type__weight--semibold">
    <a webc:for="(pageYear, pageIndex) of albums" class="radius__xs"
      :href="pageIndex === 0 ? '/albums/' : `/albums/${pageYear.year}/`"
      :aria-current="yearData.year === pageYear.year && 'page'"
      @text="pageYear.year"></a>
  </section>
</nav>

<album webc:for="(album, index) of yearData.albums" :album="album" webc:nokeep></album>

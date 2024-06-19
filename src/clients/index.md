---
title: Clients • Jared Pendergraft
description: Portal for hosting client files, agreements and invoices
slug: /clients/
layout: base.webc
pageClass: clients
---

# Client Projects

<client webc:for="client of this.clients" :item="client"></client>

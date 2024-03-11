# {{ client.title }}

{{ client.end.month }} {{ client.end.day }}, {{ client.end.year }}

**{{ client.client.name }}** \
{{ client.client.street }} \
{{ client.client.city }}, {{ client.client.state }} {{ client.client.zip }}

---

## Final Invoice Amount

${{ client.total.toLocaleString("en-US") }}

---

**Please send invoice payment to the following address:**

> Jared Pendergraft \
> 127 Ho‘owaiwai Loop \#2006 \
> Wailuku, HI 96793

_Thank you for this creative opportunity!_

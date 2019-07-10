<template>
  <article>
    <figure>
      <Freeform/>
    </figure>
    <figure class="full">
      <Tablet />
      <Tablet orientation="landscape" />
    </figure>
    <figure class="full">
      <Phone />
    </figure>
    <figure class="full">
      <Browser />
    </figure>
  </article>
</template>
<script>
import Browser from "@/components/DeviceBrowser";
import Freeform from "@/components/DeviceFreeform";
import Phone from "@/components/DevicePhone";
import Tablet from "@/components/DeviceTablet";
export default {
  components: { Browser, Freeform, Phone, Tablet }
};
</script>
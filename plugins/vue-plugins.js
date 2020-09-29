import Vue from "vue";

Vue.config.productionTip = false;

Vue.directive("Scroll", {
  inserted: (el, binding) => {
    let f = (evt) => {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  },
});

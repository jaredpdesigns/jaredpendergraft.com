import Vue from "vue";
import Vuex from "vuex";
import { clients } from "./clients";
import { projects } from "./projects";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    setTheme: ({ commit, state }, value) => {
      if (value) commit("theme", value);
      let root = document.getElementsByTagName("html")[0];
      root.setAttribute("theme", state.theme);
    },
  },
  mutations: {
    theme: (state, value) => {
      state.theme = value;
    },
  },
  state: {
    clients: clients,
    projects: projects,
    theme: "light",
  },
});

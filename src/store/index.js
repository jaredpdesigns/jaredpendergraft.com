import Vue from "vue";
import Vuex from "vuex";
import { clients } from "./clients";
import { projects } from "./projects";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clients: clients,
    projects: projects
  }
});

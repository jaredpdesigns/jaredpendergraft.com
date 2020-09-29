import { clients } from "../data/clients";
import { projects } from "../data/projects";

export const state = () => ({
  clients: clients,
  domain: "https://jaredpendergraft.com",
  projects: projects,
  theme: "light",
});

export const actions = {
  setTheme({ state }, value) {
    state.theme = value;
  },
};

export const strict = false;

import { clients } from "../data/clients";
import { projects } from "../data/projects";
import { snippets } from "../data/snippets";

export const state = () => ({
  clients: clients,
  domain: "https://jaredpendergraft.com/",
  projects: projects,
  snippets: snippets,
  theme: "light",
});

export const actions = {
  setTheme({ state }, value) {
    state.theme = value;
  },
};

export const strict = false;

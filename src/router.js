import Vue from "vue";
import Router from "vue-router";
import Profile from "./views/Profile";
import Projects from "./views/Projects";
import Project from "./views/Project";
import Hire from "./views/Hire";
import Resume from "./views/Resume";
import Clients from "./views/Clients";
import Agreement from "./views/Agreement";
import Invoice from "./views/Invoice";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 64 }
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "*",
      component: () => import("./views/Error")
    },
    {
      path: "/",
      name: "Profile",
      component: Profile
    },
    {
      path: "/projects/",
      name: "Projects",
      component: Projects
    },
    {
      path: "/projects/:slug",
      name: "Project",
      component: Project
    },
    {
      path: "/hire/",
      name: "Hire",
      component: Hire
    },
    {
      path: "/hire/resume/",
      name: "Résumé",
      component: Resume
    },
    {
      path: "/clients",
      name: "Clients",
      component: Clients
    },
    {
      path: "/clients/agreement/:slug",
      name: "Agreement",
      component: Agreement
    },
    {
      path: "/clients/invoice/:slug",
      name: "Invoice",
      component: Invoice
    }
  ]
});

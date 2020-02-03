import Vue from "vue";
import Router from "vue-router";
import Profile from "./views/Profile";
import Projects from "./views/Projects";
import Hire from "./views/Hire";

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
      component: () => import("./views/Project")
    },
    {
      path: "/hire/",
      name: "Hire",
      component: Hire
    },
    {
      path: "/hire/resume/",
      name: "Résumé",
      component: () => import("./views/Resume")
    },
    {
      path: "/clients",
      name: "Clients",
      component: () => import("./views/Clients")
    },
    {
      path: "/clients/agreement/:slug",
      name: "Agreement",
      component: () => import("./views/Agreement")
    },
    {
      path: "/clients/invoice/:slug",
      name: "Invoice",
      component: () => import("./views/Invoice")
    }
  ]
});

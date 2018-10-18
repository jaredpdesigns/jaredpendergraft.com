import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Error from "./views/Error.vue";
import Projects from "./views/Projects.vue";
import Project from "./views/Project.vue";
import Resume from "./views/Resume.vue";
import Hire from "./views/Hire.vue";

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
      component: Error
    },
    {
      path: "/",
      name: "Home",
      component: Home
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
      path: "/resume/",
      name: "Résumé",
      component: Resume
    },
    {
      path: "/hire/",
      name: "Hire",
      component: Hire
    }
  ]
});

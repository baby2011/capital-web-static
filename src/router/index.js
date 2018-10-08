import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home.vue";
import Banner from "@/pages/Banner";
import Team from "@/pages/Team";
import Portfolio from "@/pages/Portfolio";
import Community from "@/pages/Community";
import Login from '@/pages/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/banner",
      name: "banner",
      component: Banner
    },
    {
      path: "/team",
      name: "team",
      component: Team
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio
    },
    {
      path: "/community",
      name: "community",
      component: Community
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

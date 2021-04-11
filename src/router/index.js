import Vue from "vue";
import VueRouter from "vue-router";
import welcome from "../pages/Welcome";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: welcome,
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../pages/Home"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;

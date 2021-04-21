import Vue from "vue";
import VueRouter from "vue-router";
import { checkCookie } from "../utils/cookies"
import welcome from "../pages/Welcome"
Vue.use(VueRouter);

const routes = [
  {
    path: "/welcome",
    name: "welcome",
    component: welcome,
  },
  {
    path: "/",
    name: "main",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    redirect: "/home",
    component: () =>
      import(/* webpackChunkName: "main" */ "../layout/index.vue"),
    children: [{
      path: "/home",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Home"),
    },
    {
      path: "/concise",
      name: "concise",
      component: () =>
        import(/* webpackChunkName: "concise" */ "../pages/Concise"),
    }]
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import(/* webpackChunkName: "NotFound" */ "../pages/NotFound")
  },
  {
    path: "*",
    redirect: "/404",
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

const whiteList = ['welcome', 'notFound']

/**当第一次进入时会跳转到/welcome，并且设置cookie，后续进入如果带有cookie，则直接进入页面不需要在跳转到welcome */
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.name) !== 0 && whiteList.indexOf(to.name) !== 1) {
    if (checkCookie()) {
      next()
    } else {
      next({ name: 'welcome' })
    }
  }
  else { next() }
})
export default router;

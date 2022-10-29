/*
 * @Author: SunBOY
 * @Date: 2022-10-25 17:58:01
 * @LastEditors: SunBOY
 * @LastEditTime: 2022-10-30 02:26:22
 * @FilePath: \src\router\index.js
 * @Description:
 * Copyright 2022 OBKoro1, All Rights Reserved.
 * 2022-10-25 17:58:01
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: "/mian",
      children: [
        {
          path: "mian",
          name: "Mian",
          component: () => import("@/views/home/Main/index.vue"),
          meta: { title: "首页", icon: "dashboard" },
        },
      ],
    },
    {
      path: "/produt",
      name: "Produt",
      component: Home,
      children: [
        // 商品管理
        {
          path: "trademark",
          name: "Trademark",
          component: () => import("@/views/product/tradeMark.vue"),
          meta: { title: "品牌管理", icon: "dashboard" },
        },
        {
          path: "sku",
          name: "Sku",
          component: () => import("@/views/product/sku.vue"),
          meta: { title: "sku", icon: "dashboard" },
        },
        {
          path: "spu",
          name: "Spu",
          component: () => import("@/views/product/spu.vue"),
          meta: { title: "spu", icon: "dashboard" },
        },
        {
          path: "arrt",
          name: "Arrt",
          component: () => import("@/views/product/arrt.vue"),
          meta: { title: "arrt", icon: "dashboard" },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/login/index.vue"),
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      hidden: true,
    },
    // { path: "*", redirect: "/404", hidden: true },
  ],
});

router.beforeEach((to, from) => {
  // 判断是否登录
  if (to.name !== "login" && !localStorage.getItem("token")) {
    return { name: "login" };
  }
});

export default router;

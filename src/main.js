/*
 * @Author: SunBOY
 * @Date: 2022-10-25 17:58:01
 * @LastEditors: SunBOY
 * @LastEditTime: 2022-10-29 21:29:14
 * @FilePath: \src\main.js
 * @Description:
 * Copyright 2022 OBKoro1, All Rights Reserved.
 * 2022-10-25 17:58:01
 */
import { createApp, provide } from "vue";
import { createPinia } from "pinia";
import * as echarts from "echarts";
import App from "./App.vue";
import router from "./router";
import api from "./axios/api";

// 全局组件
import Conmmon from "@/components/CommonAside.vue";

// import "./assets/main.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.component("Conmmon", Conmmon);
app.provide("echarts", echarts);
app.provide("api", api);
app.mount("#app");

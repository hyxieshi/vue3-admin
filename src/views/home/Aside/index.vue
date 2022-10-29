<!--
 * @Author: SunBOY
 * @Date: 2022-10-25 20:01:23
 * @LastEditors: SunBOY
 * @LastEditTime: 2022-10-29 23:10:02
 * @FilePath: \src\views\home\Aside\index.vue
 * @Description: 
 * Copyright 2022 OBKoro1, All Rights Reserved. 
 * 2022-10-25 20:01:23
-->
<template>
  <el-aside :width="!store.isCollapse ? '200px' : '64px'">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="store.isCollapse"
      :collapse-transition="false"
      @open="handleOpen"
      @close="handleClose"
    >
      <h3 v-show="!store.isCollapse">后台 vue3-vite-pinia</h3>
      <h3 v-show="store.isCollapse">后台</h3>
      <el-menu-item index="1">
        <template #title>
          <el-icon><Compass /></el-icon>
          <span>
            <RouterLink to="/">首页</RouterLink>
          </span>
        </template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Lock /></el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">角色管理</el-menu-item>
          <el-menu-item index="2-3">菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Odometer /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <RouterLink to="/produt/trademark">商品管理</RouterLink>
          </el-menu-item>
          <el-menu-item index="3-2">
            <RouterLink to="/produt/arrt">平台属性管理</RouterLink>
          </el-menu-item>
          <el-menu-item index="3-3"
            >Spu管理
            <!-- <RouterLink to="/produt/spu">Spu管理</RouterLink> -->
          </el-menu-item>
          <el-menu-item index="3-4">
            <RouterLink to="/produt/sku"> Sku管理 </RouterLink>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Warning /></el-icon>
          <span>测试管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">测试1</el-menu-item>
          <el-menu-item index="4-2">测试2</el-menu-item>、
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const handleOpen = (key, keyPath) => {
  console.log(store.isCollapse);
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<style lang="less">
.el-aside {
  background-color: #333;
  .el-menu {
    height: 100%;
    h3 {
      color: #333;
      line-height: 48px;
      text-align: center;
    }
  }
}
a {
  text-decoration: none;
  color: #333;
}
</style>

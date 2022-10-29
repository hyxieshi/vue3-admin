<!--
 * @Author: SunBOY
 * @Date: 2022-10-25 19:59:11
 * @LastEditors: SunBOY
 * @LastEditTime: 2022-10-30 02:39:55
 * @FilePath: \src\views\home\Header\index.vue
 * @Description: 
 * Copyright 2022 OBKoro1, All Rights Reserved. 
 * 2022-10-25 19:59:11
-->
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
const route = useRoute();
const router = useRouter();
function upisCollapse() {
  store.isCollapse = !store.isCollapse;
}
function ed() {
  localStorage.removeItem("token");
  router.push({ name: "home" });
  ElMessage({
    type: "info",
    message: "已退出",
  });
}
</script>
<template>
  <el-header class="con">
    <div class="r">
      <el-button @click="upisCollapse()"
        ><el-icon><Menu /></el-icon
      ></el-button>
      <h3>首页</h3>
    </div>
    <div class="l">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <img src="../../../assets/log.jpg" alt="" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="ed()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="less" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  .r {
    display: flex;
    align-items: center;
  }
  .l {
    span {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

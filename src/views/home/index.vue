<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container class="cons">
        <Header></Header>
        <RouterView />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from "./Header/index.vue";
import Aside from "./Aside/index.vue";
</script>
<style scoped>
.cons {
  display: flex;
  flex-direction: column;
}
</style>

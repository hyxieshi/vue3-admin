<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6"
        ><el-card :style="{ height: '100%' }">
          <template #header>
            <div class="card-header">
              <span>总销售额</span>
            </div>
          </template>
          <div class="text item">
            <h2>$12312</h2>
            <p>sdfwe</p>
            <p>日销售</p>
          </div>
        </el-card></el-col
      >
      <el-col :span="6">
        <el-card :style="{ height: '100%' }">
          <template #header>
            <div class="card-header">
              <span>访问量</span>
            </div>
          </template>
          <div class="text item">
            <div id="fwl" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card :style="{ height: '100%' }">
          <template #header>
            <div class="card-header">
              <span>支付笔数</span>
            </div>
          </template>
          <div class="text item">
            <div id="zfb" :style="{ width: '100%', height: '100%' }"></div>
          </div> </el-card
      ></el-col>
      <el-col :span="6"
        ><el-card :style="{ height: '100%' }">
          <template #header>
            <div class="card-header">
              <span>运营活动效果</span>
            </div>
          </template>
          <div class="text item">
            <div class="demo-progress">
              <el-progress type="circle" :percentage="100" status="success" />
            </div>
          </div> </el-card
      ></el-col>
    </el-row>
  </div>
</template>
<script setup>
import { onMounted, inject } from "vue";

const echarts = inject("echarts");

onMounted(() => {
  let mychart = echarts.init(document.getElementById("fwl"));
  let mycharts = echarts.init(document.getElementById("zfb"));
  mychart.setOption({
    xAxis: {
      data: [],
      show: false,
    },
    yAxis: {
      data: [],
      show: false,
    },
    series: [
      {
        data: [10, 22, 3, 23, 19, 52, 11],
        type: "line",
        areaStyle: {},
      },
    ],
  });
  mycharts.setOption({
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: "bar",
        data: [23, 24, 18, 25, 27, 28, 25],
      },
    ],
  });
});
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
.demo-progress {
  margin: auto;
  width: 350px;
}
</style>

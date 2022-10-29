<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card>
        <div slot="header" class="header">
          <div class="search-header">
            <span>线上热门搜索</span>
            <el-dropdown>
              <span>
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div>
          <el-row :gutter="10">
            <el-col :span="12">
              <obs></obs>
            </el-col>
            <el-col :span="12">
              <obs></obs>
            </el-col>
          </el-row>
          <!-- table表格 -->
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="排名" width="80" type="index">
            </el-table-column>
            <el-table-column label="搜搜关键字" width="180"> </el-table-column>
            <el-table-column label="用户数" sortable> </el-table-column>
            <el-table-column label="周涨幅" sortable> </el-table-column>
          </el-table>
          <!-- 分页去 -->
          <el-pagination
            layout="prev, pager, next"
            :total="1000"
            class="pagination"
          >
          </el-pagination>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <div slot="header" class="header">
          <div class="category-header">
            <span>销售额类别占比</span>
            <el-radio-group v-model="value">
              <el-radio-button label="全部渠道"></el-radio-button>
              <el-radio-button label="线上"></el-radio-button>
              <el-radio-button label="门店"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- dd -->
        <div>
          <div class="charts" ref="charts"></div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import obs from "./obs.vue";

import { ref, onMounted, inject } from "vue";

const echarts = inject("echarts");
let value = ref("全部渠道");
const charts = ref(null);

onMounted(() => {
  let mychart = echarts.init(charts.value);
  console.log(mychart);
  mychart.setOption({
    title: {
      text: "视频",
      subtext: 1048,
      left: "center",
      top: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outsize",
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 1048, name: "视频" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  });
  mychart.on("mouseover", (params) => {
    //获取鼠标移上去那条数据
    const { name, value } = params.data;
    //重新设置标题
    mychart.setOption({
      title: {
        text: name,
        subtext: "value",
      },
    });
  });
});
</script>
<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>

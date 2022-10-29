<template>
  <el-table style="width: 100%" border :data="state.records">
    <el-table-column
      type="index"
      label="序号"
      width="80"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="skuName"
      label="名称"
      width="width"
    ></el-table-column>
    <el-table-column
      prop="skuDesc"
      label="描述"
      width="width"
    ></el-table-column>
    <el-table-column label="默认图片" width="110">
      <template v-slot="{ row, $index }">
        <img
          :src="row.skuDefaultImg"
          alt=""
          style="width: 80px; height: 80px"
        />
      </template>
    </el-table-column>
    <el-table-column prop="weight" label="重量" width="80"></el-table-column>
    <el-table-column prop="price" label="价格" width="80"></el-table-column>
    <el-table-column prop="prop" label="操作" width="width">
      <template v-slot="{ row, $index }">
        <el-button
          type="success"
          icon="el-icon-sort-down"
          size="mini"
          v-if="row.isSale == 0"
          @click="sale(row)"
        ></el-button>
        <el-button
          type="success"
          icon="el-icon-sort-up"
          size="mini"
          v-else
          @click="cancel(row)"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="edit"
        ></el-button>
        <el-button
          type="info"
          icon="el-icon-info"
          size="mini"
          @click="getSkuInfo(row)"
        ></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页          -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="getSkuList"
    style="text-align: center"
    :current-page="page"
    :page-sizes="[3, 5, 10]"
    :page-size="limit"
    layout="prev, pager, next, jumper,->,sizes,state.total"
    :total="state.total"
  >
  </el-pagination>
  <!-- 抽屉效果 -->
  <el-drawer :visible.sync="show" :show-close="false" size="50%">
    <el-row>
      <el-col :span="5">名称</el-col>
      <el-col :span="16">{{ skuInfo.skuName }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">描述</el-col>
      <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">价格</el-col>
      <el-col :span="16">{{ skuInfo.price }}元</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">平台属性</el-col>
      <el-col :span="16">
        <template>
          <el-tag
            type="success"
            v-for="(attr, index) in skuInfo.skuAttrValueList"
            :key="attr.id"
            style="margin-right: 10px"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">商品图片</el-col>
      <el-col :span="16">
        <el-carousel height="150px">
          <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
            <img :src="item.imgUrl" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script setup>
import { onMounted, reactive, inject } from "vue";
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const state = reactive({
  page: 1, //代表当前第几页
  limit: 10, //代表当前页面有几条数据
  records: [], //存储SKU列表的数据
  total: 0, //存储分页器一共展示的数据
  skuInfo: {}, //存储SKU信息
  show: false,
});
const API = inject("api");
//组件挂载完毕
onMounted(() => {
  {
    //获取sku列表的方法
    getSkuList();
  }
});
//获取sku列表数据的方法
async function getSkuList(pages = 1) {
  state.page = pages;
  let { data } = await API.product.reqSkuList(state.page, state.limit);
  // console.log(result);
  if (data.code == 200) {
    state.total = data.data.total;
    state.records = data.data.records;
  }
  console.log(state);
}
function handleSizeChange(limit) {
  //修改参数
  state.limit = limit;
  getSkuList();
}
//上架
async function sale(row) {
  let { data } = await API.product.reqSale(row.id);
  if (data.code == 200) {
    row.isSale = 1;
    ElMessage({
      type: "info",
      message: "上架成功",
    });
  }
}
//下架
async function cancel(row) {
  let { data } = await API.product.reqCancel(row.id);
  if (data.code == 200) {
    row.isSale = 0;
    ElMessage({
      type: "info",
      message: "已下架",
    });
  }
}
function edit() {
  ElMessage({
    type: "info",
    message: "正在开发中",
  });
}
//获取SKU详情的方法
async function getSkuInfo(sku) {
  //展示抽屉
  state.show = true;
  // 获取SKU数据;
  let { data } = await API.product.reqSkuById(sku.id);
  if (data.code == 200) {
    state.skuInfo = result.data;
  }
}
</script>

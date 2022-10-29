<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动已经是全局组件了 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="state.scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部这里将来是有三部分进行切换 -->
      <div v-show="state.scene == 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!state.category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="state.records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{ row, $index }">
              <!-- 这里按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="state.page"
          :page-sizes="[3, 5, 10]"
          :page-size="state.limit"
          layout="prev, pager, next, jumper,->, sizes,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="state.scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="state.scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="state.dialogTableVisible"
      :before-close="close"
    >
      <!-- table展示sku列表-->
      <el-table
        :data="state.skuList"
        style="width: 100%"
        border
        v-loading="loading"
      >
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template v-slot="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
//引入子组件
// import SpuForm from "./SpuForm";
// import SkuForm from "./SkuForm";
import { reactive, inject, ref } from "vue";
const API = inject("api");
let sup = ref(null);
let sku = ref(null);
const state = reactive({
  //分别是分类的id
  category1Id: "",
  category2Id: "",
  category3Id: "",
  //控制三级联动的可操作性
  page: 1, //分页器当前第几页
  limit: 3, //每一页需要展示多少条数据
  records: [], //spu列表的数据
  total: 0, //分页器一共需要展示数据的条数
  scene: 0, //0代表展示SPU列表数据   1 添加SPU|修改SPU   2 添加SKU
  //控制对话框的显示与隐藏
  dialogTableVisible: false,
  spu: {},
  skuList: [], //存储的是SKU列表的数据
  loading: true,
});
//三级联动的自定义事件，可以把子组件的相应的id传递给父组件
function getCategoryId({ categoryId, level }) {
  //categoryId:获取到一、二、三级分类的id  level：为了区分是几级id
  if (level == 1) {
    state.category1Id = categoryId;
    //清除2、3级分类的id
    state.category2Id = "";
    state.category3Id = "";
  } else if (level == 2) {
    state.category2Id = categoryId;
    //清除3级id
    state.category3Id = "";
  } else {
    state.category3Id = categoryId;
    //获取SPU列表数据进行展示
    getSpuList();
  }
}
//获取SPU列表数据的方法
async function getSpuList(pages = 1) {
  state.page = pages;
  //携带三个参数:page 第几页  limit 每一页需要展示多少条数据  三级分类id
  let { data } = await API.product.reqSpuList(page, limit, category3Id);
  if (data.code == 200) {
    state.total = data.data.total;
    state.records = data.data.records;
  }
}
//当分页器的某一个展示数据条数发生变化的回调
function handleSizeChange(limit) {
  //修改参数
  state.limit = limit;
  //再发请求
  getSpuList();
}
//添加SPU按钮的回调
function addSpu() {
  //切换为场景为1
  state.scene = 1;
  //通知子组件SpuForm发请求---两个
  spu.value.addSpuData(state.category3Id);
}
//修改某一个SPU
function updateSpu(row) {
  state.scene = 1;
  //获取子组件SpuForm子组件的
  //在父组件当中可以通过$ref获取子组件等等
  spu.value.initSpuData(row);
}
//自定义事件回调（SpuForm）
function changeScene({ scene, flag }) {
  //flag这个形参为了区分保存按钮是添加还是修改
  //切换结构（场景）
  state.scene = scene;
  //子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
  if (flag == "修改") {
    getSpuList(state.page);
  } else {
    getSpuList();
  }
}
//删除SPU的回调
async function deleteSpu(row) {
  let { data } = await API.product.reqDeleteSpu(row.id);
  if (data.code == 200) {
    this.$message({ type: "success", message: "删除成功" });
    //代表SPU个数大于1删除的时候停留在当前页，如果SPU个数小于1 回到上一页
    getSpuList(state.records.length > 1 ? state.page : state.page - 1);
  }
}
//添加SKU按钮的回调
function addSku(row) {
  //切换场景为2
  state.scene = 2;
  //父组件调用子组件的方法，让子组件发请求------三个请求
  this.$refs.sku.getData(state.category1Id, state.category2Id, row);
}
//skuform通知父组件修改场景
function changeScenes(scene) {
  state.scene = scene;
}
//查看SKU的按钮的回调
async function handler(spu) {
  //点击这个按钮的时候，对话框可见的
  state.dialogTableVisible = true;
  //保存spu信息
  state.spu = spu;
  //获取sku列表的数据进行展示
  let result = await API.product.reqSkuList(spu.id);
  if (result.code == 200) {
    state.skuList = result.data;
    //loading隐藏
    state.loading = false;
  }
}
//关闭对话框的回调
function close(done) {
  //loading属性再次变为真
  state.loading = true;
  //清除sku列表的数据
  state.skuList = [];
  //管理对话框
  done();
}
</script>

<style scoped></style>

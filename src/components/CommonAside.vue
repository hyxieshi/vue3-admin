<template>
  <div>
    <!-- inline:代表的是行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="state.cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="state.cForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in state.list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="state.cForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in state.list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="state.cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in state.list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, defineProps, inject, defineEmits } from "vue";

const props = defineProps(["show"]);
const emit = defineEmits(["getCategoryId"]);
const API = inject("api");
const state = reactive({
  list1: [],
  //二级分类的数据
  list2: [],
  //三级分类的数据
  list3: [],
  //收集相应的一级二级三级分类的id
  cForm: {
    category1Id: "",
    category2Id: "",
    category3Id: "",
  },
});

onMounted(() => {
  getCategory1List();
});

async function getCategory1List() {
  //获取一级分类的请求：不需要携带参数
  let { data } = await API.product.reqCategory1List();
  if (data.code == 200) {
    state.list1 = data.data;
  }
}
//一级分类的select事件回调（当一级分类的option发生变化的时候获取相应二级分类的数据）
async function handler1() {
  //清除数据
  state.list2 = [];
  state.list3 = [];
  state.cForm.category2Id = "";
  state.cForm.category3Id = "";
  //解构出一级分类的id
  const { category1Id } = state.cForm;
  emit("getCategoryId", { categoryId: category1Id, level: 1 });
  //通过一级分类的id，获取二级分类的数据
  let { data } = await API.product.reqCategory2List(category1Id);
  if (data.code == 200) {
    state.list2 = data.data;
  }
}
//二级分类的select事件回调（当二级分类的option发生变化的时候获取相应三级分类的数据）
async function handler2() {
  //清除数据
  state.list3 = [];
  state.cForm.category3Id = "";
  //结构出数据
  const { category2Id } = state.cForm;
  emit("getCategoryId", { categoryId: category2Id, level: 2 });
  let { data } = await API.product.reqCategory3List(category2Id);
  if (data.code == 200) {
    state.list3 = data.data;
  }
}
function handler3() {
  //获取三级分类的id
  const { category3Id } = state.cForm;
  emit("getCategoryId", { categoryId: category3Id, level: 3 });
}
</script>

<style scoped></style>

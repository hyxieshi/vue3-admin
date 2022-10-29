<template>
  <div class="login-container">
    <!-- el-form组件：elementUI插件里面的一个组件，经常展示表单元素  model：用于收集表单数据  rules：表单验证规则-->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="login-from"
      :label-position="right"
    >
      <el-form-item label="用户名" prop="checkPass">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const ruleFormRef = ref();

const checkAge = (value, callback) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validateNass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  pass: "",
  name: "",
});

const rules = reactive({
  pass: [{ validator: validateNass, trigger: "blur" }],
  checkPass: [{ validator: validatePass, trigger: "blur" }],
});

// 这里处理登录
const submitForm = (formEl) => {
  if (!formEl) return;
  // 没有接口 就随便了
  // 理应 请求后获取token jwt 持久化
  // 后面请求并携带
  if (ruleForm.pass == "admin" && ruleForm.name == "admin") {
    // 假装 有token   data 用于时间戳 判断token 有无过期
    let token = {
      mag: "iloveyou",
      data: Date.now(),
    };
    localStorage.setItem("token", JSON.stringify(token));
    console.log("已登录", token);
    // console.log(route);
    router.push("/");
  }
};
</script>

<style lang="less" scoped>
.login-container {
  min-height: 100vh;
  background-color: rgba(116, 216, 133, 0.753);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .login-from {
    width: 30%;
    border: 1px solid;
    border-radius: 5px;
    border-color: rgb(78, 86, 87);
    padding: 20px;

    .el-button {
      width: 100%;
    }
  }
}
</style>

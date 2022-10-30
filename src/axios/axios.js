/*
 * @Author: SunBOY
 * @Date: 2022-10-28 15:41:38
 * @LastEditors: SunBOY
 * @LastEditTime: 2022-10-30 15:25:12
 * @FilePath: \src\axios\axios.js
 * @Description:
 * Copyright 2022 OBKoro1, All Rights Reserved.
 * 2022-10-28 15:41:38
 */
import axios from "axios";

let URL = "https://vue3-admin-ibxhvlwz9-hyxieshi.vercel.app";
let turl = "http://gmall-h5-api.atguigu.cn";
const instance = axios.create({
  baseURL: URL,
  timeout: 5000,
});
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;

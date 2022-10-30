/*
 * @Author: SunBOY
 * @Date: 2022-10-30 15:01:49
 * @LastEditors: SunBOY
 * @LastEditTime: 2022-10-30 15:04:53
 * @FilePath: \src\api\proxy.js
 * @Description:
 * Copyright 2022 OBKoro1, All Rights Reserved.
 * 2022-10-30 15:01:49
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = "";

  // 代理目标地址
  // xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith("/admin")) {
    // 这里填目标地址
    target = "//gmall-h5-api.atguigu.cn";
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      // 例如 /api/user/login 将被转发到 http://target/user/login
      "^/admin/": "/admin",
    },
  })(req, res);
};

//导入axios
import axios from 'axios'
import Vue from 'vue'

//导入的路由的对象
import router from '../router'

import {
  Message
} from 'element-ui';

//基础url配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/api';
//设置请求头,可以放在请求拦截里
// axios.defaults.headers.token='123456';

//请求拦截器
axios.interceptors.request.use(function (config) {
  //设置请求头
  let res = JSON.parse(localStorage.getItem('userInfo') || '{}');
  config.headers.authorization = res.token;
  //设置请求头
  return config;
});

//响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code == 403) {
    Message({
      message: response.data.msg,
      type: "error",
    });
    router.push('/login')
  }
  return response.data;
});

//在vue对象的原型中定义一个方法axios
Vue.prototype.$http = axios;

export default axios;

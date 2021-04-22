// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//导入http.js
import './utils/http';
//导入element.js
import './utils/element';

//定义一个全局属性挂载在vue的原型对象中，全局使用
Vue.prototype.$imgBaseUrl='http://127.0.0.1:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

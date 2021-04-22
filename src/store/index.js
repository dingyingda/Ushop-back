import Vuex from 'vuex'
import Vue from 'vue'
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'
//注册vuex
Vue.use(Vuex);

let store= new Vuex.Store({
    //数据存储对象
    state:{
    },
    //类似于组件内部计算属性
    getters:{
    },
    //唯一改变state的方法，操作数据的同步方法
    mutations:{
    },
    //请求数据接口的异步方法，ajax
    actions:{
    },
    modules:{
        menu,role,user,cate,specs,goods,member,banner,seck
    }
});

//导出
export default store;
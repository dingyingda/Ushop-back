import Vue from 'vue'
import Router from 'vue-router'

//导入一级路由组件
let Layout = () => import('../pages/Layout');
let Login = () => import('../pages/Login');

//导入二级路由组件
let Home = () => import('../pages/Home');
let Menu = () => import('../pages/Menu');
let Role = () => import('../pages/Role');
let User = () => import('../pages/User');
let Cate = () => import('../pages/Cate');
let Specs = () => import('../pages/Specs');
let Goods = () => import('../pages/Goods');
let Member = () => import('../pages/Member');
let Banner = () => import('../pages/Banner');
let Seck = () => import('../pages/Seck');

import {
  Message
} from 'element-ui';



Vue.use(Router)

// 解决跳转到登录页报错问题，重复点击导航
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


let router = new Router({
  routes: [{
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{
          path: '/home',
          component: Home,
          meta: {
            title: '数据可视化'
          }
        },
        {
          path: '/menu',
          component: Menu,
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: '/role',
          component: Role,
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/admin',
          component: User,
          meta: {
            title: '会员管理'
          }
        },
        {
          path: '/category',
          component: Cate,
          meta: {
            title: '商品分类'
          }
        },
        {
          path: '/specs',
          component: Specs,
          meta: {
            title: '商品规格'
          }
        },
        {
          path: '/goods',
          component: Goods,
          meta: {
            title: '商品管理'
          }
        },
        {
          path: '/member',
          component: Member,
          meta: {
            title: '会员管理'
          }
        },
        {
          path: '/banner',
          component: Banner,
          meta: {
            title: '轮播图管理'
          }
        },
        {
          path: '/seckill',
          component: Seck,
          meta: {
            title: '限时秒杀'
          }
        },
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录页面'
      }
    },
  ],
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  //做路由的拦截以及权限管理
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (to.path != '/login') {
    if (!userInfo.token) {
      Message({
        message: '权限失效,请重新登录!',
        type: "error",
      });
      next('/login');
    }
  }
  if(to.path!='/login'&&to.path!='/home'){
    if(userInfo.menus_url.indexOf(to.path)==-1){
      Message({
        message: '您没有权限,请知悉!',
        type: "error",
      });
      next('/home');
    }
  }
  document.title = to.meta.title + '--小U商城后台管理系统';
  next();
})
export default router;

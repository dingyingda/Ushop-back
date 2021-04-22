<template>
  <fullscreen ref="fullscreen">
    <el-container class="container">
      <el-aside :width="isCollapse ? '65px' : '226px'">
        <h1>小U商城后台</h1>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>
          <div v-for="(item, index) in menus" :key="item.id">
            <!-- 菜单 -->
            <el-menu-item :index="item.url" v-if="item.type == 2">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <!-- 目录 -->
            <el-submenu :index="index + ''" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <!-- 子菜单 -->
                <el-menu-item
                  :index="val.url"
                  v-for="val in item.children"
                  :key="val.id"
                  >{{ val.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <el-button
              class="btn_spread"
              type="primary"
              size="mini"
              icon="el-icon-s-fold"
              @click="isCollapse = !isCollapse"
            ></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"
                >管理中心</el-breadcrumb-item
              >
              <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button
              @click="back"
              class="btn_back"
              icon="el-icon-back"
              size="mini"
              circle
            ></el-button>
          </div>
          <div class="right">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><i class="el-icon-user"></i>个人信息</el-dropdown-item
                >
                <el-dropdown-item
                  ><i class="el-icon-full-screen"></i><span @click="fullscreen">全屏预览</span></el-dropdown-item
                >
                <el-dropdown-item
                  ><i class="el-icon-switch-button"></i
                  ><span @click="quit">安全退出</span></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <!-- 二级路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
import Vue from "vue";
import fullscreen from "vue-fullscreen";
//注册
Vue.use(fullscreen);
export default {
  data() {
    return {
      isCollapse: false,
      username: JSON.parse(localStorage.getItem("userInfo") || "{}").username,
      menus: [],
    };
  },
  created() {
    console.log(JSON.parse(localStorage.getItem("userInfo")));
    this.menus = JSON.parse(localStorage.getItem("userInfo") || "{}").menus;
  },
  methods: {
    fullscreen() {
      this.$refs.fullscreen.toggle();
    },
    quit() {
      //1、弹窗提示
      this.$message({
        message: "退出成功!",
        type: "success",
      });
      //2、清除localstory里的数据
      localStorage.removeItem("userInfo");
      //3、跳转到页面login
      this.$router.push("/login");
    },
    back() {
      this.$router.go(-1);
    },
  },
  components: {},
};
</script>
<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px #555;
  z-index: 999;
}
.left {
  display: flex;
}
.left .btn_spread {
  width: 44px;
  height: 28px;
  margin-top: 15px;
}
.left .btn_back {
  width: 28px;
  height: 28px;
  margin-top: 15px;
}
.el-breadcrumb {
  margin: 0 10px;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  overflow: hidden;
  transition: all 0.2s ease;
}
.el-aside h1 {
  line-height: 60px;
  text-align: center;
  background-color: #444;
  color: #fff;
  font-weight: 400;
  letter-spacing: 4px;
  font-size: 20px;
  white-space: nowrap;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}
.container {
  height: 100vh;
}
.el-menu {
  height: calc(100vh - 60px);
  border-right: none;
  text-align: left;
}

.el-dropdown-link {
  cursor: pointer;
  color: #606266;
  font-size: 14px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
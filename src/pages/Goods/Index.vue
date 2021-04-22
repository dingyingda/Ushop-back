<template>
  <el-card>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add"
      >新增</el-button
    >
    <el-divider></el-divider>
    <!-- 表格部分 -->
    <List :info="info" @sendData="sendData" :params="params"/>
    <!-- 弹窗部分 -->
    <Pop :info="info" ref="pop" :params="params" />
  </el-card>
</template>

<script>
import List from "./List";
import Pop from "./Pop";
export default {
  data() {
    return {
      info: {
        //控制弹窗，true为显示，false为隐藏。
        isShow: false,
        //true为添加数据，false为编辑数据。
        isAdd: true,
      },
      //把当前user组件里公用的信息要放到index组件里比如分页的参数
      params:{
        page:1,
        size:5
      },
    };
  },
  created() {},
  methods: {
    add() {
      this.info.isShow = true;
      this.info.isAdd=true
    },
    sendData(obj){
      //通过refs的方法调用子组件对象里的方法
      this.$refs.pop.sendData(obj);
    }
  },
  components: {
    List,
    Pop,
  },
};
</script>
<style scoped>
</style>
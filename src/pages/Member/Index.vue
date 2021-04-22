<template>
  <el-card>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add"
      >新增</el-button
    >
    <el-divider></el-divider>
    <!-- 表格部分 -->
    <List :info="info" @sendData="sendData"/>
    <!-- 弹窗部分 -->
    <Pop :info="info" ref="pop" />
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
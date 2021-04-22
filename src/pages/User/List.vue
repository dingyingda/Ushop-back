<template>
  <div>
    <el-table
      :data="userList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="rolename" label="角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="warning" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row)"
            size="mini"
            type="success"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="del(scope.row.uid)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { delUser } from "../../request/user";
export default {
  props: ["info", "params"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userList: (state) => state.user.userList,
      userCount: (state) => state.user.userCount,
    }),
  },
  created() {
    this.getUserListAction(this.params);
  },
  methods: {
    ...mapActions("user", ["getUserListAction"]),
    edit(row) {
      // console.log(row);
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$emit("sendData", row);
    },
    del(uid) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(uid).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getUserListAction(this.params);
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //触发点击当前的值赋值给size
      //并且把page重新赋值为1。
      this.params.page=1;
      this.params.size=val;
      //要记住重新获取userlist渲染到页面
      this.getUserListAction(this.params);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //触发点击当前的值赋值给page
      this.params.page=val;
      //要记住重新获取userlist渲染到页面
      this.getUserListAction(this.params);
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
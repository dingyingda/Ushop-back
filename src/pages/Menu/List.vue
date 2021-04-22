<template>
  <el-table
    :data="menuList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    :default-expand-all="false"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="title" label="菜单名称"> </el-table-column>
    <el-table-column prop="icon" label="图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="地址"> </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
        <el-tag type="warning" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
          <el-button
          @click="edit(scope.row)"
          size="mini"
          type="success"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-button
          @click="del(scope.row.id)"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions,mapMutations} from "vuex";
import { delMenu } from "../../request/menu";
export default {
  props:['info'],
  data() {
    return {};
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    edit(row){
        // console.log(row);
        this.info.isShow=true;
        this.info.isAdd=false;
        this.$emit('sendData',row);
    },
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getMenuListAction();
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
  },
  components: {},
};
</script>
<style scoped>
</style>
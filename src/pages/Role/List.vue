<template>
  <el-table
    :data="roleList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    :default-expand-all="false"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称"> </el-table-column>
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
import { delRole } from "../../request/role";
export default {
  props:['info'],
  data() {
    return {};
  },
  computed: {
    ...mapState({ roleList: (state) => state.role.roleList }),
  },
  created() {
    this.getRoleListAction();
  },
  methods: {
    ...mapActions("role", ["getRoleListAction"]),
    edit(row){
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
          delRole(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getRoleListAction();
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
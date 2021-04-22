<template>
  <div>
    <el-table
      :data="specsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column prop="attrs" label="规格可选值">
        <template slot-scope="scope">
          <el-tag
            class="attr"
            type="success"
            v-for="(item, index) in scope.row.attrs"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
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
            @click="del(scope.row.id)"
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
      :total="specsCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { delSpecs } from "../../request/specs";
export default {
  props: ["info",'params'],
  data() {
    return {};
  },
  computed: {
    ...mapState({ 
      specsList: (state) => state.specs.specsList ,
      specsCount: (state) => state.specs.specsCount,
    }),
  },
  created() {
    this.getSpecsListAction(this.params);
  },
  methods: {
    ...mapActions("specs", ["getSpecsListAction"]),
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.params.page=1;
        this.params.size=val;
        this.getSpecsListAction(this.params);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page=val;
        this.getSpecsListAction(this.params);
      },
    edit(row) {
      // console.log(row);
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$emit("sendData", row);
    },
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSpecs(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getSpecsListAction(this.params);
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
.attr {
  margin-right: 5px;
}
</style>
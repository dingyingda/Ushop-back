<template>
  <el-table
    :data="bannerList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    :default-expand-all="false"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="img" label="图片"> 
      <template slot-scope="scope">
        <img class="img" :src="$imgBaseUrl+scope.row.img" alt="">
      </template>
    </el-table-column>
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
import { delBanner } from "../../request/banner";
export default {
  props:['info'],
  data() {
    return {};
  },
  computed: {
    ...mapState({ bannerList: (state) => state.banner.bannerList }),
  },
  created() {
    this.getBannerListAction();
  },
  methods: {
    ...mapActions("banner", ["getBannerListAction"]),
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
          delBanner(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getBannerListAction();
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
.img{
  width: 100px;
  height: 100px;
}
</style>
<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" width="120"> </el-table-column>
      <el-table-column prop="firstcatename" label="一级分类" width="120">
      </el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" width="120">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="img" label="商品图片" width="120">
        <template slot-scope="scope">
          <img class="img" :src="$imgBaseUrl + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="零售价格" width="120">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="120">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.isnew==1?'是':'否'" placement="top">
            <el-switch v-model="scope.row.isnew" :active-value="1"> </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="120">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.isnew==1?'是':'否'" placement="top">
            <el-switch v-model="scope.row.ishot" :active-value="1"></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="warning" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
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
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { delGoods } from "../../request/goods";
export default {
  props: ["info", "params"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      goodsCount: (state) => state.goods.goodsCount,
    }),
  },
  created() {
    this.getGoodsListAction(this.params);
  },
  methods: {
    ...mapActions("goods", ["getGoodsListAction"]),
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
          delGoods(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getGoodsListAction(this.params);
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
      this.params.page = 1;
      this.params.size = val;
      //要记住重新获取goodslist渲染到页面
      this.getGoodsListAction(this.params);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //触发点击当前的值赋值给page
      this.params.page = val;
      //要记住重新获取goodslist渲染到页面
      this.getGoodsListAction(this.params);
    },
  },
  components: {},
};
</script>
<style scoped>
.img {
  width: 80px;
  height: 80px;
}
</style>
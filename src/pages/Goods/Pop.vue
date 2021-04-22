<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    fullscreen
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item
            label="一级分类"
            :label-width="formLabelWidth"
            prop="first_cateid"
          >
            <el-select
              v-model="form.first_cateid"
              placeholder="请选择一级"
              @change="cateChange"
            >
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="二级分类"
            :label-width="formLabelWidth"
            prop="second_cateid"
          >
            <el-select v-model="form.second_cateid" placeholder="请选择二级">
              <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="商品名称"
            :label-width="formLabelWidth"
            prop="goodsname"
          >
            <el-input
              type="text"
              v-model="form.goodsname"
              autocomplete="off"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图片" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action=""
              :on-change="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="商品价格"
            :label-width="formLabelWidth"
            prop="price"
          >
            <el-input
              type="text"
              v-model="form.price"
              autocomplete="off"
              placeholder="请输入商品零售价格"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="市场价格"
            :label-width="formLabelWidth"
            prop="market_price"
          >
            <el-input
              type="text"
              v-model="form.market_price"
              autocomplete="off"
              placeholder="请输入商品市场价格"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品规格"
            :label-width="formLabelWidth"
            prop="specsid"
          >
            <el-select
              v-model="form.specsid"
              placeholder="请选择规格"
              @change="specsChange"
            >
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="规格属性值"
            :label-width="formLabelWidth"
            prop="specsattr"
          >
            <el-select
              v-model="form.specsattr"
              multiple
              placeholder="请选择规格属性值"
            >
              <el-option
                v-for="(item, index) in secondSpecsList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="是否新品"
            :label-width="formLabelWidth"
            prop="isnew"
          >
            <el-radio-group v-model="form.isnew">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="是否热卖"
            :label-width="formLabelWidth"
            prop="ishot"
          >
            <el-radio-group v-model="form.ishot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="状态"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="form.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="second">
        <!-- 富文本编辑器 -->
        <vueWangeditor
          id="editor"
          ref="editor"
          style="width: 100%; margin-bottom: 100px"
        />
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addGoods, editGoods } from "../../request/goods";
import { mapActions, mapState } from "vuex";
import vueWangeditor from "vue-wangeditor";
export default {
  props: ["info", "params"],
  data() {
    return {
      //v-model的值为当前被选中的el-option的 value 属性值
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imageUrl: "",
      secondCateList: [],
      secondSpecsList: [],
      activeName: "first",
      formLabelWidth: "120px",
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入零售价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        isnew: [{ required: true, message: "请选择是否新", trigger: "change" }],
        ishot: [
          { required: true, message: "请选择是否热卖", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
      specsList: (state) => state.specs.specsList,
    }),
  },
  created() {
    this.getCateListAction();
    this.getSpecsListAction();
  },
  methods: {
    ...mapActions("goods", ["getGoodsListAction"]),
    ...mapActions("cate", ["getCateListAction"]),
    ...mapActions("specs", ["getSpecsListAction"]),
    cateChange() {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateList = this.cateList[index].children;
      this.form.second_cateid = "";
    },
    specsChange() {
      let index = this.specsList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.secondSpecsList = this.specsList[index].attrs;
      this.form.specsattr = "";
    },
    sendData(obj) {
      // console.log(obj);
      this.form = { ...obj };
      //对多余的数据的处理
      //   this.$delete 删除对象中的属性
      this.$delete(this.form, "firstcatename");
      this.$delete(this.form, "secondcatename");
      //对img的路径进行处理
      this.imageUrl = this.$imgBaseUrl + this.form.img;
      //对cate的二级联动的菜单进行处理
      let index1 = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateList = this.cateList[index1].children;
      //对二级商品的属性值进行处理
      this.form.specsattr = this.form.specsattr.split(",");
      let index2 = this.specsList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.secondSpecsList = this.specsList[index2].attrs;
      //对富文本的编辑器进行处理
      //加封一个定时器，给DOM渲染节点的时间
      setTimeout(() => {
        this.$refs.editor.setHtml(this.form.description);
      }, 500);
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(res.raw);
      this.form.img = res.raw;
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //对img的文件对象进行处理，转换成fromdata数据进行二进制上传
          this.form.description = this.$refs.editor.getHtml();
          this.form.specsattr = this.form.specsattr.join(",");
          let fd = new FormData();
          for (let k in this.form) {
            fd.append(k, this.form[k]);
          }
          if (this.info.isAdd) {
            addGoods(fd).then((res) => {
              // console.log(res);
              if (res.code === 200) {
                //请求成功后进行的操作
                //1、弹窗成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                //2、关闭弹窗
                this.info.isShow = false;
                //3、重新获取菜单列表数据
                this.getGoodsListAction(this.params);
              } else {
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editGoods(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getGoodsListAction(this.params);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
      this.$refs.editor.setHtml("");
      this.activeName = "first";
    },
  },
  components: {
    vueWangeditor,
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
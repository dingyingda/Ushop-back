<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input
          type="text"
          v-model="form.title"
          autocomplete="off"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="开始时间"
        :label-width="formLabelWidth"
        prop="begintime"
      >
        <el-date-picker
          v-model="form.begintime"
          type="datetime"
          placeholder="选择开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="结束时间"
        :label-width="formLabelWidth"
        prop="endtime"
      >
        <el-date-picker
          v-model="form.endtime"
          type="datetime"
          placeholder="选择结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="一级分类"
        :label-width="formLabelWidth"
        prop="first_cateid"
      >
        <el-select
          v-model="form.first_cateid"
          placeholder="请选择"
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
        <el-select v-model="form.second_cateid" placeholder="请选择">
          <el-option
            v-for="item in childList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="商品编号"
        :label-width="formLabelWidth"
        prop="goodsid"
      >
        <el-input
          type="text"
          v-model="form.goodsid"
          autocomplete="off"
          placeholder="请输入商品编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { addSeck, editSeck } from "../../request/seck";
export default {
  props: ["info"],
  data() {
    return {
      //v-model的值为当前被选中的el-option的 value 属性值
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      childList: [],
      formLabelWidth: "120px",
      rules: {
        title: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        goodsid: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        begintime: [
          { required: true, message: "请输入开始时间", trigger: "blur" },
        ],
        endtime: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        first_cateid: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      seckList: (state) => state.seck.seckList,
      cateList: (state) => state.cate.cateList,
    }),
  },
  created() {
    this.getCateListAction();
  },
  methods: {
    ...mapActions("seck", ["getSeckListAction"]),
    ...mapActions("cate", ["getCateListAction"]),
    cateChange() {
      //二级联动的代码
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.childList = this.cateList[index].children;
      this.form.second_cateid = "";
    },
    sendData(obj) {
      // console.log(obj);
      this.form = { ...obj };
      this.form.password = "";
      this.form.begintime = new Date(this.form.begintime);
      this.form.endtime = new Date(this.form.endtime);
      console.log(this.form);
      //渲染二级菜单
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.childList = this.cateList[index].children;
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let date = new Date();
          this.form.begintime = date.getTime(this.form.begintime);
          this.form.endtime = date.getTime(this.form.endtime);
          if (this.info.isAdd) {
            addSeck(this.form).then((res) => {
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
                this.getSeckListAction();
              } else {
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editSeck(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getSeckListAction();
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
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
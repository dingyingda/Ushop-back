<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择上级">
          <el-option label="顶级菜单" :value="0"></el-option>
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
        label="分类名称"
        :label-width="formLabelWidth"
        prop="catename"
      >
        <el-input
          type="text"
          v-model="form.catename"
          autocomplete="off"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类图片" :label-width="formLabelWidth" v-show="!form.pid==0">
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
        label="分类状态"
        :label-width="formLabelWidth"
        prop="status"
      >
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
import { addCate, editCate } from "../../request/cate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      //v-model的值为当前被选中的el-option的 value 属性值
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      imageUrl: "",
      formLabelWidth: "120px",
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级", trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState({ cateList: (state) => state.cate.cateList }),
  },
  created() {},
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(res.raw);
      this.form.img = res.raw;
    },
    sendData(obj) {
      // console.log(obj);
      this.form = { ...obj };
      this.imageUrl = this.$imgBaseUrl + this.form.img;
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let fd = new FormData();
          for (let k in this.form) {
            fd.append(k, this.form[k]);
          }
          if (this.info.isAdd) {
            // //对目录/菜单的时候，pid的值得判断。
            // this.form.type == 1
            //   ? (this.form.pid = 0)
            //   : (this.form.pid = this.form.pid);
            addCate(fd).then((res) => {
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
                this.getCateListAction();
              } else {
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editCate(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getCateListAction();
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
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl = "";
    },
  },
  components: {},
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
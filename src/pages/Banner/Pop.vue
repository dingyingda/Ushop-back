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
          placeholder="请输入轮播图标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-change="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { addBanner, editBanner } from "../../request/banner";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      imageUrl:'',
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入轮播图标题", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState({ bannerList: (state) => state.banner.bannerList }),
  },
  created() {},
  methods: {
    ...mapActions("banner", ["getBannerListAction"]),
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(res.raw);
        //把文件对象赋值给这个img属性
        this.form.img=res.raw;
      },
    sendData(obj) {
      // console.log(obj);
      this.form = { ...obj };
      this.imageUrl=this.$imgBaseUrl+this.form.img;
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //有照片的上传组件时需要formdata数据进行二进制传输
          let fd=new FormData();
          for(let k in this.form){
            fd.append(k,this.form[k]);
          }
          if (this.info.isAdd) {
            addBanner(fd).then((res) => {
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
                this.getBannerListAction();
              } else {
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editBanner(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getBannerListAction();
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
       title: "",
        img: "",
        status: 1,
      };
      this.imageUrl='';
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
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #409EFF ;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
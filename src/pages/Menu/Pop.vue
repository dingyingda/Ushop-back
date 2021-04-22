<template>
  <el-dialog @close="reset" :title="info.isAdd?'新增':'编辑'" :visible.sync="info.isShow">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="上级"
        :label-width="formLabelWidth"
        v-show="form.type == 1 ? false : true"
      >
        <el-select v-model="form.pid" placeholder="请选择上级">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称" :label-width="formLabelWidth" prop="title">
        <el-input
          type="text"
          v-model="form.title"
          autocomplete="off"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="地址"
        :label-width="formLabelWidth"
        v-show="form.type == 1 ? false : true"
      >
        <el-input
          type="text"
          v-model="form.url"
          autocomplete="off"
          placeholder="请输入地址"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图标"
        :label-width="formLabelWidth"
        v-show="form.type == 1 ? true : false"
      >
        <el-input
          type="text"
          v-model="form.icon"
          autocomplete="off"
          placeholder="请输入图标"
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
import { addMenu, editMenu } from "../../request/menu";
import { mapActions, mapState } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      //v-model的值为当前被选中的el-option的 value 属性值
      form: {
        pid: 0,
        title: "",
        type: 1,
        status: 1,
        url: "",
        icon: "",
      },
      formLabelWidth: "120px",
      rules: {
        title: [{ required: true, message: "请输入菜单标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {},
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    sendData(obj) {
      // console.log(obj);
      this.form = {...obj};
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.info.isAdd) {
            // //对目录/菜单的时候，pid的值得判断。
            // this.form.type == 1
            //   ? (this.form.pid = 0)
            //   : (this.form.pid = this.form.pid);
            addMenu(this.form).then((res) => {
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
                this.getMenuListAction();
              }else{
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editMenu(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getMenuListAction();
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
        title: "",
        type: 1,
        status: 1,
        url: "",
        icon: "",
      };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
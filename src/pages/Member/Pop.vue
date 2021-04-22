<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item
        label="昵称"
        :label-width="formLabelWidth"
        prop="nickname"
      >
        <el-input
          type="text"
          v-model="form.nickname"
          autocomplete="off"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        :label-width="formLabelWidth"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
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
import { addMember, editMember } from "../../request/member";
export default {
  props: ["info"],
  data() {
    return {
      //v-model的值为当前被选中的el-option的 value 属性值
      form: {
        nickname: "",
        password:'',
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        nickname: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState(
      { memberList: (state) => state.member.memberList }
    ),
  },
  created() {
  },
  methods: {
    ...mapActions("member", ["getMemberListAction"]),
    sendData(obj) {
      // console.log(obj);
      this.form = { ...obj };
      this.form.password='';
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.info.isAdd) {
            addMember(this.form).then((res) => {
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
                this.getMemberListAction();
              } else {
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editMember(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getMemberListAction();
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
        phone:"",
        password:'',
        status: 1,
      };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
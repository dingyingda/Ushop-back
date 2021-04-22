<template>
  <div class="login-container">
    <div class="login">
      <h1>小U商城后台管理系统</h1>
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="userInfo.username" autocomplete="off">
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="userInfo.password"
            autocomplete="off"
            show-password
          >
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn_login"
            type="primary"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from "../request/user";
export default {
  data() {
    return {
      userInfo: {
        username: "admin",
        password: "admin888",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.userInfo).then((res) => {
            if (res.code === 200) {
              //1、弹窗成功登录
              this.$message({
                message:res.msg,
                type: "success",
              });
              //2、把userInfo信息存入localStory里
              localStorage.setItem('userInfo',JSON.stringify(res.list));
              //3、跳转页面到layout上
              this.$router.push('/');
            }else{
              this.$message({
                message:res.msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  components: {},
};
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/imgs/loginbg.jpeg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 30px;
}
.login h1 {
  color: #409eff;
  text-align: center;
  margin: 40px 0;
  font-size: 20px;
  font-weight: bold;
}
.btn_login {
  width: 100%;
}
</style>
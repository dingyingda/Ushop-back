<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item
        label="属性名"
        :label-width="formLabelWidth"
        prop="specsname"
      >
        <el-input
          type="text"
          v-model="form.specsname"
          autocomplete="off"
          placeholder="请输入属性名"
        ></el-input>
      </el-form-item>
      <!-- 动态渲染属性的input输入框，利用的数组的数组项 -->
      <el-form-item label="属性值" :label-width="formLabelWidth">
        <div class="input_container" v-for="(item,index) in list" :key="index">
          <el-input type="text" v-model="list[index]" autocomplete="off"></el-input>
          <el-button type="success" v-if="index==0" @click="increase(index)">添加</el-button>
          <el-button type="danger" v-else @click="decrease(index)">删除</el-button>
        </div>
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
import { addSpecs, editSpecs } from "../../request/specs";
import { mapActions, mapState } from "vuex";
export default {
  props: ["info",'params'],
  data() {
    return {
      //v-model的值为当前被选中的el-option的 value 属性值
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      list: [""],
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入属性名", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState({ specsList: (state) => state.specs.specsList }),
  },
  created() {},
  methods: {
    ...mapActions("specs", ["getSpecsListAction"]),
    increase(index){
      this.list.push('');
    },
    decrease(index){
      this.list.splice(index,1);
    },
    sendData(obj) {
      // console.log(obj);
      //由于数据的这里的对象里有数组也是引用类型数据需要进行深拷贝处理。
      // this.form = { ...obj };
      this.form=JSON.parse(JSON.stringify(obj));
      this.list=this.form.attrs;
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //单独处理一下list的数据赋值给form里的atrrs
          this.form.attrs=this.list.join(',');
          if (this.info.isAdd) {
            // //对目录/菜单的时候，pid的值得判断。
            // this.form.type == 1
            //   ? (this.form.pid = 0)
            //   : (this.form.pid = this.form.pid);
            addSpecs(this.form).then((res) => {
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
                this.getSpecsListAction(this.params);
              } else {
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editSpecs(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getSpecsListAction(this.params);
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
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.list=[''];
    },
  },
  components: {},
};
</script>
<style scoped>
.input_container{
  display: flex;
  margin-bottom: 10px;
}
.input_container .el-button{
  margin-left: 10px;
}
</style>
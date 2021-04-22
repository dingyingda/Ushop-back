<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item
        label="角色名称"
        :label-width="formLabelWidth"
        prop="rolename"
      >
        <el-input
          type="text"
          v-model="form.rolename"
          autocomplete="off"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="formLabelWidth" prop="menus">
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
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
import { addRole, editRole } from "../../request/role";
export default {
  props: ["info"],
  data() {
    return {
      //v-model的值为当前被选中的el-option的 value 属性值
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState(
      { menuList: (state) => state.menu.menuList },
      { roleList: (state) => state.role.roleList }
    ),
  },
  created() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    ...mapActions("role", ["getRoleListAction"]),
    sendData(obj) {
      // console.log(obj);
      this.form = { ...obj };
      // console.log(obj.menus.split(',').map((item,index,arr)=>{
      //   return item*1;
      // }));
      /*
      用法：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
      */
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(
          this.form.menus.split(",").map((item, index, arr) => {
            return item * 1;
          })
        );
      });
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          if (this.info.isAdd) {
            // //对目录/菜单的时候，pid的值得判断。
            // this.form.type == 1
            //   ? (this.form.pid = 0)
            //   : (this.form.pid = this.form.pid);
            addRole(this.form).then((res) => {
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
                this.getRoleListAction();
              } else {
                //弹窗失败
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editRole(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getRoleListAction();
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
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
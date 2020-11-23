<template>
  <!-- 新增弹窗 -->

  <el-dialog
    title="新增"
    :visible.sync="dialogFlag"
    @close="close"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类型:" :label-width="formLabelWidth">
        <el-select
          v-model="form.region"
          placeholder="请选择需要添加信息的类型"
          style="width: 100%"
        >
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概述:" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogFlag: false,
      form: {
        name: "",
        region: "",
      },
      formLabelWidth: "70px",
    };
  },
  watch: {
    flag: {
      handler(newVal, oldVal) {
        this.dialogFlag = newVal;
      },
    },
  },
  methods: {
    close() {
      this.dialogFlag = false;
      this.$emit("update:flag", false);
      //  this.$emit('close',false)

      /**
       * emit()  回调函数
       * 回调时需要做逻辑处理时，就不能使用修饰器   .sync   , 反之则可以
       *
       *  */
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
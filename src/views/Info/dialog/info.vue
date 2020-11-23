<template>
  <!-- 新增弹窗 -->

  <el-dialog
    title="新增"
    :visible.sync="dialogFlag.value"
    @close="close"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类型:" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概述:" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="form.name"
          placeholder="请输入概述"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { reactive, ref, watch, watchEffect } from "@vue/composition-api";

export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, root, refs }) {
    const form = reactive({
      name: "",
      region: "",
    });

    const dialogFlag = reactive({ value: false });
    const formLabelWidth = ref("70px");

    watchEffect(() => {
      dialogFlag.value = props.flag;
    });

    // watch(() => (dialogFlag.value = props.flag));

    // watch(() => {
    //   console.log("watch")
    //   dialogFlag.value = props.flag
    //   });
    // const watchFlage = watch((newVal, oldVal) => {
    //   console.log(newVal, oldVal)
    // })
    // console.log(props.flag)
    // const refFlag = ref(props.flag);

    // watch(refFlag, (newVal, oldVal) => {
    //   console.log(refFlag, "改变");
    // });

    const close = () => {
      dialogFlag.value = false;
      emit("update:flag", false);
      //  this.$emit('close',false)

      /**
       * emit()  回调函数
       * 回调时需要做逻辑处理时，就不能使用修饰器   .sync   , 反之则可以
       *
       *  */
    };

    return {
      form,
      dialogFlag,
      formLabelWidth,
      close,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
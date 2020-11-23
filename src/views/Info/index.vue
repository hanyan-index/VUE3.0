<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型:</label>
          <div class="wrap-content">
            <el-select
              v-model="categoryValue"
              placeholder="类型:"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：</label>
          <div class="wrap-content">
            <el-date-picker
              style="width: 100%"
              v-model="dateValue"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap keyWork">
          <label for="">关键字：</label>
          <div class="wrap-content">
            <el-select v-model="searchKeyWork" style="width: 100%">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="searchKeyWork"
          placeholder="请输入内容"
          style="width=100%"
        ></el-input>
      </el-col>

      <el-col :span="4">
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="danger" @click="btnUpdate">新增</el-button>
      </el-col>
    </el-row>

    <div class="black-space-30"></div>

    <!-- 表格 -->

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="标题" width="750"> </el-table-column>
      <el-table-column prop="category" label="类别" width="120">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="240"> </el-table-column>
      <el-table-column prop="user" label="权限" width="100"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="delteItem"
            >删除</el-button
          >
          <el-button type="warning" size="mini" @click="btnUpdate"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>

    <!-- 底部分页 -->

    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="delteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          :current-page="1"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->

    <dialogInfo :flag.sync="dialogFlag" />

    <!-- <DialogInfoVue2 :flag.sync = 'dialogFlag2' :option = options  @close = 'closeDialog' /> -->
  </div>
</template>

<script>
import dialogInfo from "./dialog/info.vue";
// import dialogInfo from "./dialog/info_2.vue";
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "infoIndex",
  components: { dialogInfo },
  setup(props, { root }) {
    const options = reactive([
      {
        value: "选项1",
        label: "国际行情",
      },
      {
        value: "选项2",
        label: "国内行情",
      },
      {
        value: "选项3",
        label: "产业行情",
      },
    ]);

    const searchOptions = reactive([
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);

    // 表格数据
    const tableData = reactive([
      {
        title: "哈哈",
        category: "哈哈",
        date: "哈哈",
        user: "哈哈",
      },
      {
        title: "哈哈",
        category: "哈哈",
        date: "哈哈",
        user: "哈哈",
      },
    ]);

    const categoryValue = ref("");
    const dateValue = ref("");
    const searchKeyWork = ref("id");

    // 信息弹窗标记
    const dialogFlag = ref(false);

    const btnUpdate = () => {
      dialogFlag.value = true;
    };

    const handleSizeChange = (val) => {};
    const handleCurrentChange = (val) => {};

    // 删除数据
    const delteItem = () => {
      root.confirm({
        content:'确认删除当前信息？删除后无法恢复！',
        tip:'',
        obj:confirmDelete
      });
    };
    const delteAll = ()=>{
      root.confirm({
        content:'确认删除当前选中的信息？删除后无法恢复！',
        tip:'',
        obj:confirmDelete
      });
    }

    const confirmDelete = ()=>{
      console.log("删除confirmDelete")
    }

    return {
      options,
      searchOptions,
      tableData,
      categoryValue,
      dateValue,
      searchKeyWork,
      dialogFlag,
      handleSizeChange,
      handleCurrentChange,
      btnUpdate,
      delteItem,
      delteAll
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";

.label-wrap {
  &.category {
    @include labelDom(left, 40, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.keyWork {
    @include labelDom(right, 100, 40);
  }
  //   label {
  //     float: left;
  //     line-height: 40px;
  //     width: 60px;
  //   }
  //   .wrap-content {
  //     margin-left: 60px;
  //   }
}
</style>
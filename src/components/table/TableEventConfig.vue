<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item label-width="100px" label="添加新增按钮">
        <el-radio-group v-model="data.options.isAddBtn">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>     
      </el-form-item>
      <el-form-item v-if="data.options.isAddBtn"
        label="新增方法"
      >
        <el-input 
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.hidden"
          placeholder="新增方法"
        >
        </el-input>
      </el-form-item>
      <!-- 编辑 -->
      <el-form-item label-width="100px" label="添加编辑按钮">
        <el-radio-group v-model="data.options.isEditBtn">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>     
      </el-form-item>
      <el-form-item v-if="data.options.isEditBtn"
        label="编辑方法"
      >
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.enterCondition"
          placeholder="编辑方法"
        >
        </el-input>
      </el-form-item>
      <!-- 删除 -->
      <el-form-item label-width="100px" label="添加删除按钮">
        <el-radio-group v-model="data.options.isDeleteBtn">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>     
      </el-form-item>
      <el-form-item v-if="data.options.isDeleteBtn"
        label="删除方法"
      >
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.condition"
          placeholder="删除方法"
        >
        </el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import request from "../../util/request";

export default {
  components: {
    Draggable,
  },
  props: ["data"],
  data() {
    return {
     
    };
  },
  mounted() {
    console.log(this.data);
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    // codeMirror弹出函数
    handelMirror(e) {
      console.log(this.data);
      this.$emit("mirror", this.data, e.target.placeholder);
    },
    // 分页查询
    handleCurrentChange(val) {
      this.startPage = val;
      this.getData();
    }
  },
};
</script>

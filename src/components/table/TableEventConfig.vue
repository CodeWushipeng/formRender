<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item
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
      <!-- 进入条件 -->
      <el-form-item
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
      <!-- 离开条件 -->
      <el-form-item
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

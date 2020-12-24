<template>
  <el-row
    :class="{
      [widget.options.customClass]: widget.options.customClass ? true : false,
    }"
    :type="widget.options.flex ? 'flex' : ''"
    :gutter="widget.options.gutter || 0"
    :justify="widget.options.justify"
    :align="widget.options.align"
  >
    <el-col
      v-for="(colItem, index) in widget.columns"
      :key="index"
      :xs="widget.options.responsive ? colItem.xs || 0 : colItem.span || 0"
      :sm="widget.options.responsive ? colItem.sm || 0 : colItem.span || 0"
      :md="widget.options.responsive ? colItem.md || 0 : colItem.span || 0"
      :lg="widget.options.responsive ? colItem.lg || 0 : colItem.span || 0"
      :xl="widget.options.responsive ? colItem.xl || 0 : colItem.span || 0"
    >
      <template v-for="col in colItem.list">
        <generate-col-item
          v-if="col.type == 'grid'"
          :key="col.key"
          :models.sync="dataModels"
          :rules="rules"
          :widget="col"
          :remote="remote"
          @input-change="onInputChange"
        >
        </generate-col-item>

        <generate-tab-item
          v-else-if="col.type == 'tabs'"
          :key="col.key"
          :models.sync="dataModels"
          :rules="rules"
          :widget="col"
          :remote="remote"
          @input-change="onInputChange"
        >
        </generate-tab-item>

        <generate-element-item
          v-else
          :key="col.key"
          :models.sync="dataModels"
          :rules="rules"
          :widget="col"
          :remote="remote"
          @input-change="onInputChange"
        >
        </generate-element-item>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import GenerateElementItem from "./GenerateElementItem";
import GenerateTabItem from './GenerateTabItem'

export default {
  name: "generate-col-item",
  components: {
    GenerateElementItem,
    GenerateTabItem,
  },
  props: ["widget", "models", "rules", "remote"],
  data() {
    return {
      dataModels: this.models,
    };
  },
  inject: ["genform"],
  methods: {
    onInputChange(value, field) {
      // 向container组件发射on-change事件，将 key value 以及models（form表单的key value对象）传入
      this.genform.onInputChange(value, field);
    },
  },
  watch: {
    dataModels: {
      deep: true,
      handler(val) {
        this.$emit("update:models", val);
      },
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModels = this.model
      },
    },
  },
};
</script>

<template>
  <div class="fm-form-item" v-if="!widget.options.hidden">
    <el-form-item
      v-if="widget.type != 'divider'"
      :label="
        widget.type != 'buttonCom' &&
        widget.type != 'alink' &&
        !widget.options.hideLabel
          ? widget.name
          : ''
      "
      :prop="widget.model"
      class="targetEle"
      :class="{
        [widget.options.customClass]: widget.options.customClass ? true : false,
        'no-label-form-item':
          widget.options.isLabelWidth && widget.options.labelWidth == 0,
      }"
      :label-width="
        widget.options.hideLabel
          ? '0px'
          : widget.options.isLabelWidth
          ? widget.options.labelWidth + 'px'
          : ''
      "
    >
      <generate-form-item
        :models.sync="dataModels"
        :rules="rules"
        :widget="widget"
        :remote="remote"
        @el-change="elementChange"
        @input-change="onInputChange"
        @radio-change="radioChange"
        @el-focus="mouseValidate"
        @el-blur="blurValidate"
        @date-blur="dateValidata"
        @remove="removeKeyup"
        @toggleGenerate="toggleGenerate"
        @close-dialog="closeDialog"
      >
      </generate-form-item>
    </el-form-item>
  </div>
</template>

<script>
import GenerateFormItem from './GenerateFormItem';

export default {
  components: {
    GenerateFormItem,
  },
  props: ['widget', 'models', 'rules', 'remote'],
  data() {
    return {
      dataModels: this.models,
      // dataModel: this.models[this.widget.model],
    };
  },
  inject: ['genform'],
  methods: {
    elementChange(params) {
      console.log(this.genform);
      this.genform.onElChange(params);
    },
    radioChange(params) {
      this.genform.radioChange(params);
    },
    mouseValidate(params) {
      this.genform.mouseValidate(params);
    },
    blurValidate(params) {
      this.genform.blurValidate(params);
    },
    dateValidata() {
      this.genform.dateValidata();
    },
    removeKeyup(params) {
      this.genform.removeKeyup(params);
    },
    toggleGenerate(params) {
      this.genform.toggleGenerate(params);
    },
    closeDialog() {
      this.genform.closeDialog();
    },
    onInputChange(value, field) {
      // 向container组件发射on-change事件，将 key value 以及models（form表单的key value对象）传入
      this.genform.onInputChange(value, field);
    },
  },
  watch: {
    dataModels: {
      deep: true,
      handler(val) {
        this.$emit('update:models', val);
      },
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModels = val
      },
    },
  },
};
</script>

<template>
  <el-row
    :class="{
      [element.options.customClass]: element.options.customClass ? true : false,
    }"
    :type="element.options.flex ? 'flex' : ''"
    :gutter="element.options.gutter || 0"
    :justify="element.options.justify"
    :align="element.options.align"
  >
    <el-col
      v-for="(colItem, index) in element.columns"
      :key="index"
      :xs="element.options.responsive ? colItem.xs || 0 : colItem.span || 0"
      :sm="element.options.responsive ? colItem.sm || 0 : colItem.span || 0"
      :md="element.options.responsive ? colItem.md || 0 : colItem.span || 0"
      :lg="element.options.responsive ? colItem.lg || 0 : colItem.span || 0"
      :xl="element.options.responsive ? colItem.xl || 0 : colItem.span || 0"
    >
      <template v-for="col in colItem.list">
        <generate-col-item
          v-if="col.type == 'grid'"
          :key="col.key"
          :colModels.sync="dataModels"
          :rules="rules"
          :element="col"
          :remote="remote"
          @input-change="onInputChange"
        >
        </generate-col-item>

        <!-- <generate-tab-item
          v-else-if="col.type == 'tabs'"
          :key="col.key"
          :model.sync="dataModels"
          :rules="rules"
          :element="col"
          :remote="remote"
          :blanks="blanks"
          :display="display"
          @input-change="onInputChange"
          :edit="edit"
          :remote-option="remoteOption"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-tab-item>

        <generate-report
          v-else-if="col.type == 'report'"
          :key="col.key"
          :model.sync="dataModels"
          :rules="rules"
          :element="col"
          :remote="remote"
          :blanks="blanks"
          :display="display"
          @input-change="onInputChange"
          :edit="edit"
          :remote-option="remoteOption"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-report> -->

        <generate-element-item
          v-else
          :key="col.key"
          :elModels.sync="dataModels"
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
import GenerateElementItem from './GenerateElementItem';
// import GenerateTabItem from './GenerateTabItem'

export default {
  name: 'generate-col-item',
  components: {
    GenerateElementItem,
    // GenerateTabItem,
    // GenerateReport: () => import('./GenerateReport.vue')
  },
  props: ['element', 'colModels', 'rules', 'remote'],
  data() {
    return {
      dataModels: this.colModels,
    };
  },
  inject: ['genform'],
  methods: {
    onInputChange(value, field) {
      // 向container组件发射on-change事件，将 key value 以及models（form表单的key value对象）传入
      this.genform.onInputChange(value, field);
    },
  },
  // watch: {
  //   dataModels: {
  //     deep: true,
  //     handler(val) {
  //       this.colModels = {
  //         ...this.dataModels,
  //         [this.element.model]: val[this.element.model],
  //       };
  //       this.elModels = {
  //         ...this.dataModels,
  //         [this.element.model]: val[this.element.model],
  //       };
  //     },
  //   },
  //   elModels: {
  //     deep: true,
  //     handler(val) {
  //       this.$emit('update:elModels', {
  //         ...this.dataModels,
  //         [this.element.model]: val[this.element.model],
  //       });
  //     },
  //   },
  //   colModels: {
  //     deep: true,
  //     handler(val) {
  //       this.$emit('update:colModels', {
  //         ...this.dataModels,
  //         [this.element.model]: val[this.element.model],
  //       });
  //     },
  //   },
  // },
};
</script>

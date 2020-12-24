<template>
  <el-tabs v-model="tabActive" 
    :type="widget.options.type"
    :tab-position="widget.options.tabPosition"
    :class="{
      [widget.options.customClass]: widget.options.customClass?true: false
    }"
    style="margin-bottom: 18px;"
  >
    <el-tab-pane 
      :key="item.name" 
      :label="item.label" 
      :name="item.name" 
      v-for="item in widget.tabs"
    >
      <template v-for="tab in item.list">
        <generate-tab-item
          v-if="tab.type == 'tabs'"
          :key="tab.key"
          :models.sync="dataModels"
          :rules="rules"
          :widget="tab"
          :remote="remote"
          @input-change="onInputChange"
        >
        </generate-tab-item>
        <generate-col-item
          v-else-if="tab.type == 'grid'"
          :key="tab.key"
          :model.sync="dataModels"
          :rules="rules"
          :widget="tab"
          :remote="remote"
          @input-change="onInputChange"
        >
        </generate-col-item>
        <generate-element-item
          v-else
          :key="tab.key"
          :models.sync="dataModels"
          :rules="rules"
          :widget="tab"
          :remote="remote"
          @input-change="onInputChange"
        >
        </generate-element-item>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import GenerateElementItem from './GenerateElementItem'
import GenerateColItem from './GenerateColItem'

export default {
  name: 'generate-tab-item',
  components: {
    GenerateElementItem,
    GenerateColItem
  },
  props: ['widget', 'models', 'rules', 'remote'],
  data () {
    return {
      dataModels: this.models,
      tabActive: this.widget.tabs.length ? this.widget.tabs[0].name : '',
    }
  },
  methods: {
    onInputChange (value, field) {
      this.$emit('input-change', value, field)
    }
  },
  watch: {
    models: {
      deep: true,
      handler (val) {
        this.dataModels = this.models
      }
    },
    dataModels: {
      deep: true,
      handler (val) {
        this.$emit('update:models', val)
      }
    }
  }
}
</script>

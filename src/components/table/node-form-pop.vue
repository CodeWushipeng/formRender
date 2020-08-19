<template>
  <div class="editForm">
    <el-tabs v-model="activeName" style="marginLeft:14px;">
      <el-tab-pane label="基本信息" name="base" />
      <el-tab-pane label="表单配置" name="config" />
    </el-tabs>
    <el-form
      v-show="activeName == 'base'"
      ref="form"
      :model="form"
      label-width="80px"
      class="pop-form"
    >
      <el-form-item label="表单编码" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="项目名称" prop="project">
        <el-input v-model="form.project" />
      </el-form-item>
      <el-form-item label="表单类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择表单类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="表单名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="表单描述" prop="describe">
        <el-input v-model="form.describe" />
      </el-form-item>
    </el-form>
    <fm-making-form
      v-show="activeName == 'config'"
      ref="makingform"
      style="height: 70vh;"
    />
  </div>
</template>

<script>
import { getFormList, pushFormData } from '@/api/forms.js'
import { ERR_OK, RES_OK } from '@/api/config.js'
export default {
  name: 'nodeFormPop',
  data() {
    return {
      activeName: 'config',
      form: {
        project: '',
        code: '',
        type: '',
        name: '',
        describe: ''
      },
      options: [
        {
          value: '00',
          label: '00'
        },
        {
          value: '01',
          label: '01'
        }
      ]
    }
  },
  methods: {
    // 设置数据
    setData(row) {
      const {
        projectName,
        formCode,
        formType,
        formName,
        formDescribe,
        formContent
      } = row;

      this.form = {
        project: projectName,
        code: formCode,
        type: formType,
        name: formName,
        describe: formDescribe
      }
      const content =
        formContent && typeof formContent === 'string'
          ? JSON.parse(formContent)
          : formContent
      this.$refs.makingform.setJSON(content)
    }
  }
}
</script>
<style>
.widget-config-container .config-content .pop-form .el-form-item{
  border-bottom: none;
  padding-bottom: 0;
}
.widget-config-container .config-content .pop-form .el-form-item__label{
  padding: 0 12px 0 0;
}
</style>

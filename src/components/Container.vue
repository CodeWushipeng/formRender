<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="250px">
          <div class="components-list">
            <template v-if="bankingFields.length">
              <div class="widget-cate">{{ $t("fm.components.banking.title") }}</div>
              <draggable
                tag="ul"
                :list="bankingComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  @click="handleField(item)"
                  v-if="bankingFields.indexOf(item.type) >= 0"
                  class="form-edit-widget-label"
                  :class="{ 'no-put': item.type == 'divider' }"
                  v-for="(item, index) in bankingComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>
            <template v-if="basicFields.length">
              <div class="widget-cate">{{ $t("fm.components.basic.title") }}</div>
              <draggable
                tag="ul"
                :list="basicComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  @click="handleField(item)"
                  v-if="basicFields.indexOf(item.type)>=0"
                  class="form-edit-widget-label"
                  :class="{'no-put': item.type == 'divider'}"
                  v-for="(item, index) in basicComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="advanceFields.length">
              <div class="widget-cate">{{ $t("fm.components.advance.title") }}</div>
              <draggable
                tag="ul"
                :list="advanceComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  @click="handleField(item)"
                  v-if="advanceFields.indexOf(item.type) >= 0"
                  class="form-edit-widget-label"
                  :class="{'no-put': item.type == 'table'}"
                  v-for="(item, index) in advanceComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="layoutFields.length">
              <div class="widget-cate">{{ $t("fm.components.layout.title") }}</div>
              <draggable
                tag="ul"
                :list="layoutComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  @click="handleField(item)"
                  v-if="layoutFields.indexOf(item.type) >=0"
                  class="form-edit-widget-label no-put"
                  v-for="(item, index) in layoutComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>
            <template v-if="tableFields.length">
              <div class="widget-cate">{{ $t("fm.components.table.title") }}</div>
              <draggable
                tag="ul"
                :list="tableComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  @click="handleField(item)"
                  v-if="tableFields.indexOf(item.type) >= 0"
                  class="form-edit-widget-label no-put"
                  v-for="(item, index) in tableComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>
          </div>
        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action"></slot>
            <el-button
              v-if="extend"
              type="text"
              size="medium"
              icon="el-icon-edit-outline"
              @click="handleEdit($event)"
            >扩展函数</el-button>
            <el-button
              v-if="formConfig"
              type="text"
              size="medium"
              icon="el-icon-tickets"
              @click="handleFormConfig"
            >{{ $t("fm.actions.formConfig") }}</el-button>
            <el-button
              type="text"
              :disabled="!undo"
              size="medium"
              icon="el-icon-back"
              @click="handleUndo"
            >{{$t('fm.actions.undo')}}</el-button>
            <el-button
              type="text"
              :disabled="!redo"
              size="medium"
              icon="el-icon-right"
              @click="handleRedo"
            >{{$t('fm.actions.redo')}}</el-button>
            <el-button
              v-if="upload"
              type="text"
              size="medium"
              icon="el-icon-upload2"
              @click="handleUpload"
            >{{ $t("fm.actions.import") }}</el-button>
            <el-button
              type="text"
              size="medium"
              icon="el-icon-delete"
              @click="handleClear"
            >{{ $t("fm.actions.clear") }}</el-button>
            <el-button
              v-if="preview"
              type="text"
              size="medium"
              icon="el-icon-view"
              @click="handlePreview"
            >{{ $t("fm.actions.preview") }}</el-button>
            <el-button
              v-if="generateJson"
              type="text"
              size="medium"
              icon="el-icon-tickets"
              @click="handleGenerateJson"
            >{{ $t("fm.actions.json") }}</el-button>
            <el-button
              v-if="generateCode"
              type="text"
              size="medium"
              icon="el-icon-document"
              @click="handleGenerateCode"
            >{{ $t("fm.actions.code") }}</el-button>
          </el-header>
          <el-main :class="{ 'widget-empty': widgetForm.list.length == 0 }">
            <widget-form
              v-if="!resetJson"
              ref="widgetForm"
              :data="widgetForm"
              :select.sync="widgetFormSelect"
            ></widget-form>
          </el-main>
        </el-container>

        <el-aside
          v-if="widgetFormSelect && widgetFormSelect.type == 'elTable'"
          class="widget-config-container"
        >
          <el-container>
            <el-header height="45px">
              <div
                class="config-tab"
                :class="{ active: configTab == 'widget' }"
                @click="handleConfigSelect('widget')"
              >{{ $t("fm.tableWidget.title") }}</div>
              <div
                class="config-tab"
                :class="{ active: configTab == 'common' }"
                @click="handleConfigSelect('common')"
              >{{ $t("fm.tableEvent.title") }}</div>
            </el-header>
            <el-main class="config-content">
              <table-widget-config
                v-show="configTab == 'widget'"
                :data="widgetFormSelect"
                @mirror="showMirror"
                @addTable="toAddTable"
              ></table-widget-config>
              <table-event-config
                v-show="configTab == 'common'"
                :data="widgetFormSelect"
                @mirror="showMirror"
                @addFlow="_addFlow"
              ></table-event-config>
            </el-main>
          </el-container>
        </el-aside>

        <el-aside v-else class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div
                class="config-tab"
                :class="{ active: configTab == 'widget' }"
                @click="handleConfigSelect('widget')"
              >{{ $t("fm.config.widget.title") }}</div>
              <div
                class="config-tab"
                :class="{ active: configTab == 'common' }"
                @click="handleConfigSelect('common')"
              >{{ $t("fm.config.common.title") }}</div>
              <!-- <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">{{$t('fm.config.form.title')}}</div> -->
            </el-header>
            <el-main class="config-content">
              <widget-config
                v-show="configTab == 'widget'"
                :data="widgetFormSelect"
                :key="widgetFormSelect ? widgetFormSelect.key : 0"
                @mirror="showMirror"
              ></widget-config>
              <common-config
                v-show="configTab == 'common'"
                :data="widgetFormSelect"
                @mirror="showMirror"
              ></common-config>
            </el-main>
          </el-container>
        </el-aside>

        <cus-dialog
          :visible="previewVisible"
          @on-close="closePreview"
          ref="widgetPreview"
          width="1000px"
          form
        >
          <generate-form
            insite="true"
            @input-enter="inputChange"
            @on-change="handleDataChange"
            v-if="previewVisible"
            :data="widgetForm"
            :value="widgetModels"
            :remote="remoteFuncs"
            ref="generateForm"
          >
            <template v-slot:blank="scope">
              Width
              <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>Height
              <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">
              {{
              $t("fm.actions.getData")
              }}
            </el-button>
            <el-button @click="handleReset">
              {{
              $t("fm.actions.reset")
              }}
            </el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert type="info" :title="$t('fm.description.uploadJsonInfo')"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{ jsonEg }}</div>
        </cus-dialog>

        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >
          <div id="jsoneditor" style="height: 400px;width: 100%;">{{ jsonTemplate }}</div>

          <template slot="action">
            <el-button
              type="primary"
              class="json-btn"
              :data-clipboard-text="jsonCopyValue"
            >{{ $t("fm.actions.copyData") }}</el-button>
          </template>
        </cus-dialog>

        <!-- form弹出配置 -->
        <cus-dialog
          :visible="formVisible"
          @on-close="formVisible = false"
          ref="formPreview"
          width="800px"
          form
        >
          <form-config :data="widgetForm.config"></form-config>
          <template slot="action">
            <el-button type="primary" class="json-btn" @click="formVisible = false">确认</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="900px"
          form
          :action="false"
        >
          <!-- <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div> -->
          <el-tabs type="border-card" style="box-shadow: none;" v-model="codeActiveName">
            <el-tab-pane label="Vue Component" name="vue">
              <div id="vuecodeeditor" style="height: 500px; width: 100%;">{{ vueTemplate }}</div>
            </el-tab-pane>
            <el-tab-pane label="HTML" name="html">
              <div id="codeeditor" style="height: 500px; width: 100%;">{{ htmlTemplate }}</div>
            </el-tab-pane>
          </el-tabs>
        </cus-dialog>
        <!-- codemirror -->
        <cus-dialog
          :visible="mirrorVisible"
          @on-close="closeMirror"
          @on-submit="getCode"
          ref="jsonPreview"
          width="900px"
          form
        >
          <div class="wrap">
            <codemirror ref="myCm" v-model="code" :options="cmOptions"></codemirror>
            <div class="data-list">
              <div class="data">
                <div>
                  <span>字段标识列表</span>
                  <div
                    class="model"
                    v-for="item in modelLists"
                    :key="item.model"
                    :title="item.model"
                  >{{'models.'+item.model}}</div>
                </div>
                <div>
                  <span>组件描述</span>
                  <div
                    class="info"
                    :title="item.name"
                    v-for="item in modelLists"
                    :key="item.model"
                  >{{item.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </cus-dialog>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import CommonConfig from './CommonConfig' //通用字段
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import {
  basicComponents,
  layoutComponents,
  advanceComponents,
  tableComponents
} from './componentsConfig.js'
import { bankingComponents } from './componentsBankingConfig.js'
import request from '../util/request.js'
import generateCode from './generateCode.js'
import { EventBus } from '../util/event-bus.js'
import historyManager from '../util/history-manager.js'
import TableWidgetConfig from './table/TableWidgetConfig'
import TableEventConfig from './table/TableEventConfig'

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    CommonConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm,
    TableWidgetConfig,
    TableEventConfig
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    extend: {
      type: Boolean,
      default: true
    },
    formConfig: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    bankingFields: {
      type: Array,
      default: () => [
        'password',
        'againpassword',
        'amount',
        'input',
        'singletext',
        'textarea',
        'radio',
        'checkbox',
        'time',
        'date',
        'select',
        'idencard',
        'readcard',
        'taglable',
        'imageshow',
        'imageupload',
        'fileupload',
        'videoupload',
        'camera',
        'buttonCom',
        'alink',
        'frequency'
      ]
    },
    basicFields: {
      type: Array,
      default: () => [
        'input',
        'textarea',
        'number',
        'radio',
        'checkbox',
        'time',
        'date',
        'rate',
        'color',
        'select',
        'switch',
        'slider',
        'text'
      ]
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid', 'divider']
    },
    tableFields: {
      type: Array,
      default: () => ['elTable']
    }
  },
  data() {
    return {
      code: '',
      extendFunc: '',
      cmOptions: {
        tabSize: 4,
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { Tab: 'autocomplete' },
        autofocus: true,
        matchBrackets: true,
        smartIndent: true,
        matchBrackets: true,
        styleActiveLine: true,
        // scrollbarStyle: "overlay",
        spellcheck: true,
        autocorrect: true,
        autoCloseBrackets: true,
        indentUnit: 2,
        line: true,
        showHint: true,
        gutters: ['CodeMirror-lint-markers']
      },
      modelLists: [],
      mirrorVisible: false,
      nowEle: {}, //当前编辑的组件对象
      modify: '', //当前编辑的是哪个属性
      bankingComponents,
      basicComponents,
      layoutComponents,
      advanceComponents,
      tableComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
        extendDetail: 'function main ()' + '{\n' + '}'
      },
      oldWidgetForm: [], //保存预览之前的组件配置数据
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      formVisible: false,
      remoteFuncs: {},
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      vueTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`,
      codeActiveName: 'vue',
      undo: false,
      redo: false,
      copyModel: new DataTransfer()
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  created() {
    localStorage.removeItem('selectIndex')
  },
  mounted() {
    this._loadComponents()
    const _this = this
    historyManager.clear()
    EventBus.$on('on-history-add', () => {
      debugger
      console.log('xxx', _this.widgetFormSelect)
      historyManager
        .add(
          _this.widgetForm,
          _this.widgetFormSelect && _this.widgetFormSelect.key
            ? _this.widgetFormSelect.key
            : ''
        )
        .then(() => {
          _this.$nextTick(() => {
            _this.undo = true
            _this.redo = false
          })
        })
    })
  },
  methods: {
    _addFlow() {
      this.$emit('addFlow')
    },
    // 为每个组件添加name属性
    _loadComponents() {
      // 金融控件
      this.bankingComponents = this.bankingComponents.map((item) => {
        return {
          ...item,
          name: this.$t(`fm.components.nFields.${item.type}`)
        }
      })
      this.basicComponents = this.basicComponents.map((item) => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.advanceComponents = this.advanceComponents.map((item) => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.layoutComponents = this.layoutComponents.map((item) => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.tableComponents = this.tableComponents.map((item) => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
    },
    // 获取models
    getModels() {
      this.modelLists = []
      this.widgetForm.list.forEach((item) => {
        if (item.type === 'grid') {
          item.columns.forEach((cloItem) => {
            // this.tranData(cloItem)
            this.modelLists = [...this.modelLists, ...cloItem.list]
          })
        } else {
          this.modelLists = [...this.modelLists, item]
        }
      })
      console.log(this.modelLists)
    },
    // mirror控制函数
    showMirror(parms, modify) {
      console.log(modify)
      this.modify = modify
      this.nowEle = parms
      if (this.modify == '隐藏条件') {
        if (this.nowEle.hidden != '') {
          this.code = this.nowEle.hidden
        }
      } else if (this.modify == '离开条件') {
        if (this.nowEle.condition != '') {
          this.code = this.nowEle.condition
        }
      } else if (this.modify == '进入条件') {
        if (this.nowEle.enterCondition != '') {
          this.code = this.nowEle.enterCondition
        }
      } else if (this.modify == '离开赋值') {
        if (this.nowEle.assignment != '') {
          this.code = this.nowEle.assignment
        }
      } else if (this.modify == '入口数据') {
        if (this.nowEle.data != '') {
          this.code = this.nowEle.data
        }
      } else if (this.modify == '启动条件') {
        if (this.nowEle.isRemote != '') {
          this.code = this.nowEle.isRemote
        }
      } else if (this.modify == '服务名') {
        if (this.nowEle.url != '') {
          this.code = this.nowEle.url
        }
      } else if (this.modify == '出口数据') {
        if (this.nowEle.success != '') {
          this.code = this.nowEle.success
        }
      } else if (this.modify == '请输入入口数据') {
        if (this.nowEle.requestData != '') {
          this.code = this.nowEle.requestData
        }
      } else if (this.modify == '请输入出口数据') {
        if (this.nowEle.responseData != '') {
          this.code = this.nowEle.responseData
        }
      } else if (this.modify == '调用函数') {
        if (this.nowEle.options.buttonfun != '') {
          this.code = this.nowEle.options.buttonfun
        }
      } else if (this.modify == '多个外部条件访问') {
        if (this.nowEle.multiCondition != '') {
          this.code = this.nowEle.multiCondition
        }
      } else if (this.modify == '请输入远程方法') {
        if (this.nowEle.options.remoteFunc != '') {
          this.code = this.nowEle.options.remoteFunc
        }
      }
      this.getModels()
      this.mirrorVisible = true
    },
    // 扩展函数编辑器
    handleEdit(e) {
      this.extendFunc = e.target.innerText
      this.code = this.widgetForm.extendDetail
      this.mirrorVisible = true
    },
    // 关闭mirror
    closeMirror() {
      this.code = ''
      this.mirrorVisible = false
    },
    // 获取mirror输入的代码
    getCode() {
      console.log(this.extendFunc)
      if (this.modify == '隐藏条件') {
        this.nowEle.hidden = this.code
      } else if (this.modify == '离开条件') {
        this.nowEle.condition = this.code
      } else if (this.modify == '进入条件') {
        this.nowEle.enterCondition = this.code
      } else if (this.modify == '离开赋值') {
        this.nowEle.assignment = this.code
      } else if (this.modify == '启动条件') {
        this.nowEle.isRemote = this.code
      } else if (this.modify == '服务名') {
        this.nowEle.url = this.code
      } else if (this.modify == '出口数据') {
        this.nowEle.success = this.code
      } else if (this.modify == '多个外部条件访问') {
        this.nowEle.multiCondition = this.code
      } else if (this.modify == '入口数据') {
        // let tmp;
        // try {
        //   tmp = eval("(" + this.code + ")")();
        // } catch (error) {
        //   throw new Error(error);
        // }
        this.nowEle.data = this.code
      } else if (this.modify == '请输入入口数据') {
        this.nowEle.requestData = this.code
      } else if (this.modify == '请输入出口数据') {
        this.nowEle.responseData = this.code
      } else if (this.extendFunc == '扩展函数') {
        this.widgetForm.extendDetail = this.code
        console.log(this.widgetForm)
        this.extendDetail = this.code
        console.log(this.extendDetail)
      } else if (this.modify == '调用函数') {
        this.nowEle.options.buttonfun = this.code
        console.log(this.nowEle.options.buttonfun)
      } else if (this.modify == '请输入远程方法') {
        this.nowEle.options.remoteFunc = this.code
      }
      this.mirrorVisible = false
      this.extendFunc = ''
      this.modify = ''
    },
    // 显示form配置
    handleFormConfig() {
      this.formVisible = true
    },
    handleGoGithub() {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect(value) {
      this.configTab = value
    },
    handleMoveEnd(evt) {
      console.log('end', evt)
    },
    handleMoveStart({ oldIndex }) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove() {
      return true
    },
    // 监听新增表格
    toAddTable() {
      this.$emit('table')
    },
    // 检查model是否有重复
    checkModels(item) {
      if (item.length <= 1) {
        return true
      } else {
        for (let i = 0; i < item.length; i++) {
          for (let j = i + 1; j < item.length; j++) {
            if (item[i].model === item[j].model) {
              this.$message({
                showClose: true,
                duration: 5000,
                message: `${item[i].name} 和 ${item[j].name} 字段标识重复`,
                type: 'error'
              })
              return false
            } else {
              return true
            }
          }
        }
      }
    },
    // 检查表格是否为空
    checkEmptyTable(item) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].type === 'elTable' && !item[i].tableCode) {
          this.$message({
            showClose: true,
            duration: 5000,
            message: `表格 ${item[i].name} 未配置 `,
            type: 'error'
          })
          return false
        } else {
          return true
        }
      }
    },
    handlePreview() {
      this.oldWidgetForm = JSON.parse(JSON.stringify(this.widgetForm))
      let tempList = []
      this.widgetForm.list.forEach((item) => {
        if (item.type === 'grid') {
          item.columns.forEach((cloItem) => {
            tempList = [...tempList, ...cloItem.list]
          })
        } else {
          tempList = [...tempList, item]
        }
      })
      if (!this.checkModels(tempList) || !this.checkEmptyTable(tempList)) {
        return
      }
      this.previewVisible = true
    },
    closePreview() {
      this.widgetForm = this.oldWidgetForm
      this._loadComponents()
      let index = localStorage.getItem('selectIndex') * 1
      this.widgetFormSelect = this.widgetForm.list[index]
      this.previewVisible = false
    },
    handleTest() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          this.$alert(data, '').catch((e) => {})
          this.$refs.widgetPreview.end()
        })
        .catch((e) => {
          this.$refs.widgetPreview.end()
        })
    },
    handleReset() {
      this.$refs.generateForm.reset()
    },
    handleField(item) {
      console.log(item)
      EventBus.$emit('on-field-add', item)
    },
    //撤销
    handleUndo() {
      historyManager
        .updateLatest(
          this.widgetForm,
          this.widgetFormSelect && this.widgetFormSelect.key
            ? this.widgetFormSelect.key
            : ''
        )
        .then(() => {
          historyManager.undo().then((data) => {
            this.widgetForm = { ...data.data }
            this.widgetFormSelect = this._findWidgetItem(
              this.widgetForm.list,
              data.key
            )
            this.undo = data.undo
            this.redo = data.redo
          })
        })
    },
    //重做
    handleRedo() {
      historyManager.redo().then((data) => {
        this.widgetForm = { ...data.data }
        this.widgetFormSelect = this._findWidgetItem(
          this.widgetForm.list,
          data.key
        )

        this.undo = data.undo
        this.redo = data.redo
      })
    },
    _findWidgetItem(list, key) {
      const index = list.findIndex((item) => item.key == key)

      if (index >= 0) {
        return list[index]
      } else {
        for (let m = 0; m < list.length; m++) {
          const item = list[m]

          if (item.type === 'grid') {
            for (let i = 0; i < item.columns.length; i++) {
              return this._findWidgetItem(item.columns[i].list, key)
            }
          }
          if (item.type === 'table') {
            return this._findWidgetItem(item.tableColumns, key)
          }
          if (item.type === 'tabs') {
            for (let i = 0; i < item.tabs.length; i++) {
              return this._findWidgetItem(item.tabs[i].list, key)
            }
          }
        }

        return {}
      }
    },
    handleGenerateJson() {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        const editor = ace.edit('jsoneditor')
        editor.session.setMode('ace/mode/json')

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success(this.$t('fm.message.copySuccess'))
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleGenerateCode() {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html')
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue')
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode('ace/mode/html')

        const vueeditor = ace.edit('vuecodeeditor')
        vueeditor.session.setMode('ace/mode/html')
      })
    },
    handleUpload() {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode('ace/mode/json')
      })
    },
    handleUploadJson() {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    //清空
    handleClear() {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        }
      }
      this.widgetFormSelect = {}
      this.$nextTick(() => {
        EventBus.$emit('on-history-add')
      })
    },
    getJSON() {
      return this.widgetForm
    },
    getHtml() {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON(json) {
      if (typeof json === 'string') {
        json = JSON.parse(json)
      }
      this.widgetForm = json

      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0]
      } else {
        this.widgetFormSelect = {}
      }
      this.$nextTick(() => {
        EventBus.$emit('on-history-add')
      })
    },
    handleInput(val) {
      console.log(val)
      this.blank = val
    },
    // 监听数据改变
    handleDataChange(field, value, data) {
      console.log(field, value, data)
    },
    // 监听input组件通过form组件发射出来的事件
    inputChange() {
      console.log('input')
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log(this.$refs.widgetForm)
      }
    },
    $lang: function (val) {
      this._loadComponents()
    }
  }
}
</script>

<style lang="scss">
.widget-empty {
  background-position: 50%;
}
.wrap {
  display: flex;
  justify-content: space-between;
}
.vue-codemirror {
  width: 550px;
}
.data-list {
  width: 260px;
  height: 300px;
  overflow-y: scroll;
  border-left: 1px solid #eee;
}
.data-list > .data {
  padding: 0 10px;
  cursor: text;
}
.data > div {
  display: inline-block;
}
.data > div:first-child {
  width: 65%;
}
.data > div:nth-child(2) {
  width: 35%;
}
.data .model {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
.data span,
.data .info {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
</style>

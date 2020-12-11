<template>
  <div>
    <div
      class="widget-view no-put"
      v-if="element && element.key && element.type == 'divider'"
      :class="{active: selectWidget.key == element.key, 'is_hidden': element.options.hidden}"
      @click.stop="handleSelectWidget(index)"
      style="padding-bottom: 0;"
    >
      <el-divider :content-position="element.options.contentPosition">{{element.name}}</el-divider>

      <div class="widget-view-action" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
        <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
      </div>

      <div class="widget-view-drag" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-drag drag-widget"></i>
      </div>

      <div class="widget-view-model" v-if="element.options.dataBind">
        <span>{{element.model}}</span>
      </div>
    </div>
    <el-form-item
      class="widget-view"
      v-if="element && element.key && element.type != 'divider' || element.type != 'tabs'"
      :label="(element.type != 'buttonCom' && element.type != 'alink' && !element.options.hideLabel) ? element.name : ''"
      @click.native.stop="handleSelectWidget(index)"
      :class="{active: selectWidget.key == element.key, 'is_req': element.options.required, 'is_hidden': element.options.hidden}"
      :label-width="element.options.hideLabel ? '0px' : (element.options.isLabelWidth ? element.options.labelWidth + 'px' : '')"
    >
      <!--{{element.type}}-->
      <!--金额-->
      <template v-if="element.type == 'amount'">
        <el-input
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
        ></el-input>
      </template>
      <!-- 树形组件 -->
      <template v-if=" element.type == 'tree'">
        <el-tree 
        :data="element.options.data" 
        :props="element.options.props"
        :highlightCurrent="element.options.highlightCurrent"
        :accordion="element.options.accordion"
        :show-checkbox="element.options.showCheckbox"></el-tree>
      </template>
      <!--密码-->
      <template v-if="element.type == 'password'">
        <el-input
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
        ></el-input>
      </template>
      <!--确认密码-->
      <template v-if="element.type == 'againpassword'">
        <el-input
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
        ></el-input>
      </template>

      <template v-if="element.type == 'idencard' | element.type == 'readcard'">
        <el-input
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
        ></el-input>
      </template>
      <template v-if="element.type == 'input'">
        <el-input
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
          :show-password="element.options.showPassword"
        ></el-input>
      </template>
      <template v-if="element.type == 'singletext'">
        <el-input
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
        ></el-input>
      </template>
      <template v-if="element.type == 'textarea'">
        <el-input
          type="textarea"
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :disabled="element.options.disabled"
          :placeholder="element.options.placeholder"
        ></el-input>
      </template>

      <template v-if="element.type == 'counter'">
        <el-input-number
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :controls-position="element.options.controlsPosition"
          :style="{width: element.options.width}"
        ></el-input-number>
      </template>

      <template v-if="element.type == 'taglable'">
        <el-button class="button-new-tag">+ New Tag</el-button>
      </template>

      <template v-if="element.type == 'radio'">
        <el-radio-group
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :disabled="element.options.disabled"
        >
          <el-radio
            :style="{display: element.options.inline ? 'inline-block' : 'block'}"
            :label="item.value"
            v-for="(item, index) in element.options.options"
            :key="item.value + index"
          >{{element.options.showLabel ? item.label : item.value}}</el-radio>
        </el-radio-group>
      </template>

      <template v-if="element.type == 'checkbox'">
        <el-checkbox-group
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :disabled="element.options.disabled"
        >
          <el-checkbox
            :style="{display: element.options.inline ? 'inline-block' : 'block'}"
            :label="item.value"
            v-for="(item, index) in element.options.options"
            :key="item.value + index"
          >{{element.options.showLabel ? item.label : item.value}}</el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-if="element.type == 'time'">
        <el-time-picker
          v-model="element.options.defaultValue"
          :is-range="element.options.isRange"
          :placeholder="element.options.placeholder"
          :start-placeholder="element.options.startPlaceholder"
          :end-placeholder="element.options.endPlaceholder"
          :readonly="element.options.readonly"
          :disabled="element.options.disabled"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :arrowControl="element.options.arrowControl"
          :style="{width: element.options.width}"
        ></el-time-picker>
      </template>

      <template v-if="element.type == 'date'">
        <el-date-picker
          v-model="element.options.defaultValue"
          :type="element.options.type"
          :is-range="element.options.isRange"
          :placeholder="element.options.placeholder"
          :start-placeholder="element.options.startPlaceholder"
          :end-placeholder="element.options.endPlaceholder"
          :readonly="element.options.readonly"
          :disabled="element.options.disabled"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :style="{width: element.options.width}"
        ></el-date-picker>
      </template>

      <template v-if="element.type == 'rate'">
        <el-rate
          v-model="element.options.defaultValue"
          :max="element.options.max"
          :disabled="element.options.disabled"
          :allow-half="element.options.allowHalf"
        ></el-rate>
      </template>

      <template v-if="element.type == 'color'">
        <el-color-picker
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :show-alpha="element.options.showAlpha"
        ></el-color-picker>
      </template>

      <template v-if="element.type == 'select'">
        <el-select
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :multiple="element.options.multiple"
          :clearable="element.options.clearable"
          :placeholder="element.options.placeholder"
          :style="{width: element.options.width}"
        >
          <el-option
            v-for="item in element.options.options"
            :key="item.value"
            :value="item.value"
            :label="element.options.showLabel?item.label:item.value"
          ></el-option>
        </el-select>
      </template>

      <template v-if="element.type == 'frequency'">
        <el-input
                v-model="element.options.defaultValue"
                :style="{width: element.options.width}"
                :placeholder="element.options.placeholder"
                :disabled="element.options.disabled"
        ></el-input>
      </template>

      <template v-if="element.type == 'camera'">
        <el-select
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :multiple="element.options.multiple"
          :clearable="element.options.clearable"
          :placeholder="element.options.placeholder"
          :style="{width: element.options.width}"
        >
          <el-option
            v-for="item in element.options.options"
            :key="item.value"
            :value="item.value"
            :label="element.options.showLabel?item.label:item.value"
          ></el-option>
        </el-select>
      </template>

      <template v-if="element.type=='switch'">
        <el-switch v-model="element.options.defaultValue" :disabled="element.options.disabled"></el-switch>
      </template>

      <template v-if="element.type=='slider'">
        <el-slider
          v-model="element.options.defaultValue"
          :min="element.options.min"
          :max="element.options.max"
          :disabled="element.options.disabled"
          :step="element.options.step"
          :show-input="element.options.showInput"
          :range="element.options.range"
          :style="{width: element.options.width}"
        ></el-slider>
      </template>

      <template
        v-if="element.type=='imageshow' || element.type=='imgupload' || element.type=='imageupload' || element.type=='fileupload' || element.type=='videoupload'"
      >
        <fm-upload
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :style="{'width': element.options.width}"
          :width="element.options.size.width"
          :height="element.options.size.height"
          token="xxx"
          domain="xxx"
        ></fm-upload>
      </template>
      <template v-if="element.type == 'fileuploadExt'">
        <el-upload
                action=""
                :disabled="element.options.disabled"
                :limit="element.options.limit"
        >
          <el-button size="small" type="primary">{{$t('fm.actions.upload')}}</el-button>
          <div v-if="element.options.tip" class="el-upload__tip" slot="tip">{{element.options.tip}}</div>
        </el-upload>
      </template>

      <template v-if="element.type == 'cascader'">
        <el-cascader
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :clearable="element.options.clearable"
          :placeholder="element.options.placeholder"
          :style="{width: element.options.width}"
          :options="element.options.remoteOptions"
        ></el-cascader>
      </template>

      <template v-if="element.type == 'buttonCom'">
        <el-button
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :clearable="element.options.clearable"
          :placeholder="element.options.placeholder"
          :style="{width: element.options.width}"
          :options="element.options.remoteOptions"
        >按钮</el-button>
      </template>

      <template v-if="element.type == 'alink'">
        <a
          href
          target="_blank"
          :disabled="element.options.disabled"
          :placeholder="element.options.placeholder"
          :style="{width: element.options.width}"
          :options="element.options.remoteOptions"
        >a 链接</a>
      </template>

      <template v-if="element.type == 'editor'">
        <vue-editor v-model="element.options.defaultValue" :style="{width: element.options.width}"></vue-editor>
      </template>

      <template v-if="element.type=='blank'">
        <div
          style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;"
        >{{$t('fm.components.fields.blank')}}</div>
      </template>

      <template v-if="element.type == 'text'">
        <span>{{element.options.defaultValue}}</span>
      </template>
      <template v-if="element.type == 'elTable'">
        <template>
          <div
            style="line-height: 45px;"
            v-if="element.options.isAddBtn || element.options.isEditBtn|| element.options.isDeleteBtn ||  element.options.isDisplayColumnBtn"
          >
            <el-row type="flex" justify="end" :gutter="20">
              <el-col v-if="element.options.isAddBtn" :span="4">
                <div>
                  <el-button type="primary">添加数据</el-button>
                </div>
              </el-col>
              <el-col v-if="element.options.isEditBtn" :span="4">
                <div>
                  <el-button type="primary">编辑数据</el-button>
                </div>
              </el-col>
              <el-col v-if="element.options.isDeleteBtn" :span="4">
                <div>
                  <el-button type="primary">删除数据</el-button>
                </div>
              </el-col>
              <el-col v-if="element.options.isDisplayColumnBtn" :span="10">
                <div style="display: inline-flex;">
                  <span>显示列:</span>
                  <el-select
                    @change="displayColumnsChange()"
                    v-model="element.options.displayColumns"
                    multiple
                    filterable
                    collapse-tags
                    placeholder="列显示/隐藏"
                  >
                    <el-option
                      v-for="item in element.configdata.list[0].options.columns"
                      :key="item.prop"
                      :label="item.label"
                      :value="item.prop"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <fm-generate-table :data="element.configdata" ref="generateTable"></fm-generate-table>
        <template v-if="element.options.isPagination">
          <div style="text-align: end;">
            <el-pagination
              @current-change="currentChange"
              :page-size="element.options.pagination.pageSize"
              layout="prev, pager, next"
              :total="element.options.pagination.total"
            ></el-pagination>
          </div>
        </template>
      </template>

      <div class="widget-view-action" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
        <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
      </div>

      <div class="widget-view-drag" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-drag drag-widget"></i>
      </div>
    </el-form-item>
  </div>
</template>

<script>
import FmUpload from "./Upload";
import { EventBus } from "../util/event-bus.js";
// import request from '../demo/demo3/js/request'
import request from '../demo/commonjs/request'
export default {
  props: ["element", "select", "index", "data"],
  components: {
    FmUpload,
  },
  data() {
    return {
      selectWidget: this.select,
    };
  },
  mounted() {},
  methods: {
    currentChange(pageSize){
      eval("("+this.element.options.pagination.handleCurrentChange+")")(request,pageSize,(res)=>{
        this.widget.configdata.list[0].options.tableData = res;
      })
    },
    handleSelectWidget(index) {
      localStorage.setItem("selectIndex", index);
      this.selectWidget = this.data.list[index];
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1);
        setTimeout(() => {
          EventBus.$emit("on-history-add");
        }, 20);
      });
    },
    handleWidgetClone(index) {
      let cloneData = {
        ...this.data.list[index],
        options: { ...this.data.list[index].options },
        key: Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999),
      };

      if (
        this.data.list[index].type === "radio" ||
        this.data.list[index].type === "checkbox" ||
        this.data.list[index].type === "select"
      ) {
        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map((item) => ({ ...item })),
          },
        };
      }

      this.data.list.splice(index, 0, cloneData);

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1];
        this.$nextTick(() => {
          EventBus.$emit("on-history-add");
        });
      });
    },
    dblhandleCurrentRow(row, column, event) {
      alert(row);
    },
    displayColumnsChange(val) {
      let columns = [];
      let flag = false;
      if (this.element.configdata) {
        columns = this.element.configdata.list[0].options.columns;
        columns.map((c) => {
          if (this.element.options.displayColumns) {
            flag = this.element.options.displayColumns.includes(c.prop);
            if (flag) {
              c.isDisplay = true;
            } else {
              c.isDisplay = false;
            }
          }
        });
      }
    },
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true,
    },
  },
};
</script>

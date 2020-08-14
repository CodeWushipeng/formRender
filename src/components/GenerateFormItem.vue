<template>
  <div>
    <el-form-item
      v-if="widget.type != 'divider'"
      :label="(widget.type != 'buttonCom' && widget.type != 'alink' && !widget.options.hideLabel) ? widget.name : ''"
      :prop="widget.model"
      class="targetEle"
      :class="{
        [widget.options.customClass]: widget.options.customClass?true: false,
        'no-label-form-item': widget.options.isLabelWidth && widget.options.labelWidth == 0
      }"
      :label-width="widget.options.hideLabel ? '0px' : (widget.options.isLabelWidth ? widget.options.labelWidth + 'px' : '')"
    >
      <!--widget: {{widget}}-->
      <!-- {{rules}} -->
      <!--金额控件-->
      <template v-if="widget.type == 'amount'">
        <!--放大镜-->
        <div class="el-input el-input--small">
          <input
            class="el-input__inner"
            :maxlength="widget.options.maxlength"
            @keydown="inputHandler(widget.key)"
            @focus="inputHandler(widget.key)"
            @keyup="keyupHandler(widget.key)"
            @keyup.enter="enterHandler(widget.key)"
            @blur="blurHandler()"
            :ref="widget.key"
            v-model="dataModel"
            type="text"
          />

          <transition name="fade">
            <!--<div class="mglass">-->
            <div v-if="widget.options.amountmoney && amountvisible" class="mglass">
              <div class="mglass-data">
                {{ dataModel }}
                <br />
              </div>
              <div class="mglass-big">{{ bigPastAdjustFee }}</div>
            </div>
          </transition>
        </div>
      </template>
      <!--密码-->
      <template v-if="widget.type == 'password'">
        <el-input
          type="password"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          :maxlength="widget.options.maxlength"
          @keyup.native.enter="change"
          @keyup.native="passwordKeyup"
          @focus="comFocus"
          @blur="comBlur"
          :ref="widget.model"
        >
          <template slot="prepend">
            <el-button
              v-if="widget.options.tips != ''"
              @click="showTips(widget.options.tips)"
              slot="prepend"
              icon="el-icon-question"
            ></el-button>
          </template>
        </el-input>
      </template>
      <!--确认密码-->
      <template v-if="widget.type == 'againpassword'">
        <el-input
          type="password"
          v-model="dataModel"
          :maxlength="widget.options.maxlength"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          @focus="comFocus"
          @blur="comBlur"
          @keyup.native.enter="change"
          :ref="widget.model"
        >
          <template slot="prepend">
            <el-button
              v-if="widget.options.tips != ''"
              @click="showTips(widget.options.tips)"
              slot="prepend"
              icon="el-icon-question"
            ></el-button>
          </template>
        </el-input>
      </template>

      <template v-if="widget.type == 'input'">
        <el-input
          v-if="
          widget.options.dataType == 'number' ||
            widget.options.dataType == 'integer' ||
            widget.options.dataType == 'float'
        "
          type="number"
          v-model.number="dataModel"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          :disabled="widget.options.disabled"
          :show-password="widget.options.showPassword"
          @focus="comFocus"
          @blur="comBlur"
          @keyup.native.enter="change"
        >
          <template slot="prepend">
            <el-button
              v-if="widget.options.tips != ''"
              @click="showTips(widget.options.tips)"
              slot="prepend"
              icon="el-icon-question"
            ></el-button>
          </template>
        </el-input>

        <!-- dataType为组件类型 dataModel为双向绑定的数据 -->
        <el-input
          v-else
          :type="widget.options.dataType"
          v-model="dataModel"
          :maxlength="widget.options.maxlength"
          :clearable="widget.options.clearable"
          :show-word-limit="widget.options.maxlength?true:false"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          :show-password="widget.options.showPassword"
          @focus="comFocus"
          @blur="comBlur"
          @keyup.native.enter="change"
          :ref="widget.model"
        >
          <el-tooltip
            v-if="widget.options.tips != ''"
            slot="prepend"
            class="item"
            effect="dark"
            :content="widget.options.tips"
            placement="top-start"
          >
            <!-- <el-button icon="el-icon-question" @click="showTips(widget.options.tips)"></el-button> -->
            <el-button icon="el-icon-question"></el-button>
          </el-tooltip>
        </el-input>
      </template>

      <!--身份证 读卡-->
      <template v-if="(widget.type == 'idencard') | (widget.type == 'readcard')">
        <el-input
          :type="widget.options.dataType"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          @focus="comFocus"
          @blur="comBlur"
          @keyup.native.enter="change"
        >
          <el-button
            v-if="widget.options.ifperipheral"
            slot="prepend"
            icon="el-icon-question"
            @click="peripheral()"
          >读取</el-button>
        </el-input>
      </template>

      <template v-if="widget.type == 'singletext'">
        <el-input
          autosize
          :type="widget.options.dataType"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          :ref="widget.model"
          :maxlength="widget.options.textarealength"
          show-word-limit
          @focus="comFocus"
          @blur="comBlur"
          @keyup.native.enter="change"
        >
          <template slot="prepend">
            <el-button
              v-if="widget.options.tips != ''"
              @click="showTips(widget.options.tips)"
              slot="prepend"
              icon="el-icon-question"
            ></el-button>
          </template>
        </el-input>
      </template>
      <template v-if="widget.type == 'textarea'">
        <el-input
          type="textarea"
          :autosize="
          widget.options.textareaautosize
            ? {
                minRows: widget.options.textarearowmin,
                maxRows: widget.options.textarearowmax,
              }
            : ''
        "
          :maxlength="widget.options.textarealength"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          show-word-limit
          @focus="comFocus"
          @blur="comBlur"
          @keyup.native.ctrl.enter="change"
        >
          <template slot="prepend">
            <el-button
              v-if="widget.options.tips != ''"
              @click="showTips(widget.options.tips)"
              slot="prepend"
              icon="el-icon-question"
            ></el-button>
          </template>
        </el-input>
      </template>

      <template v-if="widget.type == 'number'">
        <el-input-number
          v-model="dataModel"
          :style="{ width: widget.options.width }"
          :step="widget.options.step"
          controls-position="right"
          :disabled="widget.options.disabled"
          @focus="comFocus"
          @blur="comBlur"
          @keyup.native.enter="change"
        >
          <template slot="prepend">
            <el-button
              v-if="widget.options.tips != ''"
              @click="showTips(widget.options.tips)"
              slot="prepend"
              icon="el-icon-question"
            ></el-button>
          </template>
        </el-input-number>
      </template>

      <!--标签组件-->
      <template v-if="widget.type == 'taglable'">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{ tag }}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </template>

      <!-- <template v-if="widget.type == 'radio'">
      <el-radio-group
        @click.native="radioFun"
        v-model="dataModel"
        :style="{ width: widget.options.width }"
        :disabled="widget.options.disabled"
      >
        <el-radio
          @keydown.space.native="radioFun"
          :style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
          v-for="(item, index) in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
          :key="index"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{
            widget.options.showLabel ? item.label : item.value
          }}</template>
        </el-radio>
      </el-radio-group>
      </template>-->
      <template v-if="widget.type == 'radio'">
        <el-radio-group
          v-model="dataModel"
          :style="{ width: widget.options.width }"
          :disabled="widget.options.disabled"
          @keyup.native.enter="change"
          @change="valueChange"
          :ref="widget.model"
        >
          <el-radio
            :style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
            :label="item.value"
            v-for="(item, index) in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
            :key="index"
          >
            <template v-if="widget.options.remote">{{ item.label }}</template>
            <template v-else>
              {{
              widget.options.showLabel ? item.label : item.value
              }}
            </template>
          </el-radio>
        </el-radio-group>
      </template>
      <!--radio-->
      <cus-dialog
        :visible="radioVisible"
        @on-close="radioVisible = false"
        ref="radioPreview"
        width="500px"
        form
      >
        <radioFormItem
          insite="true"
          v-if="radioVisible"
          @on-close1="radioVisibleFun"
          :models.sync="models"
          :widget="widget"
          ref="radioForm"
        >
          <template v-slot:blank="scope">
            Width
            <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>Height
            <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
          </template>
        </radioFormItem>

        <template slot="action">
          <span></span>
        </template>
      </cus-dialog>

      <template v-if="widget.type == 'checkbox'">
        <el-checkbox-group
          v-model="dataModel"
          :style="{ width: widget.options.width }"
          :disabled="widget.options.disabled"
          @keyup.native.enter="change"
          @keyup.native.up="checkUp"
          @keyup.native.down="checkDown"
          @change="valueChange"
          :class="widget.model"
        >
          <el-checkbox
            :style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
            :label="item.value"
            v-for="(item, index) in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
            :key="index"
          >
            <template v-if="widget.options.remote">{{ item.label }}</template>
            <template v-else>
              {{
              widget.options.showLabel ? item.label : item.value
              }}
            </template>
          </el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-if="widget.type == 'time'">
        <hr-time-select
          v-model="dataModel"
          :is-range="widget.options.isRange"
          :placeholder="widget.options.placeholder"
          :start-placeholder="widget.options.startPlaceholder"
          :end-placeholder="widget.options.endPlaceholder"
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
          :arrowControl="widget.options.arrowControl"
          :value-format="widget.options.format"
          :style="{ width: widget.options.width }"
          :ref="widget.model"
          @focus="comFocus"
          @blur="dateBlur"
          @keyup.native.space="dateShow"
          @picker-show="pickShow"
          @keyup.native.enter="change"
        ></hr-time-select>
      </template>

      <template v-if="widget.type == 'date'">
        <hr-date-picker
          v-model="dataModel"
          :type="widget.options.type"
          :placeholder="widget.options.placeholder"
          :start-placeholder="widget.options.startPlaceholder"
          :end-placeholder="widget.options.endPlaceholder"
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
          :value-format="
          widget.options.timestamp ? 'timestamp' : widget.options.format
        "
          :format="widget.options.format"
          :style="{ width: widget.options.width }"
          v-bind:picker-options="
          widget.options.type == 'date'
            ? pickerOptionsDate
            : widget.options.type == 'daterange'
            ? pickerOptionsRange
            : ''
        "
          :ref="widget.model"
          @focus="comFocus"
          @blur="dateBlur"
          @keyup.native.space="dateShow"
          @picker-show="pickShow"
          @keyup.native.enter="change"
        ></hr-date-picker>
      </template>

      <template v-if="widget.type == 'rate'">
        <el-rate
          v-model="dataModel"
          :max="widget.options.max"
          :disabled="widget.options.disabled"
          :allow-half="widget.options.allowHalf"
        ></el-rate>
      </template>

      <template v-if="widget.type == 'color'">
        <el-color-picker
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :show-alpha="widget.options.showAlpha"
        ></el-color-picker>
      </template>

      <template v-if="widget.type == 'select'">
        <!--remoteOptions:{{widget.options.remoteOptions}} :automatic-dropdown="true"-->
        <hr-select
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :multiple="widget.options.multiple"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          :filterable="widget.options.filterable"
          :ref="widget.model"
          @visible-change="optionStatu"
          @change="(val) => handleWeekChange(val)"
          @focus="comFocus"
          @keyup.native.enter="selectChange"
          @keyup.native.space="showOptions"
          @blur="comBlur"
        >
          <el-option
            v-for="item in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
            :key="item.value"
            :value="item.value"
            :label="
            widget.options.showLabel || widget.options.remote
              ? item.label
              : item.value
          "
          >
            <span style="float: left">
              {{
              widget.options.showLabel || widget.options.remote
              ? item.label
              : item.value
              }}
            </span>
            <span style="margin-left: 8px;color: #8492a6; font-size: 13px">
              {{
              item.value
              }}
            </span>
          </el-option>
        </hr-select>
        <span>{{ dataModel }}</span>
      </template>

      <template v-if="widget.type == 'camera'">
        <hr-select
          ref="camera"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :multiple="widget.options.multiple"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          :filterable="widget.options.filterable"
          style="width: 80%"
          @visible-change="optionStatu"
          @change="(val) => handleWeekChange(val)"
          @focus="comFocus"
          @keyup.native.enter="selectChange"
          @keyup.native.space="showOptions"
          @blur="comBlur"
        >
          <el-option
            v-for="item in cameraList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </hr-select>
        <el-button type="primary" class="json-btn" @click="cameraFun">拍照</el-button>
        <el-image :src="cameraimage" v-if="cameraimage != ''"></el-image>
      </template>

      <!--camera-->
      <cus-dialog
        :visible="cameraVisible"
        @on-close="cameraVisible = false"
        ref="cameraPreview"
        width="800px"
        form
      >
        <cameraFormItem
          insite="true"
          v-if="cameraVisible"
          @on-close1="cameraVisibleFun"
          @on-cameraimage="oncameraimage"
          :models.sync="models"
          :widget="widget"
          :cameraimage.sync="cameraimage"
          ref="cameraForm"
        >
          <template v-slot:blank="scope">
            Width
            <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>Height
            <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
          </template>
        </cameraFormItem>

        <template slot="action">
          <span></span>
        </template>
      </cus-dialog>

      <!--按钮组件-->
      <template v-if="widget.type == 'buttonCom'">
        <el-button
          ref="buttonref"
          v-model="dataModel"
          @click="buttonfun(widget.options.buttonfun)"
          :placeholder="widget.options.placeholder"
          :size="widget.options.size"
          :style="{ width: widget.options.width }"
          :disabled="widget.options.disabled"
          @keyup.native.enter="change"
          @focus="comFocus"
          @blur="comBlur"
        >
          <el-button
            :icon="widget.options.buttonicon"
            v-if="widget.options.buttonicon"
            style="border: 0;padding-left: 0px;"
          ></el-button>
          <span ref="buttonSpanRef">按钮3</span>
        </el-button>
      </template>

      <!--A 链接-->
      <template v-if="widget.type == 'alink'">
        <a
          ref="alinkref"
          @click="buttonfun(widget.options.buttonfun)"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :options="widget.options.remoteOptions"
        >
          <span ref="alinkSpanRef">a 链接</span>
        </a>
      </template>

      <!--{{widget.options.imagesrc}}&&&
      {{imagesrc}}-->
      <template v-if="widget.type == 'imageshow'">
        <el-image :src="imagesrc"></el-image>
      </template>

      <template v-if="widget.type == 'switch'">
        <el-switch v-model="dataModel" :disabled="widget.options.disabled"></el-switch>
      </template>

      <template v-if="widget.type == 'slider'">
        <el-slider
          v-model="dataModel"
          :min="widget.options.min"
          :max="widget.options.max"
          :disabled="widget.options.disabled"
          :step="widget.options.step"
          :show-input="widget.options.showInput"
          :range="widget.options.range"
          :style="{ width: widget.options.width }"
        ></el-slider>
      </template>

      <template v-if="widget.type == 'imgupload'">
        <fm-upload
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :style="{ width: widget.options.width }"
          :width="widget.options.size.width"
          :height="widget.options.size.height"
          :token="widget.options.token"
          :domain="widget.options.domain"
          :multiple="widget.options.multiple"
          :length="widget.options.length"
          :is-qiniu="widget.options.isQiniu"
          :is-delete="widget.options.isDelete"
          :min="widget.options.min"
          :is-edit="widget.options.isEdit"
          :action="widget.options.action"
        ></fm-upload>
      </template>

      <template
        v-if="
        (widget.type == 'imageupload') |
          (widget.type == 'fileupload') |
          (widget.type == 'videoupload')
      "
      >
        <fm-upload-extend
          v-model="dataModel"
          :uploadtype="widget.type"
          :disabled="widget.options.disabled"
          :style="{ width: widget.options.width }"
          :width="widget.options.size.width"
          :height="widget.options.size.height"
          :token="widget.options.token"
          :domain="widget.options.domain"
          :multiple="widget.options.multiple"
          :length="widget.options.length"
          :is-delete="widget.options.isDelete"
          :min="widget.options.min"
          :is-edit="widget.options.isEdit"
          :action="widget.options.action"
        ></fm-upload-extend>
      </template>

      <template v-if="widget.type == 'editor'">
        <vue-editor v-model="dataModel" :style="{ width: widget.options.width }"></vue-editor>
      </template>

      <template v-if="widget.type == 'cascader'">
        <el-cascader
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{ width: widget.options.width }"
          :options="widget.options.remoteOptions"
        ></el-cascader>
      </template>

      <template v-if="widget.type == 'text'">
        <span>{{ dataModel }}</span>
      </template>
      <template v-if="widget.type == 'elTable'">
        <template>
          <div
            style="line-height: 45px;"
            v-if="
            widget.options.isAddBtn ||
              widget.options.isEditBtn ||
              widget.options.isDeleteBtn||
              widget.options.isDisplayColumnBtn
          "
          >
            <el-row type="flex" justify="end" :gutter="20">
              <el-col v-if="widget.options.isAddBtn" :span="3">
                <div>
                  <el-button @click="handleTableEvent('add')" type="primary">添加数据</el-button>
                </div>
              </el-col>
              <el-col v-if="widget.options.isEditBtn" :span="3">
                <div>
                  <el-button @click="handleTableEvent('edit')" type="primary">编辑数据</el-button>
                </div>
              </el-col>
              <el-col v-if="widget.options.isDeleteBtn" :span="3">
                <div>
                  <el-button @click="handleTableEvent('delete')" type="primary">删除数据</el-button>
                </div>
              </el-col>
              <el-col v-if="widget.options.isDisplayColumnBtn" :span="10">
                <div>
                  <span>显示列:</span>
                  <hr-select
                    @change="displayColumnsChange()"
                    v-model="widget.options.displayColumns"
                    multiple
                    filterable
                    collapse-tags
                    placeholder="列显示/隐藏"
                  >
                    <el-option
                      v-for="item in widget.configdata.list[0].options.columns"
                      :key="item.prop"
                      :label="item.label"
                      :value="item.prop"
                    ></el-option>
                  </hr-select>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <fm-generate-table
          v-model="dataModel"
          :data="widget.configdata"
          @dblhandleCurrentRow="dblhandleCurrentRow"
          ref="generateTable"
        ></fm-generate-table>
        <template v-if="widget.options.isPagination">
          <div style="text-align: end;">
            <el-pagination
              @size-change="widget.options.pagination.handleSizeChange"
              @current-change="widget.options.pagination.handleCurrentChange"
              :current-page.sync="widget.options.pagination.currentPage"
              :page-size="widget.options.pagination.pageSize"
              layout="prev, pager, next"
              :pager-count="widget.options.pagination.pagerCount"
              :total="widget.options.pagination.total"
            ></el-pagination>
          </div>
        </template>
        <cus-dialog
          :visible="tableCf.tableDataEAVisible"
          @on-close="closeTableDataEA"
          @on-submit="handelTableDataEA"
          ref="tableeditCode"
          width="800px"
          form
        >
          <fm-generate-form
            v-if="tableCf.configdata != null"
            :data="tableCf.configdata"
            :value="tableCf.editData"
            ref="addEditForm"
          ></fm-generate-form>
        </cus-dialog>
      </template>
    </el-form-item>
    <el-divider
      v-if="widget.type == 'divider'"
      :content-position="widget.options.contentPosition"
      class="targetEle"
    >{{widget.name}}</el-divider>
  </div>
</template>

<script>
import FmUpload from './Upload'
import FmUploadExtend from './Uploadextend'
import CusDialog from './CusDialog'
import radioFormItem from './radioFormItem'
import cameraFormItem from './cameraFormItem'
import { getInputValue, delcommafy } from '../util/comother.js'
import { InputMoney } from '../util/amtUtil'
import request from '../util/request.js'
import ElImage from 'element-ui/packages/image/src/main'
import { RES_OK, FAIL_CODE } from '@/api/config'
import { getDicTwo } from '@/api/forms'
import { getFormConfigDataById } from '../components/table/tableAction'
import itemHandle from './mixins/itemHandle.js'
import hrSelect from './base-components/my-select/select'
export default {
  props: ['widget', 'models', 'rules', 'remote'], // widget为当前组件json数据
  components: {
    ElImage,
    FmUpload,
    FmUploadExtend,
    CusDialog,
    cameraFormItem,
    radioFormItem,
    hrSelect
  },
  mixins: [itemHandle],
  data() {
    return {
      imagesrc: require('../assets/wenjian.png'),
      /*imagesrc: "",*/
      radioVisible: false,
      cameraVisible: false,
      cameraList: [],
      cameraimage: '',
      amountvisible: false, // 控制金额放大镜的显隐
      dataModel: this.models[this.widget.model], // 当前组件的默认值，是双向绑定的
      pickerOptionsDate: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      pickerOptionsRange: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      tableCf: {
        tableDataEAVisible: false,
        configdata: null,
        editData: null,
        dialogType: ''
      }
    }
  },
  created() {
    if (this.widget.type == 'taglable') {
      this.$nextTick((_) => {
        this.dataModel = this.dynamicTags
      })
    }
    if (
      // 如果获取远程数据属性为真且指定了获取数据的回调函数
      this.widget.options.remote &&
      this.widget.options.remoteFunc
    ) {
      // 执行对应的回调函数
      let remoteData = eval('(' + this.widget.options.remoteFunc + ')')(request)
      console.log(this.widget.options.remoteFunc)
      if (remoteData && typeof remoteData === 'object') {
        this.widget.options.remoteOptions = remoteData.map((item) => {
          //remoteOptions 表单动态选项配置
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      }
    }
    // 七牛图片上传
    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }
    //table
    if (this.widget.type === 'elTable' && this.widget.options.remoteFunc) {
      let temFun = this.getExeCustomFn(this.widget.options.remoteFunc)
      if (temFun) {
        this.handleRemoteFn(temFun)
      }
    }
  },
  methods: {
    /*标签方法*/
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.dataModel = this.dynamicTags
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.dataModel = this.dynamicTags
    },
    /*标签方法*/

    /*单选 多选快捷键方法*/
    radioVisibleFun() {
      this.radioVisible = false
    },
    radioFun() {
      const keyType = event.type
      const keyCode = event.keyCode
      //console.log(this.widget)
      if (keyType == 'keydown' && keyCode == '32') {
        console.log('这是一个space键操作......')
        this.radioVisible = true
      } else if (keyType == 'click') {
        this.radioVisible = true
      }
    },
    /*单选 多选快捷键方法*/

    /*摄像头*/
    cameraVisibleFun() {
      this.cameraVisible = false
    },
    oncameraimage(val) {
      this.cameraimage = val
    },
    /*摄像头*/
    cameraFun() {
      this.cameraVisible = true
    },
    focus() {
      // this.$on("focus",function(){
      //   focus()
      // })
    },
    showTips(msg) {
      this.$message({
        showClose: true,
        duration: 5000,
        message: msg
      })
    },
    /*密码相关方法*/
    passwordKeyup(event) {
      if (
        event.keyCode != 13 &&
        event.keyCode != 8 &&
        this.widget.options.peripheral &&
        this.widget.options.peripheral == true
      ) {
        this.dataModel = ''
        //alert("请用外设键盘输入")
        this.$notify({
          title: 'fail',
          message: '请用外设键盘输入',
          type: 'info',
          duration: 2000
        })
      }
    },
    //身份证   peripheral
    peripheral() {
      var _this = this
      function peripheralreq() {
        var paraObj = {}
        if (_this.widget.type == 'idencard') {
          paraObj.para1 = 'GNQ_04'
          paraObj.para2 = ''
        } else if (
          _this.widget.type == 'readcard' &&
          _this.widget.options.cardType == '01'
        ) {
          paraObj.para1 = 'GNQ_10'
          const para2Obj = {}
          ;(para2Obj.tradeCode = '0101'), //四位交易码
            (para2Obj.cardInfoPara = 'AA'), //两位参数具体如下
            (paraObj.para2 = JSON.stringify(para2Obj))
        } else if (
          _this.widget.type == 'readcard' &&
          _this.widget.options.cardType == '02'
        ) {
          paraObj.para1 = 'GNQ_05'
          paraObj.para2 = ''
        } else if (_this.widget.type == 'password') {
          paraObj.para1 = 'GWQ_11'
          paraObj.para2 = '01234567890123' //字符串第一位为标志位 0-请输入密码 1-请再次输入密码，标志位后面是待加密数据，一般为银行账号
        } else if (_this.widget.type == 'againpassword') {
          paraObj.para1 = 'GWQ_11'
          paraObj.para2 = '11234567890123' //字符串第一位为标志位 0-请输入密码 1-请再次输入密码，标志位后面是待加密数据，一般为银行账号
        }

        return new Promise(function (resolve, reject) {
          try {
            const idenTemp = smartClient.allDevice(paraObj.para1, paraObj.para2)
            resolve(idenTemp)
          } catch (err) {
            console.log(err)
            //alert('请连接设备或手输')
            _this.$notify({
              title: 'fail',
              message: '请连接设备',
              type: 'info',
              duration: 2000
            })
          }
        })
      }
      peripheralreq().then((idenTemp) => {
        if (idenTemp) {
          const idenTempObj = JSON.parse(idenTemp)
          //alert(idenTempObj)
          if (idenTempObj.rCode == 0) {
            if (this.widget.type == 'idencard') {
              this.dataModel = idenTempObj.idInfo.IDNumber
            } else if (
              this.widget.type == 'readcard' &&
              this.widget.options.cardType == '01'
            ) {
              this.dataModel = idenTempObj.cardInfo.cardNO
            } else if (
              this.widget.type == 'readcard' &&
              this.widget.options.cardType == '02'
            ) {
              this.dataModel = idenTempObj.szTrack2
              //todo szTrack3 暂时不知道可不可用
              var szTrack3 = idenTempObj.szTrack3
            } else if (
              this.widget.type == 'password' ||
              this.widget.type == 'againpassword'
            ) {
              this.dataModel = idenTempObj.password
            }
          } else {
            alert('检测失败：' + idenTemp)
          }
        } else {
          alert('无')
        }
      })
    },
    inputHandler(refId) {
      // const keyType = event.type;
      // const keyCode = event.keyCode;
      // console.log('event.keyType',event.type);
      // console.log('event.keyCode',event.keyCode);
      if (event.type == 'focus') {
        this.amountvisible = !!this.dataModel
        let amountObj = getInputValue(this.models[this.widget.model])
        this.bigPastAdjustFee = amountObj.bigPastAdjustFee
      }
      if (typeof refId == 'string') {
        const refsId = this.$refs[refId]
        // console.log('refsid',refsId)
        // refsId._dot = 2;
        refsId.maxLength = 12
        InputMoney(refsId)
      }
      this.$emit('el-focus', this.widget.model)
    },
    keyupHandler(refId) {
      if (typeof refId == 'string') {
        const refsId = this.$refs[refId]
        this.amountvisible = !!this.dataModel
        let amountObj = getInputValue(refsId.value)
        this.bigPastAdjustFee = amountObj.bigPastAdjustFee

        console.log('value', refsId.value)
        this.dataModel = refsId.value
        this.amountvisible = !!this.dataModel
      }
    },
    enterHandler(refId) {
      console.log('这是一个enter键操作...')
      const refsId = this.$refs[refId]
      this.amountvisible = false
      this.dataModel = delcommafy(refsId.value)
      this.$emit('el-change', this)
    },
    blurHandler() {
      this.amountvisible = false
      this.$emit('el-blur', this.widget.model)
    },
    /*下拉框*/
    // select下拉框的change事件
    handleWeekChange(val) {
      if (this.widget.options.multiple) {
        var weekList = this.widget.options.remote
          ? this.widget.options.remoteOptions
          : this.widget.options.options
        weekList.forEach((v) => {
          v.isCheck = false
        })
        val.forEach((el) => {
          weekList.forEach((v) => {
            if (el === v.value) {
              v.isCheck = true
            }
          })
        })
        this.widget.options.remote
          ? (this.widget.options.remoteOptions = weekList)
          : (this.widget.options.options = weekList)
      }
    },
    clickCheckbox(e) {
      e.preventDefault()
    },
    /*下拉框*/

    /*摄像头*/
    camera() {
      var _this = this
      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        console.log(devices)
        _this.cameraList = []
        devices.forEach(function (device) {
          if (device.kind == 'videoinput') {
            _this.cameraList.push({
              label: device.label,
              value: device.deviceId
            })
          }
        })
      })
    },
    /*摄像头*/

    /*按钮*/
    buttonfun(event_name, title) {
      if (this.widget.options.buttonfun) {
        try {
          var buttonfun = this.widget.options.buttonfun
          if (buttonfun.indexOf('function') != -1) {
            //执行函数
            let tempFunc = eval('(' + buttonfun + ')')
            //console.log(tempFunc);
            var result = tempFunc()
          } else {
            //调用方法
            this[buttonfun](title)
          }
        } catch (error) {
          console.log(error)
        }
      } else if (this.widget.options.buttonurl) {
        window.location = this.widget.options.buttonurl
      }
    },
    /*按钮*/

    getBase64Image(img) {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      return dataURL
    },

    //自定义数据来源方法解析函数
    handleRemoteFn(fn) {
      var _this = this
      try {
        fn.call(this, this, request, function (tableCfData) {
          if (_this.widget.configdata.list) {
            let tempTableCf = _this.widget.configdata.list[0]
            if (tableCfData instanceof Array) {
              tempTableCf.options.tableData = tableCfData //??
            } else {
              tempTableCf.options.tableData = JSON.parse(
                tableCfData.records[0].listContent
              ).list[0].options.tableData
            }
            //带有分页
            if (_this.widget.options.isPagination === true) {
              _this.widget.options.pagination.pageSize = tableCfData.size
              _this.widget.options.pagination.currentPage = tableCfData.current
              _this.widget.options.pagination.total = tableCfData.total
            }
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    dblhandleCurrentRow(row, column, event) {
      // if (this.widget.options.isDetail) {
      //   if (this.widget.options.isDetailCustom) {
      //     if (this.widget.options.detailFn) {
      //       this.widget.options.detailFn(this, request, function(data) {
      //         console.log(data);
      //       });
      //     }
      //   } else {
      // this.$message(JSON.stringify(row));
      this.handleTableEvent('detail', row)
      //   }
      // }
    },
    handleTableEvent(action, currentRow) {
      let _self = this
      switch (action) {
        case 'add':
          if (this.widget.options.isAddBtnCustom) {
            if (this.widget.options.addFn) {
              let temFun = this.getExeCustomFn(this.widget.options.addFn)
              if (temFun) {
                temFun(this, request, function (data) {
                  console.log(data)
                })
              }
            }
          } else {
            let addFormId = this.widget.options.addFormId
            if (addFormId == '') {
              this.$message('请配置表单编码')
              return
            }
            this.tableCf.dialogType = 'add'
            getFormConfigDataById.call(this, addFormId, (data) => {
              if (data && data.formContent) {
                this.tableCf.configdata = JSON.parse(data.formContent)
              }
              this.$emit('toggleGenerate', this.tableCf.configdata)
              this.tableCf.tableDataEAVisible = true
            })
          }
          break
        case 'edit':
          let editFormId = this.widget.options.editFormId
          let selecteRow = this.widget.configdata.list[0].options
            .multipleSelection
          if (
            (selecteRow && selecteRow.length != 1) ||
            typeof selecteRow == 'undefined'
          ) {
            this.$message('请选择一行数据')
            return
          } else {
            this.tableCf.editData = selecteRow[0]
            this.$emit('toggleGenerate', selecteRow[0])
          }
          if (this.widget.options.isEditBtnCustom) {
            if (this.widget.options.editFn) {
              let temFun = this.getExeCustomFn(this.widget.options.editFn)
              if (temFun) {
                temFun(this, request, function (data) {
                  console.log(data)
                })
              }
            }
          } else {
            if (editFormId == '') {
              this.$message('请配置表单编码')
              return
            }
            this.tableCf.dialogType = 'edit'
            getFormConfigDataById.call(this, editFormId, function (data) {
              if (data && data.formContent) {
                _self.tableCf.configdata = JSON.parse(data.formContent)
                _self.$emit('toggleGenerate', _self.tableCf.configdata)
                _self.tableCf.tableDataEAVisible = true
              }
            })
          }
          break
        case 'detail':
          let detailFormId = this.widget.options.detailFormId
          let dbSelecteRow = currentRow
          if (dbSelecteRow == '' || dbSelecteRow == null) {
            this.$message('无数据')
            return
          } else {
            this.tableCf.editData = dbSelecteRow
          }
          if (this.widget.options.isDetailCustom) {
            if (this.widget.options.detailFn) {
              let temFun = this.getExeCustomFn(this.widget.options.detailFn)
              if (temFun) {
                temFun(this, request, function (data) {
                  console.log(data)
                })
              }
            }
          } else {
            if (detailFormId == '') {
              this.$message('请配置表单编码')
              return
            }
            this.tableCf.dialogType = 'detail'
            this.tableCf.tableDataEAVisible = true
            getFormConfigDataById.call(this, detailFormId, function (data) {
              if (data && data.formContent) {
                _self.tableCf.configdata = JSON.parse(data.formContent)
              }
            })
          }
          break
        case 'delete':
          let selecteDeleRow = this.widget.configdata.list[0].options
            .multipleSelection
          if (
            (selecteDeleRow && selecteDeleRow.length < 1) ||
            typeof selecteDeleRow == 'undefined'
          ) {
            this.$message('请至少选择一行数据')
            return
          } else {
            if (this.widget.options.isDeleteBtnCustom) {
              if (this.widget.options.deleteFn) {
                let temFun = this.getExeCustomFn(this.widget.options.deleteFn)
                if (temFun) {
                  temFun(this, request, function (data) {
                    console.log(data)
                  })
                }
              }
            } else {
              let tragtTableData = this.widget.configdata.list[0].options
                .tableData
              if (tragtTableData && tragtTableData.length > 0) {
                tragtTableData.map((item, index) => {
                  selecteDeleRow.map((j) => {
                    if (item.id === j.id) {
                      tragtTableData.splice(index, 1)
                    }
                  })
                })
              }
            }
          }

          break
        default:
          console.log(action)
      }
    },
    getExeCustomFn(fun) {
      let temFen = null
      try {
        temFen = eval('(' + fun + ')')
      } catch (e) {
        console.log(e)
      }
      return temFen
    },
    displayColumnsChange() {
      let columns = []
      let flag = false
      if (this.widget.configdata) {
        columns = this.widget.configdata.list[0].options.columns
        columns.map((c) => {
          if (this.widget.options.displayColumns) {
            flag = this.widget.options.displayColumns.includes(c.prop)
            if (flag) {
              c.isDisplay = true
            } else {
              c.isDisplay = false
            }
          }
        })
      }
    },
    closeTableDataEA() {
      this.tableCf.tableDataEAVisible = false
      this.$emit('close-dialog')
    },
    handelTableDataEA() {
      let type = this.tableCf.dialogType
      let tempTableData = this.$refs.addEditForm.models
      let tragtTableData = this.widget.configdata.list[0].options.tableData
      if (type == 'add') {
        if (tempTableData) {
          tragtTableData.push(tempTableData)
        }
      } else if (type == 'edit') {
        if (tragtTableData && tragtTableData.length > 0) {
          tragtTableData.map((item) => {
            if (
              item.id === tempTableData.id ||
              item.listCode == tempTableData.listCode
            ) {
              for (let key in tempTableData) item[key] = tempTableData[key]
            }
          })
        }
      }
      this.closeTableDataEA()
    }
  },
  mounted() {
    if (this.widget.type == 'camera') {
      this.camera()
    } else if (
      this.widget.type == 'buttonCom' &&
      (this.widget.options.buttontext || this.widget.options.defaultValue)
    ) {
      this.$refs.buttonSpanRef.textContent = this.widget.options.buttontext
        ? this.widget.options.buttontext
        : this.widget.options.defaultValue
    } else if (
      this.widget.type == 'alink' &&
      (this.widget.options.buttontext || this.widget.options.defaultValue)
    ) {
      this.$refs.alinkSpanRef.textContent = this.widget.options.buttontext
        ? this.widget.options.buttontext
        : this.widget.options.defaultValue
    } else if (this.widget.type == 'imageshow') {
      this.dataModel = this.imagesrc = require('../assets/' +
        this.widget.options.imagesrc)

      /*var img = "D:\\jcbankWork\\form-making-secondary\\src\\assets\\wenjian.png";
          var image = new Image();
          image.crossOrigin = '';
          image.src = img;
          image.onload = function(){
              var base64 = this.getBase64Image(image);
              console.log(base64);
          }*/
    }
  },
  watch: {
    dataModel: {
      // 深度监听组件绑定的数据，执行赋值操作并发射更新models的事件，发射input-change事件，将值和对应的key传入
      deep: true,
      immediate: true,
      handler(val) {
        // console.log(val)
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      // 深度监听models，models修改时读取修改后的值赋值给dataModel
      deep: true,
      immediate: true,
      handler(val) {
        console.log(val)
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/*金额放大镜*/
.mglass {
  width: 100%;
  position: absolute;
  left: 0;
  top: 34px;
  z-index: 1111;
  color: #fff;
  padding: 5px 10px;
  font-size: 13px;
  border: 1px solid #55a532;
  background: #55a532;
  .mglass-data {
    font-size: 20px;
    color: yellow;
    font-weight: bold;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

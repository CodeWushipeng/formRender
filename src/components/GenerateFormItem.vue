<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <!-- widget: {{widget}} -->
      <!-- {{rules}} -->
      <!--金额控件-->
      <template v-if="widget.type == 'amount'">
          <!--放大镜-->
          <transition name="fade">
              <div v-if="widget.options.amountmoney && amountvisible" class="mglass">
                  <div class="mglass-data">{{dataModel}} <br></div>
                  <div class="mglass-big">{{bigPastAdjustFee}}</div>
              </div>
          </transition>
          <div class="el-input el-input--small">
              <input class="el-input__inner"
                     @keydown="inputHandler(widget.key)"
                     @focus="inputHandler(widget.key)"
                     @keyup="keyupHandler(widget.key)"
                     @keyup.enter="enterHandler(widget.key)"
                     @blur="blurHandler()"
                     :ref="widget.key"
                     v-model="dataModel" type="text">
          </div>
      </template>
        <!--密码-->
      <template v-if="widget.type == 'password'">
          <el-input
                  type="password"
                  v-model="dataModel"
                  :disabled="widget.options.disabled"
                  :placeholder="widget.options.placeholder"
                  :style="{width: widget.options.width}"
                  @keyup.native.enter="change"
                  :ref="widget.model"
          ><el-button v-if="widget.options.tips" slot="prepend" icon="el-icon-question" @click="showTips(widget.options.tips)"></el-button></el-input>
      </template>
      <!--确认密码-->
      <template v-if="widget.type == 'againpassword'">
          <el-input
                  type="password"
                  v-model="dataModel"
                  :disabled="widget.options.disabled"
                  :placeholder="widget.options.placeholder"
                  :style="{width: widget.options.width}"
                  @keyup.native.enter="change"
                  :ref="widget.model"
          ><el-button v-if="widget.options.tips" slot="prepend" icon="el-icon-question" @click="showTips(widget.options.tips)"></el-button></el-input>
      </template>

    <template v-if="widget.type == 'input'">
      <!-- <el-popover
        width="500"
        placement="top-start"
        trigger="hover"
        v-if="!widget.options.disabled"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
        <el-button :style="{'border':'0'}" slot="reference" icon="el-icon-question"></el-button>
      </el-popover> -->
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        type="number"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      ></el-input>

      <!-- dataType为组件类型 dataModel为双向绑定的数据 -->
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        @keyup.native.enter="change"
        :ref="widget.model"
      ><el-button v-if="widget.options.tips!=''" @click="showTips(widget.options.tips)" slot="prepend" icon="el-icon-question"></el-button></el-input>
    </template>

    <!--身份证-->
    <template v-if="widget.type == 'idencard' | widget.type == 'readcard'">
      <el-input
              :type="widget.options.dataType"
              v-model="dataModel"
              :disabled="widget.options.disabled"
              :placeholder="widget.options.placeholder"
              :style="{width: widget.options.width}"
      ><el-button v-if="widget.options.ifperipheral" slot="prepend" icon="el-icon-question" @click="indentcart()">读取</el-button></el-input>
    </template>

    <template v-if="widget.type == 'singletext'">
      <el-input
              autosize
          :type="widget.options.dataType"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :ref="widget.model"
          :maxlength="widget.options.textarealength"
          show-word-limit
      ></el-input>
    </template>
    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea"
        :autosize="widget.options.textareaautosize ? { minRows: widget.options.textarearowmin, maxRows: widget.options.textarearowmax} : ''"
        :maxlength="widget.options.textarealength"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        show-word-limit
        @keyup.native.ctrl.enter="areaHandel"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :step="widget.options.step"
        controls-position="right"
        :disabled="widget.options.disabled"
        @keyup.native.enter="change"
      ></el-input-number>
    </template>

    <!--标签组件-->
    <template v-if="widget.type == 'taglable'">
      <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
              @click.native="radioFun"
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      >
        <el-radio
            @keydown.space.native="radioFun"
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
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
          <radioFormItem insite="true" v-if="radioVisible" @on-close1="radioVisibleFun" :models.sync="models" :widget="widget"  ref="radioForm">

              <template v-slot:blank="scope">
                  Width <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
                  Height <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
              </template>
          </radioFormItem>

          <template slot="action">
              <span></span>
          </template>
      </cus-dialog>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"

      >
        <el-checkbox
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
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
        :style="{width: widget.options.width}"
        @keyup.native.enter="change"
      ></el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
        v-bind:picker-options="widget.options.type == 'date' ? pickerOptionsDate : (widget.options.type == 'daterange' ? pickerOptionsRange :'') "
        @keyup.native.enter="change"
      ></el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
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
        <!--remoteOptions:{{widget.options.remoteOptions}}-->
      <el-select
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :filterable="widget.options.filterable"
      >
        <el-option
          v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="item.value"
          :value="item.value"
          :label="widget.options.showLabel || widget.options.remote?item.label:item.value">
          <span style="float: left">{{ widget.options.showLabel || widget.options.remote?item.label:item.value }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
        <span>{{dataModel}}</span>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch v-model="dataModel" :disabled="widget.options.disabled"></el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :style="{'width': widget.options.width}"
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

    <template v-if="widget.type == 'editor'">
      <vue-editor v-model="dataModel" :style="{width: widget.options.width}"></vue-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :options="widget.options.remoteOptions"
      ></el-cascader>
    </template>

    <template v-if="widget.type == 'text'">
      <span>{{dataModel}}</span>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from "./Upload";
import CusDialog from './CusDialog'
import radioFormItem from './radioFormItem'
import { getInputValue , delcommafy} from '../util/comother.js'
import {InputMoney} from '../util/amtUtil';
import request from "../util/request.js";
export default {
  props: ["widget", "models", "rules", "remote"],    // widget为当前组件json数据
  components: {
    FmUpload,
    CusDialog,
    radioFormItem
  },
  data() {
    return {
      radioVisible:false,
      amountvisible:false, // 控制金额放大镜的显隐
      dataModel: this.models[this.widget.model],   // 当前组件的默认值，是双向绑定的
        pickerOptionsDate: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                    picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }]
        },
        pickerOptionsRange: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }]
        },
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
    };
  },
  created() {
    if(this.widget.type == 'taglable'){
        this.$nextTick(_ => {
            this.dataModel = this.dynamicTags
        })
    }
    if (
      // 如果获取远程数据属性为真且指定了获取数据的回调函数
      this.widget.options.remote &&
      this.remote[this.widget.options.remoteFunc]
    ) {
      // 执行对应的回调函数
      this.remote[this.widget.options.remoteFunc](data => {     //this.remote为所有回调函数组成的json对象
        this.widget.options.remoteOptions = data.map(item => {  //remoteOptions 表单动态选项配置
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          };
        });
      });
    }
    // 七牛图片上传
    if (this.widget.type === "imgupload" && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc](data => {
        this.widget.options.token = data;
      });
    }
  },
  methods: {
      /*标签方法*/
      handleClose(tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          this.dataModel = this.dynamicTags
      },
      showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
          });
      },
      handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
              this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
          this.dataModel = this.dynamicTags
      },
      /*标签方法*/

      /*单选 多选快捷键方法*/
      radioVisibleFun(){
          this.radioVisible = false

      },
      radioFun () {
          const keyType = event.type;
          const keyCode = event.keyCode;
          //console.log(this.widget)
          debugger
          if(keyType == 'keydown' && keyCode =='32'){
              console.log("这是一个space键操作......")
              this.radioVisible = true
          }else if(keyType == 'click'){
              this.radioVisible = true
          }
      },
      /*单选 多选快捷键方法*/

      focus(){
          // this.$on("focus",function(){
      //   focus()
      // })
    },
    showTips(msg){
      this.$message({
          showClose: true,
          duration: 5000,
          message: msg
        });
    },
    // element change事件，回车和失去焦点时触发
    change(){
      // 出发change事件时发射 el-change事件，generateform组件监听该事件
      this.$emit("el-change",this)
    },
    // textarea ctrl+enter事件
    areaHandel(e){
      this.$emit("text-enter",this)
    },
    blurHandler() {
        this.amountvisible = false;
    },
      //身份证
    async indentcart() {
        var paraObj = {};
        if(this.widget.type == "idencard"){
            paraObj.para1 = 'GNQ_04'
            paraObj.para2 = ''
        }else if(this.widget.type == "readcard" && this.widget.options.cardType == "01"){
            paraObj.para1 = 'GNQ_10'
            const para2Obj = {}
            para2Obj.tradeCode = '0101', //四位交易码
            para2Obj.cardInfoPara = 'AA', //两位参数具体如下
            paraObj.para2 = JSON.stringify(para2Obj)
        }else if(this.widget.type == "readcard" && this.widget.options.cardType == "02"){
            paraObj.para1 = 'GNQ_05'
            paraObj.para2 = ''
        }
        const idenTemp = await smartClient.allDevice(paraObj.para1,paraObj.para2)
        if(idenTemp){
            const idenTempObj = JSON.parse(idenTemp);
            //alert(idenTempObj.rCode)
            if(idenTempObj.rCode == 0){
                if(this.widget.type == "idencard"){
                    this.dataModel = idenTempObj.idInfo.IDNumber
                }else if(this.widget.type == "readcard" && this.widget.options.cardType == "01"){
                    this.dataModel = idenTempObj.cardInfo.cardNO
                }else if(this.widget.type == "readcard" && this.widget.options.cardType == "02"){
                    this.dataModel = idenTempObj.szTrack2
                    //todo szTrack3 暂时不知道可不可用
                    var szTrack3  = idenTempObj.szTrack3
                }
            }else{
                alert("检测失败：" + idenTemp)
            }
        }else{
            alert("无")
        }
    },
    inputHandler(refId) {
        // const keyType = event.type;
        // const keyCode = event.keyCode;
        // console.log('event.keyType',event.type);
        // console.log('event.keyCode',event.keyCode);

        this.amountvisible = !!this.dataModel;
        let amountObj = getInputValue(this.models[this.widget.model]);
        this.bigPastAdjustFee = amountObj.bigPastAdjustFee;
        if (typeof refId == 'string') {
            const refsId = this.$refs[refId];
            // console.log('refsid',refsId)
            // refsId._dot = 2;
            refsId.maxLength = 12;
            InputMoney(refsId);
        }
      },
      keyupHandler(refId){
          if (typeof refId == 'string') {
              const refsId = this.$refs[refId];
              // console.log('value',refsId.value)
              this.dataModel  = refsId.value;
              this.amountvisible = !!this.dataModel;
          }
      },
      enterHandler(refId){
          console.log("这是一个enter键操作...")
          const refsId = this.$refs[refId];
          this.amountvisible = false;
          this.dataModel  = delcommafy(refsId.value);
      },
  },
  watch: {
    dataModel: {
      // 深度监听组件绑定的数据，执行赋值操作并发射更新models的事件，发射input-change事件，将值和对应的key传入
      deep: true,
      handler(val) {
        this.models[this.widget.model] = val;
        this.$emit("update:models", {
          ...this.models,
          [this.widget.model]: val
        });
        this.$emit("input-change", val, this.widget.model);
      }
    },
    models: {
      // 深度监听models，models修改时读取修改后的值赋值给dataModel
      deep: true,
      handler(val) {
        this.dataModel = val[this.widget.model];
        console.log(this.dataModel)
        // setTimeout(()=>{
        //     this.remoteFunc()
        // },200)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
    .mglass{
        color: #fff;
        padding: 10px;
        font-size: 13px;
        border: 1px solid #55a532;
        background: #55a532;
        .mglass-data {
            font-size: 20px;
            color: yellow;
            font-weight: bold
        }
        .mglass-big {

        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
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

<template>
  <div class="form-wrap" ref="renderForm">
    <!--jsonData: {{jsonData}}-->
    <!--<hr>-->
    <!--list: {{ configdata.list }}-->
    <!--formdata: {{formdata}}-->
    <!--tempValue: {{tempValue}}-->
    <!--<hr>-->
    <fm-generate-form
      :remote="remoteFuncs" v-loading="loading"
      :data="jsonData"
      :value="formdata"
      :readOnly="readOnly"
      @isEnd="accept"
      ref="generateForm"
    ></fm-generate-form>
    <div id="flowButtons" @click.capture="checkForm">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import { Loading } from "element-ui";
import fmGenerateForm from "./GenerateForm";
import { queryFromDefineById } from "../api/forms";
import handler from "./mixins/renderHandle";
import { RES_OK,RES_OK_SEC} from "@/api/config";
export default {
  name: "render-form",
  components: {
    fmGenerateForm,
  },
  props: {
    configdata: {
      type: Object,
      default: () => {},
    },
    remoteFuncs: {
      type: Object,
      default: () => {},
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    url: {
      // 查询表单的服务
      type: String,
      default: () => "",
    },
  },
  mixins: [handler],
  data() {
    return {
      jsonData: {},
      tempValue: {}, //处理流控数据的变量
      formdata: {},
      dyData: {}, //动态数据
      loading:false,
    };
  },
  created() {
    console.log("created...", this.configdata);
    this._inits();
  },
  destroyed() {
    // console.error(
    //   "===============================destroyed......==============================="
    // );
  },
  computed: {
    nodesLength() {
      return this.configdata && this.configdata.list.length > 0;
    },
    // input_config() {
    //   if (this.configdata && this.configdata.list.length > 0) {
    //     const {
    //       inputConfig,
    //       checkStart,
    //       nodeCode,
    //       nextNode,
    //     } = this.configdata.list[0];
    //     return {
    //       inputConfig,
    //       checkStart,
    //       nodeCode,
    //       nextNode,
    //     };
    //   }
    // },
  },
  methods: {
    // 点击流控按钮时检测表单状态
    checkForm(){
      this.$refs.generateForm.getData()
    },
    accept(params){
      console.log(params)
      this.$emit("has-end",params)
    },
    showLoading() {
      this.loading = true;
    },
    hideLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500);
    },
    _inits() {
      console.log("_inits===============================");

      // 1
      const { platform, user, indata, list, rollbackData } = this.configdata;
      this.dyData = { platform, user,indata };

      // 2 判断是否有回退数据
      this.tempValue =
        Object.keys(rollbackData).length > 0
          ? rollbackData
          : this.getInputData();

      // 3
      if (list instanceof Array && list.length > 0 && list[0]) {
        const { inputFormCode } = list[0];
        if (!inputFormCode) {
          this.$notify.error({
            title: "消息",
            message: "表单名称inputFormCode不能为空",
          });
          return;
        }
        this.showLoading();
        queryFromDefineById({formCode: inputFormCode })
          .then((res) => {
            debugger
            console.log("=====form-making-secondary===res============", res);
            const { rspCode } = res.header;
            let formContent;
            if (rspCode == RES_OK) {
              let formContent = res.body.define.formContent;
              // const rest = res.body.define;
              if (formContent) {
                /*if(typeof rest.records === 'string'){
                  const tempArr = new Array(JSON.parse(rest.records.slice(1,-1)));
                  formContent = tempArr[0]["formContent"]
                }else if (Array.isArray(rest.records)){
                  formContent = rest.records[0]["formContent"];
                }*/
                // 设置数据
                let temp =  typeof formContent == "string"
                    ? JSON.parse(formContent)
                    : formContent;
                    console.log("temp", temp);
                this.flatGridData(temp);
                this.handleDynamicData(temp);
                this.handleDynamicInFlow(temp);
                this.jsonData = temp;

                console.log("jsonData", this.jsonData);
              } else {
                this.$notify.error({
                  title: "消息",
                  message: "没有搜索到数据",
                });
              }
            } else {
              this.$notify.error({
                title: "消息",
                message: "查询失败",
              });
            };
            this.hideLoading();
          })
          .catch((error) => {
            this.hideLoading();
            console.log(error);
          });
      }
    },
    // 处理流控数据中带有的动态数据
    handleDynamicInFlow(temp) {
      // debugger
      // console.log(this.tempValue, this.formdata);
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      var indata = this.dyData.indata;
      let formLists = temp.list;
      for (let i = 0; i < formLists.length; i++) {
        for (let key in this.tempValue) {
          if (formLists[i].type == "grid") {
            formLists[i].columns.forEach((element) => {
              element.list.forEach((item) => {
                if (item.model == key) {
                  item.options.defaultValue = this.tempValue[key];
                }
              });
            });
          } else {
            if (formLists[i].model == key) {
              formLists[i].options.defaultValue = this.tempValue[key];
            }
          }
        }
      }
    },
    //  动态数据处理函数
    handleDynamicData(temp) {
      // debugger
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      var indata = this.dyData.indata;
      let formLists = temp.list;
      // console.log(this.dyData);
      for (let i = 0; i < formLists.length; i++) {
        if (formLists[i].type != "grid") {
          if (
            formLists[i].options.defaultValue &&
            formLists[i].options.defaultValue[0] == "@"
          ) {
            var temp = formLists[i].options.defaultValue.substring(1);
            try {
              var tempJson = eval(temp);
            } catch (error) {
              throw new Error(error);
            }
            console.log(tempJson, temp);
            if (tempJson != "" && tempJson != undefined) {
              this.$set(formLists[i].options, "defaultValue", tempJson);
              console.log(formLists[i].options.defaultValue);
            }
          }
        } else if (formLists[i].type == "grid") {
          formLists[i].columns.forEach((element) => {
            element.list.forEach((item) => {
              if (
                item.options.defaultValue &&
                item.options.defaultValue[0] == "@"
              ) {
                var temp = item.options.defaultValue.substring(1);
                try {
                  var tempJson = eval(temp);
                } catch (error) {
                  throw new Error(error);
                }
                console.log(tempJson, temp);
                if (tempJson != "" && tempJson != undefined) {
                  this.$set(item.options, "defaultValue", tempJson);
                  console.log(item.options.defaultValue);
                }
              }
            });
          });
        }
      }
    },

    // 响应页面
    changeJsonData(outputFromCode, outputCofig = {}) {
      console.log("outputFromCode", outputFromCode);
      if (outputFromCode) {
        this.showLoading();
      } else {
        return false;
      }
      queryFromDefineById({ formCode: outputFromCode })
        .then((res) => {
          const { rspCode } = res.header;
          this.hideLoading();
          if (rspCode == RES_OK || rspCode == RES_OK_SEC) {
            const rest = res.body.define;
            if (rest && rest.records) {
              // const formContent = rest.records[0]["formContent"];
              let formContent
              if(typeof rest.records === 'string'){
                  const tempArr = new Array(JSON.parse(rest.records.slice(1,-1)));
                  formContent = tempArr[0]["formContent"]
                }else if (Array.isArray(rest.records)){
                  formContent = rest.records[0]["formContent"];
                }
              const temp =
                typeof formContent == "string"
                  ? JSON.parse(formContent)
                  : formContent;
              if (outputCofig) {
                this.tempValue = this._solveConfigJs(outputCofig);
              } else {
                this.tempValue = {};
              }
              this.handleDynamicData(temp);
              this.handleDynamicInFlow(temp);
              this.jsonData = temp;
              outputCofig &&
                console.log(
                  "this._solveConfigJs(outputCofig)",
                  this._solveConfigJs(outputCofig)
                );
            } else {
              this.$notify.error({
                title: "消息",
                message: "没有搜索到数据",
              });
            }
          } else {
            this.$notify.error({
              title: "消息",
              message: "响应页面失败",
            });
          }
        })
        .catch((err) => {
          this.hideLoading();
          throw new Error(err);
        });
    },
    // 处理配置数据js代码
    _solveConfigJs(JsCode) {
      try {
        const { platform, user,indata, nodes, utils } = this.configdata;
        console.log("{ platform, user,indata, nodes, utils} ", {
          platform,
          user,
          indata,
          nodes,
          utils,
        });
        // console.log('{ configdata} ',JSON.stringify(this.configdata))
        const resCode = `function _execute(user, platform, indata, nodes, utils){  ${JsCode}  return main(...arguments);}`;
        const exeCode = eval("(" + resCode + ")");
        let rs = exeCode(user, platform, indata, nodes, utils);
        return rs;
      } catch (error) {
        console.log(JsCode);
        throw new Error(error);
      }
    },

    // 将流控引擎input数据绑定到value
    getInputData() {
      const { list } = this.configdata;
      if (list && list.length > 0 && list[0]) {
        const { inputConfig } = list[0]; // 注入数据
        if (!inputConfig) return {};
        let transObj = this._solveConfigJs(inputConfig);
        console.log("transObj", JSON.stringify(transObj));
        return transObj;
      }
      return {};
    },

    // 返回form表单键值对数据
    getFormData() {
      return this.$children[0].getData();
    },
    // 获取表单数据
    getData() {
      return this.$refs.generateForm.getData();
    },
  },
  watch: {
    "configdata.list": {
      deep: true,
      handler(list) {
        this._inits();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrap {
  margin-top: 20px;
}
</style>

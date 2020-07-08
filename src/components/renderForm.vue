<template>
  <div
    class="form-wrap"
    ref="renderForm"
  >
      <!--jsonData: {{jsonData}}-->
      <!--<hr>-->
      <!--formdata: {{formdata}}-->
      tempValue: {{tempValue}}
      <!--<hr>-->
    <fm-generate-form
      :remote="remoteFuncs"
      :data="jsonData"
      :value="formdata"
      ref="generateForm"
    >
    </fm-generate-form>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import fmGenerateForm from "./GenerateForm";
import { getFormList } from '../api/forms';
import handler from "../components/render";
export default {
  name: "render-form",
  components: {
    fmGenerateForm,
  },
    props:{
        configdata: {
            type: Object,
            default:()=>{}
        },
        remoteFuncs: {
            type: Object,
            default:()=>{}
        },
        url: { // 查询表单的服务
            type: String,
            default:()=> ''
        },
    },
  mixins: [handler],
  data() {
    return {
      jsonData: {},
      tempValue: {}, //处理流控数据的变量
      formdata: {},
      dyData: {}, //动态数据
      loadingInstance:null
    };
  },
  created() {
    console.log('created...',this.configdata);
    this._inits();
  },
  computed: {
    nodesLength() {
      return this.configdata && this.configdata.list.length > 0;
    },
    input_config() {
      if (this.configdata && this.configdata.list.length > 0) {
        const {
          inputConfig,
          checkStart,
          nodeCode,
          nextNode,
        } = this.configdata.list[0];
        return {
          inputConfig,
          checkStart,
          nodeCode,
          nextNode,
        };
      }
    },
  },
  methods: {
      showLoading(){
          this.loadingInstance = Loading.service();
      },
      hideLoading(){
          setTimeout(()=>{
              this.loadingInstance.close();
          },500)
      },
      _reset(){
          this.$refs.generateForm && this.$refs.generateForm.reset();
      },
      _inits() {
          console.log("_inits===============================")

       // 1
      const { platform, user,list,rollbackData } = this.configdata;
      this.dyData = {platform, user};

      // 2 判断是否有回退数据
      this.tempValue = Object.keys(rollbackData).length > 0 ? rollbackData : this.getInputData();

      // 3
      if (list instanceof Array && list.length) {
        const { inputFormCode } = list[0];
        inputFormCode &&
        getFormList(this.url,{ formCode: inputFormCode}).then((res) => {
            console.log('=====form-making-secondary===res============',res)
            const {rspCode} = res;
            if(rspCode=="00000000"){
                const rest = res.define;
                if(rest && rest.records.length>0){
                    const formContent = rest.records[0]['formContent'];
                    // 设置数据
                    let temp = typeof formContent == 'string' ? JSON.parse(formContent) : formContent;
                    this.dynamicData(temp);
                    this.handelDynamicInFlow(temp);
                    this.tranData(temp)
                    this.jsonData = temp;
                    console.log(temp);
                }else{
                    this.$notify.error({
                        title: '消息',
                        message: '没有搜索到数据'
                    });
                }
            }else{
                this.$notify.error({
                    title: '消息',
                    message: '查询失败'
                });
            }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    // 处理流控数据中带有的动态数据
    handelDynamicInFlow(temp) {
      console.log(this.tempValue, this.formdata);
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      let formLists = temp.list;
      for (let i = 0; i < formLists.length; i++) {
        for (let key in this.tempValue) {
          if (formLists[i].model == key) {
            formLists[i].options.defaultValue = this.tempValue[key];
          }
        }
      }
    },
    //  动态数据处理函数
    dynamicData(temp) {
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      let formLists = temp.list;
      // console.log(this.dyData);
      for (let i = 0; i < formLists.length; i++) {
          if (formLists[i].type != "grid"){
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
                // formLists[i].options.defaultValue = tempJson;
                // this.models[formLists[i].model] = tempJson
                console.log(formLists[i].options.defaultValue);
              }
            }
          }
      }
    },

    // 响应页面
    changeJsonData(inputConfig, outConfig = {}) {
      console.log("inputConfig", inputConfig);
        if(inputConfig){
            this.showLoading()
        } else{
            return false;
        }
        getFormList(this.url,{formCode: inputConfig}).then((res) => {
            const {rspCode} = res;
            this.hideLoading()
            if(rspCode=="00000000"){
                const rest = res.define;
                if(rest && rest.records.length>0){
                    const formContent = rest.records[0]['formContent'];
                    const temp = typeof formContent == 'string' ? JSON.parse(formContent) : formContent;
                    this.tempValue = this._solveConfigJs(outConfig);
                    this.jsonData = temp;
                    // this.formdata = this._solveConfigJs(outConfig);
                    this.dynamicData(temp);
                    this.handelDynamicInFlow(temp);

                    console.log('this._solveConfigJs(outConfig)',this._solveConfigJs(outConfig))
                }else{
                    this.$notify.error({
                        title: '消息',
                        message: '没有搜索到数据'
                    });
                }
            }else{
                this.$notify.error({
                    title: '消息',
                    message: '响应页面失败'
                });
            }
        }).catch(err=>{
            throw new Error(err)
            this.hideLoading()
        });
    },
    // 处理配置数据js代码
    _solveConfigJs(JsCode){
        try {
            const { platform, user, nodes, utils} = this.configdata;
            console.log('{ platform, user, nodes, utils} ',{ platform, user, nodes, utils} )
            // console.log('{ configdata} ',JSON.stringify(this.configdata))
            const resCode = `function _execute(user, platform, nodes, utils){  ${JsCode}  return main(...arguments);}`;
            const exeCode = eval("(" + resCode + ")");
            let rs =  exeCode(user,platform,nodes,utils);
            return rs;
        }catch (error) {
            console.log(JsCode);
            throw new Error(error);
        }
    },

    // 将流控引擎input数据绑定到value
    getInputData() {
        const {list} = this.configdata;
        if (list.length) {
            const { inputConfig } = list[0]; // 注入数据
            if(!inputConfig) return {};
            let transObj = this._solveConfigJs(inputConfig);
            console.log('transObj',JSON.stringify(transObj));
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

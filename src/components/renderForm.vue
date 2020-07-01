<template>
  <div
    class="form-wrap"
    ref="renderForm"
  >
      jsonData: {{jsonData}}
      <hr>
    <fm-generate-form
      :remote="remoteFuncs"
      :data="jsonData"
      :value="formdata"
      :dyData="dyData"
      ref="generateForm"
    >
    </fm-generate-form>
  </div>
</template>

<script>
import fmGenerateForm from "./GenerateForm";
import { getFormList } from '../api/forms';

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
        func: {
            type: Object,
            default:()=>{}
        },
        url: { // 查询表单的服务
            type: String,
            default:()=> ''
        },
    },
  data() {
    return {
      jsonData: {},
      tempValue: {}, //处理流控数据的变量
      formdata: {},
      dyData: {}, //动态数据
    };
  },
  created() {
    console.log('created...')
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
    _inits() {
      console.log("init..........");
      const list = this.configdata.list;
      console.log(this.configdata);
      if (list instanceof Array && list.length) {
        const { inputFormCode } = list[0];
        inputFormCode &&
          this._getConfigData(inputFormCode)
            .then((res) => {
                console.log('=====form-making-secondary===res============',res)
                const {rspCode} = res;
                if(rspCode=="00000000"){
                    const rest = res.define;
                    if(rest.length>0){
                        const formContent = res.define[0]['formContent'];
                        const result = typeof formContent == 'string' ? JSON.parse(formContent) : formContent;
                        let temp = result;
                        this.handelDynamicInFlow(temp);
                        this.dynamicData(temp);
                        console.log(temp);
                        this.jsonData = temp;
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
      const { platform, user } = this.setDynamicData();
      this.dyData = {
        platform,
        user,
      };
      this.tempValue = this.getInputData();
    },
    //  动态数据处理函数
    dynamicData(temp) {
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      let formLists = temp.list;
      console.log(this.dyData);
      for (let i = 0; i < formLists.length; i++) {
        if (
          formLists[i].options.defaultValue != "" &&
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
    // 获取表单配置信息
    _getConfigData(inputConfig) {
      if (inputConfig) {
          let data = {
              formCode: inputConfig
          };
           return getFormList(this.url,data)
      } else {
        return false;
      }
    },
    // 响应页面
    changeJsonData(inputConfig, formData = {}) {
      console.log("inputConfig", inputConfig);
        let data = {
            formCode: inputConfig
        };
      inputConfig &&
        this._getConfigData(inputConfig).then((res) => {
            const {rspCode} = res;
            if(rspCode=="00000000"){
                const rest = res.define;
                if(rest.length>0){
                    const formContent = res.define[0]['formContent'];
                    const result = typeof formContent == 'string' ? JSON.parse(formContent) : formContent;
                    this.jsonData = result;
                    this.formdata = formData;
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
        });
    },
    // 将流控引擎input数据绑定到value
    getInputData() {
      console.log("getInputData....inputConfig_BB", new Date());
      const list = this.configdata.list;
      if (list.length) {
        const { inputConfig } = list[0]; // 注入数据
        const funkeys = Object.keys(this.func);
        try {
          if (inputConfig && funkeys.length) {
            let transObj = eval("(" + this.func[inputConfig] + ")")(); //封装
            console.log("transObj", transObj);
            return transObj;
          } else {
            return {};
          }
        } catch (error) {
          throw new Error("inputConfig解析出错", inputConfig);
        }
      }
      return {};
    },
    // 动态数据获取
    setDynamicData() {
      console.log(this.configdata);
      return {
        platform: this.configdata.platform,
        user: this.configdata.user,
      };
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

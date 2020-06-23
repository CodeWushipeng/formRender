<template>
  <div class="form-wrap" ref="renderForm" :configdata="{}">
      <!--item:-->
      <!--{{item}} <hr>-->
      <!--platform: {{platform}}<hr>-->
      <!--user: {{user}}<hr>-->
      <!--nodesLength: {{nodesLength}}<hr>-->
      <!--remoteFuncs： {{Object.keys(remoteFuncs)}}-->
      <div>
          <h3>renderForm:</h3>
      </div>
      formdata: {{JSON.stringify(formdata)}}
      <hr>
      input_config: {{input_config}}
      <hr>
      func: {{func}}
      <hr>
      tempValue:{{tempValue}}
      <hr>
      configdata:{{configdata}}
      <hr>
      <fm-generate-form
              :remote="remoteFuncs"
              :data="jsonData"
              :value="formdata"
              :dyData="dyData"
              ref="generateForm">
      </fm-generate-form>
  </div>
</template>

<script>
import fmGenerateForm from "./GenerateForm";
import request from "../util/request.js";
const formServerHost = "http://localhost:3000";

export default {
  name: "render-form",
  components: {
    fmGenerateForm,
  },
  props: ['configdata', 'remoteFuncs', "func"],
  data() {
    return {
      jsonData: {},
      tempValue:{},
      formdata: {},
      dyData: {}, //流控引擎传入的数据
    };
  },
  created() {
      this._inits();
  },
    computed: {
        nodesLength() {
            return this.configdata && this.configdata.list.length > 0
        },
        input_config() {
            if (this.configdata && this.configdata.list.length > 0) {
                const {input_config, checkstart, node_code, next_node} = this.configdata.list[0];
                return {
                    input_config, checkstart, node_code, next_node
                };
            }
        }
    },
  methods: {
    _inits(){
        console.log("init..........")
        // 1
        const list = this.configdata.list;
        console.log(this.configdata)
        if ((list instanceof Array) && list.length) {
            const {input_config_code} = list[0];
            input_config_code && this._getConfigData(input_config_code).then(res => {
                // this.jsonData = res;
                let temp = res;
                this.dynamicData(temp)
                this.handelDynamicInFlow(temp)
                console.log(temp)
                this.jsonData = temp
            }).catch(error => {
                console.log(error);
            })
        }
        // 2
        const {platform, user} = this.setDynamicData();
        this.dyData = {
            platform,
            user
        };
        console.log(this.dyData)
        // 3
        // this.formdata = {};
        // this.formdata = this.getInputData();
        this.tempValue = this.getInputData()
    },
    //  动态数据处理函数
    dynamicData(temp) {
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      let formLists = temp.list;
      console.log(this.dyData)
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
          console.log(tempJson,temp)
          if (tempJson != "" && tempJson != undefined) {
            this.$set(formLists[i].options,"defaultValue",tempJson)
            // formLists[i].options.defaultValue = tempJson;
            // this.models[formLists[i].model] = tempJson
            console.log(formLists[i].options.defaultValue)
          }
        }
      }
    },
    // 处理流控数据中带有的动态数据
    handelDynamicInFlow(temp) {
      console.log(this.tempValue,this.formdata)
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      for (let key in this.tempValue) {
        if (
          this.tempValue[key].indexOf("@") == 0
        ) {
          var temp = this.tempValue[key].substring(1);
          console.log(temp)
          try {
            var tempJson = eval(temp);
          } catch (error) {
            throw new Error(error);
          }
          console.log(tempJson)
          if (tempJson != "" || tempJson != null) {
            this.tempValue[key]=tempJson;
          }
        }
        this.formdata = this.tempValue
        console.log( "aaaaaaaaaaa"+JSON.stringify(this.formdata))
      }
    },
      // 获取表单配置信息
      _getConfigData(input_config) {
          if (input_config) {
              return request.get(`${formServerHost}/${input_config}`)
          } else {
              return false
          }
      },
      // 响应页面
      changeJsonData(input_config, formData = {}) {
          console.log('input_config', input_config)
          input_config && this._getConfigData(input_config).then(res => {
              this.jsonData = res;
              this.formdata = formData;
          })
      },
      // 将流控引擎input数据绑定到value
      getInputData() {
          console.log('getInputData....input_config_BB', new Date())
          const list = this.configdata.list;
          if (list.length) {
              const {input_config} = list[0]; // 注入数据
              const funkeys = Object.keys(this.func)
              try {
                  if (input_config && funkeys.length) {
                      let transObj = eval("(" + this.func[input_config] + ")")()  //封装
                      console.log('transObj', transObj)
                      return transObj;
                  } else {
                      return {}
                  }
              } catch (error) {
                  throw new Error("input_config解析出错", input_config)
              }
          }
          return {};
      },


    // 获取表单配置信息
    getConfigData(configdata) {
      if (configdata.list[0].input_config_code) {
        let codeId = configdata.list[0].input_config_code;
        return request.get("http://localhost:3000/from", {
          params: {
            id: codeId,
          },
        });
      } else {
        return false;
      }
    },
    // 将流控引擎input数据绑定到value
    _getInputData() {
      try {
        let transObj = eval("(" + this.configdata.list[0].input_config + ")")(); //封装
        // this.formdata = transObj
        return transObj;
      } catch (error) {
        throw new Error("input_config解析出错");
      }
    },


    // 动态数据获取
    setDynamicData() {
      console.log(this.configdata)
        return {
            platform: this.configdata.platform,
            user: this.configdata.user
        }
    },
    // 返回form表单键值对数据
    getFormData() {
      return this.$children[0].getData()
    },
    // 获取表单数据
    getData() {
      return this.$refs.generateForm.getData();
    },
  },
    watch: {
        'configdata.list': {
            deep: true,
            handler(list) {
                // console.warn('=========configdata===========',list)
                this._inits()
            },
        }
    },
};
</script>

<style lang="scss" scoped>
.form-wrap {
  margin-top: 20px;
}
</style>

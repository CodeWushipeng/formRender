<template>
  <div class="form-wrap" ref="renderForm" :configdata="{}">
    <fm-generate-form
      :data="jsonData"
      :value="formdata"
      :dyData="dyData"
      ref="generateForm"
    ></fm-generate-form>
  </div>
</template>

<script>
// input_config对应的函数值
function input_config_EE() {
  return {
    amount: "流控数据",
    transferType: "platform.transferType",
    user: "622002",
  };
}
import fmGenerateForm from "./GenerateForm";
import request from "../util/request.js";
export default {
  name: "render-form",
  components: {
    fmGenerateForm,
  },
  props: {
    configdata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      jsonData: {},
      tempValue:{},
      formdata: {
        sex: "man",
      },
      dyData: {}, //流控引擎传入的数据
    };
  },
  created() {
    // this.getConfigData(this.configdata);
    // this.setDynamicData()
    // this.getInputData()

    // 1
    this.getConfigData(this.configdata)
      .then((response) => {
        // this.jsonData = response;
        let temp = response;
        this.dynamicData(temp)
        this.handelDynamicInFlow(temp)
        console.log(temp)
        this.jsonData = temp
      })
      .catch((error) => {
        console.log(error);
      });
    // 2
    const { platform, user } = this.setDynamicData();
    this.dyData = {
      platform,
      user,
    };
    // 3
    this.tempValue = this.getInputData()
    // this.formdata = this.getInputData();
  },
  methods: {

    //  动态数据处理函数
    dynamicData(temp) {
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      let formLists = temp.list;
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
          if (tempJson != "" || tempJson != null) {
            console.log(tempJson,formLists[i].model)
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
      var platform = this.dyData.platform;
      var user = this.dyData.user;
      for (let key in this.tempValue) {
        if (
          this.tempValue[key].indexOf("platform") != -1 ||
          this.tempValue[key].indexOf("user") != -1
        ) {
          try {
            var tempJson = eval(this.tempValue[key]);
          } catch (error) {
            throw new Error(error);
          }
          if (tempJson != "" || tempJson != null) {
            this.tempValue[key]=tempJson;
            // for(let i=0;i<temp.list.length;i++){
            //   if(temp.list[i].model == key ){
            //     this.$set(temp.list[i].options,"defaultValue",tempJson)
            //     console.log(temp.list[i])
            //   }
            // }
            this.formdata = this.tempValue
            console.log( "aaaaaaaaaaa"+JSON.stringify(this.formdata))
          }
        }
      }
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
        /*.then(response => {
          this.jsonData = response;
        })
        .catch(error => {
          console.log(error);
        });*/
      } else {
        return false;
      }
    },
    // 将流控引擎input数据绑定到value
    getInputData() {
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
      // this.dyData.platform = this.configdata.platform
      // this.dyData.user = this.configdata.user
      const platform = this.configdata.platform;
      const user = this.configdata.user;
      return {
        platform,
        user,
      };
    },
    // 返回form表单键值对数据
    getFormData() {
      return this.$children[0].getData()
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrap {
  margin-top: 20px;
}
</style>

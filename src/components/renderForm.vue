<template>
  <div
    class="form-wrap"
    ref="renderForm"
    :url="'http://localhost:3000'"
    :configdata="{}"
  >
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
import request from "../util/request.js";

export default {
  name: "render-form",
  components: {
    fmGenerateForm,
  },
  props: ["configdata", "remoteFuncs", "func", "url"],
  data() {
    return {
      jsonData: {},
      tempValue: {}, //处理流控数据的变量
      formdata: {},
      dyData: {}, //动态数据
    };
  },
  created() {
    this._inits();
  },
  computed: {
    nodesLength() {
      return this.configdata && this.configdata.list.length > 0;
    },
    input_config() {
      if (this.configdata && this.configdata.list.length > 0) {
        const {
          input_config,
          checkstart,
          node_code,
          next_node,
        } = this.configdata.list[0];
        return {
          input_config,
          checkstart,
          node_code,
          next_node,
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
        const { input_config_code } = list[0];
        input_config_code &&
          this._getConfigData(input_config_code)
            .then((res) => {
              let temp = res;
              this.handelDynamicInFlow(temp);
              this.dynamicData(temp);
              console.log(temp);
              this.jsonData = temp;
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
    _getConfigData(input_config) {
      if (input_config) {
        return request.get(`${this.url}/${input_config}`);
      } else {
        return false;
      }
    },
    // 响应页面
    changeJsonData(input_config, formData = {}) {
      console.log("input_config", input_config);
      input_config &&
        this._getConfigData(input_config).then((res) => {
          this.jsonData = res;
          this.formdata = formData;
        });
    },
    // 将流控引擎input数据绑定到value
    getInputData() {
      console.log("getInputData....input_config_BB", new Date());
      const list = this.configdata.list;
      if (list.length) {
        const { input_config } = list[0]; // 注入数据
        const funkeys = Object.keys(this.func);
        try {
          if (input_config && funkeys.length) {
            let transObj = eval("(" + this.func[input_config] + ")")(); //封装
            console.log("transObj", transObj);
            return transObj;
          } else {
            return {};
          }
        } catch (error) {
          throw new Error("input_config解析出错", input_config);
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

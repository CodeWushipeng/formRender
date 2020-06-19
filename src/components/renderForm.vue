<template>
  <div class="form-wrap" ref="renderForm">
    <fm-generate-form
      :data="jsonData"
      :value="formdata"
      :dyData="dyData"
      ref="generateForm"
    >
    </fm-generate-form>
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
      formdata: {
        sex: "man",
      },
      dyData: {}, //流控引擎传入的数据
    };
  },
  created() {
    // 1
    this.getConfigData(this.configdata)
    // 2
    const { platform, user } = this.setDynamicData();
    this.dyData = {
      platform,
      user,
    };
    // 3
    this.formdata = this.getInputData();
  },
  methods: {
   

    // 获取表单配置信息
    getConfigData(configdata) {
      if (configdata.list[0].input_config_code) {
        let codeId = configdata.list[0].input_config_code;
        request.get("http://localhost:3000/from", {
          params: {
            id: codeId,
          },
        })
        .then((res)=>{
          this.jsonData = res
        });
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
      return this.$children[0].getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrap {
  margin-top: 20px;
}
</style>

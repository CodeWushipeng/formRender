<template>
  <div class="render-wrap">
    <render-form
      v-if="configdata != null"
      :configdata="configdata"
      ref="renderForm"
    ></render-form>
    <el-button @click="acceptFormData">获取数据</el-button>
  </div>
</template>

<script>
import request from "../util/request.js";
export default {
  data() {
    return {
      configdata: null,
    };
  },
  created() {
    this.getConfigData();
  },
  methods: {
    getConfigData() {
      request
        .get("http://localhost:3000/flow")
        .then((res) => {
          this.configdata = res;
          console.log(this.configdata)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 接收renderform组件返回的表单数据
    acceptFormData(){
      this.$refs.renderForm.getFormData().then(data=>{console.log(data)});
    }
  },
};
</script>

<style>
.render-wrap {
  margin-top: 20px;
}
</style>

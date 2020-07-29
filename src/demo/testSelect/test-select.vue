<template>
  <div class="test-select-container">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-my-select v-model="value" placeholder="请选择" @change="change" @visible-change="visibleChange">
      <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
      </el-option>
    </el-my-select>
  </div>
</template>

<script>
  // import ElMySelect from "../../components/base-components/my-select/select";
  export default {
    name: "jr-select",
    components:{
      // ElMySelect,
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        input: '',
        value: '',
      }
    },
    methods:{
      change(val){
        console.log('val is',val)
      },
      visibleChange(val){
        console.log('visibleChange is',val)
      },

    }
  }
</script>

<style scoped>
  .test-select-container{
    width:300px;
    margin:100px auto;
  }
</style>

<template>
  <div class="test-date-container">
    <div class="block">
      <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
      </el-date-picker>
      <el-input v-model="name"  placeholder="请输入内容"></el-input>
    </div>
    <div class="block">
      <span class="demonstration">默  认____</span>
      <hr-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
      </hr-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <hr-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
      </hr-date-picker>
    </div>
    <div class="block">
      <span>选择时间</span>
      <hr-time-select
              v-model="value"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间">
      </hr-time-select>
    </div>
  </div>
</template>

<script>
  // import hrDatePicker from '../../../src/components/base-components/my-date/date-picker/src/picker/date-picker'
  // import hrTimeSelect from '../../../src/components/base-components/my-date/date-picker/src/picker/time-select'
  export default {
    name: "test-date",
    components:{
      // hrDatePicker,
      // hrTimeSelect
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
        },
        value1: '',
        value2: '',
        value: '',
        name: '',
      }
    }
  }
</script>

<style scoped>
  .test-date-container {
    width: 300px;
    margin: 100px auto;
  }
  .block{
    padding:10px;
  }
</style>

<template>
    <div >
      <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
    </el-date-picker>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data (){
            return {
                value1: "",
                pickerOptions0: {
                    disabledDate(time) {
                        return this.filter (time);
                    }
                },
            }
        },
        methods: {
            filter (time){
                return time.getTime() < Date.now()
            }
        },
        mounted () {
            /*let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths;;*/
        }
    };
</script>

<style lang="scss" scoped>
</style>

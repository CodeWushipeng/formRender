<template>
    <div >
      <el-date-picker
            v-model="exCheckDate"
            type="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="Please select">
        </el-date-picker>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data (){
            return {
                exCheckDate:"",
                pickerOptions: {
                    // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
                    disabledDate: (time) => {
                        // 如果函数处理比较简单,可以直接在这里写逻辑方法
                        // return time.getTime() < Date.now() - 8.64e7

                        // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
                        return this.dealDisabledDate(time)
                    }
                }, // 日期设置对象
            }
        },
        methods: {
            // 单独处理时间的函数
            dealDisabledDate (time) {
                // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
                // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
                // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
                return time.getTime() < Date.now()

                // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
                // return time.getTime() <= Date.now()
                // return time.getTime() < Date.now() - 8.64e7
            }
        },
        methods: {
        },
        mounted () {
        }
    };
</script>

<style lang="scss" scoped>
</style>

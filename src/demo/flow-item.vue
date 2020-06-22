<template>
    <div class="render-wrap">

        <h3>
            {{nodeName}}
        </h3>

        data： {{data}}
        <hr>
        remoteFuncs： {{Object.keys(remoteFuncs)}}
        <hr>
        configdata.list.length {{configdata.list.length}}
        <hr>
        <div style="width:50%;margin:0 auto;">
            <el-row :gutter="12"  >
                <el-col :span="24" v-if="type=='01'">
                    <el-card shadow="always" >
                        当前流程可以执行
                    </el-card>
                </el-col>
                <el-col :span="24" v-else-if="data && Object.keys(data)">
                    render-form
                    <render-form v-if="configdata && configdata.list.length && Object.keys(remoteFuncs)"
                            :configdata="configdata"
                            :remoteFuncs="remoteFuncs"
                            ref="renderForm"
                    ></render-form>
                </el-col>
                <el-col :span="24" v-else>
                    configdata.list中没有数据
                </el-col>
            </el-row>
            <!--结束流程提示-->
            <el-row v-if="type=='02'">
                <el-col :span="24" >
                    <el-card class="box-card">
                        <h3 style="text-align: center"> <i style="color: green;font-size:20px;font-weight:bold;" class="el-icon-check"></i> 操作成功,流程已结束</h3>
                    </el-card>
                </el-col>
            </el-row>
            <br>
        </div>
    </div>
</template>
<script>
import renderForm from "../components/renderForm.vue";
import request from "../util/request.js";
// 用户数据
const user = {
    user: "fengwenxin",
    age: "11",
    address: "beijing001",
    account_no: "6212121212",
    up: {
        idflag: "2"
    }
};
// 平台数据
const platform =  {
    sysdate: '20200202',
    amount: '99',
    transferType: '2',
    bank: {
        bankId: "0098878",
        banktoken: "#212@112"
    }
};
export default {
    name: 'flow-item',
    components: {
        renderForm,
    },
    data() {
        return {
            configdata:{
                platform,
                user,
                list:[]
            },
            remoteFuncs: {}
        };
    },
    props: {
        data: {
            type: Object,
            required: true
        },
    },
    watch: {
        data: function (value) {
            const {input_config_code} = value;
            if (input_config_code) {
                this.configdata.list = [value];
            } else {
                this.configdata.list = [];
            }
            // this.remote();
            // console.log('this.configdata',this.configdata)
        },
        'data.id': function (value, oldValue) {
            console.log('oldValue', JSON.stringify(oldValue), 'value', JSON.stringify(value))
            if ((!value && oldValue) || value) {
                // this.remote();
            }
        }
    },
    computed: {
        type(){
            const {type} = this.data;
            return type;
        },
        nodeName() {
            // 节点名称
            const {node_name} = this.data;
            return node_name;
        }
    },
    created(){
        this.remote();
    },
    methods: {
        remote(){
            console.log('remote..... start')
            // 加载远程数据
            const user = 'getUser';
            this.remoteFuncs[user] = function (resolve) {
                // 选择用户 user
                const data = [
                    {label: 'zhangsan', value: "622001"},
                    {label: 'lisi', value: "622002"},
                    {label: 'wangwu', value: "622003"},
                    {label: 'fengwenxin', value: "622004"},
                ]
                resolve(data)
            }

            const getType = 'getType';
            this.remoteFuncs[getType] = function (resolve) {
                // 选择用户 user
                const data = [
                    {label: '对公转账', value: "1"},
                    {label: '个人转账', value: "2"},
                ]
                resolve(data)
            }

            const getUrl = 'getUrl';
            this.remoteFuncs[getUrl] = function (resolve) {
                const data = [
                    {label: 'zhangsan', value: "622001"},
                    {label: 'lisi', value: "622002"},
                    {label: 'wangwu', value: "622003"},
                ]
                resolve(data)
            }
            console.log('remote..... end',typeof  this.remoteFuncs ,Object.keys(this.remoteFuncs))
        },
        outPut(output_config_code){
            this.$refs.renderForm.outPuts(output_config_code)
        },
        getFormData(){
            console.log('this.$refs.renderForm',this.$refs.renderForm)
            return this.$refs.renderForm.getData();
        }
    },
};
</script>

<style>
    .render-wrap {
        margin-top: 20px;
    }
</style>

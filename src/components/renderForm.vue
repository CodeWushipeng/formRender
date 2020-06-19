<template>
    <div class="form-wrap" ref="renderForm">
        <!--item:-->
        <!--{{item}} <hr>-->
        <!--platform: {{platform}}<hr>-->
        <!--user: {{user}}<hr>-->
        <!--nodesLength: {{nodesLength}}<hr>-->
        <!--remoteFuncs： {{Object.keys(remoteFuncs)}}-->
        <div>
            <h3>renderForm:</h3>
        </div>
        formdata: {{JSON.stringify(formdata)}} <hr>
        input_config: {{input_config}} <hr>
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

    export default {
        name: "render-form",
        components: {
            fmGenerateForm,
        },
        props: ['configdata', 'remoteFuncs',"func"],
        data() {
            return {
                jsonData: {},
                formdata: {},
                dyData: {}  //流控引擎传入的数据
            };
        },
        created() {
            console.log('configdata... ',this.configdata);
           this._inits();
        },
        computed: {
            nodesLength() {
                return this.configdata && this.configdata.list.length > 0
            },
            input_config(){
                if(this.configdata && this.configdata.list.length > 0){
                    const  {input_config,checkstart,node_code,next_node} = this.configdata.list[0];
                    return {
                        input_config,checkstart,node_code,next_node
                    };
                }
            }
        },
        methods: {
            _inits(){
                // 1
                const list = this.configdata.list;
                if((list instanceof Array) && list.length){
                    const {input_config_code} = list[0];
                    input_config_code && this._getConfigData(input_config_code).then(res=>{
                        this.jsonData = res;
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
                // 3
                // this.formdata = {};
                this.formdata = this.getInputData();
            },
            // 获取表单配置信息
            _getConfigData(input_config) {
                if (input_config) {
                    return request.get("http://localhost:3000/" + input_config)
                } else {
                    return false
                }
            },
            // 响应页面
            changeJsonData(input_config, formData = {}) {
                console.log('input_config',input_config)
                input_config && this._getConfigData(input_config).then(res=>{
                    this.jsonData = res;
                    this.formdata = formData;
                })
            },
            // 将流控引擎input数据绑定到value
            getInputData() {
                console.log('getInputData....input_config_BB',new Date())
                const list = this.configdata.list;
                if(list.length){
                    const {input_config} = list[0]; // 注入数据
                    const funkeys = Object.keys(this.func)
                    try {
                        if (input_config && funkeys.length) {
                            let transObj = eval("(" + this.func[input_config] + ")")()  //封装
                            console.log('transObj',transObj)
                            return transObj;
                        }else{
                            return {}
                        }
                    } catch (error) {
                        throw new Error("input_config解析出错",input_config)
                    }
                }
                return {};
            },
            // 动态数据获取
            setDynamicData() {
                return {
                    platform: this.configdata.platform,
                    user: this.configdata.user
                }
            },
            // 获取表单数据
            getData() {
                return this.$refs.generateForm.getData();
            },
        },
        watch:{
            'configdata.list':{
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

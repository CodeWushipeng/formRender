<template>
    <div>
        until
        <div class="box">
            {{add}}
        </div>
        <div class="box">
            {{mul}}
        </div>
    </div>
</template>

<script>
    import {commonJs1,inputConfigs} from './until';
    export default {
        name: "index",
        data(){
            return {
                configdata:{
                    platform:{
                        sysdate: "20200202",
                        node: "feng's node data description",
                        amount: "99",
                        transferType: "2",
                        bank: {
                            bankId: "0098878",
                            banktoken: "#212@112",
                        },
                    },
                    user: {
                        name: "feng",
                        age: "11",
                        address: "beijing001",
                        account_no: "6212121212",
                        up: {
                            idflag: "2",
                        },
                    },
                    nodes:{},
                    utils:{},
                },
                add:1,
                mul:2,
            }
        },
        created(){
            this.test();
        },
        methods:{
            test(){
                // console.log("created==========start==========");
                try {
                    const exeCode = eval(commonJs1);
                    this.configdata.utils = exeCode;

                    console.log('test exeCode',exeCode)
                    console.log('test utils',this.configdata.utils )
                    // this.add = utils.add();
                    // this.mul = utils.mul();
                    // console.log('utils add..', utils.add())
                    // console.log('utils mul..', utils.mul())
                    // console.log('this.utils',this.utils.sum())
                    console.log('inputConfig data..', this.solve(inputConfigs))
                }catch (error) {
                    throw  new Error(error)
                }
            },
            // 提取函数的返回数据
            solve(inputConfig){
                try {
                    const { platform, user, nodes, utils } = this.configdata;
                    // console.log('{ platform, user, nodes, utils} ',{ platform, user, nodes, utils} )
                    console.log('solve utils',utils);
                    // console.log('{ configdata} ',JSON.stringify(this.configdata))
                    const resCode = `function _execute(user, platform, nodes, utils){  ${inputConfig}  return main(...arguments);}`;
                    const exeCode = eval("(" + resCode + ")");
                    console.log('exeCode',typeof exeCode)
                    let rs =  exeCode(user,platform,nodes,utils);
                    return rs;
                }catch (error) {
                    console.log(inputConfig);
                    throw new Error(error);
                }
            },
        }
    }
</script>

<style scoped>
    .box{
        border: 1px solid red;
        padding:10px;
        width:400px;
    }
</style>

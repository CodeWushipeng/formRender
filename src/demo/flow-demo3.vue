<template>
    <div class="render-wrap" style="padding: 20px;">
        remoteFuncs:{{remoteFuncs}}
        <hr>
         configdata:{{configdata}}
        <hr>
        configdata.list:{{configdata.list}}
        <hr>
        data:{{data}}
        <hr>
        <!--func:{{func}}-->
        <!--<hr>-->

        <h3>{{node_name}}</h3>
        <div v-if="type=='01'">
            可以开始
        </div>
        <div v-if="type=='02'">
            结束
        </div>

        <div v-if="type=='03'">
            <render-form v-if="configdata.list.length>0"
                         :configdata="configdata"
                         :remoteFuncs="remoteFuncs"
                         :func="func"
                         ref="renderForm"
            ></render-form>
        </div>

        <!--:json="json"-->
        <!--:edit="edit"-->
        <!--<el-button @click="clickHandler">clicked</el-button>-->
        <div style="text-align:center;">
            <el-button type="primary" @click="prevHandle">Back</el-button>
            <el-button type="primary" @click="submitHandle">Submit</el-button>
            <el-button type="primary" @click="cancelHandle">Cancel</el-button>
            <el-button type="primary" @click="_get">GET</el-button>
        </div>


        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="allData">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import getFG from '../util/engine/flow-engine';
// import getFG from 'fg-control'
import request from "../util/request.js";
// import flowItem from './flow-item';
const FG = new getFG();
export default {
    name:'flow-demo',
    components: {
        // flowItem
    },
    data() {
        return {
            dialogVisible:false,
            allData:null,
            // 流控数据
            configdata:{
                platform:{},
                user:{},
                list:[]
            },
            remoteFuncs: {},
            // 处理数据
            data: {},
            func:{},
            // json: null,
            // edit: null,
        };
    },
    created() {
        this._getStartNode();
        this._remote();
        console.log(this.configdata)
    },
    computed: {
        type() {
            const { type} = this.data;
            return type
        },
        node_name() {
            const { node_name} = this.data;
            return node_name
        }
    },
    methods: {
        handleClose(done) {
           /* this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});*/
        },
        _remote(){
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
        _configData(next_node){
            this.data = FG.getNext(next_node);
            console.log(this.data)
            this.configdata.list = [FG.getNext(next_node)]
        },
        _getStartNode() {
            request.get("http://localhost:3000/flow").then((res) => {
                console.log('res', res)
                // FG.setState(res);
                const data = res.data;
                FG.settters('user',data.user)
                FG.settters('platform',data.platform)
                FG.settters('list',data.list)
                FG.settters('func',data.func)
                this.func = data.func;

                const start = FG.list.filter(item => item.type == '01')[0];
                // console.log('FG.list',FG.list)
                // console.log('start',start)
                const {checkstart, node_code} = start;
                if (FG.checkStart(checkstart)) {
                    this.data = start;
                    this.configdata.platform = data.platform;
                    this.configdata.user = data.user;
                    this.configdata.list = [start];
                    FG.ISOK = true;
                    console.log(`开始节点${node_code}，检查通过,可以执行`);
                } else {
                    // this.$handleWarning(`当前节点${node_code}不能执行`);
                    alert(`当前节点${node_code}不能执行`)
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        // 上一节点
        prevHandle() {
            const {return_node, input_config_code, type} = this.data;
            // 有响应页面
            if (FG.CURFORM == 'output_config_code' && input_config_code) {
                FG.CURFORM = 'input_config_code';
                FG.OUTFLAG = false;
                this.$refs.flow.outPut(input_config_code);
            } else {
                if (return_node) {
                    if (type == FG.END) {
                        // this.$handleInfo("流程已经结束");
                        alert("流程已经结束")
                    } else {
                        let flw;
                        this.data = flw = FG.getPrev(return_node);
                        // this.edit = FG.getInputData(return_node);
                        const inputConfigCode = flw.input_config_code;
                        const sType = flw.type;
                        if (sType == FG.START) {
                            // this.json = null;
                            // this.edit = null;
                            FG.OUTFLAG = false;
                            // this.$handleSuccess("已经返回开始节点")
                            alert("已经返回开始节点")
                        } else {
                            this.configdata.list = [this.data]
                            FG.CURFORM = 'input_config_code';
                            FG.OUTFLAG = false;
                        }
                    }
                } else {
                    // this.$handleWarning("没有返回节点了");
                    alert("没有返回节点了")
                }
            }
        },
        // 下一节点(跳转的业务判断)
        nextHandle(next_node) {
            if (next_node && next_node.includes(",")) {
                const nodes = next_node.split(",");
                const flow_list = FG.list;

                function filters(j) {
                    let fs = nodes[j];
                    return flow_list.filter(fl => fl.node_code == fs)[0];
                }

                for (let j = 0; j < nodes.length; j++) {
                    const nextFlow = filters(j);
                    const {checkstart} = nextFlow;
                    const nextCode = nextFlow['node_code'];
                    try {
                        console.log('checkstart', checkstart)
                        if (FG.checkStart(checkstart)) {
                            this._configData(nextCode);
                            break;
                        }
                    } catch (e) {
                        throw new Error('nextHandle checkstart执行出错了',checkstart);
                    }
                }
            } else {
                this._configData(next_node);
            }
        },
        // 提交
        submitHandle() {
            if(FG.ISOK==false){
                alert("流程已取消");
                return
            }
            const {commit_type, type, next_node, commit_func, node_code, output_config_code} = this.data;
            const commit = commit_func;

            // 开始节点
            if (type == FG.START) {
                this._configData(next_node);
                return;
            }
            // 结束节点
            if (type == FG.END) {
                // this.$handleInfo("流程已经结束");
                alert('流程已经结束');
                return;
            }
            // 响应页面
            if (FG.OUTFLAG) {
                FG.OUTFLAG= false;
                this.nextHandle(next_node);
                return false;
            }
            if (type == FG.DOING) {
                // 执行节点
                const nodePromise = this.$refs.renderForm.getData();
                nodePromise.then(data => {
                    console.log('res', data);
                    // 提交类型
                    if (commit_type == FG.COMMIT_TYPE_DEFAULT) {
                        const Obj = {
                            up: data,
                            down: null
                        };
                        FG.commitDefault(data).then(res => {
                            Obj['down'] = res;
                            FG.saveNode(node_code, Obj);
                            alert("提交数据：" + JSON.stringify(Obj));
                            // TODO 有响应页面
                            if (output_config_code) {
                                // this.$refs.flow.outPut(output_config_code);
                                this.$refs.renderForm.changeJsonData(output_config_code, data);
                                FG.OUTFLAG = true;
                                FG.CURFORM = "input_config_code";
                            } else {
                                // TODO 无响应页面,直接跳转到下一节点
                                this.nextHandle(next_node);
                            }
                        })
                    } else if (commit_type == FG.COMMIT_TYPE_DEFINE) {
                        commit && commit(data)
                    } else if (commit_type == FG.COMMIT_TYPE_ORDER) {

                    } else if (commit_type == FG.COMMIT_TYPE_LOCAL) {

                    }
                }).catch(e => {
                    // Data verification failed
                    throw  new Error('Data verification failed')
                })
            }
            console.log("======FG===========", FG)
            console.log("======FG.CURFORM ===========", FG.CURFORM )
        },
        // 取消
        cancelHandle() {
            const keys = Object.keys(FG.flow);
            keys.forEach(key => {
                delete  FG.flow[key]
            })
            FG.ISOK = false;
            // this.$handleSuccess("已清理这个流程");
            alert("已清理这个流程");
            console.log('FG', FG)
        },
        _get(){
            this.dialogVisible = true
            // this.allData = FG.getAllData();
            this.allData = JSON.stringify(FG.getAllData(),null,4)
        }
    },
};
</script>

<style>
    .render-wrap {
        margin-top: 20px;
    }
</style>

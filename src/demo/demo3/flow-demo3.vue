<template>
    <div class="render-wrap" style="padding: 20px;">
        <!--<flowItem ref="flow"
                   :data="data"
                   v-if="data">
        </flowItem>-->
        <!--remoteFuncs:{{remoteFuncs}}-->
        <hr>
        configdata.list:{{configdata.list}}
        <hr>
        data:{{data}}
        <hr>
        func:{{func}}
        <hr>
        <h3>{{node_name}}</h3>
        <div>
            {{type}}
        </div>
        <div v-if="type=='01'">
            可以开始
        </div>
        <div v-if="type=='02'">
            结束
        </div>

        <div v-if="type=='03'">
            render-form
            <render-form v-if="configdata.list.length>0"
                         :url="url"
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
    // import getFG from 'fg-control';
    import getFG from './fg-control';
    import { queryFlowDetail } from '../../api/flows'
    const FG = new getFG();
    import {platform,user,func} from './flowData'

    export default {
        name:'flow-demo',
        data() {
            return {
                url:"http://localhost:3000",
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
                data: {
                    nodeName:null,
                },
                func:{},
                // json: null,
                // edit: null,
            };
        },
        created() {
            this._getStartNode();
            this._remote();
        },
        computed: {
            type() {
                const { type} = this.data;
                return type
            },
            node_name() {
                const { nodeName} = this.data;
                return nodeName
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
                // console.log('remote..... start')
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
                // console.log('remote..... end',typeof  this.remoteFuncs ,Object.keys(this.remoteFuncs))
            },
            _configData(next_node){
                this.data = FG.getNext(next_node);
                this.configdata.list = [FG.getNext(next_node)]
            },
            _getStartNode() {
                const flowCode = this.$route.name;
                console.log('this.$routes.name:',this.$route.name)
                // request.get(flow_Url).then((res) => {
                let params = {
                    flowCode:this.$route.name.replace('buss','')
                }
                queryFlowDetail(params).then((res) => {
                    console.log('res', res)
                    const list = res.detail.records;
                    console.log('list',list)
                    const {statusCode} = res;
                    if(statusCode == 200){
                        // FG.setState(res);
                        FG.settters('user',user)
                        FG.settters('platform',platform)
                        FG.settters('list',list)
                        FG.settters('func',func)
                        this.func = func;

                        const start = FG.list.filter(item => item.type == '01')[0];
                        // console.log('FG.list',FG.list)
                        // console.log('start',start)
                        const {checkStart, nodeCode} = start;
                        if (FG.checkStart(checkStart)) {
                            this.data = start;
                            this.configdata.list = [start];
                            FG.ISOK = true;
                            console.log(`开始节点${nodeCode}，检查通过,可以执行`);
                        } else {
                            // this.$handleWarning(`当前节点${node_code}不能执行`);
                            alert(`当前节点${nodeCode}不能执行`)
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            // 上一节点
            prevHandle() {
                const {return_node, inputFormCode, type} = this.data;
                // 有响应页面
                if (FG.CURFORM == 'outputFromCode' && inputFormCode) {
                    FG.CURFORM = 'inputFormCode';
                    FG.OUTFLAG = false;
                    this.$refs.flow.outPut(inputFormCode);
                } else {
                    if (return_node) {
                        if (type == FG.END) {
                            // this.$handleInfo("流程已经结束");
                            alert("流程已经结束")
                        } else {
                            let flw;
                            this.data = flw = FG.getPrev(return_node);
                            // this.edit = FG.getInputData(return_node);
                            const inputConfigCode = flw.inputFormCode;
                            const sType = flw.type;
                            if (sType == FG.START) {
                                // this.json = null;
                                // this.edit = null;
                                FG.OUTFLAG = false;
                                // this.$handleSuccess("已经返回开始节点")
                                alert("已经返回开始节点")
                            } else {
                                this.configdata.list = [this.data]
                                FG.CURFORM = 'inputFormCode';
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
                        return flow_list.filter(fl => fl.nodeCode == fs)[0];
                    }

                    for (let j = 0; j < nodes.length; j++) {
                        const nextFlow = filters(j);
                        const {checkStart} = nextFlow;
                        const nextCode = nextFlow['nodeCode'];
                        try {
                            console.log('checkStart', checkStart)
                            if (FG.checkStart(checkStart)) {
                                this._configData(nextCode);
                                break;
                            }
                        } catch (e) {
                            throw new Error('nextHandle checkStart执行出错了',checkStart);
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
                const {commitType, type, nextNode, commitFunc, nodeCode, outputFromCode} = this.data;
                const commit = commitFunc;

                // 开始节点
                if (type == FG.START) {
                    this._configData(nextNode);
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
                    this.nextHandle(nextNode);
                    return false;
                }
                if (type == FG.DOING) {
                    // 执行节点
                    const nodePromise = this.$refs.renderForm.getData();
                    nodePromise.then(data => {
                        console.log('res', data);
                        // 提交类型
                        if (commitType == FG.COMMIT_TYPE_DEFAULT) {
                            const Obj = {
                                up: data,
                                down: null
                            };
                            FG.commitDefault(data).then(res => {
                                Obj['down'] = res;
                                FG.saveNode(nodeCode, Obj);
                                alert("提交数据：" + JSON.stringify(Obj));
                                // TODO 有响应页面
                                if (outputFromCode) {
                                    // this.$refs.flow.outPut(outputFromCode);
                                    this.$refs.renderForm.changeJsonData(outputFromCode, data);
                                    FG.OUTFLAG = true;
                                    FG.CURFORM = "inputFormCode";
                                } else {
                                    // TODO 无响应页面,直接跳转到下一节点
                                    this.nextHandle(nextNode);
                                }
                            })
                        } else if (commitType == FG.COMMIT_TYPE_DEFINE) {
                            commit && commit(data)
                        } else if (commitType == FG.COMMIT_TYPE_ORDER) {

                        } else if (commitType == FG.COMMIT_TYPE_LOCAL) {

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

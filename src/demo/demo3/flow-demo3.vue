<template>
    <div class="render-wrap" style="padding: 20px;" ref="loadingArea">
        <router-view></router-view>
        <!--流程数据-->
        <el-dialog title="流程数据" :visible.sync="flowDialogTableVisible" width="1000px">
            <!--{{listData}}-->
            <el-table :data="listData">
                <el-table-column property="nodeCode" label="节点ID" width="150"></el-table-column>
                <el-table-column property="nodeName" label="节点名称" width="200"></el-table-column>
                <el-table-column property="type" label="节点类型">
                    <template slot-scope="scope">
                        <span><el-tag :type="filterStatus(scope)['type']">{{ filterStatus(scope)['text'] }}</el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column property="nextNode" label="下一节点"></el-table-column>
                <el-table-column property="returnNode" label="返回节点"></el-table-column>
                <el-table-column property="inputConfig" label="提取配置">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.inputConfig ? "有" : "" }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="outputConfig" label="响应配置">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.outputConfig ? "有" : "暂未实现" }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!--user数据-->
        <el-dialog title="user数据" :visible.sync="userDialogTableVisible" >
            <!--{{usreData}}-->
            <el-table :data="usreDataSolve">
                <el-table-column property="key" label="KEY" width="150"></el-table-column>
                <el-table-column property="value" label="VALUE" width=""></el-table-column>
            </el-table>

        </el-dialog>
        <!--platform数据-->
        <el-dialog title="platform数据" :visible.sync="platformDialogTableVisible" >
            <!--{{platformData}}-->
            <!--{{platformDataSolve}}-->
            <el-table :data="platformDataSolve">
                <el-table-column property="key" label="KEY" width="150"></el-table-column>
                <el-table-column property="value" label="VALUE" width=""></el-table-column>
            </el-table>
        </el-dialog>
        <!--nodes数据-->
        <el-dialog title="nodes数据" :visible.sync="nodesDialogTableVisible" width="1000px">
            <!--{{nodesData}}-->
            <el-table :data="nodesDataSolve">
                <el-table-column property="key" label="节点名称" width="150"></el-table-column>
                <el-table-column property="value_up" label="节点数据(up)" width="">
                </el-table-column>
                <el-table-column property="value_down" label="节点数据(down)" width="">
                    <!--<template slot-scope="scope">
                        <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入内容"
                                :value="JSON.stringify(scope.row.value_down,null,4) ">
                        </el-input>
                    </template>-->
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-row>
            <el-button type="primary" @click="flowHandler">流程数据</el-button>
            <el-button type="success" @click="userHandler">user数据</el-button>
            <el-button type="info" @click="platformHandler">platform数据</el-button>
            <el-button type="warning" @click="nodesHandler">节点数据</el-button>
            <el-button type="danger" @click="getFormHandle">获取表单数据</el-button>

            <!--<el-button @click="page('12')">12</el-button>-->
            <!--<el-button @click="page('13')">13</el-button>-->
        </el-row>
        <!--remoteFuncs:{{remoteFuncs}}-->
        <hr>
        <!--configdata:{{configdata}}-->
        <hr>
        <!--data:{{data}}-->
        <hr>
        <!--func:{{func}}-->
        <hr>

        <div>
            <h3>{{node_name}} <sub>节点类型：{{type}}</sub> &nbsp;<sub>共{{recordsLength}}个节点</sub></h3>
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
                width="30%">
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

        <router-view></router-view>
    </div>
</template>

<script>
    // import getFG from 'fg-control';
    import getFG from './fg-control';
    import { queryFlowDetail } from '../../api/flows';
    const FG = new getFG();
    import {platform,user} from './flowData';

    export default {
        name:'flow-demo',
        data() {
            return {
                url:"",
                dialogVisible:false,
                allData:null,
                // 流控数据
                configdata:{
                    platform,
                    user,
                    utils:{},
                    nodes:{},
                    list:[],
                },
                remoteFuncs: {
                },
                // 当前节点数据
                data: {},


                // =========数据显示================
                records:[], // 流程数据
                flowDialogTableVisible:false,
                userDialogTableVisible:false,
                platformDialogTableVisible:false,
                nodesDialogTableVisible:false,
                listData:[],
                usreData:[],
                usreDataSolve:[],
                platformData:[],
                platformDataSolve:[],
                nodesData:[],
                nodesDataSolve:[],
            };
        },
        computed: {
            recordsLength(){
                return this.records.length
            },
            type() {
                const { type} = this.data;
                return type
            },
            node_name() {
                const { nodeName} = this.data;
                return nodeName
            }
        },
        created() {
            // console.log("xxxxxxxxxxxx"+Math.random())
            this._getStartNode();
            this._remote();
        },
        methods: {
            page(num){
                this.$router.push('/zh-CN/flow/'+num)
            },
            filterStatus(scope) {
                const type = scope.row.type;
                if (!type) return '';
                const fsTxt = {
                    '01':"开始节点",
                    '02':"结束节点",
                    '03':"表单节点",
                };
                const elTag = {
                    '01':"",
                    '02':"danger",
                    '03':"success",
                };

                return {
                    type:elTag[type],
                    text:fsTxt[type]
                };
            },
            flowHandler(){
                this.listData = FG.list;
                this.flowDialogTableVisible = true;
            },
            userHandler(){
                let res =[];
                for(let key in FG.user){
                    // console.log('key',key,FG.user[key])
                    const value = FG.user[key];
                    res.push({
                        key:key,
                        value: typeof  value == "object" ? JSON.stringify(value) : value
                    })
                }
                this.usreData = FG.user;
                this.usreDataSolve = res;
                this.userDialogTableVisible = true;
            },
            platformHandler(){
                let res =[];
                for(let key in FG.platform){
                    const value = FG.platform[key]
                    res.push({
                        key:key,
                        value: typeof  value == "object" ? JSON.stringify(value) : value
                    })
                }
                this.platformData = FG.platform;
                this.platformDataSolve = res;
                this.platformDialogTableVisible = true;
            },
            nodesHandler(){
                console.log('FG.nodes',JSON.stringify(FG.nodes))
                const keys = Object.keys(FG.nodes);
                if(keys.length){
                      let res =[];
                      for(let key in FG.nodes){
                          const value_up = FG.nodes[key]['up'];
                          const value_down = FG.nodes[key]['down'];
                          res.push({
                              key:key,
                              // value_up,
                              // value_down,
                              value_up:   typeof value_up == "object" ? JSON.stringify(value_up) : value_up,
                              value_down: typeof value_down == "object" ? JSON.stringify(value_down) : value_down
                          })
                      }

                      this.nodesData = FG.nodes;
                      this.nodesDataSolve = res;
                      this.nodesDialogTableVisible  = true;
                }else{
                    this.$notify.info({
                        title: '消息',
                        message: '暂无节点数据'
                    });
                }
            },
            getFormHandle(){
                if(this.$refs.renderForm){
                    this.$refs.renderForm.getData().then(data=>{
                        alert(JSON.stringify(data));
                    })
                }else{
                    this.$notify.info({
                        title: '消息',
                        message: '当前节点没有表单,不能获取数据'
                    });
                }
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
                this.configdata.list = [FG.getNext(next_node)];
            },
            _getStartNode() {
                const flowCode = this.$route.name;
                const query = this.$route.query;
                console.log('this.$routes.name:',this.$route.name)
                console.log('this.$routes.query:',this.$route.query)
                let params = {
                    // flowCode:flowCode.replace('buss','')
                    flowCode:query.id
                }
                queryFlowDetail(params).then((res) => {
                    console.log('res', res)
                    const list = res.detail.records;
                    let funcCollection = res.define.funcCollection;
                    // console.log('queryFlowDetail funcCollection', funcCollection);
                    const {rspCode} = res;
                    if(rspCode == "00000000"){
                        const funcObject = FG.solveCommonJS(funcCollection);
                        this.configdata.utils = funcObject;
                        // 挂载数据
                        FG.setters('user',user);
                        FG.setters('platform',platform);
                        FG.setters('list',list);
                        FG.setters('utils',funcObject);

                        this.records = list;

                        // 启动开始节点
                        const startNode = list.filter(item => item.type == '01')[0];
                        const {checkStart, nodeCode} = startNode;
                        if (FG.checkStart(checkStart)) {
                            this.data = startNode;
                            this.configdata.list = [startNode];
                            FG.ISOK = true;
                            console.log(`开始节点${nodeCode}，检查通过,可以执行`);
                        } else {
                            // this.$handleWarning(`当前节点${node_code}不能执行`);
                            alert(`当前节点${nodeCode}不能执行`);
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
                        } catch (error) {
                            console.log('===nextHandle checkStart===',checkStart)
                            throw new Error(error)
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
                        if (commitType == FG.COMMIT_DEFAULT) {
                            const Obj = {
                                up: data,
                                down: null
                            };
                            FG.commitDefault(data).then(res => {
                                Obj['down'] = res;
                                // 深拷贝
                                const copyObj= JSON.parse(JSON.stringify(Obj));
                                FG.saveNode(nodeCode, copyObj);
                                alert("提交数据：" + JSON.stringify(Obj));
                                const outConfig =  `
                                    function main(){
                                        return {
                                            user: "lisi",
                                            desc: "this is lisi's description",
                                        }
                                    }
                                `;
                                // TODO 有响应页面
                                if (outputFromCode) {
                                    this.$refs.renderForm.changeJsonData(outputFromCode, outConfig);
                                    FG.OUTFLAG = true;
                                    FG.CURFORM = "inputFormCode";
                                } else {
                                    // TODO 无响应页面,直接跳转到下一节点
                                    this.nextHandle(nextNode);
                                }
                            })
                        } else if (commitType == FG.COMMIT_DEFINE) {
                            commit && commit(data)
                        } else if (commitType == FG.COMMIT_ORDER) {

                        } else if (commitType == FG.COMMIT_LOCAL) {

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

<style lang="scss" scoped>
    .render-wrap {
        margin-top: 20px;
    }

   /* .el-table-box {
        .el-table_{
            border-collapse:collapse;
        }
        .el-table_ th,
        .el-table_ td {
            text-align: left;
            border: #ccc solid 1px;
            padding: 0;
        }
        .cell{
            padding:10px 10px;
        }
    }*/
</style>

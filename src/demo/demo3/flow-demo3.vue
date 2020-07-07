<template>
    <div class="render-wrap" style="padding: 20px;" ref="loadingArea" >
        {{data}}
        <!--流程数据-->
        <el-dialog title="流程数据" :visible.sync="flowDialogTableVisible" width="1000px">
            <!--{{listData}}-->
            <el-table :data="listData">
                <el-table-column label="序号"  type="index" width="50"></el-table-column>
                <el-table-column property="nodeCode" label="节点ID" width="150"></el-table-column>
                <el-table-column property="nodeName" label="节点名称" width="200"></el-table-column>
                <el-table-column property="type" label="节点类型">
                    <template slot-scope="scope">
                        <span><el-tag :type="filterType(scope.row.type)">{{ filterStatus(scope.row.type)}}</el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column property="nextNode" label="下一节点"></el-table-column>
                <el-table-column property="returnNode" label="返回节点"></el-table-column>
                <el-table-column property="inputConfig" label="提取配置">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.inputConfig" :title="scope.row.inputConfig">有</el-tag>
                    </template>
                </el-table-column>
                <el-table-column property="outputConfig" label="响应配置">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.outputConfig" :title="scope.row.outputConfig">有</el-tag>
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
                <el-table-column label="序号"  type="index" width="50"></el-table-column>
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
        </el-row>
        <!--remoteFuncs:{{remoteFuncs}}-->
        <!--<hr>-->
        <!--configdata:{{configdata}}-->
        <!--<hr>-->
        <!--data:{{data}}-->
        <!--<hr>-->
        <!--func:{{func}}-->
        <!--<hr>-->

        <!--当前节点信息-->
        <div class="current-node">
            <h3>{{data.nodeName}}</h3>
            <el-card class="box-card">
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">节点类型：</el-col>
                    <el-col :span="6"><el-tag :type="filterType(type)">{{type | filter_Status}}</el-tag></el-col>
                    <el-col :span="6" class="label-color">总节点个数：</el-col>
                    <el-col :span="6"><el-tag type="info">{{recordsLength}}</el-tag></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">当前节点：</el-col>
                    <el-col :span="6"><el-tag type="info">{{data.nodeCode}}</el-tag></el-col>
                    <el-col :span="6" class="label-color">当前节点名称：</el-col>
                    <el-col :span="6"><el-tag type="info">{{data.nodeName}}</el-tag></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">输入表单编码：</el-col>
                    <el-col :span="6"><el-tag type="info">{{data.inputFormCode  || "无"}}</el-tag></el-col>
                    <el-col :span="6" class="label-color">输出表单编码：</el-col>
                    <el-col :span="6"><el-tag type="info">{{data.outputFromCode || "无"}}</el-tag></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">有响应页面：</el-col>
                    <el-col :span="6"><el-tag type="info">{{data.outputFromCode ? "有" : "无"}}</el-tag></el-col>
                    <el-col :span="6" class="label-color">返回节点：</el-col>
                    <el-col :span="6"><el-tag type="info">{{data.returnNode ? data.returnNode : '无'}}</el-tag></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">提取配置：</el-col>
                    <el-col :span="6"><el-tag type="info" :title="data.inputConfig">{{data.inputConfig ? "有" : "无"}}</el-tag></el-col>
                    <el-col :span="6" class="label-color">输出配置：</el-col>
                    <el-col :span="6"><el-tag type="info"  :title="data.outputConfig">{{data.outputConfig ? "有" : '无'}}</el-tag></el-col>
                </el-row>
            </el-card>
        </div>

        <!--当前-->
        <div v-if="type=='01'">
            可以开始
        </div>
        <div v-if="type=='02'">
            结束
        </div>

        <div v-if="type=='03'">
            <!--render-form-->
            <render-form v-if="configdata.list.length>0"
                         :url="url"
                         :configdata="configdata"
                         :remoteFuncs="remoteFuncs"
                         ref="renderForm"
            ></render-form>
        </div>

        <!--操作按钮-->
        <div style="text-align:center;">
            <el-button type="primary" @click="prev">Back</el-button>
            <el-button type="primary" @click="submit">Submit</el-button>
            <el-button type="primary" @click="cancel">Cancel</el-button>
            <el-button type="primary" @click="_get">GET</el-button>
        </div>

        <!--提示信息-->
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
    </div>
</template>

<script>
    // import getFG from 'fg-control';
    import getFG from './fg-control';
    import handler from './fg-utils'
    const FG = new getFG();
    import { queryFlowDetail } from '../../api/flows';
    import { insertNodeData } from '../../api/submit';
    import {platform,user} from './flowData';
    export default {
        name:'flow-demo',
        mixins: [handler],
        filters:{
            filter_Status(type){
                const fsTxt = {
                    '01':"开始节点",
                    '02':"结束节点",
                    '03':"表单节点",
                };

                return fsTxt[type];
            }
        },
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
                    rollbackData:{}
                },
                remoteFuncs: {},
            };
        },
        created() {
            this._getStart();
            this._remote();
        },
        methods: {
            _config(next_node){
                this.data = FG.getNext(next_node);
                this.configdata.list = [FG.getNext(next_node)];
            },
            _getStart() {
                this.showLoading();
                const flowCode = this.$route.name;
                const query = this.$route.query;
                console.log('this.$routes.name:',this.$route.name)
                console.log('this.$routes.query:',this.$route.query)
                let params = {
                    // flowCode:flowCode.replace('buss','')
                    flowCode:query.id
                }
                queryFlowDetail(params).then((res) => {
                    this.hideLoading()
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
            //验证是否可回退
            rollValidate(type, rollback) {
                let res = {error: 0, text: null};
                if (type == FG.START) {
                    res = {error: -1, text: "开始节点不能回退"}
                } else if (type == FG.END) {
                    res = {error: -1, text: "流程已经结束,不能回退"}
                } else if (rollback == FG.CANNOT_ROLLBACK) {
                    res = {error: -1, text: "当前不能回退"}
                }
                return res;
            },
            processData(rollbackData,returnNode){
                if(rollbackData == FG.KEEP_DATA){
                    const nodeData = FG.nodes[returnNode]['up'];
                    this.configdata.rollbackData = nodeData;
                }else if(rollbackData == FG.CLEAR_DATA){
                    delete FG.nodes[returnNode]
                    this.configdata.rollbackData = {}
                }else{
                    this.configdata.rollbackData = {};
                }
            },
            prev() {
                // rollbackData 回退数据处理：01-清除，02-保留不处理
                const {returnNode,rollback,rollbackData, type} = this.data;
                let message = this.rollValidate(type,rollback);
                if(message.error == -1){
                    alert(message.text)
                    return;
                }
                if (rollback == FG.CAN_ROLLBACK && returnNode) {
                    this.data = FG.getPrev(returnNode);
                    this.configdata.list = [this.data];
                    // 数据处理（清除|保留）
                    this.processData(rollbackData,returnNode);

                } else {
                    alert("当前节点不能回退")
                    // this.$handleWarning("没有返回节点了");
                }
            },
            // 下一节点(跳转的业务判断)
            next(next_node) {
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
                                this._config(nextCode);
                                break;
                            }
                        } catch (error) {
                            console.log('===next checkStart===',checkStart)
                            throw new Error(error)
                        }
                    }
                } else {
                    this._config(next_node);
                }
            },
            // 提交
            submit() {
                if(FG.ISOK==false){
                    alert("流程已取消");
                    return
                }
                const {commitType, type, nextNode, commitFunc, nodeCode, outputFromCode,outputConfig} = this.data;
                const commit = commitFunc;

                // 开始节点
                if (type == FG.START) {
                    this._config(nextNode);
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
                    this.next(nextNode);
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
                            insertNodeData(data).then(res => {
                                console.log("=======res..",res)
                                const {header,body} = res;
                                Obj['down'] = body;
                                // 深拷贝
                                const copyObj= JSON.parse(JSON.stringify(Obj));
                                FG.saveNode(nodeCode, copyObj);

                                this.configdata.nodes = FG.getNodes(); // 节点数据

                                alert("提交数据：" + JSON.stringify(Obj));
                                // TODO 有响应页面
                                if (outputFromCode) {
                                    this.$refs.renderForm.changeJsonData(outputFromCode, outputConfig);
                                    FG.OUTFLAG = true;
                                    FG.CURFORM = "inputFormCode";
                                } else {
                                    // TODO 无响应页面,直接跳转到下一节点
                                    this.next(nextNode);
                                }
                            })
                        } else if (commitType == FG.COMMIT_DEFINE) {
                            commit && commit(data)
                        } else if (commitType == FG.COMMIT_ORDER) {

                        } else if (commitType == FG.COMMIT_LOCAL) {

                        }
                    }).catch(error => {
                        // Data verification failed
                        // throw  new Error('Data verification failed')
                        throw  new Error(error)
                    })
                }
                console.log("======FG===========", FG)
                console.log("======FG.CURFORM ===========", FG.CURFORM )
            },
            // 取消
            cancel() {
                const keys = Object.keys(FG.flow);
                keys.forEach(key => {
                    delete  FG.flow[key]
                })
                FG.ISOK = false;
                // this.$handleSuccess("已清理这个流程");
                alert("已清理这个流程");
                console.log('FG', FG)
            },
            // get
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
    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .box-card {
        /*width: 480px;*/
    }
    .label-color{
        font-size:13px;
        /*color: #409EFF;*/
    }
</style>

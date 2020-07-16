<template>
    <div class="render-wrap" style="padding: 20px;" ref="loadingArea">
        <!--data :{{data}}-->
        <!--list :{{configdata.list}}-->
        <!--<br />-->
        <!--rollbackData :{{configdata.rollbackData}} <br>-->
        <!--<hr>-->
        <!--configdata:{{configdata}}-->
        <!--<hr>-->
        <!--data:{{data}}-->
        <!--<hr>-->

        <!--操作按钮-->
        <operation-btns ref="operations" :data="data" :records="records" :formData="formData"
                        @getFormHandler="getFormHandler"></operation-btns>
        <!--节点信息-->
        <current-node :data="data" :records="records"></current-node>

        <!--当前-->
        <div v-if="type=='01'">可以开始</div>
        <div v-if="type=='02'">结束</div>
        <div v-if="type=='03'">
            <!--render-form-->
            <render-form
                    v-if="hackRest && configdata.list.length>0"
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
        </div>
    </div>
</template>

<script>
import operationBtns from './operation-buttons'
import currentNode from './current-node'
// import getFG from 'fg-control';
import getFG from "./js/fg-control";

const FG = new getFG();
import {queryFlowDetail, insertNodeData} from "../../api/flows";
import {RES_OK} from "@/api/config";
import {platform, user} from "./js/flowData";

export default {
    name: "flow-demo",
    components: {
        operationBtns,
        currentNode
    },
    beforeRouteLeave(to, from, next) {
        setTimeout(() => {
            this.$confirm('您要离开当前流程吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                next()
            }).catch(() => {
                next(false)
            });
        })
    },
    computed: {
        type() {
            const {type} = this.data;
            return type
        },
    },
    data() {
        return {
            formData: {}, // 当前表单数据
            loadingInstance: null,
            // 当前节点数据
            data: {},
            // =========数据显示================
            records: [], // 流程数据
            hackRest: true,
            url: "",
            allData: null,
            // 流控数据
            configdata: {
                platform,
                user,
                utils: {},
                nodes: {},
                list: [],
                rollbackData: {}
            },
            remoteFuncs: {}
        };
    },
    created() {
        this._inits();
    },
    watch: {
        "configdata.list": {
            deep: true,
            handler(list) {
                this.resetComponent();
            }
        }
    },
    methods: {
        // 销毁组件
        resetComponent() {
            return new Promise((reslove, reject) => {
                this.hackRest = false;
                this.$nextTick(() => {
                    this.hackRest = true;
                    reslove();
                });
            });
        },
        _inits() {
            // this.showLoading();
            const flowCode = this.$route.name;
            const query = this.$route.query;
            console.log("this.$routes.name:", this.$route.name);
            console.log("this.$routes.query:", this.$route.query);
            let params = {
                // flowCode:flowCode.replace('buss','')
                flowCode: query.id
            };
            queryFlowDetail(params)
                .then(res => {
                    console.log('res', res)
                    const {rspCode} = res;
                    // this.hideLoading()
                    if (rspCode == RES_OK) {
                        const list = res.detail.records;
                        let funcCollection = res.define.funcCollection;
                        const funcObject = FG.solveCommonJS(funcCollection);

                        // records数据
                        this.records = list;

                        // 挂载数据
                        FG.setData("user", user);
                        FG.setData("platform", platform);
                        FG.setData("list", list); // 流控数据
                        FG.setData("utils", funcObject); // 公共函数

                        // 启动开始节点
                        const startNode = FG.getStartNode();
                        const {checkStart, nodeCode} = startNode;
                        if (FG.checkStart(checkStart)) {
                            this.data = startNode;
                            this.configdata.list = [startNode];
                            this.configdata.utils = funcObject;
                            FG.ISOK = true;
                            FG.pushProcess(nodeCode);
                            console.log(`开始节点${nodeCode},检查通过,可以执行`);
                        } else {
                            // this.$handleWarning(`当前节点${node_code}不能执行`);
                            alert(`当前节点${nodeCode}不能执行`);
                        }
                    }
                })
                .catch(error => {
                    throw new Error(error);
                });
        },

        config(next_node) {
            if (next_node) {
                const temp = FG.getNodeData(next_node);
                const {checkStart} = temp;
                if (FG.checkStart(checkStart)) {
                    this.data = temp;
                    // console.log('this.next_node',next_node)
                    // console.log('this.data',this.data)
                    this.configdata.list = [this.data];
                    this.configdata.rollbackData = {};
                    FG.pushProcess(next_node);
                    console.log(`开始节点${next_node}，检查通过,可以执行一下步`);
                } else {
                    alert(`当前节点${next_node}不能执行`);
                }
            }
        },

        //验证是否可回退
        rollValidate() {
            let res = {error: 0, text: null};
            let {type, rollback, returnNode} = this.data;
            if (rollback == FG.CANNOT_ROLLBACK || !rollback) {
                res = {error: -1, text: "当前节点不能回退"};
            }
            if (type == FG.START) {
                res = {error: -1, text: "开始节点不能回退"};
            }
            if (type == FG.END) {
                res = {error: -1, text: "流程已经结束,不能回退"};
            }
            if (returnNode) {
                // 判断上一节点是否在当前的返回列表中
                const ret = this._findBackNode(returnNode);
                if (!ret) {
                    res = {error: -1, text: "上一节点不在设置的回退数组中，不能回退"};
                }
            }
            return res;
        },
        processData(rollbackDataFlag, returnNode) {
            if (rollbackDataFlag == FG.KEEP_DATA) {
                // 保留数据
                const nodeData = FG.nodes[returnNode]["up"];
                this.configdata.rollbackData = nodeData;
            }
            if (rollbackDataFlag == FG.CLEAR_DATA) {
                // 清除数据
                delete FG.nodes[returnNode];
            }
        },

        // 上一节点
        prev() {
            this.configdata.rollbackData = {};
            // rollbackData 回退数据处理：01-清除，02-保留不处理
            const {rollback, rollbackData, returnNode} = this.data;
            // 判断能否回退
            let message = this.rollValidate();
            if (message.error == -1) {
                alert(message.text);
                return;
            }

            // 清除当前节点后面的执行过点的节点
            const prevNodeCode = this._findBackNode(returnNode); // 要回退到的节点
            const processArr = FG.getProcess();
            const index = processArr.findIndex(node => {
                return node == prevNodeCode;
            })
            if (processArr.length > 0) {
                processArr.splice(index)
                FG.setProcess(processArr)
            }

            //  回退数据处理
            if (rollback == FG.CAN_ROLLBACK && prevNodeCode) {
                const tempData = FG.getNodeData(prevNodeCode);
                const {checkStart} = tempData;
                console.log('prev checkStart', checkStart)
                if (FG.checkStart(checkStart)) {
                    this.data = tempData;
                    this.configdata.list = [tempData];
                    // 数据处理（清除|保留）
                    this.processData(rollbackData, prevNodeCode);
                    FG.pushProcess(prevNodeCode);
                }
            }
        },
        // 下一节点(跳转的业务判断)
        next(nextNodes) {
            let findMyNode = ""; // 最终要执行的节点
            if (nextNodes && nextNodes.includes(",")) {
                // 多节点
                const nodes = nextNodes.split(",");

                function filters(j) {
                    let oneNode = nodes[j];
                    return FG.list.filter(fl => fl.nodeCode == oneNode)[0];
                }

                for (let j = 0; j < nodes.length; j++) {
                    const nextFlow = filters(j);
                    const checkStart = nextFlow["checkStart"];
                    const nextCode = nextFlow["nodeCode"];
                    try {
                        // console.log('checkStart', checkStart)
                        if (FG.checkStart(checkStart)) {
                            findMyNode = nextCode;
                            break;
                        } else {
                            console.log('checkStart error:', checkStart)
                        }
                    } catch (error) {
                        console.log("===next checkStart===", checkStart);
                        throw new Error(error);
                    }
                }
            } else {
                // 单节点
                findMyNode = nextNodes;
            }

            // 执行
            if (findMyNode) {
                this.config(findMyNode);
            } else {
                this.$notify.error({
                    title: "错误",
                    message: `往下执行的节点${nextNodes}没有通过启动验证`
                });
            }
        },
        // 提交
        submit() {
            const {
                commitType,
                type,
                nextNode,
                commitFunc,
                nodeCode,
                outputFromCode,
                outputConfig
            } = this.data;
            const commit = commitFunc;

            if (FG.ISOK == false) {
                alert("流程已取消");
                return;
            }
            // 结束节点
            if (type == FG.END) {
                // this.$handleInfo("流程已经结束");
                alert("流程已经结束");
                return;
            }
            // 开始节点
            if (type == FG.START) {
                this.config(nextNode);
                return;
            }

            // 响应页面
            if (FG.OUTFLAG) {
                FG.OUTFLAG = false;
                this.next(nextNode);
                return false;
            }

            if (type == FG.DOING) {
                // 执行节点
                const nodePromise = this.$refs.renderForm.getData();
                nodePromise
                    .then(data => {
                        console.log("res", data);
                        // 提交类型
                        if (commitType == FG.COMMIT_DEFAULT) {
                            const Obj = {
                                up: data,
                                down: null
                            };
                            insertNodeData(data)
                                .then(res => {
                                    console.log("=======res..", res);
                                    const {header, body} = res;
                                    Obj["down"] = {
                                        ...body.data,
                                        resCode: body.resCode
                                    };
                                    alert("提交数据：" + JSON.stringify(Obj));
                                    // 深拷贝
                                    const copyObj = JSON.parse(JSON.stringify(Obj));
                                    FG.saveNode(nodeCode, copyObj);
                                    this.configdata.nodes = FG.getNodes(); // 节点数据
                                    // return Promise.resolve();
                                })
                                .then(res => {
                                    if (outputFromCode) {
                                        // TODO 有响应页面
                                        this.$refs.renderForm.changeJsonData(
                                            outputFromCode,
                                            outputConfig
                                        );
                                        FG.OUTFLAG = true;
                                        // FG.CURFORM = "inputFormCode";
                                    } else {
                                        // TODO 无响应页面,直接跳转到下一节点
                                        this.next(nextNode);
                                    }
                                });
                        } else if (commitType == FG.COMMIT_DEFINE) {
                            // function commit(data){
                            //     return data;
                            // }
                            // commit && commit(data);

                        } else if (commitType == FG.COMMIT_ORDER) {
                        } else if (commitType == FG.COMMIT_LOCAL) {
                            // 本地提交
                            const nodePromise = this.$refs.renderForm.getData();
                            nodePromise.then(data => {
                                const Obj = {
                                    up: data,
                                    down: {...data, resCode: "000000"}
                                };
                                alert("提交数据：" + JSON.stringify(Obj));
                                const copyObj = JSON.parse(JSON.stringify(Obj));
                                FG.saveNode(nodeCode, copyObj);
                                this.configdata.nodes = FG.getNodes(); // 节点数据
                                // 下一节点
                                // this.next(nextNode);
                            }).then(res => {
                                if (outputFromCode) {
                                    // TODO 有响应页面
                                    this.$refs.renderForm.changeJsonData(
                                        outputFromCode,
                                        outputConfig
                                    );
                                    FG.OUTFLAG = true;
                                } else {
                                    // TODO 无响应页面,直接跳转到下一节点
                                    this.next(nextNode);
                                }
                            });
                        }
                    })
                    .catch(error => {
                        // Data verification failed
                        throw new Error(error);
                    });
            }
            // console.log("======FG.CURFORM ===========", FG.CURFORM )
        },
        // 取消
        cancel() {
            const keys = Object.keys(FG.nodes);
            keys.forEach(key => {
                delete FG.nodes[key];
            });
            FG.ISOK = false;
            // this.$handleSuccess("已清理这个流程");
            alert("已清理这个流程");
            console.log("FG", FG);
        },
        getFormHandler() {
            if (this.$refs.renderForm) {
                this.$refs.renderForm.getData().then(data => {
                    console.log("data...", data)
                    this.formData = data;
                    this.$refs.operations.show();
                })
            } else {
                this.$notify.info({
                    title: '消息',
                    message: '当前节点没有表单,不能获取数据'
                });
            }
        },
        _findBackNode(returnNode) {
            let ret = null;
            let processData = FG.getProcess().slice();
            // 判断上一节点是否在当前的返回列表中
            let backNodes = [];
            if (returnNode && returnNode.includes(",")) {
                // 多节点
                backNodes = returnNode.split(",");
            } else {
                // 单节点
                backNodes.push(returnNode);
            }

            function findBack() {
                if (processData.length > 0) {
                    let lastNode = processData.pop();
                    if (backNodes.includes(lastNode) == false) {
                        findBack(processData, backNodes)
                    } else {
                        ret = lastNode
                    }
                }
            }

            findBack();
            return ret;
        },
    }
};
</script>

<style lang="scss" scoped>
    .render-wrap {
        margin-top: 20px;
    }

</style>

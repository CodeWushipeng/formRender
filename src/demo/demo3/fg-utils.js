// 节点
// nodes.CreateCusInfo.name
// 用户数据
// common.user.name
// 平台数据
// common.plateform.name
import { Loading } from 'element-ui';
import getFG from './fg-control';
const FG = new getFG();
const flowMixin= {
    filters: {
        filter_Status(type) {
            const fsTxt = {
                '01': "开始节点",
                '02': "结束节点",
                '03': "表单节点",
            };
            return fsTxt[type];
        }
    },
    data(){
        return {
            loadingInstance:null,
            // 当前节点数据
            data: {
                // outputFromCode:null
            },
            // =========数据显示================
            records:[], // 流程数据
            flowDialogTableVisible:false,
            userDialogTableVisible:false,
            platformDialogTableVisible:false,
            nodesDialogTableVisible:false,
            formDialogTableVisible:false,
            processDialogTableVisible:false,
            listData:[],
            usreData:[],
            usreDataSolve:[],
            platformData:[],
            platformDataSolve:[],
            nodesData:[],
            nodesDataSolve:[],
            curFormData:[],
            curFromDataSolve:[],
            processDataList:[]
        }
    },
    computed: {
        recordsLength(){
            return this.records.length
        },
        type() {
            const { type} = this.data;
            return type
        },
        // 当前流程执行过程
        processDataListSolve(){
            debugger
            let ret = [];
            this.processDataList.forEach(item=>{
                let rds = this.records.filter(value =>{
                    return value.nodeCode == item
                });
                console.log('rds...',rds)
                if(rds.length>0){
                    ret.push({
                        title:item,
                        description:rds[0]['nodeName'] || "没有文字提示"
                    })
                }
            })
            return ret;
        }
    },
    methods:{
        showLoading(){
            this.loadingInstance = Loading.service();
        },
        hideLoading(){
            setTimeout(()=>{
                this.loadingInstance.close();
            },500)
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
        getFormHandler(){
            if(this.$refs.renderForm){
                this.$refs.renderForm.getData().then(data=>{
                    // alert(JSON.stringify(data));

                    let res =[];
                    for(let key in data){
                        const value = data[key]
                        res.push({
                            key:key,
                            value: typeof  value == "object" ? JSON.stringify(value) : value
                        })
                    }

                    this.curFormData = data;
                    this.curFromDataSolve = res;
                    this.formDialogTableVisible = true;

                })
            }else{
                this.$notify.info({
                    title: '消息',
                    message: '当前节点没有表单,不能获取数据'
                });
            }
        },
        getProcessHandler(){
            this.processDialogTableVisible = true;
            this.processDataList = FG.getProcess()
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
        filterStatus(type) {
            if (!type) return '';
            const fsTxt = {
                '01':"开始节点",
                '02':"结束节点",
                '03':"表单节点",
            };

            return fsTxt[type];
        },
        filterType(type) {
            if (!type) return '';
            const elTag = {
                '01':"",
                '02':"danger",
                '03':"success",
            };

            return elTag[type];
        },
        _findBackNode(returnNode){
            let ret = null;
            let processData = FG.getProcess().slice();
            // 判断上一节点是否在当前的返回列表中
            let backNodes = [] ;
            if (returnNode && returnNode.includes(",")) {
                // 多节点
                backNodes = returnNode.split(",");
            }else{
                // 单节点
                backNodes.push(returnNode);
            }

            function findBack() {
                if(processData.length>0){
                    let lastNode = processData.pop();
                    if(backNodes.includes(lastNode) == false){
                        findBack(processData, backNodes)
                    }else{
                        ret = lastNode
                    }
                }
            }
            findBack();
            return ret;
        },
    }
}
export default flowMixin;

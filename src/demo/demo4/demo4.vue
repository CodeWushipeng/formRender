<template>
  <div class="render-wrap" style="padding: 20px; " ref="loadingArea">
    <div>
     <!--{{hackRest}}-->
      <!--{{configdata.list}}-->
      <!--debug:{{debug}}-->
      <!--btnIndex:{{btnIndex}} <br>-->
      <!--Rank_BTNS:{{displayBtn()}} <br>-->
      <!--data :{{data}}-->
      <!--list :{{ configdata.list}}-->
      <!--<br />-->
      <!--rollbackData :{{configdata.rollbackData}} <br>-->
      <!--<hr>-->
      <!--configdata:{{configdata}}-->
      <!--<hr>-->
      <!--data:{{data}}-->
      <!--<hr>-->
    </div>
    <div class="buss-container">
      <div class="buss" id="buss" :style="bussStyle">
        <div :class="mainClass">
          <!--节点信息-->
          <h3>{{nodeName}}</h3>
          <!--当前-->
          <div v-if="nodeType=='01'">可以开始</div>
          <div v-if="nodeType=='02'">结束</div>
          <div v-if="nodeType=='03'">
            <!--render-form-->
            <render-form v-if="hackRest && configdata.list.length>0"
                         :configdata="configdata"
                         ref="renderForm"
            >
              <!--操作按钮-->
              <div style="text-align:center;">
                <el-button ref="back" @click="prev"><i class="el-icon-arrow-left"></i>上一步</el-button>
                <el-button ref="submit" @click="submit">下一步 <i class="el-icon-arrow-right"></i></el-button>
                <el-button ref="cancel" @click="cancel"><i class="el-icon-top-left"></i>取消</el-button>
              </div>
            </render-form>

            <flowDialog ref="flowDialog"></flowDialog>
          </div>
        </div>
        <!--拖拽-->
        <div class="drag" v-drag v-if="debug"></div>
      </div>
      <div class="debugs" id="debugs" v-if="debug">
        <!--操作按钮-->
        <flowDebug ref="flowDebug"
                   :data="data"
                   :records="records"
                   :formData="formData"
                   @onFormHandler="onFormHandler"/>
      </div>
    </div>
  </div>
</template>
<script>
  // import  { oneCase,Toolkit,Api} from './js/core/index';
  import  { oneCase,Toolkit,Api} from 'fg-control';
  import request from '../commonjs/request';
  import flowDebug from './flow-debug';
  import flowDialog from './flow-dialog';
  import {queryFlowDetail} from "@/api/flows";
  import  {flowMixin,beforeRoute,alert} from './js/mixins';
  import directives from './js/drag-directives';
  import {RES_OK} from "@/api/config";
  import {platform, user,requestASyns} from "./js/mock-data";
  const grid = new oneCase();
  export default {
    name: "flowMysDemos",
    mixins: [flowMixin],
    components:{
      flowDebug,
      flowDialog,
    },
    directives: {
      ...directives
    },
    ...beforeRoute,
    computed: {
      nodeName(){
        return this.data.nodeName;
      },
      nodeType() {
        return this.data.type;
      },
      isDebugMode() {
        return true;
      },
      bussStyle() {
        return this.debug == false ? 'width:100%' : 'width:50%';
      },
      mainClass() {
        return this.debug == false ? 'mains' : 'mains-debug';
      }
    },
    data(){
      return{
        formData: {}, // 当前表单数据
        data: {}, // 当前节点数据
        // =========数据显示================
        records: [], // 流程数据
        // 流控数据
        configdata: {
          platform:null,
          user:null,
          indata:{},
          utils: {},
          nodes: {},
          list: [],
          rollbackData: {}
        },
      }
    },
    created(){
      // console.log('Instance',Instance)
    },
    mounted(){
      this.init()
      this.openDebug(this);
    },
    methods:{
      async init(){
        debugger
        let resdata = await this.fetchFlow();
        // 存储流控数据
        grid.build(user,platform,resdata);
        // 找到开始节点
        const startNode = grid.getStart();
        // 配置启动数据
        this.startSet(startNode);
        // 处理数据
        this.pageInit(startNode);
        // 检查开始节点
        this.firstNode(startNode);
      },
      pageInit(startNode){
        const busdata = grid.busdata;
        const operdata = grid.operdata;
        this.data = startNode;
        // records数据
        this.records = busdata.list;
        this.extendsConfig({
          platform:busdata.platform,
          user:  busdata.user,
          indata:busdata.indata,
          utils: busdata.utils,
          nodes: operdata.nodes,
          list: [startNode],
        })
      },
      fetchFlow(){
        console.log("debugger....")
        const query = this.$route.query;
        // const flowCode = this.$route.name;
        // console.log("this.$routes.name:", this.$route.name);
        // console.log("this.$routes.query:", this.$route.query);
        let params = {
          // flowCode:flowCode.replace('buss','')
          flowCode: query.id,
        };
        return queryFlowDetail(params).then(res=>{
          const {rspCode} = res.header;
          if (rspCode == RES_OK) {
            return res
          }
        }).catch(err=>{
          throw new Error("查询流控数据失败！")
        })
      },

      async startSet(startNode){
        debugger
        //配置启动数据
        const {initFunc} = startNode;
        const indata = await grid.getStartSet(this,initFunc,request);
        // const indata = {name:11,age:111}
        grid.busdata.setIndata(indata)
      },
      async firstNode(startNode) {
        // 处理开始节点
        const {checkStart, nodeCode} = startNode;
        const isOk = await grid.checkHandler(checkStart)
        if (isOk) {
          grid.setUsable(true);
          grid.pushProcess(nodeCode);
          this.submit();
        } else {
          alert(`当前节点${nodeCode}不能执行`);
        }
      },
      locationToNext(next_node){
        // 跳转到下一个节点
        if (next_node) {
          const temp = grid.getNodeData(next_node);
          const {checkStart} = temp;
          if (grid.checkHandler(checkStart)) {
            this.extendsConfig({
              list:[temp]
            })
            this.data = temp;
            grid.pushProcess(next_node);
            console.log(`开始节点${next_node}，检查通过,可以执行一下步`);
          } else {
            alert(`当前节点${next_node}不能执行`);
          }
        }
      },
      async submit() {
        debugger
        const {
          commitType,
          type,
          nextNode,
          commitFunc,
          nodeCode,
        } = this.data;

        // 提交检查
        const checkmsg = Toolkit.matrix.checkSubmit(grid.busdata,grid.operdata,type,commitType);
        if(checkmsg.status){
          alert(checkmsg.error);
          return
        }

        // 开始节点
        if (type == Toolkit.static.isStart) {
          debugger
          this.locationToNext(nextNode);
          return;
        }

        // 响应页面
        if (grid.operdata.outflag) {
          grid.setOutFlag(false);
          this.locationToNext(nextNode);
          return false;
        }

        function judgeCommit(staticCommitType) {
          return type === Toolkit.static.isBusing && commitType === staticCommitType;
        }

        // 其他节点
        this.subInstance = new Api(request); // 提交实例
        const formdata = await this.$refs['renderForm'].getData();
        let resdata = null;

        if (judgeCommit(Toolkit.static.isDefaultType)) {
          alert('COMMIT_DEFAULT')
          resdata = await this.subInstance.defaultCommit(commitFunc,formdata)
          if(resdata){
            grid.saveNodeData(formdata,resdata,nodeCode)
            this.responseExec(this.data)
          }
        }
        if (judgeCommit(Toolkit.static.isDefineType)) {
          alert('COMMIT_DEFINE')
          resdata = await this.subInstance.defineCommit(this,commitFunc);
          if(resdata){
            grid.saveNodeData(formdata, resdata, nodeCode);
            this.responseExec(this.data)
          }
        }
        if (judgeCommit(Toolkit.static.isLocalType)) {
          alert('COMMIT_LOCAL')
          resdata = await this.subInstance.localCommit(formdata);
          if(resdata){
            grid.saveNodeData(formdata,resdata,nodeCode)
            this.responseExec(this.data)
            this.extendsConfig({
              nodes: grid.getNodes() // 节点数据
            })
          }
        }
        if (judgeCommit(Toolkit.static.isOrderType)) {
          alert('COMMIT_ORDER');
          resdata = await this.subInstance.orderCommit(formdata)
          if(resdata){
            grid.saveNodeData(formdata, resdata, nodeCode);
            this.$refs.flowDialog.show();
          }
        }
      },
      extendsConfig(object){
        // 合并数据
        Object.assign(this.configdata, object)
      },
      responseExec(data) {
        const {outputFromCode, outputConfig, nextNode}  = data;
        let $renderForm = this.$refs.renderForm;
        if (outputFromCode) {
          // 有响应页面
          $renderForm.changeJsonData(
              outputFromCode,
              outputConfig
          );
          grid.setOutFlag(true)
        } else {
          // 无响应页面
          const findNextNode  = grid.findNext(nextNode);
          // 执行
          if (findNextNode) {
            this.locationToNext(findNextNode);
          } else {
           alert(`往下执行的节点${nextNode}没有通过启动验证`)
          }
        }
      },
      onFormHandler() {
        const $refs = this.$refs.renderForm;
        if ($refs) {
          $refs.getData().then(data => {
            // console.log("data...", data)
            this.formData = data;
          })
        } else {
          // this.$notify.info({
          //   title: '消息',
          //   message: '当前节点没有表单,不能获取数据'
          // });
          alert("当前节点没有表单,不能获取数据")
        }
      },
      // 上一节点
      prev() {
        debugger
        if (grid.getUsable() == false) {
          alert("当前流程已经取消")
          return;
        }
        // this.configdata.rollbackData = {};
        // rollbackData 回退数据处理：01-清除，02-保留不处理
        const {rollback, rollbackData, returnNode} = this.data;

        // 判断能否回退
        const checkmsg = Toolkit.matrix.checkPrev(grid,this.data);
        if(checkmsg.status){
          alert(checkmsg.error);
          return
        }

        // 清除当前节点后面的执行过点的节点
        let processList = grid.getProcess().slice();
        const prevCode = Toolkit.matrix.handleBackNode(returnNode, processList); // 要回退到的节点
        const index = processList.findIndex(node => {
          return node == prevCode;
        })
        if (processList.length > 0) {
          processList.splice(index)
          grid.setProcess(processList)
        }

        // 是否已到开始节点
        const {type} = grid.getNodeData(prevCode);
        if (type == Toolkit.static.isStart) {
          alert("已到达第一个执行节点");
          return
        }
        //  回退数据处理
        if (rollback == Toolkit.static.canRollBack && prevCode) {
          let operObj = {
            rollbackData: {},
            nodes: []
          };
          if (rollbackData == Toolkit.static.keepIt) {
            // 保留数据
            const updata = grid.operdata.nodes[returnNode]["up"];
            operObj.rollbackData = updata;
          }
          if (rollbackData == Toolkit.static.clearIt) {
            // 清除数据
            delete grid.operdata.nodes[returnNode];
            operObj.nodes = grid.operdata.nodes;
          }
          this.extendsConfig(operObj);
          // 加载节点
          this.locationToNext(prevCode);
        }
      },
      cancel(){
        grid.destroyGrid();
        this.$refs['flowDebug'].nodesHandler()
        alert("已清理这个流程");
        // this.$router.push("/");
      },
    }
  }
</script>


<style lang="scss" scoped>
  .render-wrap {
    margin-top: 20px;
  }

  // flex
  @mixin flexLayout() {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
  }

  .buss-container {
    @include flexLayout;
    height: 100%;
    /*border:1px solid red;*/
    div {
      /*min-height: 200px;*/
    }
    .buss {
      width: 50%;
      order: 0;
      @include flexLayout;
      flex-grow: 0;
      .mains {
        width: 90%;
        flex-grow: 1;
        padding-right: 0px;
      }
      .mains-debug {
        flex-grow: 1;
        width: 100%;
        padding-right: 10px;
      }
      .drag {
        border-radius: 3px;
        width: 10px;
        background: #F5F7FA;
        cursor: w-resize;
      }
    }
    .debugs {
      min-height: 800px;
      padding-left: 10px;
      flex-grow: 1;
      order: 1;
      overflow: hidden;
    }
  }
</style>

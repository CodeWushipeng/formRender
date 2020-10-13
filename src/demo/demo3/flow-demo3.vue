<template>
  <div class="render-wrap" style="padding: 20px; " ref="loadingArea">
    <div>
      <!--debug:{{debug}}-->
      <!--flowType:{{flowType}}-->
      <!--btnIndex:{{btnIndex}} <br>-->
      <!--Rank_BTNS:{{displayBtn()}} <br>-->
    </div>
    <!--{{leftCol}} <br>-->
    <!--{{rightCol}} <br>-->
    <!--data :{{data}}-->
    <!--list :{{configdata.list}}-->
    <!--<br />-->
    <!--rollbackData :{{configdata.rollbackData}} <br>-->
    <!--<hr>-->
    <!--configdata:{{configdata}}-->
    <!--<hr>-->
    <!--data:{{data}}-->
    <!--<hr>-->
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
                         :remoteFuncs="remoteFuncs"
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
                   @getFormHandler="getFormHandler"/>
      </div>

    </div>
  </div>
</template>
<script>
  import request from './js/request';
  import flowDebug from './flow-debug';
  import flowDialog from './flow-dialog';
  import getFG from 'fg-control';
  // import getFG from "./js/fg-control";
  import {queryFlowDetail} from "@/api/flows";
  import {RES_OK} from "@/api/config";
  import flowMixin from './js/mixins';
  import directives from './js/directives';
  import {handleBackNode, handleRemoteFn, beforeRoute} from './js/util';
  import {platform, user} from "./js/mock-data";

  const FG = new getFG();

  export default {
    name: "flowDemo",
    mixins: [flowMixin],
    components: {
      flowDebug,
      flowDialog,
    },
    directives: {
      ...directives
    },
    ...beforeRoute,
    data() {
      return {
        formData: {}, // 当前表单数据
        // 当前节点数据
        data: {},
        // =========数据显示================
        records: [], // 流程数据
        flowType:null,
        // url: "",
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
      this.initflow();
      this.openDebug(this);
    },
    watch: {
      "configdata.list": {
        deep: true,
        handler(list) {
          this.resetComponent();
        }
      },
      debug: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
    },
    methods: {

      initflow() {
        const query = this.$route.query;
        // const flowCode = this.$route.name;
        // console.log("this.$routes.name:", this.$route.name);
        // console.log("this.$routes.query:", this.$route.query);
        let params = {
          // flowCode:flowCode.replace('buss','')
          flowCode: query.id
        };
        // return
        queryFlowDetail(params).then(res => {
          // debugger
          console.log('res', res)
          const {rspCode} = res.header;
          if (rspCode == RES_OK) {
            const list = res.body.detail.records;
            let funcObject = null;
            if(res.body.define){
              let flowType = res.body.define.flowType || null;
              let funcCollection = res.body.define.funcCollection;
              funcObject = funcCollection ? FG.solveCommonJS(funcCollection) : {};
              this.flowType = flowType;
            }
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
              // this.configdata.list = [startNode];
              // this.configdata.utils = funcObject;
              Object.assign(this.configdata, {
                list: [startNode],
                utils: funcObject,
              })
              this.data = startNode;
              FG.ISOK = true;
              FG.pushProcess(nodeCode);
              console.log(`开始节点${nodeCode},检查通过,可以执行`);
              this.submit();
            } else {
              alert(`当前节点${nodeCode}不能执行`);
            }
          }
        }).catch(error => {
          throw new Error(error);
        });
      },
      config(next_node) {
        if (next_node) {
          const temp = FG.getNodeData(next_node);
          const {checkStart} = temp;
          if (FG.checkStart(checkStart)) {
            Object.assign(this.configdata, {
              list: [temp],
              rollbackData: {},
            })
            this.data = temp;
            FG.pushProcess(next_node);
            console.log(`开始节点${next_node}，检查通过,可以执行一下步`);
          } else {
            alert(`当前节点${next_node}不能执行`);
          }
        }
      },
      //验证是否可回退
      validateBack() {
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
          let processData = FG.getProcess().slice();
          const ret = handleBackNode(returnNode, processData);
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
        debugger
        this.configdata.rollbackData = {};
        // rollbackData 回退数据处理：01-清除，02-保留不处理
        const {rollback, rollbackData, returnNode} = this.data;
        // 判断能否回退
        let message = this.validateBack();
        if (message.error == -1) {
          alert(message.text);
          return;
        }
        if (!returnNode) {
          alert("没有设置返回的节点")
          return
        }

        // 清除当前节点后面的执行过点的节点
        let processData = FG.getProcess().slice();
        const prevNodeCode = handleBackNode(returnNode, processData); // 要回退到的节点
        const index = processData.findIndex(node => {
          return node == prevNodeCode;
        })
        if (processData.length > 0) {
          processData.splice(index)
          FG.setProcess(processData)
        }

        //  回退数据处理
        if (rollback == FG.CAN_ROLLBACK && prevNodeCode) {
          const tempData = FG.getNodeData(prevNodeCode);
          const {checkStart, type} = tempData;
          if (type == FG.START) {
            alert("已到达第一个执行节点");
            return
          }
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
        let findNextNode = ""; // 最终要执行的节点
        if (nextNodes && nextNodes.includes(",")) {
          // 多节点
          const nodes = nextNodes.split(",");

          function findNode(j) {
            let nodeId = nodes[j];
            return FG.list.find(fl => fl.nodeCode == nodeId);
          }

          for (let j = 0; j < nodes.length; j++) {
            const nextFlow = findNode(j);
            try {
              if (FG.checkStart(nextFlow["checkStart"])) {
                findNextNode = nextFlow["nodeCode"];
                break;
              } else {
                console.log('checkStart error:', nextFlow["checkStart"])
              }
            } catch (error) {
              throw new Error(error);
            }
          }
        } else {
          // 单节点
          findNextNode = nextNodes;
        }
        // 执行
        if (findNextNode) {
          const nodeData = FG.getNodeData(findNextNode)
          const {type,commitType} = nodeData;
          if((type == FG.END || commitType == FG.COMMIT_ORDER) && this.flowType == "01"){
            // 订单提交
            this.$refs.flowDialog.show();
          }else{
            this.config(findNextNode);
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: `往下执行的节点${nextNodes}没有通过启动验证`
          });
        }
      },
      saveData(data, response, nodeCode) {
        const Obj = {
          up: data,
          down: null
        };
        Obj["down"] = {...response, rspCode: "SP000000"};
        console.log("通信提交响应数据：" + JSON.stringify(Obj));
        const copyObj = JSON.parse(JSON.stringify(Obj));
        FG.saveNode(nodeCode, copyObj);
        Object.assign(this.configdata, {
          nodes: FG.getNodes() // 节点数据
        })
      },
      execRespone(outputFromCode, outputConfig, nextNode) {
        if (outputFromCode) {
          // 有响应页面
          this.$refs.renderForm.changeJsonData(
              outputFromCode,
              outputConfig
          );
          FG.OUTFLAG = true;
        } else {
          // 无响应页面
          this.next(nextNode);
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
          debugger
          const nodePromise = this.$refs.renderForm.getData();
          // 执行节点
          nodePromise.then(data => {
            console.log("res", data);
            if(!commitType){
              alert("提交失败，当前节点没有设置提交类型");
              return
            }
            // 提交类型
            if (commitType == FG.COMMIT_DEFAULT) {
              //  通信提交
              request({
                url: `/requestForward/${commit}`,
                method: 'post',
                data
              }).then(response => {
                const {statusCode} = response;
                if (statusCode == 200) {
                  this.saveData(data, response, nodeCode);
                  return true
                } else {
                  return false
                }
              }).then((resFlag) => {
                if (resFlag == false) {
                  alert("通信提交响应数据失败");
                  return
                }
                this.execRespone(outputFromCode, outputConfig, nextNode)
              }).catch(err => {
                throw new Error(err)
              })
            }
            if (commitType == FG.COMMIT_DEFINE) {
              // 自定义提交
              commit && handleRemoteFn(commit).then(response => {
                this.saveData(data, response, nodeCode)
                // return Promise.resolve();
              }).then(() => {
                this.execRespone(outputFromCode, outputConfig, nextNode)
              }).catch(err => {
                throw new Error(err);
              })
            }
            if (commitType == FG.COMMIT_LOCAL) {
              // 本地提交
              nodePromise.then(data => {
                let _response = Object.assign({}, data);
                this.saveData(data, _response, nodeCode)
              }).then(res => {
                this.execRespone(outputFromCode, outputConfig, nextNode)
              });
            }
            if (commitType == FG.COMMIT_ORDER) {
              // 订单提交
              this.next(nodeCode)
            }
          }).catch(error => {
            // Data verification failed
            throw new Error(error);
          });
        }
      },
      // 取消
      cancel() {
        const keys = Object.keys(FG.nodes);
        keys.forEach(key => {
          delete FG.nodes[key];
        });
        FG.ISOK = false;
        alert("已清理这个流程");
        console.log("FG", FG);
        this.$router.push("/");
      },

      getFormHandler() {
        if (this.$refs.renderForm) {
          this.$refs.renderForm.getData().then(data => {
            console.log("data...", data)
            this.formData = data;
            this.$refs.flowDebug.show();
          })
        } else {
          this.$notify.info({
            title: '消息',
            message: '当前节点没有表单,不能获取数据'
          });
        }
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

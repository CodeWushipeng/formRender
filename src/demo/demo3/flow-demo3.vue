<template>
  <div class="render-wrap" style="padding: 20px; " ref="loadingArea">
    <div>
      canEnter:{{canEnter}}
      <!--debug:{{debug}}-->
      <!--btnIndex:{{btnIndex}} <br>-->
      <!--Rank_BTNS:{{displayBtn()}} <br>-->
      <!--<el-input v-model="btnIndex" disabled></el-input>-->
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
          <h3>{{data.nodeName}}</h3>
          <!--当前-->
          <div v-if="NodeType=='01'">可以开始</div>
          <div v-if="NodeType=='02'">结束</div>
          <div v-if="NodeType=='03'">
            <!--render-form-->
            <render-form  @has-end="hasEnd"
                    v-if="hackRest && configdata.list.length>0"
                    :url="url"
                    :configdata="configdata"
                    :remoteFuncs="remoteFuncs"
                    ref="renderForm"
            />
          </div>

          <!--操作按钮-->

          <div style="text-align:center;">
            <el-button ref="back" :type="getBtnType(0)" @click="prev">Back</el-button>
            <el-button ref="submit" :type="getBtnType(1)" @click="submit">Submit</el-button>
            <el-button ref="cancel" :type="getBtnType(2)" @click="cancel">Cancel</el-button>
          </div>
        </div>
        <!--拖拽-->
        <div class="drag" v-drag v-if="debug"></div>
      </div>
      <div class="debugs" id="debugs" v-if="debug">
        <!--操作按钮-->
        <flowBtns ref="operations"
                  :data="data"
                  :records="records"
                  :formData="formData"
                  @getFormHandler="getFormHandler"/>
      </div>
    </div>
  </div>
</template>

<script>
  import storage from 'good-storage';
  import request from './js/request';
  import flowBtns from './flow-buttons';
  // import getFG from 'fg-control';
  import getFG from "./js/fg-control";

  const FG = new getFG();
  import {queryFlowDetail} from "@/api/flows";
  import {RES_OK} from "@/api/config";
  import flowMixin, {subControls} from './js/mixins'
  import directives from './js/directives'
  import {handleBackNode,handleRemoteFn,beforeRoute} from './js/util'
  import {platform, user} from "./js/flowData";

  const DEBUG_KEY = '__debug__';

  export default {
    name: "flowDemo",
    mixins: [flowMixin],
    components: {
      flowBtns,
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
        hackRest: true,
        url: "",
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
      console.log('flowMixin',flowMixin)
      this.inits();
      this.openDebug(this);
    },
    watch: {
      "configdata.list": {
        deep: true,
        handler(list) {
          this.resetComponent();
        }
      },
      data:function(){
        this.canEnter =false;
      },
      debug: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
    },
    methods: {
      ...subControls,
      openDebug(_this) {
        const _self = _this;
        let code = 0;
        let code2 = 0;
        let timer = null;
        this.debug = storage.session.get(DEBUG_KEY, false)
        document.onkeydown = function (e) {
          clearTimeout(timer);
          //事件对象兼容
          let e1 = e || event || window.event || arguments.callee.caller.arguments[0];
          console.log('e1.keyCode', e1.keyCode)
          const key = e1.keyCode;
          if (key === 16) { // key:shift
            code = 1;
          }
          if (key === 50) { // key:2
            code2 = 1;
          }
          if (code === 1 && code2 === 1) {
            // alert('Shift+2');
            if (_self.isDebugMode) {
              _self.debug = !_self.debug;
              storage.session.set(DEBUG_KEY, _self.debug)
            }
            code = 0;
            code2 = 0;
          }
          timer = setTimeout(() => {
            code = 0;
            code2 = 0;
          }, 1000)

          _self.solveBtnIndex(key);
          _self.solveEnter(key);
        }
      },
      inits() {
        // const flowCode = this.$route.name;
        const query = this.$route.query;
        // console.log("this.$routes.name:", this.$route.name);
        // console.log("this.$routes.query:", this.$route.query);
        let params = {
          // flowCode:flowCode.replace('buss','')
          flowCode: query.id
        };
        // return
        queryFlowDetail(params)
            .then(res => {
              console.log('res', res)
              const {rspCode} = res;
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
          let processData = FG.getProcess().slice();
          const ret = handleBackNode(returnNode,processData);
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
        let message = this.rollValidate();
        if (message.error == -1) {
          alert(message.text);
          return;
        }
        if(!returnNode){
          alert("没有设置返回的节点")
          return
        }

        // 清除当前节点后面的执行过点的节点
        let processData = FG.getProcess().slice();
        const prevNodeCode = handleBackNode(returnNode,processData); // 要回退到的节点
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
          nodePromise.then(data => {
            console.log("res", data);
            // 提交类型
            if (commitType == FG.COMMIT_DEFAULT) {
              //  通信提交
              request({
                url: `/requestForward/${commit}`,
                method: 'post',
                data
              }).then(response => {

                const {statusCode} = response
                if(statusCode == 200){
                  const Obj = {
                    up: data,
                    down: null
                  };
                  Obj["down"] = {
                    ...response,
                    rspCode: "SP000000"
                  };
                  alert("通信提交响应数据：" + JSON.stringify(Obj));
                  const copyObj = JSON.parse(JSON.stringify(Obj));
                  FG.saveNode(nodeCode, copyObj);
                  this.configdata.nodes = FG.getNodes(); // 节点数据
                  return true
                }else{
                  return false
                }
              }).then((resFlag) => {
                if(resFlag== false){
                  alert("通信提交响应数据失败");
                  return
                }
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
              }).catch(err => {
                throw new Error(err)
              })

            } else if (commitType == FG.COMMIT_DEFINE) {
              // 自定义提交
              const Obj = {
                up: data,
                down: null
              };
              // console.log('commit....',commit)
              commit && handleRemoteFn(commit).then(response => {
                console.log('response...', response)
                Obj["down"] = {
                  ...response,
                  rspCode: "SP000000"
                };
                alert("响应数据：" + JSON.stringify(Obj));
                // 深拷贝
                const copyObj = JSON.parse(JSON.stringify(Obj));
                FG.saveNode(nodeCode, copyObj);
                this.configdata.nodes = FG.getNodes(); // 节点数据
                return Promise.resolve();
              }).then(() => {
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
              }).catch(err => {
                throw new Error(err)
              })
            } else if (commitType == FG.COMMIT_ORDER) {
              // TODO 订单提交
            } else if (commitType == FG.COMMIT_LOCAL) {
              // 本地提交
              const nodePromise = this.$refs.renderForm.getData();
              nodePromise.then(data => {
                const Obj = {
                  up: data,
                  down: {...data, resCode: "000000"}
                };
                alert("本地提交数据：" + JSON.stringify(Obj));
                const copyObj = JSON.parse(JSON.stringify(Obj));
                FG.saveNode(nodeCode, copyObj);
                this.configdata.nodes = FG.getNodes(); // 节点数据
              }).then(res => {
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
      padding-left: 10px;
      flex-grow: 1;
      order: 1;
      overflow: hidden;
    }
  }


</style>

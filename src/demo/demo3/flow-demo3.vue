<template>
  <div class="render-wrap" style="padding: 20px;" ref="loadingArea">
    <!--data :{{data}}-->
      list :{{configdata.list}}
    <br />
    <!--rollbackData :{{configdata.rollbackData}} <br>-->
    <!--流程数据-->
    <el-dialog title="流程数据" :visible.sync="flowDialogTableVisible" width="1200px" >
      <!--{{listData}}-->
      <el-table v-if="listData.length" :data="listData" border>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column property="nodeCode" label="节点ID" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.nodeCode}}</span>
            <i v-if="data.nodeCode == scope.row.nodeCode" class="el-icon-check" title="当前节点"></i>
          </template>
        </el-table-column>
        <el-table-column property="nodeName" label="节点名称" width="200"></el-table-column>
        <el-table-column property="type" label="节点类型">
          <template slot-scope="scope">
            <span>
              <el-tag :type="filterType(scope.row.type)">{{ filterStatus(scope.row.type)}}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="nextNode" label="下一节点" min-width="100">
            <template slot-scope="scope">
                <!--{{scope.row.nextNode.split(',')}}-->
                <div style="white-space: nowrap" v-for="tNOde in scope.row.nextNode.split(',')"> {{tNOde}}</div>
            </template>
        </el-table-column>
        <el-table-column property="returnNode" label="返回节点"></el-table-column>
        <el-table-column property="rollbackData" label="回退数据">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.rollbackData=='01'" :title="scope.row.rollbackData" type="danger">清除</el-tag>
                <el-tag v-if="scope.row.rollbackData=='02'" :title="scope.row.rollbackData" >保留</el-tag>
            </template>
        </el-table-column>
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
    <el-dialog title="user数据" :visible.sync="userDialogTableVisible" width="1000px">
      <!--{{usreData}}-->
      <el-table :data="usreDataSolve">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column property="key" label="KEY" width="150"></el-table-column>
        <el-table-column property="value" label="VALUE" width></el-table-column>
      </el-table>
    </el-dialog>
    <!--platform数据-->
    <el-dialog title="platform数据" :visible.sync="platformDialogTableVisible" width="1000px">
      <!--{{platformData}}-->
      <!--{{platformDataSolve}}-->
      <el-table :data="platformDataSolve">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column property="key" label="KEY" width="150"></el-table-column>
        <el-table-column property="value" label="VALUE" width></el-table-column>
      </el-table>
    </el-dialog>
    <!--nodes数据-->
    <el-dialog title="nodes数据" :visible.sync="nodesDialogTableVisible" width="1000px">
      <!--{{nodesData}}-->
      <el-table :data="nodesDataSolve">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column property="key" label="节点名称" width="150"></el-table-column>
        <el-table-column property="value_up" label="节点数据(up)" width></el-table-column>
        <el-table-column property="value_down" label="节点数据(down)" width></el-table-column>
      </el-table>
    </el-dialog>

    <!--表单数据-->
    <el-dialog title="nodes数据" :visible.sync="formDialogTableVisible" width="1000px">
      <!--{{curFormData}}-->
      <el-table :data="curFromDataSolve">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column property="key" label="KEY" width="150"></el-table-column>
        <el-table-column property="value" label="VALUE"></el-table-column>
      </el-table>
    </el-dialog>

      <!--执行过程-->
      <el-dialog title="执行过程" :visible.sync="processDialogTableVisible" width="1000px">
          <!--{{curFormData}}-->
          <!--{{processDataList}} <br>-->
          <!--{{processDataListSolve}} <br>-->
          <el-steps :active="processDataListSolve.length" align-center>
              <el-step v-for="item in processDataListSolve" :title="item.title" :description="item.description"></el-step>
          </el-steps>
      </el-dialog>

    <el-row>
      <el-button type="primary" @click="flowHandler">流程数据</el-button>
      <el-button type="success" @click="userHandler">user数据</el-button>
      <el-button type="info"    @click="platformHandler">platform数据</el-button>
      <el-button type="warning" @click="nodesHandler">节点数据</el-button>
      <el-button type="danger"  @click="getFormHandler">获取表单数据</el-button>
      <el-button type="warning" @click="getProcessHandler">获取执行过程</el-button>
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
    <div class="current-node" v-if="Object.keys(data).length>0">
      <h3>{{data.nodeName}}</h3>
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="6" class="label-color">节点类型：</el-col>
          <el-col :span="6">
            <el-tag :type="filterType(type)">{{type | filter_Status}}</el-tag>
          </el-col>
          <el-col :span="6" class="label-color">总节点个数：</el-col>
          <el-col :span="6">
            <el-tag type="info">{{recordsLength}}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" class="label-color">当前节点：</el-col>
          <el-col :span="6">
            <el-tag type="info">{{data.nodeCode}}</el-tag>
          </el-col>
          <el-col :span="6" class="label-color">当前节点名称：</el-col>
          <el-col :span="6">
            <el-tag type="info">{{data.nodeName}}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" class="label-color">输入表单编码：</el-col>
          <el-col :span="6">
            <el-tag type="info">{{data.inputFormCode || "无"}}</el-tag>
          </el-col>
          <el-col :span="6" class="label-color">输出表单编码：</el-col>
          <el-col :span="6">
            <el-tag type="info">{{data.outputFromCode || "无"}}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" class="label-color">有响应页面：</el-col>
          <el-col :span="6">
            <el-tag type="info">{{data.outputFromCode ? "有" : "无"}}</el-tag>
          </el-col>
          <el-col :span="6" class="label-color">返回节点：</el-col>
          <el-col :span="6">
            <el-tag type="info">{{data.returnNode ? data.returnNode : '无'}}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" class="label-color">提取配置：</el-col>
          <el-col :span="6">
            <el-tag type="info" :title="data.inputConfig">{{data.inputConfig ? "有" : "无"}}</el-tag>
          </el-col>
          <el-col :span="6" class="label-color">输出配置：</el-col>
          <el-col :span="6">
            <el-tag type="info" :title="data.outputConfig">{{data.outputConfig ? "有" : '无'}}</el-tag>
          </el-col>
        </el-row>
      </el-card>
    </div>

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
      <!--<el-button type="primary" @click="_get">GET</el-button>-->
    </div>

  </div>
</template>

<script>
// import getFG from 'fg-control';
import getFG from "./fg-control";
import flowMixin from "./fg-utils";

const FG = new getFG();
import { queryFlowDetail } from "../../api/flows";
import { insertNodeData } from "../../api/submit";
import { platform, user } from "./flowData";

export default {
  name: "flow-demo",
  mixins: [flowMixin],
    beforeRouteLeave (to, from, next) {
      setTimeout(()=>{
        this.$confirm('您要离开当前流程吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            next()
        }).catch(() => {
            next(false)
        });
      },300)
    },
  data() {
    return {
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
          const { rspCode } = res;
          // this.hideLoading()
          if (rspCode == "SP000000") {
            const list = res.detail.records;
            let funcCollection = res.define.funcCollection;
            const funcObject = FG.solveCommonJS(funcCollection);
            // console.log('queryFlowDetail funcCollection', funcCollection);

            // records数据
            this.records = list;

            // 挂载数据
            FG.setData("user", user);
            FG.setData("platform", platform);
            FG.setData("list", list); // 流控数据
            FG.setData("utils", funcObject); // 公共函数

            // 启动开始节点
            const startNode = FG.getStartNode();
            const { checkStart, nodeCode } = startNode;
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
          const { checkStart} = temp;
          if (FG.checkStart(checkStart)) {
              this.data = temp;
              console.log('this.next_node',next_node)
              console.log('this.data',this.data)
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
        let {type, rollback,returnNode} = this.data;
        if (rollback == FG.CANNOT_ROLLBACK || !rollback) {
            res = {error: -1, text: "当前节点不能回退"};
        }
        if (type == FG.START) {
            res = {error: -1, text: "开始节点不能回退"};
        }
        if (type == FG.END) {
            res = {error: -1, text: "流程已经结束,不能回退"};
        }
        if(returnNode){
            // 判断上一节点是否在当前的返回列表中
            let backNodes = [];
            if (returnNode && returnNode.includes(",")) {
                // 多节点
                backNodes = returnNode.split(",");
            }else{
                // 单节点
                backNodes.push(returnNode);
            }
            let processData = FG.getProcess();
            let prevNodeCode = processData[processData.length - 2]; // 当前节点的上一节点
            if(backNodes.includes(prevNodeCode) == false){
                res =  { error: -1, text: "上一节点不在设置的回退数组中，不能回退" };
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
      const { rollback, rollbackData } = this.data;
      // 判断能否回退
      let message = this.rollValidate();
      if (message.error == -1) {
        alert(message.text);
        return;
      }

      //  回退数据处理
      let processData = FG.getProcess();
      let prevNodeCode = processData[processData.length - 2]; // 当前节点的上一节点
      if (rollback == FG.CAN_ROLLBACK && prevNodeCode) {
          const tempData= FG.getNodeData(prevNodeCode);
          const {checkStart} = tempData;
          console.log('prev checkStart',checkStart)
          if (FG.checkStart(checkStart)) {
              this.data = tempData;
              this.configdata.list = [tempData];
              // 数据处理（清除|保留）
              this.processData(rollbackData, prevNodeCode);
              FG.popProcess()
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
            }else{
                console.log('checkStart error:',checkStart)
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
                  const { header, body } = res;
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
                      if(!outputConfig){
                          console.error('demo3 outputConfig is undefine',)
                          return
                      }
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
              commit && commit(data);
            } else if (commitType == FG.COMMIT_ORDER) {
            } else if (commitType == FG.COMMIT_LOCAL) {
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
  }
};
</script>

<style lang="scss" scoped>
    .render-wrap {
        margin-top: 20px;
        .el-table {
            .el-icon-check{
                color: red;
                font-size: 14px;
                font-weight: bold;
                display: inline;
            }
        }
        .el-row {
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }

        .box-card {
            /*width: 480px;*/
            .label-color {
                font-size: 13px;
            }
        }
    }

</style>

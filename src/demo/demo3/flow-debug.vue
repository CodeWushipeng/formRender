<template>
  <div>
    <!--activeName: {{activeName}}-->
    <el-tabs type="border-card" :activeName="activeName" @tab-click="handleClick">
      <el-tab-pane name="currentNode" label="当前节点数据">
        <!--当前节点数据-->
        <flowNode :data="data" :records="records" />
      </el-tab-pane>
      <el-tab-pane name="flow" label="流程数据">
        <!--流程数据-->
        <!--{{ listData }}-->
        <el-table v-if="listData.length>0" :data="listData" border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column property="nodeCode" label="节点ID" width="100">
          </el-table-column>
          <el-table-column property="nodeName" label="节点名称" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.nodeName}}</span>
              <i v-if="data.nodeCode == scope.row.nodeCode" class="el-icon-check" title="当前节点"></i>
            </template>
          </el-table-column>
          <el-table-column property="type" label="节点类型">
            <template slot-scope="scope">
                <span>
                  <el-tag :type="getElTagType(scope.row.type)">{{ getNodeName(scope.row.type)}}</el-tag>
                </span>
            </template>
          </el-table-column>
          <el-table-column property="nextNode" label="下一节点" min-width="100">
            <template slot-scope="scope">
              <div :key="index" style="white-space: nowrap"
                   v-for="(tNOde,index) in scope.row.nextNode.split(',')"> {{tNOde}}
              </div>
            </template>
          </el-table-column>
          <el-table-column property="returnNode" label="返回节点"></el-table-column>
          <el-table-column property="rollbackData" label="回退数据">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.rollbackData=='01'" :title="scope.row.rollbackData" type="danger">清除
              </el-tag>
              <el-tag v-if="scope.row.rollbackData=='02'" :title="scope.row.rollbackData">保留</el-tag>
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

      </el-tab-pane>
      <el-tab-pane name="user" label="user数据">

        <!--user数据-->
        <!--{{userData}}-->
        <el-table :data="userDataSolve" border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column property="key" label="KEY" width="150"></el-table-column>
          <el-table-column property="value" label="VALUE" width></el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane name="platform" label="platform数据">
        <!--platform数据-->
        <!--{{platformData}}-->
        <!--{{platformDataSolve}}-->
        <el-table :data="platformDataSolve" border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column property="key" label="KEY" width="150"></el-table-column>
          <el-table-column property="value" label="VALUE" width></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="indata" label="indata数据">
        <!--indata数据-->
        <!--{{indata}}-->
        <!--{{inDataSolve}}-->
        <el-table :data="inDataSolve" border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column property="key" label="KEY" width="150"></el-table-column>
          <el-table-column property="value" label="VALUE" width></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="nodes" label="节点数据">
        <!--节点数据-->
        <!--{{nodesData}}-->
        <el-table :data="nodesDataSolve" border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column property="key" label="节点名称" width="150"></el-table-column>
          <el-table-column property="value_up" label="节点数据(up)" width></el-table-column>
          <el-table-column property="value_down" label="节点数据(down)" width></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="form" label="获取表单数据">
        <!--表单数据-->
        <!--{{formData}}-->
        <!--{{curFormData}}-->
        <el-table :data="curFromDataSolve" border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column property="key" label="KEY" width="150"></el-table-column>
          <el-table-column property="value" label="VALUE"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="process" label="获取执行过程">
        <!--执行过程-->
        <!--{{curFormData}}-->
        <!--{{processDataList}} <br>-->
        <!--{{processDataListSolve}} <br>-->
        <el-steps :active="processDataListSolve.length" align-center>
          <el-step :key="index" v-for="(item,index) in processDataListSolve" :title="item.title"
                   :description="item.description"></el-step>
        </el-steps>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import getFG from "./js/fg-control";
  // import getFG from "fg-control";
  const FG = new getFG();
  import flowMixin from './js/mixins'
  import flowNode from './flow-node'
  export default {
    name: "flowBtns",
    mixins: [flowMixin],
    components:{
      flowNode
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
      records: {
        type: Array,
        required: true,
      },
      formData: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        activeName: "currentNode",
        // 流控数据
        listData: [],
        // 用户
        userData: [],
        userDataSolve: [],
        // 平台
        platformData: [],
        platformDataSolve: [],
        // 启动数据
        indata: [],
        inDataSolve: [],
        // 节点数据
        nodesData: [],
        nodesDataSolve: [],
        // 当前表单数据
        curFormData: [],
        curFromDataSolve: [],
        // 执行过程
        processDataList: []
      }
    },
    computed: {
      // 当前流程执行过程
      processDataListSolve() {
        let ret = [];
        this.processDataList.forEach(item => {
          let rds = this.records.filter(reds => {
            return reds.nodeCode == item
          });
          console.log('rds...', rds)
          if (rds.length > 0) {
            ret.push({
              title: item,
              description: rds[0]['nodeName'] || "没有文字提示"
            })
          }
        })
        return ret;
      }
    },
    created() {
      console.log("created....")
      this._solveData(this.formData);
    },
    methods: {
      handleClick(tab) {
        this.activeName = tab.name;
        // console.log('tab', tab);
        // console.log('event', event);
        const name = tab.name;
        console.log('name', name);
        switch (name) {
          case 'currentNode':
            // do nothing...
            break;
          case 'flow':
            this.flowHandler();
            break;
          case 'user':
            this.userHandler();
            break;
          case 'platform':
            this.platformHandler()
            break;
          case 'indata':
            this.indataHandler()
            break;
          case 'nodes':
            this.nodesHandler()
            break;
          case 'form':
            this.formHandler()
            break;
          case 'process':
            this.processHandler()
            break;
          default:
            // 默认代码块
            throw Error("没有name")
        }
      },
      flowHandler() {
        this.listData = FG.list;
        // this.flowDialogTableVisible = true;
      },
      userHandler() {
        let res = [];
        for (let key in FG.user) {
          // console.log('key',key,FG.user[key])
          const value = FG.user[key];
          res.push({
            key: key,
            value: typeof  value == "object" ? JSON.stringify(value) : value
          })
        }
        this.userData = FG.user;
        this.userDataSolve = res;
      },
      platformHandler() {
        let res = [];
        for (let key in FG.platform) {
          const value = FG.platform[key]
          res.push({
            key: key,
            value: typeof  value == "object" ? JSON.stringify(value) : value
          })
        }
        this.platformData = FG.platform;
        this.platformDataSolve = res;
      },
      indataHandler(){
        let res = [];
        for (let key in FG.indata) {
          const value = FG.indata[key]
          res.push({
            key: key,
            value: typeof  value == "object" ? JSON.stringify(value) : value
          })
        }
        this.indata = FG.indata;
        this.inDataSolve = res;
      },
      nodesHandler() {
        console.log('FG.nodes', JSON.stringify(FG.nodes))
        const keys = Object.keys(FG.nodes);
        if (keys.length) {
          let res = [];
          for (let key in FG.nodes) {
            const value_up = FG.nodes[key]['up'];
            const value_down = FG.nodes[key]['down'];
            res.push({
              key: key,
              value_up: typeof value_up == "object" ? JSON.stringify(value_up) : value_up,
              value_down: typeof value_down == "object" ? JSON.stringify(value_down) : value_down
            })
          }

          this.nodesData = FG.nodes;
          this.nodesDataSolve = res;
        }
      },
      formHandler() {
        // alert(JSON.stringify(data));
        this.$emit("getFormHandler")
      },
      processHandler() {
        this.processDataList = FG.getProcess()
      },
      _solveData(data) {
        let res = [];
        for (let key in data) {
          const value = data[key]
          res.push({
            key: key,
            value: typeof  value == "object" ? JSON.stringify(value) : value
          })
        }
        this.curFormData = data;
        this.curFromDataSolve = res;
      },

    },
    watch: {
      formData: {
        deep: true,
        handler(val) {
          console.log('val....', val)
          this._solveData(val)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-table {
    .el-icon-check {
      color: red;
      font-size: 14px;
      font-weight: bold;
      display: inline;
    }
  }
</style>

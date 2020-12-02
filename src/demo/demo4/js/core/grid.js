import {BusFactory, OperateFactory} from '../factory/coreFactory';
import Toolkit from './toolkit';
import Check from './check';

class Getting {
  constructor() {
    // 业务数据
    this.busdata = null;
    // 操作数据
    this.operdata = null;
  }
  /**
   * 开始节点
   * @returns {*}
   */
  getStart() {
    const busdata = this.busdata.list;
    const result = this._find(busdata, item => item.type == Toolkit.static.START)
    return result || {}
  }

  /**
   * 结束节点
   * @returns {*}
   */
  getEnd() {
    const busdata = this.busdata.list;
    const result = this._find(busdata, item => item.type == Toolkit.static.END)
    return result || {}
  }

  // 初始化数据
  getStartSet(initFunc, request) {
    if (initFunc) {
      return Toolkit.matrix.solveInitConfigJs(this, this.busdata, initFunc, request)
    } else {
      return Promise.resolve({})
    }
  }

  /**
   * 节点数据
   * @param nodeCode
   * @returns {*}
   */
  getNodeData(nodeCode) {
    const busdata = this.busdata.list;
    const result = this._find(busdata, item => item.nodeCode == nodeCode)
    return result || {}
  }
  /**
   * 获取所有节点数据
   * @returns {*}
   */
  getNodes() {
    return this.operdata.nodes;
  }
  /**
   * 获取执行流程
   * @returns {Array}
   */
  getProcess() {
    console.warn('process',this.operdata.process)
    return this.operdata.process || [];
  }

  findNext(nextNodes) {
    const _this = this;
    let findNextNode = ""; // 最终要执行的节点
    if (nextNodes && nextNodes.includes(",")) {
      // 多节点
      const nodes = nextNodes.split(",");
      const findNode = (j)=>{
        let nodeId = nodes[j];
        return this.busdata.list.find(fl => fl.nodeCode == nodeId);
      }

      for (let j = 0; j < nodes.length; j++) {
        const nextFlow = findNode(j);
        try {
          if (_this.checkStart(nextFlow["checkStart"])) {
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
    return findNextNode;
  }

  /**
   * 查找数据
   * @param callback
   * @returns {*}
   * @private
   */
  _find(listdata, callback) {
    return listdata.find(callback)
  }
}

class Grid extends Getting {
  constructor() {
    super()
  }

  check(type,commitType){
    let isSuccess = true;
    const checker = new Check();
    const checkmsg = checker.check(this.busdata,this.operdata,type,commitType);
    if(checkmsg.status){
      alert(checkmsg.error);
      isSuccess=false
    }
    return isSuccess
  }

  build(user, platform, res) {
    let flow = Toolkit.matrix.solveFlow(res);
    let list = flow.list;
    let flowType = flow.flowType;
    let utils = flow.utils;
    let indata = Object.create(null);
    this.busdata = new BusFactory(user, platform, indata, list, flowType, utils);

    let isUsable = false;
    let outflag = false;
    let process = [];
    let nodes = [];
    this.operdata = new OperateFactory(isUsable, outflag, process, nodes);
  }

  /**
   * 保存节点数据
   * @param nodeCode
   * @param value
   */
  setNode(nodeCode, value) {
    this.operdata.nodes[nodeCode] = value;
    console.log('nodes', JSON.stringify(this.operdata.nodes))
  }

  // 设置提交标识
  setOutFlag(boolean) {
    this.operdata.outflag = boolean
  }

  setUsable(boolean) {
    this.operdata.setUsable(boolean)
  }

  pushProcess(nodeCode) {
    this.operdata.pushProcess(nodeCode)
  }

  saveNodeData(data, response, nodeCode) {
    const Obj = {
      up: data,
      down: null
    };
    Obj["down"] = {...response, rspCode: "SP000000"};
    console.log("通信提交响应数据：" + JSON.stringify(Obj));
    const copyObj = JSON.parse(JSON.stringify(Obj));
    this.setNode(nodeCode, copyObj);
    // Object.assign(this.configdata, {
    //   nodes: FG.getNodes() // 节点数据
    // })
  }

  /**
   * 检查节点能否执行
   * @param checkstart
   * @returns {*}
   */
  checkStart(checkstart) {
    if (checkstart) {
      return Toolkit.matrix._solveConfigJs(this.busdata, this.operdata, checkstart)
    }
    return true
  }



  prev() {
    console.log('prev...')
  }

  destroy() {
    console.log('destory...')

  }
}

export default Grid


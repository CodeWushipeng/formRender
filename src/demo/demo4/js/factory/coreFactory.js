export class BusFactory {
  constructor(user, platform, indata, list, flowType, utils) {
    this.user = user;
    this.platform = platform;
    this.indata = indata;
    this.list = list;
    this.flowType = flowType;
    this.utils = utils;
  }
  setIndata(indata) {
    this.indata = indata;
  }
}


export class OperateFactory {
  constructor(isUsable = false, outflag = false, process = [], nodes = []) {
    this.isUsable = isUsable;  // 可使用
    this.outflag = outflag;  // 提交标识
    // 流程当前的执行过程
    this.process = process;
    // 各个节点数据
    this.nodes = nodes;
  }

  setUsable(boolean) {
    this.isUsable = boolean
  }
  /**
   * 节点加入到执行流程
   * @param nodeCode
   */
  pushProcess(nodeCode) {
    if (this.process.includes(nodeCode) == false) {
      this.process.push(nodeCode)
    }
  }
}





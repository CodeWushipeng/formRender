import Toolkit from "./toolkit";

class Check {
  constructor() {
  }

  /**
   * 提交前检查
   * @param busdata 业务数据
   * @param operdata 操作数据
   * @param type 节点类型
   * @param commitType 提交处理
   * @returns {{status: number, error: string}}
   */
  check(busdata, operdata, type,commitType) {
    const msg = {
      status: 0,
      error: ""
    }

    if (operdata.isUsable == Toolkit.static.notUsable) {
      // alert("流程已取消");
      msg.status=1;
      msg.error = '流程已取消';
    }
    // 结束节点
    if (type == Toolkit.static.END) {
      // alert("流程已经结束");
      msg.status=1;
      msg.error = '流程已经结束';
    }
    if(!commitType && type != Toolkit.static.START){
      msg.status=1;
      msg.error = '提交失败，当前节点没有设置提交类型"';
    }
    return msg
  }
  checkPrev(gridObj,data){
    let res = {
      status: 0,
      error: ""
    }
    let {type, rollback, returnNode} = data;

    if (!returnNode) {
      res = {status: 1, error: "没有设置返回的节点"};
    }

    if (rollback == Toolkit.static.CANNOT_ROLLBACK || !rollback) {
      res = {status: 1, error: "当前节点不能回退"};
    }
    if (type == Toolkit.static.START) {
      res = {status: 1, error: "开始节点不能回退"};
    }
    if (type == Toolkit.static.END) {
      res = {status: 1, error: "流程已经结束,不能回退"};
    }
    if (returnNode) {
      // 判断上一节点是否在当前的返回列表中
      let processList = gridObj.getProcess().slice();
      const ret = Toolkit.matrix.handleBackNode(returnNode, processList);
      if (!ret) {
        res = {error: -1, text: "上一节点不在设置的回退数组中，不能回退"};
      }
    }
    return res;
  }
}


export default Check

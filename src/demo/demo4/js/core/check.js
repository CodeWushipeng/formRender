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
      return;
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
}


export default Check

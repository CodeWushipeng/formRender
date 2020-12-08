/**
 * 流控引擎
 */
class FG {
  constructor() {
    this.ISOK = false;
    this.OUTFLAG = null;   // 提交标识
    // 流程节点
    this.START = "01"; // 开始
    this.END = "02"; // 结束
    this.DOING = "03"; // 业务类型

    // 提交类型
    this.COMMIT_DEFAULT = "01"; // 默认提交
    this.COMMIT_ORDER = "02"; // 订单提交
    this.COMMIT_DEFINE = "03"; // 自定义提交
    this.COMMIT_LOCAL = "04"; // 本地提交

    // 返回设置
    this.CAN_ROLLBACK = "01"; // 可以回退
    this.CANNOT_ROLLBACK = "02"; // 不可回退
    // 是否保留数据
    this.CLEAR_DATA = "01", // 清除数据
    this.KEEP_DATA = "02",  // 保留数据

    // 数据
    this.user = {};
    this.platform = {};
    this.indata = {}; // 启动数据
    this.nodes = {};
    this.list = {};
    this.utils = {};
    // 流程当前的执行过程
    this.process = [];
  }

  /**
   * 设置数据
   * @param object
   */
  setData(key, value) {
    if (typeof key == 'string') {
      this[key] = value;
    }
    if (isPlainObject(key)) { // 对象
      let keysArr = Object.keys(key);
      keysArr.forEach(k => {
        this[k] = key[k];
      })
    }
  }

  /**
   * 开始节点
   * @returns {*}
   */
  getStartNode() {
    return this._find(item => item.type == this.START) ||  {}
  }

  /**
   * 结束节点
   * @returns {*}
   */
  getEndNode() {
    return this._find(item => item.type == this.END) || {}
  }

  /**
   * 下一节点
   * @param next_node
   * @returns {*}
   */
  getNext(next_node) {
    return this._find(item => item.nodeCode == next_node)  || {} ;
  }

  /**
   * 节点数据
   * @param nodeCode
   * @returns {*}
   */
  getNodeData(nodeCode) {
    return this._find(item => item.nodeCode == nodeCode) || {};
  }

  /**
   * 检查节点能否执行
   * @param checkstart
   * @returns {*}
   */
  checkStart(checkstart) {
    if (checkstart) {
      return this._solveConfigJs(checkstart)
    }
    return true;
  }

  /**
   * 处理公共函数js代码
   * @param JsCode
   * @returns {any}
   * @private
   */
  solveCommonJS(JsCode) {
    try {
      return eval(JsCode)
    } catch (error) {
      console.log('===commonJs===', JsCode)
      throw  new Error(error)
    }
  }

  /**
   * @param _this 当前组件对象
   * @param fn 字符串main函数
   * @param requestObj axios对象
   * @returns {Promise<any>}
   */
  solveInitConfigJs(_this, fn, requestObj) {
    const platform = this.platform;
    const user = this.user;
    const utils = this.utils;
    const request = requestObj;
    return new Promise((resolve, reject) => {
      try {
        let fns = eval("(" + fn + ")");
        fns.call(_this, user, platform, utils, request, function (callData) {
          debugger
          console.log('callData', callData)
          if (callData) {
            resolve(callData)
          } else {
            reject("没有返回数据")
          }
        });
      } catch (err) {
        throw new Error(err)
      }
    })
  }

  /**
   * 处理配置数据js代码
   * @param inputConfigJs
   * @returns {*}
   * @private
   */
  _solveConfigJs(JsCode) {
    debugger
    try {
      const platform = this.platform;
      const user = this.user;
      const indata = this.indata;
      const nodes = this.nodes;
      const utils = this.utils;
      console.log('{ user, platform, indata, nodes, utils} ', {user, platform, indata, nodes, utils})
      const resCode = `function _execute(user, platform, indata, nodes, utils){  ${JsCode}  return main(...arguments);}`;
      // console.log('resCode',resCode)
      const exeCode = eval("(" + resCode + ")");
      let rs = exeCode(user, platform, indata, nodes, utils);
      return rs;
    } catch (error) {
      console.log('===inputConfigJs===', JsCode)
      throw new Error(error)
    }
  }

  /**
   * 保存节点数据
   * @param nodeCode
   * @param value
   */
  saveNode(nodeCode, value) {
    this.nodes[nodeCode] = value;
    console.log('nodes', JSON.stringify(this.nodes))
  }

  /**
   * 查找数据
   * @param callback
   * @returns {*}
   * @private
   */
  _find(callback){
    return this.list.find(callback)
  }

  /**
   * 获取所有节点数据
   * @returns {*}
   */
  getNodes() {
    return this.nodes;
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
  /**
   *
   * @param arr
   */
  setProcess(arr){
    this.process = arr || [];
  }
  /**
   * 获取执行流程
   * @returns {Array}
   */
  getProcess() {
    return this.process || [];
  }
}

// 判断对象
function isPlainObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

// 返回单例
let getFG = (function () {
  let fee
  return function () {
    if (!fee) {
      fee = new FG();
    }
    return fee
  }
})()

export default getFG;

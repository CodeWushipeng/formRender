// 工具类
const matriToolkit = {
  // 处理流控数据
  solveFlow(res) {
    console.log('res', res)
    const list = res.body.detail.records;
    let fns = {};
    let flowType = null;
    if (res.body.define) {
      flowType = res.body.define.flowType || null;
      let funcCollection = res.body.define.funcCollection;
      fns = funcCollection ? Toolkit.matrix.solveCommonJS(funcCollection) : {};
    }
    return {
      list,
      flowType,
      utils: fns
    }
  },

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
  },
  /** 初始化配置数据
   * @param _this 当前组件对象
   * @param fn 字符串main函数
   * @param gridObj grid
   * @param requestObj axios对象
   * @returns {Promise<any>}
   */
  solveInitConfigJs(_this, busdata, fn, requestObj) {
    const platform = busdata.platform;
    const user = busdata.user;
    const utils = busdata.utils;
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
  },
  /**
   * 处理配置数据js代码
   * @param inputConfigJs
   * @returns {*}
   * @private
   */
  _solveConfigJs(busdata, operdata, JsCode) {
    debugger
    try {
      const platform = busdata.platform;
      const user =     busdata.user;
      const indata =   busdata.indata;
      const utils =    busdata.utils;
      const nodes =    operdata.nodes;
      // const platform = this.platform;
      // const user = this.user;
      // const indata = this.indata;
      // const utils = this.utils;
      // const nodes = this.nodes;
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
  },
  /**
   * 自定义函数提交
   * @param fn 自定义函数
   * @returns {Promise<any>}
   */
  handleRemoteFn(currentObj, request, fn) {
    return new Promise((resolve, reject) => {
      try {
        let fns = eval("(" + fn + ")");
        // console.log('fns',typeof fns)
        fns(currentObj, request, function (tableCf) {
          debugger
          console.log('tableCf', tableCf)
          if (tableCf) {
            resolve(tableCf)
          } else {
            reject("没有返回数据")
          }
        });
      } catch (err) {
        console.log(err);
        throw new Error(err)
      }
    })
  }
};
const boxToolkit = {
  notUsable: false, // 不可用
  // 流程节点
  START: "01", // 开始
  END: "02", // 结束
  DOING: "03", // 业务类型

  // 提交类型
  COMMIT_DEFAULT: "01", // 默认提交
  COMMIT_ORDER: "02", // 订单提交
  COMMIT_DEFINE: "03", // 自定义提交
  COMMIT_LOCAL: "04", // 本地提交

  // 返回设置
  CAN_ROLLBACK: "01", // 可以回退
  CANNOT_ROLLBACK: "02", // 不可回退
  // 是否保留数据
  CLEAR_DATA: "01", // 清除数据
  KEEP_DATA: "02",  // 保留数据
};


export default class Toolkit {

  // 工具1
  static get matrix() {
    return matriToolkit;
  }

  // 工具2
  static get static() {
    return boxToolkit;
  }
}

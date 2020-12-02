import request from './request';
import Vue from "vue"
const Bus=new Vue();
/**
 *
 * @param node  返回节点
 * @param execData 执行的流程数组
 * @returns {*}
 */
export function handleBackNode(node, processData) {
  let ret = null;
  let execData = processData.slice();
  // 判断上一节点是否在当前的返回列表中
  let backNodes = [];
  backNodes = node.includes(",") ?  node.split(",") : [node];
  function findBack() {
    if (execData.length > 0) {
      let lastNode = execData.pop();
      if (backNodes.includes(lastNode) == false) {
        // findBack(execData, backNodes)
        findBack()
      } else {
        ret = lastNode
      }
    }
  }
  findBack();
  return ret;
}

/**
 * 自定义函数提交
 * @param fn 自定义函数
 * @returns {Promise<any>}
 */
export function handleRemoteFn(fn) {
  return new Promise((resolve, reject) => {
    try {
      let fns = eval("(" + fn + ")");
      // console.log('fns',typeof fns)
      fns(request, function (tableCf) {
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

/**
 * 离开的路由钩子
 * @type {{beforeRouteLeave: beforeRoute.beforeRouteLeave}}
 */
export const beforeRoute = {
  beforeRouteLeave: function (to, from, next) {
    setTimeout(() => {
      this.$confirm('您要离开当前流程吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      });
    })
  }
}

export function alert(msg) {
  Bus.$message.error(msg || '操作失败了，请重试！');
}




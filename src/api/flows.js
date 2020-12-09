import request from '../demo/commonjs/request'

//查询节点明细
export function queryFlowDetail(data) {
     return request({
       url: '/flowDevelop/qryFlowDetail',
       method: 'post',
       data
     })
}

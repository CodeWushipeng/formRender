import request from '../demo/demo3/js/request'

//查询节点明细
export function queryFlowDetail(data) {
     return request({
       url: '/flowDevelop/qryFlowDetail',
       method: 'post',
       data
     })
}

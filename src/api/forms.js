import request from '../demo/demo3/js/request'
const urlPrefix = '/requestForward';

//查询表单列表
// export function mappingUrl(data) {
//   return request({
//     url: '/requestForwardDevelop/requestForwardDetail',
//     method: 'post',
//     data
//   })
// }

//查询字段交易
export function getTrade(url, data) {
  return request({
    url: `/requestForward/${url}`,
    method: 'post',
    data
  })
}

//级联选择
export function getDic(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

//查询字典服务
export function getDicTwo(data) { // isOk
  return request({
    url: urlPrefix + '/dictionary/quertDicByPage',
    method: 'post',
    data
  })
}

// 字典服务不分页
export function getDicNoPage(data) {
  return request({
    url: urlPrefix + '/dictionary/quertDicNoPage',
    method: 'post',
    data,
  });
}

//查询表单列表
export function getFormList(data) { // isOk
  return request({
    url: urlPrefix + '/formDevelop/qryFromDefineList2',
    method: 'post',
    data
  })
}

// 查询表格
export function getTableList(data) { // isOk
  return request({
    url: urlPrefix + '/listDevelop/qryAllListDefine',
    method: 'post',
    data
  })
}

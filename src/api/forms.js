import request from '../demo/demo3/js/request'

//查询表单列表
export function getFormList(data) {
  return request({
    url: '/formDevelop/qryFromDefineList2',
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
export function getDicTwo(data) {
  return request({
    url: `/dictionary/quertDicByPage`,
    method: 'post',
    data
  })
}
//查询字段交易
export function getTrade(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
// 查询表格
export function getTableList(data) {
  return request({
    url: `/listDevelop/qryAllListDefine`,
    method: 'post',
    data
  })
}

import request from '../demo/demo3/js/request';

//查询表单列表
export function getFormList(url, data) {
  return request({
    url: `${url}/formDevelop/qryFromDefineList2`,
    method: 'post',
    data,
  });
}
//级联选择
export function getDic(url, data) {
  // let _url = process.env.NODE_ENV === 'development' ? "/dev-api"+url : url
  return request({
    url,
    method: 'post',
    data,
  });
}
//查询字典服务
export function getDicTwo(data) {
  // let url = process.env.NODE_ENV === 'development' ? "/dev-api" : ''
  return request({
    url: `/dictionary/quertDicByPage`,
    method: 'post',
    data,
  });
}
//查询字段交易
export function getTrade(url, data) {
  return request({
    url,
    method: 'post',
    data,
  });
}
// 查询表格
export function getTableList(url, data) {
  // let url = process.env.NODE_ENV === 'development' ? "/dev-api" : ''
  return request({
    url: `${url}/listDevelop/qryAllListDefine`,
    method: 'post',
    data,
  });
}

//表格预览查询表单列表
export function previewGetFormList(data) {
  return request({
    url: '/formDevelop/qryFromDefineList2',
    method: 'post',
    data,
  });
}

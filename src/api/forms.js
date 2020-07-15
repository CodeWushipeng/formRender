import request from '../demo/demo3/request'

//查询表单列表
export function getFormList(url,data) {
    return request({
        url: `${url}/formDevelop/qryFromDefineList2`,
        method: 'post',
        data
    })
}

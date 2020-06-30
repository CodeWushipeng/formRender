import request from '../util/request-form'

//查询表单列表
export function getFormList(url,data) {
    return request({
        url: `${url}/formDevelop/qryFromDefineList2`,
        method: 'post',
        data
    })
}

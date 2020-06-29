import request from '../util/request-form'

//查询表单列表
export function getFormList(data) {
    return request({
        url: '/formDevelop/qryFromDefineList2',
        method: 'post',
        data
    })
}

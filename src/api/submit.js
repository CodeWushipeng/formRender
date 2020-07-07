import request from '../util/request-submit'

//提交数据
export function insertNodeData(data) {
    // return request({
    //     url: `/submitDevelop/default`,
    //     method: 'post',
    //     data
    // })

    const res = {
        "header": {
            "gloSeqNo": null,
            "rspSeqNo": "729790681039642624",
            "rspStatus": "成功",
            "rspCode": "00000000",
            "rspMsg": "成功",
            "totalNum": null,
            "rspTime": "2020-07-06 08:07:37"
        },
        "body": {
            data,
            resCode:"0000000"
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(res)
        },500)
    })
}

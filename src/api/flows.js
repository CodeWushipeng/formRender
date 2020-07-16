import request from '../demo/demo3/js/request'

//查询节点明细
export function queryFlowDetail(data) {
     return request({
       url: '/flowDevelop/qryFlowDetail',
       method: 'post',
       data
     })
    // const res = {
    //     "header": {
    //         "gloSeqNo": "Duis nisi",
    //         "rspSeqNo": "725397518950547456",
    //         "rspStatus": "成功",
    //         "rspCode": "00000000",
    //         "rspMsg": "成功",
    //         "totalNum": null,
    //         "rspTime": "2020-06-24 05:10:45"
    //     },
    //     "body": {
    //         "define": {
    //             "id": 74,
    //             "flowCode": "100001",
    //             "flowName": "转账",
    //             "flowDescribe": "转账等等",
    //             "projectId": "1",
    //             "subProjectId": "11",
    //             "createTime": "2020-06-23 03:36:54",
    //             "createUserId": null,
    //             "lstModiTime": "2020-06-23 15:36:54",
    //             "lstModiUserId": null,
    //             "projectName": null,
    //             "subProjectName": null
    //         },
    //         "detail": {
    //             "records": [{
    //                 "id": 126,
    //                 "nodeCode": "AA",
    //                 "nodeName": "转账开始",
    //                 "flowCode": "100001",
    //                 "flowName": "转账",
    //                 "type": "01",
    //                 "checkStart": "platform.sysdate>20200101",
    //                 "rollback": "",
    //                 "rollbackData": "",
    //                 "returnNode": "\"\"",
    //                 "nextNode": "BB",
    //                 "inputConfig": "",
    //                 "inputFormCode": "",
    //                 "outputFromCode": "",
    //                 "commitType": "",
    //                 "commitFunc": "",
    //                 "checkParam": "",
    //                 "authParam": "",
    //                 "createTime": "2020-06-23 04:17:21",
    //                 "createUserId": null,
    //                 "lstModiTime": "2020-06-23 16:21:29",
    //                 "lstModiUserId": null,
    //                 "mapLeft": "117px",
    //                 "mapTop": "59px",
    //                 "nodeId": "amu07ovtls",
    //                 "preNode": "[]"
    //             }, {
    //                 "id": 127,
    //                 "nodeCode": "BB",
    //                 "nodeName": "查询客户",
    //                 "flowCode": "100001",
    //                 "flowName": "转账",
    //                 "type": "03",
    //                 "checkStart": "",
    //                 "rollback": "01",
    //                 "rollbackData": "02",
    //                 "returnNode": "AA",
    //                 "nextNode": "CC,DD",
    //                 "inputConfig": "input_config_cx",
    //                 "inputFormCode": "selectuser",
    //                 "outputFromCode": "lookuser",
    //                 "commitType": "01",
    //                 "commitFunc": "",
    //                 "checkParam": "",
    //                 "authParam": "",
    //                 "createTime": "2020-06-23 04:17:21",
    //                 "createUserId": null,
    //                 "lstModiTime": "2020-06-23 16:21:29",
    //                 "lstModiUserId": null,
    //                 "mapLeft": "123px",
    //                 "mapTop": "182px",
    //                 "nodeId": "e7fe6vho45",
    //                 "preNode": "[\"AA\"]"
    //             }, {
    //                 "id": 128,
    //                 "nodeCode": "CC",
    //                 "nodeName": "对公转账",
    //                 "flowCode": "100001",
    //                 "flowName": "转账",
    //                 "type": "03",
    //                 "checkStart": "user.up.idflag == '1'",
    //                 "rollback": "01",
    //                 "rollbackData": "02",
    //                 "returnNode": "BB",
    //                 "nextNode": "EE",
    //                 "inputConfig": "const user = BB.user;",
    //                 "inputFormCode": "gong",
    //                 "outputFromCode": "",
    //                 "commitType": "01",
    //                 "commitFunc": "",
    //                 "checkParam": "",
    //                 "authParam": "",
    //                 "createTime": "2020-06-23 04:17:21",
    //                 "createUserId": null,
    //                 "lstModiTime": "2020-06-23 16:21:29",
    //                 "lstModiUserId": null,
    //                 "mapLeft": "19px",
    //                 "mapTop": "345px",
    //                 "nodeId": "zv4wli8k19",
    //                 "preNode": "[\"BB\"]"
    //             }, {
    //                 "id": 129,
    //                 "nodeCode": "DD",
    //                 "nodeName": "个人转账",
    //                 "flowCode": "100001",
    //                 "flowName": "转账",
    //                 "type": "03",
    //                 "checkStart": "user.up.idflag == '2'",
    //                 "rollback": "01",
    //                 "rollbackData": "02",
    //                 "returnNode": "AA",
    //                 "nextNode": "EE",
    //                 "inputConfig": "",
    //                 "inputFormCode": "privates",
    //                 "outputFromCode": "",
    //                 "commitType": "01",
    //                 "commitFunc": "",
    //                 "checkParam": "",
    //                 "authParam": "",
    //                 "createTime": "2020-06-23 04:17:21",
    //                 "createUserId": null,
    //                 "lstModiTime": "2020-06-23 16:21:29",
    //                 "lstModiUserId": null,
    //                 "mapLeft": "250px",
    //                 "mapTop": "349px",
    //                 "nodeId": "fk6pyxyrhm",
    //                 "preNode": "[\"BB\"]"
    //             }, {
    //                 "id": 130,
    //                 "nodeCode": "EE",
    //                 "nodeName": "交付处理",
    //                 "flowCode": "100001",
    //                 "flowName": "转账",
    //                 "type": "03",
    //                 "checkStart": "user.up.idflag == '2'",
    //                 "rollback": "01",
    //                 "rollbackData": "02",
    //                 "returnNode": "BB",
    //                 "nextNode": "FF",
    //                 "inputConfig": "input_config_jf",
    //                 "inputFormCode": "jf",
    //                 "outputFromCode": "",
    //                 "commitType": "01",
    //                 "commitFunc": "",
    //                 "checkParam": "",
    //                 "authParam": "",
    //                 "createTime": "2020-06-23 04:17:21",
    //                 "createUserId": null,
    //                 "lstModiTime": "2020-06-23 16:21:29",
    //                 "lstModiUserId": null,
    //                 "mapLeft": "141px",
    //                 "mapTop": "468px",
    //                 "nodeId": "nonz7jwhvq",
    //                 "preNode": "[\"DD\",\"CC\"]"
    //             }, {
    //                 "id": 131,
    //                 "nodeCode": "FF",
    //                 "nodeName": "转账结束",
    //                 "flowCode": "100001",
    //                 "flowName": "转账",
    //                 "type": "02",
    //                 "checkStart": "user.up.idflag == '2'",
    //                 "rollback": "01",
    //                 "rollbackData": "02",
    //                 "returnNode": "AA",
    //                 "nextNode": "",
    //                 "inputConfig": "",
    //                 "inputFormCode": "",
    //                 "outputFromCode": "",
    //                 "commitType": "",
    //                 "commitFunc": "",
    //                 "checkParam": "",
    //                 "authParam": "",
    //                 "createTime": "2020-06-23 04:17:21",
    //                 "createUserId": null,
    //                 "lstModiTime": "2020-06-23 16:21:29",
    //                 "lstModiUserId": null,
    //                 "mapLeft": "96px",
    //                 "mapTop": "595px",
    //                 "nodeId": "fppagxeq3n",
    //                 "preNode": "[\"EE\"]"
    //             }],
    //             "total": 6,
    //             "size": 500,
    //             "current": 1,
    //             "orders": [],
    //             "optimizeCountSql": true,
    //             "hitCount": false,
    //             "searchCount": true,
    //             "pages": 1
    //         }
    //     }
    // }
    // const result = Object.assign({},res.body,res.header,{
    //     statusCode:200
    // })
    // return Promise.resolve(result)


}

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

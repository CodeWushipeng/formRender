


function main(requestObj) {
    return requestObj({
        url: '/submitDevelop/default',
        method: 'post',
        data:{
            body:{
                "name":"fengwexin"
            },
            "header":{
                "pageIndex": 0,
                "pageSize": 99,
                "gloSeqNo": new Date().getTime().toString(),
                "reqSeqNo":new Date().getTime().toString(),
                "reqTime":new Date().getTime().toString(),
                "projectId": "quis consectetur",
                "serviceGroupid": "mollit sed",
                "serviceId": "officia non",
                "serviceName": "1",
                "subProjectId": "occaecat tempor dolor enim ex",
                "userInfo": {
                    "role": [
                        "ea fugiat incididunt"
                    ],
                    "username": "dolore deserunt do"
                },
            }
        }.then(data=>{
            return data
        })
    })
}


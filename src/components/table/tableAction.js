/*!
 * This is a table event processing library
 * gcc - v1.0.0 (2020-07-14)
 * dependent on request.js
 */
import request from "../../util/request"

 /**
  * 
  * @param {*} formId 表单编码
  * @param {*} callback 回调函数
  */

export const getFormConfigDataById = (formId,callback) => {
  let that = this;
  request
    .post("dev-api/formDevelop/qryFromDefineList2", {
      body: { formCode: formId},
      header: {
        pageIndex: 1,
        pageSize: 999,
        "gloSeqNo": new Date().getTime(),
        "reqSeqNo": "1",
        "reqTime": "1",
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
    })
    .then(res => {
      console.log(res);
      if (res.header.rspCode == "SP000000") {
        let formConfigData = ""
        if (res.body.define && res.body.define.records.length>0){
          formConfigData = res.body.define.records[0]
        }
        callback(formConfigData)
        that.$notify({
          title: "Success",
          message: "查询成功",
          type: "success",
          duration: 2000
        });
      } else if (res.header.rspCode == "99999999") {
        that.$notify({
          title: "fail",
          message: "查询失败",
          type: "info",
          duration: 2000
        });
        return;
      }
    })
    .catch(error => console.log(error));
}



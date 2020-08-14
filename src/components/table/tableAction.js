/*!
 * This is a table event processing library
 * gcc - v1.0.0 (2020-07-14)
 * dependent on request.js
 */
import { getFormList } from "../../api/forms";

/**
 *
 * @param {*} formId 表单编码
 * @param {*} callback 回调函数
 */

export const getFormConfigDataById = function(formId,callback) {
  getFormList({ 
    formCode: formId 
  })
    .then((res) => {
      console.log(res);
      if (
        res.header
          ? res.header.rspCode == 'SP000000'
          : res.rspCode == 'SP000000'
      ) {
        let formConfigData = ''
        if (res.body && res.body.define && res.body.define.records.length > 0) {
          formConfigData = res.body.define.records[0]
        }else{
          formConfigData = res.define.records[0]
        }
        callback(formConfigData)
        this.$notify({
          title: 'Success',
          message: '查询成功',
          type: 'success',
          duration: 2000
        })
      } else if (res.header.rspCode == '99999999') {
        this.$notify({
          title: 'fail',
          message: '查询失败',
          type: 'info',
          duration: 2000
        })
        return
      }
    })
    .catch((error) => console.log(error));
};

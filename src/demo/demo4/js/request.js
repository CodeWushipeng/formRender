import axios from 'axios';
import {dateFormat} from '../../../util/index'
import { MessageBox, Message } from 'element-ui';
import { Loading } from 'element-ui'; //加载中

let loadingObj;
var loading = {
  open: function(text = '加载中...') {
    loadingObj = Loading.service({
      lock: true,
      background: 'rgba(255,255,255,.4)',
      target: document.querySelector('.app-main'), // 设置加载动画区域
    });
  },
  close: function() {
    if (loadingObj) {
      loadingObj.close();
    }
  },
};

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // if (!config.hideLoging) {
    //   loading.open();
    // }
    let { pageIndex, pageSize, header, ...data } = config.data;
    config.data = {
      body: data.body ? data.body : data,
      header: {
          //"gloSeqNo": "10A07"+ dateFormat("YYYYmmdd", new Date()) + (new Date()).getTime().toString().substr(-4,4),
          "gloSeqNo": "10A072020"+ (new Date()).getTime().toString().substr(-8,8),
          "reqSeqNo": dateFormat("YYYYmmddHHMMSS", new Date()) + (new Date()).getTime().toString().substr(-3,3),
          "reqTime": dateFormat("YYYYmmddHHMMSS", new Date()),
          "channel": "channel",
          "projectId": "subProjectId",
          "subProjectId": "subProjectId",
          "terminalCode": "terminalCode",
          "branchId": "966999",
          "serviceId": "serviceId",
          "serviceName": "test",
          "serviceGroupid": "serviceGroupid",
          "sourceSysId": "sourceSysId",
          "consumerId": "consumerId",
          "pageIndex": pageIndex || 0,
          "pageSize": pageSize || 999,
          "mac": "mac",
          "keyId": "keyId",
          "extend": {
              "TranTeller": "99988999"
          },
          "userInfo": {
              "username": "123",
              "role": []
          },

        ...header,
      },
    };
    return config;
  },
  (error) => {
    // do something with request error
    // loading.close();
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    // setTimeout(() => {
    //   loading.close()
    // }, 300)
    const res = response.data;
    return res;
    /*if (typeof res == 'object') {
        if (res && res.header && res.body) {
          const {header, body} = res;
          if (typeof body !== "object") {
            return Promise.resolve(Object.assign({}, {"statusCode": 200, ...header, body: body}));
          } else {
            return Promise.resolve(Object.assign({}, {"statusCode": 200, ...header, ...body}))
          }
        } else {
          return Promise.resolve(Object.assign({}, res))
        }
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      }

      if (res.statusCode !== 200) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }*/
  },
  (error) => {
    loading.close();
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;

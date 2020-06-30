import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})



// request interceptor
service.interceptors.request.use(
    config => {
        config.data = {
            "body":config.data,
            "header":{
                "pageIndex": 1,
                "pageSize": 1,
                // "antiWeightSeqNo": "qui",
                // "gloSeqNo": "anim dolor deserunt",
                // "pageIndex": 1,
                // "pageSize": 999,
                // "projectId": "quis consectetur",
                // "reqSeqNo": "Duis et Ut tempor qui",
                // "reqTime": "Excepteur exercitation ut quis dolor",
                // "serviceGroupid": "mollit sed",
                // "serviceId": "officia non",
                // "serviceName": "officia qui adipisicing",
                // "subProjectId": "occaecat tempor dolor enim ex",
                // "userInfo": {
                //     "role": [
                //         "ea fugiat incididunt"
                //     ],
                //     "username": "dolore deserunt do"
                // }
            }
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

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
    response => {
        const res = response.data

        // console.log('==========res=============',res)
        if(process.env.NODE_ENV === 'development') {
            const { header, body } = res;
            return Promise.resolve(Object.assign({},{"statusCode":200,...header,...body}))
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
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service

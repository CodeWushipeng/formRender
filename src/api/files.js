import request from '../util/request'

//上传
export function upload(data) {
     return request({
       url: '/doc/upload',
       method: 'post',
       data
     })
}

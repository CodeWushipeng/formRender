export const user = {
  name: "feng",
  age: "11",
  address: "beijing001",
  account_no: "6212121212",
  up: {
    idflag: "2",
  },
}
export const platform = {
  sysdate: "20200202",
  node: "feng's node data description",
  amount: "99",
  transferType: "2",
  bank: {
    bankId: "0098878",
    banktoken: "#212@112",
  },
}

function html_encode(str) {
  let s = "";
  if (str.length == 0) return "";
  s = str.replace(/\n/g, "");
  s = s.replace(/  /g, "");
  return s;
}

const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}

const createDateTime = () => {
  return (new Date()).getTime();
}

export const utils = {
  'uuid': `${html_encode(generateUUID.toString())}`,
  'time': `${html_encode(createDateTime.toString())}`,
}


export const requestASyns = `
function main(user, platform, utils, request,callback){
  request.post("http://192.168.2.179:30099/mock/27/platform/tenant/list/page", {
            body: {
              listName: ""
            },
          })
          .then(res => {
            debugger;
            console.log(res);
           if (res.code == "000000") {
            this.$notify({
              title: "Success",
              message: "查询成功111",
              type: "success",
              duration: 2000
            });
          } 
            callback(res.data.records[0]);
            return res.data.records;
          })
          .catch(error => console.log(error));
}
`



function main(user, platform, utils, request,callback){
  request.post("http://192.168.2.179:30099/mock/27/platform/tenant/list/page", {
    body: {
      listName: ""
    },

  })
      .then(res => {
        debugger;
        console.log(res);
        if (
            res.header.rspCode == "00000000" &&
            res.header.rspCode == "SP000000"
        ) {
          this.$notify({
            title: "Success",
            message: "查询成功",
            type: "success",
            duration: 2000
          });
        } else if (res.header.rspCode == "99999999") {
          this.$notify({
            title: "fail",
            message: "查询失败",
            type: "info",
            duration: 2000
          });
          return;
        }
        // callBack(res.body.define);
        return res.body.define;
      })
      .catch(error => console.log(error));
}


const result = {
  header:{
    rspCode:"SP000000",
  },
  body:{
    define:{
      flowType:"",
      funcCollection:'',
    },
    detail:{
      records:[
        {
          checkStart:true
        }
      ]
    }
  }
};

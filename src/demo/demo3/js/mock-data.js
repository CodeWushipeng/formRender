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

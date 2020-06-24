export  const user = {
  user: "feng",
  age: "11",
  address: "beijing001",
  account_no: "6212121212",
  up: {
    idflag: "2",
  },
}
export  const platform = {
  sysdate: "20200202",
  node: "feng's node data description",
  amount: "99",
  transferType: "2",
  bank: {
    bankId: "0098878",
    banktoken: "#212@112",
  },
}

function html_encode(str){
  let  s = "";
  if (str.length == 0) return "";
  s = str.replace(/\n/g, "");
  s =  s.replace(/  /g, "");
  return s;
}


function commit_define() {
  const a = 1;
  const b = 1;
  return a+b;
}

function input_config_cx() {
  const fl = {
    amount: '@platform.amount',
    transferType: '@platform.transferType',
    user: '622004',
    name:"fengwenxin",
    description:"this is input_config_cx has @",
  }

  const fl2 = {
    amount: '12121.00',
    transferType: '1',
    user: '622004',
    name:"fengwenxin",
    description:"this is input_config_cx no @",
  }

  return fl2
}

function input_config_jf() {
  return {
    user: '899',
    transferType: '2',
    amount: '888.00',
    account_no:"62209878788878",
    description: 'this is jf desc',
  }
}

function input_config_jf2() {
  return {
    user: '22222',
    transferType: '2',
    amount: '12.00',
    account_no:"62209878788878",
    description: 'this is jf desc',
  }
}

export   const func = {
  'commit':  `${html_encode(commit_define.toString())}` ,
  'input_config_cx': `${html_encode(input_config_cx.toString())}`,
  'input_config_jf2': `${html_encode(input_config_jf2.toString())}`,
  'input_config_jf': `${html_encode(input_config_jf.toString())}`,
}

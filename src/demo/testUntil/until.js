
// 公共函数
export const  commonJs1 = `
function add() {
    function _my(){
        return 13
    }
    var a = 12;
    var b = 12;

    return a + b +_my();
}

function sum() {
    var c = 12;
    var d = 12;

    return c + d;
}

function mul() {
    var e = 12;
    var f = 12;
    return e * f;
}

module.exports = {
    add,sum,mul
}

`;


// 提取数据配置，响应数据配置
export const inputConfigs  = `

function query() {
    return  {
        amount: '12121.00',
        transferType: '1',
    }
}

function query2(){
    return {
        test1:"test1",
        test2:"this is test2",
      
    }
}

function main(){
    const obj1 = query();
    const obj2 = query2();
    const obj3 = {
        sum:utils.sum(),
        add:utils.add(),
    }
    return Object.assign(obj1,obj2,obj3)
}

 `;



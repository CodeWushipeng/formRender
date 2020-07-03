export  const inputConfig_  = `

function _execute(user,platform,nodes,util){

console.log("arguments",arguments)

    function query() {
        return  {
            amount: '12121.00',
            transferType: '1',
            user: '622004',
            name:"fengwenxin",
            description:"this is input_config_cx no @",
            uuid1: util.generateUUID(),
        }
    }

    function query2(){
        return {
            test1:"test1",
            test2:"this is test2",
            user:user,
            platform:platform,
            nodes:nodes.A.name,
            nodes2:nodes.B.up.id,
        }
    }

    function main(){
        const obj1 = query();
        const obj2 = query2();
        const obj3 = {
            uuid2: util.generateUUID(),
        }
        return Object.assign(obj1,obj2,obj3)
    }

    return main(...arguments);
}

 `;


export  const inputConfig  = `

    // 函数1
    function query() {
        return  {
            amount: '12121.00',
            transferType: '1',
            user: '622004',
            name:"fengwenxin",
            description:"this is input_config_cx no @",
            uuid1: util.generateUUID(),
        }
    }

    // 函数2
    function query2(){
        return {
            test1:"test1",
            test2:"this is test2",
            user:user,
            platform:platform,
            nodes:nodes.A.name,
            nodes2:nodes.B.up.id,
        }
    }

    // 启动函数
    function main(){
        const obj1 = query();
        const obj2 = query2();
        const obj3 = {
            uuid2: util.generateUUID(),
        }
        return Object.assign(obj1,obj2,obj3)
    }

 `;


export  const nodes = {
    A:{
        name:"lissi"
    },
    B:{
        up:{
            id:"id009"
        }
    }
}


export const inputConfig2  = `
               function query() {
                    return  {
                        main: 'this is inputConfig2 ',
                        amount: '12121.00',
                        transferType: '1',
                        user: '622004',
                        name:"fengwenxin",
                        description:"this is input_config_cx no @",
                        // uuid:this.generateUUID(),
                    }
                }
            `;


export  const result = `function _execute(user,platform,nodes,util){ `

    + inputConfig +

    `
        return main(...arguments);
     }`;




/*    var fs = (function(){
        return 123
    })()
    alert(fs)*/

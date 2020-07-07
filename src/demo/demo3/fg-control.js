/**
 * 流控引擎
 */
class FG {
    constructor() {

        this.ISOK = false;
        this.CURFORM= null;   // 当前展示的是input_config_code 还是 output_config_code 表单
        this.OUTFLAG= null;   // 提交标识
        // this.FUNC= null;      // 函数列表
        // 流程节点
        this.START = "01"; // 开始
        this.END   = "02"; // 结束
        this.DOING = "03"; // 业务类型
        // 提交方式
        this.COMMIT_DEFAULT = "01"; // 默认提交
        this.COMMIT_DEFINE  = "02"; // 自定义提交
        this.COMMIT_ORDER   = "03"; // 订单提交
        this.COMMIT_LOCAL   = "04"; // 本地提交
        // 返回设置
        this.CAN_ROLLBACK = "01"; // 可以回退
        this.CANNOT_ROLLBACK = "02"; // 不可回退
        // 是否保留数据
        this.CLEAR_DATA = "01", // 清除数据
        this.KEEP_DATA = "02", // 保留数据


        this.user = {};
        this.platform =  {};
        this.nodes =  {};
        this.list =  {};
        this.utils =  {};

        // 流控数据
        this.flow = {};
    }

    /**
     * 初始化成功
     */
    init() {
        console.log('engine init...')
    }

    getAllData(){
        return {
            user:this.user,
            platform:this.platform,
            CURFORM:this.CURFORM ,
            OUTFLAG:this.OUTFLAG ,
            list:this.list,
            nodes:this.nodes,
        }
    }

    /**
     * 设置数据
     * @param object
     */
    setters(key,value){
        this[key] = value;
    }

    /**
     * 检查节点能否执行
     * @param checkstart
     * @returns {*}
     */
    checkStart(checkstart) {
        if(checkstart){
            return this._solveConfigJs(checkstart)
        }
        return true;
    }

    /**
     * 处理公共函数js代码
     * @param JsCode
     * @returns {any}
     * @private
     */
    solveCommonJS(JsCode){
        try {
            return eval(JsCode)
        }catch (error) {
            console.log('===commonJs===',JsCode)
            throw  new Error(error)
        }
    }

    /**
     * 处理配置数据js代码
     * @param inputConfigJs
     * @returns {*}
     * @private
     */
    _solveConfigJs(JsCode){
        try {
            const platform = this.platform;
            const user = this.user;
            const nodes = this.nodes;
            const utils = this.utils;
            console.log('{ platform, user, nodes, utils} ',{ platform, user, nodes, utils} )
            const resCode = `function _execute(user, platform, nodes, utils){  ${JsCode}  return main(...arguments);}`;
            // console.log('resCode',resCode)
            const exeCode = eval("(" + resCode + ")");
            let rs = exeCode(user, platform, nodes, utils);
            return rs;
        } catch (error) {
            console.log('===inputConfigJs===',JsCode)
            throw new Error(error)
        }
    }

    /**
     * 获取流控节点中配置的数据
     * @param fn
     * @returns {any}
     */
    _getFieldsData(fn) {
        try {
            const flow = this.flow;
            const obj = eval(fn);
            for (let key in obj) {
                // console.log(key,(obj[key]))
                obj[key] = eval(obj[key]);
            }
            return obj;
        } catch (e) {
            throw new Error('init func[input_config] 执行出错了')
        }
    }

    /**
     * 过滤数据
     * @param node_code
     * @returns {*}
     * @private
     */
    _filter(node_code) {
        return this.list.filter(item => item.nodeCode == node_code);
    }

    /**
     * 获取流控中配置的数据
     * @param node_code
     * @returns {*}
     */
    getInputData(node_code) {
        const flw = this._filter(node_code)[0];
        const {input_config} = flw;
        const {func} = this.flow;
        if (func && input_config) {
            const fn = func[input_config];
            return this._getFieldsData(fn);
        } else {
            return {}
        }
    }

    /**
     * 上一节点
     * @param return_node
     * @returns {*}
     */
    getPrev(return_node) {
        if (return_node) {
            const prev = this._filter(return_node);
            if (prev instanceof Array && prev.length > 0) {
                return prev[0]
            }
        }
    }

    /**
     * 下一节点
     * @param next_node
     * @returns {*}
     */
    getNext(next_node) {
        console.log('next_node', next_node)
        if (next_node) {
            // const next = this.flow.list.filter(item => item.node_code == next_node);
            const next = this._filter(next_node);
            if (next instanceof Array && next.length > 0) {
                return next[0];
            }
        }
    }

    /**
     * 保存节点数据
     * @param nodeCode
     * @param value
     */
    saveNode(nodeCode, value) {
        // this.flow[nodeCode] = value;
        this.nodes[nodeCode] = value;
        console.log('nodes', JSON.stringify(this.nodes))
    }
    getNodes(){
        return this.nodes;
    }

    /**
     * 默认提交
     * @param Obj
     * @returns {Promise<any>}
     */
    commitDefault(Obj) {
        return new Promise((resolve, reject) => {
            console.log("执行默认的提交", Obj)
            resolve(Obj)
        })
    }

}

// 返回单例
let getFG = (function () {
    let fee
    return function () {
        if (!fee) {
            fee = new FG();
        }
        return fee
    }
})()

export default getFG;

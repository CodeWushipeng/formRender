const flowMixin= {
    methods:{
        filterType(type) {
            if (!type) return '';
            const elTag = {
                '01':"",
                '02':"danger",
                '03':"success",
            };

            return elTag[type];
        },
        filterStatus(type) {
            if (!type) return '';
            const fsTxt = {
                '01': "开始节点",
                '02': "结束节点",
                '03': "表单节点",
            };

            return fsTxt[type];
        },
    }
}
export default flowMixin;

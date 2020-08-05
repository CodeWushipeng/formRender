const flowMixin = {
  data(){
    return {
      hackRest: true,
      debug: false, // debug
    }
  },
  computed: {
    NodeType() {
      return this.data.type;
    },
    isDebugMode() {
      return true;
    },
    bussStyle() {
      return this.debug == false ? 'width:100%' : 'width:50%';
    },
    mainClass() {
      return this.debug == false ? 'mains' : 'mains-debug';
    }
  },
  methods: {
    filterType(type) {
      if (!type) return '';
      const elTag = {
        '01': "",
        '02': "danger",
        '03': "success",
        '04': "info",
        '05': "warning",
      };

      return elTag[type];
    },
    filterStatus(type) {
      if (!type) return '';
      const fsTxt = {
        '01': "开始节点",
        '02': "结束节点",
        '03': "表单节点",
        '04': "复核节点",
        '05': "授权节点",
      };

      return fsTxt[type];
    },
    filterSubType(type) {
      if (!type) return '';
      const fsTxt = {
        '01': "通用通信提交",
        '02': "订单提交",
        '03': "自定义函数提交",
        '04': "本地提交",
      };

      return fsTxt[type];
    },
    resetComponent() {
      // 销毁组件
      return new Promise((reslove, reject) => {
        this.hackRest = false;
        this.$nextTick(() => {
          this.hackRest = true;
          reslove();
        });
      });
    },
  }
};
export default flowMixin;




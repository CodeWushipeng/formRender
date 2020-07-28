const flowMixin = {
  data(){
    return {
      canEnter: false, // 能否键盘操作按钮
      btnIndex: 1,
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


const Rank_BTNS = ['prev', 'submit', 'cancel'];
const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

export const subControls = {
  hasEnd(val){
    // console.log('has end..', val)
    // this.canEnter = val;
  },
  calBtnType(num) {
    if (num == this.btnIndex && this.canEnter) {
      return 'primary';
    } else {
      return 'default';
    }
  },
  calBtnName() {
    return Rank_BTNS[this.btnIndex];
  },
  calBtnIndex(keyCode) {
    if (keyCode == KEY_LEFT || keyCode == KEY_RIGHT) {
      let btnsLength = Rank_BTNS.length - 1;
      if (keyCode == KEY_LEFT) {
        --this.btnIndex
        if (this.btnIndex < 0) this.btnIndex = 0
      } else {
        ++this.btnIndex
        if (this.btnIndex > btnsLength) this.btnIndex = btnsLength
      }
    }
  },
  calBtnSubmit(keyCode) {
    if (keyCode == KEY_ENTER && this.canEnter) {
      // alert(Rank_BTNS[this.btnIndex])
      const funcName = this.calBtnName();
      // return
      // debugger
      switch (funcName) {
        case 'prev':
          this.prev();
          break;
        case 'submit':
          this.submit();
          break;
        case 'cancel':
          this.cancel();
          break;
        default:
          // 默认代码块
          throw Error("没有funcName")
      }
    }
  },
}


import storage from 'good-storage';
import { DICTS } from './dicts';

const DEBUG_KEY = '__debug__';
// const Rank_BTNS = ['prev', 'submit', 'buyProd', 'addCart', 'cancel'];
const Rank_BTNS = ['prev', 'submit', 'cancel'];
const KEY_CTRL = 17;
const KEY_ALT  = 18;
const KEY_NUM_0 = 48;
// const KEY_NUM9 = 57;
// const KEY_SHIFT = 16;
// const KEY_NUM2 = 50;


const flowMixin = {
  data(){
    return {
      hackRest: true,
      debug: false, // debug
    }
  },
  computed: {
    nodeName(){
      return this.data.nodeName
    },
    nodeType() {
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
  created() {
    storage.session.set('Rank_BTNS', Rank_BTNS.join("-"))
    this.debug = storage.session.get(DEBUG_KEY, false);
  },
  methods: {
    openDebug(_this) {
      const _self = _this;
      let code = 0;
      let code2 = 0;
      let code3 = 0;
      let timer = null;
      const $doc= document;
      $doc.onkeydown = function (e) {
        clearTimeout(timer);
        //事件对象兼容
        let e1 = e || event || window.event // || arguments.callee.caller.arguments[0];
        console.log('e1.keyCode', e1.keyCode);
        const key = e1.keyCode;
        if (key === KEY_CTRL) code = 1;
        if (key === KEY_ALT)  code2 = 1;
        if (key === KEY_NUM_0) code3 = 1;
        if (code === 1 && code2 === 1 && code3 === 1) {
          if (_self.isDebugMode) {
            _self.debug = !_self.debug;
            storage.session.set(DEBUG_KEY, _self.debug)
          }
          code  = 0;
          code2 = 0;
          code3 = 0;
        }
        console.log(code, code2, code3);
        timer = setTimeout(() => {
          code  = 0;
          code2 = 0;
          code3 = 0;
        }, 1000)
      }
    },
    getElTagType(type) {
      return DICTS.elTagType[type];
    },
    getNodeName(type) {
      return DICTS.nodeName[type];
    },
    getSubType(type) {
      return DICTS.subType[type];
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




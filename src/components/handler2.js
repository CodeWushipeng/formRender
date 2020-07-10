import request from "../util/request";
let handlers = {
  props: {},
  data() {
    return {
      comArr: [], //组件list数组
      outMark: 0, //外层循环标记
      allItems: [],
      unfocus: [],
      canFocusLength: 0,
      preIndex: 0, //上次聚焦元素序号
      singleError: false,
      rangeError: false,
      conditionError: false,
      remoteError: false,
      canFocusArr: [],
      canFocusType: [
        "input",
        "textarea",
        "date",
        "time",
        "number",
        "password",
        "againpassword",
        "amount",
        "singletext",
        "select",
        "idencard",
      ],
    };
  },
  methods: {
    // 光标聚焦时获取当前节点model
    getIndex(params) {
      for (let i = 0; i < this.comArr.length; i++) {
        if (this.comArr[i].model == params) {
          this.preIndex = i;
        }
      }
      console.log(this.preIndex, this.outMark);
      if (this.preIndex == this.outMark) {
        return;
      }
      this.allValidate(this.preIndex);
    },
    // 光标失去焦点
    getPreIndex() {
      if(document.activeElement=="BODY"){
        this.allValidate(this.outMark);
      }
    },
    // 隐藏
    handelHidden() {
      this.comArr.forEach((item) => {
        if (item.hidden && item.hidden != "") {
          let flag = this.evalWrap(item.hidden);
          if (flag) {
            item.options.hidden = true;
          } else {
            item.options.hidden = false;
          }
        }
      });
    },
    // 获取全部item节点
    getAllItems() {
      this.allItems = document.querySelectorAll(".generateForm .el-form-item");
    },
    // 流程控制
    handelFlow() {
      // debugger
      if (
        this.singleError ||
        this.rangeError ||
        this.conditionError ||
        this.remoteError
      ) {
        return;
      }
      // if(this.outMark < this.canFocusLength){
      //   this.outMark++;
      // }
      this.outMark++;
      this.handelHidden();
      this.getShowLength();
      this.enterCheck();
      this.iteratorAllEle();
    },
    // 组件单独校验
    singleValidate(i) {
      let lists = this.comArr;
      this.$refs["generateForm"].validateField(lists[i].model, (valid) => {
        console.log("组件单独校验",valid,lists[i].model)
        if (valid != "" && valid != undefined) {
          this.setFocus(this.allItems[i]);
          this.singleError = true;
        } else {
          this.singleError = false;
        }
      });
    },
    // 手动触发校验提示函数
    handelValidate(statu, msg, index) {
      this.$refs["generateForm"].fields[index].validateState = statu;
      if (statu == "error") {
        this.$refs["generateForm"].fields[index].validateMessage = msg;
      }
    },
    // eval封装
    evalWrap(targetEval) {
      if(!targetEval){
        return
      }
      let result;
      if (targetEval.indexOf("function") != -1) {
        try {
          let tempFunc = eval("(" + targetEval + ")");
          result = tempFunc(this.models);
        } catch (error) {
          throw new Error(error);
        }
      } else if (
        targetEval.indexOf("function") == -1 &&
        targetEval.indexOf("if") != -1
      ) {
        let tmpFunc = new Function(targetEval);
        try {
          result = tmpFunc.call(this);
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          result = eval(targetEval);
        } catch (error) {
          throw new Error(error);
        }
      }
      return result;
    },
    // 取值范围校验
    handelRange(i) {
      if (this.singleError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].valueRange != "" && lists[i].valueRange != undefined) {
        let range = lists[i].valueRange;
        let nowValue = this.models[lists[i].model];
        let result, resultType;
        try {
          result = this.evalWrap(range);
          resultType = Object.prototype.toString.call(result);
        } catch (error) {
          this.handelValidate("error", "语法错误", i);
          throw new Error(error, "取值范围条件解析出错");
        }
        if (resultType == "[object Array]") {
          if (result.indexOf(nowValue) == -1) {
            this.handelValidate("error", "不在取值范围内", i);
            this.setFocus(this.allItems[i]);
            this.rangeError = true;
          } else {
            this.handelValidate("success", "", i);
            this.rangeError = false;
          }
        } else if (resultType == "[object RegExp]") {
          if (result.test(nowValue)) {
            this.handelValidate("success", "", i);
            this.rangeError = false;
          } else {
            this.setFocus(this.allItems[i]);
            this.handelValidate("error", "不在取值范围内", i);
            this.rangeError = true;
          }
        } else if (
          resultType == "[object String]" ||
          resultType == "[object Number]"
        ) {
          let resultReg = new RegExp("[" + range + "]");
          if (resultReg.test(nowValue)) {
            this.handelValidate("success", "", i);
            this.rangeError = false;
          } else {
            this.setFocus(this.allItems[i]);
            this.handelValidate("error", "不在取值范围内", i);
            this.rangeError = true;
          }
        }
      } else {
        this.handelValidate("success", "", i);
        this.rangeError = false;
      }
    },
    // 离开条件检测
    handelCondition(i) {
      if (this.singleError || this.rangeError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].condition && lists[i].condition != "") {
        let condition = this.evalWrap(lists[i].condition);
        if (condition) {
          this.handelValidate("success", "", i);
          this.conditionError = false;
        } else {
          this.setFocus(this.allItems[i]);
          this.handelValidate("error", "不满足离开条件", i);
          this.conditionError = true;
        }
      } else {
        this.handelValidate("success", "", i);
        this.conditionError = false;
      }
    },
    // 访问外部条件
    remoteValidate(i) {
      if (this.singleError || this.rangeError || this.conditionError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].remoteFactor && lists[i].remoteFactor.isRemote !== "") {
        let flag = this.evalWrap(lists[i].remoteFactor.isRemote);
        if (!flag) {
          return;
        }
        let url = "/dev-api/dictionary/quertDicNoPage"
        let primitiveData = this.evalWrap(lists[i].remoteFactor.data);
        let nowModel = lists[i].model;
        let nowData = this.models[nowModel];
        let postData;
        if (primitiveData != undefined && primitiveData != "") {
          postData = primitiveData;
        } else {
          postData = nowData;
        }
        let success = lists[i].remoteFactor.success;
        request
          .post(url, {
            body: {
              dicName: "cityList",
              selType: 2,
            },
            header: { pageIndex: 1, pageSize: 1, gloSeqNo: new Date(),"reqSeqNo": "sit anim","reqTime": "officia ad anim",},
          })
          .then((res) => {
            console.log(res)
            if (res.header.rspCode == "SP000000") {
              // 提取返回数据对象名
              let targetKeys = Object.keys(res.body.dicList);
              // 解析返回数据对应的属性名并赋值对应组件
              for (let j = 0; j < targetKeys.length; j++) {
                if (this.models[targetKeys[j]] != undefined) {
                  this.models[targetKeys[j]] = res.data[targetKeys[j]];
                }
              }
              this.evalWrap(success);
              this.handelValidate("success", "", i);
              this.remoteError = false;
            } else {
              this.setFocus(this.allItems[i]);
              this.handelValidate("error", "验证失败，请重新验证", i);
              this.remoteError = true;
            }
          })
          .catch((error) => {
            console.log(error);
            this.setFocus(this.allItems[i]);
            this.handelValidate("error", "验证失败，请重新验证", i);
            this.remoteError = true;
          });
      } else {
        this.handelValidate("success", "", i);
        this.remoteError = false;
      }
    },
    // 离开赋值
    handelAssignment(j) {
      if (
        this.singleError ||
        this.rangeError ||
        this.conditionError ||
        this.remoteError
      ) {
        return;
      }
      let lists = this.comArr;
      if (lists[j].assignment && lists[j].assignment != "") {
        console.log("离开赋值",lists[j].assignment)
        this.evalWrap(lists[j].assignment);
      }
    },
    // 进入条件检测
    enterCheck() {
      let lists = this.comArr;
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].enterCondition && lists[i].enterCondition != "") {
          let condition = this.evalWrap(lists[i].enterCondition);
          if (condition) {
            lists[i].options.disabled = false;
          } else {
            lists[i].options.disabled = true;
          }
        }
      }
    },
    // 全部节点循环事件
    iteratorAllEle() {
      // this.iteratorUnfocus()
      // debugger
      for (let i = this.outMark; i < this.comArr.length; i++) {
        if (
          this.comArr[i].options.disabled ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == "readonly"
        ) {
          continue;
        } else {
          if (this.canFocusType.indexOf(this.comArr[i].type) != -1) {
            this.setFocus(this.allItems[i]);
            console.log( "获取节点",this.outMark, i, this.allItems[i]);
            this.outMark = i;
            this.preIndex = this.outMark
            break;
          }
        }
      }
    },
    // 获取页面显示的元素的长度
    getShowLength(){
      this.canFocusLength=0
      for(let i = this.comArr.length-1; i >= 0; i--){
        if (
          this.comArr[i].options.disabled ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == "readonly"
        ) {
          continue
        }else{
          this.canFocusLength = i;
          break
        }
      }
      console.log(this.canFocusLength)
    },
    // 综合校验
    allValidate(target) {
      for (let i = 0; i <= target; i++) {
        if (
          this.comArr[i].options.disabled ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == "readonly"
        ) {
          continue;
        }
        this.singleValidate(i);
        this.handelRange(i);
        this.handelCondition(i);
        this.remoteValidate(i);
        if (
          this.singleError ||
          this.rangeError ||
          this.conditionError ||
          this.remoteError
        ) {
          break;
        }
      }
    },
    // 循环过去的节点
    iteratorUnfocus() {
      for (let i = 0; i < this.outMark; i++) {
        if (
          !this.unfocus[i].options.disabled &&
          !this.unfocus[i].options.hidden &&
          this.unfocus[i].options.readonly !== "readonly"
        ) {
          for (let j = 0; j < this.comArr.length; j++) {
            if (this.comArr[j].model == this.unfocus[i].model) {
              this.setFocus(this.allItems[j]);
              this.outMark = j;
              break;
            }
          }
        }
      }
    },
    // 获取并聚焦元素
    setFocus(ele) {
      let focusEle = ele.querySelector("input")
        ? ele.querySelector("input")
        : ele.querySelector("textarea");
      console.log("当前聚焦元素",focusEle)
      this.$nextTick(()=>{
        focusEle.focus();
      })

    },
    // 回车事件
    onElChange() {
      if (this.preIndex != this.outMark) {
        this.allValidate(this.preIndex);
        this.outMark = this.preIndex;
        console.log(this.outMark)
        this.handelFlow();
        console.log(this.outMark)
        return
      }
      console.log("回车",this.outMark)
      if (this.outMark <= this.canFocusLength) {
        this.allValidate(this.outMark);
        this.handelAssignment(this.outMark);
        this.handelFlow();
      }
    },
    // textarea ctrl+enter触发光标离开事件
    textEnter() {
      this.onElChange();
    },
    // 发送remote方法
    pushRemoteFunc(){
      this.comArr.forEach(item => {
        if(item.options.remoteFunc){
          let result = this.evalWrap(item.options.remoteFunc);
          let resultArr
          result.forEach((resitem) => {
            let tempJson = {
              value: "",
              label: "",
            };
            tempJson.label = resitem.itemValue;
            tempJson.value = resitem.itemCode;
            resultArr.push(tempJson);
          });
          item.options.options = resultArr
        }
      })
    },
    // 获取组件数据
    tranData() {
      this.data.list.forEach((item) => {
        if (item.type === "grid") {
          item.columns.forEach((cloItem) => {
            this.comArr = [...this.comArr, ...cloItem.list];
          });
        } else {
          this.comArr = [...this.comArr, item];
        }
      });
      console.log(this.comArr);
    },
  },
  mounted() {
    let inter = setInterval(() => {
      debugger
      if (this.data.list && this.data.list.length > 0) {
        clearInterval(inter);
        this.tranData();
        this.handelHidden();
        this.enterCheck();
        this.getAllItems();
        this.getShowLength();
        this.iteratorAllEle();
      }
    }, 300);
  },
};
export default handlers;

import request from "../util/request";
let handlers = {
  props: {},
  data() {
    return {
      comArr: [], //组件list数组
      outMark: 0, //外层循环标记
      allItems: [],
      focusIndex: 0,
      mark: 0,
      singleError: false,
      rangeError: false,
      conditionError: false,
      remoteError: false,
      oldCanFocusArr: [],
      canFocusArr: [],
      canFocusType: [
        "input",
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
      for (let i = 0; i < this.canFocusArr.length; i++) {
        if (this.canFocusArr[i].model == params) {
          // this.focusIndex = this.canFocusArr[i].index
          this.focusIndex = i;
        }
      }
      this.singleValidate(this.focusIndex);
      this.handelRange(this.focusIndex);
      this.handelCondition(this.focusIndex);
      this.remoteValidate(this.focusIndex);
      // this.handelAssignment(this.focusIndex);
    },
    // 光标失去焦点
    getPreIndex() {
      // 判断页面是否有聚焦元素
      // console.log("浏览器是否有聚焦元素", document.activeElement.tagName);
      // if (document.activeElement.tagName == "BODY") {
      //   console.log("失去焦点且页面没有聚焦元素");
      //   this.singleValidate(this.focusIndex);
      //   this.handelRange(this.focusIndex);
      //   this.handelCondition(this.focusIndex);
      //   this.remoteValidate(this.focusIndex);
      //   this.handelAssignment(this.focusIndex);
      // } else {
      //   return;
      // }
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
    // 全部可聚焦input节点下标加入一个全局数组维护
    getFocusEle() {
      this.oldCanFocusArr = this.canFocusArr;
      this.canFocusArr = [];
      for (let i = 0; i < this.comArr.length; i++) {
        if (
          this.comArr[i].options.disabled ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == "readonly"
        ) {
          continue;
        } else {
          let temp = { index: i, model: this.comArr[i].model };
          if (this.canFocusType.indexOf(this.comArr[i].type) != -1) {
            this.canFocusArr.push(temp);
          } else if (this.comArr[i].type == "textarea") {
            this.canFocusArr.push(temp);
          }
        }
      }
    },
    // 光标操作控制流程
    handelFocus() {
      // debugger
      for (let i = 0; i < this.mark; i++) {
        if (this.oldCanFocusArr[i].index !== this.canFocusArr[i].index) {
          this.mark = i;
          break;
        }
      }
      let nowInput = this.allItems[
        this.canFocusArr[this.mark].index
      ].querySelector("input");
      let nowTextraea = this.allItems[
        this.canFocusArr[this.mark].index
      ].querySelector("textarea");
      this.$nextTick(() => {
        if (nowInput) {
          nowInput.focus();
        } else if (nowTextraea) {
          nowTextraea.focus();
        }
      });
    },
    // textarea ctrl+enter触发光标离开事件
    textEnter() {
      this.onElChange();
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
      this.mark++;
      this.handelHidden();
      this.enterCheck();
      this.getFocusEle();
      this.handelFocus();
    },
    // 组件单独校验
    singleValidate(j) {
      let lists = this.comArr;
      for (let i = 0; i < this.canFocusArr[j].index; i++) {
        this.$refs["generateForm"].validateField(lists[i].model, (valid) => {
          if (valid != "" && valid != undefined) {
            let nowIndex = this.canFocusArr[j].index;
            this.allItems[nowIndex].querySelector("input").focus();
            this.singleError = true;
          } else {
            this.singleError = false;
          }
        });
      }
    },
    // 手动触发校验提示函数
    handelValidate(statu, msg, index) {
      this.$refs["generateForm"].fields[index].validateState = statu;
      if (statu == "error") {
        // this.$notify.error({
        //   title: "错误",
        //   message: msg,
        // });
        this.$refs["generateForm"].fields[index].validateMessage = msg;
      }
    },
    // eval封装
    evalWrap(targetEval) {
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
    handelRange(j) {
      if (this.singleError) {
        return;
      }
      let lists = this.comArr;
      for (let i = 0; i <= this.canFocusArr[j].index; i++) {
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
              this.allItems[i].querySelector("input").focus();
              this.rangeError = true;
              break;
            } else {
              this.handelValidate("success", "", i);
              this.rangeError = false;
            }
          } else if (resultType == "[object RegExp]") {
            if (result.test(nowValue)) {
              this.handelValidate("success", "", i);
              this.rangeError = false;
            } else {
              this.allItems[i].querySelector("input").focus();
              this.handelValidate("error", "不在取值范围内", i);
              this.rangeError = true;
              break;
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
              this.allItems[i].querySelector("input").focus();
              this.handelValidate("error", "不在取值范围内", i);
              this.rangeError = true;
              break;
            }
          }
        } else {
          this.handelValidate("success", "", i);
          this.rangeError = false;
        }
      }
    },
    // 离开条件检测
    handelCondition(j) {
      if (this.singleError || this.rangeError) {
        return;
      }
      let lists = this.comArr;
      for (let i = 0; i <= this.canFocusArr[j].index; i++) {
        if (lists[i].condition && lists[i].condition != "") {
          let condition = this.evalWrap(lists[i].condition);
          if (condition) {
            this.handelValidate("success", "", this.canFocusArr[j].index);
            this.conditionError = false;
          } else {
            this.allItems[i].querySelector("input").focus();
            this.handelValidate("error", "不满足离开条件", i);
            this.conditionError = true;
          }
        } else {
          this.handelValidate("success", "", this.canFocusArr[j].index);
          this.conditionError = false;
        }
      }
    },
    // 访问外部条件
    remoteValidate(j) {
      if (this.singleError || this.rangeError || this.conditionError) {
        return;
      }
      let lists = this.comArr;
      for (let i = 0; i <= this.canFocusArr[j].index; i++) {
        if (lists[i].remoteFactor && lists[i].remoteFactor.isRemote !== "") {
          let flag = this.evalWrap(lists[i].remoteFactor.isRemote);
          if (!flag) {
            return;
          }
          let url = lists[i].remoteFactor.url;
          let primitiveData = lists[i].remoteFactor.data;
          let nowModel = lists[i].model;
          let nowData = this.models[nowModel];
          let postData;
          var result;
          if (primitiveData != undefined && primitiveData != "") {
            postData = primitiveData;
          } else {
            postData = nowData;
          }
          let success = lists[i].remoteFactor.success;
          request
            .post(url, {
              data: postData,
            })
            .then((res) => {
              if (res.code == 0) {
                // 提取返回数据对象名
                let targetKeys = Object.keys(res.data);
                // 解析返回数据对应的属性名并赋值对应组件
                for (let j = 0; j < targetKeys.length; j++) {
                  if (this.models[targetKeys[j]] != undefined) {
                    this.models[targetKeys[j]] = res.data[targetKeys[j]];
                  }
                }
                this.evalWrap(success);
                this.handelValidate("success", "", this.canFocusArr[j].index);
                this.remoteError = false;
              } else {
                this.allItems[i].querySelector("input").focus();
                this.handelValidate(
                  "error",
                  "验证失败，请重新验证",
                  this.canFocusArr[j].index
                );
                this.remoteError = true;
              }
            })
            .catch((error) => {
              console.log(error);
              this.allItems[i].querySelector("input").focus();
              this.handelValidate(
                "error",
                "验证失败，请重新验证",
                this.canFocusArr[j].index
              );
              this.remoteError = true;
            });
        } else {
          this.handelValidate("success", "", this.canFocusArr[j].index);
          this.remoteError = false;
        }
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
      if (
        lists[this.canFocusArr[j].index].assignment &&
        lists[this.canFocusArr[j].index].assignment != ""
      ) {
        this.evalWrap(lists[this.canFocusArr[j].index].assignment);
        // this.models.a = 3
        // this.$set(this.models,"a",3)
        console.log(this.models);
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
      for (let i = this.outMark; i < this.comArr.length; i++) {
        if (
          this.comArr[i].options.disabled ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == "readonly"
        ) {
          let unfocus = [];
          unfocus.push(this.comArr[i])
          continue;
        } else {
          this.setFocus(this.allItems[i])
          this.outMark = i;
        }
      }
    },
    // 循环过去的节点
    iteratorUnfocus(){
      for(let i=0;i<unfocus.length;i++){
        if(!unfocus[i].options.disabled && !unfocus[i].options.hidden && unfocus[i].options.readonly !== "readonly"){
          this.outMark = i;
          this.iteratorAllEle()
        }
      }
    },
    // 获取并聚焦元素
    setFocus(ele) {
      let focusEle = ele.querySelector("input")
        ? ele.querySelector("input")
        : ele.querySelector("textarea");
      focusEle.focus();
    },
    // 回车事件
    onElChange() {
      if (this.mark < this.canFocusArr.length - 1) {
        this.singleValidate(this.mark);
        this.handelRange(this.mark);
        this.handelCondition(this.mark);
        this.remoteValidate(this.mark);
        this.handelAssignment(this.mark);
        this.handelFlow();
      } else if (this.mark == this.canFocusArr.length - 1) {
        this.singleValidate(this.mark);
        this.handelRange(this.mark);
        this.handelCondition(this.mark);
        this.remoteValidate(this.mark);
        this.handelAssignment(this.mark);
      }
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
  created() {},
  mounted() {
    let inter = setInterval(() => {
      if (this.data.list && this.data.list.length > 0) {
        clearInterval(inter);
        this.tranData();
        this.handelHidden();
        this.enterCheck();
        this.getAllItems();
        this.getFocusEle();
        this.handelFocus();
      }
    }, 300);
  },
};
export default handlers;

import request from "../util/request";
let handlers = {
  props: {},
  data() {
    return {
      allItems: [],
      startIndex: 0,
      nowModel: "",
      singleError: false,
      rangeError: false,
      conditionError: false,
      remoteError: false,
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
      this.nowModel = params;
      console.log(this.nowModel);
    },
    // 光标失去焦点
    getPreIndex(params) {
      params = params*1;
      let index = this.canFocusArr.indexOf(params)
      console.log("失去焦点",params,this.canFocusArr.indexOf(params))
      this.singleValidate(index);
      this.handelRange(index);
      this.handelCondition(index);
      this.remoteValidate();
    },
    // 隐藏
    handelHidden() {
      this.data.list.forEach((item) => {
        let flag = eval(item.hidden);
        if (flag) {
          item.options.show = false;
        } else {
          item.options.show = true;
        }
      });
    },
    // 获取全部item节点
    getAllItems() {
      this.allItems = document.querySelectorAll(".generateForm .el-form-item");
    },
    // 全部可聚焦input节点下标加入一个全局数组维护
    getFocusEle() {
      this.canFocusArr = [];
      let flowData = this.data.list;
      console.log(this.data.list);
      for (let i = 0; i < flowData.length; i++) {
        if (
          flowData[i].options.disabled ||
          !flowData[i].options.show ||
          flowData[i].options.readonly == "readonly"
        ) {
          continue;
        } else {
          if (this.canFocusType.indexOf(flowData[i].type) != -1) {
            this.canFocusArr.push(i);
          } else if (flowData[i].type == "textarea") {
            this.canFocusArr.push(i);
          }
        }
      }
      console.log(this.canFocusArr);
    },
    // 光标操作控制流程
    handelFocus() {
      for (let i = this.startIndex; i < this.canFocusArr.length; i++) {
        let nowInput = this.allItems[this.canFocusArr[i]].querySelector(
          "input"
        );
        let nowTextraea = this.allItems[this.canFocusArr[i]].querySelector(
          "textarea"
        );
        if (nowInput) {
          nowInput.focus();
        } else if (nowTextraea) {
          nowTextraea.focus();
        }
        break;
      }
    },
    // textarea ctrl+enter触发光标离开事件
    textEnter() {
      this.onElChange();
    },
    // 流程控制
    handelFlow() {
      if (this.singleError || this.rangeError || this.conditionError || this.remoteError) {
        return;
      }
      this.startIndex = this.startIndex * 1 + 1;
      this.handelHidden();
      this.getFocusEle();
      this.handelFocus();
    },
    // 组件单独校验
    singleValidate(index) {
      this.$refs["generateForm"].validateField(this.nowModel, (valid) => {
        console.log("valid",valid)
        if (valid != "" && valid != undefined) {
          let nowIndex = this.canFocusArr[index];
          this.allItems[nowIndex].querySelector("input").focus();
          this.singleError = true;
        } else {
          this.singleError = false;
        }
      });
    },
    // 手动触发校验提示函数
    handelValidate(statu, msg, index) {
      console.log(statu)
      this.$refs["generateForm"].fields[index].validateState = statu;
      if (statu == "error") {
        this.$refs["generateForm"].fields[index].validateMessage = msg;
        console.log(this.$refs["generateForm"].fields[index]);
      }
    },
    // eval封装
    evalWrap(targetEval) {
      let result;
      if (targetEval.indexOf("function") != -1) {
        try {
          let tmpFunc = eval("(" + targetEval + ")");
          result = tmpFunc.call(this);
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
    handelRange(index) {
      if (this.singleError) {
        return;
      }
      let lists = this.data.list;
      for (let i = 0; i <= this.canFocusArr[index]; i++) {
        if (lists[i].valueRange != "" && lists[i].valueRange != undefined) {
          let range = lists[i].valueRange;
          let nowValue = this.models[lists[i].model];
          console.log(range, nowValue);
          let result, resultType;
          try {
            result = eval(range);
            resultType = Object.prototype.toString.call(result);
          } catch (error) {
            this.handelValidate("error", "语法错误", this.canFocusArr[index]);
            throw new Error(error, "取值范围条件解析出错");
          }
          console.log(resultType);
          if (resultType == "[object Array]") {
            if (result.indexOf(nowValue) == -1) {
              console.log("校验",result.indexOf(nowValue))
              this.handelValidate("error", "不在取值范围内", this.canFocusArr[index]);
              this.allItems[i].querySelector("input").focus();
              this.rangeError = true;
            } else {
              this.handelValidate("success", "", this.canFocusArr[index]);
              this.rangeError = false;
            }
          } else if (resultType == "[object RegExp]") {
            console.log(result, result.test(nowValue));
            if (result.test(nowValue)) {
              this.handelValidate("success", "", this.canFocusArr[index]);
              this.rangeError = false;
            } else {
              this.allItems[i].querySelector("input").focus();
              this.handelValidate("error", "不在取值范围内", this.canFocusArr[index]);
              this.rangeError = true;
            }
          } else if (
            resultType == "[object String]" ||
            resultType == "[object Number]"
          ) {
            let resultReg = new RegExp("[" + range + "]");
            console.log(resultReg);
            if (resultReg.test(nowValue)) {
              this.handelValidate("success", "", this.canFocusArr[index]);
              this.rangeError = false;
            } else {
              this.allItems[i].querySelector("input").focus();
              this.handelValidate("error", "不在取值范围内", this.canFocusArr[index]);
              this.rangeError = true;
            }
          }
        } else {
          this.handelValidate("success", "", this.canFocusArr[index]);
          this.rangeError = false;
        }
      }
    },
    // 离开条件检测
    handelCondition(index) {
      if (this.singleError || this.rangeError) {
        return;
      }
      let lists = this.data.list;
      for (let i = 0; i <= this.canFocusArr[index]; i++) {
        if (lists[i].condition && lists[i].condition != "") {
          let condition = this.evalWrap(lists[i].condition);
          console.log(condition);
          if (condition) {
            this.handelValidate("success", "", this.canFocusArr[index]);
            this.conditionError = false;
          } else {
            this.allItems[i].querySelector("input").focus();
            this.handelValidate("error", "不满足离开条件", this.canFocusArr[index]);
            this.conditionError = true;
          }
        } else {
          this.handelValidate("success", "", this.canFocusArr[index]);
          this.conditionError = false;
        }
      }
    },
    // 访问外部条件
    remoteValidate(index) {
      if (this.singleError || this.rangeError || this.conditionError) {
        return;
      }
      let lists = this.data.list;
      for (let i = 0; i <= this.canFocusArr[index]; i++) {
        if (lists[i].remoteFactor && lists[i].remoteFactor.isRemote == true) {
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
          console.log(postData);
          let success = lists[i].remoteFactor.success;
          console.log(lists[i].remoteFactor.success);
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
                this.handelValidate("success", "", this.canFocusArr[index]);
                this.remoteError = false;
              } else {
                this.allItems[i].querySelector("input").focus();
                this.handelValidate("error", "验证失败，请重新验证", this.canFocusArr[index]);
                this.remoteError = true;
              }
            })
            .catch((error) => {
              console.log(error);
              this.allItems[i].querySelector("input").focus();
              this.handelValidate("error", "验证失败，请重新验证", this.canFocusArr[index]);
              this.remoteError = true;
            });
        } else {
          this.handelValidate("success", "", this.canFocusArr[index]);
          this.remoteError = false;
        }
      }
    },
    // 离开赋值
    handelAssignment(index) {
      if (this.singleError || this.rangeError || this.conditionError || this.remoteError) {
        return;
      }
      let lists = this.data.list;
      for (let i = 0; i <= this.canFocusArr[index]; i++) {
        if (lists[i].assignment && lists[i].assignment != "") {
          this.evalWrap(lists[i].assignment);
        }
      }
    },
    // 进入条件检测
    enterCheck() {
      let lists = this.data.list;
      for (let i = 0; i <= this.canFocusArr[this.startIndex]; i++) {
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
    // 回车事件
    onElChange() {
      console.log("回车",this.canFocusArr.length)
      if (this.startIndex < this.canFocusArr.length-1) {
        this.singleValidate(this.startIndex);
        this.handelRange(this.startIndex);
        this.handelCondition(this.startIndex);
        this.remoteValidate(this.startIndex);
        this.handelAssignment(this.startIndex);
        this.handelFlow();
      }else{
        console.log("到底了")
      }
    },
  },
  created() {},
  mounted() {
    let inter = setInterval(() => {
      if (this.data.list.length > 0) {
        this.handelHidden();
        this.getAllItems();
        this.getFocusEle();
        this.handelFocus();
        clearInterval(inter);
      }
    }, 300);
  },
};
export default handlers;

import request from "../../util/request";
import { RES_OK } from "@/api/config";
import { getTrade, getTableList } from "@/api/forms";
let handlers = {
  props: {},
  data() {
    return {
      trade: false, //字段交易弹出框
      widgetPreValue: "", // 组件旧值
      comArr: [], //组件list数组
      outMark: 0, //外层循环标记
      allItems: [],
      unfocus: [],
      blurByEnter: false, // 标记select组件失去焦点事件是否是通过回车触发的
      canFocusLength: 0,
      preIndex: 0, //上次聚焦元素序号
      singleError: false,
      rangeError: false,
      conditionError: false,
      remoteError: false,
      canFocusArr: [],
      utils: {}, //扩展函数
      canFocusType: [
        "input",
        "textarea",
        "checkbox",
        "radio",
        "date",
        "time",
        "number",
        "password",
        "againpassword",
        "amount",
        "singletext",
        "select",
        "idencard",
        "readcard",
        "camera",
        "buttonCom",
      ],
    };
  },
  methods: {
    // 组件获取焦点
    mouseValidate(params) {
      // 获取焦点时存储组件旧值
      this.widgetPreValue = this.models[params];
      for (let i = 0; i < this.comArr.length; i++) {
        if (this.comArr[i].model == params) {
          this.preIndex = i;
        }
      }
      console.log(this.preIndex, this.outMark);
      if (this.preIndex == this.outMark) {
        return;
      }
      this.allValidate(this.preIndex - 1);
      if (
        !this.singleError &&
        !this.rangeError &&
        !this.conditionError &&
        !this.remoteError
      ) {
        this.outMark = this.preIndex;
      }
    },
    // 组件失去焦点
    blurValidate(params) {
      if (this.blurByEnter) {
        return;
      } else {
        // 失去焦点时判断两次的值是否相同，相同则不再做验证
        if (this.models[params] && this.widgetPreValue == this.models[params]) {
          return;
        }
        // if (this.preIndex != this.outMark) {
        //   this.allValidate(this.preIndex);
        //   this.outMark = this.preIndex;
        //   return;
        // }
        if (this.outMark <= this.canFocusLength) {
          this.allValidate(this.outMark);
          this.handelAssignment(this.outMark);
        }
      }
      this.widgetPreValue = "";
    },
    // 日期组件失去焦点
    dateFlow() {
      if (this.preIndex != this.outMark) {
        this.allValidate(this.preIndex);
        this.outMark = this.preIndex;
        return;
      }
      if (this.outMark <= this.canFocusLength) {
        this.allValidate(this.outMark);
        this.handelAssignment(this.outMark);
        this.handelFlow();
      }
    },
    // 隐藏
    handelHidden() {
      this.comArr.forEach((item) => {
        if (item.hidden && item.hidden != "") {
          let flag = this.evalWrap(item.hidden);
          console.log(flag);
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
      this.$nextTick(() => {
        if (
          this.singleError ||
          this.rangeError ||
          this.conditionError ||
          this.remoteError
        ) {
          return;
        }
        this.outMark++;
        this.handelHidden();
        this.getShowLength();
        this.enterCheck();
        this.iteratorAllEle();
      });
    },
    // 手动触发校验提示函数
    handelValidate(statu, msg, index) {
      this.$nextTick(() => {
        this.$set(
          this.$refs["generateForm"].fields[index],
          "validateState",
          statu
        );
        if (statu == "error") {
          this.$refs["generateForm"].fields[index].validateMessage = msg;
        }
      });
    },
    // eval封装
    evalWrap(targetEval, i) {
      if (!targetEval) {
        return;
      }
      console.log(i);
      let result;
      if (targetEval.indexOf("function") != -1) {
        try {
          let tempFunc = eval("(" + targetEval + ")");
          result = tempFunc(this.models, this.utils, this.handelValidate, i);
          console.log(tempFunc, result);
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
    // 组件单独校验
    singleValidate(i) {
      let lists = this.comArr;
      this.$refs["generateForm"].validateField(lists[i].model, (valid) => {
        if (valid) {
          this.setFocus(this.allItems[i]);
          this.singleError = true;
        } else {
          this.singleError = false;
        }
      });
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
            this.handelValidate("error", `取值范围${lists[i].valueRange}`, i);
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
            this.handelValidate("error", `取值范围${lists[i].valueRange}`, i);
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
            this.handelValidate("error", `取值范围${lists[i].valueRange}`, i);
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
        let condition = this.evalWrap(lists[i].condition, i);
        if (condition) {
          this.handelValidate("success", "", i);
          this.conditionError = false;
        } else {
          this.setFocus(this.allItems[i]);
          // this.handelValidate("error", lists[i].conditionError, i);
          this.conditionError = true;
        }
      } else {
        this.handelValidate("success", "", i);
        this.conditionError = false;
      }
    },
    // 字段交易
    remoteValidate(i) {
      // debugger
      if (this.singleError || this.rangeError || this.conditionError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].isRemote) {
        let flag = this.evalWrap(lists[i].isRemote);
        if (!flag) {
          return;
        }
        let url = lists[i].url;
        let primitiveData = this.evalWrap(lists[i].data);
        let nowModel = lists[i].model;
        let nowData = this.models[nowModel];
        let postData;
        if (primitiveData != undefined && primitiveData != "") {
          postData = primitiveData;
        } else {
          postData = nowData;
        }
        let success = lists[i].success;
        getTrade(url, {
          body: postData,
          header: {
            pageIndex: 1,
            pageSize: 1,
            gloSeqNo: new Date(),
            reqSeqNo: "sit anim",
            reqTime: "officia ad anim",
          },
        })
          .then((res) => {
            console.log(res);
            if (res.header.rspCode == RES_OK) {
              let tempFunc = eval("(" + success + ")");
              tempFunc(this.models, res.body);
              this.handelValidate("success", "", i);
              // this.searchTable(res.body);
              // this.trade = true;
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
    // 表格查询
    searchTable(data) {
      getTableList({
        body: {
          listCode: data.tabCode,
        },
        header: {
          gloSeqNo: 1594800028104,
          pageIndex: 0,
          pageSize: 999,
          projectId: "quis consectetur",
          reqSeqNo: "1",
          reqTime: "1",
          serviceGroupid: "mollit sed",
          serviceId: "officia non",
          serviceName: "1",
          subProjectId: "occaecat tempor dolor enim ex",
        },
      })
        .then((res) => {
          console.log(JSON.parse(res.body.define.records[0].listContent));
          let temp = JSON.parse(res.body.define.records[0].listContent);
          temp.list[0].options.tableData.forEach((element, index) => {
            element.tradata = data.data[index];
          });
          this.gridData = temp;
          console.log(this.gridData);
        })
        .catch((error) => {
          console.log(error);
        });
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
        console.log("离开赋值", lists[j].assignment);
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
            console.log("获取节点", this.outMark, i, this.allItems[i]);
            this.outMark = i;
            this.preIndex = this.outMark;
            break;
          }
        }
      }
    },
    // 获取页面显示的元素的长度
    getShowLength() {
      this.canFocusLength = 0;
      for (let i = this.comArr.length - 1; i >= 0; i--) {
        if (
          this.comArr[i].options.disabled ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == "readonly"
        ) {
          continue;
        } else {
          if (this.canFocusType.indexOf(this.comArr[i].type) != -1) {
            this.canFocusLength = i;
            break;
          }
        }
      }
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
        console.log(
          "执行一次校验后",
          this.singleError,
          this.rangeError,
          this.conditionError,
          this.remoteError
        );
        if (
          this.singleError ||
          this.rangeError ||
          this.conditionError ||
          this.remoteError
        ) {
          this.outMark = i;
        }
      }
      console.log("执行一次校验后outmark值", this.outMark);
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
        : ele.querySelector("textarea")
        ? ele.querySelector("textarea")
        : ele.querySelector(".el-form-item__content>button");
      let type = focusEle.getAttribute("type");
      console.log("当前聚焦元素", focusEle);
      this.$nextTick(() => {
        if (type == "radio") {
          focusEle.parentNode.parentNode.focus();
        } else {
          focusEle.focus();
        }
      });
    },
    // 使组件失去焦点
    setBlur(ele) {
      let blurEle = ele.querySelector("input")
        ? ele.querySelector("input")
        : ele.querySelector("textarea")
        ? ele.querySelector("textarea")
        : ele.querySelector(".el-form-item__content>button");
      console.log("当前失焦元素", blurEle);
      this.$nextTick(() => {
        blurEle.blur();
      });
    },
    // 回车事件
    onElChange(params) {
      if (this.outMark < this.canFocusLength) {
        if (params == "select") {
          this.blurByEnter = true;
          this.allValidate(this.outMark);
          this.handelAssignment(this.outMark);
        } else {
          this.blurByEnter = false;
          this.setBlur(this.allItems[this.outMark]);
        }
        this.handelFlow();
      } else if (this.outMark == this.canFocusLength) {
        this.allValidate(this.outMark);
        this.handelAssignment(this.outMark);
        if (
          this.singleError ||
          this.rangeError ||
          this.conditionError ||
          this.remoteError
        ) {
          return;
        }
        this.handelHidden();
        this.getShowLength();
        this.enterCheck();
        this.iteratorAllEle();
      }
    },
    // radio change事件
    radioChange(params) {
      this.mouseValidate(params);
      this.allValidate(this.outMark);
      this.handelAssignment(this.outMark);
      this.handelHidden();
      this.getShowLength();
      this.enterCheck();
    },
    // 发送remote方法
    pushRemoteFunc() {
      this.comArr.forEach((item) => {
        if (item.options.remoteFunc) {
          let result = this.evalWrap(item.options.remoteFunc);
          let resultArr;
          result.forEach((resitem) => {
            let tempJson = {
              value: "",
              label: "",
            };
            tempJson.label = resitem.itemValue;
            tempJson.value = resitem.itemCode;
            resultArr.push(tempJson);
          });
          item.options.options = resultArr;
        }
      });
    },
    // 获取组件数据
    tranData(target) {
      target.list.forEach((item) => {
        if (item.type === "grid") {
          item.columns.forEach((cloItem) => {
            // this.tranData(cloItem)
            this.comArr = [...this.comArr, ...cloItem.list];
          });
        } else {
          this.comArr = [...this.comArr, item];
        }
      });
      console.log("获取组件数据", this.comArr);
    },
    // 解析扩展函数
    solveCommonJS(JsCode) {
      try {
        return eval(JsCode);
      } catch (error) {
        console.log("===commonJs===", JsCode);
        throw new Error(error);
      }
    },
    // 挂载扩展函数
    mountExtendJS() {
      this.utils = this.solveCommonJS(this.data.extendDetail);
      console.log(this.utils);
    },
    // 判断页面是否有聚焦元素
    hasFocusItem() {
      let activeElement = document.activeElement.tagName;
      console.log(activeElement);
      if (activeElement && activeElement != "BODY") {
        return true;
      } else {
        return false;
      }
    },
    // F键复位函数
    resetCursor() {
      this.$nextTick(()=>{
        document.addEventListener("keyup", (e) => {
          if (!this.hasFocusItem()) {
            console.log(e.keyCode)
            if (e.keyCode === 70) {
              let preEle = this.allItems[this.outMark];
              this.setFocus(preEle);
            }
          }
        });
      })

    },
  },
  mounted() {
    let inter = setInterval(() => {
      if (this.data.list && this.data.list.length > 0) {
        clearInterval(inter);
        console.log(this.data);
        this.mountExtendJS();
        this.tranData(this.data);
        this.handelHidden();
        this.enterCheck();
        this.getAllItems();
        this.getShowLength();
        this.iteratorAllEle();
        this.resetCursor();
      }
    }, 300);
  },
};
export default handlers;

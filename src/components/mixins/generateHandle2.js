import { RES_OK } from "@/api/config";
import { getTrade, getFormList } from "@/api/forms";
import bus from "@/bus/bus.js";
let handlers = {
  props: {},
  data() {
    return {
      trade: false, //字段交易弹出框
      widgetPreValue: {}, // 组件旧值
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
      for (let i = 0; i < this.comArr.length; i++) {
        if (this.comArr[i].model == params) {
          console.log(i, this.outMark, this.preIndex);
          if (i == this.outMark) {
            return;
          } else {
            this.preIndex = i;
          }
          break;
        }
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
    // 初始化时复制一份models数据
    copyMOdels() {
      Object.assign(this.widgetPreValue, this.models);
    },
    // 组件失去焦点
    blurValidate(params) {
      this.widgetPreValue[params] = this.models[params];
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
      this.allItems = document.querySelectorAll(".generateForm >.el-form-item");
      console.log(this.allItems);
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
          this.outMark = i;
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
            this.outMark = i;
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
            this.outMark = i;
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
            this.outMark = i;
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
          this.outMark = i;
        }
      } else {
        this.handelValidate("success", "", i);
        this.conditionError = false;
      }
    },
    // 字段交易
    remoteValidate(i) {
      console.log(this.models);
      if (this.singleError || this.rangeError || this.conditionError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].isRemote) {
        let flag = this.evalWrap(lists[i].isRemote);
        if (!flag) {
          if (this.outMark == i) {
            this.handelAssignment(i);
            this.handelFlow();
          }
          return;
        }
        let url = lists[i].url;
        let postData = this.evalWrap(lists[i].data);
        let tableKey = lists[i].tableKey; //表格表单标识
        let tableModel = lists[i].tableModel;
        let tableCode = lists[i].tableCode;
        let success = lists[i].success;
        localStorage.setItem("removeFunc", success);
        let tempFunc = eval("(" + success + ")");
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
            if (res.rspCode == RES_OK) {
              this.handelValidate("success", "", i);
              // let tableData = res[tableKey];  //根据配置的数据标识获取表格数据
              let tableData = res.voucherList; //根据配置的数据标识获取表格数据
              console.log(tableData);
              this.$nextTick(() => {
                if (this.checkOutModel(tableModel)) {
                  //如果存在目标表格执行出口数据转换
                  tempFunc(this.models, res, utils);
                  this.$refs[tableModel][0].$refs.generateTable.setData(
                    val[this.widget.model]
                  );
                } else {
                  this.searchTable(tableKey, tableData); //不存在目标表格发起查询表格请求
                }
              });
              this.remoteError = false;
            } else {
              this.setFocus(this.allItems[i]);
              this.$notify.error({
                title: "错误",
                message: res.rspMsg,
              });
              // this.handelValidate("error", res.rspMsg, i);
              this.remoteError = true;
              this.outMark = i;
            }
          })
          .catch((error) => {
            console.log(error);
            this.setFocus(this.allItems[i]);
            this.$notify.error({
              title: "错误",
              message: error.rspMsg,
            });
            // this.handelValidate("error", res.rspMsg, i);
            this.remoteError = true;
            this.outMark = i;
          });
      } else {
        this.handelValidate("success", "", i);
        this.remoteError = false;
        if (this.outMark == i) {
          this.handelAssignment(i);
          this.handelFlow();
        }
      }
    },
    // 表格查询
    searchTable(code, table) {
      debugger;
      let tableData = table;
      let self = this;
      getFormList("", {
        formCode: code,
        pageIndex: "1",
      })
        .then((res) => {
          console.log(res);
          if (res.rspCode === RES_OK) {
            this.$notify({
              message: "查询成功",
              type: "success",
            });
            self.trade = true;
            let temp = JSON.parse(res.define.records[0].formContent);
            this.gridData = temp;
            this.$nextTick(() => {
              this.$refs.grid.setTableData(temp.list[0].key, tableData);
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: res.rspMsg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notify.error({
            message: "网络错误",
          });
        });
    },
    // 根据model值判断当前表单是否有目标表格组件
    checkOutModel(model) {
      // let reg = /(?<=models\.)[^]*(?==)/;
      // let model = target.match(reg)[0];
      // console.log(model);
      // let result = model.trim();
      // let tempFunc = eval("(" + target + ")");
      if (Object.keys(this.models).indexOf(model) == "-1") {
        return false;
      } else {
        return true;
      }
    },
    // 双击表格获取当前行数据
    getRowData(row) {
      let rowData = row; //点击行数据
      let removeFunc = localStorage.getItem("removeFunc");
      let tempFunc = eval("(" + removeFunc + ")");
      console.log(tempFunc, rowData);
      tempFunc(this.$parent.$parent.models, rowData);
    },
    // 表格弹出框关闭后执行光标定位
    goFlow() {
      this.handelAssignment(this.outMark);
      this.handelFlow();
      localStorage.removeItem("removeFunc");
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
      console.log(target);
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
      if (!ele) return;
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
    // 回车事件
    onElChange(params, out) {
      console.log(params, out);
      if (this.preIndex && this.widgetPreValue[params] == this.models[params]) {
        return;
      }
      if (this.outMark < this.canFocusLength) {
        this.allValidate(this.outMark);
      } else if (this.outMark == this.canFocusLength) {
        this.allValidate(this.outMark);
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
        this.$emit("isEnd", true);
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
      if (activeElement && activeElement != "BODY") {
        return true;
      } else {
        return false;
      }
    },
    // F键复位函数
    resetCursor() {
      this.$nextTick(() => {
        document.addEventListener("keyup", (e) => {
          if (!this.hasFocusItem()) {
            console.log(e.keyCode);
            if (e.keyCode === 70) {
              let preEle = this.allItems[this.outMark];
              this.setFocus(preEle);
            }
          }
        });
      });
    },
    // arrow回调事件
    arrowListener() {
      console.log(this.comArr[this.outMark]);
      if (
        this.comArr[this.outMark].type == "radio" ||
        this.comArr[this.outMark].type == "checkbox"
      ) {
        window.removeEventListener("keyup", this.arrowListener);
        return;
      } else {
        if (window.event.ctrlKey && window.event.keyCode === 37) {
          for (let i = this.outMark - 1; i >= 0; i--) {
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
                break;
              }
            }
          }
        } else if (window.event.ctrlKey && window.event.keyCode === 39) {
          for (let i = this.outMark + 1; i < this.comArr.length; i++) {
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
                break;
              }
            }
          }
        }
      }
    },
    // 上下键操作光标
    handelCursorByArrow() {
      window.addEventListener("keyup", this.arrowListener);
    },
    // 监听item组件发射的remove事件
    removeKeyup(params) {
      if (params) {
        window.removeEventListener("keyup", this.arrowListener);
      } else {
        window.addEventListener("keyup", this.arrowListener);
      }
    },
  },
  mounted() {
    let inter = setInterval(() => {
      if (this.data.list && this.data.list.length > 0) {
        clearInterval(inter);
        this.mountExtendJS();
        this.tranData(this.data);
        this.handelHidden();
        this.enterCheck();
        this.getAllItems();
        this.getShowLength();
        this.iteratorAllEle();
        this.resetCursor();
        this.copyMOdels();
        this.handelCursorByArrow();
      }
    }, 300);
  },
};
export default handlers;

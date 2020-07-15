import request from "../util/request";
import { RES_OK } from "@/api/config";
let handlers = {
  props: {},
  data() {
    return {
      trade: false, //字段交易弹出框
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
      ],
    };
  },
  methods: {
    // 鼠标点击获取焦点验证
    mouseValidate(params) {
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
      if (
        !this.singleError &&
        !this.rangeError &&
        !this.conditionError &&
        !this.remoteError
      ) {
        this.outMark = this.preIndex;
      }
    },
    // 光标失去焦点
    blurValidate() {
      return new Promise(
        (resolve) => {
          if (this.preIndex != this.outMark) {
            this.allValidate(this.preIndex);
            this.outMark = this.preIndex;
            return;
          }
          if (this.outMark <= this.canFocusLength) {
            this.allValidate(this.outMark);
            this.handelAssignment(this.outMark);
          }
          resolve();
        },
        (reject) => {
          reject();
        }
      );
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
        // console.log("组件单独校验", valid, lists[i].model);
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
    evalWrap(targetEval) {
      if (!targetEval) {
        return;
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
    // 字段交易
    remoteValidate(i) {
      if (this.singleError || this.rangeError || this.conditionError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].isRemote) {
        let flag = this.evalWrap(lists[i].isRemote);
        if (!flag) {
          return;
        }
        let url = "/dev-api" + lists[i].url;
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
        request
          .post(url, {
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
              tempFunc(this.models, res);
              this.handelValidate("success", "", i);
              this.searchTable(res.body);
              this.trade = true;
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
      request
        .post("/dev-api/tableDevelop/listManage/queryAllDefine", {
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
          let temp =JSON.parse(res.body.define.records[0].listContent)
          temp.list[0].options.tableData.forEach((element,index) => {
            element.tradata = data.data[index]
          });
          this.gridData = temp
          console.log(this.gridData)
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
      console.log(this.canFocusLength);
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
          this.outMark = i;
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
        : ele.querySelector("textarea");
      console.log("当前失焦元素", blurEle);
      this.$nextTick(() => {
        blurEle.blur();
      });
    },
    // 回车事件
    onElChange() {
      console.log(this.outMark, this.canFocusLength);
      if (this.outMark < this.canFocusLength) {
        this.setBlur(this.allItems[this.outMark]);
        this.blurValidate().then(() => {
          this.handelFlow();
        });
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
  },
  mounted() {
    let inter = setInterval(() => {
      if (this.data.list && this.data.list.length > 0) {
        clearInterval(inter);
        console.log(this.data);
        this.tranData(this.data);
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

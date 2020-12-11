import { RES_OK } from '@/api/config';
import { getTrade, getFormList } from '@/api/forms';
import storage from 'good-storage';

const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

let handlers = {
  props: {},
  data() {
    return {
      Rank_BTNS: [], // 操作按钮列表
      btnFocusIndex: 0, // 命中操作按钮的索引值
      validateStatu: '', //校验函数状态（success or error）
      trade: false, //字段交易弹出框
      widgetPreValue: {}, // 组件旧值
      comArr: [], //组件list数组
      outMark: 0, //外层循环标记
      allItems: [],
      allTrs: [], //弹出表格全部tr节点
      btnLists: [], //流控引擎按钮节点
      unfocus: [],
      cancelNext: false,
      canFocusLength: 0,
      singleError: false,
      rangeError: false,
      conditionError: false,
      remoteError: false,
      canFocusArr: [],
      utils: {}, //扩展函数
      canFocusType: [
        'input',
        'textarea',
        'checkbox',
        'radio',
        'date',
        'time',
        'number',
        'password',
        'againpassword',
        'amount',
        'singletext',
        'select',
        'idencard',
        'readcard',
        'camera',
        'buttonCom',
        'taglable',
      ],
    };
  },
  methods: {
    // 组件获取焦点
    mouseValidate(params, type) {
      //
      for (let i = 0; i < this.comArr.length; i++) {
        if (this.comArr[i].model == params) {
          console.log(i, this.outMark);
          if (i == this.outMark) {
            return;
          } else {
            this.outMark = i;
          }
          break;
        }
      }
      this.allValidate(this.outMark - 1);
    },
    // 初始化时复制一份models数据
    copyMOdels() {
      Object.assign(this.widgetPreValue, this.models);
      for (const key in this.widgetPreValue) {
        if (this.widgetPreValue.hasOwnProperty(key)) {
          const element = this.widgetPreValue[key];
          if (element) {
            this.widgetPreValue[key] = '';
          }
        }
      }
      console.log(this.widgetPreValue);
    },
    // 组件失去焦点
    blurValidate(params) {
      this.widgetPreValue[params] = this.models[params];
    },
    // 日期组件失去焦点
    dateValidata() {
      this.allValidate(this.outMark);
      this.handelAssignment(this.outMark);
      this.cancelNext = true;
      this.handelFlow();
      this.handelCursorByArrow();
    },
    // 隐藏
    handelHidden() {
      this.comArr.forEach(item => {
        if (item.hidden) {
          let flag = this.evalWrap(item.hidden);
          console.log(flag);
          if (flag === false) {
            item.options.hidden = false;
          } else if (flag) {
            item.options.hidden = true;
            this.models[item.model] = '';
          }
        }
      });
    },
    // 获取全部item节点
    getAllItems() {
      let generate;
      if (localStorage.getItem('oldMark')) {
        generate = document.querySelector('.tableConfig');
      } else {
        generate = document.querySelector('.form-wrap .generateForm')
          ? document.querySelector('.form-wrap .generateForm')
          : document.querySelector('.el-dialog .generateForm');
      }
      this.allItems = generate && generate.getElementsByClassName('targetEle');
      console.log(generate, this.allItems);
    },
    // 获取流控按钮节点
    getFlowNotes() {
      if (!localStorage.getItem('oldMark')) {
        this.btnLists = document.querySelectorAll('#flowButtons button');
      }
      console.log(this.btnLists);
    },
    // 获取表格全部tr
    getAllPoupTr() {
      let generate = document.querySelector('.tableForm');
      if (generate) {
        this.allTrs = generate.getElementsByClassName('el-table__row');
        if (this.allTrs.length === 0) {
          return;
        }
        let mark = 0;
        let trLength = this.allTrs.length - 1;
        this.allTrs[mark].classList.add('tr-bg');
        this.$nextTick(() => {
          document.addEventListener('keyup', () => {
            if (this.allTrs.length) {
              if (window.event.keyCode === 40) {
                if (mark >= trLength) {
                  return;
                }
                this.allTrs[mark].classList.remove('tr-bg');
                mark++;
                this.allTrs[mark].classList.add('tr-bg');
              } else if (window.event.keyCode === 38) {
                if (mark <= 0) {
                  return;
                }
                this.allTrs[mark].classList.remove('tr-bg');
                mark--;
                this.allTrs[mark].classList.add('tr-bg');
              } else if (window.event.keyCode === 13) {
                let rowData =
                  this.$parent.$parent.gridData &&
                  this.$parent.$parent.gridData.list[0].configdata.list[0]
                    .options.tableData[mark];
                console.log(this.$parent.$parent.gridData.list[0]);
                this.getRowData(rowData);
              }
            }
          });
        });
      }
      console.log(this.allTrs);
    },
    // 表格配置项弹出后接管流程控制
    toggleGenerate(rowData) {
      localStorage.setItem('oldMark', this.outMark);
    },
    // 表格配置项弹窗关闭
    closeDialog() {
      let oldMark = localStorage.getItem('oldMark')
        ? localStorage.getItem('oldMark')
        : 0;
      this.setFocus(this.allItems[oldMark]);
      localStorage.getItem('oldMark') && localStorage.removeItem('oldMark');
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
          this.$refs['generateForm'].fields[index],
          'validateState',
          statu
        );
        if (statu == 'error') {
          this.$refs['generateForm'].fields[index].validateMessage = msg;
        }
      });
      this.validateStatu = statu;
    },
    // 转换金额域
    changeAmount() {
      let type = this.comArr[this.outMark].type;
      let model = this.comArr[this.outMark].model;
      if (type == 'amount') {
        this.models[model] = this.models[model].replace(/,/gi, '');
      }
    },
    // 将models字符串数值转为数值
    changeStringToNumber() {
      this.changeAmount();
      this.comArr.forEach(element => {
        if (
          element.type != 'radio' &&
          element.type != 'checkbox' &&
          element.type != 'select' &&
          element.type != 'cascader'
        ) {
          let model = element.model;
          let item = this.models[model];
          if (typeof item == 'string' && item && item == Number(item)) {
            if (item[0] != '0') {
              this.models[model] = Number(item);
            }
          }
        }
      });
      console.log(this.models);
    },
    // eval封装
    evalWrap(targetEval, i) {
      if (!targetEval || typeof targetEval != 'string') {
        return;
      }
      let result;
      if (targetEval.indexOf('function') != -1) {
        try {
          let tempFunc = eval('(' + targetEval + ')');
          result = tempFunc(this.models, this.utils, this.handelValidate, i);
          console.log(tempFunc, result);
        } catch (error) {
          throw new Error(error);
        }
      } else if (
        targetEval.indexOf('function') == -1 &&
        targetEval.indexOf('if') != -1
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
      this.$refs['generateForm'].validateField(lists[i].model, valid => {
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
      if (lists[i].valueRange != '' && lists[i].valueRange != undefined) {
        let range = lists[i].valueRange;
        let nowValue = this.models[lists[i].model];
        let result, resultType;
        try {
          result = this.evalWrap(range);
          resultType = Object.prototype.toString.call(result);
        } catch (error) {
          this.handelValidate('error', '语法错误', i);
          throw new Error(error, '取值范围条件解析出错');
        }
        if (resultType == '[object Array]') {
          if (result.indexOf(nowValue) == -1) {
            this.handelValidate('error', `取值范围${lists[i].valueRange}`, i);
            this.setFocus(this.allItems[i]);
            this.rangeError = true;
            this.outMark = i;
          } else {
            this.handelValidate('success', '', i);
            this.rangeError = false;
          }
        } else if (resultType == '[object RegExp]') {
          if (result.test(nowValue)) {
            this.handelValidate('success', '', i);
            this.rangeError = false;
          } else {
            this.setFocus(this.allItems[i]);
            this.handelValidate('error', `取值范围${lists[i].valueRange}`, i);
            this.rangeError = true;
            this.outMark = i;
          }
        } else if (
          resultType == '[object String]' ||
          resultType == '[object Number]'
        ) {
          let resultReg = new RegExp('[' + range + ']');
          if (resultReg.test(nowValue)) {
            this.handelValidate('success', '', i);
            this.rangeError = false;
          } else {
            this.setFocus(this.allItems[i]);
            this.handelValidate('error', `取值范围${lists[i].valueRange}`, i);
            this.rangeError = true;
            this.outMark = i;
          }
        }
      } else {
        this.handelValidate('success', '', i);
        this.rangeError = false;
      }
    },
    // 离开条件检测
    handelCondition(i) {
      if (this.singleError || this.rangeError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].condition && lists[i].condition != '') {
        let condition = this.evalWrap(lists[i].condition, i);
        if (condition) {
          this.handelValidate('success', '', i);
          this.conditionError = false;
        } else {
          this.setFocus(this.allItems[i]);
          if (this.validateStatu !== 'error') {
            this.handelValidate('error', '输入值不满足离开规则', i);
          }
          this.conditionError = true;
          this.outMark = i;
        }
      } else {
        this.handelValidate('success', '', i);
        this.conditionError = false;
      }
    },
    // 字段交易
    remoteValidate(i) {
      // ;
      if (this.singleError || this.rangeError || this.conditionError) {
        return;
      }
      let lists = this.comArr;
      if (lists[i].multiToggle) {
        let multiCondition = eval('(' + lists[i].multiCondition + ')');
        multiCondition(this.models, this.utils, getTrade);
        this.handelAssignment(i);
        this.handelFlow();
      } else {
        if (!lists[i].isRemote) {
          //兼容旧版本
          this.remoteError = false;
          return;
        }
        let start = eval('(' + lists[i].isRemote + ')');
        let startFlag = start(this.models, this.utils);
        if (startFlag) {
          let url = lists[i].url;
          let postData = this.evalWrap(lists[i].data);
          let tableKey = lists[i].tableKey; //表格表单标识
          // let tableModel = lists[i].tableModel;
          //let tableCode = lists[i].tableCode; //表格数据标识
          let success = lists[i].success;
          localStorage.setItem('removeFunc', success);
          let tempFunc = eval('(' + success + ')');
          let self = this;
          getTrade(url, {
            body: postData,
            header: {
              pageIndex: 1,
              pageSize: 999,
              gloSeqNo: new Date().getTime(),
              reqSeqNo: new Date().getTime(),
              reqTime: new Date().getTime(),
            },
          })
            .then(res => {
              console.log(res);
              if (res.header.rspCode == RES_OK) {
                self.handelValidate('success', '', i);
                // 判断是否有表格数据，没有执行赋值
                if (!tableKey) {
                  try {
                    let total = 0;
                    if (res.body.define && res.body.define.total) {
                      total = res.body.define.total;
                    }
                    tempFunc(self.models, res, self.utils);
                    self.setDataToTable(total);
                    self.handelAssignment(i);
                    self.handelFlow();
                  } catch (error) {
                    self.handelValidate('error', '出口数据转换出错', i);
                  }
                } else {
                  // let tableData;
                  // tableData = res.body[tableModel]; //根据配置的数据标识获取表格数据
                  // let Key;
                  // for (let i = 0; i < lists.length; i++) {
                  //   if (lists[i].model == tableModel) {
                  //     Key = lists[i].key;
                  //   }
                  // }
                  // console.log(tableData, tableModel, Key);
                  // if (self.checkOutModel(tableModel)) {
                  //   //如果存在目标表格执行出口数据转换
                  //   self.$nextTick(() => {
                  //     self.models[tableModel] = tableData;
                  //     self.setTableData(Key, tableData);
                  //     console.log(self.models);
                  //     try {
                  //       tempFunc(self.models, res, self.utils);
                  //       self.handelAssignment(i);
                  //       self.handelFlow();
                  //     } catch (error) {
                  //       this.handelValidate("error", "出口数据转换出错", i);
                  //     }
                  //   });
                  // } else {
                  tempFunc(self.models, res.body);
                  localStorage.setItem('response', JSON.stringify(res));
                  self.setDataToTable();
                  self.searchTable(tableKey, res); //不存在目标表格发起查询表格请求
                  // }
                }
                self.remoteError = false;
              } else {
                self.setFocus(self.allItems[i]);
                self.$notify.error({
                  title: '错误',
                  message: res.rspMsg,
                });
                this.handelValidate('error', res.rspMsg, i);
                self.remoteError = true;
                self.outMark = i;
              }
            })
            .catch(error => {
              console.log(error);
              self.setFocus(self.allItems[i]);
              self.$notify.error({
                title: '错误',
                message: error.rspMsg,
              });
              this.handelValidate('error', error.rspMsg, i);
              self.remoteError = true;
              self.outMark = i;
            });
        } else {
          this.handelValidate('success', '', i);
          this.remoteError = false;
          this.handelAssignment(i);
          this.handelFlow();
        }
      }
    },
    // 表格赋值
    setDataToTable(total) {
      this.$nextTick(() => {
        for (let m = 0; m < this.comArr.length; m++) {
          if (this.comArr[m].type === 'elTable') {
            if (
              Array.isArray(this.models[this.comArr[m].model]) &&
              this.models[this.comArr[m].model].length > 0
            ) {
              let pageSize = this.comArr[m].options.pagination.pageSize;
              let tableData = this.models[this.comArr[m].model].slice(
                0,
                pageSize
              );
              this.comArr[m].configdata.list[0].options.tableData = tableData;
              this.comArr[m].options.pagination.total = total;
            }
          }
        }
      });
    },
    // 表格设置数据函数
    setTableData(key, data) {
      // ;
      if (key) {
        this.data.list.map(t => {
          if (t.model == model) {
            if (this.data.list) {
              t.configdata.list[0].options.tableData = data;
            }
          }
        });
      }
      // if (data instanceof Array) {
      //   if (
      //     this.data &&
      //     this.data.list[0] &&
      //     this.data.list[0].configdata.list[0].options.tableData
      //   ) {
      //     this.data.list[0].configdata.list[0].options.tableData = data;
      //   }
      // }
    },
    // 表格查询
    searchTable(code, tradData) {
      // ;
      // let tableData = table;
      let self = this;
      getFormList({
        formCode: code,
        pageIndex: '1',
      })
        .then(res => {
          console.log(res);
          if (res.header.rspCode === RES_OK) {
            self.$notify({
              message: '查询成功',
              type: 'success',
            });
            let temp = JSON.parse(res.body.define.records[0].formContent);
            let tableModel = temp.list[0].model;
            localStorage.setItem('model', tableModel);
            let tableData = tradData.body[tableModel];
            temp.list[0].configdata.list[0].options.tableData = tableData;
            console.log(temp);
            self.gridData = temp;
            self.setBlur(this.allItems[this.outMark]);
            self.trade = true;
          } else {
            self.$notify.error({
              title: '错误',
              message: res.rspMsg,
            });
          }
        })
        .catch(error => {
          console.log(error);
          self.$notify.error({
            message: '网络错误',
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
      if (Object.keys(this.models).indexOf(model) == '-1') {
        return false;
      } else {
        return true;
      }
    },
    // 双击表格获取当前行数据
    getRowData(row) {
      let rowData = row; //点击行数据
      let removeFunc = localStorage.getItem('removeFunc');
      let tempFunc = eval('(' + removeFunc + ')');
      console.log(tempFunc, rowData);
      let model = localStorage.getItem('model');
      let res = JSON.parse(localStorage.getItem('response'));
      res.body[model] = row;
      try {
        tempFunc(this.$parent.$parent.models, res.body);
        this.$parent.$parent.trade = false;
        this.$parent.$parent.gridData = null;
      } catch (error) {
        this.$parent.$parent.handelValidate(
          'error',
          '出口数据转换出错',
          this.$parent.$parent.outMark
        );
        this.setFocus(this.allItems[this.outMark]);
        this.remoteError = true;
      }
    },
    // 表格弹出框关闭后执行光标定位
    goFlow() {
      if (this.remoteError) {
        return;
      }
      this.handelAssignment(this.outMark);
      this.handelFlow();
      localStorage.removeItem('removeFunc');
      localStorage.removeItem('model');
      localStorage.removeItem('response');
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
      if (lists[j].assignment && lists[j].assignment != '') {
        console.log('离开赋值', lists[j].assignment);
        this.evalWrap(lists[j].assignment);
        this.$nextTick(() => {
          this.precisionHandel();
        });
      }
    },
    // 对数字组件值做精度修正
    precisionHandel() {
      this.comArr.forEach(element => {
        if (
          element.type == 'amount' ||
          (element.options && element.options.dataType == 'integer')
        ) {
          let model = element.model;
          let item = this.models[model];
          let decimal = element.options.decimal
            ? element.options.decimal
            : element.options.decimalbits;
          if (item && String(item).indexOf('.') != -1) {
            let strItem = String(item);
            if (strItem.length - strItem.indexOf('.') > 3) {
              let delIndex = String(item).indexOf('.') + decimal + 1;
              let result = strItem.substring(0, delIndex);
              this.models[model] = result;
            }
          }
        }
      });
    },
    // 进入条件检测
    enterCheck() {
      let lists = this.comArr;
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].enterCondition && lists[i].enterCondition != '') {
          let condition = this.evalWrap(lists[i].enterCondition);
          if (condition) {
            lists[i].options.disabled = false;
          } else if (condition === false) {
            lists[i].options.disabled = true;
          }
        }
      }
    },
    // 全部节点循环事件
    iteratorAllEle() {
      let hasFocus = false;
      for (let i = this.outMark; i < this.comArr.length; i++) {
        if (
          this.comArr[i].options.disabled ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == 'readonly'
        ) {
          continue;
        } else {
          if (this.canFocusType.indexOf(this.comArr[i].type) != -1) {
            this.setFocus(this.allItems[i]);
            console.log('获取节点', this.outMark, i, this.allItems[i]);
            this.outMark = i;
            hasFocus = true;
            break;
          }
        }
      }
      if (!hasFocus) {
        // 如果页面没有可聚焦元素
        if (document.getElementById('flowButtons')) {
          this.btnsAddEvents();
          this.filterFirstBtnIndex();
          this.focusCurrentBtn();
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
          this.comArr[i].options.readonly == 'readonly'
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
        console.log('综合校验综合校验综合校验综合校验', this.comArr);
        if (
          (this.comArr[i].options && this.comArr[i].options.disabled) ||
          this.comArr[i].options.hidden ||
          this.comArr[i].options.readonly == 'readonly'
        ) {
          continue;
        }
        this.singleValidate(i);
        this.handelRange(i);
        this.handelCondition(i);
        // this.remoteValidate(i);
        if (
          this.singleError ||
          this.rangeError ||
          this.conditionError ||
          this.remoteError
        ) {
          break;
        }
      }
      // this.remoteValidate(this.outMark);
      console.log('执行一次校验后outmark值', this.outMark);
    },
    // 循环过去的节点
    iteratorUnfocus() {
      for (let i = 0; i < this.outMark; i++) {
        if (
          !this.unfocus[i].options.disabled &&
          !this.unfocus[i].options.hidden &&
          this.unfocus[i].options.readonly !== 'readonly'
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
      let focusEle = ele.querySelector('input')
        ? ele.querySelector('input')
        : ele.querySelector('textarea')
        ? ele.querySelector('textarea')
        : ele.querySelector('.el-form-item__content>button');
      let type;
      if (!focusEle) return;
      if (focusEle.tagName === 'INPUT' && focusEle.hasAttribute('type')) {
        type = focusEle.getAttribute('type');
      }
      console.log('当前聚焦元素', focusEle);
      this.$nextTick(() => {
        if (type == 'radio') {
          if (this.models[this.comArr[this.outMark].model]) {
            let allRadio = ele.querySelectorAll('input');
            for (
              let i = 0;
              i < this.comArr[this.outMark].options.options.length;
              i++
            ) {
              if (
                this.comArr[this.outMark].options.options[i].value ===
                this.models[this.comArr[this.outMark].model]
              ) {
                allRadio[i].parentNode.parentNode.focus();
              }
            }
            return;
          } else {
            this.models[this.comArr[this.outMark].model] = this.comArr[
              this.outMark
            ].options.options[0].value;
            focusEle.parentNode.parentNode.focus();
          }
        } else {
          focusEle.focus();
        }
      });
    },
    // 失去焦点
    setBlur(ele) {
      let blurEle = ele.querySelector('input')
        ? ele.querySelector('input')
        : ele.querySelector('textarea')
        ? ele.querySelector('textarea')
        : ele.querySelector('.el-form-item__content>button');
      console.log('当前失焦元素', blurEle);
      this.$nextTick(() => {
        blurEle.blur();
      });
    },
    // 回车事件
    onElChange(params) {
      this.changeAmount();
      if (this.cancelNext) {
        this.cancelNext = false;
        return;
      }
      if (this.outMark < this.canFocusLength) {
        if (
          this.widgetPreValue[params] &&
          this.models[params] &&
          this.widgetPreValue[params] == this.models[params]
        ) {
          this.handelFlow();
          return;
        }
        this.allValidate(this.outMark);
        this.remoteValidate(this.outMark);
      } else if (this.outMark == this.canFocusLength) {
        this.allValidate(this.outMark);
        this.remoteValidate(this.outMark);
        this.setBlur(this.allItems[this.outMark]);
        // this.$emit("isEnd", true);
        // 如果最后一个节点校验不通过焦点不能移交给控制按钮
        if (
          !this.singleError &&
          !this.rangeError &&
          !this.conditionError &&
          !this.remoteError
        ) {
          if (document.getElementById('flowButtons')) {
            this.btnsAddEvents();
            this.filterFirstBtnIndex();
            this.focusCurrentBtn();
          }
        }
      }
    },
    filterFirstBtnIndex() {
      const index = this.Rank_BTNS.findIndex(item => {
        return item == 'submit';
      });
      this.btnFocusIndex = index;
    },

    calls(e) {
      let e1 = e || event || window.event; // || arguments.callee.caller.arguments[0];
      console.log('e1.keyCode', e1.keyCode);
      const key = e1.keyCode;
      this.calBtnIndex(key);
      this.focusCurrentBtn();
    },
    btnsAddEvents() {
      const $flowButtons = document.getElementById('flowButtons');
      $flowButtons.removeEventListener('keyup', this.calls);
      $flowButtons.addEventListener('keyup', this.calls);
    },

    focusCurrentBtn() {
      // this.btnLists[this.btnFocusIndex].focus();
      this.btnLists.forEach((btn, index) => {
        if (index == this.btnFocusIndex) {
          btn.className = 'el-button el-button--primary el-button--small';
          btn.focus();
        } else {
          btn.className = 'el-button el-button--default el-button--small';
        }
      });
    },

    calBtnIndex(keyCode) {
      if (keyCode == KEY_LEFT || keyCode == KEY_RIGHT) {
        let btnsLength = this.Rank_BTNS.length - 1;
        if (keyCode == KEY_LEFT) {
          --this.btnFocusIndex;
          if (this.btnFocusIndex < 0) this.btnFocusIndex = 0;
        } else {
          ++this.btnFocusIndex;
          if (this.btnFocusIndex > btnsLength) this.btnFocusIndex = btnsLength;
        }
      }
    },

    // radio change事件
    radioChange(params) {
      this.mouseValidate(params);
      // this.allValidate(this.outMark);
      this.handelAssignment(this.outMark);
      this.handelHidden();
      this.getShowLength();
      this.enterCheck();
    },
    // 发送remote方法
    pushRemoteFunc() {
      this.comArr.forEach(item => {
        if (item.options.remote && item.options.remoteFunc) {
          let result = eval('(' + item.options.remoteFunc + ')')(getTrade);
          let resultArr = [];
          let resValue = item.options.props.value;
          let resLabel = item.options.props.label;
          result.forEach(resitem => {
            let tempJson = {
              value: '',
              label: '',
            };
            tempJson.label = resitem[resLabel];
            tempJson.value = resitem[resValue];
            resultArr.push(tempJson);
          });
          item.options.options = resultArr;
        }
      });
    },
    // 获取组件数据
    tranData(target) {
      target.list.forEach(item => {
        if (item.type === 'grid') {
          item.columns.forEach(cloItem => {
            this.tranData(cloItem);
            // this.comArr = [...this.comArr, ...cloItem.list];
          });
        } else {
          this.comArr = [...this.comArr, item];
        }
      });
      console.log('获取组件数据', this.comArr);
    },
    // 解析扩展函数
    solveCommonJS(JsCode) {
      try {
        return eval(JsCode);
      } catch (error) {
        console.log('===commonJs===', JsCode);
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
      if (activeElement && activeElement != 'BODY') {
        return true;
      } else {
        return false;
      }
    },
    // F键复位函数
    resetCursor() {
      this.$nextTick(() => {
        document.addEventListener('keyup', e => {
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
      if (window.event.ctrlKey && window.event.keyCode === 38) {
        for (let i = this.outMark - 1; i >= 0; i--) {
          if (
            this.comArr[i].options.disabled ||
            this.comArr[i].options.hidden ||
            this.comArr[i].options.readonly == 'readonly'
          ) {
            continue;
          } else {
            if (this.canFocusType.indexOf(this.comArr[i].type) != -1) {
              this.setFocus(this.allItems[i]);
              console.log('获取节点', this.outMark, i, this.allItems[i]);
              this.outMark = i;
              break;
            }
          }
        }
      } else if (window.event.ctrlKey && window.event.keyCode === 40) {
        for (let i = this.outMark + 1; i < this.comArr.length; i++) {
          if (
            this.comArr[i].options.disabled ||
            this.comArr[i].options.hidden ||
            this.comArr[i].options.readonly == 'readonly'
          ) {
            continue;
          } else {
            if (this.canFocusType.indexOf(this.comArr[i].type) != -1) {
              this.setFocus(this.allItems[i]);
              console.log('获取节点', this.outMark, i, this.allItems[i]);
              this.outMark = i;
              break;
            }
          }
        }
      }
    },
    // 上下键操作光标
    handelCursorByArrow() {
      let formEle = document.querySelector('.generateForm');
      this.$nextTick(() => {
        formEle.addEventListener('keyup', this.arrowListener);
      });
    },
    // 监听item组件发射的remove事件
    removeKeyup(params) {
      let formEle = document.querySelector('.generateForm');
      if (params) {
        formEle.removeEventListener('keyup', this.arrowListener);
      } else {
        formEle.addEventListener('keyup', this.arrowListener);
      }
    },
    // 设置表单只读
    setFormRead() {
      if (this.data.config.onlyRead || this.readOnly) {
        this.comArr.forEach(item => {
          if (
            typeof item.options.disabled != undefined &&
            item.options.disabled == false
          ) {
            item.options.disabled = true;
          } else if (
            typeof item.options.readonly != undefined &&
            item.options.readonly == false
          ) {
            item.options.readonly = true;
          }
        });
        return;
      } else {
        this.generateHandle();
      }
    },
    // 初始化表单控制
    generateHandle(){
      this.pushRemoteFunc();
      this.handelHidden();
      this.enterCheck();
      this.getAllItems();
      this.getFlowNotes();
      this.getAllPoupTr();
      this.getShowLength();
      this.iteratorAllEle();
      this.resetCursor();
      this.copyMOdels();
      this.handelCursorByArrow();
    }
  },
  mounted() {
    let rankBtns = storage.session.get('Rank_BTNS', '');
    if (rankBtns) {
      this.Rank_BTNS = rankBtns.split('-');
    }
    let inter = setInterval(() => {
      if (this.data.list && this.data.list.length > 0) {
        clearInterval(inter);
        this.mountExtendJS();
        this.tranData(this.data);
        this.setFormRead();
      }
    }, 300);
  },
  destroyed() {
    if (localStorage.getItem('oldMark')) {
      localStorage.removeItem('oldMark');
    } else if (localStorage.getItem('removeFunc')) {
      localStorage.removeItem('removeFunc');
    } else if (localStorage.getItem('model')) {
      localStorage.removeItem('model');
    } else if (localStorage.getItem('response')) {
      localStorage.removeItem('response');
    }
  },
};
export default handlers;

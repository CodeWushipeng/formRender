import { getDic } from '@/api/forms'
import { RES_OK } from '@/api/config'
import {dateFormat} from "../../util";
let itemHandle = {
  data() {
    return {
      spaceType: '',
      xunHuanDanwei: '',
      pingLuConfigPopVisible: false,
      spacePickerOptions: {
        /*disabledDate(time) {
              return time.getTime() < Date.now();
          },*/
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
      xunHuanLiangObj: [
        {
          label: '天',
          value: 'D',
        },
        {
          label: '周',
          value: 'W',
        },
        {
          label: '旬',
          value: 'S',
        },
        {
          label: '月',
          value: 'M',
        },
        {
          label: '季',
          value: 'Q',
        },
        {
          label: '年',
          value: 'Y',
        },
      ],
      xunHuanLiangObj_zhouqi: [
        {
          label: '月',
          value: 'M',
        },
        {
          label: '季',
          value: 'Q',
        },
        {
          label: '年',
          value: 'Y',
        },
      ],
      spaceForm: {
        xunHuanLiang: '',
        qixian_input: '',
        meijitian_number: '',
        gongzuori: '',
        jutiri: '',
        jiyuefen: '',
        jutiri_nian: '',
        riqi_nian: '',
        tianshu: '',
      },
      formDisabled: {
        xunHuanLiang: true,
        meijitian_number: true,
        gongzuori: true,
        jutiri: false,
        jiyuefen: false,
        jutiri_nian: false,
        riqi_nian: false,
        tianshu: false,
      },
      spaceRrules: {
        xunHuanLiang: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        qixian_input: [{ required: true, message: '请输入', trigger: 'blur' }],
        meijitian_number: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        gongzuori: [{ required: true, message: '请选择', trigger: 'change' }],
        jutiri: [{ required: true, message: '请选择', trigger: 'change' }],
        jiyuefen: [{ required: true, message: '请选择', trigger: 'change' }],
        jutiri_nian: [{ required: true, message: '请选择', trigger: 'change' }],
        riqi_nian: [{ required: true, message: '请输入', trigger: 'blur' }],
        tianshu: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      spaceFormLabelWidth: '100px',

      checkIndex: 0,
      selectStatu: false,
      cascaderData: [],
    };
  },
  methods: {
    // 组件聚焦事件获取model
    comFocus() {
      if (
        this.widget.type == 'password' ||
        this.widget.type == 'againpassword'
      ) {
        if (
          this.widget.options.peripheral &&
          this.widget.options.peripheral == true
        ) {
          this.peripheral();
        }
      }
      if (this.widget.type === 'frequency') {
        this.pingLuConfigPopVisible = true;
      }
      if (this.widget.type === 'date' && this.widget.options.editable) {
        // this.dateShow()
      }
      this.$emit('el-focus', this.widget.model, this.widget.type);
    },
    // 组件失去焦点事件
    comBlur() {
      this.$emit('el-blur', this.widget.model, this.widget.type);
    },
    // 日期格式化函数
    dateFormat(year, month, day, format) {
      let mark = format.slice(4, 5);
      let tranDate;
      if (mark === '年') {
        tranDate = year + '年' + month + '月' + day + '日';
      } else {
        tranDate = year + mark + month + mark + day;
      }
      return tranDate;
    },
    // 回车事件
    change() {
      // 如果是可输入的日期组件对输入值做校验
      if (this.widget.type === 'date' && this.widget.options.editable) {
        debugger;
        const originDate = this.$refs[this.widget.model].userInput;
        let year = originDate.slice(0, 4);
        let month = originDate.slice(4, 6);
        let day = originDate.slice(6);
        if (
          originDate.length != 8 ||
          month * 1 > 13 ||
          month * 1 < 1 ||
          day * 1 > 31 ||
          day * 1 < 1
        ) {
          this.$message({
            type: 'error',
            message: '请输入8位数合法日期',
          });
        } else {
          const format = this.widget.options.format;
          this.$nextTick(() => {
            this.dataModel = this.dateFormat(year, month, day, format);
          });
        }
      }
      this.$emit('el-change', this.widget.model, this.widget);
    },
    // radio组件change事件
    valueChange() {
      if (this.widget.type === 'frequency') {
        if (this.frequencyNum && this.frequencyUnit) {
          this.dataModel = this.frequencyNum + this.frequencyUnit;
        } else {
          this.dataModel = '';
        }
      }
      this.$emit('radio-change', this.widget.model);
    },
    // select组件回车抬起事件
    selectChange() {
      //如果是非必填项回车时直接离开
      // if (!this.widget.options.required) {
      //   this.$refs[this.widget.model].blur();
      //   this.$emit("el-change", this.widget.type);
      // } else {
      //   if (this.widget.options.filterable) {
      //     this.$refs[this.widget.model].blur();
      //     this.$emit("el-change", this.widget.type);
      //   } else {
      //
      //     if (this.selectStatu) {
      //       this.$refs[this.widget.model].blur();
      //     } else {
      //       this.$emit("el-change", this.widget.type);
      //     }
      //   }
      // }
      if (this.widget.options.filterable) {
        this.$refs[this.widget.model].blur();
        this.$emit('el-change', this.widget.model, this.widget.type);
      } else {
        if (this.selectStatu) {
          // this.$refs[this.widget.model].blur();
        } else {
          this.$emit('el-change', this.widget.model, this.widget.type);
        }
      }
    },
    // select组件空格事件
    showOptions() {
      if (!this.widget.options.filterable) {
        this.$refs[this.widget.model].toggleMenu();
      }
    },
    // 下拉选择选项显示状态
    optionStatu(params) {
      this.selectStatu = params;
      this.$emit('remove', params);
      if (params) {
        // 下拉选择框用作级联组件处理
        if (this.widget.isCascader) {
          let father = this.widget.fatherModel && this.widget.fatherModel;
          let fatherData = this.models[father];
          let reqData, resFunc;
          try {
            reqData = eval('(' + this.widget.requestData + ')')();
            resFunc = eval('(' + this.widget.requestData + ')');
          } catch (error) {
            throw new Error(error);
          }

          let postData = Object.assign(
            {},
            { itemParentCode: fatherData },
            reqData
          );
          console.log(reqData, postData);
          if (this.widget.cascaderUrl) {
            getDic(this.widget.cascaderUrl, {
              body: postData,
              // header: {
              //   pageIndex: 1,
              //   pageSize: 999,
              //   gloSeqNo: new Date(),
              //   reqSeqNo: 'sit anim',
              //   reqTime: 'officia ad anim',
              // }
              header: {
                antiWeightSeqNo: 'pariatur d',
                gloSeqNo: 'culpa dolor ',
                pageIndex: 2,
                pageSize: 10,
                projectId: 'incididunt',
                reqSeqNo: 'in et',
                reqTime: 'in esse reprehen',
                serviceGroupid: 'eiusmod in magna',
                serviceId: 'cupidatat',
                serviceName: 'esse qui occaecat enim aute',
                subProjectId: 'enim',
                userInfo: {
                  role: [
                    'magna officia pariatur ut ipsum',
                    'labore sit',
                    'adipisicing Ut sunt aliqua',
                    'Ut Duis dolore tempor dolor',
                  ],
                  username: 'in mollit',
                },
              },
            })
              .then(res => {
                console.log(res);
                if (res.header.rspCode == RES_OK) {
                  this.$notify({
                    title: 'Success',
                    message: '查询成功',
                    type: 'success',
                    duration: 2000,
                  });
                } else if (res.header.rspCode == FAIL_CODE) {
                  this.$notify({
                    title: 'fail',
                    message: '查询失败',
                    type: 'info',
                    duration: 2000,
                  });
                  return;
                }

                let cascaderData = JSON.stringify(res.body.options);
                localStorage.setItem('cascaderData', cascaderData);
                let tempArr = res.body.options;
                let resultArr = [];
                tempArr.forEach(item => {
                  let tempJson = {
                    value: '',
                    label: '',
                  };
                  tempJson.label = item.label;
                  tempJson.value = item.value;
                  resultArr.push(tempJson);
                });
                console.log(tempArr, resultArr);
                this.widget.options.options = resultArr;
                try {
                  resFunc(res, this.$parent.utils);
                } catch (error) {
                  throw new Error('级联选择出口数据解析出错');
                }
              })
              .catch(error => console.log(error));
          } else {
            let fatherModel = this.widget.fatherModel;
            let fatherData = this.models[fatherModel];
            let resultArr = [];
            let cascaderData = JSON.parse(localStorage.getItem('cascaderData'));
            let fatherList;
            fatherList = this.getDicFloor(cascaderData, fatherData);
            fatherList.forEach(item => {
              let tempJson = {
                value: '',
                label: '',
              };
              tempJson.label = item.label;
              tempJson.value = item.value;
              resultArr.push(tempJson);
            });
            this.widget.options.options = resultArr;
          }
        }
      }
    },
    // 递归获取当前字典项层级
    getDicFloor(target, search) {
      var result;
      for (let index = 0; index < target.length; index++) {
        if (target[index].value == search || !target[index].children) {
          if (target[index].children) {
            result = target[index].children;
          }
          return result;
        } else {
          return this.getDicFloor(target[index].children, search);
        }
      }
    },
    // date选择器失去焦点事件
    dateBlur() {
      // this.widget.options.editable = false;
      this.$emit('date-blur', this.widget.model, this.widget);
    },
    dateShow() {
      // this.$refs[this.widget.model].handleFocus()
      // this.widget.options.editable = true
    },
    pickShow(params) {
      console.log('pickShowpickShowpickShowpickShowpickShowpickShow', params);
      this.$emit('remove', params);
    },
    // 多选框键盘上下键事件
    checkUp() {
      let name = '.' + this.widget.model + ' input';
      let checks = document.querySelectorAll(name);
      for (let i = this.checkIndex; i >= 0; i--) {
        if (i == 0) {
          return;
        }
        this.checkIndex--;
        checks[this.checkIndex].focus();
        break;
      }
    },
    checkDown() {
      let name = '.' + this.widget.model + ' input';
      let checks = document.querySelectorAll(name);
      for (let i = this.checkIndex; i < checks.length; i++) {
        if (i == checks.length - 1) {
          return;
        }
        this.checkIndex++;
        checks[this.checkIndex].focus();
        break;
      }
    },

    //间隔周期
    spaceTypeFun(val) {
      if (val) {
        this.widget.options.spaceType = val;
        this.pingLuConfigPopVisible = true;
      } else {
        this.widget.options.spaceType = '';
        this.pingLuConfigPopVisible = false;
      }
    },
    showObj(targetList) {
      targetList.forEach(item => {
        this.formDisabled[item] = true;
      });
    },
    displayObj(targetList) {
      targetList.forEach(item => {
        this.spaceForm[item] = '';
        this.formDisabled[item] = false;
      });
    },
    xunHuanLiangChange(event) {
      var _this = this;
      var xunHuanLiangObjTemp = _this.xunHuanLiangObj.find(
        item => item.value === this.spaceForm.xunHuanLiang
      );
      xunHuanLiangObjTemp
        ? (_this.xunHuanDanwei = xunHuanLiangObjTemp.label)
        : '';

      if (this.spaceForm.xunHuanLiang) {
        var xunhuangliang = this.spaceForm.xunHuanLiang;
        if (xunhuangliang == 'D') {
          _this.showObj(['meijitian', 'gongzuori']);
          _this.displayObj(['jutiri', 'jiyuefen', 'jutiri_nian', 'riqi_nian']);
        } else if (xunhuangliang == 'W') {
          _this.showObj(['meijitian', 'gongzuori', 'jutiri']);
          _this.displayObj(['jiyuefen', 'jutiri_nian', 'riqi_nian']);
        } else if (xunhuangliang == 'S') {
          _this.showObj(['meijitian', 'gongzuori', 'jutiri']);
          _this.displayObj(['jiyuefen', 'jutiri_nian', 'riqi_nian']);
        } else if (xunhuangliang == 'M') {
          _this.showObj(['meijitian', 'gongzuori', 'jutiri']);
          _this.displayObj(['jiyuefen', 'jutiri_nian', 'riqi_nian']);
        } else if (xunhuangliang == 'Q') {
          _this.showObj(['meijitian', 'gongzuori', 'jutiri', 'jiyuefen']);
          _this.displayObj(['jutiri_nian', 'riqi_nian']);
        } else if (xunhuangliang == 'Y') {
          _this.showObj(['meijitian', 'gongzuori', 'jutiri_nian']);
          _this.displayObj(['jutiri', 'jiyuefen', 'riqi_nian']);
        }
      }
    },
    jutiriChange() {
      if (this.spaceForm.jutiri == 'D') {
        this.showObj(['tianshu']);
      } else {
        this.displayObj(['tianshu']);
      }
    },
    jutiri_nianChange() {
      if (this.spaceForm.jutiri_nian == 'R') {
        this.showObj(['riqi_nian']);
      } else {
        this.displayObj(['riqi_nian']);
      }
    },
    getXunHuanLiang_zhouqi() {
      var dygx = ['月', '季', '年'];
      var xunHuanLiangs = document.getElementsByName('xunHuanLiang');
      for (var i in xunHuanLiangs) {
        if (xunHuanLiangs[i].checked == true) {
          console.log(xunHuanLiangs[i].value);
          var lableText = (document.getElementById('xunHuanDanwei').innerHTML =
            dygx[i]);
          console.log(lableText);
          this.displayHTML(xunHuanLiangs[i].value);
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var finalValue = '';
          var xunhuangliang = this.spaceForm.xunHuanLiang;
          if (this.widget.options.spaceType == 'qiXianConfigPop') {
            finalValue = this.spaceForm.qixian_input + xunhuangliang;
          } else {
            // 间隔
            finalValue = finalValue + this.spaceForm.meijitian_number;

            if (xunhuangliang == 'D') {
              // 天
              // 循环量
              finalValue = finalValue + 'D';
              // 工作日选项
              finalValue = finalValue + this.spaceForm.gongzuori;
            }
            if (xunhuangliang == 'W') {
              // 周
              // 循环量
              finalValue = finalValue + 'W';
              // 工作日选项
              finalValue = finalValue + this.spaceForm.gongzuori;
              // 具体日
              if (this.spaceForm.jutiri == 'D') {
                // 如果选择具体日为
                // D-天数
                finalValue = finalValue + this.spaceForm.tianshu;
              } else {
                finalValue = finalValue + this.spaceForm.jutiri;
              }
            }
            if (xunhuangliang == 'S') {
              // 旬
              // 循环量
              finalValue = finalValue + 'S';
              // 工作日选项
              finalValue = finalValue + this.spaceForm.gongzuori;
              // 具体日
              if (this.spaceForm.jutiri == 'D') {
                // 如果选择具体日为
                // D-天数
                finalValue = finalValue + this.spaceForm.tianshu;
              } else {
                finalValue = finalValue + this.spaceForm.jutiri;
              }
            }
            if (xunhuangliang == 'M') {
              // 月
              // 循环量
              finalValue = finalValue + 'M';
              // 工作日选项
              finalValue = finalValue + this.spaceForm.gongzuori;
              // 具体日
              if (this.spaceForm.jutiri == 'D') {
                // 如果选择具体日为
                // D-天数
                finalValue = finalValue + this.spaceForm.tianshu;
              } else {
                finalValue = finalValue + this.spaceForm.jutiri;
              }
            }
            if (xunhuangliang == 'Q') {
              // 季
              // 循环量
              finalValue = finalValue + 'Q';
              // 工作日选项
              finalValue = finalValue + this.spaceForm.gongzuori;
              // 具体日
              if (this.spaceForm.jutiri == 'D') {
                // 如果选择具体日为
                // D-天数
                finalValue = finalValue + this.spaceForm.tianshu;
              } else {
                finalValue = finalValue + this.spaceForm.jutiri;
              }
              // 季月份
              finalValue = finalValue + this.spaceForm.jiyuefen;
            }
            if (xunhuangliang == 'Y') {
              // 年
              // 循环量
              finalValue = finalValue + 'Y';
              // 工作日选项
              finalValue = finalValue + this.spaceForm.gongzuori;
              // 具体日
              finalValue = finalValue + this.spaceForm.jutiri_nian;
              // 日期
              var temp = this.spaceForm.riqi_nian;
              temp = temp.replace(/-/g, '');
              finalValue = finalValue + temp;
            }
          }
          this.dataModel = finalValue;
          this.pingLuConfigPopVisible = false;
        } else {
          console.log('error submit!!');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formDisabled = {
        xunHuanLiang: true,
        meijitian_number: true,
        gongzuori: true,
        jutiri: false,
        jiyuefen: false,
        jutiri_nian: false,
        riqi_nian: false,
        tianshu: false,
      };
    },
  },
};
export default itemHandle;

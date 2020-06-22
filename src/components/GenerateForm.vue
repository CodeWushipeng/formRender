<template>
  <div v-if="!isDataNull">
    <!--<div>-->
    <!--data:{{data.config}} <br>-->
    <!--models:{{models}} <br>-->
    <!--rules:{{rules}} <br>-->
    <el-form
      v-if="keysLength"
      ref="generateForm"
      label-suffix=":"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col
              v-for="(col, colIndex) in item.columns"
              :key="colIndex"
              :span="col.span"
            >
              <template v-for="citem in col.list">
                <el-form-item
                  v-if="citem.type == 'blank'"
                  :label="citem.name"
                  :prop="citem.model"
                  :key="citem.key"
                >
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-item
                  v-else
                  :key="citem.key"
                  :models.sync="models"
                  :remote="remote"
                  :rules="rules"
                  :widget="citem"
                  @input-change="onInputChange"
                ></genetate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type == 'blank'">
          <el-form-item :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>

        <template v-else>
          <genetate-form-item
            :key="item.key"
            :models.sync="models"
            :rules="rules"
            :widget="item"
            @input-change="onInputChange"
            @el-change="onElChange"
            @text-enter="textEnter"
            :remote="remote"
            :ref="item.model"
            v-show="!item.options.hidden"
            :class="item.options.customClass"
          ></genetate-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from "./GenerateFormItem";
import { loadJs } from "../util/index.js";
import request from "../util/request.js";
import { IdentityCodeValid } from "../util/idencardUtil";

export default {
  name: "fm-generate-form",
  components: {
    GenetateFormItem,
  },
  /**
   * data为表单渲染原始数据
   * remote为获取服务端数据的回调函数
   * value为覆盖表单原始默认值的数据
   * dyData为公共区动态数据
   */
  props: ["data", "remote", "value", "insite", "dyData"],
  computed: {
    keysLength() {
      // 解除报错
      return Object.keys(this.data).length;
    },
  },
  data() {
    return {
      isDataNull: true, // 判断props传入的data是否有真实数据
      models: {}, // form表单对象所有组件key value组成的json
      rules: {}, // form表单对象所有组件对应校验规则
      haveHide: false, // 后期添加非form making自有属性，是否触发过节点隐藏
      allItems: [],
      canFocusInputArr: [],
      startIndex: 0,
      focusIndex: 0, // 后期添加非form making自有属性，当前可聚焦节点相对全局下标
      intervalId: null, //定时器ID,
      remoteType: false, //添加用于标记远程校验状态  （因为promise返回值是promise所以添加）
    };
  },
  created() {
    this.generateModle(this.data.list);
  },
  mounted() {
    // 这个定时器主要是解决父组件异步传值，子组件生命周期获取不到数据的问题
    this.intervalId = setInterval(() => {
      if (!this.isDataNull) {
        this.flowHandel();
        console.log(this.rules)
        clearInterval(this.intervalId);
      }
    }, 200);
  },
  methods: {
     
    // 生成models、rules对象
    generateModle(genList) {
      if (!genList) {
        return;
      }
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach((item) => {
            this.generateModle(item.list);
          });
        } else {
          // 处理非表格类型的组件
          if (
            // 如果value对象不为空且具有与当前组件model同名的属性，则将值赋给models的该属性（这样就修改了组件原始值）
            this.value &&
            Object.keys(this.value).indexOf(genList[i].model) >= 0
          ) {
            this.models[genList[i].model] = this.value[genList[i].model];
          } else {
            // 如果value为空判断当前组件的类型是否为空类型
            if (genList[i].type === "blank") {
              // 如果为空类型则为models添加对应的响应式属性，并赋值为默认值
              this.$set(
                this.models,
                genList[i].model,
                genList[i].options.defaultType === "String" // 如果默认类型为字符串类型赋值为空字符串
                  ? ""
                  : genList[i].options.defaultType === "Object" //如果不是字符串类型判断是否是对象类型，如果是赋值空对象，否则赋值空数组
                  ? {}
                  : []
              );
            } else {
              // 如果value为空并且组件为非空类型组件将组件默认值赋值给models对应属性
              // 这个if条件为后期加入的，判断是否已触发过隐藏条件
              if (!this.haveHide) {
                this.models[genList[i].model] = genList[i].options.defaultValue;
              }

              // 组件创建完成后models为组件 key:value 键值对json
            }
          }
          // 如果rules对象存在当前组件的model属性
          if (this.rules[genList[i].model]) {
            // 执行此段代码后rules的每个属性为组件默认校验规则和传入检验规则组成的数组
            this.rules[genList[i].model] = [
              ...this.rules[genList[i].model], // 将当前数组值展开
              ...genList[i].rules.map((item) => {
                // 展开当前组件的校验规则数组，遍历数组每一项（为json）
                if (item.pattern) {
                  // 如果存在 pattern属性则返回一个新对象，该对象包含此条校验规则的所有属性以及pattern属性，值为item.pattern的返回值
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  // 不存在pattern属性则返回所有item组成的新对象
                  return { ...item };
                }
              }),
            ];
          } else {
            // 如果rules对象不存在当前组件的model属性
            this.rules[genList[i].model] = [
              ...genList[i].rules.map((item) => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  return { ...item };
                }
              }),
            ];
           
          }
          //  console.log(this.rules)
          // 确认密码的校验
          // console.log('genList[i]',genList[i])
          const dataType = genList[i].options.dataType;
          const confirm_field = genList[i].options.confirm_field;
          if (dataType == "againpassword") {
            var validatePass = (rule, value, callback) => {
              // console.log('this.models',JSON.stringify(_this.models));
              setTimeout(() => {
                if (this.models[confirm_field]) {
                  if (value === "") {
                    callback(new Error("请输入确认密码"));
                  } else if (this.models[confirm_field] !== value) {
                    callback(new Error("两次输入密码不一致!"));
                  } else {
                    callback();
                  }
                }
              }, 200);
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "blur",
            });
          }

          if (dataType == "singletext") {
            debugger;
            var validatePass = (rule, value, callback) => {
              setTimeout(() => {
                if (value === "") {
                  callback(new Error("请输入文本内容"));
                } else {
                  callback();
                }
              }, 200);
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "blur",
            });
          }
          //整数和数字类型     整数位、小数位位数
          if (dataType == "integer" || dataType == "float") {
            var validatePass = (rule, value, callback) => {
              setTimeout(() => {
                if (value && genList[i].options.integerbits) {
                  if ((value + "").indexOf(".") > -1) {
                    const temp = (value + "").split(".");
                    if (
                      (temp[0] + "").length > genList[i].options.integerbits
                    ) {
                      callback(new Error("超过整数位位数"));
                    }
                    if (
                      genList[i].options.decimalbits &&
                      (temp[1] + "").length > genList[i].options.decimalbits
                    ) {
                      callback(new Error("超过小数位位数"));
                    } else {
                      callback();
                    }
                  } else {
                    if ((value + "").length > genList[i].options.integerbits) {
                      callback(new Error("超过整数位位数"));
                    } else {
                      callback();
                    }
                  }
                }
              }, 200);
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "blur",
            });
          }
          //身份证校验
          if (genList[i].type == "idencard") {
            var validatePass = (rule, value, callback) => {
              setTimeout(() => {
                if (value && IdentityCodeValid(value)) {
                  callback();
                } else {
                  callback(new Error("身份证验证错误"));
                }
              }, 200);
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "blur",
            });
          }
        }
      }
    },
    // 验证并获取输入框当前的值
    getData() {
      return new Promise((resolve, reject) => {
        // 执行form表单验证函数
        this.$refs.generateForm.validate((valid) => {
          if (valid) {
            // 逐条验证当前表单的校验规则
            resolve(this.models);
          } else {
            reject(new Error(this.$t("fm.message.validError")).message);
          }
        });
      });
    },
    // 重置表单
    reset() {
      this.$refs.generateForm.resetFields();
    },
    // 数据初始化完成后流程控制操作
    flowHandel() {
      this.handelElement();
      this.allItems = document.querySelectorAll(".el-form-item");
      this.getFocusEle();
      this.handelFocus();
    },
    // 监听表单数据改变
    onInputChange(value, field) {
      // 向container组件发射on-change事件，将 key value 以及models（form表单的key value对象）传入
      this.$emit("on-change", field, value, this.models);
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
    // 隐藏并获取可聚焦元素
    handelElement() {
      this.handelHide();
      this.getFocusEle();
    },
    // 隐藏条件判断
    handelHide() {
      for (let i = 0; i < this.data.list.length; i++) {
        if (this.data.list[i].hidden && this.data.list[i].hidden !== "") {
          let hide = this.evalWrap(this.data.list[i].hidden);
          console.log(hide);
          if (hide) {
            console.log("handelHide");
            this.haveHide = true;
            this.data.list[i].options.hidden = true;
          } else {
            this.haveHide = false;
            this.data.list[i].options.hidden = false;
          }
        }
      }
      this.getFocusEle();
    },
    // 手动触发校验提示函数
    handelValidate(statu, msg) {
      this.$refs["generateForm"].fields[this.focusIndex].validateState = statu;
      if (statu == "error") {
        this.$refs["generateForm"].fields[
          this.focusIndex
        ].validateMessage = msg;
      }
    },
    // 离开条件检测
    handelCondition() {
      if (
        this.data.list[this.focusIndex].condition &&
        this.data.list[this.focusIndex].condition != ""
      ) {
        let condition = this.evalWrap(
          this.data.list[this.focusIndex].condition
        );
        console.log(this.data.list[this.focusIndex].condition);
        if (condition) {
          this.handelValidate("success");
          return true;
        } else {
          this.handelValidate("error", "不满足离开条件");
          return false;
        }
      } else {
        this.handelValidate("success");
        return true;
      }
    },

    // 离开赋值
    handelAssignment() {
      if (
        this.data.list[this.focusIndex].assignment &&
        this.data.list[this.focusIndex].assignment != ""
      ) {
        this.evalWrap(this.data.list[this.focusIndex].assignment);
      }
      return true;
    },
    // 取值范围校验
    handelRange() {
      if (
        this.data.list[this.focusIndex].valueRange != "" &&
        this.data.list[this.focusIndex].valueRange != undefined
      ) {
        let range = this.data.list[this.focusIndex].valueRange;
        let nowValue = this.models[this.data.list[this.focusIndex].model];
        console.log(nowValue);
        let result, resultType;
        try {
          result = eval(range);
          resultType = Object.prototype.toString.call(result);
        } catch (error) {
          this.handelValidate("error", "语法错误");
          throw new Error(error, "取值范围条件解析出错");
        }
        console.log(resultType);
        if (resultType == "[object Array]") {
          if (result.indexOf(nowValue) == -1) {
            this.handelValidate("error", "不在取值范围内");
            return false;
          } else {
            this.handelValidate("success");
            return true;
          }
        } else if (resultType == "[object RegExp]") {
          if (result.test(nowValue)) {
            this.handelValidate("success");
            return true;
          } else {
            this.handelValidate("error", "不在取值范围内");
            return false;
          }
        } else if (
          resultType == "[object String]" ||
          resultType == "[object Number]"
        ) {
          let resultReg = new RegExp("[" + range + "]");
          console.log(resultReg);
          if (resultReg.test(nowValue)) {
            this.handelValidate("success");
            return true;
          } else {
            this.handelValidate("error", "不在取值范围内");
            return false;
          }
        }
      } else {
        this.handelValidate("success");
        return true;
      }
    },
    // 访问外部条件
    remoteValidate() {
      if (
        this.data.list[this.focusIndex].remoteFactor &&
        this.data.list[this.focusIndex].remoteFactor.isRemote == true
      ) {
        let url = this.data.list[this.focusIndex].remoteFactor.url;
        let primitiveData = this.data.list[this.focusIndex].remoteFactor.data;
        let nowModel = this.data.list[this.focusIndex].model;
        let nowData = this.models[nowModel];
        let postData;
        var result;
        if (primitiveData != undefined && primitiveData != "") {
          postData = primitiveData;
        } else {
          postData = nowData;
        }
        console.log(postData);
        let success = this.data.list[this.focusIndex].remoteFactor.success;
        console.log(this.data.list[this.focusIndex].remoteFactor.success);
        request
          .post(url, {
            data: postData,
          })
          .then((res) => {
            if (res.code == 0) {
              // 提取返回数据对象名
              let targetKeys = Object.keys(res.data);
              // 解析返回数据对应的属性名并赋值对应组件
              for (let i = 0; i < targetKeys.length; i++) {
                if (this.models[targetKeys[i]] != undefined) {
                  this.models[targetKeys[i]] = res.data[targetKeys[i]];
                }
              }
              this.evalWrap(success);
              this.handelValidate("success");
              this.remoteType = true;
            } else {
              this.handelValidate("error", "验证失败，请重新验证");
              this.remoteType = false;
            }
          })
          .catch((error) => {
            console.log(error);
            this.handelValidate("error", "验证失败，请重新验证");
            this.remoteType = false;
          });
      } else {
        this.handelValidate("success");
        this.remoteType = true;
      }
      return this.remoteType;
    },
    // 全部可聚焦input节点下标加入一个全局数组维护
    getFocusEle() {
      this.canFocusInputArr = [];
      let flowData = this.data.list;
      for (let i = 0; i < flowData.length; i++) {
        if (
          flowData[i].options.disabled ||
          flowData[i].options.hidden ||
          flowData[i].options.readonly == "readonly"
        ) {
          continue;
        } else {
          if (
            flowData[i].type == "input" ||
            flowData[i].type == "date" ||
            flowData[i].type == "number" ||
            flowData[i].type == "time"
          ) {
            this.canFocusInputArr.push(i);
          } else if (flowData[i].type == "textarea") {
            if (
              !flowData[i].options.disabled ||
              !flowData[i].options.hidden ||
              flowData[i].options.readonly != "readonly"
            ) {
              this.canFocusInputArr.push(i);
            }
          }
        }
      }
    },
    // 光标操作控制流程
    handelFocus() {
      for (let i = this.startIndex; i < this.canFocusInputArr.length; i++) {
        let nowInput = this.allItems[this.canFocusInputArr[i]].querySelector(
          "input"
        );
        let nowTextraea = this.allItems[this.canFocusInputArr[i]].querySelector(
          "textarea"
        );
        if (nowInput) {
          nowInput.focus();
        } else if (nowTextraea) {
          nowTextraea.focus();
        }
        this.startIndex = i + 1;
        this.focusIndex = this.canFocusInputArr[i];
        console.log("this.focusIndex", this.focusIndex);
        break;
      }
    },
    // 监听input组件发射的el-change事件
    onElChange(e) {
      if (
        this.focusIndex <
        this.canFocusInputArr[this.canFocusInputArr.length - 1]
      ) {
        if (
          this.handelRange() &&
          this.handelCondition() &&
          this.remoteValidate() &&
          this.handelAssignment()
        ) {
          // if (this.data.list[this.focusIndex].rules.length > 0) {
          //   let nowModel = this.data.list[this.focusIndex].rules;
          //     this.$refs.generateForm.validateField(this.data.list[this.focusIndex].rules, (valid) => {
          //       if (valid) {
          //         // 逐条验证当前组件的校验规则

          //         this.handelElement();
          //         this.handelFocus();
          //       } else {
          //         throw new Error(this.$t("fm.message.validError")).message;
          //       }
          //     });
          // } else {
            this.handelElement();
            this.handelFocus();
          // }
        }
      }
      // this.getData().then((resolve) => {
      //   console.log(resolve)
      // });
      // this.$emit("input-enter");
    },
    // textarea ctrl+enter触发光标离开事件
    textEnter() {
      this.handelFocus();
    },
  },
  watch: {
    data: {
      // 深度观察表单渲染对象，如果数据变更再次执行model生成函数
      deep: true,
      handler(val) {
        this.generateModle(val.list);
        this.isDataNull = false;
      },
    },
    value: {
      // 深度观察组件key值
      deep: true,
      handler(val) {
        console.log(JSON.stringify(val));
        this.models = { ...this.models, ...val };
      },
    },
  },
};
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>

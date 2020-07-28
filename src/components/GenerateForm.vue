<template>
  <!--<div v-if="!isDataNull">-->
  <div>
    <!--data:{{data.config}} <br>-->
    <!--value:{{value}} <br>

    rules:{{rules}} <br>-->
    <!--models:{{ models }} <br />-->
    <el-form
      class="generateForm"
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
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
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
                  @el-change="onElChange"
                  @radio-change="radioChange"
                  @el-focus="mouseValidate"
                  @el-blur="blurValidate"
                  @date-blur="dateValidata"
                  @toggleGenerate="toggleGenerate"
                  @close-dialog="closeDialog"
                  v-show="!citem.options.hidden"
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
            @radio-change="radioChange"
            @el-focus="mouseValidate"
            @el-blur="blurValidate"
            @date-blur="dateValidata"
            @remove="removeKeyup"
            @toggleGenerate="toggleGenerate"
            @close-dialog="closeDialog"
            :remote="remote"
            v-show="!item.options.hidden"
          ></genetate-form-item>
        </template>
      </template>
    </el-form>
    <!-- 字段交易弹出框 -->
    <el-dialog :visible.sync="trade" @close="goFlow" :close-on-click-modal="false">
    <div>
      <fm-generate-form v-if="gridData" :data="gridData" ref="grid"></fm-generate-form>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import GenetateFormItem from "./GenerateFormItem";
// import { loadJs } from "../util/index.js";
// import request from "../util/request.js";
import { IdentityCodeValid } from "../util/idencardUtil";
import handler from "./mixins/generateHandle2.js";

export default {
  name: "fm-generate-form",
  components: {
    GenetateFormItem
  },
  /**
   * data为表单渲染原始数据
   * remote为获取服务端数据的回调函数
   * value为覆盖表单原始默认值的数据
   */
  mixins: [handler],
  props: ["data", "remote", "value", "insite"],
  computed: {
    keysLength() {
      // 解除报错
      return Object.keys(this.data).length;
    }
  },
  data() {
    return {
      gridData: null,
      rowData:"",
      result: {},
      models: {}, // form表单对象所有组件key value组成的json
      rules: {} // form表单对象所有组件对应校验规则
    };
  },
  created() {
    this.generateModle(this.data.list);
  },
  mounted() {},
  methods: {
    // 生成models、rules对象
    generateModle(genList) {
      // console.log(
      //   "xxxxxxxxxxxxxxxx2333333333333333333xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      // );
      if (!genList) {
        return;
      }
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list);
          });
        } else if (genList[i].type === "elTable") {
          this.models[genList[i].model] =
            genList[i].configdata.list[0].options.tableData;
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
              let testa = {};
              this.$set(
                testa,
                genList[i].model,
                genList[i].options.defaultType === "String" // 如果默认类型为字符串类型赋值为空字符串
                  ? ""
                  : genList[i].options.defaultType === "Object" //如果不是字符串类型判断是否是对象类型，如果是赋值空对象，否则赋值空数组
                  ? {}
                  : []
              );
              this.models = testa;
            } else {
              // 如果value为空并且组件为非空类型组件将组件默认值赋值给models对应属性
              this.models[genList[i].model] = genList[i].options.defaultValue;

              // 组件创建完成后models为组件 key:value 键值对json
            }
          }
          // 如果rules对象存在当前组件的model属性
          if (this.rules[genList[i].model]) {
            // 执行此段代码后rules的每个属性为组件默认校验规则和传入检验规则组成的数组
            this.rules[genList[i].model] = [
              ...this.rules[genList[i].model], // 将当前数组值展开
              ...genList[i].rules.map(item => {
                // 展开当前组件的校验规则数组，遍历数组每一项（为json）
                if (item.pattern) {
                  // 如果存在 pattern属性则返回一个新对象，该对象包含此条校验规则的所有属性以及pattern属性，值为item.pattern的返回值
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  // 不存在pattern属性则返回所有item组成的新对象
                  return { ...item };
                }
              })
            ];
          } else {
            // 如果rules对象不存在当前组件的model属性
            this.rules[genList[i].model] = [
              ...genList[i].rules.map(item => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  return { ...item };
                }
              })
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
              if (confirm_field) {
                if (this.models[confirm_field]) {
                  if (value === "") {
                    callback(new Error("请输入确认密码"));
                  } else if (this.models[confirm_field] !== value) {
                    callback(new Error("两次输入密码不一致!"));
                  } else {
                    callback();
                  }
                } else if (!this.models[confirm_field] && !value) {
                  callback();
                } else if (!this.models[confirm_field] && value) {
                  callback(new Error("两次输入密码不一致!"));
                }
              } else {
                callback(new Error("请在属性中设置确认字段"));
              }
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "enter"
            });
          }

          if (dataType == "text") {
            var validatePass = (rule, value, callback) => {
              callback();
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "enter"
            });
          }
          //整数和数字类型     整数位、小数位位数
          if (dataType == "integer" || dataType == "float") {
            var validatePass = (rule, value, callback) => {
              if (value) {
                if ((value + "").indexOf(".") > -1) {
                  const temp = (value + "").split(".");
                  if ((temp[0] + "").length > genList[i].options.integerbits) {
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
              } else {
                callback(new Error("不能为空"));
              }
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "enter"
            });
          }
          //身份证校验
          if (genList[i].type == "idencard") {
            var validatePass = (rule, value, callback) => {
              if (value && IdentityCodeValid(value)) {
                callback();
              } else {
                callback(new Error("身份证验证错误"));
              }
            };
            this.rules[genList[i].model].push({
              validator: validatePass,
              trigger: "enter"
            });
          }
        }
      }
      if (!this.checkModels(this.data.list)) {
        return;
      }
    },
    // 验证并获取输入框当前的值
    getData() {
      this.clearValidate();
      return new Promise((resolve, reject) => {
        // 执行form表单验证函数
        this.$nextTick(() => {
          this.$refs.generateForm.validate(valid => {
            if (valid) {
              // 逐条验证当前表单的校验规则
              this.trimModels(this.models);
              resolve(this.models);
            } else {
              reject(new Error(this.$t("fm.message.validError")).message);
            }
          });
        });
      });
    },
    setTableData(key,data){debugger
      if(key){
        this.data.list.map(t=>{
          if(t.key == key){
            if(this.data.list){
              t.configdata.list[0].options.tableData = data
            }
          }
        })
      }
      if(data instanceof Array){
        if(this.data && this.data.list[0] && this.data.list[0].options.tableData){
          this.data.list[0].options.tableData = data;
        }
      }
    },
    // models值去除收尾空格
    trimModels(temp) {
      console.log(this.models);
      for(let item in this.models){
          if(typeof this.models[item] == "string"){
              this.models[item]=this.models[item].trim();
          }
      }
    },
    // 检查model是否有重复
    checkModels(item) {
      for (let i = 0; i < item.length; i++) {
        for (let j = i + 1; j < item.length; j++) {
          if (item[i].model === item[j].model) {
            this.$message({
              showClose: true,
              duration: 5000,
              message: "model不能重复",
              type: "error"
            });
            return false;
          } else {
            return true;
          }
        }
      }
    },
    clearValidate() {
      let lists = this.data.list;
      for (let i = 0; i < lists.length; i++) {
        if (
          lists[i].options.disabled ||
          lists[i].options.hidden ||
          lists[i].options.readonly == "readonly"
        ) {
          lists[i].model = "";
        }
      }
      console.log(this.data);
    },
    // 重置表单
    reset() {
      this.$refs.generateForm.resetFields();
    },
    // 监听表单数据改变
    onInputChange(value, field) {
      // 向container组件发射on-change事件，将 key value 以及models（form表单的key value对象）传入
      this.$emit("on-change", field, value, this.models);
    },
    // 重置models
    resetModelsFields() {
      const keys = Object.keys(this.models);
      keys.length &&
        keys.forEach(key => {
          delete this.models[key];
        });
    }
  },
  watch: {
    models: {
      // 深度观察表单渲染对象，如果数据变更再次执行model生成函数
      deep: true,
      immediate: true,
      handler(val) {
        console.log("models", val);
        // this.isDataNull = false;
      }
    },
    data: {
      // 深度观察表单渲染对象，如果数据变更再次执行model生成函数
      // deep: true,
      handler(val) {
        this.resetModelsFields();
        this.generateModle(val.list);
      }
    },
    value: {
      // 深度观察组件key的值
      deep: true,
      handler(val) {
        console.log(JSON.stringify(val));
        this.models = { ...this.models, ...val };
      }
    }
  }
};
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>

<template>
  <div class="render-wrap">
    <!-- <render-form
      v-if="configdata != null"
      :configdata="configdata"
      ref="renderForm"
    ></render-form> -->
    <!-- <el-button @click="acceptFormData">获取数据</el-button> -->
    <!-- <fm-generate-form v-if="configdata != null" :data="configdata" ref="generateForm"></fm-generate-form> -->
    <fm-generate-form :data="configdata" ref="generateForm"></fm-generate-form>
  </div>
</template>

<script>
import request from '../util/request.js';
export default {
  data() {
    return {
      configdata: {},
    };
  },
  created() {
    this.getConfigData();
  },
  methods: {
    getConfigData() {
      setTimeout(() => {
        this.configdata = {
	"extendDetail": "function main (){\n}",
	"list": [{
		"columns": [{
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-input",
				"tableModel": "",
				"tableCode": "",
				"rules": [],
				"type": "singletext",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"options": {
					"integerbits": 1,
					"clearable": false,
					"hidden": false,
					"patternCheck": false,
					"maxlength": "",
					"defaultValue": "",
					"dataType": "text",
					"pattern": "",
					"labelWidth": 110,
					"wordLimit": false,
					"required": false,
					"dataTypeCheck": false,
					"tips": "",
					"patternMessage": "",
					"width": "100%",
					"decimalbits": 0,
					"showPassword": false,
					"dataTypeMessage": "",
					"disabled": true,
					"placeholder": "",
					"isLabelWidth": false
				},
				"name": "合同编号",
				"model": "ctrNo",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606718398000_2904"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-input",
				"tableModel": "",
				"tableCode": "",
				"rules": [],
				"type": "singletext",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"options": {
					"integerbits": 1,
					"clearable": false,
					"hidden": false,
					"patternCheck": false,
					"maxlength": "",
					"defaultValue": "",
					"dataType": "text",
					"pattern": "",
					"labelWidth": 110,
					"wordLimit": false,
					"required": false,
					"dataTypeCheck": false,
					"tips": "",
					"patternMessage": "",
					"width": "100%",
					"decimalbits": 0,
					"showPassword": false,
					"dataTypeMessage": "",
					"disabled": true,
					"placeholder": "",
					"isLabelWidth": false
				},
				"name": "客户编号",
				"model": "custNo",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606718416000_11199"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-input",
				"tableModel": "",
				"tableCode": "",
				"rules": [],
				"type": "singletext",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"options": {
					"integerbits": 1,
					"clearable": false,
					"hidden": false,
					"patternCheck": false,
					"maxlength": "",
					"defaultValue": "",
					"dataType": "text",
					"pattern": "",
					"labelWidth": 110,
					"wordLimit": false,
					"required": false,
					"dataTypeCheck": false,
					"tips": "",
					"patternMessage": "",
					"width": "100%",
					"decimalbits": 0,
					"showPassword": false,
					"dataTypeMessage": "",
					"disabled": true,
					"placeholder": "",
					"isLabelWidth": false
				},
				"name": "客户名称",
				"model": "custName",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606718437000_51148"
			}],
			"span": 8
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 20,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1606718383000_45564",
		"tableName": ""
	}, {
		"columns": [{
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": false,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "个人客户",
						"value": "1"
					}, {
						"label": "对公客户",
						"value": "2"
					}, {
						"label": "同业客户",
						"value": "3"
					}, {
						"label": "集群客户",
						"value": "4"
					}, {
						"label": "集团客户",
						"value": "5"
					}, {
						"label": "合作商户客户",
						"value": "6"
					}, {
						"label": "联保客户",
						"value": "7"
					}, {
						"label": "个经类客户",
						"value": "8"
					}],
					"disabled": true,
					"placeholder": "",
					"isLabelWidth": false
				},
				"remoteCode": "",
				"model": "custType",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1607672656000_75073",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "客户类型",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": true,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "是",
						"value": "Y"
					}, {
						"label": "否",
						"value": "N"
					}],
					"disabled": false,
					"placeholder": "",
					"isLabelWidth": false
				},
				"remoteCode": "",
				"model": "wthrRepyPnp",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1606718584000_78156",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "是否还本续贷",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": false,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "新发生",
						"value": "01"
					}, {
						"label": "展期",
						"value": "02"
					}, {
						"label": "借新还旧",
						"value": "03"
					}, {
						"label": "收回再贷",
						"value": "04"
					}, {
						"label": "续作",
						"value": "05"
					}],
					"disabled": true,
					"placeholder": "",
					"isLabelWidth": false
				},
				"remoteCode": "",
				"model": "applyType",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1607610576000_35757",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "发生类型",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 20,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1606718458000_61486",
		"tableName": ""
	}, {
		"columns": [{
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": false,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "一般小本贷款",
						"value": "P45044004300052"
					}, {
						"label": "信用易贷",
						"value": "P45043005700053"
					}],
					"disabled": true,
					"placeholder": "",
					"isLabelWidth": false
				},
				"remoteCode": "",
				"model": "businessVariety",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1606718800000_36993",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "业务品种",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-input",
				"tableModel": "",
				"tableCode": "",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "amount",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"options": {
					"hidden": false,
					"maxlength": 20,
					"defaultValue": "",
					"dataType": "",
					"pattern": "",
					"labelWidth": 110,
					"required": true,
					"tips": "",
					"width": "100%",
					"disabled": false,
					"placeholder": "",
					"decimal": 0,
					"amountmoney": true,
					"isLabelWidth": false
				},
				"name": "合同金额",
				"model": "ctrAmt",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606718817000_197"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [],
				"type": "select",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 100,
					"remote": false,
					"required": false,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"remoteOption": "option_1608195279503",
					"width": "100%",
					"options": [{
						"label": "人民币",
						"value": "156"
					}],
					"disabled": false,
					"placeholder": "",
					"isLabelWidth": false
				},
				"novalid": {},
				"remoteCode": "",
				"model": "currency",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1608195279503",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "合同币种",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 20,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1606718777000_92181",
		"tableName": ""
	}, {
		"columns": [{
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-date",
				"tableCode": "",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "date",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"options": {
					"clearable": true,
					"hidden": false,
					"defaultValue": "",
					"editable": false,
					"format": "yyyy-MM-dd",
					"labelWidth": 110,
					"type": "date",
					"required": true,
					"readonly": false,
					"startPlaceholder": "",
					"width": "100%",
					"disabled": false,
					"placeholder": "",
					"endPlaceholder": "",
					"timestamp": false,
					"isLabelWidth": false
				},
				"name": "合同起始日",
				"model": "ctrStartDate",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606718916000_97963"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-date",
				"tableCode": "",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "date",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"options": {
					"clearable": true,
					"hidden": false,
					"defaultValue": "",
					"editable": false,
					"format": "yyyy-MM-dd",
					"labelWidth": 110,
					"type": "date",
					"required": true,
					"readonly": false,
					"startPlaceholder": "",
					"width": "100%",
					"disabled": false,
					"placeholder": "",
					"endPlaceholder": "",
					"timestamp": false,
					"isLabelWidth": false
				},
				"name": "合同到期日",
				"model": "ctrEndDate",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606718922000_24725"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-input",
				"tableModel": "",
				"tableCode": "",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "input",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"options": {
					"integerbits": 17,
					"hidden": false,
					"defaultValue": "",
					"dataType": "integer",
					"pattern": "",
					"labelWidth": 110,
					"required": true,
					"tips": "",
					"dataTypeCheck": false,
					"width": "100%",
					"decimalbits": 3,
					"disabled": false,
					"placeholder": "",
					"isLabelWidth": false
				},
				"name": "合同期限",
				"model": "ctrDeadline",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606718954000_8572"
			}],
			"span": 8
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 20,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1606718869000_42930",
		"tableName": ""
	}, {
		"columns": [{
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": true,
					"showLabel": true,
					"tips": "",
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "年",
						"value": "Y"
					}, {
						"label": "月",
						"value": "M"
					}, {
						"label": "日",
						"value": "D"
					}],
					"disabled": false,
					"placeholder": "",
					"isLabelWidth": false
				},
				"remoteCode": "",
				"model": "ctrDdlnUnit",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1606719134000_31590",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "合同期限单位",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": true,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "抵押",
						"value": "01"
					}, {
						"label": "质押",
						"value": "02"
					}, {
						"label": "保证",
						"value": "03"
					}],
					"disabled": false,
					"placeholder": "",
					"isLabelWidth": false,
					"hideLabel": false
				},
				"remoteCode": "",
				"model": "mainGuaranWay",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1606719680000_60690",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "主担保方式",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}, {
			"list": [],
			"span": 8
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 20,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1606719121000_67935",
		"tableName": ""
	}, {
		"columns": [{
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-check-box",
				"tableCode": "",
				"rules": [],
				"type": "checkbox",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          return res\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"hidden": false,
					"defaultValue": [],
					"remoteOptions": [],
					"labelWidth": 110,
					"remote": false,
					"showLabel": true,
					"required": false,
					"props": {
						"label": "label",
						"value": "value"
					},
					"inline": true,
					"options": [{
						"label": "抵押",
						"value": "01"
					}, {
						"label": "质押",
						"value": "02"
					}, {
						"label": "保证",
						"value": "03"
					}, {
						"label": "担保公司担保",
						"value": "04"
					}],
					"width": "100%",
					"disabled": false,
					"isLabelWidth": false
				},
				"name": "附加担保方式",
				"model": "apdGuaranWay",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1608019084000_81036"
			}],
			"span": 24
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 0,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1608019070000_41627",
		"tableName": ""
	}, {
		"columns": [{
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [{
					"message": "必须填写",
					"required": true
				}],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": true,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "等额本金",
						"value": "01"
					}, {
						"label": "等额本息",
						"value": "02"
					}, {
						"label": "到期一次还本付息（利随本清）",
						"value": "03"
					}, {
						"label": "按期付息分次还本",
						"value": "04"
					}, {
						"label": "按期付息一次还本",
						"value": "05"
					}, {
						"label": "按计划还本",
						"value": "06"
					}],
					"disabled": false,
					"placeholder": "",
					"isLabelWidth": false
				},
				"remoteCode": "",
				"model": "paymentWay",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1606719738000_57180",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "还款方式",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"icon": "icon-date",
				"tableCode": "",
				"rules": [],
				"type": "date",
				"url": "",
				"tableName": "",
				"tableKey": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"options": {
					"clearable": true,
					"hidden": false,
					"defaultValue": "",
					"editable": false,
					"format": "yyyy-MM-dd",
					"labelWidth": 110,
					"type": "date",
					"required": false,
					"readonly": false,
					"startPlaceholder": "",
					"width": "100%",
					"disabled": false,
					"placeholder": "",
					"endPlaceholder": "",
					"timestamp": false,
					"isLabelWidth": false
				},
				"name": "约定还款日",
				"model": "aptRpyDay",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}",
				"key": "1606719867000_36597"
			}],
			"span": 8
		}, {
			"list": [{
				"hidden": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n\treturn null\n}",
				"data": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn {}\n}",
				"multiToggle": false,
				"valueRange": "",
				"icon": "icon-select",
				"responseData": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"rules": [],
				"type": "select",
				"tableName": "",
				"tableKey": "",
				"fatherModel": "",
				"options": {
					"remoteFunc": "function main (request){\n      \t//request为axios对象\n      \t//post请求示例\n      \trequest.post(url,{data:123})\n      \t.then(res=>{\n          console.log(res)\n          //将需要赋值给组件的数组或者列表数据返回\n          return res.body.list\n      \t})\n      \t.catch(error=>{console.log(error)})\n      }",
					"filterable": false,
					"clearable": false,
					"hidden": false,
					"defaultValue": "",
					"remoteOptions": [],
					"multiple": false,
					"labelWidth": 110,
					"remote": false,
					"required": false,
					"showLabel": true,
					"props": {
						"label": "label",
						"value": "value"
					},
					"width": "100%",
					"options": [{
						"label": "是",
						"value": "Y"
					}, {
						"label": "否",
						"value": "N"
					}],
					"disabled": false,
					"placeholder": "",
					"isLabelWidth": false
				},
				"remoteCode": "",
				"model": "wthrSheetBusiness",
				"requestData": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n\treturn {}\n}",
				"key": "1606719892000_40577",
				"assignment": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n}",
				"isRemote": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn false\n}",
				"tableCode": "",
				"cascaderUrl": "",
				"isCascader": false,
				"url": "",
				"condition": "function main (models,utils,message,i){\n\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n\tif(false){message('error','错误提示信息',i)}\n\treturn true\n}",
				"enterCondition": "function main (models,utils){\n\t//models为当前表单所有model utils为扩展函数\n\treturn null\n}",
				"success": "function main (models,res,utils){\n\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n\treturn {}\n}",
				"name": "是否表外业务",
				"multiCondition": "function main (models,utils,request){\n\t//models为当前表单所有model utils为扩展函数 request为axios对象\n\t//post请求示例\n\trequest.post(url,{data:123})\n\t.then(res=>{\n\t\tconsole.log(res)\n\t\trequest.post(url,{data:res.test})\n\t\t.then(response =>{console.log(response)})\n\t\t.catch(error=>{console.log(error)})\n\t})\n\t.catch(error=>{console.log(error)})\n}"
			}],
			"span": 8
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 20,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1606719723000_83355",
		"tableName": ""
	}, {
		"columns": [{
			"list": [],
			"span": 8
		}, {
			"list": [],
			"span": 8
		}, {
			"list": [],
			"span": 8
		}],
		"icon": "icon-grid-",
		"options": {
			"gutter": 0,
			"justify": "start",
			"align": "top"
		},
		"name": "栅格布局",
		"model": "object",
		"tableCode": "",
		"rules": [],
		"type": "grid",
		"key": "1606977068000_85800",
		"tableName": ""
	}],
	"config": {
		"size": "mini",
		"labelPosition": "right",
		"labelWidth": 150
	}
}
      }, 5000);
    },
    // 接收renderform组件返回的表单数据
    acceptFormData() {
      this.$refs.renderForm.getFormData().then(data => {
        console.log(data);
      });
    },
  },
};
</script>

<style>
.render-wrap {
  margin-top: 20px;
}
</style>

export const basicComponents = [
  {
    type: 'input',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      maxlength: "",
      wordLimit: false,
      clearable: false,
      defaultValue: '',
      required: false,
      dataType: 'text',
      integerbits: 1,
      decimalbits: 0,
      pattern: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      showPassword: false,
      tips:""
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableModel: '',
    tableCode: ''
  },
  {
    type: 'textarea',
    icon: 'icon-diy-com-textarea',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '',
      labelWidth: 100,
      isLabelWidth: false,
      tips:""
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableModel: '',
    tableCode: ''
  },
  {
    type: 'number',
    icon: 'icon-number',
    options: {
      hidden: false,
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'radio',
    icon: 'icon-radio-active',
    options: {
      hidden: false,
      inline: false,
      defaultValue: '',
      showLabel: false,
      labelWidth: 100,
      isLabelWidth: false,
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",   
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'checkbox',
    icon: 'icon-check-box',
    options: {
      hidden: false,
      inline: false,
      defaultValue: [],
      showLabel: false,
      labelWidth: 100,
      isLabelWidth: false,
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",    
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'time',
    icon: 'icon-time',
    options: {
      hidden: false,
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'date',
    icon: 'icon-date',
    options: {
      hidden: false,
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'rate',
    icon: 'icon-pingfen1',
    options: {
      hidden: false,
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'color',
    icon: 'icon-color',
    options: {
      hidden: false,
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false,
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'select',
    icon: 'icon-select',
    options: {
      hidden: false,
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      labelWidth: 100,
      isLabelWidth: false,
      width: '',
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },{
          value: 'Option 3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      remoteUrl: '',
    },
    isCascader: false,
    cascaderUrl: "",
    fatherModel: "",
    requestData: "",
    responseData: "",
    hidden:"",
    remotetableCode: '',
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'switch',
    icon: 'icon-switch',
    options: {
      hidden: false,
      defaultValue: false,
      required: false,
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'slider',
    icon: 'icon-slider',
    options: {
      hidden: false,
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'text',
    icon: 'icon-wenzishezhi-',
    options: {
      hidden: false,
      defaultValue: 'This is a text',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    icon: 'icon-zidingyishuju',
    options: {
      defaultType: 'String'
    }
  },
  {
    type: 'imgupload',
    icon: 'icon-tupian',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: 'http://pfp81ptt6.bkt.clouddn.com/',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      isDelete: false,
      labelWidth: 100,
      isLabelWidth: false,
      min: 0,
      isEdit: false,
      action: 'https://jsonplaceholder.typicode.com/photos/'
    }
  },
  {
    type: 'editor',
    icon: 'icon-fuwenbenkuang',
    options: {
      hidden: false,
      defaultValue: '',
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  },
  {
    type: 'cascader',
    icon: 'icon-jilianxuanze',
    options: {
      hidden: false,
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      labelWidth: 100,
      isLabelWidth: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n"
    +"\treturn null\n"
    +"}",
    enterCondition: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn null\n"
    +"}",
    condition:"function main (models,utils,message,i)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n"
    +"\tif(false){message('error','错误提示信息',i)}\n"
    +"\treturn true\n"
    +"}",
    valueRange: '',
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"}",
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,res,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    multiToggle: false,
    multiCondition: "function main (models,utils,request)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数 request为axios对象\n"
    +"\t//post请求示例\n"
    +"\trequest.post(url,{data:123})\n"
    +"\t.then(res=>{\n"
    +"\t\tconsole.log(res)\n"
    +"\t\trequest.post(url,{data:res.test})\n"
    +"\t\t.then(response =>{console.log(response)})\n"
    +"\t\t.catch(error=>{console.log(error)})\n"
    +"\t})\n"
    +"\t.catch(error=>{console.log(error)})\n"
    +"}",
    tableKey: '',
    tableCode: ''
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    icon: 'icon-grid-',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'divider',
    icon: 'icon-fengexian',
    options: {
      hidden: false,
      contentPosition: 'left'
    }
  },
  {
    type: 'tabs',
    icon: 'icon-tabs',
    tabs: [
      {
        label: 'Tab 1',
        name: 'tab_1',
        list: []
      }
    ],
    options: {
      type: '',
      tabPosition: 'top',
      customClass: '',
      hidden: false,
    }
  },
]

export const tableComponents = [
  {
    type: 'elTable',
    icon: 'icon-grid-',
    options: {
      isPagination: false,
      isAddBtn:false,
      isEditBtn: false,
      isDeleteBtn: false,
      isDetail: false,
      isDisplayColumnBtn:false,
      addFormId:'',
      editFormId: '',
      detailFormId: '',
      isAddBtnCustom: false,
      isEditBtnCustom: false,
      isDeleteBtnCustom: false,
      isDetailCustom: false,
      displayColumns:[],
      remoteFunc: "function main (currentObj,request,callBack)" + "{\n"
        + "\t//currentObj为当前表格组件对象 request为请求方法,callBack回调方法\n"
        + "\treturn {}\n"
        + "}",
      addFn: "function main (currentObj,request,callBack)" + "{\n"
        + "\t//currentObj为当前表格组件对象 request为请求方法,callBack回调方法\n"
        + "\treturn {}\n"
        + "}",
      editFn: "function main (currentObj,request,callBack)" + "{\n"
        + "\t//currentObj为当前表格组件对象 request为请求方法,callBack回调方法\n"
        + "\treturn {}\n"
        + "}",
      detailFn: "function main (currentObj,request,callBack)" + "{\n"
        + "\t//currentObj为当前表格组件对象 request为请求方法,callBack回调方法\n"
        + "\treturn {}\n"
        + "}",
      deleteFn: "function main (currentObj,request,callBack)" + "{\n"
        + "\t//currentObj为当前表格组件对象 request为请求方法,callBack回调方法\n"
        + "\treturn {}\n"
        + "}",
      pagination:{
        pageSize:1,
        currentPage:1,
        pagerCount:5,
        total:0,
        handleSizeChange:`function(page){
          
          console.log(page)
        }`,
        handleCurrentChange: `function (pageSize) {
          
          console.log(pageSize)
        }`
      },
      eventConfig:{

      }
    },
    configdata: {
      list:[],
      config:{}
    }
  }
]

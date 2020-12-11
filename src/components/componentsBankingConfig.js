export const bankingComponents = [
  {
    type: 'password',
    icon: 'icon-input',
    options: {
      hidden: false,
      maxlength: 17,
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'password',
      amountmoney: false,
      pattern: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'againpassword',
    icon: 'icon-input',
    options: {
      hidden: false,
      maxlength: 17,
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'againpassword',
      confirm_field: '',
      pattern: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'amount',
    icon: 'icon-input',
    options: {
      hidden: false,
      maxlength: 20,
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: '',
      amountmoney: true,
      // amountvisible: false,
      decimal: '',
      pattern: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'input',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      integerbits: 17,
      decimalbits: 3,
      dataType: 'integer',
      pattern: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'singletext',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      maxlength: '',
      wordLimit: false,
      clearable: false,
      defaultValue: '',
      required: false,
      dataType: 'text',
      dataTypeCheck: false,
      dataTypeMessage: '',
      integerbits: 1,
      decimalbits: 0,
      pattern: '',
      patternCheck: false,
      patternMessage: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      showPassword: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
    tableCode: '',
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
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
    tableCode: '',
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
          label: 'Option 1',
        },
        {
          value: 'Option 2',
          label: 'Option 2',
        },
        {
          value: 'Option 3',
          label: 'Option 3',
        },
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: `function main (request){
      	//request为axios对象
      	//post请求示例
      	request.post(url,{data:123})
      	.then(res=>{
          console.log(res)
          return res
      	})
      	.catch(error=>{console.log(error)})
      }`,
      disabled: false,
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableCode: '',
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
          value: 'Option 1',
        },
        {
          value: 'Option 2',
        },
        {
          value: 'Option 3',
        },
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: `function main (request){
      	//request为axios对象
      	//post请求示例
      	request.post(url,{data:123})
      	.then(res=>{
          console.log(res)
          return res
      	})
      	.catch(error=>{console.log(error)})
      }`,
      disabled: false,
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableCode: '',
  },
  {
    type: 'time',
    icon: 'icon-time',
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
      startTime: '',
      endTime: '',
      isRange: false,
      arrowControl: false,
      format: 'HH:mm:ss',
      required: false,
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableCode: '',
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
      startDate: '',
      endDate: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableCode: '',
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
          value: 'Option 1',
        },
        {
          value: 'Option 2',
        },
        {
          value: 'Option 3',
        },
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },

      remoteFunc: `function main (request){
      	//request为axios对象
      	//post请求示例
      	request.post(url,{data:123})
      	.then(res=>{
          console.log(res)
          //将需要赋值给组件的数组或者列表数据返回
          return res.body.list
      	})
      	.catch(error=>{console.log(error)})
      }`,
    },
    isCascader: false,
    cascaderUrl: '',
    fatherModel: '',
    requestData:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回请求的JSON数据\n' +
      '\treturn {}\n' +
      '}',
    responseData:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 返回true表示隐藏该组件 false和null显示该组件\n' +
      '\treturn null\n' +
      '}',
    remoteCode: '',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model res为请求返回数据 utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableCode: '',
  },
  {
    type: 'idencard',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      ifperipheral: true,
      dataType: 'string',
      decimal: '',
      pattern: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'readcard',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      ifperipheral: true,
      cardType: '01',
      dataType: 'string',
      decimal: '',
      pattern: '',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'taglable',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'imageshow',
    icon: 'icon-tupian',
    options: {
      hidden: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: '',
      token: '',
      domain: '',
      disabled: false,
      min: 0,
      length: 8,
      imagesrc:'',
      multiple: false,
      isDelete: true,
      labelWidth: 100,
      isLabelWidth: false,
      isEdit: true,
      action: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'imageupload',
    icon: 'icon-tupian',
    options: {
      hidden: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: '',
      token: '',
      domain: '',
      disabled: false,
      min: 0,
      length: 8,
      multiple: false,
      isDelete: true,
      isEdit: true,
      action: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn null\n" +
      "}",
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  /*{
    type: 'fileupload',
    icon: 'icon-tupian',
    options: {
      hidden: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: '',
      token: '',
      domain: '',
      disabled: false,
      min: 0,
      length: 8,
      multiple: false,
      isDelete: true,
      isEdit: true,
      action: '',
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn null\n" +
      "}",
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },*/
  {
      type: 'fileuploadExt',
      icon: 'icon-wenjianshangchuan',
      options: {
          defaultValue: [],
          width: '',
          tokenFunc: 'funcGetToken',
          token: '',
          domain: 'http://tcdn.form.xiaoyaoji.cn/',
          disabled: false,
          tip: '',
          action: 'http://tools-server.making.link/api/transfer',
          customClass: '',
          limit: 9,
          multiple: false,
          isQiniu: false,
          labelWidth: 100,
          isLabelWidth: false,
          hidden: false,
          dataBind: true,
          headers: [],
          required: false,
      },
      hidden:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn null\n" +
      "}",
      isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
      url: '',
      data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
      success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
      multiToggle: false,
      multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
      tableKey: '',
      tableModel: '',
  },
  {
    type: 'videoupload',
    icon: 'icon-tupian',
    options: {
      hidden: false,
      defaultValue: [],
      labelWidth: 100,
      isLabelWidth: false,
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: '',
      token: '',
      domain: '',
      disabled: false,
      min: 0,
      length: 8,
      multiple: false,
      isDelete: true,
      isEdit: true,
      action: '',
    },
    hidden:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn null\n" +
      "}",
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'camera',
    icon: 'icon-tupian',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn null\n" +
      "}",
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'buttonCom',
    icon: 'icon-tupian',
    options: {
      hidden: false,
      width: '',
      defaultValue: '',
      required: false,
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
    },
    hidden:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn null\n" +
      "}",
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'alink',
    icon: 'icon-tupian',
    options: {
      hidden: false,
      width: '',
      defaultValue: '',
      required: false,
      placeholder: '',
      labelWidth: 100,
      isLabelWidth: false,
      disabled: false,
    },
    hidden:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn null\n" +
      "}",
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
  {
    type: 'frequency',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      integerbits: 17,
      decimalbits: 3,
      dataType: 'string',
      pattern: '',
      spaceType: 'pingLuConfigPop',
      placeholder: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      tips: '',
    },
    hidden:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    enterCondition:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn null\n' +
      '}',
    condition:
      'function main (models,utils,message,i)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 message为验证错误的提示函数,i为传入cb的当前组件下标\n' +
      "\tif(false){message('error','错误提示信息',i)}\n" +
      '\treturn true\n' +
      '}',
    valueRange: '',
    assignment:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '}',
    isRemote:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn false\n' +
      '}',
    url: '',
    data:
      'function main (models,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    success:
      'function main (models,res,utils)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数\n' +
      '\treturn {}\n' +
      '}',
    multiToggle: false,
    multiCondition:
      'function main (models,utils,request)' +
      '{\n' +
      '\t//models为当前表单所有model utils为扩展函数 request为axios对象\n' +
      '\t//post请求示例\n' +
      '\trequest.post(url,{data:123})\n' +
      '\t.then(res=>{\n' +
      '\t\tconsole.log(res)\n' +
      '\t\trequest.post(url,{data:res.test})\n' +
      '\t\t.then(response =>{console.log(response)})\n' +
      '\t\t.catch(error=>{console.log(error)})\n' +
      '\t})\n' +
      '\t.catch(error=>{console.log(error)})\n' +
      '}',
    tableKey: '',
    tableModel: '',
  },
];

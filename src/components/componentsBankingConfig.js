export const bankingComponents = [
  {
    type: "password",
    icon: "icon-input",
    options: {
      hidden: false,
      maxlength: 17,
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "password",
      amountmoney: false,
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "againpassword",
    icon: "icon-input",
    options: {
      hidden: false,
      maxlength: 17,
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "againpassword",
      confirm_field: "",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "amount",
    icon: "icon-input",
    options: {
      hidden: false,
      maxlength: 20,
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "",
      amountmoney: true,
      // amountvisible: false,
      decimal: "",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "input",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      integerbits: 17,
      decimalbits: 3,
      dataType: "integer",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "singletext",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "text",
      decimal: "",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "textarea",
    icon: "icon-diy-com-textarea",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      disabled: false,
      pattern: "",
      placeholder: "",
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "radio",
    icon: "icon-radio-active",
    options: {
      hidden: false,
      inline: false,
      defaultValue: "",
      showLabel: false,
      options: [
        {
          value: "Option 1",
          label: "Option 1",
        },
        {
          value: "Option 2",
          label: "Option 2",
        },
        {
          value: "Option 3",
          label: "Option 3",
        },
      ],
      required: false,
      width: "",
      remote: false,
      remoteOptions: [],
      props: {
        value: "value",
        label: "label",
      },
      remoteFunc: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "checkbox",
    icon: "icon-check-box",
    options: {
      hidden: false,
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: "Option 1",
        },
        {
          value: "Option 2",
        },
        {
          value: "Option 3",
        },
      ],
      required: false,
      width: "",
      remote: false,
      remoteOptions: [],
      props: {
        value: "value",
        label: "label",
      },
      remoteFunc: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "time",
    icon: "icon-time",
    options: {
      hidden: false,
      defaultValue: "21:19:56",
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: "",
      startPlaceholder: "",
      endPlaceholder: "",
      isRange: false,
      arrowControl: true,
      format: "HH:mm:ss",
      required: false,
      width: "",
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "date",
    icon: "icon-date",
    options: {
      hidden: false,
      defaultValue: "",
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: "",
      startPlaceholder: "",
      endPlaceholder: "",
      type: "date",
      format: "yyyy-MM-dd",
      timestamp: false,
      required: false,
      width: "",
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "select",
    icon: "icon-select",
    options: {
      hidden: false,
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: "",
      required: false,
      showLabel: false,
      width: "",
      options: [
        {
          value: "value 1",
          label: "label 1",
          isCheck: false,
        },
        {
          value: "value 2",
          label: "label 2",
          isCheck: false,
        },
        {
          value: "value 3",
          label: "label 3",
          isCheck: false,
        },
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: "value",
        label: "label",
      },
      remoteFunc: "",
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "idencard",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      ifperipheral: true,
      dataType: "string",
      decimal: "",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "readcard",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      ifperipheral: true,
      cardType: "01",
      dataType: "string",
      decimal: "",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "",
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "taglable",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      placeholder: "",
      disabled: false,
    },
    hidden:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    enterCondition:
      "function main (models,utils)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数\n" +
      "\treturn true\n" +
      "}",
    condition:
      "function main (models,utils,cb,i)" +
      "{\n" +
      "\t//models为当前表单所有model utils为扩展函数 cb为验证错误的提示函数,i为传入cb的当前组件下标\n" +
      "\tif(false){cb('error','错误提示信息',i)}\n" +
      "\treturn true\n" +
      "}",
    valueRange: "",
    assignment:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn true\n"
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
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "imageshow",
    icon: "icon-tupian",
    options: {
      hidden: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: "",
      tokenFunc: "",
      token: "",
      domain: "",
      disabled: false,
      min: 0,
      length: 8,
      multiple: false,
      isDelete: true,
      isEdit: true,
      action: "",
    },
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "imageupload",
    icon: "icon-tupian",
    options: {
      hidden: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: "",
      tokenFunc: "",
      token: "",
      domain: "",
      disabled: false,
      min: 0,
      length: 8,
      multiple: false,
      isDelete: true,
      isEdit: true,
      action: "",
    },
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "fileupload",
    icon: "icon-tupian",
    options: {
      hidden: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: "",
      tokenFunc: "",
      token: "",
      domain: "",
      disabled: false,
      min: 0,
      length: 8,
      multiple: false,
      isDelete: true,
      isEdit: true,
      action: "",
    },
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "videoupload",
    icon: "icon-tupian",
    options: {
      hidden: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: "",
      tokenFunc: "",
      token: "",
      domain: "",
      disabled: false,
      min: 0,
      length: 8,
      multiple: false,
      isDelete: true,
      isEdit: true,
      action: "",
    },
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "camera",
    icon: "icon-tupian",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      placeholder: "",
      disabled: false,
      tips: "",
    },
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "buttonCom",
    icon: "icon-tupian",
    options: {
      hidden: false,
      width: "",
      defaultValue: "",
      required: false,
      placeholder: "",
      disabled: false,
    },
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
  {
    type: "alink",
    icon: "icon-tupian",
    options: {
      hidden: false,
      width: "",
      defaultValue: "",
      required: false,
      placeholder: "",
      disabled: false,
    },
    isRemote: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn false\n"
    +"}",
    url:"",
    data:"function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
    success: "function main (models,utils)"+"{\n"
    +"\t//models为当前表单所有model utils为扩展函数\n"
    +"\treturn {}\n"
    +"}",
  },
];

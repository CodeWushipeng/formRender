export const bankingComponents = [
  {
    type: "password",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "password",
      amountmoney: false,
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "againpassword",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "againpassword",
      confirm_field: "",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "amount",
    icon: "icon-input",
    options: {
      hidden: false,
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
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "input",
    icon: "icon-input",
    options: {
      hidden: false,
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "integer",
      pattern: "",
      placeholder: "",
      disabled: false,
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
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
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "textarea",
    icon: "icon-diy-com-textarea",
    options: {
      width: "100%",
      defaultValue: "",
      required: false,
      disabled: false,
      pattern: "",
      placeholder: "",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "radio",
    icon: "icon-radio-active",
    options: {
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
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "checkbox",
    icon: "icon-check-box",
    options: {
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
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "time",
    icon: "icon-time",
    options: {
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
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "date",
    icon: "icon-date",
    options: {
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
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "select",
    icon: "icon-select",
    options: {
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
          value: "Option 1",
        },
        {
          value: "Option 2",
        },
        {
          value: "Option 3",
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
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
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
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
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
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
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
      tips: "暂无提示信息",
    },
    hidden: "",
    condition: "",
    valueRange: "",
    assignment: "",
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "imageupload",
    icon: "icon-tupian",
    options: {
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
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "fileupload",
    icon: "icon-tupian",
    options: {
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
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
  {
    type: "videoupload",
    icon: "icon-tupian",
    options: {
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
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
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
      tips: "暂无提示信息",
    },
    remoteFactor: {
      isRemote: false,
      url: "",
      data: "",
      success: "",
    },
  },
];

export const basicComponents = [
  {
    type: 'input',
    icon: 'icon-input',
    options: {
      hidden: false,
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      tips:""
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'textarea',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '',
      tips:""
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'number',
    icon: 'icon-number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: ''
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'radio',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
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
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'checkbox',
    icon: 'icon-check-box',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
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
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'time',
    icon: 'icon-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'date',
    icon: 'icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'rate',
    icon: 'icon-pingfen1',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'color',
    icon: 'icon-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'select',
    icon: 'icon-select',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
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
    hidden:"",
    remoteCode: '',
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'switch',
    icon: 'icon-switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'slider',
    icon: 'icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
  },
  {
    type: 'text',
    icon: 'icon-wenzishezhi-',
    options: {
      defaultValue: 'This is a text',
      customClass: '',
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    remoteFactor:{
      isRemote: false,
      url:"",
      data:"",
      success: ""
    }
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
      min: 0,
      isEdit: false,
      action: 'https://jsonplaceholder.typicode.com/photos/'
    }
  },
  {
    type: 'editor',
    icon: 'icon-fuwenbenkuang',
    options: {
      defaultValue: '',
      width: ''
    }
  },
  {
    type: 'cascader',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
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
  }
]

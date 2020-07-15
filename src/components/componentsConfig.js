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
    isRemote: "",
    url:"",
    data:"",
    success: "",
    
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
      tips:""
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
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
      controlsPosition: ''
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
  },
  {
    type: 'radio',
    icon: 'icon-radio-active',
    options: {
      hidden: false,
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
    isRemote: "",
      url:"",
      data:"",
      success: "",
  },
  {
    type: 'checkbox',
    icon: 'icon-check-box',
    options: {
      hidden: false,
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
    isRemote: "",
      url:"",
      data:"",
      success: "",
  },
  {
    type: 'time',
    icon: 'icon-time',
    options: {
      hidden: false,
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
    isRemote: "",
      url:"",
      data:"",
      success: "",
  },
  {
    type: 'date',
    icon: 'icon-date',
    options: {
      hidden: false,
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
    isRemote: "",
      url:"",
      data:"",
      success: "",
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
      required: false
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
  },
  {
    type: 'color',
    icon: 'icon-color',
    options: {
      hidden: false,
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
    isRemote: "",
      url:"",
      data:"",
      success: "",
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
    remoteCode: '',
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
    url:"",
    data:"",
    success: ""
  },
  {
    type: 'switch',
    icon: 'icon-switch',
    options: {
      hidden: false,
      defaultValue: false,
      required: false,
      disabled: false,
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
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
      width: ''
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
  },
  {
    type: 'text',
    icon: 'icon-wenzishezhi-',
    options: {
      hidden: false,
      defaultValue: 'This is a text',
      customClass: '',
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
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
      hidden: false,
      defaultValue: '',
      width: ''
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
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
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    },
    hidden:"",
    enterCondition: '',
    condition:"",
    valueRange: '',
    assignment:"",
    isRemote: "",
      url:"",
      data:"",
      success: "",
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
      addFormId:'',
      editFormId: '',
      detailFormId: '',
      remoteFunc: function (currentObj, request, callBack){
        let tableData = [];
        return tableData;
      },
      addFn: function (currentObj, request, callBack) {
        let tableData = null;
        return tableData;
      },
      editFn: function (currentObj, request, callBack) {
        let tableData = null;
        return tableData;
      },
      detailFn: function (currentObj, request, callBack) {
        let tableData = [];
        return tableData;
      },
      deleteFn: function (currentObj, request, callBack) {
        let tableData = [];
        return tableData;
      },
      pagination:{
        pageSize:1,
        currentPage:1,
        pagerCount:5,
        total:0,
        handleSizeChange:function(page){
          debugger
          console.log(page)
        },
        handleCurrentChange: function (pageSize) {
          debugger
          console.log(pageSize)
        }
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

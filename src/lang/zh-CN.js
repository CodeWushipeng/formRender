export default {
  fm: {
    components: {
      nFields: {
        password: "密码",
        againpassword: "确认密码",
        amount: "金额",
        input: "数字",
        date: "日期",
        time: "时间",
        singletext: "文本",
        textarea: "多行文本",
        select: "下拉框",
        radio: "单选框",
        checkbox: "多选框",
        idencard: "身份证",
        readcard: "读卡",
        taglable: "标签",
        imageshow: "图片展示",
        imageupload: "图像上传",
        fileupload: "文件上传",
        videoupload: "影像集成",
        camera: "摄像头",
        buttonCom: "按钮",
        alink: "A 链接",
        frequency: "间隔周期",
      },
      fields: {
        input: "单行文本",
        textarea: "多行文本",
        number: "计数器",
        radio: "单选框组",
        checkbox: "多选框组",
        time: "时间选择器",
        date: "日期选择器",
        rate: "评分",
        color: "颜色选择器",
        select: "下拉选择框",
        switch: "开关",
        slider: "滑块",
        text: "文字",
        blank: "自定义区域",
        fileupload: "文件",
        imgupload: "图片",
        editor: "编辑器",
        cascader: "级联选择器",
        table: "子表单",
        grid: "栅格布局",
        tabs: "标签页",
        divider: "分割线",
        elTable: "表格",
      },
      banking: {
        title: "金融组件",
      },
      basic: {
        title: "基础字段",
      },
      advance: {
        title: "高级字段",
      },
      layout: {
        title: "布局字段",
      },
      table: {
        title: "表格字段",
      },
    },
    description: {
      containerEmpty: "从左侧拖拽来添加字段",
      configEmpty: "请添加字段",
      tableEmpty: "从左侧拖拽来添加字段",
      uploadJsonInfo:
        "JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可",
    },
    message: {
      copySuccess: "复制成功",
      validError: "表单数据校验失败",
      noPut: "不支持添加此字段",
      errorTip: "自定义错误提示",
    },
    actions: {
      import: "导入JSON",
      clear: "清空",
      preview: "预览",
      json: "生成JSON",
      formConfig: "表单设置",
      code: "生成代码",
      getData: "获取数据",
      reset: "重置",
      copyData: "复制数据",
      cancel: "取 消",
      confirm: "确 定",
      addOption: "添加选项",
      addColumn: "添加列",
      addTab: "添加标签",
      upload: "点击上传",
      add: "添加",
      undo: "撤销",
      redo: "重做",
    },
    config: {
      form: {
        title: "表单属性",
        labelPosition: {
          title: "标签对齐方式",
          left: "左对齐",
          right: "右对齐",
          top: "顶部对齐",
        },
        labelWidth: "表单标签宽度",
        size: "组件尺寸",
        customClass: "自定义Class",
      },
      common: {
        title: "高级属性",
        enterCondition: "进入条件",
        remoteCode: "字典值",
        condition: "离开条件", //新增离开条件
        assignment: "离开赋值", //新增离开赋值
        hidden: "隐藏条件", //新增隐藏条件
        valueRange: "取值范围", //新增取值范围
        remoteFactor: "外部条件访问", //新增控件访问外部条件
      },
      widget: {
        showTips: "提示信息", //新增是否显示提示信息
        title: "基础属性",
        model: "字段标识",
        name: "标题",
        width: "宽度",
        height: "高度",
        size: "大小",
        labelWidth: "标签宽度",
        hideLabel: "隐藏标签",
        custom: "自定义",
        placeholder: "占位内容",
        ifperipheral: "支持外设",
        cardType: "卡类型",
        spaceType: "间隔周期类型",
        textareaautosize: "高度自适应",
        textarealength: "最大字数",
        textarearowmin: "最小行数",
        textarearowmax: "最大行数",
        layout: "布局方式",
        block: "块级",
        inline: "行内",
        contentPosition: "文案位置",
        left: "左侧",
        right: "右侧",
        center: "居中",
        showInput: "显示输入框",
        min: "最小值",
        max: "最大值",
        step: "步长",
        multiple: "是否多选",
        filterable: "是否可搜索",
        allowHalf: "允许半选",
        showAlpha: "支持透明度选择",
        showLabel: "是否显示标签",
        option: "选项",
        staticData: "静态数据",
        remoteData: "远端数据",
        remoteFunc: "远端方法",
        value: "值",
        label: "标签",
        childrenOption: "子选项",
        defaultValue: "默认值",
        showType: "显示类型",
        isRange: "是否为范围选择",
        isTimestamp: "是否获取时间戳",
        startPlaceholder: "开始时间占位内容",
        endPlaceholder: "结束时间占位内容",
        format: "格式",
        limit: "最大上传数",
        isQiniu: "使用七牛上传",
        tokenFunc: "获取七牛Token方法",
        imageAction: "图片上传地址",
        tip: "提示说明文字",
        action: "上传地址",
        defaultType: "绑定数据类型",
        string: "字符串",
        object: "对象",
        array: "数组",
        number: "数字",
        boolean: "布尔值",
        integer: "整数",
        float: "浮点数",
        url: "URL地址",
        password: "密码",
        againpassword: "确认密码",
        pingLuConfigPop: "频率",
        qiXianConfigPop: "期限",
        pingLuConfigPop_zhouqi: "周期",
        iccard: "ic卡",
        magnetismcard: "磁卡",
        peripheral: "启用外设",
        buttontext: "文本内容",
        buttonicon: "图标",
        buttonfun: "调用函数",
        funname: "调用方法名",
        buttonurl: "调用url",
        imagesrc: "图片访问URL",
        email: "邮箱地址",
        hex: "十六进制",
        gutter: "栅格间隔",
        columnOption: "列配置项",
        span: "栅格值",
        justify: "水平排列方式",
        justifyStart: "左对齐",
        justifyEnd: "右对齐",
        justifyCenter: "居中",
        justifySpaceAround: "两侧间隔相等",
        justifySpaceBetween: "两端对齐",
        align: "垂直排列方式",
        alignTop: "顶部对齐",
        alignMiddle: "居中",
        alignBottom: "底部对齐",
        type: "风格类型",
        default: "默认",
        card: "选项卡",
        borderCard: "卡片化",
        tabPosition: "选项卡位置",
        top: "顶部",
        // left: '左侧',
        // right: '右侧',
        bottom: "底部",
        tabOption: "标签配置项",
        tabName: "标签名称",
        customClass: "自定义Class",
        attribute: "操作属性",
        dataBind: "数据绑定",
        readonly: "完全只读",
        disabled: "只读",
        hidden: "隐藏",
        editable: "文本框可输入",
        clearable: "显示清除按钮",
        arrowControl: "使用箭头进行时间选择",
        isDelete: "删除",
        isEdit: "编辑",
        showPassword: "显示密码",
        validate: "校验",
        required: "必填",
        patternPlaceholder: "填写正则表达式",
        newOption: "新选项",
        tab: "标签页",
        validatorRequired: "必须填写",
        validatorType: "格式不正确",
        validatorPattern: "格式不匹配",
        confirm_field: "确认字段",
        point: "小数点精度",
      },
      integerpara: {
        all: "全部", //全部
        pinteger: "正整数", //正整数
        pzinteger: "正整数+0", //正整数+0
        einteger: "负整数", //负整数
        ezinteger: "负整数+0", //负整数+0
        integerbits: "整数位位数",
        decimalbits: "小数位位数",
      },
    },
    upload: {
      preview: "预览",
      edit: "替换",
      delete: "删除",
    },
    tableEvent: {
      title: "表格事件",
      config: {},
    },
    tableWidget: {
      title: "表格属性",
      widget: {
        selectTableConfig: "选择已配置的表格",
        dataIdentification: "自定义数据来源",
        paginationConfig: "表格分页字段配置",
        pageSize: "每页显示条目个数",
        isPagination: "是否带有分页",
        yes: "是",
        no: "否",
      },
    },
  },
};

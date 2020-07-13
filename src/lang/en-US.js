export default {
  fm: {
    components: {
      fields: {
        input: 'Input',
        textarea: 'Textarea',
        number: 'Number',
        radio: 'Radio',
        checkbox: 'Checkbox',
        time: 'Time',
        date: 'Date',
        rate: 'Rate',
        color: 'Color',
        select: 'Select',
        switch: 'Switch',
        slider: 'Slider',
        text: 'Text',
        blank: 'Custom',
        fileupload: 'File',
        imgupload: 'Image',
        editor: 'Editor',
        cascader: 'Cascader',
        table: 'Sub-table',
        grid: 'Grid',
        tabs: 'Tabs',
        divider: 'Divider'
      },
      basic: {
        title: 'Basic Component',
      },
      advance: {
        title: 'Advance Component',
      },
      layout: {
        title: 'Layout',
      },
      table: {
        title: 'Table',
      }
    },
    description: {
      containerEmpty: 'You can drag and drop the item from the left to add components',
      configEmpty: 'Please add a component',
      tableEmpty: 'You can drag and drop the item from the left to add components',
      uploadJsonInfo: 'There is the format of JSON below，you can overwrite it with you own JSON code'
    },
    message: {
      copySuccess: 'Copy Successed',
      validError: 'Form data validation failed'
    },
    actions: {
      import: 'Import JSON',
      clear: 'Clear',
      preview: 'Preview',
      json: 'Generate JSON',
      code: 'Generate Code',
      getData: 'Get Data',
      reset: 'Reset',
      copyData: 'Copy Data',
      cancel: 'Cancel',
      confirm: 'Confirm',
      addOption: 'Add Option',
      addColumn: 'Add Column',
      addTab: 'Add Tab',
      upload: 'Upload',
      add: 'Add'
    },
    config: {
      form: {
        title: 'Form Attribute',
        labelPosition: {
          title: 'Label Position',
          left: 'Left',
          right: 'Right',
          top: 'Top'
        },
        labelWidth: 'Label Width',
        size: 'Size',
        customClass: 'Custom Class'
      },
      widget: {
        title: 'Component Attribute',
        model: 'ID',
        name: 'Name',
        width: 'Width',
        height: 'Height',
        size: 'Size',
        labelWidth: 'Label Width',
        custom: 'Custom',
        placeholder: 'Placeholder',
        layout: 'Layout',
        block: 'Block',
        inline: 'Inline',
        contentPosition: 'Content Position',
        left: 'Left',
        right: 'Right',
        center: 'Center',
        showInput: 'Display Input Box',
        min: 'Minimum',
        max: 'Maximum',
        step: 'Step',
        multiple: 'Multiple',
        filterable: 'Searchable',
        allowHalf: 'Allow Half',
        showAlpha: 'Support transparency options',
        showLabel: 'Show lable',
        option: 'Option',
        staticData: 'Static Data',
        remoteData: 'Remote Date',
        remoteFunc: 'Remote Function',
        value: 'Value',
        label: 'Label',
        childrenOption: 'Sub-Option',
        defaultValue: 'Default Value',
        showType: 'Display type',
        isRange: 'Range Time',
        isTimestamp: 'Get time stamp',
        startPlaceholder: 'Placeholder of start time',
        endPlaceholder: 'Placeholder of end time',
        format: 'Format',
        limit: 'Maximum Upload Count',
        isQiniu: 'Upload with Qiniu Cloud',
        tokenFunc: 'A funchtin to get Qiniu Uptoken',
        imageAction: 'Picture upload address',
        tip: 'Text Prompt',
        action: 'Upload Address',
        defaultType: 'Data Type',
        string: 'String',
        object: 'Object',
        array: 'Array',
        number: 'Number',
        boolean: 'Boolean',
        integer: 'Integer',
        float: 'Float',
        url: 'URL',
        email: 'E-mail',
        hex: 'Hexadecimal',
        gutter: 'Grid Spacing',
        columnOption: 'Column Configuration',
        span: 'Grid spans',
        justify: 'Horizontal Arrangement',
        justifyStart: 'Start',
        justifyEnd: 'End',
        justifyCenter: 'Center',
        justifySpaceAround: 'Space Around',
        justifySpaceBetween: 'Space Between',
        align: 'Vertical Arrangement',
        alignTop: 'Top',
        alignMiddle: 'Middle',
        alignBottom: 'Bottom',
        type: 'Type',
        default: 'Default',
        card: 'Tabs',
        borderCard: 'Border-Card',
        tabPosition: 'Tab Position',
        top: 'Tob',
        // left: 'Left',
        // right: 'Right',
        bottom: 'Bottom',
        tabOption: 'Label Configuration',
        tabName: 'Tab Name',
        customClass: 'Custom Class',
        attribute: 'Attribute Action',
        dataBind: 'Data Binding',
        hidden: 'Hidden',
        readonly: 'Read Only',
        disabled: 'Disabled',
        editable: 'Text box is editable',
        clearable: 'Display Clear Button',
        arrowControl: 'Use the arrow for time selection',
        isDelete: 'Deletable',
        isEdit: 'Editable',
        showPassword: 'Display Password',
        validate: 'Validation',
        required: 'Required',
        patternPlaceholder: 'Fill in the regular expressions',
        newOption: 'New Option',
        tab: 'Tab',
        validatorRequired: 'Required',
        validatorType: 'Invaild format',
        validatorPattern: 'Unmatched pattern'
      }
    },
    upload: {
      preview: 'preview',
      edit: 'replace',
      delete: 'delete'
    },
    tableEvent: {
      title: 'Table event',
      config: {

      }
    },
    tableWidget: {
      title: 'Table properties',
      widget: {
        selectTableConfig: 'select the configured table',
        dataIdentification: 'Data identification',
        paginationConfig: 'Table pagination',
        pageSize: "Page size",
        isPagination: 'Pagination',
        yes: 'Yes',
        no: 'No',
      }
    }
  }
}

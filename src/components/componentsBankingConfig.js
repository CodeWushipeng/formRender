export const bankingComponents = [
    {
        type: 'password',
        icon: 'icon-input',
        options: {
            hidden: false,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'password',
            amountmoney: false,
            pattern: '',
            placeholder: '',
            disabled: false,
            tips:"暂无提示信息"
        }
    },
    {
        type: 'againpassword',
        icon: 'icon-input',
        options: {
            hidden: false,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'againpassword',
            confirm_field: '',
            pattern: '',
            placeholder: '',
            disabled: false,
            tips:"暂无提示信息"
        }
    },
    {
        type: 'amount',
        icon: 'icon-input',
        options: {
            hidden: false,
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
            tips:"暂无提示信息"
        }
    },
    {
        type: 'input',
        icon: 'icon-input',
        options: {
            hidden: false,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'integer',
            pattern: '',
            placeholder: '',
            disabled: false,
            tips:"暂无提示信息"
        }
    },
    {
        type: 'singletext',
        icon: 'icon-input',
        options: {
            hidden: false,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'text',
            decimal: '',
            pattern: '',
            placeholder: '',
            disabled: false,
            tips:"暂无提示信息"
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
            placeholder: ''
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
            remoteFunc: ''
        }
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
            tips:"暂无提示信息"
        }
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
            tips:"暂无提示信息"
        }
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
            tips:"暂无提示信息"
        }
    },
    {
        type: 'imageupload',
        icon: 'icon-tupian',
        options: {
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
            action: ''
        }
    },
    {
        type: 'fileupload',
        icon: 'icon-tupian',
        options: {
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
            action: ''
        }
    },
    {
        type: 'videoupload',
        icon: 'icon-tupian',
        options: {
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
            action: ''
        }
    },
]



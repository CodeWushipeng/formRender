import { getDic } from '@/api/forms'
import { RES_OK } from '@/api/config'
let itemHandle = {
  data() {
    return {
      checkIndex: 0,
      selectStatu: false,
      cascaderData: []
    }
  },
  methods: {
    // 组件聚焦事件获取model
    comFocus() {
      if (
        this.widget.type == 'password' ||
        this.widget.type == 'againpassword'
      ) {
        if (
          this.widget.options.peripheral &&
          this.widget.options.peripheral == true
        ) {
          this.peripheral()
        }
      }
      if (this.widget.type === 'frequency') {
        this.frequencyVisible = true
      }
      if (this.widget.type === 'date' && this.widget.options.editable) {
        // this.dateShow()
      }
      this.$emit('el-focus', this.widget.model, this.widget.type)
    },
    // 组件失去焦点事件
    comBlur() {
      this.$emit('el-blur', this.widget.model, this.widget.type)
    },
    // 回车事件
    change() {
      this.$emit('el-change', this.widget.model, this.widget)
    },
    // radio组件change事件
    valueChange() {
      if (this.widget.type === 'frequency') {
        if (this.frequencyNum && this.frequencyUnit) {
          this.dataModel = this.frequencyNum + this.frequencyUnit
        } else {
          this.dataModel = ''
        }
      }
      this.$emit('radio-change', this.widget.model)
    },
    // select组件回车抬起事件
    selectChange() {
      //如果是非必填项回车时直接离开
      // if (!this.widget.options.required) {
      //   this.$refs[this.widget.model].blur();
      //   this.$emit("el-change", this.widget.type);
      // } else {
      //   if (this.widget.options.filterable) {
      //     this.$refs[this.widget.model].blur();
      //     this.$emit("el-change", this.widget.type);
      //   } else {
      //     debugger
      //     if (this.selectStatu) {
      //       this.$refs[this.widget.model].blur();
      //     } else {
      //       this.$emit("el-change", this.widget.type);
      //     }
      //   }
      // }
      if (this.widget.options.filterable) {
        this.$refs[this.widget.model].blur()
        this.$emit('el-change', this.widget.model, this.widget.type)
      } else {
        if (this.selectStatu) {
          // this.$refs[this.widget.model].blur();
        } else {
          this.$emit('el-change', this.widget.model, this.widget.type)
        }
      }
    },
    // select组件空格事件
    showOptions() {
      if (!this.widget.options.filterable) {
        this.$refs[this.widget.model].toggleMenu()
      }
    },
    // 下拉选择选项显示状态
    optionStatu(params) {
      this.selectStatu = params
      this.$emit('remove', params)
      if (params) {
        // 下拉选择框用作级联组件处理
        if (this.widget.isCascader) {
          let father = this.widget.fatherModel && this.widget.fatherModel
          let fatherData = this.models[father]
          let reqData, resFunc
          try {
            reqData = eval('(' + this.widget.requestData + ')')()
            resFunc = eval('(' + this.widget.requestData + ')')
          } catch (error) {
            throw new Error(error)
          }

          let postData = Object.assign(
            {},
            { itemParentCode: fatherData },
            reqData
          )
          console.log(reqData, postData)
          if (this.widget.cascaderUrl) {
            getDic(this.widget.cascaderUrl, {
              body: postData,
              // header: {
              //   pageIndex: 1,
              //   pageSize: 999,
              //   gloSeqNo: new Date(),
              //   reqSeqNo: 'sit anim',
              //   reqTime: 'officia ad anim',
              // }
              header: {
                antiWeightSeqNo: 'pariatur d',
                gloSeqNo: 'culpa dolor ',
                pageIndex: 2,
                pageSize: 10,
                projectId: 'incididunt',
                reqSeqNo: 'in et',
                reqTime: 'in esse reprehen',
                serviceGroupid: 'eiusmod in magna',
                serviceId: 'cupidatat',
                serviceName: 'esse qui occaecat enim aute',
                subProjectId: 'enim',
                userInfo: {
                  role: [
                    'magna officia pariatur ut ipsum',
                    'labore sit',
                    'adipisicing Ut sunt aliqua',
                    'Ut Duis dolore tempor dolor'
                  ],
                  username: 'in mollit'
                }
              }
            })
              .then(res => {
                console.log(res)
                if (res.header.rspCode == RES_OK) {
                  this.$notify({
                    title: 'Success',
                    message: '查询成功',
                    type: 'success',
                    duration: 2000
                  })
                } else if (res.header.rspCode == FAIL_CODE) {
                  this.$notify({
                    title: 'fail',
                    message: '查询失败',
                    type: 'info',
                    duration: 2000
                  })
                  return
                }
                debugger
                let cascaderData = JSON.stringify(res.body.options)
                localStorage.setItem('cascaderData', cascaderData)
                let tempArr = res.body.options
                let resultArr = []
                tempArr.forEach(item => {
                  let tempJson = {
                    value: '',
                    label: ''
                  }
                  tempJson.label = item.label
                  tempJson.value = item.value
                  resultArr.push(tempJson)
                })
                console.log(tempArr, resultArr)
                this.widget.options.options = resultArr
                try {
                  resFunc(res, this.$parent.utils)
                } catch (error) {
                  throw new Error('级联选择出口数据解析出错')
                }
              })
              .catch(error => console.log(error))
          } else {
            debugger
            let fatherModel = this.widget.fatherModel
            let fatherData = this.models[fatherModel]
            let resultArr = []
            let cascaderData = JSON.parse(localStorage.getItem('cascaderData'))
            let fatherList
            fatherList= this.getDicFloor(cascaderData ,fatherData)
            fatherList.forEach(item => {
              let tempJson = {
                value: '',
                label: ''
              }
              tempJson.label = item.label
              tempJson.value = item.value
              resultArr.push(tempJson)
            })
            this.widget.options.options = resultArr
          }
        }
      }
    },
    // 递归获取当前字典项层级
    getDicFloor(target,search) {
      debugger
      var result
      for (let index = 0; index < target.length; index++) {
        if (target[index].value == search || !target[index].children) {
          if (target[index].children) {
            result = target[index].children
          }
          return result
        }else{
          return this.getDicFloor(target[index].children, search)
        }
      }
    },
    // date选择器失去焦点事件
    dateBlur() {
      // this.widget.options.editable = false;
      this.$emit('date-blur', this.widget.model, this.widget)
    },
    dateShow() {
      // this.$refs[this.widget.model].handleFocus()
      // this.widget.options.editable = true
    },
    pickShow(params) {
      console.log('pickShowpickShowpickShowpickShowpickShowpickShow', params)
      this.$emit('remove', params)
    },
    // 多选框键盘上下键事件
    checkUp() {
      let name = '.' + this.widget.model + ' input'
      let checks = document.querySelectorAll(name)
      for (let i = this.checkIndex; i >= 0; i--) {
        if (i == 0) {
          return
        }
        this.checkIndex--
        checks[this.checkIndex].focus()
        break
      }
    },
    checkDown() {
      let name = '.' + this.widget.model + ' input'
      let checks = document.querySelectorAll(name)
      for (let i = this.checkIndex; i < checks.length; i++) {
        if (i == checks.length - 1) {
          return
        }
        this.checkIndex++
        checks[this.checkIndex].focus()
        break
      }
    }
  }
}
export default itemHandle

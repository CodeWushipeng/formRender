let itemHandle = {
  data() {
    return {
      checkIndex: 0,
    };
  },
  methods: {
    // 组件聚焦事件获取model
    comFocus(e) {
      if (
        this.widget.type == "password" ||
        this.widget.type == "againpassword"
      ) {
        if (
          this.widget.options.peripheral &&
          this.widget.options.peripheral == true
        ) {
          this.peripheral();
        }
      }
      this.$emit("el-focus", this.widget.model);
    },
    // 组件失去焦点事件
    comBlur(e) {
      console.log("失去焦点");
      this.$emit("el-blur", this.widget.model);
    },
    // element change事件，回车和失去焦点时触发
    change(e) {
      console.log(this.widget);
      // 出发change事件时发射 el-change事件，generateform组件监听该事件
      this.$emit("el-change", this.widget);
    },
    // radio组件change事件
    valueChange() {
      this.$emit("radio-change", this);
    },
    // select组件回车抬起事件
    selectChange() {
      if (this.selectStatu) {
        this.$refs[this.widget.model].blur();
      } else {
        this.$emit("el-change", this);
      }
      // this.$emit("el-change", this);
    },
    // select组件空格事件
    showOptions() {
      this.$refs[this.widget.model].toggleMenu();
    },
    // 下拉选择选项显示状态
    optionStatu(params) {
      this.selectStatu = params;
      if (params) {
        // 下拉选择框用作级联组件处理
        if (this.widget.isCascader) {
          let father = this.widget.fatherModel && this.widget.fatherModel;
          let fatherData = this.models[father];
          let reqData = eval("(" + this.widget.requestData + ")")();
          let postData = Object.assign(
            {},
            { itemParentCode: fatherData },
            reqData
          );
          console.log(reqData, postData);
          request
            .post("/dev-api" + this.widget.cascaderUrl, {
              body: postData,
              header: {
                pageIndex: 1,
                pageSize: 999,
                gloSeqNo: new Date(),
                reqSeqNo: "sit anim",
                reqTime: "officia ad anim",
              },
            })
            .then((res) => {
              console.log(res);
              if (res.header.rspCode == RES_OK) {
                this.$notify({
                  title: "Success",
                  message: "查询成功",
                  type: "success",
                  duration: 2000,
                });
              } else if (res.header.rspCode == FAIL_CODE) {
                this.$notify({
                  title: "fail",
                  message: "查询失败",
                  type: "info",
                  duration: 2000,
                });
                return;
              }
              let tempArr = res.body.dics.records;
              let resultArr = [];
              tempArr.forEach((item) => {
                let tempJson = {
                  value: "",
                  label: "",
                };
                tempJson.label = item.itemValue;
                tempJson.value = item.itemCode;
                resultArr.push(tempJson);
              });
              console.log(tempArr, resultArr);
              this.widget.options.options = resultArr;
            })
            .catch((error) => console.log(error));
        }
      }
    },
    // date选择器失去焦点事件
    dateBlur() {
      console.log("date选择器失去焦点事件");
      this.$emit("date-blur");
    },
    // 多选框键盘上下键事件
    checkUp() {
      this.$emit("check-handle", this.widget);
      let name = "." + this.widget.model + " input";
      let checks = document.querySelectorAll(name);
      for (let i = this.checkIndex; i >= 0; i--) {
        if (i == 0) {
          return;
        }
        this.checkIndex--;
        checks[this.checkIndex].focus();
        break;
      }
    },
    checkDown() {
      this.$emit("check-handle", this.widget);
      let name = "." + this.widget.model + " input";
      let checks = document.querySelectorAll(name);
      for (let i = this.checkIndex; i < checks.length; i++) {
        if (i == checks.length - 1) {
          return;
        }
        this.checkIndex++;
        checks[this.checkIndex].focus();
        break;
      }
    },
  },
};
export default itemHandle
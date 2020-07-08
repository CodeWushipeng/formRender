let handlers = {
  data() {
    return {
      renderModels: {},
    };
  },
  methods: {
    // eval封装
    evalWrap(targetEval) {
      if (!targetEval) {
        return;
      }
      let result;
      if (targetEval.indexOf("function") != -1) {
        try {
          let tempFunc = eval("(" + targetEval + ")");
          result = tempFunc(this.renderModels);
        } catch (error) {
          throw new Error(error);
        }
      } else if (
        targetEval.indexOf("function") == -1 &&
        targetEval.indexOf("if") != -1
      ) {
        let tmpFunc = new Function(targetEval);
        try {
          result = tmpFunc.call(this);
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          result = eval(targetEval);
        } catch (error) {
          throw new Error(error);
        }
      }
      return result;
    },
    // 隐藏
    handelHidden(item) {
      if (item.hidden && item.hidden != "") {
        let flag = this.evalWrap(item.hidden);
        if (flag) {
          item.options.hidden = true;
        } else {
          item.options.hidden = false;
        }
      }
    },
    getModels(item) {
      this.$set(this.renderModels, item.model, item.options.defaultValue);
      console.log(this.renderModels);
    },
    // 进入条件检测
    enterCheck(cloInItem) {
      if (cloInItem.enterCondition && cloInItem.enterCondition != "") {
        let condition = this.evalWrap(cloInItem.enterCondition);
        if (condition) {
          cloInItem.options.disabled = false;
        } else {
          cloInItem.options.disabled = true;
        }
      }
    },
    // 获取组件数据
    tranData(data) {
      data.list.forEach((item) => {
        if (item.type === "grid") {
          item.columns.forEach((cloItem) => {
            cloItem.list.forEach((cloInItem) => {
              this.getModels(cloInItem);
              this.handelHidden(cloInItem)
              this.enterCheck(cloInItem)
            });
          });
        } else {
          this.getModels(item);
          this.handelHidden(item)
          this.enterCheck(item)
        }
      });
    },
  },
};
export default handlers;

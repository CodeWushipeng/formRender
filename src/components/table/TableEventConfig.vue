<template>
  <div v-if="show">
    <el-form label-position="top">
      <!-- 增加 -->
      <el-form-item label-width="100px" label="添加新增按钮">
        <el-radio-group v-model="data.options.isAddBtn">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="data.options.isAddBtn" label="新增方法">
        <el-checkbox v-model="data.options.isAddBtnCustom" >自定义新增按钮事件</el-checkbox>
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          :disabled="!data.options.isAddBtnCustom"
          @focus="handelMirror('add')"
          v-model="data.options.addFn"
          placeholder="新增方法"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="data.options.isAddBtn" label="新增数据表单编码">
        <el-input
          style="text-overflow: ellipsis;"
          :disabled="data.options.isAddBtnCustom"
          v-model="data.options.addFormId"
          placeholder="表单编码"
        ></el-input>
      </el-form-item>
       <!-- 双击查看详情 -->
       <el-form-item label-width="100px" label="双击查看详情">
        <el-radio-group v-model="data.options.isDetail">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="data.options.isDetail" label="详情方法">
        <el-checkbox v-model="data.options.isDetailCustom" >自定义双击查看详情事件</el-checkbox>
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          :disabled="!data.options.isDetailCustom"
          @focus="handelMirror('detail')"
          v-model="data.options.detailFn"
          placeholder="详情方法"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="data.options.isDetail" label="数据详情表单编码">
        <el-input
          style="text-overflow: ellipsis;"
           :disabled="data.options.isDetailCustom"
          v-model="data.options.detailFormId"
          placeholder="表单编码"
        ></el-input>
      </el-form-item>
      <!-- 编辑 -->
      <el-form-item label-width="100px" label="添加编辑按钮">
        <el-radio-group v-model="data.options.isEditBtn">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="data.options.isEditBtn" label="编辑方法">
        <el-checkbox v-model="data.options.isEditBtnCustom" >自定义编辑按钮事件</el-checkbox>
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          :disabled="!data.options.isEditBtnCustom"
          @focus="handelMirror('edit')"
          v-model="data.options.editFn"
          placeholder="编辑方法"
        ></el-input>
      </el-form-item>
       <el-form-item v-if="data.options.isEditBtn" label="编辑数据表单编码">
        <el-input
          :disabled="data.options.isEditBtnCustom"
          style="text-overflow: ellipsis;"
          v-model="data.options.editFormId"
          placeholder="表单编码"
        ></el-input>
      </el-form-item>
      <!-- 删除 -->
      <el-form-item label-width="100px" label="添加删除按钮">
        <el-radio-group v-model="data.options.isDeleteBtn">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="data.options.isDeleteBtn" label="删除方法">
        <el-checkbox v-model="data.options.isDeleteBtnCustom" >自定义删除按钮事件</el-checkbox>
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          :disabled="!data.options.isDeleteBtnCustom"
          @focus="handelMirror('delete')"
          v-model="data.options.deleteFn"
          placeholder="删除方法"
        ></el-input>
      </el-form-item>
      <!-- 列显示/隐藏控制按钮 -->
      <el-form-item label-width="100px" label="添加列显示/隐藏控制按钮">
        <el-radio-group v-model="data.options.isDisplayColumnBtn">
          <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
          <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <cus-dialog
      :visible="mirrorVisible"
      @on-close="closeMirror"
      @on-submit="getCodeData"
      ref="tableEventCode"
      width="800px"
      form
    >
      <codemirror
        ref="tableCm"
        v-model="tableEventCodeCf.tableCodeFn"
        :options="tableEventCodeCf.cmOptions"
      ></codemirror>
    </cus-dialog>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import request from "../../util/request";
import CusDialog from "../CusDialog";

export default {
  components: {
    Draggable,
    CusDialog
  },
  props: ["data"],
  data() {
    return {
      mirrorVisible:false,
      tableEventCodeCf: {
        cmOptions: {
          tabSize: 4,
          mode: "javascript",
          theme: "monokai",
          lineNumbers: true,
          smartIndent: true,
          autofocus: true,
          styleActiveLine: true,
          scrollbarStyle: "overlay",
          lineWrapping: true,
          spellcheck: true,
          autocorrect: true,
          indentUnit: 2,
          line: true
        },
        tableCodeFn: "",
        codeType: ""
      }
    };
  },
  mounted() {
    console.log(this.data);
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    // codeMirror弹出函数
    handelMirror(type) {
      this.mirrorVisible = true
      this.tableEventCodeCf.codeType = type;
      if (type == "add") {
        this.tableEventCodeCf.tableCodeFn = this.data.options.addFn
         
      } else if (type == "detail") {
        this.tableEventCodeCf.tableCodeFn = this.data.options.detailFn
          
      } else if (type == "edit") {
        this.tableEventCodeCf.tableCodeFn = this.data.options.editFn
      }else if (type == "delete") {
        this.tableEventCodeCf.tableCodeFn = this.data.options.deleteFn
      }
    },

    getCodeData() {
      let type = this.tableEventCodeCf.codeType;
      let temFen = "";

      try {
        temFen = eval("(" + this.tableEventCodeCf.tableCodeFn + ")");
      } catch (e) {
        console.log(e);
        this.$notify({
          title: "fail",
          message: "语法错误",
          type: "success",
          duration: 2000
        });
        return;
      }
      if (type == "add") {
        if (this.data.options && this.data.options.addFn) {
          this.data.options.addFn = temFen;
        }
      } else if (type == "edit") {
         if (this.data.options && this.data.options.editFn) {
          this.data.options.editFn = temFen;
        }
      } else if (type == "detail") {
         if (this.data.options && this.data.options.detailFn) {
          this.data.options.detailFn = temFen;
        }
      }else if (type == "delete") {
         if (this.data.options && this.data.options.deleteFn) {
          this.data.options.deleteFn = temFen;
        }    
      }
      this.mirrorVisible = false;
    },
    
    //关闭code窗口
    closeMirror(val) {
     this.mirrorVisible = false
    }
  }
};
</script>

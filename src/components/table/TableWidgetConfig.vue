<template>
  <div v-if="show">
    <el-form label-position="top">
      <template>
        <el-form-item :label="$t('fm.config.widget.model')">
          <el-input v-model="data.model"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.tableWidget.widget.selectTableConfig')">
          <el-input v-model="data.tableName" size="mini" @focus="getTableListData"></el-input>
        </el-form-item>
        <!-- <el-form-item
            label="表格编码"
          >
            <el-input v-model="tableCode" size="mini" @focus="getTableListData">
            </el-input>
        </el-form-item>-->
        <el-form-item :label="$t('fm.config.widget.name')">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="操作属性">
          <el-checkbox v-model="data.options.hidden">隐藏</el-checkbox>
        </el-form-item>
        <el-form-item label="隐藏条件">
          <el-input readonly @focus="openCode('hidden')" placeholder="隐藏条件" v-model="data.hidden"></el-input>
        </el-form-item>
        <div v-if="data.tableName != ''">
          <el-form-item :label="$t('fm.tableWidget.widget.dataIdentification')">
            <el-input
              v-model="data.options.remoteFunc"
              size="mini"
              @focus="openCode('tableRemotFun')"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('fm.tableWidget.widget.isPagination')+':'">
            <el-radio-group v-model="data.options.isPagination">
              <el-radio-button :label="false">{{$t('fm.tableWidget.widget.no')}}</el-radio-button>
              <el-radio-button :label="true">{{$t('fm.tableWidget.widget.yes')}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <div v-if="data.options.isPagination">
            <el-form-item label-width="100px" label="每页条目个数">
              <el-input
                type="number"
                min="0"
                v-model.number="data.options.pagination.pageSize"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="当前页改变的方法">
              <el-input
                style="text-overflow: ellipsis;"
                readonly
                @focus="openCode('handleCurrentChange')"
                v-model="data.options.pagination.handleCurrentChange"
                placeholder="当前页改变的方法"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <el-dialog :visible.sync="dialogTableVisible">
          <div style="display:flex;marginBottom:20px;">
            <el-input
              style="width:200px"
              placeholder="请输入内容"
              v-model="tablePageCf.searchValue"
              clearable
            ></el-input>
            <el-button
              type="primary"
              style="marginLeft:20px"
              @click="getTableListData"
              icon="el-icon-search"
            >搜索</el-button>
            <el-button
              type="primary"
              style="marginLeft:20px"
              @click="emitAddTable"
              icon="el-icon-circle-plus-outline"
            >新增表格</el-button>
          </div>
          <el-table
            ref="selectTable"
            :data="tablePageCf.tablesCfData"
            border
            tooltip-effect="dark"
            @row-click="handleSelectionRow"
          >
            <el-table-column fixed prop="listCode" label="表格唯一编码" width="150"></el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="150"></el-table-column>
            <el-table-column prop="listType" label="表格类型" width="150"></el-table-column>
            <el-table-column fixed prop="listName" label="表格名称" width="150"></el-table-column>
            <el-table-column prop="listDesc" label="表格描述"></el-table-column>
          </el-table>
          <el-pagination
            style="marginTop:20px"
            background
            layout="prev, pager, next"
            :total="tablePageCf.total"
            :page-size="tablePageCf.pageSize"
            :current-page="tablePageCf.startPage"
            @current-change="handleTableCfCurrentChange"
          ></el-pagination>
        </el-dialog>
        <cus-dialog
          :visible="mirrorVisible"
          @on-close="closeMirror"
          @on-submit="getCodeData"
          ref="tableeditCode"
          width="800px"
          form
        >
          <codemirror
            ref="tableCm"
            v-model="tableCodeCf.tableCodeFn"
            :options="tableCodeCf.cmOptions"
          ></codemirror>
        </cus-dialog>
      </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { deepClone,dateFormat } from '../../util/index'
import CusDialog from '../CusDialog'
import { getTableList } from '../../api/forms'

export default {
  components: {
    Draggable,
    CusDialog
  },
  props: ['data'],
  data() {
    return {
      tableRemotFun: '',
      dialogTableVisible: false,
      mirrorVisible: false,
      tablePageCf: {
        startPage: 1,
        pageSize: 5,
        total: 0,
        searchValue: '',
        tablesCfData: []
      },
      tableCodeCf: {
        cmOptions: {
          tabSize: 4,
          mode: 'javascript',
          theme: 'monokai',
          lineNumbers: true,
          smartIndent: true,
          autofocus: true,
          styleActiveLine: true,
          // scrollbarStyle: 'overlay',
          lineWrapping: true,
          spellcheck: true,
          autocorrect: true,
          indentUnit: 2,
          line: true
        },
        tableCodeFn: '',
        codeType: ''
      }
    }
  },
  created() {
    /*this.$nextTick(()=>{
            this.valiatePattern("/^\\d+$/" )
        })*/
    if (this.data && this.data.configdata.list[0]) {
      this.data.tableName = this.data.configdata.list[0].name
    }
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  mounted() {
    console.log(this.data)
  },
  methods: {
    // codeMirror弹出函数
    openCode(type) {
      this.mirrorVisible = true
      this.tableCodeCf.codeType = type
      if (type == 'handleCurrentChange') {
        this.tableCodeCf.tableCodeFn = this.data.options.pagination.handleCurrentChange
      } else if (type == 'tableRemotFun') {
        this.tableCodeCf.tableCodeFn = this.data.options.remoteFunc
      } else if (type == 'hidden') {
        this.tableCodeCf.tableCodeFn = this.data.hidden
      }
    },
    closeMirror() {
      this.mirrorVisible = false
    },
    getCodeData() {
      let type = this.tableCodeCf.codeType
      let temFen = ''

      try {
        temFen = eval('(' + this.tableCodeCf.tableCodeFn + ')')
      } catch (e) {
        console.log(e)
        this.$notify({
          title: 'fail',
          message: '语法错误',
          type: 'success',
          duration: 2000
        })
        return
      }
      if (type == 'handleCurrentChange') {
        this.data.options.pagination.handleCurrentChange = this.tableCodeCf.tableCodeFn
      } else if (type == 'tableRemotFun') {
        if (this.data.options && this.data.options.remoteFunc) {
          this.data.options.remoteFunc = this.tableCodeCf.tableCodeFn
          // temFen(this.data.options);
        }
      } else if (type == 'hidden') {
        this.data.hidden = this.tableCodeCf.tableCodeFn
      }
      this.mirrorVisible = false
    },
    // 分页查询
    handleTableCfCurrentChange(val) {
      this.tablePageCf.startPage = val
      this.getTableListData()
    },
    // 获取表格已经配置的表格信息
    getTableListData() {
      this.dialogTableVisible = true
      getTableList({
        listName: this.tablePageCf.searchValue,
      })
        .then((res) => {
          console.log(res)
          if (
            res.header
              ? res.header.rspCode == 'SP000000'
              : res.rspCode == 'SP000000'
          ) {
            this.$notify({
              title: 'Success',
              message: '查询成功',
              type: 'success',
              duration: 2000
            })
          } else if (
            res.header
              ? res.header.rspCode == '99999999'
              : res.rspCode == '99999999'
          ) {
            this.$notify({
              title: 'fail',
              message: '查询失败',
              type: 'info',
              duration: 2000
            })
            return
          }
          this.tablePageCf.tablesCfData = res.body
            ? res.body.define.records
            : res.define.records
          this.tablePageCf.total = res.body
            ? res.body.define.total
            : res.define.total
          this.tablePageCf.pageSize = res.body
            ? res.body.define.size
            : res.define.size
        })
        .catch((error) => console.log(error))
    },
    // 发射新增表格事件
    emitAddTable() {
      this.$emit('addTable')
    },
    handleSelectionRow(row, column, event) {
      let temTableCfg = deepClone(row)
      this.data.configdata = JSON.parse(temTableCfg.listContent)
      this.handleDisplayColumns(this.data.configdata)
      this.data.tableName =
        temTableCfg.listName + '(' + temTableCfg.listCode + ')'
      this.data.tableCode = temTableCfg.listCode
      this.dialogTableVisible = false
      this.tableCodeCf.tableCodeFn =
        'function mian(currentObj, request, callBack) {;}'
    },
    handleDisplayColumns(configdata) {
      if (configdata && configdata.list[0]) {
        let columns = configdata.list[0].options.columns
        let displayColumns = []
        columns.forEach((item) => {
          if (item.isDisplay) {
            displayColumns.push(item.prop)
          }
          if (typeof item.formatter == 'string') {
            item.formatter = eval('(' + item.formatter + ')')
          }
        })
        this.data.options.displayColumns = displayColumns
      }
    }
  },
  watch: {
    'data.options.isPagination': function (val) {}
  }
}
</script>

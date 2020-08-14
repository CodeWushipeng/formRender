<template>
  <div v-if="show">
    <el-form
      label-position="top"
      v-show="data.type !='grid' && data.type !=='imageshow' && data.type !=='imageupload' && data.type !=='fileupload' && data.type !=='videoupload' && data.type !=='divider' && data.type !=='blank'"
    >
      <!-- 字典服务 -->
      <el-form-item :label="$t('fm.config.common.remoteCode')" v-if="data.type == 'select'">
        <el-input
          size="mini"
          v-model="data.remoteCode"
          readonly="readonly"
          @focus="getData(data.remoteCode)"
        >
          <!-- <el-button slot="append" @click="getData(data.remoteCode)">查询</el-button> -->
        </el-input>
        <el-dialog :visible.sync="dialogTableVisible" :close-on-click-modal="false">
          <div style="display:flex;marginBottom:20px;">
            <el-input style="width:200px" placeholder="请输入内容" v-model="value" clearable></el-input>
            <el-button
              type="primary"
              style="marginLeft:20px"
              @click="search"
              icon="el-icon-search"
              :disabled="!value"
            >搜索</el-button>
          </div>
          <el-table :data="gridData" border @row-dblclick="setData">
            <!-- <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="setData(scope.row)" type="text">赋值</el-button>
              </template>
            </el-table-column>-->
            <el-table-column property="dicName" label="选项代码"></el-table-column>
            <el-table-column property="itemValue" label="选项名称"></el-table-column>
            <el-table-column property="itemCode" label="选项值"></el-table-column>
          </el-table>
          <el-pagination
            style="marginTop:20px"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="startPage"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-dialog>
      </el-form-item>
      <!-- 取值范围 -->
      <el-form-item :label="$t('fm.config.common.valueRange')" v-if="data.type != 'grid'">
        <el-input v-model="data.valueRange" placeholder="取值范围"></el-input>
      </el-form-item>
      <!-- 提示信息 -->
      <el-form-item label="提示信息" v-if="data.type != 'grid'">
        <el-input v-model="data.options.tips" placeholder="提示信息"></el-input>
      </el-form-item>
      <!-- 是否隐藏 -->
      <el-form-item :label="$t('fm.config.common.hidden')" v-if="data.type != 'grid'">
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.hidden"
          placeholder="隐藏条件"
        ></el-input>
      </el-form-item>
      <!-- 进入条件 -->
      <el-form-item :label="$t('fm.config.common.enterCondition')" v-if="data.type != 'grid'">
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.enterCondition"
          placeholder="进入条件"
        ></el-input>
      </el-form-item>
      <!-- 离开条件 -->
      <el-form-item :label="$t('fm.config.common.condition')" v-if="data.type != 'grid'">
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.condition"
          placeholder="离开条件"
        ></el-input>
      </el-form-item>
      <!-- 错误提示 -->
      <!-- <el-form-item
        label="错误提示"
        v-if="data.type != 'grid'"
      >
        <el-input
          v-model="data.conditionError"
          placeholder="离开条件错误提示"
        >
        </el-input>
      </el-form-item>-->
      <!-- 离开赋值 -->
      <el-form-item :label="$t('fm.config.common.assignment')" v-if="data.type != 'grid'">
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.assignment"
          placeholder="离开赋值"
        ></el-input>
      </el-form-item>
      <!-- 外部条件访问 -->

      <el-form-item :label="$t('fm.config.common.remoteFactor')" v-if="data.type != 'grid'">
        <!-- <el-button @click="handelMirror">点击配置外部条件访问</el-button> -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="单条件访问" name="first">
            <el-input
              v-model="data.isRemote"
              placeholder="启动条件"
              style="margin-bottom:15px;text-overflow: ellipsis;"
              @focus="handelMirror"
              readonly
            >
              <template slot="prepend">启动条件</template>
            </el-input>
            <el-input
              v-model="data.url"
              placeholder="校验地址"
              style="margin-bottom:15px;text-overflow: ellipsis;"
              @focus="handelMirror"
              readonly
            >
              <template slot="prepend">URL</template>
            </el-input>
            <el-input
              style="text-overflow: ellipsis;margin-bottom:15px"
              readonly
              @focus="handelMirror"
              v-model="data.data"
              placeholder="入口数据"
            >
              <template slot="prepend">入口数据</template>
            </el-input>
            <!-- <el-input
              style="text-overflow: ellipsis;margin-bottom:15px"
              v-model="data.tableModel"
              placeholder="表格字段标识"
            >
              <template slot="prepend">表格字段标识</template>
            </el-input>-->
            <el-input
              style="text-overflow: ellipsis;margin-bottom:15px"
              v-model="data.tableKey"
              placeholder="表格表单标识"
            >
              <template slot="prepend">表格表单标识</template>
            </el-input>
            <!-- <el-input
          style="text-overflow: ellipsis;margin-bottom:15px"
          v-model="data.tableCode"
          placeholder="表格数据标识"
        >
          <template slot="prepend">表格数据标识</template>
            </el-input>-->
            <el-input
              style="text-overflow: ellipsis;"
              readonly
              @focus="handelMirror"
              v-model="data.success"
              placeholder="出口数据"
            >
              <template slot="prepend">出口数据</template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="多条件访问" name="second">
            <el-form-item>
              <span style="margin-right:10px">开启多外部条件</span>
              <el-switch v-model="data.multiToggle"></el-switch>
            </el-form-item>
            <el-input
              style="text-overflow: ellipsis;"
              readonly
              @focus="handelMirror"
              v-model="data.multiCondition"
              placeholder="多个外部条件访问"
            ></el-input>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import request from '../util/request'
import { RES_OK, FAIL_CODE } from '@/api/config'
import { getDicTwo } from '@/api/forms'
export default {
  components: {
    Draggable
  },
  props: ['data'],
  data() {
    return {
      dialogTableVisible: false,
      activeName: 'first',
      startPage: 1,
      pageSize: 10,
      total: 0,
      value: '',
      gridData: []
    }
  },
  mounted() {
    console.log(this.data)
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    // codeMirror弹出函数
    handelMirror(e) {
      console.log(this.data)
      this.$emit('mirror', this.data, e.target.placeholder)
    },
    // 分页查询
    handleCurrentChange(val) {
      this.startPage = val
      this.search()
    },
    // 获取字典服务数据
    getData(data) {
      if (this.dialogTableVisible) {
        return
      }
      if (this.data.remoteCode) {
        getDicTwo({
          body: {
            dicName: this.data.remoteCode,
            selType: 2
          },
          header: {
            pageIndex: this.startPage,
            pageSize: 10,
            gloSeqNo: new Date(),
            reqSeqNo: 'sit anim',
            reqTime: 'officia ad anim'
          }
        })
          .then((res) => {
            console.log(res)
            if (res.header && res.header.rspCode == RES_OK) {
              this.$notify({
                title: 'Success',
                message: '查询成功',
                type: 'success',
                duration: 2000
              })
            } else if (res.header && res.header.rspCode == FAIL_CODE) {
              this.$notify({
                title: 'fail',
                message: '查询失败',
                type: 'info',
                duration: 2000
              })
              return
            }

            let tempArr = null
            if (res.header && res.header.rspCode == RES_OK && res.body) {
              this.gridData = res.body.dics.records
              tempArr = res.body.dics.records
              this.total = res.body.dics.total
              this.pageSize = res.body.dics.size
            } else {
              // this.gridData = res.dics.records;
              // tempArr = res.dics.records;
              // this.total = res.dics.total;
              // this.pageSize = res.dics.size;
            }

            let resultArr = []
            tempArr.forEach((item) => {
              let tempJson = {
                value: '',
                label: ''
              }
              tempJson.label = item.itemValue
              tempJson.value = item.itemCode
              resultArr.push(tempJson)
            })
            console.log(tempArr, resultArr)
            // this.data.options.options = resultArr;
            console.log(this.data.options.options)
          })
          .catch((error) => console.log(error))
      }
      this.dialogTableVisible = true
    },
    setData(params) {
      console.log('11111', params)
      this.data.remoteCode = params.dicName
      // this.dialogTableVisible = false;
    },
    // 查询信息
    search() {
      getDicTwo({
        body: {
          dicName: this.value,
          selType: 2
          // itemCode: this.value,
          // itemValue: this.value,
        },
        header: {
          pageIndex: 1,
          pageSize: 999,
          gloSeqNo: new Date(),
          reqSeqNo: 'sit anim',
          reqTime: 'officia ad anim'
        }
      })
        .then((res) => {
          console.log(res)
          if (res.header && res.header.rspCode == RES_OK) {
            this.$notify({
              title: 'Success',
              message: '查询成功',
              type: 'success',
              duration: 2000
            })
          } else if (res.header && res.header.rspCode == FAIL_CODE) {
            this.$notify({
              title: 'fail',
              message: '查询失败',
              type: 'info',
              duration: 2000
            })
            return
          }

          let tempArr = null
          if (res.header && res.header.rspCode == RES_OK && res.body) {
            this.gridData = res.body.dics.records
            tempArr = res.body.dics.records
          } else {
            // this.gridData = res.dics.records;
            // tempArr = res.dics.records;
          }

          let resultArr = []
          tempArr.forEach((item) => {
            let tempJson = {
              value: '',
              label: ''
            }
            tempJson.label = item.itemValue
            tempJson.value = item.itemCode
            resultArr.push(tempJson)
          })
          console.log(tempArr, resultArr)
          // this.data.options.options = resultArr
        })
        .catch((error) => console.log(error))
    }
  }
}
</script>

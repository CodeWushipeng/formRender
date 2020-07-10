<template>
  <div v-if="show">
    <el-form label-position="top">
      <!-- 字典服务 -->
      <el-form-item
        :label="$t('fm.config.common.remoteCode')"
        v-if="data.type == 'select'"
      >
        <el-input size="mini" v-model="data.remoteCode" @focus="getData">
          <!-- <el-button slot="append" @click="getData(data.remoteCode)"
            >查询</el-button
          > -->
        </el-input>
        <el-dialog :visible.sync="dialogTableVisible">
          <div style="display:flex;marginBottom:20px;">
            <el-input
              style="width:200px"
              placeholder="请输入内容"
              v-model="value"
              clearable
            >
            </el-input>
            <el-button
              type="primary"
              style="marginLeft:20px"
              @click="search"
              icon="el-icon-search"
              >搜索</el-button
            >
          </div>
          <el-table :data="gridData" border>
            <el-table-column
              property="dicName"
              label="选项代码"
            ></el-table-column>
            <el-table-column
              property="itemValue"
              label="选项名称"
            ></el-table-column>
            <el-table-column
              property="itemCode"
              label="选项值"
            ></el-table-column>
          </el-table>
          <el-pagination
            style="marginTop:20px"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="startPage"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-dialog>
      </el-form-item>
      <!-- 取值范围 -->
      <el-form-item
        :label="$t('fm.config.common.valueRange')"
        v-if="data.type != 'grid'"
      >
        <el-input v-model="data.valueRange" placeholder="取值范围"></el-input>
      </el-form-item>
      <!-- 是否隐藏 -->
      <el-form-item
        :label="$t('fm.config.common.hidden')"
        v-if="data.type != 'grid'"
      >
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.hidden"
          placeholder="隐藏条件"
        >
        </el-input>
      </el-form-item>
      <!-- 进入条件 -->
      <el-form-item
        :label="$t('fm.config.common.enterCondition')"
        v-if="data.type != 'grid'"
      >
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.enterCondition"
          placeholder="进入条件"
        >
        </el-input>
      </el-form-item>
      <!-- 离开条件 -->
      <el-form-item
        :label="$t('fm.config.common.condition')"
        v-if="data.type != 'grid'"
      >
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.condition"
          placeholder="离开条件"
        >
        </el-input>
      </el-form-item>
      <!-- 离开赋值 -->
      <el-form-item
        :label="$t('fm.config.common.assignment')"
        v-if="data.type != 'grid'"
      >
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.assignment"
          placeholder="离开赋值"
        >
        </el-input>
      </el-form-item>
      <!-- 访问外部条件 -->
      <el-form-item
        :label="$t('fm.config.common.remoteFactor')"
        v-if="data.type != 'grid'"
      >
        <!-- <el-button @click="handelMirror">点击配置外部条件访问</el-button> -->
        <el-input
          v-model="data.remoteFactor.isRemote"
          placeholder="启动条件"
          style="margin-bottom:15px;text-overflow: ellipsis;"
          @focus="handelMirror"
          readonly
        >
          <template slot="prepend">启动条件</template>
        </el-input>
        <el-input
          v-model="data.remoteFactor.url"
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
          v-model="data.remoteFactor.data"
          placeholder="入口数据"
        >
          <template slot="prepend">入口数据</template>
        </el-input>
        <el-input
          style="text-overflow: ellipsis;"
          readonly
          @focus="handelMirror"
          v-model="data.remoteFactor.success"
          placeholder="出口数据"
        >
          <template slot="prepend">出口数据</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import request from "../util/request";

export default {
  components: {
    Draggable,
  },
  props: ["data"],
  data() {
    return {
      dialogTableVisible: false,
      startPage: 1,
      pageSize: 10,
      total: 0,
      value: "",
      gridData: [],
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
    },
  },
  methods: {
    // codeMirror弹出函数
    handelMirror(e) {
      console.log(this.data);
      this.$emit("mirror", this.data, e.target.placeholder);
    },
    // 分页查询
    handleCurrentChange(val) {
      this.startPage = val;
      this.getData();
    },
    // 获取字典服务数据
    getData(data) {
      this.dialogTableVisible = true;
      console.log(data);
      request
        .post("/dev-api/dictionary/quertDicByPage", {
          body: {
            dicName: "cityList",
            selType: 2,
          },
          header: {
            pageIndex: this.startPage,
            pageSize: 10,
            gloSeqNo: new Date(),
            reqSeqNo: "sit anim",
            reqTime: "officia ad anim",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.header.rspCode == "SP000000") {
            this.$notify({
              title: "Success",
              message: "查询成功",
              type: "success",
              duration: 2000,
            });
          } else if (res.header.rspCode == "99999999") {
            this.$notify({
              title: "fail",
              message: "查询失败",
              type: "info",
              duration: 2000,
            });
            return;
          }
          this.gridData = res.body.dics.records;
          let tempArr = res.body.dics.records;
          this.total = res.body.dics.total;
          this.pageSize = res.body.dics.size;
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
          this.data.options.options = resultArr;
        })
        .catch((error) => console.log(error));
    },
    // 查询信息
    search() {
      request
        .post("/dev-api/dictionary/quertDicByPage", {
          body: {
            dicName: "cityList",
            selType: 2,
            itemCode: this.value,
            itemValue: this.value,
          },
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
          if (res.header.rspCode == "SP000000") {
            this.$notify({
              title: "Success",
              message: "查询成功",
              type: "success",
              duration: 2000,
            });
          } else if (res.header.rspCode == "99999999") {
            this.$notify({
              title: "fail",
              message: "查询失败",
              type: "info",
              duration: 2000,
            });
            return;
          }
          this.gridData = res.body.dics.records;
          let tempArr = res.body.dics.records;
          let resultArr = [];
          tempArr.forEach((item) => {
            let tempJson = {
              value: "",
            };
            tempJson.value = item.itemValue;
            resultArr.push(tempJson);
          });
          console.log(tempArr, resultArr);
          this.data.options.options = resultArr;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

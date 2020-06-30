<template>
  <div v-if="show">
    <el-form label-position="top">
      <!-- 远端地址 -->
      <el-form-item
        :label="$t('fm.config.common.remoteCode')"
        v-if="data.type == 'select'"
      >
        <el-input size="mini" v-model="data.remoteCode">
          <el-button slot="append" @click="getData(data.remoteCode)"
            >查询</el-button
          >
        </el-input>
      </el-form-item>
      <!-- 取值范围 -->
      <el-form-item
        :label="$t('fm.config.common.valueRange')"
        v-if="data.type != 'grid'"
      >
        <el-input v-model="data.valueRange"></el-input>
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
        <el-checkbox
          v-model="data.remoteFactor.isRemote"
          label="是"
          style="margin-bottom:10px"
        ></el-checkbox>
        <!-- <el-button @click="handelMirror">点击配置外部条件访问</el-button> -->
        <template v-if="data.remoteFactor.isRemote">
          <el-input
            v-model="data.remoteFactor.url"
            placeholder="添加校验地址"
            style="margin-bottom:15px"
          >
            <template slot="prepend">URL</template>
          </el-input>
          <el-input
            style="text-overflow: ellipsis;"
            readonly
            @focus="handelMirror"
            v-model="data.remoteFactor.data"
            placeholder="添加校验数据"
          >
            <template slot="prepend">DATA</template>
          </el-input>
        </template>
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
    return {};
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
    // 获取字典服务数据
    getData(data) {
      console.log(data);
      request
        .post("/dev-api/dictionary/quertDicNoPage", {
          body: {
            dicName: "cityList",
            selType: 2,
          },
          header: { pageIndex: 1, pageSize: 1 },
        })
        .then((res) => {
          console.log(res);
          if (res.rspCode == "00000000") {
            this.$notify({
              title: "Success",
              message: "查询成功",
              type: "success",
              duration: 2000,
            });
          }else if(res.rspCode == "99999999"){
            this.$notify({
              title: "fail",
              message: "查询失败",
              type: "info",
              duration: 2000,
            });
            return
          }
          let tempArr = res.body.dicList;
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

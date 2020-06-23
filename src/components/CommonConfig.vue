<template>
  <div v-if="show">
    <el-form label-position="top">
      <!-- 是否隐藏 -->
      <el-form-item :label="$t('fm.config.common.hidden')" v-if="data.type!='grid'">
        <el-input style="text-overflow: ellipsis;" readonly  @focus="handelMirror" v-model="data.hidden" placeholder="隐藏条件">
        </el-input>
      </el-form-item>
      <!-- 离开条件 -->
      <el-form-item :label="$t('fm.config.common.condition')" v-if="data.type!='grid'">
        <el-input style="text-overflow: ellipsis;" readonly  @focus="handelMirror" v-model="data.condition" placeholder="离开条件">
        </el-input>
      </el-form-item>
      <!-- 离开赋值 -->
      <el-form-item :label="$t('fm.config.common.assignment')" v-if="data.type!='grid'">
        <el-input style="text-overflow: ellipsis;" readonly  @focus="handelMirror" v-model="data.assignment" placeholder="离开赋值">
        </el-input>
      </el-form-item>
      <!-- 访问外部条件 -->
      <el-form-item :label="$t('fm.config.common.remoteFactor')" v-if="data.type!='grid'">
        <el-checkbox v-model="data.remoteFactor.isRemote" label="是" style="margin-bottom:10px"></el-checkbox>
        <!-- <el-button @click="handelMirror">点击配置外部条件访问</el-button> -->
        <template v-if="data.remoteFactor.isRemote">
          <el-input v-model="data.remoteFactor.url" placeholder="添加校验地址" style="margin-bottom:15px">
            <template slot="prepend">URL</template>
          </el-input>
          <el-input style="text-overflow: ellipsis;" readonly  @focus="handelMirror" v-model="data.remoteFactor.data" placeholder="添加校验数据">
            <template slot="prepend">DATA</template>
          </el-input>
        </template>
      </el-form-item>
      <!-- 取值范围 -->
      <el-form-item :label="$t('fm.config.common.valueRange')" v-if="data.type!='grid'">
        <el-input v-model="data.valueRange"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  props: ['data'],
  data () {
    return {
      
    }
  },
  mounted(){
      console.log(this.data)
  },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    // codeMirror弹出函数
    handelMirror(e){
      console.log(this.data)
      this.$emit("mirror", this.data,e.target.placeholder)
    }
  },
}
</script>

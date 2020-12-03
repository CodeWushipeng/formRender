<template>
    <div id="radioDiv">
    <!--{{widget}}-->
        <br/>
    <!--{{models}}-->
        <br/>
        <el-form>

           <el-form-item :label="widget.name" :prop="widget.model" >
            <template v-if="widget.type == 'radio'" >
              <el-radio-group v-model="dataModel"
                :style="{width: widget.options.width}"
                :disabled="widget.options.disabled"
              >
                <el-radio
                  :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
                  @keydown.enter.native="inputHandler()"
                  :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
                >
                  <template v-if="widget.options.remote">{{item.label}}</template>
                  <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
                </el-radio>
              </el-radio-group>
            </template>

               <template v-if="widget.type == 'checkbox'" >
                   <el-checkbox-group v-model="dataModel"
                                      :style="{width: widget.options.width}"
                                      :disabled="widget.options.disabled"
                   >
                       <el-checkbox
                               :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
                               @keydown.enter.native="inputHandler()"
                               :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
                       >
                           <template v-if="widget.options.remote">{{item.label}}</template>
                           <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
                       </el-checkbox>
                   </el-checkbox-group>

               </template>
           </el-form-item>

        </el-form>
    </div>
</template>

<script>

export default {
    props: ['widget','models'],

  components: {
  },
  data () {
    return {
        dataModel: this.models[this.widget.model],
    }
  },
  created () {
      this.$nextTick(()=>{
          if(this.dataModel){
              var inputList = document.querySelectorAll("#radioDiv input");
              for(var i=0;i<inputList.length;i++){//循环数组
                  if(inputList[i].checked){//判断当前项是否被选中
                      //
                      //已选中的操作，获取选中的值
                      document.querySelectorAll("#radioDiv input")[i].click()
                      document.querySelectorAll("#radioDiv input")[i].focus()
                      break
                  }
              }
          }else{

              document.querySelector("#radioDiv input").click()
              document.querySelector("#radioDiv input").focus()
          }

      })
  },
  methods: {

      inputHandler(refId) {
          const keyType = event.type;
          const keyCode = event.keyCode;
          //console.log("keyCode:"+keyCode)
          //if(keyType == 'keydown' && keyCode =='13'){
              console.log("这是一个enter键操作......")
              this.$emit('on-close1')
          //}
      },
  },
  watch: {
      dataModel: {
          deep: true,
          handler (val) {
            //
              this.models[this.widget.model] = val

              /*this.$emit('update:models', {
                  ...this.models,
                  [this.widget.model]: val
              })*/
          }
      },
      models: {
          deep: true,
          handler (val) {
              //console.log("models===",val)
              //
              this.dataModel = val[this.widget.model]
          }
      }
  }
}
</script>

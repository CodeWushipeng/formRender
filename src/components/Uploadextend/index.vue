<template>
  <div class="fm-uplaod-container"
    :id="uploadId"
  >
    <draggable class="drag-img-list"
      v-model="fileList"
      v-bind="{group: uploadId, ghostClass: 'ghost', animation: 200}"
      :no-transition-on-drag="true"
    >
      <div 
        :id="item.key"
        :style="{width: width+'px', height: height+'px'}"
        :class="{uploading: item.status=='uploading', 'is-success': item.status=='success', 'is-diabled': disabled}"
        class="upload-file" v-for="(item) in fileList" :key="item.key">
        <img :src="item.url" v-if="uploadtype == 'imageupload'"/>
        <video :src="item.url" v-if="uploadtype == 'videoupload'"></video>

        <el-progress v-if="item.status=='uploading'" :width="miniWidth*0.9" class="upload-progress" type="circle" :percentage="item.percent"></el-progress>

        <label class="item-status" v-if="item.status=='success'">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>

        <div class="uplaod-action" :style="{height: miniWidth / 4 + 'px'}" v-if="!disabled">
          <i class="iconfont icon-tupianyulan" :title="$t('fm.upload.preview')" @click="handlePreviewFile(item.key)" :style="{'font-size': miniWidth/8+'px'}"></i>
          <i v-if="isEdit" class="iconfont icon-sync1" :title="$t('fm.upload.edit')" @click="handleEdit(item.key)" :style="{'font-size': miniWidth/8+'px'}"></i>
          <i v-if="isDelete && fileList.length > min" class="iconfont icon-delete" :title="$t('fm.upload.delete')" @click="handleRemove(item.key)" :style="{'font-size': miniWidth/8+'px'}"></i>
        </div>
      </div>
    </draggable>
    <cus-dialog
            :visible="showDoc == true || showPdf == true  || showVideo == true"
            :show-close="true"
            :width="'80%'"
            class="dialog-div-pre-style"
            @on-close="closePreviewClick"
            center>
      <div v-if="showDoc == true" class="dialog-body-content-base-style">
        <!--<iframe frameborder="0"
                :src="docUrl"
                width='100%'>
        </iframe>-->
        <div v-html="docUrl" />
      </div>

      <div v-else-if="showPdf == true" class="dialog-body-content-base-style" style="justify-content: center; align-items: center">
        <embed :src="pdfUrl" style="width: 100%; height: 100%"/>
      </div>
      <div v-else-if="showVideo == true"
           class="dialog-body-content-base-style"
           style="justify-content: center; align-items: center">
        <video-player class="video-player vjs-custom-skin"
                      ref="positiveVideoPlayer"
                      :playsinline="true"
                      :options="positivePlayerOptions"
        ></video-player>
      </div>

      <template slot="action">
        <span></span>
      </template>
    </cus-dialog>

    <div class="el-upload el-upload--picture-card"
      :class="{'is-disabled': disabled}"
      v-show="fileList.length < length"
      :style="{width: width+'px', height: height+'px'}"
      @click.self="handleAdd"
    >
      <i class="el-icon-plus" @click.self="handleAdd" :style="{fontSize:miniWidth/4+'px',marginTop: (-miniWidth/8)+'px', marginLeft: (-miniWidth/8)+'px'}"></i>
      <input :accept="reversedMessage" v-if="multiple"  multiple ref="uploadInput" @change="handleChange" type="file" :style="{width: 0, height: 0}" name="file" class="el-upload__input upload-input">
      <input :accept="reversedMessage" v-else ref="uploadInput" @change="handleChange" type="file" :style="{width:0, height: 0}" name="file" class="el-upload__input upload-input">
    </div>
  </div>
</template>

<script>
    import pdf from 'vue-pdf'
import Viewer from 'viewerjs'
import Draggable from 'vuedraggable'
import CusDialog from '../CusDialog'
import mammoth from 'mammoth'
require('viewerjs/dist/viewer.css')

export default {
  components: {
    Draggable,
    CusDialog,
      mammoth,
      pdf,
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    token: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 9
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    meitu: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    },
    uploadtype: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileList: this.value,
      viewer: null,
      uploadId: 'upload_' + new Date().getTime(),
      editIndex: -1,
      meituIndex: -1,
      showPdf:false,
      docUrl: '',
      pdfUrl: '',
      showDoc:false,
      showVideo:false,
      positivePlayerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
              type: "",
              src:"",
          }],
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
          },
          common: "positivePlayer",
      },
    }
  },
  created() {
  },
  computed: {
    reversedMessage: function () {
        if(this.uploadtype == "imageupload"){
            return "image/*"
        }else if(this.uploadtype == "fileupload"){

        }else if(this.uploadtype == "videoupload"){
            return "audio/*,video/*"
        }
        return "*"
    },

    miniWidth () {
      if (this.width > this.height) {
        return this.height
      } else {
        return this.width
      }
    }
  },
  mounted () {
    this.$emit('input', this.fileList)
  },
  methods: {
      /**
       * 通过文件后缀返回文件的图标
       */
      iconByType(row) {
          return row.fileName.substring(row.fileName.lastIndexOf(".") + 1, row.fileName.length)
      },
      closePreviewClick() {
          if (this.showDoc == true) {
              this.showDoc = false
          } else if (this.showPdf == true) {
              this.showPdf = false
          } else if (this.showVideo == true) {
              this.showVideo = false
          }
      },

    handleChange () {
      const files = this.$refs.uploadInput.files
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

          let url = null;
          if (window.createObjectURL != undefined) {
              // basic
              url = window.createObjectURL(file);
          } else if (window.webkitURL != undefined) {
              // webkit or chrome
              url = window.webkitURL.createObjectURL(file);
          } else if (window.URL != undefined) {
              // mozilla(firefox)
              url = window.URL.createObjectURL(file);
          }

        const reader = new FileReader()
        const key = (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999)
        if((file.name).indexOf(".doc") > -1 | (file.name).indexOf(".docx") > -1){
            reader.readAsArrayBuffer(file)
            reader.onload  = (e) => {
                debugger
                /*let blob = new Blob([e.target.result], {
                    type: `application/msword` //word文档为msword,pdf文档为pdf
                });*/
                /*let blob = window.URL.createObjectURL(new Blob([e.target.result]))
                let objectUrl = URL.createObjectURL(blob);*/

                if (this.editIndex >= 0) {
                    this.$set(this.fileList, this.editIndex, {
                        key,
                        url: e.target.result,
                        name: file.name,
                        urlPath: url,
                        percent: 100,
                        status: 'success'
                    })

                    this.editIndex = -1
                } else {
                    debugger
                    this.fileList.push({
                        key,
                        url: e.target.result,
                        name: file.name,
                        urlPath: url,
                        percent: 100,
                        status: 'success'
                    })
                }
            }
        }else{
            reader.readAsDataURL(file)
            reader.onload = () => {
                debugger
                url=reader.result.substring(reader.result.indexOf(',')+1);
                var imgUrl='data:image/png;base64,'+url

                if (this.editIndex >= 0) {

                    this.$set(this.fileList, this.editIndex, {
                        key,
                        url: reader.result,
                        name: file.name,
                        urlPath: url,
                        percent: 100,
                        status: 'success'
                    })

                    this.editIndex = -1
                } else {
                    this.fileList.push({
                        key,
                        url: reader.result,
                        name: file.name,
                        urlPath: url,
                        percent: 100,
                        status: 'success'
                    })
                }
            }
        }
      }
      this.$refs.uploadInput.value = []
    }, 
    handleRemove (key) {
      this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
    },
    handleEdit (key) {
      this.editIndex = this.fileList.findIndex(item => item.key === key)
      this.$refs.uploadInput.click()
    },
    handleMeitu (key) {
        debugger
      this.$emit('on-meitu', this.fileList.findIndex(item => item.key === key))
    },
    handleAdd () {
      if (!this.disabled) {
        this.editIndex = -1
        this.$refs.uploadInput.click()
      }
    },
    handlePreviewFile (key) {
      debugger
      if(this.uploadtype == "imageupload"){
          this.viewer && this.viewer.destroy()
          this.uploadId = 'upload_' + new Date().getTime()

          //console.log(this.viewer)
          this.$nextTick(() => {
              this.viewer = new Viewer(document.getElementById(this.uploadId))
              this.viewer.view(this.fileList.findIndex(item => item.key === key))
          })
      }else if(this.uploadtype == "fileupload"){
          var docTemp = this.fileList.findIndex(item => item.key === key)
          //this.pdfUrl = this.fileList[docTemp].url
          /*window.open('https://view.officeapps.live.com/op/view.aspx?src=' + this.fileList[docTemp].urlPath)
          this.showPdf = true*/
          if((this.fileList[docTemp].name).indexOf(".pdf") > -1){
              this.pdfUrl = this.fileList[docTemp].url
              this.showPdf = true
          }else {
              mammoth.convertToHtml({ arrayBuffer: this.pdfUrl }).then((result) => {
                  this.docUrl = result.value
              }).done()
              this.showDoc = true
          }
      }else if(this.uploadtype == "videoupload"){
          this.$set(this.positivePlayerOptions.sources, 0, {
              type: "video/mp4",
              src: this.fileList[this.fileList.findIndex(item => item.key === key)].url,
          })
          this.showVideo = true
      }
    }
  },
  watch: {
    'fileList': {
      deep: true,
      handler (val) {
        // this.$emit('input', this.fileList)
      }
    }
  }
}
</script>

<style lang="scss">
.fm-uplaod-container{
  .is-disabled{
    position: relative;

    &::after{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      // background: rgba(0,0,0,.1);
      content: '';
      display: block;
      cursor:not-allowed;
    }
  }

  .upload-file{
    margin: 0 10px 10px 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // background: #fff;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
    vertical-align: top;
    &:hover{
      .uplaod-action{
        display: flex;
      }
    }
    .uplaod-action{
      position: absolute;
      // top: 0;
      // height: 30px;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.6);
      display: none;
      justify-content: center;
      align-items: center;
      i{
        color: #fff;
        cursor: pointer;
        margin: 0 5px;
      }
    }
    &.is-success{
      .item-status{
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
        &>i{
          font-size: 12px;
          margin-top: 11px;
          color: #fff;
          transform: rotate(-45deg);
        }
      }
    }
    &.uploading{
      &:before{
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
      }
    }
    .upload-progress{
      position: absolute;
      .el-progress__text{
        color: #fff;
        font-size: 16px !important;
      }
    }
    img{
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }
  .el-upload--picture-card{
    position: relative;
    overflow: hidden;
    .el-icon-plus{
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
  .upload-input{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    opacity: 0;
    cursor: pointer;
  }

  .drag-img-list{
    display: inline;

    .ghost{
      position: relative;
      &::after {
        width: 100%;
        height: 100%;
        display: block;
        content: '';
        background: #fbfdff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px dashed #3bb3c2;
      }
    }

    &>div{
      cursor: move;
    }
  }
}

.viewer-container{
  z-index: 9999 !important;
}
</style>

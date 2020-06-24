<template>
    <div id="radioDiv">
    <!--{{widget}}-->
        <!--{{cameraimage}}-->
    <!--{{dataModel}}-->
        <br/>
        <el-form>

           <el-form-item :label="widget.name" :prop="widget.model" >
            <template v-if="widget.type == 'camera'" >
                <video ref="video" width="320" height="240" controls></video>
                <canvas ref="canvas" width="320px" height="240px" style="margin-left: 20px;"></canvas>
                <el-button
                        type="primary"
                        class="json-btn"
                        @click="uploadImage()"
                >采集</el-button>
            </template>
           </el-form-item>

        </el-form>
    </div>
</template>

<script>

export default {
    props: ['widget','models','cameraimage'],

  components: {
  },
  data () {
    return {
        dataModel: this.models[this.widget.model],
        video:this.$refs.video,
        canvas:this.$refs.canvas,
        context:"",
    }
  },
  created () {
      this.$nextTick(()=>{
          if(this.dataModel){
              this.change(this.dataModel)
          }
      })
  },
  methods: {

      uploadImage(e){
          var _this = this;
          _this.context = this.$refs.canvas.getContext('2d'),
              //canvas.width = 300;
              //canvas.height = 300;
              _this.context.drawImage(this.$refs.video, 0, 0, 300, 300);
          var imgData = this.$refs.canvas.toDataURL();
          if(imgData != "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADwCAYAAABxLb1rAAAIl0lEQVR4Xu3UgQnDQBADwXf/RTu4h19QYK4AIeZAzznnPY4AAQL/IfDcrPmFGcCborIIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFrg7gDw8M8PGpHWanAAAAAElFTkSuQmCC"){
              this.$emit('on-cameraimage', imgData);
          }else{
              this.cameraimage = ""
          }
      },
      change(val){
          const videoConstraints = {};
          var selectValue = val
          videoConstraints.deviceId = {
              exact: selectValue
          };
          var constraints = {
              video: videoConstraints,
          };
          this.openMedia(constraints)
      },
      openMedia(constraints) {
          //调用用户媒体设备, 访问摄像头
          this.getUserMedia(constraints, this.success, this.error);
      },
      getUserMedia(constraints, success, error) {
          if (navigator.mediaDevices.getUserMedia) {
              //最新的标准API
              navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
          } else if (navigator.webkitGetUserMedia) {
              //webkit核心浏览器
              navigator.webkitGetUserMedia(constraints, success, error)
          } else if (navigator.mozGetUserMedia) {
              //firfox浏览器
              navigator.mozGetUserMedia(constraints, success, error);
          } else if (navigator.getUserMedia) {
              //旧版API
              navigator.getUserMedia(constraints, success, error);
          }
      },
      success(stream) {
          //兼容webkit核心浏览器
          // var CompatibleURL = window.URL || window.webkitURL;
          //video.src = CompatibleURL.createObjectURL(stream);
          //将视频流设置为video元素的源
          this.$refs.video.srcObject = stream;
          this.$refs.video.play();
      },
      error(error) {
          console.log('访问用户媒体设备失败${error.name}, ${error.message}');
      },
      camera (face) {
          this.stop();
          this.gum(face);
      },
      stop () {
          return this.$refs.video.srcObject && this.$refs.video.srcObject.getTracks().map(t => t.stop());
      },
      gum (face) {
          var _this = this;
          navigator.mediaDevices.enumerateDevices()
              .then(function(devices) {
                  console.log(devices)
                  _this.selectList = []
                  devices.forEach(function(device) {
                      if (device.kind == 'videoinput') {
                          _this.selectList.push({
                              'label': device.label,
                              'value': device.deviceId
                          })
                      }
                  });
                  console.log(_this.selectList)
              })
              .catch(function(err) {
                  console.log(err.name + ": " + err.message);
              });
      }
  },
  watch: {
  }
}
</script>

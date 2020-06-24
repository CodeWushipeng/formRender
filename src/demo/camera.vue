<template>
    <div>
            <el-select v-model="dataModel" placeholder="请选择" @change="change">
                <el-option
                        v-for="item in selectList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <video ref="video" width="320" height="240" controls></video>
            <canvas ref="canvas" width="320px" height="240px"></canvas>
            <button id="photo" @click="uploadImage()">拍照</button>
            <button type="button" class="btn btn-info" @click="camera('user')">关闭摄像头</button>

    </div>
</template>

<script>
    /**
     * 摄像头控制 demo
     */
    export default {
        data () {
            return {
                video:this.$refs.video,
                canvas:this.$refs.canvas,
                context:"",
                dataModel: "",
                selectList: [],
            }
        },
        methods: {
            //
            uploadImage(e){
                var _this = this;
                _this.context = this.$refs.canvas.getContext('2d'),
                //canvas.width = 300;
                //canvas.height = 300;
                    _this.context.drawImage(this.$refs.video, 0, 0, 300, 300);
                var imgData = this.$refs.canvas.toDataURL();
                if(imgData != "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADwCAYAAABxLb1rAAAIl0lEQVR4Xu3UgQnDQBADwXf/RTu4h19QYK4AIeZAzznnPY4AAQL/IfDcrPmFGcCborIIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFDGCpK5sAgWkBAzj9HuUIECgFrg7gDw8M8PGpHWanAAAAAElFTkSuQmCC"){
                    this.dataModel = imgData
                }else{
                    this.dataModel = ""
                }
                console.log(imgData)
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
        mounted () {
            this.camera('environment');
        }
    };
</script>

<style lang="scss" scoped>
</style>

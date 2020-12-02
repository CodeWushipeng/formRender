<template>
    <div>
        <!--当前节点信息-->
        <!--{{data}}-->
        <div class="current-node" v-if="Object.keys(data).length>0">
            <div class="current-title">{{data.nodeName}}</div>
            <el-card class="box-card">
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">节点类型：</el-col>
                    <el-col :span="6">
                        <el-tag :type="getElTagType(type)">{{ getNodeName(type)}}</el-tag>
                    </el-col>
                    <!--<el-col :span="6" class="label-color">总节点个数：</el-col>-->
                    <!--<el-col :span="6">-->
                        <!--<el-tag type="info">{{recordsLength}}</el-tag>-->
                    <!--</el-col>-->
                    <el-col :span="6" class="label-color">提交类型：</el-col>
                    <el-col :span="6">
                        <el-tag v-if="data.commitType" type="info">{{getSubType(data.commitType)}}</el-tag>
                        <el-tag v-else type="info">无</el-tag>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">当前节点：</el-col>
                    <el-col :span="6">
                        <el-tag type="info">{{data.nodeCode}}</el-tag>
                    </el-col>
                    <el-col :span="6" class="label-color">当前节点名称：</el-col>
                    <el-col :span="6">
                        <el-tag type="info">{{data.nodeName}}</el-tag>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">输入表单编码：</el-col>
                    <el-col :span="6">
                        <el-tag type="info">{{data.inputFormCode || "无"}}</el-tag>
                    </el-col>
                    <el-col :span="6" class="label-color">输出表单编码：</el-col>
                    <el-col :span="6">
                        <el-tag type="info">{{data.outputFromCode || "无"}}</el-tag>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">有响应页面：</el-col>
                    <el-col :span="6">
                        <el-tag type="info">{{data.outputFromCode ? "有" : "无"}}</el-tag>
                    </el-col>
                    <el-col :span="6" class="label-color">返回节点：</el-col>
                    <el-col :span="6">
                        <el-tag type="info">{{data.returnNode ? data.returnNode : '无'}}</el-tag>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6" class="label-color">提取配置：</el-col>
                    <el-col :span="6">
                        <el-tag type="info" :title="data.inputConfig">{{data.inputConfig ? "有" : "无"}}</el-tag>
                    </el-col>
                    <el-col :span="6" class="label-color">输出配置：</el-col>
                    <el-col :span="6">
                        <el-tag type="info" :title="data.outputConfig">{{data.outputConfig ? "有" : '无'}}</el-tag>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script>
import flowMixin from './js/mixins'
export default {
    name: "flowNode",
    mixins: [flowMixin],
    props: {
        data: {
            type: Object,
            required: true,
        },
        records: {
            type: Array,
            required: true,
        },
    },
    computed:{
        recordsLength(){
            return this.records.length
        },
        type() {
            const { type} = this.data;
            return type
        },
    }
}
</script>

<style scoped lang="scss">
    .current-title{
        font-weight: bold;
        padding-bottom:15px;
    }
    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .box-card {
        /*width: 480px;*/
        .label-color {
            font-size: 13px;
        }
    }
</style>

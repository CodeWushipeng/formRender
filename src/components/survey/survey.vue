<template>
  <div>
    <el-link type="primary">产品调查</el-link>
    <template v-for="(item, index) in surveyList">
      <el-table
        :key="index"
        :data="item.questionList"
        border
        style="width: 100%"
      >
        <el-table-column width="60" type="expand">
          <template slot-scope="props">
            <!--{{props.row}}-->
            <!--select-->
            <el-table
              v-if="props.row.optionList && props.row.optionList.length"
              :data="props.row.optionList"
              border
              style="width: 100%"
            >
              <el-table-column width="" prop="optionValue" label="值">
              </el-table-column>
              <el-table-column prop="description" label="值描述">
              </el-table-column>
              <el-table-column prop="surveyQuestionId" label="SQID">
              </el-table-column>
            </el-table>
            <!--table-->
            <el-table
              border
              v-else-if="
                props.row.subQuestionList && props.row.subQuestionList.length
              "
              :data="props.row.subQuestionList"
              style="width: 100%"
            >
              <el-table-column prop="question" label="字段" width="">
              </el-table-column>
              <el-table-column prop="description" label="字段描述" width="">
              </el-table-column>
              <el-table-column prop="surveyQuestionTypeId" label="类型">
              </el-table-column>
            </el-table>
            <!--字段-->
            <el-form
              v-else
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="字段" label-width="200px">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="字段编码" label-width="200px">
                <span>{{ props.row.question }}</span>
              </el-form-item>
              <el-form-item label="类型" label-width="200px">
                <span>{{ props.row.surveyQuestionTypeId }}</span>
              </el-form-item>
              <el-form-item label="SQID" label-width="200px">
                <span>{{ props.row.surveyQuestionId }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="字段" sortable width="">
        </el-table-column>
        <el-table-column prop="question" label="字段编码" sortable width="">
        </el-table-column>
        <el-table-column prop="surveyQuestionTypeId" label="类型">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="generateComponent(scope.row)" type="text" size="small"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--{{item.relationshipList}}-->
      <template v-for="relation in item.relationshipList">
        <el-table
          :data="relation.questionList"
          border
          style="width: 100%"
          :key="relation.id"
        >
          <el-table-column width="60" type="expand">
            <template slot-scope="props">
              <!--{{props.row}}-->
              <!--select-->
              <el-table
                v-if="props.row.optionList && props.row.optionList.length"
                :data="props.row.optionList"
                border
                style="width: 100%"
              >
                <el-table-column width="" prop="optionValue" label="值">
                </el-table-column>
                <el-table-column prop="description" label="值描述">
                </el-table-column>
                <el-table-column prop="surveyQuestionId" label="SQID">
                </el-table-column>
              </el-table>
              <!--table-->
              <el-table
                border
                v-else-if="
                  props.row.subQuestionList && props.row.subQuestionList.length
                "
                :data="props.row.subQuestionList"
                style="width: 100%"
              >
                <el-table-column prop="question" label="字段" width="">
                </el-table-column>
                <el-table-column prop="description" label="字段描述" width="">
                </el-table-column>
                <el-table-column prop="surveyQuestionTypeId" label="组件类型">
                </el-table-column>
              </el-table>
              <!--字段-->
              <el-form
                v-else
                label-position="left"
                inline
                class="demo-table-expand"
              >
                <el-form-item label="字段" label-width="200px">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="字段编码" label-width="200px">
                  <span>{{ props.row.question }}</span>
                </el-form-item>
                <el-form-item label="类型" label-width="200px">
                  <span>{{ props.row.surveyQuestionTypeId }}</span>
                </el-form-item>
                <el-form-item label="SQID" label-width="200px">
                  <span>{{ props.row.surveyQuestionId }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="字段" sortable width="">
          </el-table-column>
          <el-table-column prop="question" label="字段编码" sortable width="">
          </el-table-column>
          <el-table-column prop="surveyQuestionTypeId" label="类型">
          </el-table-column>
        </el-table>
      </template>
    </template>
  </div>
</template>

<script>
import { querySurveyById } from '../../api/forms';
import {
  basicComponents,
  layoutComponents,
  advanceComponents,
  tableComponents,
  formComponents
} from '../componentsConfig.js';
import { bankingComponents } from '../componentsBankingConfig.js';
export default {
  name: 'survey',
  props: {
    surveyId: {
      type: [String, Number],
    },
  },
  data() {
    return {
      activeName: 0,
      surveyList: null,
    };
  },
  created() {
    this.getSurveyList();
  },
  methods: {
    // 获取调查项
    getSurveyList() {
      let params = { surveyId: this.surveyId ? this.surveyId : '310000' };
      querySurveyById(params)
        .then(res => {
          console.log(res);
          if (res.header.rspCode == 'SP000000') {
            this.surveyList = res.body.surveyPageList;
          } else {
            this.$message({
              type: 'error',
              message: res.header.rspMsg,
            });
          }
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: '网络错误',
          });
        });
    },
    // 匹配组件
    searchComponent(comType){
      let result = {}
      let bankList = bankingComponents
      let basicList = basicComponents
      let layoutList = layoutComponents
      let advanceList = advanceComponents
      let formList = formComponents
      let tableList = tableComponents
      let allList = [...bankList,...basicList,...layoutList,...advanceList,...formList,...tableList]
      for(let i=0;i<allList.length;i++){
        if(allList[i].type == comType){
          result = allList[i]
          break
        }
      }
      return result
    },
    // 点击选择生成组件json数据
    generateComponent(row){
      console.log(row)
      let comType=row.surveyQuestionTypeId;
      let comModel = row.question;
      let comName = row.description
      let comOption = row.optionList
      let resultCom
      if(comType=="table"){
        resultCom= this.searchComponent('elTable')
      }else{
        resultCom = this.searchComponent(comType)
      }
      const key = new Date().getTime() + '';
      resultCom.model = comModel
      resultCom.name = comName
      resultCom.rules = []
      resultCom.key = key
      resultCom.tableName = ""
      if(resultCom.type=="select" ||resultCom.type=="radio"||resultCom.type=="checkbox"){
        resultCom.options.options = []
        for(let i=0;i<comOption.length;i++){
          let temp = {}
          temp.value = comOption[i].optionValue
          temp.label = comOption[i].description
          resultCom.options.options.push(temp)
        }
        resultCom.options.showLabel = true
      }
      // else if(resultCom.type=="elTable"){
      //   resultCom.configdata.list = row.subQuestionList
      // }
      this.$emit("addWidget",resultCom)
    }
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<template>
  <el-dialog title="确认订单" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="份额" :label-width="formLabelWidth">
        <!--<el-input v-model="form.amount" autocomplete="off"></el-input>-->
        <el-input-number v-model="form.amount" @change="handleChange" :min="min" :max="max" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="单价" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="金额" :label-width="formLabelWidth">
        <el-input v-model="sum" autocomplete="off" disabled></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "flow-dialog",
    data(){
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        min:1,
        max:100,
        form:{
          amount:0,
          price:0,
          sum:0,
        }
      }
    },
    computed:{
      sum(){
        return this.form.amount * this.form.price
      }
    },
    methods:{
      show(){
        this.dialogFormVisible = true
      },
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style scoped>

</style>

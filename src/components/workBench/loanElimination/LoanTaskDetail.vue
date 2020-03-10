<template>
<!-- 人工复核岗 -->
<div class="home" id="loantask">
      <div class="list_module">
        <div class="table_body">
          <h4>{{$t('details.xdckxq')}}</h4><!--消贷查看详情-->
          <el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
              <!--序号-->
              <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
              <!--审批岗位-->
              <el-table-column prop="activityName" :label="$t('toDoTasks.activityName')"  align="center" min-width="250px"> </el-table-column>
              <!--审批人员-->
              <el-table-column prop="userName" :label="$t('toDoTasks.userName')"  align="center" min-width="215px"> </el-table-column>
              <!--处理日期-->
              <el-table-column prop="doneDate" :label="$t('doDate')"  align="center" min-width="160px"> </el-table-column>
              <!--处理时间-->
              <el-table-column prop="doneTime" :label="$t('doTime')"  align="center" min-width="145px"></el-table-column>
              <!--审批结果-->
              <el-table-column prop="handleResult" :label="$t('toDoTasks.handleResult')"  align="center" min-width="260px">
                <template slot-scope="scope">
                  {{scope.row.handleResult | handleResult}}
                </template>
              </el-table-column>
              <!--审批说明-->
              <el-table-column prop="handleDesc" :label="$t('toDoTasks.approvalNote')"  align="center" min-width="155px"> </el-table-column>
          </el-table>
        </div>
      </div>
      
</div>
</template>

<script>
export default {
  name: 'LoanTaskDetail',
  data () {
    return {
        tableData:[],
        row:this.$store.state.loanTaskData,
    }
  },
  mounted(){
    // this.row = JSON.parse(this.$route.query.row)
    this.initLoanDetail() //获取反显信息
  },
  methods:{
      initLoanDetail(){
        var FunMsgData={
          "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,
          "businessType": this.row.businessType,
          "applyId": this.row.applyId
        }
        this.$post(this.$approve + '/processedDetail',FunMsgData).then(res=>{
            if(res.code == '000000'){
              this.tableData =  res.data;
            } else {
              var str = `
                <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
              `
              this.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
        })
      },
      //打开步骤详情
      openDtaile(i){
        this.dialogFormVisible = true;
        this.flag = i;
        switch(i) {
            case 0:
                this.title = '申请件详情'
                break;
            case 1:
                this.title = '影像调阅'
                break;
            case 2:
                this.title = '征信报告'
                break;
            case 3:
                this.title = '电话核查信息'
                break;
            case 4:
                this.title = '审批信息'
                break;
        } 


      },
      //取消
      cancel(formName){
          this.dialogFormVisible = false;
          if (this.$refs[formName]!==undefined) {
             this.resetForm(formName);
          }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
  },
  filters: {
    handleResult (val) {
      if(val == 0) {
        return '拒绝'
      } else if(val == 1) {
        return '通过'
      } else if(val == 2) {
        return '退回'
      } else if(val == 3) {
        return '驳回'
      } else if(val == 4) {
        return '转人工'
      }
    }
  }
}
</script>
<style lang='scss'>
#loantask{
	.el-dialog {
		width:70%!important;
	}
}
</style>

<style scoped lang='scss'>

.home{
    height: 100%;
    padding: 0 20px 20px;
    background: #fff;
    .home_main{
      padding:100px 10px 10px 10px;
      .home_con{
        background: #fff;
        padding:20px 20px  40px;
      }
    }
}
.loan_title{
  line-height: 70px;
  text-align: center;
  color: #333;
  font-size: 18px;
}
.loanStep{
  width: 100%;
  li{
    width: 20%;
    border: 1px solid $bordercolor;
    text-align: center;
    float: left;
    box-sizing: border-box;
    line-height: 50px;
    margin-left: -1px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>

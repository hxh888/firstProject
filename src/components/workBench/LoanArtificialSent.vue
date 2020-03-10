<template>
  <!-- 消贷人工派件 -->
  <div class="home">
    <div class="home_main clearfix">
        <div class="home_con clearfix">
            <el-form :inline="true"  class="demo-form-inline">
              <el-row>
                  <el-col :span="20">
                    <el-form-item :label="$t('artificial.applyId')"> 	<!-- 申请件编号 -->
                      <el-input v-model="obj.applyId"></el-input><!-- 请输入申请件编号 -->
                    </el-form-item>
                    <el-form-item :label="$t('artificial.ApprovalPerson')">     	<!-- 审批人员 -->
                      <el-input v-model="obj.userName"></el-input><!-- 请输入审批人员 -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="edit_module_btn" >
                      <el-form-item >
                          <el-button type="warning" icon="el-icon-search" @click="obj.pageNo = 1;initLoanArtSent();">{{$t('Query')}}</el-button> <!-- 查询 -->
                      </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
            
            	<!-- 列表模块 -->
            <div class="list_module">
              <div class="table_body">
                  <el-table border  :data="tableData"  size='small' style="width: 100%" :empty-text="$t('noData')">
                    <!--序号-->
                    <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                    <el-table-column prop="applyId" :label="$t('artificial.applyId')" align="center" min-width="265px"></el-table-column><!-- 申请件编号 -->
                    <el-table-column prop="userName" :label="$t('artificial.ApprovalPerson')" align="center" min-width="210px"> </el-table-column><!-- 审批人员 -->
                    <el-table-column prop="productName" :label="$t('artificial.productName')" align="center" min-width="140px"> </el-table-column><!-- 产品名称 -->
                    <el-table-column prop="acceptDate" :label="$t('artificial.TaskGenerationDate')" align="center" min-width="180px"> <!-- 任务生成日期 -->
                    </el-table-column>
                    <el-table-column prop="acceptTime" :label="$t('artificial.TaskGenerationTime')" align="center" min-width="195px"> <!-- 任务生成时间 -->
                    </el-table-column>
                    <el-table-column :label="$t('artificial.operation')" width="200px" align="center" v-if="funList.indexOf('调件') > -1 " min-width="150px"><!-- 操作 -->
                      <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="thingThat(scope.row)" v-if="funList.indexOf('调件') > -1 ">{{$t('artificial.AdjustingParts')}}</el-button><!-- 调件 -->
                      </template>
                    </el-table-column>

                  </el-table>

                   <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page="obj.pageNo"
                      :page-size="obj.pageSize"
                      layout="prev, pager, next, slot"
                      :total="totalCount">
                      <template slot>
                        <div class="slot_pag">
                          <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange">  <!-- 10条/页 -->
                            <el-option :value="5" :label="'5'+$t('size')"></el-option>
                            <el-option :value="10" :label="'10'+$t('size')"></el-option>
                            <el-option :value="15" :label="'15'+$t('size')"></el-option>
                          </el-select>
                          <span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
                          <span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
                          <el-input size="mini" v-model="obj.goPage" type="number">
                            </el-input><span>{{$t('Pag')}}</span><!-- 页 -->
                          <el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button><!-- 确定 -->
                        </div>
                      </template>
                    </el-pagination>
              </div>
            </div>    

            <!--弹框页面开始-->
            <el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
              <el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="addForm" :rules="$rules.loanArtificialSent" ref="addForm" id="addForm" size="small"  label-width="150px">
                    <!-- <el-form-item label="岗位类型" prop="loanArtSentType"  >
                      <el-input v-model="addForm.loanArtSentType"  disabled></el-input>
                    </el-form-item> -->
                    <el-form-item :label="$t('artificial.JobName')" prop="loanArtSentName" ><!-- 岗位名称 -->
                      <el-input v-model="addForm.loanArtSentName"  disabled></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('artificial.fpspyh')" prop="loanArtSentUser" ><!-- 分配审批用户 -->
                      <el-select v-model="addForm.loanArtSentUser" filterable placeholder="">
                        <el-option 
                                  v-for="(item,index) in handleUserArr" 
                                  :key="index"
                                  :label="item.userName"
                                  :value="item.userId"
                                  ></el-option>
                      </el-select>
                    </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button><!-- 保存 -->
              </div>
            
            </el-dialog>
            <!--弹框页面结束-->

        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoanArtificialSent',
  data () {
    return {
      tableData:[{}], //table
      obj: {
        pageSize:10,//一页显示几条数据
        pageNo:1,  //需要传过去的参数
        applyId:'', //申请件编号
        userName:'', //审批人员
        userId:this.$store.state.loginData.userLogin.loginId,
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        goPage: null,
      },
      totalCount:0,//一共有多少条数据
      dialogFormVisible:false,
      handleUserArr:[], //分配审批用户
      addForm:{
        // loanArtSentType:'消贷', //岗位类型
        loanArtSentName:'', //岗位名称
        loanArtSentUser:'', //分配审批用户
      },
      title:'',
      taskUserId:'',
      row:{},
      funList: []
    }
  },
  mounted(){
    this.getFunList()
    this.initLoanArtSent(); //初始化
  },
  methods:{
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '消贷人工派件'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    initLoanArtSent () {
      this.$post(this.$approve + '/handmade/selectTaskByUserId',this.obj).then(res =>{
        if(res.code == '000000'){
          this.tableData =  res.data.listData;
          this.totalCount = res.data.total;
        } 
      });
    },

    // 调件
    thingThat(row){
      this.dialogFormVisible =true;
      this.title = i18n.t('artificial.ManualAdjustments') ;//人工调件
      this.addForm.loanArtSentName = row.activityName;
      this.row = row;
      this.taskUserId = row.userId
      var obj={
        "processInstanceId":row.processInstanceId,
        "applyId":row.applyId,
        "businessType":row.bussinessType,
        "taskUserId":row.userId,
      }
      this.$post(this.$approve + '/handmade/selectUserApplyCountByApplyInfo',obj).then(res =>{
          if(res.code == '000000'){
              this.handleUserArr =  res.data;
          }
      });
    },
    //保存
    submitAdd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var FunMsgData={
              "id":this.row.id,
              "loginUserId":this.$store.state.loginData.userLogin.loginId,
              "taskUserId":this.taskUserId,
              "userId":this.addForm.loanArtSentUser
          }
          this.$post(this.$approve + '/handmade/updateTaskUser',FunMsgData).then(res=>{
            if(res.code=="000000"){
              this.cancel();
              this.$alert( i18n.t('artificial.saveSuccess'), i18n.t('Prompt'), {//保存成功！
                dangerouslyUseHTMLString: true
              });
              this.initLoanArtSent();
            }else {
              var str = `
                <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
              `
              this.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
          })

        }
      })
    },
    //取消弹框重置数据
    cancel(){
      this.dialogFormVisible = false;
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goPageSure () {
        var mc=Math.ceil(this.totalCount/this.obj.pageSize);
        if(this.obj.goPage>0&&this.obj.goPage<=mc){
            this.obj.pageNo = Number(this.obj.goPage)
            this.initLoanArtSent();
            this.obj.goPage = '';
        }else{
            this.obj.pageNo = mc
            this.initLoanArtSent();
            this.obj.goPage = '';
        }
    },
    //改变每页显示多少条
    handleSizeChange(val) {
      this.obj.pageSize =  val;
       this.obj.pageNo = 1
      this.initLoanArtSent()
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.obj.pageNo = val;
      this.initLoanArtSent();
    },




  }

}
</script>

<style scoped lang='scss'>
.home{
    height: 100%;
}
// .el-table--border::after, .el-table--group::after, .el-table::before {
//     content: '';
//     position: absolute; 
//     background-color: #fff; 
//     z-index: 1;
// }
.el-form--inline .el-form-item {
    margin-right: 30px;
}
.el-tabs{
    margin-top: 10px;
    padding: 10px;
    background: #fff;
}
.title{
    line-height: 40px;
    border-bottom: 1px solid $bordercolor;
    color: $fdcolor;
    padding: 0 15px;
    font-weight: normal;
}
.home_main{
  .home_item{
    background: #fff;
    .chart{
       padding: 10px 0;
    }
  }
}
.home_title{
  background: #fff;
}
.home_con{
  width: 100%;
  form{
     background: #fff;
     padding: 20px 20px 0;
  }
  .home_data{
    width: 100%;

  }
}
.home_con1{
  background: #fff;
  padding: 0 15px;
}
.home_con1_top{
  width:60%;
  overflow: hidden;
  .select_date{
    padding: 15px;
    span{
      color: #666;
    }
  }
}
.home_con1_bot{
  width:40%;
  overflow: hidden;
  .home_data1{
    width: 100%;
  }
}
.paging_box{
  text-align: right;
  padding: 10px 0;
}
</style>

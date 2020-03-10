<template>
  <div class="home">
    <div class="home_main clearfix">
        <div class="home_con clearfix">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-row>
                  <el-col :span="21">
                      <el-form-item :label="$t('workBench.application_Number')">
                        <el-input v-model="obj.applyId"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="3" class="edit_module_btn" >
                      <el-form-item >
                         <el-button type="warning" icon="el-icon-search" @click="obj.pageNo = 1;display();">{{$t('Query')}}</el-button> <!-- 查询 -->
                      </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
            
            <el-tabs v-model="obj.wfState"> <!--type="border-card"-->
                <el-tab-pane :label="$t('workBench.receivable_tasks')" name="0">
                    <template>
                      <el-table border
                        :data="tableData"  size='small' style="width: 100%" :empty-text="$t('noData')">
                        <el-table-column type="index" align="center" :label="$t('workBench.serial_number')" width="135px"></el-table-column>
                        <el-table-column prop="applyId" :label="$t('workBench.application_Number')" align="center" min-width="155px"></el-table-column>
                        <el-table-column prop="productName" :label="$t('workBench.product_name')" align="center" min-width="115px"></el-table-column>
                        <el-table-column prop="peopleResource" :label="$t('workBench.reasons_for_conversion')" align="center" min-width="190px"> </el-table-column>
                        <el-table-column prop="acceptDate" :label="$t('workBench.task_generation_date')" align="center" min-width="160px"> </el-table-column>
                        <el-table-column prop="acceptTime" :label="$t('workBench.task_generation_time')" align="center" min-width="150px"> </el-table-column>
                        <el-table-column :label="$t('workBench.operation')" width="200px" align="center" min-width="125px">
                          <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="bringItem(scope.row)">{{$t('workBench.receive')}}</el-button>
                          </template>
                        </el-table-column>

                      </el-table>
                    </template>

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
                          <el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button>
                        </div>
                      </template>
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="$t('workBench.To_do_tasks')" name="1">
                    <template>
                      <el-table border
                        :data="tableData1"  size='small' style="width: 100%" :empty-text="$t('noData')">
                        <el-table-column type="index" align="center" :label="$t('workBench.serial_number')" width="135px"></el-table-column>
                        <el-table-column prop="applyId" :label="$t('workBench.application_Number')" align="center" min-width="155px"></el-table-column>
                        <el-table-column prop="productName" :label="$t('workBench.product_name')" align="center" min-width="120px"></el-table-column>
                        <el-table-column prop="peopleResource" :label="$t('workBench.reasons_for_conversion')" align="center" min-width="165px"> </el-table-column>
                        <el-table-column prop="acceptDate" :label="$t('workBench.date_of_acceptance')" align="center" min-width="140px"> </el-table-column>
                        <el-table-column prop="acceptTime" :label="$t('workBench.time_of_acceptance')" align="center" min-width="145px"> </el-table-column>
                        <el-table-column prop="overTime" :label="$t('workBench.overtime_warning')" align="center" min-width="150px">
                          <template slot-scope="scope">
                            {{scope.row.isOverTime == 0 ? $t('workBench.not_overtime') : $t('workBench.overtime')}}
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('workBench.operation')" align="center" min-width="120px">
                          <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="taskLoan(scope.row)" >{{$t('workBench.handle')}}</el-button>
                            <!-- <el-button type="primary" size="small" @click="preview(scope.row)">合同签署</el-button> -->
                          </template>
                        </el-table-column>

                      </el-table>
                    </template>

                    <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page="obj.pageNo"
                      :page-size="obj.pageSize"
                      layout="prev, pager, next, slot"
                      :total="totalCount">
                      <template slot>
                        <div class="slot_pag">
                          <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange" >  <!-- 10条/页 -->
                            <el-option :value="5" :label="'5'+$t('size')"></el-option>
                            <el-option :value="10" :label="'10'+$t('size')"></el-option>
                            <el-option :value="15" :label="'15'+$t('size')"></el-option>
                          </el-select>
                          <span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
                          <span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
                          <el-input size="mini" v-model="obj.goPage" type="number">
                            </el-input><span>{{$t('Pag')}}</span><!-- 页 -->
                          <el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button>
                        </div>
                      </template>
                    </el-pagination>
                  
                </el-tab-pane>

                <el-tab-pane :label="$t('workBench.tasks_already_done')" name="2">
                    <template>
                      <el-table border
                        :data="tableData2"  size='small' style="width: 100%" :empty-text="$t('noData')">
                        <el-table-column type="index" align="center" :label="$t('workBench.serial_number')" width="135px"></el-table-column>
                        <el-table-column prop="applyId" :label="$t('workBench.application_Number')" align="center" min-width="150px"></el-table-column>
                        <el-table-column prop="productName" :label="$t('workBench.product_name')" align="center" min-width="115px"></el-table-column>
                        <el-table-column prop="peopleResource" :label="$t('workBench.reasons_for_conversion')" align="center" min-width="170px"> </el-table-column>
                        <el-table-column prop="doneDate" :label="$t('workBench.completion_date')" align="center" min-width="140px"> </el-table-column>
                        <el-table-column prop="doneTime" :label="$t('workBench.completion_time')" align="center" min-width="145px"> </el-table-column>
                        <el-table-column prop="handleResult" :label="$t('workBench.examination_and_approval_results')" align="center" min-width="230px">
                          <template slot-scope="scope">
                            {{scope.row.handleResult | handleResult}}
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('workBench.operation')" width="200px" align="center"  min-width="100px">
                          <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="taskLoanDetail(scope.row)"> {{$t('workBench.details')}}</el-button>
                            <!-- <el-button type="primary" size="small" @click="seeContract(scope.row)"> 合同下载</el-button> -->
                          </template>
                        </el-table-column>

                      </el-table>
                    </template>

                    <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page="obj.pageNo"
                      :page-size="obj.pageSize"
                      layout="prev, pager, next, slot"
                      :total="totalCount">
                      <template slot>
                        <div class="slot_pag">
                          <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange" >  <!-- 10条/页 -->
                            <el-option :value="5" :label="'5'+$t('size')"></el-option>
                            <el-option :value="10" :label="'10'+$t('size')"></el-option>
                            <el-option :value="15" :label="'15'+$t('size')"></el-option>
                          </el-select>
                          <span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
                          <span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
                          <el-input size="mini" v-model="obj.goPage" type="number">
                            </el-input><span>{{$t('Pag')}}</span><!-- 页 -->
                          <el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button>
                        </div>
                      </template>
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>  
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoanElimination',
  data () {
    return {
      form:{  //查询参数
          num:'',
          name:'',
          id:''
      }, 
      tableData:[], //可领取任务
      tableData1:[],//待办任务
      tableData2:[],//已办任务
      obj: {
        pageSize:10,//一页显示几条数据
        pageNo:1,  //需要传过去的参数
        userId: this.$store.state.loginData.userLogin.loginId, 
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        wfState: '1',
        goPage: null,
        applyId: ''
      },
      totalCount:0,//一共有多少条数据
      pdfdialogFormVisible: false,
      numPages: '',
      src: '',
      funList: []
    }
  },
  watch : {
    'obj.wfState' (n) {
      this.obj.pageNo = 1
      if (n == 0) {
        this.bring()
      } else if (n == 1) {
        this.todo()
      } else {
        this.done()
      }
    }
  },
  mounted(){
    this.getFunList()
    this.todo()
  },
  methods:{
    // 获取权限功能
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '消贷工作台'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 领取任务
    bringItem(row){
      var _this =this;
      this.$confirm(i18n.t('workBench.whether_or_not_the_transferee_receives_the_task'), i18n.t('Prompt'), {
          confirmButtonText: i18n.t('OK'),
          cancelButtonText: i18n.t('Cancel'),
          type: 'warning'
      }).then(() => {
        _this.$post(_this.$approve + '/WFGet',{id: row.id, userId: _this.$store.state.loginData.userLogin.loginId}).then(function(res){ 
          if(res.code == '000000'){
            _this.display()
            _this.$alert(i18n.t('workBench.success'), i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }else{
            var str = `
              <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
              <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
              `
            _this.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
            _this.display()
          }
        })
      }).catch(() => {
        
      });
    },
    // 初始化
    display () {
      if (this.obj.wfState == 0) {
        this.bring()
      } else if (this.obj.wfState == 1) {
        this.todo()
      } else {
        this.done()
      }
    },
    //处理代办任务
    taskLoan(row){
      if(row.activityName =='人工复核岗'){
       
        this.$router.push('/MainIndex/loanReviewTask?id=1')
        this.$store.commit('setLoanTaskData',row); 
      }else{
         this.$router.push('/MainIndex/loanDealTask?id=1')
         this.$store.commit('setLoanTaskData',row);
      }
    },
    //查看详情
    taskLoanDetail(row){
      this.$router.push('/MainIndex/loanTaskDetail?id=1')
      this.$store.commit('setLoanTaskData',row);
    },
    // 点击确定页面跳转
    goPageSure () {
      if (this.obj.goPage) {
        var mc=Math.ceil(this.totalCount/this.obj.pageSize);
        if (this.obj.goPage) {
          if(this.obj.goPage>0&&this.obj.goPage<=mc){
            this.obj.pageNo = parseInt(this.obj.goPage)
          }else{
            this.obj.pageNo = parseInt(mc)
          }
        }
        this.display()
        this.obj.goPage = null
      }
    },
    // 可领取任务列表
    bring () {
      this.$post(this.$approve + '/WorkGetList',this.obj).then(res =>{
        if(res.code == '000000'){
          this.tableData =  res.data ? res.data.listData:[];
          this.totalCount = res.data ? res.data.total : 0;
        } else {
          var str = `
            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
          `
          this.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });
    },
    // 待办任务
    todo () {
      this.$post(this.$approve + '/LoanWfList',this.obj).then(res =>{
        if(res.code == '000000'){
          this.tableData1 =  res.data.listData;
          this.totalCount = res.data.total;
        } else {
          var str = `
            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
          `
          this.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });
    },
    // 已完成任务
    done () {
      this.$post(this.$approve + '/processed',this.obj).then(res =>{
        if(res.code == '000000'){
          this.tableData2 =  res.data.listData;
          this.totalCount = res.data.total;
        } else {
          var str = `
            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
          `
          this.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });
    },
    //改变每页显示多少条
    handleSizeChange(val) {
      this.obj.pageSize =  val;
      this.obj.pageNo = 1
      if (this.obj.wfState == 0) {
        this.bring()
      } else if (this.obj.wfState == 1) {
        this.todo()
      } else {
        this.done()
      }
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.obj.pageNo = val;
      if (this.obj.wfState == 0) {
        this.bring()
      } else if (this.obj.wfState == 1) {
        this.todo()
      } else {
        this.done()
      }
    },
  },
  filters: {
    handleResult (val) {
      if(val == 0) {
        return i18n.t('workBench.refuse') // 拒绝
      } else if(val == 1) {
        return i18n.t('workBench.pass') // 通过
      } else if(val == 2) {
        return i18n.t('workBench.send_back') // 退回
      } else if(val == 3) {
        return i18n.t('workBench.reject') // 驳回
      } else if(val == 4) {
        return i18n.t('workBench.transfer_to_manpower') // 转人工
      }
    }
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
  padding:0px 0px;
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

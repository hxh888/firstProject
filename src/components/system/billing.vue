<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="22">
              <el-form-item :label="$t('account.Accounting_Date')"> <!-- 记账日期 -->
                <el-date-picker v-model="obj.runDate" type="date" value-format="yyyy-MM-dd"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <el-button type="primary" icon="el-icon-setting" @click="editItem(tableData[0])" size="small" v-if="funList.indexOf('手工')>-1">{{$t("account.Manual_daily_cutting")}}</el-button> <!-- 手工日切 -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
            <h4>{{$t("account.Accounting_Date_Management")}}</h4>
            <el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
            <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->

            <el-table-column prop="runDate" :label="$t('account.Accounting_Date')"  align="center"></el-table-column><!--记账日期-->
            
			<el-table-column prop="switchType" :label="$t('account.Switching_mode')"  align="center">
                <template slot-scope="scope">
                    {{scope.row.switchType | level(switchTypeList)}}
                </template>
            </el-table-column><!--切换模式	-->
              
            <el-table-column prop="switchTime" :label="$t('account.Switching_time')" align="center"></el-table-column><!--切换时间	-->

            <el-table-column prop="useStatus" :label="$t('account.Use_identification')" align="center"><!-- 使用标识 -->
                <template slot-scope="scope">
                    {{scope.row.useStatus | level(useStatusList)}}
                </template>
            </el-table-column>
					</el-table>
					<el-pagination
					@current-change="handleCurrentChange"
					:current-page="obj.pageIndex"
					:page-size="obj.pageSize"
					layout="prev, pager, next, slot"
					:total="totalCount">
					<template slot>
						<div class="slot_pag">
              <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange" style="width:auto!important;">  <!-- 10条/页 -->
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
							<span>{{$t('Jump_to')}} </span> <!-- 跳转至 -->
							<el-input size="mini" v-model="obj.goPage" type="number">
								</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
				</el-pagination>
				</div>
			</div>
		<!--弹框页面开始-->
		<!--新增弹框页面开始-->
    <el-dialog :title="$t('account.Manual_daily_cutting')" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">  <!-- 手工日切 -->
      	<el-form :model="addForm"  ref="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
			    <el-row class="edit_module_search">
          <el-col :span="12">
              <el-form-item :label="$t('account.Current_Accounting_Date')"> <!-- 当前记账日期 -->
                <el-input v-model="addForm.runDate" disabled></el-input>
              </el-form-item>
          </el-col>		
          <el-col :span="12">
                <el-form-item :label="$t('account.Date_of_sunset')" prop="rqrq">   <!-- 日切日期 -->
                  <el-date-picker v-model="addForm.rqrq" type="date" style="width: 100%" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
          </el-col>	

          <el-col :span="12">
                <el-form-item :label="$t('account.Current_handover_mode')">   <!-- 当前切换模式 -->
                  <el-select v-model="addForm.switchType" style="width: 100%;" disabled placeholder="">
                    <el-option v-for="item in switchTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                  </el-select>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12">
                <el-form-item :label="$t('account.Current_toggle_date')">   <!-- 当前切换日期 -->
                  <el-input v-model="addForm.switchTime" disabled></el-input>
                </el-form-item>
          </el-col>	
          
        </el-row> 
      </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('addForm')" >{{$t('account.Return')}}</el-button><!-- 返 回 -->
            <el-button type="primary" @click="sure('addForm')">{{$t('Save')}}</el-button><!-- 保 存 -->
          </div>
      </el-dialog>
    <!--新增弹框页面结束-->
		
	

  </div>
</template>

<script>
export default {
  name: 'Billing',
  data () {
    return {
      tableData:[],  //user 列表数据
      obj: {
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //需要传过去的参数
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        runDate: ''
      },
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      addUserDialog:false,  //弹框	
      addForm:{
        companyName: '',
        runDate: '',
        rqrq: '',
        switchType: '',
        switchTime: '',
        createUser: this.$store.state.loginData.userLogin.userName,
        flag:false,   //是否可输入 默认可以
        edit:false	 //编辑标识
      },
      switchTypeList: [],
      useStatusList: [],
      row: {},
        rules:{
            rqrq:[
            { required: true, message: i18n.t('account.Please_choose_the_date_of_suncut'), trigger: 'blur' },
            ],
        },
    funList: []
    }
  },
  mounted(){
    this.getFunList()
    this.getParam()
	  this.display(); // 初始化数据
  },
  
  methods:{
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '记账日期管理'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取切换模式和使用标识列表
    getParam:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'SWITCH_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.switchTypeList =  res.returnData;
        }
      });
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'USE_STATUS'}).then(res =>{
        if(res.returnCode == '000000'){
          this.useStatusList =  res.returnData;
        }
      });
    },
    // 点击确定切换分页
    goPageSure () {
      if (this.obj.goPage) {
        var mc=Math.ceil(this.totalCount/this.obj.pageSize);
        if (this.obj.goPage) {
          if(this.obj.goPage>0&&this.obj.goPage<=mc){
            this.obj.pageIndex = parseInt(this.obj.goPage)
          }else{
            this.obj.pageIndex = parseInt(mc)
          }
        }
        this.display()
        this.obj.goPage = null
      }
    },
    // 确定
    sure (formName) {
      let self = this
      self.$refs['addForm'].validate((valid) => {
        if (valid) {
          let path = '/switchDay/updateSwitchDay'
          this.$post(this.$api + path,{dayId: this.addForm.dayId, runDate: this.addForm.rqrq, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
            if(res.returnCode == '000000'){
                this.$alert(i18n.t('account.Daily_success'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              this.addUserDialog = false;
              this.addForm.flag=false;
              this.addForm.edit=false;
              this.addForm.rqrq = ''
              this.addForm.dayId = ''
              this.display()
            } else {
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
                <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
              `
              this.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 初始化列表
    display:function(){
      this.$post(this.$api + '/switchDay/queryByPage',this.obj).then(res =>{
        if(res.returnCode == '000000'){
          this.tableData =  res.returnData.rows;
          this.totalCount = res.returnData.total;
        } else {
          var str = `
            <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
          `
          this.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });

    },
    
    //查询列表
    QueryUser(){
      this.obj.pageIndex = 1;
      this.display()
    },

    //打开新增弹框
    openUserDiolog(){
      this.addUserDialog = true;
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
    },
    
    // 修改
    editItem (row) {
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = true;
      this.addForm.dayId = row.dayId
      setTimeout(function() {
        self.$post(self.$api + '/switchDay/queryById',{dayId:row.dayId}).then(res =>{
          if(res.returnCode == '000000'){
            self.addForm.runDate = res.returnData.runDate
            self.addForm.switchType = res.returnData.switchType
            self.addForm.switchTime = res.returnData.switchTime
          } else {
            var str = `
              <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
            `
            this.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }
        });
      }, 50)
    },
    
    //取消弹框重置数据
    cancels(formName){
      this.addUserDialog = false;
      this.addForm.flag=false;
      this.addForm.edit=false;
      if (this.$refs[formName]!==undefined) {
        this.$refs[formName].resetFields();
      }
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
    //改变每页显示多少条
    handleSizeChange(val) {
      this.obj.pageSize =  val;
      this.obj.pageIndex = 1
      this.display();
    },
    //选择页数改变数据
    handleCurrentChange(val) {
      this.obj.pageIndex =val;
      this.display();
    },
  },
  filters: {
    level (val, levelList) {
      let sname = ''
      levelList.map(item => {
        if (item.paramValue == val) {
          sname = item.paramSname
        }
        return false
      });
      return sname || ''
    }
  }
}
</script>

<style  lang='scss' scoped="scoped">
#contract_content{
	.el-dialog {
		width:60%!important;
	}
}
.el-upload__tip{
  margin-top: 0;
  margin-left: 10px;
}
.el-input-group__prepend{
  background: #3a8ee6;
  color: #fff;
  border: none;
}
</style>

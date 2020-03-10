<template>
  <!-- 基准利率 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="22">
              <!-- 贷款周期 -->
              <el-form-item :label="$t('bench.loanCycle')"> 
                <!--<el-input v-model="obj.loanPeriod" class="input-with-select"></el-input>--> 
                <el-select v-model="obj.loanPeriod" placeholder="">
                  <el-option :label="$t('product.whole')" value="" ></el-option>
                  <el-option v-for="item in loanList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                </el-select>
              </el-form-item>  
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()" v-if="funList.indexOf('新增') > -1" size="small">{{$t("Add")}}</el-button>  <!-- 新增 -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
          <!-- 基准利率列表 -->
					<h4>{{$t('bench.benchmarkInterestRateList')}}</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
							<el-table-column prop="loanPeriod" :label="$t('bench.loanCycle')"   align="center" min-width="140px"><!--贷款周期-->
                <template slot-scope="scope">
                  {{scope.row.loanPeriod | level(loanList)}}
                </template>
              </el-table-column><!--证件类型-->
              
							<el-table-column prop="yearRate" :label="$t('bench.annualInterestRate')" align="center" min-width="190px"> </el-table-column><!--年利率(%)	-->

              <el-table-column prop="createTime" :label="$t('Create_date')" align="center" min-width="90px">
              	<template slot-scope="scope">
                  {{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
               </template>
              </el-table-column><!--创建日期	-->

              <el-table-column prop="rateState" :label="$t('Status')" align="center" min-width="95px">
                <template slot-scope="scope">
                  {{scope.row.rateState | level(statusList)}}
                </template>
              </el-table-column><!--状态-->
							<el-table-column :label="$t('Operation')" align="center" min-width="140px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1"><!--操作	-->
								<template slot-scope="scope">
										<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
											<i class="el-icon-view"></i>
											<span class="text">{{$t('See')}}</span><!--查看	-->
										</el-button>
                    <el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t('Edit')}}</span><!--编辑	-->
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funList.indexOf('删除') > -1">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t('Delete')}}</span><!--删除	-->
										</el-button>
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
              <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange">  <!-- 10条/页 -->
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
							<span>{{$t('Jump_to')}} </span>
							<el-input size="mini" v-model="obj.goPage" type="number">
								</el-input><span>{{$t('Pag')}}</span>
							<el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button>
						</div>
					</template>
				</el-pagination>
				</div>
			</div>
		<!--弹框页面开始-->
		<!--新增弹框页面开始-->
    <el-dialog :title="addForm.title" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">
      	<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="addForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
			    <el-row class="edit_module_search">
          <el-col :span="12">
            <!-- 法人编号 -->
              <el-form-item :label="$t('product.legal_person_number')"> 
                <el-input v-model="addForm.legalPersonNum" disabled></el-input>
              </el-form-item>
          </el-col>		
          <el-col :span="12">
            <!-- 公司名称 -->
                <el-form-item :label="$t('product.company_name')">   
                  <el-input type="text"  v-model="addForm.companyName" disabled></el-input >
                </el-form-item>
          </el-col>	
          <el-col :span="12">
            <!-- 贷款周期 -->
            <el-form-item :label="$t('bench.loanCycle')" :prop="(addForm.edit || addForm.flag)? '':'loanPeriod'">
							<el-select v-model="addForm.loanPeriod" :disabled="addForm.edit || addForm.flag" style="width:100%">
								<el-option v-for="item in loanList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
							</el-select>
						</el-form-item>
          </el-col>	
          <el-col :span="12">
            <!-- 年利率(%) -->
                <el-form-item :label="$t('bench.annualInterestRate')" :prop="addForm.flag ? '':'yearRate'">   
                  <el-input type="text"  v-model="addForm.yearRate" :disabled="addForm.flag"></el-input >
                </el-form-item>
          </el-col>		
          <el-col :span="12">
            <!-- 状态 -->
           	<el-form-item label="状态" :prop="addForm.flag ? '':'rateState'" > <!-- 账单频率 -->
							<el-select v-model="addForm.rateState" :disabled="addForm.flag"  style="width:100%" >
								<el-option v-for="item in statusList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
							</el-select>
						</el-form-item>
          </el-col>	
          
          <el-col :span="12" v-if="addForm.flag">
            <!-- 创建时间 -->
                <el-form-item :label="$t('product.create_time')"> 
                  <el-input type="text" v-model="addForm.createTime" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addForm.flag">
            <!-- 创建用户 -->
                <el-form-item :label="$t('product.create_user')"> 
                  <el-input type="text" v-model="addForm.createUser" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addForm.flag">
            <!-- 维护时间 -->
                <el-form-item :label="$t('product.maintenance_time')"> 
                  <el-input type="text" v-model="addForm.updateTime" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addForm.flag">
            <!-- 维护用户 -->
                <el-form-item :label="$t('product.maintain_user')"> 
                  <el-input type="text" v-model="addForm.updateUser" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
        </el-row> 
      </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('addForm')" v-if="addUserDialog && !addForm.edit && !addForm.flag">{{$t('Reset')}}</el-button>
            <el-button type="primary" @click="sure('addForm')" v-if="!addForm.flag">{{$t('Save')}}</el-button>
          </div>
      </el-dialog>
    <!--新增弹框页面结束-->
		
	

  </div>
</template>

<script>
export default {
  data () {
    return {
      obj:{
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //当前显示第几页
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        loanPeriod: '',//贷款周期
        goPage: null //要去第几页
      },
      loanList:[],//贷款周期列表
      statusList:[],//状态列表
      totalCount:10,
      tableData:[],  // 列表数据
      addUserDialog:false,//弹框显示
      addForm:{
      	title:"查看基准利率详情",//弹框的标题
        legalPersonNum: '',
        companyName: '',
        loanPeriod: '',
        yearRate:"",
        rateState:"",
        createTime:"",
        createUser: this.$store.state.loginData.userLogin.userName,
        updateTime:"",
        updateUser:"",
        id:"",
        flag:false,   //是否可输入 默认可以
        edit:false,	 //编辑标识
        add:false    //新增标识
      },
      funList:[],
	    rules:{
          loanPeriod:[
          	{required:true,message:i18n.t('bench.NotEmptyLoanCycle'),trigger:'change'}//贷款周期不能为空
          ],
          yearRate:[
          	{required:true,message:i18n.t('bench.NotEmptyAnnualInterestRate'),trigger:'blur'},//年利率不能为空
          	{ pattern:/^\d/g, message:i18n.t('bench.onlyNumAnnualInterestRate'), trigger: 'blur' },//年利率只能输入数字，请重新输入
          ],
          rateState:[
          	{required:true,message:i18n.t('bench.NotEmptyState'),trigger:'change'}//状态不能为空
          ]
	    },
    }
  },
  mounted(){
    this.getFunList()
    this.getLoanList();
    this.getStatus();
		this.display(); // 初始化数据
		
  },
  watch: {
  },
  methods:{
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '基准利率管理'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取证件类型
    getLoanList(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'LOAN_PERIOD_CYCLE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.loanList =  res.returnData;
        }
      });

    },
    
    getStatus(){//生效失效
    	this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'STATUS'}).then(res =>{
        if(res.returnCode == '000000'){
          this.statusList =  res.returnData;
        }
      });
    },
    // 获取额度信息
    getLimit () {
      if (this.addForm.gradeLeavel) {
        this.$post(this.$api + '/paramValues/findParam',{paramCode: 'APPROVE_MONEY', paramValue: this.addForm.gradeLeavel}).then(res =>{
          if(res.returnCode == '000000'){
            this.addForm.approveLimit =  res.returnData.paramSname;
          }
      });
      }
    },
    // 点击确定页面跳转
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
          let path = ''
          if (this.addForm.edit) {
            path = '/benchmarkRate/updateRate'
            this.addForm.createUser = ''
            this.addForm.updateUser = this.$store.state.loginData.userLogin.userName
          } else {
            path = '/benchmarkRate/saveRate'  //新增确定
            this.addForm.createUser = this.$store.state.loginData.userLogin.userName
            this.addForm.updateUser = ''
          }
          this.$post(this.$api + path,this.addForm).then(res =>{
            if(res.returnCode == '000000'){
              if (this.addForm.edit) {
                this.$alert(i18n.t('product.edit_success'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              } else {
                this.$alert(i18n.t('product.new_success'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              }
              
              this.$refs[formName].resetFields();
              this.addUserDialog = false;
              this.addForm.flag=false;
              this.addForm.edit=false;
              this.display()
            } else {
              var str = `
                <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
    	var obje={
    		"data":{
    			"loanPeriod":this.obj.loanPeriod
    		},
    		"pageSize":this.obj.pageSize,
    		"pageIndex":this.obj.pageIndex
    	}
      this.$post(this.$api + '/benchmarkRate/queryByPage',obje).then(res =>{
        if(res.returnCode == '000000'){
          this.tableData =  res.returnData.content;
          this.totalCount = res.returnData.totalElements;
        } else {
          var str = `
            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
          `
          this.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });

    },
    // 根据获取法人公司信息
    getFrInfo () {
      this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
        if(res.returnCode == '000000'){
          this.addForm.legalPersonNum = res.returnData.legalPersonNum
          this.addForm.companyName = res.returnData.legalPersonName
        } else {
          var str = `
            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
      this.addForm.title="新增基准利率"
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.loanPeriod = ''
      this.addForm.yearRate = ''
      this.addForm.rateState = ''
      this.getFrInfo();
      this.addForm.add=true
      this.addUserDialog = true;
    },
    // 查看
    seeItem (row) {
      let self = this
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = false;
      this.addForm.flag = true
      this.getFrInfo()
      this.$post(this.$api+'/benchmarkRate/queryDetail',{id:row.id}).then(res=>{
      	if(res.returnCode== '000000'){
      		console.log(res)
      		this.addForm.loanPeriod=res.returnData.loanPeriod;
      		this.addForm.yearRate=res.returnData.yearRate;
      		this.addForm.rateState=res.returnData.rateState;
      		this.addForm.createTime=res.returnData.createTime;
      		this.addForm.createUser=res.returnData.createUser;
      		this.addForm.updateTime=res.returnData.updateTime;
      		this.addForm.updateUser=res.returnData.updateUser;
      	}
      })
      this.addUserDialog = true
    },
    // 修改
    editItem (row) {
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = true;
      this.addForm.loanPeriod=row.loanPeriod;
      this.addForm.yearRate=row.yearRate;
      this.addForm.rateState=row.rateState;
      this.addForm.id=row.id
      this.getFrInfo()
    },
    // 删除
    deleteItem(row){
      var _this =this;
      this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
          confirmButtonText: i18n.t('OK'),
          cancelButtonText: i18n.t('Cancel'),
          type: 'warning'
      }).then(() => {
        this.$post(this.$api + '/benchmarkRate/deleteRate',{id: row.id,loanPeriod:row.loanPeriod}).then(function(res){
          if(res.returnCode == '000000'){
            _this.display();
            _this.$alert(i18n.t('product.successfully_delete'), i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }else{
            var str = `
              <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
            `
            _this.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }
        })
      }).catch(() => {
        
      });
    },

    //取消弹框重置数据
    cancels(formName){
      this.addUserDialog = false;
      this.addForm.flag=false;
      this.addForm.edit=false;
      if (this.$refs[formName]!==undefined) {
        this.$refs[formName].resetFields();
      }
      this.addForm.createTime = ''
      this.addForm.createUser = ''
      this.addForm.updateTime = ''
      this.addForm.updateUser = ''
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //监听搜索框为空的时候展示全部数据
    onChangequery(){
      this.QueryUser();
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
    // 选取文件以后
    onPreview (file) {
      this.fileList = file.name
    }
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

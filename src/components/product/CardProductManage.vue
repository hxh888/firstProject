<template>
  <!-- 信用卡产品管理 -->
  <div class="content_box" id="pm_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
    	<el-form :inline="true"  class="demo-form-inline" size="small">
        <el-row class="edit_module_search">
						<!--<el-col :span="4">
							<el-select name="" id="" v-model="queryCardType" >
									<el-option label="产品名称" value="1"></el-option>
									<el-option label="产品代码" value="2"></el-option>
									<el-option label="关联审批流程" value="3"></el-option>
							</el-select>	
						</el-col>
						<el-col :span="10">
							<el-input v-model="queryCard" class="input-with-select"></el-input> 
						</el-col>-->
						<el-col :span="22">
							<el-form-item :label="$t('cProduct.productName')"><!--产品名称-->
								<el-input v-model="queryBizAllName" ></el-input>
							</el-form-item>
							<el-form-item :label="$t('cProduct.productCode')"><!--产品代码-->
								<el-input v-model="queryProductCode" ></el-input>
							</el-form-item>
							<el-form-item :label="$t('cProduct.associatedApprovalProcess')"> <!--关联审批流程-->
								<el-input v-model="queryApprovalProcess" ></el-input>
							</el-form-item>
							<el-form-item :label="$t('cProduct.nameOfOrganization')"><!--机构名称-->
								<el-input v-model="queryOrgNos" ></el-input>
							</el-form-item>
						</el-col>
	          <el-col :span="24">
				  		<div class="edit_module_btn">
				  			<el-button type="warning" icon="el-icon-search" @click="initProductManageList(1)" size="small">{{$t('Query')}}</el-button> <!--查询按钮-->
				  			<!--<el-button type="primary" icon="el-icon-plus"  @click="xdProductAdd('addForm')">新增</el-button>--> <!--新增按钮-->
				  		</div>
				  	</el-col>
        </el-row>  
     	</el-form>
    </div>

		<!-- 列表模块开始 -->
		<div class="list_module">
			<div class="table_body">
					<h4>{{$t('cProduct.productList')}}</h4><!--产品列表-->
					<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
							<el-table-column prop="bizAllName" :label="$t('cProduct.productName')"  align="center" min-width="125px"> </el-table-column><!--产品名称-->
							<el-table-column prop="productCode" :label="$t('cProduct.productCode')"  align="center" min-width="120px"> </el-table-column><!--产品代码-->
							<el-table-column prop="approvalProcess" :label="$t('cProduct.associatedApprovalProcess')"  align="center" min-width="230px"> </el-table-column><!--关联审批流程-->
							<el-table-column prop="orgNames" :label="$t('cProduct.subordinateInstitutions')" align="center" min-width="195px">
								<template slot-scope="scope">
									<el-popover
								    placement="top-start"
								    width="200"
								    trigger="hover"
								    :content="scope.row.orgNames ? scope.row.orgNames :'无所属机构' ">
								    <el-button type="text" slot="reference">{{$t('See')}}</el-button><!--查看-->
								  </el-popover>
							  </template>
							</el-table-column><!--所属机构-->
							<el-table-column prop="updateTime" :label="$t('MaintenanceDate')"  align="center" min-width="155px"><!--维护日期-->
								<template slot-scope="scope">
		 							{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
		 						</template>
							</el-table-column><!--创建日期-->
							<el-table-column prop="updateUser" :label="$t('MaintainingUsers')"  align="center" min-width="150px"></el-table-column><!--维护用户-->
	            <el-table-column :label="$t('Operation')" align="center" min-width="140px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('维护') > -1" >
								<template slot-scope="scope">
	                  <el-button size="mini" type="pramary" class="search-btn" @click="seeInfo(scope.row)" v-if="funList.indexOf('查看') > -1">
	                    <i class="el-icon-view"></i>
	                    <span class="text">{{$t('See')}}</span><!--查看-->
	                  </el-button>
	                  <el-button size="mini" type="warning" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('维护') > -1">
	                  	<!--产品维护-->
	                    <i class="el-icon-setting"></i>
	                    <span class="text">{{$t('cProduct.ProductMaintenance')}}</span><!--产品维护-->
	                  </el-button>
								</template>
							</el-table-column>
					</el-table>
				  <!--<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="currentPage"
								:page-sizes="[5, 10, 15, 20,25]"
								:page-size="pageSize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="totalCount"
								>
					</el-pagination>-->
					<el-pagination
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next, slot"
					:total="totalCount">
					<template slot>
						<div class="slot_pag">
							<el-select v-model="pageSize" size="mini" @change="handleSizeChange" style="width:auto!important;">  <!-- 10条/页 -->
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
							<span>{{$t('JumpTo')}}</span><!--跳转至-->
							<el-input size="mini" v-model="goPage" type="number">
							</el-input><span>{{$t('page')}}</span><!--页-->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('Determine')}}</el-button><!--确定-->
						</div>
					</template>
			</el-pagination>
				</div>
		</div>
		<!--列表模块结束-->
		
		<!--查看和维护弹框开始-->
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false" width="70%">
			<el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="addForm" :rules="rules" ref="addForm" id="addForm" size="small"  label-width="120px">
				<!--<el-row :gutter="20">-->
					<el-col :span="12">
						<el-form-item :label="$t('legalPersonNum')" prop="legalPersonNum"><!--法人编号-->
							<el-input v-model="addForm.legalPersonNum" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('companyName')" prop="companyName" ><!--公司名称-->
							<el-input v-model="addForm.companyName" disabled></el-input>
						</el-form-item>
					</el-col>
				<!--</el-row>-->
				<!--<el-row :gutter="20">-->
					<el-col :span="12" :gutter="20">
						<el-form-item :label="$t('cProduct.productName')" prop="bizAllName"><!--产品名称-->
							<el-input v-model="addForm.bizAllName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('cProduct.productCode')" prop="productCode" ><!--产品代码-->
							<el-input v-model="addForm.productCode" disabled></el-input>
						</el-form-item>
					</el-col>
				<!--</el-row>-->
				<!--<el-row :gutter="20" v-if="flag">-->
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('cProduct.OperationalModel')" prop="operatingMode"><!--运营模式-->
							<el-input v-model="addForm.operatingMode" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('cProduct.CardIssuingBankBin')" prop="issuingCard" ><!--发卡行卡bin-->
							<el-input v-model="addForm.issuingCard" disabled></el-input>
						</el-form-item>
					</el-col>
					<!--<el-col :span="12">
						<el-form-item label="产品类型" prop="prodTypeFlag" >
							<el-input v-model="addForm.prodTypeFlag" disabled></el-input>
						</el-form-item>
					</el-col>-->
				<!--</el-row>-->
				<!--<el-row :gutter="20" v-if="flag">-->
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('cProduct.FrequencyOfBills')" prop="billingFrequency"><!--账单频率-->
							<!--<el-input v-model="addForm.billingFrequency" disabled></el-input>-->
							<el-select v-model="addForm.billingFrequency" disabled placeholder="">
								<el-option value="100" label="按月"></el-option>
								<el-option value="101" label="按周"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('cProduct.BillFrequencyValue')" prop="billingFrequencyValue" ><!--账单频率值-->
							<el-input v-model="addForm.billingFrequencyValue" disabled></el-input>
						</el-form-item>
					</el-col>
				<!--</el-row>-->
				<!--<el-row :gutter="20" v-if="flag">-->
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('cProduct.MediaObjectCode')" prop="mediaCode"><!--媒介对象代码-->
							<el-input type="textarea" :autosize= "{minRows: 1, maxRows: 3 }" v-model="addForm.mediaCode" disabled></el-input>
						</el-form-item>
					</el-col>
				<!--</el-row>-->
				<!--<el-row :gutter="20">-->
					<!-- <el-col :span="12">
						<el-form-item :label="$t('cProduct.AssociatedApprovalProcess')"  :prop="addForm.mustInput ? 'approvalProcess':''">
						
							<el-select v-model="addForm.approvalProcess" :disabled="flag" @change="appKey()" placeholder="">
								<el-option
									v-for="(item,index) in Workflows"
									:key="index"
									:value="item.name"
									>
										<span style="float:left">{{item.name}}</span>
										
								</el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
					<el-col :span="12" ><!--orgNos  所属机构-->
						<el-form-item :label="$t('cProduct.subordinateInstitutions')" :prop="addForm.mustInput ? 'orgNos':''" ><!--所属机构 prop="orgNos"-->
							<el-cascader
								style="width:100%"
						    :options="orgNosS"
						    :props="{ multiple: true, checkStrictly: true }"
						    v-model="addForm.orgNos"
						    :show-all-levels="false"
						    @change="getName"
						    clearable
						    :disabled="flag">
						  </el-cascader>
						</el-form-item>
					</el-col>
					
					<el-col :span="12">
						<el-form-item :label="$t('cProduct.isAutoDistr')" :prop="addForm.mustInput ? 'isAutoDistr':''" ><!--是否自动派件 prop="isAutoDistr"-->
							<el-select v-model="addForm.isAutoDistr" :disabled="flag" placeholder="">
								<!--<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>-->
								<el-option v-for="(item,index) in isAutoDistrs" :key="index" :value="item.paramValue" :label="item.paramSname"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

				<!--</el-row>-->
				<!--<el-row :gutter="20" v-if="flag">-->
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('Create_time')"><!--创建时间-->
							<el-input v-model="addForm.createTime" type="datetime" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('Create_user')"><!--创建用户-->
							<el-input v-model="addForm.createUser" disabled></el-input>
						</el-form-item>
					</el-col>
				<!--</el-row>-->
				<!--<el-row :gutter="20" v-if="flag">-->
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('MaintenanceDate')"><!--维护时间-->
							<el-input v-model="addForm.updateTime"  type="datetime" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="flag">
						<el-form-item :label="$t('MaintainingUsers')"><!--维护用户-->
							<el-input v-model="addForm.updateUser" disabled></el-input>
						</el-form-item>
					</el-col>
				<!--</el-row>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addForm')" v-if="!flag">{{$t('Reset')}}</el-button><!--重置-->
				<el-button type="primary" @click="submitAdd('addForm')" v-if="!flag">{{$t('Save')}}</el-button><!--保存-->
				<!--<el-button v-if="addForm.flag==2" type="primary" @click="editSave('addForm')">保存</el-button>-->
			</div>
		</el-dialog>
		<!--菜单新增、修改、查询详情页面结束-->
		<!--查看和维护弹框结束-->
	</div>
</template>

<script>
export default {
  name: 'CardProductManage',
  data () {
    return {
      queryCardType:"1",//查询的信用卡产品类型
      queryCard:"",//查询的信用卡产品类型
      queryProductCode:"",//产品代码
      queryBizAllName:"",//产品名称
      queryApprovalProcess:"",//关联审批流程
      queryOrgNos:"",//机构名称
      totalCount:0,//总共有多少条数据
      pageSize:10,//一页显示几条
      currentPage:1,//当前是第几页，从1开始
      goPage:"",//跳到第几页1开始
      pageIndex:1,//当前第几页，从1开始
      tableData:[],//列表数据
      dialogFormVisible:false,//弹框是否可见
      seeInput:true,//可看见的文本框
      title:"",//
      flag:true,//详情页面可看见
      itemRow:{},//列表一条数据的内容
      Workflows:[],//全部关联审批流程数据
      orgNosS:[],//所属机构
      orgNosSS:[],//一级的所属机构
      isAutoDistrs:[],//是否自动派件
      addForm:{
      	legalPersonNum:this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
      	companyName:"",
      	bizAllName:"",//产品名称
      	productCode:"",//产品代码
      	operatingMode:"",//运营模式
      	prodTypeFlag:"",//产品类型
      	issuingCard:"",//发卡行BIN
      	billingFrequency:"",//账单频率
      	billingFrequencyValue:"",//账单频率值
      	mediaCode:"",//媒介对象代码
      	approvalProcess:"",//关联审批流程
      	approvalProcessKey:"",//关联审批流程k值
      	orgNos:"",//所属机构
      	createTime:"",
      	createUser:"",
      	updateTime:"",
      	updateUser:"",
		isAutoDistr:"1",//是否自动派件
		mustInput:true,//必须输入
      },
      rules:{
      	approvalProcess:[
    		{ required: true, message: i18n.t('cProduct.PleaseAssociatedApprovalProcess') , trigger: 'change'}//请选择关联审批流程
      	],
      	orgNos:[
      		{ required: true, message: i18n.t('cProduct.PleaseSubordinateInstitutions') , trigger: 'change'}//请选择所属机构
      	],
      	isAutoDistr:[
      		{ required: true, message: i18n.t('cProduct.PleaseIsAutoDistr') , trigger: 'change'}//请选择是否自动派件
      	],
      },
		funList: []
    }
  },
  created(){
	  this.defaultAddForm=$.extend({},this.addForm); //重置数据  初始化的时候深拷贝一下
	  
	  
  },
  mounted(){
		this.initProductManageList(1); //初始化列表数据
		this.getApprovalProcess();//关联流程
		this.getOrgNos()//所属机构
		this.getFrInfo()//获取公司名称
		this.getFunList()
		this.getLimitList("IS_AUTO_DISTR")
  },
  methods:{
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == '信用卡产品管理'
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
  	//初始化数据
  	initProductManageList(val){
  		this.pageIndex=val;
			this.currentPage=val
			if(this.queryBizAllName!=""||this.queryProductCode!=""||this.queryApprovalProcess!=""||this.queryOrgNos!=""){
				var queryObj={
	  			"indexNo":val,
	  			"pageSize":this.pageSize,
	  			"bizAllName":this.queryBizAllName,
		  		"productCode":this.queryProductCode,
		  		"approvalProcess":this.queryApprovalProcess,
		  		"orgNames":this.queryOrgNos
	  		}
			}else{
				var queryObj={
					"indexNo":val,
	  			"pageSize":this.pageSize
	  			
	  		}
			}
  		
//			this.$post(this.$api+"/api/SetProProductInforList",queryObj).then(res=>{
	this.$post(this.$api+"/api/getProductInfoList",queryObj).then(res=>{
  			if(res.returnCode=="000000"){
  				this.tableData=res.returnData.rows;
  				this.totalCount=res.returnData.totalCount;
  			}
  		})
  	},
  	
  	//查看
  	seeInfo(row){
  		var mediaCodeSlice=""
  		if(row.mediaCode.length>0){
  			row.mediaCode.split(',').forEach((value)=>{
					if(value=="MODM00010"){
//						mediaCodeSlice+="虚拟卡,"
						mediaCodeSlice+=i18n.t('cProduct.VirtualCard')+","
					}else if(value=="MODM00001"){
//						mediaCodeSlice+="磁条卡,"
						mediaCodeSlice+=i18n.t('cProduct.MagneticStripeCard')+","
					}else if(value=="MODM40001"||value=="MODM40002"){
//						mediaCodeSlice+="测试,"
						mediaCodeSlice+=i18n.t('cProduct.test')+","
					}else if(value=="MODM00002"){
//						mediaCodeSlice+="芯片卡,"
						mediaCodeSlice+=i18n.t('cProduct.ChipCard')+","
					}
				})
  			mediaCodeSlice=mediaCodeSlice.slice(0,mediaCodeSlice.length-1)
  		}else{
  			mediaCodeSlice=""
  		}
		this.itemRow=row;
		this.addForm.mustInput=false;
  		this.dialogFormVisible=true;
//		this.title="信用卡产品详情";
		  this.title = i18n.t('cProduct.CreditCardProductDetails');//信用卡产品详情
  		this.flag=true;//详情页面可看见更多
  		this.addForm.bizAllName=row.bizAllName;
  		this.addForm.productCode=row.productCode;
  		this.addForm.operatingMode=row.operatingMode;
  		this.addForm.prodTypeFlag=row.prodTypeFlag;
  		this.addForm.issuingCard=row.issuingCard;
  		this.addForm.billingFrequency=row.billingFrequency;
  		this.addForm.billingFrequencyValue=row.billingFrequencyValue;
  		this.addForm.mediaCode=mediaCodeSlice;
  		this.addForm.isAutoDistr=row.isAutoDistr;
  		this.addForm.approvalProcess=row.approvalProcess;
  		if(row.orgNos==""||row.orgNos==null||row.orgNos==[]){
  			this.addForm.orgNos=""
  		}else{
  			this.addForm.orgNos=JSON.parse(row.orgNos);
  		}
  		
  		this.addForm.createTime=row.createTime;
  		this.addForm.createUser=row.createUser;
  		this.addForm.updateTime=row.updateTime;
  		this.addForm.updateUser=row.updateUser;
  	},
  	//产品维护
  	editItem(row){
  		this.resetForm('addForm');
  		this.itemRow=row;
//		this.title="信用卡产品维护";
  		this.title=i18n.t('cProduct.MaintenanceOfCreditCardProducts');//信用卡产品维护
  		this.flag=false;//把详情页面部分字段设置隐藏
  		this.addForm.bizAllName=row.bizAllName;
  		this.addForm.productCode=row.productCode;
  		this.addForm.approvalProcess=row.approvalProcess;
  		this.addForm.isAutoDistr=row.isAutoDistr;
//		this.addForm.orgNos=JSON.parse(row.orgNos);
  		if(row.orgNos==""||row.orgNos==null||row.orgNos==[]){
  			this.addForm.orgNos="";
  		}else{
  			this.addForm.orgNos=JSON.parse(row.orgNos);
  		}
  		this.addForm.mustInput=true;
  		this.dialogFormVisible=true;
  		
  		this.Workflows.forEach(item=>{
			if(item.name==row.approvalProcess){
				this.addForm.approvalProcessKey=item.key
			}
		})
  	},
  	appKey(){
  		this.Workflows.forEach(item=>{
			if(item.name==this.addForm.approvalProcess){
				this.addForm.approvalProcessKey=item.key
			}
		})
  	},
  	
  	//产品维护保存
  	submitAdd(formName){
  		this.$refs[formName].validate((valid) => {
  			if(valid){
  				var org="";
  				var orr=[]
				this.addForm.orgNos.forEach((item,index)=>{
					org+=item[item.length-1]+",";
					orr.push(item[item.length-1]);
				})
				var orgNoSS=this.orgNosSS;
				var branchName=""
				orr.forEach((item,index)=>{
					orgNoSS.forEach((lis,index)=>{
						if(lis.branchNum==item){
							branchName+=lis.branchName+","
						}
					})
				})
				
//				if(branchName)
  				var editObj={
  					"cardId":this.itemRow.cardId,
  					"bizAllName":this.itemRow.bizAllName,
  					"productCode":this.itemRow.productCode,
  					"legalPersonNum":this.itemRow.legalPersonNum,
  					"approvalProcess":this.addForm.approvalProcess,//关联流程
					"approvalProcessKey":this.addForm.approvalProcessKey,//关联审批流程k值
  					"orgNos":JSON.stringify(this.addForm.orgNos),//所属机构代码
  					"orgNames":branchName.slice(0,branchName.length-1),
  					"isAutoDistr":this.addForm.isAutoDistr
  				}
//				this.$post(this.$api+"/api/SetProProductInforUpdate",editObj).then(res=>{
					this.$post(this.$api+"/api/updateProProductInfo",editObj).then(res=>{
					if(res.returnCode=="000000"){
							this.initProductManageList(1);
							this.$alert( i18n.t('cProduct.SuccessfulProductMaintenance'), {//产品维护成功
								dangerouslyUseHTMLString: true
							});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('ProductMaintenanceFailure'), {//产品维护失败
								dangerouslyUseHTMLString: true
							});
						}
				})
  			}
  		})
  	},
  	//获取关联审批流程
  	// getApprovalProcess(){
  	// 	this.$post(this.$api+"/loanProduct/getWorkFlow").then(res=>{
  	// 		this.Workflows=res;
  	// 	})
  	// },
  	//是否自动派件
  	getLimitList (val) {
			this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: val}).then(res =>{
				if(res.returnCode == '000000'){
					this.isAutoDistrs =  res.returnData;
				}
			});
		},
  	//所属机构
  	getOrgNos(){
		this.$post(this.$api+"/loanProduct/getOrgDatas").then(res=>{
			this.orgNosSS=res;
		})
		this.$post(this.$api + '/user/findBranch',{}).then(res =>{
//			this.$post(this.$approve + '/user/findBranch',{}).then(res =>{
			if(res.returnCode == '000000'){
				let str = String(res.returnData).replace(/num/g, 'value')
				this.orgNosS =  JSON.parse(str);
			} else {
				var str = `
					<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {//提示
					dangerouslyUseHTMLString: true
				});
			}
		});
  	},
  	
  	//获取公司名称
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
					this.$alert(str, i18n.t('Prompt'), {//提示
						dangerouslyUseHTMLString: true
					});
				}
			});
		},
		
		getName(val){
		},
  	//点击确认改变数据
		goPageSure (val) {
			if (val) {
				var mc=Math.ceil(this.totalCount/this.pageSize);
				if(val>0&&val<=mc){
					this.goPage="";
					this.currentPage = parseInt(val);
					this.pageIndex = val;
					this.initProductManageList(parseInt(val)); 
				}else{
					this.goPage="";
					this.currentPage = parseInt(mc);
					this.pageIndex = mc;
					this.initProductManageList(mc); 
				}
			}
		},
		
		 //重置表单
    resetForm(formName) {
//    this.$refs[formName].resetFields();
      	if (this.$refs[formName]!==undefined) {
			this.$refs[formName].resetFields();
		}
      	this.addForm.bizAllName=this.itemRow.bizAllName;
  		this.addForm.productCode=this.itemRow.productCode;
		this.addForm.approvalProcess=this.itemRow.approvalProcess;
		this.addForm.isAutoDistr=this.itemRow.isAutoDistr
  		if(this.itemRow.orgNos==""||this.itemRow.orgNos==null){
  			this.addForm.orgNos=""
  		}else{
  			this.addForm.orgNos=JSON.parse(this.itemRow.orgNos);
  		}
  		
    },
  	
  	//选择页数改变数据
  	handleCurrentChange(val){//修改第几页时触发
  		//改变每页显示多少条
			this.currentPage = val;
			this.pageIndex =val;
			this.initProductManageList(val); 
  	},
  	
  	//改变每页显示多少条
  	handleSizeChange(val){//修改一页多少条时触发
  		this.pageSize = val;
			this.initProductManageList(0);
  	},	
  	cancel(){
  		this.dialogFormVisible=false;
			this.resetForm('addForm');
//		this.initProductManageList(0)
  	},
  }
}
</script>

<style  lang='scss'>
#pm_content{
  .el-dialog__body{
      height: 350px;
      overflow: auto
  }

  .el-select{
    width:100%!important;
  }
}
.search-btn{color:#fff;}
.nav_tabs{
  width: 10%;
  li{
    width: 100px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    border-right: 1px solid $bordercolor;
    cursor: pointer;
  }
  .active{
    background: $deep-color;
    color: #fff;
  }
}
.nav_con{
  width: 85%;
}
.step{
  text-align: right
}
.data_left{
  width: 250px;
}
.nomore{
  text-align: center;
  line-height: 100px;
}

</style>
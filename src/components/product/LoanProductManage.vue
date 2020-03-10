<template>
<!-- 消贷产品管理 -->
  <div class="content_box" id="loan_content">
	<!-- 编辑模块(搜索新增查询) 开始-->
    <div class="edit_module">
		<el-form :inline="true"  :model="searchForm"  class="demo-form-inline" size="small">
			<el-row>
				<el-col :span="22">
					<el-form-item :label="$t('loanproduct.product_name')" > 	<!-- 产品名称 -->
						<el-input v-model="searchForm.queryName"  ></el-input>
					</el-form-item>

					<el-form-item :label="$t('loanproduct.link_contract')" >     	<!-- 关联合同模板 -->
						<el-input v-model="searchForm.linkContractName" ></el-input>
					</el-form-item>
					
					<el-form-item :label="$t('loanproduct.link_workflow')">     	<!-- 关联审批流程 -->
						<el-input v-model="searchForm.linkWorkflowName" ></el-input>
					</el-form-item>

					<el-form-item  :label="$t('loanproduct.product_code')">     	<!-- 产品代码 -->
						<el-input v-model="searchForm.queryCode"  ></el-input>
					</el-form-item>

					<el-form-item :label="$t('loanproduct.parent_institutionname')">    	<!-- 所属机构 -->
						<el-input v-model="searchForm.queryPrentName" ></el-input>
					</el-form-item>
<!-- 
					<el-form-item label="产品状态">  	
					<el-select v-model="queryStatus" >
						<el-option  :value="item.bizTypePropCode" 
									v-for="(item,index) in templateStatusList" 
									:key="index"  :label="item.bizTypePropName"  >{{item.bizTypePropName}}</el-option>
					</el-select>
					</el-form-item> -->
				</el-col>

				<el-col :span="24" class="edit_module_btn" >
				<el-form-item>
					<el-button type="warning" icon="el-icon-search" @click="initLoanProductList()" size="small">{{$t('Query')}}</el-button>  <!--查询按钮-->
					<!--新增按钮-->
					<!-- <el-button type="primary" icon="el-icon-plus"  @click="loanProductAdd()">新增</el-button>   -->
				</el-form-item>
				</el-col>
			</el-row>  
		</el-form>

     
    </div>
    <!-- 编辑模块(搜索新增查询)结束 -->
    
    <!-- 列表模块开始-->
    <div class="list_module">
		<div class="table_body">
				<h4>{{$t('loanproduct.product_list')}}</h4><!--消贷产品列表-->
				<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
						<el-table-column prop="productName" :label="$t('loanproduct.product_name')"  align="center" min-width="125px"> </el-table-column><!--产品名称-->

						<el-table-column prop="productCode" :label="$t('loanproduct.product_code')"  align="center" min-width="120px"> </el-table-column><!--产品代码-->

						<el-table-column prop="linkWorkflowName" :label="$t('loanproduct.link_workflow')"  align="center" min-width="230px"> </el-table-column><!--关联审批流程-->

						<el-table-column prop="linkContractName" :label="$t('loanproduct.link_contract')"  align="center" min-width="215px" > <!--关联合同模板-->
							<template slot-scope="scope">
									<el-link type="primary" @click="preview(scope.row)">{{scope.row.linkContractName}}</el-link>
							</template>
						</el-table-column><!--关联合同模板-->
						
						<el-table-column prop="orgNames" :label="$t('loanproduct.parent_institutionname')"  align="center" min-width="200px">
								<template slot-scope="scope">
									<el-popover
								    placement="top-start"
								    width="200"
								    trigger="hover"
								    :content="scope.row.orgNames ? scope.row.orgNames :'无所属机构' ">
								    <el-button type="text" slot="reference">{{$t('See')}}</el-button>
								  </el-popover>
							  </template>
						</el-table-column><!--所属机构-->

						 <!--维护日期-->
						<el-table-column prop="updateTime" :label="$t('loanproduct.Update_date')"  align="center"  min-width="155px"> 
							<template slot-scope="scope">
									{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
							</template>
						</el-table-column>
						<!--维护用户-->
						<el-table-column prop="updateUser" :label="$t('loanproduct.Update_user')"  align="center" min-width="165px"> </el-table-column>  
						<!--操作-->			
						<el-table-column  :label="$t('Operation')" align="center" min-width="150px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('维护') > -1">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span>
								</el-button>
							
								<el-button size="mini" type="warning" class="edit-btn" @click="productMaintain(scope.row)" v-if="funList.indexOf('维护') > -1">
									<!--产品维护-->
									<i class="el-icon-setting"></i>
									<span class="text">{{$t('loanproduct.product_wh')}}</span>
								</el-button>
								
								<!-- <el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
										<i class="el-icon-edit"></i>
										<span class="text">{{$t('Edit')}}</span>
								</el-button> -->
								
							</template>
							</el-table-column>
				</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next, slot"
					:total="totalCount">
					<template slot>
						<div class="slot_pag">
							<el-select v-model="pageSize" size="mini" @change="handleSizeChange">  <!-- 10条/页 -->
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
							<span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
							<el-input size="mini" v-model="goPage" type="number" ></el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
			</el-pagination>
			</div>
		</div>
	<!--列表模块结束-->
  	

	<!--弹框页面开始-->
	<el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="cancel" >
		<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="$rules.loan" ref="addForm" id="addForm" size="small"  label-width="150px">
			<!-- 查看 -->
			<div v-if="addForm.edit == 2">
				<el-row v-if="!(addForm.add || addForm.modify)">
					<el-col :span="12">
						<el-form-item :label="$t('legalPerson_num')"  prop="legalPersonNum">  	<!-- 法人编号 -->
							<el-input v-model="addForm.legalPersonNum"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('Unit')" prop="legalPersonName">  <!-- 公司名称 -->
							<el-input v-model="addForm.legalPersonName"  disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			
				<el-row>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.product_name')"  prop="productName"> <!-- 产品名称 -->
							<el-input v-model="addForm.productName"  :disabled="!(addForm.add || addForm.modify)"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.product_code')"  prop="productCode"> <!-- 产品代码 -->
							<el-input v-model="addForm.productCode"  :disabled="!(addForm.add || addForm.modify)"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.Operation_mode')" prop="operatingMode"> <!-- 运营模式 -->
							<el-input v-model="addForm.operatingMode" :disabled="!(addForm.add || addForm.modify)"></el-input>
						</el-form-item>
					</el-col>

					<!--<el-col :span="12">
						<el-form-item :label="$t('loanproduct.Execution_rate')" > 
							<el-col :span="12">
								<el-col :span="12">
									<el-input v-model="addForm.contractRate"  :disabled="!(addForm.add || addForm.modify)"></el-input> 
								</el-col>
								<el-col :span="12">
									<p style="padding-left: 5px;">{{$t('loanproduct.Rate')}}</p> 
								</el-col >
							</el-col>
							<el-col :span="12">
								<el-col :span="12">
									<el-input v-model="addForm.contractRateValue"  :disabled="!(addForm.add || addForm.modify)"></el-input> 
								</el-col>
								<el-col :span="12">
									<p style="padding-left: 5px;">%</p>
								</el-col >
							</el-col>
						</el-form-item>
					</el-col>-->
					
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.Execution_rate')">
							<el-col :span="4" class="line">
								<el-form-item prop="contractRate" style="padding:0">
									<el-input v-model="addForm.contractRate"  :disabled="!(addForm.add || addForm.modify)"></el-input> 
								</el-form-item>
							</el-col>
							<el-col :span="4" class="line">
								<p style="padding-left: 5px;">{{$t('loanproduct.Rate')}}</p> <!-- 利率 -->
							</el-col>
							<el-col :span="4" class="line">
								<el-form-item prop="contractRateValue" style="padding:0">
									<el-input v-model="addForm.contractRateValue"  :disabled="!(addForm.add || addForm.modify)"></el-input> 
								</el-form-item>
							</el-col>
							<el-col :span="4" class="line">
								<p style="padding-left: 5px;">%</p>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.billingFrequency')" prop="billingFrequency"> <!-- 账单频率 -->
							<!--<el-input v-model="addForm.billingFrequency" disabled></el-input>-->
							<el-select v-model="addForm.billingFrequency" :disabled="!(addForm.add || addForm.modify)" placeholder="">
								<el-option value="100" :label="$t('loanproduct.on_month')"></el-option>  <!-- 按月 -->
								<el-option value="101" :label="$t('loanproduct.on_week')"></el-option>  <!-- 按周 -->
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.billingFrequencyValue')"  prop="billingFrequencyValue">  <!-- 账单频率值 -->
							<el-input v-model="addForm.billingFrequencyValue"  :disabled="!(addForm.add || addForm.modify)"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.mediaCode')"   prop="mediaCode">  <!-- 媒介对象代码 -->
							<el-input type="textarea" :autosize= "{minRows: 1, maxRows: 3 }" v-model="addForm.mediaCode" :disabled="!(addForm.add || addForm.modify)"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.minLoanAmountFlag')" prop="minLoanAmountFlag">   <!-- 最小贷款金额标识 -->
							<el-select v-model="addForm.minLoanAmountFlag" :disabled="!(addForm.add || addForm.modify)" placeholder="">
								<el-option :label="$t('loanproduct.check_min_count')"  value="100"></el-option>    <!-- 检查最小贷款金额 -->
								<el-option :label="$t('loanproduct.no_check_min_count')"  value="199"></el-option>     <!-- 不检查最小贷款金额 -->
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.minLoanAmount')" prop="minLoanAmount">  <!-- 产品额度下限 -->
							<el-col :span="18">
								<el-input v-model="addForm.minLoanAmount" :disabled="!(addForm.add || addForm.modify)"></el-input> 
							</el-col >
							<el-col :span="6">
								<p style="padding-left: 5px;">{{$t('loanproduct.Unit_yuan')}}</p>   <!-- 单位:元 -->
							</el-col >
							
						</el-form-item>
					</el-col>

					<el-col :span="12" >
						<el-form-item :label="$t('loanproduct.orgNos')" prop="orgNos">  <!--orgNos  所属机构-->
							<el-cascader
								style="width:100%"
								:options="orgNosS"
								:props="{ multiple: true, checkStrictly: true }"
								v-model="addForm.orgNos"
								:show-all-levels="false"
								clearable
								:disabled="!(addForm.add || addForm.modify)">
						  </el-cascader>
						</el-form-item>
					</el-col>
					
				</el-row>

				<el-row>
					<el-col :span="12">
						<!--  关联审批流程--><!--addForm.linkWorkflowName-->
						<!--<el-form-item  :label="$t('loanproduct.link_workflow')" prop="linkWorkflowNum">  
							<el-select v-model="addForm.linkWorkflowNum" :disabled="!(addForm.add || addForm.modify)" placeholder="">
								<el-option
									v-for="(item,index) in Workflows"
									:key="index"
									:label="item.name" 
									:value="item.key"
									>
								</el-option>
							</el-select>
						</el-form-item>-->
					</el-col>

					<el-col :span="12">
						<!--  关联合同模板-->
						<!--<el-form-item :label="$t('loanproduct.link_contract')" prop="linkContractName">   
							<el-select v-model="addForm.linkContractName" filterable :disabled="!(addForm.add || addForm.modify)" placeholder="">
								<el-option v-for="(item,index) in getContracts"
								 :key="index" 
								:label="item.contractName" 
								:value="item.contractNo">
									<span style="float: left">{{ item.contractName }}</span>
									<el-button style="float: right; color: #8492a6; font-size: 13px" type="text" @click="preview(item)">下载查看</el-button>
								</el-option>
							</el-select>
						</el-form-item>-->
					</el-col>	
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.isAutoDistr')" prop="isAutoDistr">   <!--是否自动派件-->
							<el-select v-model="addForm.isAutoDistr" :disabled="!(addForm.add || addForm.modify)">
								<el-option v-for="(item,index) in isAutoDistrs" :key="index" :value="item.paramValue" :label="item.paramSname"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row v-if="!(addForm.add || addForm.modify)">
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.Create_time')" prop="createTime">   <!--  创建时间-->
							<el-input v-model="addForm.createTime" disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.Create_user')" prop="createUser" > <!--  创建用户-->
							<el-input v-model="addForm.createUser"  disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row v-if="!(addForm.add || addForm.modify)" prop="updateTime">
					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.Update_time')" >   <!--  维护时间-->
							<el-input v-model="addForm.updateTime" disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.Update_user')" prop="updateUser" >   <!--  维护用户-->
							<el-input v-model="addForm.updateUser"  disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>


			</div>
			<!-- 维护 -->
			<div v-if="addForm.edit == 1">
				<el-row>
					<el-col :span="12">
						<el-form-item  :label="$t('legalPerson_num')" >  	<!-- 法人编号 -->
							<el-input v-model="addForm.legalPersonNum"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('Unit')">  <!-- 公司名称 -->
							<el-input v-model="addForm.legalPersonName"  disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			
				<el-row>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.product_name')" > <!-- 产品名称 -->
							<el-input v-model="addForm.productName" disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.product_code')" >     	<!-- 产品代码 -->
							<el-input v-model="addForm.productCode"  disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<!-- 关联审批流程 -->
						<el-form-item   prop="linkWorkflowNum"  :label="$t('loanproduct.link_workflow')" >     	
							<el-select v-model="addForm.linkWorkflowNum" @change="selectModel(addForm.linkWorkflowNum)" placeholder="">
								<el-option
									v-for="(item,index) in Workflows"
									:key="index"
									:label="item.name" 
									:value="item.key"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<!-- 关联合同模板 -->
					<el-col :span="12">
						<el-form-item  prop="linkContractNum" :label="$t('loanproduct.link_contract')" >     	
							<el-select v-model="addForm.linkContractNum" filterable @change="aaa(addForm.linkContractNum)" placeholder="">
								<el-option v-for="(item,index) in getContracts"
								 :key="index" 
								:label="item.contractName" 
								:value="item.contractNo">
									<span style="float: left">{{ item.contractName }}</span>
									<el-button style="float: right; color: #8492a6; font-size: 13px" type="text" @click.stop="preview(item)" >{{$t('loanproduct.preview')}}</el-button>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>	
				</el-row>

				
				<el-row>
					<el-col :span="12" ><!--orgNos  所属机构-->
						<el-form-item  prop="orgNos" :label="$t('loanproduct.orgNos')" >  <!--orgNos  所属机构-->
							<!--  @change="getName"-->
							<el-cascader
								style="width:100%"
								:options="orgNosS"
								:props="{ multiple: true, checkStrictly: true }"
								v-model="addForm.orgNos"
								:show-all-levels="false"
								clearable
								>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item  prop="isAutoDistr" :label="$t('loanproduct.isAutoDistr')">   <!--是否自动派件-->
							<el-select v-model="addForm.isAutoDistr" placeholder="">
								<!--<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>-->
								<el-option v-for="(item,index) in isAutoDistrs" :key="index" :value="item.paramValue" :label="item.paramSname"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				
			</div>
		</el-form>
		<div slot="footer" class="dialog-footer" v-if="addForm.edit == 1" >
			<el-button  @click="resetForm('addForm')">{{$t('Reset')}}</el-button>  <!--重置-->
			<el-button  type="primary" @click="saveMaintain('addForm')">{{$t('Save')}}</el-button>   <!--保存-->
		</div>
		<div slot="footer" class="dialog-footer" v-else>
			<el-button  @click="resetForm('addForm')" v-if="addForm.add || addForm.modify">{{$t('Reset')}}</el-button>  <!--重置-->
			<el-button  type="primary" @click="saveAdd('addForm')" v-if="addForm.add">{{$t('Save')}}</el-button>   <!--保存-->
			<el-button  type="primary" @click="saveModify('addForm')" v-if="addForm.modify">{{$t('Save')}}</el-button>   <!--保存-->
		</div>
	
	</el-dialog>
	<el-dialog :title="contractTitle" :visible.sync="pdfdialogFormVisible"  :close-on-click-modal="false"  custom-class="pdfshow" top="5%">
		<div id="contract" v-html="html"></div>
	</el-dialog>
	<!--弹框页面结束-->
  </div>
</template>

<script>
// import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
export default {
  name: 'LoanProductManage',
  data () {
    return {
	  	searchForm:{  //查询条件
			queryName:'',
			queryCode:'',
			linkWorkflowName:'',
			queryPrentName:'',
			linkContractName:''
		},

		currentPage:1,//当前显示第几页 1开头
		pageSize:10,//一页显示几条数据
		totalCount:0,//一共有多少条数据
		goPage:"",//前往第几页

		dialogFormVisible: false,//新增弹出框是否显示
		pdfdialogFormVisible: false,
		tableData:[],
		rowData:{},
		isAutoDistrs:[],//是否自动派件
		addForm: {
			legalPersonNum: '',//法人编号
			legalPersonName: '',//公司名称
			productName:'',//产品名称 
			productCode:'', //产品代码
			productNum:'', //产品编号
			isAutoDistr: '1',
			linkWorkflowName:'', //关联审批流程
			linkContractName:'',//关联合同
			linkWorkflowNum:'', //关联审批流程
			linkContractNum:'',//关联合同
			linkContractUrl: '',// 关联合同URL
			operatingMode:'', //运营模式
			contractRate:'', //执行利率 利率
			contractRateValue:'', //执行利率 %
			billingFrequency:'',//账单频率
			billingFrequencyValue:'',//账单频率值
			mediaCode:'',//媒介对象代码
			minLoanAmountFlag:'',//最小贷款金额标识
			minLoanAmount:'',//产品额度下限额度
			orgNos:'', //所属机构
			createTime:'', //创建时间
			createUser:'', //创建人
			updateTime:'', //修改时间
			updateUser:'', //用户名
//			isAutoDistr:"1",//是否自动派件
			edit:1,	 //标识1 是维护 2是查看
			add:true,//新增标示
			modify:true,//编辑标示
		},
		Workflows:[], //关联审批流程
		getContracts:[],//关联合同数据

		orgNosS:[],//所属机构
      	orgNosSS:[],//一级的所属机构

		title:'',
		src: '', //预览
		html:'',
		contractTitle:'',
		numPages: '',
		funList:"",

    }
  },
  created(){
	  this.defaultAddForm=$.extend({},this.addForm); //重置数据  初始化的时候深拷贝一下
  },
  mounted(){
	 this.initLoanProductList(1);   //初始化列表数据
	 this.getOrgNos();//所属机构
	 this.getFunList();
	 this.getLimitList("IS_AUTO_DISTR");

  },
  methods:{
	  selectModel(val){
		  this.Workflows.forEach(res=>{
		  	if(res.key==val){
		  		this.addForm.linkWorkflowName=res.name
		  	}
		  })
	  },
	   //预览pdf
      preview(row){
				this.contractTitle =  row.contractName || row.linkContractName
				let URL = this.$api + '/loanProduct/showContract';
				let path = row.contarctUrl || row.linkContractUrl
				path = path.split('/')
				let name = path[path.length-1]
				path.length=path.length-1
				path = path.join('/')
				this.$get(URL, {contractPath:path, contractName: name}).then(res =>{
					if(res.returnCode =='000000'){
						this.pdfdialogFormVisible = true	
						this.html = res.returnData
					}else{
						var str = `
							<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str, i18n.t('Prompt'), {
							dangerouslyUseHTMLString: true
						});
					}
					
				});
			// let URL = this.$api + '/loanProduct/showContract';
			// var loadingTask = word.createLoadingTask({
			// 	url: URL,
			// 	CMapReaderFactory
			// })
			// this.src = loadingTask 
			// this.src.then(word => {
			// 	this.numPages = word.numPages
			// 	URL = ''
			// 	this.pdfdialogFormVisible = true
			// 	setTimeout(() => {
			// 		document.querySelector('.pdfshow .el-dialog__body').scrollTop = 0
			// 	}, 50);
			// }).catch((err) => {
			// 	console.error('pdf加载失败')
			// })
		},
	  	getFunList () {
			let obj = {}
			obj = this.$store.state.loginData.beMenuList.find(item => {
				return item.name == '消贷产品管理'
			})
			this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
				if(res.returnCode == '000000'){
				this.funList = JSON.stringify(res.returnData)
				}
			});
		},
	 	// 初始化列表数据
		initLoanProductList(val){
			if(this.searchForm.queryName==""&&this.searchForm.queryCode==""&&this.searchForm.linkWorkflowNum==""&&this.searchForm.queryPrentName==""){
				var FunMsgData={
					"indexNo":val,
					"pageSize":this.pageSize,
				}
			}else{
				var FunMsgData = {
					"productName":this.searchForm.queryName,
					"productCode":this.searchForm.queryCode,
					"linkWorkflowName":this.searchForm.linkWorkflowName,
					"linkContractName":this.searchForm.linkContractName,
					"orgNames":this.searchForm.queryPrentName,
					"indexNo":val,
					"pageSize":this.pageSize,
				};
			}
			
//			this.$post(this.$api + 'loanProduct/queryByPage',FunMsgData).then( res =>{
			this.$post(this.$api + '/loanProduct/findPageList',FunMsgData).then( res =>{
				if(res.returnCode=="000000"){
					this.tableData =res.returnData.rows
					this.totalCount = res.returnData.totalCount;

				}
			});
			// 关联合同
			this.$post(this.$api + '/loanProduct/getContracts').then(res=>{
				console.log(res)
				this.getContracts = res;
			}) 

			// 关联审批流程
			this.$post(this.$api + '/loanProduct/getWorkFlow').then(res=>{
				console.log(res)
				this.Workflows = res;
			})

		},
		//获取所属机构
		getOrgNos(){
			this.$post(this.$api+"/loanProduct/getOrgDatas").then(res=>{
				this.orgNosSS=res;
			})
			this.$post(this.$api + '/user/findBranch',{}).then(res =>{
//				this.$post(this.$api + '/api/getProductInfoList',{}).then(res =>{
				if(res.returnCode == '000000'){
					let str = String(res.returnData).replace(/num/g, 'value')
					this.orgNosS =  JSON.parse(str);
					
				} else {
					var str = `
						<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					this.$alert(str, i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
				}
			});
		},
		//产品维护
		productMaintain(row){
			this.addForm.edit = 1;
			this.rowData = row;
			this.dialogFormVisible = true;
			this.resetForm('addForm')
			this.getFrInfo();
			this.addForm.edit = 1;
			this.title=  i18n.t('loanproduct.ProductWh');  // 消贷产品维护;
			this.addForm.productName = row.productName
			this.addForm.productNum = row.productNum
			this.addForm.productCode = row.productCode
			this.addForm.linkWorkflowName = row.linkWorkflowName
			this.addForm.linkContractName = row.linkContractName
			this.addForm.linkWorkflowNum = row.linkWorkflowNum
			this.addForm.linkContractNum = row.linkContractNum
			this.addForm.linkContractUrl = row.linkContractUrl
			this.aaa(this.addForm.linkContractNum)
			if(row.orgNos==""||row.orgNos==null){
				this.addForm.orgNos=""
			}else{
				this.addForm.orgNos=JSON.parse(row.orgNos);
			}
			
			this.addForm.isAutoDistr =row.isAutoDistr
			
		},
		//保存维护
		saveMaintain(formName){
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
									branchName+=lis.branchName +","
								}
							})
						})

					  	var editObj={
							"productNum":this.addForm.productNum,
//							"productName":this.addForm.productName,
//							"productCode":this.addForm.productCode,
							"linkWorkflowName":this.addForm.linkWorkflowName,
							"linkWorkflowNum":this.addForm.linkWorkflowNum,
							"linkContractName":this.addForm.linkContractName,
							"isAutoDistr": this.addForm.isAutoDistr,
							 "linkContractNum":this.addForm.linkContractNum,
							'linkContractUrl': this.addForm.linkContractUrl,
							"legalPersonNum":this.addForm.legalPersonNum,
							"orgNos":JSON.stringify(this.addForm.orgNos),//所属机构代码
							"orgNames":branchName.slice(0,branchName.length-1),
//							"isAutoDistr":this.addForm.isAutoDistr,//是否自动派件
						}
//						this.$post(this.$api+"/loanProduct/updateProduct",editObj).then(res=>{
						this.$post(this.$api+"/loanProduct/updateProductMsg",editObj).then(res=>{
						 	if(res.returnCode=="000000"){
						 			this.initLoanProductList(1);
						 			this.$alert( i18n.t('loanproduct.Wh_success'), {  //产品维护成功
						 				dangerouslyUseHTMLString: true
						 			});
						 			this.dialogFormVisible=false;
						 		}else{
						 			var str = `
						 				<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
										<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						 			`
						 			this.$alert(str, i18n.t('loanproduct.Wh_failure'), {  //产品维护失败
						 				dangerouslyUseHTMLString: true
						 			});
						 		}
						 })
				}
			})
		},
		saveAdd(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					this.$post(this.$api+"loanProduct\loanProductInsert",this.addForm).then(res=>{
						console.log(res)
					})
				}
			})
		},
		//查看详情
		seeItem(row){
			this.getFrInfo()
			var mediaCodeSlice = ""
			if(row.mediaCode.length>0){
				row.mediaCode.split(',').forEach((value)=>{
						if(value=="MODM00010"){
							mediaCodeSlice+= i18n.t('loanproduct.Virtual_card')  //虚拟卡,
						}else if(value=="MODM00001"){
							mediaCodeSlice+= i18n.t('loanproduct.Ms_card')  //磁条卡,
			 				}else if(value=="MODM40001"||value=="MODM40002"){
							mediaCodeSlice+= i18n.t('loanproduct.Test')   //测试,
						}else if(value=="MODM00002"){
							mediaCodeSlice+= i18n.t('loanproduct.Chip_card') //芯片卡,
						}
					})
				mediaCodeSlice=mediaCodeSlice.slice(0,mediaCodeSlice.length-1)
			}else{
				mediaCodeSlice=""
			}
			this.dialogFormVisible = true;
			this.addForm.edit = 2;
			this.addForm.add=false;
			this.addForm.modify=false;
			this.title = i18n.t('loanproduct.proDetail'); // 消贷产品详情;
			this.addForm.productName = row.productName
			this.addForm.productCode = row.productCode
			this.addForm.linkWorkflowName = row.linkWorkflowName
			this.addForm.linkWorkflowNum=row.linkWorkflowNum
			this.addForm.linkContractName = row.linkContractName
			this.addForm.operatingMode = row.operatingMode
			if(row.contractRate == '100'){
				this.addForm.contractRate = i18n.t('loanproduct.year')  //年
			}else if(row.contractRate == '200'){
				this.addForm.contractRate =i18n.t('loanproduct.month')  //月
			}else if(row.contractRate == '300'){
				this.addForm.contractRate = i18n.t('loanproduct.date')  //日
			}
			this.addForm.contractRateValue = row.contractRateValue
			this.addForm.billingFrequency = row.billingFrequency
			this.addForm.billingFrequencyValue = row.billingFrequencyValue
			this.addForm.mediaCode=mediaCodeSlice;
			this.addForm.minLoanAmountFlag = row.minLoanAmountFlag
			if(this.addForm.minLoanAmount % 10 ==0){
				this.addForm.minLoanAmount  = row.minLoanAmount+'.00'
			}else{
				this.addForm.minLoanAmount  = row.minLoanAmount
			}
			if(row.orgNos==""||row.orgNos==null){
				this.addForm.orgNos=""
			}else{
				this.addForm.orgNos=JSON.parse(row.orgNos);
			}
			this.addForm.isAutoDistr = row.isAutoDistr
			this.addForm.createTime = row.createTime
			this.addForm.createUser = row.createUser
			this.addForm.updateTime = row.updateTime
			this.addForm.updateUser = row.updateUser
		},
		
		editItem(row){//编辑
//				this.resetForm('addForm')
				this.getFrInfo()
				this.dialogFormVisible = true;
				this.addForm.edit = 2;
				this.addForm.add=false;
				this.addForm.modify=true;
				this.title = "消贷产品编辑"; //新增消贷产品;
				var mediaCodeSlice = ""
				if(row.mediaCode.length>0){
					row.mediaCode.split(',').forEach((value)=>{
							if(value=="MODM00010"){
								mediaCodeSlice+= i18n.t('loanproduct.Virtual_card')  //虚拟卡,
							}else if(value=="MODM00001"){
								mediaCodeSlice+= i18n.t('loanproduct.Ms_card')  //磁条卡,
				 				}else if(value=="MODM40001"||value=="MODM40002"){
								mediaCodeSlice+= i18n.t('loanproduct.Test')   //测试,
							}else if(value=="MODM00002"){
								mediaCodeSlice+= i18n.t('loanproduct.Chip_card') //芯片卡,
							}
						})
					mediaCodeSlice=mediaCodeSlice.slice(0,mediaCodeSlice.length-1)
				}else{
					mediaCodeSlice=""
				}
				this.addForm.productName = row.productName
				this.addForm.productCode = row.productCode
				this.addForm.linkWorkflowName = row.linkWorkflowName
				this.addForm.linkWorkflowNum=row.linkWorkflowNum
				this.addForm.linkContractName = row.linkContractName
				this.addForm.operatingMode = row.operatingMode
				if(row.contractRate == '100'){
					this.addForm.contractRate = i18n.t('loanproduct.year')  //年
				}else if(row.contractRate == '200'){
					this.addForm.contractRate =i18n.t('loanproduct.month')  //月
				}else if(row.contractRate == '300'){
					this.addForm.contractRate = i18n.t('loanproduct.date')  //日
				}
				this.addForm.contractRateValue = row.contractRateValue
				this.addForm.billingFrequency = row.billingFrequency
				this.addForm.billingFrequencyValue = row.billingFrequencyValue
				this.addForm.mediaCode=mediaCodeSlice;
				this.addForm.minLoanAmountFlag = row.minLoanAmountFlag
				if(this.addForm.minLoanAmount % 10 ==0){
					this.addForm.minLoanAmount  = row.minLoanAmount+'.00'
				}else{
					this.addForm.minLoanAmount  = row.minLoanAmount
				}
				if(row.orgNos==""||row.orgNos==null){
					this.addForm.orgNos=""
				}else{
					this.addForm.orgNos=JSON.parse(row.orgNos);
				}
				this.addForm.isAutoDistr = row.isAutoDistr
				this.addForm.createTime = row.createTime
				this.addForm.createUser = row.createUser
				this.addForm.updateTime = row.updateTime
				this.addForm.updateUser = row.updateUser
		},
		
		//是否自动派件
  		getLimitList (val) {
			this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: val}).then(res =>{
				if(res.returnCode == '000000'){
					this.isAutoDistrs =  res.returnData;
				}
			});
		},
		
		loanProductAdd(){//新增
//				this.resetForm('addForm')
				this.addForm.edit = 2;
				this.addForm.add=true;
				this.addForm.modify=false;
				this.title = "新增消贷产品"; //新增消贷产品;
				this.addForm.productName=""
				this.addForm.productCode=""
				this.addForm.operatingMode=""
				this.addForm.contractRate=""
				this.addForm.contractRateValue=""
				this.addForm.billingFrequency=""
				this.addForm.billingFrequencyValue=""
				this.addForm.mediaCode=""
				this.addForm.minLoanAmountFlag=""
				this.addForm.minLoanAmount=""
				this.addForm.orgNos=""
				this.addForm.linkWorkflowName=""
				this.addForm.linkContractNum=""
				this.addForm.isAutoDistr=""
				this.dialogFormVisible = true;
		},
		
		//取消弹框重置数据
		cancel(){
//			this.resetForm('addForm');
			this.dialogFormVisible = false;
			
		},
		aaa(aa){
			console.log(this.getContracts)
			if((this.getContracts != "暂无数据") || (this.getContracts.length>0)){
				this.getContracts.forEach(res=>{
					if(res.contractNo==aa){
						this.addForm.linkContractName=res.contractName
						this.addForm.linkContractUrl =res.contarctUrl
					}
				})
			}
			
		},
		//重置表单
		resetForm(formName) {
			if (this.$refs[formName]!==undefined) {
				this.$refs[formName].resetFields();
			} 
//			this.$nextTick(()=>{
//			   this.$refs[formName].resetFields();
//			})
//			this.addForm.productName = this.rowData.productName
//			this.addForm.productNum = this.rowData.productNum
//			this.addForm.productCode = this.rowData.productCode
//			this.addForm.linkWorkflowName = this.rowData.linkWorkflowName
//			this.addForm.linkContractName = this.rowData.linkContractName
//			this.addForm.linkWorkflowNum = this.rowData.linkWorkflowNum
//			this.addForm.linkContractNum = this.rowData.linkContractNum
//			if(this.rowData.orgNos==""||this.rowData.orgNos==null){
//				this.addForm.orgNos=""
//			}else{
//				this.addForm.orgNos=JSON.parse(this.rowData.orgNos);
//			}
			
		},
		//获取公司名称
		getFrInfo () {
			this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
				if(res.returnCode == '000000'){
					this.addForm.legalPersonNum = res.returnData.legalPersonNum
					this.addForm.legalPersonName = res.returnData.legalPersonName
				} else {
					var str = `
						<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					this.$alert(str, i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
				}
			});
		},
		//前往第几页
		goPageSure (val) {
			if (val) {
				var mc=Math.ceil(this.totalCount/this.pageSize);
				if(val>0&&val<=mc){
					this.goPage=""
					this.currentPage = parseInt(val)
					this.initLoanProductList(val);
				}else{
					this.goPage="";
					this.currentPage = parseInt(mc)
					this.initLoanProductList(1);
				}
			}
		},
		//改变每页显示多少条
		handleSizeChange(val) {
			this.pageSize =  val;
			this.initLoanProductList(1);
		},
		//选择页数改变数据
		handleCurrentChange(val){
			this.currentPage = val;
			this.initLoanProductList(val); 
		}
  }
}
</script>

<style lang='scss'>
#loan_content{
	.el-dialog {
		width:70%!important;
	}
	.pdfshow{
		height: 87%;
		.el-dialog__body{
			height: 87%;
    		overflow-y: auto;
		}
	}
}
</style>

<template>
  <!-- 基准利率 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  :model="obj"  class="demo-form-inline" size="small">
			<el-row>
				<el-col :span="22">
					<el-form-item :label="$t('loanproduct.product_name')" > 	<!-- 产品名称 -->
						<el-input v-model="obj.productName"  ></el-input>
					</el-form-item>
					
					<el-form-item  :label="$t('loanproduct.product_code')">     	<!-- 产品代码 -->
						<el-input v-model="obj.productCode"  ></el-input>
					</el-form-item>

					<el-form-item :label="$t('loanproduct.parent_institutionname')">    	<!-- 所属机构 -->
						<el-input v-model="obj.orgNames" ></el-input>
					</el-form-item>  
				</el-col>

				<el-col :span="24" class="edit_module_btn" >
				<el-form-item>
					<el-button type="warning" icon="el-icon-search" @click="QueryUser()" size="small">{{$t('Query')}}</el-button>  <!--查询按钮-->
					<!--新增按钮-->
					 <el-button type="primary" icon="el-icon-plus"  @click="openUserDiolog()"  v-if="funList.indexOf('新增') > -1">新增</el-button>  
				</el-form-item>
				</el-col>
			</el-row>  
		</el-form>
    </div>

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
						
						<el-table-column prop="orgNames" :label="$t('loanproduct.parent_institutionname')"  align="center" min-width="140px">
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
						<el-table-column prop="updateTime" :label="$t('loanproduct.Update_date')"  align="center"  min-width="140px"> 
							<template slot-scope="scope">
									{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
							</template>
						</el-table-column>
						<!--维护用户-->
						<el-table-column prop="updateUser" :label="$t('loanproduct.Update_user')"  align="center" min-width="165px"> </el-table-column>  
						<!--操作-->			
						<el-table-column  :label="$t('Operation')" align="center" min-width="150px"> <!-- v-if="funList.indexOf('查看') > -1 || funList.indexOf('维护') > -1" -->
							<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)" ><!-- v-if="funList.indexOf('查看') > -1" -->
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
		<!--新增弹框页面开始-->
    <el-dialog :title="addForm.title" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">
      	<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="addForm" :rules="rules" label-width="160px" class="demo-ruleForm" size="small">
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
						<el-form-item :label="$t('loanproduct.product_name')"  prop="productName"> <!-- 产品名称 -->
							<el-input v-model="addForm.productName"  :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.product_code')"  prop="productCode"> <!-- 产品代码 -->
							<el-input v-model="addForm.productCode"  :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.Operation_mode')" prop="operatingMode"> <!-- 运营模式 -->
							<el-input v-model="addForm.operatingMode" :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.Execution_rate')">
							<el-col :span="6" class="line">
								<el-form-item prop="contractRateValue" style="padding:0">
									<!--<el-input v-model="addForm.contractRate"  :disabled="addForm.edit || addForm.flag"></el-input>--> 
									<el-select v-model="addForm.contractRateValue" :disabled="addForm.flag" placeholder="">
										<el-option value="100" label="年利率"></el-option>
										<el-option value="200" label="月利率"></el-option>
										<el-option value="300" label="日利率"></el-option> 
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6" class="line">
								<p style="padding-left: 5px;">{{$t('loanproduct.Rate')}}</p> <!-- 利率 -->
							</el-col>
							<el-col :span="6" class="line">
								<el-form-item prop="contractRate" style="padding:0">
									<el-input v-model="addForm.contractRate"  :disabled="addForm.flag"></el-input> 
								</el-form-item>
							</el-col>
							<el-col :span="6" class="line">
								<p style="padding-left: 5px;">%</p>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.billingFrequency')" prop="billingFrequency"> <!-- 账单频率 -->
							<!--<el-input v-model="addForm.billingFrequency" disabled></el-input>-->
							<el-select v-model="addForm.billingFrequency" :disabled="addForm.flag" placeholder="">
								<el-option value="100" :label="$t('loanproduct.on_month')"></el-option>  <!-- 按月 -->
								<el-option value="101" :label="$t('loanproduct.on_week')"></el-option>  <!-- 按周 -->
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.billingFrequencyValue')"  prop="billingFrequencyValue">  <!-- 账单频率值 -->
							<el-input v-model="addForm.billingFrequencyValue"  :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="12" >
						<el-form-item label="对应产品代码"  prop="correProductCode">  <!-- 对应产品代码 -->
							<el-input v-model="addForm.correProductCode"  :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.mediaCode')"   prop="mediaCode">  <!-- 媒介对象代码 -->
							<el-input type="textarea" :autosize= "{minRows: 1, maxRows: 3 }" v-model="addForm.mediaCode" :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.minLoanAmountFlag')" prop="minLoanAmountFlag">   <!-- 最小贷款金额标识 -->
							<el-select v-model="addForm.minLoanAmountFlag" :disabled="addForm.flag" placeholder="">
								<el-option :label="$t('loanproduct.check_min_count')"  value="100"></el-option>    <!-- 检查最小贷款金额 -->
								<el-option :label="$t('loanproduct.no_check_min_count')"  value="199"></el-option>     <!-- 不检查最小贷款金额 -->
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.minLoanAmount')" prop="minLoanAmount">  <!-- 产品额度下限 -->
							<el-col :span="16">
								<el-input v-model="addForm.minLoanAmount" :disabled="addForm.flag"></el-input> 
							</el-col >
							<el-col :span="8">
								<p style="padding-left: 5px;">{{$t('loanproduct.Unit_yuan')}}</p>   <!-- 单位:元 -->
							</el-col >
							
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.orgNos')"   prop="orgNos">  <!-- 媒介对象代码 -->
							<el-input  v-model="addForm.orgNos" :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<!--orgNos  所属机构-->
					<!--<el-col :span="12" >
						<el-form-item :label="$t('loanproduct.orgNos')" prop="orgNos">  
							<el-cascader
								style="width:100%"
								:options="orgNosS"
								:props="{ multiple: true, checkStrictly: true }"
								v-model="addForm.orgNos"
								:show-all-levels="false"
								clearable
								:disabled="addForm.edit || addForm.flag">
						  </el-cascader>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.link_workflow')"   prop="linkWorkflowName">  <!-- 媒介对象代码 -->
							<el-input  v-model="addForm.linkWorkflowName" :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<!--<el-col :span="12" >
						<el-form-item  :label="$t('loanproduct.link_workflow')" prop="linkWorkflowNum">  
							<el-select v-model="addForm.linkWorkflowNum" :disabled="addForm.edit || addForm.flag" placeholder="">
								<el-option
									v-for="(item,index) in Workflows"
									:key="index"
									:label="item.name" 
									:value="item.key"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item :label="$t('loanproduct.link_contract')"   prop="linkContractName"> 
							<el-input  v-model="addForm.linkContractName" :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<!--<el-col :span="12" >
						<el-form-item :label="$t('loanproduct.link_contract')" prop="linkContractName">   
							<el-select v-model="addForm.linkContractName" filterable :disabled="addForm.edit || addForm.flag" placeholder="">
								<el-option v-for="(item,index) in getContracts"
								 :key="index" 
								:label="item.contractName" 
								:value="item.contractNo">
									<span style="float: left">{{ item.contractName }}</span>
									<el-button style="float: right; color: #8492a6; font-size: 13px" type="text" @click="preview(item)">下载查看</el-button>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item  :label="$t('loanproduct.isAutoDistr')" prop="isAutoDistr">   <!--是否自动派件-->
							<el-select v-model="addForm.isAutoDistr" :disabled="addForm.flag">
								<el-option v-for="(item,index) in isAutoDistrs" :key="index" :value="item.paramValue" :label="item.paramSname"></el-option>
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
        goPage: null, //要去第几页
        productName:'',
				productCode:'',
				orgNames:''
      },
      currentPage:1,//当前显示第几页 1开头
			pageSize:10,//一页显示几条数据
			totalCount:0,//一共有多少条数据
			goPage:"",//前往第几页
      
      
      loanList:[],//贷款周期列表
      statusList:[],//状态列表
      totalCount:10,
      tableData:[{}],  // 列表数据
      addUserDialog:false,//弹框显示
      isAutoDistrs:[],//是否自动派件
      orgNosS:[],//所属机构
      Workflows:[], //关联审批流程
			getContracts:[],//关联合同数据
      addForm: {
      	title:"新增产品",
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
        correProductCode:"",//对应产品代码
				mediaCode:'',//媒介对象代码
				minLoanAmountFlag:'',//最小贷款金额标识
				minLoanAmount:'',//产品额度下限额度
				orgNos:'', //所属机构
				createTime:'', //创建时间
				createUser:'', //创建人
				updateTime:'', //修改时间
				updateUser:'', //用户名
	//			isAutoDistr:"1",//是否自动派件
				flag:false,   //是否可输入 默认可以
        edit:false,	 //编辑标识
        add:false    //新增标识
			},
      funList:[],
	    rules:{
          productName:[
          	{required:true,message:"产品名称不能为空",trigger:'change'}//产品名称不能为空
          ],
          productCode:[
          	{required:true,message:"产品代码不能为空",trigger:'blur'},//产品代码不能为空
          ],
          rateState:[
          	{required:true,message:i18n.t('bench.NotEmptyState'),trigger:'change'}//状态不能为空
          ]
	    },
    }
  },
  mounted(){
    this.getFunList()
    this.getLimitList("IS_AUTO_DISTR");
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
        return item.name == '产品管理'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取证件类型
//  getLoanList(){
//    this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'LOAN_PERIOD_CYCLE'}).then(res =>{
//      if(res.returnCode == '000000'){
//        this.loanList =  res.returnData;
//      }
//    });
//
//  },
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
    getLimitList (val) {
			this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: val}).then(res =>{
				if(res.returnCode == '000000'){
					this.isAutoDistrs =  res.returnData;
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
            path = '/loanProduct/loanProductUpdate'
            this.addForm.createUser = ''
            this.addForm.updateUser = this.$store.state.loginData.userLogin.userName
          } else {
            path = '/loanProduct/loanProductInsert'  //新增确定
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
			this.$post(this.$api + '/loanProduct/findPageList',this.obj).then( res =>{
				if(res.returnCode=="000000"){
					this.tableData =res.returnData.rows
					this.totalCount = res.returnData.totalCount;

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
      this.addForm.title="新增产品"
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
      console.log(row)
      this.addForm.edit = false;
      this.addForm.flag = true;
      this.addForm.productName = row.productName
      this.addForm.productCode = row.productCode
      this.addForm.productNum = row.productNum
      this.addForm.correProductCode=row.correProductCode
      this.addForm.linkWorkflowName = row.linkWorkflowName
      this.addForm.linkContractName = row.linkContractName
      this.addForm.linkWorkflowName = row.linkWorkflowName
      this.addForm.operatingMode = row.operatingMode
      this.addForm.contractRate = row.contractRate
      this.addForm.contractRateValue = row.contractRateValue
      this.addForm.billingFrequency = row.billingFrequency
      this.addForm.billingFrequencyValue = row.billingFrequencyValue
      this.addForm.mediaCode = row.mediaCode
      this.addForm.minLoanAmountFlag = row.minLoanAmountFlag
      this.addForm.minLoanAmount = row.minLoanAmount
      this.addForm.orgNos = row.orgNos
      this.addForm.createTime=row.createTime;
  		this.addForm.createUser=row.createUser;
  		this.addForm.updateTime=row.updateTime;
  		this.addForm.updateUser=row.updateUser;
      this.getFrInfo()
      this.addForm.title="产品详情"
      this.addUserDialog = true
    },
    // 修改
    editItem (row) {
      let self = this
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = true;
      this.addForm.productName = row.productName
      this.addForm.productCode = row.productCode
      this.addForm.productNum = row.productNum
      this.addForm.correProductCode=row.correProductCode
      this.addForm.linkWorkflowName = row.linkWorkflowName
      this.addForm.linkContractName = row.linkContractName
      this.addForm.linkWorkflowName = row.linkWorkflowName
      this.addForm.operatingMode = row.operatingMode
      this.addForm.contractRate = row.contractRate
      this.addForm.contractRateValue = row.contractRateValue
      this.addForm.billingFrequency = row.billingFrequency
      this.addForm.billingFrequencyValue = row.billingFrequencyValue
      this.addForm.mediaCode = row.mediaCode
      this.addForm.minLoanAmountFlag = row.minLoanAmountFlag
      this.addForm.minLoanAmount = row.minLoanAmount
      this.addForm.orgNos = row.orgNos
      this.addForm.createTime=row.createTime;
  		this.addForm.createUser=row.createUser;
  		this.addForm.updateTime=row.updateTime;
  		this.addForm.updateUser=row.updateUser;
      this.getFrInfo()
      this.addForm.title="修改产品"
      this.getFrInfo()
      this.addUserDialog = true
    },
    // 删除
    deleteItem(row){
      var _this =this;
      this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
          confirmButtonText: i18n.t('OK'),
          cancelButtonText: i18n.t('Cancel'),
          type: 'warning'
      }).then(() => {
      	var objec={
      		productNumList:[]
      	}
      	objec.productNumList.push(row.productNum)
        this.$post(this.$api + '/loanProduct/loanProductDelete',objec).then(function(res){
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

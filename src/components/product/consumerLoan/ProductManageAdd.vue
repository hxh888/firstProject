<template>
	<!-- 消费贷产品管理录入新增 -->
	<div class="content_box mt20">
		<div class="tab">
			<el-tabs v-model="activeName">
				<!--产品信息-->
				<el-tab-pane label="产品信息" name="first" disabled>
					<el-form ref="productInfo"  :model="productInfo" :rules="rules" label-width="140px">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="产品名称" prop="productFunName">
									<el-input v-model="productInfo.productFunName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="业务类型" prop="productType">
									<el-select v-model="productInfo.productType" placeholder="请选择"  style="width:100%">
										<el-option value="">请选择..</el-option><!-- 请选择 -->
										<el-option v-for="(item,index) in productTypeArr" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="发布渠道" prop="pubChannelNo">
									<el-select v-model="productInfo.pubChannelNo" placeholder="请选择"  style="width:100%">
										<el-option value="">请选择..</el-option><!-- 请选择 -->
										<el-option v-for="(item,index) in pubChannelNoArr" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12"  >
								<el-form-item label="核心额度节点编号" prop="busQuotaId" v-if="productInfo.productType==2">
									<el-input v-model="productInfo.busQuotaId" ></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="核算产品编号" prop="accountProductNum">
									<el-input v-model="productInfo.accountProductNum" ></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="生效日期" prop="addTime">
									<el-date-picker  v-model="productInfo.addTime" type="date" placeholder="选择日期"> </el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="到期日期" prop="endTime">
									<el-date-picker  v-model="productInfo.endTime" type="date" placeholder="选择日期"> </el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="产品说明" prop="remark">
									<el-input type="textarea"  rows="7"  placeholder="最多可输入2500个字符" v-model="productInfo.remark" ></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24"  class="step">
								<el-form-item>
									<el-button type="primary"  @click="productInfoNext('productInfo')">下一步</el-button>
									<el-button @click="cancleAdd()">取消</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<!--关联参数-->
				<el-tab-pane label="关联参数" name="second" disabled>
					<div class="s_title">产品工作流配置  <el-button type="primary" size="small" @click="addProductWorkflow()">增加配置</el-button></div>

					<div class="table_height mt20">
						<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
							<thead>
								<tr role="row">
									<th colspan="1" rowspan="1" class="text-center sorting"><span	class="red">*</span>渠道类型<!-- 渠道类型--></th>
									<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>流程定义号<!-- 流程定义号--></th>
								</tr>
							</thead>
							<tbody >
								<tr class="odd" v-for="(productWorkflow,index) in productWorkflowList" :key='index'>
									<td class="text-center" >  <!-- 渠道类型-->
										<el-select style="width:90%;"  v-model="productWorkflow.appiChannel" placeholder="请选择"  id="appiChannel">
											<el-option v-for="(item,index) in levelType" 
												:key="index" 
												:label="item.bizTypePropName" 
												:value="item.bizTypePropCode">{{item.bizTypePropName}}
											</el-option>
										</el-select>
									</td>

									<td class="text-center">  <!-- 流程定义号-->
										<el-input v-model="productWorkflow.processDefineKey"  id="processDefineKey"   class="form-control"></el-input>
									</td> 
								</tr>
							</tbody>
						</table>
					</div>
					<div  class="step mt20">
						<el-button type="primary"  @click="activeName='first'">上一步</el-button>
						<el-button type="primary"  @click="relevNext()">下一步</el-button>
						<el-button @click="cancleAdd()">取消</el-button>
					</div>		
				</el-tab-pane>
				<!--产品在组件配置-->
				<el-tab-pane label="产品组建配置" name="third" disabled>
					<el-row :gutter="25" class="allocation">
						<el-col :span="6">
							<h4>产品组件列表</h4>
							<div class="product_list">
								<el-tree :data="treeData" 
										:props="defaultProps" 
										node-key="id" 
										show-checkbox
										check-strictly
										@check-change="radioTreeData"
										 @node-click="getProductVal"
										ref="treeForm" 
										>
								</el-tree>  
							</div>
						</el-col>
						<el-col :span="6">
							<h4>产品组件配置信息</h4>
							<div class="product_list">
								<div class="box_border">
									<el-row>
										<el-col :span="6" style="line-height:28px;">产品名称</el-col>
										<el-col :span="16">
											<el-input  v-model="this.productInfo.productFunName"  size="mini" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="6" style="line-height:36px;">产品组件</el-col>
									</el-row>
								</div>
								<div class="box_list">
									<p>请在产品组件列表选择相关产品组件</p>
									<ul id="checkProductlist">
										<li id="FixPrice">{{FixPrice}} </li> <!--定价组件-->
										<li id="LimitControl">{{LimitControl}}</li> <!--限额组件-->
										<li id="RepaymentWay">{{RepaymentWay}}</li> <!--还款方式组件-->
										<li id="UseRange">{{UseRange}}</li> <!--使用范围组件-->
									</ul>
								
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<h4>产品组件属性</h4>
							<div class="product_list">
								<!-- 定价组件 -->
								<div id="boxFirst" v-if="isShowComponets == 1">
									<el-row>
										<el-col :span="8"><div class="input_left">挪用利率上浮比例(%)：</div></el-col>
										<el-col :span="16">
											<el-input size="mini"  v-model="proudctProperty.penaltyRate" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">提前还款违约比例(%)：</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.preRepayScale" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">逾期利率方式：</div></el-col>
										<el-col :span="16">
											<el-select style="width:100%" v-model="proudctProperty.overdueMode" disabled  size="mini">
												<el-option v-for="(item,index) in overdueModeArr" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
											</el-select>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">固定逾期利率/上浮比例(%)：</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.overdueInterRate"    disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">允许提前还款无手续费：</div></el-col>
										<el-col :span="16">
											<input type="checkbox" id="earlyRepaymentCharge" disabled/>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">定价规则模型：</div></el-col>
										<el-col :span="16">
											<el-select style="width:100%" v-model="proudctProperty.priceModelType" disabled size="mini">
												<el-option v-for="(item,index) in priceModelTypeArr" :key="index" :label="item.rulePricingName" :value="item.rulePricingCode"></el-option>
											</el-select>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">是否自动调整利率：</div></el-col>
										<el-col :span="16">
											<input type="checkbox" id="autoAjustInt" disabled />
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">是否预收息：</div></el-col>
										<el-col :span="16">
											<input type="checkbox" id="advanceInt" disabled/>

										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">是否组合定价：</div></el-col>
										<el-col :span="16">
											<input type="checkbox" id="combinedPrice" disabled/>
										</el-col>
									</el-row>
									<h4>还款期限与利率配置</h4>
									<template>
										<el-table :data="limitRateData" border>
											<el-table-column prop="term" label="期限" width="50px"></el-table-column>
											<el-table-column prop="unit" label="单位"  width="50px"></el-table-column>
											<el-table-column prop="benchmarkRate" label="基准利率"  width="78px"></el-table-column>
											<el-table-column prop="floatingMode" label="浮动方式" width="78px"></el-table-column>
											<el-table-column prop="floatValue" label="浮动值" width="65px"></el-table-column>
											<el-table-column prop="executionRate" label="执行利率" width="78px"></el-table-column>
											<el-table-column prop="feeType" label="收费方式" width="100px"></el-table-column>
											<el-table-column prop="feeRate" label="每期费率(%)" width="108px"></el-table-column>
											<el-table-column prop="totalFee" label="固定费用" width="78px"></el-table-column>
										</el-table>
									</template>
								</div>
								<!-- 限额组件 -->
								<div id="boxSecond"  v-if="isShowComponets == 2">
									<el-row>
										<el-col :span="8"><div class="input_left">额度使用方式：</div></el-col>
										<el-col :span="16">
											<el-select style="width:100%" v-model="proudctProperty.quotaUsageMode" size="mini">
												<el-option v-for="(item,index) in quotaUsageModeArr" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
											</el-select>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">单次提款限额(元):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.singleWithdrawalLimit" disabled> </el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">最小贷款金额(元):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.minLoanAmt" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">最大贷款金额(元):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.maxLoanAmt" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">最小期限(月):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.minTerm" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">最大期限(月):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.maxTerm" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">利率浮动下限(%):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.minFloatRate" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">利率浮动上限(%):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.maxFloatRate" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">自主支付最大金额(元):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.maxSelfPayAmt" disabled></el-input>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="8"><div class="input_left">提前还款最大金额(元):</div></el-col>
										<el-col :span="16">
											<el-input size="mini" v-model="proudctProperty.maxearlyPayAmt" disabled></el-input>
										</el-col>
									</el-row>
								</div>
								<!-- 还款方式组件 -->
								<div id="boxThird"  v-if="isShowComponets == 3">
									<h4>还款方式列表</h4>
									<template>
										<el-table  border>
											<el-table-column prop="i1" label="还款方式编号"></el-table-column>
											<el-table-column prop="i2" label="还款方式名称" ></el-table-column>
											<el-table-column prop="i3" label="还款方式分类"  ></el-table-column>
											<el-table-column prop="i4" label="基准还款方式"></el-table-column>
											<el-table-column prop="i5" label="创建人" ></el-table-column>
											<el-table-column prop="i6" label="创建时间" ></el-table-column>
										</el-table>
									</template>
								</div>

								<!-- 使用范围组件 -->
								<div id="boxFourth"  v-if="isShowComponets == 4">

								</div>
							</div>
						</el-col>
					</el-row>
					<div  class="step mt20">
						<el-button type="primary"  @click="activeName='second'">上一步</el-button>
						<el-button type="primary"  @click="productZJNext()">下一步</el-button>
						<el-button @click="cancleAdd()">取消</el-button>
					</div>		
				</el-tab-pane>

				<!--合同模板-->
				<el-tab-pane label="合同模板" name="fourth" disabled>

					<div class="table_height mt20">
						<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
							<thead>
								<tr role="row">
									<th colspan="1" rowspan="1" class="text-center sorting">选择<!-- 选择--></th>
									<th colspan="1" rowspan="1" class="text-center sorting">合同模板名称<!-- 合同模板名称--></th>
									<th colspan="1" rowspan="1" class="text-center sorting">合同模板编号<!-- 合同模板编号--></th>
								</tr>
							</thead>
							<tbody >
								<tr class="odd" v-for="(row,index) in contractTemplateListForProduct" :key='index'>
									<td class="text-center">  <!-- 选择-->
										<!-- <el-radio v-model="radio" label="1"></el-radio> -->
										<input type="radio" name="radio" :id="row.contractNo"  :value="row.contractNo" />
									</td> 
									<td class="text-center" >  <!-- 合同模板名称-->
										{{row.contractName}}
									</td>

									<td class="text-center">  <!-- 合同模板编号-->
										{{row.contractNo}}
									</td> 
								</tr>
							</tbody>
						</table>
					</div>
					<div  class="step mt20">
						<el-button type="primary"  @click="activeName='third'">上一步</el-button>
						<el-button type="primary"  @click="tellTemplateNext()">下一步</el-button>
						<el-button @click="cancleAdd()">取消</el-button>
					</div>		
				</el-tab-pane>
				<!--电话核查模板管理-->
				<el-tab-pane label="电话核查模板管理" name="five" disabled>
					<div class="five-tab">
						<h4>
							<el-row class="tab-tit">
								<el-col :span="12" class="tab_tit_h4">模板配置</el-col>
								<el-col :span="12" class="step" >
									<el-button type="primary" @click="addMoney()">增加模板配置</el-button>
								</el-col>
							</el-row>
						</h4>
						<div class="table_height mt20">
								<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
									<thead>
										<tr role="row">
											<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
											<th colspan="1" rowspan="1" class="text-center sorting"><span	class="red">*</span>话术类型<!-- 话术类型 --></th>
											<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>话术内容<!-- 话术内容--></th>
											<th colspan="1" rowspan="1" class="text-center sorting">操作<!-- 操作--></th>
										</tr>
									</thead>
									<tbody >
										<tr class="odd" v-for="(money,index) in moneysList" :key='index'>
											<td class="text-center">{{index+1}}</td>   <!-- 序号-->

											<td class="text-center" >  <!-- 话术类型-->
												<el-select style="width:90%;"  v-model="money.formworkType" placeholder="请选择"  id="formworkType">
														<el-option v-for="(item,index) in caseLevelList" 
															:key="index" 
															:label="item.bizTypePropName" 
															:value="item.bizTypePropCode">{{item.bizTypePropName}}
														</el-option>
												</el-select>
											</td>

											<td class="text-center">  <!-- 话术内容-->
												<el-input v-model="money.postLimitLow"  type="textarea" id="postLimitLow"   class="form-control"></el-input>
												
											</td> 
								
											<td class="text-center pt5 pb5">
												<el-button size="mini" type="danger" class="delete-btn" @click="delMoney(index)">
													<i class="el-icon-delete"></i><!--删除 -->
													<span class="text">删除</span>
												</el-button>
											</td>
										</tr>
									</tbody>
								</table>
						</div>

						<el-form ref="addReasonForm"  :model="addReasonForm" :rules="rules" label-width="140px">
							<el-row :gutter="20">
								<el-col :span="24">
									<el-form-item label="新增原因" prop="reasons">
										<el-input type="textarea"  rows="6"  placeholder="最多可输入2500个字符" v-model="addReasonForm.reasons" ></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="20">
								<el-col :span="24"  class="step">
									<el-form-item>
										<el-button type="primary"  @click="activeName='fourth'">上一步</el-button>
										<el-button type="primary"  @click="cardTableNext('addReasonForm')">下一步</el-button>
										<el-button @click="cancleAdd()">取消</el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						
					</div>
				</el-tab-pane>

				<!--卡表管理-->
				<el-tab-pane label="卡表管理" name="six" disabled>
					<div class="six-tab">
						<div class="table_height mt20">
						<table aria-describedby="editable-sample_info" class="table" id="week-sample" size='mini'> 
							<thead>
								<tr role="row">
									<th colspan="1" rowspan="1" class="text-center sorting">选择<!-- 选择--></th>
									<th colspan="1" rowspan="1" class="text-center sorting">银行编号<!-- 银行编号--></th>
									<th colspan="1" rowspan="1" class="text-center sorting">银行名称<!-- 银行名称--></th>
								</tr>
							</thead>
							<tbody >
								<tr class="odd" v-for="(row,index) in cardTableManagementListForProduct" :key='index'>
									<td class="text-center">  <!-- 选择-->
										<input type="checkbox" name="cardTableCheckBox" :id="row.bankCode"/>
									</td> 
									<td class="text-center" >  <!-- 银行编号-->
										{{row.bankCode}}
									</td>

									<td class="text-center">  <!-- 银行名称-->
										{{row.bankName}}
									</td> 
								</tr>
							</tbody>
						</table>
					</div>
					<div  class="step mt20">
						<el-button type="primary"  @click="activeName='five'">上一步</el-button>
						<el-button type="primary"  @click="applSubmit()">提交并保存</el-button>
						<el-button @click="cancleAdd()">取消</el-button>
					</div>
						
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
		    return {
				activeName: 'third', //当前激活的步骤
		        productInfo:{//产品信息
		        	productFunName:"",//产品名称
		        	productType:"",//业务分类
		        	pubChannelNo:'',//发布渠道
		        	busQuotaId:"",//核心额度节点编号
		        	accountProductNum:"",//核算产品编号
		        	addTime:"",//生效日期，
		        	endTime:"",//到期日期
		        	remark:"",//产品说明
				},
				productTypeArr:[], //业务分类
				pubChannelNoArr:[], //发布渠道
				levelType:[], //渠道类型
				overdueModeArr:[], //逾期利率方式
				priceModelTypeArr:[], //定价规则模型
				quotaUsageModeArr:[], //额度使用方式
				caseLevelList:[], //话术类型

				productWorkflowList:[], //关联参数
				contractTemplateListForProduct:[], //合同模板
				moneysList:[], //电话核查模板管理
				cardTableManagementListForProduct:[],//卡表管理

				i:0,
				defaultProps: {
		          children: 'children',
		          label: 'label'
				},
				treeData:[], //产品组件列表树结构
				
				FixPrice:'', //定价组件
				LimitControl:'', //限额组件
				RepaymentWay:'', //还款方式组件
				UseRange:'', //使用范围组件
				componentId:[], ////获取选中组件的id

				isShowComponets:1,  //组件显示
				proudctProperty:{}, //定价组件 数据
				limitRateData:[],//还款期限与利率配置 数据
			
				addReasonForm:{  
					reasons:'', //电话核查模板管理新增理由
				},
		        rules:{
					// productFunName:[
					// 	{required: true, message: '请输入产品名称' }
					// ],
					productType:[
						{required: true, message: '请选择业务类型', trigger: 'change'}
					],
					// pubChannelNo:[
					// 	{required: true, message: '请选择发布渠道' , trigger: 'change'}
					// ],
					busQuotaId:[
						{required: true, message: '请输入核心额度节点编号' }
					],
					// accountProductNum:[
					// 	{required: true, message: '请输入核算产品编号' }
					// ],
					// addTime:[
					// 	{required: true, message: '请输入生效日期' }
					// ],
					// endTime:[
					// 	{required: true, message: '请输入到期日期' }
					// ],
					// remark:[
					// 	{required: true, message: '请输入产品说明' }
					// ],
					// reasons:[
					// 	{required: true, message: '请输入新增原因' }
					// ],
					
				},
				loginMsg:this.$store.state.loginData, 

				newProductWorkflowList:[],  //获取工作流配置数据

		    };
		},
		created(){
			this.initSelectOption(); //初始化下拉框数据
			this.getTreeObjData();//获取产品组件列表树结构
		},
	    mounted(){
	    	
	    },
	    methods:{
			//初始化下拉框数据
			initSelectOption(){
				//业务分类
				var funMsgDataSelproa = {
					"channelNo":"1",
					"transCode":"SETPARARGS301",
					"bizTypeCode":"LN_BussType"
				}
				this.$post(this.$api,funMsgDataSelproa).then( res =>{
					this.productTypeArr = res.rows;
				});
				//发布渠道
				var funMsgDataSelprob = {
					"channelNo":"1",
					"transCode":"SETPARARGS301",
					"bizTypeCode":"LN_ChannelNo"
				}
				this.$post(this.$api,funMsgDataSelprob).then( res =>{
					this.pubChannelNoArr = res.rows;
				});	
				// 渠道类型
				var FunMsgData11 = {
					"channelNo": "1",
					"transCode": "SETPARARGS301",
					"bizTypeCode": "APPI_SEND_FLAG"
				};
				this.$post(this.$api,FunMsgData11).then( res => {
					this.levelType = res.rows;
				});
				//逾期利率方式  LN_OverdueMode
				var funMsgOverdueMode ={
					"channelNo":"1",
					"transCode":"SETPARARGS301",
					"bizTypeCode":"LN_OverdueMode"	
				}
				this.$post(this.$api,funMsgOverdueMode).then( res => {
					this.overdueModeArr = res.rows;
				});
				//额度使用方式    LN_Credit
				var funMsgCredit ={
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_Credit"	
				}
				this.$post(this.$api,funMsgCredit).then( res => {
					this.quotaUsageModeArr = res.rows;
				});
				// 合同模板--显示 add by zhangmy 2019/03/28
				var ProductListMsgDataA = {
					"channelNo" : "1",
					"legalPersonNum" : this.loginMsg.legalPersonNum, // 法人代码
					"transCode" : "SETCONTRACTTEMPLATE300",
					"flag": "1",//区分产品 录入和合同模板管理调用相同的接口 1:只查启用的
					// "status" : this.status,
					"indexNo" : 0,
					"pageSize" : 10000
				};
				this.$post(this.$api, ProductListMsgDataA).then( res => {
						this.contractTemplateListForProduct = res.rows;
				});
				//模板字典
				var formworkTypeData = {
					"channelNo": "1",
					"transCode": "SETPARARGS301",
					"bizTypeCode": "APPI_FORMWORK_TYPE"
				};
				this.$post(this.$api, formworkTypeData).then( res =>{
					this.caseLevelList = res.rows;
				});
				// 卡表管理列表 add by zhangmy 2019/06/05
				var cardTableManagementData = {
						"channelNo": "1",
						"transCode": "SETCARDTABLE301",
						"enabledState": "1",
						"deleteFalg":"1"
				};               
				this.$post(this.$api,cardTableManagementData).then( res => {
					this.cardTableManagementListForProduct = res.rows;
				});
            
			},
			//取消
			cancleAdd(){
				this.$router.push({path:'/MainIndex/credit/loanproductManageEn?id=2'})
			},
			//下一步
			productInfoNext(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.activeName = 'second'
					}
				})
			},
			relevNext(){
				// if(this.productWorkflowList == 0){
				// 	this.$message({
				// 		message:'请至少增加一条产品工作流配置！',
				// 		type: 'warning' 
				// 	})
				// 	return
				// }
				// if($('#appiChannel').val() == ''){
				// 	this.$message({
				// 		message: '请选择渠道类型',
				// 		type: 'warning' 
				// 	})
				// 	return
				// }
				// if($('#processDefineKey').val() == ''){
				// 	this.$message({
				// 		message: '请输入流程定义号',
				// 		type: 'warning' 
				// 	})
				// 	return
				// }
				this.activeName = 'third'
			},
			productZJNext(){
				if( this.FixPrice == '' || this.LimitControl == '' ||  this.RepaymentWay == ''){
					this.$message({
						message:'请在产品组件列表选择相关产品组件!',
						type: 'warning' 
					})
					return
				}	
				if(this.productInfo.productType ==2){
					debugger
					this.$message({
						message: '额度产品,请不要选择还款方式组件！',
						type: 'warning' 
					})
					return
				}
				this.activeName = 'fourth'
			},
			tellTemplateNext(){
				this.activeName = 'five'
			},
			cardTableNext(){
				this.activeName = 'six'
			},
			//关联参数中点击增加配置
			addProductWorkflow(){
				if (this.productWorkflowList == undefined) {
					this.productWorkflowList = [{}];
				}else {
					if(this.productWorkflowList.length<2){
						this.productWorkflowList.splice(0, 0, {});
					}else{
						this.$message({
							message:'只能为产品配置两条工作流信息',
							type: 'warning' 
						})
					}
				}
			},
			//获取产品组件列表树结构
			getTreeObjData(){
				var OrgListMsgData4 = {
					"legalNum":"00001",
					"channelNo":"1",
					"transCode":"SETLOANCOMLIB302"
				};
				this.$post(this.$api,OrgListMsgData4).then( res =>{
					var arr = this.toTree(res.rows)
					this.treeData =  arr;
				});
			},
			toTree(data){
				var num = 0 ;
				data.forEach(function (item) {
					delete item.children;
				});
				var map = {};
				data.forEach(function (item) {
					map[item.id] = item;
				});
				var val = [];
				data.forEach(function (item) {
					item.id = num++;
					item.label = item.branchName;
					var parent = map[item.parentBranchId];
					if (parent) {
						(parent.children || ( parent.children = [] )).push(item);
					} else {
						val.push(item);
					}
				});
				return val;
			},
			//树单选
			radioTreeData(data,checked, node) {
				this.i++;
				if(this.i%2==0){
					if(checked){
						this.$refs.treeForm.setCheckedNodes([]);
						this.$refs.treeForm.setCheckedNodes([data]);
						//交叉点击节点
					}else{
						this.$refs.treeForm.setCheckedNodes([]);
						//点击已经选中的节点，置空
					}
				}
			},
			//树节点选择
			getProductVal(data){
				//定价组件
				if(data.componentType == 'FixPrice'){
					this.FixPrice =  data.branchName;
					this.isShowComponets = 1
					var funMsgDatarule = {
						"channelNo":"1",
						"legalNum":"00001",
						"transCode":"SETLOANRULEPRIC300",
						"indexNo":"0",
						"pageSize":"100000"
					}
					this.$post(this.$api,funMsgDatarule).then( res =>{
						this.priceModelTypeArr = res.rows
					});

				}
				//限额组件
				if(data.componentType == 'LimitControl'){
					this.LimitControl =  data.branchName;
					this.isShowComponets = 2
				}
				//还款方式组件
				if(data.componentType == 'RepaymentWay'){
					this.RepaymentWay =  data.branchName;
					this.isShowComponets = 3
				}
				//使用范围组件
				if(data.componentType == 'UseRange'){
					this.UseRange =  data.branchName;
					this.isShowComponets = 4
				}
				
				var funMsgDataType = {
					"channelNo":"1",
					"transCode":"SETLOANCOMLIB301",
					"legalNum" :"00001",
					"componentId":data.branchId
				}
				this.$post(this.$api,funMsgDataType).then( res =>{
				
					this.limitRateData = res.productTermRate  //定价组件

					var html ="{"+res.html+"}";
					var htm = html.replace(/\=/g, ":");
					this.proudctProperty =JSON.parse(htm);

				});

				this.componentId.push(data.branchId)  //获取选中组件的id
				
			},
			//模板设置--新增
			addMoney(){
				if (this.moneysList == []) {
					this.moneysList = [{}];
				}
				else {
					this.moneysList.splice(0, 0, {});
				}
			},
			// 模板设置--删除
   	       	delMoney(i) {
   	            this.moneysList.splice(i, 1);
			},
			//产品工作流配置数据存入数组
			productWorkflowSave(){
				for (var i = 0; i < this.productWorkflowList.length; i++) {
					var selectedstring="";
					if(this.productWorkflowList[i].selected!=undefined&&this.productWorkflowList[i].selected!=[]){
						selectedstring = this.productWorkflowList[i].selected.join(",");
					}
					var newProductWorkflow = {
							"appiChannel":this.productWorkflowList[i].appiChannel, //渠道类型
							"processDefineKey":this.productWorkflowList[i].processDefineKey,//流程定义号
							"id":this.productWorkflowList[i].id,
					};
					this.newProductWorkflowList.push(newProductWorkflow);
				};
			},
			//提交审批并保存 //提交后把状态改为0
			applSubmit(){
		        	// 获取选中卡表管理 add by zhangmy 2019/06/05
					var cardTableList= [];
					try {
						$("input[name='cardTableCheckBox']:checked").each(function(i,item){
							var ele = $(this).attr("id");
			                var addCardTableNew = {
			                	"bankCode": ele
				             };
			                cardTableList.push(addCardTableNew);
						});
						if (cardTableList.length == 0){
							this.$message({
								message:"请至少选择一条放款管理记录！",
								type: 'warning' 
							})
			        		return false;
						}
					} catch (e) {
						cardTableList = [];
					}
		        	
					//关联参数标签页数据获取
					this.productWorkflowSave();

					//获取选中合同模板编号 add by zhangmy 2019/03/29
					var cNo = "", mbNo = "", pcId = "";
					try {
						$('input[type="radio"]').each(function(i,item){// 遍历所有的radio i是顺序 obj是本身
							if(item.checked){ // 判断此radio是不是选中状态 如果是 执行
								cNo=this.contractTemplateListForProduct[i];
								mbNo = cNo.contractNo;
								pcId = cNo.pcId;
							}
						}); 
					} catch (e) {
						mbNo = "";
					}

					//话术模板
					var addMoneyNewList = [];
					if(this.moneysList != null || this.moneysList != undefined){
						for (var i = 0; i < this.moneysList.length; i++) {
				             var addMoneyNew = {
				                 formworkID:this.moneysList[i].id,
				                 formworkType: this.moneysList[i].formworkType
				             };
				             addMoneyNewList.push(addMoneyNew);
				         }
					}

					var addPropuct = {
						"channelNo": "1",
						"transCode": "SETLOANPRO502" ,
	                    "id":"",
	                    "productNum":"", //产品编号
	                     //产品名称
	                    "productName":this.productInfo.productFunName,
	            		//业务分类
	            		"productType":this.productInfo.productType,
	            		//发布渠道
	            		"pubChannelNo":this.productInfo.pubChannelNo,
	            		//核心额度节点编号
	            		"busQuotaId":this.productInfo.busQuotaId,
	            		//生效日期
	            		"effectiveDate":this.productInfo.addTime,
	            		//到期日期
	            		"expirationDate":this.productInfo.endTime,
	            		//核算产品编号
	            		"accountProductNum":this.productInfo.accountProductNum,
	            		//产品说明
						"remark":this.productInfo.remark,
						//组件id Array
	            		"componentIds":this.componentId,
	            		//产品工作流配置信息
						"productWorkflowList":this.newProductWorkflowList,
						
	            		//合同模板编号 add by zhangmy 2019/03/29
        				"contractNo": mbNo,
        				"pcId": pcId,
        				"rmk":this.addReasonForm.reasons,//新增原因
        				"formworkList":addMoneyNewList,//模板配置
        				// "status":this.status,//产品状态
        				"cardTableList":cardTableList //卡表管理 add by zhangmy 2019/06/05
	            	};

	            	this.$post(this.$api,addPropuct).then( res => {
						if(res.returnMsg=="OK"){
							this.$message({
								message:'保存成功',
								type: 'warning' 
							})
							this.$router.puch('/MainIndex/credit');
						}else{
							// alert("保存失败!",this.change.returnMsg, {type: 'error',showConfirmButton:false});
							this.$message({
								message:res.returnMsg,
								type: 'warning' 
							})
						}
					});
		       }






	    }
	};
</script>

<style scoped="scoped" lang="scss">
	.content_box{
		background: #fff;
		@include radius(5px);
		padding: 15px;
	}
	.allocation h4{
		margin:15px 0; 
		font-size:16px;
	}
	.textarea{
		height: 100px;
	}
	.step{
		text-align:right;
	}
	.s_title{
		line-height:40px; 
		color: #333;
		button{
			margin-left: 20px;	
		}
	}
	.table_height{
		min-height: 200px;
		th{
			padding: 5px 0;
		}
		td{
			line-height: 25px
		}
	}
	.product_list{
		width:100%; 
		height:450px; 
		border:1px solid #ddd; 
		padding:10px;
		box-sizing: border-box;
		overflow: auto;
	}
	.box_list{
		p{
			color:red;line-height:30px;
		}
		ul{
			background: #f5f5f5;
			padding-left: 20px;
			li{
				line-height:30px;
				color: #333
			}
		}
	}
	.input_left{
		line-height:32px;
		text-align: right;
		padding-right: 15px;
	}
	.tab_tit_h4{
		font-size:18px;
	}
</style>
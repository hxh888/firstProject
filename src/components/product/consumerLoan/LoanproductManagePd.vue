<template>
	<!-- 消费贷产品管理复核 -->
  	<div id="fh_content">
		<!-- 编辑模块(搜索新增查询) 开始-->
		<div class="edit_module">
			<el-form :inline="true"  class="demo-form-inline">
				<el-row>
					<el-col :span="18">
						<el-form-item label="产品名称"> 	<!-- 产品名称 -->
							<el-input v-model="queryFunName" placeholder="请输入产品名称"  @input="onChangequery()"></el-input>
						</el-form-item>

						<el-form-item label="产品编号">     	<!-- 产品编号 -->
							<el-input v-model="queryNum"  placeholder="请输入产品编号" @input="onChangequery()"></el-input>
						</el-form-item>

						<el-form-item label="产品状态">  	<!-- 产品状态 -->
						<el-select v-model="queryStatus" >
							<el-option value="">请选择..</el-option><!-- 请选择 -->
							<el-option  :value="item.bizTypePropCode" 
										v-for="(item,index) in funs1" 
										:key="index"  :label="item.bizTypePropName"  >{{item.bizTypePropName}}</el-option>
						</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="6" class="edit_module_btn" >
					<el-form-item>
						<el-button type="warning" icon="el-icon-search" @click="initLoanProductPdList()" >查询</el-button>  <!--查询按钮-->
					</el-form-item>
					</el-col>
				</el-row>  
			</el-form>
		</div>
		<!-- 编辑模块(搜索新增查询)结束 -->
		
		<!-- 列表模块开始-->
		<div class="list_module">
			<div class="table_body">
				<el-table :data="loanProductPdList" border style="width: 100%"   size='small'>
						<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center"  width="60px"></el-table-column><!--序号-->

						<el-table-column prop="productName" :label="$t('loanproductManage.product_name')"  align="center"> </el-table-column><!--产品名称-->
						<el-table-column prop="productNum" label="产品编号"  align="center"> </el-table-column><!--产品编号-->

						<el-table-column prop="productTypee" label="产品分类"  align="center"> </el-table-column><!--产品分类-->
						
						<el-table-column prop="effectiveDate" label="生效日期"  align="center"> </el-table-column><!--生效日期-->

						<el-table-column prop="expirationDate" label="到期日期"  align="center"> </el-table-column><!--到期日期-->

						<el-table-column prop="statusVal" label="产品状态"  align="center"> </el-table-column><!--产品状态-->

						<el-table-column prop="apprStatusVal" label="审批状态"  align="center"> </el-table-column><!--审批状态-->
						
						<el-table-column :label="$t('group.Operation')" align="center"  width="180px">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" class="edit-btn" @click="approvalItem(scope.row)">
									<i class="iconfont icon-chakan"></i>
									<span class="text">审批</span><!--审批-->
								</el-button>
							</template>
						</el-table-column>
				</el-table>

				<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[5, 10, 15, 20,25]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalCount">
				</el-pagination>
			</div>
		</div>
		<!--列表模块结束-->
		<!--弹框页面开始-->
		<el-dialog title="新增产品授信额度" :visible.sync="dialogFormVisible"  :before-close="cancel"  :close-on-click-modal="false">
			<!-- 产品信息 -->
			<div class="section section1 mt20">
				<h3 class="">产品信息</h3>
				<el-form  label-width="120px" size="small" >
					<el-row>
						<el-col :span="6">
							<el-form-item label="产品名称" prop="productFunName">    
								<el-input  v-model="this.message.productName" :disabled="true"></el-input>      <!-- 产品名称 -->
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="业务分类" prop="productType">    
								<el-select v-model="this.message.productType" placeholder="请选择" :disabled="true">    <!-- 业务分类 -->
									<el-option  v-for='(item,index) in productTypeArr' :key="index"
											:label="item.bizTypePropName" 
											:value="item.bizTypePropCode" ></el-option>
									
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="发布渠道" prop="pubChannelNo">
								<el-select v-model="this.message.pubChannelNo" placeholder="请选择" :disabled="true">    <!-- 发布渠道 -->
										<el-option  v-for='(item,index) in pubChannelNoArr' :key="index"
													:label="item.bizTypePropName" 
													:value="item.bizTypePropCode" ></el-option>
									
								</el-select>
							</el-form-item>
						</el-col>
						
						<el-col :span="6">
							<el-form-item  label="核心额度节点编号" prop="busQuotaId"  label-width="150px">
								<el-input  v-model="this.message.busQuotaId" :disabled="true"></el-input>  <!-- 核心额度节点编号 -->
							</el-form-item>
						</el-col>


						<el-col :span="6">
							<el-form-item label="核算产品编号" prop="accountProductNum">
								<el-input  v-model="this.message.accountProductNum" :disabled="true"></el-input>  <!-- 核算产品编号 -->
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="产品状态" prop="status">
								<el-select v-model="this.message.status" placeholder="请选择" :disabled="true">    <!-- 产品状态 -->
									<el-option  v-for='(item,index) in statuslist' :key="index"
													:label="item.bizTypePropName" 
													:value="item.bizTypePropCode" ></el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="生效日期" prop="effectiveDate">
								<el-input  v-model="this.message.effectiveDate" :disabled="true"></el-input >  <!-- 生效日期 -->
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="到期日期" prop="expirationDate">
								<el-input  v-model="this.message.expirationDate" :disabled="true"></el-input>  <!-- 到期日期 -->
							</el-form-item>
						</el-col>

						<el-col :span="24">
							<el-form-item label="产品说明" prop="remark">
								<el-input type="textarea"  v-model="this.message.remark" :disabled="true"></el-input>  <!-- 产品说明 -->
							</el-form-item>
						</el-col>

					</el-row>
				</el-form>
			</div>
			<!--产品信息-->

			<!-- 电话核查模板信息 -->
			<div class="section section2 mt10">
				<h3 class="">电话核查模板信息</h3>
				<div class="table_height">
					<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
						<thead>
							<tr role="row">
								<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
								<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>话术类型<!-- 话术类型--></th>
								<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>话术内容<!-- 话术内容--></th>
							</tr>
						</thead>
						<tbody>
							<tr class="odd" v-for="(item,index) in moneysList" :key='index'>
								<td class="text-center">{{index+1}}</td>   <!-- 序号-->

								<td class="text-center" >  <!-- 话术类型-->
									<el-select style="width:90%;" size="mini" v-model="item.formworkType" placeholder="请选择" disabled>
										<el-option v-for="(i,index) in caseLevelList" 
											:key="index" 
											:label="i.bizTypePropName" 
											:value="i.bizTypePropCode">{{i.bizTypePropName}}
										</el-option>
									</el-select>
								</td>

								<td class="text-center">  <!-- 话术内容-->
									<el-input type="textarea" v-model="item.formworkTxt"  size="mini"  class="form-control" disabled></el-input>
								</td> 
							
							</tr>
						</tbody>
						<!-- <div v-if="this.moneysList = [] " class="nomore">
							暂无数据
						</div> -->
					</table>
				</div>
			</div>
			<!--电话核查模板信息-->

			<!-- 合同模板信息 -->
			<div class="section section3 mt10">
				<h3 class="">合同模板信息</h3>
				<div class="table_height">
					<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
						<thead>
							<tr role="row">
								<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
								<th colspan="1" rowspan="1" class="text-center sorting">合同模板名称<!-- 合同模板名称--></th>
							</tr>
						</thead>
						<tbody >
							<tr class="odd" v-for="(item,index) in  this.message.contractTempleteList" :key='index'>
								<td class="text-center">{{item.contractNum}}</td>   <!-- 序号-->
								<td class="text-center">  <!-- 话术内容-->
									{{item.contractName}}
								</td> 
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!--合同模板信息-->
			
			<!-- 放款卡表管理信息 -->
			<div class="section section4 mt10">
				<h3 class="">放款卡表管理信息</h3>
				<div class="table_height">
					<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
						<thead>
							<tr role="row">
								<th colspan="1" rowspan="1" class="text-center sorting">银行编号<!-- 银行编号--></th>
								<th colspan="1" rowspan="1" class="text-center sorting">银行名称<!-- 合同模板名称--></th>
							</tr>
						</thead>
						<tbody >
							<tr class="odd" v-for="(item,index) in cardTableList" :key='index'>
								<td class="text-center">{{item.bankCode}}</td>   <!-- 银行编号-->
								<td class="text-center">  <!-- 放款卡表管理信息-->
									{{item.bankName}}
								</td> 
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!--放款卡表管理信息-->

			<!-- 工作流配置信息 -->
			<div class="section section4 mt10">
				<h3 class="">工作流配置信息</h3>
				<div class="table_height">
					<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
						<thead>
							<tr role="row">
								<th colspan="1" rowspan="1" class="text-center sorting">流程定义编号<!-- 流程定义编号--></th>
								<th colspan="1" rowspan="1" class="text-center sorting">渠道类型<!-- 渠道类型--></th>
							</tr>
						</thead>
						<tbody >
							<tr class="odd" v-for="(item,index) in this.proWorkflowList" :key='index'>
								<td class="text-center">{{item.processDefineKey}}</td>   <!-- 流程定义编号-->

								<td class="text-center">  <!-- 渠道类型-->
									{{item.appiChannelVal}}
								</td> 
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!--工作流配置信息-->

			<!-- 产品组件信息 -->
			<div class="section section5 mt10">
				<h3 class="">产品组件信息</h3>
				<div  v-show='isShowfixPrice'>   <!-- 定价信息 -->
					<h4>定价信息</h4> 
					<el-form label-width="200px" size="small" >
						<el-row>
							<el-col :span="8">
								<el-form-item label="挪用利率上浮比例(%)" >    
									<el-input  v-model="this.fixPrice.penaltyRate" :disabled="true"></el-input>      <!-- 挪用利率上浮比例(%) -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="提前还款违约比例(%)">    
									<el-input  v-model="this.fixPrice.preRepayScale" :disabled="true"></el-input>      <!-- 提前还款违约比例(%) -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="逾期利率方式">    
									<el-select v-model="this.fixPrice.overdueMode" placeholder="请选择" :disabled="true">    <!-- 逾期利率方式 -->
										<el-option  :value="item.bizTypePropCode" 
											v-for="(item,index) in overdueModeList" 
											:key="index"  :label="item.bizTypePropName">{{item.bizTypePropName}}</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="利率自动调整方式">
									<el-select v-model="this.fixPrice.overdueMode" placeholder="请选择" :disabled="true">    <!-- 利率自动调整方式 -->
									<el-option  :value="item.bizTypePropCode" 
											v-for="(item,index) in overdueModeList" 
											:key="index"  :label="item.bizTypePropName">{{item.bizTypePropName}}</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="定价规则模型" >
									<el-select v-model="this.fixPrice.priceModelType" placeholder="请选择" :disabled="true">    <!-- 定价规则模型 -->
										<el-option  :value="item.rulePricingCode" 
											v-for="(item,index) in priceModelTypeList" 
											:key="index"  :label="item.rulePricingName">{{item.rulePricingName}}</el-option>
									</el-select>
								</el-form-item>	
							</el-col>
							
							<el-col :span="6">
								<el-form-item label="固定逾期利率/上浮比例(%)">
									<el-input  v-model="this.fixPrice.overdueInterRate" :disabled="true"></el-input>  <!-- 固定逾期利率/上浮比例(%) -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="允许组合定价">   
									<el-checkbox  v-model="this.fixPrice.combinedPrice" id="combinedPrice" name="combinedPrice"  :disabled="true"></el-checkbox>  <!-- 允许组合定价 -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="允许提前还款无手续费">   
									<el-checkbox   v-model="this.fixPrice.earlyRepaymentCharge" id="earlyRepaymentCharge" name="earlyRepaymentCharge" :disabled="true"></el-checkbox>  <!-- 允许提前还款无手续费 -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="是否自动调整利率">   
									<el-checkbox   v-model="this.fixPrice.autoAjustInt" id="autoAjustInt" name="autoAjustInt" :disabled="true"></el-checkbox>  <!-- 是否自动调整利率 -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="是否预收息">   
									<el-checkbox   v-model="this.fixPrice.advanceInt" id="advanceInt" name="advanceInt" :disabled="true"></el-checkbox>  <!-- 是否预收息 -->
								</el-form-item>
							</el-col>

						</el-row>
					</el-form>
					<el-table  class="mt20" :data="cUserList" border style="width: 100%"   size='small'>
						<el-table-column prop="term"  label="期限" align="center"  width="60px"></el-table-column><!--期限-->

						<el-table-column prop="unit" label="单位"  align="center"> </el-table-column><!--单位-->

						<el-table-column prop="benchmarkRate" label="基准利率"  align="center"> </el-table-column><!--基准利率-->

						<el-table-column prop="floatingMode" label="浮动方式"  align="center"> </el-table-column><!--浮动方式-->

						<el-table-column prop="floatValue" label="浮动值"  align="center"> </el-table-column><!--浮动值-->

						<el-table-column prop="executionRate" label="执行利率"  align="center"> </el-table-column><!--执行利率-->

						<el-table-column prop="feeType" label="收费方式"  align="center"> </el-table-column><!--收费方式-->

						<el-table-column prop="feeRate" label="每期费率(%)"  align="center"> </el-table-column><!--每期费率(%)-->

						<el-table-column prop="totalFee" label="固定费用"  align="center"> </el-table-column><!--固定费用-->
					</el-table>
				</div>
				
				<div  v-show='isShowlimitControl' class="mt20" > <!-- 限额信息 -->
					<h4>限额信息</h4> 
					<el-form label-width="200px" size="small" >
						<el-row>
							<el-col :span="8">
								<el-form-item label="单次提款限额(元)" >    
									<el-input  v-model="this.singleWithdrawalLimit.penaltyRate" :disabled="true"></el-input>      <!-- 单次提款限额(元) -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="最小贷款金额(元)">    
									<el-input  v-model="this.singleWithdrawalLimit.preRepayScale" :disabled="true"></el-input>      <!--最小贷款金额(元) -->
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="最大贷款金额(元)">
									<el-input  v-model="this.singleWithdrawalLimit.overdueInterRate" :disabled="true"></el-input>  <!-- 最大贷款金额(元) -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="最小期限(月)" >    
									<el-input  v-model="this.singleWithdrawalLimit.penaltyRate" :disabled="true"></el-input>      <!-- 最小期限(月) -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="最大期限(月)">    
									<el-input  v-model="this.singleWithdrawalLimit.preRepayScale" :disabled="true"></el-input>      <!--最大期限(月) -->
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="利率浮动下限">
									<el-input  v-model="this.singleWithdrawalLimit.overdueInterRate" :disabled="true"></el-input>  <!-- 利率浮动下限 -->
								</el-form-item>
							</el-col>


							<el-col :span="8">
								<el-form-item label="利率浮动上限" >    
									<el-input  v-model="this.singleWithdrawalLimit.maxFloatRate" :disabled="true"></el-input>      <!-- 利率浮动上限 -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="自主支付最大金额(元)">    
									<el-input  v-model="this.singleWithdrawalLimit.maxSelfPayAmt" :disabled="true"></el-input>      <!--自主支付最大金额(元) -->
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="提前还款最大金额(元)">
									<el-input  v-model="this.singleWithdrawalLimit.maxearlyPayAmt" :disabled="true"></el-input>  <!-- 提前还款最大金额(元) -->
								</el-form-item>
							</el-col>


						

						</el-row>
					</el-form>
				</div>

				<div  v-show='isShowrepaymentWay' class="mt20" >
					<h4>还款方式信息</h4> 
					<el-table :data="bUserList" border style="width: 100%"   size='small'>
						<el-table-column prop="repayWayNum" label="还款方式编号" align="center" ></el-table-column><!--还款方式编号-->

						<el-table-column prop="repayWayName" label="还款方式名称"  align="center"> </el-table-column><!--还款方式名称-->

						<el-table-column prop="repayModeSortVal" label="还款方式分类"  align="center"> </el-table-column><!--还款方式分类-->

						<el-table-column prop="baseRepayModeVal" label="基准还款方式"  align="center"> </el-table-column><!--基准还款方式-->
						
						<el-table-column prop="createrName" label="创建人"  align="center"> </el-table-column><!--创建人-->

						<el-table-column prop="createTime" label="创建时间"  align="center"> </el-table-column><!--创建时间-->
					</el-table>
				</div>

				<div  v-show='isShowuseRange' class="mt20"  >
					<h4>使用范围组件</h4> 
					<el-form label-width="200px" size="small" >
						<el-row>
							<el-col :span="8">
								<el-form-item label="挪用利率上浮比例(%)" prop="productFunName">    
									<el-input  v-model="this.message.productFunName" :disabled="true"></el-input>      <!-- 挪用利率上浮比例(%) -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="提前还款违约比例(%)" prop="productFunName">    
									<el-input  v-model="this.message.productFunName" :disabled="true"></el-input>      <!-- 提前还款违约比例(%) -->
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="逾期利率方式" prop="productType">    
									<el-select v-model="this.message.productType" placeholder="请选择" :disabled="true">    <!-- 逾期利率方式 -->
										<el-option label="未启用" value="0"></el-option>
										<el-option label="启用" value="1"></el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="利率自动调整方式" prop="pubChannelNo">
									<el-select v-model="this.message.pubChannelNo" placeholder="请选择" :disabled="true">    <!-- 利率自动调整方式 -->
									<el-option label="未启用" value="0"></el-option>
									<el-option label="启用" value="1"></el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="定价规则模型" prop="pubChannelNo">
									<el-select v-model="this.message.pubChannelNo" placeholder="请选择" :disabled="true">    <!-- 定价规则模型 -->
									<el-option label="未启用" value="0"></el-option>
									<el-option label="启用" value="1"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							
							<el-col :span="6">
								<el-form-item label="固定逾期利率/上浮比例(%)" prop="accountProductNum">
									<el-input  v-model="this.message.accountProductNum" :disabled="true"></el-input>  <!-- 固定逾期利率/上浮比例(%) -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="允许组合定价">   
									<el-checkbox name="type" checked :disabled="true"></el-checkbox>  <!-- 允许组合定价 -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="允许提前还款无手续费">   
									<el-checkbox name="type" :disabled="true"></el-checkbox>  <!-- 允许提前还款无手续费 -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="是否自动调整利率">   
									<el-checkbox name="type" :disabled="true"></el-checkbox>  <!-- 是否自动调整利率 -->
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="是否预收息">   
									<el-checkbox name="type" :disabled="true"></el-checkbox>  <!-- 是否预收息 -->
								</el-form-item>
							</el-col>

						</el-row>
					</el-form>
					<el-table  class="mt20" :data="priceData" border style="width: 100%"   size='small'>
						<el-table-column prop="index" type="index" label="期限" align="center"  width="60px"></el-table-column><!--期限-->

						<el-table-column prop="productName" label="单位"  align="center"> </el-table-column><!--单位-->

						<el-table-column prop="productNum" label="基准利率"  align="center"> </el-table-column><!--基准利率-->

						<el-table-column prop="productTypee" label="浮动方式"  align="center"> </el-table-column><!--浮动方式-->

						<el-table-column prop="productTypee" label="浮动值"  align="center"> </el-table-column><!--浮动值-->

						<el-table-column prop="productTypee" label="执行利率"  align="center"> </el-table-column><!--执行利率-->

						<el-table-column prop="effectiveDate" label="收费方式"  align="center"> </el-table-column><!--收费方式-->

						<el-table-column prop="expirationDate" label="每期费率(%)"  align="center"> </el-table-column><!--每期费率(%)-->

						<el-table-column prop="statusVal" label="固定费用"  align="center"> </el-table-column><!--固定费用-->
					</el-table>
				</div>
				
			</div>
			<!--产品组件信息-->

			<el-form  ref="agreeForm"  :model="agreeForm"  label-width="200px" size="small" >
				<el-row>
					<el-col :span="12">
						<el-form-item label="备注">   
							<el-input  type="textarea"  v-model="this.message.rmk" disabled></el-input>      <!-- 备注 -->
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="审批意见">   
							<el-input  type="textarea"  v-model="agreeForm.approvalOpinion" ></el-input>      <!-- 审批意见 -->
						</el-form-item>
					</el-col>

				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addedGroup()">同意</el-button>   <!--同意-->
				<el-button type="primary" @click="Disagree()">不同意</el-button><!--不同意-->
				<el-button  type="primary" @click="cancel()">取消</el-button><!--取消-->
			</div>
		
		</el-dialog>
		<!--弹框页面结束-->

  	</div>
</template>

<script>
export default {
  data () {
    return {
		queryFunName: '', //产品名称
		queryNum:'', //产品编号
		queryStatus:'', //产品状态

		funs1:[], //初始化产品状态
		funs2:[], //产品分类
		funs3:[], //审批状态

		loanProductPdList:[], //table数据
		
		currentPage:1,//当前显示第几页 1开头
		pageSize:5,//一页显示几条数据
		totalCount:10,//一共有多少条数据
		indexNo:0,  //需要传过去的参数

		dialogFormVisible:false,

		message:{},  //审批数据
		
		moneysList:[],//电话核查模板信息
		legalPerson:'', //放款卡表管理信息 所需参数 法人编号
		cardTableList:[],//放款卡表管理信息
		levelType:[], //渠道类型
		proWorkflowList:[],//工作流配置信息
		componentRows:[],//组件信息
		// caseLevelList:[],//话术模板字典
		isShowfixPrice:false, //是否显示组件信息
		isShowlimitControl:false, //是否显示组件信息
		isShowrepaymentWay:false, //是否显示组件信息
		isShowuseRange:false, //是否显示组件信息
		fixPrice:{}, //定价组件 form
		overdueModeList:[],//逾期利率方式
		priceModelTypeList:[],//定价规则模型
		cUserList:[],//定价组件 table
		bUserList:[],//还款组件 table
		repaymentWayList:[], //规则基准还款方式类型
		repayModeSortList:[], //还款方式分类类型
		singleWithdrawalLimit:[],//限额组件 table


		productTypeArr:[],//业务分类
		pubChannelNoArr:[],//发布渠道
		statuslist:[],//产品状态

		agreeForm:{
			approvalOpinion:'', //审批意见
		},
		
		priceData:[], //产品组件信息 定价信息
		refundData:[], //产品组件信息 还款方式信息


    }
  },
  created(){
	this.initSlectOption(); //初始化下拉框内容
  },
  mounted(){
	this.initLoanProductPdList();  //初始化消费贷产品管理录入列表
  },
  methods:{
	//初始化消费贷产品管理复核列表
    initLoanProductPdList(){
		 if (this.queryFunName != undefined && this.queryFunName != ""||this.queryNum !=undefined &&this.queryNum !=""|| this.queryStatus != undefined && this.queryStatus != "") {
			var ProductListMsgData2 = {
				"channelNo": "1",
				"transCode": "SETLOANPRO303",
				"productName": this.queryFunName,
				"productNum" :this.queryNum,
				"status": this.queryStatus,
				"indexNo": this.indexNo,
				"pageSize": this.pageSize,
				"applStat":"VERIFY",
			};
			this.$post(this.$api,ProductListMsgData2).then(res=>{
				if(res.returnMsg=="OK"){
					
					for(var i=0;i<res.rows.length;i++){
						var obj = res.rows[i];
						obj.statusVal = this.getEnumValue(this.funs1,obj.status);
						obj.productTypee = this.getEnumValue(this.funs2,obj.productType);
						obj.apprStatusVal= this.getEnumValue(this.funs3,obj.apprstatus);
					};
					this.loanProductPdList = res.rows;
					this.totalCount = res.totalCount;
					this.contractList =  res.contractTempleteList;
				}else{
					this.loanProductPdList = res.rows;
				}
			})
		}else{
			var ProductListMsgData2 = {
				"channelNo": "1",
				"transCode": "SETLOANPRO303",
				"indexNo": this.indexNo,
				"pageSize": this.pageSize,
				"applStat":"VERIFY",
			};
			this.$post(this.$api,ProductListMsgData2).then(res=>{
				if(res.returnMsg=="OK"){
					for(var i=0;i<res.rows.length;i++){
						var obj = res.rows[i];
						obj.statusVal = this.getEnumValue(this.funs1,obj.status);
						obj.productTypee = this.getEnumValue(this.funs2,obj.productType);
						obj.apprStatusVal= this.getEnumValue(this.funs3,obj.apprstatus);
					};
					this.loanProductPdList = res.rows;
					this.totalCount = res.totalCount;
				}else{
					this.$message({
						message:res.returnMsg,
						type: 'warning' 
					})
				}
			})

		}
	},
	//初始化下拉框内容
	initSlectOption(){
		//规则基准还款方式类型
		var GroupListRepaymentWay1 = {
	 		"channelNo":"1",
	 		"transCode":"SETPARARGS301",
	 		"bizTypeCode":"LN_RepaymentWay"
		};
		this.$post(this.$api, GroupListRepaymentWay1).then(res=>{
			this.repaymentWayList = res.rows;
		});
		//还款方式分类类型
		var GroupListRepaymentWay = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LN_RepayModeSort"
		};
		this.$post(this.$api, GroupListRepaymentWay).then(res=>{
			this.repayModeSortList = res.rows;
		});
		//工作流信息渠道类型转码
		//渠道类型
		var FunMsgData11 = {
			"channelNo": "1",
			"transCode": "SETPARARGS301",
			"bizTypeCode": "APPI_SEND_FLAG"
		};
		this.$post(this.$api, FunMsgData11).then(res=>{
			this.levelType = res.rows;
		});
		//产品状态
		var funMsgDataSelpro = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LN_ProdStatus"
		}
		this.$post(this.$api,funMsgDataSelpro).then(res=>{
			this.funs1 = res.rows;
		});

		//产品分类
		var funMsgDataSelproa = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LN_BussType"
		}
		this.$post(this.$api,funMsgDataSelproa).then( res=>{
			this.funs2 = res.rows;
		});

		//审批状态
		var funMsgDataSelpro = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LN_ProStatus"
		}
		this.$post(this.$api,funMsgDataSelpro).then( res=>{
			this.funs3 = res.rows;
		});
		//业务分类
		var funMsgDataSelproa = {
				"channelNo":"1",
		 		"transCode":"SETPARARGS301",
		 		"bizTypeCode":"LN_BussType"
		}
		this.$post(this.$api,funMsgDataSelproa).then( res=>{
			this.productTypeArr = res.rows;
   	 	});
		//发布渠道
		var funMsgDataSelprobp = {
				"channelNo":"1",
		 		"transCode":"SETPARARGS301",
		 		"bizTypeCode":"LN_ChannelNo"
		}
		this.$post(this.$api,funMsgDataSelprobp).then( res=> {
			this.pubChannelNoArr = res.rows;
		});
		//产品状态
		var funMsgDataSelproa = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LOAN_RELE_STATUS"
		}
		this.$post(this.$api,funMsgDataSelproa).then( res=> {
			this.statuslist = res.rows;
		});
		//话术模板字典
 		var formworkTypeData = {
            "channelNo": "1",
            "transCode": "SETPARARGS301",
            "bizTypeCode": "APPI_FORMWORK_TYPE"
        };
        this.$post(this.$api, formworkTypeData).then( res=>{
            this.caseLevelList = res.rows;
        }); 

		//逾期利率方式
		var GroupListRepaymentWay = {
				"channelNo":"1",
				"transCode":"SETPARARGS301",
				"bizTypeCode":"LN_OverdueMode"
		};
		this.$post(this.$api,GroupListRepaymentWay).then( res=> {
			this.overdueModeList = res.rows;
		});
		//定价规则模型
		var GroupListRepaymentWay = {
				"channelNo":"1",
				"legalNum":"00001",
		 		"transCode":"SETLOANRULEPRIC300",
		 		"indexNo":"0",
		 		"pageSize":"100000"
		}
		this.$post(this.$api,GroupListRepaymentWay).then( res=> {
			this.priceModelTypeList = res.rows;
		});

	},
	//审批
	approvalItem(row){ 
		this.dialogFormVisible = true;
		
		var productforViewData={
			"channelNo":"1",
			"transCode":"SETLOANPRO401",
			"productId":row.id,
		}
		this.$post(this.$api,productforViewData).then(res=>{
			if(res.returnMsg=="OK"){
				res.flag="loanproductManagePd";
				this.message = res;
				this.legalPersonNum = res.legalPersonNum
				this.proWorkflowList = res.productWorkflowList; //工作流配置信息
				this.componentRows = res.rows; //组件信息
				for (var i = 0; i < this.proWorkflowList.length; i++) {
					var obj = this.proWorkflowList[i];
					obj.appiChannelVal = this.getEnumValue(this.levelType,obj.appiChannel);
				}
				this.isShowComponentsCon();
			}else{
				this.$message({
					message:res.returnMsg,
					type: 'warning' 
				})
			}
		});
		

		//话术模板信息，查询pd表
		var sign
 		if(row.apprstatus != null || row.apprstatus != undefined){
 			sign = row.apprstatus;
 		}
 		var ProductListMsgData1 = {
            "channelNo": "1",
            "transCode": "SETLOANFWLIST",
            "queryFlag": "1",
            "productLoanId": row.id,//产品ID
            "querySign":sign,//查询标识
		};
        this.$post(this.$api, ProductListMsgData1).then(res=> {
			 this.moneysList = res.formworkList;
            // if (res.formworkList.length > 0) {
                // this.ismoneys = false;
            // }
            // else {
                // this.ismoneys = true;
                // this.moneysList = 0;
            // }
		});
		// 放款卡表管理信息
   	    var cardTableManagementData = {
			"channelNo": "1",
			"transCode": "SETPRODUCTCARDTABLE300",
			"legalPersonNum": this.legalPerson,
			"enabledState": "1",
			"productNum":row.productNum
		};     
		this.$post(this.$api, cardTableManagementData).then(res=> {
   	    	 this.cardTableList = res.rows;
   	    	//  if (this.cardTableList.length > 0) {
   	    	// 	 this.showNoData = false;
   	    	//  } else {
   	    	// 	this.showNoData = true;
   	    	//  }
   	     });
		
	},
	//组件信息 FixPrice
	isShowComponentsCon(){
		if(this.componentRows.length>0){
			var _this = this;
 			$.each(this.componentRows,function(i,result){
				if(result.componentType=="LimitControl"){//限额控件
					_this.isShowlimitControl = true;
	    			_this.quaryLimitControl(result);
				}else if(result.componentType=="FixPrice"){//定价控件
					_this.isShowfixPrice = true;
	    			_this.quaryFixPrice(result)
	    		}else if(result.componentType=="RepaymentWay"){//还款方式控件
	    			_this.isShowrepaymentWay = true;
	    			_this.quaryRepaymentWay(result);
	    		}else if(result.componentType=="UseRange"){//适用范围控件
	    			_this.isShowuseRange = true;
	    			_this.quaryUseRange(result);
	    		}
			});
 		}
	},
	//定价控件明细查询
	quaryFixPrice(result){
		var feeData = {
			"channelNo":"1",
			"transCode":"SETLOANCOMLIB301",
			"legalNum":"00001",
			"componentId":result.componentId,
			"productTermRate":""
		};
		this.$post(this.$api, feeData).then(res=> {
			var html ="{"+res.html+"}";
			var htm = html.replace(/\=/g, ":");
			this.fixPrice = JSON.parse(htm);
		
			this.cUserList = res.productTermRate
		
		});

	},
	//还款方式明细查询
	quaryRepaymentWay(result){
		var feeData = {
			"channelNo":"1",
			"transCode":"SETLOANCOMLIB301",
			"componentId":result.componentId,
		};
		this.$post(this.$api, feeData).then(res=> {
			this.componentTypeMethodNew = "RepaymentWay";
			this.componentsName = res.componentName;
			for(var i=0;i<res.productRepayway.length;i++){
				var obj = res.productRepayway[i];
				obj.baseRepayModeVal = this.getEnumValue(this.repaymentWayList,obj.baseRepayMode);
				obj.repayModeSortVal = this.getEnumValue(this.repayModeSortList,obj.repayModeSort);
			};
			this.bUserList = res.productRepayway;
		});
	},
	//限额组件明细查询
	quaryLimitControl(result){
		var feeData = {
				"channelNo":"1",
				"transCode":"SETLOANCOMLIB301",
				"componentId":result.componentId,
		};
		this.$post(this.$api, feeData).then(res=> {
			var html ="{"+res.html+"}";
			var htm = html.replace(/\=/g, ":");
			this.fixPrice = JSON.parse(htm);
			this.singleWithdrawalLimit = res.singleWithdrawalLimit
		});
	},
	//同意 
	addedGroup(){

	},
	//不同意 
	Disagree(){
		if(this.agreeForm.approvalOpinion == ""|| this.agreeForm.approvalOpinion == null){
			this.$message({
				message:'请填写审批意见',
				type: 'warning' 
			})
			return;
		}
		//获取组件ID
		var row = this.message.rows;
		var componentsId =[];
		for(var i=0;i<row.length;i++){
			componentsId.push(row[i].componentId);
		}
		var FunMsgData6 = {
			"channelNo": "1",
			"legalNum":  "00001",
			"transCode": "SETLOANPRO501" ,
			"id" : this.message.id,
			"productName":this.message.queryFunName,//产品名称
			"productType":this.message.productType,//业务分类
			"pubChannelNo":this.message.pubChannelNo,//发布渠道
			"busQuotaId":this.message.busQuotaId,//额度类型
			"sortName":this.message.sortName,//额度类型名称
			"effectiveDate":this.message.addTime,//生效日期
			"expirationDate":this.message.endTime,//到期日期
			"accountProductNum":this.message.accountProductNum,//核算产品编号
			"remark":this.message.remark,//产品说明
			"apprStatus":'0',//当前审批状态
			"legalPersonNum":this.message.legalPersonNum,
			"sysTime":this.message.sysTime,//操作时间
			"productNum":this.message.productNum,//产品编号
			"operator":this.message.operator,//操作人
			"createDate":this.message.createDate,//创建日
			"approvalDate":this.message.approvalDate,//审批日
			"componentIds":componentsId,//产品组件中间表
			"contentResful":this.agreeForm.approvalOpinion,//审批意见
			"contentType":"2",//审批结果1:同意,2:不同意
			"productWorkflowList":this.message.productWorkflowList,//工作流信息
			"contractNum":this.message.contractTempleteList[0].contractNum,//合同编号
			"pcId":this.message.contractTempleteList[0].pcId//合同主键
		};
		this.$post(this.$api, FunMsgData6).then(res=> {
			if(res.returnMsg=="OK"){
				this.$message({
					message:'审核成功',
					type: 'success' 
				})
				this.dialogFormVisible = false;
			}else{
				this.$message({
					message:res.returnMsg,
					type: 'warning' 
				})
				this.dialogFormVisible = false;
			}
		});
	},

	//取消弹框重置数据
	cancel(){
		this.dialogFormVisible = false;
		// this.resetForm('addForm');
		// this.groupList = [];

		// this.addForm.cardId='';
		// this.addForm.proMaxLimit='';
		// this.addForm.subCardLimitRatio='';
		// this.addForm.cashAmountLimit='';
	
		// this.addForm.flag=false;
		// this.addForm.edit=false;
	},


	//监听搜索框为空的时候展示全部数据
    onChangequery(){
        this.initLoanProductPdList();
    },
	// 字典信息匹配
    getEnumValue(enumData, value){
      if( enumData != null ){
        var i = 0, len = enumData.length;
        for(; i < len; i++) {
          if(enumData[i].bizTypePropCode == value) {
            return enumData[i].bizTypePropName;
          }
        }
      }
      return value;
    },
    //改变每页显示多少条
    handleSizeChange(val) {
	  this.pageSize =  val;
	  this.indexNo = 0
      this.initLoanProductPdList();
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.indexNo = (val-1)*this.pageSize ;
      this.initLoanProductPdList(); 
    },

  }
}
</script>
<style  lang='scss'>
#fh_content{
	.el-dialog {
		width:95%!important;
		margin-top: 5vh!important;
	}
	.el-dialog__body {
		padding: 1px 40px;
	}
}
</style>
<style scoped lang='scss'>
.section{
	background: #ffffff;
	@include radius(5px);
	padding: 15px;
	h3{
		font-size: 18px;
		line-height: 20px;
		font-weight: normal;
		padding: 6px 0 15px 15px;
		position: relative;
		&:before{
			position: absolute;
			content: "";
			width: 3px;
			height: 20px;
			background: #5BC0DE;
			left: 0;
			top: 6px;
		}
	}
	h4{
		background-color: #eef9fc;
		text-align: center;
		line-height: 45px;
		color: #333;
		font-size: 16px;
	}
}
.red{
	color:#f60;
}
.table_height td {
   padding: 0; 
}

</style>

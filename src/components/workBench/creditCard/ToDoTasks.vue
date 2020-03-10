<template>
	<div class="home" id="toDoTask">
		<div class="home_main">
			<!--<div class="todoTasks_box">-->
			<div class="home_con">
				<h4 class="loan_title">{{$t('toDoTasks.rgspg')}}</h4><!-- 人工审批岗 -->
				<!--人工审批岗begin-->
				<el-form  :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="applyInfo" id="applyInfo" size="small" label-width="130px" class="formBox">
					<el-row>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.applyId')" prop="applyId"><!-- 申请件编号 -->
								<el-input v-model="applyInfo.applyId" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.bussinessName')" prop="applicationType"><!-- 申请类型 -->
								<!--<el-input v-model="applyInfo.applicationType" disabled></el-input>-->
								<el-input v-model="applyInfo.bussinessName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.productName')" prop="cProductName"><!-- 产品名称 -->
								<el-input v-model="applyInfo.cProductName" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.creditlimit')" prop="creditlimit"><!-- 授信额度 -->
								<el-input v-model="applyInfo.creditlimit" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.customerName')" prop="cCustomerName"><!-- 申请人姓名 -->
								<el-input v-model="applyInfo.cCustomerName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.phoneNumber')" prop="cPhoneNumber"><!-- 手机号 -->
								<el-input v-model="applyInfo.cPhoneNumber" disabled></el-input>
							</el-form-item>
						</el-col>	
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.certificatesType')" prop="cCertificatesType"><!-- 证件类型 -->
								<el-select v-model="applyInfo.cCertificatesType" disabled placeholder=""><!-- 请选择 -->
								    <el-option
								      v-for="item in cardState"
								      :key="item.paramValue"
								      :label="item.paramSname"
								      :value="item.paramValue">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('toDoTasks.certificatesNumber')" prop="cCertificatesNumber"><!-- 证件号码 -->
								<el-input v-model="applyInfo.cCertificatesNumber" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<!--五个按钮begin-->
					<el-row>
						<el-form-item>
							<ul class="loanStep clearfix">
								<li @click="seeApplication()">
									{{$t('toDoTasks.applySee')}}<!-- 申请件查看 -->
									<!--<el-button type="text" ></el-button>-->
								</li>
								<li  @click="seeImageAccess()">
									{{$t('toDoTasks.imageAccess')}}<!-- 影像调阅 -->
									<!--<el-button type="text"></el-button>-->
								</li>
								<li @click="seeCreditReporting()">
									{{$t('toDoTasks.creditInvestigation')}}<!-- 征信调阅 -->
									<!--<el-button type="text" ></el-button>-->
								</li>
								<li @click="seeTel">
									{{$t('toDoTasks.phoneCheckInformation')}}<!-- 电话核查信息 -->
									<!--<el-button type="text" @click="seeTel"></el-button>-->
								</li>
								<li @click="seeApprovalInformation">
									{{$t('toDoTasks.approvalInformation')}}<!-- 审批信息 -->
									<!--<el-button type="text" @click="seeApprovalInformation"></el-button>-->
								</li>
								<li  @click="historyed">
									{{$t('toDoTasks.approvalHistory')}}<!-- 历史审批记录 -->
									<!--<el-button type="text"></el-button>-->
								</li>
							</ul>
						</el-form-item>
						<!--<el-col :span="5">
							<el-button type="text" @click="seeApplication()">申请件查看</el-button>
						</el-col>
						<el-col :span="5">
							<el-button type="text"  @click="seeCreditReporting()">征信调阅</el-button>
						</el-col>
						<el-col :span="4">
							<el-button type="text" @click="seeTel">电话核查信息</el-button>
						</el-col>
						<el-col :span="5">
							<el-button type="text" @click="seeApprovalInformation">审批信息</el-button>
						</el-col>
						<el-col :span="5">
							<el-button type="text" @click="historyed">审批历史</el-button>
						</el-col>-->
					</el-row>
					<!--五个按钮end-->
					<el-row>
						<!--转人工原因begin-->
						<!--<h4 class="loan_title">转人工原因</h4>-->
						<el-form-item  :label="$t('toDoTasks.handleDesc')" prop="handleDesc"><!-- 转人工原因 -->
							<el-input
								type="textarea"
								v-model="aftificialInfo.handleDesc"
								maxlength="100"
  								show-word-limit
								disabled
								><!-- 请输入内容 -->
							</el-input>
						</el-form-item>
						<!--转人工原因end-->
					</el-row>
					<el-row>
						<!--退回原因begin-->
						<el-form-item  :label="$t('toDoTasks.blackInfo')" prop="blackInfo" v-if="blackInfo.handleDesc"><!-- 退回原因 -->
							<el-input
								type="textarea"
								v-model="blackInfo.handleDesc"
								maxlength="100"
  								show-word-limit
								disabled
								>
							</el-input><!-- 请输入内容 -->
						</el-form-item>
						<!--退回原因end-->
					</el-row>
				</el-form>
				<!--人工审批岗end-->
				
				
				<!--电话核查begin-->
				<h4 class="loan_title">{{$t('toDoTasks.phoneCheck')}}</h4><!-- 电话核查 -->
				<el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="phoneInfo" :rules="rules" ref="phoneInfo" size="small" label-width="130px" class="formBox">
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.checkLiaisonPhone')" prop="checkLiaisonPhone"><!-- 联系人电话核查 -->
							<el-select v-model="phoneInfo.checkLiaisonPhone"  @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in tels"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.checkLiaison')" prop="checkLiaison"><!-- 联系人核查 -->
							<el-select v-model="phoneInfo.checkLiaison"  @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in linkCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.checkUnit')" prop="checkUnit"><!-- 公司电话核查 -->
							<el-select v-model="phoneInfo.checkUnit" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in companyTelCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.checkUnitPhone')" prop="checkUnitPhone"><!-- 公司电话核查结果 -->
							<el-select v-model="phoneInfo.checkUnitPhone" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in companyCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.checkHomePhone')" prop="checkHomePhone"><!-- 家庭电话核查 -->
							<el-select v-model="phoneInfo.checkHomePhone" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in homeTelCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.checkPhoneNum')" prop="checkPhoneNum"><!-- 申请人手机号核查 -->
							<el-select v-model="phoneInfo.checkPhoneNum" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in applicantTelCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.verifiResults')" prop="verifiResults"><!-- 资信核查结果 -->
							<el-select v-model="phoneInfo.verifiResults" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in adoptCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.applyPeopleCheck')" prop="applyPeopleCheck"><!-- 申请人签字确认 -->
							<el-select v-model="phoneInfo.applyPeopleCheck" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in signCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.applyEnclosureCheck')" prop="applyEnclosureCheck"><!-- 申请附件核查 -->
							<el-select v-model="phoneInfo.applyEnclosureCheck" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in signCheck1"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item :label="$t('toDoTasks.cardConfirmation')" prop="cardConfirmation"><!--附属卡确认  -->
							<el-select v-model="phoneInfo.cardConfirmation" @change="changeVal()" placeholder=""><!-- 请选择 -->
								<el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
							    <el-option
							      v-for="item in cardCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item  :label="$t('toDoTasks.checkExplain')" prop="checkExplain" :rules="checkPhone ? rules.checkExplain:[{ required:false,message:$t('toDoTasks.NotEmptyCheckPhone'),trigger:'blur'}]"><!-- 电话核查说明   电话核查说明不能为空  -->
							<el-input
								type="textarea"
								v-model="phoneInfo.checkExplain"
								maxlength="100"
  								show-word-limit
								><!-- 请输入内容 -->
							</el-input>
						</el-form-item>
					</el-col>
					<!--<el-col :span="24" v-if="phoneInfo.checkLiaisonPhone!=''||phoneInfo.checkLiaison!=''||phoneInfo.checkUnit!=''||phoneInfo.checkUnitPhone!=''||phoneInfo.checkLiaisonPhone!=''||phoneInfo.checkPhoneNum!=''||phoneInfo.verifiResults!=''||phoneInfo.applyPeopleCheck!=''||phoneInfo.applyEnclosureCheck!=''||phoneInfo.cardConfirmation!=''">
						<el-form-item label="电话核查说明" prop="checkExplain" >
							<el-input
								type="textarea"
								placeholder="请输入内容"
								v-model="phoneInfo.checkExplain"
								>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" v-else>
						<el-form-item  label="电话核查说明" prop="checkExplain" >
							<el-input
								type="textarea"
								placeholder="请输入内容"
								v-model="phoneInfo.checkExplain"
								>
							</el-input>
						</el-form-item>
					</el-col>-->
				</el-form>
				<!--电话核查end-->
				<!--审批意见begin-->
				<h4 class="loan_title">{{$t('toDoTasks.approvalOpinions')}}</h4><!-- 审批意见 -->
				<el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="opinion" :rules="rules" ref="opinion" size="small" label-width="130px" class="formBox">
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.handleResult')" prop="handleResult" ><!-- 审批结果 -->
		  					<el-radio-group v-model="opinion.handleResult" @change="changeRadio()">
		                        <el-radio  label="1">{{$t('toDoTasks.adopt')}}</el-radio><!-- 通过 -->
		                        <el-radio  label="0">{{$t('toDoTasks.refuse')}}</el-radio><!-- 拒绝 -->
		                      </el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="radioShow">
						<el-form-item :label="$t('toDoTasks.handleResultState')" prop="handleResultState"><!-- 拒绝码 -->
							<el-select v-model="opinion.handleResultState" placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in noCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item :label="$t('toDoTasks.approvalNote')" prop="handleDesc"><!-- 审批说明 -->
							<el-input
								type="textarea"
								v-model="opinion.handleDesc"
								maxlength="100"
  								show-word-limit
								><!-- 请输入内容 -->
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" style="text-align:right" class="mt20">
						<el-button @click="resetForm()">{{$t('Reset')}}</el-button><!-- 重置 -->
						<el-button type="primary" @click="save()" :disabled="flg">{{$t('toDoTasks.Submission')}}</el-button><!-- 提交 -->
						
					</el-col>
				</el-form>
				<!--审批意见end-->
			</div>
			<!--申请件查看begin-->
			<el-dialog :title="title1" :visible.sync="dialogFormVisible1" :before-close="cancel1" :close-on-click-modal="false" width="80%">
				<el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="application" :rules="rules" ref="addForm"  size="small"  label-width="120px" >
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.applyId')" prop="legalPersonNum"><!-- 申请件编号 -->
								<el-input v-model="application.applyId" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<!--<h4 class="title">申请件信息</h4>-->
					<hr />
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.cCustomerName')" prop="cCustomerName"><!-- 客户姓名 -->
								<el-input v-model="application.cCustomerName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.birthday')" prop="" class="formatBirthday" ><!-- 出生日期 -->
								<el-input type="data" v-model="application.formatBirthday" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.certificatesType')" prop="cCertificatesType"><!-- 证件类型 -->
								<el-select v-model="applyInfo.cCertificatesType" disabled placeholder=""><!-- 请选择 -->
								    <el-option
								      v-for="item in cardState"
								      :key="item.paramValue"
								      :label="item.paramSname"
								      :value="item.paramValue">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.certificatesNumber')" prop="" class="cCertificatesNumber" ><!-- 证件号 -->
								<el-input type="data" v-model="application.cCertificatesNumber" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.education')" prop="" class="cEducation" ><!-- 学历 -->
								<!--<el-input type="data" v-model="application.cEducation" disabled></el-input>-->
								<el-select v-model="application.cEducation" placeholder="" disabled><!-- 请选择 -->
								    <el-option
								      v-for="item in xueli"
								      :key="item.paramValue"
								      :label="item.paramSname"
								      :value="item.paramValue">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.phoneNumber')" prop="cPhoneNumber"><!-- 手机号码 -->
								<el-input v-model="application.cPhoneNumber" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.familyAddress')" prop="" class="cFamilyAddress" ><!-- 家庭地址 -->
								<el-input type="data" v-model="application.cFamilyAddress" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.familyZipCode')" prop="cFamilyZipCode"><!-- 邮编 -->
								<el-input v-model="application.cFamilyZipCode" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.companyName')" prop="" class="cCompanyName" ><!-- 公司名称 -->
								<el-input type="data" v-model="application.cCompanyName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.position')" prop="cPosition"><!-- 职位 -->
								<el-input v-model="application.cPosition" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.companyAddress')" prop="" class="cCompanyAddress" ><!-- 公司地址 -->
								<el-input type="data" v-model="application.cCompanyAddress" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.familyZipCode')" prop="cCompanyZipCode"><!-- 邮编 -->
								<el-input v-model="application.cCompanyZipCode" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.linkmanname')" prop="" class="cLinkmanname" ><!-- 联系人姓名 -->
								<el-input type="data" v-model="application.cLinkmanname" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.linkmanrelationship')" prop="cLinkmanrelationship"><!-- 与联系人关系 -->
								<el-input v-model="application.cLinkmanrelationship" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.linkmanphone')" prop="" class="cLinkmanphone" ><!-- 联系人电话 -->
								<el-input type="data" v-model="application.cLinkmanphone" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
				</div>
			</el-dialog>
			<!--申请件查看 end-->
			
			<!--影像调阅begin-->
			<el-dialog :title="title6" :visible.sync="dialogFormVisible6" :before-close="cancel6" :close-on-click-modal="false" height="414"  width="80%">
				<el-tabs v-model="activeName" >
	              	<el-tab-pane :label="$t('toDoTasks.apply')" name="first">{{$t('toDoTasks.apply')}}</el-tab-pane><!-- 申请件 -->
	              	<el-tab-pane :label="$t('toDoTasks.identityCertificate')" name="second">{{$t('toDoTasks.identityCertificate')}}</el-tab-pane><!-- 身份证明 -->
	              	<el-tab-pane :label="$t('toDoTasks.workCertificate')" name="third">{{$t('toDoTasks.workCertificate')}}</el-tab-pane><!-- 工作证明 -->
	              	<el-tab-pane :label="$t('toDoTasks.incomeCertificate')" name="fourth">{{$t('toDoTasks.incomeCertificate')}}</el-tab-pane><!-- 收入证明 -->
	              	<el-tab-pane :label="$t('toDoTasks.creditCertificate')" name="five">{{$t('toDoTasks.creditCertificate')}}</el-tab-pane><!-- 资信证明 -->
	            </el-tabs>
            </el-dialog>
			<!--影像调阅end-->
			
			<!--征信调阅 begin-->
			<el-dialog :title="title2" :visible.sync="dialogFormVisible2" :before-close="cancel2" :close-on-click-modal="false"  width="80%">
				<!--<el-row class="btn btn-bg">
					<el-col :span="5" @click="tab('1')">申请件</el-col>
					<el-col :span="5" @click="tab('2')">身份证明</el-col>
					<el-col :span="4" @click="tab('3')">工作证明</el-col>
					<el-col :span="5" @click="tab('4')">收入证明</el-col>
					<el-col :span="5" @click="tab('5')">资信证明</el-col>
				</el-row>
				<div class="yingBox">
					
				</div>-->
				<iframe :src="srcc"  style="width: 100%; min-height: 300px; border: none; overflow-y: auto;"></iframe>
			</el-dialog>
			<!--征信调阅 end-->
			<!--电话查看begin-->
			<el-dialog :title="title3" :visible.sync="dialogFormVisible3" :before-close="cancel3" :close-on-click-modal="false"  width="80%">
				<el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="phoneInfo" size="small"  label-width="180px" class="formBox">
					<el-row>
						<el-col :span="12">
							<el-form-item :label="$t('toDoTasks.updateUser')" prop="updateUser"><!-- 电话核查人员 -->
								<el-input v-model="phoneInfo.updateUser" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<hr>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.checkLiaisonPhone')" prop="checkLiaisonPhone"><!-- 联系人电话核查 -->
							<el-select v-model="phoneInfo.checkLiaisonPhone" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in tels"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue" >
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.checkLiaison')" prop="checkLiaison"><!-- 联系人核查 -->
							<el-select v-model="phoneInfo.checkLiaison" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in linkCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.checkUnit')" prop="checkUnit"><!-- 公司电话核查 -->
							<el-select v-model="phoneInfo.checkUnit" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in companyTelCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.checkUnitPhone')" prop="checkUnitPhone"><!-- 公司电话核查结果 -->
							<el-select v-model="phoneInfo.checkUnitPhone" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in companyCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.checkHomePhone')" prop="checkHomePhone"><!-- 家庭电话核查 -->
							<el-select v-model="phoneInfo.checkHomePhone" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in homeTelCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.checkPhoneNum')" prop="checkPhoneNum"><!-- 申请人手机号核查 -->
							<el-select v-model="phoneInfo.checkPhoneNum" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in applicantTelCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.verifiResults')" prop="verifiResults"><!-- 资信核查结果 -->
							<el-select v-model="phoneInfo.verifiResults" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in adoptCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.applyPeopleCheck')" prop="applyPeopleCheck"><!-- 申请人签字确认 -->
							<el-select v-model="phoneInfo.applyPeopleCheck" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in signCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.applyEnclosureCheck')" prop="applyEnclosureCheck"><!-- 申请附件核查 -->
							<el-select v-model="phoneInfo.applyEnclosureCheck" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in signCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('toDoTasks.cardConfirmation')" prop="cardConfirmation"><!-- 附属卡确认 -->
							<el-select v-model="phoneInfo.cardConfirmation" disabled placeholder=""><!-- 请选择 -->
							    <el-option
							      v-for="item in cardCheck"
							      :key="item.paramValue"
							      :label="item.paramSname"
							      :value="item.paramValue">
							    </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item :label="$t('toDoTasks.checkExplain')" prop="checkExplain"><!-- 电话核查说明 -->
							<el-input
								type="textarea"
								:autosize="{ minRows: 4, maxRows: 8}"
								v-model="phoneInfo.checkExplain"
								maxlength="100"
  								show-word-limit
								disabled>
							</el-input><!-- 请输入内容 -->
						</el-form-item>
					</el-col>
				</el-form>
				<div slot="footer" class="dialog-footer">
				</div>
			</el-dialog>
			<!--电话查看 end-->
			
			<!--审批信息 begin-->
			<el-dialog :title="title4" :visible.sync="dialogFormVisible4" :before-close="cancel4" :close-on-click-modal="false"  width="80%">
				<el-table :data="gridData" border style="width: 100%"   size='small'  align="center" :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!-- 序号 -->
							<el-table-column property="activityName" :label="$t('toDoTasks.activityName')"  align="center" min-width="215px"></el-table-column><!-- 审批岗位 -->
						    <el-table-column property="userName" :label="$t('toDoTasks.userName')"  align="center" min-width="185px"></el-table-column><!-- 审批人员 -->
						    <el-table-column property="doneDate" :label="$t('doDate')"  align="center" min-width="120px"><!-- 处理日期 -->
						    	<template slot-scope="scope">
						    		<!--{{scope.row.updateTime.slice(0,10)}}-->
						    		{{scope.row.doneDate}}
						    	</template>
						    </el-table-column>
						    <el-table-column property="doneTime" :label="$t('doTime')"  align="center" min-width="130px"><!-- 处理时间 -->
						    	<template slot-scope="scope">
						    		<!--{{scope.row.updateTime.slice(10,)}}-->
						    		{{scope.row.doneTime}}
						    	</template>
						    </el-table-column>
						    <el-table-column property="handleResult" :label="$t('toDoTasks.handleResult')"  align="center" min-width="240px"><!-- 审批结果 -->
						    	<template slot-scope="scope">
						    		<span v-if="scope.row.handleResult==1">{{$t('toDoTasks.adopt')}}</span><!-- 通过 -->
						    		<span v-if="scope.row.handleResult==0">{{$t('toDoTasks.refuse')}}</span><!-- 拒绝 -->
						    		<span v-if="scope.row.handleResult==2">{{$t('toDoTasks.return')}}</span><!-- 退回 -->
						    		<span v-if="scope.row.handleResult==3">{{$t('toDoTasks.bohui')}}</span><!-- 驳回 -->
						    		<span v-if="scope.row.handleResult==4">{{$t('toDoTasks.zhuanrengong')}}</span><!-- 转人工 -->
						    	</template>
						    </el-table-column>
						    <el-table-column property="handleDesc" :label="$t('toDoTasks.approvalNote')"  align="center" min-width="140px"></el-table-column><!-- 审批说明 -->
						</el-table>
			</el-dialog>
			<!--审批信息end-->
			
			<!--审批历史 begin-->
			<el-dialog :title="title5" :visible.sync="dialogFormVisible5" :before-close="cancel5" :close-on-click-modal="false"  width="80%">
				<el-table :data="gridData" border style="width: 100%"   size='small' align="center" :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!-- 序号 -->
							<el-table-column prop="applyId" :label="$t('toDoTasks.applyId')" align="center"  min-width="150px"></el-table-column><!-- 申请件编号 -->
							<el-table-column property="activityName" :label="$t('toDoTasks.activityName')"   min-width="215px" align="center"></el-table-column><!-- 审批岗位 -->
						    <el-table-column property="userName" :label="$t('toDoTasks.userName')"  align="center"  min-width="180px"></el-table-column><!-- 审批人员 -->
						    <el-table-column property="doneDate" :label="$t('doDate')" align="center" min-width="140px"><!-- 处理日期 -->
						    	<template slot-scope="scope">
						    		<!--{{scope.row.updateTime.slice(0,10)}}-->
						    		{{scope.row.doneDate}}
						    	</template>
						    </el-table-column>
						    <el-table-column property="doneTime" :label="$t('doTime')" align="center" min-width="120px"><!-- 处理时间 -->
						    	<template slot-scope="scope">
						    		<!--{{scope.row.updateTime.slice(10,)}}-->
						    		{{scope.row.doneTime}}
						    	</template>
						    </el-table-column>
						    <el-table-column property="handleResult" :label="$t('toDoTasks.handleResult')" align="center" min-width="230px"><!-- 审批结果 -->
						    	<template slot-scope="scope">
							    	<span v-if="scope.row.handleResult==1">{{$t('toDoTasks.adopt')}}</span><!-- 通过 -->
						    		<span v-if="scope.row.handleResult==0">{{$t('toDoTasks.refuse')}}</span><!-- 拒绝 -->
						    		<span v-if="scope.row.handleResult==2">{{$t('toDoTasks.return')}}</span><!-- 退回 -->
						    		<span v-if="scope.row.handleResult==3">{{$t('toDoTasks.bohui')}}</span><!-- 驳回 -->
						    		<span v-if="scope.row.handleResult==4">{{$t('toDoTasks.zhuanrengong')}}</span><!-- 转人工 -->
					    		</template>
						    </el-table-column>
						    <el-table-column property="handleDesc" :label="$t('toDoTasks.approvalNote')" align="center" min-width="115px"></el-table-column><!-- 审批说明 -->
						</el-table>
			</el-dialog>
			<!--审批历史end-->
		</div>
	</div>
</template>

<script>
	export default{
		name: 'ToDoTasks',
		data(){
			return{
				dialogFormVisible1:false,//申请件信息是否显示
				dialogFormVisible2:false,//影像调阅是否显示
				dialogFormVisible3:false,//电话核查信息是否显示
				dialogFormVisible4:false,//申请件信息是否显示
				dialogFormVisible5:false,//审批历史是否显示
				dialogFormVisible6:false,//影像调阅是否显示
				title1:i18n.t('toDoTasks.applyDetails'),//申请件信息title  申请件详情
				title2:i18n.t('toDoTasks.creditReport'),//影像调阅title  征信报告
				title3:i18n.t('toDoTasks.phoneCheckInformation'),//电话核查信息title  电话核查信息
				title4:i18n.t('toDoTasks.approvalInformation'),//审批信息title  审批信息
				title5:i18n.t('toDoTasks.applyHistory'),//审批历史
				title6:i18n.t('toDoTasks.imageAccess'),//影像调阅
				activeName:'first',
				flg:false,//点击提交按钮不可重复点击
				checkPhone:false,
				applyInfo:{
					applyId:"",//申请件编号
					applicationType:"",//申请类型
					bussinessName:"",//申请类型
					cProductName:"",//产品名称
					creditlimit:"",//授信额度
					cCustomerName:"",//申请人姓名
					cPhoneNumber:"",//手机号
					cCertificatesType:"",//证件类型
					cCertificatesNumber:"",//证件号码
					backReason:"",//退回原因
					reasonName:"",//转人工原因
				},//人工审批岗
				aftificialInfo:{//转人工原因
					handleDesc:""
				},
//				upHit:{
//					blackInfo:""
//				},//退回原因
				blackInfo:{
					handleDesc:""
				},//退回原因
				phoneInfo:{
					updateUser:"",//
					checkLiaisonPhone:"",//联系人电话核查
					checkLiaison:"",//联系人核查
					checkUnit:"",//公司电话核查
					checkUnitPhone:"",//公司电话核查结果
					checkHomePhone:"",//家庭电话核查
					checkPhoneNum:"",//申请人手机号核查
					verifiResults:"",//资信核查结果
					applyPeopleCheck:"",//申请人签字确认
					applyEnclosureCheck:"",//申请附件核查
					cardConfirmation:"",//附属卡确认
					checkExplain:"",//电话核查说明
					id:""
				},//电话核查
				opinion:{
					handleResult:"",//审批结果
					handleResultState:"",//拒绝码
					handleDesc:"",//审批说明
				},//审批意见
				application:{//申请件详情
					applyId:"001",//申请件编号
					cCustomerName:"客户姓名",//客户姓名
					cBirthday:"",//出生日期
					formatBirthday:"",//出生日期
					cCertificatesType:"证件类型",//证件类型
					cCertificatesNumber:"证件号",//证件号
					cEducation:"学历",//学历
					cPhoneNumber:"手机号码",//手机号码
					cFamilyAddress:"家庭地址",//家庭地址
					cFamilyZipCode:"家庭邮编",//家庭邮编
					cCompanyName:"公司名称",//公司名称
					cPosition:"职位",//职位
					cCompanyAddress:"公司地址",//公司地址
					cCompanyZipCode:"公司邮编",//公司邮编
					cLinkmanname:"联系人姓名",//联系人姓名
					cLinkmanrelationship:"与联系人关系",//与联系人关系
					cLinkmanphone:"联系人电话",//联系人电话
				},
				telDetail:{//电话核查信息
					
				},
				gridData:[
//					{}
				],//审批信息
				err:false,
				rules:{
					checkExplain: [
						{ required: true, message: i18n.t('toDoTasks.NotEmptyCheckPhone')}//电话核查说明不能为空
					],
					handleResultState:[
						{ required: true, message: i18n.t('toDoTasks.NotEmptyCode') }//拒绝码不能为空
					],
					handleResult:[
						{ required: true, message: i18n.t('toDoTasks.NotEmptyResult') }//审批结果不能为空
					],
					handleDesc:[
						{ required: true, message: i18n.t('toDoTasks.NotEmptyExplain') }//审批说明不能为空
					]
				},
				srcc:"",
				radioShow:false,
				tels:[],//联系人电话核查
				linkCheck:[],//联系人核查
				companyTelCheck:[],//公司电话核查
				companyCheck:[],//公司电话核查结果
				homeTelCheck:[],//家庭电话核查
				applicantTelCheck:[],//申请人手机号核查
				signCheck:[],//申请人签字确认
				signCheck1:[],//申请附件核查
				adoptCheck:[],//资信核查结果
				cardCheck:[],//附属卡确认
				noCheck:[],//拒绝码
				cardState:[],//证件类型
				xueli:[]//学历
			}
		},
		mounted(){
			//申请件查看
			this.initData()
			this.getSelectData();
			
		},
		watch:{
			orr(){
				return this.err
			}
		},
		methods:{
			initData(){
//				this.aftificialInfo.reasonName=this.$route.query.peopleResource;
				var obj={
					"applyId":this.$route.query.applyId,
					"legalPersonNum":this.$route.query.legalPersonNum,
					"userid":this.$route.query.userId
				}
				this.$post(this.$approve+"/WFTask/handlerCardSelect",obj).then(res=>{
					if(res.code=="000000"){
						if(res.data.applyInfo!=null){
							this.applyInfo=res.data.applyInfo;
							this.applyInfo.bussinessName=this.$route.query.bussinessName
							this.application=res.data.applyInfo;
						}
						if(res.data.blackInfo!=null){
							this.blackInfo=res.data.blackInfo
						}
//						this.applyInfo=res.data.applyInfo;
//						this.applyInfo.bussinessName=this.$route.query.bussinessName
//						this.application=res.data.applyInfo;
//						this.application.cBirthday=res.data.applyInfo.cBirthday.slice(0,10)
//						if(this.application.cBirthday!=""||this.application.cBirthday!=null){
//							this.application.cBirthday=res.data.applyInfo.cBirthday.slice(0,10)
//						}
						if(res.data.aftificialInfo!=null){
							this.aftificialInfo=res.data.aftificialInfo;
						}
//						if(res.data.upHit!=null){
//							this.upHit=res.data.upHit;
//						}
						
						if(res.data.phoneInfo!=null){
							this.phoneInfo=res.data.phoneInfo
						}else{
//							this.phoneInfo=""
//							phoneInfo:{
//					checkLiaisonPhone:"",//联系人电话核查
//					checkLiaison:"",//联系人核查
//					checkUnit:"",//公司电话核查
//					checkUnitPhone:"",//公司电话核查结果
//					checkHomePhone:"",//家庭电话核查
//					checkPhoneNum:"",//申请人手机号核查
//					verifiResults:"",//资信核查结果
//					applyPeopleCheck:"",//申请人签字确认
//					applyEnclosureCheck:"",//申请附件核查
//					cardConfirmation:"",//附属卡确认
//					checkExplain:"",//电话核查说明
//					id:""
//				}
						}
					}
				})
			},
			changeVal(){
				if(this.phoneInfo.checkLiaisonPhone!=''||this.phoneInfo.checkLiaison!=''||this.phoneInfo.checkUnit!=''||this.phoneInfo.checkUnitPhone!=''||this.phoneInfo.checkLiaisonPhone!=''||this.phoneInfo.checkPhoneNum!=''||this.phoneInfo.verifiResults!=''||this.phoneInfo.applyPeopleCheck!=''||this.phoneInfo.applyEnclosureCheck!=''||this.phoneInfo.cardConfirmation!=''){
					this.checkPhone=true
				}else{
					this.checkPhone=false
				}
			},
			changeRadio(){
				if(this.opinion.handleResult!=1){
					this.radioShow=true;
				}else{
					this.radioShow=false;
				}
			},
//			historyed(){//审批历史
//				var obj={
//					cCertificatesNumber:this.addForm.cCertificatesNumber,
//					legalPersonNum:"001",
//					userId:"wfa003"
//				}
//				this.$post(this.$approve+"/cardworkbench/certApproval",obj).then(res=>{
//					if(res.code=="000000"){
//						
//					}
//				})
//			},
			// 监听标签变化
			watchTag(){
				const list = this.$store.state.tagList;
				const curItem = list.filter(item => {
					return item.path === this.$route.fullPath;
				})
				let index = list.indexOf(curItem)
				list.splice(index,1);
			},
			save(){
				var reasonName;
				this.noCheck.forEach(val=>{
					if(val.paramValue==this.opinion.handleResultState){
						reasonName=val.paramSname;
					}
				})
				if(!this.checkPhone){
					this.phoneInfo.updateUser=""
				}
				this.phoneInfo.applyId=this.applyInfo.applyId;
				this.phoneInfo.legalPersonNum=this.$route.query.legalPersonNum;
				if(this.radioShow){
					var obj={
						phoneCheck:this.phoneInfo,
						// cardwfHis:this.upHit,
						legalPersonNum:this.$route.query.legalPersonNum,
						userId:this.$route.query.userId,
						userName:this.$store.state.loginData.userLogin.userName,
						applyId:this.applyInfo.applyId,
						taskId:this.$route.query.taskId,
	//					processInstanceId:this.$route.query.processInstanceId
						handleResult:this.opinion.handleResult,
						"cardwfHis":{ 
							"legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
							"applyId":this.$route.query.applyId, //申请件编号
							"processInstanceId":this.$route.query.processInstanceId,  //流程实力ID
							"taskId":this.$route.query.taskId, //任务ID
							"activityId":this.$route.query.activityId, //当前节点ID
							"activityName":this.$route.query.activityName,//当前节点名称
							"userOrgNo":this.$store.state.loginData.userLogin.branchId, //登录人审批机构
							"userOrgName":this.$store.state.loginData.userLogin.branchName,//审批机构名称
							"userId":this.$store.state.loginData.userLogin.loginId,
							"userName":this.$store.state.loginData.userLogin.userName,
							"handleResult":this.opinion.handleResult,
							"handleDesc":this.opinion.handleDesc,
							"reasonId":this.opinion.handleResultState,
							"reasonName":reasonName,
							"backReason":this.$route.query.peopleResource
						}
					}
				}else{
					var obj={
						phoneCheck:this.phoneInfo,
						// cardwfHis:this.upHit,
						legalPersonNum:this.$route.query.legalPersonNum,
						userId:this.$route.query.userId,
						userName:this.$store.state.loginData.userLogin.userName,
						applyId:this.applyInfo.applyId,
						taskId:this.$route.query.taskId,
						handleResult:this.opinion.handleResult,
						"cardwfHis":{ 
							"legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
							"applyId":this.$route.query.applyId, //申请件编号
							"processInstanceId":this.$route.query.processInstanceId,  //流程实力ID
							"taskId":this.$route.query.taskId, //任务ID
							"activityId":this.$route.query.activityId, //当前节点ID
							"activityName":this.$route.query.activityName,//当前节点名称
							"userOrgNo":this.$store.state.loginData.userLogin.branchId, //登录人审批机构
							"userOrgName":this.$store.state.loginData.userLogin.branchName,//审批机构名称
							"userId":this.$store.state.loginData.userLogin.loginId,
							"userName":this.$store.state.loginData.userLogin.userName,
							"handleResult":this.opinion.handleResult,
							"handleDesc":this.opinion.handleDesc,
							"reasonId":this.opinion.handleResultState,
							"reasonName":reasonName,
							"backReason":this.$route.query.peopleResource
						}
					}
				}
				this.$refs["phoneInfo"].validate((valid) => {
					if(valid){
						this.$refs["opinion"].validate((valid) => {
							if(valid){
								this.$post(this.$approve+"/WFTask/HandleCardExamCommit",obj).then(res=>{
									this.flg=true;
									if(res.code=="000000"){
										this.$alert(i18n.t('toDoTasks.SuccessfulSubmission'), '', {//提交成功
					                        confirmButtonText:i18n.t('OK'),//确定
					                        callback: action => {
											   this.$router.push('/MainIndex/creditCard?id=1')
											    this.watchTag();
					                        }
					                    });
										this.resetForm('phoneInfo');
					                    this.resetForm('opinion');
					                    this.phoneInfo.checkExplain="";
									}else{
										
										var str = `
							                <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
							                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
							              `
							              this.$alert(str, i18n.t('Prompt'), {
							                dangerouslyUseHTMLString: true
							              });
							            this.resetForm('phoneInfo');
					                    this.resetForm('opinion');
					                    this.phoneInfo.checkExplain="";
										this.$router.push('/MainIndex/creditCard?id=1')
										 this.watchTag();
							              
									}
								})
							}
						})
					}
//					else{
////						this.errors={checkExplain:'不能为空'}
//						this.err=true
//					}
				})
				
			},
			
			resetForm(){//重置
				this.$refs["opinion"].resetFields();
//				this.opinion.checkExplain="";
//				this.phoneInfo.checkExplain="";
				this.$refs["phoneInfo"].resetFields();
				this.radioShow=false;
				
			},
			seeApplication(){
				this.dialogFormVisible1=true;
//				var obj={
//					applyId:this.$route.query.applyId,
//					legalPersonNum:this.$route.query.legalPersonNum
//				}
//				this.$post(this.$approve+"/cardworkbench/loanWfList",obj).then(res=>{
//				})
			},
			cancel1(){
				this.dialogFormVisible1=false;
			},
			seeCreditReporting(){
//				idCard
				var obj={
					cCertificatesNumber: this.applyInfo.cCertificatesNumber,
				}
				this.$post(this.$approve+"/cardworkbench/creditInvestigation",obj).then(res=>{
					if(res.code=="000000"){
						this.srcc=res.data
					}
				})
				this.dialogFormVisible2=true;
			},
			cancel2(){
				this.dialogFormVisible2=false;
			},
			seeTel(){
				this.dialogFormVisible3=true;
			},
			cancel3(){
				this.dialogFormVisible3=false;
			},
			seeApprovalInformation(){
				var obj={
					cardNo:this.applyInfo.cCertificatesNumber,
					legalPersonNum:this.$route.query.legalPersonNum,
					userId:this.$route.query.userId,
					applyId:this.$route.query.applyId
				}
//				this.$post(this.$approve+"/WFTask/cardHisByCardNo",obj).then(res=>{
				this.$post(this.$approve+"/WFTask/CardWfHisList",obj).then(res=>{
					if(res.code=="000000"){
						this.gridData=res.data
					}
				})
				this.dialogFormVisible4=true;
			},
			cancel4(){
				this.dialogFormVisible4=false;
			},
			
			historyed(){
				var obj={
					applyId:this.$route.query.applyId,
					cardNo:this.applyInfo.cCertificatesNumber,
					legalPersonNum:this.$route.query.legalPersonNum,
					userId:this.$route.query.userId
				}
//				this.$post(this.$approve+"/WFTask/CardWfHisList",obj).then(res=>{
				this.$post(this.$approve+"/WFTask/cardHisByCardNo",obj).then(res=>{
					if(res.code=="000000"){
						this.gridData=res.data
					}
				})
				this.dialogFormVisible5=true;
			},
			cancel5(){
				this.dialogFormVisible5=false;
			},
			
			seeImageAccess(){
				this.dialogFormVisible6=true;
			},
			cancel6(){//影像调阅
				this.dialogFormVisible6=false;
			},
			
			
			 getSelectData(){//初始化参数
			 	
			 	
			 	//联系人电话核查
			 	var obj2={
			 		"paramCode":'CHECK_LIAISON_PHONE'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj2).then(res=>{
		          if(res.returnCode=="000000"){
//		             this.handleResultStateArr =res.returnData
		             this.tels=res.returnData;
		          }
		        })
			 	//联系人核查
			 	var obj3={
			 		"paramCode":'CHECK_LIAISON'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj3).then(res=>{
		          if(res.returnCode=="000000"){
//		             this.handleResultStateArr =res.returnData
		             this.linkCheck =res.returnData
		          }
		        })
			 	//公司电话核查
			 	var obj4={
			 		"paramCode":'CHECK_UNIT'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj4).then(res=>{
		          if(res.returnCode=="000000"){
		             this.companyTelCheck =res.returnData
		          }
		        })
			 	//公司电话核查结果
			 	var obj5={
			 		"paramCode":'CHECK_UNIT_PHONE'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj5).then(res=>{
		          if(res.returnCode=="000000"){
		             this.companyCheck =res.returnData
		          }
		        })
			 	//家庭电话核查
			 	var obj6={
			 		"paramCode":'CHECK_HOME_PHONE'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj6).then(res=>{
		          if(res.returnCode=="000000"){
		             this.homeTelCheck =res.returnData
		          }
		        })
			 	//申请人手机号核查
			 	var obj7={
			 		"paramCode":'CHECK_PHONE_NUM'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj7).then(res=>{
		          if(res.returnCode=="000000"){
		             this.applicantTelCheck =res.returnData
		          }
		        })
			 	//资信核查结果   没有
			 	var obj8={
			 		"paramCode":'CARD_CREDIT_CERTIFICATION_RESULT'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj8).then(res=>{
		          if(res.returnCode=="000000"){
		             this.adoptCheck =res.returnData
		          }
		        })
			 	//申请人签字确认
			 	var obj9={
			 		"paramCode":'CARD_APPLY_SIGNATURE'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj9).then(res=>{
		          if(res.returnCode=="000000"){
		             this.signCheck =res.returnData
		          }
		        })
			 	//申请附件核查
			 	var obj10={
			 		"paramCode":'CARD_APPLY_ACCESSORY_EXAM'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj10).then(res=>{
		          if(res.returnCode=="000000"){
		             this.signCheck1 =res.returnData
		          }
		        })
			 	//附属卡确认
			 	var obj1={
			 		"paramCode":'CARD_SUPPLEMENT_SURE'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj1).then(res=>{
		          if(res.returnCode=="000000"){
		             this.cardCheck =res.returnData
		          }
		        })
			 	
			 	//拒绝吗
			 	var obj1={
			 		"paramCode":'LOAN_REASON_ID'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj1).then(res=>{
		          if(res.returnCode=="000000"){
		             this.noCheck =res.returnData
		          }
		        })
			 	
			 	//证件类型
			 	var obj11={
			 		"paramCode":'CARD_TYPE'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj11).then(res=>{
		          if(res.returnCode=="000000"){
		             this.cardState =res.returnData
		          }
		        })
			 	
			 	//学历
			 	var obj12={
			 		"paramCode":'EDUCATION_TYPE'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj12).then(res=>{
		          if(res.returnCode=="000000"){
		             this.xueli =res.returnData
		          }
		        })
			 },
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.todoTasks{
		background:#fff;
	}
	.todoTasks_box{
		padding:0 20px;
		box-sizing: border-box;
	}
	.formBox{
		overflow:hidden;
		background:#fff;
		padding:0px 0px 20px;
	}
	.btn{
		/*padding:15px 0;*/
		padding-bottom:20px;
		background:#fff;
		text-align: center;
		.el-col{
			padding:5px 10px;
			overflow: hidden;
			background: #fff;
			border:1px solid rgba(0,0,0,.1);
			.el-button{
				color:#666;
			}
		}
	}
	.el-select{
		width:100%;
	}
	
	.yingBox{
		width:100%;
		border:1px solid #eee;
		border-top:0;
	}
	#toDoTask{
		.el-dialog {
		    width:80%!important;
		    .el-dialog__body{
		          min-height: 300px;
		    }
		}
	}
	.home{
	    height: 100%;
	    background: #fff;
	    .home_main{
	        height: 100%;
	        max-width:1300px;
	        background: #fff;
	        padding:40px 50px 40px 50px;
	      .home_con{
	        padding: 40px;
	        border: 1px solid #aaa;
	        border-radius: 8px;
	      }
	    }
	}
	.loan_title{
	  line-height: 70px;
	  text-align: center;
	  color: #333;
	  font-size: 18px;
	  font-weight: normal;
	}
	.loanStep{
		  width: 100%;
		  li{
		    width: 16.66666%;
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
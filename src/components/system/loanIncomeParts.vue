<template>
  <div class="content_box" id="contract_content">
    <div class="btn">
      <div>
        <a @click="dbdpFirst()" v-if="funList.indexOf('单笔单批贷款申请')>-1">{{$t('loanIncome.Single_Loan_Application')}}</a><!-- 单笔单批贷款申请 -->
        <a @click="sjshFirst()" v-if="funList.indexOf('随借随还贷款申请')>-1">{{$t('loanIncome.Application_for_loan_with_loan_repayment')}}</a><!-- 随借随还贷款申请 -->
      </div>
      <div>
        <a @click="dbdpjdDialog = true" v-if="funList.indexOf('单笔单批进度查询')>-1">{{$t('loanIncome.Single_batch_progress_query')}}</a><!-- 单笔单批进度查询 -->
        <a @click="sjshjdDialog = true" v-if="funList.indexOf('随借随还进度查询')>-1">{{$t('loanIncome.With_Borrowing_and_Returning_Schedule_Query')}}</a><!-- 随借随还进度查询 -->
      </div>
    </div>
    <el-dialog :title="$t('loanIncome.Single_Loan_Application')" :visible.sync="dbdpdkDialog" :close-on-click-modal="false" width="60%" :before-close="dbdpcancel">  <!-- 单笔单批贷款申请 -->
      <div v-show="dbdpdksqStep.one">
        <h4>{{$t('loanIncome.Application_Information')}}</h4><!-- 申请信息 -->
        <el-form :model="dbdpdksqForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="dbdpdksqForm1" :rules="rules" label-width="160px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_applicant')" prop="applyUserName">   <!-- 申请人姓名 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyUserName"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Sex_of_applicant')" prop="applyUserSex">   <!-- 申请人性别 -->
                <el-select v-model="dbdpdksqForm.applyUserSex" style="width: 100%;" placeholder="">
                  <!-- <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option>请选择 -->
									<el-option label="男" value="2" ></el-option>
									<el-option label="女" value="1" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Document_type')" prop="idCardType">   <!-- 证件类型 -->
                <el-select v-model="dbdpdksqForm.idCardType" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Identification_Number')" prop="idCardNum">   <!-- 证件号码 -->
                <el-input type="text"  v-model="dbdpdksqForm.idCardNum"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Phone_number')" prop="applyUserPhoneNumber">   <!-- 手机号码 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyUserPhoneNumber"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Highest_educational_background')" prop="applyUserEducationId">   <!-- 最高学历 -->
                <el-select v-model="dbdpdksqForm.applyUserEducationId" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									 <el-option v-for="item in educationTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
          </el-row> 
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;margin-top: 30px;">
          <el-button type="primary" @click="dbdpdksq('dbdpdksqForm1')" size="small">{{$t('loanIncome.Single_Loan_Application')}}</el-button><!-- 单笔单批贷款申请 -->
        </div>
      </div>
      <div v-show="dbdpdksqStep.two">
        <h4>{{$t('loanIncome.Customer_Information')}}</h4><!-- 客户信息 -->
        <el-form :model="dbdpdksqForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="dbdpdksqForm2" :rules="rules" label-width="140px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_applicant')">   <!-- 申请人姓名 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyUserName" disabled></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Sex_of_applicant')">   <!-- 申请人性别 -->
                <el-select v-model="dbdpdksqForm.applyUserSex" style="width: 100%;" disabled placeholder="">
                  <!-- <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option>请选择 -->
									<el-option label="男" value="2" ></el-option>
									<el-option label="女" value="1" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Document_type')">   <!-- 证件类型 -->
                <el-select v-model="dbdpdksqForm.idCardType" style="width: 100%;" disabled placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Identification_Number')">   <!-- 证件号码 -->
                <el-input type="text"  v-model="dbdpdksqForm.idCardNum" disabled></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Phone_number')">   <!-- 手机号码 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyUserPhoneNumber" disabled></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Marital_status')">   <!-- 婚姻状况 -->
                <el-select v-model="dbdpdksqForm.applyUserMaritalStatusId" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in MaritalTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Highest_educational_background')">   <!-- 最高学历 -->
                <el-select v-model="dbdpdksqForm.applyUserEducationId" style="width: 100%;" disabled placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in educationTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.City_of_Family')" prop="city1">   <!-- 家庭所在城市 -->
                <el-select v-model="dbdpdksqForm.city1" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="上海" value="0" ></el-option>
									<el-option label="其他" value="1" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Family_address')" prop="contactAddress1">   <!-- 家庭地址 -->
                <el-input type="text"  v-model="dbdpdksqForm.contactAddress1"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Home_Address_Zip_Code')" prop="contactPostCode1">   <!-- 家庭地址邮编 -->
                <el-input type="text"  v-model="dbdpdksqForm.contactPostCode1"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Home_phone')" prop="contactMobilePhone1">   <!-- 家庭电话 -->
                <el-input type="text"  v-model="dbdpdksqForm.contactMobilePhone1"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.City_where_the_company_is_located')">   <!-- 公司所在城市 -->
                <el-select v-model="dbdpdksqForm.city2" style="width: 100%;" @change="dbdpgsChange(dbdpdksqForm.city2)" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option>
									<el-option label="上海" value="0" ></el-option>
									<el-option label="其他" value="1" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12" v-if="dbdpdksqForm.city2">
              <el-form-item :label="$t('loanIncome.Company_address')" :prop="dbdpdksqForm.city2 ? 'contactAddress2' : ''">   <!-- 公司地址 -->
                <el-input type="text"  v-model="dbdpdksqForm.contactAddress2"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12" v-if="dbdpdksqForm.city2">
              <el-form-item :label="$t('loanIncome.Company_Address_Zip_code')" :prop="dbdpdksqForm.city2 ? 'contactPostCode2' : ''">   <!-- 公司地址邮编 -->
                <el-input type="text"  v-model="dbdpdksqForm.contactPostCode2"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12" v-if="dbdpdksqForm.city2">
              <el-form-item :label="$t('loanIncome.Company_Telephone')" :prop="dbdpdksqForm.city2 ? 'contactMobilePhone2' : ''">   <!-- 公司电话 -->
                <el-input type="text"  v-model="dbdpdksqForm.contactMobilePhone2"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_work_unit')">   <!-- 工作单位名称 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyCompanyName"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.post')">   <!-- 职务 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyCompanyPost"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.annual_income')">   <!-- 年收入 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyUserAnnualIncome"></el-input >
              </el-form-item>
            </el-col>
            <!-- 乙方电子邮箱 -->
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Party_B_s_E-mail')" prop="applyUserEmail">   
                <el-input type="text"  v-model="dbdpdksqForm.applyUserEmail"></el-input >
              </el-form-item>
            </el-col>	
            <!-- 乙方微信号 -->
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Party_B_Microsignal')" prop="wechatNumber">   
                <el-input type="text"  v-model="dbdpdksqForm.wechatNumber"></el-input >
              </el-form-item>
            </el-col>	
            <!-- 乙方支付宝账号 -->
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Party_B_Alipay_account')" prop="alipay">   
                <el-input type="text"  v-model="dbdpdksqForm.alipay"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_contact_person')">   <!-- 联系人姓名 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyRelationName"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Relations_with_Contacts')">   <!-- 与联系人关系 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyRelatin"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Contact_telephone')">   <!-- 联系人电话 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyRelationTelephone"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_witness')">   <!-- 证明人姓名 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyCompanyWitness"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Relation_with_Certificator')">   <!-- 与证明人关系 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyCompanyRelation"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Certificate_Telephone')">   <!-- 证明人电话 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyCompanyTelephone"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Remarks_Information')">   <!-- 备注信息 -->
                <el-input type="text"  v-model="dbdpdksqForm.remarkInfo"></el-input >
              </el-form-item>
            </el-col>
          </el-row> 
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;margin-top: 30px;">
          <el-button type="primary" @click="dbdpdksqStep.one = true; dbdpdksqStep.two = false;" size="small">{{$t('loanIncome.The_last_step')}}</el-button><!-- 上一步 -->
          <el-button type="primary" @click="nextStep('dbdpdksqForm2')" size="small">{{$t('loanIncome.Next_step')}}</el-button><!-- 下一步 -->
        </div>
      </div>
      <div v-show="dbdpdksqStep.three">
        <h4>{{$t('loanIncome.Basic_Product_Information')}}</h4><!-- 产品基本信息 -->
        <el-form :model="dbdpdksqForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="dbdpdksqForm3" :rules="rules" label-width="140px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Product_Name')" prop="productNum">   <!-- 产品名称 -->
                <el-select v-model="dbdpdksqForm.productNum" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in productList" :key="item.productCode" :label="item.productName" :value="item.productCode" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <!-- <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Chinese_pinyin')" prop="embosserName1">   中文拼音
                <el-input type="text"  v-model="dbdpdksqForm.embosserName1"></el-input >
              </el-form-item>
            </el-col>	 -->
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Advance_Credit_Line')">   <!-- 预授信额度 -->
                <el-input type="text"  v-model="dbdpdksqForm.creditLimit" disabled></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Amount_of_application')" prop="applyAmount">   <!-- 申请金额 -->
                <el-input type="text"  v-model="dbdpdksqForm.applyAmount"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_currency')" prop="currencyId">   <!-- 币种名称 -->
                <el-select v-model="dbdpdksqForm.currencyId" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="人民币" value="156" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Term_of_loan')" prop="applyTermValue">   <!-- 贷款期限(月) -->
                <el-input type="text"  v-model="dbdpdksqForm.applyTermValue"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Execution_Interest_Rate')" prop="executionInterestRate">  <!-- 执行利率(%) --> 
                <el-input type="text"  v-model="dbdpdksqForm.executionInterestRate"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Loan_Day')" prop="payLoanDate">   <!-- 贷款放款日 -->
                <el-date-picker v-model="dbdpdksqForm.payLoanDate" type="date" style="width:100%" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Interest_rate_type')">   <!-- 利率类型 -->
                <el-select v-model="dbdpdksqForm.rateInd" style="width: 100%;" placeholder="">
									<el-option label="年利率" value="0" ></el-option>
                  <el-option label="月利率" value="1" ></el-option>
                  <el-option label="日利率" value="2" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Account_Receivable')" prop="receiveAccount">   <!-- 收款账号 -->
                <el-input type="text"  v-model="dbdpdksqForm.receiveAccount"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Receivable_Account_Opening_Bank')" prop="accountBankNo">   <!-- 收款账号开户行 -->
                <el-input type="text"  v-model="dbdpdksqForm.accountBankNo"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Payment_method')" prop="repayMode">   <!-- 还款方式 -->
                <el-select v-model="dbdpdksqForm.repayMode" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="期末本息一次付清" value="0" ></el-option>
                  <el-option label="按固定周期付息、到期还本" value="2" ></el-option>
                  <el-option label="等额本息" value="3" ></el-option>
                  <el-option label="等额本金" value="4" ></el-option>
                  <el-option label="等本等息" value="5"></el-option>
									<el-option label="首期一次性付息分期还本" value="6"></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Institution_number')" prop="branchNum">   <!-- 机构编号 -->
                <el-input type="text"  v-model="dbdpdksqForm.branchNum"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.institution_name')" prop="branchName">   <!-- 机构名称 -->
                <el-input type="text"  v-model="dbdpdksqForm.branchName"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Monthly_payment_period')" prop="monthSupplyPeriod">   <!-- 月供期限（月） -->
                <el-input type="text"  v-model="dbdpdksqForm.monthSupplyPeriod"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Repayment_account_bank_number')" prop="repaymentAccountBankNum">   <!-- 还款账号开户银行号 -->
                <el-input type="text"  v-model="dbdpdksqForm.repaymentAccountBankNum"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.application_type')" prop="applicationType">   <!-- 申请类型 -->
                <el-select v-model="dbdpdksqForm.applicationType" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="主卡" value="1" ></el-option>
                  <el-option label="附属卡" value="2" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
          </el-row> 
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;margin-top: 30px;">
          <el-button type="primary" @click="dbdpdksqStep.three = false; dbdpdksqStep.two = true;" size="small">{{$t('loanIncome.The_last_step')}}</el-button><!-- 上一步 -->
          <el-button type="primary" size="small" @click="dbdpSure('dbdpdksqForm3')" :disabled="dbdpflg">{{$t('loanIncome.Loan_application')}}</el-button><!-- 贷款申请 -->
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="$t('loanIncome.Application_for_loan_with_loan_repayment')" :visible.sync="sjshdkDialog" :close-on-click-modal="false" width="60%" :before-close="sjshcancel"> <!-- 随借随还贷款申请 -->
      <div>
        <el-form :model="sjshdksqForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="sjshdksqForm" :rules="rules" label-width="150px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_applicant')" prop="applyUserName">   <!-- 申请人姓名 -->
                <el-input type="text"  v-model="sjshdksqForm.applyUserName"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_applicant')" prop="applyUserSex">   <!-- 申请人性别 -->
                <el-select v-model="sjshdksqForm.applyUserSex" style="width: 100%;" placeholder="">
                  <!-- <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option>请选择 -->
									<el-option label="男" value="2" ></el-option>
									<el-option label="女" value="1" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Document_type')" prop="idCardType">   <!-- 证件类型 -->
                <el-select v-model="sjshdksqForm.idCardType" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Identification_Number')" prop="idCardNum">   <!-- 证件号码 -->
                <el-input type="text"  v-model="sjshdksqForm.idCardNum"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Phone_number')" prop="applyUserPhoneNumber">  <!-- 手机号码 --> 
                <el-input type="text"  v-model="sjshdksqForm.applyUserPhoneNumber"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Marital_status')">   <!-- 婚姻状况 -->
                <el-select v-model="sjshdksqForm.applyUserMaritalStatusId" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in MaritalTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Highest_educational_background')" prop="applyUserEducationId">   <!-- 最高学历 -->
                <el-select v-model="sjshdksqForm.applyUserEducationId" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in educationTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.City_of_Family')" prop="city1">   <!-- 家庭所在城市 -->
                <el-select v-model="sjshdksqForm.city1" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="上海" value="0" ></el-option>
									<el-option label="其他" value="1" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Family_address')" prop="contactAddress1"> <!-- 家庭地址 -->  
                <el-input type="text"  v-model="sjshdksqForm.contactAddress1"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Home_Address_Zip_Code')" prop="contactPostCode1">   <!-- 家庭地址邮编 -->
                <el-input type="text"  v-model="sjshdksqForm.contactPostCode1"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Home_phone')" prop="contactMobilePhone1">  <!-- 家庭电话 --> 
                <el-input type="text"  v-model="sjshdksqForm.contactMobilePhone1"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.City_where_the_company_is_located')">   <!-- 公司所在城市 -->
                <el-select v-model="sjshdksqForm.city2" style="width: 100%;" @change="sjshgsChange(sjshdksqForm.city2)" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="上海" value="0" ></el-option>
									<el-option label="其他" value="1" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="12" v-if="sjshdksqForm.city2">
              <el-form-item :label="$t('loanIncome.Company_address')" :prop="sjshdksqForm.city2 ? 'contactAddress2' : ''">   <!-- 公司地址 -->
                <el-input type="text"  v-model="sjshdksqForm.contactAddress2"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12" v-if="sjshdksqForm.city2">
              <el-form-item :label="$t('loanIncome.Company_Address_Zip_code')" :prop="sjshdksqForm.city2 ? 'contactPostCode2' : ''"> <!-- 公司地址邮编 -->  
                <el-input type="text"  v-model="sjshdksqForm.contactPostCode2"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12" v-if="sjshdksqForm.city2">
              <el-form-item :label="$t('loanIncome.Company_Telephone')" :prop="sjshdksqForm.city2 ? 'contactMobilePhone2' : ''">   <!-- 公司电话 -->
                <el-input type="text"  v-model="sjshdksqForm.contactMobilePhone2"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_work_unit')">   <!-- 工作单位名称 -->
                <el-input type="text"  v-model="sjshdksqForm.workUnit"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.post')">   <!-- 职务 -->
                <el-input type="text"  v-model="sjshdksqForm.workPosition"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.annual_income')">   <!-- 年收入 -->
                <el-input type="text"  v-model="sjshdksqForm.applyUserAnnualIncome"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_contact_person')">   <!-- 联系人姓名 -->
                <el-input type="text"  v-model="sjshdksqForm.liaisonName"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Relations_with_Contacts')">   <!-- 与联系人关系 -->
                <el-input type="text"  v-model="sjshdksqForm.liaisonRelation"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Contact_telephone')">   <!-- 联系人电话 -->
                <el-input type="text"  v-model="sjshdksqForm.liaisonPhone"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_witness')">   <!-- 证明人姓名 -->
                <el-input type="text"  v-model="sjshdksqForm.certifierName"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Certificate_Telephone')">   <!-- 证明人电话 -->
                <el-input type="text"  v-model="sjshdksqForm.certifierPhone"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Remarks_Information')">   <!-- 备注信息 -->
                <el-input type="text"  v-model="sjshdksqForm.remarkInfo"></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Product_Name')" prop="productNum">   <!-- 产品名称 -->
                <el-select v-model="sjshdksqForm.productNum" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in productList" :key="item.productCode" :label="item.productName" :value="item.productCode" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Chinese_pinyin')" prop="embosserName1">   中文拼音
                <el-input type="text"  v-model="sjshdksqForm.embosserName1"></el-input >
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Name_of_currency')" prop="currencyId">   <!-- 币种名称 -->
                <el-select v-model="sjshdksqForm.currencyId" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="人民币" value="156" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Agreed_bank_number')" prop="directDebitBankNo">  <!-- 约定还款银行号 --> 
                <el-input type="text"  v-model="sjshdksqForm.directDebitBankNo"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Agreed_repayment_account_number')" prop="directDebitAccountNo">  <!-- 约定还款账户号 --> 
                <el-input type="text"  v-model="sjshdksqForm.directDebitAccountNo"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Main_attached_logo')" prop="applicationType">   <!-- 主附标识 -->
                <el-select v-model="sjshdksqForm.applicationType" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option label="主卡" value="1" ></el-option>
                  <el-option label="附属卡" value="2" ></el-option>
								</el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.Institution_number')" prop="branchNum">  <!-- 机构编号 --> 
                <el-input type="text"  v-model="sjshdksqForm.branchNum"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="12">
              <el-form-item :label="$t('loanIncome.institution_name')" prop="branchName">  <!-- 机构名称 --> 
                <el-input type="text"  v-model="sjshdksqForm.branchName"></el-input >
              </el-form-item>
            </el-col>	
          </el-row> 
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;margin-top: 30px;">
          <el-button type="primary" size="small" @click="sjshSure('sjshdksqForm')" :disabled="sjshflg">{{$t('loanIncome.Loan_application')}}</el-button><!-- 贷款申请 -->
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="$t('loanIncome.Single_batch_progress_query')" :visible.sync="dbdpjdDialog" :close-on-click-modal="false" width="80%">  <!-- 单笔单批进度查询 -->
      <el-form :model="dbdpjdForm"  ref="dbdpjdForm" :rules="rules" :inline="true" size="small" style="margin-bottom: 30px">
        <el-row class="edit_module_search">
          <el-col :span="24">
            <el-form-item :label="$t('loanIncome.Application_Number')" prop="applyId"> <!-- 申请编号 -->
              <el-input v-model="dbdpjdForm.applyId" class="input-with-select"></el-input> 
            </el-form-item>
            <el-form-item :label="$t('loanIncome.Document_type')" prop="idType"> <!-- 证件类型 -->
            <el-select v-model="dbdpjdForm.idType" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
            </el-form-item> 
            <el-form-item :label="$t('loanIncome.Identification_Number')" prop="idNum"> <!-- 证件号码 -->
              <el-input v-model="dbdpjdForm.idNum" class="input-with-select"></el-input> 
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="edit_module_btn" style="text-align: right;">
              <el-button type="warning" icon="el-icon-search" size="small" style="margin: 9px;" @click="dbdpjdQuery('dbdpjdForm')">{{$t("Query")}}</el-button> <!-- 查询 --> 
            </div> 
          </el-col>
        </el-row> 
      </el-form>
      <el-table :data="dbdpjdtableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
						<el-table-column prop="index" type="index"  :label="$t('Serial_number')" align="center" width="130px"></el-table-column><!-- 序号 -->
						<el-table-column prop="applyId" :label="$t('loanIncome.Application_Number')"  align="center"> </el-table-column><!-- 申请编号 -->
						<el-table-column prop="createTime" :label="$t('loanIncome.Application_time')"   align="center"> </el-table-column><!-- 申请时间 -->
						<el-table-column prop="accptingState" :label="$t('loanIncome.Examination_and_approval_status')" align="center" ><!-- 审批状态 -->
              <template slot-scope="scope">{{scope.row.accptingState | accptingState}}</template>
            </el-table-column>
				</el-table>
				<!-- <el-pagination @size-change="dbdpjdhandleSizeChange" @current-change="dbdpjdhandleCurrentChange" :current-page="dbdpjdForm.pageIndex" :page-sizes="[5, 10, 15]" :page-size="dbdpjdForm.pageSize" layout="prev, pager, next, sizes, total, slot" :total="dbdpjdtotalCount">
					<template slot>
						<div class="slot_pag">
							<span>跳转至 </span>
							<el-input size="mini" v-model="dbdpjdForm.goPage" type="number">
								</el-input><span>页</span>
							<el-button  type="warning" @click="dbdpjdgoPageSure">确定</el-button>
						</div>
					</template>
				</el-pagination> -->
    </el-dialog>
    <el-dialog :title="$t('loanIncome.With_Borrowing_and_Returning_Schedule_Query')" :visible.sync="sjshjdDialog" :close-on-click-modal="false" width="80%" style="margin-bottom: 30px">  <!-- 随借随还进度查询 -->
      <el-form :model="sjshjdForm"  ref="sjshjdForm" :inline="true" :rules="rules" size="small">
        <el-row class="edit_module_search">
          <el-col :span="24">
            <el-form-item :label="$t('loanIncome.Application_Number')" prop="applyId"> <!-- 申请编号 -->
              <el-input v-model="sjshjdForm.applyId" class="input-with-select"></el-input> 
            </el-form-item>
            <el-form-item :label="$t('loanIncome.Document_type')" prop="idType"> <!-- 证件类型 -->
              <el-select v-model="sjshjdForm.idType" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
									<el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
            </el-form-item> 
            <el-form-item :label="$t('loanIncome.Identification_Number')" prop="idNum"> <!-- 证件号码 -->
              <el-input v-model="sjshjdForm.idNum" class="input-with-select"></el-input> 
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="edit_module_btn" style="text-align: right;">
              <el-button type="warning" icon="el-icon-search" size="small" style="margin: 9px;" @click="sjshjdQuery('sjshjdForm')">{{$t("Query")}}</el-button> <!-- 查询 -->  
            </div>
          </el-col>
        </el-row> 
      </el-form>
      <el-table :data="sjshjdtableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
            <el-table-column prop="index" type="index"  :label="$t('Serial_number')" align="center" width="130px"></el-table-column><!-- 序号 -->
						<el-table-column prop="applyId" :label="$t('loanIncome.Application_Number')"  align="center"> </el-table-column><!-- 申请编号 -->
						<el-table-column prop="createTime" :label="$t('loanIncome.Application_time')"   align="center"> </el-table-column><!-- 申请时间 -->
						<el-table-column prop="accptingState" :label="$t('loanIncome.Examination_and_approval_status')" align="center" ><!-- 审批状态 -->
              <template slot-scope="scope">{{scope.row.accptingState | accptingState}}</template>
            </el-table-column>
      </el-table>
				<!-- <el-pagination @size-change="sjshjdhandleSizeChange" @current-change="sjshjdhandleCurrentChange" :current-page="sjshjdForm.pageIndex" :page-sizes="[5, 10, 15]" :page-size="sjshjdForm.pageSize" layout="prev, pager, next, sizes, total, slot" :total="sjshjdtotalCount">
					<template slot>
						<div class="slot_pag">
							<span>跳转至 </span>
							<el-input size="mini" v-model="sjshjdForm.goPage" type="number">
								</el-input><span>页</span>
							<el-button  type="warning" @click="sjshjdgoPageSure">确定</el-button>
						</div>
					</template>
				</el-pagination> -->
    </el-dialog>
  </div>
</template>

<script>
import { setTimeout, setInterval, clearInterval } from 'timers';
export default {
  name: 'LoanIncomeParts',
  data () {
    var isCardNo  = (rule, value, callback) =>{
      if (this.dbdpdksqForm.idCardType == 1) {
        if (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
          callback(new Error(i18n.t('loanIncome.Please_enter_the_correct_ID_number'))); //请输入正确的身份证号
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    
    return {
      dbdpdkDialog: false,
      dbdpdksqForm: {
        applyUserName: '',
        applyUserSex: '1',
        idCardType: '1',
        idCardNum: '',
        applyUserPhoneNumber: '15211111111',
        applyUserEducationId: '1',
        applyUserMaritalStatusId: '0',
        city1: '上海',
        contactAddress1: '上海市徐汇区光华小区A单元101室',
        contactPostCode1: '000000',
        contactMobilePhone1: '0021-61611124',
        contactAddress2:'',
        contactPostCode2:'',
        contactMobilePhone2:'',
        applyCompanyName:'天阳科技有限公司',
        applyCompanyPost:'员工',
        applyUserAnnualIncome:'80000',
        applyUserEmail: 'abc@163.com',
        wechatNumber: 'smile662',
        alipay:'13112345678',
        applyRelationName: '章一',
        applyRelatin: '夫妻',
        applyRelationTelephone: '13311111111',
        applyCompanyWitness: '王二',
        applyCompanyRelation: '同事',
        applyCompanyTelephone: '19966666666',
        productNum: 'MODP30000',
        applyAmount: '1000.00',
        currencyId: '156',
        applyTermValue: '12',
        executionInterestRate: '5',
        payLoanDate: '',
        rateInd: '0',
        receiveAccount: '62112345678952522',
        accountBankNo: '9889556',
        repayMode: '0',
        branchNum: '100001',
        branchName: '总行',
        monthSupplyPeriod: '12',
        repaymentAccountBankNum: '62111122233366544788',
        applicationType: '1',
        // embosserName1: '',
      },
      sjshdkDialog: false,
      sjshdksqForm: {
        applyUserName: '佚名',
        applyUserSex: '1',
        idCardType: '1',
        idCardNum: '',
        applyUserPhoneNumber: '15201765623',
        applyUserEducationId: '1',
        applyUserMaritalStatusId: '0',
        city1: '上海',
        contactAddress1: '上海市徐汇区光华小区A单元101室',
        contactPostCode1: '000000',
        contactMobilePhone1: '0021-61611124',
        contactAddress2: '',
        contactPostCode2: '',
        contactMobilePhone2: '',
        workUnit:'天阳科技有限公司',
        workPosition:'经理',
        applyUserAnnualIncome:'80000',
        liaisonName: '章一',
        liaisonRelation: '夫妻',
        liaisonPhone: '13311111111',
        certifierName: '王二',
        // applyCompanyRelation: '同事',
        certifierPhone: '19966666666',
        remarkInfo: '',
        productNum: 'MODP30003',
        currencyId: '156',
        directDebitBankNo: '62111122233366544788',
        directDebitAccountNo: '123456',
        applicationType: '1',
        branchNum: '100001',
        branchName: '总行',
        // embosserName1: '',
      },
      dbdpflg: false,
      sjshflg: false,
      sjshspflg: false,
      dbdpdksqStep: {
        one: true,
        two: false,
        three: false
      },
      dbdpjdForm: {
        applyId: '',
        idType: '',
        idNum: ''
      },
      dbdpjdtotalCount: 0,
      dbdpjdtableData: [],
      dbdpjdDialog: false,
      sjshjdForm: {
        applyId: '',
        idType: '',
        idNum: ''
      },
      sjshjdtotalCount: 0,
      sjshjdtableData: [],
      sjshjdDialog: false,
      cardTypeList: [],
      educationTypeList: [],
      MaritalTypeList: [],
      productList: [],
      rules: {
        applyUserName:[
          { required: true, message: i18n.t('loanIncome.The_applicant_name_cannot_be_empty'), trigger: 'change' }, //申请人姓名不能为空
        ],
        applyUserSex: [
          { required: true, message: i18n.t('loanIncome.Please_choose_the_applicant_gender'), trigger: 'change' }, //请选择申请人性别
        ],
        idCardType: [
          { required: true, message: i18n.t('loanIncome.Please_select_the_type_of_certificate'), trigger: 'change' }, //请选择证件类型
        ],
        idCardNum:[
          { required: true, message: i18n.t('loanIncome.Certificate_number_cannot_be_empty'), trigger: 'change' }, //证件号码不能为空
          { validator: isCardNo}
        ],
        applyUserPhoneNumber: [
          { required: true, message: i18n.t('loanIncome.Mobile_phone_number_cannot_be_empty'), trigger: 'change' }, //手机号码不能为空
          { pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: i18n.t('loanIncome.Please_enter_the_correct_cell_phone_number') }, //请输入正确的手机号
        ],
        applyUserEducationId: [
          { required: true, message: i18n.t('loanIncome.Please_choose_the_highest_educational_background'), trigger: 'change' }, //请选择最高学历
        ],
        city1: [
          { required: true, message: i18n.t('loanIncome.Please_choose_the_city_where_your_family_lives'), trigger: 'change' }, //请选择家庭所在城市
        ],
        contactAddress1: [
          { required: true, message: i18n.t('loanIncome.Family_address_cannot_be_empty'), trigger: 'change' }, //家庭地址不能为空
        ],
        contactPostCode1: [
          { required: true, message: i18n.t('loanIncome.Home_Address_Zip_code_cannot_be_empty'), trigger: 'change' }, //家庭地址邮编不能为空
        ],
        contactMobilePhone1: [
          { required: true, message: i18n.t('loanIncome.Home_phone_cannot_be_empty'), trigger: 'change' }, //家庭电话不能为空
        ],
        contactAddress2: [
          { required: true, message: i18n.t('loanIncome.Company_address_cannot_be_empty'), trigger: 'change' }, //公司地址不能为空
        ],
        contactPostCode2: [
          { required: true, message: i18n.t('loanIncome.Company_Address_Zip_code_cannot_be_empty'), trigger: 'change' }, //公司地址邮编不能为空
        ],
        contactMobilePhone2: [
          { required: true, message: i18n.t('loanIncome.The_company_telephone_cannot_be_empty'), trigger: 'change' }, //公司电话不能为空
        ],
        productNum: [
          { required: true, message: i18n.t('loanIncome.Please_select_the_product_name'), trigger: 'change' }, //请选择产品名称
        ],
        applyAmount: [
          { required: true, message: i18n.t('loanIncome.The_amount_of_application_cannot_be_empty'), trigger: 'change' }, //申请金额不能为空
        ],
        currencyId: [
          { required: true, message: i18n.t('loanIncome.Please_choose_the_currency_name'), trigger: 'change' }, //请选择币种名称
        ],
        applyTermValue: [
          { required: true, message: i18n.t('loanIncome.The_term_of_the_loan_should_not_be_empty'), trigger: 'change' }, //贷款期限不能为空
        ],
        executionInterestRate: [
          { required: true, message: i18n.t('loanIncome.Execution_interest_rate_cannot_be_empty'), trigger: 'change' }, //执行利率不能为空
        ],
        payLoanDate: [
          { required: true, message: i18n.t('loanIncome.Please_choose_the_loan_date'), trigger: 'change' }, //请选择贷款放款日
        ],
        receiveAccount: [
          { required: true, message: i18n.t('loanIncome.Receivable_account_cannot_be_empty'), trigger: 'change' }, //收款账号不能为空
        ],
        accountBankNo: [
          { required: true, message: i18n.t('loanIncome.Receivable_account_opening_bank_cannot_be_empty'), trigger: 'change' }, //收款账号开户行不能为空
        ],
        repayMode: [
          { required: true, message: i18n.t('loanIncome.Please_choose_the_method_of_repayment'), trigger: 'change' }, //请选择还款方式
        ],
        currency: [
          { required: true, message: i18n.t('loanIncome.Please_choose_the_currency_name'), trigger: 'change' }, //请选择币种名称
        ],
        applyUserEmail: [
          { required: true, message: i18n.t('loanIncome.Party_B-s_E-mail_cannot_be_empty'), trigger: 'change' }, //乙方电子邮箱不能为空
          { type: 'email', message: i18n.t('loanIncome.Please_enter_the_correct_email_address'), trigger: ['blur', 'change'] } //请输入正确的邮箱地址
        ],
        wechatNumber: [
          { required: true, message: i18n.t('loanIncome.Party_B-s_Wechat_cannot_be_empty'), trigger: 'change' }, //乙方微信不能为空
        ],
        alipay: [
          { required: true, message: i18n.t('loanIncome.Party_B_Alipay_can_not_be_empty'), trigger: 'change' }, //乙方支付宝不能为空
        ],
        branchNum: [
          { required: true, message: i18n.t('loanIncome.Institution_number_cannot_be_empty'), trigger: 'change' }, // 机构编号不能为空
        ],
        branchName: [
          { required: true, message: i18n.t('loanIncome.Institution_name_cannot_be_empty'), trigger: 'change' }, // 机构名称不能为空
        ],
        monthSupplyPeriod: [
          { required: true, message: i18n.t('loanIncome.Monthly_payment_period_cannot_be_empty'), trigger: 'change' }, // 月供期限不能为空
        ],
        repaymentAccountBankNum: [
          { required: true, message: i18n.t('loanIncome.Repayment_account_bank_number_cannot_be_empty'), trigger: 'change' }, // 还款账号开户银行号不能为空
        ],
        applicationType: [
          { required: true, message: i18n.t('loanIncome.Please_select_the_type_of_application'), trigger: 'change' }, // 请选择申请类型
        ],
        directDebitBankNo: [
          { required: true, message: i18n.t('loanIncome.The_agreed_repayment_bank_number_cannot_be_empty'), trigger: 'change' }, // 约定还款银行号不能为空
        ],
        directDebitAccountNo: [
          { required: true, message: i18n.t('loanIncome.The_agreed_repayment_account_number_cannot_be_empty'), trigger: 'change' }, // 约定还款账户号不能为空
        ],
        // embosserName1: [
        //   { required: true, message: i18n.t('loanIncome.Chinese_Pinyin_cannot_be_empty'), trigger: 'change' } // 中文拼音不能为空
        // ]
      },
      funList: []
    }
  },
  mounted(){
    this.getFunList()
    this.getCardType()
    this.getEducationType()
    this.getMaritalType()
    this.getProductList()
  },
  
  methods:{
    // 获取产品列表
    getProductList () {
      this.$post(this.$api + '/restProduct/findAll',{productType: 'RLN'}).then(res =>{
        if(res.returnCode == '000000'){
          this.productList =  res.returnData;
        }
      });
    },
    // 获取婚姻状况列表
    getMaritalType:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'MARITAL_STATUS'}).then(res =>{
        if(res.returnCode == '000000'){
          this.MaritalTypeList =  res.returnData;
        }
      });
    },
    // 获取证件类型列表
    getCardType:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'CARD_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.cardTypeList =  res.returnData;
        }
      });
    },
    // 获取最高学历列表
    getEducationType:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'EDUCATION_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.educationTypeList =  res.returnData;
        }
      });
    },
    // 随借随还公司所在城市改变清空公司地址信息
    sjshgsChange(val) {
      if (!val) {
        this.sjshdksqForm.contactAddress2 = ''
        this.sjshdksqForm.contactPostCode2 = ''
        this.sjshdksqForm.contactMobilePhone2 = ''
      }
    },
    // 单笔单批公司所在城市改变清空公司地址信息
    dbdpgsChange(val) {
      if (!val) {
        this.dbdpdksqForm.contactAddress2 = ''
        this.dbdpdksqForm.contactPostCode2 = ''
        this.dbdpdksqForm.contactMobilePhone2 = ''
      }
    },
    // 点击随借随还贷款申请按钮
    sjshFirst () {
      let self = this
      self.sjshdkDialog = true;
      if (self.$refs['sjshdksqForm']!==undefined) {
        self.$refs['sjshdksqForm'].resetFields()
      }
    },
    // 点击单笔单批贷款申请按钮
    dbdpFirst () {
      let self = this
      self.dbdpdkDialog = true;
      if (self.$refs['dbdpdksqForm1']!==undefined) {
        self.$refs['dbdpdksqForm1'].resetFields()
      }
    },
    // 随借随还关闭按钮
    sjshcancel(done) {
      let self = this
      if (self.$refs['sjshdksqForm']!==undefined) {
        self.$refs['sjshdksqForm'].resetFields()
      }
      done()
    },
    // 单笔单批关闭按钮
    dbdpcancel (done) {
      if (this.$refs['dbdpdksqForm1']!==undefined) {
        this.$refs['dbdpdksqForm1'].resetFields()
      }
      if (this.$refs['dbdpdksqForm2']!==undefined) {
        this.$refs['dbdpdksqForm2'].resetFields()
      }
      if (this.$refs['dbdpdksqForm3']!==undefined) {
        this.$refs['dbdpdksqForm3'].resetFields()
      }

      this.dbdpdksqStep.one = true
      this.dbdpdksqStep.two = false
      this.dbdpdksqStep.three = false
      done()
    },
    // 随借随还点击确定
    sjshSure (formName) {
      let self = this
      self.sjshdksqForm.coreCoreCustomerAddrs = [
        { "type": "1", "contactAddress": self.sjshdksqForm.contactAddress1, "contactPostCode": self.sjshdksqForm.contactPostCode1, "contactMobilePhone": self.sjshdksqForm.contactMobilePhone1, "city":  self.sjshdksqForm.city1},
        { "type": "2", "contactAddress": self.sjshdksqForm.contactAddress2, "contactPostCode": self.sjshdksqForm.contactPostCode2, "contactMobilePhone": self.sjshdksqForm.contactMobilePhone2, "city":  self.sjshdksqForm.city2}
      ];
      if (!self.sjshdksqForm.contactAddress2 && !self.sjshdksqForm.contactPostCode2 && !self.sjshdksqForm.contactMobilePhone2 && !self.sjshdksqForm.city2) {
        let arr = JSON.parse(JSON.stringify(self.sjshdksqForm.coreCoreCustomerAddrs))
        self.sjshdksqForm.coreCoreCustomerAddrs = []
        self.sjshdksqForm.coreCoreCustomerAddrs.push(arr[0])
      }
      var obj = {
        "channelNo": "A002",
        "channelName": "手机",
        "productNum": self.sjshdksqForm.productNum,
        // "productName": self.sjshdksqForm.productNum,
        "applyCreeditLimit": self.sjshdksqForm.applyCreeditLimit,
        "currencyId": self.sjshdksqForm.currencyId,
        "limitEffectiveDate": self.sjshdksqForm.limitEffectiveDate,
        "applyTime": self.sjshdksqForm.applyTime,
        "applyUserName": self.sjshdksqForm.applyUserName,
        "applyUserSex": self.sjshdksqForm.applyUserSex,
        // "applyUserSexName": self.sjshdksqForm.applyUserSexName,
        // "birthday": self.sjshdksqForm.birthday,
        "idCardType": self.sjshdksqForm.idCardType,
        // "idTypeName": self.sjshdksqForm.idTypeName,
        "idCardNum": self.sjshdksqForm.idCardNum,
        "applyUserEducationId": self.sjshdksqForm.applyUserEducationId,
        "applyUserMaritalStatusId": self.sjshdksqForm.applyUserMaritalStatusId,
        // "applyUserMaritalStatusIdName": self.sjshdksqForm.applyUserMaritalStatusIdName,
        "applyUserPhoneNumber": self.sjshdksqForm.applyUserPhoneNumber,
        "coreCoreCustomerAddrs": self.sjshdksqForm.coreCoreCustomerAddrs,
        "occupationCode": self.sjshdksqForm.occupationCode,
        "guarantorFlag": self.sjshdksqForm.guarantorFlag,
        "certifierName": self.sjshdksqForm.certifierName,
        "certifierPhone": self.sjshdksqForm.certifierPhone,
        "liaisonName": self.sjshdksqForm.liaisonName,
        "liaisonRelation": self.sjshdksqForm.liaisonRelation,
        "liaisonPhone": self.sjshdksqForm.liaisonPhone,
        "residencyStatus": self.sjshdksqForm.residencyStatus,
        "residencyStatusName": self.sjshdksqForm.residencyStatusName,
        "workPosition": self.sjshdksqForm.workPosition,
        "workUnit": self.sjshdksqForm.workUnit,
        // "pricingObjectCode": "MODP30003",
        // "mediaObjectCode": "MODM00001",
        // "institutionId": "100010001",
        // "mainSupplyIndicator": self.sjshdksqForm.mainSupplyIndicator,
        "applicationType": self.sjshdksqForm.applicationType,
        // "creditNodeNo": "010",
        // "businessProgramNo": self.sjshdksqForm.businessProgramNo,
        // "coBrandedNo": self.sjshdksqForm.coBrandedNo,
        // "mediaUserName": self.sjshdksqForm.applyUserName,
        // "formatCode": self.sjshdksqForm.formatCode,
        "operatorId": self.sjshdksqForm.operatorId,
        // "billDay": self.sjshdksqForm.billDay,
        "directDebitBankNo": self.sjshdksqForm.directDebitBankNo,
        "directDebitAccountNo": self.sjshdksqForm.directDebitAccountNo,
        "applicationType": self.sjshdksqForm.applicationType,
        "branchNum": self.sjshdksqForm.branchNum,
        "branchName": self.sjshdksqForm.branchName,
        // "embosserName1": self.sjshdksqForm.embosserName1,
      };
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.sjshflg = true
          const loading = self.$loading({
            lock: true,
            text: i18n.t('loanIncome.Desperately_approved'),
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255,0.7)'
          })
          self.$post(self.$channelaccess + '/loan/anytimeRepaid/apply',obj).then(res =>{
            if(res.returnCode == '000000'){
              let f = 60
              let dialigFlag = false
              let timer = setInterval(() => {
                self.$post(self.$channelaccess + '/loan/anytimeRepaid/result',{applyId: res.returnData.applyId}).then(r =>{
                  if(r.returnCode == '000000'){
                    if (r.returnData[0].accptingState != '0' &&  r.returnData[0].accptingState != '3') {
                      clearInterval(timer)
                      loading.close()
                      self.sjshdkDialog = false
                      if (r.returnData[0].accptingState == '5' || r.returnData[0].accptingState == '7') {//i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' +
                        self.$alert( i18n.t('loanIncome.Response_information') +"：" + self.accptingState(r.returnData[0].accptingState) + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId + '<br/>' + i18n.t('loanIncome.Reason_for_failure') + r.returnData[0].finalApprovaDesc, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
                          dangerouslyUseHTMLString: true
                        });
                      } else {//i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' + 
                        self.$alert(i18n.t('loanIncome.Response_information') +"：" + self.accptingState(r.returnData[0].accptingState) + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
                          dangerouslyUseHTMLString: true
                        });
                      }
                    }
                  } else {
                    if (!dialigFlag) {
                      clearInterval(timer);
                      loading.close()
                      var str = `
                        <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${r.returnCode}</span></p>
                        <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${r.returnMsg}</span></p>
                      `
                      self.$alert(str, i18n.t('Prompt'), {
                        dangerouslyUseHTMLString: true
                      });
                      dialigFlag = true
                    }
                  }
                })
                f -= 1;
                if (f <= 0) {
                  clearInterval(timer);
                  loading.close()
                  self.$alert(i18n.t('loanIncome.System_timeout'), i18n.t('Prompt'), {
                    dangerouslyUseHTMLString: true
                  });
                }
              }, 1000)
              // self.sjshdkDialog = false
              // self.$alert(i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' + i18n.t('loanIncome.Response_information') +"：" + res.returnMsg + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
              //   dangerouslyUseHTMLString: true
              // });
            } else {
              loading.close()
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
                <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
              `
              self.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
            self.sjshflg = false
          }).catch(() => {
            this.$message.error({message: i18n.t('Unknown_mistake')})
            loading.close()
          });
        } else {
          return false;
        }
      })
    },
    // 单笔单批点击确定
    dbdpSure (formName) {
      let self = this
      if (parseFloat(self.dbdpdksqForm.applyAmount) > parseFloat(self.dbdpdksqForm.creditLimit)) {  // 申请金额不能大于授信金额
        self.$alert(i18n.t('loanIncome.The_amount_of_application_shall_not_be_greater_than_the_amount_of_advance_credit'), i18n.t('Prompt'), {
          dangerouslyUseHTMLString: true
        });
        return false;
      }
      self.dbdpdksqForm.coreCoreCustomerAddrs = [
        { "type": "1", "contactAddress": self.dbdpdksqForm.contactAddress1, "contactPostCode": self.dbdpdksqForm.contactPostCode1, "contactMobilePhone": self.dbdpdksqForm.contactMobilePhone1, "city": self.dbdpdksqForm.city1 },
        { "type": "2", "contactAddress": self.dbdpdksqForm.contactAddress2, "contactPostCode": self.dbdpdksqForm.contactPostCode2, "contactMobilePhone": self.dbdpdksqForm.contactMobilePhone2, "city": self.dbdpdksqForm.city2 }
      ];
      if (!self.dbdpdksqForm.contactAddress2 && !self.dbdpdksqForm.contactPostCode2 && !self.dbdpdksqForm.contactMobilePhone2 && !self.dbdpdksqForm.city2) {
        let arr = JSON.parse(JSON.stringify(self.dbdpdksqForm.coreCoreCustomerAddrs))
        self.dbdpdksqForm.coreCoreCustomerAddrs = []
        self.dbdpdksqForm.coreCoreCustomerAddrs.push(arr[0])
      }

      let obj = {
        "productNum": self.dbdpdksqForm.productNum,
        // "productName": self.dbdpdksqForm.productNum,
        "applyAmount": self.dbdpdksqForm.applyAmount,
        "currencyId": self.dbdpdksqForm.currencyId,
        // "currencyName": self.dbdpdksqForm.currencyName,
        "applyTermValue": self.dbdpdksqForm.applyTermValue,
        "executionInterestRate": self.dbdpdksqForm.executionInterestRate,
        "benchmarkInterestRate": self.dbdpdksqForm.benchmarkInterestRate,
        "idCardType": self.dbdpdksqForm.idCardType, // applyIdcardType==>idCardType
        // "applyIdcardTypeName": self.dbdpdksqForm.applyIdcardTypeName,
        "idCardNum": self.dbdpdksqForm.idCardNum, // applyIdcardTypeValue==>idCardNum
        "applyUserName": self.dbdpdksqForm.applyUserName,
        "applyUserSex": self.dbdpdksqForm.applyUserSex,
        "applyUserSexName": self.dbdpdksqForm.applyUserSexName,
        "applyUserPhoneNumber": self.dbdpdksqForm.applyUserPhoneNumber,
        // "applyUserBirth": self.dbdpdksqForm.applyUserBirth,
        "applyUserEducationId": self.dbdpdksqForm.applyUserEducationId,
        // "applyUserEducationIdName": self.dbdpdksqForm.applyUserEducationIdName,
        "coreCoreCustomerAddrs": self.dbdpdksqForm.coreCoreCustomerAddrs,
        "applyCompanyName": self.dbdpdksqForm.applyCompanyName,
        "payLoanDate": self.dbdpdksqForm.payLoanDate,
        "expireDate": self.dbdpdksqForm.expireDate,
        "firstRepayDate": self.dbdpdksqForm.firstRepayDate,
        "rateInd": self.dbdpdksqForm.rateInd,
        "receiveAccount": self.dbdpdksqForm.receiveAccount,
        "accountBankNo": self.dbdpdksqForm.accountBankNo,
        // "institutionId": self.dbdpdksqForm.institutionId,
        // "billday": self.dbdpdksqForm.billday,
        // "businessProgramNo": self.dbdpdksqForm.businessProgramNo,
        // "creditNodeNo": "020",
        "channelNo": "A001",
        "channelName": "手机",
        "legalPersonNum": self.$store.state.loginData.userLogin.legalPersonNum,
        "legalPersonName": self.$store.state.loginData.userLogin.legalPersonName,
        //"loanBankOrgNo": self.dbdpdksqForm.loanBankOrgNo,
        "applyUserMaritalStatusId": self.dbdpdksqForm.applyUserMaritalStatusId,
        // "applyUserMaritalStatusIdName": self.dbdpdksqForm.applyUserMaritalStatusIdName,
        "applyUserAnnualIncome": self.dbdpdksqForm.applyUserAnnualIncome,
        "applyCompanyPost": self.dbdpdksqForm.applyCompanyPost,
        "applyCompanyWitness": self.dbdpdksqForm.applyCompanyWitness,
        "applyCompanyTelephone": self.dbdpdksqForm.applyCompanyTelephone,
        "applyCompanyRelation": self.dbdpdksqForm.applyCompanyRelation,
        "applyRelatin": self.dbdpdksqForm.applyRelatin,
        "applyRelationName": self.dbdpdksqForm.applyRelationName,
        "applyRelationTelephone": self.dbdpdksqForm.applyRelationTelephone,
        // "coBrandedNo": self.dbdpdksqForm.coBrandedNo,
        // "mediaObjectCode": self.dbdpdksqForm.mediaObjectCode,
        //"mainSupplyIndicator": self.dbdpdksqForm.mainSupplyIndicator,
        // "mediaUserName": self.dbdpdksqForm.applyUserName,
        // "formatCode": self.dbdpdksqForm.formatCode,
        // "pricingTag": self.dbdpdksqForm.pricingTag,
        // "pricingObject": self.dbdpdksqForm.pricingObject,
        // "pricingObjectCode": self.dbdpdksqForm.pricingObjectCode,
        "repayMode": self.dbdpdksqForm.repayMode,
        "productObjectCode": self.dbdpdksqForm.productObjectCode,
        "remarkInfo": self.dbdpdksqForm.remarkInfo,
        "creditLimit": self.dbdpdksqForm.creditLimit,
        "applyUserEmail":self.dbdpdksqForm.applyUserEmail, 
			  "wechatNumber":self.dbdpdksqForm.wechatNumber, 
        "alipay":self.dbdpdksqForm.alipay,
        "branchNum": self.dbdpdksqForm.branchNum,
        "branchName": self.dbdpdksqForm.branchName,
        "monthSupplyPeriod": self.dbdpdksqForm.monthSupplyPeriod,
        "repaymentAccountBankNum": self.dbdpdksqForm.repaymentAccountBankNum,
        "applicationType": self.dbdpdksqForm.applicationType,
        // "embosserName1": self.dbdpdksqForm.embosserName1,
      }
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.dbdpflg = true
          const loading = self.$loading({
            lock: true,
            text: i18n.t('loanIncome.Desperately_approved'),
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255,0.7)'
          })
          self.$post(self.$channelaccess + '/loan/single/apply',obj).then(res =>{
            if(res.returnCode == '000000'){
              let f = 60
              let dialigFlag = false
              let timer = setInterval(() => {
                self.$post(self.$channelaccess + '/loan/single/result',{applyId: res.returnData.applyId}).then(r =>{
                  if(r.returnCode == '000000'){
                    if (r.returnData[0].accptingState != '0' &&  r.returnData[0].accptingState != '3') {
                      clearInterval(timer)
                      loading.close()
                      self.dbdpdkDialog = false
                      self.dbdpdksqStep.three = false
                      self.dbdpdksqStep.one = true;
                      self.dbdpdksqStep.two = false;
                      if (r.returnData[0].accptingState == '5' || r.returnData[0].accptingState == '7') {//i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' + 
                        self.$alert(i18n.t('loanIncome.Response_information') +"：" + self.accptingState(r.returnData[0].accptingState) + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId + '<br/>' + i18n.t('loanIncome.Reason_for_failure') + r.returnData[0].finalApprovaDesc, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
                          dangerouslyUseHTMLString: true
                        });
                      } else {//i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' + 
                        self.$alert(i18n.t('loanIncome.Response_information') +"：" + self.accptingState(r.returnData[0].accptingState) + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
                          dangerouslyUseHTMLString: true
                        });
                      }
                    }
                  } else {
                    if (!dialigFlag) {
                      clearInterval(timer);
                      loading.close()
                      var str = `
                        <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${r.returnCode}</span></p>
                        <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${r.returnMsg}</span></p>
                      `
                      self.$alert(str, i18n.t('Prompt'), {
                        dangerouslyUseHTMLString: true
                      });
                      dialigFlag = true
                    }
                  }
                })
                f -= 1;
                if (f <= 0) {
                  clearInterval(timer);
                  loading.close()
                  self.$alert(i18n.t('loanIncome.System_timeout'), i18n.t('Prompt'), {
                    dangerouslyUseHTMLString: true
                  });
                }
              }, 1000)
              // self.dbdpdksqStep.three = false
              // self.dbdpdksqStep.one = true;
              // self.dbdpdksqStep.two = false;
              // self.$alert(i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' + i18n.t('loanIncome.Response_information') +"：" + res.returnMsg + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
              //   dangerouslyUseHTMLString: true
              // });
            } else {
              loading.close()
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
                <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
              `
              self.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
            self.dbdpflg = false
          }).catch(() => {
            this.$message.error({message: '未知错误!'})
            loading.close()
          });
        } else {
          return false;
        }
      })
    },
    // 单笔单批点击下一步
    nextStep(formName) {
      let self = this
      let d = new Date()
      d = `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.dbdpdksqStep.two = false;
          self.dbdpdksqStep.three = true;
          if (self.$refs['dbdpdksqForm3']!==undefined) {
            self.$refs['dbdpdksqForm3'].resetFields()
          }
          setTimeout(() => {
            self.$refs['dbdpdksqForm3'].clearValidate('receiveAccount');
            self.$refs['dbdpdksqForm3'].clearValidate('accountBankNo');
            self.$refs['dbdpdksqForm3'].clearValidate('applyTermValue');
            self.$refs['dbdpdksqForm3'].clearValidate();
          }, 50)
          self.dbdpdksqForm.payLoanDate = d
          self.dbdpdksqForm.rateInd = '0'
        } else {
          return false;
        }
      })
    },
    // 单笔单批贷款申请按钮
    dbdpdksq (formName) {
      let self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$post(self.$xdapi + '/LoanPreCreditList',self.dbdpdksqForm).then(res =>{
            if(res.returnCode == '000000'){
              self.dbdpdksqStep.one = false;
              self.dbdpdksqStep.two = true;
              self.dbdpdksqForm.creditLimit = res.returnData.suggestAmount;
              if (self.$refs['dbdpdksqForm2']!==undefined) {
                self.$refs['dbdpdksqForm2'].resetFields()
              }
            } else {
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
                <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
              `
              self.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              self.dbdpdksqStep.one = false;
              self.dbdpdksqStep.two = true;
              self.dbdpdksqForm.creditLimit = res.returnData;
            }
          });
        } else {
          return false;
        }
      })
    },
    // 随借随还进度查询
    sjshjdQuery (formName) {
      let self = this
      if(!this.sjshjdForm.applyId && !this.sjshjdForm.idNum) {
        this.$alert(i18n.t('loanIncome.Please_enter_the_application_number_or_certificate_number'), i18n.t('Prompt'), { // 请输入申请编号或证件号码
          dangerouslyUseHTMLString: true
        });
        return;
      }
      if(!this.sjshjdForm.idType && this.sjshjdForm.idNum) {
        this.$alert(i18n.t('loanIncome.Please_select_the_type_of_certificate'), i18n.t('Prompt'), { // 请选择证件类型
          dangerouslyUseHTMLString: true
        });
        return;
      }
      if (this.sjshjdForm.idNum && (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.sjshjdForm.idNum))) {
        this.$alert(i18n.t('loanIncome.Please_enter_the_correct_ID_number'), i18n.t('Prompt'), { // 请输入正确的证件号码
          dangerouslyUseHTMLString: true
        });
        return;
      }
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$post(self.$channelaccess + '/loan/anytimeRepaid/result',self.sjshjdForm).then(res =>{
            if(res.returnCode == '000000'){
              self.sjshjdtableData = res.returnData
              // if (this.dbdpjdForm.applyId) {
              //   self.dbdpjdtotalCount = 1
              // } else {
              //   self.dbdpjdtotalCount = res.total
              // }
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
      })
    },
    // 单笔单批进度查询
    dbdpjdQuery (formName) {
      let self = this
      if(!this.dbdpjdForm.applyId && !this.dbdpjdForm.idNum) {
        this.$alert(i18n.t('loanIncome.Please_enter_the_application_number_or_certificate_number'), i18n.t('Prompt'), { // 请输入申请编号或证件号码
          dangerouslyUseHTMLString: true
        });
        return;
      }
      if(!this.dbdpjdForm.idType && this.dbdpjdForm.idNum) {
        this.$alert(i18n.t('loanIncome.Please_select_the_type_of_certificate'), i18n.t('Prompt'), { // 请选择证件类型
          dangerouslyUseHTMLString: true
        });
        return;
      }
      if (this.dbdpjdForm.idNum && (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.dbdpjdForm.idNum))) {
        this.$alert(i18n.t('loanIncome.Please_enter_the_correct_ID_number'), i18n.t('Prompt'), { // 请输入正确的证件号码
          dangerouslyUseHTMLString: true
        });
        return;
      }
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$post(self.$channelaccess + '/loan/single/result',self.dbdpjdForm).then(res =>{
            if(res.returnCode == '000000'){
              self.dbdpjdtableData = res.returnData
              // if (this.dbdpjdForm.applyId) {
              //   self.dbdpjdtotalCount = 1
              // } else {
              //   self.dbdpjdtotalCount = res.total
              // }
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
      })
    },
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '消贷模拟进件'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 随借随还点击确定切换分页
    sjshjdgoPageSure () {
      if (this.obj.goPage) {
        var mc=Math.ceil(this.totalCount/this.obj.pageSize);
        if (this.obj.goPage) {
          if(this.obj.goPage>0&&this.obj.goPage<=mc){
            this.obj.pageIndex = parseInt(this.obj.goPage)
          }else{
            this.obj.pageIndex = parseInt(mc)
          }
        }
        // this.display()
        this.obj.goPage = null
      }
    },
    //改变每页显示多少条
    sjshjdhandleSizeChange(val) {
      this.obj.pageSize =  val;
      this.obj.pageIndex = 1
      // this.display();
    },
    //选择页数改变数据
    sjshjdhandleCurrentChange(val) {
      this.obj.pageIndex =val;
      // this.display();
    },
    // 单笔单批点击确定切换分页
    dbdpjdgoPageSure () {
      if (this.obj.goPage) {
        var mc=Math.ceil(this.totalCount/this.obj.pageSize);
        if (this.obj.goPage) {
          if(this.obj.goPage>0&&this.obj.goPage<=mc){
            this.obj.pageIndex = parseInt(this.obj.goPage)
          }else{
            this.obj.pageIndex = parseInt(mc)
          }
        }
        // this.display()
        this.obj.goPage = null
      }
    },
    //改变每页显示多少条
    dbdpjdhandleSizeChange(val) {
      this.obj.pageSize =  val;
      this.obj.pageIndex = 1
      // this.display();
    },
    //选择页数改变数据
    dbdpjdhandleCurrentChange(val) {
      this.obj.pageIndex =val;
      // this.display();
    },
    accptingState (val) {
      if(val=="0"){
        return i18n.t('loanIncome.Acceptance'); // 受理
      }else if(val=="1"){
        return i18n.t('loanIncome.Automated_rejection_of_approval');// 自动审批拒绝
      }else if(val=="2"){
        return i18n.t('loanIncome.Automatic_manual_transfer');// 自动转人工
      }else if(val=="3"){
        return i18n.t('loanIncome.Automated_approval');// 自动审批通过
      }else if(val=="4"){
        return i18n.t('loanIncome.Successful_Establishment_of_Quota');// 建立额度成功
      }else if(val=="5"){
        return i18n.t('loanIncome.Loan_failure');// 放款失败
      }else if(val=="6"){
        return i18n.t('loanIncome.Successful_lending');// 放款成功
      }else if(val=="7"){
        return i18n.t('loanIncome.Failure_to_establish_a_quota');// 建立额度失败
      }else if(val=="8"){
        return i18n.t('loanIncome.Artificial_rejection');// 人工拒绝
      }else if(val=="9"){
        return i18n.t('loanIncome.Manual_Approval');// 人工审批中
      }
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
    },
    accptingState (val) {
      if(val=="0"){
        return i18n.t('loanIncome.Acceptance'); // 受理
      }else if(val=="1"){
        return i18n.t('loanIncome.Automated_rejection_of_approval');// 自动审批拒绝
      }else if(val=="2"){
        return i18n.t('loanIncome.Automatic_manual_transfer');// 自动转人工
      }else if(val=="3"){
        return i18n.t('loanIncome.Automated_approval');// 自动审批通过
      }else if(val=="4"){
        return i18n.t('loanIncome.Successful_Establishment_of_Quota');// 建立额度成功
      }else if(val=="5"){
        return i18n.t('loanIncome.Loan_failure');// 放款失败
      }else if(val=="6"){
        return i18n.t('loanIncome.Successful_lending');// 放款成功
      }else if(val=="7"){
        return i18n.t('loanIncome.Failure_to_establish_a_quota');// 建立额度失败
      }else if(val=="8"){
        return i18n.t('loanIncome.Artificial_rejection');// 人工拒绝
      }else if(val=="9"){
        return i18n.t('loanIncome.Manual_Approval');// 人工审批中
      }
    }
  }
}
</script>

<style  lang='scss' scoped="scoped">
#contract_content{
  .btn {
    margin-top: 100px;
    div{
      text-align: center;
      a{
        padding: 50px 50px;
        font-size: 25px;
        width: 250px;
        background-color: rgb(64, 158, 255);
        color: rgb(255, 255, 255);
        display: inline-block;
        text-align: center;
        cursor: pointer;
        margin: 20px auto 0;
        &:nth-child(2n+1) {
          margin-right: 10px;
        }
        &:nth-child(2n) {
          margin-left: 10px;
        }
        &:hover{
          color: rgb(64, 158, 255);
          background-color: rgb(236, 245, 255);
          border-color: rgb(198, 226, 255);
        }
      }
    }
  }
}
.el-upload__tip{
  margin-top: 0;
  margin-left: 10px;
}
</style>

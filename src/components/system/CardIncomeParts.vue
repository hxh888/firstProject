<template>
    <!-- 信用卡模拟进件 -->
  <div class="content_box" id="card_content">
    <div class="btn">
      <div>
        <a @click="cardSqDialog = true" v-if="funList.indexOf('信用卡申请')>-1" v-html="$t('loanIncome.Credit_card_application')"></a><!-- 信用卡申请 -->
        <a @click="cardSqjdDialog = true" v-if="funList.indexOf('信用卡进度查询')>-1">{{$t('loanIncome.Credit_card_application_progress_inquiry')}}</a><!-- 信用卡申请进度查询 -->
      </div>
    </div>
    <el-dialog :title="$t('loanIncome.Credit_card_application1')" :visible.sync="cardSqDialog" :close-on-click-modal="false"  :before-close="cancel" width="90%">  <!-- 信用卡申请 -->
        <el-form :model="cardSqForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="cardSqForm" :rules="$rules.cardSq" label-width="120px" size="small"   >
          <el-row v-show="cardSqStep == 1">
            <h4>{{$t('loanIncome.Customer_Information')}}</h4><!-- 客户信息 -->
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Name_of_applicant')" prop="applyUserName" >   <!-- 客户姓名 -->
                <el-input type="text"  v-model="cardSqForm.applyUserName" ></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Sex_of_applicant')" prop="applyUserSex">   <!-- 申请人性别 -->
                  <el-select v-model="cardSqForm.applyUserSex"  style="width: 100%;" placeholder="">
                      <!-- <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option>请选择 -->
                      <el-option label="女" value="1"></el-option>
                      <el-option label="男" value="2"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Document_type')" prop="idCardType" placeholder="">   <!-- 证件类型 -->
                 <el-select v-model="cardSqForm.idCardType"  style="width: 100%;">
                      <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option><!-- 请选择 -->
                      <el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                  </el-select>
              </el-form-item>
            </el-col>	
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Identification_Number')"  prop="idCardNum">   <!-- 证件号码 -->
                <el-input type="text"  v-model="cardSqForm.idCardNum"></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Phone_number')" prop="applyUserPhoneNumber" >   <!-- 手机号码 -->
                <el-input type="text"  v-model="cardSqForm.applyUserPhoneNumber" ></el-input >
              </el-form-item>
            </el-col>	
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Highest_educational_background')" prop="applyUserEducationId">   <!-- 学历 -->
                  <el-select v-model="cardSqForm.applyUserEducationId" style="width: 100%;" placeholder="">
                      <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option><!-- 请选择 -->
                      <el-option v-for="item in educationTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.City_of_Family')" prop="city1" >   <!-- 家庭所在城市 -->
                  <el-select v-model="cardSqForm.city1" style="width: 100%;" placeholder="">
                      <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option><!-- 请选择 -->
                      <el-option label="上海" value="上海">上海</el-option>
                      <el-option label="其他" value="其他">其他</el-option>
                  </el-select>
                </el-form-item>
              </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.Family_address')"  prop="contactAddress1">   <!-- 家庭地址 -->
                  <el-input type="text"  v-model="cardSqForm.contactAddress1" ></el-input >
                </el-form-item>
              </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.Home_Address_Zip_Code')" prop="contactPostCode1">   <!-- 家庭地址邮编 -->
                  <el-input type="text"  v-model="cardSqForm.contactPostCode1" ></el-input >
                </el-form-item>
            </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.Home_phone')"  prop="contactMobilePhone1">   <!-- 家庭电话 -->
                  <el-input type="text"  v-model="cardSqForm.contactMobilePhone1" ></el-input >
                </el-form-item>
              </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.City_where_the_company_is_located')">   <!-- 公司所在城市 -->
                  <el-select v-model="cardSqForm.city2" style="width: 100%;" @change="cardChange(cardSqForm.city2)" placeholder="">
                        <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option><!-- 请选择 -->
                        <el-option label="上海" value="上海">上海</el-option>
                        <el-option label="其他" value="其他">其他</el-option>
                  </el-select>
                </el-form-item>
              </el-col>	
            <el-col :span="8" v-if="cardSqForm.city2" >
                <el-form-item :label="$t('loanIncome.Company_address')" :prop="cardSqForm.city2 ? 'contactAddress2' : ''">   <!-- 公司地址 -->
                  <el-input type="text"  v-model="cardSqForm.contactAddress2" ></el-input >
                </el-form-item>
            </el-col>
            <el-col :span="8" v-if="cardSqForm.city2">
                <el-form-item :label="$t('loanIncome.Company_Address_Zip_code')" :prop="cardSqForm.city2 ? 'contactPostCode2' : ''">   <!-- 公司地址邮编 -->
                  <el-input type="text"  v-model="cardSqForm.contactPostCode2" ></el-input >
                </el-form-item>
              </el-col>	
            <el-col :span="8" v-if="cardSqForm.city2">
                <el-form-item :label="$t('loanIncome.Company_Telephone')" :prop="cardSqForm.city2 ? 'contactMobilePhone2' : ''">   <!-- 公司电话 -->
                  <el-input type="text"  v-model="cardSqForm.contactMobilePhone2" ></el-input >
                </el-form-item>
              </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.Name_of_work_unit')">   <!-- 公司名称 -->
                  <el-input type="text"  v-model="cardSqForm.cCompanyName" ></el-input >
                </el-form-item>
            </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.Name_of_contact_person')">   <!-- 联系人姓名 -->
                  <el-input type="text"  v-model="cardSqForm.cLinkmanname" ></el-input >
                </el-form-item>
              </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.Relations_with_Contacts')">   <!-- 与联系人关系 -->
                  <el-input type="text"  v-model="cardSqForm.cLinkmanrelationship" ></el-input >
                </el-form-item>
              </el-col>	
            <el-col :span="8">
                <el-form-item :label="$t('loanIncome.Contact_telephone')">   <!-- 联系人电话 -->
                  <el-input type="text"  v-model="cardSqForm.cLinkmanphone" ></el-input >
                </el-form-item>
            </el-col>	
            <el-col :span="24" align='right' class="mt20">
                  <el-button type="primary" @click="nextStep('cardSqForm')" size="small"  >{{$t('loanIncome.Next_step')}}</el-button><!-- 下一步 -->
            </el-col>	
          </el-row>
          
          <el-row v-if="cardSqStep == 2">
            <h4>{{$t('loanIncome.Basic_Product_Information')}}</h4><!-- 产品基本信息 -->
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Product_Name')" prop="productNum">   <!-- 产品名称 -->
                <el-select v-model="cardSqForm.productNum"  style="width: 100%;" placeholder=""> 
                      <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option><!-- 请选择 -->
                      <!-- <el-option label="标准VISA白金卡" value="MODP00001">标准VISA白金卡</el-option>
                      <el-option label="沃尔玛联名卡" value="MODP00050">沃尔玛联名卡</el-option> -->
                      <el-option v-for="item in productLists" :key="item.productCode" :value="item.productCode" :label="item.bizAllName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>	
            <!-- 币种名称 --><!-- 请选择 -->
            <!-- <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Name_of_currency')"   prop="currencycode">   
                <el-select v-model="cardSqForm.currencycode"  style="width: 100%;" >
                      <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option>
                      <el-option label="人民币" value="156">人民币</el-option>
                </el-select>
              </el-form-item>
            </el-col>	 -->
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Chinese_pinyin')" prop="embosserName1"><!-- 中文拼音 -->
                <el-input type="text"  v-model="cardSqForm.embosserName1" ></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('loanIncome.Main_Attached_Identification')"  prop="applicationType">   <!-- 主附标识 -->
                 <el-select v-model="cardSqForm.applicationType"  style="width: 100%;" @change="changeValue" placeholder="">
                      <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option><!-- 请选择 -->
                      <el-option label="主卡申请" value="1">单独申请主卡</el-option>
                      <el-option label="单独申请附属卡" value="2">单独申请附属卡</el-option>
                      <el-option label="主附同时申请" value="3">主附同时申请</el-option>
                      <el-option label="套卡" value="4">套卡</el-option>
                </el-select>
              </el-form-item>
            </el-col>	
            
            <!-- 主证件类型，主证件号码，机构编号，机构名称，套卡产品集合 -->
            <el-col v-if="cardSqForm.applicationType==2" :span="8">  <!-- 主证件类型 -->
              <el-form-item :label="$t('loanIncome.supIdType')" prop="supIdType"><!-- 主证件类型 -->
                <el-select v-model="cardSqForm.supIdType" style="width: 100%;" placeholder="">
                  <el-option value="" :label="$t('loanIncome.Please_choose')">请选择..</el-option><!-- 请选择 -->
                  <el-option value="1" label="身份证">身份证</el-option>
                  <el-option value="2" label="港澳居民来往内地通行证">港澳居民来往内地通行证</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="cardSqForm.applicationType==2" :span="8">  <!-- 主证件号码 -->
              <el-form-item :label="$t('loanIncome.supIdNumber')" prop="supIdNumber">
                 <el-input type="text"  v-model="cardSqForm.supIdNumber" ></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="8">  <!-- 机构编号 -->
              <el-form-item :label="$t('loanIncome.Institution_number')" prop="branchNum">
                 <el-input type="text"  v-model="cardSqForm.branchNum" ></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="8">  <!-- 机构名称 -->
              <el-form-item :label="$t('loanIncome.institution_name')" prop="branchName">
                 <el-input type="text"  v-model="cardSqForm.branchName" ></el-input >
              </el-form-item>
            </el-col>
            <!--主副卡同时申请 -->
            <div v-if="cardSqForm.applicationType == 3">  
                 <el-col :span="8">
                    <el-form-item :label="$t('loanIncome.Name_of_applicant_for_affiliated_card')" prop="supplementaryCardName" class="cplable" >   <!-- 附属卡申请人姓名 -->
                      <el-input type="text"  v-model="cardSqForm.supplementaryCardName" ></el-input >
                    </el-form-item>
                  </el-col>	
                  <el-col :span="8">
                    <el-form-item :label="$t('loanIncome.Subsidiary_Card_Applicant_Certificate_Type')"   prop="supplementaryCardIdType" class="cplable">   <!-- 附属卡申请人证件类型 -->
                      <el-select v-model="cardSqForm.supplementaryCardIdType"  style="width: 100%;" placeholder="">
                          <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option> <!-- 请选择 -->
                          <el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>	
                  <el-col :span="8">
                    <el-form-item :label="$t('loanIncome.Subsidiary_Card_Applicant_Certificate_Number')"  prop="supplementaryCardIdNum" class="cplable">   <!-- 附属卡申请人证件号码 -->
                      <el-input type="text"  v-model="cardSqForm.supplementaryCardIdNum" ></el-input >
                    </el-form-item>
                  </el-col>	
                  <el-col :span="8">
                    <el-form-item :label="$t('loanIncome.Subsidiary_Card_Applicant_Mobile_Phone_Number')"   prop="supplementaryCardPhone"  class="cplable">   <!-- 附属卡申请人手机号码 -->
                        <el-input type="text"  v-model="cardSqForm.supplementaryCardPhone" ></el-input >
                    </el-form-item>
                  </el-col>	
                  <el-col :span="8">
                    <el-form-item :label="$t('loanIncome.Relations_with_applicants_for_master_cards')"  prop="relationsWithMain"  class="cplable">   <!-- 与主卡申请人关系 -->
                        <el-input type="text"  v-model="cardSqForm.relationsWithMain" ></el-input >
                    </el-form-item>
                  </el-col>
            </div>

            <!-- 套卡 -->
            <el-col v-if="cardSqForm.applicationType==4" :span="8">  <!-- 产品名称2 -->
              <el-form-item :label="$t('loanIncome.productNum2')" prop="productNum2">
                <el-select v-model="cardSqForm.productNum2" style="width:100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value=""></el-option><!-- 请选择 -->
                  <el-option v-for="item in productLists" :key="item.productCode" :value="item.productCode" :label="item.bizAllName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24" align='right' class="mt20">
                  <el-button type="primary" @click="cardSqStep = 1" size="small">{{$t('loanIncome.The_last_step')}}</el-button><!-- 上一步 -->
                  <el-button type="primary" size="small"  @click="submitCardSq('cardSqForm')"  :disabled="checkDis">{{$t('loanIncome.Loan_application')}}</el-button><!-- 贷款申请 -->
            </el-col>	
          </el-row> 
        </el-form>
    </el-dialog>
    <el-dialog :title="$t('loanIncome.Credit_card_application_progress_inquiry')" :visible.sync="cardSqjdDialog" :close-on-click-modal="false" width="90%">  <!-- 信用卡申请进度查询 -->
      <el-form :model="cardSqjdForm"  ref="cardSqjdForm" :inline="true" size="small">
        <el-row class="edit_module_search">
          <el-col :span="24">
            <el-form-item :label="$t('loanIncome.Application_Number')" prop="applyId"> <!-- 申请编号 -->
              <el-input v-model="cardSqjdForm.applyId" class="input-with-select"></el-input> 
            </el-form-item>
            <el-form-item :label="$t('loanIncome.Document_type')" prop="idType"> <!-- 证件类型 -->
                <el-select v-model="cardSqjdForm.idType" style="width: 100%;" placeholder="">
                  <el-option :label="$t('loanIncome.Please_choose')" value="" ></el-option><!-- 请选择 -->
                  <el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                </el-select>
            </el-form-item> 
            <el-form-item :label="$t('loanIncome.Identification_Number')" prop="idNum"> <!-- 证件号码 -->
              <el-input v-model="cardSqjdForm.idNum" class="input-with-select"></el-input> 
            </el-form-item>
          </el-col>
          <el-col :span="24"  align='right'>
            <el-form-item >
              <el-button type="warning" icon="el-icon-search" @click="cardQuery('cardSqjdForm')">{{$t("Query")}}</el-button> <!-- 查询 -->  
            </el-form-item>
          </el-col>
        </el-row> 
      </el-form>
      <el-table :data="cardTableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
						<el-table-column prop="index" type="index"  :label="$t('Serial_number')" align="center" width="130px"></el-table-column><!-- 序号 -->
						<el-table-column prop="applyId" :label="$t('loanIncome.Application_Number')"  align="center"> </el-table-column><!-- 申请编号 -->
						<el-table-column prop="createTime" :label="$t('loanIncome.Application_time')"   align="center"> </el-table-column><!-- 申请时间 -->
						<el-table-column prop="accptingState" :label="$t('loanIncome.Examination_and_approval_status')" align="center" ><!-- 审批状态 -->

            </el-table-column>
				</el-table>
				<!-- <el-pagination @size-change="handleSizeChange" 
                      @current-change="handleCurrentChange" 
                      :current-page="cardSqjdForm.pageIndex" 
                      :page-sizes="[5, 10, 15]" 
                      :page-size="cardSqjdForm.pageSize" layout="prev, pager, next, sizes, total, slot" 
                      :total="totalCount">
					<template slot>
						<div class="slot_pag">
							<span>跳转至 </span>
							<el-input size="mini" v-model="cardSqjdForm.goPage" type="number">
								</el-input><span>页</span>
							<el-button  type="warning" @click="dbdpjdgoPageSure">确定</el-button>
						</div>
					</template>
				</el-pagination> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CardIncomeParts',
  data () {
    return {
      cardSqDialog: false, //信用卡弹窗
      cardSqjdDialog: false,//信用卡申请进度查询弹窗
      cardSqStep:1, //1 第一步 2是第二步
      checkDis:false,
      cardSqForm: {
          applyUserName:'佚名',
          applyUserSex:'1',
          idCardType:'1',
          idCardNum:'110101198201010015',
          applyUserPhoneNumber:'18511111111',
          applyUserEducationId:'1',
          city1:'上海',
          contactAddress1:'河北石家庄',
          contactPostCode1:'022222',
          contactMobilePhone1:'0021-61611124',
          productNum:'MODP00001',
          embosserName1:'',//中文拼音
          currencycode:'156',
          applicationType:'1',
          city2:'',
          contactAddress2:'',
          contactPostCode2:'',
          contactMobilePhone2:'',
          supIdType:"1",//主证件类型
          supIdNumber:"330801198808102374",//主证件号码
          branchNum:"100001",//机构编号
          branchName:"总行",//机构名称
          productNum2:"",
          supplementaryCardName:"",//附属卡申请姓名
          supplementaryCardIdType:"",//附属卡申请人证件类型
          supplementaryCardIdNum:"",//附属卡申请人证件号码
          supplementaryCardPhone:"",//附属卡申请人手机号码
          relationsWithMain: "",
          

      },
      cardTypeList: [],
      educationTypeList: [],
      cardSqjdForm: {
          applyId: '',
          idType: '',
          idNum: ''
      },
      totalCount:'',

      cardTableData:[],
      funList: [],
      productLists:[]
    }
  },
  mounted(){
    this.getFunList()
    this.getCardType()
    this.getEducationType()
    this.getProductLists()
  },
  
  methods:{
    getEducationType:function(){//获取学历参数列表
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'EDUCATION_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.educationTypeList =  res.returnData;
        }
      });
    },
    getCardType:function(){//证件类型列表
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'CARD_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.cardTypeList =  res.returnData;
        }
      });

    },
    // 下一步
    nextStep(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.cardSqStep = 2;
        } else {
          return false;
        }
      })
    },
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '信用卡模拟进件'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    getProductLists(){//产品名称列表
      let obj={
        productType:"CRD"
      }
      this.$post(this.$api +'/restProduct/findAll',obj).then(res=>{
        if(res.returnCode=='000000'){
          this.productLists=res.returnData
        }
      })
    },
    changeValue(){
      if(this.cardSqForm.applicationType=="3"){
          this.cardSqForm.supplementaryCardName="张勇"//附属卡申请姓名
          this.cardSqForm.supplementaryCardIdType="1"//附属卡申请人证件类型
          this.cardSqForm.supplementaryCardIdNum="110101199602180036"//附属卡申请人证件号码
          this.cardSqForm.supplementaryCardPhone="13898767883"//附属卡申请人手机号码
          this.cardSqForm.relationsWithMain="同事"
      }else{
          this.cardSqForm.supplementaryCardName=""//附属卡申请姓名
          this.cardSqForm.supplementaryCardIdType=""//附属卡申请人证件类型
          this.cardSqForm.supplementaryCardIdNum=""//附属卡申请人证件号码
          this.cardSqForm.supplementaryCardPhone=""//附属卡申请人手机号码
          this.cardSqForm.relationsWithMain=""
      }
    },
    // 公司所在城市改变清空公司地址信息
    cardChange(val) {
      if (!val) {
        this.cardSqForm.contactAddress2 = ''
        this.cardSqForm.contactPostCode2 = ''
        this.cardSqForm.contactMobilePhone2 = ''
      }
    },
    //信用卡申请进度查询
    cardQuery(formName){
        if(!this.cardSqjdForm.applyId && !this.cardSqjdForm.idNum) {
          this.$alert(i18n.t('loanIncome.Please_enter_the_application_number_or_certificate_number'), i18n.t('Prompt'), { // 请输入申请编号或证件号码
            dangerouslyUseHTMLString: true
          });
          return;
        }
        if(!this.cardSqjdForm.idType && this.cardSqjdForm.idNum) {
          this.$alert(i18n.t('loanIncome.Please_select_the_type_of_certificate'), i18n.t('Prompt'), { // 请选择证件类型！
            dangerouslyUseHTMLString: true
          });
          return;
        }
        if (this.cardSqjdForm.idNum && (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.cardSqjdForm.idNum))) {
          this.$alert(i18n.t('loanIncome.Please_enter_the_correct_ID_number'), i18n.t('Prompt'), {// 请输入正确的证件号码！
            dangerouslyUseHTMLString: true
          });
          return;
        }
  
        this.$post(this.$channelaccess + '/creditCard/result',this.cardSqjdForm).then(res =>{
          if(res.returnCode == '000000'){
            res.returnData.filter(item =>{
                if(item.accptingState == '0' ){
                  item.accptingState = i18n.t('loanIncome.Acceptance') // 受理
                }else if(item.accptingState == '1'){
                    item.accptingState = i18n.t('loanIncome.Automated_rejection_of_approval') // 自动审批拒绝
                }else if(item.accptingState == '2'){
                    item.accptingState = i18n.t('loanIncome.Automatic_manual_transfer') // 自动转人工
                }else if(item.accptingState == '3'){
                    item.accptingState = i18n.t('loanIncome.Automated_approval') // 自动审批通过
                }else if(item.accptingState == '4'){
                    item.accptingState = i18n.t('loanIncome.Successful_Establishment_of_Quota') // 建立额度成功
                }else if(item.accptingState == '5'){
                    item.accptingState = i18n.t('loanIncome.Loan_failure') // 放款失败
                }else if(item.accptingState == '6'){
                    item.accptingState = i18n.t('loanIncome.Successful_lending') // 放款成功
                }else if(item.accptingState == '7'){
                    item.accptingState = i18n.t('loanIncome.Failure_to_establish_a_quota') // 建立额度失败
                }else if(item.accptingState == '8'){
                    item.accptingState = i18n.t('loanIncome.Artificial_rejection') // 人工拒绝
                }else if(item.accptingState == '9'){
                    item.accptingState = i18n.t('loanIncome.Manual_Approval') // 人工审批中
                }
            })
            this.cardTableData = res.returnData
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
    //贷款申请
    submitCardSq (formName) {
      let self = this
      if (this.cardSqForm.applyUserSex == "1") {
        this.cardSqForm.applyUserSexName = "女";
      } else if (this.cardSqForm.applyUserSex == "2") {
        this.cardSqForm.applyUserSexName = "男";
      }

      if (this.cardSqForm.productNum == "MODP00001") {
        this.cardSqForm.productName = "标准VISA白金卡";
      } else if (this.cardSqForm.productNum == "MODP00050") {
        this.cardSqForm.productName = "沃尔玛联名卡";
      }
      var coreCoreCustomerAddrs = [];
      if(this.cardSqForm.contactAddress2 =='' && this.cardSqForm.contactPostCode2 =='' && this.cardSqForm.contactMobilePhone2 =='' && this.cardSqForm.city2 =='' ){
        coreCoreCustomerAddrs = [
          { "type": "1", "contactAddress":this.cardSqForm.contactAddress1, "contactPostCode": this.cardSqForm.contactPostCode1, "contactMobilePhone": this.cardSqForm.contactMobilePhone1, "city": this.cardSqForm.city1 },
        ];
      }else{
        coreCoreCustomerAddrs = [
          { "type": "1", "contactAddress":this.cardSqForm.contactAddress1, "contactPostCode": this.cardSqForm.contactPostCode1, "contactMobilePhone": this.cardSqForm.contactMobilePhone1, "city": this.cardSqForm.city1 },
          { "type": "2", "contactAddress":this.cardSqForm.contactAddress2, "contactPostCode": this.cardSqForm.contactPostCode2, "contactMobilePhone": this.cardSqForm.contactMobilePhone2, "city": this.cardSqForm.city2 }
        ];
      }
      var productList = [];
      if(this.cardSqForm.applicationType=='4'){
        if(this.cardSqForm.productNum != this.cardSqForm.productNum2){
          productList.push({"productNum":this.cardSqForm.productNum2, "currencyCode":'156'});
        }else{
          this.$alert(i18n.t('loanIncome.tksq'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
        }
      }
      let obj = {
        "legalPersonNum": this.$store.state.loginData.userLogin.legalPersonNum,
        "legalPersonName": this.$store.state.loginData.userLogin.legalPersonName,
        "applyId": '',  //?
        "channelNo": "A003",
        "channelName": "手机", //渠道名称
        "applyUserName": this.cardSqForm.applyUserName,
        "idCardType": this.cardSqForm.idCardType,
        "idCardNum": this.cardSqForm.idCardNum,
        "applyUserPhoneNumber": this.cardSqForm.applyUserPhoneNumber,
        "applyUserEducationId": this.cardSqForm.applyUserEducationId,
        "cCompanyName": this.cardSqForm.cCompanyName, //公司名称
        "cLinkmanname": this.cardSqForm.cLinkmanname, //联系人姓名
        "cLinkmanrelationship": this.cardSqForm.cLinkmanrelationship, //与联系人关系
        "cLinkmanphone": this.cardSqForm.cLinkmanphone, //联系人电话
        "productNum": this.cardSqForm.productNum, //产品名称
        "embosserName1":this.cardSqForm.embosserName1,//中文拼音
        "productName": this.cardSqForm.productName, //产品名称 页面没有
        "applicationType": this.cardSqForm.applicationType, //主副卡标识
        "billday":'', //账单日
        "coreCoreCustomerAddrs": coreCoreCustomerAddrs, //地址
        "supplementaryCardName": this.cardSqForm.supplementaryCardName, //附属卡申请人姓名
        "supplementaryCardIdType": this.cardSqForm.supplementaryCardIdType,
        "supplementaryCardIdNum": this.cardSqForm.supplementaryCardIdNum,
        "supplementaryCardPhone": this.cardSqForm.supplementaryCardPhone, 
        "relationsWithMain": this.cardSqForm.relationsWithMain, 
        // "institutionid": '100010001', //机构号
        // "productobjectcode": 'MODP00020', //产品对象代码
        // "cobrandedno": '', //产品对象代码  ?
        // "mediaobjectcode": 'MODM00001', 
        // "formatcode": '',  //卡版代码 ？
        // "creditnodeno": '003',  //额度节点编号 
        "currencyId": this.cardSqForm.currencycode,  //授信币种 
        "currencyCode": "156",
        "applyUserSex": this.cardSqForm.applyUserSex,  //申请人性别代码
        // "applyUserSexName":this.cardSqForm.applyUserSexName,  //申请人性别名称
        "cPosition":'',  //职务
        "supIdType":this.cardSqForm.supIdType,//主证件类型
        "supIdNumber":this.cardSqForm.supIdNumber,//主证件号码
        "branchNum":this.cardSqForm.branchNum,//机构编号
        "branchName":this.cardSqForm.branchName,//机构名称
        "productList":productList
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.checkDis=true;
            const loading = self.$loading({
              lock: true,
              text: i18n.t('loanIncome.Desperately_approved'),
              spinner: 'el-icon-loading',
              background: 'rgba(255,255,255,0.7)'
            })
            this.$post(this.$channelaccess + '/creditCard/apply',obj).then(res =>{
              this.checkDis=false;
            if(res.returnCode == '000000'){
              let f = 60
              let dialigFlag = false
              let timer = setInterval(() => {
                self.$post(self.$channelaccess + '/creditCard/result',{applyId: res.returnData.applyId}).then(r =>{
                  if(r.returnCode == '000000'){
                    if (r.returnData[0].accptingState != '0' &&  r.returnData[0].accptingState != '3') {
                      clearInterval(timer)
                      loading.close()
                      self.cardSqDialog = false;
                      self.cardSqStep = 1;
                      if (r.returnData[0].accptingState == '5' || r.returnData[0].accptingState == '7') {//i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' +
                        self.$alert( i18n.t('loanIncome.Response_information') +"：" + self.accptingState(r.returnData[0].accptingState) + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId + '<br/>' + i18n.t('loanIncome.Reason_for_failure') + r.returnData[0].finalApprovaDesc, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
                          dangerouslyUseHTMLString: true,
                          callback:action =>{
                            self.cancel();
                          }
                        });
                      } else {//i18n.t('loanIncome.Response_State_Code') + '：' + res.returnCode + '<br/>' + 
                        self.$alert(i18n.t('loanIncome.Response_information') +"：" + self.accptingState(r.returnData[0].accptingState) + '<br/>' + i18n.t('loanIncome.Application_Number') + '：' + res.returnData.applyId, i18n.t('Prompt'), {// 响应状态码 响应信息 申请件编号
                          dangerouslyUseHTMLString: true,
                          callback:action =>{
                            self.cancel();
                          }
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
              // this.$alert(i18n.t('loanIncome.Response_State_Code')+":" + res.returnCode + "</br>" + i18n.t('loanIncome.Response_information') +":" + res.returnMsg +"</br>"+ i18n.t('loanIncome.Application_Number')+":" + res.returnData.applyId, i18n.t('Prompt'), { // 响应状态码 响应信息 申请件编号
              //   dangerouslyUseHTMLString: true
              // });
              // this.cardSqDialog = false;
              // this.cardSqStep = 1;
            } else {
              loading.close()
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
                <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
              `
              this.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              this.cardSqDialog = false;
              this.cardSqStep = 1;
            }
          }).catch(() => {
            this.$message.error({message: i18n.t('Unknown_mistake')})
            loading.close()
          });
        } else {
          return false;
        }
      })

    },
    
    // //改变每页显示多少条
    // sjshjdhandleSizeChange(val) {
    //   this.obj.pageSize =  val;
    //   // this.display();
    // },
    // //选择页数改变数据
    // sjshjdhandleCurrentChange(val) {
    //   this.obj.pageIndex =val;
    //   // this.display();
    // },
    // dbdpjdgoPageSure () {
    //   if (this.obj.goPage) {
    //     var mc=Math.ceil(this.totalCount/this.obj.pageSize);
    //     if (this.obj.goPage) {
    //       if(this.obj.goPage>0&&this.obj.goPage<=mc){
    //         this.obj.pageIndex = parseInt(this.obj.goPage)
    //       }else{
    //         this.obj.pageIndex = parseInt(mc)
    //       }
    //     }
    //     // this.display()
    //     this.obj.goPage = null
    //   }
    // },
    // //改变每页显示多少条
    // handleSizeChange(val) {
    //   this.obj.pageSize =  val;
    //   // this.display();
    // },
    // //选择页数改变数据
    // handleCurrentChange(val) {
    //   this.obj.pageIndex =val;
    //   // this.display();
    // },
    cancel(){
        this.cardSqDialog = false;
        if (this.$refs['cardSqForm']!==undefined) {
            this.$refs['cardSqForm'].resetFields();
        }
        this.cardSqStep = 1;

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
}
</script>
<style lang='scss'>
#card_content{
 .el-dialog__body{
      min-height: 300px;
  }
}
.cplable .el-form-item__content, .cplable .el-form-item__label {
    line-height: 18px;
}
</style>

<style  lang='scss' scoped="scoped">
#card_content{
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

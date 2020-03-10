<template>
  <div class="content_box" id="contract_content">
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row class="edit_module_search">
            <el-col :span="24">
              <el-form-item :label="$t('collection.Document_type')"> <!-- 证件类型 -->
                <el-select v-model="obj.idType" placeholder="">
                  <el-option :label="$t('collection.whole')" value="" ></el-option><!-- 全部 -->
                  <el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                </el-select>
              </el-form-item> 
              <el-form-item :label="$t('collection.Identification_Number')"> <!-- 证件号码 -->
                <el-input v-model="obj.idNum"></el-input> 
              </el-form-item>  
              <el-form-item :label="$t('collection.Customer_Name')"> <!-- 客户姓名 -->
                <el-input v-model="obj.customName"></el-input> 
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<el-tabs v-model="state"> 
                <el-tab-pane :label="$t('collection.Registration_for_collection_has_been_completed')" name="3">
                    <template>
                      <el-table border
                        :data="tableData2"  size='small' style="width: 100%" :empty-text="$t('noData')">
                        <el-table-column type="index" align="center" :label="$t('Serial_number')" width="135px"></el-table-column>
                        <el-table-column prop="idType" :label="$t('collection.Document_type')" align="center" min-width="120px"><!-- 证件类型 -->
                          <template slot-scope="scope">
                            {{scope.row.idType | level(cardTypeList)}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="idNum" :label="$t('collection.Identification_Number')" align="center" min-width="160px"> </el-table-column><!-- 证件号码 -->
                        <el-table-column prop="customName" :label="$t('collection.Customer_Name')" align="center" min-width="120px"> </el-table-column><!-- 客户姓名 -->
                        <el-table-column prop="loanNo" :label="$t('collection.Debit_Number')" align="center" min-width="110px"> </el-table-column><!-- 借据编号 -->
                        <el-table-column prop="productName" :label="$t('collection.Product_Name')" align="center" min-width="115px"></el-table-column><!-- 产品名称 -->
                        <!-- <el-table-column prop="iousBalance" :label="$t('collection.Debit_balance')" align="center"  min-width="110px"> </el-table-column>借据余额 -->
                        <el-table-column prop="phone" :label="$t('collection.Contact_number')" align="center" min-width="120px"> </el-table-column><!-- 联系电话 -->
                        <el-table-column :label="$t('Operation')" width="200px" align="center" v-if="funList.indexOf('查看') > -1" min-width="105px">
                          <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="seeItem(scope.row)">{{$t('See')}}</el-button>
                          </template>
                        </el-table-column>

                      </el-table>
                    </template>

                    <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page="obj.pageNo"
                      :page-size="obj.pageSize"
                      layout="prev, pager, next, slot"
                      :total="totalCount">
                      <template slot>
                            <div class="slot_pag">
                              <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange" style="width:auto">  <!-- 10条/页 -->
                                  <el-option :value="5" :label="'5'+$t('size')"></el-option>
                                  <el-option :value="10" :label="'10'+$t('size')"></el-option>
                                  <el-option :value="15" :label="'15'+$t('size')"></el-option>
                              </el-select>
                              <span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
                              <span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
                              <el-input size="mini" v-model="obj.goPage" type="number">
                                  </el-input><span>{{$t('Pag')}}</span><!-- 页 -->
                              <el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button>
                            </div>
                      </template>
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>  
	</div>
		<!--弹框页面开始-->
		<!--新增弹框页面开始-->
    <el-dialog :title="addForm.flag ? $t('See') : $t('collection.Registration_of_Collection_Processing')" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false" width="800px"> 
      	<el-form :model="addForm"  ref="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
        <el-row>
            <el-col :span="24">
                <h5>{{$t('collection.Basic_customer_information')}}</h5><!-- 客户基本信息 -->
            </el-col>
        </el-row>
		<el-row class="edit_module_search">
          <el-col :span="12">
              <el-form-item :label="$t('collection.Customer_Name')"> <!-- 客户名称 -->
                <el-input v-model="userForm.customName" disabled></el-input>
              </el-form-item>
          </el-col>		
          <el-col :span="12">  
                <el-form-item :label="$t('collection.Document_type')">   <!-- 证件类型 -->
                    <el-select v-model="userForm.idType" style="width: 100%;" disabled placeholder="">
                        <el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                    </el-select>
                </el-form-item>
          </el-col>	

          <el-col :span="12">
                <el-form-item :label="$t('collection.Identification_Number')">   <!-- 证件号码 -->
                  <el-input type="text" v-model="userForm.idNum" disabled></el-input>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12">
                <el-form-item :label="$t('collection.Mobile_phone')">   <!-- 移动电话 -->
                  <el-input type="text" v-model="userForm.phone" disabled></el-input>
                </el-form-item>
          </el-col>		

          <el-col :span="24">
                <el-form-item :label="$t('collection.Contact_address')">   <!-- 联系地址 -->
                  <el-input type="text" v-model="userForm.address" disabled></el-input>
                </el-form-item>
          </el-col>	
        </el-row> 
        <el-row v-if="!addForm.flag">
            <el-col :span="24">
                <h5>{{$t('collection.Call_for_registration')}}</h5><!-- 催收登记 -->
            </el-col>
        </el-row>
        <el-row class="edit_module_search" v-if="!addForm.flag">
          <el-col :span="12">
              <el-form-item :label="$t('collection.Subordinate_institutions')"> <!-- 所属机构 -->
                <el-cascader :options="options" :show-all-levels="false" change-on-select v-model="userForm.branchId" style="width: 100%;" disabled></el-cascader>
              </el-form-item>
          </el-col>		
          <el-col :span="12">  
                <el-form-item :label="$t('collection.Receiver')"> <!-- 催收人 -->
                    <el-input v-model="userForm.csr" disabled></el-input>
                </el-form-item>
          </el-col>	

          <el-col :span="12">
                <el-form-item :label="$t('collection.Collection_method')">   <!-- 催收方式 -->   
                    <el-select v-model="addForm.collectType" style="width: 100%" placeholder="">
                      <el-option :label="$t('collection.Please_choose')" value="" ></el-option><!-- 请选择 -->
                      <el-option v-for="item in collectTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                    </el-select>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12">
                <el-form-item :label="$t('collection.Date_of_implementation')" >   <!-- 执行日期 --> 
                  <el-date-picker v-model="addForm.executeDate" type="date" style="width:100%" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
          </el-col>		
        
          <el-col :span="12">
                <el-form-item :label="$t('collection.Collection_conclusion')" >   <!-- 催收结论 -->
                    <el-select v-model="addForm.collectConclusion" style="width: 100%;" @change="collectConclusionChange" placeholder="">
                        <el-option :label="$t('collection.Please_choose')" value="" ></el-option>
                        <el-option v-for="item in collectConclusionList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                    </el-select>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12" v-if="addForm.collectConclusion == '0'">
                <el-form-item :label="$t('collection.Date_of_Commitment_to_Payment')" >   <!-- 承诺还款日期 --> 
                  <el-date-picker v-model="addForm.promiseRepayDate" type="date" style="width:100%" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
          </el-col>		

          <el-col :span="12" v-if="addForm.collectConclusion == '0'">  
                <el-form-item :label="$t('collection.Amount_of_promised_repayment')" > <!-- 承诺还款金额 --> 
                    <el-input v-model="addForm.promiseRepayAmount"></el-input>
                </el-form-item>
          </el-col>	

          <el-col :span="24">
                <el-form-item :label="$t('collection.Explanation_of_collection_conclusion')" prop="collectConclusionRemark">   <!-- 催收结论说明 -->
                  <el-input type="textarea" v-model="addForm.collectConclusionRemark" ></el-input>
                </el-form-item>
          </el-col>	
        </el-row> 
        <el-row>
            <el-col :span="24">
                <h5>{{$t('collection.Receiving_History')}}</h5><!-- 催收历史 -->
            </el-col>
        </el-row>
        <el-row>
            <el-table border
            :data="userForm.collectHisRows"  size='small' style="width: 100%" max-height="250" :empty-text="$t('noData')">
                <el-table-column prop="executeDate" :label="$t('collection.Date_of_implementation')" align="center" min-width="167px"><!-- 执行日期 -->
                  <template slot-scope="scope">{{scope.row.executeDate ? scope.row.executeDate.split('.')[0].split('T')[0] : ''}}</template>
                </el-table-column>
                <el-table-column prop="collectType" :label="$t('collection.Collection_method')" align="center" min-width="140px"><!-- 催收方式 -->
                  <template slot-scope="scope">
                    {{scope.row.collectType | level(collectTypeList)}}
                  </template>
                </el-table-column>
                <el-table-column prop="iousNo" :label="$t('collection.Debit_Number')" align="center" min-width="110px"> </el-table-column><!-- 借据编号 -->
                
                <el-table-column prop="collectConclusion" :label="$t('collection.Collection_conclusion')" align="center" min-width="155px"><!-- 催收结论 -->
                  <template slot-scope="scope">
                    {{scope.row.collectConclusion | level(collectConclusionList)}}
                  </template>
                </el-table-column>
                <el-table-column prop="promiseRepayDate" :label="$t('collection.Date_of_Commitment_to_Payment')" align="center" min-width="225px"><!-- 承诺还款日期 -->
                  <template slot-scope="scope">{{scope.row.promiseRepayDate ? scope.row.promiseRepayDate.split('.')[0].split('T')[0] : ''}}</template>
                </el-table-column>
                <el-table-column prop="collectPerson" :label="$t('collection.Receiver')" align="center" min-width="80px"></el-table-column><!-- 催收人 -->
                <el-table-column prop="collectConclusionRemark" :label="$t('collection.Explanation_of_collection_conclusion')" align="center" min-width="250px"> </el-table-column><!-- 催收结论说明 -->
            </el-table>
        </el-row>
      </el-form>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="cancels">返回</el-button> -->
            <el-button type="primary" @click="sure('addForm')" v-if="!addForm.flag">{{$t('Save')}}</el-button>
          </div>
      </el-dialog>
    <!--新增弹框页面结束-->
		
	

  </div>
</template>

<script>
export default {
  name: 'CollectionDone',
  data () {
    var isCardNo  = (rule, value, callback) =>{
      if (this.addForm.idCardType == 1) {
        if (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
          callback(new Error(i18n.t('collection.Please_enter_the_correct_ID_number')));
        } else {
          callback();
        }
      } else {
        callback();
      }
      // if (!value) {
      //   callback(new Error('合同模板名称不能为空'));
      // } else {
      //   if (!this.addForm.edit) {
      //     this.$post(this.$api + '/contract/contractNameIsHave',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum, contractName: this.addForm.contractName}).then(res =>{
      //       if (res.returnCode == '000000') {
      //         callback();
      //       } else {
      //         callback(new Error('合同模板名称已存在'));
      //       }
      //     });
      //   } else {
      //     callback();
      //   }
      // }
    }
    return {
      tableData1: [],  //user 列表数据
      tableData2: [],
      obj: {
        pageSize:10,//一页显示几条数据
        indexNo:1,  //需要传过去的参数
        idNum: '',
        // legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        customName: '',
        loanNo: '',
        goPage: null,
        taskStatus: '',
        idType: ''
      },
      state: '3',
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      addUserDialog:false,  //弹框	
      levelList: [],
      addForm:{
        taskNo: '',
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        collectType: '',
        executeDate: '',
        collectConclusion: '',
        promiseRepayDate: "",
        promiseRepayAmount: '',
        collectConclusionRemark: '',
        collectPerson: this.$store.state.loginData.userLogin.userName,
        flag:false,   //是否可输入 默认可以
        edit:false	 //编辑标识

      },
      userForm: {
        address: '',
        customName: '',
        idNum: '',
        idType: '',
        phone: '',
        csr: this.$store.state.loginData.userLogin.userName,
        collectHisRows: [],
        branchId: this.$store.state.loginData.userLogin.branchId
      },
      options: [],
      cardTypeList: [],
      collectTypeList: [],
      collectConclusionList: [],
	    rules:{
	    		listName: [
            { required: true, message: i18n.t('collection.Please_enter_your_name'), trigger: 'blur' },
            { pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('collection.Names_can_only_be_entered_in_Chinese_characters') },
            { max: 20, message: '长度不能超过20个字符', trigger: 'change' }
          ],
          collectType: [
            { required: true, message: i18n.t('collection.Please_choose_the_collection_method'), trigger: 'change' },
          ],
          promiseRepayAmount:[
            { required: true, message: i18n.t('collection.The_amount_of_promised_repayment_should_not_be_empty'), trigger: 'change' },
            { pattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: i18n.t('collection.The_format_of_the_amount_of_the_promised_repayment_is_incorrect') },
          ],
          promiseRepayDate: [
            { required: true, message: i18n.t('collection.Please_choose_the_promised_repayment_date'), trigger: 'change' },
          ],
          collectConclusion:[
            { required: true, message: i18n.t('collection.Please_choose_the_collection_conclusion'), trigger: 'change' },
          ],
          executeDate:[
          	{ required: true, message: i18n.t('collection.Please_select_the_execution_date'), trigger: 'change' },
          ],
	    },
		  funList: []
    }
  },
  mounted(){
    this.getCollectConclusion();
    this.getCardType()
    this.getCollectType()
    this.getFunList()
    this.display(); // 初始化数据
    this.selectBranch()
  },
  watch: {
    state () {
      this.display()
    }
  },
  methods:{
    // 切换催收结论时清空承诺还款日期和承诺还款金额
    collectConclusionChange () {
      this.addForm.promiseRepayDate = ''
      this.addForm.promiseRepayAmount = ''
    },
    // 获取机构列表
    selectBranch () {
      this.$post(this.$api + '/user/findBranch',{}).then(res =>{
        if(res.returnCode == '000000'){
          let str = String(res.returnData).replace(/id/g, 'value')
          this.options =  JSON.parse(str);
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
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '贷款催收登记已完成查询'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取催收方式列表
    getCollectType:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'COLLECT_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.collectTypeList =  res.returnData;
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
    // 获取催收结论列表
    getCollectConclusion:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'COLLECT_CONCLUSION'}).then(res =>{
        if(res.returnCode == '000000'){
          this.collectConclusionList =  res.returnData;
        }
      });

    },
    // 点击确定页码切换
    goPageSure () {
      if (this.obj.goPage) {
        var mc=Math.ceil(this.totalCount/this.obj.pageSize);
        if (this.obj.goPage) {
          if(this.obj.goPage>0&&this.obj.goPage<=mc){
            this.obj.indexNo = parseInt(this.obj.goPage)
          }else{
            this.obj.indexNo = parseInt(mc)
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
          let path = '/collect/register'
          
          this.$post(this.$afterloan + path,this.addForm).then(res =>{
            if(res.returnCode == '000000'){
              this.$alert(i18n.t('collection.Handling_Success'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              
              this.$refs[formName].resetFields();
              this.addUserDialog = false;
              this.addForm.flag=false;
              this.addForm.edit=false;
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
      if (this.state == 0) {
        this.obj.taskStatus = null
      } else {
        this.obj.taskStatus = 3
      }
      this.$post(this.$afterloan + '/collect/findList',this.obj).then(res =>{
        if(res.returnCode == '000000'){
          if (this.obj.taskStatus == 3) {
            this.tableData2 =  res.returnData.row;
          } else {
            this.tableData1 =  res.returnData.row;
          }
          this.totalCount = res.returnData.totalCount;
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
      this.obj.indexNo = 1;
      this.display()
    },
    //打开新增弹框
    openUserDiolog(){
      this.addUserDialog = true;
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.approveLimit = ''
      this.addForm.gradeLeavel = ''
      this.addForm.listName = ''
      this.addForm.listType = ''
      this.addForm.idCardType = ''
      this.addForm.idCardNum = ''
      this.addForm.explain = ''
      this.addForm.flag = false;
      this.getFrInfo()
    },
    // 查看
    seeItem (row) {
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = false;
      this.addForm.flag = true
      this.addForm.taskNo = row.taskNo
      setTimeout(function() {
        self.$post(self.$afterloan + '/collect/findDetail',{taskNo: row.taskNo, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum, collectPerson: self.$store.state.loginData.userLogin.loginId}).then(res =>{
          if(res.returnCode == '000000'){
            self.userForm.customName = res.returnData.customName
            self.userForm.idType = res.returnData.idType
            self.userForm.idNum = res.returnData.idNum
            self.userForm.idCardNum = res.returnData.idCardNum
            self.userForm.phone = res.returnData.phone
            self.userForm.address = res.returnData.address
            self.userForm.collectHisRows = res.returnData.collectHisRows
            // self.addForm.collectType = res.returnData.collectType
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
    // 修改
    editItem (row) {
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = true;
      this.addForm.taskNo = row.taskNo
      setTimeout(function() {
        self.$post(self.$afterloan + '/collect/findDetail',{taskNo: row.taskNo, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum, collectPerson: self.$store.state.loginData.userLogin.loginId}).then(res =>{
          if(res.returnCode == '000000'){
            self.userForm.customName = res.returnData.customName
            self.userForm.idType = res.returnData.idType
            self.userForm.idNum = res.returnData.idNum
            self.userForm.idCardNum = res.returnData.idCardNum
            self.userForm.phone = res.returnData.phone
            self.userForm.address = res.returnData.address
            self.userForm.collectHisRows = res.returnData.collectHisRows
            // self.addForm.collectType = res.returnData.collectType
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
    // 删除
    deleteItem(row){
      var _this =this;
      this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
        confirmButtonText: i18n.t('OK'),
        cancelButtonText: i18n.t('Cancel'),
        type: 'warning'
      }).then(() => {
        this.$post(this.$api + '/whiteBlack/deleteWhiteBlack',{listId: row.listId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(function(res){
          if(res.returnCode == '000000'){
            _this.display();
            _this.$alert(i18n.t('role.successful_deletion'), i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }else{
            var str = `
              <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
      this.obj.indexNo = 1
      this.display();
    },
    //选择页数改变数据
    handleCurrentChange(val) {
      this.obj.indexNo =val;
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
.el-select{
  width: 184px;
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

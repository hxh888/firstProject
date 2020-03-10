<template>
  <!-- 客户授信额度管理 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="24">
              <!-- 客户编号 -->
              <el-form-item :label="$t('customerQuota.customerNumber')"> 
                <el-input v-model="obj.customerNum" class="input-with-select"></el-input> 
              </el-form-item> 
              <!-- 客户名称 -->
              <el-form-item :label="$t('customerQuota.customerName')"> 
                <el-input v-model="obj.customerName" class="input-with-select"></el-input> 
              </el-form-item> 
              <!-- 额度状态 -->
              <el-form-item :label="$t('customerQuota.quotaStatus')"> 
                <!--<el-input v-model="obj.loanPeriod" class="input-with-select"></el-input>--> 
                <el-select v-model="obj.customerState" placeholder="">
                  <el-option :label="$t('product.whole')" value="" ></el-option>
                  <el-option v-for="item in statusList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                  <!--<el-option label="冻结" value="1"></el-option>
                  <el-option label="正常" value="2"></el-option>
                  <el-option label="终结" value="3"></el-option>-->
                </el-select>
              </el-form-item>  
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()"  size="small">{{$t("Add")}}</el-button>  <!-- 新增 v-if="funList.indexOf('新增') > -1"-->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
    	<div class="table_body">
      <!-- 客户授信额度管理列表 -->
			<h4>客户授信额度管理列表</h4>
			<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
				<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
				<el-table-column prop="customerNum" :label="$t('customerQuota.customerNumber')"   align="center" min-width="140px"><!--客户编号--></el-table-column>
				<el-table-column prop="customerName" :label="$t('customerQuota.customerName')" align="center" min-width="190px"> </el-table-column><!--客户名称	-->
				<el-table-column prop="limitType" :label="$t('customerQuota.quotaType')" align="center" min-width="90px"></el-table-column><!--额度类型	-->
		        <el-table-column prop="repeatType" :label="$t('customerQuota.cycleType')" align="center" min-width="95px">
		            <template slot-scope="scope">
		              {{scope.row.repeatType | level(erpeatList)}}
		            </template>
		        </el-table-column><!--循环类型-->
		        <el-table-column prop="creditLimit" :label="$t('customerQuota.maximumLimit')" align="center" min-width="90px">
		        	<template slot-scope="scope">
		        		{{scope.row.creditLimit.toFixed(2)}}
		        	</template>
		        </el-table-column><!--最大限额	-->
		        <el-table-column prop="availableLimit" :label="$t('customerQuota.surplusLimit')" align="center" min-width="90px">
		        	<template slot-scope="scope">
		        		{{scope.row.availableLimit.toFixed(2)}}
		        	</template>
		        </el-table-column><!--剩余限额	-->
		        <el-table-column prop="frozenLimit" :label="$t('customerQuota.freezingQuota')" align="center" min-width="90px">
		        	<template slot-scope="scope">
		        		{{scope.row.frozenLimit.toFixed(2)}}
		        	</template>
		        </el-table-column><!--冻结限额	-->
		        <el-table-column prop="currencyType" :label="$t('customerQuota.currency')" align="center" min-width="90px">
		        	<template slot-scope="scope">
		        		<!--<span v-if="scope.row.currencyType=='1'">人民币</span>
		              	<span v-if="scope.row.currencyType=='2'">美元</span>-->
		              	{{scope.row.currencyType | level(currencyList)}}
		        	</template>
		        </el-table-column><!--币种	-->
		        <el-table-column prop="beginDate" :label="$t('customerQuota.effectiveDate')" align="center" min-width="90px"></el-table-column><!--生效日	-->
		        <el-table-column prop="endDate" :label="$t('customerQuota.dueDate')" align="center" min-width="90px"></el-table-column><!--到期日	-->
		        <el-table-column prop="customerState" :label="$t('customerQuota.state')" align="center" min-width="90px">
		        	<template slot-scope="scope">
		        		<!--<span v-if="scope.row.customerState=='1'">冻结</span>
		                <span v-if="scope.row.customerState=='2'">正常</span>
		                <span v-if="scope.row.customerState=='3'">终结</span>-->
		                {{scope.row.customerState | level(statusList)}}
		        	</template>
		        </el-table-column><!--状态	-->
				<el-table-column label="操作" align="center" min-width="140px" ><!--操作	v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1"-->
					<template slot-scope="scope">
							<el-button size="mini" type="primary" class="search-btn" @click="editItem(scope.row)"><!--@click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1"-->
								<!--<i class="el-icon-s-help"></i>-->{{$t('customerQuota.edtz')}}
								<span class="text">{{$t('customerQuota.edtz')}}</span><!--额度调整-->
							</el-button>
        <el-button size="mini" class="edit-btn" @click="frozenItem(scope.row)" ><!--v-if="funList.indexOf('编辑') > -1"-->
								<!--<i class="el-icon-edit"></i>-->{{$t('customerQuota.eddj')}}
								<span class="text">{{$t('customerQuota.eddj')}}</span><!--额度冻结-->
							</el-button>
							<el-button size="mini" type="danger" class="delete-btn" @click="endItem(scope.row)"><!--@click="deleteItem(scope.row)" v-if="funList.indexOf('删除') > -1"-->
								<!--<i class="el-icon-delete"></i>-->{{$t('customerQuota.edzz')}}
								<span class="text">{{$t('customerQuota.edzz')}}</span><!--额度终止	-->
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
					<!-- 客户编号 -->
		            <el-form-item  :label="$t('customerQuota.customerNumber')"> 
		                <el-input v-model="addForm.customerNum" @input="getCustomerName()" :disabled="!addForm.add"></el-input>
		            </el-form-item>
				</el-col>
				<el-col :span="12">
					<!--客户名称-->
					<el-form-item :label="$t('customerQuota.customerName')"> 
		                <el-input v-model="addForm.customerName" disabled></el-input>
		            </el-form-item>
				</el-col>
				<!--除新增时有的 begin-->
				<el-col :span="12" v-if="!addForm.add">
					<!--授信合同编号-->
					<el-form-item :label="$t('customerQuota.creditContractNumber')"> 
		                <el-input v-model="addForm.creditContractNum" :disabled="!addForm.add"></el-input>
		            </el-form-item>
				</el-col>
				<el-col :span="12"  v-if="!addForm.add">
					<!--授信额度-->
					<el-form-item :label="$t('customerQuota.lineOfCredit')"> 
		                <el-input v-model="addForm.creditLimit" :disabled="!addForm.add"></el-input>
		            </el-form-item>
				</el-col>
				<el-col :span="12"  v-if="!addForm.add">
					<!--可用额度-->
					<el-form-item :label="$t('customerQuota.availableCredit')"> 
		                <el-input v-model="addForm.availableLimit" :disabled="!addForm.add"></el-input>
		            </el-form-item>
				</el-col>
				<el-col :span="12"  v-if="!addForm.add">
					<!--已使用额度-->
					<el-form-item :label="$t('customerQuota.usedQuota')"> 
		                <el-input v-model="addForm.alreadyUsedLimit" :disabled="!addForm.add"></el-input>
		            </el-form-item>
				</el-col>
				<!--编辑时有的 end-->
				<el-col :span="12">
		            <!-- 币种 -->
		            <el-form-item :label="$t('customerQuota.currency')" >
						<el-select v-model="addForm.currencyType" :disabled="!addForm.add">
							<el-option v-for="item in currencyList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
							<!--<el-option value="1">人民币</el-option>
							<el-option value="2">美元</el-option>-->
						</el-select>
					</el-form-item>
		        </el-col>	
		        <el-col :span="12">
		        	<!--生效日-->
		        	<el-form-item :label="$t('customerQuota.effectiveDate')"> 
		                <!--<el-input type="" v-model="addForm.beginDate" ></el-input>-->
		                <el-date-picker
					      v-model="addForm.beginDate"
					      type="date"
					      placeholder="选择日期时间" 
					      :disabled="!addForm.add">
					    </el-date-picker>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12">
		        	<!--到期日-->
		        	<el-form-item :label="$t('customerQuota.dueDate')"> 
		                <!--<el-input v-model="addForm.endDate" ></el-input>-->
		                <el-date-picker
					      v-model="addForm.endDate"
					      type="date"
					      placeholder="选择日期时间" 
					      :disabled="!addForm.add">
					    </el-date-picker>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12">
		        	<!--状态-->
		        	<el-form-item :label="$t('customerQuota.state')"> 
		                <!--<el-input v-model="addForm.customerState" ></el-input>-->
		                <el-select v-model="addForm.customerState"  disabled>
		                  <!--<el-option v-for="item in loanList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>-->
		                  <el-option label="冻结" value="1"></el-option>
		                  <el-option label="正常" value="2"></el-option>
		                  <el-option label="终结" value="3"></el-option>
		                </el-select>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12" v-if="addForm.add">
		        	<!--额度 只有新增时显示 必填-->
		        	<el-form-item :label="$t('customerQuota.statusLimit')" prop="creditLimit"> 
		                <el-input v-model="addForm.creditLimit" ></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12" v-if="addForm.add">
		        	<!--额度使用方式 只有新增时显示 必填-->
		        	<el-form-item :label="$t('customerQuota.howTtoUseTheQuota')" prop="repeatType"> 
		                <!--<el-input v-model="addForm.repeatType"></el-input>-->
		                <el-select v-model="addForm.repeatType" >
							<el-option v-for="item in erpeatList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
							<!--<el-option value="1" label="循环">循环</el-option>
							<el-option value="2" label="非循环">非循环</el-option>-->
						</el-select>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12"  v-if="addForm.edit">
		        	<!--调整后额度  只有调增额度时显示必填-->
		        	<el-form-item :label="$t('customerQuota.adjustedQuota')" prop="creditLimit1"> 
		                <el-input v-model="addForm.creditLimit1" ></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12"  v-if="addForm.edit">
		        	<!--调整原因  只有调增额度时显示必填-->
		        	<el-form-item :label="$t('customerQuota.reasonsForAdjustment')" prop="adjustReason"> 
		                <el-input v-model="addForm.adjustReason" ></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12" v-if="addForm.frozen">
		        	<!--冻结额度开始时间 只有在冻结时显示 必填-->
		        	<el-form-item :label="$t('customerQuota.quotaFreeze')" prop="frozenBegainDate"> 
		                <!--<el-input v-model="addForm.frozenBegainDate" ></el-input>-->
		                <el-date-picker
					      v-model="addForm.frozenBegainDate"
					      type="date"
					      placeholder="选择日期时间" 
					      >
					    </el-date-picker>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12" v-if="addForm.frozen">
		        	<!--冻结原因 只有在冻结时显示  必填-->
		        	<el-form-item :label="$t('customerQuota.causeOfFreezing')" prop="frozenReason"> 
		                <el-input v-model="addForm.frozenReason" ></el-input>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12" v-if="addForm.end">
		        	<!--额度终止开始时间 只有在额度终止是使用 本田-->
		        	<el-form-item :label="$t('customerQuota.startingTimeOfQuotaTermination')" prop="amountStopBeginDate"> 
		                <!--<el-input type="date" v-model="addForm.amountStopBeginDate" ></el-input>-->
		                <el-date-picker
					      v-model="addForm.amountStopBeginDate"
					      type="date"
					      placeholder="选择日期时间" 
					      >
					    </el-date-picker>
		            </el-form-item>
		        </el-col>
		        <el-col :span="12" v-if="addForm.end">
		        	<!--终止原因 只有在额度终止时使用 必填-->
		        	<el-form-item :label="$t('customerQuota.reasonsForTermination')" prop="stopReason"> 
		                <el-input v-model="addForm.stopReason" ></el-input>
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
        customerState: '',//额度状态
        customerNum:'',//客户编号
        customerName:"",//客户名称
        goPage: null //要去第几页
      },
      currencyList:[],//币种
      statusList:[],//客户额度状态列表
      erpeatList:[],//客户额度循环类型
      totalCount:10,
      tableData:[],  // 列表数据
      addUserDialog:false,//弹框显示
      addForm:{
      	title:"查看基准利率详情",//弹框的标题
      	customerNum:"",//客户编号
      	customerName:"",//客户名称
      	repeatType:"",//循环类型（额度使用方式）
      	creditContractNum:"",//授信额度编号
      	creditLimit:"",//授信额度（最大额度）、调整后金额
      	creditLimit1:"",//调整后金额
      	availableLimit:"",//可用额度
      	alreadyUsedLimit:"",//已使用额度
      	currencyType:"",//币种
      	customerState:"",//状态
      	beginDate:"",//生效日期
      	endDate:"",//结束日期
      	adjustReason:"",//调整原因
      	frozenBegainDate:"",//冻结开始时间
      	frozenReason:"",//冻结原因
      	amountStopBeginDate:"",//额度终止开始时间
      	stopReason:"",//终止原因
      	creditId:"",
        id:"",
        flag:false,   //是否可输入 默认可以
        edit:false,	 //额度调整标识
        add:false,    //新增标识
        frozen:false,
        end:false
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
          ],
          creditLimit:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyQuota'),trigger:'blur'}//额度不能为空
          ],
          creditLimit1:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyAdjustedQuota'),trigger:'blur'}//调整后额度不能为空
          ],
          repeatType:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyQuotaType'),trigger:'blur'}//额度使用方式不能为空
          ],
          adjustReason:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyReasonForAdjustment'),trigger:'blur'}//额度使用方式不能为空
          ],
          frozenBegainDate:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyFreezingQuota'),trigger:'blur'}//冻结额度开始日期不能为空
          ],
          frozenReason:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyCauseOfFreezing'),trigger:'blur'}//冻结原因不能为空
          ],
          amountStopBeginDate:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyQuotaTermination'),trigger:'blur'}//额度终止开始时期不能为空
          ],
          stopReason:[
          	{required:true,message:i18n.t('customerQuota.NotEmptyReasonsForTermination'),trigger:'blur'}//终止原因不能为空
          ]
	    },
    }
  },
  mounted(){
    this.getErpeatList()
    this.getCurrencyList();
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
        return item.name == '黑白名单管理'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取证件类型
    getCurrencyList(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'CURRENCY_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.currencyList =  res.returnData;
        }
      });

    },
    
    getStatus(){//客户额度状态
    	this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'CUSTOMER_STATE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.statusList =  res.returnData;
        }
      });
    },
    // 循环类型
    getErpeatList () {
        this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'REPEAT_TYPE'}).then(res =>{
          if(res.returnCode == '000000'){
            this.erpeatList =  res.returnData;
          }
      	});
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
    getCustomerName(){//根据客户编号显示客户名称
    	this.$post(this.$api + '/customerLimit/getCustomerName',{customerNum:this.addForm.customerNum}).then(res =>{
        if(res.returnCode == '000000'){
        	this.addForm.customerName=res.returnData
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
    // 确定
    sure (formName) {
      let self = this
      self.$refs['addForm'].validate((valid) => {
        if (valid) {
          let path = ''
          if (this.addForm.add) {//新增确定
            path = 'customerLimit/limitCreate'
            this.addForm.createUser = ''
            this.addForm.updateUser = this.$store.state.loginData.userLogin.userName
            var obje=this.addForm
          } else if(this.addForm.edit) {//额度调整确定
            path = '/customerLimit/limitAdjust'  //新增确定
            this.addForm.createUser = this.$store.state.loginData.userLogin.userName
            this.addForm.updateUser = ''
            var obje={
            	creditId:this.addForm.creditId,
            	creditLimit:this.addForm.creditLimit1,
            	adjustReason:this.addForm.adjustReason
            }
          }else if(this.addForm.frozen){
          	path = '/customerLimit/limitFrezon'  //额度冻结确定
            this.addForm.createUser = this.$store.state.loginData.userLogin.userName
            this.addForm.updateUser = ''
            var obje={
            	creditId:this.addForm.creditId,
            	frozenBegainDate:this.addForm.frozenBegainDate,
            	frozenReason:this.addForm.frozenReason
            }
          }else if(this.addForm.end){
          	path = '/customerLimit/limitFinally'  //额度冻结确定
            this.addForm.createUser = this.$store.state.loginData.userLogin.userName
            this.addForm.updateUser = ''
            var obje={
            	creditId:this.addForm.creditId,
            	amountStopBeginDate:this.addForm.amountStopBeginDate,
            	stopReason:this.addForm.stopReason
            }
          }
          console.log(obje)
          this.$post(this.$api + path,obje).then(res =>{
            if(res.returnCode == '000000'){
              if (this.addForm.add) {
                this.$alert(i18n.t('product.new_success'), i18n.t('Prompt'), {
	                dangerouslyUseHTMLString: true
	            });
              } else if(this.addForm.edit) {
                this.$alert("额度调整成功", i18n.t('Prompt'), {
	                dangerouslyUseHTMLString: true
	            });
              } else if(this.addForm.frozen){
              	this.$alert("额度冻结成功", i18n.t('Prompt'), {
	                dangerouslyUseHTMLString: true
	            })
              }else if(this.addForm.end){
              	this.$alert("额度终止成功", i18n.t('Prompt'), {
	                dangerouslyUseHTMLString: true
	            })
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
      this.$post(this.$api + '/customerLimit/queryByPage',this.obj).then(res =>{
        if(res.returnCode == '000000'){
          this.tableData =  res.returnData.rows;
          this.totalCount = res.returnData.total;
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
      this.addForm.title=i18n.t('customerQuota.edcj')
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      
      this.addForm.customerNum = ''
      this.addForm.customerName = ''
      this.addForm.repeatType = ''
      this.addForm.creditLimit = ''
      this.addForm.currencyType = ''
      this.addForm.customerState = '2'
      this.addForm.beginDate = ''
      this.addForm.endDate = ''
      this.addForm.add=true
      this.addForm.edit=false
      this.addForm.frozen=false
      this.addForm.end=false
      this.addUserDialog = true;
    },
    // 额度调整
    editItem (row) {
    	this.addForm.title=i18n.t('customerQuota.edtz')
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.detaisItem(row.creditId)
      this.addForm.add=false
      this.addForm.edit=true
      this.addForm.frozen=false
      this.addForm.end=false
      this.addUserDialog = true;
    },
    frozenItem(row){//额度冻结
    	this.addForm.title=i18n.t('customerQuota.eddj')
    	let self = this
      	this.addUserDialog = true
      	if (this.$refs['addForm']!==undefined) {
        	this.$refs['addForm'].resetFields();
      	}
	    this.addForm.add=false
	    this.addForm.edit=false
	    this.addForm.frozen=true
	    this.addForm.end=false
	    this.detaisItem(row.creditId)
	    this.addUserDialog = true;
    },
    endItem(row){
    	this.addForm.title=i18n.t('customerQuota.edzz')
    	let self = this
      	this.addUserDialog = true
      	if (this.$refs['addForm']!==undefined) {
        	this.$refs['addForm'].resetFields();
      	}
	    this.detaisItem(row.creditId)
	    this.addForm.add=false
	    this.addForm.edit=false
	    this.addForm.frozen=false
	    this.addForm.end=true
	    this.addUserDialog = true;
    },
    detaisItem(creditId){
    	this.$post(this.$api + '/customerLimit/queryDetail',{creditId:creditId}).then(res=>{
    		if(res.returnCode == '000000'){
    			this.addForm.customerNum=res.returnData.customerNum
    			this.addForm.customerName=res.returnData.customerName
    			this.addForm.creditContractNum=res.returnData.creditContractNum
    			this.addForm.creditLimit=res.returnData.creditLimit
    			this.addForm.alreadyUsedLimit=res.returnData.alreadyUsedLimit
    			this.addForm.availableLimit=res.returnData.availableLimit
    			this.addForm.currencyType=res.returnData.currencyType
    			this.addForm.customerState=res.returnData.customerState
				if(this.addForm.frozen){
					this.addForm.customerState="1"
				}else if(this.addForm.end){
					this.addForm.customerState="3"
				}
    			this.addForm.beginDate=res.returnData.beginDate
    			this.addForm.endDate=res.returnData.endDate
    			this.addForm.creditId=res.returnData.creditId
    		}
    	})
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
      this.addForm.add=false;
      this.addForm.edit=false
      this.addForm.frozen=false
      this.addForm.end=false
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
.el-date-editor.el-input, .el-date-editor.el-input__inner{width:100%}
.el-date-picker{padding-right:0!important;}
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

<template>
    <!-- 五级分类 -->
	<div class="content_box" id="five_content">
		<!-- 编辑模块(搜索) -->
	    <div class="edit_module">
	    	<el-form :inline="true"  class="demo-form-inline" size="small">
		        <el-row class="edit_module_search">
					<el-col :span="24">
						<el-form-item :label="$t('fiveLevel.Contract_No')"><!-- 合同编号 -->
							<el-input v-model="obj.contractNumber" ></el-input>
						</el-form-item>
						<el-form-item :label="$t('fiveLevel.customer_name')"> <!-- 客户姓名 -->
			               <el-input v-model="obj.customerName" ></el-input>
			            </el-form-item>
					</el-col>
		  			<el-col :span="24">
				  		<div class="edit_module_btn">
				  			<el-button type="warning" icon="el-icon-search" @click="obj.pageNo = 1;queryType()" size="small">{{$t("Query")}}</el-button>  <!--查询按钮-->
				  		</div>
			  		</el-col>
		        </el-row>  
	     	</el-form>
	    </div>
		<!--编辑模块end(搜索)-->
		<!-- 列表模块 -->
        <div class="list_module">
            <el-tabs v-model="wfState"> <!--type="border-card"-->
                <el-tab-pane :label="$t('fiveLevel.Five_level_classification_pending_list')" name="1"><!-- 五级分类待认定列表 -->
                    <template>
                        <el-table :data="tableData1" border style="width: 100%" size='small' :empty-text="$t('noData')">
                            <!--序号-->
                            <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                            <!--合同编号-->
                            <el-table-column prop="contractNumber" :label="$t('fiveLevel.Contract_No')"  align="center" min-width="130px"> </el-table-column>
                            <!--产品编号-->
                            <el-table-column prop="productNumber" :label="$t('fiveLevel.Product_number')"  align="center" min-width="125px"> </el-table-column>
                            <!--产品名称-->
                            <el-table-column prop="productName" :label="$t('fiveLevel.product_name')"  align="center" min-width="120px"> </el-table-column>
                            <!--客户姓名-->
                            <el-table-column prop="customerName" :label="$t('fiveLevel.customer_name')"  align="center" min-width="120px"> </el-table-column>
                            <!--贷款余额-->
                            <el-table-column prop="loanBalance" :label="$t('fiveLevel.Loan_balance')"  align="center" min-width="100px"> </el-table-column>
                            <!--起始日期-->
                            <el-table-column prop="startDate" :label="$t('fiveLevel.Start_date')"  align="center" min-width="100px">
                                <template slot-scope="scope">
                                    {{scope.row.startDate ? scope.row.startDate.split('T')[0] : ''}}
                                </template>
                            </el-table-column>
                            <!--到期日期-->
                            <el-table-column prop="endDate" :label="$t('fiveLevel.Date_of_Expiry')"  align="center" min-width="115px">
                                 <template slot-scope="scope">
                                    {{scope.row.endDate ? scope.row.endDate.split('T')[0]: ''}}
                                </template>
                            </el-table-column>
                            <!--当前分类-->
                            <el-table-column prop="currentClass" :label="$t('fiveLevel.Current_classification')" min-width="155px" align="center">
                                 <template slot-scope="scope">
                                   <span v-if="scope.row.currentClass =='1'">正常</span>
                                   <span v-if="scope.row.currentClass =='2'">关注</span>
                                   <span v-if="scope.row.currentClass =='3'">次级</span>
                                   <span v-if="scope.row.currentClass =='4'">可疑</span>
                                   <span v-if="scope.row.currentClass =='5'">损失</span>
                                </template> </el-table-column>
                            <!--调整后分类-->
                            <el-table-column prop="adjustmentClass" :label="$t('fiveLevel.Adjusted_classification')"  align="center" min-width="160px">
                                 <template slot-scope="scope">
                                   <span v-if="scope.row.adjustmentClass =='1'">正常</span>
                                   <span v-if="scope.row.adjustmentClass =='2'">关注</span>
                                   <span v-if="scope.row.adjustmentClass =='3'">次级</span>
                                   <span v-if="scope.row.adjustmentClass =='4'">可疑</span>
                                   <span v-if="scope.row.adjustmentClass =='5'">损失</span>
                                </template>
                            </el-table-column>
                            
                            <el-table-column :label="$t('Operation')" align="center"  v-if="funList.indexOf('处理') > -1 " min-width="110px">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" class="search-btn"  @click="handalItem(scope.row)" >
                                        <span class="text">{{$t('fiveLevel.deal_with')}}</span><!--处理-->
                                    </el-button> 
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
                                <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange">  <!-- 10条/页 -->
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

                <el-tab-pane :label="$t('fiveLevel.Adjustment_record')" name="2"><!--调整记录-->
                    <template>
                        <el-table :data="tableData2" border style="width: 100%" size='small' :empty-text="$t('noData')">
                            <!--序号-->
                            <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                            <!--合同编号-->
                            <el-table-column prop="contractNumber" :label="$t('fiveLevel.Contract_No')"  align="center"  min-width="130px"> </el-table-column>
                            <!--产品编号-->
                            <el-table-column prop="productNumber" :label="$t('fiveLevel.Product_number')"  align="center"  min-width="125px"> </el-table-column>
                            <!--产品名称-->
                            <el-table-column prop="productName" :label="$t('fiveLevel.product_name')"  align="center" min-width="120px"> </el-table-column>
                            <!--客户姓名-->
                            <el-table-column prop="customerName" :label="$t('fiveLevel.customer_name')"  align="center"  min-width="120px"> </el-table-column>
                            <!--贷款余额-->
                            <el-table-column prop="loanBalance" :label="$t('fiveLevel.Loan_balance')"  align="center" min-width="100px"> </el-table-column>
                            <!--起始日期-->
                            <el-table-column prop="startDate" :label="$t('fiveLevel.Start_date')"  align="center" min-width="100px">
                                <template slot-scope="scope">
                                    {{scope.row.startDate ? scope.row.startDate.split('T')[0] : ''}}
                                </template>
                            </el-table-column>
                            <!--到期日期-->
                            <el-table-column prop="endDate" :label="$t('fiveLevel.Date_of_Expiry')"  align="center" min-width="115px">
                                 <template slot-scope="scope">
                                    {{scope.row.endDate ? scope.row.endDate.split('T')[0] : ''}}
                                </template>
                            </el-table-column>
                            <!--当前分类-->
                            <el-table-column prop="currentClass" :label="$t('fiveLevel.Current_classification')"  align="center" min-width="155px"> 
                                <template slot-scope="scope">
                                   <span v-if="scope.row.currentClass =='1'">正常</span>
                                   <span v-if="scope.row.currentClass =='2'">关注</span>
                                   <span v-if="scope.row.currentClass =='3'">次级</span>
                                   <span v-if="scope.row.currentClass =='4'">可疑</span>
                                   <span v-if="scope.row.currentClass =='5'">损失</span>
                                </template>
                            </el-table-column>
                            <!--调整后分类-->
                            <el-table-column prop="adjustmentClass" :label="$t('fiveLevel.Adjusted_classification')"  align="center" min-width="160px"> 
                                <template slot-scope="scope">
                                   <span v-if="scope.row.adjustmentClass =='1'">正常</span>
                                   <span v-if="scope.row.adjustmentClass =='2'">关注</span>
                                   <span v-if="scope.row.adjustmentClass =='3'">次级</span>
                                   <span v-if="scope.row.adjustmentClass =='4'">可疑</span>
                                   <span v-if="scope.row.adjustmentClass =='5'">损失</span>
                                </template>
                            </el-table-column>
                            <!--处理结果-->
                            <el-table-column prop="handleResult" :label="$t('fiveLevel.process_result')"  align="center"  min-width="130px">
                                  <template slot-scope="scope">
                                   <span v-if="scope.row.handleResult =='1'">同意</span>
                                   <span v-if="scope.row.handleResult =='2'">拒绝</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="操作" align="center" width="180px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 || funList.indexOf('配置') > -1"> -->
                            <el-table-column :label="$t('Operation')" align="center"  v-if="funList.indexOf('查看') > -1" min-width="110px">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" class="search-btn"  @click="seeDetail(scope.row,4)" >
                                        <i class="el-icon-view"></i>
                                        <span class="text">{{$t('See')}}</span><!--查看-->
                                    </el-button> 
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
                                <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange">  <!-- 10条/页 -->
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
		<!--列表模块结束-->
        <!--弹框页面开始-->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel"  :close-on-click-modal="false">  
            <el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="addForm"  :rules="$rules.fiveLevel" label-width="120px" class="demo-ruleForm" size="small">
                <el-row>
                    <el-col :span="24">
                        <h5>{{$t('fiveLevel.Customer_Information')}}</h5><!--客户信息-->
                    </el-col>
                </el-row> 
                <el-row >
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.Contract_No')" > <!--合同编号-->
                            <el-input v-model="addForm.contractNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 少合同金额 -->
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.Contract_amount')">  <!--合同金额-->
                            <el-input v-model="addForm.contractMoney" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.customer_name')"> <!--客户姓名-->
                            <el-input v-model="addForm.customerName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.Product_number')"> <!--产品编号-->
                            <el-input v-model="addForm.productNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.product_name')"> <!--产品名称-->
                            <el-input v-model="addForm.productName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.Loan_balance')"> <!--贷款余额-->
                            <el-input v-model="addForm.loanBalance" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.Start_date')"> <!--起始日期-->
                            <el-input v-model="addForm.startDateValue" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('fiveLevel.Date_of_Expiry')"> <!--到期日期-->
                            <el-input v-model="addForm.endDateValue" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <div v-if="flag == 4">
                        <el-col :span="12">
                            <el-form-item :label="$t('fiveLevel.Arrears_of_principal')"> <!--拖欠本金-->
                                <el-input v-model="addForm.defaultPrincipal" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('fiveLevel.Arrears_of_interest')"> <!--拖欠利息-->
                                <el-input v-model="addForm.defaultInterest" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item label="拖欠开始日期"> 
                                <el-input v-model="addForm.defaultDateValue" disabled></el-input>
                            </el-form-item>
                        </el-col> -->
                    </div>
                    <el-col :span="12" >
                        <el-form-item :label="$t('fiveLevel.Current_classification')"> <!--当前分类-->
                             <el-select v-model="addForm.currentClass"  disabled style="width:100%" placeholder=""> 
                                <el-option 
                                        v-for="(item,index) in currentClassArr" 
                                        :key="index"
                                        :label="item.paramSname"
                                        :value="item.paramValue"
                                        ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <!--认定-->
                <div v-if="flag == 3">
                    <el-row>
                        <el-col :span="24">
                            <h5>{{$t('fiveLevel.Adjusted_classification')}}</h5><!--调整后分类-->
                        </el-col>
                    </el-row>  
                    <el-row>
                        <el-col :span="12">
                             <el-form-item :label="$t('fiveLevel.Adjusted_classification')" prop="adjustmentClass" disabled><!--调整后分类-->
                                <el-select v-model="addForm.adjustmentClass"  disabled style="width:100%" placeholder=""> 
                                    <el-option 
                                            v-for="(item,index) in currentClassArr" 
                                            :key="index"
                                            :label="item.paramSname"
                                            :value="item.paramValue"
                                            ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="24">
                            <el-form-item :label="$t('fiveLevel.Adjustment_reason')"  prop="adjustmentReason" > <!--调整原因-->
                                <el-input v-model="addForm.adjustmentReason"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="24">
                             <el-form-item :label="$t('fiveLevel.Confirmation_opinion')" prop="fiveAffirmState" ><!--认定意见-->
                                   <el-input v-model="addForm.fiveAffirmState" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                </div>
                <!--查看条件后分类-->
                <div v-if="flag == 4">
                    <el-row>
                        <el-col :span="24">
                            <h5>{{$t('fiveLevel.Adjusted_classification')}}</h5><!--调整后分类-->
                        </el-col>
                    </el-row>  
                    <el-row>
                        <el-col :span="24">
                             <el-form-item :label="$t('fiveLevel.Adjusted_classification')"  disabled><!--调整后分类-->
                                <el-select v-model="addForm.adjustmentClass"  disabled style="width:100%;" placeholder="">
                                    <el-option 
                                            v-for="(item,index) in currentClassArr" 
                                            :key="index"
                                            :label="item.paramSname"
                                            :value="item.paramValue"
                                            ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="24">
                            <el-form-item :label="$t('fiveLevel.Adjustment_reason')"  > <!--调整原因-->
                                <el-input v-model="addForm.adjustmentReason"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="24">
                             <el-form-item :label="$t('fiveLevel.Confirmation_opinion')" ><!--认定意见-->
                                   <el-input v-model="addForm.cognizanceOpinion"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="24">
                             <el-form-item :label="$t('fiveLevel.Confirmation_result')" ><!--认定结果-->
                                <el-select v-model="addForm.handleResult"  disabled style="width:100%;" placeholder="">
                                    <el-option  label="同意" value="1" ></el-option>
                                    <el-option  label="拒绝" value="2" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="flag == 4" @click="dialogFormVisible = false">{{$t('fiveLevel.return')}}</el-button><!--返回-->
                <el-button type="primary" @click="cogernizeFiveClass('addForm',2)" v-if="flag == 3">{{$t('fiveLevel.Refuse')}}</el-button><!--拒 绝-->
                <el-button type="primary" @click="cogernizeFiveClass('addForm',1)" v-if="flag == 3">{{$t('fiveLevel.agree')}}</el-button><!--同 意-->
            </div>
        </el-dialog>
        <!--弹框页面开始-->
	</div>
</template>

<script>
export default{
    name: 'FiveLevelRd',
    data(){
        return{
            dialogFormVisible:false, //弹窗
            flag:1, //1查看详情  2调整
            title:'',
            obj: {
                pageSize:10,//一页显示几条数据
                pageNo:1,  //需要传过去的参数
                contractNumber:'', //合同编号
                customerName:'', //客户姓名
                goPage: null,
            },
           
            totalCount:0,//一共有多少条数据
            addForm:{
                adjustClass:'', //分类调整
                adjustReason:'', //调整
                id:'',
                startDateValue:'',
                endDateValue:'',
                defaultDateValue:'',

                fiveAffirmState:'', //认定意见
            },
            funList:[],//功能列表
            tableData1:[],//五级分类认定
            tableData2:[],//调整记录
            currentClassArr:[], //当前分类
            wfState: '1',
        }
    },
    watch : {
        'wfState' (n) {
            if(n == '1') {
                this.initFiveLevelRdData();
                this.obj.contractNumber = '';
                this.obj.customerName = '';
            } else{
                this.initFiveLevelTZData();
                this.obj.contractNumber = '';
                this.obj.customerName = '';

            }
        }
    },
    created(){
        this.getFunList();
    },
    mounted(){
        this.initFiveLevelRdData();//初始化五级分类认定
    },
    methods:{
        getFunList () {
            let obj = {}
            obj = this.$store.state.loginData.beMenuList.find(item => {
                return item.name == '五级分类认定'
            })
            this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
                if(res.returnCode == '000000'){
                this.funList = JSON.stringify(res.returnData)
                }
            });
            },
        queryType(){//查询
            if(this.wfState == '1') {
                this.initFiveLevelRdData();
            } else{
                this.initFiveLevelTZData();
            }
        },
        //初始化五级分类认定
        initFiveLevelRdData(){
            this.$post(this.$afterloan + '/fiveClass/queryCognizance',this.obj).then(res =>{
                if(res.code == '000000'){
                    this.tableData1 =  res.data.listData;
                    this.totalCount = res.data.total;
                } else {
                    var str = `
                        <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                        <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
                    `
                    this.$alert(str, i18n.t('Prompt'), {
                        dangerouslyUseHTMLString: true
                    });
                }
            });
        },
        //初始化调整记录
        initFiveLevelTZData(){
            this.$post(this.$afterloan + '/fiveClass/queryAdjustment',this.obj).then(res =>{
                if(res.code == '000000'){
                    this.tableData2 =  res.data.listData;
                    this.totalCount = res.data.total;
                } else {
                    var str = `
                        <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                        <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
                    `
                    this.$alert(str, i18n.t('Prompt'), {
                        dangerouslyUseHTMLString: true
                    });
                }
            });
        },
        //五级分类查看详情
        seeDetail(row,e){
            this.dialogFormVisible =true;
            if(e == 4){
                this.title = i18n.t('fiveLevel.Five_level_classification_adjustment_record_details');//五级分类调整记录详情
                this.flag = 4; 
            }
            this.addForm = row;
           
            this.fotMatDate(row);
             //当前分类
            var param={
                "paramCode":'CURRENT_FIVE_CLASSCIFY ',
            }
            this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
                if(res.returnCode=="000000"){
                    this.currentClassArr =res.returnData
                }
            })
        },
        fotMatDate(e){
            if(e.startDate !=null){
                 this.addForm.startDateValue = e.startDate.split("T")[0];
            }
            if(e.endDate !=null){
                this.addForm.endDateValue = e.endDate.split("T")[0];
            }
        },
        //五级分类调整保存
        updateFiveClass(formName){
            this.$refs['addForm'].validate((valid) => {
            if (valid) {
                var obj ={
                        "fiveId":this.addForm.id,
                        "adjustmentClass":this.addForm.adjustClass,
                        "adjustmentReason":this.addForm.adjustReason,
                    }
                    this.$post(this.$afterloan + '/fiveClass/updateFiveClass',obj).then(res =>{
                        if(res.code == '000000'){
                            this.dialogFormVisible = false;
                            this.$refs[formName].resetFields();
                            this.wfState = '1';
                            this.initFiveLevelData();
                            this.initFiveLevelRdData();
                        } 
                    });
                }
            })
        },
        //五级分类认证处理
        handalItem(row){
            this.dialogFormVisible =true;
            this.title = i18n.t('fiveLevel.Five_level_classification'); //五级分类认定
            this.flag = 3;
            this.addForm = row;
            this.fotMatDate(row);
            this.addForm.id =  row.fiveId
            var param={
                "paramCode":'FIVE_AFFIRM_STATE',
            }
            this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
                if(res.returnCode=="000000"){
                    this.fiveAffirmStateArr =res.returnData
                }
            })
            //当前分类
            var param={
                "paramCode":'CURRENT_FIVE_CLASSCIFY ',
            }
            this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
                if(res.returnCode=="000000"){
                    this.currentClassArr =res.returnData
                }
            })
        },
        //五级分类认证保存
        cogernizeFiveClass(formName,e){
            this.$refs['addForm'].validate((valid) => {
            if (valid) {
                   
                    var obj ={
                        "fiveId":this.addForm.id,
                        "handleResult":e,
                        "cognizanceOpinion":this.addForm.fiveAffirmState,
                        "createUser":this.$store.state.loginData.userLogin.loginId,
                        "updateUser":this.$store.state.loginData.userLogin.loginId
                    }
                    this.$post(this.$afterloan + '/fiveClass/updateCognizance',obj).then(res =>{
                        if(res.code == '000000'){
                            this.dialogFormVisible = false;
                            this.$refs[formName].resetFields();
                            this.$alert(i18n.t('fiveLevel.Successful_processing'), i18n.t('Prompt'), { //处理成功
                                confirmButtonText: i18n.t('OK'),
                                callback: action => {
                                    this.initFiveLevelRdData();
                                }
                            });
                        } else{
                            var str = `
                                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                                <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
                            `
                            this.$alert(str, i18n.t('Prompt'), {
                                confirmButtonText: i18n.t('OK'),
                            });
                        }
                    });
                }
            })
        },
        goPageSure () {
            var mc=Math.ceil(this.totalCount/this.obj.pageSize);
            if(this.obj.goPage>0&&this.obj.goPage<=mc){
                this.obj.pageNo = Number(this.obj.goPage)
                this.queryType();
                this.obj.goPage = '';
            }else{
                this.obj.pageNo = mc
                this.queryType();
                this.obj.goPage = '';
            }
        },
        //取消
        cancel(formName){
            this.dialogFormVisible = false;
            this.$refs['addForm'].resetFields();
            this.addForm.fiveAffirmState =''
        },
        //重置表单
        resetForm() {
            this.$refs['addForm'].resetFields();
        },
        //改变每页显示多少条
        handleSizeChange(val) {
            this.obj.pageSize = val;
            this.obj.pageNo = 1
            if(this.wfState == '1') {
                this.initFiveLevelRdData();
            } else{
                this.initFiveLevelTZData();
            }
        },
        //选择页数改变数据
        handleCurrentChange(val){
            this.obj.pageNo = val;
            if(this.wfState == '1') {
                this.initFiveLevelRdData();
            } else{
                this.initFiveLevelTZData();
            }
        },

    }
}
</script>

<style lang="scss">
#five_content{
	.el-dialog {
		width:70%!important;
	}
	
}
	// .edit_module_btn{
	// 	padding:10px 0;
	// }
</style>
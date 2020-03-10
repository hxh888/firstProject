<template>
		<div class="content_box">
				<!-- 面包屑 -->
		    <div class="crumb_module">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
				  	<el-breadcrumb-item >消费贷</el-breadcrumb-item>
				  	<el-breadcrumb-item class="active" >记账日期管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
				<!--面包屑结束-->
				<!-- 编辑模块(搜索新增查询) 开始-->
		    <div class="edit_module">
			    <el-form  ref="form" > 
			        <el-row :gutter="20" class="edit_module_search">
					      <el-col :span="24">
						  		<div class="edit_module_btn">
						  			<el-button type="danger"  @click="addSwitch()">手工日切</el-button><!--icon="el-icon-search"-->
						  		</div>
						  	</el-col>
			        </el-row>  
			    </el-form>
		    </div>
		    <!-- 编辑模块(搜索新增查询)结束 -->
		    <!-- 列表模块开始-->
		    <div class="list_module">
		    	<div class="table_body">
						<h4>记账日期列表</h4>
						<el-table :data="tableData" border style="width: 100%"   size='small'>
								<el-table-column prop="runDate"  label="记账日期" align="center" ></el-table-column>
								<el-table-column prop="switchType"  label="切换模式" align="center" >
									<template slot-scope="scope">
										<span v-if="scope.row.switchType==0">主动</span>
										<span v-if="scope.row.switchType==1">被动</span>
										<span v-if="scope.row.switchType==2">手工</span>
									</template>
								</el-table-column>
								<el-table-column prop="switchTime"  label="切换时间" align="center" ></el-table-column>
								<el-table-column prop="useStatus"  label="使用标示" align="center" >
									<template slot-scope="scope">
										<span v-if="scope.row.useStatus==0">历史数据</span>
										<span v-if="scope.row.useStatus==1">当前使用</span>
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
				<!--新增弹框页面开始-->
				<el-dialog :title="addForm.title" :visible.sync="dialogFormVisible" id="baseRateForm">
					<el-form :model="addForm" ref="addForm" :rules="rules" id="addForm">
					  	<el-row>
							<el-col :span="24">
							  	<el-form-item label="当前记账日期：" prop="runDate_mod" :label-width="formLabelWidth" ><!--基准利率档次-->
							      <el-input v-model="addForm.runDate_mod" :disabled="addForm.dis"></el-input>
							    </el-form-item>
							</el-col>
							<el-col :span="24">
							  	<el-form-item label="日切日期：" prop="cutOffDate" :label-width="formLabelWidth" ><!--利率%-->
							      <el-date-picker type="date" v-model="addForm.cutOffDate" style="width:100%;"></el-date-picker>
							    </el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="当前切换模式：" prop="switchTypeTrans_mod" :label-width="formLabelWidth" >
									<el-select v-model="addForm.switchTypeTrans_mod" placeholder="请选择" :disabled="addForm.dis">
									    <el-option
									      v-for="item in switchTypes"
									      :key="item.bizTypePropCode"
									      :label="item.bizTypePropName"
									      :value="item.bizTypePropCode">
									    </el-option>
								  </el-select>
								</el-form-item>
							</el-col>
							<el-col :span="24">
							  	<el-form-item label="当前切换日期" prop="switchTime_mod" :label-width="formLabelWidth" >
							    	<el-date-picker
								      v-model="addForm.switchTime_mod"
								      type="datetime"
								      placeholder="选择日期" style="width:100%" :disabled="addForm.dis">
								    </el-date-picker>
							  	</el-form-item>
						  </el-col>
						</el-row>
					</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取消</el-button>
				    <!--<el-button v-if="addForm.edit" type="primary" @click="editSure()"></el-button>--><!--保存-->
				    <el-button type="primary" @click="addSure('addForm')">保存</el-button>
				  </div>
				</el-dialog>
				<!--新增弹框页面结束-->
		</div>
</template>

<script>
export default {
  name: 'MainIndex',
  data () {
    return {
      legalNum:this.$store.state.loginData.legalPersonNum,
//    legalName:this.store.state.loginData.legalPersonName,
      indexNo:0,//当前从第几条数据开始 0开头
      currentPage:1,//当前显示第几页 1开头
      pageSize:10,//一页显示几条数据
      totalCount:10,//一共有多少条数据
      switchTypes:[],//切换模式
      useStatus:[],
      value:"",
      dialogFormVisible:false,
      interestRates:[
      	{interestRate:1,label:"零利率"},
      	{interestRate:2,label:"五年以上"},
      	{interestRate:3,label:"五年以内"},
      	{interestRate:4,label:"一至五年"},
      	{interestRate:5,label:"三至五年"},
      ],
      interestRate:"",
      loanTypes:[
      	{loanType:1,label:"公积金贷款"},
      	{loanType:2,label:"商业贷款"}
      ],
      loanType:"",
      tableData:[],//记账日期列表数据
      allTableData:[],//所有记账日期列表数据
      addForm:{//新增页面数据
      	title:"手工日切",
      	runDate_mod:"",//当前记账日期
      	cutOffDate:"",//日切日期
      	switchTypeTrans_mod:"",//当前切换模式
      	switchTime_mod:"",//当前切换日期
      	dis:true,
      	options:[
      	]
      },
      rules:{
      	cutOffDate:[
      		{ required: true, message: '请输入日切日期', trigger: 'blur' },//
      	]
      },
      formLabelWidth:"160px"
    }
  },
  mounted(){
  	
  	this.getData();
  	this.switchType();//切换模式
  	this.useState();
	this.getAllTableData();
//	this.switchTypeTrans();
  	
  },
  methods:{
  	getData(){//数据初始化
		var obj={
			"channelNo":"1",
	 		"transCode":"SWITCHDAY300",
			"legalNum":this.legalNum,
			"indexNo":this.indexNo,
			"pageSize":this.pageSize
		}
		this.$post(this.$api,obj)
		.then(res=>{
			this.tableData=res.rows
			this.totalCount=res.totalCount
		})
  	},
  	switchType(){//切换模式列表
		var LnSwitchType = {
	 		"channelNo":"1",
	 		"transCode":"SETPARARGS301",
	 		"legalNum":this.legalNum,
	 		"bizTypeCode":"LN_SwitchType"
		};
		this.$post(this.$api,LnSwitchType)
		.then(res=>{
			if(res.returnMsg=="OK"){
				this.switchTypes=res.rows;
			}
		})
	},
	useState(){//使用标识
		var LnUseStatus = {
	 		"channelNo":"1",
	 		"transCode":"SETPARARGS301",
	 		"bizTypeCode":"LN_UseStatus"
		};
		this.$post(this.$api,LnUseStatus)
		.then(res=>{
			this.useStatus=res.rows
		})
	},
	getAllTableData(){
		var obj={
			"channelNo": "1",
			"transCode": "SWITCHDAY400"
		}
		this.$post(this.$api,obj)
		.then(res=>{
			this.allTableData=res
		})
	},
	addSwitch(){
		this.dialogFormVisible=true;
      	this.addForm.runDate_mod=this.allTableData.runDate;//当前记账日期
      	this.addForm.cutOffDate=this.allTableData.cutOffDate;//日切日期
      	this.addForm.switchTypeTrans_mod=this.allTableData.switchType;//当前切换模式
      	this.addForm.switchTime_mod=this.allTableData.switchTime;//当前切换日期
	},
	addSure(formName){//手工日切保存
		var d=new Date(this.addForm.cutOffDate);
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
		var obj={
			"channelNo":"1",
			"transCode":"SWITCHDAY000",
//			"legalPersonNum":this.legalNum,
//			"legalPersonName":this.legalName,
			"legalNum":this.legalNum,
//			"judicialPersonName":$scope.judicialPersonName_edit,
			"cutOffDate":datetime,
			"baseId":this.allTableData.dayId,
		}
		this.$refs[formName].validate((valid) => {
			if (valid) {
				this.$post(this.$api,obj)
				.then(res=>{
					if(res.returnMsg=="OK"){
						this.dialogFormVisible=false;
						this.getData();
					}
				})
			}
		})
	},
  	//改变每页显示多少条
	handleSizeChange(val) {
		this.pageSize =  val;
		this.indexNo = 0
		this.getData();
	},
	//选择页数改变数据
	handleCurrentChange(val){
		this.indexNo = (val-1)*this.pageSize ;
		this.getData(); 
	},
  }
}
</script>

<style scoped>
.search_input{width:100%; padding-left:125px; position:relative; box-sizing:border-box;}
.search_label{width:127px; line-height:38px; position:absolute; left:0; top:0; text-align:center; 
border:1px solid #DCDFE6; color:#909399; background:#F5F7FA; box-sizing:border-box;border-top-left-radius:3px; border-bottom-left-radius:3px;}
</style>

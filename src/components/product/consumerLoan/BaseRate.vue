<template>
		<div class="content_box">
				<!-- 面包屑 -->
		    <div class="crumb_module">
						<el-breadcrumb separator-class="el-icon-arrow-right">
						  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
						  	<el-breadcrumb-item >消费贷</el-breadcrumb-item>
						  	<el-breadcrumb-item class="active" >基准利率管理</el-breadcrumb-item>
						</el-breadcrumb>
				</div>
				<!--面包屑结束-->
				<!-- 编辑模块(搜索新增查询) 开始-->
		    <div class="edit_module">
			      <el-form  ref="form" > 
				        <el-row :gutter="20" class="edit_module_search">
				          <el-col :span="8">
				          	<div class="search_input">
								<div class="search_label">贷款利率档次</div>
								<el-select v-model="interestRate" placeholder="请选择" style="width:100%"><!--贷款利率档次-->
										<el-option label="全部" value=""></el-option>
										<el-option v-for="(item,index) in interestRates" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
								</el-select>
							</div>
				          </el-col>
				          <el-col :span="8">
				          	<div class="search_input">
				          		<div class="search_label">贷款类型</div>
											<el-select v-model="loanType" placeholder="请选择" style="width:100%"><!--贷款类型-->
												<el-option label="全部" value=""></el-option>
													<el-option v-for="(item,index) in loanTypes" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
											</el-select>
										</div>
						      </el-col>
						      <!--<el-col :span="8">
						      	<div class="search_input">
						      		<div class="search_label">使用标示</div>
							      		<el-select v-model="useLogo" placeholder="请选择" style="width:100%">
							      			<el-option label="全部" value=""></el-option>
											<el-option v-for="(item,index) in useLogos" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
										</el-select>
						      	</div>
						      </el-col>-->
						      <el-col :span="24" class="mt10">
							  		<div class="edit_module_btn">
							  			<el-button type="danger" icon="el-icon-search" @click="getData()">查询</el-button>
							  			<el-button type="primary" icon="el-icon-plus"  @click="allAdd('addForm')">{{$t('Add')}}</el-button><!--新增-->
							  		</div>
							  	</el-col>
				        </el-row>  
			      </el-form>
		    </div>
		    <!-- 编辑模块(搜索新增查询)结束 -->
		    
		    <!-- 列表模块开始-->
		    <div class="list_module">
			    	<div class="table_body">
							<h4>{{$t('baseRate.Rate_list')}}</h4><!--基准利率列表-->
							<el-table :data="tableData" border style="width: 100%"   size='small'>
									<el-table-column prop="interestRate"  label="利率档次" align="center" >
										<template slot-scope="scope">
											<span v-if="scope.row.interestRate==0">六个月以内（含六个月）</span>
											<span v-if="scope.row.interestRate==1">一年以内（含1年）</span>
											<span v-if="scope.row.interestRate==2">一至三年（含3年）</span>
											<span v-if="scope.row.interestRate==3">三至五年（含5年）</span>
											<span v-if="scope.row.interestRate==4">一至五年（含5年）</span>
											<span v-if="scope.row.interestRate==5">五年以内（含5年）</span>
											<span v-if="scope.row.interestRate==6">五年以上</span>
											<span v-if="scope.row.interestRate==9">零利率</span>
										</template>
									</el-table-column><!--序号-->
									<el-table-column prop="rating"  label="利率(%)" align="center" ></el-table-column><!--序号-->
									<el-table-column prop="loanType"  label="贷款类型" align="center" >
										<template slot-scope="scope">
											<span v-if="scope.row.loanType==0">商业贷款</span>
											<span v-if="scope.row.loanType==1">公积金贷款</span>
										</template>
									</el-table-column><!--序号-->
									<el-table-column prop="adjustDate"  label="调整日期" align="center" ></el-table-column><!--序号-->
									<el-table-column prop="useLogo"  label="使用标示" align="center" >
										<template slot-scope="scope">
											<span v-if="scope.row.useLogo==10">正常</span>
											<span v-if="scope.row.useLogo==11">冻结</span>
											<span v-if="scope.row.useLogo==12">删除</span>
										</template>
									</el-table-column><!--序号-->
									<el-table-column label="历史数据" align="center" >
											<template slot-scope="scope">
													<el-button size="mini" class="edit-btn" @click="saw(scope.row)">
															<i class="el-icon-view"></i>
															<span class="text">查看</span>
													</el-button>
											</template>
									</el-table-column>
									<el-table-column :label="$t('group.Operation')" align="center"  width="180px">
										<template slot-scope="scope">
												<el-button size="mini" class="edit-btn" @click="editItem(scope.row)"><!--编辑-->
														<i class="el-icon-edit"></i>
														<span class="text">编辑</span>
												</el-button>
												<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row.baseId)"><!--删除-->
														<i class="el-icon-delete"></i>
														<span class="text">删除</span>
												</el-button>
										</template>
									</el-table-column>
							</el-table>
							<el-pagination
									:current-page="currentPage"
									:page-sizes="[5, 10, 15, 20,25]"
									:page-size="pageSize"
									layout="total, sizes, prev, pager, next, jumper"
									:total="totalCount"
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									>
							</el-pagination>
							<!--@size-change="handleSizeChange"
									@current-change="handleCurrentChange"-->
						</div>
					</div>
				<!--列表模块结束-->
				
			<!--新增弹框页面开始-->
			<el-dialog :title="addForm.title" :visible.sync="dialogFormVisible" id="baseRateForm">
			  <el-form :model="addForm" ref="addForm" :rules="rules" id="addForm">
			  	<el-row>
					  <el-col :span="12">
					  	<el-form-item label="基准利率档次：" prop="add_interestRate" :label-width="formLabelWidth" ><!--基准利率档次-->
					       <el-select v-model="addForm.add_interestRate" placeholder="请选择" :disabled="addForm.flag1" style="width:100%"><!--贷款利率档次-->
									<!--<el-option label="全部" value=""></el-option>-->
									<el-option v-for="(item,index) in interestRates" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
							</el-select>
					    </el-form-item>
					  </el-col>
					  <el-col :span="12">
					  	<el-form-item label="利率%：" prop="rating2" :label-width="formLabelWidth" ><!--利率%-->
					      <el-input v-model="addForm.rating2" :disabled="addForm.flag1"></el-input>
					    </el-form-item>
					  </el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="贷款类型：" prop="add_loanType" :label-width="formLabelWidth" >
							    <el-select v-model="addForm.add_loanType" placeholder="请选择" style="width:100%"><!--贷款类型-->
									<!--<el-option label="全部" value=""></el-option>-->
									<el-option v-for="(item,index) in loanTypes" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
						  	<el-form-item label="调整日期:" prop="add_adjustDate" :label-width="formLabelWidth" >
							      <el-date-picker
								      v-model="addForm.add_adjustDate"
								      type="date"
								      placeholder="选择日期" style="width:100%">
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
			
			<!--历史数据页面开始-->
			<el-dialog :title="historyTitle" :visible.sync="historyTableVisible">
				<el-table :data="historyTable" border style="width: 100%"   size='small'>
					<el-table-column prop="interestRate"  label="利率档次" align="center" >
						<template slot-scope="scope">
							<span v-if="scope.row.interestRate==0">六个月以内（含六个月）</span>
							<span v-if="scope.row.interestRate==1">一年以内（含1年）</span>
							<span v-if="scope.row.interestRate==2">一至三年（含3年）</span>
							<span v-if="scope.row.interestRate==3">三至五年（含5年）</span>
							<span v-if="scope.row.interestRate==4">一至五年（含5年）</span>
							<span v-if="scope.row.interestRate==5">五年以内（含5年）</span>
							<span v-if="scope.row.interestRate==6">五年以上</span>
							<span v-if="scope.row.interestRate==9">零利率</span>
						</template>
					</el-table-column>
					<el-table-column prop="rating"  label="利率(%)" align="center" ></el-table-column>
					<el-table-column prop="loanType"  label="贷款类型" align="center" >
						<template slot-scope="scope">
							<span v-if="scope.row.loanType==0">商业贷款</span>
							<span v-if="scope.row.loanType==1">公积金贷款</span>
						</template>
					</el-table-column>
					<el-table-column prop="adjustDate"  label="调整日期" align="center" ></el-table-column>
					<el-table-column prop="useLogo"  label="使用标示" align="center" >
						<template slot-scope="scope">
							<span v-if="scope.row.useLogo==10">正常</span>
							<span v-if="scope.row.useLogo==11">冻结</span>
							<span v-if="scope.row.useLogo==12">删除</span>
						</template>
					</el-table-column>
				</el-table>
				<!--<el-pagination
						:current-page="historyCurrentPage"
						:page-sizes="[5, 10, 15, 20,25]"
						:page-size="historyPageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalCount">
				</el-pagination>-->
				<div slot="footer" class="dialog-footer">
				    <el-button @click="historyTableVisible = false">返回</el-button>
				</div>
			</el-dialog>
			<!--历史数据结束-->
		</div>
</template>

<script>
export default {
  name: 'MainIndex',
  data () {
    return {
      legalNum:sessionStorage.getItem("legalNum"),
      indexNo:0,//当前从第几条数据开始 0开头
      currentPage:1,//当前显示第几页 1开头
      pageSize:10,//一页显示几条数据
      historyIndexNo:0,
      historyCurrentPage:1,//当前显示第几页 1开头
      historyPageSize:10,//一页显示几条数据
      historyTotalCount:0,
      totalCount:10,//一共有多少条数据
      dialogFormVisible:false,//弹框是否显示
      historyTableVisible:false,
      historyTable:[],
      historyTitle:"基准利率历史列表",
      interestRates:[],//贷款利率档次列表
      interestRate:"",//选中的贷款利率档次
      loanTypes:[],//贷款类型列表
      loanType:"",//选中的贷款类型
      useLogos:[],//使用标示列表
      useLogo:"",//使用标示
      tableData:[],//金准利率列表
      addForm:{//新增页面数据
      	title:"新增基准利率信息",
      	add_interestRate:"",//贷款利率档次
      	add_loanType:"",//贷款类型
      	rating2:"",//利率
      	add_adjustDate:"",//调整日期
      	baseRate:""//利率id
      },
      rules:{
      	add_interestRate:[
      		{ required: true, message: '请选择基准利率档次', trigger: 'change' }
      	],
      	rating2:[
      		{ required: true, message: '请输入利率%', trigger: 'blur' },//
      		{ pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '只能输入数字' },
      		
      	],
      	add_loanType:[
      		{ required: true, message: '请选择贷款类型', trigger: 'change' }
      	],
      	add_adjustDate: [
            { type: 'date', required: true, message: '请选择调整日期', trigger: 'change' }
        ],
        
      },
      formLabelWidth:"160px"
    }
  },
  mounted(){
  	this.getInterestRate(),//获取贷款利率档次列表
  	this.getLoanTypes(),//获取贷款类型列表
  	this.getUseLogo(),//获取使用标示
  	this.getData()//获取页面初始化数据
  },
  methods:{
  	getInterestRate(){//获取贷款利率档次列表
  		var obj={
  			"channelNo":"1",
		 		"transCode":"SETPARARGS301",
		 		"legalNum":this.legalNum,
		 		"bizTypeCode":"LN_RateGrade"
  		}
  		this.$post(this.$api,obj)
  		.then(res=>{
  			this.interestRates=res.rows
  		})
  	},
  	getLoanTypes(){//获取贷款类型列表
  		var obj={
  			"channelNo":"1",
		 		"transCode":"SETPARARGS301",
		 		"bizTypeCode":"LOAN_TYPE"
  		}
  		this.$post(this.$api,obj)
  		.then(res=>{
  			this.loanTypes=res.rows;
  		})
  	},
  	getUseLogo(){//获取使用标示列表
  		var obj={
  			"channelNo":"1",
				"transCode":"SETPARARGS301",
				"bizTypeCode":"LN_UserStatus",
				"legalNum":sessionStorage.getItem("legalNum")
  		}
  		this.$post(this.$api,obj)
  		.then(res=>{
  			this.useLogos=res.rows
  		})
  	},
  	getData(){//初始化数据或查询
  		if(this.interestRate =="" && this.loanType=="" ){
  			var sendObj={
  				"channelNo":"1",
		 		"transCode":"SETLOANBR300",
				"legalNum":sessionStorage.getItem("legalNum"),
 				"indexNo":this.indexNo,
				"pageSize":this.pageSize
  			}
  		}else{
  			var sendObj={
				"channelNo":"1",
		 		"transCode":"SETLOANBR300",
				"legalNum":sessionStorage.getItem("legalNum"),
				"loanType":this.loanType,
				"interestRate":this.interestRate,
				"usdLogo":this.useLogo,
				"indexNo":this.indexNo,
				"pageSize":this.pageSize
	  		}
  		}
  		this.$post(this.$api,sendObj)
  		.then(res=>{
  			this.tableData=res.rows;
  			this.totalCount=res.totalCount
  		})
  	},
  	allAdd(obj){//页面新增
  		this.dialogFormVisible=true
  		this.resetForm('addForm')
  	},
  	//重置表单
	resetForm(formName) {
		this.$refs[formName].resetFields();
	},
  	addSure(formName){//新增保存
  		this.$refs[formName].validate((valid) => {
          if (valid) {
          	var d=new Date(this.addForm.add_adjustDate);
          	var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          	var obj={
          		"channelNo":"1",
 				"transCode":"SETLOANBR000",
 				"legalPersonNum":this.legalNum,
//        		"adjustDate":this.addForm.add_adjustDate,//调整日期
          		"adjustDate":datetime,
          		"rating":this.addForm.rating2,//利率
          		"loanType":this.addForm.add_loanType,//贷款类型
          		"interestRate":this.addForm.add_interestRate,//贷款利率档次
          		"baseRate":this.addForm.baseRate
          	}
          	this.$post(this.$api,obj)
          	.then(res=>{
          		if(res.returnMsg=="OK"){
          			this.dialogFormVisible=false;
          			this.getData()
          		}
          	})
          } else {
          }
        });
  	},
  	saw(obj){
  		this.historyTableVisible=true;
  		var funMsg={
  			"channelNo":"1",
  			"transCode":"SETLOANBR301",
  			"legalNum":this.legalNum,
			"interestRate":obj.interestRate
  		}
  		this.$post(this.$api,funMsg)
  		.then(res=>{
  			this.historyTable=res.rows;
  		})
  	},
  	editItem(obj){//页面编辑
  		this.dialogFormVisible=true
  		this.addForm.title="基准利率信息编辑";
  		this.addForm.add_interestRate=obj.interestRate;
  		this.addForm.add_loanType=obj.loanType;
  		this.addForm.rating2=obj.rating;
  		this.addForm.add_adjustDate=obj.adjustDate;
  		this.addForm.baseRate=obj.baseRate;
  	},
  	deleteItem(obj){//删除一条数据
		var oo={
			"channelNo":"1",
        	"transCode":"SETLOANBR100",
        	"baseId":obj,
		}
  		this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
	      	 
			this.$post(this.$api,oo)
		    .then(res=>{
		    	if(res.returnMsg=="OK"){
		    		this.$message({
						type: 'info',
						message: '删除成功'
					});
					this.getData();
		    	}
		    })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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

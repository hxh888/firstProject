<template>
  <!-- 产品授额管理 -->
  <div class="content_box" id="xd_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >信用卡</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >产品授额管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-row class="edit_module_search">
			<el-col :span="10">
				<div>
					<el-input placeholder="请输入产品类型名称" v-model="query" name="query" @input="onChangequery()"> <!--请输入产品名称  -->
						<template slot="prepend">产品名称</template>    <!-- 产品名称 -->
					</el-input>
				</div>
            </el-col>
          	<el-col :span="14">
				<div class="edit_module_btn">
					<el-button type="warning" icon="el-icon-search" @click="productLimitSearch()" >查询</el-button>  <!--查询按钮-->
					<el-button type="primary" icon="el-icon-plus"  @click="xdProductAdd('addForm')">新增</el-button> <!--新增按钮-->
				</div>
			</el-col>
        </el-row>  
    </div>

	<!-- 列表模块 -->
	<div class="list_module">
		<div class="table_body">
				<h4>产品授信额度列表</h4>
				<el-table :data="tableData" border style="width: 100%"   size='small'>
						<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column><!--序号-->

						<el-table-column prop="cardId" label="产品编号"  align="center"> </el-table-column><!--产品编号-->

						<el-table-column prop="bizAllName" label="产品名称"  align="center" > </el-table-column><!--产品名称-->

						<el-table-column prop="proMaxLimit" label="产品最高额度(元)"  align="center" > </el-table-column><!--产品最高额度-->

						<el-table-column prop="cashAmountLimit" label="取现额度"  align="center" > </el-table-column><!--取现额度-->

						<el-table-column prop="subCardLimitRatio" label="附属卡额度比例"  align="center" > </el-table-column><!--附属卡额度比例-->


						<el-table-column label="操作" align="center" width="180px">
							<template slot-scope="scope">
									<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
										<i class="el-icon-edit"></i>
										<span class="text">编辑</span>
									</el-button>
									<!-- 不可点击 -->
									<el-button size="mini" type="danger" v-if="scope.row.effectiveFlag==1" class="delete-btn" @click="deleteItem(scope.row)" :disabled="true">
										<i class="el-icon-delete"></i>
										<span class="text">删除岗位额度</span>
									</el-button>
									<el-button size="mini" type="danger" v-else class="delete-btn" @click="deleteItem(scope.row)">
										<i class="el-icon-delete"></i>
										<span class="text">删除岗位额度</span>
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
						:total="totalCount"
						>
				</el-pagination>
			</div>
	</div>
	<!--弹框页面开始-->
	<el-dialog title="新增产品授信额度" :visible.sync="dialogFormVisible"  :before-close="cancel"  :close-on-click-modal="false">
		<el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" size="small"   label-width="150px">
			<el-row>
					<el-col :span="12">
						<el-form-item label="产品名称" prop="cardId">    <!--产品名称-->
							<el-select v-model="addForm.cardId" placeholder="请选择">
								<el-option v-for="(item,index) in optionSsysids" 
													:key="index" 
													:label="item.bizAllName"
													:value="item.cardId">{{item.bizAllName}}</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="附属卡额度比例" prop="subCardLimitRatio" >    <!--附属卡额度比例-->
							<el-select v-model="addForm.subCardLimitRatio" placeholder="请选择" >
								<el-option v-for="(item,index) in cashRatioType" 
										:key="index" 
										:label="item.bizTypePropName"
										:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
							</el-select>
						</el-form-item>
					</el-col>			

					<el-col :span="12" >
						<el-form-item label="产品最高额度" prop="proMaxLimit" >  <!--产品最高额度-->
							<el-input v-model="addForm.proMaxLimit" ></el-input>
						</el-form-item>
					</el-col>	

					<el-col :span="12" >
						<el-form-item label="取现额度" prop="cashAmountLimit">  <!--取现额度-->
							<el-input v-model="addForm.cashAmountLimit" ></el-input>
						</el-form-item>
					</el-col>		

					<el-col :span="24" align='right' class="addLimit">
							<el-button type="primary"    @click="addPostLimit()" size="small">增加岗位限额</el-button> <!--增加岗位限额-->
					</el-col>	


					<el-col :span="24" class="table_height">

							<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
								<thead>
									<tr role="row">
										<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
										<th colspan="1" rowspan="1" class="text-center sorting"><span	class="red">*</span>岗位名称<!-- 岗位名称--></th>
										<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>岗位限制额度低限<!-- 岗位限制额度低限--></th>
										<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>岗位限制额度高限	<!-- 岗位限制额度高限--></th>
										<th colspan="1" rowspan="1" class="text-center sorting">操作<!-- 操作--></th>
									</tr>
								</thead>
								<tbody >
									<tr class="odd" v-for="(groupitem,index) in groupList" :key='index'>
										<td class="text-center">{{index+1}}</td>   <!-- 序号-->

										<td class="text-center" >  <!-- 岗位名称-->
											<el-select style="width:90%;" size="mini" v-model="groupitem.groupId" placeholder="请选择"  id="groupId">
														<el-option v-for="(item,index) in approvePost" 
															:key="index" 
															:label="item.groupName" 
															:value="item.groupId">{{item.groupName}}
														</el-option>
											</el-select>
										</td>

										<td class="text-center">  <!-- 岗位限制额度低限-->
											<el-input v-model="groupitem.postLimitLow"  id="postLimitLow" size="mini"  class="form-control"></el-input>
											
										</td> 

										<td class="text-center">  <!-- 岗位限制额度高限-->
											<el-input v-model="groupitem.postLimitMax"  id="postLimitMax"  size="mini"  class="form-control"></el-input>
										</td>

							
										<td class="text-center pt5 pb5">
											<el-button size="mini" type="danger" class="delete-btn" @click.prevent="delItem(index)">
												<i class="el-icon-delete"></i><!--删除 -->
												<span class="text">删除</span>
											</el-button>
										</td>
									</tr>
								</tbody>
							</table>

					</el-col>		

				
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancel()">取 消</el-button>
			<el-button v-if="addForm.edit" type="primary" @click="editSave()">保存</el-button>
			<el-button v-else type="primary" @click="submitAdd('addForm')">确 定</el-button>
		</div>
	
	</el-dialog>
	<!--弹框页面结束-->
  </div>
</template>

<script>
export default {
  data () {
    return {
		query:"",//查询的参数
		tableData:[],//table数据

		currentPage:1,//当前显示第几页 1开头
		pageSize:5,//一页显示几条数据
		totalCount:0,//一共有多少条数据
		indexNo:0,  //需要传过去的参数

		cashRatioType:[], //附属卡额度比例
		optionSsysids:[], //产品名称
		approvePost:[], //点击新增获取下拉列表有权审批岗

		groupList:[],//增加岗位限额

		dialogFormVisible: false,//新增弹出框是否显示
	    addForm: {
		  cardId: '',//产品名称
		  subCardLimitRatio: '',//   附属卡额度比例
		  proMaxLimit:'',//产品最高额度
		  cashAmountLimit:'', //取现额度
				
	      flag:false,   //是否可输入 默认可以
	      edit:false	 //编辑标识
	    },
	    rules:{
			cardId:[
				{required: true, message: '请选择产品名称', trigger: 'change' }
			],
			subCardLimitRatio: [
				{ required: true, message: '请选择附属卡额度比例', trigger: 'change'}
			],
	    },
    }
  },
  mounted(){
		this.initProductLimitList(); //初始化列表数据

		this.initCashRatioType(); //初始化附属卡额度比例
		this.initOptionSsysids(); //初始化产品名称

		this.initJobsName(); //初始化岗位名称
  },
  methods:{
	//初始化产品授信额度列表
	initProductLimitList(){
		var LimitListMsgData2 = {
			"channelNo":"1",
			"transCode":"SETPROPROLIMIT300",
			"indexNo":this.indexNo,
			"pageSize":this.pageSize,
			"businessType" : "0" //业务类型:0-信用卡 1-消费信贷 
		};
		this.$post(this.$api,LimitListMsgData2).then(res=>{
			if(res.returnMsg=="OK"){
				this.tableData = res.rows
				this.totalCount = res.rowsCount;
			}else{
				this.$message({
					message:res.returnMsg,
					type: 'warning' 
				})
			}
	
		})
		
	},
	//初始化产品名称
	initOptionSsysids(){
		var LimitListMsgData5 = {
			"channelNo":"1",
			"businessType" : '0',
			"transCode" : "SETPRODUCT300"
		};
		this.$post(this.$api,LimitListMsgData5).then(res =>{
			if(res.returnMsg=="OK"){
				this.optionSsysids = res.rows
			}else{
				this.$message({
					message:res.returnMsg,
					type: 'warning' 
				})
			}
		});
	},
	//初始化附属卡额度比例
	initCashRatioType(){
		var LimitListMsgData4 = {
	 		"channelNo":"1",
	 		"transCode":"SETPARARGS301",
	 		"bizTypeCode":"PMY_CASH_COMP"
		};
		this.$post(this.$api,LimitListMsgData4).then(res =>{
			if(res.returnMsg=="OK"){
				this.cashRatioType = res.rows
			}else{
				this.$message({
						message:res.returnMsg,
						type: 'warning' 
				})
			}
		});
	},
	//查询参数
	productLimitSearch(){
		if(this.query != undefined && this.query != ""){
			var LimitListMsgData1 = {
				"channelNo":"1",
				"transCode":"SETPROPROLIMIT300",
				"indexNo":this.indexNo,
				"pageSize":this.pageSize,
				"bizAllName":this.query,
				"businessType" : "0" //业务类型:0-信用卡 1-消费信贷 
			};
			this.$post(this.$api,LimitListMsgData1).then( res =>{
				if(res.returnMsg=="OK"){
					this.tableData = res.rows
					this.totalCount = res.rowsCount;
				}else{
					this.tableData = [];
				}
			});
		}else{
			this.initProductLimitList();
		}		
	},
	//初始化岗位名称
	initJobsName(){
		var formModelListData = {
			"channelNo": "1",
			"transCode": "SETPROPROLIMIT302"
		};
		this.$post(this.$api, formModelListData).then( res => {
			if(res.returnMsg=="OK"){
				this.approvePost = res.rows
			}else{
				this.$message({
					message:res.returnMsg,
					type: 'warning' 
				})
			}
		});
	},
	//新增岗位限额
	addPostLimit(){
		if (this.groupList == undefined) {
			this.groupList = [{}];
		}
		else {
			this.groupList.splice(0, 0, {});
		}
	},
	//点击新增按钮
	xdProductAdd(formName) {
		this.dialogFormVisible=true;
		this.addForm.edit=false;
	},
	//确定增加
	submitAdd(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				
				if($('#groupId').val() == ''){
					this.$message({
						message: '请选择岗位名称',
						type: 'warning' 
					})
					return
				}
				if($('#postLimitLow').val() == ''){
					this.$message({
						message: '请输入岗位限制额度低限',
						type: 'warning' 
					})
					return
				}
				if($('#postLimitMax').val() == ''){
					this.$message({
						message: '请输入岗位限制额度高限',
						type: 'warning' 
					})
					return
				}

				var  proPostlimitListNew = [];
				for (var i = 0; i < this.groupList.length; i++) {
					var proPostlimitNew = {
							postName: this.groupList[i].groupId,
							postLimitLow: this.groupList[i].postLimitLow,
							postLimitMax: this.groupList[i].postLimitMax
					};
					proPostlimitListNew.push(proPostlimitNew);
				}
				var LimitListMsgData5 = {
					"channelNo":"1",
					"transCode":"SETPROPROLIMIT000",
					"cardId":this.addForm.cardId,
					"proMaxLimit":this.addForm.proMaxLimit,
					"cashAmountLimit":this.cashAmountLimit,
					"subCardLimitRatio":this.subCardLimitRatio,
					"proPostlimitList":proPostlimitListNew,
					"businessType" : "0" //业务类型:0-信用卡 1-消费信贷 
				};
			
				this.$post(this.$api,LimitListMsgData5).then( res =>{
					if(res.returnMsg=="OK"){
							this.cancel();
							this.initProductLimitList();
							this.$message({
									message: i18n.t('user.save_successfully'),
									type: 'success' 
							})
					}else{
							this.$message({
									message:res.returnMsg,
									type: 'warning' 
							})
					}
				})
			} else {
				return false;
			}
		});
	},
	//删除岗位限额
	delItem(i){
		this.groupList.splice(i, 1);
	},
	//点击单个删除岗位额度
	deleteItem(row){
			var LimitListMsgData6 = {
				"channelNo":"1",
				"transCode":"SETPROPROLIMIT100",
				"cardId":row.cardId,
				"businessType" : "0" //业务类型:0-信用卡 1-消费信贷 
			};
			var _this =this;
			this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
			}).then(() => {
				this.$post(this.$api,LimitListMsgData6).then(function(res){
					if(res.returnMsg == 'OK'){
						_this.initProductLimitList();
						_this.$message({
							type: 'info',
							message: '删除成功'
						}); 
					}else{
						_this.$message({
							type: 'warning',
							message: res.returnMsg
						}); 
					}
				})
			}).catch(() => {
			
		});
	},
	//取消弹框重置数据
	cancel(){
		this.dialogFormVisible = false;
		this.resetForm('addForm');
		this.groupList = [];

		this.addForm.cardId='';
		this.addForm.proMaxLimit='';
		this.addForm.subCardLimitRatio='';
		this.addForm.cashAmountLimit='';
	
		this.addForm.flag=false;
		this.addForm.edit=false;
	},
	//点击编辑
	editItem(row){
		this.dialogFormVisible=true;
		// var formModelListData = {
		// 	"channelNo": "1",
		// 	"transCode": "SETPROPROLIMIT302"
		// };
		// this.$post(this.$api, formModelListData).then( res => {
		// 	if(res.returnMsg=="OK"){
		// 		this.approvePost = res.rows
		// 	}else{
		// 		this.$message({
		// 			message:res.returnMsg,
		// 			type: 'warning' 
		// 		})
		// 	}
		// });
		this.addForm.cardId=row.cardId
		this.addForm.proMaxLimit=row.proMaxLimit
		this.addForm.subCardLimitRatio=row.subCardLimitRatio
		this.addForm.cashAmountLimit=row.cashAmountLimit
	
		this.addForm.flag=true;
		this.addForm.edit=true;
	},

	//保存编辑
	editSave(){
		this.submitAdd('addForm');
	},

	//监听搜索框为空的时候展示全部数据
	onChangequery(){
		this.initProductLimitList();
	},
	//重置表单
	resetForm(formName) {
			this.$refs[formName].resetFields();
	},
	//改变每页显示多少条
	handleSizeChange(val) {
		this.pageSize =  val;
		this.indexNo = 0
		this.initProductLimitList();
	},
	//选择页数改变数据
	handleCurrentChange(val){
		this.indexNo = (val-1)*this.pageSize ;
		this.initProductLimitList(); 
	},

  }
}
</script>

<style  lang='scss'>
#xd_content{
	.el-dialog {
		width:60%!important;
	}
}
.addLimit{
		margin: 20px 0;
}
</style>
<style scoped="scoped" lang="scss">
.table_height{
	height: 250px;
	overflow: auto;

}
</style>


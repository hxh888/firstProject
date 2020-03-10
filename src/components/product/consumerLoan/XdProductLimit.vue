<template>
  <!-- 消贷授额管理 -->
  <div class="content_box" id="xd_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >消费贷</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >消贷授额管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-row class="edit_module_search">
					<el-col :span="10">
            <div>
						  <el-input placeholder="请输入产品类型名称" v-model="query" name="query" @input="onChangequery()"> <!--请输入功能名称  -->
						      <template slot="prepend">产品名称</template>    <!-- 功能名称 -->
						  </el-input>
						</div>
          </el-col>
          <el-col :span="14">
			  		<div class="edit_module_btn">
			  			<el-button type="warning" icon="el-icon-search" @click="xdProductSearch()" >查询</el-button>  <!--查询按钮-->
			  			<el-button type="primary" icon="el-icon-plus"  @click="xdProductAdd('addForm')">新增</el-button> <!--新增按钮-->
			  		</div>
			  	</el-col>
        </el-row>  
    </div>

		<!-- 列表模块 -->
		<div class="list_module">
			<div class="table_body">
						<h4>消贷产品授信额度列表</h4>
						<el-table :data="tableData" border style="width: 100%"   size='small'>
								<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column><!--序号-->

								<el-table-column prop="cardId" label="产品编号"  align="center"> </el-table-column><!--产品编号-->

								<el-table-column prop="bizAllName" label="产品名称"  align="center" > </el-table-column><!--产品名称-->

								<el-table-column prop="proMaxLimit" label="产品最高额度(元)"  align="center" > </el-table-column><!--产品最高额度(元)-->

								<el-table-column label="操作" align="center" width="180px">
									<template slot-scope="scope">
											<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
												<i class="el-icon-edit"></i>
												<span class="text">编辑</span>
											</el-button>
											<!-- 不可点击 -->
											<el-button size="mini" type="danger" v-if="scope.row.effectiveFlag==1" class="delete-btn" @click="deleteItem(scope.row)" :disabled="true">
												<i class="el-icon-delete"></i>
												<span class="text">删除</span>
											</el-button>
											<el-button size="mini" type="danger" v-else class="delete-btn" @click="deleteItem(scope.row)">
												<i class="el-icon-delete"></i>
												<span class="text">删除</span>
											</el-button>
											<!-- <el-button size="mini" type="danger" class="plus-btn">
												<i class="el-icon-plus"></i>
												<span class="text">新增</span>
											</el-button>
											<el-button size="mini" type="danger" class="search-btn">
												<i class="el-icon-search"></i>
												<span class="text">查看</span>
											</el-button> -->
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
		  <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" size="small">
				<el-row>
						<el-col :span="12">
							<el-form-item label="产品名称" prop="cardId"  label-width="120px">    <!--产品名称-->
								<el-select v-model="addForm.cardId" placeholder="请选择" :disabled="addForm.flag">
									<el-option v-for="(item,index) in optionSsysids" 
														:key="index" 
														:label="item.productName" 
														:value="item.productNum">{{item.productName}}</el-option>
								</el-select>
							</el-form-item>
						</el-col>		

						<el-col :span="12" >
							<el-form-item label="产品最高额度(元)" prop="proMaxLimit"   label-width="150px">  <!--产品最高额度(元)-->
								<el-input v-model="addForm.proMaxLimit" ></el-input>
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
												<el-select style="width:90%;" size="mini" v-model="groupitem.groupId" placeholder="请选择" >
															<el-option v-for="(item,index) in approvePost" 
																:key="index" 
																:label="item.groupName" 
																:value="item.groupId">{{item.groupName}}
															</el-option>
												</el-select>
											</td>

											<td class="text-center">  <!-- 岗位限制额度低限-->
													<el-input v-model="groupitem.postLimitLow"  size="mini"  class="form-control"></el-input>
											</td> 

											<td class="text-center">  <!-- 岗位限制额度高限-->
													<el-input v-model="groupitem.postLimitMax"  size="mini"  class="form-control"></el-input>
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


		approvePost:[], //岗位名称
		optionSsysids:[], //产品名称

		groupList:[],//增加岗位限额

		dialogFormVisible: false,//新增弹出框是否显示

	    addForm: {
	      cardId: '',//产品名称
	      proMaxLimit:'',//产品最高额度(元) 
				
	      flag:false,   //是否可输入 默认可以
	      edit:false	 //编辑标识
	    },
	    rules:{
			cardId:[
				{required: true, message: '请选择一个产品名称', trigger: 'change' }
			],
			approvePost: [
					{  required: true, message: '请选择一个岗位名称', trigger: 'change'}
			],
			postLimitLow:[
				{ required: true,  message: '请输入岗位限制额度低限'},
			],
			postLimitMax:[
				{ required: true, message: '请输入岗位限制额度高限' },
			],
	    },
    }
  },
  mounted(){
		this.initProductLimitList(); //初始化列表数据
		this.initApprovePost(); //初始化岗位名称
		this.initOptionSsysids(); //初始化产品名称
  },
  methods:{
      //初始化列表数据
        initProductLimitList(){
			var LimitListMsgData2 = {
				"channelNo":"1",
				"transCode":"SETPROPROLIMIT300",
				"indexNo":this.indexNo,
				"pageSize":this.pageSize,
				"businessType" : "1" //业务类型:0-信用卡 1-消费信贷 
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
					"transCode" : "SETLOANPRO302"
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

		//初始化岗位名称
		initApprovePost(){
				var formModelListData = {
						"channelNo": "1",
						"transCode": "SETPROPROLIMIT302"
				};
				this.$post(this.$api,formModelListData).then(res =>{
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
		//查询参数
	  	xdProductSearch(){
			if(this.query != undefined && this.query != ""){
				var LimitListMsgData1 = {
					"channelNo":"1",
					"transCode":"SETPROPROLIMIT300",
					"indexNo":this.indexNo,
					"pageSize":this.pageSize,
					"bizAllName":this.query,
					"businessType" : "1" //业务类型:0-信用卡 1-消费信贷 
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
			//点击新增按钮
		xdProductAdd(formName) {
		  	this.dialogFormVisible=true;
		  	this.addForm.edit=false;
			},
			//新增岗位限额
			addPostLimit(){
					this.initApprovePost();
					if (this.groupList == undefined) {
						this.groupList = [{}];
					}
					else {
						this.groupList.splice(0, 0, {});
					}
			},
			//删除岗位限额
			delItem(i){
					this.groupList.splice(i, 1);
			},
			//确定增加
	    submitAdd(formName){
				this.$refs[formName].validate((valid) => {
						if (valid) {
							var _this = this;
							var  proPostlimitListEditNew = [];
							for (var i = 0; i < this.groupList.length; i++) {
								var proPostlimitNewEdit = {
										postName: this.groupList[i].groupId,
										postLimitLow: this.groupList[i].postLimitLow,
										postLimitMax: this.groupList[i].postLimitMax
								};
								proPostlimitListEditNew.push(proPostlimitNewEdit);
							}
							var LimitListMsgData5 = {
									"channelNo":"1",
									"transCode":"SETPROPROLIMIT000",
									"cardId":this.addForm.cardId,
									"proMaxLimit":this.addForm.proMaxLimit,
									"proPostlimitList":proPostlimitListEditNew,
									"businessType" : "1" //业务类型:0-信用卡 1-消费信贷 
							};
							this.$post(this.$api,LimitListMsgData5).then( res =>{
										
											if(res.returnMsg=="OK"){
													_this.cancel();
													_this.initProductLimitList();
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
			//取消弹框重置数据
			cancel(){
					this.dialogFormVisible = false;
					this.resetForm('addForm');
					this.groupList = [];

					this.addForm.cardId='';
					this.addForm.proMaxLimit='';
				
					this.addForm.flag=false;
					this.addForm.edit=false;
			},
			//点击编辑
	    editItem(row){
				this.dialogFormVisible=true;
				var quoTaLimit_getMsgData = {
						"channelNo": "1",
						"transCode": "SETPROPROLIMIT301",
						"cardId":row.cardId
				};
				this.$post(this.$api, quoTaLimit_getMsgData).then( res=> {
						if (res.proPostlimitList.length > 0) {
								this.groupList = res.proPostlimitList;
						}
						else {
								res.groupList = [];
						}
				});
				this.addForm.cardId=row.cardId
				this.addForm.proMaxLimit=row.proMaxLimit
			
	    	this.addForm.flag=true;
				this.addForm.edit=true;
			},
			//保存编辑
	    editSave(){
				var _this=this;
			
				var  proPostlimitListNewEdit = [];
				for (var i = 0; i < this.groupList.length; i++) {
					var proPostlimitNew = {
							postName: this.groupList[i].groupId,
							postLimitLow: this.groupList[i].postLimitLow,
							postLimitMax: this.groupList[i].postLimitMax
					};
					proPostlimitListNewEdit.push(proPostlimitNew);
				}


				var LimitListMsgData6 = {
					"channelNo":"1",
					"transCode":"SETPROPROLIMIT200",
					"cardId":this.addForm.cardId,
					"proMaxLimit":this.addForm.proMaxLimit,
					"proPostlimitList":proPostlimitListNewEdit,
					"businessType" : "1" //业务类型:0-信用卡 1-消费信贷 
				};
	    	this.$post(this.$api,LimitListMsgData6).then(res =>{
						if(res.returnMsg=="OK"){
								this.cancel();
								this.initProductLimitList();
						}else{
								this.$message({
										message:res.returnMsg,
										type: 'warning' 
								})
						}
					
				})
			},
			//点击全删  还没接口
			deleteAllLegalPerson(){
				this.tableData = [];
			},
			//点击单个删除按钮
	    deleteItem(row){
			var LimitListMsgData6 = {
				"channelNo":"1",
				"transCode":"SETPROPROLIMIT100",
				"cardId":row.cardId,
				"businessType" : "1" //业务类型:0-信用卡 1-消费信贷 
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
<style scoped>
.table_height{
	height: 250px;
}
</style>


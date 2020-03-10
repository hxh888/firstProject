<template>
  <!-- 参数管理 -->
  <div class="content_box" id="params_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >通用设置</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >参数管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-row class="edit_module_search">
					<el-col :span="3">
						<el-select name="queryPramasType" id="queryPramasType" v-model="queryPramasType" >
								<el-option label="类型名称" value="1"></el-option>
								<el-option label="类型代码" value="2" ></el-option>
						</el-select>	
					</el-col>
					<el-col :span="10">
						<el-input v-model="query" class="input-with-select" @input="onChangequery()"></el-input>  <!--请输入功能名称  -->
					</el-col>
						
          <el-col :span="11">
			  		<div class="edit_module_btn">
			  			<el-button type="warning" icon="el-icon-search" @click="paramSearch()" >查询</el-button>  <!--查询按钮-->
			  			<el-button type="primary" icon="el-icon-plus"  @click="paramAdd('addForm')">新增</el-button> <!--新增按钮-->
			  		</div>
			  	</el-col>
        </el-row>  
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
					<h4> 参数列表</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small'>
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column><!--序号-->

							<el-table-column prop="typeName" label="类型名称"  align="center"> </el-table-column><!--类型名称-->

							<el-table-column prop="typeCode" label="类型代码"  align="center" > </el-table-column><!--类型代码-->

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
		<el-dialog title="新增参数分类" :visible.sync="dialogFormVisible"  :before-close="cancel"  :close-on-click-modal="false">
		  <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" size="small" label-width="120px">
				<el-row>
						<el-col :span="8" >
							<el-form-item label="类型名称" prop="typeName">  <!--类型名称-->
								<el-input v-model="addForm.typeName" ></el-input>
							</el-form-item>
						</el-col>		

						<el-col :span="8">
							<el-form-item label="类型代码" prop="typeCode" >  <!--类型代码-->
								<el-input v-model="addForm.typeCode" ></el-input>
							</el-form-item>
						</el-col>	

						<el-col :span="8">
							<el-form-item label="参数展示类型" prop="displayType" >    <!--参数展示类型-->
								<el-select v-model="addForm.displayType" placeholder="请选择" >
											<el-option label="列表展示" value="1" ></el-option>
											<el-option label="树状展示" value="2" ></el-option>
								</el-select>
							</el-form-item>
						</el-col>		

						<el-col :span="24" align='right' class="table_add"> 
		    				<el-button type="primary"  @click="addPostLimit()" size="small"  :disabled="addForm.flag">增加类型参数</el-button>
						</el-col>	

						<el-col :span="24" class="table_height">
								<el-table :data="UserList1" border style="width: 100%"   size='small'  v-if="addForm.edit">
									<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column><!--序号-->

									<el-table-column prop="paramSeedName" label="参数名称"  align="center"  width="150px"> </el-table-column><!--参数名称-->

									<el-table-column prop="paramSeedVal" label="参数值"  align="center"  width="150px"> </el-table-column><!--参数值-->

									<el-table-column prop="typeName" label="类型名称"  align="center" width="200px" > </el-table-column><!--类型名称-->

									<el-table-column prop="typeCode" label="类型代码"  align="center" > </el-table-column><!--类型代码-->

									<el-table-column prop="paramId" label="父级参数"  align="center"   width="160px"    v-if="addForm.displayType == 2 "> 
											<template>
													<el-select style="width:95%;" size="mini" width='90%' :disabled="addForm.flag">
															<!-- <option v-for="(row1,index) in UserList1" :key='index' :value="row1.paramSeedVal">{{row1.paramSeedName}}</option> -->
																<!-- <el-option label="列表展示" value="1" ></el-option>
																<el-option label="树状展示" value="2" ></el-option> -->
													</el-select>
											</template>
									</el-table-column><!--父级参数-->

									<el-table-column label="操作" align="center" width="180px">
										<template slot-scope="scope">
												<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
													<i class="el-icon-edit"></i>
												</el-button>
												<!-- 不可点击 -->
												<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
													<i class="el-icon-delete"></i>
												</el-button>
										</template>
									</el-table-column>
								</el-table>

								<table aria-describedby="editable-sample_info" class="table" id="week-sample" v-else>
										<thead>
											<tr role="row">
												<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
												<th colspan="1" rowspan="1" class="text-center sorting"><span	class="red">*</span>参数名称<!-- 参数名称--></th>
												<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>参数值<!-- 参数值--></th>
												<th colspan="1" rowspan="1" class="text-center sorting" v-if="addForm.displayType == 2 ">父级参数	<!-- 父级参数--></th>
												<th colspan="1" rowspan="1" class="text-center sorting">操作<!-- 操作--></th>
											</tr>
										</thead>
										<tbody >
											<tr class="odd" v-for="(paramSeed,index) in paramSeedList" :key='index'>
												<td class="text-center">{{index+1}}</td>
												<td class="text-center">
													<textarea 	name="postName" id="postName"
														v-model="paramSeed.paramSeedName" class="form-control"
														type="text" rows="1" >
													</textarea>
												</td>
												<td class="text-center">
													<textarea 
														name="postLimitLow" id="postLimitLow"
														v-model="paramSeed.paramSeedVal" class="form-control"
														type="text" rows="1">
													</textarea>
												</td> 
												<td class="text-center" v-if="addForm.displayType == 2 ">  <!-- 父级参数-->
													<el-select style="width:90%;" size="mini" width='90%' v-model="paramSeed.paramPId" placeholder="请选择" >
															<option v-for="(row1,index) in UserList1" :key='index' :value="row1.paramSeedVal">{{row1.paramSeedName}}</option>
																<!-- <el-option label="列表展示" value="1" ></el-option>
																<el-option label="树状展示" value="2" ></el-option> -->
													</el-select>
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
			queryPramasType:'1',

			tableData:[],//table数据

			currentPage:1,//当前显示第几页 1开头
      pageSize:5,//一页显示几条数据
			totalCount:0,//一共有多少条数据
			indexNo:0,  //需要传过去的参数

			proPostlimitList:[],//岗位限额列表

			dialogFormVisible: false,//新增弹出框是否显示

	    addForm: {
	      typeName: '',//类型名称
	      typeCode:'',//类型代码
				displayType:'1',//参数展示类型
				
	      flag:false,   //是否可输入 默认可以
	      edit:false	 //编辑标识
			},
			paramSeedList:[],//新增参数里面的表格
			UserList1:[],//父级参数
	    rules:{
          typeName:[
						{ required: true,  message: '请输入类型名称', trigger: 'blur' },
          ],
          typeCode:[
						{ required: true, message: '请输入类型代码', trigger: 'blur' },
          ],
	    },
    }
  },
  mounted(){
		this.initPramasList(); //初始化参数列表数据
  },
  methods:{
      //初始化参数列表数据
      initPramasList(){
					if(this.query != undefined && this.query != ""){
							if(this.queryPramasType == "1"){
									var ParameterListMsgData2 = {
										"channelNo":"1",
										"transCode":"SETPARPARAMTYPE300",
										"typeName":this.query,
										"onlyParent":1,
										"indexNo":this.indexNo,
										"pageSize":this.pageSize
									};
							}else if(this.queryPramasType == "2"){
									var ParameterListMsgData2 = {
										"channelNo":"1",
										"transCode":"SETPARPARAMTYPE300",
										"typeCode":this.query,
										"onlyParent":1,
										"indexNo":this.indexNo,
										"pageSize":this.pageSize
									};
							}
							this.$post(this.$api,ParameterListMsgData2).then(res =>{
									if(res.returnMsg=="OK"){
											this.tableData = res.rows;
											this.totalCount = res.totalCount;
									}else{
											this.tableData = res.rows;
									}
							});
					}else{
							var ParameterListMsgData1 = {
								"channelNo":"1",
								"transCode":"SETPARPARAMTYPE300",
								"onlyParent":1,
								"indexNo":this.indexNo,
								"pageSize":this.pageSize
							};
							this.$post(this.$api,ParameterListMsgData1).then(res =>{
									if(res.returnMsg=="OK"){
											this.tableData = res.rows;
											this.totalCount = res.totalCount;
									}else{
											this.tableData = res.rows;
									}

							});
        	}
			},
			//查询参数
	  	paramSearch(){
				this.initPramasList();
			},
			//新增岗位限额
			addPostLimit(){
					if (this.proPostlimitList == undefined) {
						this.proPostlimitList = [{}];
					}
					else {
						this.proPostlimitList.splice(0, 0, {});
					}
			},
			//点击新增按钮
		  paramAdd(formName) {
		  	this.dialogFormVisible=true;
		  	this.addForm.edit=false;
			},
			//增加参数类型
			addPostLimit(){
					if (this.paramSeedList == undefined) {
							this.paramSeedList = [{}];
					}
					else {
							this.paramSeedList.splice(0, 0, {});
					}
			},
			//删除参数类型
			delItem(index){
					this.paramSeedList.splice(index, 1);
			},
				
			//确定增加
	    submitAdd(formName){
				this.$refs[formName].validate((valid) => {
						if (valid) {
								var _this = this;

								var typeAndParamSeedList = [];
								for (var i = 0; i < this.paramSeedList.length; i++) {
									var typeAndParamSeedNew = {
											"paramSeedName":this.paramSeedList[i].paramSeedName,
											"paramSeedVal":this.paramSeedList[i].paramSeedVal,
											"paramPId":this.paramSeedList[i].paramPId
									};
									typeAndParamSeedList.push(typeAndParamSeedNew);
								}

								var typeAndParamSeedNew2 = {
										"channelNo":"1",
										"transCode":"SETPARPARAMTYPE000",
										"typeName":this.addForm.typeName,
										"typeCode":this.addForm.typeCode,
										"row":this.typeAndParamSeedList
								};
							
								this.$post(this.$api,typeAndParamSeedNew2).then( res =>{
											_this.dialogFormVisible = false;
											_this.resetForm('addForm');
											if(res.returnMsg=="OK"){
													_this.initPramasList();
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
					this.resetForm('addForm');
					this.dialogFormVisible = false;
				 	this.addForm.typeName= ''
					this.addForm.typeCode= ''
					this.addForm.displayType =  ''

					this.paramSeedList = [];

					this.addForm.flag=false;
					this.addForm.edit=false;
			},
			//点击编辑
	    editItem(row){
				this.dialogFormVisible=true;
	    	this.addForm.typeName=row.typeName
	    	this.addForm.typeCode=row.typeCode
				this.addForm.displayType = '1'
	    	this.addForm.flag=true;
				this.addForm.edit=true;

				//查询父级参数
				var ParameterListMsgData7 = {
					"channelNo":"1",
					"transCode":"SETPARPARAMTYPE301",
					"paramId":row.paramId,
					"onlyParent":1,
					"indexNo":this.indexNo,
					"pageSize":this.pageSize,
				};
				this.$post(this.$api,ParameterListMsgData7).then(res =>{
						if(res.returnMsg=="OK"){
							this.UserList1 = res.rows;
						}else{
							this.UserList1 = [];
						}
				});

			},
			//保存编辑
	    editSave(){
	    	var that=this
	    	var FunMsgData5 = {
			 		"channelNo":"1",
			 		"transCode":"SETSYSLEG200",
			 		"legalPersonNum":this.addForm.legalPersonNum,
					"legalPersonName":this.addForm.legalPersonName,
					"judicialPersonName":this.addForm.judicialPersonName,
					"cardType":this.addForm.cardType,
					"cardNo":this.addForm.cardNo,
					"effectiveFlag":this.addForm.effectiveFlag,
					"legalPersonEmail":this.addForm.legalPersonEmail,
					"legalPersonMobile":this.addForm.legalPersonMobile,
					// "legalPersonTel":this.addForm.legalPersonTel
				}
	    	this.$post(this.$api,FunMsgData5).then(res =>{
						this.dialogFormVisible=false
						if(res.returnMsg=="OK"){
								this.initPersonList();
						}else{
								this.$message({
										message:res.returnMsg,
										type: 'warning' 
								})
						}
					
				})
			},
			//点击单个删除按钮
	    deleteItem(row){
				var ParameterListMsgData9 = {
					"channelNo":"1",
					"transCode":"SETPARPARAMTYPE100",
					"paramId":row.paramId
				};
				var _this =this;
				this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
						this.$post(this.$api,ParameterListMsgData9).then(function(res){
								if(res.returnMsg == 'OK'){
										_this.initPramasList();
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
					this.initPramasList();
			},
			//重置表单
			resetForm(formName) {
					this.$refs[formName].resetFields();
			},
			//改变每页显示多少条
			handleSizeChange(val) {
				this.pageSize =  val;
				this.indexNo = 0
				debugger
				this.initPramasList();
			},
			//选择页数改变数据
			handleCurrentChange(val){
				this.indexNo = (val-1)*this.pageSize ;
				this.initPramasList(); 
			},
  }
}
</script>

<style  lang='scss'>
#params_content{
	.el-dialog {
		width:70%!important;
	}
}
.add_limit_table{
	width: 100%;
	border: 1px solid  #f5f5f5;
	th{
		border: 1px solid #f5f5f5;
		// padding: 15px;
	}
	tr{
		td{
			border: 1px solid  #f5f5f5;
			padding:0 5px;
		}
	}
}
.table_height{
	height: 250px;
	overflow: auto;
	table{
		width: 100%;
	}
	th{
		line-height:35px;
	}
	td{
		text-align: center;
		// padding: 6px 0 0 0;
		textarea{
			width: 90%;
			border: 1px solid #ccc;
			border-radius: 4px;
			line-height: 30px;
		}
	}
	td,th{
		border: 1px solid #f5f5f5;
	}
}
.table_add{
	margin: 10px 0;
}

</style>

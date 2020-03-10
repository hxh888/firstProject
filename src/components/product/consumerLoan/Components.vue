<template>
  <!-- 组件库管理 -->
  <div class="content_box" id="component_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >消费贷</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >组件库管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline">
          <el-row>
          <el-col :span="14">
              <el-form-item label="组件名称">
                <el-input v-model="query" placeholder="请输入组件名称" @input="onChangequery()"></el-input>
              </el-form-item>
              <el-form-item label="组件类型">
                <el-select v-model="componentType" placeholder="请选择">
                  <el-option  :value="item.bizTypePropCode" 
															v-for="(item,index) in componentTypeList" 
															:key="index"  :label="item.bizTypePropName"  >{{item.bizTypePropName}}</el-option>
								</el-select>
              </el-form-item>
          </el-col>
          <el-col :span="10" class="edit_module_btn" >
            <el-form-item>
                  <el-button icon="el-icon-refresh" @click="componentReset()" >重置</el-button>  <!--重置按钮-->
                  <el-button type="warning" icon="el-icon-search" @click="componentSearch()" >查询</el-button>  <!--查询按钮-->
                  <el-button type="primary" icon="el-icon-plus"  @click="ComponentAdd('addForm')">新增</el-button> <!--新增按钮-->
            </el-form-item>
           </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
					<h4>组件列表</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small'>
							<el-table-column prop="index" type="index" label="序号" align="center" width="60px"></el-table-column><!--序号-->

							<el-table-column prop="componentName" label="组件名称"   align="center"> </el-table-column><!--组件名称-->

							<el-table-column prop="componentTypeName" label="组件类型"   align="center" > </el-table-column><!--组件类型-->
              
							<el-table-column prop="status" label="组件状态"  align="center"> </el-table-column><!--组件状态	-->
						
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
		<el-dialog title="新增组件" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
		  <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" size="small"  label-width="160px">
				<el-row>
            <!-- 组件操作 -->
            <el-col :span="12">
							<el-form-item label="组件操作"  prop="componentTypeName" >
								<el-select v-model="addForm.componentTypeName" placeholder="请选择" >
										<el-option v-for="(item,index) in componentTypeList" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}
										</el-option>
								</el-select>
							</el-form-item>
						</el-col>		

            <!-- 组件名称 -->
						<el-col :span="12">
							<el-form-item label="组件名称" prop="componentName"  >
								<el-input v-model="addForm.componentName" ></el-input>
							</el-form-item>
						</el-col>	

            <!-- 使用范围组件 -->
            <div class="div1" id="div1" v-if='slectmodule==1' >
							<h3>属性信息:</h3>
							<el-col :span="12">
								<el-form-item label="产品使用器使用机构:"  prop="componentTypeName"  style="position:reletive;">
										<el-select v-model="addForm.componentTypeName" placeholder=""  @click="treeSelectFun()" ></el-select>
									
										<span @click="treeSelectFun()" 
													class='treeSelectFun' 
													id="treeSelect_value">
													{{custIndustry}}
										</span>

										<el-tree v-show="isShowTree"  
														id="tree_box" 
														:data="treeData" 
														:props="defaultProps" 
														:default-expanded-keys="[0]"  
														@node-click="handleNodeClick">
										</el-tree>

										<!-- <el-tree
												:auto-expand-parent="true"
												:props="defaultProps" 
												:render-content="renderContent" 
												:highlight-current="true" 
												:expand-on-click-node="false"
												:default-expanded-keys="[0]" ，
												lazy
												:load="loadChildData"
												@node-click="handleNodeClick">
										</el-tree> -->

								</el-form-item>
							</el-col>	
            </div>
            <!-- 还款方式 -->
						<div class="div1 " id="div2" v-if='slectmodule==2'  >
								<h3>
									<span>还款方式列表:</span>	
                  <el-button type="primary" icon="el-icon-plus"  @click="repaymentAdd()" size="small">新增</el-button> <!--新增-->
								</h3>
										<el-table :data="tableData2" border style="width: 100%"   size='small'>
											<el-table-column prop="repayWayNum"  label="还款方式编号" align="center" ></el-table-column><!--还款方式编号	-->

											<el-table-column prop="repayWayName" label="还款方式名称"   align="center"> </el-table-column><!--还款方式名称-->

											<el-table-column prop="baseRepayMode" label="还款方式分类"   align="center" > </el-table-column><!--还款方式分类-->
											
											<el-table-column prop="repayModeSort" label="基准还款方式"  align="center"> </el-table-column><!--组件状态	-->

											<el-table-column prop="createrName" label="创建人	"  align="center"> </el-table-column><!--创建人		-->

											<el-table-column prop="createTime" label="创建时间"  align="center"> </el-table-column><!--创建时间	-->

											<el-table-column label="操作" align="center">
												<template slot-scope="scope">
														<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
															<i class="el-icon-delete"></i>
															<span class="text">删除</span>
														</el-button>
												</template>
											</el-table-column>
									</el-table>
            </div>

            <!-- 限额控制组件 -->
             <div class="div1" id="div3" v-if='slectmodule==3'  >
                3
            </div>
            <!-- 定价组件 -->
						<div class="div1" id="div4" v-if='slectmodule==4'  >
                4
            </div>
						
				</el-row>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button v-if="addForm.edit" type="primary" @click="editSave()">保存</el-button>
		    <el-button v-else type="primary" @click="submitAdd('addForm')">确 定</el-button>
		  </div>
		
		</el-dialog>
		<!--弹框页面结束-->

		<!-- 绑定还款方式 -->
		<el-dialog title="绑定还款方式" :visible.sync="bindrepayment"  :before-close="cancelBindrepayment" :close-on-click-modal="false">
					<el-table :data="tableData3" border style="width: 100%"   size='small'>
							<el-table-column prop="repayWayNum"  label="还款方式编号" align="center" ></el-table-column><!--还款方式编号	-->

							<el-table-column prop="repayWayName" label="还款方式名称"   align="center"> </el-table-column><!--还款方式名称-->

							<el-table-column prop="baseRepayMode" label="还款方式分类"   align="center" > </el-table-column><!--还款方式分类-->
							
							<el-table-column prop="repayModeSort" label="基准还款方式"  align="center"> </el-table-column><!--组件状态	-->

							<el-table-column prop="createrName" label="创建人	"  align="center"> </el-table-column><!--创建人		-->

							<el-table-column prop="createTime" label="创建时间"  align="center"> </el-table-column><!--创建时间	-->

							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
										<el-button size="mini" type="success"  @click="selectItem(scope.row)">
											<span class="text">选中</span>
										</el-button>
								</template>
							</el-table-column>
					</el-table>	
					<el-pagination
							@size-change="rhandleSizeChange"
							@current-change="rhandleCurrentChange"
							:current-page="rcurrentPage"
							:page-sizes="[5, 10, 15, 20,25]"
							:page-size="rpageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="rtotalCount"
							>
					</el-pagination>		
		</el-dialog>
  </div>
</template>

<script>
import toTreeData from '@/utils' 
export default {
  data () {
    return {
			isShowTree:false, //显示树
			custIndustry:'', //选中树
			defaultProps: {
          children: 'children',
          label: 'label'
			},
			//树的数据
			treeData:[],   //组件列表
			tableData2:[],//还款方式列表
			tableData3:[],//绑定还款方式

			 
			slectmodule:2,

			
			componentType:"",//查询的类型
			componentTypeList:[], //查询的类型list
			repayModeSortList:[],
			query:"",//查询的参数
			
			tableData:[],//组件table数据

			currentPage:1,//当前显示第几页 1开头
      pageSize:5,//一页显示几条数据
			totalCount:10,//一共有多少条数据
			indexNo:0,  //需要传过去的参数

			rcurrentPage:1,//当前显示第几页 1开头
      rpageSize:5,//一页显示几条数据
			rtotalCount:10,//一共有多少条数据
			rindexNo:0,  //需要传过去的参数

			dialogFormVisible: false,//新增弹出框是否显示
			bindrepayment: false,//二级新增弹出框显示

	    addForm: {
	      componentName:'', //组件名称
	      componentTypeName:'', //组件操作
	      flag:false,   //是否可输入 默认可以
	      edit:false	 //编辑标识
	    },
	    rules:{
	    		componentName: [
            { required: true, message: '组件名称不能为空', trigger: 'blur' },
            // { pattern: /^[A-Z0-9]{18,20}$/, message: '请输入正确的社会统一信用代码（只支持大写字母和数字）' },
          ],
          componentTypeName:[
          	{ required: true, message: '请选择组件类型', trigger: 'blur' },
          ],
	    },
    }
  },
  mounted(){
		this.initComponentList();
		this.initComponentType();

		this.getTreeObjData();
  },
  methods:{
			// 选中当前还款方式
			selectItem(e){
					this.bindrepayment = false;
					this.tableData2 = this.tableData3.splice();
			},
			//还款方式列表查询	
			repaymentAdd(){
				this.bindrepayment = true;
				var huanKuanMsgData3 = {
					"channelNo":"1",
					"transCode":"SETLOANREPWAY300",
					"indexNo":this.rindexNo,
					"pageSize":this.rpageSize
				};
				this.$post(this.$api,huanKuanMsgData3).then(res =>{
						if(res.returnMsg =='OK'){
							this.rtotalCount = res.totalCount;
							this.tableData3 = res.rows;
	          	// for(var i in res.rows){
							// 	var obj = res.rows[i];
							// 	obj.baseRepayModeVal = this.getEnumValue(this.componentTypeList,obj.baseRepayMode);
							// 	obj.repayModeSortVal = this.getEnumValue(this.repayModeSortList,obj.repayModeSort);
							// };
						}else{
						}
	   	 		
	   	 	});
			},
			cancelBindrepayment(){
				this.bindrepayment = false
			},
			// 字典信息匹配
			getEnumValue(enumData, value){
				if( enumData != null ){
					var i = 0, len = enumData.length;
					for(; i < len; i++) {
						if(enumData[i].bizTypePropCode == value) {
							return enumData[i].bizTypePropName;
						}
					}
				}
				return value;
			},
			// 选中树节点显示在select中
			handleNodeClick(val){
				this.custIndustry = val.label
			},
			// 点击下拉显示树
			treeSelectFun(){
				$(".treeSelect option").hide();
				$("#tree_box").toggle()
			},
			// 初始化树
			getTreeObjData(openTreeId){
					var OrgListMsgData4 = {
						"channelNo":"1",
						"transCode":"SETSYSBRA300",
						"bizTypeCode":"LN_Industry",
						"flag": "1" //1：只查询启用状态的机构
					};
					this.$post(this.$api,OrgListMsgData4).then(res =>{
								if(res.returnMsg=="OK"){
										//this.treeData = toTreeData(res.row,"id","pid","label")//这样调用就好使了
								}
							
					});

			}, 
			//基准还款方式  ？
			initComponentType(){
				var GroupListTradeType = {
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_ComponentType"
				};
				this.$post(this.$api,GroupListTradeType).then( res=> {
						if(res.returnMsg =='OK'){
								this.componentTypeList = res.rows;
						}
					});
			},
			//还款方式分类类型 ？
			initComponentType(){
				var GroupListRepaymentWay = {
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_RepayModeSort"
				};
				this.$post(this.$api,GroupListRepaymentWay).then(res=>{
						$scope.repayModeSortList = objc.rows;
				});
			},
      //初始化列表数据
      initComponentList(){
					var GroupListFeeData = {
							"channelNo":"1",
							"transCode":"SETLOANCOMLIB300",
							// "componentName":this.query,
							// "componentType":this.componentType,
							"legalNum":"00001",
							"indexNo": this.indexNo,
							"pageSize": this.pageSize,
					};
          this.$post(this.$api,GroupListFeeData).then(res=>{
							if(res.returnMsg=="OK"){
									this.tableData = res.rows
									this.totalCount = res.totalCount;
									this.tableData.forEach( ele =>{
											if(ele.status == 1){	ele.status = '已发布'}
											else{ele.status = '已下架'	}
									})
							}else{
									this.$message({
											message:res.returnMsg,
											type: 'warning' 
									})
							}
             
					})
					
			},
			//查询参数
	  	componentSearch(){
		  		if(this.query != undefined && this.query != ""){
							var GroupListFeeData = {
									"channelNo":"1",
									"transCode":"SETLOANCOMLIB300",
									"componentName":this.query,
									"componentType":this.componentType,
									"legalNum":"00001",
									"indexNo": this.indexNo,
									"pageSize": this.pageSize,
							};
							this.$post(this.$api,GroupListFeeData).then( res =>{
									if(res.returnMsg=="OK"){
											this.tableData = res.rows
											this.totalCount = res.totalCount;
									}else{
											this.$message({
													message:res.returnMsg,
													type: 'warning' 
											})
									}
							});
					}else{
							this.initComponentList();
        	}		
			},
			//重置参数
			componentReset(){
					this.query = '';
					this.componentType ='';
					this.initComponentList();
			},
			//点击新增按钮
		  ComponentAdd(formName) {
		  	this.dialogFormVisible=true;
		  	this.addForm.edit=false;
			},
			choseModule(val){
          if(val == 1){
              this.slectmodule =1;
          }if(val == 2){
              this.slectmodule =2;
          }if(val == 3){
              this.slectmodule =3;
          }if(val == 4){
              this.slectmodule =4;
          }
			},
			//确定增加法人
	    submitAdd(formName){
				this.$refs[formName].validate((valid) => {
						if (valid) {
								var _this = this;
								var	FunMsgData4 = {
										"channelNo":"1",
										"transCode":"SETSYSLEG000",
										"legalPersonNum":this.addForm.legalPersonNum,
										"legalPersonName":this.addForm.legalPersonName,
										"judicialPersonName":this.addForm.judicialPersonName,
										"cardType":this.addForm.cardType,
										"cardNo":this.addForm.cardNo,
										"legalPersonMobile":this.addForm.legalPersonMobile,
										"legalPersonTel":this.addForm.legalPersonTel,
										"legalPersonEmail":this.addForm.legalPersonEmail,
										"effectiveFlag":this.addForm.effectiveFlag,
										// "sysId":this.sysid,
								};
								this.$post(this.$api,FunMsgData4).then( res =>{
											_this.dialogFormVisible = false;
											_this.resetForm('addForm');
											if(res.returnMsg=="OK"){
													_this.initPersonList();
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
			//获取法人代表证件类型
	  	levelTypeCardType(){
	  		this.$post(this.$api,{
		  			"channelNo":"1",
				 		"transCode":"SETPARARGS301",
				 		"bizTypeCode":"APPI_MC_ID_TYPE",
				 		"legalPersonNum":"001"
		  	}).then( res =>{
	  			this.cardType=res.rows;
	  		})
			},
			//取消弹框重置数据
			cancel(){
					this.dialogFormVisible = false;
					this.addForm.legalPersonNum='';
					this.addForm.legalPersonName='';
					this.addForm.judicialPersonName='';
					this.addForm.cardType='';
					this.addForm.cardNo='';
					this.addForm.legalPersonMobile='';
					this.addForm.legalPersonTel='';
					this.addForm.legalPersonEmail='';
					this.addForm.effectiveFlag='';
					this.addForm.flag=false;
					this.addForm.edit=false;
			},
			//点击编辑法人
	    editItem(row){
	    	this.dialogFormVisible=true;
	    	this.addForm.componentName=row.componentName
	    	this.addForm.componentTypeName=row.componentTypeName
	    	this.addForm.flag=true;
				this.addForm.edit=true;
			},
			//保存编辑法人
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
				var feeData = {
					"channelNo":"1",
					"transCode":"SETLOANCOMLIB100",
					"legalNum":"00001",
					"componentId":row.id,
				};
				var _this =this;
				this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
						this.$post(this.$api,feeData).then(function(res){
								if(res.returnMsg == 'OK'){
										_this.initComponentList();
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
					this.initComponentType();
			},
			//重置表单
			resetForm(formName) {
					this.$refs[formName].resetFields();
			},
			//改变每页显示多少条
			handleSizeChange(val) {
				this.pageSize =  val;
				this.indexNo = 0
				this.initComponentList();
			},
			//选择页数改变数据
			handleCurrentChange(val){
				this.indexNo = (val-1)*this.pageSize ;
				this.initComponentList(); 
			},

			//改变每页显示多少条
			rhandleSizeChange(val) {
				this.rpageSize =  val;
				this.rindexNo = 0
				this.repaymentAdd();
			},
			//选择页数改变数据
			rhandleCurrentChange(val){
				this.rindexNo = (val-1)*this.rpageSize ;
				this.repaymentAdd(); 
			},

  }
}
</script>

<style  lang='scss'>
#component_content{
	.el-dialog {
		width:70%!important;
	}
}
.treeSelectFun{
		font-size:14px;
		line-height:32px; 
		height:32px;
		display:inline-block;
		position: absolute;
		top: 0;
		left:0;
		padding-left: 20px;
		width: 100%;
		overflow: hidden
}
</style>

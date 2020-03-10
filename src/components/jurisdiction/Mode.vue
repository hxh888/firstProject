<template>
  <!-- 功能管理 -->
  <div class="content_box" id="legalPerson_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
			<el-row>
				<el-col :span="24">
					<el-form-item :label="$t('fun.Of_menu')">     	<!-- 所属菜单 -->
						<el-input v-model="searchForm.queryMenu" ></el-input>
					</el-form-item>
					<el-form-item :label="$t('fun.Function_name')">     	<!-- 功能名称 -->
						<el-input v-model="searchForm.queryName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="edit_module_btn" >
					<el-form-item>
						<el-button type="warning" icon="el-icon-search" @click="initModeList(1)" >{{$t('Query')}}</el-button>  <!--查询按钮-->
						<!--新增按钮-->
						<!-- <el-button type="primary" icon="el-icon-plus"  @click="modeAdd()">新增</el-button>  -->
					</el-form-item>
				</el-col>
			</el-row>  
		</el-form>
    </div>

	<!-- 列表模块 -->
    <div class="list_module">
		<div class="table_body">
			<h4>{{$t('fun.Function_list')}}</h4>  <!-- 功能列表 -->
			<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
					<!--序号-->
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
					<!--所属菜单-->
 					<el-table-column prop="menuName" :label="$t('fun.Of_menu')"  align="center" min-width="165px"> </el-table-column>
					<!--功能名称-->
 					<el-table-column prop="funName" :label="$t('fun.Function_name')"  align="center" min-width="155px"> </el-table-column>
					<!--创建日期-->
 					<el-table-column prop="createTime" :label="$t('Create_date')"  align="center" min-width="130px"> </el-table-column>
					<!--创建用户-->
					<el-table-column prop="createUser" :label="$t('Create_user')"   align="center"  width="150px" min-width="160px"></el-table-column>
					<!--操作-->
					<!--<el-table-column label="操作" align="center" width="180px">
						<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)">
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span>
								</el-button> 

								<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
									<i class="el-icon-edit"></i>
									<span class="text">修改</span>
								</el-button>
								<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
									<i class="el-icon-delete"></i>
									<span class="text">{{$t('Delete')}}</span>
								</el-button>
								
						</template>
					</el-table-column> -->
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				layout="prev, pager, next, slot"
				:total="totalCount">
				<template slot>
					<div class="slot_pag">
						<el-select v-model="pageSize" size="mini" @change="handleSizeChange">  <!-- 10条/页 -->
							<el-option :value="5" :label="'5'+$t('size')"></el-option>
							<el-option :value="10" :label="'10'+$t('size')"></el-option>
							<el-option :value="15" :label="'15'+$t('size')"></el-option>
						</el-select>
						<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
						<span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
						<el-input size="mini" v-model="goPage"  type="number">
							</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
						<el-button  type="warning" @click="goPageSure(goPage)">{{$t('OK')}}</el-button><!-- 确定 -->
					</div>
				</template>
			</el-pagination>
		</div>
	</div>
	<!--======================================================-->
	<!--弹框页面开始-->
	<el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
		<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  :rules="$rules.fun" ref="addForm" id="addForm" size="small"  label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item :label="$t('legalPerson_num')"> <!-- 法人编号 -->
						<el-input v-model="addForm.legalPersonNum"  disabled></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item :label="$t('Unit')"> <!-- 公司名称 -->
						<el-input v-model="addForm.legalPersonName"  disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row  v-if="addForm.edit ==3 ">
				<el-col :span="12">
					<el-form-item label="功能编号">
						<el-input v-model="addForm.funNum"  :disabled="addForm.flag"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="功能名称" >
						<el-input v-model="addForm.funName"   :disabled="addForm.flag"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row  v-else>

				<el-col :span="12">
					<el-form-item label="功能名称"  prop="funName">
						<el-input v-model="addForm.funName" ></el-input>
					</el-form-item>
				</el-col>


				<el-col :span="12">
					<el-form-item label="状态" prop="funState" >
						<el-select v-model="addForm.funState" >
							<el-option label="失效" value="0"></el-option>
							<el-option label="生效" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-if="addForm.edit ==3 ">
				<el-col :span="12">
					<el-form-item label="状态">
						<el-select v-model="addForm.funState" :disabled="addForm.flag">
							<el-option label="失效" value="0"></el-option>
							<el-option label="生效" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row v-show="addForm.edit ==3 ">
				<el-col :span="12">
					<el-form-item label="创建时间" prop="createTime" >
						<el-input v-model="addForm.createTime"  :disabled="addForm.flag"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="创建用户" prop="createUser"  >
						<el-input v-model="addForm.createUser"  :disabled="addForm.flag"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="addForm.edit ==3 ">
				<el-col :span="12">
					<el-form-item label="修改时间" prop="updateTime" >
						<el-input v-model="addForm.updateTime"  :disabled="addForm.flag"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="修改用户" prop="updateUser"  >
						<el-input v-model="addForm.updateUser" :disabled="addForm.flag" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button v-if="addForm.edit ==1" @click="resetForm('addForm')">重置</el-button>
			<el-button v-if="addForm.edit ==2" type="primary" @click="editSave('addForm')">保存</el-button>
			<el-button v-if="addForm.edit ==1" type="primary" @click="submitAdd('addForm')">保存</el-button>
		</div>
	
	</el-dialog>
	<!--弹框页面结束-->
	<!--======================================================-->
  </div>
</template>

<script>
export default {
  name: 'Mode',
  data () {

    return {
		searchForm:{  //查询条件
			queryName:'',
			queryMenu:'' 
		},
		tableData:[],//功能table数据

		currentPage:1,//当前显示第几页 1开头
		pageSize:10,//一页显示几条数据
		totalCount:0,//一共有多少条数据
		goPage: null,
	
		title:'', //弹框标题
		dialogFormVisible: false,//新增弹出框是否显示

		cardTypeList:[],//功能代表证件类型
		
	    addForm: {
	      funNum: '',//功能编号
		  funName:'',//功能名称 
		  funState:'1', //功能状态

		  id:'', //id
		  createUser:'',//创建人
		  updateUser:'',//修改人
		  createTime:'', //创建时间
		  updateTime:'', //修改时间
		  isDelete:'', //是否删除
		  flag:false,   //是否可输入 默认可以
		  edit:1,	 //标识 1 是新增 2是编辑 3是查看
		  legalPersonNum:"",
		  legalPersonName:""
		},
		errmsg:'',
		
    }
  },
  created(){
	  this.defaultAddForm=$.extend({},this.addForm); //重置数据  初始化的时候深拷贝一下
	  this.getFrInfo();
  },
  mounted(){
	this.initModeList(1);  //初始化列表数据
	
  },
  methods:{
	// 初始化列表数据
	initModeList(val){
			if(this.searchForm.queryName==""&&this.searchForm.queryMenu==""){
				var FunMsgData={
					"pageIndex":val,
					"pageSize":this.pageSize,
				}
			}else{
				var FunMsgData = {
					"funName":this.searchForm.queryName,
					"menuName":this.searchForm.queryMenu,
					"pageIndex":val,
					"pageSize":this.pageSize,
				};
			}
			
			this.$post(this.$api + '/fun/findByPage',FunMsgData).then( res =>{
				if(res.returnCode=="000000"){
					this.tableData =res.returnData.rows
					for(var i  in res.returnData.rows){
						var obj =  res.returnData.rows[i]
						obj.createTime= obj.createTime.substring(0,10);
					}
					this.totalCount = res.returnData.total;
				}
			});
	},
	// ==========================================
	//点击新增按钮
	modeAdd() {
		this.dialogFormVisible = true;
		this.addForm.edit= 1;
		this.title= '新增功能';
	},
	//确定增加功能
	submitAdd(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				var	FunMsgData4 = {
					// "funNum":this.addForm.funNum,
					"funName":this.addForm.funName,
					"funState":this.addForm.funState,
				};
				this.$post(this.$api + '/fun/saveFun',FunMsgData4).then( res =>{
					this.cancel();
					if(res.returnCode=="000000"){
						this.initModeList(1);
						this.$alert('新增功能成功', {
							dangerouslyUseHTMLString: true
						});
					}else{
						var str = `
							<p>错误码: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >原因:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str, '新增功能失败', {
							dangerouslyUseHTMLString: true
						});
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
		this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波
		this.addForm.flag = false;

		if(this.addForm.edit != 3){
			this.resetForm('addForm');
		}
	},
	//点击编辑功能
	editItem(row){
		this.dialogFormVisible=true;

		this.addForm.id = row.id;
		this.addForm.funNum=row.funNum
		this.addForm.funName=row.funName
		this.addForm.funState=row.funState

		this.addForm.flag=true;
		this.addForm.edit=2;
		this.title= '编辑功能';
	},
	//保存编辑功能
	editSave(formName){
		this.$refs[formName].validate((valid) => {
		if (valid) {
			var FunMsgData5 = {
				"id":this.addForm.id,
				"funNum":this.addForm.funNum,
				"funName":this.addForm.funName,
				"funState":this.addForm.funState,
				"legalPersonNum":'001',
				"createUser":this.addForm.createUser,
				"updateUser":this.addForm.updateUser,
				"createTime":this.addForm.createTime,
				"updateTime":this.addForm.updateTime,
				"isDelete":this.addForm.isDelete,
			}
			this.$post(this.$api + '/fun/updateFun',FunMsgData5).then(res=>{
				this.dialogFormVisible=false
				if(res.returnCode=="000000"){
					this.initModeList(this.pageIndex);
					this.$alert('保存功能成功', {
						dangerouslyUseHTMLString: true
					});
				}else{
					var str = `
						<p>错误码: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >原因:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					this.$alert(str, '保存功能失败', {
						dangerouslyUseHTMLString: true
					});
				}
				
			})
		} else {
				return false;
			}
		});

	},
	//点击单个删除按钮
	deleteItem(row){
		var FunMsgData5={
			"id":row.id
		}
		var _this =this;
		this.$confirm('是否删除功能?', i18n.t('Prompt'), {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
		}).then(() => {
			this.$post(this.$api + '/fun/deleteFun',FunMsgData5).then(function(res){
				if(res.returnCode=="000000"){
					
					_this.$alert('删除功能成功', '', {
						dangerouslyUseHTMLString: true
					});
					_this.initModeList(this.pageIndex);
				}else{
					var str = `
						<p>错误码: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >原因:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					_this.$alert(str, '删除功能失败', {
						dangerouslyUseHTMLString: true
					});
				}
			})
		})
	},
	//查看功能
	seeItem(row){
		this.dialogFormVisible=true;
		this.addForm.flag=true;
		this.addForm.edit=3;
		this.title= '功能详情';
		var FunMsgData={
			"id":row.id
		}
		this.$post(this.$api + '/fun/findDetail',FunMsgData).then(res=>{
			if(res.returnCode=="000000"){
				let data = res.returnData
				this.addForm.legalPersonNum = data.legalPersonNum;
				this.addForm.legalPersonName = data.legalPersonName;

				this.addForm.funNum = data.funNum;
				this.addForm.funName = data.funName;
				this.addForm.funState = data.funState;

				this.addForm.createUser = data.createUser;
				this.addForm.updateUser = data.updateUser;
				this.addForm.createTime = data.createTime;
				this.addForm.updateTime = data.updateTime;
			}
		})


	},
	//重置表单
	resetForm(formName) {
		this.$refs[formName].resetFields();
	},
	//获取公司名称
	getFrInfo () {
		this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				this.addForm.legalPersonNum = res.returnData.legalPersonNum
				this.addForm.legalPersonName = res.returnData.legalPersonName
			} else {
				var str = `
					<p>错误码: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >原因:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	// =========================================//
	//前往第几页
	goPageSure (val) {
		if (val) {
			var mc=Math.ceil(this.totalCount/this.pageSize);
			if(val>0&&val<=mc){
				this.goPage="";
				this.currentPage = parseInt(val)
				this.initModeList(val)
			}else{
				this.goPage="";
				this.currentPage = parseInt(val)
				this.initModeList(val)
			}
		}
	},
	//改变每页显示多少条
	handleSizeChange(val) {
		this.pageSize =  val;
		this.indexNo = 0
		this.initModeList(1);
	},
	//选择页数改变数据
	handleCurrentChange(val){
		this.currentPage = val;
		this.initModeList(val); 
	},
	
  }
}
</script>

<style  lang='scss'>
#legalPerson_content{
	.el-dialog {
		width:50%!important;
	}
}
.el-pagination .el-select .el-input{width:125px;}
</style>

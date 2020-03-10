<template>
<!-- 产品授额管理-->
  <div class="content_box" id="limit_content">
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
      <el-form  ref="form" label-width="100px">
        <el-row class="edit_module_search">
          <el-col :span="10">
							<div>
								<el-input placeholder="请输入产品类型名称" name="UserLoginId" v-model="UserLoginId" >   <!-- 请输入产品类型名称 -->  
									<template slot="prepend">产品名称</template>  <!-- 产品名称 -->
								</el-input>
							</div>
          </el-col>
          <el-col :span="14">
			  		<div class="edit_module_btn">
			  			<el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()">{{$t("Add")}}</el-button>  <!-- 新增 -->
			  			<el-button type="warning" icon="el-icon-search"  @click="QueryUser()"  >{{$t("Query")}}</el-button> <!-- 查询 -->
			  		</div>
			  	</el-col>
        </el-row>  
      </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">	
					<h4>产品授信额度列表</h4>   <!-- 产品授信额度列表 -->
					<div class="del_all">
						<el-button type="danger" size="small" icon="el-icon-delete">{{$t('Delete_all')}}</el-button>    <!--全删-->
					</div>
					<el-table :data="tableData" border style="width: 100%"   size='small'>
							<el-table-column align="center" type="selection" width="55"> 	</el-table-column>

							<el-table-column prop="index" type="index"  :label='$t("Serial_number")' align="center" width="60px"></el-table-column><!--产品编号  -->

							<el-table-column prop="loginId" :label='$t("user.Login_account")'  align="center"> </el-table-column><!-- 产品名称 -->

							<el-table-column prop="cartTypeVal" :label='$t("user.Credentials_type")'   align="center" width="120px"> </el-table-column><!--产品最高额度  -->

							<el-table-column prop="cartNum" :label='$t("user.Identification_Number")'  align="center"> </el-table-column><!-- 取现额度 -->

							<el-table-column prop="employeePhone" :label='$t("user.Contact_number")' align="center"  width="140px"> </el-table-column><!--附属卡额度比例  -->

 							<el-table-column  :label='$t("Operation")' align="center" width="180px">  <!-- 操作 -->
								<template slot-scope="scope">
										<el-button size="mini"  @click="editItem(scope.row)" >
											<span>{{$t("user.Editorial_post")}}</span>
										</el-button>
										<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t("Edit")}}</span>
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteThisUser(scope.row)">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t("Delete")}}</span>
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
							:total="totalCount">
					</el-pagination>
				</div>
		</div>

		<!--新增弹框页面开始-->
    <el-dialog :title="$t('user.Add_user')" :visible.sync="addUserDialog" :before-close="handleClose">  <!-- 新增用户 -->
      <el-form :model="form1"  ref="form1" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
					<el-row class="edit_module_search">
							<el-col :span="12">
									<el-form-item :label="$t('user.Login_account')"   prop="Login_account">     <!-- 登录账号-->
										<el-input v-model="form1.Login_account"></el-input>
									</el-form-item>
							</el-col>		
							<el-col :span="12">
										<el-form-item :label="$t('user.User_password')"   prop="User_password" >     <!-- 用户密码-->
											<el-input type="password"  v-model="form1.User_password"></el-input >
										</el-form-item>
							</el-col>	

							<el-col :span="12">
										<el-form-item :label="$t('user.Confirm_password')"   prop="Confirm_password">     <!-- 确认密码-->
											<el-input type="password" v-model="form1.Confirm_password"></el-input>
										</el-form-item>
							</el-col>	
						
							<el-col :span="12">
										<el-form-item :label="$t('user.Password_modification')" prop="Password_modification">   <!-- 密码修改周期-->
											<el-select v-model="form1.Password_modification">
												<!-- <el-option :label="itme.bizTypePropName" :value="itme.bizTypePropCode" v-for="(itme,index) in levelType" :key="index"></el-option> -->
											</el-select>
										</el-form-item>
							</el-col>		

							<el-col :span="12">
										<el-form-item :label="$t('user.Is_it_activated')" prop="Is_it_activated">   <!-- 是否激活-->
											<el-select v-model="form1.Is_it_activated">
												<!-- <el-option :label="itme.bizTypePropName" :value="itme.bizTypePropCode" v-for="(itme,index) in levelType" :key="index"></el-option> -->
											</el-select>
										</el-form-item>
							</el-col>	

							<el-col :span="12">
										<el-form-item :label="$t('user.Organization_name')" prop="Organization_name">   <!-- 机构名称-->
											<el-select v-model="form1.Organization_name">
												<!-- <el-option :label="itme.bizTypePropName" :value="itme.bizTypePropCode" v-for="(itme,index) in levelType" :key="index"></el-option> -->
											</el-select>

										</el-form-item>
							</el-col>				
		

							<el-col :span="12">
										<el-form-item :label="$t('user.Credentials_type')" prop="Credentials_type">   <!-- 证件类型-->
											<el-select v-model="form1.Credentials_type">
												<!-- <el-option :label="itme.bizTypePropName" :value="itme.bizTypePropCode" v-for="(itme,index) in levelType" :key="index"></el-option> -->
											</el-select>
										</el-form-item>
							</el-col>				

							<el-col :span="12">
										<el-form-item :label="$t('user.Identification_Number')"   prop="Identification_Number">     <!-- 证件号码-->
											<el-input v-model="form1.Identification_Number"></el-input>
										</el-form-item>
							</el-col>				

							<el-col :span="12">
										<el-form-item :label="$t('user.Contact_number')"   prop="Contact_number">     <!-- 联系电话-->
											<el-input v-model="form1.Contact_number"></el-input>
										</el-form-item>
							</el-col>				

							<!-- 默认登录语言-->
							<!-- <el-col :span="12">
										<el-form-item :label="$t('user.Default_Logon_Language')" prop="Default_Logon_Language">   
											<el-select v-model="form1.Default_Logon_Language">
											</el-select>
										</el-form-item>
							</el-col>				 -->
					</el-row> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelAdd('form1')">取 消</el-button>
          <el-button type="primary" @click="submitAddUser('form1')">确 定</el-button>
        </div>
    </el-dialog>
		<!--新增弹框页面结束-->


  </div>
</template>

<script>
export default {
  data () {
		var validatePass = (rule, value, callback) => {            
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form1.User_password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
		};
    return {
			UserLoginId:'', //查询框
			addUserDialog:false,  //弹框
			tableData:[],  //user 列表数据
			pageSize:5,//一页显示几条数据
			currentPage:1,//当前显示第几页 1开头
			totalCount:0,//一共有多少条数据
			form1:{
					Login_account:'',
					User_password:'',
					Confirm_password:'',
					Is_it_activated:'',
					Password_modification:'',
					Organization_name:'',
					Credentials_type:'',
					Identification_Number:'',
					Contact_number:'',
					// Default_Logon_Language:'',
			},
			rules: {  //校验规则
				// Login_account: [
				// 	{ required: true, message: '请输入登录账号', trigger: 'blur' },
				// 	{ min: 1, max: 16, message: '请输入16个以内的字符', trigger: 'blur' }
				// ],
				// User_password: [
				// 	{ required: true, message: '请输入用户密码', trigger: 'change' },
				// 	{ min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur' }
				// ],
				// Confirm_password: [
				// 	{required: true,validator: validatePass, message: '两次输入密码不一致!', trigger: 'blur' }
				// ],
				// Is_it_activated: [
				// 	{ type: 'array', required: true, message: '请选择是否激活', trigger: 'change' }
				// ],
				// Organization_name: [
				// 	{ type: 'array', required: true, message: '请选择机构名称', trigger: 'change' }
				// ],
				// Credentials_type: [
				// 	{ type: 'array', required: true, message: '请选择证件类型', trigger: 'change' }
				// ],
				// Identification_Number: [
				// 	{ required: true, message: '请输入证件号码', trigger: 'change' },
				// 	{ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的证件号码' }
				// ],
			}
    }
  },
  mounted(){
		this.initUserList(); // 初始化页面数据
  },
  methods:{
			// 初始化用户列表
			initUserList:function(){
					if(this.UserLoginId != undefined && this.UserLoginId != ""){
							// var UserListMsgData1 = {
							// 		"channelNo":"1",
							// 		"transCode":"SETSYUSER301",
							// 		"loginId":this.UserLoginId,
							// 		// "sysId":$scope.sysid,  //系统id
							// 		"indexNo":this.currentPage,
							// 		"pageSize":this.pageSize
							// };
							// this.$post(this.$api,UserListMsgData1).then( res => {
							// 		this.tableData = res.data;
							// 		this.totalCount = res.totalCount;  
							// });
						}else{
								// var UserListMsgData2 = {
								// 	"channelNo":"1",
								// 	"transCode":"SETSYUSER301",
								// 	"indexNo":this.currentPage,
								// 	"pageSize":this.pageSize
								// };
								// this.$post(this.$api,UserListMsgData2).then( res => {
								// 		this.tableData = res.data;
								// 		this.totalCount = res.totalCount;  
								// });
								var _this = this;
								var UserListMsgData2 = {
									"channelNo":"1",
									"transCode":"SETSYUSER301",
									"indexNo":_this.currentPage,
									"pageSize":_this.pageSize
								};
								this.$post(this.$api,UserListMsgData2).then( res=>{
											_this.tableData = res.rows;
											_this.totalCount = res.totalCount;
								})
        	}

			},
			//改变每页显示多少条
			handleSizeChange(val) {
				this.pageSize =  val;
				this.currentPage = 1
				this.initUserList();
			},
			//选择页数改变数据
			handleCurrentChange(val) {
				this.currentPage = val;
	  		this.initUserList();
			},
			//查询用户
			QueryUser(){
				if(this.UserLoginId != undefined && this.UserLoginId != ""){
					var UserListMsgData = {
							pageNum:this.currentPage,
							pageSize:this.pageSize,
							userName:this.UserLoginId
					}
					this.$post(this.$api+'/queryListUser/U500001',UserListMsgData).then( res =>{
								this.tableData = res.data;
								this.totalCount = res.count;   
					})
				}else{
						this.$alert('请输入登录账户!', i18n.t('Prompt'), {
							confirmButtonText: '确定',
						});
				}
			},
			//打开新增弹框
			openUserDiolog(){
					this.addUserDialog = true;
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 关闭弹框重置数据
			handleClose(done){
					this.resetForm('form1');
					done();
			},
    	//新增用户
			submitAddUser(formName){
					this.$refs[formName].validate((valid) => {
						if (valid) {
								var _this = this;
								var	UserListMsgData13 = {
											USER_NO:1,
											userName:this.form1.Login_account,
											userP:this.form1.User_password,
											userSt:this.form1.Is_it_activated,
											userPmdt:this.form1.Password_modification,
											userCt:this.form1.Credentials_type,
											userCn:this.form1.Identification_Number,
											userTel1:this.form1.Contact_number,	
											pageNum:this.currentPage,
											pageSize:this.pageSize
								};
								this.$post(this.$api + '/addUser/U100001',UserListMsgData13).then( res =>{
										if(res.code == 'AAAA0000'){
												_this.addUserDialog = false;
												_this.resetForm('form1');
												_this.initUserList();
												this.$message({
														message: i18n.t('user.save_successfully'),
														type: 'success' 
												})
										}else{
												this.$message('操作失败')
												_this.addUserDialog = false;
												_this.resetForm('form1');
												
										}
								})
						} else {
							return false;
						}
					});
			},
			//编辑用户
			editUser(){

			},
			//取消弹框重置数据
			cancelAdd(){
				this.addUserDialog = false;
				this.resetForm('form1');
			},
			deleteThisUser(i){
				// this.tableData.splice(i,1);
				for(var i in this.tableData){
				}
				this.$confirm('是否删除?', i18n.t('Prompt'), {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
						var UserListMsgData13 = {
							 "buserId":this.bnkNo
						};

				}).catch(() => {
				         
				});


			}

  }
}
</script>

<style scoped lang='scss'>
// 修改的弹框样式
#user_content{
	.el-dialog {
		width:70%;
	}
}

</style>

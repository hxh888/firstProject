<template>
<!-- 用户管理 -->
  <div class="content_box" id="user_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form  ref="form" label-width="100px" :inline="true" size="small">
        <el-row class="edit_module_search">
			<el-col :span="24">
				<!-- 角色名称 -->
				<el-form-item :label="$t('role.role_name')"> 
					<el-input v-model="query" class="input-with-select"></el-input> 
				</el-form-item> 
			</el-col>
          	<el-col :span="24" class="edit_module_btn">
				<el-form-item >
					<el-button type="warning" icon="el-icon-search"  @click="QueryUser()">{{$t("Query")}}</el-button> <!-- 查询 -->
					<el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()" v-if="funList.indexOf('新增') > -1">{{$t("Add")}}</el-button>  
				</el-form-item>
			</el-col>
		</el-row>
      </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
		<div class="table_body">	
				<h4>{{$t('role.role_list')}}</h4>   <!-- 角色列表 -->
				<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">

						<el-table-column prop="index" type="index"  :label="$t('Serial_number')"  align="center" width="135px"></el-table-column><!--序号  -->

						<el-table-column prop="roleName" :label="$t('role.role_name')" align="center" min-width="180px"> </el-table-column><!--角色名称  -->

						<el-table-column prop="createTime" :label="$t('role.creation_date')" align="center"  min-width="130px">
							<template slot-scope="scope">
								{{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
							</template>
						</el-table-column><!--创建日期  -->

						
						<el-table-column prop="updateTime" :label="$t('role.modification_date')"  align="center"   min-width="160px"> 
							<template slot-scope="scope">
									{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
							</template>
						</el-table-column><!--修改日期-->


						<el-table-column prop="roleState" :label="$t('role.state')" align="center" min-width="120px" >
							<template slot-scope="scope">
								<span v-if="scope.row.roleState==1">{{$t('role.take_effect')}}</span>
								<span v-else>{{$t('role.invalid')}}</span>
							</template>
						</el-table-column><!--状态-->
						<!--操作-->
						<el-table-column  :label="$t('Operation')" align="center" min-width="180px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 || funList.indexOf('配置') > -1">  <!-- 操作 -->
							<template slot-scope="scope">
								
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span>	<!-- 查看 -->
								</el-button> 
								
								<el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
									<i class="el-icon-edit"></i>
									<span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
								</el-button>
								
								<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funList.indexOf('删除') > -1">
									<i class="el-icon-delete"></i>
									<span class="text">{{$t('Delete')}}</span> <!-- 删除 -->
								</el-button>
								
								<el-button size="mini" type="warning" class="delete-btn" @click="setItem(scope.row)" v-if="funList.indexOf('配置') > -1">
									<i class="el-icon-setting"></i>
									<span class="text">{{$t('role.configuration_menu')}}</span><!--配置菜单-->
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
							<span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
							<el-input size="mini" v-model="obj.goPage" type="number">
								</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
				</el-pagination>
			</div>
	</div>

	<!--新增弹框页面开始-->
    <el-dialog :title="addForm.edit ? $t('role.editorial_role') : (addForm.flag ? $t('role.character_details') : $t('role.new_roles'))" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">  <!-- 新增用户 -->
      	<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"   ref="addForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
			<el-row class="edit_module_search">
				<el-col :span="12">
						<el-form-item :label="$t('product.legal_person_number')"> <!-- 法人编号 --> 
							<el-input v-model="addForm.legalPersonNum" disabled></el-input>
						</el-form-item>
				</el-col>		
				<el-col :span="12">
							<el-form-item :label="$t('product.company_name')">   <!-- 公司名称 -->
								<el-input type="text"  v-model="addForm.companyName" disabled></el-input >
							</el-form-item>
				</el-col>
			
				<el-col :span="12">
							<el-form-item :label="$t('role.role_name')" :prop="addForm.flag ? '' : 'roleName'">   <!-- 角色名称 -->
								<el-input type="text" v-model="addForm.roleName" :disabled="addForm.flag"></el-input>
							</el-form-item>
				</el-col>		

				<el-col :span="12">
							<el-form-item :label="$t('role.state')" :prop="addForm.flag ? '' : 'roleState'"> <!-- 状态 -->
								<el-select v-model="addForm.roleState" style="width: 100%;" :disabled="addForm.flag">
									<el-option :label="$t('role.take_effect')" value="1" ></el-option><!-- 生效 -->
									<el-option :label="$t('role.invalid')" value="0" ></el-option><!-- 失效 -->
								</el-select>
							</el-form-item>
				</el-col>	
				<el-col :span="12">
						<el-form-item v-if="addForm.flag"> <!-- 查看角色菜单配置 -->
							<el-button size="mini" type="primary" @click="setItem(row)">{{$t('role.view_role_menu_configuration')}}</el-button>
						</el-form-item>
				</el-col>
				<el-col :span="12" v-if="addForm.flag">
						<el-form-item :label="$t('role.creation_time')" prop="createTime"> <!-- 创建时间 -->
							<el-input v-model="addForm.createTime" disabled></el-input>
						</el-form-item>
				</el-col>
				<el-col :span="12" v-if="addForm.flag">
						<el-form-item :label="$t('role.creating_users')" prop="createUser"> <!-- 创建用户 -->
							<el-input v-model="addForm.createUser" disabled></el-input>
						</el-form-item>
				</el-col>
				<el-col :span="12" v-if="addForm.flag">
						<el-form-item :label="$t('role.modification_time')" prop="updateTime"> <!-- 修改时间 -->
							<el-input v-model="addForm.updateTime" disabled></el-input>
						</el-form-item>
				</el-col>
				<el-col :span="12" v-if="addForm.flag">
						<el-form-item :label="$t('role.modify_users')" prop="updateUser"> <!-- 修改用户 -->
							<el-input v-model="addForm.updateUser" disabled></el-input>
						</el-form-item>
				</el-col>
			</el-row> 
		</el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addForm')" v-if="addUserDialog && !addForm.edit && !addForm.flag">{{$t('Reset')}}</el-button><!-- 重置 -->
          <el-button type="primary" @click="sure('addForm')" v-if="!addForm.flag">{{$t('Save')}}</el-button><!-- 保 存 -->
        </div>
    </el-dialog>
	<!--新增弹框页面结束-->
	<el-dialog :title="addForm.flag ? $t('role.role_menu_configuration_details') : $t('role.role_menu_configuration')" :visible.sync="dialogVisible" :close-on-click-modal="false" width="800px">  
		<el-form :model="setMode" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="setForm" label-width="80px" class="demo-ruleForm" size="small">
			<el-row class="edit_module_search">
				<!-- <el-col :span="12">
					<el-form-item label="角色编号"> 
						<el-input v-model="setMode.roleId" disabled></el-input>
					</el-form-item>
				</el-col>		 -->
				<el-col :span="12">
					<el-form-item :label="$t('role.role_name')">   <!-- 角色名称 -->
						<el-input v-model="setMode.roleName" disabled></el-input>
					</el-form-item>
				</el-col>	
			</el-row>
			
		</el-form>
		<el-row class="edit_module_search" style="margin-top: 10px; padding: 10px 0; border-top: 1px solid #333;">{{$t('role.check_the_following_menus_and_functions_to_configure_menus_and_functions_for_this_role')}}</el-row> <!-- 请勾选以下菜单和功能为该角色配置菜单和功能 -->
		<el-row class="edit_module_search" >
			<el-col :span="12" style="padding: 0 10px">
				<p>{{$t('role.menu_name')}}</p> <!-- 菜单名称 -->
				<div class="menuBox">
					<div v-for="(item,index) in setMode.menuList" :key="index" style="padding:3px 5px;">
						<span @click="changeList(item.id,index)" :class="index==setMode.index?'menu active':'menu'" v-if="(addForm.flag && item.chose) || !addForm.flag">{{item.menuName}}</span>
					</div>
				</div>
			</el-col>
			<el-col :span="12" style="padding: 0 10px">
				<p>{{$t('role.function_name')}}</p> <!-- 功能名称 -->
				<div class="menuBox">
					<p v-if="setMode.index > -1 ">
					<el-checkbox v-for="(item,index) in setMode.menuList[setMode.index].children" :key="index" v-model="item.check" :disabled="addForm.flag" v-show="(addForm.flag && item.check) || !addForm.flag">{{item.label}}</el-checkbox>
					</p>
				</div>
			</el-col>
		</el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modeSure" v-if="!addForm.flag">{{$t('Save')}}</el-button> <!-- 保 存 -->
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data () {
    return {
		tableData:[],  //user 列表数据
		obj: {
			pageSize:10,//一页显示几条数据
			pageIndex:1,  //需要传过去的参数
			goPage: null,
			data: {}
		},
		query: '',
		userType: 2,
		totalCount:0,//一共有多少条数据
		addUserDialog:false,  //弹框	
		dialogVisible: false,
		checkDisabled: false,
		setForm: {},
		addForm:{
			legalPersonNum: '',
			companyName: '',
			roleName: '',
			// roleNum: '',
			roleState: '1',
			flag:false,   //是否可输入 默认可以
			edit:false,	 //编辑标识
			createTime: '',
			createUser: '',
			updateTime: '',
			updateUser: ''
		},
		setMode: {
			checkList: [],
			menuList: [],
			funArr: [],
			arrAll: [],
			checkMenuList:[],
			menuId: '',
			funId: '',
			index: '-1'
		},
		row: {},
		rules: {  //校验规则
			roleName: [
				{ required: true, message: i18n.t('role.role_name_cannot_be_empty'), trigger: 'change' },
				{ pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('role.please_enter_Chinese_characters') },
				{ max: 20, message: i18n.t('role.no_more_than_20_characters_in_length'), trigger: 'change' }
			],
			// roleNum: [
			// 	{ required: true, message: '角色编号不能为空', trigger: 'change' },
			// 	{ pattern:/^\d/g, message: '只能输入数字' },
			// 	{ min: 2, max: 5, message: '长度在 2 到 5 个数字', trigger: 'change' }
			// ],
			roleState: [
				{ required: true, message: i18n.t('role.please_select_the_status'), trigger: 'change' }
			]
		},
		funList: []
    }
  },
  watch: {
  },
  created(){
  	this.getFunList()
  },
  mounted(){
	this.display(); // 初始化页面数据
  },
  methods:{
	//   获取权限信息
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == '角色管理'
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
	// 判断两个数组是否相同
	getArrDifference(arr1, arr2) { 
		return arr1.concat(arr2).filter(function(v, i, arr) {
			return arr.indexOf(v) === arr.lastIndexOf(v);
		});
	},
	// 点击确定切换分页
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
	// 配置确定
	modeSure () {
		let self = this
		this.$post(this.$api+"/role/roleConfigMenu",{roleId: this.row.roleId, menuList: this.setMode.menuList}).then(res=>{
			if(res.returnCode == '66010708'){
				this.$alert(res.returnMsg, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
				this.dialogVisible = false;
				this.setMode = {
					checkList: [],
					menuList: [],
					funArr: [],
					arrAll: [],
					menuId: '',
					funId: '',
					index: -1
				}
				this.display()
			} else {
				var str = `
					<p >${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}

		})
	},
	
	changeList (id, index) {
		this.setMode.index = index
	},
	// 新增修改确定
	sure (formName) {
		let self = this
		self.$refs[formName].validate((valid) => {
			if (valid) {
				let path = ''
				if (this.addForm.edit) {
					path = '/role/updateRole'
				} else {
					path = '/role/insetRole'
				}
				this.$post(this.$api + path,this.addForm).then(res =>{
					if(res.returnCode == '000000'){
						this.$confirm(i18n.t('role.added_successfully_whether_to_configure_menu_permissions'), i18n.t('Prompt'), {
							confirmButtonText: self.$t('OK'),
          					cancelButtonText: self.$t('Cancel'),
						}).then(() => {
							self.setItem({roleId: res.returnData.roleId, roleName: res.returnData.roleName})
						}).catch(() => {});
						this.addUserDialog = false;
						this.$refs[formName].resetFields();
						this.addForm.flag=false;
						this.addForm.edit=false;
						this.display()
					} else if (res.returnCode == '66010702') {
						this.$alert(i18n.t('product.edit_success'), i18n.t('Prompt'), {
							dangerouslyUseHTMLString: true
						});
						this.addUserDialog = false;
						this.$refs[formName].resetFields();
						this.addForm.flag=false;
						this.addForm.edit=false;
						this.display()
					}else {
						var str = `
							<p>${self.$t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${self.$t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						self.$alert(str, i18n.t('Prompt'), {
							dangerouslyUseHTMLString: true
						});
					}
				});
			} else {
				return false;
			}
		});
		
	},
	// 初始化用户列表
	display:function(){
		if (this.query) {
			if (this.userType == 1) {
				this.obj.data.roleNum = this.query
			} else if (this.userType == 2) {
				this.obj.data.roleName = this.query
			}
		} else {
			this.obj.data = {}
		}
		this.$post(this.$api + '/role/findRoleByPage',this.obj).then(res =>{
			if(res.returnCode == '000000'){
				this.tableData =  res.returnData.data;
				this.totalCount = res.returnData.count;
			} else {
				var str = `
					<p >${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});

	},
	// 获取法人公司信息
	getFrInfo () {
		this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				this.addForm.legalPersonNum = res.returnData.legalPersonNum
				this.addForm.companyName = res.returnData.legalPersonName
			} else {
				var str = `
					<p >${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	//查询用户
	QueryUser(){
		this.obj.pageIndex = 1;
		this.display()
	},
	//打开新增弹框
	openUserDiolog(){
		this.addUserDialog = true;
		this.addForm.flag = false;
		this.addForm.edit = false;
		this.addForm.roleName = ''
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.getFrInfo()
	},
	// 点击配置按钮
	setItem (row) {
		this.dialogVisible = true
		this.setMode = {
			checkList: [],
			menuList: [],
			funArr: [],
			arrAll: [],
			checkMenuList:[],
			menuId: '',
			funId: '',
			index: '-1'
		}
		this.row = row
		this.setMode.roleId = row.roleId
		this.setMode.roleName = row.roleName
		this.$post(this.$api+"/role/findRolebyMenufun", {roleId: row.roleId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res=>{
			if(res.returnCode=="000000"){
				this.setMode.menuList=res.returnData;
			} else {
				var str = `
					<p >${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		})
	},
	// 查看角色
	seeItem (row) {
		let self = this
		this.addUserDialog = true
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.row = row
		this.getFrInfo()
		self.$post(self.$api + '/role/editRole',{roleId:row.roleId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				// self.addForm.roleNum = res.returnData.roleNum
				self.addForm.roleName = res.returnData.roleName
				self.addForm.roleState = res.returnData.roleState
				self.addForm.createTime = res.returnData.createTime
				self.addForm.createUser = res.returnData.createUser
				self.addForm.updateTime = res.returnData.updateTime
				self.addForm.updateUser = res.returnData.updateUser
			} else {
				var str = `
					<p>${self.$t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${self.$t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				self.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
		this.addForm.edit = false;
		this.addForm.flag = true
	},
	// 修改角色
	editItem (row) {
		let self = this
		this.addUserDialog = true
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.addForm.edit = true;
		this.getFrInfo()
		setTimeout(function() {
			self.$post(self.$api + '/role/editRole',{roleId:row.roleId, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
				if(res.returnCode == '000000'){
					// self.addForm.roleNum = res.returnData.roleNum
					self.addForm.roleName = res.returnData.roleName
					self.addForm.roleState = res.returnData.roleState
					self.addForm.roleId = row.roleId
				} else {
					var str = `
						<p>${self.$t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${self.$t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					self.$alert(str, i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
				}
			});
		}, 50)
	},
	// 删除角色
	deleteItem(row){
		var _this =this;
		this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
			confirmButtonText: i18n.t('OK'),
			cancelButtonText: i18n.t('Cancel'),
			type: 'warning'
		}).then(() => {
			this.$post(this.$api + '/role/deleteRole',{roleId: row.roleId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(function(res){
				if(res.returnCode == '66010706'){
					_this.display();
					_this.$alert(i18n.t('role.successful_deletion'), i18n.t('Prompt'), {
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
	cancels(formName, done){
		this.addUserDialog = false
		this.addForm.flag=false;
		this.addForm.edit=false;
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

  }
}
</script>

<style scoped lang='scss'>
// 修改的弹框样式
.menuBox{width:100%; height:150px; overflow-y: auto; border:1px solid rgba(0,0,0,.1);padding: 5px;}
.menuBox div{
	padding: 0px 5px !important;
	span{
		height: 25px;
		display: block;
	}
}
.menu{	cursor: pointer;}
.menu.active{color:#5bc0de}
.el-checkbox{display: block;}
.el-pagination .el-select .el-input{width:125px;}
</style>

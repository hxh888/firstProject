<template>
<!-- 用户管理 -->
  <div class="content_box" id="user_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form  ref="form" :inline="true" size="small" :model="obj.data">
        <el-row class="edit_module_search">
			<el-col :span="24">
				<el-form-item :label="$t('user.user_name')"> <!-- 用户名称 -->
					<el-input v-model="obj.data.loginId" class="input-with-select"></el-input> 
				</el-form-item> 
				<el-form-item :label="$t('user.name')"> <!-- 用户姓名 -->
					<el-input v-model="obj.data.userName" class="input-with-select"></el-input> 
				</el-form-item>
				<el-form-item :label="$t('user.name_of_organization')"> <!-- 机构名称 -->
					<el-input v-model="obj.data.branchName" class="input-with-select"></el-input> 
				</el-form-item>
				<el-form-item :label="$t('user.department_name')"> <!-- 部门名称 -->
					<el-input v-model="obj.data.deptName" class="input-with-select"></el-input> 
				</el-form-item>
				<el-form-item :label="$t('user.role_name')"> <!-- 角色名称 -->
					<el-input v-model="obj.data.roleName" class="input-with-select"></el-input> 
				</el-form-item> 
				<el-form-item :label="$t('user.job_type')"> <!-- 岗位类型 -->
					<el-select v-model="obj.data.postType" style="width:183px;" placeholder="">
						<el-option :label="$t('collection.whole')" value="" ></el-option>
						<el-option v-for="item in postTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
					</el-select>
				</el-form-item> 
				<el-form-item :label="$t('user.job_name')"> <!-- 岗位名称 -->
					<el-input v-model="obj.data.postName" class="input-with-select"></el-input> 
				</el-form-item>
			</el-col>
        </el-row>  
		<el-row class="edit_module_search">
			<el-col :span="24" class="edit_module_btn">
				<el-form-item>
					<el-button type="warning" icon="el-icon-search"  @click="QueryUser()">{{$t("Query")}}</el-button> <!-- 查询 -->
					<el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()" v-if="funList.indexOf('新增') > -1">{{$t("Add")}}</el-button>  <!-- 新增 -->
				</el-form-item>
			</el-col>
		</el-row>
      </el-form>
    </div>

	<!-- 列表模块 -->
    <div class="list_module">
		<div class="table_body">	
				<h4>{{$t("user.user_list")}}
				</h4>   <!-- 用户列表 -->
				<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">

						<el-table-column prop="index" type="index"  :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号  -->

						<el-table-column prop="loginId" :label="$t('user.user_name')"  align="center" min-width="120px"> </el-table-column><!-- 用户名称 -->

						<el-table-column prop="userName" :label="$t('user.name')"   align="center" min-width="180px"> </el-table-column><!--用户姓名  -->

						<el-table-column prop="branchName" :label="$t('user.name_of_organization')"  align="center" min-width="180px"> </el-table-column><!-- 机构名称 -->

						<el-table-column prop="deptName" :label="$t('user.department_name')" align="center"  min-width="180px"> 
							<template slot-scope="scope">
								{{scope.row.deptName || ''}}
							</template>
						</el-table-column><!-- 部门名称 -->

						<el-table-column prop="roleName" :label="$t('user.role_name')" align="center"  min-width="180px"></el-table-column><!-- 角色名称 -->
						<el-table-column prop="postType" :label="$t('user.job_type')" align="center"  min-width="180px">
							<template slot-scope="scope">
								{{scope.row.postType | level(postTypeList)}}
							</template>
						</el-table-column><!-- 岗位类型 -->
						<el-table-column prop="postName" :label="$t('user.job_name')" align="center"  min-width="180px">
							<template slot-scope="scope">
								{{scope.row.postName || ''}}
							</template>
						</el-table-column><!-- 岗位名称 -->

						<el-table-column prop="createTime" :label="$t('user.creation_date')" align="center"  min-width="180px">
							<template slot-scope="scope">
								{{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
							</template>
						</el-table-column><!-- 创建日期 -->
						
						<el-table-column prop="updateTime" :label="$t('user.modification_date')"  align="center"   min-width="180px"> 
							<template slot-scope="scope">
									{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
							</template>
						</el-table-column><!--修改日期-->

						<el-table-column prop="userState" :label="$t('user.state')" align="center"  min-width="180px">
							<template slot-scope="scope">
								<span v-if="scope.row.userState==1">生效</span>
								<span v-else>失效</span>
							</template>
						</el-table-column><!-- 状态 -->

						<el-table-column  :label="$t('Operation')" align="center" min-width="180px" fixed="right" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1">  <!-- 操作 -->
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
							<el-input size="mini" v-model="obj.goPage"  type="number">
								</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button>
						</div>
					</template>
				</el-pagination>
			</div>
	</div>

	<!--新增弹框页面开始-->
    <el-dialog :title="addForm.edit ? $t('user.editor_user') : (addForm.flag ? $t('user.user_details') : $t('user.new_users'))" :visible.sync="addUserDialog" :before-close="cancel"  :close-on-click-modal="false">  <!-- 新增用户 -->
      	<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="addForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
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
							<el-form-item :label="$t('user.user_name')"   :prop="(addForm.flag || addForm.edit) ? '' : 'loginId'">   <!-- 用户名称 -->
								<el-input type="text" v-model="addForm.loginId" :disabled="addForm.flag || addForm.edit"></el-input>
							</el-form-item>
				</el-col>	
			
				<el-col :span="12">
							<el-form-item :label="$t('user.name')"   :prop="addForm.flag ? '' : 'userName'">   <!-- 角色 -->
								<el-input type="text" v-model="addForm.userName" :disabled="addForm.flag"></el-input>
							</el-form-item>
				</el-col>		

				<el-col :span="12">
						<el-form-item :label="$t('user.mechanism')"  :prop="addForm.flag ? '' : 'branchId'">  <!-- 机构 -->
							<!-- <el-input type="text" v-model="addForm.branchId" :disabled="addForm.flag"></el-input> -->
							<el-cascader :options="options" :show-all-levels="false" change-on-select v-model="addForm.branchId" style="width: 100%;" :disabled="addForm.flag" @change="branchChange"></el-cascader>
						</el-form-item>
				</el-col>	

				<!-- <el-col :span="12">
					<el-form-item>
						<el-button size="mini" type="primary" @click="selectBranch()" style="position:relative; left: -109px;" :disabled="addForm.flag">选择机构</el-button>
					</el-form-item>
				</el-col> -->

				<el-col :span="12">
					<el-form-item :label="$t('user.department')" :prop="addForm.flag ? '' : 'departId'"><!-- 部门 -->
						<el-select v-model="addForm.departId" filterable style="width: 100%;" :disabled="addForm.flag" placeholder="">
							<el-option :label="$t('user.please_choose')" value=""> </el-option>
							<el-option v-for="item in DepartList" :key="item.id" :label="item.deptName" :value="item.id"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>	

				<el-col :span="12">
					<el-form-item :label="$t('user.role')" :prop="addForm.flag ? '' : 'roleId'">   <!-- 角色 -->
						<el-select v-model="addForm.roleId" filterable style="width: 100%;" :disabled="addForm.flag" placeholder="">
							<el-option v-for="item in RoleList" :key="item.roleId" :label="item.roleName" :value="item.roleId"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>		

				<el-col :span="12">
					<el-form-item :label="$t('user.job_type')">  <!-- 岗位类型 -->
						<el-select v-model="addForm.postType" style="width: 100%;" :disabled="addForm.flag" @change="getPostInfo" placeholder="">
							<el-option :label="$t('user.please_choose')" value=""> </el-option>
							<el-option v-for="item in postTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>	

				<el-col :span="12" v-if="addForm.isPost"><!-- 岗位 -->
					<el-form-item :label="$t('user.post')" :prop="addForm.flag ? '' : 'postId'" ref="gw">  
						<el-select v-model="addForm.postId" filterable style="width: 100%;" :disabled="addForm.flag" placeholder="">
							<el-option v-for="item in PostList" :key="item.id" :label="item.postName" :value="item.id"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>	
				<!-- 审批额度（元） -->
				<!-- <el-col :span="12" v-if="addForm.isPost"> 
					<el-form-item :label="$t('user.approval_quota')" :prop="addForm.flag ? '' : 'approveLimit'" ref="sped">  
						<el-select v-model="addForm.approveLimit" filterable  style="width: 100%;" :disabled="addForm.flag" placeholder="">
							<el-option v-for="item in limitList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>	 -->

				<!-- 审批产品 -->
				<!-- <el-col :span="12" v-if="addForm.isPost"> 
					<el-form-item :label="$t('user.examination_and_approval_of_products')" :prop="addForm.flag ? '' : 'productArr'" ref="spcp">  
						<el-select v-model="addForm.productArr" filterable multiple style="width: 100%;" :disabled="addForm.flag" placeholder="">
							<el-option v-for="item in productList" :key="item.productCode" :label="item.productName" :value="item.productCode"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>	 -->

				<el-col :span="12"><!-- 状态 -->
							<el-form-item :label="$t('user.state')" :prop="addForm.flag ? '' : 'userState'"> 
								<el-select v-model="addForm.userState" style="width: 100%;" :disabled="addForm.flag">
									<el-option label="生效" value="1" ></el-option>
									<el-option label="失效" value="0" ></el-option>
								</el-select>
							</el-form-item>
				</el-col>
				<el-col :span="12" v-if="addForm.flag"><!-- 创建时间 -->
							<el-form-item :label="$t('user.creation_time')"> 
								<el-input type="text" v-model="addForm.createTime" :disabled="addForm.flag"></el-input>
							</el-form-item>
				</el-col>
				<el-col :span="12" v-if="addForm.flag"><!-- 创建用户 -->
							<el-form-item :label="$t('user.creating_users')"> 
								<el-input type="text" v-model="addForm.createUser" :disabled="addForm.flag"></el-input>
							</el-form-item>
				</el-col>
				<el-col :span="12" v-if="addForm.flag"><!-- 修改时间 -->
							<el-form-item :label="$t('user.modification_time')"> 
								<el-input type="text" v-model="addForm.updateTime" :disabled="addForm.flag"></el-input>
							</el-form-item>
				</el-col>
				<el-col :span="12"  v-if="addForm.flag"><!-- 修改用户 -->
							<el-form-item :label="$t('user.modify_users')"> 
								<el-input type="text" v-model="addForm.updateUser" :disabled="addForm.flag"></el-input>
							</el-form-item>
				</el-col>
			</el-row> 
		</el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addForm')" v-if="addUserDialog && !addForm.edit && !addForm.flag">{{$t('Reset')}}</el-button><!-- 重置 -->
          <el-button type="primary" @click="sure('addForm')" v-if="!addForm.flag">{{$t('Save')}}</el-button><!-- 保存 -->
        </div>
    </el-dialog>
	<!--新增弹框页面结束-->
  </div>
</template>

<script>
import { type } from 'os';
import { stringify } from 'querystring';
let self
export default {
  name: 'User',
  data () {
    return {
		tableData:[],  //user 列表数据
		obj: {
			pageSize:10,//一页显示几条数据
			pageIndex:1,  //需要传过去的参数
			goPage: null,
			data: {}
		},
		loginId: '',
		userName: '',
		userType: 1,
		currentPage:1,//当前显示第几页 1开头
		totalCount:0,//一共有多少条数据
		addUserDialog:false,  //弹框	

		addForm:{
			legalPersonNum: '',
			companyName: '',
			loginId: '',
			userName: '',
			branchId: [],
			departId: '',
			postId: "",
			approveLimit: "",
			postType: '',
			userP: '000000',
			roleId: '',
			productArr: [],
			userState: '1',
			flag:false,   //是否可输入 默认可以
			edit:false,	 //编辑标识
			isPost: false,
			createTime: '',
			createUser: '',
			updateTime: '',
			updateUser: ''
		},
		options: [],
		mechanismList:[], //选择机构
		DepartList: [],
		RoleList: [],
		PostList: [],
		postTypeList: [],
		productList: [],
		limitList: [],
		rules: {  //校验规则
			loginId: [
				{ required: true, message: i18n.t('user.user_name_cannot_be_empty')},
				{ max: 20, message: i18n.t('role.no_more_than_20_characters_in_length'), trigger: 'change' }
				// { pattern:/^\d/g, message: '只能输入数字' },
				// { min: 2, max: 5, message: '长度在 2 到 5 个数字', trigger: 'change' }
			],
			userName: [
				{ required: true, message: i18n.t('user.name_cannot_be_empty')},
				{ pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('user.name_can_only_be_entered_in_Chinese_characters') },
				{ max: 20, message: i18n.t('role.no_more_than_20_characters_in_length'), trigger: 'change' }
			],
			branchId: [
				{ required: true, message: i18n.t('user.please_select_the_organization'), trigger: 'change' }
			],
			roleId: [
				{ required: true, message: i18n.t('user.please_select_roles'), trigger: 'change' }
			],
			userState: [
				{ required: true, message: i18n.t('user.please_select_the_status'), trigger: 'change' }
			],
			postType: [
				{ required: true, message: i18n.t('user.please_choose_the_type_of_position'), trigger: 'change' }
			],
			// approveLimit: [
			// 	{ required: true, message: i18n.t('user.please_select_the_approval_quota'), trigger: 'change' }
			// ],
			// productArr: [
			// 	{ required: true, message: i18n.t('user.please_select_the_products_for_approval'), trigger: 'change' }
			// ],
			postId: [
				{ required: true, message: i18n.t('user.please_choose_your_position'), trigger: 'change' }
			]
		},
		funList: []
    }
  },
  created(){
	this.getFunList()
  },
  mounted(){
	self = this
	this.initUserList(); // 初始化页面数据
	this.selectBranch();
	
	this.getPostTypeList()
  },
  methods:{
	// 获取权限信息
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == '用户管理'
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
	// 岗位类型切换时重新获取产品信息
	branchChange () {
		if (this.addForm.branchId.length == 0 || !this.addForm.postType) {
			return
		}
		this.addForm.productArr = []
		this.postTypeList.find(item => {
			if (item.paramValue == this.addForm.postType) {
				if (item.paramSname == '消贷') {
					this.getProductList('xd')
				} else if (item.paramSname == '信用卡'){
					this.getProductList('xyk')
				}
			}
			return ;
		})
	},
	// 获取岗位信息
	getPostInfo () {
		if (this.addForm.branchId.length == 0) {
			this.$alert(i18n.t('user.please_select_the_organization'), i18n.t('Prompt'), {
				dangerouslyUseHTMLString: true
			});
			this.addForm.postType = ''
			return
		}
		this.addForm.productArr = []
		this.addForm.approveLimit = ''
		this.addForm.postId = ''
		this.$refs['addForm'].clearValidate('postId');
		this.$refs['addForm'].clearValidate('approveLimit');
		this.$refs['addForm'].clearValidate('productArr');
		this.postTypeList.find(item => {
			if (item.paramValue == this.addForm.postType) {
				if (item.paramSname == '消贷') {
					this.addForm.isPost = true
					this.getLimitList('APPROVE_LIMIT_XD')
					this.getProductList('xd')
					this.getPostList(this.addForm.postType)
				} else if (item.paramSname == '信用卡'){
					this.addForm.isPost = true
					this.getLimitList('APPROVE_LIMIT_XYK')
					this.getProductList('xyk')
					this.getPostList(this.addForm.postType)
				} else {
					this.addForm.isPost = false
				}
			}
			if (this.addForm.postType == '') {
				this.addForm.isPost = false
			}
			return ;
		})
	},
	// 获取产品列表
	getProductList (val) {
		let type = ''
		if (val == 'xd') {
			type = '1' // 消贷产品
		} else {
			type = '2' // 信用卡产品
		}
		let branchId = ''
		if (typeof this.addForm.branchId != 'string') {
			branchId = this.addForm.branchId[this.addForm.branchId.length-1]
		} else {
			branchId = this.addForm.branchId
		}
		this.$post(this.$api + '/user/selectByProduct',{branchId, productFlag: type}).then(res =>{
			if(res.returnCode == '000000'){
				if (type == '2') {
					let s = JSON.parse(JSON.stringify(res.returnData).replace(/bizAllName/g, 'productName'))
					s.map(item => {
						item.productCode = item.cardId
					})
					this.productList =  s
				} else {
					let s = JSON.parse(JSON.stringify(res.returnData).replace(/bizAllName/g, 'productName'))
					s.map(item => {
						item.productCode = item.productNum
					})
					this.productList =  s
				}
			}
		});
	},
	// 获取额度信息
	getLimitList (val) {
		this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: val}).then(res =>{
			if(res.returnCode == '000000'){
				this.limitList =  res.returnData;
			}
		});
	},
	// 点击确定分页切换
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
			this.initUserList()
			this.obj.goPage = null
		}
	},
	// 新增修改确定
	sure (formName) {
		let self = this
		self.$refs[formName].validate((valid) => {
			if (valid) {
				let path = ''
				if (this.addForm.edit) {
					path = '/user/updateUser'
				} else {
					path = '/user/insertUser'
				}
				if (typeof this.addForm.branchId != 'string') {
					this.addForm.branchId = this.addForm.branchId[this.addForm.branchId.length-1]
				}
				this.$post(this.$api + path,this.addForm).then(res =>{
					if(res.returnCode == '000000'){
						if (this.addForm.edit) {
							this.$alert(i18n.t('product.edit_success'), i18n.t('Prompt'), {
								dangerouslyUseHTMLString: true
							});
						} else {
							this.$alert(i18n.t('product.new_success'), i18n.t('Prompt'), {
								dangerouslyUseHTMLString: true
							});
						}
						this.addUserDialog = false;
						this.$refs[formName].resetFields();
						this.addForm.flag=false;
						this.addForm.edit=false;
						this.initUserList()
					} else {
						var str = `
							<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str, i18n.t('Prompt'), {
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
	initUserList:function(){
		this.$post(this.$api + '/user/findUserByPage',this.obj).then(res =>{
			if(res.returnCode == '000000'){
				this.tableData =  res.returnData.data;
				this.totalCount = res.returnData.count;
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
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
		this.initUserList()
	},
	//打开新增弹框
	openUserDiolog(){
		this.addUserDialog = true;
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.addForm = {
			legalPersonNum: '',
			companyName: '',
			loginId: '',
			userName: '',
			branchId: [],
			departId: '',
			postId: "",
			approveLimit: '',
			postType: '',
			userP: '000000',
			roleId: '',
			productArr: [],
			userState: '1',
			flag:false,   //是否可输入 默认可以
			edit:false,	 //编辑标识
			isPost: false
		}
		this.addForm.flag = false;
		this.addForm.edit = false;
		this.getFrInfo()
		this.getDepartList('')
		this.getRoleList('')
		this.getPostTypeList()
	},
	// 获取岗位类型
	getPostTypeList () {
		this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'POST_TYPE'}).then(res =>{
			if(res.returnCode == '000000'){
			this.postTypeList =  res.returnData;
			this.postTypeList.map(item => {
				if (item.paramSname == '无岗位') {
					this.addForm.postType = item.paramValue
					return;
				}
			})
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
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	// 获取部门列表信息
	getDepartList (name) {
		this.$post(this.$api + '/user/findDeptAll',{"deptName": name}).then(res =>{
			if(res.returnCode == '000000'){
				this.DepartList =  res.returnData;
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	// 获取角色列表信息
	getRoleList (name) {
		this.$post(this.$api + '/user/findRoleAll',{"roleName": name}).then(res =>{
			if(res.returnCode == '000000'){
				this.RoleList =  res.returnData;
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	// 获取岗位列表信息
	getPostList (val) {
		this.$post(this.$api + '/post/findByPostType',{"postType": val, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				this.PostList =  res.returnData;
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	cancelBranch () {
		this.checkOriginDialog = false
	},
	// 获取机构列表信息
	selectBranch () {
		// this.checkOriginDialog = true
		this.$post(this.$api + '/user/findBranch',{}).then(res =>{
			if(res.returnCode == '000000'){
				let str = String(res.returnData).replace(/id/g, 'value')
				this.options =  JSON.parse(str);
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	// 机构反显
	branchShow (val) {
		let self = this
		let arr = []
		self.options.map(i => {
			if (i.value == val) {
				arr.push(i.value)
				return
			} else {
				i.children.map(j => {
					if (j.value == val) {
						arr.push(i.value)
						arr.push(j.value)
						return
					} else {
						j.children.map(k => {
							if (k.value == val) {
								arr.push(i.value)
								arr.push(j.value)
								arr.push(k.value)
								return
							}
						})
					}
				})
			}
		})
		return arr
	},
	
	// 关闭弹框重置数据
	handleClose(done){
			this.resetForm('addForm');
			done();
	},
	// 查看详情
	seeItem (row) {
		this.addUserDialog = true
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.addForm.edit = false;
		this.addForm.flag = true
		this.getFrInfo()
		this.getDepartList('')
		this.getRoleList('')
		this.getPostTypeList()
		this.$post(this.$api + '/user/editUser',{loginId:row.loginId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum, postType: row.postType || '2'}).then(res =>{
			if(res.returnCode == '000000'){
				self.addForm.loginId = res.returnData.loginId
				self.addForm.userName = res.returnData.userName
				self.addForm.branchId = self.branchShow(res.returnData.branchId)
				self.addForm.departId = res.returnData.departId
				self.addForm.roleId = res.returnData.roleId
				self.addForm.userState = res.returnData.userState
				self.addForm.postType = res.returnData.postType || ''
				self.getPostInfo()
				self.addForm.postId = res.returnData.postId
				self.addForm.approveLimit = res.returnData.approveLimit + ''
				self.addForm.productArr = !res.returnData.userProductList ? [] : res.returnData.userProductList.map(item => {
					return item.productCode
				})
				this.addForm.createTime = res.returnData.createTime
				this.addForm.createUser = res.returnData.createUser
				this.addForm.updateTime = res.returnData.updateTime
				this.addForm.updateUser = res.returnData.updateUser
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	// 点击编辑按钮
	editItem (row) {
		let self = this
		this.addUserDialog = true
		this.addForm.edit = true;
		this.addForm.flag = false
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.getFrInfo()
		this.getDepartList('')
		this.getRoleList('')
		this.getPostTypeList()
		setTimeout(function() {
			self.$post(self.$api + '/user/editUser',{loginId:row.loginId, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum, postType: row.postType || '2'}).then(res =>{
			if(res.returnCode == '000000'){
				self.addForm.loginId = res.returnData.loginId
				self.addForm.userName = res.returnData.userName
				self.addForm.branchId = self.branchShow(res.returnData.branchId)
				self.addForm.departId = res.returnData.departId
				self.addForm.roleId = res.returnData.roleId
				self.addForm.userState = res.returnData.userState
				self.addForm.postType = res.returnData.postType || ''
				self.getPostInfo()
				self.addForm.postId = res.returnData.postId
				self.addForm.approveLimit = res.returnData.approveLimit + ''
				self.addForm.productArr = !res.returnData.userProductList ? [] : res.returnData.userProductList.map(item => {
					return item.productCode
				})
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
		}, 50)
	},
	// 删除用户
	deleteItem(row){
		var _this =this;
		this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
			confirmButtonText: i18n.t('OK'),
			cancelButtonText: i18n.t('Cancel'),
			type: 'warning'
		}).then(() => {
			this.$post(this.$api + '/user/deleteUser',{loginId: row.loginId, postType: row.postType, userState: row.userState}).then(function(res){
				if(res.returnCode == '000000'){
					_this.initUserList();
					_this.$alert(i18n.t('role.successful_deletion'), i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
				}else{
					var str = `
						<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
	cancel(formName){
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
		this.addForm.loginId = ''
		this.addForm.userName = ''
		this.addForm.branchId = ""
		this.addForm.departId = ''
		this.addForm.postId = ""
		this.addForm.approveLimit = ''
		this.addForm.postType = ''
		this.addForm.roleId = ''
		this.addForm.productArr = []
		this.addForm.userState = '1'
		this.addForm.isPost = false
	},
	//监听搜索框为空的时候展示全部数据
	onChangequery(){
		this.QueryUser();
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
	//改变每页显示多少条
	handleSizeChange(val) {
		this.obj.pageSize =  val;
		this.obj.pageIndex = 1;
		this.initUserList();
	},
	//选择页数改变数据
	handleCurrentChange(val) {
		this.obj.pageIndex =val;
		this.initUserList();
	},

  },
  filters: {
    level (val, levelList) {
      let sname = ''
      levelList.map(item => {
        if (item.paramValue == val) {
          sname = item.paramSname
        }
        return false
      });
      return sname || ''
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
.el-pagination .el-select .el-input{width:125px;}

</style>

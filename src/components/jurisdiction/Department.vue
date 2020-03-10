<template>
  <!-- 部门管理 -->
  <div class="content_box" id="department_content">
    <!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
    	<el-form :inline="true"  class="demo-form-inline" ><!--size="small"-->
			<el-row class="edit_module_search">
				<el-col :span="24">
					<el-form-item  :label="$t('department.departmentName')" size="small"><!--部门名称-->
						<el-input v-model="deptName" ></el-input>
					</el-form-item>
					<el-form-item :label="$t('department.departmentAuthority')" size="small"><!--部门权限-->
						<el-input v-model="deptAuthority" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24"  class="edit_module_btn">
					<el-form-item size="small">
						<el-button type="warning" icon="el-icon-search" @click="initData(0)" >{{$t('Query')}}</el-button>  <!--查询按钮-->
						<el-button type="primary" icon="el-icon-plus"  @click="departmentAdd('1')" v-if="funList.indexOf('新增') > -1">{{$t('Add')}}</el-button> <!--新增按钮-->
					</el-form-item>
					</el-col>
			</el-row>  
		</el-form>        
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
			<div class="table_body">
				<h4>{{$t('department.DepartmentList')}}</h4>
				<el-table :data="tableData" border style="width: 100%" size='small' :empty-text="$t('noData')" ><!--empty-text="您所查询的部门不存在"-->
						<!--序号-->
						<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
						<!--部门编号-->
	 					<!--<el-table-column prop="deptNum" label="部门编号"  align="center"> </el-table-column>-->
						<!--部门名称-->
	 					<el-table-column prop="deptName" :label="$t('department.departmentName')"  align="center" min-width="180px"> </el-table-column><!--部门名称-->
	 					<!--部门权限-->
	 					<el-table-column prop="authorityName" :label="$t('department.departmentAuthority')"  align="center" min-width="225px"> </el-table-column><!--部门权限-->
						<!--创建日期-->
	 					<el-table-column prop="createTime" :label="$t('Create_date')"  align="center" min-width="130px"><!--创建日期-->
	 						<template slot-scope="scope">
	 							{{scope.row.createTime.substring(0,10)}}
	 						</template>
	 					</el-table-column>
	 					<!--修改日期-->
	 					<el-table-column prop="updateTime" :label="$t('MaintenanceDate')"  align="center" min-width="160px"><!--修改日期-->
	 						<template slot-scope="scope">
	 							{{scope.row.createTime.slice(0,10)}}
	 						</template>
	 					</el-table-column>
						<!--状态-->
						<el-table-column prop="deptState" :label="$t('department.state')"  align="center"  width="150px" min-width="110px"><!--状态-->
							<template slot-scope="scope">
								<span v-if="scope.row.deptState==1">{{$t('department.TakeEffect')}}</span><!--生效-->
								<span v-if="scope.row.deptState==0">{{$t('department.Invalid')}}</span><!--失效-->
							</template>
						</el-table-column>
						<el-table-column :label="$t('Operation')" align="center" width="250px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 || funList.indexOf('配置') > -1">
							<template slot-scope="scope">
									<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row,3)" v-if="funList.indexOf('查看') > -1">
										<i class="el-icon-view"></i>
										<span class="text">{{$t('See')}}</span>	<!-- 查看 -->
									</el-button> 
	
									<el-button size="mini" class="edit-btn" @click="editItem(scope.row,2)" v-if="funList.indexOf('编辑') > -1">
										<i class="el-icon-edit"></i>
										<span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
									</el-button>
									<!-- 不可点击 -->
									<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funList.indexOf('删除') > -1">
										<i class="el-icon-delete"></i>
										<span class="text">{{$t('Delete')}}</span> <!-- 删除 -->
									</el-button>
									<el-button size="mini" type="warning" class="delete-btn" @click="configureItem(scope.row)" v-if="funList.indexOf('配置') > -1">
										<i class="el-icon-setting"></i>
										<span class="text">{{$t('department.ConfigurationPermissions')}}</span><!--配置权限-->
									</el-button>
							</template>
						</el-table-column>
				</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next,  slot"
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
							<el-input size="mini" v-model="goPage"  type="number" @click="changePage()">
								</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
			</el-pagination>
			</div>
		</div>
		<!--列表模块结束-->
		<!--部门新增、修改、查询详情页面开始-->
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false">
			<el-form :model="addForm" class="clearfix"  :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  :rules="rules" ref="addForm" id="addForm" size="small"  label-width="90px">
				<!-- <el-row :gutter="20"> -->
					<el-col :span="12">
						<el-form-item :label="$t('legalPersonNum')" prop="legalPersonNum"><!--法人编号-->
							<el-input v-model="addForm.legalPersonNum" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('companyName')" prop="companyName" ><!--公司名称-->
							<el-input v-model="addForm.companyName" disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row :gutter="20"> -->
					<!--<el-col :span="12">
						<el-form-item label="部门编号" prop="deptNum">
							<el-input v-model="addForm.deptNum" :disabled="addForm.dis"></el-input>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item :label="$t('department.departmentName')"  prop="deptName"><!--部门名称 prop="deptName"-->
							<el-input v-model="addForm.deptName" :disabled="addForm.dis"></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row :gutter="20" > -->
					<el-col :span="12" v-show="addForm.flag==3">
						<el-form-item :label="$t('department.departmentAuthority')" prop="" class="authorityName" ><!--部门权限-->
							<el-input v-model="addForm.authorityName" disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row :gutter="20"> -->
					<el-col :span="12">
						<el-form-item :label="$t('department.state')"  :prop="addForm.mustInput ? 'deptState':''"><!--状态 prop="deptState"-->
							<el-select v-model="addForm.deptState" :disabled="addForm.dis">
								<el-option :label="$t('department.TakeEffect')" value="1"></el-option><!--生效-->
								<el-option :label="$t('department.Invalid')" value="0"></el-option><!--失效-->
							</el-select>	
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row :gutter="20" > -->
					<el-col :span="12" v-show="addForm.flag==3">
						<el-form-item :label="$t('Create_time')"><!--创建时间-->
							<el-input v-model="addForm.createTime" type="datetime" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-show="addForm.flag==3">
						<el-form-item :label="$t('Create_user')"><!--创建用户-->
							<el-input v-model="addForm.createUser" disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row :gutter="20"> -->
					<el-col :span="12"  v-show="addForm.flag==3">
						<el-form-item :label="$t('Update_time')"><!--修改时间-->
							<el-input v-model="addForm.updateTime"  type="datetime" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12"  v-show="addForm.flag==3">
						<el-form-item :label="$t('Update_user')"><!--修改用户-->
							<el-input v-model="addForm.updateUser" disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addForm')" v-if="addForm.resetDisabled">{{$t('Reset')}}</el-button><!--重置-->
				<el-button v-if="addForm.flag==1" type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button><!--保存-->
				<el-button v-if="addForm.flag==2" type="primary" @click="editSave('addForm')">{{$t('Save')}}</el-button><!--保存-->
			</div>
		</el-dialog>
		<!--部门新增、修改、查询详情页面结束-->
		
		<!--部门配置权限页面开始-->
		<el-dialog :title="$t('department.DAConfiguration')" :visible.sync="dialogFormVisible2" :before-close="cancel2" :close-on-click-modal="false"><!--部门权限配置-->
			<el-form :model="addForm" id="Jurisdiction" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  size="small" label-width="90px">
				<el-row :gutter="20">
					<!--<el-col :span="12">
						<el-form-item label="部门编号" prop="deptNum" >
							<el-input v-model="addForm.deptNum" disabled></el-input>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item :label="$t('department.CurrentPermissions')" prop="authorityName" ><!--当前权限-->
							<el-input v-model="addForm.authorityName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('department.departmentName')" prop="deptName" ><!--部门名称-->
							<el-input v-model="addForm.deptName" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item :label="$t('department.ModifiedPermissions')" prop="afterJuriName" ><!--修改后权限-->
							<el-input v-model="afterJuriName" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-input v-model="queryDeptName" class="input-with-select" size="small"><!--请输入内容-->
							<el-button slot="append" @click="jurisList()">{{$t('Query')}}</el-button><!--查询-->
						</el-input>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="10">
						<p>{{$t('department.NameOfPermission')}}</p><!--权限名称-->
						<div class="JurisdictionBox">
							<template class="JurisdictionBox">
								<el-radio-group v-model="afterJuri">
									<el-radio v-for="(item,index) in juris" :key="index" :label="item.id" @change="clickRadio(item.id,item.authorityName)" class="rad">{{item.authorityName}}</el-radio>
								</el-radio-group>
							</template>
						</div>
					</el-col>
					<el-col :span="14">
						<p>{{$t('department.MenuName')}}</p><!--菜单名称-->
						<div class="menuBox">
							<el-tree :data="treeData"  @node-click="handleNodeClick"></el-tree>
						</div>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="juriSave('addForm')">{{$t('Save')}}</el-button><!--保存-->
			</div>
		</el-dialog>
		<!--部门配置权限页面结束-->
  </div>
</template>

<script>
export default {
  name: 'Department',
  data () {
    return {
    	pageSize:10,//当前页显示几条数据
    	pageIndex:0,//当前页的索引 以0开头
    	totalCount:0,//一共有多少条数据
    	currentPage:1,//当前是第几页
    	goPage:"",//要去第几页
    	QueryDepartmentType:"2",//搜索部门编号或名称
    	dept:"",//搜索的值
    	deptName:"",//查询部门名称
    	deptAuthority:"",//查询部门权限
    	queryDeptName:"",//部门配置权限的搜索权限名称
    	afterJuri:"",//修改后权限
    	afterJuriName:"",//修改后权限的名称
    	treeData:[],//
    	juris:[],//权限名称集合
    	tableData:[],//列表数据
    	dialogFormVisible:false,//部门新增,修改，查看模块是否显示
    	dialogFormVisible2:false,//部门权限配置页面是否显示
    	title:"新增部门",//部门新增,修改，查看模块的title
    	addForm:{//部门新增,修改，查看模块的数据
//  		legalPersonNum:this.$store.state.loginData.legalPersonNum,//法人编号
//  		companyName:this.$store.state.loginData.branchName,//公司名称
				authorityName:"",//部门权限
    		legalPersonNum:"001",
    		companyName:"你好",
    		deptNum:"",//部门编号
    		deptName:"",//部门名称
    		deptState:"1",//状态
    		createTime:"",//创建时间
    		createUser:"",//创建人
    		updateTime:"",//修改时间
    		updateUser:"",//修改人
    		flag:"",//新增1，修改2，查询3
    		dis:false,//是否禁止修改
    		resetDisabled:false,//是否显示重置
			allDis:false,
			mustInput:true//必须输入
    	},
    	rowObj:"",
    	rules:{
    		deptNum: [
					{ required: true, message: i18n.t('department.NotEmptyDepartmentNum') },//部门编号不能为空
					{ pattern:/^\d/g, message: i18n.t('department.onlyNum') },//部门编号只能输入数字，请重新输入
					{ min: 2, max: 4, message: i18n.t('department.onlyTwoAndFour')}//部门编号只能输入2~4位数字，请重新输入
				],
				deptName:[
					{ required: true, message: i18n.t('department.NotEmptyDepartmentName') },//部门名称不能为空
					{ pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('department.onlyChinese') },//部门编号只能输入汉字，请重新输入
					{ max: 20, message: i18n.t('noMoreThen20'), trigger: 'change' }//长度不能超过20个字符
				],
				deptState:[
					{ required: true, message: i18n.t('choseState')},//请选择状态
				]
		},
		funList: []
    }
  },
  created(){
  		this.getFunList()
  },
  mounted(){
	this.initData(0)

  	this.jurisList();
  	this.getFrInfo();//获取公司名称
  },
  watch:{
//	radio(){
//	}
  },
  methods:{
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == '部门管理'//i18n.t('department.DepartmentalManagement')
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
  	initData(val){//页面初始数据
		this.pageIndex=val;
		this.currentPage=val+1;
  		var queryObj={
  				"pageSize":this.pageSize,
  				"pageIndex":val,
  				"data":{
  					"deptName":this.deptName,
  					"authorityName":this.deptAuthority
  				}
  		}
  		this.$post(this.$api+"/dept/findByPage",queryObj).then(res=>{
  			if(res.returnCode=="000000"){
  				this.tableData=res.returnData.dataList;
  				this.totalCount=res.returnData.total;
  			}
  		})
  	},
  	
  	changePage(goPage){
			this.goPage=this.goPage.replace(/(\-|\+|\.|[0-9])/g,'');
	},
  	
  	//点击确认改变数据
		goPageSure (val) {
			if (val) {
//				this.currentPage = val;
//				this.pageIndex = val-1;
//				this.initData(val-1); 
				var mc=Math.ceil(this.totalCount/this.pageSize);
				if(val>0&&val<=mc){
					this.goPage="";
					this.currentPage = parseInt(val);
					this.pageIndex = val-1;
					this.initData(val-1); 
				}else{
					this.goPage="";
					this.currentPage =parseInt(mc);
					this.pageIndex = mc-1;
					this.initData(mc-1); 
				}
			}
		},
  	//改变每页显示多少条
		handleSizeChange(val) {
			this.pageSize =  val;
			this.initData(0);
		},
		//选择页数改变数据
		handleCurrentChange(val){
			this.currentPage = val;
			this.pageIndex = val-1;
			this.initData(val-1); 
		},
		departmentAdd(val){//部门新增
			this.addForm.resetDisabled=true;
			this.dialogFormVisible=true;
			this.resetForm('addForm')
			this.addForm.flag=val;
			this.addForm.dis=false;
			this.addForm.allDis=false;
			this.addForm.mustInput=true;
			this.title=i18n.t('department.AddDepartment') //新增部门
			this.addForm.deptNum="";
			this.addForm.deptName="";
//			this.addForm.deptState="";
			
		},
		submitAdd(formName){//部门新增保存
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var addObj={
						"deptNum":this.addForm.deptNum,
						"deptName":this.addForm.deptName,
						"deptState":this.addForm.deptState
					}
					this.$post(this.$api+"/dept/saveDept",addObj).then(res=>{
						if(res.returnCode=="000000"){
							this.initData(0);
							this.$confirm(i18n.t('department.AddSuccess'), i18n.t('Prompt'), {//新增成功，是否配置部门权限？
								confirmButtonText: i18n.t('OK'),//确定
								cancelButtonText: i18n.t('Cancel'),//取消
							}).then(() => {
//								self.setItem({roleId: res.returnData.roleId, roleName: res.returnData.roleName})
									this.configureItem(res.returnData)
							}).catch(() => {});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('NewFailure'), {//新增失败
								dangerouslyUseHTMLString: true
							});
						}
					})
				}
			})
		},
		editItem(row,val){//部门修改
			this.title=i18n.t('department.EditDepartment')//编辑部门
			this.addForm.flag=val;
			this.addForm.deptNum=row.deptNum;
			this.addForm.deptName=row.deptName;
			this.addForm.deptState=row.deptState;
			this.addForm.dis=false;
			this.addForm.allDis=true;
			this.addForm.mustInput=true;
			this.addForm.resetDisabled=false;//隐藏重置按钮
			this.rowObj=row;
			this.dialogFormVisible=true;
		},
		editSave(formName){//部门修改保存
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var editObj={
						"legalPersonNum":this.rowObj.legalPersonNum,
						"createUser":this.rowObj.createUser,
						"updateUser":this.rowObj.updateUser,
						"createTime":this.rowObj.createTime,
						"updateTime":this.rowObj.updateTime,
						"isDelete":this.rowObj.isDelete,
						"id":this.rowObj.id,
						"deptNum":this.rowObj.deptNum,
						"deptName":this.addForm.deptName,
						"deptState":this.addForm.deptState,
						"authorityId":this.rowObj.authorityId
					}
					this.$post(this.$api+"/dept/updateDept",editObj).then(res=>{
						if(res.returnCode=="000000"){
							this.initData(this.pageIndex);
							this.$alert(i18n.t('EditSuccess'), {//编辑成功
								dangerouslyUseHTMLString: true
							});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('EditFailure'), {//编辑失败
								dangerouslyUseHTMLString: true
							});
						}
					})
				}
			})
			
		},
		seeItem(row,val){//部门查看详情
			this.dialogFormVisible=true;//页面显示
			this.title=i18n.t('department.departmentDetails');//部门详情
			this.addForm.flag=val;
			this.addForm.allDis=true;
			this.addForm.dis=true;
			this.addForm.mustInput=false;
			this.addForm.deptNum=row.deptNum;
			this.addForm.deptName=row.deptName;
			this.addForm.authorityName=row.authorityName;
			this.addForm.deptState=row.deptState;
			this.addForm.createTime=row.createTime;
			this.addForm.createUser=row.createUser;
			this.addForm.updateTime=row.updateTime;
			this.addForm.updateUser=row.updateUser;
			this.addForm.authorityName=row.authorityName;
		},
		deleteItem(row){//删除部门
			var deleteObj={
				"id":row.id
			}
//			var this =this;
			this.$confirm(i18n.t('orDelete'), i18n.t('Prompt'), {
					confirmButtonText: i18n.t('OK'),//确定
					cancelButtonText:  i18n.t('Cancel'),//取消
					type: 'warning'
			}).then(() => {
				this.$post(this.$api+"/dept/deleteDept",deleteObj).then(res=>{
					if(res.returnCode == '000000'){
//						this.initPersonList();
							this.initData(this.pageIndex)
						this.$alert( i18n.t('deleteSuccess'), '', {//删除成功
							dangerouslyUseHTMLString: true
						});
					}else{
						var str = `
							<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str, i18n.t('deleteFailure'), {//删除失败
							dangerouslyUseHTMLString: true
						});
					}
				})
			}).catch(() => {
			
			});
		},
		//配置权限
		configureItem(row){
				this.dialogFormVisible2=true;
				this.addForm.mustInput=true;
				this.queryDeptName="";
				this.rowObj=row;
				this.addForm.deptNum=row.deptNum;
				this.addForm.authorityName=row.authorityName;
				this.addForm.deptName=row.deptName;
				this.afterJuri=row.authorityId;
				this.clickRadio(this.afterJuri,row.authorityName)
				this.jurisList();
			
		},
		//部门配置权限保存
		juriSave(){
			var obj=this.rowObj;
			obj.authorityId=this.afterJuri;
			this.$post(this.$api+"/dept/addAuthority",obj).then(res=>{
				if(res.returnCode == '000000'){
//						this.initData(this.pageIndex);
						this.cancel2();
						this.initData(0);
						this.$alert(i18n.t('department.copSuccess'), '', {//配置权限成功
							dangerouslyUseHTMLString: true
						});
					}else{
						var str = `
							<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str, i18n.t('department.copFailure'), {
							dangerouslyUseHTMLString: true
						});
					}
			})
		},
		//权限名称集合
		jurisList(){
			var queryObj={//权限名称
					"authorityName":this.queryDeptName
				}
			this.$post(this.$api+"/authority/findList",queryObj).then(res=>{
				if(res.returnCode=="000000"){
					this.juris=res.returnData;
				}
			})
		},
		//点击权限名称
		clickRadio(id,name){
			this.afterJuri=id
			this.afterJuriName=name;
			var juriId={
				"id":id
			}
			this.$post(this.$api+"/menu/findMenuByAuthority",juriId).then(res=>{
				if(res.returnCode=="000000"){
					var d = JSON.stringify(res.returnData).replace(/funList/g,'children').replace(/menuName/g,'label').replace(/funName/g,'label');
					this.treeData=JSON.parse(d)
				}
			})
		},
		//树结构点击
		handleNodeClick(data) {
      },
		cancel(){//点击页面中的x
			this.dialogFormVisible = false;
			this.resetForm('addForm');
			this.addForm.flag=false;
			this.addForm.edit=false;
		},
		
		//获取公司名称
		getFrInfo () {
			this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
				if(res.returnCode == '000000'){
					this.addForm.legalPersonNum = res.returnData.legalPersonNum
					this.addForm.companyName = res.returnData.legalPersonName
				} else {
					var str = `
						<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					this.$alert(str, i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
				}
			});
		},
		
		//点击页面的x消失页面
		cancel2(){
			this.dialogFormVisible2 = false;
		},
		//重置表单
		resetForm(formName) {
			if (this.$refs[formName]!==undefined) {
			     this.$refs[formName].resetFields();
			}
		},
  }
}
</script>

<style  lang='scss'>
#department_content{
	.el-dialog {
		width:50%!important;
	}
	.belongdepartmentNum{
		 .el-form-item__content, .el-form-item__label{
			line-height:16px !important;;
		}
	}
	p{margin-top:10px; color:#999;}
	.JurisdictionBox,.menuBox{width:100%; height:150px; border:1px solid rgba(0,0,0,.1); overflow-y: auto;}
	.rad{display: block; padding:3px 10px}
}
.el-pagination .el-select .el-input{width:125px;}
</style>

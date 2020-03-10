<template>
  <!-- 权限管理 -->
  <div class="content_box" id="legalPerson_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
    	<el-form :inline="true"  class="demo-form-inline" size="small"> <!--size="small"-->
        <el-row class="edit_module_search">
        		<!--<el-option label="权限编号" value="1"></el-option>-->
            <!--<el-col :span="4">
							<el-select name="" id="" v-model="queryAuthType" >
									<el-option label="权限名称" value="2" ></el-option>
							</el-select>	
						</el-col>
						<el-col :span="10">
							<el-input v-model="queryAuth" class="input-with-select"></el-input> 
						</el-col>-->
						<el-col :span="24">
							<el-form-item :label="$t('auth.NameOfPermission')"><!--权限名称-->
								<el-input v-model="queryAuth" ></el-input>
							</el-form-item>
						</el-col>
          	<el-col :span="24" class="edit_module_btn">
							<el-form-item>
								<el-button type="warning" icon="el-icon-search" @click="initAuth(0)" >{{$t('Query')}}</el-button>  <!--查询按钮-->
								<el-button type="primary" icon="el-icon-plus"  @click="authAdd('1')" v-if="funLists.indexOf('新增') > -1">{{$t('Add')}}</el-button><!--新增按钮-->
							</el-form-item>
		 				</el-col>
        </el-row> 
      </el-form>
    </div>

	<!-- 列表模块 -->
    <div class="list_module">
		<div class="table_body">
			<h4>{{$t('auth.ListOfPermissions')}}</h4><!--权限列表-->
			<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')"> <!--empty-text="您所查询的权限不存在"-->
					<!--序号-->
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
					<!--权限编号-->
 					<!--<el-table-column prop="authorityNum" label="权限编号"  align="center"> </el-table-column>-->
					<!--权限名称-->
 					<el-table-column prop="authorityName" :label="$t('auth.NameOfPermission')"  align="center" min-width="190px"> </el-table-column>
					<!--创建日期-->
 					<el-table-column prop="createTime" :label="$t('Create_date')"  align="center" min-width="130px">
 						<template slot-scope="scope">
	 							{{scope.row.createTime.substring(0,10)}}
	 						</template>
 					</el-table-column>
 					<!--修改日期-->
 					<el-table-column prop="updateTime" :label="$t('Update_date')"  align="center" min-width="160px">
 						<template slot-scope="scope">
	 							{{scope.row.updateTime.substring(0,10)}}
	 						</template>
 					</el-table-column>
					<!--状态-->
					<el-table-column prop="authorityState" :label="$t('Status')" align="center"  width="130px">
						<template slot-scope="scope">
							<span v-if="scope.row.authorityState==1">{{$t('Take_effect')}}</span><!--生效-->
							<span v-else>{{$t('Failure_effect')}}</span><!--失效-->
						</template>
					</el-table-column>
					<!--操作-->
					<el-table-column :label="$t('Operation')" align="center" min-width="190px" v-if="funLists.indexOf('查看') > -1 || funLists.indexOf('编辑') > -1 || funLists.indexOf('删除') > -1 || funLists.indexOf('配置') > -1">
						<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row,'3')" v-if="funLists.indexOf('查看') > -1">
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span>	<!-- 查看 -->
								</el-button> 
								<el-button size="mini" class="edit-btn" @click="editItem(scope.row,'2')" v-if="funLists.indexOf('编辑') > -1">
									<i class="el-icon-edit"></i>
									<span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
								</el-button>
								<!-- 不可点击 -->
								<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funLists.indexOf('删除') > -1">
									<i class="el-icon-delete"></i>
									<span class="text">{{$t('Delete')}}</span> <!-- 删除 -->
								</el-button>
								<el-button size="mini" type="warning" class="delete-btn" @click="configItem(scope.row)" v-if="funLists.indexOf('配置') > -1">
									<i class="el-icon-setting"></i>
									<span class="text">{{$t('auth.ConfigurationMenu')}}</span><!--配置菜单-->
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
							<el-select v-model="pageSize" size="mini" @change="handleSizeChange">
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span>
							<span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
							<el-input size="mini" v-model="goPage" type="number" >
								</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
			</el-pagination>
		</div>
	</div>
	<!--列表模块结束-->
	
		<!--权限新增、修改、查询详情页面开始-->
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false"><!-- :before-close="cancel" -->
			<el-form style="overflow:hidden;padding-bottom:10px" :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  :rules="rules" ref="addForm" id="addForm" size="small"  label-width="90px">
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
						<el-form-item label="权限编号" prop="authorityNum">
							<el-input v-model="addForm.authorityNum" :disabled="addForm.dis"></el-input>
						</el-form-item>
					</el-col>-->
					<!-- <el-col :span="12" v-if="addForm.flag==3">
						<el-form-item :label="$t('auth.NameOfPermission')" prop="authorityName">
							<el-input v-model="addForm.authorityName" :disabled="addForm.dis"></el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="12">
						<!-- <el-form-item :label="$t('auth.NameOfPermission')"  v-if="addForm.flag==3">
							<el-input v-model="addForm.authorityName" :disabled="addForm.dis"></el-input>
						</el-form-item> -->
						<el-form-item :label="$t('auth.NameOfPermission')"  prop="authorityName"><!--权限名称-->
							<el-input v-model="addForm.authorityName" :disabled="addForm.dis"></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row :gutter="20"> -->
					<!-- <el-col :span="12" v-if="addForm.flag==3">
						<el-form-item :label="$t('Status')" >
							<el-select v-model="addForm.authorityState" :disabled="addForm.dis">
								<el-option :label="$t('Take_effect')" value="1"></el-option>
								<el-option :label="$t('Failure_effect')" value="0"></el-option>
							</el-select>	
						</el-form-item>
					</el-col> -->
					<el-col :span="12" >
						<el-form-item :label="$t('Status')" prop="authorityState"><!--状态-->
							<el-select v-model="addForm.authorityState" :disabled="addForm.dis">
								<el-option :label="$t('Take_effect')" value="1"></el-option><!--生效-->
								<el-option :label="$t('Failure_effect')" value="0"></el-option><!--失效-->
							</el-select>	
						</el-form-item>
					</el-col>
					<el-col :span="12" v-show="addForm.flag==3">
						<!--<el-button type="primary" class="delete-btn" @click="view()">
							<span class="text">查看权限配置菜单</span>
						</el-button>-->
						<el-form-item prop="">
							<!--<el-input type="button" value="查看权限配置菜单" @click="seeFun()">-->
								<el-button  @click="seeFun()">{{$t('auth.vpmc')}}</el-button><!--查看权限菜单配置-->
							<!-- </el-input> -->
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row :gutter="20"  v-show="addForm.flag==3"> -->
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
				<!-- <el-row :gutter="20"  v-show="addForm.flag==3"> -->
					<el-col :span="12" v-show="addForm.flag==3">
						<el-form-item :label="$t('Update_time')"><!--修改时间-->
							<el-input v-model="addForm.updateTime"  type="datetime" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-show="addForm.flag==3">
						<el-form-item :label="$t('Update_user')"><!--修改用户-->
							<el-input v-model="addForm.updateUser" disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addForm')" v-if="addForm.flag==1">{{$t('Reset')}}</el-button><!--重置-->
				<el-button v-if="addForm.flag==1" type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button><!--保存-->
				<el-button v-if="addForm.flag==2" type="primary" @click="editSave('addForm')">{{$t('Save')}}</el-button><!--保存-->
			</div>
		</el-dialog>
		<!--权限新增、修改、查询详情页面结束-->
		
		<!--部门配置权限页面开始-->
		<el-dialog :title="title1" :visible.sync="dialogFormVisible2" :before-close="cancel2" :close-on-click-modal="false">
			<el-form :mode="addForm" size="small" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="addForm2" label-width="90px">
				<el-row :gutter="20">
					<!--<el-col :span="12">
						<el-form-item label="权限编号" prop="authorityNum" >
							<el-input v-model="addForm.authorityNum" disabled></el-input>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item :label="$t('auth.NameOfPermission')" prop="authorityName" ><!--权限名称-->
							<el-input v-model="addForm.authorityName" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="JurisdictionBox">
					<div style=" margin-top:15px;padding-top: 5px; border-top:1px solid rgba(0,0,0,.3)">
					  <!--<p>请勾选以下菜单和功能为该权限配置菜单和功能</p>-->
					  <p style="margin-bottom:5px;">{{funTitle}}</p>
					  <el-row :gutter="20">
					  	<el-col :span="12">
					  		<p>{{$t('auth.menuName')}}</p><!--菜单名称-->
					  		<!--@change="changeList(radioId)"-->
					  			<!--<el-radio-group v-model="radioId" >
					  				<div v-for="(item,index) in menuList" :key="index" style="padding:3px 5px;"> 
					  					<el-checkbox v-model="item.id"></el-checkbox>
					  					<el-radio :label="item.id" @change="changeList(radioId)" style="opacity:0;"></el-radio>
					  					{{item.menuName}}
					  				</div>
								  </el-radio-group>-->
					  		<!--<div class="menuBox">
									  <div v-for="(item,index) in menuList" :key="index" style="padding:3px 5px;">
									  	<input type="checkbox" name="checkbox" :value="item.id" :checked="item.check" @click="clickMList(item.id,item.check)" :disabled="checkDisabled||item.chose">
									  	<span @click="changeList(item.id)" :class="item.id==menuId?'menu active':'menu'">{{item.menuName}}</span>
									  	
									  </div>
					  		</div>-->
					  		<div class="menuBox">
					  			<div v-for="(item,index) in allList" :key="index" style="padding:3px 8px;">
									  	<span @click="changeList(item.id)" :class="item.id==menuId?'menu active':'menu'">{{item.menuName}}</span>
									</div>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>{{$t('auth.functionName')}}</p><!--功能名称-->
					  		<div class="menuBox">
					  			<div v-for="(menu,index) in allList" :key="index">
									  <div v-if="menu.id==menuId">
										<el-checkbox-group v-model="checkList"  @change="changeCheck(checkList)">
											<div  v-for="(item,index) in menu.children" :key="index"  style="padding:3px 8px">
												<div v-if="item.check||!checkDisabled">
													<el-checkbox @change="changeCheck(checkList)" :key="index" :label="item.value" :checked="item.check" :disabled="checkDisabled" >{{item.label}}</el-checkbox>
												</div>
											</div>
										</el-checkbox-group>
									  </div>
						  		</div>
					  		</div>
					  	</el-col>
					  </el-row>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="funSave()" v-if="!checkDisabled">{{$t('Save')}}</el-button><!--保存-->
			</div>
		</el-dialog>
		<!--部门配置权限页面结束-->
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
		pageSize:10,//当前页显示几条数据
    	pageIndex:0,//当前页的索引 以0开头
    	totalCount:0,//一共有多少条数据
    	currentPage:1,//当前是第几页
    	goPage:"",//要去第几页
    	queryAuthType:"2",//搜索权限编号或名称
    	queryAuth:"",//搜索的值
    	tableData:[],//列表数据
    	dialogFormVisible:false,//权限新增，修改，查询详情是否显示
    	dialogFormVisible2:false,
    	title:"新增权限",//部门新增,修改，查看模块的title
    	title1:"权限菜单配置",
    	rowObj:{},//列表的一条信息
    	allList:[],//所有的菜单功能名称
    	menuId:"001",//默认选中的id
    	checkList:"",//选中的菜单 
    	checkDisabled:false,
    	funTitle:"",
    	addForm:{//权限新增、修改、查询详情页面数据
    		legalPersonNum:this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
//  		companyName:this.$store.state.loginData.branchName,//公司名称
//  		legalPersonNum:"001",
    		companyName:"",
    		authorityNum:"",//权限编号
    		authorityName:"",//权限名称
    		authorityState:"1",//状态
    		createTime:"",//创建时间
    		createUser:"",//创建人
    		updateTime:"",//修改时间
    		updateUser:"",//修改人
    		flag:1,//新增1，修改2，查询3
    		dis:false,//是否禁止修改
    		resetDisabled:false,//是否显示重置
			allDis:false,//所有的禁止修改
			mustInput:true//必须输入
    	},
    	menu:[],//功能名称
    	options:[],//功能名称列表
    	rules:{
    		authorityNum: [
					{ required: true, message: i18n.t('auth.NotEmptyAuthNum'), trigger: 'blur' },//权限编号不能为空
					{ pattern:/^\d/g, message: i18n.t('auth.onlyNumAuthNum'), trigger: 'blur' },//权限编号只能输入数字，请重新输入
					{ min: 2, max: 4, message: i18n.t('auth.onlyTwoAndFourAuthNum'), trigger: 'blur'},//权限编号只能输入2~4位数字，请重新输入
				],
				authorityName:[
					{ required: true, message: i18n.t('auth.NotEmptyAuthName'), trigger: 'blur' },//权限名称不能为空
					{ pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('auth.onlyChineseAuthName'), trigger: 'blur' },//权限名称只能输入汉字，请重新输入
					{ max: 20, message: i18n.t('noMoreThen20'), trigger: 'blur' }//长度不能超过20个字符
				],
				authorityState:[
					{ required: true, message: i18n.t('choseState') },//请选择状态
				]
		},
		funLists: []
    }
  },
  created(){
  	this.getFunList()
  },
  mounted(){
	this.initAuth(0);  //初始化列表数据
	
	this.getFrInfo();//获取公司名称
  },
  methods:{
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == '权限管理' //权限管理 i18n.t('auth.AuthorityManagement')	
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funLists = JSON.stringify(res.returnData)
			}
		});
	},
	//初始化列表数据
		initAuth(val){
			this.pageIndex=val;
			this.currentPage=val+1
			var queryObj={
					"pageSize":this.pageSize,
					"pageIndex":this.pageIndex,
					"data":{
						"authorityName":this.queryAuth
					}
			}
			this.$post(this.$api+"/authority/findByPage",queryObj).then(res=>{
				if(res.returnCode=="000000"){
  				this.tableData=res.returnData.dataList;
  				this.totalCount=res.returnData.total;
  			}
			})
		},
		authAdd(val){//权限管理新增
			this.addForm.flag=1;
			this.addForm.authorityName=""
			this.title= i18n.t('auth.NewPermissions')//新增权限
			this.addForm.dis=false;
			this.addForm.authorityState="1"
			this.addForm.resetDisabled=true;//显示重置按钮
			this.addForm.mustInput=true;
			this.dialogFormVisible=true;//页面显示
		},
		//新增保存
		submitAdd(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var addObj={
//						"authorityNum":this.addForm.authorityNum,
						"authorityName":this.addForm.authorityName,
						"authorityState":this.addForm.authorityState,
					}
					this.$post(this.$api+"/authority/saveAuthority",addObj).then(res=>{					
						if(res.returnCode=="000000"){
							this.initAuth(0);
							this.$confirm( i18n.t('auth.AddSuccess'), i18n.t('Prompt'), {//新增成功，是否配置权限菜单
								confirmButtonText: i18n.t('OK'),//确定
								cancelButtonText:  i18n.t('Cancel'),//取消
							}).then(() => {
									this.configItem(res.returnData)
							}).catch(() => {});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('NewFailure'), {
								dangerouslyUseHTMLString: true
							});
						}
					})
				}
			})
		},
		//修改
		editItem(row,val){
			this.dialogFormVisible=true;//页面显示
			this.addForm.flag=2;
			this.title=i18n.t('auth.EditorialAuthority');//编辑权限
			this.addForm.authorityNum=row.authorityNum;
			this.addForm.authorityName=row.authorityName;
			this.addForm.authorityState=row.authorityState;
			this.addForm.dis=false;
			this.addForm.allDis=true;
			this.addForm.mustInput=true;
			this.rules.authorityNum=[];
			this.rowObj=row;
			this.checkDisabled=true;
		},
		//修改保存
		editSave(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					var editObj={
						"legalPersonNum":this.rowObj.legalPersonNum,
						"createUser":this.rowObj.createUser,
						"updateUser":this.rowObj.updateUser,
						"createTime":this.rowObj.createTime,
						"updateTime":this.rowObj.updateTime,
						"isDelete":this.rowObj.isDelete,
						"id":this.rowObj.id,
						"authorityNum":this.rowObj.authorityNum,
						"authorityName":this.addForm.authorityName,
						"authorityState":this.addForm.authorityState
					}
					this.$post(this.$api+"/authority/updateAuthority",editObj).then(res=>{
						if(res.returnCode=="000000"){
							this.initAuth(this.pageIndex);
							this.$alert(i18n.t('EditSuccess'), {//编辑成功
								dangerouslyUseHTMLString: true
							});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('EditFailure'), {//编辑失败
								dangerouslyUseHTMLString: true
							});
						}
					})
				}
			})
		},
		//删除
		deleteItem(row){
			var deleteObj={
				"id":row.id
			}
			var _this =this;
			this.$confirm(i18n.t('orDelete'), i18n.t('Prompt'), {//是否删除?
					confirmButtonText: i18n.t('OK'),//确定
					cancelButtonText: i18n.t('Cancel'),//取消
					type: 'warning'
			}).then(() => {
				this.$post(this.$api+"/authority/deleteAuthority",deleteObj).then(res=>{
					if(res.returnCode=="000000"){
						this.initAuth(this.pageIndex);
						this.$alert(i18n.t('deleteSuccess'), {//删除成功
							dangerouslyUseHTMLString: true
						});
					}else{
						var str = `
							<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str, i18n.t('deleteFailure'), {//删除失败
							dangerouslyUseHTMLString: true
						});
					}
				})
			})
		},
		//查看详情
		seeItem(row,val){
			this.addForm.flag=3;
			this.rowObj=row;
			this.title=i18n.t('auth.authDetail');//权限详情
			this.addForm.allDis=true;
			this.addForm.dis=true;
			this.addForm.mustInput=false;
			this.addForm.authorityNum=row.authorityNum;
			this.addForm.authorityName=row.authorityName;
			this.addForm.authorityState=row.authorityState;
			this.addForm.createTime=row.createTime;
			this.addForm.createUser=row.createUser;
			this.addForm.updateTime=row.updateTime;
			this.addForm.updateUser=row.updateUser;
			this.dialogFormVisible=true;//页面显示
		},
		//权限菜单配置
		configItem(row){
			this.menuId="";
			this.rowObj=row;
			this.title1=i18n.t('auth.pmc');//权限菜单配置
			this.arr=[];
			
			this.addForm.authorityNum=row.authorityNum;
			this.addForm.authorityName=row.authorityName;
			this.checkDisabled=false;
			this.funTitle=i18n.t('auth.pleaseChose');//请勾选以下菜单和功能为该权限配置菜单和功能
			this.$post(this.$api+"/menu/findByAuthority",{id:row.id}).then(res=>{
				if(res.returnCode=="000000"){
					this.allList=res.returnData;
//					this.menuId=this.allList[0].id
					
				}
			})
			this.addForm.mustInput=true;
			this.dialogFormVisible2=true;
		},
		//菜单改变
		changeList(id){
			if(this.menuId!=id){
				this.menuId=id;
				this.checkList=[];
			}
			
		},
		
		//功能改变
		changeCheck(checkList){
			if(checkList.length<1){
				this.allList.forEach((item,index)=>{
					if(item.id==this.menuId){
						item.chose=false;
						item.children.forEach((li,ind)=>{//遍历功能
							li.check=false;
							checkList.forEach((y,inde)=>{
								if(li.value==y){
									li.check=true;
								}
							})
						})
					}
				})
			}else{
				this.allList.forEach((item,index)=>{//遍历获取的数据
					if(item.id==this.menuId){//如果改变功能的菜单id与元数据一项的id值一样
						item.chose=true//菜单选中
						item.children.forEach((li,ind)=>{//遍历功能
							li.check=false;
							checkList.forEach((y,inde)=>{
								if(li.value==y){
									li.check=true;
								}
							})
						})
					}
				})
			}
		},
		
		
		//权限菜单配置保存
		funSave(){
			var obj={
				id:this.rowObj.id,
				menuList:this.allList
			}
			this.$post(this.$api+"/authority/saveMenu",obj).then(res=>{
				if(res.returnCode=="000000"){
					this.initAuth(this.pageIndex);
						this.$alert( i18n.t('auth.authSuccess'), {//权限配置成功
							dangerouslyUseHTMLString: true
						});
						this.dialogFormVisible2=false;
				}else{
					var str = `
								<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p>${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('auth.authFailure'), {//权限配置失败
								dangerouslyUseHTMLString: true
							});
				}
				this.cancel2();
			})
			
		},
		
		//查看详情
		seeFun(){
			this.menuId=""
			this.title1=i18n.t('auth.authDetailconfig');//权限菜单配置详情
			this.dialogFormVisible2=true;
			this.checkDisabled=true;
			var _this=this
			this.allList=[];
			this.$post(this.$api+"/menu/findChoseMenu",{id:this.rowObj.id}).then(res=>{
				if(res.returnCode=="000000"){
					this.allList=res.returnData;
//					this.menuId=this.allList[0].id
				}
			})
		},
		
		//获取公司名称
		getFrInfo () {
			this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
				if(res.returnCode == '000000'){
					this.addForm.legalPersonNum = res.returnData.legalPersonNum
					this.addForm.companyName = res.returnData.legalPersonName
				} else {
					var str = `
						<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p>${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					this.$alert(str, i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
				}
			});
		},

		//重置新增
		resetForm(formName) {
			// this.$refs[formName].resetFields()
			// if (this.$refs[formName]!==undefined) {
			// 	this.$refs[formName].resetFields();
			// }
    		this.addForm.authorityName=""//权限名称
    		this.addForm.authorityState="1"//状态
		},
		cancel(){//点击页面中的x
			// this.addForm.authorityName="";
			//this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波
			// this.addForm.flag=1;
			// this.resetForm('addForm');
			// this.dialogFormVisible = false;

			this.dialogFormVisible = false
			// this.addForm.flag=1;
			if (this.$refs['addForm']!==undefined) {
				this.$refs['addForm'].resetFields();
			}
			console.log(this.addForm.flag)
		},
		cancel2(){
			if(this.title1 == i18n.t('auth.authDetailconfig')){
				this.dialogFormVisible2 = false;
			}else{
				this.dialogFormVisible2 = false;
				// this.resetForm('addForm2');
				this.addForm.authorityName="";
			}
			this.addForm.authorityNum="";
		},
		
		//只能输入数字
		changePage(goPage){
			this.goPage=this.goPage.replace(/\D/g,'');
		},
		
		//点击确认改变数据
		goPageSure (val) {
			if (val) {
				var mc=Math.ceil(this.totalCount/this.pageSize);
				if(val>0&&val<=mc){
					this.goPage="";
					this.currentPage = parseInt(val);
					this.pageIndex = val-1;
					this.initAuth(val-1); 
				}else{
					this.goPage="";
					this.currentPage = parseInt(mc);
					this.pageIndex = mc-1;
					this.initAuth(mc-1); 
				}
			}
		},
		//改变每页显示多少条
		handleSizeChange(val) {
			this.pageSize =  val;
			this.pageIndex = 1;
			this.initAuth(0);
		},
		//选择页数改变数据
		handleCurrentChange(val){
			this.currentPage = val;
			this.pageIndex = val-1;
			this.initAuth(val-1); 
		},
	}	
}
</script>

<style  lang='scss'>
#legalPerson_content{
	.el-dialog {
		width:50%!important;
	}
	.belongLegalPersonNum{
		 .el-form-item__content, .el-form-item__label{
			line-height:16px !important;;
		}
	}
	.menuBox{width:100%; height:150px; overflow-y: auto; border:1px solid rgba(0,0,0,.1)}
	.menu{cursor:pointer}
	.menu.active{color:#5bc0de}
}
.el-pagination .el-select .el-input{width:125px;}
</style>

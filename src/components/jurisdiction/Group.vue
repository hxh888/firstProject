<template>
  <!-- 岗位管理 -->
  <div class="content_box" id="group_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
			<el-row>
				<el-col :span="24">
					<el-form-item  :label="$t('group.Job_Title')"> 	<!-- 岗位名称 -->
						<el-input v-model="searchForm.queryName" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="edit_module_btn" >
					<el-form-item>
						<el-button type="warning" icon="el-icon-search" @click="groupSearch()" >{{$t('Query')}}</el-button>  <!--查询按钮-->
						<el-button type="primary" icon="el-icon-plus"  @click="groupAdd()" v-if="funList.indexOf('新增') > -1">{{$t('Add')}}</el-button> <!--新增按钮-->
					</el-form-item>
				</el-col>
			</el-row>  
		</el-form>
    </div>

	<!-- 列表模块 -->
    <div class="list_module">
		<div class="table_body">
			<h4>{{$t('group.Job_List')}}</h4>
			<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
					<!--序号-->
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
					<!--岗位名称-->
 					<el-table-column prop="postName" :label="$t('group.Job_Title')"  align="center" min-width="145px"> </el-table-column>
					<!--创建日期-->
					<el-table-column prop="createTime" :label="$t('Create_date')" align="center"  min-width="135px">
						<template slot-scope="scope">
							{{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
						</template>
					</el-table-column>
						
					<!--修改日期-->
					<el-table-column prop="updateTime" :label="$t('Update_date')" align="center"   min-width="160px"> 
						<template slot-scope="scope">
								{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
						</template>
					</el-table-column>
					<!--状态-->
					<el-table-column prop="postState" :label="$t('Status')"  align="center"  width="130px">
						<template slot-scope="scope">
							<span v-if="scope.row.postState==1">{{$t('Take_effect')}}</span>  <!--生效-->
							<span v-else>{{$t('Failure_effect')}}</span> <!--失效-->
						</template>
					</el-table-column>
					<!--操作-->
					<el-table-column :label="$t('Operation')" align="center" min-width="150px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 ">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
								<i class="el-icon-view"></i>
								<span class="text">{{$t('See')}}</span>	<!-- 查看 -->
							</el-button> 

							<el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
								<i class="el-icon-edit"></i>
								<span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
							</el-button>
							<!-- 不可点击 -->
							<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)"  v-if="funList.indexOf('删除') > -1">
								<i class="el-icon-delete"></i>
								<span class="text">{{$t('Delete')}}</span> <!-- 删除 -->
							</el-button>
						</template>
					</el-table-column>
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
	<!--弹框页面开始-->
	<el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
		<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  :rules="$rules.group" ref="addForm" id="addForm" size="small"  label-width="100px">
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

			<div v-if="addForm.edit==3 ">
				<el-row>
					<!-- <el-col :span="12">
						<el-form-item label="岗位编号" >
							<el-input v-model="addForm.postNum"   disabled ></el-input>
						</el-form-item>
					</el-col> -->

					<el-col :span="12">
						<el-form-item :label="$t('group.Job_Title')"> <!-- 岗位名称 -->
							<el-input v-model="addForm.postName"   disabled ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('group.Job_Type')"> <!-- 岗位类型 -->
							<el-select v-model="addForm.postType" disabled placeholder="">
								<el-option  v-for="(item,index) in options"
											:key="index"
											:label="item.paramSname"
											:value="item.paramValue">
								</el-option>
							</el-select>	
						</el-form-item>
					</el-col>
				</el-row>
				<!-- <el-row>
					<el-col :span="12">
						<el-form-item label="授信额度" >
								<el-input v-model="addForm.approvalLimit"    :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-row>
					
					<el-col :span="12">
						<el-form-item  :label="$t('Status')" > <!--状态-->
							<el-select v-model="addForm.postState"   disabled>
								<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
								<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
							</el-select>	
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item  prop="createTime" :label="$t('Create_time')" >  <!--创建时间-->
							<el-input v-model="addForm.createTime"  :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>

			<div v-if="addForm.edit==2 ">
				<el-row>
					<el-col :span="12">
						<el-form-item  prop="postName" :label="$t('group.Job_Title')"> <!-- 岗位名称 -->
							<el-input v-model="addForm.postName"></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="12">
						<el-form-item label="授信额度" prop="approvalLimit" >
							<el-input v-model=" addForm.approvalLimit"  @blur="validApprovalLimit()"></el-input>
							<div class="el-form-item__error">{{errmsg}}</div>
						</el-form-item>
					</el-col> -->
					<el-col :span="12">
						<el-form-item  prop="postType" :label="$t('group.Job_Type')"> <!-- 岗位类型 -->
							<el-select v-model="addForm.postType" placeholder="">
								<el-option  v-for="(item,index) in options"
											:key="index"
											:label="item.paramSname"
											:value="item.paramValue">
								</el-option>
							</el-select>	
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item  prop="postState" :label="$t('Status')" > <!--状态-->
							<el-select v-model="addForm.postState" >
								<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
								<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
							</el-select>	
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div v-if="addForm.edit==1 ">
				<el-row>
					<el-col :span="12">
						<el-form-item  prop="postName" :label="$t('group.Job_Title')"> <!-- 岗位名称 -->
							<el-input v-model="addForm.postName"  ></el-input>
						</el-form-item>
					</el-col>

					<!-- <el-col :span="12">
						<el-form-item label="授信额度" prop="approvalLimit" >
							<el-input v-model=" addForm.approvalLimit"  @blur="validApprovalLimit()"></el-input>
							<div class="el-form-item__error">{{errmsg}}</div>
						</el-form-item>
					</el-col> -->
					<el-col :span="12">
						<el-form-item  prop="postType" :label="$t('group.Job_Type')"> <!-- 岗位类型 -->
							<el-select v-model="addForm.postType" placeholder="">
								<el-option  v-for="(item,index) in options"
											:key="index"
											:label="item.paramSname"
											:value="item.paramValue">
								</el-option>
							</el-select>	
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item  prop="postState" :label="$t('Status')" > <!--状态-->
							<el-select v-model="addForm.postState" >
								<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
								<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
							</el-select>	
						</el-form-item>
					</el-col>
					
				</el-row>
			</div>

			<el-row v-show="addForm.edit ==3 ">
				<el-col :span="12">
					<el-form-item  prop="createUser"  :label="$t('Create_user')">  <!--创建用户-->
						<el-input v-model="addForm.createUser"  :disabled="addForm.flag"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item  prop="updateTime" :label="$t('Update_time')"  > <!--修改时间-->
						<el-input v-model="addForm.updateTime"  :disabled="addForm.flag"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row v-show="addForm.edit ==3 ">
				<el-col :span="12">
					<el-form-item  prop="updateUser"  :label="$t('Update_user')"> <!--修改用户-->
						<el-input v-model="addForm.updateUser" :disabled="addForm.flag" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="addForm.edit ==1" @click="resetForm('addForm')">{{$t('Reset')}}</el-button>
			<el-button v-if="addForm.edit ==2" type="primary" @click="editSave('addForm')">{{$t('Save')}}</el-button>
			<el-button v-if="addForm.edit ==1" type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button>
		</div>
	
	</el-dialog>
	<!--弹框页面结束-->
  </div>
</template>

<script>
// import parmSelect from '../common/parmSelect.vue'
export default {
	name: 'Group',
	data () {
		return {
			searchForm:{  //查询条件
				queryName:''
			},
			
			tableData:[],//岗位table数据

			currentPage:1,//当前显示第几页 1开头
			pageSize:10,//一页显示几条数据
			totalCount:0,//一共有多少条数据
			goPage:"",//前往第几页
			title:'', //弹框标题
			dialogFormVisible: false,//新增弹出框是否显示
			cardTypeList:[],//岗位代表证件类型
			
			addForm: {
				postNum: '',//岗位编号
				postName:'',//岗位名称 
				postType:'', //岗位类型
				approvalLimit:'', //审批额度
				postState:'1', //状态
				createTime:'', //创建时间
				createUser:'', //创建人
				updateTime:'', //修改时间
				updateUser:'', //用户名
				id:'',
				flag:false,   //是否可输入 默认可以
				edit:1,	 //标识 1 是新增 2是编辑 3是查看
				legalPersonNum:"",
				legalPersonName:""
			},
			errmsg:'',

			options:[],
			funList: []
			
			// select:'', //父传子
		}
	},
	// components:{
	// 	parmSelect
	// },
  created(){
	  this.defaultAddForm=$.extend({},this.addForm); //重置数据  初始化的时候深拷贝一下
	  this.getFunList()
  },
  mounted(){
	  this.initGroupList();  //初始化列表数据
	  
  },
  methods:{
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == "岗位管理";  

		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
	//初始化列表数据
	initGroupList(){
		var FunMsgData1={
			"currentPage":this.currentPage,
			"pageSize":this.pageSize,
		}
		this.$post(this.$api + '/post/list',FunMsgData1).then(res=>{
			if(res.returnCode=="000000"){
				this.tableData =res.returnData.data
				this.totalCount = res.returnData.count;
			}
		})

		var param={
			"paramCode":"POST_TYPE",
		}
		this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
			if(res.returnCode=="000000"){
				this.options =res.returnData
			}
		})
	},
	//查询参数
	groupSearch(){
		this.currentPage = 0;
		var FunMsgData = {
			"postName":this.searchForm.queryName,
			"currentPage":this.currentPage,
			"pageSize":this.pageSize,
		};
		this.$post(this.$api + '/post/list',FunMsgData).then( res =>{
			if(res.returnCode=="000000"){
				this.tableData =res.returnData.data
				this.totalCount = res.returnData.count;
			}
		});
	},
	//点击新增按钮
	groupAdd() {
		this.dialogFormVisible = true;
		this.addForm.edit= 1;
		this.title= '';
		this.title= i18n.t('group.New_jobs')  // 新增岗位

		this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波	
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.getLegalInfo(); 
	},
	//单独验证授信额度
	validApprovalLimit(){
		let patter =new RegExp("[0-9]$");
		if(!patter.test(this.addForm.approvalLimit)){
			this.errmsg = i18n.t('Enter_number')  // 请输入数字字符
			return false
		}else{
			this.errmsg='';
			return true
		}
	},
	//确定增加岗位
	submitAdd(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				var	FunMsgData4 = {
					"postName":this.addForm.postName,
					"postType":this.addForm.postType,
					"postState":this.addForm.postState,
				};
				this.$post(this.$api + '/post/save',FunMsgData4).then( res =>{
					if(res.returnCode=="000000"){
						this.initGroupList();
						this.dialogFormVisible = false;
						this.$refs[formName].resetFields();
						// this.addForm.flag=false;
						this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波
						
						this.$alert( i18n.t('group.Add_success'),  i18n.t('Prompt'), {  //新增岗位成功 提示
							dangerouslyUseHTMLString: true
						});
						
					}else{
						var str = `
							<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str,  i18n.t('group.Add_failure'), {  //新增岗位失败 
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
	cancel(formName){
		this.dialogFormVisible = false;
		this.addForm.edit=1;
		if (this.$refs[formName]!==undefined) {
			this.$refs[formName].resetFields();
		}
	},
	//点击编辑岗位
	editItem(row){
		this.dialogFormVisible=true;
		this.addForm.edit=2;
		this.title= '';
		this.title=  i18n.t('group.Edit_jobs');  // '编辑岗位';
		this.addForm.id = row.id;
		this.addForm.postNum=row.postNum
		this.addForm.postName=row.postName
		this.addForm.postType = row.postType
		this.addForm.postState=row.postState

		this.getLegalInfo(); 
	},
	//保存编辑岗位
	editSave(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				var FunMsgData5 = {
					"id":this.addForm.id,
					"postName":this.addForm.postName,
					"postState":this.addForm.postState,
					"postType":this.addForm.postType,
				}
				this.$post(this.$api + '/post/update',FunMsgData5).then(res=>{
						this.dialogFormVisible=false
						if(res.returnCode=="000000"){
							this.groupSearch();
							this.$alert( i18n.t('group.Modified_success'),  i18n.t('Prompt'), {  //保存岗位成功  提示
								dangerouslyUseHTMLString: true
							});
						}else{
							var str = `
								<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str,  i18n.t('group.Modified_failure'), {  //保存岗位失败 
								dangerouslyUseHTMLString: true
							});
						}
						
					})
			}else {
				return false;
			}
		})
		},
	//点击单个删除按钮
	deleteItem(row){
		var FunMsgData5={
			"id":row.id
		}
		var _this =this;
		this.$confirm( i18n.t('group.Is_del_job'), i18n.t('Prompt'), {  //是否删除岗位  
				confirmButtonText:  i18n.t('OK'),   //确定
				cancelButtonText: i18n.t('Cancel'),  //取消
				type: 'warning'
		}).then(() => {
			this.$post(this.$api + '/post/delete',FunMsgData5).then(function(res){
				if(res.returnCode=="000000"){
					_this.groupSearch();
					_this.$alert( i18n.t('group.Del_success'), i18n.t('Prompt'), { //删除岗位成功
						dangerouslyUseHTMLString: true
					});
				}else{
					var str = `
						<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					_this.$alert(str, i18n.t('group.Del_failure'), { //删除岗位失败！
						dangerouslyUseHTMLString: true
					});
				}
			})
		})
	},
	//查看岗位
	seeItem(row){
		this.dialogFormVisible=true;
		this.addForm.flag=true;
		this.addForm.edit=3;
		this.title= '';
		this.title=  i18n.t('group.Job_Detail');  // '岗位详情';
		this.getLegalInfo(); 
		var FunMsgData={
			"id":row.id
		}
		this.$post(this.$api + '/post/detail',FunMsgData).then(res=>{
			if(res.returnCode=="000000"){
				let data = res.returnData
				this.addForm.postNum = data.postNum;
				this.addForm.postName = data.postName;
				// this.addForm.approvalLimit = data.approvalLimit;
				this.addForm.postType=data.postType
				this.addForm.postState = data.postState;
				this.addForm.createTime = data.createTime;
				this.addForm.createUser = data.createUser;
				this.addForm.updateTime = data.updateTime;
				this.addForm.updateUser = data.updateUser;
			}
		})
	},
	//监听搜索框为空的时候展示全部数据
	onChangequery(){
		this.groupSearch();
	},
	//重置表单
	resetForm(formName) {
		this.$refs[formName].resetFields();
	},
	//获取公司名称
	getLegalInfo () {
		this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				this.addForm.legalPersonNum = res.returnData.legalPersonNum
				this.addForm.legalPersonName = res.returnData.legalPersonName
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
	//前往第几页
	goPageSure (val) {
		if (val) {
			var mc=Math.ceil(this.totalCount/this.pageSize);
			if(val>0&&val<=mc){
				this.goPage="";
				this.currentPage = parseInt(val)
				this.initGroupList()
			}else{
				this.goPage="";
				this.currentPage = parseInt(mc)
				this.initGroupList()
			}
		}
	},
	//改变每页显示多少条
	handleSizeChange(val) {
		this.pageSize =  val;
		this.currentPage = 1
		this.initGroupList();
	},
	//选择页数改变数据
	handleCurrentChange(val){
		this.currentPage = val;
		this.initGroupList(); 
	},

  }
}
</script>

<style  lang='scss'>
#group_content{
	.el-dialog {
		width:60%!important;
	}
}
.el-pagination .el-select .el-input{width:125px;}
</style>

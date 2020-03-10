<template>
  <!-- 法人管理 -->
  <div class="content_box" id="legalPerson_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
			<el-row>
				<el-col :span="24">
					<el-form-item :label="$t('legalPerson.UnifiedCredit')"> 	<!-- 社会统一信用代码 -->
						<el-input v-model="searchForm.queryNum"  ></el-input>
					</el-form-item>
					<el-form-item :label="$t('Unit')">     	<!-- 公司名称 -->
						<el-input v-model="searchForm.queryName"  ></el-input>
					</el-form-item>
					<el-form-item  :label="$t('legalPerson.ParentUnit')">     	<!-- 所属管辖单位名称 -->
						<el-input v-model="searchForm.queryPrentName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="edit_module_btn" >
					<el-form-item>
						<el-button type="warning" icon="el-icon-search" @click="legalPersonSearch()" >{{$t('Query')}}</el-button>  <!--查询按钮-->
						<el-button type="primary" icon="el-icon-plus"  @click="legalPersonAdd()" v-if="funList.indexOf('新增') > -1">{{$t('Add')}}</el-button> <!--新增按钮-->
					</el-form-item>
				</el-col>
			</el-row>  
		</el-form>
    </div>
	<!-- 列表模块 -->
    <div class="list_module">
		<div class="table_body">
			<h4>{{$t('legalPerson.Listpersons')}}</h4><!--法人列表-->
			<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
					<!--序号-->
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
					<!--社会统一信用代码-->
 					<el-table-column prop="legalPersonNum" :label="$t('legalPerson.UnifiedCredit')"  align="center" min-width="205px"> </el-table-column>
					<!--公司名称-->
 					<el-table-column prop="legalPersonName" :label="$t('Unit')"  align="center" min-width="140px"> </el-table-column>
					<!--所属管辖单位名称-->
 					<el-table-column prop="parentLegalPersonName" :label="$t('legalPerson.ParentUnit')"  align="center" min-width="210px"> </el-table-column>
					 <!--创建日期-->
 					<el-table-column prop="createTime" :label="$t('Create_date')"  align="center" min-width="135px"> 
						 <template slot-scope="scope">
								{{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
						</template>
					 </el-table-column>
					 <!--修改日期-->
 					<el-table-column prop="updateTime" :label="$t('Update_date')"  align="center" min-width="165px"> 
						<template slot-scope="scope">
								{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
						</template>
					 </el-table-column>
					<!--状态-->
					<el-table-column prop="legalPerState" :label="$t('Status')" align="center"  width="150px" min-width="120px">
						<template slot-scope="scope">
							<span v-if="scope.row.legalPerState==1">{{$t('Take_effect')}}</span>  <!--生效-->
							<span v-else>{{$t('Failure_effect')}}</span> <!--失效-->
						</template>
					</el-table-column>
					<!--操作-->		
					<el-table-column :label="$t('Operation')" align="center" min-width="145px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1">
						<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span>	<!-- 查看 -->
								</el-button> 

								<el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
									<i class="el-icon-edit"></i>
									<span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
								</el-button>
							
								<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funList.indexOf( $t('Delete') ) > -1">
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
							<el-input size="mini" v-model="goPage" type="number" ></el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
			</el-pagination>
		</div>
	</div>
	<!--弹框页面开始-->
	<el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
		<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="$rules.legalPerson" ref="addForm" id="addForm" size="small"  label-width="150px">
			<div  v-if="addForm.edit==3">
				<el-form-item :label="$t('legalPerson.UnifiedCredit')"  > <!--社会统一信用代码-->
					<el-input v-model="addForm.legalPersonNum" disabled></el-input>
				</el-form-item>

				<el-form-item :label="$t('Unit')" > <!--公司名称-->
					<el-input v-model="addForm.legalPersonName" disabled></el-input>
				</el-form-item>

				<el-form-item :label="$t('legalPerson.ParentUnifiedCredit')"  class="parentLegalPersonNum" >  <!--所属管辖单位社会统一信用代码-->
					<el-input v-model="addForm.parentLegalPersonNum"  disabled></el-input>
				</el-form-item>
			
				<el-form-item  :label="$t('legalPerson.ParentUnit')" > <!--所属管辖单位名称-->
					<el-input v-model="addForm.parentLegalPersonName" disabled></el-input>
				</el-form-item>

				<el-form-item :label="$t('Status')" > <!--状态-->
					<el-select v-model="addForm.legalPerState" disabled>
						<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
						<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
					</el-select>	
				</el-form-item>
				
				<el-form-item   :label="$t('Create_time')" >  <!--创建时间-->
					<el-input v-model="addForm.createTime" disabled></el-input>
				</el-form-item>
				<el-form-item   :label="$t('Create_user')">  <!--创建用户-->
					<el-input v-model="addForm.createUser" disabled></el-input>
				</el-form-item>
				<el-form-item   :label="$t('Update_time')"  > <!--修改时间-->
					<el-input v-model="addForm.updateTime" disabled></el-input>
				</el-form-item>
				<el-form-item  :label="$t('Update_user')"> <!--修改用户-->
					<el-input v-model="addForm.updateUser" disabled></el-input>
				</el-form-item>
			</div>
			<div v-else>
					<el-form-item  prop="legalPersonNum" :label="$t('legalPerson.UnifiedCredit')"  > <!--社会统一信用代码-->
						<el-input v-model="addForm.legalPersonNum"  :disabled="addForm.flag" maxlength="18"></el-input>
					</el-form-item>
					<el-form-item  prop="legalPersonName" :label="$t('Unit')" > <!--公司名称-->
						<el-input v-model="addForm.legalPersonName"  maxlength="32"></el-input>
					</el-form-item>

					<el-form-item  prop="parentLegalPersonNum"  :label="$t('legalPerson.ParentUnifiedCredit')"  class="parentLegalPersonNum" >  <!--所属管辖单位社会统一信用代码-->
						<el-input v-model="addForm.parentLegalPersonNum"   @blur="validLegalPersonNum()" maxlength="18" ></el-input>
						<div class="el-form-item__error">{{errmsg}}</div>
					</el-form-item>
				
					<el-form-item  prop="parentLegalPersonName" :label="$t('legalPerson.ParentUnit')" > <!--所属管辖单位名称-->
						<el-input v-model="addForm.parentLegalPersonName"  disabled></el-input>
					</el-form-item>

					<el-form-item  prop="legalPerState" :label="$t('Status')" > <!--状态-->
						<el-select v-model="addForm.legalPerState" >
							<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
							<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
						</el-select>
					</el-form-item>
			</div>
		
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="addForm.edit ==1" @click="resetForm('addForm')">{{$t('Reset')}}</el-button>  <!--重置-->
			<el-button v-if="addForm.edit ==2" type="primary" @click="editSave('addForm')">{{$t('Save')}}</el-button>   <!--保存-->
			<el-button v-if="addForm.edit ==1" type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button>  <!--保存-->
		</div>
	
	</el-dialog>
	<!--弹框页面结束-->
  </div>
</template>

<script>
export default {
  name: 'LegalPerson',
  data () {
    return {
		searchForm:{  //查询条件
			queryNum:'',
			queryName:'',
			queryPrentName:'' //上级机构名称
		},
		tableData:[],//法人table数据
		currentPage:1,//当前显示第几页 1开头
		pageSize:10,//一页显示几条数据
		totalCount:0,//一共有多少条数据
		goPage:"",//前往第几页
		title:'', //弹框标题
		dialogFormVisible: false,//新增弹出框是否显示
		cardTypeList:[],//法人代表证件类型
	    addForm: {
	      legalPersonNum: '',//社会统一信用代码
		  legalPersonName:'',//公司名称 
		  parentLegalPersonNum:'', //所属管辖单位社会统一信用代码
		  parentLegalPersonName:'', //所属管辖单位名称
		  legalPerState:'1',//状态
		  id:'', //id
		  createTime:'', //创建时间
		  createUser:'', //创建人
		  updateTime:'', //修改时间
		  updateUser:'', //用户名
		  
	      flag:false,   //是否可输入 默认可以
		  edit:1,	 //标识 1 是新增 2是编辑 3是查看
		},
		errmsg:'',
		funList: []
    }
  },
  created(){
	  this.defaultAddForm=$.extend({},this.addForm); //重置数据  初始化的时候深拷贝一下
	  this.getFunList();
  },
  mounted(){
	this.initPersonList();  //初始化列表数据
	
  },
  methods:{
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == '法人管理'  
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
	//初始化列表数据
	initPersonList(){
		var FunMsgData1={
			"currentPage":this.currentPage,
			"pageSize":this.pageSize,
		}
		this.$post(this.$api + '/legalper/list',FunMsgData1).then(res=>{
			if(res.returnCode=="000000"){
				this.tableData =res.returnData.data
				this.totalCount = res.returnData.count;
			}
		})
	},
	//查询参数
	legalPersonSearch(){
		this.currentPage = 0;
		var FunMsgData = {
			"legalPersonName":this.searchForm.queryName,
			"legalPersonNum":this.searchForm.queryNum,
			"parentLegalPersonNum":this.searchForm.queryPrentName,
			"currentPage":this.currentPage,
			"pageSize":this.pageSize,
		};
		this.$post(this.$api + '/legalper/list',FunMsgData).then( res =>{
			if(res.returnCode=="000000"){
				this.tableData =res.returnData.data
				this.totalCount = res.returnData.count;
			}
		});
	},
	//点击新增按钮
	legalPersonAdd() {
		this.dialogFormVisible = true;
		this.addForm.edit= 1;
		this.title= i18n.t('legalPerson.Newaddlegalperson');  // 新增法人
		this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波	
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
	},
	//单独验证社会统一信用密码
	validLegalPersonNum(){
		let patter =/^(?=.*[A-Z])(?=.*\d)[A-Z\d]{18}$/;
		if(this.addForm.parentLegalPersonNum ==''){
			this.errmsg = ''
			this.addForm.parentLegalPersonName = ''
			return
		}
		if(this.addForm.parentLegalPersonNum){
			if(!patter.test(this.addForm.parentLegalPersonNum)){
				this.errmsg = i18n.t('legalPerson.legalNum_format');  // 请输入18位由大写字母和数字组成的字符
				return
			}else{
				this.errmsg = ''
			}
		} else {
			return
		}
		
		var FunMsgData1={
			"legalPersonNum":this.addForm.parentLegalPersonNum
		}
		this.$post(this.$api + '/legalper/findByLegalPerNum',FunMsgData1).then(res=>{
			if(res.returnCode=="000000"){
				if(res.returnData == null){
					this.errmsg = i18n.t('legalPerson.legalNum_format1'); // '所属管辖单位社会统一信用代码不存在！'
					this.addForm.parentLegalPersonName = ''
				}else{
					this.addForm.parentLegalPersonName =res.returnData.legalPersonName
					this.errmsg =''
				}
			}
		})
	},
	//确定增加法人
	submitAdd(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				var	FunMsgData4 = {
					"legalPersonNum":this.addForm.legalPersonNum,
					"legalPersonName":this.addForm.legalPersonName,
					"legalPerState":this.addForm.legalPerState,
					"parentLegalPersonNum":this.addForm.parentLegalPersonNum,
				};
				this.$post(this.$api + '/legalper/save',FunMsgData4).then( res =>{
					if(res.returnCode=="000000"){
						this.initPersonList();
						this.$alert( i18n.t('legalPerson.Add_success'),  i18n.t('Prompt'), {  //新增法人成功 提示
							dangerouslyUseHTMLString: true
						});
						this.dialogFormVisible = false;
						this.$refs[formName].resetFields();
						this.addForm.flag=false;
						this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波
					}else{
						var str = `
							<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str,  i18n.t('legalPerson.Add_failure'), {  //新增法人失败 
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
		this.addForm.flag=false;
		this.addForm.edit=1;
		this.errmsg = ''
		if (this.$refs[formName]!==undefined) {
			this.$refs[formName].resetFields();
		}
	},
	//点击编辑法人
	editItem(row){
		this.dialogFormVisible=true;
		this.addForm.id = row.id;
		this.addForm.legalPersonNum=row.legalPersonNum
		this.addForm.legalPersonName=row.legalPersonName
		this.addForm.legalPerState=row.legalPerState
		this.addForm.parentLegalPersonNum=row.parentLegalPersonNum
		this.addForm.parentLegalPersonName=row.parentLegalPersonName

		this.addForm.flag=true;
		this.addForm.edit=2;
		this.title=  i18n.t('legalPerson.Amendmentperson');  // '编辑法人';
	},
	//保存编辑法人
	editSave(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				var FunMsgData5 = {
					"id":this.addForm.id,
					"legalPersonName":this.addForm.legalPersonName,
					"legalPerState":this.addForm.legalPerState,
					"parentLegalPersonNum":this.addForm.parentLegalPersonNum
				}
				this.$post(this.$api + '/legalper/update',FunMsgData5).then(res=>{
						this.dialogFormVisible=false
						this.errmsg = ''
						if(res.returnCode=="000000"){
							this.legalPersonSearch();
							this.$alert( i18n.t('legalPerson.Modified_success'),  i18n.t('Prompt'), {  //保存法人成功  提示
								dangerouslyUseHTMLString: true
							});
						}else{
							var str = `
								<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('legalPerson.Modified_failure'), {  //保存法人失败！ 
								dangerouslyUseHTMLString: true
							});
						}
						
					})
				} else {
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
		this.$confirm( i18n.t('legalPerson.Is_del_persons'), i18n.t('Prompt'), {  //是否删除法人  i18n.t('Prompt')
				confirmButtonText:  i18n.t('OK'),   //确定
				cancelButtonText: i18n.t('Cancel'),  //取消
				type: 'warning'
		}).then(() => {
			this.$post(this.$api + '/legalper/delete',FunMsgData5).then(function(res){
				if(res.returnCode=="000000"){
					_this.legalPersonSearch();
					_this.$alert( i18n.t('legalPerson.Del_success'), i18n.t('Prompt'), { //删除法人成功！
						dangerouslyUseHTMLString: true
					});
				}else{
					var str = `
						<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					_this.$alert(str, i18n.t('legalPerson.Del_failure'), { //删除法人失败！
						dangerouslyUseHTMLString: true
					});
				}
			})
		})
	},
	//查看法人
	seeItem(row){
		this.addForm.edit=3;
		this.dialogFormVisible=true;
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		this.title=  i18n.t('legalPerson.Detaillegalperson');  // '法人详情';

		var FunMsgData={
			"id":row.id
		}
		this.$post(this.$api + '/legalper/detail',FunMsgData).then(res=>{
			if(res.returnCode=="000000"){
				let data = res.returnData
				this.addForm.legalPersonNum = data.legalPersonNum;
				this.addForm.legalPersonName = data.legalPersonName;
				this.addForm.legalPerState = data.legalPerState;
				this.addForm.parentLegalPersonNum=data.parentLegalPersonNum
				this.addForm.parentLegalPersonName=data.parentLegalPersonName
				this.addForm.createTime = data.createTime;
				this.addForm.createUser = data.createUser;
				this.addForm.updateTime = data.updateTime;
				this.addForm.updateUser = data.updateUser;
				this.addForm.parentLegalPersonNum = data.parentLegalPersonNum
			} else {
				//错误码 原因
				var str = `
					<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), { //提示
					dangerouslyUseHTMLString: true
				});
			}
		})


	},
	//重置表单
	resetForm(formName) {
		this.$refs[formName].resetFields();
	},
	//前往第几页
	goPageSure (val) {
		if (val) {
			var mc=Math.ceil(this.totalCount/this.pageSize);
			if(val>0&&val<=mc){
				this.goPage=""
				this.currentPage = parseInt(val)
				this.initPersonList()
			}else{
				this.goPage="";
				this.currentPage = parseInt(mc)
				this.initPersonList()
			}
		}
	},
	//改变每页显示多少条
	handleSizeChange(val) {
		this.pageSize =  val;
		this.currentPage = 0
		this.initPersonList();
	},
	//选择页数改变数据
	handleCurrentChange(val){
		this.currentPage = val;
		this.initPersonList(); 
	},

  }
}
</script>

<style  lang='scss'>
#legalPerson_content{
	.el-dialog {
		width:50%!important;
	}
	.parentLegalPersonNum{
		 .el-form-item__content, .el-form-item__label{
			line-height:16px !important;;
		}
	}
}
.el-pagination .el-select .el-input{width:125px;}
</style>

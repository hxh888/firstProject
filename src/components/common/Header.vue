<template>
	<div>
		<el-row class="header">
		  	<el-col :span="4" class="h_left">
		  		<div class="grid-content bg-purple">
		  			<img src="../../assets/images/logo1.png">
		  		</div>
		  	</el-col>
		  	<el-col :span="15" class="h_center">
		  		<div class="grid-content bg-purple-light color">
					<ul>
						<li v-for="(item,index) of nav"  :key="index" v-show="item.isShow">
							<router-link 	
										:to="{path:item.path, query: {id: item.id}}"
										:class=" item.id == $route.query.id ?'current':' '"
										:style="{'font-size': lang === 'en' ? '12px': '14px', 'line-height': lang === 'en' ? '1.5': '30px'}"
										>
										<i class="iconfont" :class="item.icon"></i> 
										{{item.title}}
							</router-link >
							<!-- :to="item.path" -->
						</li>
					</ul>
		  		</div>
		  	</el-col>	
		  	<el-col :span="5" class="h_right" >
 		  		<div class="grid-content bg-purple" >
 		  			<el-row>
 		  				<el-col :span="24">
 		  					<!--<a class="iconfont icon-UserSettings" @click="outLogin()"></a>--> 
							<div :title="`${$t('header.welcomeYou')},${$store.state.loginData.userLogin.userName}！`" class="rbtn welcom" style="width:100%; overflow:hidden;  white-space:nowrap; text-overflow:ellipsis;  ">{{$t('header.welcomeYou')}},{{$store.state.loginData.userLogin.userName}}!</div><!-- 欢迎您 -->
							<div class="rbtn" style="margin-right: 10px;" v-if="$store.state.loginData.userLogin.roleName == '系统管理员'"><el-button :class="lang == 'en' ? 'en' : ''" icon="el-icon-edit-outline" type="text"  @click="openDialog2()">{{$t('login.reset_Password')}}</el-button></div><!-- 重置密码 -->
							<div class="rbtn" style="margin-right: 10px;"><el-button :class="lang == 'en' ? 'en' : ''" icon="el-icon-edit-outline" type="text"  @click="openDialog()">{{$t('header.editPassword')}}</el-button></div><!-- 修改密码 -->
 		  					<div class="rbtn"><el-button type="text" :class="lang == 'en' ? 'en' : ''" class="iconfont icon-tuichu2" @click="outLogin()" style="font-size:14px;" >{{$t('header.logOut')}}</el-button></div><!-- 退出 -->
 		  				</el-col>
 		  			</el-row>
 		  		</div>
		  	</el-col>
		</el-row>
		<!-- 修改密码 -->
		<el-dialog :title="$t('header.editPassword')" :visible.sync="dialogVisible" :before-close="cancel" :show-close="$store.state.loginData.userLogin.updatePwdOrNot != '1' &&$store.state.loginData.userLogin.updatePwdOrNot != '0'" :close-on-click-modal="false" width="700px"> <!-- title 修改密码--> <!-- 新增用户 -->
			<el-form :model="addForm"  ref="addForm" :rules="rules" label-width="80px" class="demo-ruleForm" size="small" :inline="false">
				<el-row class="edit_module_search">
					<el-col :span="24">
							<el-form-item :label="$t('header.userName')" prop="loginId"> <!-- 用户名 -->
								<el-input v-model="addForm.loginId" disabled></el-input><!-- 用户名 -->
							</el-form-item>
					</el-col>
					<el-col :span="24">
							<el-form-item :label="$t('header.oldPassword')"   prop="userP" ><!-- 原密码 -->
								<el-input type="password"  v-model="addForm.userP"></el-input ><!-- 原密码 -->
							</el-form-item>
					</el-col>	

					<el-col :span="24">
							<el-form-item :label="$t('header.newPassword')"   prop="userN"  class="userN" >   <!-- 新密码 -->
								<el-input type="password" v-model="addForm.userN"></el-input><!-- 新密码 -->
							</el-form-item>
					</el-col>	
				
					<el-col :span="24">
							<el-form-item :label="$t('header.surePassword')"   prop="confirm">   <!-- 确认密码 -->
								<el-input type="password" v-model="addForm.confirm" :disabled="addForm.flag"></el-input><!-- 确认密码 -->
							</el-form-item>
					</el-col>		

				</el-row> 
			</el-form>
			<div slot="footer" class="dialog-footer">
			<!-- <el-button @click="cancel('addForm')">取 消</el-button> -->
			<el-button type="primary" @click="sure('addForm')">{{$t('OK')}}</el-button><!-- 确 定 -->
			</div>
		</el-dialog>
		<!-- 重置密码 -->
		<el-dialog :title="$t('login.reset_Password')" :visible.sync="dialogVisible2" :before-close="cancel2" :close-on-click-modal="false" width="700px"> <!-- title 重置密码-->
			<el-form :model="resetForm"  ref="resetForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small" :inline="false">
				<el-row class="edit_module_search">
					<el-col :span="24">
							<el-form-item :label="$t('header.userName')" prop="loginId"> <!-- 用户名 -->
								<el-input v-model="resetForm.loginId" @input="getresetInfo"></el-input><!-- 用户名 -->
							</el-form-item>
					</el-col>
					<el-col :span="24">
							<el-form-item :label="$t('login.real_name')" prop="userName"><!-- 用户姓名 -->
								<el-input v-model="resetForm.userName" disabled></el-input ><!-- 用户姓名 -->
							</el-form-item>
					</el-col>	

					<el-col :span="24">
							<el-form-item :label="$t('login.Affiliation_name')" prop="branchName">   <!-- 所属机构名称 -->
								<el-input v-model="resetForm.branchName" disabled></el-input><!-- 所属机构名称 -->
							</el-form-item>
					</el-col>	
				
				</el-row> 
			</el-form>
			<div slot="footer" class="dialog-footer">
			<!-- <el-button @click="cancel('addForm')">取 消</el-button> -->
			<el-button type="primary" @click="resetPass('resetForm')">{{$t('login.reset_Password')}}</el-button><!-- 确 定 -->
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { debug, debuglog } from 'util';
export default{
	data(){
		var validatePass = (rule, value, callback) => {
			let patter =  new RegExp(this.reg);
			if (value == this.addForm.userP) {
				callback(new Error(i18n.t('header.noSame')));//新密码不能与原密码相同！
			}if(!patter.test(value)) {
				callback(new Error(this.message));
			} else{
				callback();
			}
		};
		var validatePass1 = (rule, value, callback) => {
			if (value == '') {
			callback(new Error(i18n.t('header.sureNewPassword')));//请输入确认密码！
			} else if (value != this.addForm.userN) {
			callback(new Error(i18n.t('header.noSamePassword')));//两次输入密码不一致!
			} else {
			callback();
			}
		};
		
		return{
			nav:[
				{id:1,title:i18n.t('header.workbench'),icon:'icon-home',path:'/MainIndex', isShow: false},//工作台
				{id:2,title:i18n.t('header.productCenter'),icon:'icon-chanpin',path:'/MainIndex', isShow: false},//产品中心
				{id:3,title:i18n.t('header.organizational'),icon:'icon-zuzhijigou',path:'/MainIndex',isShow: false},//组织机构管理
				{id:4,title:i18n.t('header.postLoan'),icon:'icon-quanxian--xiantiao',path:'/MainIndex', isShow: false},//贷后管理
				{id:5,title:i18n.t('header.reportForm'),icon:'icon-baobiao',path:'/MainIndex', isShow: false},//报表管理
				{id:6,title:i18n.t('header.system'),icon:'icon-yanjizhushou-shangchuan_xitong',path:'/MainIndex', isShow: false},//系统管理
				{id:7,title:"卡片管理",icon:'icon-yanjizhushou-shangchuan_xitong',path:'/MainIndex', isShow: false},//卡片管理
				{id:8,title:"额度管理",icon:'icon-yanjizhushou-shangchuan_xitong',path:'/MainIndex', isShow: false},//额度管理
				{id:9,title:"绩效管理",icon:'icon-yanjizhushou-shangchuan_xitong',path:'/MainIndex', isShow: false},//绩效管理
				{id:10,title:"预警管理",icon:'icon-yanjizhushou-shangchuan_xitong',path:'/MainIndex', isShow: false},//预警管理
				{id:11,title:"渠道管理",icon:'icon-yanjizhushou-shangchuan_xitong',path:'/MainIndex', isShow: false},//预警管理
			],
			lang: 'zh',
			loginMsg:this.$store.state.loginData,
			dialogVisible: false,
			dialogVisible2: false,
			addForm: {},
			resetForm: {
				loginId: '',
				userName: '',
				branchName: ''
			},
			reg:'',
			errmsg:'',
			rules: {
				userP: [
					{ required: true, message: i18n.t('header.enterOld'),trigger: 'blur'},//请输入原密码
				],
				userN: [
					{ required: true, message: i18n.t('header.enterNew'),trigger: 'blur'},//请输入新密码
					{ validator: validatePass ,trigger: 'blur'},
				],
				confirm: [
					{ required: true, message: i18n.t('header.enterSure'),trigger: 'blur'},//请输入确认密码
					{ validator: validatePass1 ,trigger: 'blur'}
				],
				loginId: [
					{ required: true, message: i18n.t('login.Username_can_not_be_empty'),trigger: 'blur'},//用户名不能为空
				]
			}
		}
	},
	watch: {
		'resetForm.loginId' (n) {
			if (!n) {
				if (this.$refs['resetForm']!==undefined) {
					this.$refs['resetForm'].resetFields();
				}
			}
		}
	},
	mounted(){
		let self = this
		self.lang = window.localStorage.getItem('localeLanguage')
		self.passOverDue();
		self.initFirstMenu();
	},
	methods:{
		// 初始化一级菜单
		initFirstMenu () {
			let self = this
			self.$store.state.loginData.beMenuList.map(item => {
				if (item.name == '工作台') {// workbench
					self.nav[0].isShow = false
				} else if (item.name == '产品中心') {//产品中心 productCenter
					self.nav[1].isShow = true
				} else if (item.name == '组织机构管理') {//组织机构管理 organizational
					self.nav[2].isShow = true
				} else if (item.name == '贷后管理') {//贷后管理 postLoan
					self.nav[3].isShow = true
				} else if (item.name == '报表管理') {//报表管理 reportForm
					self.nav[4].isShow = true
				} else if (item.name == '系统管理') {//系统管理 system
					self.nav[5].isShow = true
				}else if (item.name == '卡片管理'){ //卡片管理 card
					self.nav[6].isShow =true
				}else if (item.name == '额度管理'){  //额度管理  quota
					self.nav[7].isShow = true
				}else if (item.name == '绩效管理'){//绩效管理 achievements
					self.nav[8].isShow = true
				}else if (item.name == '预警管理'){//预警管理
					self.nav[9].isShow = true
				}else if(item.name == '渠道管理'){//渠道管理
					self.nav[10].isShow = true 
				}
			})
		},
		// 密码过期和首次登陆判断
		passOverDue () {
			let self = this
			console.log(self.$store.state.loginData.userLogin.updatePwdOrNot  )
			if (self.$store.state.loginData.userLogin.updatePwdOrNot == '1') {
				var str = `
					<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${i18n.t('header.firstEdit')}</span></p>
				`
				//首次登陆，请修改密码！
				self.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true,
					showClose: false,
					callback: action => {
						self.addForm.loginId = self.$store.state.loginData.userLogin.loginId;
						self.addForm.legalPersonNum = self.$store.state.loginData.userLogin.legalPersonNum;
						self.dialogVisible = true;
						this.initRules();
					}
				});
			} else if (self.$store.state.loginData.userLogin.updatePwdOrNot == '0'){
				var str = `
					<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${i18n.t('header.lastEdit')}</span></p>
				`
				//密码到期，请修改密码！
				self.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true,
					showClose: false,
					callback: action => {
						self.addForm.loginId = self.$store.state.loginData.userLogin.loginId;
						self.addForm.legalPersonNum = self.$store.state.loginData.userLogin.legalPersonNum;
						self.dialogVisible = true;
						this.initRules();
					}
				});
			}
		},
		// 根据用户名获取用户信息
		getresetInfo () {
			let _this = this
			if (!_this.resetForm.loginId) {
				return
			}
			_this.$post(_this.$api + '/user/selectByLoginId',{loginId: _this.resetForm.loginId}).then(function(res){
				if(res.returnCode == '000000'){
					_this.resetForm.userName = res.returnData.userName
					_this.resetForm.branchName = res.returnData.branchName
				} else {
					_this.resetForm.userName = ''
					_this.resetForm.branchName = ''
				}
			})
		},
		// 重置密码
		resetPass(formName){
			var _this =this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					 _this.$confirm(i18n.t('login.Determine_the_reset_password'), i18n.t('Prompt'), {
						confirmButtonText: i18n.t('OK'),
						cancelButtonText: i18n.t('Cancel'),
						type: 'warning'
					}).then(() => {
						_this.$post(_this.$api + '/user/resetPassword',{loginId: _this.resetForm.loginId}).then(function(res){
							if(res.returnCode == '000000'){
								_this.$alert(i18n.t('login.Reset_password_successfully'), i18n.t('Prompt'), {
									dangerouslyUseHTMLString: true
								});
								_this.cancel2()
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
				} else {
					return false;
				}
			});	
		},
		//登出
		outLogin(){
			this.$store.commit('removeToken')
			window.sessionStorage.removeItem("store")
			this.$store.commit('saveLoginData', {});
			this.$router.push('/login');
		},
		// 打开重置密码弹框
		openDialog2 () {
			this.dialogVisible2 = true
		},
		// 打开修改密码弹框
		openDialog () {
			this.dialogVisible = true
			this.addForm.loginId = this.$store.state.loginData.userLogin.loginId;
			this.addForm.legalPersonNum = this.$store.state.loginData.userLogin.legalPersonNum;
			this.initRules();
		},
		// 密码规则自定义
		initRules(){
			this.$post(this.$api + '/passwordRule/obtainReg').then(res=>{
				if(res.returnCode=="000000"){
					this.reg = res.returnData.reg ;
					this.message = res.returnData.message;
				}
			})
		},
		// 修改密码确认
		sure(formName) {
			let self = this
			self.$refs[formName].validate((valid) => {
				if (valid) {
					self.$post(self.$api + '/user/updatePwd',self.addForm).then(res =>{
						if(res.returnCode == '66010327'){
							self.$alert(i18n.t('header.editSuccess'));//修改成功！
							self.dialogVisible = false
							let s = this.$store.state.loginData
							s.userLogin.updatePwdOrNot = ''
							// self.$store.replaceState(Object.assign({}, self.$store.state,s))
							this.$store.commit('saveLoginData',s);
							if (self.$refs['addForm']!==undefined) {
								self.$refs['addForm'].resetFields();
							}
						} else {
							var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
		// 修改密码取消
		cancel(formName) {
			this.dialogVisible = false
			if (this.$refs['addForm']!==undefined) {
				this.$refs['addForm'].resetFields();
			}
			this.errmsg = ''
		},
		// 重置密码取消
		cancel2() {
			this.dialogVisible2 = false
			if (this.$refs['resetForm']!==undefined) {
				this.$refs['resetForm'].resetFields();
			}
		}
	}
}
</script>

<style lang='scss'>
// .userN .el-form-item__label::before{
// 	content: '*';
//     color: #F56C6C;
//     margin-right: 4px;
// }
</style>

<style scoped lang='scss'>

.header{width:100%; box-sizing:border-box; padding:0 0 0 5px; height:95px; background:#fff; position:fixed;left:0; top:0; 
	@include shadow(0,0,10px,#ccc);
	z-index:999;
}
.h_left{align-content: center; position:relative;height: 100%;}
.h_left img{ width:85%; margin:auto 0; position: absolute; left:0; top:0; right:0; bottom:0;}
.h_center ul{
	// margin-top: 10px;
	margin-top:20px;
	text-align: center;
}
.h_center ul li{
	// width: 110px;
	width:95px;
	display: inline-block;
    margin-right: 2px;
}
.h_center ul li a.current{
    background-color: $deep-color;
    color: #fff;
}
.h_center ul li a{
    -webkit-border-radius: 5px 5px 0 0;
    -moz-border-radius: 5px 5px 0 0;
	border-radius: 5px 5px 0 0;
    background-color: #efefef;
    text-align: center;
    display: block;
    padding: 10px 0 6px;
    text-transform: uppercase;
    color: #666666;
	font-size: 14px;
	// height: 70px;
	height:60px;
	overflow: hidden;
	&:hover{
		 background-color: $deep-color;
		 color: #fff;
	}
}
.h_center ul li a i{
    display: block;
    font-size: 22px;
}

.h_right{
	text-align: center;
	/*line-height:90px;*/ 
	line-height:30px;
	
	.rbtn{
		display: inline-block;
		text-align: right;
		overflow: hidden;
	}
	.welcom{
		display: block;
		width:100%;
		text-align: center;
		box-sizing: border-box;
		padding:15px 10px 0;
	}
	div.first{
		/*padding-top:30px;*/
		p{
			font-size:14px;
			span{
				margin-left:5px;
				color:$deep-color;	
			}
		}
		
	}
	.el-button.en{
		border:0; color:$deep-color;font-size: 12px;
	}
	.el-button{border:0; color:$deep-color}
	.el-dialog{
		width: 400px !important;
	}
	a{
		color:$deep-color;	
		cursor: pointer;
		font-size:14px;
	}
}
</style>
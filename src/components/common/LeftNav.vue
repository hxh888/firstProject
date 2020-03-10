<template>
	<div class="left_nav" >
			<!-- 工作台 -->
			<div  v-if="this.$route.query.id==1">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router
						>
						<el-menu-item  v-for="(item,index) in workBench" 
													:key="index"
													:index="item.path + '?id=' + $route.query.id"
													v-show="item.isShow"
													:class="{'is-active': item.path == $route.path}"
													>
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
						</el-menu-item>
				</el-menu>
			</div>
			<!-- 产品中心 -->
			<div  v-if="this.$route.query.id==2">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router
						>
						<el-menu-item  v-for="(item,index) in product" 
													:key="index"
													:index="item.path + '?id=' + $route.query.id"
													v-show="item.isShow"
													:class="{'is-active': item.path == $route.path}"
													>
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
						</el-menu-item>
				</el-menu>
			</div>
			<!-- 组织机构管理 -->
			<div  v-if="this.$route.query.id==3">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router
						>
						<el-menu-item  v-for="(item,index) in jurisdiction" 
													:key="index"
													:index="item.path + '?id=' + $route.query.id"
													v-show="item.isShow"
													:class="{'is-active': item.path == $route.path}"
													>
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
						</el-menu-item>
				</el-menu>
			</div>
			<!--贷后管理-->
			<div v-if="this.$route.query.id==4">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router
						>
						<el-menu-item  v-for="(item,index) in postLoan" 
													:key="index"
													:index="item.path + '?id=' + $route.query.id"
													v-show="item.isShow"
													:class="{'is-active': item.path == $route.path}"
													>
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
						</el-menu-item>
				</el-menu>
			</div>
			
			<!--报表管理-->
			<div v-if="this.$route.query.id==5">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router
						>
						<el-menu-item  v-for="(item,index) in journaling" 
													:key="index"
													:index="item.path + '?id=' + $route.query.id"
													v-show="item.isShow"
													:class="{'is-active': item.path == $route.path}"
													>
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
						</el-menu-item>
				</el-menu>
			</div>
			<!--系统管理-->
			<div v-if="this.$route.query.id==6">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router
						>
						<el-menu-item  v-for="(item,index) in system" 
													:key="index"
													:index="item.path + '?id=' + $route.query.id"
													v-show="item.isShow"
													:class="{'is-active': item.path == $route.path}"
													>
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
						</el-menu-item>
				</el-menu>
			</div>

			<!-- 卡片管理 -->
			<div v-if="this.$route.query.id==7">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router>
						<div v-for="(menu,index) in card"
									:key="index">
							<el-submenu  v-if="menu.twoLevel" :index="menu.id">
								<template slot="title">
									<span>{{menu.title}}</span>
								</template>
								<el-menu-item  v-for="(item,index) in menu.children" 
														:key="index"
														:index="item.path + '?id=' + $route.query.id"
														v-show="item.isShow"
														:class="{'is-active': item.path == $route.path}"
														>
									<i class="iconfont" :class="item.icon"></i>
									<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item 
													v-if="!menu.twoLevel"
													:index="menu.path + '?id=' + $route.query.id"
													v-show="menu.isShow"
													:class="{'is-active': menu.path == $route.path}"
													>
								<i class="iconfont" :class="menu.icon"></i>
								<span slot="title" :class="lang=='en'? 'en':''">{{menu.name}}</span>
							</el-menu-item>
						</div>
				</el-menu>
			</div>
			<!-- 额度管理 -->
			<div v-if="this.$route.query.id==8">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router>
						<div v-for="(menu,index) in quota"
									:key="index">
							<el-submenu  v-if="menu.twoLevel" :index="menu.id">
								<template slot="title">
									<span>{{menu.title}}</span>
								</template>
								<el-menu-item  v-for="(item,index) in menu.children" 
														:key="index"
														:index="item.path + '?id=' + $route.query.id"
														v-show="item.isShow"
														:class="{'is-active': item.path == $route.path}"
														>
									<i class="iconfont" :class="item.icon"></i>
									<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item 
													v-if="!menu.twoLevel"
													:index="menu.path + '?id=' + $route.query.id"
													v-show="menu.isShow"
													:class="{'is-active': menu.path == $route.path}"
													>
								<i class="iconfont" :class="menu.icon"></i>
								<span slot="title" :class="lang=='en'? 'en':''">{{menu.name}}</span>
							</el-menu-item>
						</div>
				</el-menu>
			</div>

			<!-- 绩效管理 -->
			<div v-if="this.$route.query.id==9">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router>
						<div v-for="(menu,index) in achievements"
									:key="index">
							<el-submenu  v-if="menu.twoLevel" :index="menu.id">
								<template slot="title">
									<span>{{menu.title}}</span>
								</template>
								<el-menu-item  v-for="(item,index) in menu.children" 
														:key="index"
														:index="item.path + '?id=' + $route.query.id"
														v-show="item.isShow"
														:class="{'is-active': item.path == $route.path}"
														>
									<i class="iconfont" :class="item.icon"></i>
									<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item 
													v-if="!menu.twoLevel"
													:index="menu.path + '?id=' + $route.query.id"
													v-show="menu.isShow"
													:class="{'is-active': menu.path == $route.path}"
													>
								<i class="iconfont" :class="menu.icon"></i>
								<span slot="title" :class="lang=='en'? 'en':''">{{menu.name}}</span>
							</el-menu-item>
						</div>
				</el-menu>
			</div>

			<!-- 预警管理 -->
			<div v-if="this.$route.query.id==10">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router>
						<div v-for="(menu,index) in earlyWarning"
									:key="index">
							<el-submenu  v-if="menu.twoLevel" :index="menu.id">
								<template slot="title">
									<span>{{menu.title}}</span>
								</template>
								<el-menu-item  v-for="(item,index) in menu.children" 
														:key="index"
														:index="item.path + '?id=' + $route.query.id"
														v-show="item.isShow"
														:class="{'is-active': item.path == $route.path}"
														>
									<i class="iconfont" :class="item.icon"></i>
									<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item 
													v-if="!menu.twoLevel"
													:index="menu.path + '?id=' + $route.query.id"
													v-show="menu.isShow"
													:class="{'is-active': menu.path == $route.path}"
													>
								<i class="iconfont" :class="menu.icon"></i>
								<span slot="title" :class="lang=='en'? 'en':''">{{menu.name}}</span>
							</el-menu-item>
						</div>
				</el-menu>
			</div>

			<!-- 渠道管理 -->
			<div v-if="this.$route.query.id==11">
				<el-menu
						:default-active="this.$route.fullPath"
						class="el-menu-vertical-demo"
						router>
						<div v-for="(menu,index) in channel"
									:key="index">
							<el-submenu  v-if="menu.twoLevel" :index="menu.id">
								<template slot="title">
									<span>{{menu.title}}</span>
								</template>
								<el-menu-item  v-for="(item,index) in menu.children" 
														:key="index"
														:index="item.path + '?id=' + $route.query.id"
														v-show="item.isShow"
														:class="{'is-active': item.path == $route.path}"
														>
									<i class="iconfont" :class="item.icon"></i>
									<span slot="title" :class="lang=='en'? 'en':''">{{item.name}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item 
													v-if="!menu.twoLevel"
													:index="menu.path + '?id=' + $route.query.id"
													v-show="menu.isShow"
													:class="{'is-active': menu.path == $route.path}"
													>
								<i class="iconfont" :class="menu.icon"></i>
								<span slot="title" :class="lang=='en'? 'en':''">{{menu.name}}</span>
							</el-menu-item>
						</div>
				</el-menu>
			</div>


	</div>
</template>

<script>
	export default {
    name:'LeftNav',
		data(){
			return{
				// 工作台
				workBench: [
					{id:'1',name:i18n.t('navigation.loanElimimate'),icon:'icongongzuotai1',path:'/MainIndex/loanElimimate', isShow: false}, // 消贷工作台
					{id:'2',name:i18n.t('navigation.creditCard'),icon:'icongongzuotai',path:'/MainIndex/creditCard', isShow: false}, // 信用卡工作台
					{id:'3',name:i18n.t('navigation.loanArtificialSent'),icon:'iconsend-s',path:'/MainIndex/loanArtificialSent', isShow: false}, // 消贷人工派件
					{id:'4',name:i18n.t('navigation.cardArtificialSent'),icon:'iconsend-line',path:'/MainIndex/cardArtificialSent', isShow: false}, // 信用卡人工派件
					// {id:'5',name:"首页待办任务",icon:'iconsend-line',path:'/MainIndex/homePage', isShow: true}, // 首页待办任务
				],
				//产品中心
				product:[
					{id:'1',name:i18n.t('navigation.contractTemplateManage'),icon:'icon-hetong',path:'/MainIndex/contractTemplateManage', isShow: false}, // 合同模板管理
					{id:'2',name:i18n.t('navigation.loanProductManage'),icon:'icon-xiaofeirenzheng',path:'/MainIndex/loanProductManage', isShow: false}, // 消贷产品管理
					{id:'3',name:i18n.t('navigation.cardProductManage'),icon:'icon-xinyongqia',path:'/MainIndex/cardProductManage', isShow: false}, // 信用卡产品管理
					{id:'4',name:i18n.t('navigation.whiteBlackManage'),icon:'icon-heibaipingheng',path:'/MainIndex/whiteBlackManage', isShow: false}, // 黑白名单管理
					{id:'5',name:i18n.t('navigation.parameterManage'),icon:'icon-canshupeizhi',path:'/MainIndex/parameterManage', isShow: false}, // 参数管理
					{id:'6',name:i18n.t('navigation.Card_face_management'),icon:'icon-gongzuotai',path:'/MainIndex/cardFaceManage', isShow: false}, // 卡面管理
					{id:'7',name:i18n.t('navigation.Benchmark_interest_rate_management'),icon:'icon-icon_jizhunlishuaiweihu',path:'/MainIndex/benchmarkInterestRate', isShow: false}, // 基准利率
					{id:'8',name:i18n.t('navigation.Repayment_management'),icon:'icon-iconfonthuankuankuai',path:'/MainIndex/paymentMethodManage', isShow: false}, // 还款方式管理
					{id:'9',name:"渠道统计",icon:'icon-qudaoguanli',path:'/MainIndex/channelManage', isShow: false}, // 渠道统计
					{id:'10',name:"产品管理",icon:'icon-chanpinguanli',path:'/MainIndex/productManage', isShow: false}, // 产品管理
					
				],
				//组织机构管理
				jurisdiction:[
					{id:'1',name:i18n.t('navigation.legalPerson'),icon:'icon-farenxinxi',path:'/MainIndex/legalPerson', isShow: false}, // 法人管理
					{id:'2',name:i18n.t('navigation.organization'),icon:'icon-mechanism',path:'/MainIndex/organization', isShow: false}, // 机构管理
					{id:'3',name:i18n.t('navigation.department'),icon:'icon-bumen',path:'/MainIndex/department', isShow: false}, // 部门管理
					{id:'4',name:i18n.t('navigation.user'),icon:'icon-yonghu',path:'/MainIndex/user', isShow: false}, // 用户管理
					{id:'5',name:i18n.t('navigation.role'),icon:'icon-jiaoseshezhi',path:'/MainIndex/role', isShow: false}, // 角色管理
					{id:'6',name:i18n.t('navigation.auth'),icon:'icon-quanxianxitong',path:'/MainIndex/auth', isShow: false}, // 权限管理
					{id:'7',name:i18n.t('navigation.menu'),icon:'icon-caidan1',path:'/MainIndex/menu', isShow: false}, // 菜单管理
					{id:'8',name:i18n.t('navigation.group'),icon:'icon-gangweiquanxian',path:'/MainIndex/group', isShow: false}, // 岗位管理
					{id:'9',name:i18n.t('navigation.mode'),icon:'icon-xitong',path:'/MainIndex/mode', isShow: false}, // 功能管理
					
				],

				//贷后管理
				postLoan: [
					{id:'1',name:i18n.t('navigation.fiveLevel'),icon:'icon-icon',path:'/MainIndex/fiveLevel', isShow: false}, // 五级分类管理
					{id:'2',name:i18n.t('navigation.fiveLevelRd'),icon:'icon-shebeiguanli',path:'/MainIndex/fiveLevelRd', isShow: false}, // 五级分类认定
					{id:'3',name:i18n.t('navigation.collection'),icon:'icon-yewubaobiao',path:'/MainIndex/collection', isShow: false}, // 贷款催收管理
					{id:'4',name:i18n.t('navigation.collectionDone'),icon:'icon-biaodanwancheng',path:'/MainIndex/collectionDone', isShow: false}, // 贷款催收登记已完成
					{id:'5',name:i18n.t('navigation.riskEarlyWarning'),icon:'icon-fengxianfenxi',path:'/MainIndex/riskEarlyWarning', isShow: false}, // 风险预警管理
				],
				//报表管理  20190613
				journaling:[
					{id:1,name:i18n.t('navigation.loanInputDetails'),icon:'icon-gongzuotai1',path:'/MainIndex/loanInputDetails',isShow: false}, // 消贷进件明细报表
					{id:2,name:i18n.t('navigation.loanChannelStatistics'),icon:'icon-gongzuotai',path:'/MainIndex/loanChannelStatistics',isShow: false}, // 消贷渠道统计报表
					{id:3,name:i18n.t('navigation.inputDetails'),icon:'icon-send-s',path:'/MainIndex/inputDetails',isShow: false}, // 信用卡进件明细报表
					{id:4,name:i18n.t('navigation.channelStatistics'),icon:'icon-send-line',path:'/MainIndex/channelStatistics',isShow: false}, // 信用卡渠道统计报表
				],
				//系统管理
				system: [
					{id:'1',name:i18n.t('navigation.statistics'),icon:'icon-yewu',path:'/MainIndex/statistics', isShow: false}, // 业务统计
					{id:'2',name:i18n.t('navigation.creditCardInquiry'),icon:'icon-xinyongqia',path:'/MainIndex/creditCardInquiry', isShow: false}, // 信用卡进件查询
					{id:'3',name:i18n.t('navigation.creditCancellationInquiry'),icon:'icon-xiaofeirenzheng',path:'/MainIndex/creditCancellationInquiry', isShow: false}, // 消贷进件查询
					{id:'4',name:i18n.t('navigation.passwordRules'),icon:'icon-mima',path:'/MainIndex/passwordRules', isShow: false}, // 密码规则管理
					{id:'5',name:i18n.t('navigation.billing'),icon:'icon-ico_kufangguanli_jizhangguanli',path:'/MainIndex/billing', isShow: false}, // 记账日期管理
					{id:'6',name:i18n.t('navigation.log'),icon:'icon-rizhi',path:'/MainIndex/log', isShow: false}, // 日志管理
					{id:'7',name:i18n.t('navigation.loanIncomeParts'),icon:'icon-gongzuotai1',path:'/MainIndex/loanIncomeParts', isShow: false}, // 消贷模拟进件
					{id:'8',name:i18n.t('navigation.cardIncomeParts'),icon:'icon-gongzuotai',path:'/MainIndex/cardIncomeParts', isShow: false}, // 信用卡模拟进件
					{id:'9',name:"个人客户管理",icon:'icon-rizhi',path:'/MainIndex/personalCustomer', isShow:false}, // 个人客户管理
					{id:'10',name:"客户授信额度管理",icon:'icon-rizhi',path:'/MainIndex/customerQuota', isShow:false}, // 客户授信额度管理
					{id:'11',name:"接口日志查询",icon:'icon-rizhi',path:'/MainIndex/newLog', isShow: false}, // 接口日志查询
					{id:'12',name:"图形报表",icon:'icon-rizhi',path:'/MainIndex/echartsTable', isShow: true}, // 图形报表
					{id:'13',name:"加解密管理",icon:'icon-rizhi',path:'/MainIndex/encryptionDecryption',isShow:true}//加解密管理
				],

				//卡片管理
				card:[
					{id:'0',name:'证件到期提醒',icon:'icon-yewu',path:'/MainIndex/certificateExpiryReminder',twoLevel:false,isShow:true},
					{
						id:'1',title:'卡片资料修改',twoLevel:true,children:[
							{id:'1-1',name:"客服发起卡片资料修改",icon:'icon-yewu',path:'/MainIndex/customerServiceModification', isShow: true},
							{id:'1-2',name:"发起卡片资料修改",icon:'icon-yewu',path:'/MainIndex/modify', isShow: true},
						]
					},
					{
						id:'2',title:'卡片处置',twoLevel:true,children:[
							{id:'2-1',name:"单卡处置",icon:'icon-yewu',path:'/MainIndex/singleDisposal', isShow: true},
							{id:'2-2',name:"单卡关账停息",icon:'icon-yewu',path:'/MainIndex/singleCease', isShow: true},
							{id:'2-3',name:"批量关账停息",icon:'icon-yewu',path:'/MainIndex/batchCease', isShow: true},
							{id:'2-4',name:"批量功能取消",icon:'icon-yewu',path:'/MainIndex/batchCancel', isShow: true},
							{id:'2-5',name:"批量止付",icon:'icon-yewu',path:'/MainIndex/bulkStopPayment', isShow: true},
						]
					},
					{
						id:'3',title:'卡片恢复',twoLevel:true,children:[
							{id:'2-1',name:"单卡恢复",icon:'icon-yewu',path:'/MainIndex/singleRecovery', isShow: true},
							{id:'2-2',name:"批量功能恢复",icon:'icon-yewu',path:'/MainIndex/batchRecovery', isShow: true},
							{id:'2-3',name:"批量解止付",icon:'icon-yewu',path:'/MainIndex/bulkPayment', isShow: true},
						]
					}
				],
				//额度管理
				quota:[
					{
						id:'0',title:'调额',twoLevel:true,children:[
							{id:'0-1',name:"客户经理申请调额",icon:'icon-yewu',path:'/MainIndex/accountManagerAdjustment', isShow: true},
							{id:'0-2',name:"总行单笔调额",icon:'icon-yewu',path:'/MainIndex/headOffoceTone', isShow: true},
						]
					}
				],
				//绩效管理
				achievements:[
					{id:'0',name:'责任比拆分',icon:'icon-yewu',path:'/MainIndex/splitOfResponsibilityRatio',twoLevel:false,isShow:true},
					{id:'1',name:'责任人修改',icon:'icon-yewu',path:'/MainIndex/personLiableModify',twoLevel:false,isShow:true},
					{id:'2',name:'批量修改历史',icon:'icon-yewu',path:'/MainIndex/batchModifyHistory',twoLevel:false,isShow:true},
				],
				//预警管理
				earlyWarning:[
					{
						id:'0',title:'客户风险排查',twoLevel:true,children:[
							{id:'0-1',name:"线上导入客户",icon:'icon-yewu',path:'/MainIndex/importCustomersOnline',twoLevel:false,isShow:true},
							{id:'0-2',name:'文件导入客户',icon:'icon-yewu',path:'/MainIndex/fileImportCustomer',twoLevel:false,isShow:true},
							{id:'0-3',name:'加入预警客户',icon:'icon-yewu',path:'/MainIndex/joinAlertCustomer',twoLevel:false,isShow:true},
							{id:'0-4',name:'预警客户排查',icon:'icon-yewu',path:'/MainIndex/troubleshooting',twoLevel:false,isShow:true},
							{id:'0-5',name:'客户历史风险查询',icon:'icon-yewu',path:'/MainIndex/customerRiskHistoryQuery',twoLevel:false,isShow:true},
							{id:'0-6',name:'规则配置',icon:'icon-yewu',path:'/MainIndex/ruleConfiguration',twoLevel:false,isShow:true},
						]
					},
					{
						id:'1',title:'风险客户处置',twoLevel:true,children:[
							{id:'1-1',name:"线上导入风险客户",icon:'icon-yewu',path:'/MainIndex/importRiskCustomersOnline',twoLevel:false,isShow:true},
							{id:'1-2',name:"文件导入风险客户",icon:'icon-yewu',path:'/MainIndex/fileImportRiskCustomer',twoLevel:false,isShow:true},
							{id:'1-3',name:"总行贷中岗处置",icon:'icon-yewu',path:'/MainIndex/headOfficeLoanProcessingPost',twoLevel:false,isShow:true},
							{id:'1-4',name:"风险客户等级查询",icon:'icon-yewu',path:'/MainIndex/riskCustomerLevelQuery',twoLevel:false,isShow:true},
							{id:'1-5',name:"风险客户指标查询",icon:'icon-yewu',path:'/MainIndex/riskCustomerIndexQuery',twoLevel:false,isShow:true},
							{id:'1-6',name:"处置统计",icon:'icon-yewu',path:'/MainIndex/disposalStatistics',twoLevel:false,isShow:true},
						]
					}
				],

				//渠道管理
				channel:[
					{id:'0',name:'渠道列表',icon:'icon-yewu',path:'/MainIndex/channelList',twoLevel:false,isShow:true},
					{id:'1',name:'授权列表',icon:'icon-yewu',path:'/MainIndex/empower',twoLevel:false,isShow:true},
				],
				lang:'zh'
			}
		},
		watch:{
		},
		mounted(){
			this.lang = window.localStorage.getItem('localeLanguage')
			this.initLeftNav()
		},
		methods:{
			//初始化左侧菜单
			initLeftNav(){
				this.$store.state.loginData.beMenuList.map(item => {
					if (item.name == '法人管理') { // 法人管理
						this.jurisdiction[0].isShow = true
					} else if (item.name == '机构管理') { // 机构管理
						this.jurisdiction[1].isShow = true
					} else if (item.name == '部门管理') { // 部门管理
						this.jurisdiction[2].isShow = true
					} else if (item.name == '用户管理') { // 用户管理
						this.jurisdiction[3].isShow = true
					} else if (item.name == '角色管理') { // 角色管理
						this.jurisdiction[4].isShow = true
					} else if (item.name == '权限管理') { // 权限管理
						this.jurisdiction[5].isShow = true
					} else if (item.name == '菜单管理') { // 菜单管理
						this.jurisdiction[6].isShow = true
					} else if (item.name == '岗位管理') { // 岗位管理
						this.jurisdiction[7].isShow = true
					} else if (item.name == '功能管理') { // 功能管理
						this.jurisdiction[8].isShow = true
					}else if (item.name =='合同模板管理') { // 合同模板管理
						this.product[0].isShow = true
					} else if (item.name == '消贷产品管理') { // 消贷产品管理
						this.product[1].isShow = true
					} else if (item.name == '信用卡产品管理') { // 信用卡产品管理
						this.product[2].isShow = true
					} else if (item.name == '黑白名单管理') { // 黑白名单管理
						this.product[3].isShow = true
					} else if (item.name == '参数管理') { // 参数管理
						this.product[4].isShow = true
					}	else if (item.name == '卡面管理') { // 卡面管理
						this.product[5].isShow = true
					} else if (item.name == '基准利率管理') { // 基准利率管理
						this.product[6].isShow = true
					} else if (item.name == '还款方式管理') { // 还款方式管理
						this.product[7].isShow = true
					} else if (item.name == '渠道统计') { // 渠道统计
						this.product[8].isShow = true
					} else if (item.name == '产品管理') { // 产品管理
						this.product[9].isShow = true
					} else if (item.name == '消贷工作台') { // 消贷工作台
						this.workBench[0].isShow = true
					} else if (item.name == '信用卡工作台') { // 信用卡工作台
						this.workBench[1].isShow = true
					} else if (item.name == '消贷人工派件') { // 消贷人工派件
						this.workBench[2].isShow = true
					} else if (item.name == '信用卡人工派件') { // 信用卡人工派件
						this.workBench[3].isShow = true
					} else if (item.name == '业务统计') { // 业务统计
						this.system[0].isShow = true
					} else if (item.name == '信用卡进件查询') { // 信用卡进件查询
						this.system[1].isShow = true
					} else if (item.name == '消贷进件查询') { // 消贷进件查询
						this.system[2].isShow = true
					} else if (item.name == '密码规则管理') { // 密码规则管理
						this.system[3].isShow = true
					} else if (item.name =='记账日期管理') { // 记账日期管理
						this.system[4].isShow = true
					} else if (item.name == '日志管理') { // 日志管理
						this.system[5].isShow = true
					} else if (item.name =='消贷模拟进件') { // 消贷模拟进件
						this.system[6].isShow = true
					} else if (item.name == '信用卡模拟进件') { // 信用卡模拟进件
						this.system[7].isShow = true
					} else if (item.name == '个人客户管理') { // 个人客户管理
						this.system[8].isShow = true
					} else if (item.name == '客户授信额度管理') { // 客户授信额度管理
						this.system[9].isShow = true
					} else if (item.name == '接口日志查询') { // 接口日志查询
						this.system[10].isShow = true
					}else if(item.name =='图形报表'){ //图形报表
						this.postLoan[11].isShow = true
					}else if(item.name =='加解密管理'){ //加解密管理
						this.postLoan[12].isShow = true
					}	else if (item.name == '消贷进件明细报表') { // 消贷进件明细报表
						this.journaling[0].isShow = true
					} else if (item.name == '消贷渠道统计报表') { // 消贷渠道统计报表
						this.journaling[1].isShow = true
					} else if (item.name == '信用卡进件明细报表') { // 信用卡进件明细报表
						this.journaling[2].isShow = true
					} else if (item.name == '信用卡渠道统计报表') { // 信用卡渠道统计报表
						this.journaling[3].isShow = true
					}	else if (item.name == '五级分类管理') { // 五级分类管理
						this.postLoan[0].isShow = true
					} else if (item.name == '五级分类认定') { // 五级分类认定
						this.postLoan[1].isShow = true
					} else if (item.name == '贷款催收管理') { // 贷款催收管理
						this.postLoan[2].isShow = true
					} else if (item.name == '贷款催收登记已完成查询') { // 贷款催收登记已完成查询
						this.postLoan[3].isShow = true
					} else if (item.name == '风险预警管理') { // 风险预警管理
						this.postLoan[4].isShow = true
					} else if (item.name == '卡面管理'){
						this.card[0].isShow = true
					}else if (item.name == '客服发起卡片资料修改'){
						this.card[1][0].isShow = true
					}else if (item.name == '发起卡片资料修改'){
						this.card[1][1].isShow = true
					}else if (item.name == '单卡处置'){
						this.card[2][0].isShow = true
					}else if(item.name == '单卡关账停息'){
						this.card[2][1].isShow = true
					}else if(item.name == '批量关账停息'){
						this.card[2][2].isShow = true
					}else if(item.name == '批量功能取消'){
						this.card[2][3].isShow = true
					}else if(item.name == '批量止付'){
						this.card[2][4].isShow = true
					}else if(item.name == '单卡恢复'){
						this.card[3][0].isShow = true
					}else if(item.name == '批量功能恢复'){
						this.card[3][1].isShow = true
					}else if(item.name == '批量解止付'){
						this.card[3][2].isShow = true
					}else if(item.name == '客户经理申请调额'){
						this.quota[0][0].isShow = true
					}else if(item.name == '总行单笔调额'){
						this.quota[0][1].isShow = true
					}else if(item.name == '责任比拆分'){
						this.achievements[0].isShow = true
					}else if(item.name == '责任人修改'){
						this.achievements[1].isShow = true
					}else if(item.name == '批量修改历史'){
						this.achievements[1].isShow = true
					}
				})
			},

		}
	}
</script>

<style scoped="scoped" lang="scss">
.el-menu{
   border-right: none;
   .el-submenu__title{background: orange;}
} 
.el-menu-item {
	// border-bottom:1px solid rgba(0,0,0,.05);
	white-space:inherit;
	padding:0;
	.en {
		line-height:20px;
		width:175px;
		display:inline-block;
		font-size:13px;
	}
}
.iconfont{
	font-size: 20px;
	margin-right: 10px
}


</style>
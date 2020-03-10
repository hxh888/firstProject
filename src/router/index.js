import Vue from 'vue'
import Router from 'vue-router'
// import i18n from 'vue-i18n';

Vue.use(Router);

const router = new Router({
    routes: [{ 
        path: '/',
        redirect: '/MainIndex'
    },
    { //登录
      path: '/login',
      component: resolve => require(['@/components/user/Login'], resolve)
    },
    {  //home
        path: '/MainIndex',
        component: resolve => require(['@/components/common/MainIndex'], resolve),
        children:[{
              path: '', //欢迎
              component: resolve => require(['@/components/welcome'], resolve),
              meta: {
                title: i18n.t('navigation.welcome'),
              }
            }, {
              path: 'loanElimimate', //消贷工作台
              component: resolve => require(['@/components/workBench/loanElimination'], resolve),
              meta: {
                title: i18n.t('navigation.loanElimimate'),
                keepAlive: true,
                name: 'LoanElimination'
              }
            },{
              path: 'creditCard', //信用卡工作台
              component: resolve => require(['@/components/workBench/creditCard'], resolve),
              meta: {
                title: i18n.t('navigation.creditCard'),
                keepAlive:true,
                name:'CreditCard'
              }
            },{
              path: 'loanArtificialSent', //消贷人工派件
              component: resolve => require(['@/components/workBench/loanArtificialSent'], resolve),
              meta: {
                title: i18n.t('navigation.loanArtificialSent'),
                keepAlive:true,
                name:'LoanArtificialSent'
              }
            }, {
              path: 'cardArtificialSent', //信用卡人工派件
              component: resolve => require(['@/components/workBench/CardArtificialSent'], resolve),
              meta: {
                title: i18n.t('navigation.cardArtificialSent'),
                keepAlive:true,
                name:'CardArtificialSent'
              }
            },
            {
              path: 'loanDealTask', //消贷人工审批
              component: resolve => require(['@/components/workBench/loanElimination/LoanDealTask'], resolve),
              meta: {
                title: i18n.t('navigation.loanDealTask'),
                keepAlive: true,
                name:'LoanDealTask'
              }
            },
            {
              path: 'loanReviewTask', //消贷人工复核
              component: resolve => require(['@/components/workBench/loanElimination/LoanReviewTask'], resolve),
              meta: {
                title: i18n.t('navigation.loanReviewTask'),
                keepAlive:true,
                name:'LoanReviewTask'
              }
            },
            {
              path: 'loanTaskDetail', //消贷查看详情
              component: resolve => require(['@/components/workBench/loanElimination/LoanTaskDetail'], resolve),
              meta: {
                title: i18n.t('navigation.loanTaskDetail'),
                keepAlive:true,
                name:'LoanTaskDetail'
              }
            },{
              path: 'toDoTasks', //信用卡人工审批
              component: resolve => require(['@/components/workBench/creditCard/ToDoTasks'], resolve),
              meta: {
                title: i18n.t('navigation.toDoTasks'),
                keepAlive:true,
                name:'ToDoTasks'
              }
            },
            {
              path: 'artificialReview', //信用卡人工复核
              component: resolve => require(['@/components/workBench/creditCard/ArtificialReview'], resolve),
              meta: {
                title: i18n.t('navigation.artificialReview'),
                keepAlive:true,
                name:'ArtificialReview'
              }
            },
            {
              path: 'detailsOfApprovalHistory', //信用卡查看详情
              component: resolve => require(['@/components/workBench/creditCard/DetailsOfApprovalHistory'], resolve),
              meta: {
                title: i18n.t('navigation.detailsOfApprovalHistory'),
                keepAlive:true,
                name:'DetailsOfApprovalHistory'
              }
            },
            {
              path: 'fiveLevel',  //五级分类
              component: resolve => require(['@/components/loanElimination/fiveLevel/fiveLevel'], resolve),
              meta: {
                title: i18n.t('navigation.fiveLevel'),
                keepAlive:true,
                name:'FiveLevel'
              }
            },
            {
              path: 'fiveLevelRd',  //五级分类认定
              component: resolve => require(['@/components/loanElimination/fiveLevel/fiveLevelRd'], resolve),
              meta: {
                title:i18n.t('navigation.fiveLevelRd'),
                keepAlive:true,
                name:'FiveLevelRd'
              }
            },
            {
              path: 'collection',  //催收登记
              component: resolve => require(['@/components/loanElimination/collection/collection'], resolve),
              meta: {
                title: i18n.t('navigation.collection'),
                keepAlive:true,
                name:'Collection'
              }
            },
            {
              path: 'collectionDone',  //催收登记
              component: resolve => require(['@/components/loanElimination/collection/collectionDone'], resolve),
              meta: {
                title: i18n.t('navigation.collectionDone'),
                keepAlive:true,
                name:'CollectionDone'
              }
            },
            {
              path: 'riskEarlyWarning',  //风险预警管理
              component: resolve => require(['@/components/loanElimination/riskEarlyWarning'], resolve),
              meta: {
                title: i18n.t('navigation.riskEarlyWarning'),
                keepAlive:true,
                name:'RiskEarlyWarning'
              }
            },
            {
              path: 'creditCardInquiry',  //风险预警管理
              component: resolve => require(['@/components/queryStatistics/creditCardInquiry'], resolve),
              meta: {
                title: i18n.t('navigation.creditCardInquiry'),
                keepAlive:true,
                name:'CreditCardInquiry'
              }
            },
            {
              path: 'creditCancellationInquiry',  //消贷业务查询
              component: resolve => require(['@/components/queryStatistics/creditCancellationInquiry'], resolve),
              meta: {
                title: i18n.t('navigation.creditCancellationInquiry'),
                keepAlive:true,
                name:'CreditCancellationInquiry'
              }
            },
            {
              path: 'creditCard', //消贷人工审批
              component: resolve => require(['@/components/workBench/creditCard'], resolve),
              meta: {
                title: i18n.t('navigation.creditCard'),
                keepAlive:true,
                name:'CreditCard'
              }
            },{
              path: 'contractTemplateManage', //产品中心 - 合同模板管理
              component: resolve => require(['@/components/product/ContractTemplateManage'], resolve),
              meta: {
                title: i18n.t('navigation.contractTemplateManage'),
                keepAlive:true,
                name:'ContractTemplateManage'
              }
            },{
              path: 'loanProductManage', //产品中心 - 消贷产品管理
              component: resolve => require(['@/components/product/LoanProductManage'], resolve),
              meta: {
                title: i18n.t('navigation.loanProductManage'),
                keepAlive:true,
                name:'LoanProductManage'
              }
            },{
              path: 'cardProductManage', //产品中心 - 信用卡产品管理
              component: resolve => require(['@/components/product/CardProductManage'], resolve),
              meta: {
                title: i18n.t('navigation.cardProductManage'),
                keepAlive:true,
                name:'CardProductManage'
              }
            },{
              path: 'whiteBlackManage', //产品中心 - 黑白名单管理
              component: resolve => require(['@/components/product/WhiteBlackManage'], resolve),
              meta: {
                title: i18n.t('navigation.whiteBlackManage'),
                keepAlive:true,
                name:'WhiteBlackManage'
              }
            },{
              path: 'parameterManage', //产品中心 - 参数管理
              component: resolve => require(['@/components/product/ParameterManage'], resolve),
              meta: {
                title: i18n.t('navigation.parameterManage'),
                keepAlive:true,
                name:'ParameterManage'
              }
            },{
              path: 'cardFaceManage', //产品中心 - 卡面管理
              component: resolve => require(['@/components/product/CardFaceManage'], resolve),
              meta: {
                title: i18n.t('navigation.Card_face_management'),
                keepAlive:true,
                name:'CardFaceManage'
              }
            },{
              path: 'channelManage', //产品中心 - 卡面管理
              component: resolve => require(['@/components/product/ChannelManage'], resolve),
              meta: {
                title: "渠道统计",
                keepAlive:true,
                name:'ChannelManage'
              }
            },{
              path: 'benchmarkInterestRate', //产品中心 - 基准利率
              component: resolve => require(['@/components/product/BenchmarkInterestRate'], resolve),
              meta: {
                title: i18n.t('navigation.Benchmark_interest_rate_management'),
                keepAlive:true,
                name:'BenchmarkInterestRate'
              }
            },{
              path: 'paymentMethodManage', //产品中心 - 还款方式管理
              component: resolve => require(['@/components/product/PaymentMethodManage'], resolve),
              meta: {
                title: i18n.t('navigation.Repayment_management'),
                keepAlive:true,
                name:'PaymentMethodManage'
              }
            },{
              path: 'productManage', //产品中心 - 产品管理
              component: resolve => require(['@/components/product/ProductManage'], resolve),
              meta: {
                title: "产品管理",
                keepAlive:true,
                name:'ProductManage'
              }
            },{
              path: 'legalPerson', //组织机构管理 - 法人管理
              component: resolve => require(['@/components/jurisdiction/LegalPerson'], resolve),
              meta: {
                title:i18n.t('navigation.legalPerson'),
                keepAlive:true,
                name:'LegalPerson'
              }
            },{
              path: 'organization', //组织机构管理 - 机构管理
              component: resolve => require(['@/components/jurisdiction/Organization'], resolve),
              meta: {
                title: i18n.t('navigation.organization'),
                keepAlive:true,
                name:"Organization"
              }
            },{
              path: 'department',   //组织机构管理 - 部门管理
              component: resolve => require(['@/components/jurisdiction/Department'], resolve),
              meta: {
                title: i18n.t('navigation.department'),
                keepAlive:true,
                name:'Department'
              }
            },{
              path: 'user',   //组织机构管理 - 用户管理
              component: resolve => require(['@/components/jurisdiction/User'], resolve),
              meta: {
                title: i18n.t('navigation.user'),
                keepAlive: true,
                name: 'User'
              }
            },{
              path: 'role',   //组织机构管理 - 角色管理
              component: resolve => require(['@/components/jurisdiction/Role'], resolve),
              meta: {
                title: i18n.t('navigation.role'),
                keepAlive: true,
                name: 'Role'
              }
            },{
              path: 'auth',   //组织机构管理 - 权限管理
              component: resolve => require(['@/components/jurisdiction/Auth'], resolve),
              meta: {
                title: i18n.t('navigation.auth'),
                keepAlive:true,
                name:"Auth"
              }
            },{
              path: 'group',   // 组织机构管理 - 岗位管理
              component: resolve => require(['@/components/jurisdiction/Group'], resolve),
              meta: {
                title: i18n.t('navigation.group'),
                keepAlive:true,
                name:'Group'
              }
            },{
              path: 'menu',   // 组织机构管理 -  菜单管理
              component: resolve => require(['@/components/jurisdiction/Menu'], resolve),
              meta: {
                title: i18n.t('navigation.menu'),
                keepAlive:true,
                name:'Menu'
              }
            },{
              path: 'mode',   // 组织机构管理 -  功能管理
              component: resolve => require(['@/components/jurisdiction/Mode'], resolve),
              meta: {
                title: i18n.t('navigation.mode'),
                keepAlive:true,
                name:'Mode'
              }
            },{
              path: 'passwordRules',   // 组织机构管理 -  密码规则自定义
              component: resolve => require(['@/components/system/PasswordRules'], resolve),
              meta: {
                title: i18n.t('navigation.passwordRules'),
                keepAlive:true,
                name:'PasswordRules'
              }
            },{
              path: 'loanInputDetails',  //报表管理 消费贷 --进件明细报表
              component: resolve => require(['@/components/journaling/ConsumptionLoan/LoanInputDetails'], resolve),
              meta: {
                title: i18n.t('navigation.loanInputDetails'),
                keepAlive:true,
                name:'LoanInputDetails'
              }
            },{
              path: 'loanChannelStatistics',  //报表管理 消费贷 --渠道统计报表
              component: resolve => require(['@/components/journaling/ConsumptionLoan/LoanChannelStatistics'], resolve),
              meta: {
                title: i18n.t('navigation.loanChannelStatistics'),
                keepAlive:true,
                name:'LoanChannelStatistics'
              }
            },{
              path: 'inputDetails',  //报表管理 信用卡 --进件明细报表
              component: resolve => require(['@/components/journaling/creditCard/inputDetails'], resolve),
              meta: {
                title: i18n.t('navigation.inputDetails'),
                keepAlive:true,
                name:'InputDetails'
              }
            },{
              path: 'channelStatistics',  //报表管理 信用卡 --渠道统计报表
              component: resolve => require(['@/components/journaling/creditCard/channelStatistics'], resolve),
              meta: {
                title: i18n.t('navigation.channelStatistics'),
                keepAlive:true,
                name:'ChannelStatistics'
              }
            },
            {
              path: 'loanIncomeParts',  //系统管理 消贷模拟进件
              component: resolve => require(['@/components/system/loanIncomeParts'], resolve),
              meta: {
                title: i18n.t('navigation.loanIncomeParts'),
                keepAlive:true,
                name:'LoanINcomeParts'
              }
            },{
              path: 'cardIncomeParts',  //系统管理 信用卡模拟进件
              component: resolve => require(['@/components/system/cardIncomeParts'], resolve),
              meta: {
                title: i18n.t('navigation.cardIncomeParts'),
                keepAlive:true,
                name:'CardIncomeParts'
              }
            },
            // ,{
            //   path: 'denialOfApproval',  //报表管理 信用卡--审批拒绝明细报表
            //   component: resolve => require(['@/components/journaling/creditCard/denialOfApproval'], resolve),
            //   meta: {
            //     title: '审批拒绝明细报表',
            //   }
            // },{
            //   path: 'approvalAndApproval',  //报表管理 信用卡 --审批通过明细报表
            //   component: resolve => require(['@/components/journaling/creditCard/approvalAndApproval'], resolve),
            //   meta: {
            //     title: '审批通过明细报表',
            //   }
            // },{
            //   path: 'signed',  //报表管理 信用卡 --已签约明细报表
            //   component: resolve => require(['@/components/journaling/creditCard/signed'], resolve),
            //   meta: {
            //     title: '已签约明细报表',
            //   }
            // },{
            //   path: 'refund',  //报表管理 信用卡 --退件明细报表
            //   component: resolve => require(['@/components/journaling/creditCard/refund'], resolve),
            //   meta: {
            //     title: '退件明细报表',
            //   }
            // },{
            //   path: 'channelStatistics',  //报表管理 信用卡 --渠道统计报表
            //   component: resolve => require(['@/components/journaling/creditCard/channelStatistics'], resolve),
            //   meta: {
            //     title: '信用卡渠道统计报表',
            //   }
            // },{
            //   path: 'capitalStatistics',  //报表管理 信用卡 --资金方统计报表
            //   component: resolve => require(['@/components/journaling/creditCard/capitalStatistics'], resolve),
            //   meta: {
            //     title: '资金方统计报表',
            //   }
            // },{
            //   path: 'denialOfApproval2',  //报表管理 消费贷 --审批拒绝明细报表
            //   component: resolve => require(['@/components/journaling/ConsumptionLoan/denialOfApproval'], resolve),
            //   meta: {
            //     title: '审批拒绝明细报表',
            //   }
            // },{
            //   path: 'approvalAndApproval2',  //报表管理 消费贷 --审批通过明细报表
            //   component: resolve => require(['@/components/journaling/ConsumptionLoan/approvalAndApproval'], resolve),
            //   meta: {
            //     title: '审批通过明细报表',
            //   }
            // }
            // ,{
            //   path: 'signed2',  //报表管理 消费贷 --已签约明细报表
            //   component: resolve => require(['@/components/journaling/ConsumptionLoan/signed'], resolve),
            //   meta: {
            //     title: '已签约明细报表',
            //   }
            // },{
            //   path: 'capitalStatistics2',  //报表管理 消费贷 --资金方统计报表
            //   component: resolve => require(['@/components/journaling/ConsumptionLoan/capitalStatistics'], resolve),
            //   meta: {
            //     title: '资金方统计报表',
            //   }
            // },{
            //   path: 'hairpin2',  //报表管理 消费贷 --资金方统计报表
            //   component: resolve => require(['@/components/journaling/ConsumptionLoan/hairpin'], resolve),
            //   meta: {
            //     title: '发卡明细报表',
            //   }
            // },
            {
              path: 'billing',  //报表管理 消费贷 --资金方统计报表
              component: resolve => require(['@/components/system/billing'], resolve),
              meta: {
                title: i18n.t('navigation.billing'),//'记账日期管理',
                keepAlive:true,
                name:'Billing'
              }
            },
            {
              path: 'log',  //系统管理 日志管理
              component: resolve => require(['@/components/system/log'], resolve),
              meta: {
                title: i18n.t('navigation.log'),//'日志管理',
                keepAlive:true,
                name:'Log'
              }
            },
            {
              path: 'newLog',  //系统管理 日志管理
              component: resolve => require(['@/components/system/NewLog'], resolve),
              meta: {
                title: "接口日志查询",//'日志管理',
                keepAlive:true,
                name:'NewLog'
              }
            },
            {
              path: 'personalCustomer',  //报表管理 消费贷 --资金方统计报表
              component: resolve => require(['@/components/system/PersonalCustomer'], resolve),
              meta: {
                title: '个人客户管理',//'个人客户管理',
                keepAlive:true,
                name:'PersonalCustomer'
              }
            },
            {
              path: 'customerAdd',  //报表管理 消费贷 --资金方统计报表
              component: resolve => require(['@/components/system/customer/CustomerAdd'], resolve),
              meta: {
                title: '个人客户管理新增',//'个人客户管理',
                keepAlive:true,
                name:'CustomerAdd'
              }
            },
            {
              path: 'customerQuota',  //报表管理 消费贷 --资金方统计报表
              component: resolve => require(['@/components/system/CustomerQuota'], resolve),
              meta: {
                title: '客户授信额度管理',//客户授信额度管理,
                keepAlive:true,
                name:'CustomerQuota'
              }
            },
            {
              path: 'statistics',  //报表管理 消费贷 --资金方统计报表
              component: resolve => require(['@/components/system/statistics'], resolve),
              meta: {
                title: i18n.t('navigation.statistics'),//'业务统计',
                keepAlive:true,
                name:'Statistics'
              }
            },
            {
              path: 'echartsTable',  //系统管理 图形报表
              component: resolve => require(['@/components/system/EchartsTable'], resolve),
              meta: {
                title: "接口日志查询",//'日志管理',
                keepAlive:true,
                name:'EchartsTable'
              }
            },
            {
              path:'encryptionDecryption',//加解密
              component:resolve => require(['@/components/system/EncryptionDecryption'],resolve),
              meta:{
                title:"加解密管理",
                keepAlive:true,
                name:'EncryptionDecryption'
              }
            },{
              path:'certificateExpiryReminder',//证件到期提醒
              component:resolve => require(['@/components/card/CertificateExpiryReminder'],resolve),
              meta:{
                title:"证件到期提醒",
                keepAlive:true,
                name:'CertificateExpiryReminder'
              }
            },{
              path:'customerServiceModification',//客服发起卡片资料修改
              component:resolve => require(['@/components/Card/cardModification/CustomerServiceModification'],resolve),
              meta:{
                title:"客服发起卡片资料修改",
                keepAlive:true,
                name:'CustomerServiceModification'
              }
            },{
              path:'modify',//发起卡片资料修改
              component:resolve => require(['@/components/card/cardModification/Modify'],resolve),
              meta:{
                title:"发起卡片资料修改",
                keepAlive:true,
                name:'Modify'
              }
            },{
              path:'singleDisposal',//单卡处置
              component:resolve => require(['@/components/card/cardDisposal/SingleDisposal'],resolve),
              meta:{
                title:"单卡处置",
                keepAlive:true,
                name:'SingleDisposal'
              }
            },{
              path:'singleCease',//单卡关账停息
              component:resolve => require(['@/components/card/cardDisposal/SingleCease'],resolve),
              meta:{
                title:"单卡处置",
                keepAlive:true,
                name:'SingleCease'
              }
            },{
              path:'batchCease',//批量关账停息
              component:resolve => require(['@/components/card/cardDisposal/BatchCease'],resolve),
              meta:{
                title:"批量关账停息",
                keepAlive:true,
                name:'BatchCease'
              }
            },{
              path:'batchCancel',//批量功能取消
              component:resolve => require(['@/components/card/cardDisposal/BatchCancel'],resolve),
              meta:{
                title:"批量功能取消",
                keepAlive:true,
                name:'BatchCancel'
              }
            },{
              path:'bulkStopPayment',//批量止付
              component:resolve => require(['@/components/card/cardDisposal/BulkStopPayment'],resolve),
              meta:{
                title:"批量止付",
                keepAlive:true,
                name:'BulkStopPayment'
              }
            },{
              path:'SingleRecovery',//单卡恢复
              component:resolve => require(['@/components/card/cardRecovery/SingleRecovery'],resolve),
              meta:{
                title:"单卡恢复",
                keepAlive:true,
                name:'SingleRecovery'
              }
            },{
              path:'batchRecovery',//批量功能恢复
              component:resolve => require(['@/components/card/cardRecovery/BatchRecovery'],resolve),
              meta:{
                title:"批量功能恢复",
                keepAlive:true,
                name:'BatchRecovery'
              }
            },{
              path:'bulkPayment',//批量解止付
              component:resolve => require(['@/components/card/cardRecovery/BulkPayment'],resolve),
              meta:{
                title:"批量功能恢复",
                keepAlive:true,
                name:'BulkPayment'
              }
            },{
              path:'accountManagerAdjustment',//客户经理调额申请
              component:resolve => require(['@/components/quota/adjustment/AccountManagerAdjustment'],resolve),
              meta:{
                title:"客户经理调额申请",
                keepAlive:true,
                name:'AccountManagerAdjustment'
              }
            },{
              path:'headOffoceTone',//总行单笔调额
              component:resolve => require(['@/components/quota/adjustment/HeadOffoceTone'],resolve),
              meta:{
                title:"总行单笔调额",
                keepAlive:true,
                name:'HeadOffoceTone'
              }
            },{
              path:'splitOfResponsibilityRatio',//责任比拆分
              component:resolve => require(['@/components/achievements/SplitOfResponsibilityRatio'],resolve),
              meta:{
                title:"责任比拆分",
                keepAlive:true,
                name:'SplitOfResponsibilityRatio'
              }
            },{
              path:'personLiableModify',//责任人修改
              component:resolve => require(['@/components/achievements/PersonLiableModify'],resolve),
              meta:{
                title:"责任人修改",
                keepAlive:true,
                name:'PersonLiableModify'
              }
            },{
              path:'batchModifyHistory',//批量审批历史
              component:resolve => require(['@/components/achievements/BatchModifyHistory'],resolve),
              meta:{
                title:"批量审批历史",
                keepAlive:true,
                name:'BatchModifyHistory'
              }
            },{
              path:'importCustomersOnline',//线上导入客户
              component:resolve => require(['@/components/earlyWarning/customerRiskInvestigation/ImportCustomersOnline'],resolve),
              meta:{
                title:"线上导入客户",
                keepAlive:true,
                name:'ImportCustomersOnline'
              }
            },{
              path:'fileImportCustomer',//文件导入客户
              component:resolve => require(['@/components/earlyWarning/customerRiskInvestigation/FileImportCustomer'],resolve),
              meta:{
                title:"文件导入客户",
                keepAlive:true,
                name:'FileImportCustomer'
              }
            },{
              path:'joinAlertCustomer',//加入预警客户
              component:resolve => require(['@/components/earlyWarning/customerRiskInvestigation/JoinAlertCustomer'],resolve),
              meta:{
                title:"加入预警客户",
                keepAlive:true,
                name:'JoinAlertCustomer'
              }
            },{
              path:'troubleshooting',//预警客户排查
              component:resolve => require(['@/components/earlyWarning/customerRiskInvestigation/Troubleshooting'],resolve),
              meta:{
                title:"预警客户排查",
                keepAlive:true,
                name:'Troubleshooting'
              }
            },{
              path:'customerRiskHistoryQuery',//客户历史风险查询
              component:resolve => require(['@/components/earlyWarning/customerRiskInvestigation/CustomerRiskHistoryQuery'],resolve),
              meta:{
                title:"客户历史风险查询",
                keepAlive:true,
                name:'CustomerRiskHistoryQuery'
              }
            },{
              path:'ruleConfiguration',//规则配置
              component:resolve => require(['@/components/earlyWarning/customerRiskInvestigation/RuleConfiguration'],resolve),
              meta:{
                title:"规则配置",
                keepAlive:true,
                name:'RuleConfiguration'
              }
            },{
              path:'importRiskCustomersOnline',//线上导入风险客户
              component:resolve => require(['@/components/earlyWarning/riskCustomerDisposal/ImportRiskCustomersOnline'],resolve),
              meta:{
                title:"线上导入风险客户",
                keepAlive:true,
                name:'ImportRiskCustomersOnline'
              }
            },{
              path:'fileImportRiskCustomer',//文件导入风险客户
              component:resolve => require(['@/components/earlyWarning/riskCustomerDisposal/FileImportRiskCustomer'],resolve),
              meta:{
                title:"文件导入风险客户",
                keepAlive:true,
                name:'FileImportRiskCustomer'
              }
            },{
              path:'headOfficeLoanProcessingPost',//总行贷中岗处置
              component:resolve => require(['@/components/earlyWarning/riskCustomerDisposal/HeadOfficeLoanProcessingPost'],resolve),
              meta:{
                title:"总行贷中岗处置",
                keepAlive:true,
                name:'HeadOfficeLoanProcessingPost'
              }
            },{
              path:'riskCustomerLevelQuery',//风险客户等级查询
              component:resolve => require(['@/components/earlyWarning/riskCustomerDisposal/RiskCustomerLevelQuery'],resolve),
              meta:{
                title:"风险客户等级查询",
                keepAlive:true,
                name:'RiskCustomerLevelQuery'
              }
            },{
              path:'RiskCustomerIndexQuery',//风险客户指标查询
              component:resolve => require(['@/components/earlyWarning/riskCustomerDisposal/RiskCustomerIndexQuery'],resolve),
              meta:{
                title:"风险客户指标查询",
                keepAlive:true,
                name:'RiskCustomerIndexQuery'
              }
            },{
              path:'disposalStatistics',//处置统计
              component:resolve => require(['@/components/earlyWarning/riskCustomerDisposal/DisposalStatistics'],resolve),
              meta:{
                title:"处置统计",
                keepAlive:true,
                name:'DisposalStatistics'
              }
            },{
              path:'channelList',//渠道列表
              component:resolve => require(['@/components/channel/ChannelList'],resolve),
              meta:{
                title:"渠道列表",
                keepAlive:true,
                name:'ChannelList'
              }
            },{
              path:'empower',//授权列表
              component:resolve => require(['@/components/channel/Empower'],resolve),
              meta:{
                title:"授权列表",
                keepAlive:true,
                name:'Empower'
              }
            },{
              path:'homePage',//首页待办任务
              component:resolve => require(['@/components/workBench/HomePage'],resolve),
              meta:{
                title:"首页待办任务",
                keepAlive:true,
                name:'HomePage'
              },
              redirect: {name: 'Early'}, 
              children:[
                {
                  path:'/MainIndex/homePage/:id/:type',
                  name:"Early",
                  component:resolve => require(['@/components/workBench/home/Early'],resolve),
                  
                },{
                  path:'/MainIndex/homePage/:id/:type',
                  name:"Quota",
                  component:resolve => require(['@/components/workBench/home/Quota'],resolve),
                },{
                  path:'/MainIndex/homePage/:id/:type',
                  name:"Card",
                  component:resolve => require(['@/components/workBench/home/Card'],resolve),
                },{
                  path:'/MainIndex/homePage/:id/:type',
                  name:"Achievements",
                  component:resolve => require(['@/components/workBench/home/Achievements'],resolve),
                }
              ]
            }
        ]
    }
  
  ]

})


router.beforeEach((to, from, next) => {
  if(to.path != '/login') { // 判断是否需要登录权限
    if(window.sessionStorage.getItem('token')) { // 判断是否登录
			next();
    } else { // 没登录则跳转到登录界面
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
    next();
  }
})

export default router;
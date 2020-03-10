<template>
	<div class="content_box">
		<!-- 编辑模块(搜索) -->
	    <div class="edit_module">
	    	<el-form :inline="true"  class="demo-form-inline" size="small">
		        <el-row class="edit_module_search">
					<el-col :span="24">
						<el-form-item :label="$t('creditCardInquiry.applyId')"> <!-- 申请编号 -->
							<el-input v-model="query.applyId" ></el-input>
						</el-form-item>
						<el-form-item :label="$t('creditCardInquiry.applicantName')">  <!-- 申请人姓名 -->
			                <el-input v-model="query.applicantName" ></el-input>
			            </el-form-item>
			            <el-form-item :label="$t('creditCardInquiry.cCertificatesNumber')">  <!-- 证件号码 -->
			                <el-input v-model="query.applyIdcardTypeValue" ></el-input>
			            </el-form-item>
			            <el-form-item :label="$t('creditCardInquiry.cCertificatesType')"> <!-- 证件类型 -->
			            	<el-select v-model="query.applyIdcardType" placeholder="">
			            		<el-option value=""  label="请选择"></el-option>
								<el-option v-for="(item,index) in cardTypes" :key="index" :value="item.paramValue" :label="item.paramSname"></el-option>
			            	</el-select>
			            </el-form-item>
					</el-col>
		  			<el-col :span="24">
				  		<div class="edit_module_btn">
				  			<el-button type="warning" icon="el-icon-search" @click="queryData()" size="small">{{$t('Query')}}</el-button>  <!--查询按钮-->
				  		</div>
			  		</el-col>
		        </el-row>  
	     	</el-form>
	    </div>
		<!--编辑模块end(搜索)-->
		<!-- 列表模块begin -->
    	<div class="list_module">
			<div class="table_body">
				<h4>{{$t('creditCardInquiry.xdcxlb')}}</h4> <!-- 消贷查询列表 -->
				<el-table :data="tableData" border style="width: 100%" size='small' :empty-text="$t('noData')">
					<!--序号-->
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
					<!--申请编号-->
 					<el-table-column prop="applyId" :label="$t('creditCardInquiry.applyId')"  align="center" min-width="165px"> </el-table-column>
 					<!--申请人姓名-->
 					<el-table-column prop="applicantName" :label="$t('creditCardInquiry.applicantName')"  align="center" min-width="160px"> </el-table-column>
 					<!--证件类型-->
 					<el-table-column prop="applyIdcardType" :label="$t('creditCardInquiry.cCertificatesType')"  align="center" min-width="135px">
 						<template slot-scope="scope">
							<span>{{ scope.row.applyIdcardType | getTypeName(cardTypes)}}</span>
 						</template>
 					</el-table-column>
 					<!--证件号码-->
 					<el-table-column prop="applyIdcardTypeValue" :label="$t('creditCardInquiry.cCertificatesNumber')"  align="center"  min-width="190px"> </el-table-column>
 					<!--产品名称-->
 					<el-table-column prop="productName" :label="$t('creditCardInquiry.productName')"  align="center" min-width="150px"></el-table-column>
 					<!--贷款期限(月)-->
 					<el-table-column prop="applyTermValue" :label="$t('creditCardInquiry.dkqx')"  align="center"  min-width="175px">
 						<template slot-scope="scope">
 							{{scope.row.applyTermValue}}
 						</template>
 					</el-table-column>
 					<!--申请日期-->
 					<el-table-column prop="applyTime" :label="$t('creditCardInquiry.applyDate')"  align="center" min-width="165px">
 						<template slot-scope="scope">
 							<span v-if="scope.row.applyTime">{{scope.row.applyTime.slice(0,10)}}</span>
 						</template>
 					</el-table-column>
 					<!--受理状态-->
 					<el-table-column prop="accptingState" :label="$t('creditCardInquiry.slzt')"  align="center" min-width="160px">
 						<template slot-scope="scope">
							<span>{{scope.row.accptingState | getTypeName(theState)}}</span>
 						</template>
 					</el-table-column>
 					<el-table-column prop="businessType" :label="$t('creditCardInquiry.businessType')"  align="center" min-width="120px"><!--业务类型-->
 						<template slot-scope="scope">
 							<span v-if="scope.row.businessType==2">单笔单批</span>
 							<span v-if="scope.row.businessType==3">随借随还</span>
 						</template>
 					</el-table-column>
 					<!--操作-->
 					<el-table-column :label="$t('Operation')" align="center" min-width="120px" fixed="right" v-if="funList.indexOf('查看') > -1 || funList.indexOf('合同下载') > -1"> <!--v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 || funList.indexOf('配置') > -1"-->
						<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1"><!---->
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span> <!-- 查看 -->
								</el-button>
								<span v-if="scope.row.accptingState=='6'">
									<!-- <el-button v-if="scope.row.businessType==2&&funList.indexOf('合同下载') > -1" type="primary" size="small" @click="seeContract(scope.row)">{{$t('creditCardInquiry.htxz')}}</el-button>  -->
									<el-button v-if="scope.row.businessType==2&&funList.indexOf('合同下载') > -1" size="mini" class="edit-btn" type="primary"  @click="seeContract(scope.row)" ><!-- 合同下载 -->
										<i class="el-icon-download"></i>
										<span class="text">{{$t('creditCardInquiry.htxz')}}</span>
									</el-button>
								</span>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					layout="prev, pager, next, slot"
					:total="totalCount">
					<template slot>
						<div class="slot_pag">
							<el-select v-model="query.pageSize" size="mini" @change="handleSizeChange" style="width:auto!important;">  <!-- 10条/页 -->
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
							<span>{{$t('JumpTo')}} </span> <!-- 跳转至 -->
							<el-input size="mini" v-model="query.goPage"  type="number" @click="changePage()">
								</el-input><span>{{$t('page')}}</span> <!-- 页 -->
							<el-button  type="warning" @click="goPageSure(query.goPage)">{{$t('OK')}}</el-button> <!-- 确定 -->
						</div>
					</template>
			</el-pagination>
			</div>
		</div>
		<!--列表模块end-->
		<!--查看详情begin-->
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false" width="70%">
			<el-table :data="listData"  border style="width: 100%" size='small' max-height="400" :empty-text="$t('noData')">
				<!--序号-->
				<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="130px"></el-table-column>
				<!--审批岗位-->
				<el-table-column prop="activityName" :label="$t('creditCardInquiry.activityName')"  align="center" min-width="220px"> </el-table-column>
				<!--审批人员-->
				<el-table-column prop="userName" :label="$t('creditCardInquiry.userName')"  align="center" min-width="180px"> </el-table-column>
				<!--处理日期-->
				<el-table-column prop="updateTime" :label="$t('doDate')"  align="center" min-width="130px">
					<template slot-scope="scope">
						{{scope.row.doneDate}}
					</template>
				</el-table-column>
				<!--处理时间-->
				<el-table-column prop="updateTime" :label="$t('doTime')"  align="center" min-width="130px">
					<template slot-scope="scope">
						{{scope.row.doneTime}}
					</template>
				</el-table-column>
				<!--审批结果-->
				<el-table-column prop="handleResult" :label="$t('creditCardInquiry.handleResult')"  align="center" min-width="240px">
					<template slot-scope="scope">
						<span v-if="scope.row.handleResult==0">拒绝</span>
						<span v-if="scope.row.handleResult==1">通过</span>
						<span v-if="scope.row.handleResult==2">退回</span>
						<span v-if="scope.row.handleResult==3">驳回</span>
						<span v-if="scope.row.handleResult==4">转人工</span>
					</template>
				</el-table-column>
				<!--审批说明-->
				<el-table-column prop="handleDesc" :label="$t('creditCardInquiry.handleDesc')"  align="center" min-width="130px"> </el-table-column>
			</el-table>
		</el-dialog>
		<!--查看详情end-->
	</div>
</template>

<script>
	export default{
		name: 'CreditCancellationInquiry',
		data(){
			return{
				query:{
					applyId:"",//申请编号
					applicantName:"",//申请人姓名
					applyIdcardTypeValue:"",//证件号码
					applyIdcardType:"",//证件类型
					pageSize:10,//一页显示几条数据
        			pageIndex:1,  //需要传过去的参数
        			goPage: null,
				},
				currentPage:1,//当前显示第几页 1开头
      			totalCount:0,//一共有多少条数据
      			tableData:[],//列表数据
      			title:i18n.t('creditCardInquiry.splsxq'),//审批历史详情
      			listData:[],//一行数据列表
				dialogFormVisible:false,
				funList: [],
				theState:[],//受理状态
				cardTypes:[],//证件类型
			}
		},
		mounted(){
			this.getFunList()
			this.query.pageIndex=1
			this.initData();
			this.getState()
		},
		methods:{
			
			initData(){//初始化数据
				this.$post(this.$api+"/loanBusiness/queryByPage",this.query).then(res=>{
					if(res.returnCode=="000000"){
						this.tableData=res.returnData.rows;
						this.totalCount=res.returnData.total;
					}else {
				        var str = `
				            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
				            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				          `
				        this.$alert(str, i18n.t('Prompt'), {
				            dangerouslyUseHTMLString: true
				        });
			        }
				})
			},
			queryData(){//点击查询
      			this.query.pageIndex = 1;
      			this.initData()
			},
			seeItem(row){//查看详情
				this.dialogFormVisible=true;
				var obj={
					applyId:row.applyId,
					businessType:row.businessType,
					legalPersonNum:this.$store.state.loginData.userLogin.legalPersonNum
				}
				
				this.$post(this.$approve+"/ProcessedDetailList",obj).then(res=>{
					if(res.code=="000000"){
						this.listData=res.data
					}
				})
			},
			seeContract(row){//合同下载
		      let self = this
		      this.$post(this.$approve + '/CFCA/queryContractNo',{applyId: row.applyId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(function(res){
		        if(res.code == '000000'){
		          // self.$get(self.$approve + '/cfca/contractNo',{anxinContractNo: res.data.anxinContractNo, fileURL: res.data.fileUrl}).then(function(r){
		            // if(r.code == '000000'){
		              let URL = self.$approve + '/CFCA/contractNo?anxinContractNo=' + res.data.anxinContractNo + '&fileURL=' + res.data.fileUrl + '&applyId=' + row.applyId
		              window.open(URL)
		              // var loadingTask = pdf.createLoadingTask({
		              // 	url: URL,
		              // 	// CMapReaderFactory
		              // })
		              // self.src = loadingTask
		              // self.src.then(pdf => {
		              // 	self.numPages = pdf.numPages
		              // 	URL = ''
		              // 	self.pdfdialogFormVisible = true
		              // 	setTimeout(() => {
		              // 		document.querySelector('.pdfshow .el-dialog__body').scrollTop = 0
		              // 	}, 50);
		              // }).catch((err) => {
		              // 	console.error('pdf加载失败')
		              // })
		            // }else{
		            //   var str = `
		            //     <p>错误码: <span style='color:#5bc0de'>${r.code}</span></p>
		            //     <p >原因:<span style='color:#5bc0de;'>${r.message}</span></p>
		            //     `
		            //   self.$alert(str, i18n.t('Prompt'), {
		            //     dangerouslyUseHTMLString: true
		            //   });
		            // }
		          // })
		        }else{
		          var str = `
		            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
		            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
		            `
		          self.$alert(str, i18n.t('Prompt'), {
		            dangerouslyUseHTMLString: true
		          });
		        }
		      })
				},
			cancel(){//隐藏弹出框
				this.dialogFormVisible=false;
			},
			getFunList () {
				let obj = {}
				obj = this.$store.state.loginData.beMenuList.find(item => {
					return item.name == '消贷进件查询' //'消贷进件查询'i18n.t('creditCardInquiry.xdjjcx')
				})
				this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
					if(res.returnCode == '000000'){
					this.funList = JSON.stringify(res.returnData)
					}
				});
			},
			changePage(goPage){//要跳转第几页
				this.query.goPage=this.query.goPage.replace(/(\-|\+|\.|[0-9])/g,'');
			},
			
			//点击确认改变数据
			goPageSure () {
			      if (this.query.goPage) {
			        var mc=Math.ceil(this.totalCount/this.query.pageSize);
			        if (this.query.goPage) {
			          if(this.query.goPage>0&&this.query.goPage<=mc){
			            this.query.pageIndex = parseInt(this.query.goPage)
			            this.currentPage=parseInt(this.query.goPage)
			          }else{
			            this.query.pageIndex = parseInt(mc)
			            this.currentPage=parseInt(mc)
			          }
			        }
			        this.initData()
			        this.query.goPage = null
			      }
		    },
	  		//改变每页显示多少条
		    handleSizeChange(val) {
			  this.query.pageSize =  val;
			  this.query.pageIndex = 1
		      this.initData();
		    },
		    //选择页数改变数据
		    handleCurrentChange(val) {
		      this.query.pageIndex =val;
		      this.initData();
		    },
		    getState(){
		    	//申请人手机号核查
			 	var obj7={
			 		"paramCode":'THE_STATUS'
			 	}
			 	this.$post(this.$api + '/paramValues/findByParamCode',obj7).then(res=>{
		          if(res.returnCode=="000000"){
		             this.theState =res.returnData
		          }
				})
				
				//证件类型
				var param={
					"paramCode":"CARD_TYPE",
				}
				this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
					if(res.returnCode=="000000"){
						this.cardTypes =res.returnData
					}
				})
		    },
		},
		filters:{
			formatDate:function(val,x){
				if(val==null || val == "" ){
					return ""
				}else{
					let dat = new Date(val);
					let y = dat.getFullYear();
			        let MM = dat.getMonth() + 1;
			        MM = MM < 10 ? ('0' + MM) : MM;
			        let d = dat.getDate();
			        d = d < 10 ? ('0' + d) : d;
			        let h = dat.getHours();
			        h = h < 10 ? ('0' + h) : h;
			        let m = dat.getMinutes();
			        m = m < 10 ? ('0' + m) : m;
			        let s = dat.getSeconds();
			        s = s < 10 ? ('0' + s) : s;
			        if(x==0){
			        	return y + '-' + MM + '-' + d ;
			        }else if(x==1){
			        	return h + ':' + m + ':' + s
			        }
		        }
		        
			},
			getTypeName(val,lists){
				let Sname='';
				lists.forEach(item => {
					if(item.paramValue==val){
						Sname = item.paramSname
						return false
					}
				});
				return Sname || ''
			}
		}
	}
</script>

<style>
</style>
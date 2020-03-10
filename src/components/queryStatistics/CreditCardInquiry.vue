<template>
	<div class="content_box">
		<!-- 编辑模块(搜索) -->
	    <div class="edit_module">
	    	<el-form :inline="true"  class="demo-form-inline" size="small">
		        <el-row class="edit_module_search">
					<el-col :span="24">
						<el-form-item :label="$t('creditCardInquiry.applyId')"><!-- 申请件编号 -->
							<el-input v-model="query.applyId" ></el-input>
						</el-form-item>
						<el-form-item :label="$t('creditCardInquiry.cCustomerName')"> <!-- 姓名 -->
			                <el-input v-model="query.cCustomerName" ></el-input>
			            </el-form-item>
			            <el-form-item :label="$t('creditCardInquiry.cCertificatesNumber')"> <!-- 证件号码 -->
			                <el-input v-model="query.cCertificatesNumber" ></el-input>
			            </el-form-item>
			            <el-form-item :label="$t('creditCardInquiry.cCertificatesType')"><!-- 证件类型 -->
			            	<el-select v-model="query.cCertificatesType" placeholder="">
			            		<el-option value="" label="请选择"></el-option>
			            		<el-option value="1" label="身份证" ></el-option>
			            		<el-option value="2" label="港澳居民来往内地通行证" ></el-option>
			            		<el-option value="3" label="台湾居民来往大陆通行证" ></el-option>
			            		<el-option value="4" label="中国护照" ></el-option>
			            		<el-option value="5" label="外国护照" ></el-option>
			            		<el-option value="6" label="外国人永久拘留证" ></el-option>
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
				<h4>{{$t('creditCardInquiry.xykcxlb')}}</h4><!-- 信用卡查询列表 -->
				<el-table :data="tableData" border style="width: 100%" size='small' :empty-text="$t('noData')">
					<!--序号-->
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
					<!--申请编号-->
 					<el-table-column prop="applyId" :label="$t('creditCardInquiry.applyId')"  align="center" min-width="170px"> </el-table-column>
 					<!--主卡人姓名-->
 					<el-table-column prop="cCustomerName" :label="$t('creditCardInquiry.zkrName')"  align="center" min-width="160px"> </el-table-column>
 					<!--证件类型-->
 					<el-table-column prop="cCertificatesType" :label="$t('creditCardInquiry.cCertificatesType')"  align="center" min-width="160px">
 						<template slot-scope="scope">
 							<span v-if="scope.row.cCertificatesType==1">身份证</span>
 							<span v-if="scope.row.cCertificatesType==2">港澳居民来往内地通行证</span>
 							<span v-if="scope.row.cCertificatesType==3">台湾居民来往大陆通行证</span>
 							<span v-if="scope.row.cCertificatesType==4">中国护照</span>
 							<span v-if="scope.row.cCertificatesType==5">外国护照</span>
 							<span v-if="scope.row.cCertificatesType==6">外国人永久拘留证</span>
 						</template>
 					</el-table-column>
 					<!--证件号码-->
 					<el-table-column prop="cCertificatesNumber" :label="$t('creditCardInquiry.cCertificatesNumber')"  align="center" min-width="200px"> </el-table-column>
 					<!--产品编号-->
 					<!--<el-table-column prop="productName" label="产品名称"  align="center"></el-table-column>-->
 					<el-table-column prop="cProductNumber" :label="$t('creditCardInquiry.productNum')"  align="center" min-width="155px"></el-table-column>
 					<!--申请日期-->
 					<el-table-column prop="createTime" :label="$t('creditCardInquiry.applyDate')"  align="center" min-width="165px">
 						<template slot-scope="scope">
 							<span v-if="scope.row.createTime">{{scope.row.createTime.slice(0,10)}}</span>
 							<!--{{scope.row.applyTermUnit}}-->
 						</template>
 					</el-table-column>
 					<!--申请日期-->
 					<!--<el-table-column prop="applyTime" label="申请日期"  align="center">
 						<template slot-scope="scope">
 							{{scope.row.applyTime.slice(0,10)}}
 						</template>
 					</el-table-column>-->
 					<!--受理状态-->
 					<el-table-column prop="accptingState" :label="$t('creditCardInquiry.slzt')"  align="center" min-width="200px">
 						<template slot-scope="scope">
 							<!--<span v-if="scope.row.accptingState==0">受理</span>
 							<span v-if="scope.row.accptingState==1">拒绝</span>
 							<span v-if="scope.row.accptingState==2">审批中</span>
 							<span v-if="scope.row.accptingState==3">审批通过</span>
 							<span v-if="scope.row.accptingState==4">建立额度成功</span>
 							<span v-if="scope.row.accptingState==5">放款失败</span>
 							<span v-if="scope.row.accptingState==6">放款成功</span>-->
							 <div v-for="(item,index) in theState" :key="index">
								 <span v-if="scope.row.accptingState==item.paramValue">{{item.paramSname}}</span>
							 </div>
 							<!-- <span v-for="(item,index) in theState" :key="index" v-if="scope.row.accptingState==item.paramValue">{{item.paramSname}}</span> -->
 						</template>
 					</el-table-column>
 					<!--操作-->
 					<el-table-column :label="$t('Operation')" align="center" min-width="200px" v-if="funList.indexOf('查看') > -1" fixed="right"> <!--v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 || funList.indexOf('配置') > -1"-->
						<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" ><!--v-if="funList.indexOf('查看') > -1"-->
									<i class="el-icon-view"></i>
									<span class="text">{{$t("See")}}</span><!-- 查看  -->
								</el-button>
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
							<span>{{$t('JumpTo')}}</span><!-- 跳转至 -->
							<el-input size="mini" v-model="query.goPage"  type="number" @click="changePage()">
								</el-input><span>{{$t('page')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure(query.goPage)">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
			</el-pagination>
			</div>
		</div>
		<!--列表模块end-->
		<!--查看详情begin-->
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false" width="70%">
			<el-table :data="listData" border style="width: 100%" size='small' max-height="400" :empty-text="$t('noData')">
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
		name: 'CreditCardInquiry',
		data(){
			return{
				query:{
					applyId:"",//申请编号
					cCustomerName:"",//申请人姓名
					cCertificatesNumber:"",//证件号码
					cCertificatesType:"",//证件类型
					pageSize:10,//一页显示几条数据
        			pageIndex:1,  //需要传过去的参数
        			goPage: null,
				},
				currentPage:1,//当前显示第几页 1开头
      			totalCount:0,//一共有多少条数据
      			tableData:[],//列表数据
      			title:i18n.t('creditCardInquiry.splsxq'), //审批历史详情
      			listData:[],//一行数据列表
				dialogFormVisible:false,
				funList: [],
				theState:[]//受理状态
			}
		},
		mounted(){
			this.getFunList()
			this.query.pageIndex=1
			this.initData()
			this.getState()
		},
		methods:{
			initData(){//初始化数据
				this.$post(this.$api+"/colCard/queryByPage",this.query).then(res=>{
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
//					businessType:row.businessType,
					legalPersonNum:this.$store.state.loginData.userLogin.legalPersonNum
				}

				this.$post(this.$approve+"/WFTask/CardWfHisListAuto",obj).then(res=>{
					if(res.code=="000000"){
						this.listData=res.data;
					}
				})
			},
			cancel(){//隐藏弹出框
				this.dialogFormVisible=false;
			},
			getFunList () {
				let obj = {}
				obj = this.$store.state.loginData.beMenuList.find(item => {
					return item.name == '信用卡进件查询'  //信用卡进件查询i18n.t('creditCardInquiry.xykjjcx')
				})
				this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
					if(res.returnCode == '000000'){
					this.funList = JSON.stringify(res.returnData)
					}
				});
			},
			//跳转第几页
			changePage(goPage){
				this.goPage=this.goPage.replace(/(\-|\+|\.|[0-9])/g,'');
			},
			//点击确认改变数据
			goPageSure () {
			      if (this.query.goPage) {
			        var mc=Math.ceil(this.totalCount/this.query.pageSize);
			        if (this.query.goPage) {
			          if(this.query.goPage>0&&this.query.goPage<=mc){
			            this.query.pageIndex = parseInt(this.query.goPage)
			            this.currentPage=parseInt(this.query.goPage);
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
		        
			}
		}
	}
</script>

<style>
</style>
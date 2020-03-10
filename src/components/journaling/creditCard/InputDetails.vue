<template>
	<!--报表管理》报表管理-->
	<div class="content_box" id="fun_content">
		<!-- 面包屑 -->
		<!--查询模块-->
		<div class="edit_module">
	      	<el-form  ref="form" :inline="true" class="demo-form-inline" size="small">
	        	<el-row class="edit_module_search">
		          	<el-col :span="24">
		          		<el-form-item :label="$t('CreditCard.channelNo')"><!-- 渠道编号 :placeholder="$t('CreditCard.pleaseChannelNo')"-->
						    <el-input  v-model="channelNo" style="width: 100%;"></el-input><!-- 请输入渠道编号 -->
						</el-form-item>
						<el-form-item :label="$t('CreditCard.channelName')"><!-- 渠道名称 :placeholder="$t('CreditCard.pleaseChannelName')"-->
						    <el-input  v-model="channelName" style="width: 100%;"></el-input><!-- 请输入渠道名称 -->
						</el-form-item>
						<el-form-item :label="$t('CreditCard.productNum')"><!-- 产品编号 :placeholder="$t('CreditCard.pleaseProductNum')"-->
						    <el-input  v-model="productNum" style="width: 100%;"></el-input><!-- 请输入产品编号 -->
						</el-form-item>
						<el-form-item :label="$t('CreditCard.productName')"><!-- 产品名称 :placeholder="$t('CreditCard.pleaseProductName')"-->
						    <el-input  v-model="productName" style="width: 100%;"></el-input><!-- 请输入产品名称 -->
						</el-form-item>
					  	<el-form-item :label="$t('beginTime')"><!--开始时间 :placeholder="$t('choseDate')"-->
						    <el-date-picker type="date"  v-model="beginTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<el-form-item :label="$t('endTime')"><!--结束时间 :placeholder="$t('choseDate')"-->
						    <el-date-picker type="date"  v-model="endTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<el-form-item :label="$t('CreditCard.accptingState')"><!-- 审批状态 -->
			            	<el-select v-model="accptingState">
								<el-option value=" " :label="$t('CreditCard.pleaseChose')" ></el-option><!-- 请选择 -->
			            		<el-option value="3" :label="$t('CreditCard.ApprovalAndApproval')" ></el-option><!-- 审批通过 -->
			            		<el-option value="6" :label="$t('CreditCard.ApprovalCenter')" ></el-option><!-- 审批中 -->
			            		<el-option value="5" :label="$t('CreditCard.refuse')" ></el-option><!-- 拒绝 -->
			            	</el-select>
			            </el-form-item>
		          	</el-col>
		          	<el-col :span="24">
					  	<div class="edit_module_btn">
					  		<el-button type="primary" icon="el-icon-plus"  @click="downLoad(dataList)" v-if="funList.indexOf('导出') > -1 " size="small">{{$t('downQuery')}}</el-button><!--导出全部-->
					  		<el-button type="warning" icon="el-icon-search" @click="queryData()" size="small">{{$t('Query')}}</el-button><!--查询按钮-->
					  	</div>
					</el-col>
	        	</el-row>  
	      	</el-form>
	    </div>
	    
	    <!--列表模块-->
	    <div class="list_module">
	    	<div class="table_body">
	    		<h4>{{$t('CreditCard.InputDetailsList')}}</h4><!-- 进件明细列表 -->
	    		<el-table :data="dataList" border style="width: 100%"  size='small' :empty-text="$t('noData')">
	    			<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center"  width="135px"></el-table-column><!-- 序号 -->
	    			<el-table-column prop="channelNo" :label="$t('CreditCard.channelNo')" align="center" width="145px" ></el-table-column><!--渠道编号-->
	    			<el-table-column prop="channelName" :label="$t('CreditCard.channelName')" align="center" width="130px" ></el-table-column><!--渠道名称-->
	    			<el-table-column prop="creditnodeno" :label="$t('CreditCard.productType')" align="center" width="140px"></el-table-column><!--产品类型-->
	    			<el-table-column prop="productNumber" :label="$t('CreditCard.productNum')" align="center" width="140px"></el-table-column><!--产品编号-->
	    			<el-table-column prop="productName" :label="$t('CreditCard.productName')" align="center"   width="170px"></el-table-column><!--产品名称-->
	    			<el-table-column prop="customerName" :label="$t('CreditCard.sqrxm')" align="center" width="155px"></el-table-column><!--申请人姓名-->
	    			<el-table-column prop="certificatesType" :label="$t('CreditCard.sqrzjlx')" align="center"  width="170px"></el-table-column><!--申请人证件类型-->
	    			<el-table-column prop="certificatesNumber" :label="$t('CreditCard.zjhm')" align="center" width="125px"></el-table-column><!--证件号码-->
	    			<el-table-column prop="phoneNumber" :label="$t('CreditCard.phone')" align="center"  width="130px" ></el-table-column><!--手机号码-->
	    			<el-table-column prop="createTime" :label="$t('CreditCard.sqsj')" align="center"  min-width="110px" >
	    				<template slot-scope="scope">
	    					{{scope.row.createTime | formatDate}}
	    				</template>
	    			</el-table-column><!--申请时间-->
	    			<el-table-column prop="finalApprovaResult" :label="$t('CreditCard.accptingState')" align="center" width="145px" ><!-- 审批状态 -->
	    				<!-- <template slot-scope="scope">
	    					<span v-if="scope.row.accptingState==0">受理</span>
	    					<span v-if="scope.row.accptingState==1">拒绝</span>
	    					<span v-if="scope.row.accptingState==2">审批中</span>
	    					<span v-if="scope.row.accptingState==3">通过</span>
	    				</template> -->
	    			</el-table-column><!--审批状态-->
	    		</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="pageIndex + 1"
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
							<span>{{$t('JumpTo')}}</span><!-- 跳转至 -->
							<el-input size="mini" v-model="goPage"  type="number" @click="changePage()">
								</el-input><span>{{$t('page')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('Determine')}}</el-button><!-- 确定 -->
						</div>
					</template>
				</el-pagination>
	    		<!--<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column>-->
	    	</div>
	    </div>
	</div>
</template>

<script>
	export default{
		name: 'InputDetails',
		data(){
			return{
				beginTime:"",
				endTime:"",
				accptingState:"",//审批状态
				channelName:"",//渠道名称
				channelNo:"",//渠道编号
				productNum:"",//产品编号
				productName:"",//产品名称
				branchId: this.$store.state.loginData.userLogin.branchId,
				legalPersonNum:this.$store.state.loginData.userLogin.legalPersonNum,
				dataList:[
				],
				pageIndex:0,//当前页传给后台的当前页 0开头
				currentPage:1,//当前显示第几页 1开头
				pageSize:10,
				totalCount:10,
				goPage:null,
				funList: []
			}
		},
		mounted(){
			this.getFunList()
			this.initData();
		},
		methods:{
			getFunList () {
			let obj = {}
			obj = this.$store.state.loginData.beMenuList.find(item => {
				return item.name == '消贷进件明细报表'
			})
			this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
				if(res.returnCode == '000000'){
				this.funList = JSON.stringify(res.returnData)
				}
			});
			},
			initData(){
				var filter = this.$options.filters['formatDate']
				var obj={
					"channelNo":this.channelNo,//渠道名称
					"branchId":this.branchId,//机构编号
					"channelName":this.channelName,//渠道名称
					"productNum":this.productNum,//产品编号
					"productName":this.productName,//产品名称
					"accptingState":this.accptingState,//审批状态
					"beginTime":filter(this.beginTime),//起始时间
					"endTime":filter(this.endTime),//结束时间
					"indexNo": this.pageIndex,
					"pageSize": this.pageSize,
					"legalPersonNum":this.legalPersonNum
				}
				this.$post(this.$tab+"/api/creditCard",obj).then(res=>{
					if(res.returnCode=="000000"){
						this.dataList=res.returnData.rows;
						this.totalCount=res.returnData.totalCount;
					}
				})
			},
			queryData(){//点击查询
      			this.pageIndex = 0;
      			this.initData()
			},
			downLoad(dataList){
				var filter = this.$options.filters['formatDate']
				var a="channelNo="+this.channelNo;
				var b="&branchId="+this.branchId;
				var c="&channelName="+this.channelName;
				var d="&productNum="+this.productNum;
				var e="&productName="+this.productName;
				var f="&accptingState="+this.accptingState;
				var g="&beginTime="+filter(this.beginTime);
				var h="&endTime="+filter(this.endTime);
				var i="&legalPersonNum="+this.legalPersonNum;
				var hre=a+b+c+d+e+f+g+h+i;
				// location.href=this.$tab+"/api/creditCardDownload?"+hre;

				var filter = this.$options.filters['formatDate']
				var obj={
					"channelNo":this.channelNo,//渠道名称
					"branchId":this.branchId,//机构编号
					"channelName":this.channelName,//渠道名称
					"productNum":this.productNum,//产品编号
					"productName":this.productName,//产品名称
					"accptingState":this.accptingState,//审批状态
					"beginTime":filter(this.beginTime),//起始时间
					"endTime":filter(this.endTime),//结束时间
					"indexNo": this.pageIndex,
					"pageSize": this.pageSize,
					"legalPersonNum":this.legalPersonNum
				}
				this.$post(this.$tab+"/api/creditCard",obj).then(res=>{
					if(res.returnCode=="000000"){
						this.dataList=res.returnData.rows;
						if(this.dataList.length==0){
							this.$alert( i18n.t('notExport'), i18n.t('Prompt'), {  //列表数据为空时，不可导出  提示
								dangerouslyUseHTMLString: true,
								callback:action=>{}
							});
						}else{
							location.href=this.$tab+"/api/creditCardDownload?"+hre;
						}
					}
				})
			},

			changePage(goPage){
				this.goPage=this.goPage.replace(/(\-|\+|\.|[0-9])/g,'');
			},
			//点击确认改变数据
			goPageSure () {
			      if (this.goPage) {
			        var mc=Math.ceil(this.totalCount/this.pageSize);
			        if (this.goPage) {
			          if(this.goPage>0&&this.goPage<=mc){
			            this.pageIndex = parseInt(this.goPage)-1;
			            this.currentPage = parseInt(this.goPage)
			          }else{
			            this.pageIndex = parseInt(mc)-1;
			            this.currentPage = parseInt(mc)
			          }
			        }
			        this.initData()
			        this.goPage = null
			      }
		    },
	  		//改变每页显示多少条
		    handleSizeChange(val) {
			  this.pageSize = val;
			  this.pageIndex = 0;
		      this.initData();
		    },
		    //选择页数改变数据
		    handleCurrentChange(val) {
		      this.pageIndex =val-1;
		      this.initData();
		    },
		},
		filters:{
			formatDate:function(val){
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
//			        if(x==0){
			        	return y + '-' + MM + '-' + d;
//			        }else if(x==1){
//			        	return y + '-' + MM + '-' + d
//			        }
		        }
		        
			}
		}
	}
</script>

<style>
	.el-pagination .el-select .el-input{width:125px;}
</style>
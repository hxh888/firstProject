<template>
	<!--报表管理》报表管理-->
	<div class="content_box" id="fun_content">
		<!--查询模块-->
		<div class="edit_module">
	      	<el-form  ref="form" :inline="true" class="demo-form-inline" size="small">
	        	<el-row class="edit_module_search">
		          	<el-col :span="24">
		          		<el-form-item :label="$t('loandetail.channelNumber')" >  <!--渠道编号 :placeholder="$t('loandetail.slectChannelNumber')"-->
						    <el-input   v-model="channelNo" style="width: 100%;"></el-input><!--请输入渠道编号-->
						</el-form-item>
						<el-form-item :label="$t('loandetail.channelNumberName')">  <!--渠道名称 :placeholder="$t('loandetail.slectChannelName')"-->
						    <el-input  v-model="channelName" style="width: 100%;"></el-input>
						</el-form-item>
						<el-form-item :label="$t('loandetail.productNum')"> <!--产品编号  placeholder="请输入产品编号"-->
						    <el-input v-model="productNum" style="width: 100%;"></el-input>
						</el-form-item>
						<el-form-item :label="$t('loandetail.productName')"> <!--产品名称 placeholder="请输入产品名称"-->
						    <el-input  v-model="productName" style="width: 100%;"></el-input>
						</el-form-item>
					  	<el-form-item :label="$t('loandetail.beginTime')"><!--开始时间 :placeholder="$t('loandetail.beginTime')"-->
						    <el-date-picker type="date"  v-model="startTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<el-form-item :label="$t('loandetail.endTime')"><!--结束时间  :placeholder="$t('loandetail.endTime')"-->
						    <el-date-picker type="date" v-model="endTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
						<!-- <el-form-item label="审批状态">
			            	<el-select v-model="applyState">
			            		<el-option value="1" label="通过" ></el-option>
			            		<el-option value="2" label="审批" ></el-option>
			            		<el-option value="3" label="拒绝中" ></el-option>
			            	</el-select>
			            </el-form-item> -->
		          	</el-col>
		          	<el-col :span="24">
					  	<div class="edit_module_btn">
					  		<el-button type="primary" icon="el-icon-plus"  @click="downLoad(dataList)" size="small" v-if="funList.indexOf('导出') > -1 ">{{$t('loandetail.downQuery')}}</el-button><!--导出-->
					  		<el-button type="warning" icon="el-icon-search" @click="queryData()" size="small">{{$t('Query')}}</el-button><!--查询按钮-->
					  	</div>
					</el-col>
	        	</el-row>  
	      	</el-form>
	    </div>
	    
	    <!--列表模块-->
	    <div class="list_module">
	    	<div class="table_body">
	    		<h4>{{$t('CreditCard.tjbb')}}</h4><!-- 统计报表 -->
	    		<el-table :data="dataList" border style="width: 100%"  size='small' :empty-text="$t('noData')">
	    			<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center"  width="135px"></el-table-column>
	    			<el-table-column prop="channelName" :label="$t('loandetail.channelNumberName')" align="center" width="130px"></el-table-column><!--渠道名称-->
	    			<el-table-column prop="channelNo" :label="$t('loandetail.channelNumber')" align="center"  width="145px"></el-table-column><!--渠道编号-->
	    			<el-table-column prop="productName" :label="$t('loandetail.productName')" align="center"  width="150px"></el-table-column><!--产品名称-->
	    			<el-table-column prop="productNum" :label="$t('loandetail.productNum')"  align="center" width="140px"></el-table-column><!--产品编号-->
	    			<el-table-column prop="applySumCount" :label="$t('loandetail.applySumCount')"  align="center"  width="140px"></el-table-column><!--申请件总数-->
	    			<el-table-column prop="applyPassSumCount" :label="$t('loandetail.applyPassSumCount')"  align="center" width="170px" ></el-table-column><!--审批通过数-->
	    			<el-table-column prop="applyRefuseSumCount" :label="$t('loandetail.applyRefuseSumCount')"  align="center" width="105px"></el-table-column><!--审批拒绝数-->
	    			<el-table-column prop="autoApplyPassSumCount" :label="$t('loandetail.autoApplyPassSumCount')"  align="center"  width="180px"></el-table-column><!--自动审批通过数-->
	    			<el-table-column prop="autoApplyRefuseSumCount" :label="$t('loandetail.autoApplyRefuseSumCount')"  align="center" width="165px"></el-table-column><!--自动审批拒绝数-->
	    			<el-table-column prop="userApplySumCount" :label="$t('loandetail.userApplySumCount')" align="center" width="160px"></el-table-column><!--人工审批数-->
	    			<el-table-column prop="userApplyPassSumCount" :label="$t('loandetail.userApplyPassSumCount')" align="center" width="185px"></el-table-column><!--人工审批通过数-->
	    			<el-table-column prop="userApplyRefuseSumCount" :label="$t('loandetail.userApplyRefuseSumCount')" align="center" width="175px" ></el-table-column><!--人工审批拒绝数-->
	    			<el-table-column prop="userApplyProceedSumCount" :label="$t('loandetail.userApplyProceedSumCount')" align="center"  min-width="155px" ></el-table-column><!--人工审批进行中-->
	    		</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="pageIndex"
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
	    		<!--<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column>-->
	    	</div>
	    </div>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
	export default{
		name: 'LoanChannelStatistics',
		data(){
			return{
				startTime:"",
				endTime:"",
				applyState:"",//审批状态
				channelNo:"",//渠道编号
				channelName:"",//渠道名称
				productNum:"",//产品编号
				productName:"",//产品名称
				branchId: this.$store.state.loginData.userLogin.branchId,
				legalPersonNum:this.$store.state.loginData.userLogin.legalPersonNum,
				dataList:[],
				pageIndex:1,//当前页传给后台的当前页 0开头
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
				return item.name == '消贷渠道统计报表'
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
					"pageIndex": this.pageIndex,
					"pageSize": this.pageSize,
					"data":{
						"startTime":filter(this.startTime),
						"endTime":filter(this.endTime),
						"applyState":this.applyState,//审批状态
						"channelNo":this.channelNo,//渠道编号
						"channelName":this.channelName,//渠道名称
						"productNum":this.productNum,//产品编号
						"productName":this.productName,//产品名称
						"branchId":this.branchId,
						"legalPersonNum":this.legalPersonNum
					}
				}
				this.$post(this.$tab+"/loanAccess/findByPage",obj).then(res=>{
					if(res.returnCode=="000000"){
						this.dataList=res.returnData.dataList;
						this.totalCount=res.returnData.total;
					}
				})
			},
			queryData(){//点击查询
      			this.pageIndex = 1;
      			this.initData()
			},
			downLoad(){
				var filter = this.$options.filters['formatDate']
				var obj={
					"pageIndex": this.pageIndex,
					"pageSize": this.pageSize,
					"data":{
						"startTime":filter(this.startTime),
						"endTime":filter(this.endTime),
						"applyState":this.applyState,//审批状态
						"channelNo":this.channelNo,//渠道编号
						"channelName":this.channelName,//渠道名称
						"productNum":this.productNum,//产品编号
						"productName":this.productName,//产品名称
						"branchId":this.branchId,
						"legalPersonNum":this.legalPersonNum
					}
				}
				this.$post(this.$tab+"/loanAccess/findByPage",obj).then(res=>{
					if(res.returnCode=="000000"){
						this.dataList=res.returnData.dataList;
						if(this.dataList.length==0){
							this.$alert( i18n.t('notExport'), i18n.t('Prompt'), {  //列表数据为空时，不可导出  提示
								dangerouslyUseHTMLString: true,
								callback:action=>{}
							});
						}else{
							let hre = `beginTime=${this.timeChange(this.startTime)}&endTime=${this.timeChange(this.endTime)}&channelNo=${this.channelNo}&channelName=${this.channelName}&productNum=${this.productNum}&productName=${this.productName}&applyState=${this.applyState}&branchId=${this.branchId}&legalPersonNum=${this.legalPersonNum}`
							location.href=this.$tab+"/loanAccess/download?"+hre
						}
					}
				})
					
				
				
//				location.href=this.$tabapi+"/cardMain/cCardMainTableExecl?beginTime="+this.timeChange(this.beginTime)+"&endTime="+this.timeChange(this.endTime)
			},
			
			//中国标准时间转化为年月日
			formatTen(num){
				return num > 9 ? (num + "") : ("0" + num);
			},
			timeChange(time){
				if (!time) {
					return ''
				}
				var d=new Date(time);
				var year=d.getFullYear();
				var month=d.getMonth() + 1;
				var day=d.getDate();
				return year+"-"+ this.formatTen(month)+"-"+this.formatTen(day)
			},
			//点击确认改变数据
			goPageSure () {
			      if (this.goPage) {
			        var mc=Math.ceil(this.totalCount/this.pageSize);
			        if (this.goPage) {
			          if(this.goPage>0&&this.goPage<=mc){
			            this.pageIndex = parseInt(this.goPage);
			            this.currentPage = parseInt(this.goPage)
			          }else{
			            this.pageIndex = parseInt(mc)
			            this.currentPage = parseInt(this.goPage)
			          }
			        }
			        this.initData()
			        this.goPage = null
			      }
		    },
	  		//改变每页显示多少条
		    handleSizeChange(val) {
			  this.pageSize =  val;
			  this.pageIndex = 1;
		      this.initData();
		    },
		    //选择页数改变数据
		    handleCurrentChange(val) {
		      this.pageIndex =val;
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
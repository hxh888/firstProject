<template>
	<!--报表管理》报表管理-->
	<div class="content_box" id="fun_content">
		<!-- 面包屑 -->
    	<div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >报表管理</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >审批拒绝明细报表</el-breadcrumb-item><!--(完刘观峰)-->
			</el-breadcrumb>
		</div>
		
		<!--查询模块-->
		<div class="edit_module">
	      	<el-form  ref="form" >
	        	<el-row class="edit_module_search">
		          	<el-col :span="8">
					  	<el-form-item :label="$t('denialOfApproval.beginTime')" ><!--申请起始时间-->
						    <el-col :span="14">
							    <el-form-item prop="date1">
							        <el-date-picker type="date" v-model="beginTime" style="width: 100%;"></el-date-picker>
							    </el-form-item>
						    </el-col>
						</el-form-item>
		          	</el-col>
		          	<el-col :span="8">
					  	<el-form-item :label="$t('denialOfApproval.endTime')"><!--申请结束时间-->
						    <el-col :span="14">
							    <el-form-item prop="date1">
							        <el-date-picker type="date" v-model="endTime" style="width: 100%;"></el-date-picker>
							    </el-form-item>
						    </el-col>
						</el-form-item>
		          	</el-col>
		          	<el-col :span="8">
					  	<div class="edit_module_btn">
					  		<el-button type="primary" icon="el-icon-plus"  @click="downLoad(dataList)">{{$t('denialOfApproval.down')}}</el-button><!--导出当前页-->
					  		<el-button type="primary" icon="el-icon-plus"  @click="downLoad()">{{$t('denialOfApproval.downAll')}}</el-button><!--导出全部-->
					  		<!--<el-button type="primary" icon="el-icon-plus"  @click="downLoad(dataList)">{{$t('denialOfApproval.downQuery')}}</el-button>--><!--导出-->
					  		<el-button type="warning" icon="el-icon-search" @click="getDataList()">{{$t('Query')}}</el-button><!--查询按钮-->
					  	</div>
					</el-col>
	        	</el-row>  
	      	</el-form>
	    </div>
	    
	    <!--列表模块-->
	    <div class="list_module">
	    	<div class="table_body">
	    		<h4>{{$t('denialOfApproval.tableList')}}</h4><!--报表管理列表-->
	    		<el-table :data="dataList" border style="width: 100%"   size='small'>
	    			<el-table-column prop="channelNo" :label="$t('denialOfApproval.channelNo')" align="center" ></el-table-column>
	    			<el-table-column prop="applyType" :label="$t('denialOfApproval.applyType')" align="center" ></el-table-column>
	    			<el-table-column prop="prodName" :label="$t('denialOfApproval.prodName')" align="center" ></el-table-column>
	    			<el-table-column prop="apprName" :label="$t('denialOfApproval.apprName')" align="center" ></el-table-column>
	    			<el-table-column prop="apprIdType" :label="$t('denialOfApproval.apprIdType')" align="center" ></el-table-column>
	    			<el-table-column prop="apprIdNum" :label="$t('denialOfApproval.apprIdNum')" align="center" ></el-table-column>
	    			<el-table-column prop="mobilephone" :label="$t('denialOfApproval.mobilephone')" align="center" ></el-table-column>
	    			<el-table-column prop="applyDate" :label="$t('denialOfApproval.applyDate')" align="center" ></el-table-column>
	    			<el-table-column prop="finalstrategyrest" :label="$t('denialOfApproval.finalstrategyrest')" align="center" ></el-table-column>
	    			<el-table-column prop="finalapplydate" :label="$t('denialOfApproval.finalapplydate')" align="center" ></el-table-column>
	    			<el-table-column prop="appUserId" :label="$t('denialOfApproval.appUserId')" align="center" ></el-table-column>
	    			<el-table-column prop="appUserName" :label="$t('denialOfApproval.appUserName')" align="center" ></el-table-column>
	    			<el-table-column prop="dealComment" :label="$t('denialOfApproval.dealComment')" align="center" ></el-table-column>
	    		</el-table>
	    		<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[5, 10, 15, 20,25]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalCount">
				</el-pagination>
	    	</div>
	    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				beginTime:"",
				endTime:"",
				legalPersonNum:this.$store.state.loginData.legalPersonNum, //获取登录状态法人
				dataList:[],
				indexNo:0,//当前页传给后台的当前页 0开头
				currentPage:1,//当前显示第几页 1开头
				pageSize:10,
				totalCount:10,
				
			}
		},
		mounted(){
			this.getDataList();
		},
		methods:{
			getDataList(){
				var FunMsgData1={
					"channelNo": "1",
					"legalPersonNum":this.legalPersonNum,
					"beginTime":this.beginTime,
					"endTime":this.endTime,
					"indexNo": this.indexNo,
					"pageSize": this.pageSize,
				}
				this.$post(this.$guanapi+"/cardRejectDetails/query",FunMsgData1).then(res=>{
					if(res.returnCode=="000000"){
						this.dataList=res.returnData.rows;
						this.totalCount=res.returnData.totalCount;
					}
				})
			},
			downLoad(dataList){
				if(this.beginTime!=""){
					var beginTime=this.timeChange(this.beginTime)
				}else{
					var beginTime=this.beginTime
				}
				if(this.endTime!=""){
					var endTime=this.timeChange(this.endTime)
				}else{
					var endTime=this.endTime
				}
				if(dataList==undefined){//导出全部
					location.href=this.$guanapi+"/cardRejectDetails/downloadAll"
				}else{//导出当前页
					location.href=this.$guanapi+"/cardRejectDetails/download?beginTime="+beginTime+"&endTime="+endTime+"&indexNo="+this.indexNo+"&pageSize="+this.pageSize+"&channelNo=1"
				}
				
			},
			//中国标准时间转化为年月日
			formatTen(num){
				return num > 9 ? (num + "") : ("0" + num);
			},
			timeChange(time){
				var d=new Date(time);
				var year=d.getFullYear();
				var month=d.getMonth() + 1;
				var day=d.getDate();
				return year+"-"+ this.formatTen(month)+"-"+this.formatTen(day)
			},
			//改变每页显示多少条
			handleSizeChange(val) {
				this.pageSize =  val;
				this.currentPage = 0;
				this.getDataList();
			},
			//选择页数改变数据
			handleCurrentChange(val){
//				this.indexNo = (val-1)*this.pageSize ;
				this.indexNo=val-1;
				this.currentPage=val;
				this.getDataList(); 
			},
		}
	}
</script>

<style>
	.el-form-item{padding:0}
</style>
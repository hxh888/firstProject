<template>
	<!--报表管理》报表管理-->
	<div class="content_box" id="fun_content">
		<!-- 面包屑 -->
    	<div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >报表管理</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >已签约明细</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<!--查询模块-->
		<div class="edit_module">
	      	<el-form  ref="form" >
	        	<el-row class="edit_module_search">
		          	<el-col :span="8">
					  	<el-form-item label="申请起始时间"><!--申请起始时间-->
						    <el-col :span="14">
							    <el-form-item prop="date1">
							        <el-date-picker type="datetime" placeholder="选择日期" v-model="data" style="width: 100%;"></el-date-picker>
							    </el-form-item>
						    </el-col>
						</el-form-item>
		          	</el-col>
		          	<el-col :span="8">
					  	<el-form-item label="申请结束时间"><!--申请结束时间-->
						    <el-col :span="14">
							    <el-form-item prop="date1">
							        <el-date-picker type="datetime" placeholder="选择日期" v-model="data" style="width: 100%;"></el-date-picker>
							    </el-form-item>
						    </el-col>
						</el-form-item>
		          	</el-col>
		          	<el-col :span="8">
					  	<div class="edit_module_btn">
					  		<el-button type="primary" icon="el-icon-plus"  @click="openFunDiolog()">{{$t('Add')}}</el-button><!--新增-->
					  		<el-button type="warning" icon="el-icon-search">{{$t('Query')}}</el-button><!--查询按钮-->
					  	</div>
					</el-col>
	        	</el-row>  
	      	</el-form>
	    </div>
	    
	    <!--列表模块-->
	    <div class="list_module">
	    	<div class="table_body">
	    		<h4>报表管理列表</h4>
	    		<el-table :data="dataList" border style="width: 100%"   size='small'></el-table>
	    		<!--<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column>-->
	    	</div>
	    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data:"",
				indexNo:0,
				pageSize:10,
				dataList:[]
			}
		},
		mounted(){
//			this.getDataList();
		},
		methods:{
			getDataList(){
				var FunMsgData1={
					"channelNo": "1",
					"indexNo": this.indexNo,
					"pageSize": this.pageSize,
				}
				this.$post(this.$tabapi,FunMsgData1).then(res=>{
				})
			}
		}
	}
</script>

<style>
	.el-form-item{padding:0}
</style>
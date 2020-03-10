<template>
	<div class="content_box" id="pm_content">
		<!-- 列表模块开始 -->
		<div class="list_module">
			<div class="table_body">
					<h4>{{$t('details.splsxq')}}</h4><!-- 审批历史详情 -->
					<el-table :data="tableData" border style="width: 100%"   size='small' align="center" :empty-text="$t('noData')">
						<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!-- 序号 -->
						<el-table-column property="activityName" :label="$t('toDoTasks.activityName')" min-width="250px" align="center"></el-table-column><!-- 审批岗位 -->
					    <el-table-column property="userName" :label="$t('toDoTasks.userName')" min-width="210" align="center"></el-table-column><!-- 审批人员 -->
					    <el-table-column property="updateTime" :label="$t('doDate')" min-width="150px" align="center"><!-- 处理日期 -->
					    	<template slot-scope="scope">
					    		<!--{{scope.row.updateTime.slice(0,10)}}-->
					    		{{scope.row.doneDate}}
					    	</template>
					    </el-table-column>
					    <el-table-column property="updateTime" :label="$t('doTime')" align="center" min-width="145px"><!-- 处理时间 -->
					    	<template slot-scope="scope">
					    		<!--{{scope.row.updateTime.slice(10,)}}-->
					    		{{scope.row.doneTime}}
					    	</template>
					    </el-table-column>
					    <el-table-column property="handleResult" :label="$t('toDoTasks.handleResult')" align="center" min-width="265px"><!-- 审批结果 -->
					    	<template slot-scope="scope">
					    		<span v-if="scope.row.handleResult==1">{{$t('compoundPost.adopt')}}</span><!-- 通过 -->
					    		<span v-if="scope.row.handleResult==0">{{$t('compoundPost.refuse')}}</span><!-- 拒绝 -->
					    		<span v-if="scope.row.handleResult==2">{{$t('compoundPost.back')}}</span><!-- 退回 -->
					    	</template>
					    </el-table-column>
					    <el-table-column property="handleDesc" :label="$t('toDoTasks.approvalNote')" align="center" min-width="165px"></el-table-column><!-- 审批说明 -->
					</el-table>
				</div>
		</div>
		<!--列表模块结束-->
	</div>
</template>

<script>
	export default {
		name: 'DetailsOfApprovalHistory',
		data () {
			return {
				tableData:[
					{spgw:"人工审批岗位",spry:"王五",clrq:"2019-06-13",clsj:"13:21",spjg:1,spsm:"已经与客户确认，职位是本周刚升职"},
					{spgw:"人工审批岗位",spry:"赵六",clrq:"2019-06-18",clsj:"14:21",spjg:0,spsm:"请核查学历"},
					{spgw:"人工审批岗位",spry:"王五",clrq:"2019-06-12",clsj:"16:21",spjg:1,spsm:"已经与客户确认，职位是本周刚升职"},
					{spgw:"人工审批岗位",spry:"张三",clrq:"2019-06-20",clsj:"13:47",spjg:1,spsm:"已经与客户确认，职位是本周刚升职"},
					{spgw:"人工审批岗位",spry:"王五",clrq:"2019-06-13",clsj:"11:28",spjg:1,spsm:"同意"},
				]
			}
		},
		mounted(){
			this.initData()
		},
		methods:{
			initData(){
				var obj={
					applyId:this.$route.query.applyId,
					legalPersonNum:this.$route.query.legalPersonNum,
					userId:this.$route.query.userId
				}
//				this.$post(this.$approve+"/WFTask/CardWfHisLis",obj).then(res=>{
				this.$post(this.$approve+"/WFTask/cardProcessedDetail",obj).then(res=>{
					if(res.code=="000000"){
						this.tableData=res.data
					}
				})
			}
		}
	}
</script>

<style>
</style>
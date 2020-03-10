<template>
	<!-- 消费贷产品管理录入 -->
   <div class="content_box">
		<!-- 面包屑 -->
		<div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item >产品中心</el-breadcrumb-item>
				<el-breadcrumb-item >消费贷</el-breadcrumb-item>
				<el-breadcrumb-item class="active" >消费贷产品管理录入</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--面包屑结束-->
		<router-view/>	

	</div>
</template>

<script>
export default {
  data () {
	return{

	}
  },
}
</script>

<style scoped>
</style>

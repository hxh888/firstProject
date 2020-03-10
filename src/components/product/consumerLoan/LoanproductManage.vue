<template>
<!-- 消贷产品管理 -->
  <div class="content_box">
  	<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >消费贷</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >消贷产品管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--面包屑结束-->
		<!-- 编辑模块(搜索新增查询) 开始-->
    <div class="edit_module">
		<el-form :inline="true"  class="demo-form-inline">
			<el-row>
				<el-col :span="18">
					<el-form-item label="产品名称"> 	<!-- 产品名称 -->
						<el-input v-model="queryFunName"  @input="onChangequery()"></el-input>
					</el-form-item>

					<el-form-item label="产品编号">     	<!-- 产品编号 -->
						<el-input v-model="queryNum"  @input="onChangequery()"></el-input>
					</el-form-item>

					<el-form-item label="产品状态">  	<!-- 产品状态 -->
					<el-select v-model="queryStatus">
						<el-option  :value="item.bizTypePropCode" 
									v-for="(item,index) in templateStatusList" 
									:key="index"  :label="item.bizTypePropName"  >{{item.bizTypePropName}}</el-option>
					</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6" class="edit_module_btn" >
				<el-form-item>
					<el-button type="warning" icon="el-icon-search" @click="initsysTemplateTList()" >查询</el-button>  <!--查询按钮-->
				</el-form-item>
				</el-col>
			</el-row>  
		</el-form>

     
    </div>
    <!-- 编辑模块(搜索新增查询)结束 -->
    
    <!-- 列表模块开始-->
    <div class="list_module">
	    	<div class="table_body">
					<h4>{{$t('loanproductManage.product_list')}}</h4><!--消贷产品列表-->
					<el-table :data="tableData" border style="width: 100%"   size='small'>
							<el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
							<el-table-column prop="index" type="index" :label="$t('legalPerson.Serial_number')" align="center"  width="60px"></el-table-column><!--序号-->
							<el-table-column prop="productName" :label="$t('loanproductManage.product_name')"  align="center"> </el-table-column><!--产品名称-->
							<el-table-column prop="productNum" label="产品编号"  align="center"> </el-table-column><!--产品编号-->
							<el-table-column prop="productSelect" label="产品分类"  align="center"> </el-table-column><!--产品分类-->
							<el-table-column prop="productDate" label="生效日期"  align="center"> </el-table-column><!--生效日期-->
							<el-table-column prop="productDate1" label="到期日期"  align="center"> </el-table-column><!--到期日期-->
							<el-table-column prop="productType" label="产品状态"  align="center"> </el-table-column><!--产品状态-->
							<el-table-column :label="$t('group.Operation')" align="center"  width="180px">
								<template slot-scope="scope">
										<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
											<i class="el-icon-search"></i>
											<span class="text">{{$t('loanproductManage.View')}}</span><!--查看-->
										</el-button>
								</template>
							</el-table-column>
					</el-table>
					<!--<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[5, 10, 15, 20,25]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="totalCount">
					</el-pagination>-->
				</div>
			</div>
		<!--列表模块结束-->
  	
  </div>
</template>

<script>
export default {
  name: 'MainIndex',
  data () {
    return {
	  queryFunName: '', //产品名称
	  queryNum:'', //产品编号
	  queryStatus:'',//产品状态
	  
      tableData:[
      	{
      		productName:"产品名称",
      		productNum:"产品编号",
      		productSelect:"产品分类",
      		productDate:"生效日期",
      		productDate1:"到期日期",
      		productType:"产品状态"
      	},
      	{
      		productName:"产品名称",
      		productNum:"产品编号",
      		productSelect:"产品分类",
      		productDate:"生效日期",
      		productDate1:"到期日期",
      		productType:"产品状态"
      	},
      ]
    }
  },
  methods:{
  	allSearch(){
  		alert("nihao")
  	}
  }
}
</script>

<style scoped>
	.edit_module_btn{text-align: right; margin-top:20px;}
</style>

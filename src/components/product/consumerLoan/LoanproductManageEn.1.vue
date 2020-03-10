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
					<el-select v-model="queryStatus" >
						<el-option value="">请选择..</el-option><!-- 请选择 -->
						<el-option  :value="item.bizTypePropCode" 
									v-for="(item,index) in funs1" 
									:key="index"  :label="item.bizTypePropName"  >{{item.bizTypePropName}}</el-option>
					</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6" class="edit_module_btn" >
				<el-form-item>
					<el-button type="warning" icon="el-icon-search" @click="initLoanProductList()" >查询</el-button>  <!--查询按钮-->
				</el-form-item>
				</el-col>
			</el-row>  
		</el-form>
    </div>
    <!-- 编辑模块(搜索新增查询)结束 -->
    
    <!-- 列表模块开始-->
    <div class="list_module">
		<div class="table_body">
			<el-table :data="tableData" border style="width: 100%"   size='small'>
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center"  width="60px"></el-table-column><!--序号-->
					<el-table-column prop="productName" :label="$t('loanproductManage.product_name')"  align="center"> </el-table-column><!--产品名称-->
					<el-table-column prop="productNum" label="产品编号"  align="center"> </el-table-column><!--产品编号-->

					<el-table-column prop="productTypee" label="产品分类"  align="center"> </el-table-column><!--产品分类-->
					
					<el-table-column prop="effectiveDate" label="生效日期"  align="center"> </el-table-column><!--生效日期-->
					<el-table-column prop="expirationDate" label="到期日期"  align="center"> </el-table-column><!--到期日期-->
					<el-table-column prop="statusVal" label="产品状态"  align="center"> </el-table-column><!--产品状态-->
					<el-table-column prop="apprStatusVal" label="审批状态"  align="center"> </el-table-column><!--审批状态-->
					<el-table-column :label="$t('group.Operation')" align="center"  width="180px">
						<template slot-scope="scope">
							<el-button size="mini" class="edit-btn"  type="primary" @click="seeItem(scope.row)">
								<i class="iconfont icon-chakan"></i>
								<span class="text">{{$t('loanproductManage.View')}}</span><!--查看-->
							</el-button>
							<el-button size="mini"  class="edit-btn" @click="editItem(scope.row)"  v-if="scope.row.apprstatus == 1" :disabled="true">
								<i class="el-icon-edit"></i>
								<span class="text">编辑</span><!--编辑-->
							</el-button>
							<el-button size="mini" class="edit-btn" @click="editItem(scope.row)"  v-else>
								<i class="el-icon-edit"></i>
								<span class="text">编辑</span><!--编辑-->
							</el-button>
						</template>
					</el-table-column>
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
	<!--列表模块结束-->

  	</div>
</template>

<script>
export default {
  data () {
    return {
		queryFunName: '', //产品名称
		queryNum:'', //产品编号
		queryStatus:'', //产品状态
		funs1:[], //初始化产品状态
		funs2:[], //产品分类
		funs3:[], //审批状态
		tableData:[], //table数据
		
		currentPage:1,//当前显示第几页 1开头
		pageSize:5,//一页显示几条数据
		totalCount:10,//一共有多少条数据
		indexNo:0,  //需要传过去的参数

    }
  },
  mounted(){
	this.initStatus();  //初始化产品状态
	this.initLoanProductList();  //初始化消费贷产品管理录入列表
  },
  methods:{
	//初始化消费贷产品管理录入列表
    initLoanProductList(){
		 if (this.queryFunName != undefined && this.queryFunName != ""||this.queryNum !=undefined &&this.queryNum !=""|| this.queryStatus != undefined && this.queryStatus != "") {
			var ProductListMsgData2 = {
				"channelNo": "1",
				"transCode": "SETLOANPRO303",
				"productName": this.queryFunName,
				"productNum" :this.queryNum,
				"status": this.queryStatus,
				"indexNo": this.indexNo,
				"pageSize": this.pageSize
			};
			this.$post(this.$api,ProductListMsgData2).then(res=>{
				if(res.returnMsg=="OK"){
					for(var i=0;i<res.rows.length;i++){
						var obj = res.rows[i];
						obj.statusVal = this.getEnumValue(this.funs1,obj.status);
						obj.productTypee = this.getEnumValue(this.funs2,obj.productType);
						obj.apprStatusVal= this.getEnumValue(this.funs3,obj.apprstatus);
					};
					this.tableData = res.rows;
					this.totalCount = res.totalCount;
				}else{
					this.tableData = res.rows;
				}
			})
		}else{
			var ProductListMsgData2 = {
				"channelNo": "1",
				"transCode": "SETLOANPRO303",
				"indexNo": this.indexNo,
				"pageSize": this.pageSize
			};
			this.$post(this.$api,ProductListMsgData2).then(res=>{
				if(res.returnMsg=="OK"){
					for(var i=0;i<res.rows.length;i++){
						var obj = res.rows[i];
						obj.statusVal = this.getEnumValue(this.funs1,obj.status);
						obj.productTypee = this.getEnumValue(this.funs2,obj.productType);
						obj.apprStatusVal= this.getEnumValue(this.funs3,obj.apprstatus);
					};
					this.tableData = res.rows;
					this.totalCount = res.totalCount;
				}else{
					this.$message({
						message:res.returnMsg,
						type: 'warning' 
					})
				}
			})

		}
		
    },
	//初始化
	initStatus(){
		//产品状态
		var funMsgDataSelpro = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LN_ProdStatus"
		}
		this.$post(this.$api,funMsgDataSelpro).then(res=>{
			this.funs1 = res.rows;
		});

		//产品分类
		var funMsgDataSelproa = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LN_BussType"
		}
		this.$post(this.$api,funMsgDataSelproa).then( res=>{
			this.funs2 = res.rows;
		});

		//审批状态
		var funMsgDataSelpro = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LN_ProStatus"
		}
		this.$post(this.$api,funMsgDataSelpro).then( res=>{
			this.funs3 = res.rows;
		});
	},
	//查看
	seeItem(row){
		var productforViewData={
			"channelNo":"1",
			"transCode":"SETLOANPRO401",
			"productId":row.id,
			"queryIDen":"queryIDen"
		}
		this.$post(this.$api,productforViewData).then(res=>{
			if(res.returnMsg=="OK"){
				res.flag="loanproductManageEn";
				this.$router.push({path:'/MainIndex/productManageView',params:{ dataObj:res}})
			}else{
				this.$message({
					message:res.returnMsg,
					type: 'warning' 
				})
			}
			// $state.go('MainIndex.productManageView',{'p':objc});
		});
	},
	//监听搜索框为空的时候展示全部数据
    onChangequery(){
        this.initLoanProductList();
    },
	// 字典信息匹配
    getEnumValue(enumData, value){
      if( enumData != null ){
        var i = 0, len = enumData.length;
        for(; i < len; i++) {
          if(enumData[i].bizTypePropCode == value) {
            return enumData[i].bizTypePropName;
          }
        }
      }
      return value;
    },
    //改变每页显示多少条
    handleSizeChange(val) {
	  this.pageSize =  val;
	  this.indexNo = 0
      this.initLoanProductList();
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.indexNo = (val-1)*this.pageSize ;
      this.initLoanProductList(); 
    },
	  

  }
}
</script>

<style scoped>
</style>

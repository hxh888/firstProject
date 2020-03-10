<template>
<!-- 消费贷产品管理录入看看 -->
  <div class="content_box">
	<!-- 产品信息 -->
    <div class="section section1 mt20">
		<h3 class="">产品信息</h3>
		<el-form  label-width="120px" size="small" >
			<el-row>
				<el-col :span="6">
					<el-form-item label="产品名称" prop="productFunName">    
						<el-input  v-model="this.message.productName" :disabled="true"></el-input>      <!-- 产品名称 -->
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="业务分类" prop="productType">    
						<el-select v-model="this.message.productType" placeholder="请选择" :disabled="true">    <!-- 业务分类 -->
							<el-option  v-for='(item,index) in productTypeArr' :key="index"
									:label="item.bizTypePropName" 
									:value="item.bizTypePropCode" ></el-option>
							
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="发布渠道" prop="pubChannelNo">
						<el-select v-model="this.message.pubChannelNo" placeholder="请选择" :disabled="true">    <!-- 发布渠道 -->
								<el-option  v-for='(item,index) in pubChannelNoArr' :key="index"
											:label="item.bizTypePropName" 
											:value="item.bizTypePropCode" ></el-option>
							
						</el-select>
					</el-form-item>
				</el-col>
				
				<el-col :span="6">
					<el-form-item  label="核心额度节点编号" prop="busQuotaId"  label-width="150px">
						<el-input  v-model="this.message.busQuotaId" :disabled="true"></el-input>  <!-- 核心额度节点编号 -->
					</el-form-item>
				</el-col>


				<el-col :span="6">
					<el-form-item label="核算产品编号" prop="accountProductNum">
						<el-input  v-model="this.message.accountProductNum" :disabled="true"></el-input>  <!-- 核算产品编号 -->
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="产品状态" prop="status">
						<el-select v-model="this.message.status" placeholder="请选择" :disabled="true">    <!-- 产品状态 -->
							<el-option  v-for='(item,index) in statuslist' :key="index"
											:label="item.bizTypePropName" 
											:value="item.bizTypePropCode" ></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="生效日期" prop="effectiveDate">
						<el-input  v-model="this.message.effectiveDate" :disabled="true"></el-input >  <!-- 生效日期 -->
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="到期日期" prop="expirationDate">
						<el-input  v-model="this.message.expirationDate" :disabled="true"></el-input>  <!-- 到期日期 -->
					</el-form-item>
				</el-col>

				<el-col :span="24">
					<el-form-item label="产品说明" prop="remark">
						<el-input type="textarea"  v-model="this.message.remark" :disabled="true"></el-input>  <!-- 产品说明 -->
					</el-form-item>
				</el-col>

			</el-row>
		</el-form>
	</div>
	<!--产品信息-->

	<!-- 电话核查模板信息 -->
    <div class="section section2 mt10">
		<h3 class="">电话核查模板信息</h3>
		<div class="table_height">
			<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
				<thead>
					<tr role="row">
						<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
						<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>话术类型<!-- 话术类型--></th>
						<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>话术内容<!-- 话术内容--></th>
					</tr>
				</thead>
				<tbody>
					<tr class="odd" v-for="(item,index) in moneysList" :key='index'>
						<td class="text-center">{{index+1}}</td>   <!-- 序号-->

						<td class="text-center" >  <!-- 话术类型-->
							<el-select style="width:90%;" size="mini" v-model="item.formworkType" placeholder="请选择" >
								<el-option v-for="(i,index) in caseLevelList" 
									:key="index" 
									:label="i.bizTypePropName" 
									:value="i.bizTypePropCode">{{i.bizTypePropName}}
								</el-option>
							</el-select>
						</td>

						<td class="text-center">  <!-- 话术内容-->
							<el-input type="textarea" v-model="item.formworkTxt"  size="mini"  class="form-control"></el-input>
						</td> 
					
					</tr>
				</tbody>
				<!-- <div v-if="this.moneysList = [] " class="nomore">
					暂无数据
				</div> -->
			</table>
		</div>
	</div>
	<!--电话核查模板信息-->

	<!-- 合同模板信息 -->
    <div class="section section3 mt10">
		<h3 class="">合同模板信息</h3>
		<div class="table_height">
			<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
				<thead>
					<tr role="row">
						<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
						<th colspan="1" rowspan="1" class="text-center sorting">合同模板名称<!-- 合同模板名称--></th>
					</tr>
				</thead>
				<tbody >
					<tr class="odd" v-for="(item,index) in contractList" :key='index'>
						<td class="text-center">{{index+1}}</td>   <!-- 序号-->

						<td class="text-center">  <!-- 话术内容-->
							合同模板名称
						</td> 
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!--合同模板信息-->
	
	<!-- 放款卡表管理信息 -->
    <div class="section section4 mt10">
		<h3 class="">放款卡表管理信息</h3>
		<div class="table_height">
			<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
				<thead>
					<tr role="row">
						<th colspan="1" rowspan="1" class="text-center sorting">银行编号<!-- 银行编号--></th>
						<th colspan="1" rowspan="1" class="text-center sorting">银行名称<!-- 合同模板名称--></th>
					</tr>
				</thead>
				<tbody >
					<tr class="odd" v-for="(item,index) in cardTableList" :key='index'>
						<td class="text-center">{{index+1}}</td>   <!-- 银行编号-->

						<td class="text-center">  <!-- 放款卡表管理信息-->
							放款卡表管理信息
						</td> 
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!--放款卡表管理信息-->

	<!-- 工作流配置信息 -->
    <div class="section section4 mt10">
		<h3 class="">工作流配置信息</h3>
		<div class="table_height">
			<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
				<thead>
					<tr role="row">
						<th colspan="1" rowspan="1" class="text-center sorting">流程定义编号<!-- 流程定义编号--></th>
						<th colspan="1" rowspan="1" class="text-center sorting">渠道类型<!-- 渠道类型--></th>
					</tr>
				</thead>
				<tbody >
					<tr class="odd" v-for="(item,index) in proWorkflowList" :key='index'>
						<td class="text-center">{{index+1}}</td>   <!-- 流程定义编号-->

						<td class="text-center">  <!-- 渠道类型-->
							渠道类型
						</td> 
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!--工作流配置信息-->

	<!-- 产品组件信息 -->
    <div class="section section5 mt10">
		<h3 class="">产品组件信息</h3>
		<div>
			<h4>定价信息</h4> 
			<el-form label-width="200px" size="small" >
				<el-row>
					<el-col :span="8">
						<el-form-item label="挪用利率上浮比例(%)" prop="productFunName">    
							<el-input  v-model="this.message.productFunName" :disabled="true"></el-input>      <!-- 挪用利率上浮比例(%) -->
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="提前还款违约比例(%)" prop="productFunName">    
							<el-input  v-model="this.message.productFunName" :disabled="true"></el-input>      <!-- 提前还款违约比例(%) -->
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="逾期利率方式" prop="productType">    
							<el-select v-model="this.message.productType" placeholder="请选择" :disabled="true">    <!-- 逾期利率方式 -->
								<el-option label="未启用" value="0"></el-option>
								<el-option label="启用" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="利率自动调整方式" prop="pubChannelNo">
							<el-select v-model="this.message.pubChannelNo" placeholder="请选择" :disabled="true">    <!-- 利率自动调整方式 -->
							<el-option label="未启用" value="0"></el-option>
							<el-option label="启用" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="定价规则模型" prop="pubChannelNo">
							<el-select v-model="this.message.pubChannelNo" placeholder="请选择" :disabled="true">    <!-- 定价规则模型 -->
							<el-option label="未启用" value="0"></el-option>
							<el-option label="启用" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					
					<el-col :span="6">
						<el-form-item label="固定逾期利率/上浮比例(%)" prop="accountProductNum">
							<el-input  v-model="this.message.accountProductNum" :disabled="true"></el-input>  <!-- 固定逾期利率/上浮比例(%) -->
						</el-form-item>
					</el-col>

					<el-col :span="6">
						<el-form-item label="允许组合定价">   
							<el-checkbox name="type" checked :disabled="true"></el-checkbox>  <!-- 允许组合定价 -->
						</el-form-item>
					</el-col>

					<el-col :span="6">
						<el-form-item label="允许提前还款无手续费">   
							<el-checkbox name="type" :disabled="true"></el-checkbox>  <!-- 允许提前还款无手续费 -->
						</el-form-item>
					</el-col>

					<el-col :span="6">
						<el-form-item label="是否自动调整利率">   
							<el-checkbox name="type" :disabled="true"></el-checkbox>  <!-- 是否自动调整利率 -->
						</el-form-item>
					</el-col>

					<el-col :span="6">
						<el-form-item label="是否预收息">   
							<el-checkbox name="type" :disabled="true"></el-checkbox>  <!-- 是否预收息 -->
						</el-form-item>
					</el-col>

				</el-row>
			</el-form>
			<el-table  class="mt20" :data="priceData" border style="width: 100%"   size='small'>
				<el-table-column prop="index" type="index" label="期限" align="center"  width="60px"></el-table-column><!--期限-->

				<el-table-column prop="productName" label="单位"  align="center"> </el-table-column><!--单位-->

				<el-table-column prop="productNum" label="基准利率"  align="center"> </el-table-column><!--基准利率-->

				<el-table-column prop="productTypee" label="浮动方式"  align="center"> </el-table-column><!--浮动方式-->

				<el-table-column prop="productTypee" label="浮动值"  align="center"> </el-table-column><!--浮动值-->

				<el-table-column prop="productTypee" label="执行利率"  align="center"> </el-table-column><!--执行利率-->

				<el-table-column prop="effectiveDate" label="收费方式"  align="center"> </el-table-column><!--收费方式-->

				<el-table-column prop="expirationDate" label="每期费率(%)"  align="center"> </el-table-column><!--每期费率(%)-->

				<el-table-column prop="statusVal" label="固定费用"  align="center"> </el-table-column><!--固定费用-->
			</el-table>
		</div>
		
		<div class="mt20">
			<h4>还款方式信息</h4> 
			<el-table :data="refundData" border style="width: 100%"   size='small'>
					<el-table-column prop="index" label="还款方式编号" align="center" ></el-table-column><!--还款方式编号-->

					<el-table-column prop="productName" label="还款方式名称"  align="center"> </el-table-column><!--还款方式名称-->

					<el-table-column prop="productNum" label="还款方式分类"  align="center"> </el-table-column><!--还款方式分类-->

					<el-table-column prop="productTypee" label="基准还款方式"  align="center"> </el-table-column><!--基准还款方式-->
					
					<el-table-column prop="effectiveDate" label="创建人"  align="center"> </el-table-column><!--创建人-->

					<el-table-column prop="expirationDate" label="创建时间"  align="center"> </el-table-column><!--创建时间-->

			</el-table>
		</div>
		
	</div>
	<!--产品组件信息-->

  	</div>
</template>

<script>
export default {
  data () {
    return {
		id:'', //产品id
		apprStatus:'', //查询标识

		productTypeArr:[],//业务分类
		pubChannelNoArr:[],//发布渠道
		statuslist:[],//产品状态

		message:{},  //接受传过来的对象
		moneysList:[],//电话核查模板信息
		caseLevelList:[],//话术模板字典
		contractList:[],//合同模板信息
		cardTableList:[],//放款卡表管理信息
		proWorkflowList:[],//工作流配置信息
		
		priceData:[], //产品组件信息 定价信息
		refundData:[] //产品组件信息 还款方式信息
    }
  },
  created(){
	this.initSlectOption(); //初始化下拉框内容
  },
  mounted(){
	this.initLoanProductManage(); //获取传过来的数据
  },
  methods:{
	//获取传过来的数据
	initLoanProductManage(){
		this.message =  this.$store.state.productManageView;
		this.id = this.$store.state.productManageView.id;
		this.apprStatus= this.$store.state.productManageView.apprstatus;

		//电话核查模板信息，查询pd表
 		if(this.apprStatus != null || this.apprStatus != undefined){
 			var sign = this.apprStatus;
 		}
		var ProductListMsgData1 = {
            "channelNo": "1",
            "transCode": "SETLOANFWLIST",
            "queryFlag": "1",
            "productLoanId":this.id,//产品ID
            "querySign":sign,//查询标识
		};
        this.$post(this.$api, ProductListMsgData1).then( res=>  {
            if(res.returnMsg=="OK"){
			 	if (res.formworkList.length > 0) {
					this.moneysList = res.formworkList;
				}else {
					this.moneysList = [];
				}
            }
		});
		

		
	},
	//初始化下拉框内容
	initSlectOption(){
		//业务分类
		var funMsgDataSelproa = {
				"channelNo":"1",
		 		"transCode":"SETPARARGS301",
		 		"bizTypeCode":"LN_BussType"
		}
		this.$post(this.$api,funMsgDataSelproa).then( res=>{
			this.productTypeArr = res.rows;
   	 	});
		//发布渠道
		var funMsgDataSelprobp = {
				"channelNo":"1",
		 		"transCode":"SETPARARGS301",
		 		"bizTypeCode":"LN_ChannelNo"
		}
		this.$post(this.$api,funMsgDataSelprobp).then( res=> {
			this.pubChannelNoArr = res.rows;
		});
		//产品状态
		var funMsgDataSelproa = {
			"channelNo":"1",
			"transCode":"SETPARARGS301",
			"bizTypeCode":"LOAN_RELE_STATUS"
		}
		this.$post(this.$api,funMsgDataSelproa).then( res=> {
			this.statuslist = res.rows;
		});
		//话术模板字典
 		var formworkTypeData = {
            "channelNo": "1",
            "transCode": "SETPARARGS301",
            "bizTypeCode": "APPI_FORMWORK_TYPE"
        };
        this.$post(this.$api, formworkTypeData).then( res=>{
            this.caseLevelList = res.rows;
        }); 

		//逾期利率方式
		var GroupListRepaymentWay = {
				"channelNo":"1",
				"transCode":"SETPARARGS301",
				"bizTypeCode":"LN_OverdueMode"
		};
		this.$post(this.$api,GroupListRepaymentWay).then( res=> {
			this.overdueModeList = res.rows;
		});
		//利率自动调整方式
		var GroupListRepaymentWay = {
				"channelNo":"1",
				"transCode":"SETPARARGS301",
				"bizTypeCode":"LN_OverdueMode"
		};
		this.$post(this.$api,GroupListRepaymentWay).then( res=> {
			this.overdueModeList = res.rows;
		});
		//定价规则模型
		var GroupListRepaymentWay = {
				"channelNo":"1",
				"legalNum":"00001",
		 		"transCode":"SETLOANRULEPRIC300",
		 		"indexNo":"0",
		 		"pageSize":"100000"
		}
		this.$post(this.$api,GroupListRepaymentWay).then( res=> {
			this.priceModelTypeList = res.rows;
		});

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
  }
}
</script>

<style scoped lang='scss'>
.section{
	background: #ffffff;
	@include radius(5px);
	padding: 15px;
	h3{
		font-size: 18px;
		line-height: 20px;
		font-weight: normal;
		padding: 6px 0 15px 15px;
		position: relative;
		&:before{
			position: absolute;
			content: "";
			width: 3px;
			height: 20px;
			background: #5BC0DE;
			left: 0;
			top: 6px;
		}
	}
	h4{
		background-color: #eef9fc;
		text-align: center;
		line-height: 45px;
		color: #333;
		font-size: 16px;
	}
}
.table_height{
	// min-height: 80px;
}
.nomore{
	width: 100%;
	position: absolute;
	text-align: center;
	line-height: 45px;
}
</style>

<template>
	<div class="content_box" id="repayment_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
		  	<el-breadcrumb-item >消费贷</el-breadcrumb-item>
		  	<el-breadcrumb-item class="active" >还款方式管理</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<!--面包屑结束-->
	<!-- 编辑模块(搜索新增查询) 开始-->
    <div class="edit_module">
      <el-form  ref="form" > 
        <el-row :gutter="20" class="edit_module_search">
          <el-col :span="8">
          	<div>
				<el-input v-model="repayWayNum"  @input="onChangequery()"><!--还款方式编号-->
				    <template slot="prepend">{{$t('repayment.Repay_method_number')}}</template>
				</el-input>
			</div>
          </el-col>
          <el-col :span="8">
          	<div>
				<el-input v-model="repayWayName"  @input="onChangequery()"><!--还款方式名称-->
				  	<template slot="prepend">{{$t('repayment.Repay_method_name')}}</template>
				</el-input>
			</div>
          </el-col>
          
          <el-col :span="8">
	  		<div class="edit_module_btn">
					<el-button icon="el-icon-refresh" @click="repaymentReset()" >重置</el-button>  <!--重置按钮-->
	  			<el-button type="warning" icon="el-icon-search" @click="queryRepayment()">查询</el-button>    <!--查询按钮-->
	  			<el-button type="primary" icon="el-icon-plus"  @click="repaymentAdd('addForm')">{{$t('repayment.Add')}}</el-button><!--新增按钮-->
	  		</div>
	  	</el-col>
        </el-row>  
      </el-form>
    </div>
    <!-- 编辑模块(搜索新增查询)结束 -->
    
    <!-- 列表模块开始-->
    <div class="list_module">
    	<div class="table_body">
				<h4>{{$t('repayment.Repay_method_list')}}</h4><!--还款方式列表-->
				<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border row-key="id">

			    <el-table-column prop="repayWayNum" :label="$t('repayment.Repay_method_number')" align="center"> </el-table-column><!--还款方式编号-->

			    <el-table-column prop="repayWayName" :label="$t('repayment.Repay_method_name')" align="center"> </el-table-column><!--还款方式名称-->

			    <el-table-column prop="repayModeSortVal" :label="$t('repayment.Repay_method_type')" width="180" align="center"> </el-table-column><!--还款方式分类-->

			    <el-table-column prop="baseRepayModeVal" :label="$t('repayment.Benchmark_repayment_method')" width="180" align="center"></el-table-column><!--基准还款方式-->

			    <el-table-column prop="createrName" :label="$t('repayment.Create_by')" width="180" align="center"> </el-table-column><!--创建人-->

			    <el-table-column prop="createTime" :label="$t('repayment.Create_time')" width="180" align="center"> </el-table-column><!--创建时间-->
			    <el-table-column :label="$t('repayment.Operation')" align="center">
							<template slot-scope="scope">
									<el-button size="mini" type="primary" @click="seeItem(scope.row)">
										<i class="iconfont icon-chakan"></i>
										<span class="text">{{$t('repayment.View')}}</span><!--查看-->
									</el-button>
									<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
										<i class="el-icon-edit"></i>
										<span class="text">{{$t('Edit')}}</span><!--编辑-->
									</el-button>
									<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
										<i class="el-icon-delete"></i>
										<span class="text">{{$t('menu.Delete')}}</span><!--删除-->
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
		
	<!--新增弹框页面开始-->
	<el-dialog title="新增还款方式" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false"  v-if="addForm.edit == 1" >
		<el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" label-width='160px'>
		  	<el-col :span="12">
			    <el-form-item :label="$t('repayment.HKFSFL')" prop="repayModeSort"  > <!--还款方式分类 -->
			      <el-select v-model="addForm.repayModeSort" placeholder="请选择还款方式分类" :disabled="addForm.flag"  >
				      <el-option v-for="(item,index) in repayModeSorts" 
												 :key="index" 
												 :label="item.bizTypePropName" 
												 :value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
				    </el-select>
			    </el-form-item>
			</el-col>
			<el-col :span="12">
			    <el-form-item label="自定义还款名称" prop="repayWayName"  ><!--自定义还款名称-->
			      	<el-input v-model="addForm.repayWayName" ></el-input>
			    </el-form-item>
			</el-col>
			<el-col :span="12">
			    <el-form-item label="规则基准还款方式" prop="baseRepayMode" ><!--规则基准还款方式-->
			      <el-select v-model="addForm.baseRepayMode" placeholder="请选择规则基准还款方式" :disabled="addForm.flag">
				      <el-option v-for="(item,index) in baseRepayModes" 
												:key="index" 
												:label="item.bizTypePropName" 
												:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
				    </el-select>
			    </el-form-item>
			</el-col>
			<el-col :span="12">
		    	<el-form-item  style="opacity:0;">
			      <el-input  ></el-input>
			    </el-form-item>
			</el-col>
		    <el-col :span="12">
			    <el-form-item label="还款间隔" prop="termSpace"  ><!--还款间隔-->
			      <el-select v-model="addForm.termSpace" placeholder="请选择还款间隔类型" :disabled="addForm.flag">
				      <el-option v-for="(item,index) in termSpaces" 
												:key="index" :label="item.bizTypePropName" 
												:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
				    </el-select>
			    </el-form-item>
		    </el-col>
		    <el-col :span="12">
			    <el-form-item label="还款类型" prop="repaymentType" ><!--还款类型-->
			      <el-select v-model="addForm.repaymentType" placeholder="请选择法人代表证件类型" :disabled="addForm.flag">
					      <el-option v-for="(item,index) in repaymentTypes" 
													:key="index" 
													:label="item.bizTypePropName" 
													:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
					  </el-select>
			    </el-form-item>
		    </el-col>
		    <el-col :span="12">
			    <el-form-item label="还款日类型" prop="repaymentDateType" ><!--还款日类型-->
			      <el-select v-model="addForm.repaymentDateType" placeholder="请选择法人代表证件类型" :disabled="addForm.flag">
						      <el-option v-for="(item,index) in repaymentDateTypes" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
						  </el-select>
			    </el-form-item>
		    </el-col>
		    <el-col :span="12">
			    <el-form-item label="指定还款日" prop="repayDay" ><!--指定还款日-->
			      <el-input v-model.number="addForm.repayDay"></el-input>
			    </el-form-item>
		    </el-col>
		    <el-col :span="24">
			    <el-form-item label="还款方式描述" prop="repayModeDesc" ><!--还款方式描述-->
			      <el-input type="textarea" :autosize="{minRows:4, maxRows:6}" v-model="addForm.repayModeDesc" ></el-input>
			    </el-form-item>
		    </el-col>
		</el-form>
	  	<div slot="footer" class="dialog-footer">
		    <el-button  @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
			</div>
	</el-dialog>

	<!--编辑弹框页面开始-->
	<el-dialog title="编辑还款方式" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false"  v-if="addForm.edit == 2" >
		<el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" label-width='160px'>
		  	<el-col :span="12">
			    <el-form-item :label="$t('repayment.HKFSFL')" prop="repayModeSort"  > <!--还款方式分类 -->
			      <el-select v-model="addForm.repayModeSort" placeholder="请选择还款方式分类">
				      <el-option v-for="(item,index) in repayModeSorts" 
												 :key="index" 
												 :label="item.bizTypePropName" 
												 :value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
				    </el-select>
			    </el-form-item>
			</el-col>
			<el-col :span="12">
			    <el-form-item label="自定义还款名称" prop="repayWayName"  ><!--自定义还款名称-->
			      	<el-input v-model="addForm.repayWayName" ></el-input>
			    </el-form-item>
			</el-col>
			<el-col :span="12">
			    <el-form-item label="规则基准还款方式" prop="baseRepayMode" ><!--规则基准还款方式-->
			      <el-select v-model="addForm.baseRepayMode" placeholder="请选择规则基准还款方式" >
				      <el-option v-for="(item,index) in baseRepayModes" 
												:key="index" 
												:label="item.bizTypePropName" 
												:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
				    </el-select>
			    </el-form-item>
			</el-col>
			<el-col :span="12">
		    	<el-form-item  style="opacity:0;">
			      <el-input  ></el-input>
			    </el-form-item>
			</el-col>
		    <el-col :span="12">
			    <el-form-item label="还款间隔" prop="termSpace"  ><!--还款间隔-->
			      <el-select v-model="addForm.termSpace" placeholder="请选择还款间隔类型">
				      <el-option v-for="(item,index) in termSpaces" 
												:key="index" :label="item.bizTypePropName" 
												:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
				    </el-select>
			    </el-form-item>
		    </el-col>
		    <el-col :span="12">
			    <el-form-item label="还款类型" prop="repaymentType" ><!--还款类型-->
			      <el-select v-model="addForm.repaymentType" placeholder="请选择法人代表证件类型" >
					      <el-option v-for="(item,index) in repaymentTypes" 
													:key="index" 
													:label="item.bizTypePropName" 
													:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
					  </el-select>
			    </el-form-item>
		    </el-col>
		    <el-col :span="12">
			    <el-form-item label="还款日类型" prop="repaymentDateType" ><!--还款日类型-->
			      <el-select v-model="addForm.repaymentDateType" placeholder="请选择法人代表证件类型" >
						      <el-option v-for="(item,index) in repaymentDateTypes" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
						  </el-select>
			    </el-form-item>
		    </el-col>
		    <el-col :span="12">
			    <el-form-item label="指定还款日" prop="repayDay" ><!--指定还款日-->
			      <el-input v-model.number="addForm.repayDay"></el-input>
			    </el-form-item>
		    </el-col>
		    <el-col :span="24">
			    <el-form-item label="还款方式描述" prop="repayModeDesc" ><!--还款方式描述-->
			      <el-input type="textarea" :autosize="{minRows:4, maxRows:6}" v-model="addForm.repayModeDesc" ></el-input>
			    </el-form-item>
		    </el-col>
		</el-form>
	  	<div slot="footer" class="dialog-footer">
		    <el-button  @click="cancel()">取 消</el-button>
				<el-button type="primary" @click="editSave()">保存</el-button>
			</div>
	</el-dialog>

	<!--查看弹框页面开始-->
	<el-dialog title="查看还款方式" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false"  v-if="addForm.edit == 3" >
			<el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" label-width='160px'>
					<el-col :span="12">
						<el-form-item :label="$t('repayment.HKFSFL')" prop="repayModeSort"  > <!--还款方式分类 -->
							<el-select v-model="addForm.repayModeSort" placeholder="请选择还款方式分类" :disabled="addForm.flag">
								<el-option v-for="(item,index) in repayModeSorts" 
													:key="index" 
													:label="item.bizTypePropName" 
													:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
							</el-select>
						</el-form-item>
				</el-col>
				<el-col :span="12">
						<el-form-item label="自定义还款名称" prop="repayWayName" ><!--自定义还款名称-->
								<el-input v-model="addForm.repayWayName"   :disabled="addForm.flag"></el-input>
						</el-form-item>
				</el-col>
				<el-col :span="12">
						<el-form-item label="规则基准还款方式" prop="baseRepayMode" ><!--规则基准还款方式-->
							<el-select v-model="addForm.baseRepayMode" placeholder="请选择规则基准还款方式" :disabled="addForm.flag">
								<el-option v-for="(item,index) in baseRepayModes" 
													:key="index" 
													:label="item.bizTypePropName" 
													:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
							</el-select>
						</el-form-item>
				</el-col>
				<el-col :span="12">
						<el-form-item  style="opacity:0;">
							<el-input  ></el-input>
						</el-form-item>
				</el-col>
					<el-col :span="12">
						<el-form-item label="还款间隔" prop="termSpace"  ><!--还款间隔-->
							<el-select v-model="addForm.termSpace" placeholder="请选择还款间隔类型" :disabled="addForm.flag">
								<el-option v-for="(item,index) in termSpaces" 
													:key="index" :label="item.bizTypePropName" 
													:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="还款类型" prop="repaymentType" ><!--还款类型-->
							<el-select v-model="addForm.repaymentType" placeholder="请选择法人代表证件类型" :disabled="addForm.flag">
									<el-option v-for="(item,index) in repaymentTypes" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="还款日类型" prop="repaymentDateType" ><!--还款日类型-->
							<el-select v-model="addForm.repaymentDateType" placeholder="请选择法人代表证件类型" :disabled="addForm.flag">
										<el-option v-for="(item,index) in repaymentDateTypes" 
															:key="index" 
															:label="item.bizTypePropName" 
															:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
								</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="指定还款日" prop="repayDay" ><!--指定还款日-->
							<el-input v-model.number="addForm.repayDay" :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="还款方式描述" prop="repayModeDesc" ><!--还款方式描述-->
							<el-input type="textarea" :autosize="{minRows:4, maxRows:6}" v-model="addForm.repayModeDesc" :disabled="addForm.flag"></el-input>
						</el-form-item>
					</el-col>
			</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button  @click="cancel()">取 消</el-button>
				</div>
		</el-dialog>
		<!--新增弹框页面结束-->
		</div>
	</template>

<script>
export default {
  data () {
    return {
      	repayWayNum:"",  //还款方式编号
		repayWayName:"", //还款方式名称
			
		indexNo:0,//当前从第几条开始显示数据
		currentPage:1,//当前显示第几页 1开头
		pageSize:5,//一页显示几条数据
		totalCount:0,//一共有多少条数据
		
		tableData:[],//页面table数据
		
		dialogFormVisible:false,//新增弹出框页面是否显示
			
		repayModeSorts:[],// 还款方式分类类型
		baseRepayModes:[],//规则基准还款方式
		termSpaces:[],//还款间隔
		repaymentTypes:[],//还款类型
		repaymentDateTypes:[],//还款日类型
			
      addForm:{
      	repayModeSort:"",//还款方式分类
      	repayWayName:"",//自定义还款名称
      	baseRepayMode:"",//规则基准还款方式
      	termSpace:"",//还款间隔
      	repaymentType:"",//还款类型
      	repaymentDateType:"",//还款日类型
      	repayDay:"",//指定还款日
		repayModeDesc:"",//还款方式描述
		
		flag:false,   //是否可输入 默认可以
		edit:1	 //1代表的是新增 2是编辑  3是查看
      },
      rules:{
      	repayModeSort:[
          	{ required: true, message: i18n.t('repayment.Please_repay_method_type'), trigger: 'blur' }
        ],
        repayWayName:[
          	{ required: true, message: '自定义还款名称不能为空', trigger: 'blur' },
        ],
        baseRepayMode:[
        	{ required: true, message: '基准规则还款方式不能为空', trigger: 'blur' },
        ],
        termSpace:[
        	{ required: true, message: '还款间隔不能为空', trigger: 'blur' },
        ],
        repaymentType:[
        	{ required: true, message: '还款类型不能为空', trigger: 'blur' },
        ],
        repaymentDateType:[
        	{ required: true, message: '还款日类型不能为空', trigger: 'blur' },
        ],
        repayModeDesc:[
        	{ required: true, message: '还款方式描述不能为空', trigger: 'blur' },
        ]
      },
    }
	},
	created(){
		this.initRepaymentSlect();  //初始化还款方式分类,方式,间隔,类型
	},
  mounted(){
		this.getRepaymentList();  //初始化还款方式列表
  },
  methods:{
		//初始化还款方式列表
  	getRepaymentList(){
  		var obj={
				"channelNo" : "1",
				"transCode" : "SETLOANREPWAY300",
				"indexNo": this.indexNo,
				"pageSize": this.pageSize,
  		}
  		this.$post(this.$api,obj).then((res)=>{
					if(res.returnMsg =='OK'){
							for(var i=0;i<res.rows.length;i++){
									var obj = res.rows[i];
									obj.repayModeSortVal = this.getEnumValue(this.repayModeSorts,obj.repayModeSort); // 还款方式分类类型
									obj.baseRepayModeVal= this.getEnumValue(this.baseRepayModes,obj.baseRepayMode); //基准还款方式
							};
							

							this.tableData=res.rows
							this.totalCount=res.totalCount
							
					}else{
						  this.$message({
									message:res.returnMsg,
									type: 'warning' 
							})
					}
  	
  		})
		},
		//初始化还款方式分类,方式,间隔,类型
		initRepaymentSlect(){
				//还款方式分类Code值
				var funMsgDataSelprob = {
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_RepayModeSort"
				}
				this.$post(this.$api,funMsgDataSelprob).then(res=>{
					if(res.returnMsg =='OK'){
							this.repayModeSorts = res.rows;
					}
				});

				//规则基准还款方式Code值
				var funMsgDataSelprob0 = {
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_RepaymentWay"
				}
				this.$post(this.$api,funMsgDataSelprob0).then(res=>{
					if(res.returnMsg =='OK'){
							this.baseRepayModes = res.rows;
					}
				});
				//还款间隔Code值
				var funMsgDataSelprob1 = {
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_RepaymentSpace"
				}
				this.$post(this.$api,funMsgDataSelprob1).then(res=>{
					if(res.returnMsg =='OK'){
							this.termSpaces = res.rows;
					}
				});
				//还款类型Code值
				var funMsgDataSelprob2 = {
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_RepaymentType"
				}
				this.$post(this.$api,funMsgDataSelprob2).then(res=>{
					if(res.returnMsg =='OK'){
							this.repaymentTypes = res.rows;
					}
				});
				//还款日Code值
				var funMsgDataSelprob3 = {
						"channelNo":"1",
						"transCode":"SETPARARGS301",
						"bizTypeCode":"LN_RepaymentDateType"
				}
				this.$post(this.$api,funMsgDataSelprob3).then(res=>{
					if(res.returnMsg =='OK'){
							this.repaymentDateTypes = res.rows;
					}
				});

		},
		//列表查询
  	queryRepayment(){
  		var huanKuanMsgData3 ={
  			"channelNo" : "1",
				"transCode" : "SETLOANREPWAY300",
				"repayWayNum" :this.repayWayNum,//还款方式编号
				"repayWayName" :this.repayWayName,//还款方式名称
				"indexNo": this.indexNo,
				"pageSize": this.pageSize,
  		}
  		this.$post(this.$api,huanKuanMsgData3).then((res)=>{
					if(res.returnMsg =='OK'){
							this.tableData=res.rows
							this.totalCount=res.totalCount
					}else{
							this.tableData=[]
					}
					
  		})
		},
		//新增还款方式
  	repaymentAdd(){
			this.dialogFormVisible=true;
			this.addForm.edit=1;
		},
		//确认新增
  	submitAdd(addForm){
			if(this.addForm.repaymentDateType == "0"&& (this.addForm.repayDay==""||this.addForm.repayDay==undefined)){
				 	this.$message({
								message: '还款日类型为固定日时必须指定还款日',
								type: 'warning' 
					})
	 		}else{
				this.$refs[addForm].validate(valid=>{
  				if(valid){
  					var kuanKuanAddMsgData4 = {
  						"channelNo":"1",
							"transCode":"SETLOANREPWAY000",
							"repayModeSort":this.addForm.repayModeSort,//还款方式分类
							"repayWayName":this.addForm.repayWayName,//自定义还款名称
							"baseRepayMode":this.addForm.baseRepayMode,//规则基准还款方式
							"termSpace":this.addForm.termSpace,//还款间隔
							"repaymentType":this.addForm.repaymentType,//还款类型
							"repaymentDateType":this.addForm.repaymentDateType,//还款日类型
							"repayDay":this.addForm.repayDay,//指定还款日
							"repayModeDesc":this.addForm.repayModeDesc,//还款方式描述
						}
  					this.$post(this.$api,kuanKuanAddMsgData4).then(res=>{
  						if(res.returnMsg=="OK"){
								this.dialogFormVisible=false
								this.$refs.addForm.resetFields();
								this.getRepaymentList();
								this.$message({
											message: i18n.t('user.save_successfully'),
											type: 'success' 
								})
  						}else{
								  this.$message({
											message:res.returnMsg,
											type: 'warning' 
									})
							}
  					})
					}
					
  			})
			}
		},
		//点击单个删除按钮
    deleteItem(row){
		  	var feeData = {
					"channelNo" : "1",
					"transCode" : "SETLOANREPWAY100",
					"legalNum" : "00001",
					"repayWayId" : row.repayWayId,
				};
				var _this =this;
				this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
						this.$post(this.$api,feeData).then(function(res){
								if(res.returnMsg == 'OK'){
                    _this.getRepaymentList();
										_this.$message({
											type: 'info',
											message: '删除成功'
										}); 
								}else{
										_this.$message({
											type: 'warning',
											message: res.returnMsg
										}); 
								}
						})
				}).catch(() => {
             
        });
    },
    //点击编辑法人
    editItem(row){
			this.dialogFormVisible=true;
			this.initRepaymentSlect();

      // this.addForm.repayModeSort = row.repayModeSort,//还款方式分类
			this.addForm.repayWayName =  row.repayWayName,//自定义还款名称
			// this.addForm.baseRepayMode =  row.baseRepayMode,//规则基准还款方式
			// this.addForm.termSpace =  row.termSpace,//还款间隔
			// this.addForm.repaymentType =  row.repaymentType,//还款类型
			// this.addForm.repaymentDateType =  row.repaymentDateType,//还款日类型
			this.addForm.repayDay =  row.repayDay,//指定还款日
			this.addForm.repayModeDesc =  row.repayModeDesc,//还款方式描述

      this.addForm.flag=true;
      this.addForm.edit=2;
    },
    //保存编辑法人
    editSave(){
			var _this=this
			
      var dataForEdit = {
				"channelNo":"1",
				"transCode":"SETSMSTEMPLATE200",
				"legalPersonNum":this.legalPersonNum,
				"name":this.addForm.name,
				"typeId":this.addForm.typeId,
				"enable":this.addForm.enable,
				"content":this.addForm.content,
				"id":this.addForm.id		 				
       };
     
      this.$post(this.$api,dataForEdit).then(res =>{
          this.dialogFormVisible=false
          this.cancel()
          if(res.returnMsg=="OK"){
              this.initsysTemplateTList();
          }else{
              this.$message({
                  message:res.returnMsg,
                  type: 'warning' 
              })
          }
      })
    },
    //查看
    seeItem(row){
			this.dialogFormVisible=true;

			this.addForm.repayModeSort = row.repayModeSort,//还款方式分类
			this.addForm.repayWayName =  row.repayWayName,//自定义还款名称
			this.addForm.baseRepayMode =  row.baseRepayMode,//规则基准还款方式
			this.addForm.termSpace =  row.termSpace,//还款间隔
			this.addForm.repaymentType =  row.repaymentType,//还款类型
			this.addForm.repaymentDateType =  row.repaymentDateType,//还款日类型
			this.addForm.repayDay =  row.repayDay,//指定还款日
			this.addForm.repayModeDesc =  row.repayModeDesc,//还款方式描述
			
      this.addForm.flag=true;
      this.addForm.edit=3;
    },
		//取消弹框重置数据
    cancel(){
			this.dialogFormVisible=false
		
			this.addForm.repayModeSort = "",//还款方式分类
			this.addForm.repayWayName = "",//自定义还款名称
			this.addForm.baseRepayMode = "",//规则基准还款方式
			this.addForm.termSpace = "",//还款间隔
			this.addForm.repaymentType = "",//还款类型
			this.addForm.repaymentDateType = "",//还款日类型
			this.addForm.repayDay = "",//指定还款日
			this.addForm.repayModeDesc = "",//还款方式描述

			this.addForm.flag=false;
      this.$refs.addForm.resetFields();
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
		//监听搜索框为空的时候展示全部数据
    onChangequery(){
        this.getRepaymentList();
    },
		//重置参数
    repaymentReset(){
			this.repayWayNum = '';
			this.repayWayName ='';
			this.getRepaymentList();
		},
		//改变每页显示多少条
    handleSizeChange(val) {
	  this.pageSize =  val;
	  this.indexNo = 0
      this.getRepaymentList();
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.indexNo = (val-1)*this.pageSize ;
      this.getRepaymentList(); 
    },
  
  }
}
</script>

<style   lang='scss'>
#repayment_content{
	.el-dialog {
		width:60%!important;
	}
}
</style>

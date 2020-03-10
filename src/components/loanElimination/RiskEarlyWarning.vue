<template>
	<div class="content_box" id="risk_content">
		<!-- 编辑模块(搜索) -->
	    <div class="edit_module">
	    	<el-form :inline="true"  class="demo-form-inline" size="small">
		        <el-row class="edit_module_search">
					<el-col :span="24">
						<el-form-item :label="$t('risk.customerName')"><!--客户名称  -->
							<el-input v-model="query.customerName" ></el-input>
						</el-form-item>
						<el-form-item :label="$t('risk.warningState')">  <!--预警状态  -->
			                <el-select v-model="query.warningState" placeholder=""><!--预警状态  -->
			                  	<el-option :label="$t('risk.all')" value="" ></el-option><!--全部  -->
			                  	<el-option :label="$t('risk.Relieve')" value="0" ></el-option><!--解除  -->
			                  	<el-option :label="$t('risk.EarlyWarning')" value="1" ></el-option><!--预警中  -->
			                  	<!--<el-option v-for="(item,index) in riskStates" :key="index" :label="item.label" :value="item.value" ></el-option>-->
							</el-select>
			            </el-form-item>
					</el-col>
		  			<el-col :span="24">
				  		<div class="edit_module_btn">
				  			<el-button type="warning" icon="el-icon-search" @click="queryData()" size="small">{{$t('Query')}}</el-button>  <!--查询按钮-->
				  		</div>
			  		</el-col>
		        </el-row>  
	     	</el-form>
	    </div>
		<!--编辑模块end(搜索)-->
		<!-- 列表模块 -->
    	<div class="list_module">
			<div class="table_body">
				<h4>{{$t('risk.EarlyWarningList')}}</h4><!--预警列表 -->
				<el-table :data="tableData" border style="width: 100%" size='small' :empty-text="$t('noData')">
					<!--序号-->
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
					<!--客户名称-->
 					<el-table-column prop="customerName" :label="$t('risk.customerName')"  align="center" min-width="140px"> </el-table-column>
 					<!--证件号码-->
 					<el-table-column prop="idcardValue" :label="$t('risk.cardNum')"  align="center" min-width="185px"> </el-table-column>
					<!--预警编号-->
 					<el-table-column prop="warningNumber" :label="$t('risk.EarlyWarningNum')"  align="center" min-width="285px"></el-table-column>
 					<!--预警发布时间-->
 					<el-table-column prop="warningReleaseTime" :label="$t('risk.EarlyWarningReleaseTime')"  align="center" min-width="210px">
 						<template slot-scope="scope">
 							{{scope.row.warningReleaseTime | formatDate(1)}}
 						</template>
 					</el-table-column>
 					<!--预警解除时间-->
 					<el-table-column prop="warningLiftTime" :label="$t('risk.rtoew')"  align="center" min-width="240px">
 						<template slot-scope="scope">
 							{{scope.row.warningLiftTime | formatDate(1)}}
 						</template>
 					</el-table-column>
					<!--预警状态-->
					<el-table-column prop="warningState" :label="$t('risk.EarlyWarningStatus')" align="center"  min-width="170px">
						<template slot-scope="scope">
							<span v-if="scope.row.warningState==1">{{$t('risk.EarlyWarning')}}</span> <!-- 预警中 -->
							<span v-if="scope.row.warningState==0">{{$t('risk.Relieve')}}</span><!-- 解除 -->
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="180px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('解除') > -1" > <!--v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 || funList.indexOf('配置') > -1"-->
						<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row,false)" v-if="funList.indexOf('查看') > -1"><!--v-if="funList.indexOf('查看') > -1"-->
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span>	<!-- 查看 -->
								</el-button>
								<el-button size="mini" type="danger" class="delete-btn" @click="seeItem(scope.row,true)" :disabled="scope.row.warningState==0" v-if="funList.indexOf('解除') > -1"><!--v-if="funList.indexOf('删除') > -1"-->
									<i class="el-icon-link"></i>
									<span class="text">{{$t('risk.Relieve')}}</span><!--解除 -->
								</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next, slot"
					:total="totalCount">
					<template slot>
						<div class="slot_pag">
							<el-select v-model="pageSize" size="mini" @change="handleSizeChange" style="width:auto">  <!-- 10条/页 -->
                                  <el-option :value="5" :label="'5'+$t('size')"></el-option>
                                  <el-option :value="10" :label="'10'+$t('size')"></el-option>
                                  <el-option :value="15" :label="'15'+$t('size')"></el-option>
                              </el-select>
                              <span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
							<span>{{$t('Jump_to')}}</span><!-- 跳转至 -->
							<el-input size="mini" v-model="goPage"  type="number" @click="changePage()">
								</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
			</el-pagination>
			</div>
		</div>
		<!--列表模块结束-->
		
		<!--查看详情弹框begin-->
		<el-dialog title="预警详细信息" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false">
			 <h4>{{$t('risk.CustomerInformation')}}</h4><!--客户信息 -->
			<el-form :model="addForm" id="Jurisdiction" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" size="small" label-width="90px">
				<el-col :span="12">
					<el-form-item :label="$t('risk.customerNam')"><!--客户姓名 -->
						<el-input v-model="addForm.customerName" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label="$t('risk.cardType')" prop="authorityName" ><!--证件类型 -->
						<!--<el-input v-model="addForm.zjlx" disabled></el-input>-->
						<el-select v-model="addForm.idcardType" disabled style="width:100%;" placeholder="">
							<el-option v-for="item in zjlxs" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label="$t('risk.cardNum')"><!--证件号码 -->
						<el-input v-model="addForm.idcardValue" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label="$t('risk.phone')"><!--手机号码 -->
						<el-input v-model="addForm.phone" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-form>
			<h4>{{$t('risk.EarlyWarningSignal')}}</h4><!--预警信号 -->
			<el-table  :data="detailData" border style="width: 100%" size='small' max-height="400">
				<!--序号-->
				<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="130px"></el-table-column>
				<!--预警发布时间-->
				<el-table-column prop="warningReleaseTime" :label="$t('risk.EarlyWarningReleaseTime')"  align="center" min-width="185px">
					<template slot-scope="scope">
						{{scope.row.warningReleaseTime | formatDate(1)}}
					</template>
				</el-table-column>
				<!--预警解除时间-->
				<el-table-column prop="warningLiftTime" :label="$t('risk.rtoew')"  align="center" min-width="205px">
					<template slot-scope="scope">
						{{scope.row.warningLiftTime | formatDate(1)}}
					</template>
				</el-table-column>
				<!--预警信号名称-->
				<el-table-column prop="warningSignalName" :label="$t('risk.NameOfWarningSignal')"  align="center" min-width="175px"> </el-table-column>
				<!--信号状态-->
				<el-table-column prop="warningState" :label="$t('risk.SignalState')"  align="center" min-width="125px">
					<template slot-scope="scope">
						<span v-if="scope.row.warningState==1">{{$t('risk.EarlyWarning')}}</span>  <!--预警中 -->
						<span v-if="scope.row.warningState==0">{{$t('risk.Relieve')}}</span> <!--  解除 -->
					</template>
				</el-table-column>
				<!--信号等级-->
				<el-table-column prop="warningGrade" :label="$t('risk.SignalLevel')"  align="center" min-width="120px">
					<template slot-scope="scope">
						<span v-if="scope.row.warningGrade==0">{{$t('risk.zero')}}</span><!-- 无 -->
						<span v-if="scope.row.warningGrade==1">{{$t('risk.oneLevel')}}</span><!-- 一级 -->
						<span v-if="scope.row.warningGrade==2">{{$t('risk.twoLevel')}}</span><!-- 二级 -->
						<span v-if="scope.row.warningGrade==3">{{$t('risk.threeLevel')}}</span><!-- 三级 -->
					</template>
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<!--<el-button @click="resetForm('addForm')">返回</el-button>-->
				<el-button @click="cancel">{{$t('Return')}}</el-button><!--返回-->
				<el-button type="primary" @click="deleteSure()" v-if="flag">{{$t('risk.ConfirmationOfRelief')}}</el-button><!-- 确定解除 -->
			</div>
		</el-dialog>
		<!--查看详情弹框end-->
	</div>
</template>

<script>
	export default{
		name: 'RiskEarlyWarning',
		data(){
			return{
				query:{//查询条件
					customerName:"",//客户名称
					warningState:""//预警状态
				},
				pageSize:10,//当前页显示几条数据
		    	pageIndex:1,//当前页的索引 以1开头
		    	totalCount:0,//一共有多少条数据
		    	currentPage:1,//当前是第几页
		    	goPage:"",//要去第几页
				funList:[],//功能列表
				dialogFormVisible:false,//查看详情是否显示
				addForm:{},//列表的一条信息
				flag:false,
				tableData:[
				],//列表数据
				detailData:[
				],//预警信号列表
				riskStates:[//预警状态
					{value:0,label:"解除"},
					{value:1,label:"预警中"}
				],
				zjlxs:[],//证件类型
				templateRadio:"",//table单选
				funList: []
			}
		},
		created(){
			this.getFunList();
			this.getCardType()
		},
		mounted(){
			this.initData()
		},
		methods:{
			getCardType:function(){
				this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'CARD_TYPE'}).then(res =>{
					if(res.returnCode == '000000'){
					this.zjlxs =  res.returnData;
					}
				});

			},
			initData(){//页面初始化
				var obj={
					customerName:this.query.customerName,
					warningState:this.query.warningState,
					pageNo:this.pageIndex,
					pageSize:this.pageSize
				}
				this.$post(this.$afterloan+"/riskEarly/selectListByCustomeWarState",obj).then(res=>{
					if(res.code=="000000"){
						this.tableData=res.data.listData;
						this.totalCount=res.data.total;
					}
				})
			},
			queryData(){//查询
				this.initData()
			},
			cancel(){//弹框点击右上角x隐藏
				this.dialogFormVisible=false;
				this.addForm={};
			},
			//点击查看
			seeItem(row,show){
				this.addForm=row;
				this.$post(this.$afterloan+"/riskEarly/selectDetailById",{id:row.id}).then(res=>{
					if(res.code=="000000"){
						this.detailData=res.data.signalList;
					}
				})
				this.dialogFormVisible=true;
//				this.flag=false;
				this.flag=show;
			},
			deleteSure(){
				this.$post(this.$afterloan+"/riskEarly/updataLiftWarningById",{id:this.addForm.id}).then(res=>{
					if(res.code=="000000"){
//						this.detailData=res.data.signalList;
						this.$alert( i18n.t('risk.ReleaseSuccess'), {//解除成功
							dangerouslyUseHTMLString: true
						});
						this.cancel();
						this.initData();
					}else{
						var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
							`
							this.$alert(str,i18n.t('Prompt'), {//提示
								dangerouslyUseHTMLString: true
							});
					}
				})
			},
			getFunList () {
				let obj = {}
				obj = this.$store.state.loginData.beMenuList.find(item => {
					return item.name == '风险预警管理'//风险预警管理 i18n.t('risk.RiskEarlyWarningManagement')
				})
				this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
					if(res.returnCode == '000000'){
					this.funList = JSON.stringify(res.returnData)
					}
				});
			},
			changePage(goPage){
				this.goPage=this.goPage.replace(/(\-|\+|\.|[0-9])/g,'');
			},
			//点击确认改变数据
			goPageSure (val) {
				if (val) {
					var mc=Math.ceil(this.totalCount/this.pageSize);
					if(val>0&&val<=mc){
						this.goPage="";
						this.currentPage = parseInt(val);
						this.pageIndex = val;
						this.initData(val); 
					}else{
						this.goPage="";
						this.currentPage =parseInt(mc);
						this.pageIndex = mc;
						this.initData(mc); 
					}
				}
			},
	  		//改变每页显示多少条
			handleSizeChange(val) {
				this.pageSize =  val;
				this.initData(0);
			},
			//选择页数改变数据
			handleCurrentChange(val){
				this.currentPage = val;
				this.pageIndex = val;
				this.initData(val); 
			},
		},
		filters:{
			formatDate:function(val,x){
				if(val==null || val == "" ){
					return null
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
			        if(x==0){
			        	return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			        }else if(x==1){
			        	return y + '-' + MM + '-' + d
			        }
		        }
		        
			}
		}
	}
</script>

<style>
	.edit_module_btn{
		padding:10px 0;
	}
	#Jurisdiction{overflow: hidden;}
</style>
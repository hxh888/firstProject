<template>
  <!-- 机构管理 -->
  <div class="content_box" id="org_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
		<el-form :inline="true" :model="searchForm"   class="demo-form-inline" size="small">
			<el-row>
				<el-col :span="24">
					<el-form-item :label="$t('org.Organization_num')"  > 	<!-- 机构编号 -->
						<el-input v-model="searchForm.queryNum"  ></el-input>
					</el-form-item>
					<el-form-item :label="$t('org.institutionname')">     	<!-- 机构名称 -->
						<el-input v-model="searchForm.queryName" ></el-input> 
					</el-form-item>
					<el-form-item :label="$t('org.parent_institutionname')" > 	<!-- 上级机构名称 -->
						<el-input v-model="searchForm.queryParentBranchName" ></el-input>
					</el-form-item>
					<el-form-item :label="$t('org.merge_institutionname')">     	<!-- 并入机构名称 -->
						<el-input v-model="searchForm.queryMergeBranchName"  ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="edit_module_btn" >
					<el-form-item>
						<el-button type="warning" icon="el-icon-search" @click="organizationSearch()" >{{$t('Query')}}</el-button>  <!--查询按钮-->
						<el-button type="primary" icon="el-icon-plus"  @click="organizationAdd()" v-if="funList.indexOf('新增') > -1">{{$t('Add')}}</el-button>  <!--新增按钮-->
					</el-form-item>
				</el-col>
			</el-row>  
		</el-form>
    </div>
	<!-- 列表模块 -->
    <div class="list_module">
		<div class="table_body">
			<h4>{{$t('org.Organization_list')}}</h4>
			<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
            <!--序号-->
            <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
			<!--机构编号-->
            <el-table-column prop="branchNum"  :label="$t('org.Organization_num')" align="center" min-width="170px"> </el-table-column>
            <!--机构名称-->
            <el-table-column prop="branchName" :label="$t('org.institutionname')"  align="center" min-width="180px"> </el-table-column>
            <!--上级机构名称-->
            <el-table-column prop="parentBranchName" :label="$t('org.parent_institutionname')"  align="center" min-width="145px"> </el-table-column>
            <!--并入机构名称-->
            <el-table-column prop="mergeBranchName" :label="$t('org.merge_institutionname')"  align="center" min-width="180px"> </el-table-column>
			 <!--创建日期-->
			<el-table-column prop="createTime" :label="$t('Create_date')"   align="center" min-width="130px"> 
				<template slot-scope="scope">
						{{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
				</template>
				</el-table-column>
				<!--修改日期-->
			<el-table-column prop="updateTime" :label="$t('Update_date')"  align="center" min-width="155px"> 
				<template slot-scope="scope">
						{{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
				</template>
				</el-table-column>
            <!--状态-->		
            <el-table-column prop="branchState" :label="$t('Status')" align="center"  min-width="115px">
              <template slot-scope="scope">
					<span v-if="scope.row.branchState==1">{{$t('Take_effect')}}</span>  <!--生效-->
					<span v-else>{{$t('Failure_effect')}}</span> <!--失效-->
              </template>
            </el-table-column>
			 <!--操作-->		
            <el-table-column :label="$t('Operation')" align="center" min-width="180px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1 || funList.indexOf('撤并') > -1">
              <template slot-scope="scope">
                  <el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
                    <i class="el-icon-view"></i>
                    <span class="text">{{$t('See')}}</span>	<!-- 查看 -->
                  </el-button> 
                  <el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
                    <i class="el-icon-edit"></i>
                    <span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
                  </el-button>
                  <el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funList.indexOf('删除') > -1">
                    <i class="el-icon-delete"></i>
                    <span class="text">{{$t('Delete')}}</span> <!-- 删除 -->
                  </el-button>
                  <el-button size="mini" type="warning"  @click="mergeBranch(scope.row)" v-if="funList.indexOf('撤并') > -1">
                    <i class="el-icon-setting"></i>
					<span class="text">{{$t('org.Organization_marge')}}</span> <!-- 机构撤并 -->
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
		</div>
	</div>
	<!--弹框页面开始-->
	<el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
		<el-form style="overflow:hidden;padding-bottom:10px" :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="$rules.organization" ref="addForm" id="addForm" size="small"  label-width="120px">
			<div v-if="addForm.edit ==4">
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('legalPerson_num')"> <!-- 法人编号 -->
							<el-input v-model="addForm.legalPersonNum"  disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('Unit')"> <!-- 公司名称 -->
							<el-input v-model="addForm.legalPersonName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row>
			
				<el-row> -->
					<el-col :span="12">
						<el-form-item  :label="$t('org.Organization_num')"> <!-- 机构编号 -->
							<el-input v-model="addForm.branchNum"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item  :label="$t('org.institutionname')"> <!-- 机构名称 -->
							<el-input v-model="addForm.branchName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item  :label="$t('org.Organization_Type')"> <!-- 机构类型 -->
							<el-select v-model="addForm.branchType" disabled>
								<el-option  v-for="(item,index) in options"
											:key="index"
											:label="item.paramSname"
											:value="item.paramValue">
								</el-option>
							</el-select>	
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<!-- 当机构类型不为总行才显示 0:总行;1:分行;2:支行 -->
					<el-col :span="12" v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item  :label="$t('org.prent_organization_num')"> <!-- 上级机构编号 -->
							<el-input v-model="addForm.parentBranchNum" disabled ></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12"  v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item  :label="$t('org.parent_institutionname')"> <!-- 上级机构名称 -->
							<el-input v-model="addForm.parentBranchName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('Status')" > <!--状态-->
						<el-select v-model="addForm.branchState" disabled>
							<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
							<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
						</el-select>	
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item   prop="mergeBranchNum" :label="$t('org.merge_organization_num')" > <!--并入机构编号-->
							<el-input v-model="addForm.mergeBranchNum"   @blur="validMergeBranchNum()" disabled v-if="isMarge !=null"></el-input>
							<el-input v-model="addForm.mergeBranchNum"   @blur="validMergeBranchNum()" v-else></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12"  >
						<el-form-item   :label="$t('org.merge_institutionname')" > <!--并入机构名称-->
							<el-input v-model="addForm.mergeBranchName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

			</div>

			<div v-if="addForm.edit ==3">
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('legalPerson_num')"> <!-- 法人编号 -->
							<el-input v-model="addForm.legalPersonNum"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('Unit')"> <!-- 公司名称 -->
							<el-input v-model="addForm.legalPersonName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
			
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('org.Organization_num')"> <!-- 机构编号 -->
							<el-input v-model="addForm.branchNum"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('org.institutionname')"> <!-- 机构名称 -->
							<el-input v-model="addForm.branchName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('org.Organization_Type')"> <!-- 机构类型 -->
							<el-select v-model="addForm.branchType" disabled>
								<el-option  v-for="(item,index) in options"
											:key="index"
											:label="item.paramSname"
											:value="item.paramValue">
								</el-option>
							</el-select>	
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<!-- 当机构类型不为总行才显示 0:总行;1:分行;2:支行 -->
					<el-col :span="12" v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item :label="$t('org.prent_organization_num')"> <!-- 上级机构编号 -->
							<el-input v-model="addForm.parentBranchNum" disabled ></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12"  v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item :label="$t('org.parent_institutionname')"> <!-- 上级机构名称 -->
							<el-input v-model="addForm.parentBranchName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('org.merge_organization_num')" > <!--并入机构编号-->
							<el-input v-model="addForm.mergeBranchNum" disabled ></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12"  >
						<el-form-item :label="$t('org.merge_institutionname')" > <!--并入机构名称-->
							<el-input v-model="addForm.mergeBranchName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('Status')" > <!--状态-->
						<el-select v-model="addForm.branchState" disabled>
							<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
							<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
						</el-select>	
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item  prop="createTime"  :label="$t('Create_time')" > <!--创建时间-->
							<el-input v-model="addForm.createTime" disabled ></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item  prop="createUser" :label="$t('Create_user')" > <!--创建用户-->
							<el-input v-model="addForm.createUser"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item  prop="updateTime" :label="$t('Update_time')" > <!--修改时间-->
							<el-input v-model="addForm.updateTime"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item prop="updateUser"  :label="$t('Update_user')" > <!--修改用户-->
							<el-input v-model="addForm.updateUser" disabled ></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

			</div>

			<div v-if="addForm.edit ==2">
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('legalPerson_num')"> <!-- 法人编号 -->
							<el-input v-model="addForm.legalPersonNum"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('Unit')"> <!-- 公司名称 -->
							<el-input v-model="addForm.legalPersonName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
			
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item  :label="$t('org.Organization_num')"> <!-- 机构编号 -->
							<el-input v-model="addForm.branchNum" disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item  :label="$t('org.institutionname')" prop="branchName" > <!-- 机构名称 -->
							<el-input v-model="addForm.branchName"  ></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->


				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item  :label="$t('org.Organization_Type')"> <!-- 机构类型 -->
							<el-select v-model="addForm.branchType"  disabled>
								<el-option value=""  :label="$t('please_select')"></el-option>  <!-- 请选择 -->
								<el-option 
										v-for="(item,index) in options" 
										:key="index"
										:label="item.paramSname"
										:value="item.paramValue"
									></el-option>
							</el-select>
						</el-form-item>
					</el-col>	
				<!-- </el-row> -->

				<!-- <el-row > -->
					<!-- 当机构类型不为总行才显示 0:总行;1:分行;2:支行 -->
					<el-col :span="12"  v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item  :label="$t('org.prent_organization_num')"  prop="parentBranchNum" > <!-- 上级机构编号 -->
							<el-input v-model="addForm.parentBranchNum"    @blur="validParentBranchName()" ></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12"  v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item  :label="$t('org.parent_institutionname')" prop="parentBranchName" > <!-- 上级机构名称 -->
							<el-input v-model="addForm.parentBranchName"  disabled></el-input>
						</el-form-item>
					</el-col>

				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('Status')" prop="branchState"> <!--状态-->
						<el-select v-model="addForm.branchState" >
							<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
							<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
						</el-select>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
			</div>

			<div v-if="addForm.edit == 1">
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('legalPerson_num')"> <!-- 法人编号 -->
							<el-input v-model="addForm.legalPersonNum"  disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="$t('Unit')"> <!-- 公司名称 -->
							<el-input v-model="addForm.legalPersonName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
			
				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item  :label="$t('org.Organization_num')"  prop="branchNum" > <!-- 机构编号 -->
							<el-input v-model="addForm.branchNum" ></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item  :label="$t('org.institutionname')" prop="branchName"> <!-- 机构名称 -->
							<el-input v-model="addForm.branchName"  ></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->


				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item  :label="$t('org.Organization_Type')" prop="branchType"> <!-- 机构类型 -->
							<el-select v-model="addForm.branchType" >
								<el-option value="" :label="$t('please_select')"></el-option>  <!-- 请选择 -->
								<el-option 
										v-for="(item,index) in options" 
										:key="index"
										:label="item.paramSname"
										:value="item.paramValue"
									></el-option>
							</el-select>
						</el-form-item>
					</el-col>	
				<!-- </el-row> -->

				<!-- <el-row  > -->
					<!-- 当机构类型不为总行才显示 0:总行;1:分行;2:支行 -->
					<el-col :span="12" v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item  :label="$t('org.prent_organization_num')" prop="parentBranchNum" > <!-- 上级机构编号 -->
							<el-input v-model="addForm.parentBranchNum"    @blur="validParentBranchName()" ></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12" v-if="addForm.branchType == '1' || addForm.branchType == '2'">
						<el-form-item  :label="$t('org.parent_institutionname')" prop="parentBranchName" > <!-- 上级机构名称 -->
							<el-input v-model="addForm.parentBranchName"  disabled></el-input>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->

				<!-- <el-row> -->
					<el-col :span="12">
						<el-form-item :label="$t('Status')" prop="branchState" > <!--状态-->
							<el-select v-model="addForm.branchState" >
								<el-option :label="$t('Take_effect')" value="1"></el-option>    <!--生效-->
								<el-option :label="$t('Failure_effect')" value="0"></el-option>  <!--失效-->
							</el-select>
						</el-form-item>
					</el-col>
				<!-- </el-row> -->
			</div>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="addForm.edit == 1"  @click="resetForm('addForm')">{{$t('Reset')}}</el-button>  <!--重置-->
			<el-button v-if="addForm.edit == 2" type="primary" @click="editSave('addForm')">{{$t('Save')}}</el-button>   <!--保存-->
			<el-button v-if="addForm.edit == 1" type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button>   <!--保存-->
			<el-button v-if="addForm.edit == 4" type="primary" @click="mergeBranchAdd('addForm')">{{$t('OK')}}</el-button>   <!--确定-->
		</div>
	
	</el-dialog>
	<!--弹框页面结束-->
  </div>
</template>

<script>
export default {
  name: 'Organization',
  data () {
    return {
		searchForm:{  //查询条件
			queryNum:'',
			queryName:'',
			queryParentBranchName:'',
			queryMergeBranchName:''
		},
		
		tableData:[],//机构table数据

		currentPage:1,//当前显示第几页 1开头
		pageSize:10,//一页显示几条数据
		totalCount:0,//一共有多少条数据
		goPage:"",//前往第几页
		title:'', //弹框标题
		dialogFormVisible: false,//新增弹出框是否显示

		cardTypeList:[],//机构代表证件类型
			
		addForm: {
			branchNum: '',//机构编号
			branchName:'',//机构名称 
			branchType:'', //机构类型
			parentBranchNum:'', //上级机构编号
			parentBranchName:'',//上级机构名称
			branchState:'1',//状态

			mergeBranchName:'', //并入机构名称
			mergeBranchNum:'', //并入机构编号
			createTime:'', //创建时间
			createUser:'', //创建用户
			editTime:'', //修改时间
			userName:'', //修改用户
			legalPersonNum:"",
			legalPersonName:"",
	      	edit:1	 //标识1 是新增 2是编辑 3是查看 4机构撤并
		},
		options:[],//机构类型
		funList: [],
		isMarge:'',
		
    }
  },
  created(){
	this.defaultAddForm=$.extend({},this.addForm); //重置数据  初始化的时候深拷贝一下
	this.getFunList()
  },
  mounted(){
	this.initOrganizationList();  //初始化列表数据
	
  },
  methods:{
	getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == "机构管理";
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
	initOrganizationList(){
		var FunMsgData1={
			"currentPage":this.currentPage,
			"pageSize":this.pageSize,
		}
		this.$post(this.$api + '/branch/list',FunMsgData1).then(res=>{
			if(res.returnCode=="000000"){
				this.tableData =res.returnData.data
				this.totalCount = res.returnData.count;
			}
		})
		var param={
			"paramCode":"BRANCH_TYPE",
		}
		this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
			if(res.returnCode=="000000"){
				this.options =res.returnData
			}
		})
	},
	//查询参数
	organizationSearch(){
		this.currentPage = 0;
		var FunMsgData = {
			"branchNum":this.searchForm.queryNum,
			"branchName":this.searchForm.queryName,
			"parentBranchName":this.searchForm.queryParentBranchName,
			"mergeBranchName":this.searchForm.queryMergeBranchName,
			"currentPage":this.currentPage,
			"pageSize":this.pageSize,
		};
		this.$post(this.$api + '/branch/list',FunMsgData).then( res =>{
			if(res.returnCode=="000000"){
				this.tableData =res.returnData.data
				this.totalCount = res.returnData.count;
			}
		});
	},
	//点击新增按钮
	organizationAdd() {
		this.dialogFormVisible=true;
		this.addForm.edit= 1;
		this.title= i18n.t('org.New_organization');  // 新增机构;
		this.getLegalInfo();  // 获取法人机构 和 公司名称
		this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波	
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
	},
	//单独验证上级机构编号
	validParentBranchName(){
		var FunMsgData1={
			"branchNum":this.addForm.parentBranchNum
		}
		this.$post(this.$api + '/branch/getBranchName',FunMsgData1).then(res=>{
			if(res.returnCode=="000000"){
				this.addForm.parentBranchName =res.returnData.branchName
			}
		})
	},
	//确定增加机构
	submitAdd(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				if(this.addForm.branchType=="0"){
					this.addForm.parentBranchNum=""
					this.addForm.parentBranchName=""
				}
				var	FunMsgData = {
					"branchNum":this.addForm.branchNum,
					"branchName":this.addForm.branchName,
					"parentBranchNum":this.addForm.parentBranchNum,
					"parentBranchName":this.addForm.parentBranchName,
					"branchType":this.addForm.branchType,
					"branchState":this.addForm.branchState,
				};
				this.$post(this.$api + '/branch/save',FunMsgData).then(res=>{
					if(res.returnCode=="000000"){
					 	this.dialogFormVisible = false;
						this.$refs[formName].resetFields();
						this.addForm.flag=false;
						this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波

						this.initOrganizationList();
						this.$alert( i18n.t('org.Add_success'),  i18n.t('Prompt'), {  //新增机构成功 提示
							dangerouslyUseHTMLString: true
						});
					}else{
						var str = `
							<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
							<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
						`
						this.$alert(str, i18n.t('org.Add_failure'), {  //新增机构失败
							dangerouslyUseHTMLString: true
						});
					}
				})
			} else {
				return false;
			}
		});
	},
	//取消弹框重置数据
	cancel(formName){
		this.dialogFormVisible = false;
		if (this.$refs[formName]!==undefined) {
			this.$refs[formName].resetFields();
		}
		this.addForm.edit=1;
		
	},
	//点击编辑机构
	editItem(row){
		this.dialogFormVisible=true;
		this.addForm.edit=2;
		this.title= i18n.t('org.Edit_organization');  // 编辑机构;
		this.getLegalInfo();  // 获取法人机构 和 公司名称
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		
		this.addForm.branchNum=row.branchNum
		this.addForm.branchName=row.branchName
		this.addForm.parentBranchName=row.parentBranchName
		this.addForm.branchType = row.branchType
		this.addForm.id = row.id
		this.addForm.parentBranchNum=row.parentBranchNum
		this.addForm.branchState=row.branchState
	
	},
	//保存编辑机构
	editSave(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
				if(this.addForm.branchType=="0"){
					this.addForm.parentBranchNum=""
					this.addForm.parentBranchName=""
				}
				var FunMsgData5 = {
					"branchNum":this.addForm.branchNum,
					"branchName":this.addForm.branchName,
					"parentBranchNum":this.addForm.parentBranchNum,
					"parentBranchName":this.addForm.parentBranchName,
					"branchType":this.addForm.branchType,
					"branchState":this.addForm.branchState,
					"id": this.addForm.id
				}
				this.$post(this.$api +'/branch/update',FunMsgData5).then(res =>{
						this.dialogFormVisible=false
						if(res.returnCode=="000000"){
							this.organizationSearch();
							this.$alert( i18n.t('org.Modified_success'), i18n.t('Prompt'),{  //保存机构成功！ 提示
								dangerouslyUseHTMLString: true
							});
						}else{
							var str = `
								<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('org.Modified_failure'), {  //机构保存失败
								dangerouslyUseHTMLString: true
							});
						}
						
					})
				}else {
					return false;
				}
			})
		},
	//点击单个删除按钮
	deleteItem(row){
		var FunMsgData5={
			"id":row.id,
		}
		var _this =this;
		this.$confirm(i18n.t('org.Is_del_organization'), i18n.t('Prompt'), {  //是否删除机构?
				confirmButtonText:  i18n.t('OK'),   //确定
				cancelButtonText: i18n.t('Cancel'),  //取消
				type: 'warning'
		}).then(() => {
			this.$post(this.$api + '/branch/delete',FunMsgData5).then(function(res){
				if(res.returnCode=="000000"){
					_this.organizationSearch();
					_this.$alert('', i18n.t('org.Del_success'), i18n.t('Prompt'),{  //删除机构成功
						dangerouslyUseHTMLString: true
					});
				}else{
					var str = `
						<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					_this.$alert(str, i18n.t('org.Del_failure'), { //删除机构失败
						dangerouslyUseHTMLString: true
					});
				}
			})
		}).catch(() => {
			
		});
	},
	//查看机构
	seeItem(row){
		this.dialogFormVisible=true;
		this.addForm.edit=3;
		this.title= i18n.t('org.Detail_organization');  // 机构详情;
		this.getLegalInfo();  // 获取法人机构 和 公司名称
		
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		
		var FunMsgData={
			"id":row.id
		}
		this.$post(this.$api + '/branch/detail',FunMsgData).then(res=>{
			if(res.returnCode=="000000"){
				let data = res.returnData
				this.addForm.branchNum = data.branchNum;
				this.addForm.branchName = data.branchName;

				this.addForm.branchType = data.branchType;
				this.addForm.parentBranchNum = data.parentBranchNum;
				this.addForm.parentBranchName = data.parentBranchName;

				this.addForm.mergeBranchName = data.mergeBranchName;
				this.addForm.mergeBranchNum = data.mergeBranchNum;
				this.addForm.branchState = data.branchState;

				this.addForm.createUser = data.createUser;
				this.addForm.updateUser = data.updateUser;
				this.addForm.createTime = data.createTime;
				this.addForm.updateTime = data.updateTime;
			}
		})
	},
	//机构撤并
	mergeBranch(row){
		this.dialogFormVisible=true;
		this.addForm.edit = 4;
		this.title= i18n.t('org.Organization_marge');  // 机构撤并;
		this.getLegalInfo();  // 获取法人机构 和 公司名称
		this.addForm.mergeBranchNum ='';
		this.addForm.mergeBranchName ='';
		
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}

		this.isMarge = row.mergeBranchNum;
		if(row.mergeBranchNum != null){
			this.addForm.mergeBranchNum = row.mergeBranchNum;
			this.validMergeBranchNum();
		}

		this.addForm.branchNum=row.branchNum
		this.addForm.branchName=row.branchName
		this.addForm.parentBranchNum=row.parentBranchNum
		this.addForm.parentBranchName=row.parentBranchName
		this.addForm.branchType = row.branchType
		this.addForm.branchState = row.branchState
		this.addForm.id = row.id
	},
	validMergeBranchNum(){
		var FunMsgData1={
			"branchNum":this.addForm.mergeBranchNum
		}
		this.$post(this.$api + '/branch/getBranchName',FunMsgData1).then(res=>{
			if(res.returnCode=="000000"){
				this.addForm.mergeBranchName=res.returnData.branchName
			}else{
				this.addForm.mergeBranchName =''
			}
		})
	},
	//确定机构撤并
	mergeBranchAdd(formName){
		this.$refs[formName].validate((valid) => {
			if (valid) {
					var _this =this;
					var FunMsgData={
						"id":this.addForm.id,
						"mergeBranchNum":this.addForm.mergeBranchNum,
						"mergeBranchName":this.addForm.mergeBranchName
					}
					this.$confirm( i18n.t('org.Is_marge_organization'), i18n.t('Prompt'), {  //是否进行机构撤并  提示
						confirmButtonText:  i18n.t('OK'),   //确定
						cancelButtonText: i18n.t('Cancel'),  //取消
						type: 'warning'
						
					}).then(() => {
						this.$post(this.$api + '/branch/merge',FunMsgData).then(function(res){
							_this.dialogFormVisible=false
							_this.addForm.mergeBranchNum = ''
							if(res.returnCode=="000000"){
								_this.organizationSearch();
								_this.$alert( i18n.t('org.Marge_success'), i18n.t('Prompt'), { //机构撤并成功
									dangerouslyUseHTMLString: true
								});
							}else{
								var str = `
									<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
									<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
								`
								_this.$alert(str, i18n.t('org.Marge_failure'), { //机构撤并失败
									dangerouslyUseHTMLString: true
								});

							}
						})
					}).catch(() => {
						
					});
			}
		})
	
	},
	//监听搜索框为空的时候展示全部数据
	onChangequery(){
		this.organizationSearch();
	},
	//获取公司名称
	getLegalInfo () {
		this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				this.addForm.legalPersonNum = res.returnData.legalPersonNum
				this.addForm.legalPersonName = res.returnData.legalPersonName
			} else {
				var str = `
					<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
	},
	//重置表单
	resetForm(formName) {
		this.$refs[formName].resetFields();
	},
	//前往第几页
	goPageSure (val) {
		var mc=Math.ceil(this.totalCount/this.pageSize);
		if (val) {
			if(val>0&&val<=mc){
				this.goPage="";
				this.currentPage = parseInt(val)
				this.initOrganizationList()
			}else{
				this.goPage=""
				this.currentPage = parseInt(mc)
				this.initOrganizationList()
			}
		}
	},
	//改变每页显示多少条
	handleSizeChange(val) {
		this.pageSize =  val;
		this.currentPage = 0
		this.initOrganizationList();
	},
	//选择页数改变数据
	handleCurrentChange(val){
		this.currentPage = val;
		this.initOrganizationList(); 
	},

  }
}
</script>

<style  lang='scss'>
#org_content{
	.el-dialog {
		width:60%!important;
	}
}
.el-pagination .el-select .el-input{width:125px;}
</style>

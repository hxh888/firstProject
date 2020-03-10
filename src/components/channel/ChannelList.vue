<template>
  <div class="content_box">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
    	<el-form :inline="true"  class="demo-form-inline" size="small">
			<el-row class="edit_module_search">
				<el-col :span="24">
					 <el-form-item :label="$t('menu.menuName')"><!--菜单名称 -->
						<el-input v-model="queryMenu" ></el-input>
					</el-form-item>
					 <el-form-item :label="$t('menu.upMenuName')"><!--上级菜单名称 -->
						<el-input v-model="queryParentName" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="edit_module_btn">
					<el-form-item>
						<el-button type="warning" icon="el-icon-search" @click="initMenuList(0)" >{{$t('Query')}}</el-button>  <!--查询按钮-->
						<!--<el-button type="primary" icon="el-icon-plus"  @click="authAdd('1')">新增</el-button>--> <!--新增按钮-->
					</el-form-item>
				</el-col>
			</el-row>  
		</el-form>
    </div>
    <!-- 编辑模块(搜索新增查询)结束 -->
    
    <!-- 列表模块开始-->
    <div class="list_module">
			<div class="table_body">
				<h4>{{$t('menu.menuList')}}</h4><!--  菜单列表 -->
				<el-table :data="tableData" border style="width: 100%" size='small' :empty-text="$t('noData')"><!--empty-text="您所查询的菜单不存在"-->
						<!--序号-->
						<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
						<!--菜单编号-->
	 					<!--<el-table-column prop="menuNum" label="菜单编号"  align="center"> </el-table-column>-->
						<!--菜单名称-->
	 					<el-table-column prop="menuName" :label="$t('menu.menuName')"  align="center" min-width="145px"> </el-table-column>
	 					<!--上级菜单名称-->
	 					<el-table-column prop="parentName" :label="$t('menu.upMenuName')"  align="center" min-width="180px"> </el-table-column>
	 					<!--URL-->
	 					<el-table-column prop="menuUrl" label="URL"  align="center" min-width="240px"> </el-table-column>
						 <!--创建日期-->
	 					<el-table-column prop="createTime" :label="$t('Create_date')"  align="center" min-width="130px">
	 						<template slot-scope="scope">
	 							{{scope.row.createTime.substring(0,10)}}
	 						</template>
	 					</el-table-column>
	 					<!--创建用户-->
	 					<el-table-column prop="createUser" :label="$t('Create_user')"  align="center" min-width="135px">
	 						<!--<template slot-scope="scope">
	 							{{scope.row.createTime.substring(0,10)}}
	 						</template>-->
	 					</el-table-column>
						<!--状态-->
						<!--<el-table-column prop="menuState" label="状态" align="center"  width="150px">
							<template slot-scope="scope">
								<span v-if="scope.row.menuState==1">生效</span>
								<span v-else>无效</span>
							</template>
						</el-table-column>-->
						<!--<el-table-column label="操作" align="center" width="250px">
							<template slot-scope="scope">
									<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row,'3')">
										<i class="el-icon-view"></i>
										<span class="text">查看</span>
									</el-button> 
									<el-button size="mini" class="edit-btn" @click="editItem(scope.row,'2')">
										<i class="el-icon-edit"></i>
										<span class="text">编辑</span>
									</el-button>
									
									<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
										<i class="el-icon-delete"></i>
										<span class="text">删除</span>
									</el-button>
							</template>
						</el-table-column>-->
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
							<span>{{$t('JumpTo')}}</span><!--  跳转至 -->
							<el-input size="mini" v-model="goPage"  type="number">
								</el-input><span>{{$t('page')}}</span><!--  页 -->
							<el-button  type="warning" @click="goPageSure(goPage)">{{$t('Determine')}}</el-button><!--  确定 -->
						</div>
					</template>
				</el-pagination>
			</div>
		</div>
		<!--列表模块结束-->
		
		<!--菜单新增、修改、查询详情页面开始-->
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="rules" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="addForm" id="addForm" size="small"  label-width="90px">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item :label="$t('legalPersonNum')" prop="legalPersonNum"><!-- 法人编号 -->
							<el-input v-model="addForm.legalPersonNum" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('companyName')" prop="companyName" ><!-- 公司名称 -->
							<el-input v-model="addForm.companyName" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<!--<el-col :span="12">
						<el-form-item label="菜单编号" prop="menuNum">
							<el-input v-model="addForm.menuNum" :disabled="addForm.dis"></el-input>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item :label="$t('menu.menuName')" prop="menuName"><!-- 菜单名称 -->
							<el-input v-model="addForm.menuName" :disabled="addForm.allDis"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item :label="$t('menu.menuType')" prop="menuType"><!-- 菜单类型 -->
							<el-select v-model="addForm.menuType" @change="changeType(addForm.menuType)" :disabled="addForm.allDis">
								<el-option :label="$t('menu.rootNode')" value="0"></el-option><!-- 根节点 -->
								<el-option :label="$t('menu.Subnode')" value="1"></el-option><!-- 子节点 -->
							</el-select>	
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('menu.menuURL')" prop="menuUrl"><!-- 菜单URL -->
							<el-input v-model="addForm.menuUrl" :disabled="addForm.allDis"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20" v-if="vie"> <!--v-show="vie"-->
					<el-col :span="12">
						<el-form-item :label="$t('menu.upMenu')" prop="parentId" ><!-- 上级菜单 -->
							<!--<el-select v-model="addForm.parentId">
								<el-option label="根节点" value="1"></el-option>
								<el-option label="子节点" value="2"></el-option>
							</el-select>-->
							<el-cascader :disabled="addForm.allDis"
							  :options="options"
							  change-on-select
							  :show-all-levels="false"
							  v-model="addForm.parentId"
							></el-cascader>
						</el-form-item>
					</el-col>
					<!--<el-col :span="12">
						<el-form-item label="上级菜单名称" prop="parentName">
							<el-input v-model="addForm.parentName" disabled></el-input>
						</el-form-item>
						
					</el-col>-->
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item :label="$t('Status')" prop="menuState"><!-- 状态 -->
							<el-select v-model="addForm.menuState" :disabled="addForm.allDis">
								<el-option :label="$t('menu.TakeEffect')" value="1"></el-option><!-- 生效 -->
								<el-option :label="$t('menu.Invalid')" value="0"></el-option><!-- 无效 -->
							</el-select>	
						</el-form-item>
					</el-col>
					<!--<el-col :span="12" v-show="addForm.flag==3">
						<el-form-item prop="">
							<el-input type="button" value="查看权限配置菜单">
							</el-input>
						</el-form-item>
					</el-col>-->
				</el-row>
				<el-row :gutter="20"  v-show="addForm.flag==3">
					<el-col :span="12">
						<el-form-item :label="$t('Create_time')"><!-- 创建时间 -->
							<el-input v-model="addForm.createTime" type="datetime" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('Create_user')"><!--创建用户-->
							<el-input v-model="addForm.createUser" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20"  v-show="addForm.flag==3">
					<el-col :span="12">
						<el-form-item :label="$t('Update_time')"><!--修改时间-->
							<el-input v-model="addForm.updateTime"  type="datetime" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('Update_user')"><!--修改用户-->
							<el-input v-model="addForm.updateUser" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addForm')" v-if="addForm.resetDisabled">{{$t('Reset')}}</el-button><!--重置-->
				<el-button v-if="addForm.flag==1" type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button><!--保存-->
				<el-button v-if="addForm.flag==2" type="primary" @click="editSave('addForm')">{{$t('Save')}}</el-button><!--保存-->
			</div>
		</el-dialog>
		<!--菜单新增、修改、查询详情页面结束-->
		
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
    	pageSize:10,//当前页显示几条数据
    	pageIndex:0,//当前页的索引 以0开头
    	totalCount:0,//一共有多少条数据
    	currentPage:1,//当前是第几页
    	queryMenuType:"2",//搜索权限编号或名称
    	queryMenu:"",//搜索的值
    	queryParentName:"",//上级菜单搜索
    	goPage:"",
    	dialogFormVisible:false,//是否显示
    	title:"",//新增菜单
			tableData: [],
			flag:"",//新增1，修改2，查询3
			options:[],
			vie:false,//上级菜单编号是否显示
			rowObj:{},//一条信息的内容
			duoji:[],
			addForm:{
				legalPersonNum:"001",
				companyName:"你好",
				menuNum:"",
				menuName:"",
				menuType:"",
				menuUrl:"",
				parentId:[],
				parentName:"",
				menuState:"1",
				createTime:"",
				createUser:"",
				updateTime:"",
				updateUser:"",
				resetDisabled:false,//是否显示重置接口
				allDis:false
			},//菜单新增、修改、查询详情页面数据
			rules:{
    		menuNum: [
					{ required: true, message: i18n.t('menu.NotEmptyMenuNum') },//菜单编号不能为空
					{ pattern:/^\d/g, message: i18n.t('menu.onlyNumMenuNum') },//菜单编号只能输入数字，请重新输入
					{ min: 2, max: 4, message: i18n.t('menu.onlyTwoAndFourMenuNum')}//菜单编号只能输入2~4位数字，请重新输入
				],
				menuName:[
					{ required: true, message:  i18n.t('menu.NotEmptyMenuName')},//菜单名称不能为空
					{ pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('menu.onlyChineseMenuName')},//菜单名称只能输入汉字，请重新输入
					{ max: 20, message:  i18n.t('noMoreThen20'), trigger: 'change' }//长度不能超过20个字符
				],
				menuType:[
					{ required: true, message:  i18n.t('menu.pleaseMenuType')},//请选择菜单类型
				],
				menuUrl:[
					{ required: true, message: i18n.t('menu.pleaseMenuURL')},//请选输入菜单URL
				],
				parentId:[
					{ required: true, message:  i18n.t('menu.pleaseUpMenu')},//请选择上级菜单
				],
				parentName:[
					{required: true, message: i18n.t('menu.pleaseUpMenuName')},//请选择上级菜单名称
				],
				menuState:[
					{required: true, message: i18n.t('menu.pleaseState')},//请选择状态
				]
    	}
    }
  },
  created(){
  	this.menuList();
  },
  mounted(){
		this.initMenuList(0);
		
  },
  methods:{
	//初始化列表数据
		initMenuList(val){
			this.pageIndex=val;
			this.currentPage=val+1;
			if(this.queryMenu==""){
				var queryObj={//权限名称
						"pageSize":this.pageSize,
						"pageIndex":this.pageIndex,
						"data":{
							"menuName":this.queryMenu,
							"parentName":this.queryParentName
						}
					}
			}else{
//				this.pageIndex=0;
				var queryObj={//权限名称
						"pageSize":this.pageSize,
						"pageIndex":this.pageIndex,
						"data":{
							"menuName":this.queryMenu,
							"parentName":this.queryParentName
						}
					}
			}
//			if(this.queryMenuType==1){//权限编号
//					var queryObj={
//						"pageSize":this.pageSize,
//						"pageIndex":this.pageIndex,
//						"data":{
//							"menuNum":this.queryMenu
//						}
//					}
//				}else{
//					var queryObj={//权限名称
//						"pageSize":this.pageSize,
//						"pageIndex":this.pageIndex,
//						"data":{
//							"menuName":this.queryMenu
//						}
//					}
//				}
			this.$post(this.$api+"/menu/findByPage",queryObj).then( res=>{
					if(res.returnCode=="000000"){
						this.tableData=res.returnData.dataList;
						this.totalCount=res.returnData.total;
					}
				})
		},
		//新增
		authAdd(val){
			this.title=i18n.t('menu.addMenu');//新增菜单
			this.addForm.resetDisabled=true;
			this.addForm.flag=val;
//			this.addForm.menuNum="";
			this.addForm.menuName="";
			this.addForm.menuType="0";
			this.addForm.menuUrl="";
			this.addForm.parentId=[];
			this.addForm.parentName="";
			this.addForm.menuState="1";
			this.addForm.dis=false;
			this.addForm.allDis=false;
			this.menuList()
			this.dialogFormVisible=true;
		},
		
		//上级菜单
		menuList(){
			this.$post(this.$api+"/menu/findTreeList").then( res=>{
				if(res.returnCode=="000000"){
					var d = JSON.stringify(res.returnData).replace(/id/g,'value');
					d = JSON.parse(d)
					this.options=d;
				}
			})
		},
		
		//重置新增
		resetForm(formName) {
//			this.$refs[formName].resetFields();
			if (this.$refs[formName]!==undefined) {
			  this.$refs[formName].resetFields();
			}
		},
		changeType(type){//菜单类型
			if(type==1){
				this.vie=true;
			}else{
				this.vie=false;
			}
		},
		//新增保存
		submitAdd(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					if(this.addForm.menuType==0){
						var addObj={
//								"menuNum":this.addForm.menuNum,
								"menuName":this.addForm.menuName,
								"menuState":this.addForm.menuState,
								"menuType":"0",
								"menuUrl":this.addForm.menuUrl,
								"parentId":"0"
						}
					}else{
						this.duoji=this.addForm.parentId;
//						this.addForm.parentId= this.addForm.parentId[this.addForm.parentId.length-1]
						var parentId=this.addForm.parentId[this.addForm.parentId.length-1]
						var addObj={
//								"menuNum":this.addForm.menuNum,
								"menuName":this.addForm.menuName,
								"menuState":this.addForm.menuState,
								"menuType":"1",
								"menuUrl":this.addForm.menuUrl,
								"parentId":parentId
						}
					}
					this.$post(this.$api+"/menu/saveMenu",addObj).then( res=>{
						if(res.returnCode=="000000"){
							this.initMenuList(0);
							this.$alert(i18n.t('NewSuccess'), {//新增成功
								dangerouslyUseHTMLString: true
							});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('NewFailure'), {//新增失败
								dangerouslyUseHTMLString: true
							});
						}
					})
					
				}
			})
		},
		//修改
		editItem(row,val){
			this.rowObj=row;
			this.addForm.menuNum=row.menuNum;
			this.addForm.menuName=row.menuName;
			this.addForm.menuType=row.menuType;
			if (row.menuType == 1) {
				this.vie = true
			}else{
				this.vie = false
			}
			this.addForm.menuUrl=row.menuUrl;
			this.addForm.parentId=row.parentId;
			this.addForm.menuState=row.menuState;
			this.dialogFormVisible=true;
			this.title=i18n.t('menu.editMenu');//修改菜单
			this.addForm.resetDisabled=false;
			this.addForm.dis=true;
			this.addForm.flag=val;

			this.addForm.allDis=false;
		},
		
		//修改保存
		editSave(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					var editObj=this.rowObj;
					editObj.menuName=this.addForm.menuName;
					editObj.menuType=this.addForm.menuType;
					editObj.menuUrl=this.addForm.menuUrl;
					editObj.parentId=this.addForm.parentId;
					editObj.menuState=this.addForm.menuState;
					this.$post(this.$api+"/menu/updateMenu",editObj).then(res=>{
						if(res.returnCode=="000000"){
							this.initMenuList(this.pageIndex);
							this.$alert( i18n.t('EditSuccess'), {//编辑成功
								dangerouslyUseHTMLString: true
							});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('EditFailure'), {//编辑失败
								dangerouslyUseHTMLString: true
							});
						}
					})
				}
			})
		},
		
		//查看详情
		seeItem(row,val){
			this.addForm.flag=val;
			this.addForm.allDis=true;
			this.title=i18n.t('menu.seeMenuDetails');//查看菜单详情
			this.addForm.menuNum=row.menuNum;
			this.addForm.menuName=row.menuName;
			this.addForm.menuType=row.menuType;
			if (row.menuType == 1) {
				this.vie = true
			}else{
				this.vie = false
			}
			this.addForm.menuUrl=row.menuUrl;
			this.addForm.parentId=row.parentId;
			this.addForm.menuState=row.menuState;
			this.addForm.createTime=row.createTime;
			this.addForm.createUser=row.createUser,
			this.addForm.updateTime=row.updateTime,
			this.addForm.updateUser=row.updateUser,
			this.dialogFormVisible=true;
			this.addForm.dis=true;
		},
		//删除
		deleteItem(row){
			var deleteObj={
				"id":row.id
			}
			var _this =this;
			this.$confirm(i18n.t('orDelete'), i18n.t('Prompt'), {//是否删除?
					confirmButtonText: i18n.t('OK'),//确定
					cancelButtonText: i18n.t('Cancel'),//取消
					type: 'warning'
			}).then(() => {
				this.$post(this.$api+"/menu/deleteMenu",deleteObj).then(res=>{
				if(res.returnCode=="000000"){
							this.initMenuList(this.pageIndex);
							this.$alert( i18n.t('deleteSuccess'), {//删除成功
								dangerouslyUseHTMLString: true
							});
							this.dialogFormVisible=false;
							this.cancel();
						}else{
							var str = `
								<p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
								<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
							`
							this.$alert(str, i18n.t('deleteFailure'), {//删除失败
								dangerouslyUseHTMLString: true
							});
						}
				})
			})
			
		},
		cancel(){//点击页面中的x
			this.dialogFormVisible = false;
			this.resetForm('addForm');
			//this.addForm=$.extend({},this.defaultAddForm);  //重置数据时候,替换一波
	
			this.addForm.flag=false;
			this.addForm.edit=false;
		},
		
		changePage(goPage){
			this.goPage=this.goPage.replace(/\D/g,'');
		},
		//点击确认改变数据
		goPageSure (val) {
			if (val) {
				var mc=Math.ceil(this.totalCount/this.pageSize);
				if(val>0&&val<=mc){
					this.goPage="";
					this.currentPage = parseInt(val);
					this.pageIndex = val-1;
					this.initMenuList(val-1); 
				}else{
					this.goPage="";
					this.currentPage = parseInt(mc);
					this.pageIndex = mc-1;
					this.initMenuList(mc-1); 
				}
			}
		},
		//改变每页显示多少条
		handleSizeChange(val) {
			this.pageSize =  val;
			this.initMenuList(0);
		},
		//选择页数改变数据
		handleCurrentChange(val){
			this.currentPage = val;
			this.pageIndex = val-1;
			this.initMenuList(this.pageIndex); 
		},


		/*
		tree 
        */
//		convertTreeData (list, ParentId) {
//          if (list == null) return null;
//          var parendIdMap = {};
//          for (var index in list) {
//				var key = list[index]["parMenuId"];
//              if (!parendIdMap.hasOwnProperty(key)) {
//                  parendIdMap[key] = [];
//              }
//              parendIdMap[key].push(list[index]);
//          }
//			if (!parendIdMap.hasOwnProperty(ParentId)) return null;
//			var parentTreeList = parendIdMap[ParentId];
//          for(var i in parentTreeList) {
//								var Ptree = parentTreeList[i];
//              this.recursion(parendIdMap, Ptree);
//						}
//          return parentTreeList;
//      },
        /**
        *递归
        */
//		recursion (parendIdMap, parentTree) {
//          var parentId = parentTree.id;
//          var containsKey = parendIdMap.hasOwnProperty(parentId);
//          if (containsKey) {
//              var parentTreeList = parendIdMap[parentId];
//              parentTree.ChildNodes = parentTreeList;
//              parentTree.hasChildren = true;
//              for(var index in parentTreeList)
//              {
//                  var Ptree = parentTreeList[index];
//                  this.recursion(parendIdMap, Ptree);
//              }
//          }
//		}
				
	}
}
</script>

<style scoped>
.save_icon{
	font-size: 14px;
}
.el-pagination .el-select .el-input{width:125px;}
</style>

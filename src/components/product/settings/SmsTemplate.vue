<template>
  <!-- 短信模板管理 -->
  <div class="content_box" id="template_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >通用设置</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >短信模板管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline">
          <el-row>
          <el-col :span="18">
              <el-form-item label="模板名称"> 	<!-- 模板名称 -->
                <el-input v-model="query"  @input="onChangequery()"></el-input>
              </el-form-item>

              <el-form-item label="模板类型">     	<!-- 模板类型 -->
                <el-select v-model="templateType" >
                  <el-option label="全部" value=""></el-option>
                  <el-option  :value="item.bizTypePropCode" 
															v-for="(item,index) in templateTypeList" 
															:key="index"  
                              :label="item.bizTypePropName">{{item.bizTypePropName}}</el-option>
								</el-select>
              </el-form-item>

              <el-form-item label="启用状态">  	<!-- 启用状态 -->
                <el-select v-model="templateStatus" >
                  <el-option label="全部" value=""></el-option>
                  <el-option  :value="item.bizTypePropCode" 
															v-for="(item,index) in templateStatusList" 
															:key="index"  :label="item.bizTypePropName"  >{{item.bizTypePropName}}</el-option>
								</el-select>
              </el-form-item>
          </el-col>

          <el-col :span="6" class="edit_module_btn" >
            <el-form-item>
                  <el-button icon="el-icon-refresh" @click="templateReset()" >重置</el-button>  <!--重置按钮-->
                  <el-button type="warning" icon="el-icon-search" @click="initsysTemplateTList()" >查询</el-button>  <!--查询按钮-->
                  <el-button type="primary" icon="el-icon-plus"  @click="templateAdd('addForm')">新增</el-button> <!--新增按钮-->
            </el-form-item>
           </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
					<h4>短信模板列表</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small'>
							<el-table-column prop="index" type="index" label="序号" align="center" width="60px"></el-table-column><!--序号-->

							<el-table-column prop="name" label="模板名称"   align="center"> </el-table-column><!--模板名称-->

							<el-table-column prop="typeName" label="模板类型"   align="center" > </el-table-column><!--模板类型-->
              
							<el-table-column prop="content" label="内容"  align="center"> </el-table-column><!--内容	-->

							<el-table-column prop="enableStatus" label="启用状态"  align="center"> </el-table-column><!--启用状态	-->
						
							<el-table-column label="操作" align="center" width="180px">
								<template slot-scope="scope">

                  	<el-button size="mini" type="primary" @click="seeItem(scope.row)">
											<i class="iconfont icon-chakan"></i>
											<span class="text">查看</span>
										</el-button>
                    
										<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
											<i class="el-icon-edit"></i>
											<span class="text">编辑</span>
										</el-button>
										<!-- 不可点击 -->
										<el-button size="mini" type="danger" v-if="scope.row.enable == 1" class="delete-btn" @click="deleteItem(scope.row)" :disabled="true">
											<i class="el-icon-delete"></i>
											<span class="text">删除</span>
										</el-button>
										<el-button size="mini" type="danger" v-else class="delete-btn" @click="deleteItem(scope.row)">
											<i class="el-icon-delete"></i>
											<span class="text">删除</span>
										</el-button>
										<!-- <el-button size="mini" type="danger" class="plus-btn">
											<i class="el-icon-plus"></i>
											<span class="text">新增</span>
										</el-button>
									 -->
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
							:total="totalCount"
							>
					</el-pagination>
				</div>
			</div>
		<!--弹框页面开始-->
		<el-dialog title="新增短信模板" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
		  <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" size="small"  label-width="160px">
				<el-row>
            <!-- 模板名称 -->
						<el-col>
							<el-form-item label="模板名称" prop="name"  >
								<el-input v-model="addForm.name" :disabled="addForm.flag"></el-input>
                <el-input  type="hidden" v-model="addForm.id"  name="id" id="id"  ></el-input>
							</el-form-item>
						</el-col>	

            <!-- 模板类型 -->
            <el-col>
							<el-form-item label="模板类型"  prop="typeId" >
								<el-select v-model="addForm.typeId" placeholder="请选择" :disabled="addForm.flag" >
										<el-option v-for="(item,index) in templateTypeList" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}
										</el-option>
								</el-select>
							</el-form-item>
						</el-col>
            <!-- 内容 -->
						<el-col>
							<el-form-item label="内容" prop="content"  >
								<el-input type="textarea"  v-model="addForm.content" :disabled="addForm.flag" ></el-input>
							</el-form-item>
						</el-col>	

            <!-- 启用状态 -->
            <el-col v-if="addForm.edit == 1">
							<el-form-item label="启用状态"  prop="enable" >
								<el-select v-model="addForm.enable" placeholder="请选择">
										<el-option v-for="(item,index) in templateStatusList" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}
										</el-option>
								</el-select>
							</el-form-item>
						</el-col>		

            <el-col v-if="addForm.edit == 2">
							<el-form-item label="启用状态"  prop="enable" >
								<el-select v-model="addForm.enable" placeholder="请选择" >
										<el-option v-for="(item,index) in templateStatusList" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}
										</el-option>
								</el-select>
							</el-form-item>
						</el-col>		

            <el-col v-if="addForm.edit == 3">
							<el-form-item label="启用状态"  prop="enable" >
								<el-select v-model="addForm.enable" placeholder="请选择"  :disabled="addForm.flag">
										<el-option v-for="(item,index) in templateStatusList" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}
										</el-option>
								</el-select>
							</el-form-item>
						</el-col>		


						
				</el-row>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button v-if="addForm.edit == 2" type="primary" @click="editSave()">保存</el-button>
		    <el-button v-if="addForm.edit == 1" type="primary" @click="submitAdd('addForm')">确 定</el-button>
		  </div>
		
		</el-dialog>
		<!--弹框页面结束-->

  </div>
</template>

<script>
export default {
  data () {
    return {
      query:"",//查询的参数
			templateType:"",//查询的类型
      templateTypeList:[], //查询的类型list
			templateStatus:"",//查询的启用状态
			templateStatusList:[],//查询的启用状态list
			legalPersonNum:this.$store.state.loginData.legalPersonNum, //获取登录状态法人
			
			tableData:[],//组件table数据

			currentPage:1,//当前显示第几页 1开头
      pageSize:5,//一页显示几条数据
			totalCount:10,//一共有多少条数据
			indexNo:0,  //需要传过去的参数

			dialogFormVisible: false,//新增弹出框是否显示

	    addForm: {
	      name:'', //模板名称
        typeId:'', //模板类型
        content:'', //内容
        enable:'', //启用状态
        id:'', //id

	      flag:false,   //是否可输入 默认可以
	      edit:1	 // 1代表的是新增 2是编辑  3是查看
	    },
	    rules:{
	    		name: [
            { required: true, message: '模板名称不能为空', trigger: 'blur' },
          ],
          typeId:[
          	{ required: true, message: '请选择模板类型', trigger: 'blur' },
          ],
          content:[
          	{ required: true, message: '请填写模板类型', trigger: 'blur' },
          ],
          enable:[
          	{ required: true, message: '请选择启用状态', trigger: 'blur' },
          ],
	    },
    }
  },
  created(){
    
  },
  mounted(){
    this.initSmsTypeList(); //初始化短信模板类型
		this.initTemplateStatusList(); //初始化启用状态
		this.initsysTemplateTList();  //初始化合同模板列表
  },
  methods:{
    //查询短信模板列表数据
    initsysTemplateTList(){
         var FunMsgData1 = {
          "channelNo":"1",
          "transCode":"SETSMSTEMPLATE300",
          "legalPersonNum":this.legalPersonNum,
          "indexNo":this.indexNo,
          "name":this.query,
          "typeId":this.templateType,
          "enable":this.templateStatus,
          "pageSize":this.pageSize
        };
        this.$post(this.$api,FunMsgData1).then(res=>{
            if(res.returnMsg=="OK"){
                for(var i=0;i<res.rows.length;i++){
                    var obj = res.rows[i];
                    obj.typeName = this.getEnumValue(this.templateTypeList,obj.typeId);
                    obj.enableStatus= this.getEnumValue(this.templateStatusList,obj.enable);
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
    },
    //初始化短信模板类型
    initSmsTypeList(){
      	var smsType = {
          "channelNo":"1",
          "transCode":"SETPARARGS301",
          "legalNum":this.legalPersonNum,
          "bizTypeCode":"SMS_TEMPLATE_TYPE"
        };
        this.$post(this.$api,smsType).then(res =>{
          if(res.returnMsg=="OK"){
              this.templateTypeList = res.rows;
          }
        });
    },
    //初始化启用状态
    initTemplateStatusList(){
        var enabledState = {
          "channelNo":"1",
          "transCode":"SETPARARGS301",
          "bizTypeCode":"ENABLED_STATE"
        };
        this.$post(this.$api,enabledState).then( res =>{
            if(res.returnMsg=="OK"){
              this.templateStatusList = res.rows;
            }
        });
    },
    //重置参数
    templateReset(){
        this.query = '';
        this.templateType ='';
        this.templateStatus ='';
        this.initsysTemplateTList();
    },
    //监听搜索框为空的时候展示全部数据
    onChangequery(){
        this.initsysTemplateTList();
    },
    //点击新增按钮
    templateAdd(formName) {
      this.dialogFormVisible=true;
      this.addForm.edit=1;
    },
    //确定增加
    submitAdd(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
              var _this = this;
              var dataForAdd = {  
                "channelNo":"1",
                "transCode":"SETSMSTEMPLATE000",
                "name":this.addForm.name,
                "typeId":this.addForm.typeId,
                "enable":this.addForm.enable,
                "content":this.addForm.content,
                "id":this.addForm.id		 				
              };
              this.$post(this.$api,dataForAdd).then(res =>{
                debugger
                  if(res.returnMsg=="OK"){
                    if (res.res > 0) {
                        this.$message({
                            message:'模板名称已存在',
                            type: 'warning' 
                        })
                    } else {
                        _this.initsysTemplateTList();
                        _this.dialogFormVisible = false;
                        this.$refs.addForm.resetFields();
                        this.$message({
                            message: i18n.t('user.save_successfully'),
                            type: 'success' 
                        })
                    }
                  }else{
                      this.$message({
                          message:res.returnMsg,
                          type: 'warning' 
                      })
                  }
              });
          } else {
            return false;
          }
      });
    },	
    //点击单个删除按钮
    deleteItem(row){
		  	var dataForDel = {
            "channelNo":"1",
            "transCode":"SETSMSTEMPLATE100",
            "enable":row.enable,
            "id":row.id	        				
        };
				var _this =this;
				this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
						this.$post(this.$api,dataForDel).then(function(res){
								if(res.returnMsg == 'OK'){
                    _this.initsysTemplateTList();
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
      this.addForm.name= row.name
      this.addForm.typeId= row.typeId
      this.addForm.content= row.content
      this.addForm.enable= row.enable
      this.addForm.id= row.id

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
      this.addForm.name= row.name
      this.addForm.typeId= row.typeId
      this.addForm.content= row.content
      this.addForm.enable= row.enable
      this.addForm.id= row.id;
      this.addForm.flag=true;
      this.addForm.edit=3;
    },
    //取消弹框重置数据
    cancel(){
        this.dialogFormVisible=false
        this.addForm.name= ''
        this.addForm.typeId=  ''
        this.addForm.content= ''
        this.addForm.enable=  ''
        this.addForm.id=  ''

        this.addForm.flag=false;
        this.addForm.edit=1;
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
    //改变每页显示多少条
    handleSizeChange(val) {
      this.pageSize =  val;
      this.indexNo = 0
      this.initsysTemplateTList();
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.indexNo = (val-1)*this.pageSize ;
      this.initsysTemplateTList(); 
    },

  }
}
</script>

<style  lang='scss'>
#template_content{
	.el-dialog {
		width:50%!important;
	}
}
</style>

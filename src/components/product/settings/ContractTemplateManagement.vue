<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >通用设置</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >合同模板管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline">
          <el-row>
            <el-col :span="18">
                <el-form-item > 	<!-- 合同名称 -->
                    <el-input placeholder="请输入合同名称" v-model="QcontractName" name="QcontractName"  @input="onChangequery()" > 
                        <template slot="prepend">合同名称</template>    
                    </el-input>
                </el-form-item>

                <el-form-item > 	<!-- 合同编号 -->
                    <el-input placeholder="请输入合同编号" v-model="QcontractNo" name="QcontractNo"  @input="onChangequery()"> 
                        <template slot="prepend">合同编号</template>    
                    </el-input>
                </el-form-item>

            </el-col>

            <el-col :span="6" class="edit_module_btn" >
            <el-form-item>
                <el-button type="warning" icon="el-icon-search" @click="contractSearch()" >查询</el-button>  <!--查询按钮-->
                <el-button type="primary" icon="el-icon-plus"  @click="templateAdd('addForm')">新增</el-button> <!--新增按钮-->
            </el-form-item>
           </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
					<h4>合同模板列表</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small'>
							<el-table-column prop="index" type="index" label="序号" align="center" width="60px"></el-table-column><!--序号-->

							<el-table-column prop="contractName" label="合同名称"   align="center"> </el-table-column><!--合同名称-->

							<el-table-column prop="contractNo" label="合同编号"   align="center" > </el-table-column><!--合同编号-->
              
							<el-table-column prop="cState" label="合同状态"  align="center"> </el-table-column><!--合同状态	-->

							<el-table-column label="操作" align="center" width="180px">
								<template slot-scope="scope">

										<el-button size="mini" class="edit-btn" type="primary"  @click="dowloadItem(scope.row)">
											<i class="el-icon-download"></i>
											<span class="text">下载</span>
										</el-button>
										<!-- 不可点击 -->
										<el-button size="mini" type="danger" v-if="scope.row.contractState == 2" class="delete-btn" @click="deleteItem(scope.row)" :disabled="true">
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
		<el-dialog title="新增合同模板" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
		  <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" size="small"  label-width="160px">
				<el-row>
            <!-- 合同编号 -->
						<el-col>
							<el-form-item label="合同编号" prop="contractNo"  >
								<el-input v-model="addForm.contractNo" :disabled="addForm.flag"></el-input>
							</el-form-item>
						</el-col>	

            <!-- 文件名称 -->
            <el-col>
              <el-form-item label="文件名称" >
                  <!-- <el-upload ref="uploadMaterialFile" action=""   :on-change="uploadChange" :auto-upload="false" id="contractTemplateFileUpload">
                        <el-button type="primary"  size="mini">选择文件</el-button>
                        <div class="el-upload__tip fr" >只能上传pdf/PDF文件</div>
                  </el-upload> -->
	                <input id="contractTemplateFileUpload" type="file" accept="application/pdf"/> <!-- 选择附件 -->
                  <div class="el-upload__tip fr" >只能上传pdf/PDF文件</div>
              </el-form-item>

						</el-col>
            <!-- 模板类型 -->
						<el-col>
							<el-form-item label="模板类型" prop="contractType"  >
                <el-select v-model="addForm.contractType" placeholder="">
                    <el-option v-for="(item,index) in contractTemplateTypeList" 
                            :key="index" 
                            :label="item.bizTypePropName" 
                            :value="item.bizTypePropCode">{{item.bizTypePropName}}
                    </el-option>
                </el-select>
							</el-form-item>
						</el-col>	

            <!-- 合同状态 -->
            <el-col>
							<el-form-item label="合同状态"  prop="contractStatu" >
								<el-select v-model="addForm.contractStatu" placeholder="">
										<el-option v-for="(item,index) in contractTemplateStateList" 
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
		    <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>

		  </div>
		
		</el-dialog>
		<!--弹框页面结束-->

  </div>
</template>

<script>
export default {
  data () {
     var validateFile = (rule, value, callback) =>{
        if (!this.$refs.uploadMaterialFile.uploadFiles.length) {
            callback(new Error('请选择要上传的文件'));
        } else if (this.$refs.uploadMaterialFile.uploadFiles.length > 1) {
          callback(new Error('每次上传只支持一个文件'));
        } else {
            var regx = new RegExp("(.pdf)$|(.PDF)$");
            if (!regx.test(this.$refs.uploadMaterialFile.uploadFiles[this.$refs.uploadMaterialFile.uploadFiles.length-1].name)) {
               callback(new Error('文件格式只支持pdf、PDF'));
            }
            callback();
        }
    }
    return {
      QcontractName:"",//合同名称
			QcontractNo:"",//合同编号
     
      legalPersonNum:this.$store.state.loginData.legalPersonNum, //获取登录状态法人
      loginId:this.$store.state.loginData.loginId,
			
      tableData:[],//组件table数据
      contractTemplateStateList:[],//合同状态
      contractTemplateTypeList:[],//模板类型

			currentPage:1,//当前显示第几页 1开头
      pageSize:5,//一页显示几条数据
			totalCount:10,//一共有多少条数据
      indexNo:0,  //需要传过去的参数
      
      dialogFormVisible: false,//新增弹出框是否显示

	    addForm: {
        contractNo:'', //合同编号
        contractType:'', //模板类型
        contractStatu:'', //合同状态
	      flag:false,   //是否可输入 默认可以
	      edit:false	 //编辑标识
	    },
	    rules:{
	    		contractNo: [
            { required: true, message: '请输入合同编号', trigger: 'blur' },
          ],
          // contractName:[
          //   { validator: validateFile,trigger: 'change' }
          // ],
          contractType:[
          	{ required: true, message: '请选择模板类型', trigger: 'blur' },
          ],
          contractStatu:[
          	{ required: true, message: '请选择合同状态', trigger: 'blur' },
          ],
	    },
    }
  },
  created(){
    
  },
  mounted(){
    this.initContractTemplateTypeList() // 模板类型
    this.initContractTemplateStateList() // 合同状态
		this.initContractList();  //初始化合同模板列表数据
  },
  methods:{
    //初始化合同模板列表数据
    initContractList(){
        var ProductListMsgData1 = {
          "channelNo" : "1",
          "legalPersonNum" : this.legalPersonNum, // 法人代码
          "transCode" : "SETCONTRACTTEMPLATE300",
          "indexNo" : this.indexNo,
          "pageSize" : this.pageSize
        };
        this.$post(this.$api,ProductListMsgData1).then(res=>{
            if(res.returnMsg=="OK"){
                for(var i=0;i<res.rows.length;i++){
                    var obj = res.rows[i];
                    obj.cState= this.getEnumValue(this.contractTemplateStateList,obj.contractState);
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
    //合同状态
    initContractTemplateStateList(){
        var formworkTypeData = {
            "channelNo": "1",
            "transCode": "SETPARARGS301",
            "bizTypeCode": "CONTRACT_TEMPLATE_STATE"
        };
        this.$post(this.$api,formworkTypeData).then(res =>{
          if(res.returnMsg=="OK"){
              this.contractTemplateStateList = res.rows;
          }
        });
    },
    //模板类型
    initContractTemplateTypeList(){
        var formworkTypeData = {
            "channelNo": "1",
            "transCode": "SETPARARGS301",
            "bizTypeCode": "CONTRACT_TEMPLATE_TYPE",
            "legalPersonNum" :this.legalPersonNum // 法人代码
        };
        this.$post(this.$api,formworkTypeData).then(res =>{
          if(res.returnMsg=="OK"){
              this.contractTemplateTypeList = res.rows;
          }
        });
    },
    //查询合同模板
    contractSearch(){
         var ProductListMsgData1 = {
          "channelNo" : "1",
          "legalPersonNum" : this.legalPersonNum, // 法人代码
          "transCode" : "SETCONTRACTTEMPLATE300",
          "contractName" : this.QcontractName, // 合同名称
          "contractNo" : this.QcontractNo, // 合同编号
          "indexNo" : this.indexNo,
          "pageSize" : this.pageSize
        }; 
        this.$post(this.$api,ProductListMsgData1).then(res=>{
            if(res.returnMsg=="OK"){
                for(var i=0;i<res.rows.length;i++){
                    var obj = res.rows[i];
                    obj.cState= this.getEnumValue(this.contractTemplateStateList,obj.contractState);
                };
                this.tableData = res.rows;
                this.totalCount = res.totalCount;
            }else{
                  this.tableData =  res.rows;
                  this.totalCount = res.totalCount;
            }
      }) 
    },
    //点击新增按钮
    templateAdd(formName) {
      this.dialogFormVisible=true;
      this.addForm.edit=false;
    },
    //确定增加
    submitAdd(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
              var _this = this;

              var form = new FormData();
              var file = document.getElementById("contractTemplateFileUpload").files[0];

              var ProductListMsgData = {
                "channelNo" : "1",
                "legalPersonNum" : this.legalPersonNum,
                "transCode" : "SETCONTRACTTEMPLATE300",
                "templateType" :this.addForm.contractType, // 模板类型
                "status" : this.addForm.contractStatu,
                "indexNo" : 0,
                "pageSize" : 0,
                "contractNo" : this.addForm.contractNo // 合同编号
              };

              var ProductListMsgDataB = {
                "channelNo" : "1",
                "legalPersonNum" :this.legalPersonNum,// 法人代碼
                "transCode" : "SETCONTRACTTEMPLATE300",
                "templateType" : this.addForm.contractType, // 模板类型
                "status" : this.addForm.contractStatu,
                "indexNo" : 0,
                "pageSize" : 0,
                "contractName" :file.name // 合同名称
              };
             this.$post(this.$api,ProductListMsgData).then(res =>{
                // 模板存在,仅提醒不新增
								if (res != null && res != undefined && res.rowsCount > 0){
                    this.$message({
                        message:'该合同模板编号已存在',
                        type: 'warning' 
                    })  
                    return false;
								} else { 
                  this.$post(this.$api,ProductListMsgDataB).then(	res => {
                      if (res != null && res != undefined && res.rowsCount > 0){
                        this.$message({
                            message:'该合同模板已存在',
                            type: 'warning' 
                        }) 
                        return false;
                      } else {
                        form.append('file', file);
                        form.append('contractNo',_this.contractNo); // 合同编号
                        form.append('templateType', _this.templateType); // 模板类型
                        form.append('contractState', _this.contractStatu); // 模板状态
                        form.append('legalPersonNum',_this.legalPersonNum); // 法人代碼
                        form.append('loginId', _this.loginId); // 上传人员
                        // this.$post('/setting/uploadFileTemplate', {
                        //     data: form,
                        // })
                        // .then(function (res) {
                        // })
                        // .catch(function (err) {
                        // });
                      }
                  });
                } 
            }) 
        }
     })
    },
    //点击单个删除按钮
    deleteItem(row){
        var  contractNo = row.contractNo;
        var  contractName = row.contractName;

		  	var ProductListMsgData15 = {
          "channelNo": "1",
          "transCode": "SETCONTRACTTEMPLATE301",
          "contractNo": contractNo,
          "contractName": contractName,
          "legalPersonNum" : this.legalPersonNum
        };
				var _this =this;
				this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
						this.$post(this.$api,ProductListMsgData15).then(function(res){
								if(res.returnMsg == 'OK'){
                    _this.initContractList();
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
    //下载模板
    dowloadItem(row){
      	window.open("/setting/contractTemplateDownloadFile?resourcename=" + encodeURI(row.contractName)+"&legalPersonNum=" + this.legalPersonNum);
    },
    //取消弹框重置数据
    cancel(){
      this.dialogFormVisible=false
      this.$refs.addForm.resetFields();
    },
		
    //监听搜索框为空的时候展示全部数据
    onChangequery(){
        this.initContractList();
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
      this.initContractList();
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.indexNo = (val-1)*this.pageSize ;
      this.initContractList(); 
    },

  }
}
</script>

<style  lang='scss'>
#contract_content{
	.el-dialog {
		width:50%!important;
	}
}
.el-upload__tip{
  margin-top: 0;
  margin-left: 10px;
}
</style>

<template>
  <!-- 系统管理- 子系统管理 -->
  <div class="content_box" id="fun_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >系统管理</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >子系统管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form  ref="form" >
        <el-row class="edit_module_search">
          <el-col :span="10">
            <div>
						  <el-input placeholder="请输入系统名称" v-model="queryFunName" name="queryFunName" @input="onChangequery()"> <!--请输入系统名称  -->
						      <template slot="prepend">系统名称</template>    <!-- 系统名称 -->
						  </el-input>
						</div>
          </el-col>
          <el-col :span="14">
			  		<div class="edit_module_btn">
			  			<el-button type="warning" icon="el-icon-search"  @click="systemItemSearch()">{{$t('Query')}}</el-button><!--查询按钮-->
			  			<el-button type="primary" icon="el-icon-plus"  @click="FunAdd()">{{$t('Add')}}</el-button><!--新增-->
			  		</div>
			  	</el-col>
        </el-row>  
      </el-form>
    </div>

		<!-- 列表模块开始-->
    <div class="list_module">
	    	<div class="table_body">
					<h4>子系统列表</h4><!-- 子系统列表 -->
					<el-table :data="tableData" border style="width: 100%"   size='small'>
							<el-table-column  prop="index" type="index" :label="$t('Serial_number')" align="center"  width="60px"></el-table-column><!--序号-->

							<el-table-column prop="sysName"  label="系统名称"  align="center"  width="200px"> </el-table-column><!--系统名称	-->

							<el-table-column prop="sysStatus" label="系统状态"  align="center" width="100px"> </el-table-column><!--系统状态-->

							<el-table-column prop="sysPartStatus" label="内外部系统"  align="center"  width="150px"> </el-table-column><!--内外部系统	-->

							<el-table-column prop="transReqUrl" label="交易请求路径"  align="center"> </el-table-column><!--交易请求路径	-->

							<el-table-column prop="sysGoUrl" label="系统路径"  align="center"> </el-table-column><!--系统路径-->

							<el-table-column :label="$t('group.Operation')" align="center"  width="180px">
								<template slot-scope="scope">
										<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t('Edit')}}</span><!--编辑-->
										</el-button>
										
										<el-button size="mini" type="danger"  v-if="scope.row.funState == 1" class="delete-btn"  :disabled="true">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t('Delete')}}</span><!--删除-->
										</el-button>

										<el-button size="mini" type="danger" v-else class="delete-btn" @click="deleteItem(scope.row)">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t('Delete')}}</span><!--删除-->
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
							:total="totalCount"
							>
					</el-pagination>
				</div>
			</div>
		<!--列表模块结束-->

    <!--新增弹框页面开始-->
    <el-dialog :title="addForm.edit ? '编辑平台系统' : '新增平台系统'"     :visible.sync="addFunDialog" :before-close="cancel"  :close-on-click-modal="false">  <!-- 新增功能 -->
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="demo-ruleForm" size="small">
          <el-form-item  label="系统名称"   prop="sysName">    <!-- 系统名称-->
            <el-input v-model="addForm.sysName"></el-input>
          </el-form-item>
          <el-form-item label="系统状态"   prop="sysStatus">     <!-- 系统状态-->
              <el-radio-group v-model="addForm.sysStatus">
                <el-radio  label="1">已激活</el-radio>
                <el-radio  label="0">未激活</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="内外部系统" prop="sysPartStatus">   <!-- 内外部系统-->
              <el-radio-group v-model="addForm.sysPartStatus">
                <el-radio  label="0">外部系统</el-radio>
                <el-radio  label="1">内部系统</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item  label="系统路径" prop="sysGoUrl">   <!-- 系统路径-->
                <el-input v-model="addForm.sysGoUrl"></el-input>
          </el-form-item>

          <el-form-item label="交易请求路径"   prop="transReqUrl" >    <!-- 交易请求路径-->
            <el-input v-model="addForm.transReqUrl" :disabled="addForm.flag"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button v-if="addForm.edit" type="primary" @click="editSave()">保存</el-button>
		      <el-button v-else type="primary"  @click="submitAdd('addForm')">确 定</el-button>
        </div>
    </el-dialog>
		<!--新增弹框页面结束-->
  </div>
</template>

<script>
export default {
  name: 'SystemItem',
  data () {
      return {
          queryFunName:'', //查询的字段

          currentPage:1,  //当前显示第几页 1开头
          pageSize:5,   //一页显示几条数据
          totalCount:0, //一共有多少条数据
          indexNo:0,  //需要传过去的参数

          tableData:[],   //列表数据
          addFunDialog:false , //默认弹窗状态

          addForm:{            //新增列表
              sysName:'',
              sysStatus:'',
              sysId:'',
              sysPartStatus:'',
              sysGoUrl:'',
              transReqUrl:'',
              flag:false,   //是否可输入 默认可以
	            edit:false	 //编辑标识
          },

          levelType:[],  //初始化功能状态
          systemList:[],  //所属系统
          rules: {  //校验规则
            sysName: [
              { required: true, message: '请输入系统名称'},
            ],
            sysGoUrl: [
              { required: true, message: '请输入系统路径'}
            ],
            transReqUrl: [
              { required: true, message: '请输入交易请求路径'}
            ],
          }
         
      }
   },
   created(){
     this.defaultAddForm=$.extend({},this.addForm); 
   },
    mounted(){
      this.getSystemItemList();  //获取子系统列表数据
    },
  methods:{
    //获取子系统列表数据
  	getSystemItemList(){
          var GroupListData2 = {
            "channelNo":"1",
            "transCode":"SETSYSYSTEM300",
            "indexNo": this.indexNo,
            "pageSize":this.pageSize,
          };
          this.$post(this.$api,GroupListData2).then( res=>{
              if(res.returnMsg=="OK"){
                this.tableData = res.rows;
                this.totalCount = res.totalCount;
              }
               
          })
    },
    //功能列表查询
  	systemItemSearch(){
          this.indexNo = 0;
          var GroupListData1 = {
              "channelNo":"1",
              "transCode":"SETSYSYSTEM300",
              "sysName":this.queryFunName,
              "indexNo": this.indexNo,
              "pageSize":this.pageSize,
          };
          this.$post(this.$api,GroupListData1).then( res=>{
              if(res.returnMsg=="OK"){
                this.tableData = res.rows;
                this.totalCount = res.totalCount;
              }else{
                this.tableData = res.rows;
                this.totalCount = res.totalCount;
              }
               
          })
    },
    //新增打开弹出框
    FunAdd(){
      this.addFunDialog = true;
      this.addForm.edit=false;
    },
    //确定新增
    submitAdd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var systemListData4 = {
                "channelNo":"1",
                "transCode":"SETSYSYSTEM000",
                "sysName":this.addForm.sysName,
                "sysStatus":this.addForm.sysStatus,
                "sysPartStatus":this.addForm.sysPartStatus,
                "sysGoUrl":this.addForm.sysGoUrl,
                "transReqUrl":this.addForm.transReqUrl
              };
             
              this.$post(this.$api,systemListData4).then( res=>{
                if(res.returnMsg=="OK"){
                  this.$message({
                    message:'添加成功',
                    type: 'success' 
                  })
                  this.resetForm('addForm');
                  this.addFunDialog = false;
                  this.getSystemItemList();
                }else{
                  this.$message({
                    message:res.returnMsg,
                    type: 'warning' 
                  })
                }
            })

          } 
        });
    },
    //删除功能
    deleteItem(row){
      var _this = this;
      	var FunMsgData5 = {
            "channelNo":"1",
            "transCode":"SETSYSYSTEM100",
            "sysId":row.sysId
        };
        this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
				}).then(() => {
						this.$post(this.$api,FunMsgData5).then(function(res){
								if(res.returnMsg == 'OK'){
                    _this.getSystemItemList();
                    _this.queryFunName = ''
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
				})
    },
    //编辑功能
    editItem( row){
      this.addFunDialog = true;
      this.addForm.edit=true;
      this.addForm.flag=true;
      row.sysStatus == '已激活' ? this.addForm.sysStatus = '1' :  this.addForm.sysStatus = '0';
      row.sysPartStatus == '内部' ? this.addForm.sysPartStatus = '1' :  this.addForm.sysPartStatus   = '0';
      this.addForm.sysName = row.sysName;  
      this.addForm.sysGoUrl=row.sysGoUrl;
      this.addForm.transReqUrl=row.transReqUrl;
    },
    //保存编辑
    editSave(){
        var GroupListData5 = {
				 		"channelNo":"1",
						"transCode":"SETSYSYSTEM200",
						"sysName":this.addForm.sysName,
						"sysStatus":this.addForm.sysStatus,
						"sysId":this.addForm.sysId,
						"sysPartStatus":this.addForm.sysPartStatus,
						"sysGoUrl":this.addForm.sysGoUrl,
						"transReqUrl":this.addForm.transReqUrl
        };
        this.$post(this.$api,GroupListData5).then( res=>{
              if(res.returnMsg=="OK"){
                this.$message({
                  message:'保存成功',
                  type: 'success' 
                })
                this.cancel();  
                this.addFunDialog = false;
                this.getSystemItemList();
              }else{
                this.$message({
                  message:res.returnMsg,
                  type: 'warning' 
                })
              }
              
        })
    },
    //取消弹框重置数据
    cancel(){
      this.addFunDialog = false;
      this.addForm.flag=false;
      this.resetForm('addForm');
       
      this.addForm = $.extend({},this.defaultAddForm)
    },

    //关闭弹框重置数据
    handleClose(done){
        this.cancel();
        done();
    },

    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //监听搜索框为空的时候展示全部数据
    onChangequery(){
        this.systemItemSearch();
    },  
    //改变每页显示多少条
    handleSizeChange(val) {
      this.pageSize =  val;
      this.indexNo = 1
      this.getSystemItemList();
    },
    //选择页数改变数据
    handleCurrentChange(val){
      this.currentPage = val;
      this.indexNo = (val-1) * this.pageSize ;
      this.getSystemItemList(); 
    },

  }
}
</script>


<style  lang='scss'>
// 修改的弹框样式
#fun_content{
    .el-dialog {
      width:50%;
    }
}
</style>


<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="22">
              <!-- 参数名称 -->
              <el-form-item :label="$t('product.name_of_parameter')"> 
                <el-input v-model="obj.paramName" class="input-with-select"></el-input> 
              </el-form-item> 
              <!-- 参数代码 -->
              <el-form-item :label="$t('product.parametric_code')"> 
                <el-input v-model="obj.paramCode" class="input-with-select"></el-input> 
              </el-form-item>    
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()" v-if="funList.indexOf('新增') > -1" size="small">{{$t("Add")}}</el-button>  <!-- 新增 -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
          <!-- 参数列表 -->
					<h4>{{$t('product.parameter_list')}}</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')"  align="center" width="135px"></el-table-column><!--序号-->

							<el-table-column prop="paramName" :label="$t('product.name_of_parameter')"  align="center" min-width="170px"> </el-table-column><!--参数名称-->

							<el-table-column prop="paramCode" :label="$t('product.parametric_code')"   align="center" min-width="185px"> </el-table-column><!--参数代码-->

              <el-table-column prop="updateTime" :label="$t('product.maintenance_date')"  align="center" min-width="160px">
                <template slot-scope="scope">
                  {{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
                </template>
              </el-table-column><!--维护日期	-->

              <el-table-column prop="updateUser" :label="$t('product.maintain_user')"  align="center" min-width="150px"> </el-table-column><!--维护用户	-->

              <!-- 操作 -->
							<el-table-column :label="$t('Operation')" align="center" width="180px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1" min-width="130px">
								<template slot-scope="scope">
										<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
											<i class="el-icon-view"></i>
											<span class="text">{{$t('See')}}</span><!-- 查看 -->
										</el-button>
                    <el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t('Edit')}}</span><!-- 编辑 -->
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
											<i class="el-icon-delete"></i>
											<span class="text">删除</span>
										</el-button>
								</template>
							</el-table-column>
					</el-table>
					<el-pagination
					@current-change="handleCurrentChange"
					:current-page="obj.pageIndex"
					:page-size="obj.pageSize"
					layout="prev, pager, next, slot"
					:total="totalCount">
					<template slot>
						<div class="slot_pag">
              <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange">  <!-- 10条/页 -->
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
							<span>{{$t('Jump_to')}} </span><!-- 跳转至 -->
							<el-input size="mini" v-model="obj.goPage" type="number">
								</el-input><span>{{$t('Pag')}}</span><!-- 页 -->
							<el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button><!-- 确定 -->
						</div>
					</template>
				</el-pagination>
				</div>
			</div>
		<!--弹框页面开始-->
		<!--新增弹框页面开始-->
    <el-dialog :title="addForm.edit ? $t('product.edit_parameters') : (addForm.flag ? $t('product.details_of_parameters') : $t('product.new_parameters'))" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">  <!-- 新增用户 -->
      	<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="addForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
			    <el-row class="edit_module_search">
          <el-col :span="12">
              <!-- 法人编号 -->
              <el-form-item :label="$t('product.legal_person_number')"> 
                <el-input v-model="addForm.legalPersonNum" disabled></el-input>
              </el-form-item>
          </el-col>		
          <el-col :span="12">
              <!-- 公司名称 -->
                <el-form-item :label="$t('product.company_name')">   
                  <el-input type="text"  v-model="addForm.companyName" disabled></el-input >
                </el-form-item>
          </el-col>	

          <el-col :span="12">
            <!-- 参数名称 -->
                <el-form-item :label="$t('product.name_of_parameter')"   :prop="(addForm.edit || addForm.flag) ? '' : 'paramName'">   
                  <el-input type="text" v-model="addForm.paramName" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12">
            <!-- 参数代码 -->
                <el-form-item :label="$t('product.parametric_code')"  :prop="(addForm.edit || addForm.flag) ? '' : 'paramCode'">   
                  <el-input type="text" v-model="addForm.paramCode" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>		
          <el-col :span="12" v-if="addForm.flag">
            <!-- 创建时间 -->
                <el-form-item :label="$t('product.create_time')"> 
                  <el-input type="text" v-model="addForm.createTime" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addForm.flag">
            <!-- 创建用户 -->
                <el-form-item :label="$t('product.create_user')"> 
                  <el-input type="text" v-model="addForm.createUser" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addForm.flag">
            <!-- 维护时间 -->
                <el-form-item :label="$t('product.maintenance_time')"> 
                  <el-input type="text" v-model="addForm.updateTime" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12"  v-if="addForm.flag">
            <!-- 维护用户 -->
                <el-form-item :label="$t('product.maintain_user')"> 
                  <el-input type="text" v-model="addForm.updateUser" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
        </el-row> 
      </el-form>
      <div class="diatable">
          <div class="title" style="display: flex; justify-content: space-between; margin: 10px 0;">
            <h4>{{$t('product.list_of_parameter_values')}}</h4>
            <el-button size="small" type="primary" @click="addParas('addparamsForm')" v-if="!addForm.flag">{{$t('product.adding_parameter_values')}}</el-button>
          </div>
          <el-table :data="addForm.listParamValue" border size='small' :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->

							<el-table-column prop="paramSname" :label="$t('product.front-end_display_value')" align="center" min-width="170px"> </el-table-column><!--前端显示值-->

							<el-table-column prop="paramValue" :label="$t('product.backend_saved_values')"   align="center"  min-width="165px"> </el-table-column><!--后端保存值-->

							<el-table-column :label="$t('Operation')" align="center"  min-width="180px">
								<template slot-scope="scope">
                    <el-button size="mini" type="danger" class="delete-btn" @click="editParams('addparamsForm', scope.row, scope.$index)" :disabled="addForm.flag">
											<span class="text">{{$t('Edit')}}</span><!--编辑-->
										</el-button>
                    
										<el-button size="mini" type="danger" class="delete-btn" @click="delParams(scope.$index)" :disabled="addForm.flag">
											<span class="text">{{$t('Delete')}}</span><!--删除-->
										</el-button>
								</template>
							</el-table-column>
					</el-table>
      </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('addForm')" v-if="addUserDialog && !addForm.edit && !addForm.flag">{{$t('Reset')}}</el-button><!--重置-->
            <el-button type="primary" @click="sure('addForm')" v-if="!addForm.flag">{{$t('Save')}}</el-button><!--保 存-->
          </div>
      </el-dialog>
    <!--新增弹框页面结束-->
		<el-dialog :title="params.edit ? '编辑参数值' : '新增参数值'" :visible.sync="addparamsDialog" :close-on-click-modal="false" width="400px !important" :before-close="cancels1">  <!-- 新增用户 -->
      	<el-form :model="params" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="addparamForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small" :inline="false">
              <el-form-item :label="$t('product.front-end_display_value')" prop="paramSname"> <!--前端显示值-->
                <el-input v-model="params.paramSname"></el-input>
              </el-form-item>
                <el-form-item :label="$t('product.backend_saved_values')" prop="paramValue">   <!--后端保存值-->
                  <el-input type="text"  v-model="params.paramValue"></el-input >
                </el-form-item>
        </el-form>
      
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm1('addparamForm')" v-if="addparamsDialog && !params.edit">{{$t('Reset')}}</el-button><!--重置-->
            <el-button type="primary" @click="sureParas('addparamForm')">{{$t('Save')}}</el-button><!--保 存-->
          </div>
      </el-dialog>
	

  </div>
</template>

<script>
export default {
  name: 'ParameterManage',
  data () {
    return {
      tableData:[{}],  //user 列表数据
      obj: {
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //需要传过去的参数
        paramCode: '',
        paramName: '',
        goPage: null,
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum
      },
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      addUserDialog:false,  //弹框	
      addparamsDialog: false,
      addForm:{
        legalPersonNum: '',
        companyName: '',
        paramCode: '',
        paramName: '',
        listParamValue: [],
        createUser: 'admin',
        flag:false,   //是否可输入 默认可以
        edit:false	 //编辑标识
      },
      params: {
        paramSname: '',
        paramValue: '',
        edit: false,
        idx: ''
      },
	    
	    rules:{
	    		paramCode: [
            { required: true, message: i18n.t('product.please_enter_parameter_code'), trigger: 'blur' },
            { pattern:/^[A-Za-z_]+$/, message: i18n.t('product.parametric_code_can_only_enter_letters_and_underscores') }
          ],
          paramName: [
            { required: true, message: i18n.t('product.please_enter_parameter_name'), trigger: 'blur' },
            { pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('product.parameter_names_can_only_be_entered_into_Chinese_characters') },
            { max: 20, message: i18n.t('product.no_more_than_20_characters_in_length'), trigger: 'change' }
          ],
          paramSname:[
            { required: true, message: i18n.t('product.please_enter_the_front-end_display_value'), trigger: 'blur' },
            { max: 20, message: i18n.t('product.no_more_than_20_characters_in_length'), trigger: 'change' }
          ],
          paramValue:[
            { required: true, message: i18n.t('product.please_enter_back-end_saved_values'), trigger: 'blur' },
            { max: 20, message: i18n.t('product.no_more_than_20_characters_in_length'), trigger: 'change' }
          ],
	    },
		  funList: []
    }
  },
  mounted(){
    this.display(); // 初始化数据
    this.getFunList()
  },
  methods:{
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '参数管理'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 点击确定页面跳转
    goPageSure () {
      if (this.obj.goPage) {
        var mc=Math.ceil(this.totalCount/this.obj.pageSize);
        if (this.obj.goPage) {
          if(this.obj.goPage>0&&this.obj.goPage<=mc){
            this.obj.pageIndex = parseInt(this.obj.goPage)
          }else{
            this.obj.pageIndex = parseInt(mc)
          }
        }
        this.display()
        this.obj.goPage = null
      }
    },
    // 删除参数项
    delParams (idx) {
      this.addForm.listParamValue.splice(idx, 1)
    },
    // 修改参数项
    editParams (formName, row, idx) {
      this.addparamsDialog = true
      this.params.edit = true
      this.params.paramSname = row.paramSname
      this.params.paramValue = row.paramValue
      this.params.idx = idx
    },
    // 增加参数项
    addParas () {
      this.addparamsDialog = true
      this.params.paramSname = ''
      this.params.paramValue = ''
    },
    // 确定增加参数项
    sureParas (formName) {
      let self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
        if (this.params.edit) {
          this.addForm.listParamValue[this.params.idx].paramSname = this.params.paramSname
          this.addForm.listParamValue[this.params.idx].paramValue = this.params.paramValue
        
        } else {
          this.addForm.listParamValue.push({
            paramSname: this.params.paramSname,
            paramValue: this.params.paramValue
          })
        }
        this.params.edit = false
        this.addparamsDialog = false
        } else {
          return false;
        }
      })
    },
    // 确定
    sure (formName) {
      let self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
        let path = ''
        if (self.addForm.edit) {
          path = '/paramter/updateParam'
          self.addForm.createUser = ''
          self.addForm.updateUser = self.$store.state.loginData.userLogin.userName
        } else {
          path = '/paramter/addParam'
          self.addForm.createUser = self.$store.state.loginData.userLogin.userName
          self.addForm.updateUser = ''
        }
        self.$post(self.$api + path,self.addForm).then(res =>{
          if(res.returnCode == '000000'){
             if (self.addForm.edit) {
                self.$alert(i18n.t('product.edit_success'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              } else {
                self.$alert(i18n.t('product.new_success'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
              }
            self.addUserDialog = false;
            self.$refs[formName].resetFields();
            self.addForm.flag=false;
            self.addForm.edit=false;
            self.display()
          } else {
            var str = `
              <p>${self.$t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${self.$t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
            `
            self.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }
        });
      } else {
          return false;
        }
      })
    },
    // 初始化列表
    display:function(){
      this.$post(this.$api + '/paramter/queryByPage',this.obj).then(res =>{
        if(res.returnCode == '000000'){
          this.tableData =  res.returnData.rows;
          this.totalCount = res.returnData.total;
        } else {
          var str = `
            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
          `
          this.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });

    },
    // 根据获取法人公司信息
    getFrInfo () {
      this.$post(this.$api + '/user/findLegaNumAndName',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
        if(res.returnCode == '000000'){
          this.addForm.legalPersonNum = res.returnData.legalPersonNum
          this.addForm.companyName = res.returnData.legalPersonName
        } else {
          var str = `
            <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
          `
          this.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });
    },
    //查询列表
    QueryUser(){
      this.obj.pageIndex = 1;
      this.display()
    },
    //打开新增弹框
    openUserDiolog(){
      this.addUserDialog = true;
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.paramCode = ''
      this.addForm.paramName = ''
      this.addForm.listParamValue = []
      this.addForm.flag = false;
      this.getFrInfo()
    },
    // 查看
    seeItem (row) {
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = false;
      this.addForm.flag = true
      this.getFrInfo()
      self.$post(self.$api + '/paramter/queryDetail',{paramCode:row.paramCode, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
        if(res.returnCode == '000000'){
          // self.addForm.roleNum = res.returnData.roleNum
          self.addForm.paramCode = res.returnData.paramCode
          self.addForm.paramName = res.returnData.paramName
          self.addForm.listParamValue = row.listParamValue
          self.addForm.createTime = res.returnData.createTime
          self.addForm.createUser = res.returnData.createUser
          self.addForm.updateTime = res.returnData.updateTime
          self.addForm.updateUser = res.returnData.updateUser
        } else {
          var str = `
            <p>${self.$t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${self.$t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
          `
          self.$alert(str, i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
      });
    },
    // 修改
    editItem (row) {
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = true;
      this.getFrInfo()
      setTimeout(function() {
        self.$post(self.$api + '/paramter/queryDetail',{paramCode:row.paramCode, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
          if(res.returnCode == '000000'){
            // self.addForm.roleNum = res.returnData.roleNum
            self.addForm.paramCode = res.returnData.paramCode
            self.addForm.paramName = res.returnData.paramName
            self.addForm.listParamValue = row.listParamValue
          } else {
            var str = `
              <p>${self.$t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${self.$t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
            `
            self.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }
        });
      }, 50)
    },
    // 删除
    deleteItem(row){
      var _this =this;
      this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
          confirmButtonText: i18n.t('OK'),
          cancelButtonText: i18n.t('Cancel'),
          type: 'warning'
      }).then(() => {
        this.$post(this.$api + '/paramter/deleteParam',{paramCode: row.paramCode, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(function(res){
          if(res.returnCode == '000000'){
            _this.display();
            _this.$alert(i18n.t('product.successfully_delete'), i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }else{
            var str = `
              <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
            `
            _this.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }
        })
      }).catch(() => {
        
      });
    },

    //取消弹框重置数据
    cancels(formName){
      this.addUserDialog = false;
      this.addForm.flag=false;
      this.addForm.edit=false;
      if (this.$refs[formName]!==undefined) {
        this.$refs[formName].resetFields();
      }
      this.addForm.paramCode = ''
      this.addForm.paramName = ''
      this.addForm.listParamValue = []
    },
    cancels1(formName){
      this.addparamsDialog = false;
      this.params.idx = '';
      this.params.edit=false;
      if (this.$refs['addparamForm']!==undefined) {
        this.$refs['addparamForm'].resetFields();
      }
      this.params.paramSname = ''
      this.params.paramValue = ''
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addForm.listParamValue = []
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
    //监听搜索框为空的时候展示全部数据
    onChangequery(){
      this.QueryUser();
    },  
    
    //改变每页显示多少条
    handleSizeChange(val) {
      this.obj.pageSize =  val;
      this.obj.pageIndex = 1
      this.display();
    },
    //选择页数改变数据
    handleCurrentChange(val) {
      this.obj.pageIndex =val;
      this.display();
    },
    // 选取文件以后
    onPreview (file) {
      this.fileList = file.name
    }
  }
}
</script>

<style  lang='scss'>
.el-upload__tip{
  margin-top: 0;
  margin-left: 10px;
}
.el-input-group__prepend{
  background: #3a8ee6;
  color: #fff;
  border: none;
}
</style>

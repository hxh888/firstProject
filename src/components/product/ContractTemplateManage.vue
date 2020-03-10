<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row  class="edit_module_search">
            <el-col :span="18">
              <el-form-item :label="$t('product.contract_template_number')"> 
                <el-input v-model="obj.contractNo" class="input-with-select"></el-input> 
              </el-form-item> 
              <el-form-item :label="$t('product.name_of_contract_template')"> 
                <el-input v-model="obj.contractName" class="input-with-select"></el-input> 
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
					<h4>{{$t('product.list_of_contract_templates')}}</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->

							<el-table-column prop="contractNo" :label="$t('product.contract_template_number')"  align="center" min-width="210px"> </el-table-column><!--合同编号-->

							<el-table-column prop="contractName" :label="$t('product.name_of_contract_template')"   align="center" min-width="200px"> </el-table-column><!--合同名称-->
              
							<el-table-column prop="updateTime" :label="$t('product.maintenance_date')"  align="center" min-width="155px">
                <template slot-scope="scope">
                  {{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
                </template>
              </el-table-column>
              <el-table-column prop="updateUser" :label="$t('product.maintain_user')"  align="center" min-width="150px"> </el-table-column>
							<el-table-column :label="$t('Operation')" align="center" min-width="180px" v-if="funList.indexOf('下载') > -1 ||funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1">
								<template slot-scope="scope">

										<el-button size="mini" class="edit-btn" type="primary"  @click="dowloadItem(scope.row)" v-if="funList.indexOf('下载') > -1">
											<i class="el-icon-download"></i>
											<span class="text">{{$t('product.download')}}</span>
										</el-button>
										<!-- 不可点击 -->
										<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)"  v-if="funList.indexOf('查看') > -1">
											<i class="el-icon-view"></i>
											<span class="text">{{$t('See')}}</span>
										</el-button>
                    <el-button size="mini" class="edit-btn" @click="editItem(scope.row)"  v-if="funList.indexOf('编辑') > -1">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t('Edit')}}</span>
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)"  v-if="funList.indexOf('删除') > -1">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t('Delete')}}</span>
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
							<span>{{$t('Jump_to')}} </span>
							<el-input size="mini" v-model="obj.goPage" type="number">
								</el-input><span>{{$t('Pag')}}</span>
							<el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button>
						</div>
					</template>
				</el-pagination>
				</div>
			</div>
		<!--弹框页面开始-->
		<!--新增弹框页面开始-->
    <el-dialog :title="addForm.edit ? $t('product.edit_contract_template') : (addForm.flag ? $t('product.contract_template_details') : $t('product.add_contract_template'))" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false" width="60%">  <!-- 新增用户 -->
      	<el-form  :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="addForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small">
			    <el-row class="edit_module_search">
          <el-col :span="12">
              <el-form-item :label="$t('product.legal_person_number')"> 
                <el-input v-model="addForm.legalPersonNum" disabled></el-input>
              </el-form-item>
          </el-col>		
          <el-col :span="12">
                <el-form-item :label="$t('product.company_name')">   
                  <el-input type="text"  v-model="addForm.companyName" disabled></el-input >
                </el-form-item>
          </el-col>	

          <el-col :span="12">
                <el-form-item :label="$t('product.contract_template_number')"   prop="contractNo" v-if="addForm.flag || addForm.edit">   
                  <el-input type="text" v-model="addForm.contractNo" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12">
                <el-form-item :label="$t('product.name_of_contract_template')"   :prop="addForm.flag?'': 'contractName'">   
                  <el-input type="text" v-model="addForm.contractName" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          
          <el-col :span="(addForm.flag || addForm.edit) ? 24 : 12">
            <el-form-item :label="$t('product.contract_template')" prop="filename" :class="addForm.flag ? 'ban' : ''">
              <el-input type="text" v-model="addForm.filename" disabled>
               <div slot="prepend">
                  <el-upload ref="upload" class="upload-demo" :action="$api + path" :show-file-list="false" :before-upload="beforeUpload" :auto-upload="false" :data="addForm" :on-change="onPreview" :limit='1' :on-success="sureBack" :disabled="addForm.flag">
                    <el-button size="small" type="primary" :disabled="addForm.flag" @click="clearFile">{{$t('product.select_contract_template')}}</el-button>
                  </el-upload>
                </div> 
                <!-- <el-button slot="append" size="small" @click="$refs.upload.clearFiles();addForm.filename = ''" :disabled="addForm.flag">删除</el-button> -->
              </el-input>
            </el-form-item>
 
          </el-col>	
          <el-col :span="24">
            <el-form-item :label="$t('product.explain')" prop="explain">
              <el-input type="textarea" v-model="addForm.explain" :disabled="addForm.flag"></el-input>
            </el-form-item>
          </el-col>	

          <el-col :span="12" v-if="addForm.flag">
                <el-form-item :label="$t('product.create_time')"> 
                  <el-input type="text" v-model="addForm.createTime" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addForm.flag">
                <el-form-item :label="$t('product.create_user')"> 
                  <el-input type="text" v-model="addForm.createUser" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addForm.flag">
                <el-form-item :label="$t('product.maintenance_time')"> 
                  <el-input type="text" v-model="addForm.updateTime" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="12"  v-if="addForm.flag">
                <el-form-item :label="$t('product.maintain_user')"> 
                  <el-input type="text" v-model="addForm.updateUser" :disabled="addForm.flag"></el-input>
                </el-form-item>
          </el-col>
        </el-row> 
      </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('addForm')" v-if="addUserDialog && !addForm.edit && !addForm.flag">{{$t('Reset')}}</el-button>
            <el-button type="primary" @click="sure()" v-if="!addForm.flag">{{$t('Save')}}</el-button>
          </div>
      </el-dialog>
    <!--新增弹框页面结束-->
		
	

  </div>
</template>

<script>
export default {
  name: 'ContractTemplateManage',
  data () {
    var isFileName = (rule, value, callback) =>{
      if (!value) {
        callback(new Error(i18n.t('product.the_contract_template_name_cannot_be_empty')));
      } else if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error(i18n.t('product.the_name_of_the_contract_template_can_only_be_entered_in_Chinese_characters')));
      } else {
        if (!this.addForm.edit) {
          this.$post(this.$api + '/contract/contractNameIsHave',{legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum, contractName: this.addForm.contractName}).then(res =>{
            if (res.returnCode == '000000') {
              callback();
            } else {
              callback(new Error(i18n.t('product.the_contract_template_name_already_exists')));
            }
          });
        } else {
          callback();
        }
      }
    }
    
    return {
      tableData:[{}],  //user 列表数据
      obj: {
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //需要传过去的参数
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        goPage: null,
        contractNo: '',
        contractName: ''
      },
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      addUserDialog:false,  //弹框	

      addForm:{
        legalPersonNum: '',
        companyName: '',
        contractNo: '',
        contractName: '',
        explain: '',
        filename: '',
        flag:false,   //是否可输入 默认可以
        edit:false	 //编辑标识
      },
      path: '/contract/addContract',
      oldfilename: '',
      succ:"编辑成功",
	    rules:{
          contractName:[
            {required: true,validator: isFileName, trigger: 'change' },
            { max: 20, message: i18n.t('product.length_cannot_exceed_20_characters'), trigger: 'change' }
          ],
          explain:[
            { required: true, message: i18n.t('product.employeePhone_Explanation_cannot_be_emptyverification'), trigger: 'change' },
            { max: 150, message: i18n.t('product.length_cannot_exceed_150_characters'), trigger: 'change' }
          ],
          filename:[
          	{ required: true, message: i18n.t('product.Please_select_file'), trigger: 'change' },
          ],
      },
      fileList:[],
      funList: []
    }
  },
  watch: {
    'addForm.edit' (n) {
      if (n) {
        this.path = '/contract/updateContract'
      } else {
        this.path = '/contract/addContract'
      }
    }
  },
  mounted(){
    this.getFunList()
		this.display(); // 初始化数据
  },
  methods:{
    // 上传文件之前判断文件大小
    beforeUpload (file) {
      const is10M = file.size/1024/1024 < 10
      if (!is10M) {
        this.$alert('上传文件大小不能超过10MB！', i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
          this.$refs.upload.clearFiles()
          this.addForm.filename = ''
      }
      return is10M
    },
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '合同模板管理'
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
    // 清除文件列表
    clearFile () {
      this.$refs.upload.clearFiles()
    },
    // 提交信息
    sure () {
      let self = this
      self.$refs['addForm'].validate((valid) => {
        if (valid) {
          if (this.addForm.filename && this.oldfilename != this.addForm.filename) {
            this.addForm.createUser = this.$store.state.loginData.userLogin.userName
            this.$refs.upload.submit();
          } else {
            this.addForm.updateUser = this.$store.state.loginData.userLogin.userName
            this.$post(this.$api + '/contract/updateContractExplain',this.addForm).then(res =>{
              if(res.returnCode == '000000'){
                if (this.addForm.edit) {
                  this.$alert(i18n.t('product.edit_success'), i18n.t('Prompt'), {
                    dangerouslyUseHTMLString: true
                  });
                } else {
                  this.$alert(i18n.t('product.new_success'), i18n.t('Prompt'), {
                    dangerouslyUseHTMLString: true
                  });
                }
                this.addUserDialog = false;
                this.$refs['addForm'].resetFields();
                this.$refs.upload.clearFiles()
                this.addForm.flag=false;
                this.addForm.edit=false;
                this.display()
              } else {
                this.oldfilename = this.addForm.filename
                this.$refs.upload.clearFiles()
                var str = `
                  <p>${ i18n.t('Error_code')}:  <span style='color:#5bc0de'>${res.returnCode}</span></p>
                  <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
                `
                this.$alert(str, i18n.t('Prompt'), {
                  dangerouslyUseHTMLString: true
                });
              }
            })
          }
          
        } else {
          return false;
        }
      });
    },
    // 确定
    sureBack (res) {
      if(res.returnCode == '000000'){
//    	this.$alert('新增成功！', i18n.t('Prompt'), {
        if (this.addForm.edit) {
          this.$alert(i18n.t('product.edit_success'), i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        } else {
          this.$alert(i18n.t('product.new_success'), i18n.t('Prompt'), {
            dangerouslyUseHTMLString: true
          });
        }
        this.addUserDialog = false;
        this.oldfilename = ''
        this.addForm.edit=false;
        this.$refs['addForm'].resetFields();
        this.$refs.upload.clearFiles()
        this.addForm.flag=false;
        this.display()
      } else {
        // if (this.addForm.edit) {
        //   this.oldfilename = this.addForm.filename
        // } else {
        //   this.oldfilename = ''
        // }
        this.oldfilename = this.addForm.filename
        var str = `
          <p>${ i18n.t('Error_code')}:  <span style='color:#5bc0de'>${res.returnCode}</span></p>
          <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
        `
        this.$alert(str, i18n.t('Prompt'), {
          dangerouslyUseHTMLString: true
        });
      }
    },
    // 初始化列表
    display:function(){
      this.$post(this.$api + '/contract/queryByPage',this.obj).then(res =>{
        if(res.returnCode == '000000'){
          this.tableData =  res.returnData.rows;
          this.totalCount = res.returnData.total;
        } else {
          var str = `
            <p>${ i18n.t('Error_code')}:  <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
            <p>${ i18n.t('Error_code')}:  <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
    	this.succ="新增成功"
      this.addForm.contractNo = ''
      this.addForm.filepath = ''
      this.addUserDialog = true;
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      if (this.$refs.upload!==undefined) {
        this.$refs.upload.clearFiles();
      }
      
      this.addForm.flag = false;
      this.getFrInfo()
    },
    // 下载文件
    dowloadItem (row) {
      let fname = ''
      let arr = []
      let self = this
      arr = row.contarctUrl.split('/')
      fname = arr[arr.length-1]
      window.open(self.$api + '/contract/uploadContract?resourcename=' + fname + '&legalPersonNum=' + self.$store.state.loginData.userLogin.legalPersonNum)
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
      setTimeout(function() {
        self.$post(self.$api + '/contract/queryDetail',{contractNo:row.contractNo, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
          if(res.returnCode == '000000'){
            self.addForm.contractNo = res.returnData.contractNo
            self.addForm.contractName = res.returnData.contractName
            self.addForm.explain = res.returnData.explain
            let arr = []
            arr = res.returnData.contarctUrl.split('/')
            self.addForm.filename = arr[arr.length-1]
            self.addForm.createTime = res.returnData.createTime
            self.addForm.createUser = res.returnData.createUser
            self.addForm.updateTime = res.returnData.updateTime
            self.addForm.updateUser = res.returnData.updateUser
          } else {
            var str = `
              <p>${ i18n.t('Error_code')}:  <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
            `
            this.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }
        });
      }, 50)
    },
    // 修改
    editItem (row) {
    	this.succ="编辑成功"
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = true;
      this.getFrInfo()
      setTimeout(function() {
        self.$post(self.$api + '/contract/queryDetail',{contractNo:row.contractNo, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
          if(res.returnCode == '000000'){
            self.addForm.contractNo = res.returnData.contractNo
            self.addForm.contractName = res.returnData.contractName
            self.addForm.explain = res.returnData.explain
            let arr = []
            arr = res.returnData.contarctUrl.split('/')
            self.addForm.filename = arr[arr.length-1]
            self.oldfilename = arr[arr.length-1]
          } else {
            var str = `
              <p>${ i18n.t('Error_code')}:  <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
            `
            this.$alert(str, i18n.t('Prompt'), {
              dangerouslyUseHTMLString: true
            });
          }
        });
      }, 50)
    },
    // 删除
    deleteItem(row){
      var _this =this;
      this.$confirm(  i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
          confirmButtonText:  i18n.t('OK'),
          cancelButtonText:  i18n.t('Cancel'),
          type: 'warning'
      }).then(() => {
        this.$post(this.$api + '/contract/deleteContract',{contractNo: row.contractNo, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(function(res){
          if(res.returnCode == '000000'){
            _this.display();
            _this.$alert(i18n.t('product.successfully_delete'), i18n.t('Prompt'), {
                  dangerouslyUseHTMLString: true
                });
          }else{
            var str = `
              <p>${ i18n.t('Error_code')}:  <span style='color:#5bc0de'>${res.returnCode}</span></p>
              <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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
      this.oldfilename = ''
      this.addForm.createTime = ''
      this.addForm.createUser = ''
      this.addForm.updateTime = ''
      this.addForm.updateUser = ''
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
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
    onPreview (file, fileList) {
      this.addForm.filename = file.name
    }
  }
}
</script>

<style lang='scss'>
#contract_content .el-dialog{
		width:60% !important;
}
.el-upload__tip{
  margin-top: 0;
  margin-left: 10px;
}
.el-input-group__prepend{
  background: #3a8ee6;
  color: #fff;
  border: none;
}

.ban .el-input-group__prepend{
  background: #F5F7FA;
  color: #909399;
  border: 1px solid #DCDFE6;
}
.ban button.is-disabled:hover {
  background: #F5F7FA;
  color: #909399;
  border-top: 1px solid #DCDFE6;
}
</style>

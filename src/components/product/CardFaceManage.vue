<template>
  <!-- 卡面管理 -->
  <div class="content_box" id="contract_content">
	<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="22">
              <!-- 卡面编号 -->
              <el-form-item :label="$t('product.Card_face_number')"> 
                <el-input v-model="obj.creditCardId" class="input-with-select"></el-input> 
              </el-form-item> 
              <!-- 卡面名称 -->
              <el-form-item :label="$t('product.Card_face_name')"> 
                <el-input v-model="obj.cardName" class="input-with-select"></el-input> 
              </el-form-item> 
              <!-- 媒介对象代码 -->
              <el-form-item :label="$t('product.Media_object_code')"> 
                <el-input v-model="obj.mediaCode" class="input-with-select"></el-input> 
              </el-form-item>  
              <!-- 卡版代码 -->
              <el-form-item :label="$t('product.Card_code')"> 
                <el-input v-model="obj.cardCode" class="input-with-select"></el-input> 
              </el-form-item>  
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()" size="small">{{$t("Add")}}</el-button>  <!-- 新增 --> <!-- v-if="funList.indexOf('新增') > -1" -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
          <!-- 卡面列表 -->
					<h4>{{$t('product.Card_face_list')}}</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->

							<el-table-column prop="creditCardId" :label="$t('product.Card_face_number')" align="center" min-width="120px"> </el-table-column><!--卡面编号-->

							<el-table-column prop="cardName" :label="$t('product.Card_face_name')"   align="center" min-width="140px"> </el-table-column><!--卡面名称-->
              
							<el-table-column prop="mediaCode" :label="$t('product.Media_object_code')" align="center" min-width="190px"> </el-table-column><!--媒介对象代码	-->

              <el-table-column prop="cardCode" :label="$t('product.Card_code')" align="center" min-width="90px"> </el-table-column><!--卡版代码	-->

              <el-table-column prop="createTime" :label="$t('Create_date')" align="center" min-width="95px">
              	<template slot-scope="scope">
              		{{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
              	</template>
              </el-table-column><!--创建日期	-->

              <el-table-column prop="status" :label="$t('Status')" align="center" min-width="155px">
              	<template slot-scope="scope">
              		{{scope.row.status | level(statusList)}}
              	</template>
              </el-table-column><!--状态	-->

							<el-table-column :label="$t('Operation')" align="center" min-width="140px"><!--操作	--><!-- v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1" -->
								<template slot-scope="scope">
										<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)" >
											<i class="el-icon-view"></i>
											<span class="text">{{$t('See')}}</span><!--查看	--><!-- v-if="funList.indexOf('查看') > -1" -->
										</el-button>
                    <el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t('Edit')}}</span><!--编辑	--><!-- v-if="funList.indexOf('编辑') > -1" -->
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t('Delete')}}</span><!--删除	--><!-- v-if="funList.indexOf('删除') > -1" -->
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
    <el-dialog :title="addForm.edit ? $t('product.Card_face_editing') : (addForm.flag ? $t('product.Card_surface_details') : $t('product.Card_face_addition'))" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">
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
            <!-- 卡面编号 -->
                <el-form-item :label="$t('product.Card_face_number')" :prop="'creditCardId'">   
                  <el-input type="text" v-model="addForm.creditCardId" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12">
            <!-- 卡面名称 -->
                <el-form-item :label="$t('product.Card_face_name')"   :prop="'cardName'">   
                  <el-input type="text" v-model="addForm.cardName" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>		

          <el-col :span="12">
            <!-- 媒介对象代码 -->
                <el-form-item :label="$t('product.Media_object_code')" :prop="'mediaCode'">   
                  <el-input type="text" v-model="addForm.mediaCode" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>	

          <el-col :span="12">
            <!-- 卡版代码 -->
                <el-form-item :label="$t('product.Card_code')"  :prop="'cardCode'">   
                  <el-input type="text" v-model="addForm.cardCode" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>	
						<!-- 卡面图像 -->
          <!--<el-col :span="12">
            
                <el-form-item :label="$t('product.Card_surface_image')" :prop="'kmtx'">   
                  <el-upload ref="upload" class="upload-demo" :action="$api + '/aad'" :show-file-list="false" :auto-upload="true" :data="addForm" :limit='1' :disabled="addForm.flag">
                    <el-button size="small" type="primary" :disabled="addForm.flag">{{$t('product.Select_card_face_image')}}</el-button>
                  </el-upload>
                </el-form-item>
          </el-col>		-->
          <el-col :span="12">
            <!-- 状态 -->
            <el-form-item :label="$t('Status')" :prop="'status'">
              <el-select v-model="addForm.status" style="width: 100%;" :disabled="addForm.flag" placeholder="">
                <!--<el-option label="生效" value="1" ></el-option>
                <el-option label="失效" value="0" ></el-option>-->
                <el-option v-for="item in statusList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>	
          <!-- 预览 -->
          <!--<el-col :span="12">
            <el-form-item :label="$t('product.Preview')">
              <div style="width: 500px;min-height: 200px; background: #999; border: 1px solid #333;">
                <img :src="file.cardImageUrl" width="100%" style="display: block;">
              </div>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <!-- 说明 -->
                <el-form-item :label="$t('product.explain')"  :prop="'description'">   
                  <el-input type="textarea" v-model="addForm.description" :disabled="addForm.flag"></el-input>
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
            <!-- 修改时间 -->
            <el-form-item :label="$t('Update_time')"> 
              <el-input type="text" v-model="addForm.updateTime" :disabled="addForm.flag"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"  v-if="addForm.flag">
            <!-- 修改用户 -->
            <el-form-item :label="$t('Update_user')"> 
              <el-input type="text" v-model="addForm.updateUser" :disabled="addForm.flag"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
      </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('addForm')" v-if="addUserDialog && !addForm.edit && !addForm.flag">{{$t('Reset')}}</el-button>
            <el-button type="primary" @click="sure('addForm')" v-if="!addForm.flag">{{$t('Save')}}</el-button>
          </div>
      </el-dialog>
    <!--新增弹框页面结束-->
		
	

  </div>
</template>

<script>
export default {
  name:'CardFaceManage',
  data () {
    var isCardNo  = (rule, value, callback) =>{
      if (this.addForm.idCardType == 1) {
        if (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
          callback(new Error( i18n.t('product.please_enter_the_correct_ID_number') ));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    return {
      tableData:[{}],  //user 列表数据
      obj: {
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //需要传过去的参数
        creditCardId: '',
        cardName: '',
        mediaCode: '',
        cardCode: ''
      },
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      addUserDialog:false,  //弹框	
      levelList: [],
      statusList:[],
      addForm:{
        legalPersonNum: '',
        companyName: '',
        creditCardId:'',
        cardName:'',
        mediaCode:'',
        cardCode:'',
        status:'',
        description:'',
        createTime:'',
        createUser: this.$store.state.loginData.userLogin.userName,
        updateTime:'',
        updateUser:'',
        flag:false,   //是否可输入 默认可以
        edit:false,	 //编辑标识
        id:''
      },
      file: {},
	    rules:{
	    		creditCardId:[
          	{ required: true, message: i18n.t('product.Card_face_number_cannot_be_empty'), trigger: 'blur' },
          ],
          cardName:[
          	{ required: true, message: i18n.t('product.Card_face_name_cannot_be_empty'), trigger: 'blur' },
          ],
          mediaCode:[
          	{ required: true, message: i18n.t('product.Please_select_the_media_object_code'), trigger: 'blur' },
          ],
          cardCode:[
          	{ required: true, message: i18n.t('product.Card_code_cannot_be_empty'), trigger: 'blur' },
          ],
          description:[
          	{ required: true, message: i18n.t('product.employeePhone_Explanation_cannot_be_emptyverification'), trigger: 'change' },
            { max: 150, message: i18n.t('product.length_cannot_exceed_150_characters'), trigger: 'change' }
          ],
          status:[
          	{ required: true, message: i18n.t('user.please_select_the_status'), trigger: 'blur' },
          ],
	    },
		  funList: []
    }
  },
  mounted(){
  	this.getStatus()
		 this.display(); // 初始化数据
  },
  watch: {},
  methods:{
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
    getStatus(){//生效失效
    	this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'STATUS'}).then(res =>{
        if(res.returnCode == '000000'){
          this.statusList =  res.returnData;
        }
      });
    },
    // 确定
    sure (formName) {
      let self = this
      self.$refs['addForm'].validate((valid) => {
        if (valid) {
          let path = ''
          if (this.addForm.edit) {//编辑
            path = '/api/update'
            this.addForm.createUser = ''
            this.addForm.updateUser = this.$store.state.loginData.userLogin.userName
          } else {
            path = '/api/insert'//新增
            this.addForm.createUser = this.$store.state.loginData.userLogin.userName
            this.addForm.updateUser = ''
          }
          this.$post(this.$api + path,this.addForm).then(res =>{
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
              
              this.$refs[formName].resetFields();
              this.addUserDialog = false;
              this.addForm.flag=false;
              this.addForm.edit=false;
              this.display()
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
        } else {
          return false;
        }
      });
    },
    // 初始化列表
    display () {
      this.$post(this.$api + '/api/getCardInforManagList',this.obj).then(res =>{
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
      this.addForm.approveLimit = ''
      this.addForm.gradeLeavel = ''
      this.addForm.listName = ''
      this.addForm.listType = ''
      this.addForm.idCardType = ''
      this.addForm.idCardNum = ''
      this.addForm.explain = ''
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
      self.$post(self.$api + '/api/details',{id:row.id, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
        if(res.returnCode == '000000'){
          self.file.cardImageUrl = self.$api + res.returnData.cardImageUrl
          self.addForm.description = res.returnData.description
          self.addForm.status = res.returnData.status
          self.addForm.cardCode = res.returnData.cardCode
          self.addForm.mediaCode = res.returnData.mediaCode
          self.addForm.cardName = res.returnData.cardName
          self.addForm.creditCardId = res.returnData.creditCardId
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
      self.addForm.description = row.description
      self.addForm.status = row.status
      self.addForm.cardCode = row.cardCode
      self.addForm.mediaCode = row.mediaCode
      self.addForm.cardName = row.cardName
      self.addForm.creditCardId = row.creditCardId
      self.addForm.createTime = row.createTime
      self.addForm.createUser = row.createUser
      self.addForm.updateTime = row.updateTime
      self.addForm.updateUser = row.updateUser
      self.addForm.id=row.id
      this.getFrInfo()
//    setTimeout(function() {
//      self.$post(self.$api + '/whiteBlack/queryDetail',{listId:row.listId, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
//        if(res.returnCode == '000000'){
//          self.addForm.listName = res.returnData.listName
//          self.addForm.listType = res.returnData.listType
//          self.addForm.idCardType = res.returnData.idCardType
//          self.addForm.idCardNum = res.returnData.idCardNum
//          self.addForm.explain = res.returnData.explain
//          self.addForm.listId = res.returnData.listId
//          self.addForm.approveLimit = res.returnData.approveLimit
//          self.addForm.gradeLeavel = res.returnData.gradeLeavel
//        } else {
//          var str = `
//            <p>${self.$t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
//            <p >${self.$t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
//          `
//          self.$alert(str, i18n.t('Prompt'), {
//            dangerouslyUseHTMLString: true
//          });
//        }
//      });
//    }, 50)
    },
    // 删除
    deleteItem(row){
      var _this =this;
      this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
          confirmButtonText: i18n.t('OK'),
          cancelButtonText: i18n.t('Cancel'),
          type: 'warning'
      }).then(() => {
        this.$post(this.$api + '/api/Delete',{id: row.id, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(function(res){
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
      this.addForm.createTime = ''
      this.addForm.createUser = ''
      this.addForm.updateTime = ''
      this.addForm.updateUser = ''
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    }
  },
  filters: {
    level (val, levelList) {
      let sname = ''
      levelList.map(item => {
        if (item.paramValue == val) {
          sname = item.paramSname
        }
        return false
      });
      return sname || ''
    }
  }
}
</script>

<style  lang='scss' scoped="scoped">
#contract_content{
	.el-dialog {
		width:60%!important;
	}
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
</style>

<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="22">
              <!-- 姓名 -->
              <el-form-item :label="$t('product.name')"> 
                <el-input v-model="obj.listName" class="input-with-select"></el-input> 
              </el-form-item> 
              <!-- 证件类型 -->
              <el-form-item :label="$t('product.ID_type')"> 
                <el-select v-model="obj.idCardType" placeholder="">
                  <el-option :label="$t('product.whole')" value="" ></el-option>
                  <el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                </el-select>
              </el-form-item> 
              <!-- 证件号 -->
              <el-form-item :label="$t('product.ID_number')"> 
                <el-input v-model="obj.idCardNum" class="input-with-select"></el-input> 
              </el-form-item>  
              <!-- 名单类型 -->
              <el-form-item :label="$t('product.list_type')"> 
                <el-select v-model="obj.listType" placeholder="">
                  <el-option :label="$t('product.whole')" value="" ></el-option>
                  <el-option v-for="item in BWListTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
								</el-select>
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
          <!-- 黑白名单列表 -->
					<h4>{{$t('product.black_and_white_list')}}</h4>
					<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
							<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->

							<el-table-column prop="listName" :label="$t('product.name')" align="center" min-width="100px"> </el-table-column><!--姓名-->

							<el-table-column prop="idCardType" :label="$t('product.ID_type')"   align="center" min-width="140px">
                <template slot-scope="scope">
                  {{scope.row.idCardType | level(cardTypeList)}}
                </template>
              </el-table-column><!--证件类型-->
              
							<el-table-column prop="idCardNum" :label="$t('product.ID_number')" align="center" min-width="190px"> </el-table-column><!--证件号码	-->

              <el-table-column prop="listType" :label="$t('product.list_type')" align="center" min-width="90px">
                <template slot-scope="scope">
                  {{scope.row.listType | level(BWListTypeList)}}
                </template>
              </el-table-column><!--名单类型	-->

              <el-table-column prop="gradeLeavel" :label="$t('product.grade')" align="center" min-width="95px">
                <template slot-scope="scope">
                  {{scope.row.gradeLeavel | level(levelList)}}
                </template>
              </el-table-column><!--等级	-->

              <el-table-column prop="updateTime" :label="$t('product.maintenance_date')" align="center" min-width="160px">
                <template slot-scope="scope">
                  {{scope.row.updateTime ? scope.row.updateTime.split(' ')[0] : ''}}
                </template>
              </el-table-column><!--维护日期	-->

              <el-table-column prop="updateUser" :label="$t('product.maintain_user')" align="center" min-width="155px"> </el-table-column><!--维护用户	-->

							<el-table-column :label="$t('Operation')" align="center" min-width="140px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1"><!--操作	-->
								<template slot-scope="scope">
										<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1">
											<i class="el-icon-view"></i>
											<span class="text">{{$t('See')}}</span><!--查看	-->
										</el-button>
                    <el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t('Edit')}}</span><!--编辑	-->
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funList.indexOf('删除') > -1">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t('Delete')}}</span><!--删除	-->
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
    <el-dialog :title="addForm.edit ? $t('product.editing_black_and_white_list') : (addForm.flag ? $t('product.black_and_white_list_details') : $t('product.new_black_and_white_list'))" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">
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
            <!-- 姓名 -->
                <el-form-item :label="$t('product.name')" :prop="addForm.flag ? '' : 'listName'">   
                  <el-input type="text" v-model="addForm.listName" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>	
        
          <el-col :span="12">
            <!-- 名单类型 -->
                <el-form-item :label="$t('product.list_type')"   :prop="addForm.flag ? '' : 'listType'">   
                  <el-select v-model="addForm.listType" style="width: 100%;" :disabled="addForm.flag || addForm.edit" placeholder="">
                    <el-option v-for="item in BWListTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                  </el-select>
                </el-form-item>
          </el-col>		

          <el-col :span="12"  v-if="addForm.listType == '1'">
            <!-- 等级 -->
                <el-form-item :label="$t('product.grade')" :prop="addForm.flag ? '' : 'gradeLeavel'">   
                  <el-select v-model="addForm.gradeLeavel" style="width: 100%;" :disabled="addForm.flag" @change="getLimit" placeholder="">
                    <el-option v-for="item in levelList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                  </el-select>
                </el-form-item>
          </el-col>	

          <el-col :span="12"  v-if="addForm.listType == '1'">
            <!-- 授信额度 -->
                <el-form-item :label="$t('product.credit_line')"  :prop="addForm.flag ? '' : 'approveLimit'">   
                  <el-input type="text" v-model="addForm.approveLimit" :disabled="true"></el-input>
                </el-form-item>
          </el-col>	

          <el-col :span="12">
            <!-- 证件类型 -->
                <el-form-item :label="$t('product.ID_type')" :prop="addForm.flag ? '' : 'idCardType'">   
                  <el-select v-model="addForm.idCardType" style="width: 100%;" :disabled="addForm.flag || addForm.edit" placeholder="">
                    <el-option v-for="item in cardTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
                  </el-select>
                </el-form-item>
          </el-col>		

          <el-col :span="12">
            <!-- 证件号码 -->
                <el-form-item :label="$t('product.ID_number')"  :prop="addForm.flag ? '' : 'idCardNum'">   
                  <el-input type="text" v-model="addForm.idCardNum" :disabled="addForm.flag || addForm.edit"></el-input>
                </el-form-item>
          </el-col>		
          
          <el-col :span="24">
            <!-- 说明 -->
            <el-form-item :label="$t('product.explain')" :prop="addForm.flag ? '' : 'explain'">
              <el-input type="textarea" v-model="addForm.explain" :disabled="addForm.flag"></el-input>
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
  name: 'WhiteBlackManage',
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
      tableData:[],  //user 列表数据
      obj: {
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //需要传过去的参数
        idCardNum: '',
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        listName: '',
        goPage: null,
        listType: '',
        idCardType: ''
      },
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      addUserDialog:false,  //弹框	
      levelList: [],
      addForm:{
        legalPersonNum: '',
        companyName: '',
        listName: '',
        listType: '',
        idCardType: "",
        idCardNum: '',
        gradeLeavel: '',
        approveLimit: '',
        explain: '',
        createUser: this.$store.state.loginData.userLogin.userName,
        flag:false,   //是否可输入 默认可以
        edit:false	 //编辑标识
      },
      cardTypeList: [],
      BWListTypeList: [],
	    rules:{
	    		listName: [
            { required: true, message: i18n.t('product.name_cannot_be_empty'), trigger: 'blur' },
            { pattern:/^[\u4e00-\u9fa5]+$/, message: i18n.t('product.names_can_only_be_entered_in_Chinese_characters') },
            { max: 20, message: i18n.t('product.no_more_than_20_characters_in_length'), trigger: 'change' }
          ],
          listType: [
            { required: true, message: i18n.t('product.please_select_the_list_type'), trigger: 'change' },
          ],
          gradeLeavel: [
            { required: true, message: i18n.t('product.please_choose_the_grade'), trigger: 'blur' },
          ],
          approveLimit:[
          	{ required: true, message: i18n.t('product.please_enter_the_credit_line'), trigger: 'blur' },
          ],
          idCardType: [
            { required: true, message: i18n.t('product.please_select_the_type_of_certificate'), trigger: 'change' },
          ],
          idCardNum:[
            { required: true, message: i18n.t('product.certificate_number_cannot_be_empty'), trigger: 'blur' },
            { validator: isCardNo}
          ],
          explain:[
          	{ required: true, message: i18n.t('product.employeePhone_Explanation_cannot_be_emptyverification'), trigger: 'blur' },
          ],
	    },
		  funList: []
    }
  },
  mounted(){
    this.getLevel();
    this.getCardType()
    this.getBWListType()
    this.getFunList()
		this.display(); // 初始化数据
  },
  watch: {
    addUserDialog (n) {
      if (n) {
        this.getLevel()
      }
    },
    'addForm.listType' (n) {
      if (n == 0) {
        this.addForm.gradeLeavel = ''
        this.addForm.approveLimit = ''
      }
    }
  },
  methods:{
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '黑白名单管理'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
          console.log(res)
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取黑白名单下拉信息
    getBWListType:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'B_W_LIST_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.BWListTypeList =  res.returnData;
        }
      });

    },
    // 获取证件类型
    getCardType:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'CARD_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.cardTypeList =  res.returnData;
        }
      });

    },
    // 获取等级信息
    getLevel:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'APPROVE_LEVEL'}).then(res =>{
        if(res.returnCode == '000000'){
          this.levelList =  res.returnData;
        }
      });

    },
    // 获取额度信息
    getLimit () {
      if (this.addForm.gradeLeavel) {
        this.$post(this.$api + '/paramValues/findParam',{paramCode: 'APPROVE_MONEY', paramValue: this.addForm.gradeLeavel}).then(res =>{
          if(res.returnCode == '000000'){
            this.addForm.approveLimit =  res.returnData.paramSname;
          }
      });
      }
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
    // 确定
    sure (formName) {
      let self = this
      self.$refs['addForm'].validate((valid) => {
        if (valid) {
          let path = ''
          if (this.addForm.edit) {
            path = '/whiteBlack/updateWhiteBlack'
            this.addForm.createUser = ''
            this.addForm.updateUser = this.$store.state.loginData.userLogin.userName
          } else {
            path = '/whiteBlack/addWhiteBlack'
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
    display:function(){
      this.$post(this.$api + '/whiteBlack/queryByPage',this.obj).then(res =>{
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
      self.$post(self.$api + '/whiteBlack/queryDetail',{listId:row.listId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
        if(res.returnCode == '000000'){
          self.addForm.listName = res.returnData.listName
          self.addForm.listType = res.returnData.listType
          self.addForm.idCardType = res.returnData.idCardType
          self.addForm.idCardNum = res.returnData.idCardNum
          self.addForm.explain = res.returnData.explain
          self.addForm.approveLimit = res.returnData.approveLimit
          self.addForm.gradeLeavel = res.returnData.gradeLeavel
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
        self.$post(self.$api + '/whiteBlack/queryDetail',{listId:row.listId, legalPersonNum: self.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
          if(res.returnCode == '000000'){
            self.addForm.listName = res.returnData.listName
            self.addForm.listType = res.returnData.listType
            self.addForm.idCardType = res.returnData.idCardType
            self.addForm.idCardNum = res.returnData.idCardNum
            self.addForm.explain = res.returnData.explain
            self.addForm.listId = res.returnData.listId
            self.addForm.approveLimit = res.returnData.approveLimit
            self.addForm.gradeLeavel = res.returnData.gradeLeavel
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
        this.$post(this.$api + '/whiteBlack/deleteWhiteBlack',{listId: row.listId, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(function(res){
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

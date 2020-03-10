<template>
  <!-- 加解密管理 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="22">
              <!-- 名称 -->
              <el-form-item :label="$t('encryptionDecryption.name')"> 
                <el-input v-model="obj.name" class="input-with-select"></el-input> 
              </el-form-item> 
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()" size="small">{{$t("Add")}}</el-button>  <!-- 新增  v-if="funList.indexOf('新增') > -1"  -->
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
							<!-- <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>序号 -->
              <el-table-column prop="id" label="id" align="center" min-width="100px"> </el-table-column><!--加密名称-->
							<el-table-column prop="name" label="加密名称" align="center" min-width="100px"> </el-table-column><!--加密名称-->
              <el-table-column prop="channel" label="渠道编码" align="center" min-width="100px"> </el-table-column><!--渠道编码-->
							<el-table-column :label="$t('Operation')" align="center" min-width="140px"><!--操作	 v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1"-->
								<template slot-scope="scope">
										<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)"><!--  v-if="funList.indexOf('查看') > -1" -->
											<i class="el-icon-view"></i>
											<span class="text">{{$t('See')}}</span><!--查看	-->
										</el-button>
                    <el-button size="mini" class="edit-btn" @click="editItem(scope.row)" ><!--  v-if="funList.indexOf('编辑') > -1" -->
											<i class="el-icon-edit"></i>
											<span class="text">{{$t('Edit')}}</span><!--编辑	-->
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" ><!-- v-if="funList.indexOf('删除') > -1" -->
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
    <el-dialog :title="addForm.edit ? $t('product.editing_black_and_white_list') : (addForm.flag ? $t('product.black_and_white_list_details') : $t('product.new_black_and_white_list'))" :visible.sync="addUserDialog" :before-close="cancels" :close-on-click-modal="false" width="50%">
      	<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="addForm" :rules="rules" label-width="140px" class="demo-ruleForm" size="small">
			    <div>
            <h3>{{$t('encryptionDecryption.jjmjbxx')}}</h3><!-- 加解密基本信息 -->
            <el-row class="edit_module_search">
              <el-col :span="12">
               <el-form-item :label="$t('encryptionDecryption.name')" prop="name">  <!-- 名称 -->
                  <el-input v-model="addForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.channel')" prop="channel">  <!-- 渠道编号 -->
                  <el-input v-model="addForm.channel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.decryptResultExpression')"> <!-- 解密结果表达式 -->
                  <el-input v-model="addForm.jmjgbd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <h3>{{$t('encryptionDecryption.encryptionRuleInformation')}}</h3><!-- 加密规则信息 -->
            <el-row class="edit_module_search">
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.encryptionType')" prop="jmlx"> <!-- 加密类型 -->
                  <el-input v-model="addForm.jmlx"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.messageEncryptionAddress')" prop="bwjmdz"> <!-- 报文加密地址 -->
                  <el-input v-model="addForm.bwjmdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.messageCiphertextAddress')" prop="bwmwdz"> <!-- 报文密文地址 -->
                  <el-input v-model="addForm.bwmwdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.decryptPlaintextAddress')" prop="jmmwdz"> <!-- 解密明文地址 -->
                  <el-input v-model="addForm.jmmwdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.decryptCiphertextAddress')" prop="jmimwdz"> <!-- 解密密文地址 -->
                  <el-input v-model="addForm.jmimwdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.decryptionKeyAddress')" prop="jmmykdz"> <!-- 解密秘钥key地址 -->
                  <el-input v-model="addForm.jmmykdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.encryptionParameter')"> <!-- 加密参数 -->
                  <el-input v-model="addForm.jmcs"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.keyAddress')"> <!-- 秘钥key地址 -->
                  <el-input v-model="addForm.mykdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.encryptionPreprocessing')"> <!-- 加密前处理 -->
                  <el-input v-model="addForm.jmqcl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.postEncryption')"> <!-- 加密后处理 -->
                  <el-input v-model="addForm.jmhcl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.decryptionPreprocessing')"> <!-- 解密前处理 -->
                  <el-input v-model="addForm.jimqcl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.postDecryption')"> <!-- 解密后处理 -->
                  <el-input v-model="addForm.jimhcl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.whetherTheSecretKeyIsEncrypted')"> <!-- 秘钥是否加密 -->
                   <el-switch v-model="addForm.jmsfjm"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.keyEncryptionType')"> <!-- 秘钥加密类型 -->
                  <el-select v-model="addForm.myjmlx" :placeholder="$t('encryptionDecryption.pleaseSelectTheKeyEncryptionType')"><!-- 请选择秘钥加密类型 -->
                    <el-option label="RSA" value="RSA"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <h3>{{$t('encryptionDecryption.signatureRuleInformation')}}</h3><!-- 签名规则信息 -->
            <el-row class="edit_module_search">
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.signatureType')"> <!-- 签名类型 -->
                  <el-input v-model="addForm.qmlx"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.signatureStorageLocation')"> <!-- 签名存放位置 -->
                  <el-input v-model="addForm.qmcfwz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.responseSignatureStorageAddress')"> <!-- 响应签名存放地址 -->
                  <el-input v-model="addForm.xyqmcfdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.signatureRule')"> <!-- 签名规则 -->
                  <el-input v-model="addForm.qmgz"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <h3>{{$t('encryptionDecryption.secretKeyInformation')}}</h3><!-- 秘钥信息 -->
            <el-row class="edit_module_search" v-for="(item,index) in addForm.items" :key="index">
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.secretKeyType')" prop="mylx"> <!-- 秘钥类型 -->
                  <!-- <el-input v-model="item.name"></el-input> -->
                  <el-select v-model="item.mylx" :placeholder="$t('encryptionDecryption.pleaseSelectSecretKeyType')"><!-- 请选择秘钥类型 -->
                    <el-option label="我方公钥" value="1"></el-option>
                    <el-option label="我方私钥" value="2"></el-option>
                    <el-option label="对方公钥" value="3"></el-option>
                    <el-option label="对方私钥" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('encryptionDecryption.secretKeyContent')" prop="mynr"> <!-- 秘钥内容 -->
                  <el-input v-model="item.mynr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align:center;padding-top:5px;">
              <el-button type="primary" icon="el-icon-plus" >{{$t('encryptionDecryption.addSecretKey')}}</el-button><!-- 添加秘钥 -->
            </div>
            
          </div>
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
      items:[{},{}],
      tableData:[
        {id:1,name:"江西省联社-服务方",channel:"100002"}
        ],  //user 列表数据
      obj: {
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //需要传过去的参数
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        name: '',
        goPage: null,
      },
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      addUserDialog:false,  //弹框	
      levelList: [],
      addForm:{
        name:'',
        channel:'',
        jmjgbds:'',
        jmlx:'',
        bwjmdz:'',
        bwmwdz:'',
        jmmwdz:'',
        jmimwdz:'',
        jmmykdz:'',
        jmcs:'',
        mykdz:'',
        jmqcl:'',
        jmhcl:'',
        jimqcl:'',
        jimhcl:'',
        mysfjm:true,
        myjmlx:'',
        qmlx:'',
        qmcfwz:'',
        xyqmcfdz:'',
        qmgz:'',
        mylx:'',
        mynr:'',
        items:[{},{}],
        // legalPersonNum: '',
        // companyName: '',
        // createUser: this.$store.state.loginData.userLogin.userName,
        flag:false,   //是否可输入 默认可以
        edit:false	 //编辑标识
      },
      cardTypeList: [],
      BWListTypeList: [],
	    rules:{
          name:[
            { required: true, message: '名称不能为空', trigger: 'blur' },
          ],
          channel:[
            { required: true, message: '渠道编号不能为空', trigger: 'blur' },
          ],
          jmlx:[
            { required: true, message: '加密类型不能为空', trigger: 'blur' },
          ],
          bwjmdz:[
            { required: true, message: '报文加密地址不能为空', trigger: 'blur' },
          ],
          bwmwdz:[
            { required: true, message: '报文密文地址不能为空', trigger: 'blur' },
          ],
          jmmwdz:[
            { required: true, message: '解密明文地址不能为空', trigger: 'blur' },
          ],
          jmimwdz:[
            { required: true, message: '解密密文地址不能为空', trigger: 'blur' },
          ],
          jmmykdz:[
            { required: true, message: '解密秘钥key地址不能为空', trigger: 'blur' },
          ],
          mylx:[
            { required: true, message: '秘钥类型不能为空', trigger: 'change' },
          ],
          mynr:[
            { required: true, message: '秘钥内容不能为空', trigger: 'blur' },
          ]
	    },
		  funList: []
    }
  },
  mounted(){
    // this.getLevel();
    // this.getCardType()
    // this.getBWListType()
    // this.getFunList()
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
        return item.name == '加解密管理'
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
		width:80%!important;
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

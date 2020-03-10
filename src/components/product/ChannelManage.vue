<template>
  <!-- 基准利率 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
	    <div class="edit_module">
	        <el-form :inline="true"  class="demo-form-inline" size="small">
	          <el-row>
	            <el-col :span="22">
	              	<!-- 渠道编号 -->
	              	<el-form-item :label="$t('channel.channelNo')"> 
		                <el-input v-model="obj.channelNo" class="input-with-select"></el-input>
	              	</el-form-item>  
	              	<!-- 渠道名称 -->
	              	<el-form-item :label="$t('channel.channelName')"> 
		                <el-input v-model="obj.channelName" class="input-with-select"></el-input>
	              	</el-form-item>  
	              	<el-form-item :label="$t('channel.channelState')">
		                <el-select v-model="obj.channelState" placeholder="">
		                	<el-option label="关" value="0"></el-option>
											<el-option label="开" value="1"></el-option>
		                  <!--<el-option :label="$t('chanel.channelState')" value="" ></el-option>-->
		                  <!--<el-option v-for="item in loanList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>-->
		                </el-select>
	              	</el-form-item>  
	              
	            </el-col>
	            <el-col :span="24">
	              <div class="edit_module_btn" style="margin-top: 10px;">
	                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
	                <el-button type="primary" icon="el-icon-plus" @click="openUserDiolog()"  size="small">{{$t("Add")}}</el-button> <!--v-if="funList.indexOf('新增') > -1"--> <!-- 新增 -->
	              </div>
	            </el-col>
	          </el-row>  
	        </el-form>
	    </div>

		<!-- 列表模块 -->
    	<div class="list_module">
	    	<div class="table_body">
          <!-- 渠道统计列表 -->
				<h4>{{$t('channel.channelList')}}</h4>
				<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
					<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
					<el-table-column prop="channelNo" :label="$t('channel.channelNo')"   align="center" min-width="140px"></el-table-column><!--渠道编号-->
          <el-table-column prop="channelNode" :label="$t('channel.upChannelNo')" align="center" min-width="190px"> </el-table-column><!--上级渠道编号	-->
          <el-table-column prop="channelName" :label="$t('channel.channelName')" align="center" min-width="190px"></el-table-column><!--渠道名称	-->
          <el-table-column prop="channelState" :label="$t('channel.channelState')" align="center" min-width="190px">
            <template slot-scope="scope">
              <span v-if="scope.row.channelState=='1'">开</span>
              <span v-if="scope.row.channelState=='0'">关</span>
            </template>
          </el-table-column><!--渠道状态	-->
          <el-table-column prop="createUser" :label="$t('Create_user')" align="center" min-width="190px"></el-table-column><!--创建人-->
          <el-table-column prop="updateUser" :label="$t('Update_user')" align="center" min-width="190px"></el-table-column><!--修改人-->
          <el-table-column prop="createTime" :label="$t('Create_date')" align="center" min-width="90px">
                <template slot-scope="scope">
                  {{scope.row.createTime ? scope.row.createTime.split(' ')[0] : ''}}
                </template>
          </el-table-column><!--创建日期	-->
					<el-table-column :label="$t('Operation')" align="center" min-width="140px" v-if="funList.indexOf('查看') > -1 || funList.indexOf('编辑') > -1 || funList.indexOf('删除') > -1"><!----><!--操作	-->
						<template slot-scope="scope">
							<el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)" v-if="funList.indexOf('查看') > -1"><!---->
								<i class="el-icon-view"></i>
								<span class="text">{{$t('See')}}</span><!--查看	-->
							</el-button>
        					<el-button size="mini" class="edit-btn" @click="editItem(scope.row)" v-if="funList.indexOf('编辑') > -1"><!---->
								<i class="el-icon-edit"></i>
								<span class="text">{{$t('Edit')}}</span><!--编辑	-->
							</el-button>
							<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="funList.indexOf('删除') > -1"><!---->
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
    	<el-dialog :title="addForm.title" :visible.sync="addUserDialog" :before-close="cancels"  :close-on-click-modal="false">
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
			            <!-- 贷款周期 -->
			            <!--<el-form-item :label="$t('bench.loanCycle')" :prop="(addForm.edit || addForm.flag)? '':'loanPeriod'">
							<el-select v-model="addForm.loanPeriod" :disabled="addForm.edit || addForm.flag">
								<el-option v-for="item in loanList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>
							</el-select>
						</el-form-item>-->
						<!--渠道编号-->
						<el-form-item :label="$t('channel.channelNo')" :prop="addForm.flag ? '':'channelNo'">   
		                  <el-input type="text"  v-model="addForm.channelNo" :disabled="addForm.flag||addForm.edit"></el-input >
		                </el-form-item>
			        </el-col>	
			        <el-col :span="12">
			            <!-- 上级渠道编号 -->
		                <el-form-item :label="$t('channel.upChannelNo')" :prop="addForm.flag ? '':'channelNode'">   
		                  <el-input type="text"  v-model="addForm.channelNode" :disabled="addForm.flag"></el-input >
		                </el-form-item>
			        </el-col>	
			        <el-col :span="12">
			            <!-- 渠道名称 -->
		                <el-form-item :label="$t('channel.channelName')" :prop="addForm.flag ? '':'channelName'">   
		                  <el-input type="text"  v-model="addForm.channelName" :disabled="addForm.flag"></el-input >
		                </el-form-item>
			        </el-col>
		          <el-col :span="12">
		            	<!-- 状态 -->
		           		<el-form-item :label="$t('channel.channelState')" :prop="addForm.flag ? '':'channelState'" > <!-- 账单频率 -->
                    <el-select v-model="addForm.channelState" :disabled="addForm.flag" style="width:100%">
                      <!--<el-option v-for="item in statusList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option>-->
                      <el-option label="关" value="0"></el-option>
                      <el-option label="开" value="1"></el-option>
                    </el-select>
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
			        <el-col :span="12" v-if="addForm.flag">
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
  data () {
    return {
      obj:{
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //当前显示第几页
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        goPage: null, //要去第几页
        channelNo:"",//渠道编号
        channelName:"",//渠道名称
        channelState:"",//渠道状态
      },
      loanList:[],//贷款周期列表
      statusList:[],//状态列表
      totalCount:10,
      tableData:[{channelNo:"111",channelNode:'11',channelName:"你好好",channelState:"1"}],  // 列表数据
      addUserDialog:false,//弹框显示
      addForm:{
      	title:"查看基准利率详情",//弹框的标题
        legalPersonNum: '',
        companyName: '',
				channelNo:"",//渠道编号
				channelNode:"",//上级渠道编号
				channelName:"",//渠道名称
				channelState:"1",//渠道状态
				createTime:"",
        createUser: this.$store.state.loginData.userLogin.userName,
        updateTime:"",
        updateUser:"",
        id:"",
        flag:false,   //是否可输入 默认可以
        edit:false,	 //编辑标识
        add:false    //新增标识
      },
      funList:[],
	    rules:{
          channelNo:[
          	{required:true,message:i18n.t('channel.NotEmptyChannelNo'),trigger:'blur'}//渠道编号不能为空
          ],
          channelNode:[
          	{required:true,message:i18n.t('channel.NotEmptyUpChannelNo'),trigger:'blur'}//上级渠道编号不能为空
          ],
          channelName:[
          	{required:true,message:i18n.t('channel.NotEmptyChannelName'),trigger:'blur'}//渠道名称不能为空
          ],
          channelState:[
          	{required:true,message:i18n.t('channel.NotEmptyChannelState'),trigger:'change'}//渠道状态不能为空
          ]
	    },
    }
  },
  mounted(){
    this.getFunList()
    // this.getLoanList();
    this.getStatus();
    // this.getAllChannel();
		this.display(); // 初始化数据
		
  },
  watch: {
  },
  methods:{
    // 获取权限信息
    getFunList () {
      let obj = {}
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '渠道统计'
      })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取证件类型
    // getLoanList(){
    //   this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'LOAN_PERIOD_CYCLE'}).then(res =>{
    //     if(res.returnCode == '000000'){
    //       this.loanList =  res.returnData;
    //     }
    //   });

    // },
    
    getAllChannel(){
    	this.$post(this.$api + '/channel/queryChannelNo',{channelNo:''}).then(res =>{
    		console.log(res)
        if(res.returnCode == '000000'){
          this.loanList =  res.returnData;
        }
      });
    },
    
    getStatus(){//生效失效
    	this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'STATUS'}).then(res =>{
        if(res.returnCode == '000000'){
          this.statusList =  res.returnData;
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
            path = '/channel/updateChannel'//编辑新增
            this.addForm.createUser = ''
            this.addForm.updateUser = this.$store.state.loginData.userLogin.userName
          } else {
            path = '/channel/insertChannel'  //新增确定
            this.addForm.createUser = this.$store.state.loginData.userLogin.userName
            this.addForm.updateUser = ''
          }
          this.$post(this.$api + path,this.addForm).then(res =>{
          	console.log(res)
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
    	var obje={
    		"data":{
    			"loanPeriod":this.obj.loanPeriod
    		},
    		"pageSize":this.obj.pageSize,
    		"pageIndex":this.obj.pageIndex
    	}
      this.$post(this.$api + '/channel/queryChannel',this.obj).then(res =>{
      	console.log(res)
        if(res.returnCode == '000000'){
//        this.tableData =  res.returnData.content;
          this.tableData = res.returnData.data
          this.totalCount = res.returnData.count;
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
      this.addForm.title="新增渠道统计"
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.channelNo = ''
      this.addForm.channelNode = ''
      this.addForm.channelName = ''
      this.addForm.channelState = '1'
      this.getFrInfo();
      this.addForm.add=true
      this.addUserDialog = true;
    },
    // 查看
    seeItem (row) {
       this.addForm.title="查看渠道统计"
      let self = this
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = false;
      this.addForm.flag = true;
      this.addForm.channelNo=row.channelNo;
  		this.addForm.channelNode=row.channelNode;
  		this.addForm.channelName=row.channelName;
  		this.addForm.channelState=row.channelState;
  		this.addForm.createTime=row.createTime;
  		this.addForm.createUser=row.createUser;
  		this.addForm.updateTime=row.updateTime;
  		this.addForm.updateUser=row.updateUser;
      this.getFrInfo()
      this.addUserDialog = true
    },
    // 修改
    editItem (row) {
       this.addForm.title="编辑渠道统计"
      let self = this
      this.addUserDialog = true
      if (this.$refs['addForm']!==undefined) {
        this.$refs['addForm'].resetFields();
      }
      this.addForm.edit = true;
      this.addForm.channelNo=row.channelNo;
      this.addForm.channelNode=row.channelNode;
      this.addForm.channelName=row.channelName;
      this.addForm.channelState=row.channelState;
      this.addForm.id=row.id
      this.getFrInfo()
    },
    // 删除
    deleteItem(row){
      var _this =this;
      this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
          confirmButtonText: i18n.t('OK'),
          cancelButtonText: i18n.t('Cancel'),
          type: 'warning'
      }).then(() => {
      	var objec={
          // channelNoList:[],
          channelNo:row.channelNo,
          channelState:row.channelState
      	}
      	// objec.channelNoList.push(row.channelNo)
        this.$post(this.$api + '/channel/deleteChannel',objec).then(function(res){
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

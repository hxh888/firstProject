<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
    <!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-row>
          <el-col :span="24">
          	<el-form-item :label="$t('newLog.startTime')"><!-- 开始时间年月日时分秒 -->
              <el-date-picker v-model="obj.data.startTime" type="datetime"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('newLog.endTime')"><!-- 年月日时分秒 -->
              <el-date-picker v-model="obj.data.endTime" type="datetime" ></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('newLog.level')"><!-- 日志级别 -->
              <!--<el-input v-model="obj.data.level" class="input-with-select"></el-input>-->
              <el-select v-model="obj.data.level" style="width:183px;" placeholder="">
              		<el-option label="ALL" value=" "></el-option>
	                <el-option label="DEBUG" value="DEBUG" ></el-option><!-- DEBUG -->
	                <el-option label="INFO" value="INFO" ></el-option><!-- INFO -->
	                <el-option label="WARN" value="WARN" ></el-option><!-- WARN -->
	                <el-option label="ERROR" value="ERROR" ></el-option><!-- ERROR-->
	                <el-option label="FATAL" value="FATAL" ></el-option><!-- FATAL-->
	            </el-select>
            </el-form-item>
          	<el-form-item :label="$t('newLog.module')"><!-- 模块名称 -->
              <el-input v-model="obj.data.module" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item :label="$t('newLog.category')"><!-- 类别 -->
            	<el-input v-model="obj.data.category" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item :label="$t('newLog.subCategory')"><!-- 子类别 -->
            	<el-input v-model="obj.data.subCategory" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item :label="$t('newLog.filter1')"><!-- 标签1 -->
              <el-input v-model="obj.data.filter1" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item :label="$t('newLog.filter2')"><!-- 标签2 -->
              <el-input v-model="obj.data.filter2" class="input-with-select"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('newLog.serverIp')"><!-- 服务器IP -->
              <el-select v-model="obj.data.serverIpList" multiple placeholder="">
	                <el-option v-for="(item,index) in serverIpArr" :key="index" :label="item.serverIp" :value="item.serverIp" ></el-option><!-- DEBUG -->
	            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="edit_module_btn" style="margin-top: 10px;">
              <el-button type="warning" icon="el-icon-search" @click="QueryUser()" size="small">{{$t("Query")}}</el-button>
              <!-- 查询 -->
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 列表模块 -->
    <div class="list_module">
      <div class="table_body">
        <h4>{{$t('journal.Log_List')}}</h4><!-- 日志列表 -->
        <el-table :data="tableData" border style="width: 100%" size="small" :empty-text="$t('noData')">
          <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
          <!--序号-->
          <!--<el-table-column prop="id" label="id" align="center" min-width="160px"></el-table-column>-->
          <!--id-->

          <el-table-column prop="requestTime" :label="$t('newLog.requestTime')" align="center" min-width="145px">
          	<template slot-scope="scope">
          		<span :class="scope.row.level == 'ERROR' ? 'error':''">{{scope.row.requestTime}}</span>
          	</template>
          </el-table-column>
          <!--请求时间-->
          
          <el-table-column prop="level" :label="$t('newLog.level')" align="center" min-width="70px">
          	<template slot-scope="scope">
          		<span :class="scope.row.level == 'ERROR' ? 'error':''">{{scope.row.level}}</span>
          	</template>
          </el-table-column>
          <!--级别	-->
          
          <el-table-column prop="message" :label="$t('newLog.message')" align="center" min-width="160px">
          	<template slot-scope="scope">
          		<span :class="scope.row.level == 'ERROR' ? 'error':''">{{scope.row.message}}</span>
          	</template>
          </el-table-column>
          <!--信息	-->

          <!--<el-table-column prop="systemSign" :label="$t('newLog.systemSign')" align="center"></el-table-column>-->
          <!--系统标示	-->

          <!--<el-table-column prop="systemName" :label="$t('newLog.systemName')" align="center"></el-table-column>-->
          <!--系统名称 -->

          <el-table-column prop="module" :label="$t('newLog.mod')" align="center" min-width="160px"></el-table-column>
          <!--模块	-->
          
          <el-table-column prop="category" :label="$t('newLog.category')" align="center" min-width="70px"></el-table-column>
          <!--类别	-->
          
          <el-table-column prop="subCategory" :label="$t('newLog.subCategory')" align="center" min-width="70px"></el-table-column>
          <!--子类	-->
          
          <el-table-column prop="filter1" :label="$t('newLog.filter1')" align="center" min-width="70px"></el-table-column>
          <!--标签1	-->
          
          <el-table-column prop="filter2" :label="$t('newLog.filter2')" align="center" min-width="70px"></el-table-column>
          <!--标签2	-->
          
          
          
          <el-table-column prop="serverIp" :label="$t('newLog.serverIp')" align="center" min-width="150px"></el-table-column>
          <!--服务器IP	-->
          
          
          
          <!--<el-table-column prop="requestBody" label="请求报文" align="center" min-width="180px"></el-table-column>-->
          <!--请求报文	-->

          <!--<el-table-column prop="exception" label="异常信息" align="center" min-width="180px"> </el-table-column>-->
          <!--异常信息	-->

          <el-table-column :label="$t('Operation')" align="center" fixed="right" min-width="80px" v-if="funList.indexOf('查看')>-1"><!--操作	-->
            <template slot-scope="scope">
              <el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)">
                <i class="el-icon-view"></i>
                <span class="text">{{$t('See')}}</span><!--查看	-->
              </el-button> 
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="obj.pageIndex"
          :page-size="obj.pageSize"
          layout="prev, pager, next, slot"
          :total="totalCount"
        >
          <template slot>
            <div class="slot_pag">
              <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange" style="width:auto!important;">  <!-- 10条/页 -->
								<el-option :value="5" :label="'5'+$t('size')"></el-option>
								<el-option :value="10" :label="'10'+$t('size')"></el-option>
								<el-option :value="15" :label="'15'+$t('size')"></el-option>
							</el-select>
							<span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
              <span>{{$t('Jump_to')}}</span><!--跳转至	-->
              <el-input size="mini" v-model="obj.goPage" type="number"></el-input>
              <span>{{$t('Pag')}}</span><!--页	-->
              <el-button type="warning" @click="goPageSure">{{$t('OK')}}</el-button><!--确定	-->
            </div>
          </template>
        </el-pagination>
      </div>
    </div>
    <!--弹框页面开始-->
    <!--新增弹框页面开始-->
    <el-dialog :title="$t('journal.Log_details')" :visible.sync="addUserDialog" :before-close="cancels" :close-on-click-modal="false"><!--日志详情	-->
      <el-form :model="addForm" ref="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="rules" label-width="120px" class="demo-ruleForm" size="small" >
        <el-row class="edit_module_search">
        	<el-col :span="12">
        		<el-form-item :label="$t('newLog.requestTime')"><!--请求时间	-->
        			<el-date-picker v-model="addForm.requestTime" type="datetime" disabled style="width:100%;"></el-date-picker>
        		</el-form-item>
        	</el-col>
        	<el-col :span="12">
            <el-form-item :label="$t('newLog.systemSign')"><!--请求标示	-->
              <el-input v-model="addForm.systemSign" disabled></el-input>
            </el-form-item>
          </el-col>
        	<el-col :span="12">
            <el-form-item :label="$t('newLog.systemName')"><!--系统名称	-->
              <el-input v-model="addForm.systemName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.mod')"><!--模块	-->
              <el-input v-model="addForm.module" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.category')"><!--类别	-->
            	<el-input v-model="addForm.category" disabled></el-input>
              <!--<el-select v-model="addForm.category" style="width:100%;" placeholder="" disabled>
	                <el-option label="类别1" value="lb1" ></el-option>
	                <el-option label="类别2" value="lb2" ></el-option>
	                <el-option label="类别3" value="lb3" ></el-option>
	                <el-option label="类别4" value="lb4" ></el-option>
	            </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.subCategory')"><!--子类	-->
            	<el-input v-model="addForm.subCategory" disabled></el-input>
              <!--<el-select v-model="addForm.subCategory" style="width:100%;" placeholder="" disabled>
	                <el-option label="子类别1" value="zlb1" ></el-option>
	                <el-option label="子类别2" value="zlb2" ></el-option>
	                <el-option label="子类别3" value="zlb3" ></el-option>
	                <el-option label="子类别4" value="zlb4" ></el-option>
	            </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.filter1')"><!--标签1	-->
              <el-input v-model="addForm.filter1" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.filter2')"><!--标签2	-->
              <el-input v-model="addForm.filter2" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.message')"><!--信息	-->
              <el-input v-model="addForm.message" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.serverIp')"><!--服务器IP	-->
              <el-input v-model="addForm.serverIp" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('newLog.level')"><!--级别	-->
              <el-input v-model="addForm.level" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('newLog.requestBody')"><!--级别	-->
              <el-input type="textarea" v-model="addForm.requestBody" :autosize="{ minRows: 2, maxRows: 4}" disabled></el-input>
            </el-form-item>
          </el-col>
	  <el-col :span="24">
            <el-form-item :label="$t('newLog.responseBody')"><!--级别	-->
              <el-input type="textarea" v-model="addForm.responseBody" :autosize="{ minRows: 2, maxRows: 4}" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('newLog.exception')"><!--异常信息	-->
              <el-input type="textarea" v-model="addForm.exception" :autosize="{ minRows: 2, maxRows: 4}" disabled></el-input>
            </el-form-item>
          </el-col>
        	
        	
          
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NewLog',
  data() {
    return {
      tableData: [{}], //user 列表数据
      obj: {
        pageSize: 10, //一页显示几条数据
        pageIndex: 1, //需要传过去的参数
        data: {
					startTime:"",//开始时间
					endTime:"",//结束时间
					module:"",//模块名称
					category:"",//类别
					subCategory:"",//子类别
					filter1:"",//标签1
					filter2:"",//标签2
					level:"",//日志级别
					serverIp:"",//服务器IP
        },
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        goPage: null
      },
      currentPage: 1, //当前显示第几页 1开头
      totalCount: 0, //一共有多少条数据
      addUserDialog: false, //弹框
      addForm: {
      	requestTime:"",//请求时间
      	systemSign:"",//系统标示
      	systemName:"",//系统名称
      	module:"",//模块名称
      	category:"",//类别
      	subCategory:"",//子类
      	filter1:"",//标签1
      	filter2:"",//标签2
      	message:"",//信息
      	serverIp:[],//服务器IP
      	level:"",//级别
      	requestBody:"",//请求报文
      	exception:"",//异常信息
      	
        flag: false, //是否可输入 默认可以
        edit: false //编辑标识
      },
      rules: {
      },
      funList: [],
      serverIpArr:[]
    };
  },
  mounted() {
  	this.getServerIp()
    this.getFunList()
    this.display(); // 初始化数据
  },

  methods: {
    // 获取权限信息
    getFunList() {
      let obj = {};
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == "接口日志查询";
      });
      this.$post(this.$api + "/user/findAuthorityFun", {
        loginId: this.$store.state.loginData.userLogin.loginId,
        menuId: obj.id
      }).then(res => {
        if (res.returnCode == "000000") {
          this.funList = JSON.stringify(res.returnData);
        }
      });
    },
    
    //获取服务器ip
    getServerIp(){
    	this.$post(this.$api+'/logRecordQuery/findServerIpList',{}).then(res=>{
    		console.log(res)
    		this.serverIpArr=res.returnData
    	})
    },
    
    // 点击确定切换分页
    goPageSure() {
      if (this.obj.goPage) {
        var mc = Math.ceil(this.totalCount / this.obj.pageSize);
        if (this.obj.goPage) {
          if (this.obj.goPage > 0 && this.obj.goPage <= mc) {
            this.obj.pageIndex = parseInt(this.obj.goPage);
          } else {
            this.obj.pageIndex = parseInt(mc);
          }
        }
        this.display();
        this.obj.goPage = null;
      }
    },
    
    // 初始化列表
    display: function() {
    	var filter = this.$options.filters['formatDate'];
    	this.obj.data.startTime = filter( this.obj.data.startTime )
    	this.obj.data.endTime = filter( this.obj.data.endTime )
//  	a = this.obj.data.serverIp
    	this.obj.data.serverIp=this.obj.data.serverIpList.join(",")
    	console.log(this.obj)
      this.$post(this.$api + "/logRecordQuery/findList", this.obj).then(res => {
        if (res.returnCode == "000000") {
        	console.log(res)
          this.tableData = res.returnData.dataList;
          this.totalCount = res.returnData.total;
        } else {
          var str = `
            <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
          `;
          this.$alert(str, "i18n.t('Prompt')", {
            dangerouslyUseHTMLString: true
          });
        }
      });
    },

    //查询列表
    QueryUser() {
      this.obj.pageIndex = 1;
      this.display();
    },

    //打开新增弹框
    openUserDiolog() {
      this.addUserDialog = true;
      if (this.$refs["addForm"] !== undefined) {
        this.$refs["addForm"].resetFields();
      }
    },
    // 查看详情
    seeItem (row) {
		let self = this
		this.addUserDialog = true
		if (this.$refs['addForm']!==undefined) {
			this.$refs['addForm'].resetFields();
		}
		self.$post(self.$api + '/logRecordQuery/findDetail',{id:row.id, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				console.log(res)
				self.addForm.requestTime=res.returnData.requestTime;
				self.addForm.systemSign=res.returnData.systemSign;
				self.addForm.systemName=res.returnData.systemName;
				self.addForm.module=res.returnData.module;
				self.addForm.category=res.returnData.category;
				self.addForm.subCategory=res.returnData.subCategory;
				self.addForm.filter1=res.returnData.filter1;
				self.addForm.filter2=res.returnData.filter2;
				self.addForm.message=res.returnData.message;
				self.addForm.serverIp=res.returnData.serverIp;
				self.addForm.level=res.returnData.level;
				self.addForm.requestBody=res.returnData.requestBody;
				self.addForm.exception=res.returnData.exception;
				self.addForm.responseBody=res.returnData.responseBody;
			} else {
				var str = `
					<p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
					<p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
				`
				this.$alert(str, i18n.t('Prompt'), {
					dangerouslyUseHTMLString: true
				});
			}
		});
		this.addForm.edit = false;
		this.addForm.flag = true
	},

    //取消弹框重置数据
    cancels(formName) {
      this.addUserDialog = false;
      this.addForm.flag = false;
      this.addForm.edit = false;
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //改变每页显示多少条
    handleSizeChange(val) {
      this.obj.pageSize = val;
      this.obj.pageIndex = 1
      this.display();
    },
    //选择页数改变数据
    handleCurrentChange(val) {
      this.obj.pageIndex = val;
      this.display();
    }
  },
  filters: {
    level(val, levelList) {
      let sname = "";
      levelList.map(item => {
        if (item.paramValue == val) {
          sname = item.paramSname;
        }
        return false;
      });
      return sname || "";
    },
    formatDate(val){
			if(val==null || val == "" ){
				return ""
			}else{
				let dat = new Date(val);
				let y = dat.getFullYear();
		        let MM = dat.getMonth() + 1;
		        MM = MM < 10 ? ('0' + MM) : MM;
		        let d = dat.getDate();
		        d = d < 10 ? ('0' + d) : d;
		        let h = dat.getHours();
		        h = h < 10 ? ('0' + h) : h;
		        let m = dat.getMinutes();
		        m = m < 10 ? ('0' + m) : m;
		        let s = dat.getSeconds();
		        s = s < 10 ? ('0' + s) : s;
	//			  if(x==0){
		       		return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
	//			  }else if(x==1){
	//			    return y + '-' + MM + '-' + d
	//			  }
	        }
	        
		}
  },
  
};
</script>

<style  lang='scss' scoped="scoped">
#contract_content {
  .el-dialog {
    width: 60% !important;
  }
}
.el-upload__tip {
  margin-top: 0;
  margin-left: 10px;
}
.el-input-group__prepend {
  background: #3a8ee6;
  color: #fff;
  border: none;
}
#contract_content .el-input--suffix .el-input__inner{
	padding-right:30px!important;
}
.error{color:red; font-weight: bold;}
</style>

<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
    <!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-row>
          <el-col :span="24">
          	<el-form-item label="客户名称"><!-- 客户名称 -->
              <el-input v-model="obj.customerName" class="input-with-select"></el-input>
          	</el-form-item>
	          <el-form-item label="借贷人/担保人"><!-- 借贷人/担保人 -->
		            <el-select v-model="obj.jdrdbr" style="width:183px;" placeholder="">
		                <el-option label="全部" value="" ></el-option><!-- 全部 -->
		                <el-option label="借贷人" value="借贷人" ></el-option><!-- 借贷人 -->
		                <el-option label="担保人" value="担保人" ></el-option><!-- 担保人 -->
		                <el-option label="借贷人/担保人" value="借贷人/担保人" ></el-option><!-- 借贷人/担保人 -->
		            </el-select>
		        </el-form-item>
            <el-form-item label="证件类型"><!-- 借贷人/担保人 -->
		            <el-select v-model="obj.zjlx" style="width:183px;" placeholder="">
		                <el-option label="全部" value="" ></el-option><!-- 全部 -->
		                <el-option label="身份证" value="身份证" ></el-option><!-- 借贷人 -->
		                <el-option label="护照" value="护照" ></el-option><!-- 担保人 -->
		                <el-option label="军官证" value="军官证" ></el-option><!-- 借贷人/担保人 -->
		            </el-select>
		        </el-form-item>
            <el-form-item label="证件号码"><!-- 证件号码 -->
              <el-input v-model="obj.zjhm" class="input-with-select"></el-input>
          	</el-form-item>
          	<el-form-item label="客户手机号"><!-- 客户手机号 -->
              <el-input v-model="obj.khsjh" class="input-with-select"></el-input>
          	</el-form-item>
          	<el-form-item label="婚姻状况"><!-- 借贷人/担保人 -->
		            <el-select v-model="obj.hyzk" style="width:183px;" placeholder="">
		                <el-option label="全部" value="" ></el-option><!-- 全部 -->
		                <el-option label="未婚" value="未婚" ></el-option><!-- 未婚 -->
		                <el-option label="已婚" value="已婚" ></el-option><!-- 已婚 -->
		                <el-option label="再婚" value="再婚" ></el-option><!-- 再婚 -->
		            </el-select>
		        </el-form-item>
            
          </el-col>
          <el-col :span="24">
            <div class="edit_module_btn" style="margin-top: 10px;">
              <el-button type="warning" icon="el-icon-search" @click="QueryUser()" size="small">{{$t("Query")}}</el-button><!-- 查询 -->
              <el-button type="primary" icon="el-icon-plus" @click="add()" size="small">{{$t("Add")}}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 列表模块 -->
    <div class="list_module">
      <div class="table_body">
        <h4>客户列表</h4><!-- 客户列表 -->
        <el-table :data="tableData" border style="width: 100%" size="small" :empty-text="$t('noData')">
          <!--<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>-->
          <!--序号-->

          <el-table-column prop="customerName" label="客户名称" align="center" width="145px"></el-table-column>
          <!--客户名称-->
          
          <el-table-column prop="zjlx" label="证件类型" align="center" width="145px"></el-table-column>
          <!--证件类型-->
          
          <el-table-column prop="zjhm" label="证件号码" align="center" width="145px"></el-table-column>
          <!--证件号码-->
          
          <el-table-column prop="khsjh" label="手机号" align="center" width="145px"></el-table-column>
          <!--手机号-->
          
          <el-table-column prop="hyzk" label="婚姻状况" align="center" width="145px"></el-table-column>
          <!--婚姻状况-->

          <el-table-column prop="jdrdbr" label="借贷人/担保人" align="center"></el-table-column>
          <!--借贷人/担保人	-->

          <el-table-column prop="createTime" :label="$t('journal.Creation_time')" align="center"></el-table-column><!--创建时间	-->
          <!--创建日期	-->

          <el-table-column prop="zt" label="状态" align="center" width="150px"></el-table-column>
          <!--状态	-->

          <el-table-column prop="more" label="更多" align="center">
          	<template slot-scope="scope">
          		<el-button size="mini" type="primary" class="search-btn" @click="more(scope.row)">
          			<i class="el-icon-more"></i>
          			<span class="text">更多</span><!--查看	-->
          		</el-button>
          	</template>
          </el-table-column><!--创建时间	-->
					<!--更多-->

          <el-table-column :label="$t('Operation')" align="center" width="100px" ><!--操作	--><!--v-if="funList.indexOf('查看')>-1"-->
            <template slot-scope="scope">
              <el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
								<i class="el-icon-edit"></i>
								<span class="text">{{$t('Edit')}}</span><!--编辑	--><!-- v-if="funList.indexOf('编辑') > -1" -->
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
        <div>
        	<el-button type="primary" @click="openUserDiolog()" size="small">个人客户导入</el-button>
        </div>
      </div>
    </div>
    <!--弹框页面开始-->
    <!--新增弹框页面开始-->
    <el-dialog title="个人客户下载" :visible.sync="addUserDialog" :before-close="cancels" :close-on-click-modal="false"><!--日志详情	-->
      <el-form :model="addForm" ref="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="rules" label-width="120px" class="demo-ruleForm" size="small" >
        <el-row class="edit_module_search">
          <el-col :span="24" >
          	<el-button size="mini" @click="downLoad">模板下载</el-button>
            <!--<el-form-item :label="$t('journal.legal_person')">
              <el-input v-model="addForm.legalPersonNum" disabled></el-input>
            </el-form-item>-->
          </el-col>
          <el-col :span="12" :offset="2">
            <el-form-item :label="$t('journal.Operator_number')"><!--操作人编号	-->
              <el-input v-model="addForm.loginId" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addForm')" >取消</el-button><!--重置-->
				<el-button type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button><!--保存-->
			</div>
    </el-dialog>
  </div>
</template>

<script>
	import bus from '../../../assets/bus.js'
export default {
	name:"CustomerIndex",
  data() {
    return {
      tableData: [{}], //user 列表数据
      obj:{
      	pageSize: 10, //一页显示几条数据
        pageIndex: 1, //需要传过去的参数
        goPage: null,
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
      	customerName:'',//客户名称
      	jdrdbr:'',//借贷人/担保人
      	zjlx:'',//证件类型
      	zjhm:'',//证件号码
      	kesjh:'',//客户手机号
      	hyzk:''//婚姻状况
      },
      currentPage: 1, //当前显示第几页 1开头
      totalCount: 0, //一共有多少条数据
      addUserDialog: false, //弹框
      addForm: {
        legalPersonNum: "",
        channelNo: "",
        loginId: "",
        loginName: "",
        menuName: "",
        menuUrl: "",
        service: "",
        serviceName: "",
        action: "",
        requestTime: '',
        request: '',
        flag: false, //是否可输入 默认可以
        edit: false //编辑标识
      },
      rules: {
      },
      funList: []
    };
  },
  mounted() {
    this.getFunList()
//  this.display(); // 初始化数据
  },

  methods: {
    // 获取权限信息
    getFunList() {
      let obj = {};
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == "日志管理";
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
      this.$post(this.$api + "/logQuery/findByPage", this.obj).then(res => {
        if (res.returnCode == "000000") {
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

	//点击新增
	add(){
		//func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
		this.$emit('func','1')
		//getValue:是发送出去之后需要兄弟组件监听的时间
		bus.$emit('getValue','111')
	},
	downLoad(){
		
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
		self.$post(self.$api + '/logQuery/findDetail',{id:row.id, legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum}).then(res =>{
			if(res.returnCode == '000000'){
				self.addForm.legalPersonNum = res.returnData.legalPersonNum
				self.addForm.channelNo = res.returnData.channelNo
				self.addForm.loginId = res.returnData.loginId
				self.addForm.loginName = res.returnData.loginName
				self.addForm.menuName = res.returnData.menuName
				self.addForm.menuUrl = res.returnData.menuUrl
        self.addForm.service = res.returnData.service
        self.addForm.serviceName = res.returnData.serviceName
				self.addForm.action = res.returnData.action
				self.addForm.requestTime = res.returnData.requestTime
        self.addForm.request = res.returnData.request
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
    }
  }
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
</style>

<template>
  <!-- 合同模板管理 -->
  <div class="content_box" id="contract_content">
    <!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-row>
          <el-col :span="24">
          	<el-form-item :label="$t('journal.Operator_number')"><!-- 操作人编号 -->
              <el-input v-model="obj.data.loginId" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item :label="$t('journal.Operator_name')"><!-- 操作人姓名 -->
              <el-input v-model="obj.data.loginName" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item :label="$t('journal.Date_of_operation')"><!-- 操作日期 -->
              <el-date-picker v-model="obj.data.requestTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('journal.Type_of_operation')"><!-- 操作类型 -->
                <el-select v-model="obj.data.action" style="width:183px;" placeholder="">
                    <el-option :label="$t('journal.whole')" value="" ></el-option><!-- 全部 -->
                    <el-option :label="$t('journal.Newly_added')" value="新增" ></el-option><!-- 新增 -->
                    <el-option :label="$t('journal.modify')" value="修改" ></el-option><!-- 修改 -->
                    <el-option :label="$t('journal.delete')" value="删除" ></el-option><!-- 删除 -->
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

          <el-table-column prop="loginId" :label="$t('journal.Operator_number')" align="center" width="145px"></el-table-column>
          <!--操作人编号-->

          <el-table-column prop="loginName" :label="$t('journal.Operator_name')" align="center"></el-table-column>
          <!--操作人姓名	-->

          <el-table-column prop="menuName" :label="$t('journal.Menu_Name')" align="center"></el-table-column>
          <!--菜单名称	-->

          <el-table-column prop="action" :label="$t('journal.Type_of_operation')" align="center" width="150px"></el-table-column>
          <!--操作类型	-->

          <el-table-column prop="createTime" :label="$t('journal.Creation_time')" align="center"></el-table-column><!--创建时间	-->

          <el-table-column :label="$t('Operation')" align="center" width="100px" v-if="funList.indexOf('查看')>-1"><!--操作	-->
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
            <el-form-item :label="$t('journal.legal_person')"><!--法人	-->
              <el-input v-model="addForm.legalPersonNum" disabled></el-input>
            </el-form-item>
          </el-col>
         	<!--<el-col :span="12">
            <el-form-item label="渠道编号">
              <el-input v-model="addForm.channelNo" disabled></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item :label="$t('journal.Operator_number')"><!--操作人编号	-->
              <el-input v-model="addForm.loginId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('journal.Operator_name')"><!--操作人姓名	-->
              <el-input v-model="addForm.loginName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('journal.Menu_Name')"><!--菜单名称	-->
              <el-input v-model="addForm.menuName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('journal.Menu_URL')"><!--菜单URL	-->
              <el-input v-model="addForm.menuUrl" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="service"><!--service	-->
              <el-input v-model="addForm.service" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('journal.Service_name')"><!--service名称	-->
              <el-input v-model="addForm.serviceName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('journal.Type_of_operation')"><!--操作类型	-->
              <el-input v-model="addForm.action" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('journal.Creation_time')"><!--创建时间	-->
              <el-input v-model="addForm.requestTime" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('journal.Request_content')"><!--请求内容	-->
              <el-input type="textarea" v-model="addForm.request" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Log',
  data() {
    return {
      tableData: [], //user 列表数据
      obj: {
        pageSize: 10, //一页显示几条数据
        pageIndex: 1, //需要传过去的参数
        data: {
          loginId: '',
          loginName: '',
          requestTime: '',
          action: ''
        },
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        goPage: null
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
    this.display(); // 初始化数据
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

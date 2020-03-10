<template>
  <!-- 批量关账停息 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('remind.name')" prop="kahao" >   <!-- 姓名 -->
                <el-input type="text"  v-model="obj.name" ></el-input >
              </el-form-item>
              <el-form-item :label="$t('remind.idNumber')" prop="kahao" >   <!-- 证件号码 -->
                <el-input type="text"  v-model="obj.zjhm" ></el-input >
              </el-form-item>
              <el-form-item :label="$t('remind.cardNumber')" prop="kahao" >   <!-- 卡号 -->
                <el-input type="text"  v-model="obj.kahao" ></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

    <!-- 卡片关账停息列表开始 -->
    <div class="card table_body">
      <h3>{{$t('batchCease.kpgztxlb')}}</h3><!--卡片关账停息列表-->
      <el-alert
        :title="$t('batchCease.qymr')"
        type="warning"
        show-icon
        :closable="false">
      </el-alert>
      <div class="tab">
        <el-row>
          <el-col :span="12">
            <el-radio-group v-model="radio1">
              <el-radio-button label="1">{{$t('batchCease.wsp')}}</el-radio-button><!--未审批-->
              <el-radio-button label="2">{{$t('batchCease.spz')}}</el-radio-button><!--审批中-->
              <el-radio-button label="3">{{$t('batchCease.sptg')}}</el-radio-button><!--审批通过-->
            </el-radio-group>
          </el-col>
          <el-col :span="12" style="text-align:right;">
            <el-button type="primary" @click="showDialog()">{{$t('batchCease.dr')}}</el-button><!-- 导入 -->
          </el-col>
        </el-row>

        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-top:15px;"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" > </el-table-column>
          <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
          <el-table-column  prop="jgh" :label="$t('remind.organizationNumber')" width="100" align="center" > </el-table-column><!-- 机构号 -->
          <el-table-column  prop="name" :label="$t('remind.name')" width="100" align="center" > </el-table-column><!-- 姓名 -->
          <el-table-column  prop="zjlx" :label="$t('remind.documentType')" width="120" align="center" > </el-table-column><!-- 证件类型 -->
          <el-table-column  prop="zjhm" :label="$t('remind.idNumber')" width="180" align="center" > </el-table-column><!-- 证件号码 -->
          <el-table-column  prop="kh" :label="$t('remind.cardNumber')" width="180" align="center" > </el-table-column><!-- 卡号 -->
          <el-table-column  prop="zt" :label="$t('batchCease.zt')" width="120" align="center" > </el-table-column><!-- 状态 -->
          <el-table-column  prop="splcbh" :label="$t('batchCease.splcbh')" width="120" align="center" > </el-table-column><!-- 审批流程编号 -->
          <el-table-column  prop="spzt" :label="$t('batchCease.spzt')" width="120" align="center" > </el-table-column><!-- 审批状态 -->
          <!--操作-->
					<el-table-column :label="$t('Operation')" align="center" min-width="150px" fixed="right">
						<template slot-scope="scope">
								<el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" >
									<i class="el-icon-view"></i>
									<span class="text">{{$t('See')}}</span>	<!-- 查看 -->
								</el-button> 
                <el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
                  <i class="el-icon-delete"></i>
                  <span class="text">{{$t('Delete')}}</span><!-- 删除 -->
                </el-button>
						</template>
					</el-table-column>
        </el-table>
        <el-button size="mini" @click="delectChecked()" style="margin-top:20px;">{{$t('batchCease.scxz')}}</el-button><!-- 删除选中 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="obj.pageIndex"
          :page-size="obj.pageSize"
          layout="prev, pager, next, slot"
          :total="totalCount"
          style="margin-top:-48px;"
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
    <!-- 卡片关账停息列表结束 -->

    <!-- 附件开始 -->
    <div class="card">
      <h3>{{$t('modify.fj')}}</h3>
      <el-form  :model="attachment" :rules="rules" ref="attachment" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
        <div class="bord">
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">{{$t('modify.xqwj')}}</el-button>
          </el-upload>
        </div>
        <el-col :span="12">
          <el-form-item :label="$t('modify.yx')" prop="yx"><!-- 原因 -->
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="attachment.yx"
              required>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 附件结束 -->
    <div class="btn">
      <el-button type="primary" @click="sureEdit('attachment')">{{$t('batchCease.fqsp')}}</el-button><!-- 发起审批 -->
    </div>

    <!-- 导入弹出框开始 -->
    <el-dialog :title="$t('batchCease.drgztx')" :visible.sync="importDialog" :before-close="cancels"  :close-on-click-modal="false"><!--卡片管理/导入关账停息-->
      <el-form   class="demo-form-inline borderForm" label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('remind.idNumber')" >   <!-- 证件号码 -->
              <el-input type="text"  v-model="dialog.zjhm" ></el-input >
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('remind.name')"  >   <!-- 姓名 -->
                <el-input type="text"  v-model="dialog.name" ></el-input >
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('remind.cardNumber')">   <!-- 卡号 -->
              <el-input type="text"  v-model="dialog.kh" ></el-input >
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">   <!-- 手机号 -->
              <el-input type="text"  v-model="dialog.sjh" ></el-input >
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <div class="edit_module_btn" style="margin-top:9px; padding-left:25px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small" >{{$t("Query")}}</el-button> <!-- 查询 -->
              </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="card border">
        <h3>{{$t('batchCease.kpgztxdr')}}</h3><!-- 卡片关账停息导入 -->
        <div class="cardMain">
          <el-row>
            <el-col :span="8">
              <el-upload
                class="upload-demo"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">{{$t('modify.xqwj')}}</el-button>
              </el-upload><!-- 选取文件 -->
            </el-col>
            <el-col :span="16" style="text-align:right;">
              <el-button size="small" @click="sureEdit('attachment')">{{$t('batchCease.ydrkh')}}</el-button><!-- 已导入客户 -->
              <el-button size="small" @click="sureEdit('attachment')">{{$t('batchCease.sxcfkh')}}</el-button><!-- 筛选重复客户 -->
              <el-button size="small" @click="sureEdit('attachment')">{{$t('batchCease.drmbxz')}}</el-button><!-- 导入模板下载 -->
              <el-button size="small" type="primary" @click="sureEdit('attachment')">{{$t('OK')}}</el-button><!-- 确定 -->
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="dialogData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:15px;"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" > </el-table-column>
            <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
            <el-table-column  prop="khxm" :label="$t('batchCease.khxm')" width="120" align="center" > </el-table-column><!-- 客户姓名 -->
            <el-table-column  prop="zjlx" :label="$t('remind.documentType')" width="120" align="center" > </el-table-column><!-- 证件类型 -->
            <el-table-column  prop="zjhm" :label="$t('remind.idNumber')" width="180" align="center" > </el-table-column><!-- 证件号码 -->
            <el-table-column  prop="sjh" :label="$t('batchCease.sjh')" width="120" align="center" > </el-table-column><!-- 手机号 -->
            <el-table-column  prop="kh" :label="$t('remind.cardNumber')" width="220" align="center" > </el-table-column><!-- 卡号 -->
            <!--操作-->
            <el-table-column :label="$t('Operation')" align="center" min-width="190px" fixed="right">
              <template slot-scope="scope">
                  <!-- <el-button size="mini" type="primary" class="search-btn"  @click="seeItem(scope.row)" >
                    <i class="el-icon-view"></i>
                    <span class="text">{{$t('See')}}</span>	
                  </el-button>  -->
                  <el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
                    <i class="el-icon-delete"></i>
                    <span class="text">{{$t('Delete')}}</span><!-- 删除 -->
                  </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" @click="delectChecked()" style="margin-top:20px;">{{$t('batchCease.scxz')}}</el-button><!-- 删除选中 -->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="obj.pageIndex"
            :page-size="obj.pageSize"
            layout="prev, pager, next, slot"
            :total="totalCount"
            style="margin-top:-48px;"
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
    </el-dialog>
    <!-- 导入弹出框结束 -->
    <!-- 查看弹出框开始 -->
    <el-dialog title="查看详情" :visible.sync="seeDialog" :before-close="seeCancels" :close-on-click-modal="false">
      <reminder-details :rowData="row"></reminder-details>
    </el-dialog>
    <!-- 查看弹出框结束 -->

    <!-- 点击提交选择人选开始 -->
    <personal-selection :dialogFormVisible="dialogFormVisible" @closepop="getMessage"></personal-selection>
    <!-- 点击提交选择人选结束 -->
  </div>
</template>

<script>
import reminderDetails from '@/components/common/ReminderDetails.vue'
import personalSelection from '@/components/common/PersonalSelection.vue'
export default {
  name: 'Billing',
  data () {
    return {
      obj: {
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        kahao:'',
        name:'',
        zjhm:'',
        pageSize: 10, //一页显示几条数据
        pageIndex: 1, //需要传过去的参数
        goPage: null,
      },
      currentPage: 1, //当前显示第几页 1开头
      totalCount: 0, //一共有多少条数据
      card:{
          kh:'',
          cp:'',
          zjlx:'',
          zjhm:'',
          xm:'',
          kpzt:'',
          zhzt:''
      },
      radio1:'1',
      tableData:[
        {jgh:"机构号",name:'姓名',zjlx:"证件类型",zjhm:"证件号码",kh:"卡号",zt:'章台'},
        {jgh:"机构号1",name:'姓名1',zjlx:"证件类型1",zjhm:"证件号码",kh:"卡号",zt:'章台'},
        {jgh:"机构号2",name:'姓名2',zjlx:"证件类型2",zjhm:"证件号码",kh:"卡号",zt:'章台'},
        {jgh:"机构号3",name:'姓名3',zjlx:"证件类型3",zjhm:"证件号码",kh:"卡号",zt:'章台'},
        {jgh:"机构号4",name:'姓名4',zjlx:"证件类型4",zjhm:"证件号码",kh:"卡号",zt:'章台'},
      ],//卡片关账停息列表
      dialogData:[],//导入弹出框列表
      attachment:{
          yx:''
      },
      importDialog:false,//导入弹框
      seeDialog:false,  //查看弹框	
      row:{},//点击查看的一行数据
      dialog:{
        zjhm:'',
        name:'',
        kh:'',
        sjh:''
      },
      fileList:[],
      switchTypeList: [],
      useStatusList: [],
      dialogFormVisible:false,
      rules:{
          yx:[
            { required: true, message:"请输入原因", trigger: 'blur' },
          ]
      },
      funList: []
      }
  },
  components:{
    reminderDetails,
    personalSelection
  },
  mounted(){
    // this.getFunList()
    // this.getParam()
	  // this.display(); // 初始化数据
  },
  
  methods:{
    // 获取权限信息
    getFunList () {
      let obj = {id:''}
      // obj = this.$store.state.loginData.beMenuList.find(item => {
      //   return item.name == '批量关账停息'
      // })
      this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
        if(res.returnCode == '000000'){
        this.funList = JSON.stringify(res.returnData)
        }
      });
    },
    // 获取切换模式和使用标识列表
    getParam:function(){
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'SWITCH_TYPE'}).then(res =>{
        if(res.returnCode == '000000'){
          this.switchTypeList =  res.returnData;
        }
      });
      this.$post(this.$api + '/paramValues/findByParamCode',{paramCode: 'USE_STATUS'}).then(res =>{
        if(res.returnCode == '000000'){
          this.useStatusList =  res.returnData;
        }
      });
    },
    
    sureEdit(cardForm){
      this.$refs[cardForm].validate((valid) => {
        console.log(valid)
        if(valid){
          this.dialogFormVisible=true;
        }
      })
    },
    getMessage(data){
      console.log(data)
      this.dialogFormVisible=false;
    },
    handlePreview(){},
    handleRemove(){},
    beforeRemove(){},
    handleExceed(){},

    //列表全选时
    handleSelectionChange(val) {
        console.log(val)
        // this.multipleSelection = val;
    },

    //查询列表
    QueryUser(){
      // this.obj.pageIndex = 1;
      this.display()
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
    //删除选中
    delectChecked(){

    },
    //取消弹框重置数据
    cancels(formName){
      this.importDialog = false;
    },

    //点击导入出弹框
    showDialog(){
      this.importDialog = true;
    },

    //点击列表查看出弹框
    seeItem(row){
      this.seeDialog = true;
      this.row=row
      console.log(row)
    },
    seeCancels(){
       this.seeDialog = false;
    },

    handleClick(tab, event) {
        console.log(tab, event);
    },
    

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
.card{
  // border:1px solid #eee;
  background:#fff;
  margin-top:10px;
  padding-bottom:5px;
  border-bottom-left-radius:10px;
  border-bottom-right-radius: 10px;
  h3{
    line-height:50px; 
    box-sizing: border-box;
    padding:0 10px;
    background:#eee;
    background:$light-color;
  }
  .cardMain{
    padding:10px 10px 0;
  }
}
.card.border{
  border:1px solid #eee;
}
.btn{
  margin-top:10px;
  padding-bottom:20px;
  text-align: center;
}

.bord{
  border:1px solid #eee;
  border-radius:10px;
  padding:10px 20px;
}
.tab{
  padding:10px;
}
.borderForm{
  padding:10px;
  border-radius:10px;
  border:1px solid #eee;
}
</style>

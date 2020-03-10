<template>
  <!-- 客户经理调额申请 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="24">
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

    <!-- 客户经理调额申请开始 -->
    <div class="list_module">
      <div class="card table_body">
          <h4>客户经理调额申请</h4><!--客户经理调额申请-->
          <div class="tab">
              <el-row>
                  <el-col :span="8"><div class="pl30">{{$t('quota.khxm')}}：<span>{{content.name}}</span></div></el-col><!--客户姓名：-->
                  <el-col :span="8"><div class="pl30">{{$t('quota.zjhm')}}：<span>{{content.zjhm}}</span></div></el-col><!--证件号码：-->
                  <el-col :span="8"><div class="pl30">{{$t('quota.zgsxed')}}：<span>{{content.zgsxed}}</span></div></el-col><!--最高授信额度：-->
                  <el-col :span="8"><div class="pl30">{{$t('quota.fxjb')}}：<span>{{content.fxjb}}</span></div></el-col><!--风险级别：-->
              </el-row>
              <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%;margin-top:15px;"
                  border
                  @selection-change="handleSelectionChange"
              >
                  <el-table-column type  width="55" align="center" :label="$t('quota.dx')"><!-- 单选 -->
                      <template slot-scope="scope">
                          <el-radio
                              @change.native="getCurrentRow(scope.$index,scope.row)"
                              :label = "scope.$index"
                              v-model="radio"
                              class="textRadio"
                          >&nbsp;</el-radio>
                      </template>
                  </el-table-column>
                  <el-table-column  prop="kh" :label="$t('remind.cardNumber')" align="center" > </el-table-column><!-- 卡号 -->
                  <el-table-column  prop="cpmc" :label="$t('quota.cpmc')" align="center" > </el-table-column><!-- 产品名称 -->
                  <el-table-column  prop="gded" :label="$t('quota.gded')" align="center" > </el-table-column><!-- 固定额度 -->
                  <el-table-column  prop="lsed" :label="$t('quota.lsed')"  align="center" > </el-table-column><!-- 临时额度 -->
                  
              </el-table>
          </div>
      </div>
    </div>
    <!-- 客户经理调额申请结束 -->

    <!-- 附件开始 -->
    <div class="card cardRadius" style="margin-bottom:20px;">
      <el-form  :model="attachment" :rules="rules" ref="attachment" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
        <el-form-item :label="$t('quota.edlx')" prop="quotaType"><!-- 额度类型 -->
            <el-radio-group v-model="attachment.quotaType">
                <el-radio label="0">{{$t('quota.gded')}}</el-radio><!-- 固定额度 -->
                <el-radio label="1">{{$t('quota.lsed')}}</el-radio><!-- 临时类型 -->
            </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('quota.tzlx')" prop="adjustQuota"><!-- 调整类型 -->
            <el-radio-group v-model="attachment.adjustQuota">
                <el-radio label="0">{{$t('quota.tsed')}}</el-radio><!-- 提升额度 -->
                <el-radio label="1">{{$t('quota.jded')}}</el-radio><!-- 降低额度 -->
            </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('quota.sqed')" prop="sqed"><!-- 申请额度 -->
            <el-input v-model="attachment.sqed" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item :label="$t('modify.yx')" prop="yx"><!-- 原因 -->
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="attachment.yx"
              required
              style="width:500px;"
              >
            </el-input>
        </el-form-item>
        <div class="upLoad table_body">
            <div class="title">上传附件</div>
            <div class="upLoadBox">
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
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;margin-top:15px;"
                        border
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="index"  width="55" align="center" label="序号">
                            
                        </el-table-column>
                        <el-table-column  prop="kh" label="文件" align="center" > </el-table-column><!-- 卡号 -->
                        <el-table-column  prop="cpmc" label="上传人" align="center" > </el-table-column><!-- 产品名称 -->
                        <el-table-column  prop="gded" label="上传时间" align="center" > </el-table-column><!-- 固定额度 -->
                        <el-table-column  prop="lsed" label="操作"  align="center" > </el-table-column><!-- 临时额度 -->
                        
                    </el-table>
                </div>
            </div>
        </div>
        <el-form-item>
            <el-button type="primary" @click="sureEdit('attachment')" size="large">{{$t('quota.tj')}}</el-button><!-- 提交 -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 附件结束 -->

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
      content:{
          name:"王晓",
          zjhm:"330206198906251423",
          zgsxed:"30000",
          fxjb:"无"
      },
      radio:'',
      tableData:[
        {cpmc:"产品名称",gded:'固定额度',lsed:"临时额度",kh:"卡号"},
        {cpmc:"产品名称1",gded:'固定额度1',lsed:"临时额度1",kh:"卡号1"},
        {cpmc:"产品名称2",gded:'固定额度2',lsed:"临时额度2",kh:"卡号2"},
        {cpmc:"产品名称3",gded:'固定额度3',lsed:"临时额度3",kh:"卡号3"},
      ],//卡片关账停息列表
      dialogData:[],//导入弹出框列表
      attachment:{
          quotaType:'',//额度类型
          adjustQuota:'',//调整类型
          sqed:'',
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
          quotaType:[
            { required: true, message:"请选择额度类型", trigger: 'change' },
          ],
          adjustQuota:[
            { required: true, message:"请选择调整类型", trigger: 'change' },
          ],
          sqed:[
            { required: true, message:"请输入申请额度", trigger: 'blur' },
          ],
          yx:[
            { required: true, message:"请输入原因", trigger: 'blur' },
          ],
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
    getCurrentRow(index,row){
        console.log(index)
        console.log(row)
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
.cardRadius{
    border-radius:10px;
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
.upLoad{
    .title{
        width:125px;
        text-align: right;
    }
    .upLoadBox{
        box-sizing: border-box;
        padding-left:70px;
        padding:10px 70px;
    }
}
.tab{
  padding:10px;
}
.pl30{
    padding-left:30px;
    line-height:40px;
    color:#555;
    span{
        margin-left:10px;
    }
}
</style>

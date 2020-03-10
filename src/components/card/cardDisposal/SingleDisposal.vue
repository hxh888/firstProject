<template>
  <!-- 单卡处置 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('remind.cardNumber')" prop="kahao" >   <!-- 卡号 -->
                <el-input type="text"  v-model="obj.kahao" ></el-input >
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <!-- <el-button type="primary" icon="el-icon-setting" @click="editItem(tableData[0])" size="small" v-if="funList.indexOf('手工')>-1">{{$t("account.Manual_daily_cutting")}}</el-button> 手工日切 -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

    <!-- 卡片信息开始 -->
    <div class="card">
      <h3>{{$t('remind.cardInformation')}}</h3><!--卡片信息-->
      <el-form  :model="card" ref="card" :rules="rules" label-width="135px" size="small" class="demo-form-inline" style="padding:20px 10px;overflow:hidden;">
        <el-col :span="8">
          <el-form-item :label="$t('remind.cardNumber')" prop="kh"><!-- 卡号 -->
            <el-input v-model="card.kh" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.product')" prop="cp"><!-- 产品 -->
            <el-input v-model="card.cp" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.documentType')" prop="zjlx"><!-- 证件类型 -->
            <el-input v-model="card.zjlx" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.idNumber')" prop="zjhm"><!-- 证件号码 -->
            <el-input v-model="card.zjhm" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.name')" prop="xm"><!-- 姓名 -->
            <el-input v-model="card.xm" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.cardStatus')" prop="kpzt"><!-- 卡片状态 -->
            <el-input v-model="card.kpzt" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.accountStatus')" prop="zhzt"><!-- 账户状态 -->
            <el-input v-model="card.zhzt" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('singleDisposal.kqx')" prop="zhzt"><!-- 可取现 -->
            <el-input v-model="card.kqx" readonly placeholder="是/否"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('singleDisposal.kzc')" prop="zhzt"><!-- 可转出 -->
            <el-input v-model="card.kzc" readonly placeholder="是/否"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('singleDisposal.kxf')" prop="zhzt"><!-- 可消费 -->
            <el-input v-model="card.kxf" readonly placeholder="是/否"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 卡片信息结束 -->

    
		
    <!-- 卡片处置开始 -->
    <div class="card">
      <h3>卡片处置</h3><!-- 卡片处置 -->
        <div style="padding:20px 40px;">
          <el-checkbox v-model="checked1" :label="$t('singleDisposal.gbqx')" border></el-checkbox><!-- 关闭取现 -->
          <el-checkbox v-model="checked2" :label="$t('singleDisposal.gbzz')" border></el-checkbox><!-- 关闭转账 -->
          <el-checkbox v-model="checked3" :label="$t('singleDisposal.gbxf')" border></el-checkbox><!-- 关闭消费 -->
          <el-checkbox v-model="checked4" :label="$t('singleDisposal.zf')" border></el-checkbox><!-- 止付 -->
        </div>
    </div>
    <!-- 卡片处置结束 -->
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
      <el-button type="primary" @click="sureEdit('attachment')">{{$t('singleDisposal.tj')}}</el-button><!-- 提交 -->
    </div>

    <!-- 点击提交选择人选开始 -->
    <personal-selection :dialogFormVisible="dialogFormVisible" @closepop="getMessage"></personal-selection>
    <!-- 点击提交选择人选结束 -->
  </div>

  
</template>

<script>
import personalSelection from '@/components/common/PersonalSelection.vue'
export default {
  name: 'Billing',
  data () {
    return {
      obj: {
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        kahao:''
      },
     card:{
        kh:'',
        cp:'',
        zjlx:'',
        zjhm:'',
        xm:'',
        kpzt:'',
        zhzt:'',
        kqx:'',
        kqc:'',
        kxf:'',
     },
     attachment:{
         yx:''
       },
     checked1:false,
     checked2:false,
     checked3:false,
     checked4:false,
     fileList:[],
    switchTypeList: [],
    useStatusList: [],
    dialogFormVisible:false,
    rules:{
        rqrq:[
        { required: true, message: i18n.t('account.Please_choose_the_date_of_suncut'), trigger: 'blur' },
        ],
        yx:[
          { required: true, message:"请输入原因", trigger: 'blur' },
        ]
    },
    funList: []
    }
  },
  components:{
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
      //   return item.name == '单卡处置'
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

    //查询列表
    QueryUser(){
      // this.obj.pageIndex = 1;
      this.display()
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
</style>

<template>
  <!-- 发起卡片资料修改 -->
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
      <el-form  :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
        <el-col :span="8">
          <el-form-item :label="$t('remind.cardNumber')" prop="basic.kh"><!-- 卡号 -->
            <el-input v-model="card.basic.kh" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.product')" prop="basic.cp"><!-- 产品 -->
            <el-input v-model="card.basic.cp" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.cardStatus')" prop="basic.kpzt"><!-- 卡片状态 -->
            <el-input v-model="card.basic.kpzt" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.accountStatus')" prop="basic.zhzt"><!-- 账户状态 -->
            <el-input v-model="card.basic.zhzt" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.cardIssuer')" prop="basic.fkjg"><!-- 发卡机构 -->
            <el-input v-model="card.basic.fkjg" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.dateCard')" prop="basic.fkrq"><!-- 发卡日期 -->
            <el-input v-model="card.basic.fkrq" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.lineCredit')" prop="basic.xyed"><!-- 信用额度 -->
            <el-input v-model="card.basic.xyed" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.lail')" prop="basic.defqed"><!-- 大额分期额度 -->
            <el-input v-model="card.basic.defqed" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.provisionalQuota')" prop="basic.lsed"><!-- 临时额度 -->
            <el-input v-model="card.basic.lsed" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.efdotl')" prop="basic.lsedsexrq"><!-- 临时额度生效日期 -->
            <el-input v-model="card.basic.lsedsexrq" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.exdotl')" prop="basic.lsedsixrq"><!-- 临时额度失效日期 -->
            <el-input v-model="card.basic.lsedsixrq" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.kpdqr')" prop="basic.kpdqr"><!-- 卡片到期日 -->
            <el-input v-model="card.basic.kpdqr" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.ghrgh')" prop="basic.ghrgh"><!-- 管户人工号 -->
            <el-input v-model="card.basic.ghrgh" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.ghrxm')" prop="basic.ghrxm"><!-- 管户人姓名 -->
            <el-input v-model="card.basic.ghrxm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.dqtzye')" prop="basic.dqtzye"><!-- 当前透支余额 -->
            <el-input v-model="card.basic.dqtzye" ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 卡片信息结束 -->

    <!-- 申请人基本资料开始 -->
    <div class="card">
      <h3>{{$t('customer.sqrjbzl')}}</h3><!-- 申请人基本资料 -->
      <el-form  :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
        <el-col :span="8">
          <el-form-item :label="$t('remind.name')" prop="applicant.xm"><!-- 姓名 -->
            <el-input v-model="card.applicant.xm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.pinyin')" prop="applicant.py"><!-- 拼音 -->
            <el-input v-model="card.applicant.py" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.documentType')" prop="applicant.zjlx"><!-- 证件类型 -->
            <el-input v-model="card.applicant.zjlx" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.idNumber')" prop="applicant.zjhm"><!-- 证件号码 -->
            <el-input v-model="card.applicant.zjhm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.zjyxq')" prop="applicant.zjyxq"><!-- 证件有效期 -->
            <el-input v-model="card.applicant.zjyxq" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.xl')" prop="applicant.xl"><!-- 学历 -->
            <el-select v-model="card.applicant.xl" placeholder="请选择" style="width:100%;">
              <el-option label="小学" value="0"></el-option>
              <el-option label="初中" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.hyzk')" prop="applicant.hyzk"><!-- 婚姻状况 -->
            <el-select v-model="card.applicant.hyzk" placeholder="请选择" style="width:100%;">
              <el-option label="小学" value="0"></el-option>
              <el-option label="初中" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.sjhm')" prop="applicant.sjhm"><!-- 手机号码 -->
            <el-input v-model="card.applicant.sjhm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.jtdh')" prop="applicant.jtdh"><!-- 家庭电话 -->
            <el-input v-model="card.applicant.jtdh" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.dzyx')" prop="applicant.dzyx"><!-- 电子邮箱 -->
            <el-input v-model="card.applicant.dzyx" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('remind.zddz')"><!-- 账单地址 -->
            <el-input v-model="card.applicant.province"  style="width:100px;"></el-input>{{$t('remind.province')}}<!-- 省 -->
            <el-input v-model="card.applicant.city"  style="width:100px;"></el-input>{{$t('remind.city')}}<!-- 市 -->
            <el-input v-model="card.applicant.country"  style="width:100px;"></el-input>{{$t('remind.quxian')}}<!-- 区县 -->
            <el-input v-model="card.applicant.detailsAdd"  style="width:220px;"></el-input>{{$t('remind.detailAdd')}}<!-- 详细地址 -->
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 申请人基本资料结束 -->
		<!-- 申请人职业资料开始 -->
    <div class="card">
      <h3>{{$t('customer.sqrzyzl')}}</h3><!-- 申请人职业资料 -->
      <el-form  :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
        <el-col :span="8">
          <el-form-item :label="$t('remind.dwqc')" prop="occupation.dwqc"><!-- 单位全称 -->
            <el-input v-model="card.occupation.dwqc" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.rzbm')" prop="occupation.rzbm"><!-- 任职部门 -->
            <el-input v-model="card.occupation.rzbm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.hylb')" prop="occupation.hylb"><!-- 行业类别 -->
            <!-- <el-input v-model="card.occupation.hylb" ></el-input> -->
            <el-select v-model="card.occupation.hylb" placeholder="请选择" style="width:100%;">
              <el-option label="小学" value="0"></el-option>
              <el-option label="初中" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.gw')" prop="occupation.gw"><!-- 岗位 -->
            <el-input v-model="card.occupation.gw" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.gznx')" prop="occupation.gznx"><!-- 工作年限 -->
            <el-input v-model="card.occupation.gznx" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.dwdh')" prop="occupation.dwdh"><!-- 单位电话 -->
            <el-input v-model="card.occupation.dwdh" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.fjhm')" prop="occupation.fjhm"><!-- 分级号码 -->
            <el-input v-model="card.occupation.fjhm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('batchCease.nsry')" prop="occupation.nsr"><!-- 年收入(元) -->
            <el-input v-model="card.occupation.nsr" ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 申请人职业资料结束 -->

    <!-- 联系人资料开始 -->
    <div class="card">
      <h3>{{$t('customer.lxrzl')}}</h3><!-- 联系人资料 -->
      <el-form  :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
        <el-col :span="8">
          <el-form-item :label="$t('remind.gx')" prop="contact.gx"><!-- 关系 -->
            <el-input v-model="card.contact.gx" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.name')" prop="contact.xm"><!-- 姓名 -->
            <el-input v-model="card.contact.xm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.sjhm')" prop="contact.sjhm"><!-- 手机号码 -->
            <el-input v-model="card.contact.sjhm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.lxdh')" prop="contact.lxdh"><!-- 联系电话 -->
            <el-input v-model="card.contact.lxdh" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('remind.dwqc')" prop="contact.dwqc"><!-- 单位全称 -->
            <el-input v-model="card.contact.dwqc" ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 联系人资料结束 -->
    <!-- 附件开始 -->
    <div class="card">
      <h3>{{$t('modify.fj')}}</h3>
      <el-form  :model="card" :rules="rules" ref="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
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
          <el-form-item :label="$t('modify.yx')" prop="attachment.yx"><!-- 原因 -->
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="card.attachment.yx"
              required>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 附件结束 -->
    <div class="btn">
      <el-button type="primary" @click="sureEdit('card')">{{$t('customer.qdxg')}}</el-button><!-- 确定修改 -->
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
       basic:{
         kh:'',
         cp:'',
         kpzt:'',
         zhzt:'',
         fkjg:'',
         fkrq:'',
         xyed:'',
         defqed:'',
         lsed:'',
         lsedsexrq:'',
         lsedsixrq:'',
         kpdqr:'',
         ghrgh:'',
         ghrxm:'',
         dqtzye:'',
        },
       applicant:{
         xm:'',
         py:'',
         zjlx:'',
         zjhm:'',
         zjyxq:'',
         xl:'',
         hyzk:'',
         sjhm:'',
         jtdh:'',
         dzyx:'',
         province:'',
         city:'',
         country:'',
         detailsAdd:''
       },
       occupation:{
         dwqc:'',
         rzbm:'',
         hylb:'',
         gw:'',
         gznx:'',
         dwdh:'',
         fjhm:'',
         nsr:''
       },
       contact:{
         gx:'',
         xm:'',
         sjhm:'',
         lxdh:'',
         dwqc:''
       },
       attachment:{
         yx:''
       },
     },
     fileList:[],
    switchTypeList: [],
    useStatusList: [],
    dialogFormVisible:false,
    rules:{
        rqrq:[
        { required: true, message: i18n.t('account.Please_choose_the_date_of_suncut'), trigger: 'blur' },
        ],
        "attachment.yx":[
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
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == '发起卡片资料修改'
      })
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
    
    // sureEdit(cardForm){
    //   this.$refs[cardForm].validate((valid) => {
    //     console.log(valid)
    //     if(valid){

    //     }
    //   })
    // },
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
  padding-bottom:10px;
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

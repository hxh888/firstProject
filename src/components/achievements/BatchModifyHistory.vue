<template>
  <!-- 责任人修改 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true" label-width="110px"  class="demo-form-inline" size="small">
            <el-row>
                <el-col :span="6">
                    <el-form-item :label="$t('remind.idNumber')">   <!-- 证件号码 -->
                        <el-input type="text"  v-model="obj.zjhm" ></el-input >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="$t('remind.cardNumber')">   <!-- 卡号 -->
                        <el-input type="text"  v-model="obj.kh" ></el-input >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="$t('liable.yjgh')" >   <!-- 原机构号 -->
                        <el-input type="text"  v-model="obj.yjgh" ></el-input >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="$t('liable.xjgh')" >   <!-- 现机构号 -->
                        <el-input type="text"  v-model="obj.xjgh" ></el-input >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="$t('liable.ysprgh')" >   <!-- 原审批人工号 -->
                        <el-input type="text"  v-model="obj.ysprgh" ></el-input >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="$t('liable.ysprjb')" >   <!-- 原审批人级别 -->
                        <el-input type="text"  v-model="obj.ysprjb" ></el-input >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="$t('liable.xsprgh')" >   <!-- 现审批人工号 -->
                        <el-input type="text"  v-model="obj.xsprgh" ></el-input >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="$t('liable.xsprjb')" >   <!-- 原审批人级别 -->
                        <el-input type="text"  v-model="obj.xsprjb" ></el-input >
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

		<!-- 列表模块 -->
    <div class="list_module">
	    <div class="table_body">
            <h4>{{$t('liable.ghrlb')}}</h4><!--管户人列表-->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top:15px;"
                    border
                    >
                    <!-- <el-table-column type="selection" width="55" align="center" > </el-table-column> -->
                    <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                    <el-table-column  prop="jgh" :label="$t('quota.khxm')" width="100" align="center" > </el-table-column><!-- 客户姓名 -->
                    <el-table-column  prop="zjhm" :label="$t('remind.idNumber')" width="150" align="center" > </el-table-column><!-- 证件号码 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.yjgh')" width="150" align="center" > </el-table-column><!-- 原机构号 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.xjgh')" width="150" align="center" > </el-table-column><!-- 现机构号 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.kh')" width="150" align="center" > </el-table-column><!-- 卡号 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.ysprgh')" width="150" align="center" > </el-table-column><!-- 原审批人工号 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.xsprgh')" width="150" align="center" > </el-table-column><!-- 现审批人工号 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.ysprxm')" width="150" align="center" > </el-table-column><!-- 原审批人姓名 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.xsprxm')" width="150" align="center" > </el-table-column><!-- 现审批人姓名 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.ysprjb')" width="150" align="center" > </el-table-column><!-- 原审批人级别 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.xsprjb')" width="150" align="center" > </el-table-column><!-- 现审批人级别 -->
                    <el-table-column  prop="zjhm" :label="$t('liable.zrb')" width="150" align="center" > </el-table-column><!-- 责任比 -->
                    <!--操作-->
                    <!-- <el-table-column :label="$t('Operation')" align="center" min-width="150px" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
                                <i class="el-icon-delete"></i>
                                <span class="text">{{$t('Delete')}}</span>
                            </el-button>
                        </template>
                    </el-table-column> -->
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
		<!--列表模块开始-->
  </div>
</template>

<script>
export default {
    name: 'Billing',
    data () {
        return {
            tableData:[
                {khxm:'随便',documentNum:'000392',cardNum:'123793764984739',jgh:'289483740'}
            ],  //user 列表数据
            obj: {
                pageSize:10,//一页显示几条数据
                pageIndex:1,  //需要传过去的参数
                legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
                zjhm:'',
                kh:'',
                yjgh:'',
                xjgh:'',
                ysprgh:'',
                ysprjb:'',
                xsprgh:'',
                xsprjb:''
            },
            currentPage:1,//当前显示第几页 1开头
            totalCount:0,//一共有多少条数据
           
        }
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
        //   return item.name == '证件到期提醒'
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
        // 点击确定切换分页
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
        
        // 初始化列表
        display:function(){
        this.$post(this.$api + '/switchDay/queryByPage',this.obj).then(res =>{
            if(res.returnCode == '000000'){
            this.tableData =  res.returnData.rows;
            this.totalCount = res.returnData.total;
            } else {
            var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.returnCode}</span></p>
                <p >${ i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
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

        
        //取消弹框重置数据
        cancels(formName){
        this.seeDialog = false;
        if (this.$refs[formName]!==undefined) {
            this.$refs[formName].resetFields();
        }
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
.tab{padding:10px 0;}
.card{
  border:1px solid #eee;
  h3{
    line-height:30px; 
    box-sizing: border-box;
    padding:0 10px;
    background:#eee;
  }
}
.cardInformation{
    .el-row{
        padding:10px 0;
        span{
            display:inline-block;
            width:100px;
            line-height:40px; 
            text-align: right;

        }
    }
}
.bord{
  border:1px solid #eee;
  border-radius:10px;
  padding:10px 20px 20px;
  margin-top:10px;
  margin-bottom:15px;
}
.pad10{
    box-sizing:border-box;
    padding:10px;
}
</style>

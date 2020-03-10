<template>
    <div class="content_box" id="contract_content">
        <!-- 加入预警客户 -->
        <!-- 编辑模块(搜索查询) -->
        <div class="edit_module">
            <el-form :inline="true"  class="demo-form-inline" size="small" label-width="110px"> 
                <el-row>
                    <el-col :span="6">
                        <el-form-item :label="$t('quota.khxm')" >   <!-- 客户姓名 -->
                            <el-input type="text"  v-model="obj.khxm" ></el-input >
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('quota.zjhm')">   <!-- 证件号码 -->
                            <el-input type="text"  v-model="obj.zjhm" ></el-input >
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('early.fxdj')"> <!-- 风险等级 -->
                            <el-select v-model="obj.fxdj" style="width:183px;" placeholder="">
                                <el-option :label="$t('collection.whole')" value="" ></el-option>
                                <el-option label="一级" value="1" ></el-option>
                                <el-option label="二级" value="2" ></el-option>
                                <el-option label="三级" value="3" ></el-option>
                                <!-- <el-option v-for="item in postTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option> -->
                            </el-select>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('early.fxbq')"> <!-- 风险标签 -->
                            <el-select v-model="obj.fxbq" style="width:183px;" placeholder="">
                                <el-option :label="$t('collection.whole')" value="" ></el-option>
                                <el-option label="一级" value="1" ></el-option>
                                <el-option label="二级" value="2" ></el-option>
                                <el-option label="三级" value="3" ></el-option>
                                <!-- <el-option v-for="item in postTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option> -->
                            </el-select>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('quota.jgh')" >   <!-- 机构号 -->
                            <el-input type="text"  v-model="obj.jgh" ></el-input >
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('early.khjlgh')" >   <!-- 客户经理工号 -->
                            <el-input type="text"  v-model="obj.khjlgh" ></el-input >
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('early.tgqd')" >   <!-- 推广渠道 -->
                            <el-input type="text"  v-model="obj.tgqd" ></el-input >
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
        <!-- 编辑模块(搜索查询) 结束 -->

        <!-- 线上导入客户列表模块开始 -->
        <div class="list_module">
            <div class="table_body">
                <h4>{{$t('early.jryjkhlb')}}</h4><!--加入预警客户列表-->
                <el-row>
                    <el-col :span="24" style="text-align:right;">
                        <el-button size="small">{{$t('early.plsc')}}</el-button><!-- 批量删除 -->
                        <el-button type="primary"  size="small">{{$t('early.qbjrjc')}}</el-button><!-- 全部加入检测 -->
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
                    <el-table-column  prop="khxm" :label="$t('quota.khxm')"  align="center" > </el-table-column><!-- 客户姓名 -->
                    <el-table-column  prop="zjlx" :label="$t('remind.documentType')"  align="center" > </el-table-column><!-- 证件类型 -->
                    <el-table-column  prop="zjhm" :label="$t('quota.zjhm')"  align="center" > </el-table-column><!-- 证件号码 -->
                    <el-table-column  prop="khfxdj" :label="$t('early.khfxdj')"  align="center" > </el-table-column><!-- 客户风险等级 -->
                </el-table>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="obj.pageIndex"
                    :page-size="obj.pageSize"
                    layout="prev, pager, next, slot"
                    :total="totalCount">
                    <template slot>
                        <div class="slot_pag">
                            <el-select v-model="obj.pageSize" size="mini" @change="handleSizeChange" style="width:auto!important;">  <!-- 10条/页 -->
                                <el-option :value="5" :label="'5'+$t('size')"></el-option>
                                <el-option :value="10" :label="'10'+$t('size')"></el-option>
                                <el-option :value="15" :label="'15'+$t('size')"></el-option>
                            </el-select>
                            <span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
                            <span>{{$t('Jump_to')}} </span> <!-- 跳转至 -->
                            <el-input size="mini" v-model="obj.goPage" type="number">
                                </el-input><span>{{$t('Pag')}}</span><!-- 页 -->
                            <el-button  type="warning" @click="goPageSure">{{$t('OK')}}</el-button><!-- 确定 -->
                        </div>
                    </template>
                </el-pagination>
            </div>
        </div>
        <!-- 线上导入客户列表模块结束 -->
    </div>
</template>

<script>
    export default {
        name:'',
        data(){
            return {
                obj: {
                    legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
                    khxm:'',
                    zjhm:'',
                    fxdj:'',
                    fxbq:'',
                    jgh:'',
                    khjlgh:'',
                    tgqd:'',
                    pageSize: 10, //一页显示几条数据
                    pageIndex: 1, //需要传过去的参数
                    goPage: null,
                },
                currentPage: 1, //当前显示第几页 1开头
                totalCount: 0, //一共有多少条数据
                tableData:[
                    {jgh:'000',khxm:'明天你好',zjlx:'不知道',zjhm:'20190320',khfxdj:'一级'}
                ],//线上导入客户列表
                multipleSelection:[],//选择的项
                fileList:[],//upload选取文件
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

            //查询列表
            QueryUser(){
                this.obj.pageIndex = 1;
                this.display()
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

            //列表全选时
            handleSelectionChange(val) {
                console.log(val)
                // this.multipleSelection = val;
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
            handlePreview(){},
            handleRemove(){},
            beforeRemove(){},
            handleExceed(){},
        }
    }
</script>

<style scoped>

</style>
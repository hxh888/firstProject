<template>
    <div class="content_box" id="contract_content">
        <!-- 处置统计 -->
        <!-- 编辑模块(搜索查询) -->
        <div class="edit_module">
            <el-form :inline="true"  class="demo-form-inline" size="small" label-width="105px"> 
                <el-row>
                    <el-col :span="10">
                        <el-form-item :label="$t('early.sjxz')" >   <!-- 时间选择 -->
                            <el-date-picker
                            v-model="obj.sjxz"
                            type="daterange"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('early.gh')" >   <!-- 工号 -->
                            <el-input type="text"  v-model="obj.jgh" ></el-input >
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
                <h4>{{$t('early.cztjlb')}}</h4><!--处置统计列表-->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top:15px;"
                    border
                    >
                    <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                    <el-table-column  prop="gh" :label="$t('early.gh')" width="100" align="center" > </el-table-column><!-- 工号 -->
                    <el-table-column  prop="xm" :label="$t('early.xm')"  align="center" > </el-table-column><!-- 姓名 -->
                    <el-table-column  prop="yxfajl" :label="$t('early.yxfajl')"  align="center" > </el-table-column><!-- 已下发案件量 -->
                    <el-table-column  prop="ywcl" :label="$t('early.ywcl')"  align="center" > </el-table-column><!-- 已完成量 -->
                    <el-table-column  prop="wwcl" :label="$t('early.wwcl')"  align="center" > </el-table-column><!-- 未完成量 -->
                    <el-table-column  prop="dqjd" :label="$t('early.dqjd')"  align="center" > </el-table-column><!-- 当前进度 -->
                    <el-table-column  prop="pjclsx" :label="$t('early.pjclsx')"  align="center" > </el-table-column><!-- 平均处理时效 -->
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
                    sjxz:"",
                    gh:"",
                    pageSize: 10, //一页显示几条数据
                    pageIndex: 1, //需要传过去的参数
                    goPage: null,
                },
                currentPage: 1, //当前显示第几页 1开头
                totalCount: 0, //一共有多少条数据
                tableData:[
                    {gh:"3289",xm:"领零",yxfajl:"20",ywcl:'1008',wwcl:"873",dqjd:'89',pjclsx:"30"}
                ],//处置统计列表
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
                //   return item.name == '处置统计'
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

        }
    }
</script>

<style scoped>

</style>
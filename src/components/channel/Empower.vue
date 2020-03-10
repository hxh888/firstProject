<template>
    <div class="content_box" id="contract_content">
        <!-- 预警客户排查 -->
        <!-- 编辑模块(搜索查询) -->
        <div class="edit_module">
            <el-form :inline="true"  class="demo-form-inline" size="small" label-width="80px"> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('channel.qdbh')"><!--渠道编号-->
                            <el-input v-model="obj.qdbh" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="edit_module_btn">
                        <el-form-item>
                            <el-button type="warning" icon="el-icon-search" @click="initEmpower()" >{{$t('Query')}}</el-button>  <!--查询按钮-->
                            <el-button type="primary" icon="el-icon-plus"  @click="EmpowerAdd()" >{{$t('Add')}}</el-button><!--新增按钮v-if="funLists.indexOf('新增') > -1"-->
                        </el-form-item>
                    </el-col>
                </el-row>  
            </el-form>
        </div>
        <!-- 编辑模块(搜索查询) 结束 -->

        <!-- 线上导入客户列表模块开始 -->
        <div class="list_module">
            <div class="table_body">
                <h4>{{$t('channel.sqlb')}}</h4><!--授权列表-->
                <el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')"> <!--empty-text="您所查询的权限不存在"-->
                <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
                <el-table-column prop="bh" :label="$t('channel.bh')"  align="center"> </el-table-column><!--编号-->
                <el-table-column prop="qdbh" :label="$t('channel.qdbh')"  align="center" min-width="190px"> </el-table-column><!--渠道编号-->
                <el-table-column prop="qdmc" :label="$t('channel.qdmc')"  align="center" min-width="130px"></el-table-column><!--渠道名称-->
                <el-table-column prop="lp" :label="$t('channel.lp')"  align="center" min-width="160px"></el-table-column>
                <el-table-column prop="fwzt" :label="$t('channel.fwzt')" align="center"  width="130px"><!--状态-->
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" class="search-btn"  @click="invalidItem(scope.row,scope.$index)" v-if="scope.row.fwzt">
                            <!-- <i class="el-icon-view"></i> -->
                            <span class="">{{$t('channel.yx')}}</span>	<!-- 有效 -->
                        </el-button> 
                        <el-button size="mini" class="edit-btn" @click="validItem(scope.row)" v-if="!scope.row.fwzt">
                            <!-- <i class="el-icon-edit"></i> -->
                            <span class="">{{$t('channel.wx')}}</span> <!-- 无效 -->
                        </el-button>
                    </template>
                </el-table-column>
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

        <!-- 新增编辑渠道弹框开始 -->
        <el-dialog :title="title" :visible.sync="addModal" :before-close="cancel" :close-on-click-modal="false">
            <el-form :model="addForm" ref="addForm" :rules="rules" label-width="150px">
                <el-row :gutter="20">
					<el-col :span="12">
						<el-form-item :label="$t('channel.qdbh')" prop="qdbh" ><!-- 渠道编号 -->
							<el-input v-model="addForm.qdbh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="$t('channel.tgffwbh')" prop="tgffwbh" ><!-- 提供方服务编号 -->
							<el-input v-model="addForm.tgffwbh" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addForm')" v-if="addForm.flag==1">{{$t('Reset')}}</el-button><!--重置-->
				<el-button v-if="addForm.flag==1" type="primary" @click="submitAdd('addForm')">{{$t('Save')}}</el-button><!--保存-->
			</div>
        </el-dialog>
        <!-- 新增编辑渠道弹框结束 -->


    </div>
</template>

<script>
    export default {
        name:'',
        data(){
            return {
                obj: {
                    legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
                    qdbh:"",
                    pageSize: 10, //一页显示几条数据
                    pageIndex: 1, //需要传过去的参数
                    goPage: null,
                },
                currentPage: 1, //当前显示第几页 1开头
                totalCount: 0, //一共有多少条数据
                tableData:[
                    {jgh:'000',khxm:'明天你好',zjlx:'不知道',zjhm:'20190320',khfxdj:'一级',jcsj:"2019/03/29 10:12:48",jczt:"已检测",pch:"201903298730"}
                ],//线上导入客户列表
                tableData:[
                    {bh:"0001",qdbh:"KJK7839",qdmc:"渠道",lp:"skjdf80ds8f98fdg09d809g",fwzt:true},
                    {bh:"0002",qdbh:"KJK7839",qdmc:"渠道",lp:"skjdf80ds8f98fdg09d809g",fwzt:false},
                    {bh:"0003",qdbh:"KJK7839",qdmc:"渠道",lp:"skjdf80ds8f98fdg09d809g",fwzt:false},
                    {bh:"0004",qdbh:"KJK7839",qdmc:"渠道",lp:"skjdf80ds8f98fdg09d809g",fwzt:true},
                ],
                addModal:false,
                title:"新增渠道",
                addForm:{
                    qdbh:"",
                    tgffwbh:"",
                },
                rules:{
                    qdbh: [
					    { required: true, message: i18n.t("channel.qdbmbnwk"), trigger: 'blur' },//渠道编码不能为空
                    ],
                    tgffwbh:[
                        { required: true, message: i18n.t("channel.qdmcbnwk"), trigger: 'blur' },//渠道名称不能为空
                    ]
                }
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
            
            //查询按钮
            initEmpower(){
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

            //点击新增
            EmpowerAdd(){
                this.addModal=true
                this.addForm.flag = 1
            },

            //点击编辑
            editItem(){
                this.addModal=true
                this.addForm.flag = 2
            },

            //停用点击
            stopItem(row){

            },

            cancel(){//点击页面中的x
                this.addModal = false
                // if (this.$refs['addForm']!==undefined) {
                // 	this.$refs['addForm'].resetFields();
                // }
                console.log(this.addForm.flag)
            },
            //重置新增
            resetForm(formName) {
                this.$refs[formName].resetFields()
                if (this.$refs[formName]!==undefined) {
                	this.$refs[formName].resetFields();
                }
            },

            //新增保存
            submitAdd(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    }
                })
            },


            //点击之后状态改为失效
            invalidItem(row,index){
                console.log(index)
                // this.tableData[index].fwzt = false
            },

            //点击之后状态改为有效
            validItem(row){

            },
        }
    }
</script>

<style scoped>

</style>
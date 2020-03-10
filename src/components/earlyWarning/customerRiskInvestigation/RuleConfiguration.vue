<template>
    <div class="content_box" id="contract_content">
        <!-- 预警客户排查 -->
        <!-- 编辑模块(搜索查询) -->
        <div class="edit_module">
            <el-form :inline="true"  class="demo-form-inline" size="small" label-width="80px"> 
                <el-row>
                    <el-col :span="24">
                        <div class="edit_module_btn" style="margin-top: 10px;">
                            <el-button type="primary" icon="el-icon-plus"  @click="ruleAdd('1')">{{$t('Add')}}</el-button> <!--新增按钮-->
                        </div>
                    </el-col>
                </el-row>  
            </el-form>
        </div>
        <!-- 编辑模块(搜索查询) 结束 -->

        <!-- 线上导入客户列表模块开始 -->
        <div class="list_module">
            <div class="table_body">
                <h4>{{$t('early.gzpzlb')}}</h4><!--规则配置列表-->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top:15px;"
                    border
                    >
                    <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                    <el-table-column  prop="mxxm" :label="$t('early.mxxm')" min-width="100" align="center" > </el-table-column><!-- 模型姓名 -->
                    <el-table-column  prop="bsmc" :label="$t('early.bsmc')"  min-width="140" align="center" > </el-table-column><!-- 部署名称 -->
                    <el-table-column  prop="dybm" :label="$t('early.dybm')"  align="center" > </el-table-column><!-- 调用编码 -->
                    <el-table-column  prop="xmmc" :label="$t('early.xmmc')" min-width="120"  align="center" > </el-table-column><!-- 项目名称 -->
                    <el-table-column  prop="xmbm" :label="$t('early.xmbm')"  min-width="140" align="center" > </el-table-column><!-- 项目编码 -->
                    <el-table-column  prop="gxyh" :label="$t('early.gxyh')" min-width="120" align="center" > </el-table-column><!-- 更新用户 -->
                    <el-table-column  prop="gxsj" :label="$t('early.gxsj')" min-width="180" align="center" > </el-table-column><!-- 更新时间 -->
                    <!-- 操作 -->
                    <el-table-column :label="$t('Operation')" align="center" min-width="120px" >
						<template slot-scope="scope">
                            <el-button size="mini" class="edit-btn" @click="editItem(scope.row,'2')">
                                <i class="el-icon-edit"></i>
                                <span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
                            </el-button>
                            <!-- 不可点击 -->
                            <el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" >
                                <i class="el-icon-delete"></i>
                                <span class="text">{{$t('Delete')}}</span> <!-- 删除 -->
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

        <!-- 规则弹框开始 -->
        <el-dialog title="模型选择" :visible.sync="ruleModal">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('early.mxxm')"  prop="mxxm"><!-- 模型姓名 -->
                            <el-input v-model="form.mxxm" :disabled="editShow"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('early.bsmc')"  prop="bsmc"> <!-- 部署名称 -->
                            <el-select v-model="form.bsmc" style="width:100%;" placeholder="">
                                <el-option :label="$t('collection.whole')" value="" ></el-option>
                                <el-option label="名称一" value="1" ></el-option>
                                <el-option label="名称二" value="2" ></el-option>
                                <el-option label="名称三" value="3" ></el-option>
                                <!-- <el-option v-for="item in postTypeList" :key="item.paramValue" :label="item.paramSname" :value="item.paramValue" ></el-option> -->
                            </el-select>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('early.dybm')"  prop="dybm"><!-- 调用编码 -->
                            <el-input v-model="form.dybm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('early.xmmc')"  prop="xmmc"><!-- 项目名称 -->
                            <el-input v-model="form.xmmc" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('early.xmbm')" prop="xmbm"><!-- 项目编码 -->
                            <el-input v-model="form.xmbm" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ruleModal = false">取 消</el-button>
                <el-button type="primary" @click="ruleModal = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 规则弹框结束 -->


    </div>
</template>

<script>
    export default {
        name:'',
        data(){
            return {
                obj: {
                    legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
                    pageSize: 10, //一页显示几条数据
                    pageIndex: 1, //需要传过去的参数
                    goPage: null,
                },
                currentPage: 1, //当前显示第几页 1开头
                totalCount: 0, //一共有多少条数据
                tableData:[
                    {mxxm:'测试模型',bsmc:'测试部署',dybm:'000219',xmmc:'大项目',xmbm:'999666',gxsj:"2019/03/29 10:12:48",gxyh:"测试员"}
                ],//线上导入客户列表
                multipleSelection:[],//选择的项
                ruleModal:false,
                editShow:false,
                form:{
                    mxxm:"",
                    bsmc:"",
                    dybm:"",
                    xmmc:"",
                    xmbm:""
                },
                rules:{
                    mxxm: [
                        { required: true, message:"模型姓名不能为空" },//模型姓名不能为空
                        // { pattern:/^\d/g, message: i18n.t('menu.onlyNumMenuNum') },//菜单编号只能输入数字，请重新输入
                    ],
                    bsmc: [
                        { required: true, message:"部署名称不能为空" },//部署名称不能为空
                    ],
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
            ruleAdd(){
                this.ruleModal=true;
                this.editShow = false;
            },

            //点击列表编辑
            editItem(row){
                this.ruleModal=true;
                this.editShow = true;
            },

            //点击列表删除
            deleteItem(row){

            },

        }
    }
</script>

<style scoped>

</style>
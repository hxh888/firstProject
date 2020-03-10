<template>
<!-- 总行贷中岗处置 -->
    <div class="content_box" id="contract_content">
        <!-- 编辑模块(搜索查询) -->
        <div class="edit_module">
            <el-form :inline="true"  class="demo-form-inline" size="small" label-width="80px"> 
                <el-row>
                    <el-col :span="6">
                        <el-form-item :label="$t('quota.jgh')" >   <!-- 机构号 -->
                            <el-input type="text"  v-model="obj.jgh" ></el-input >
                        </el-form-item>
                    </el-col>
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
                    <el-col :span="24">
                        <div class="edit_module_btn" style="margin-top: 10px;">
                            <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                        </div>
                    </el-col>
                </el-row>  
            </el-form>
        </div>
        <!-- 编辑模块(搜索查询) 结束 -->

        <!-- 处置列表模块开始 -->
        <div class="list_module">
            <div class="table_body">
                <h4>{{$t('early.czlb')}}</h4><!--处置列表-->
                <el-row>
                    <el-col :span="12">
                        <el-radio-group v-model="tabList" size="small">
                            <el-radio-button :label="0">{{$t('early.wxf')}}</el-radio-button><!-- 未下发 -->
                            <el-radio-button :label="1">{{$t('early.wcl')}}</el-radio-button><!-- 未处理 -->
                            <el-radio-button :label="2">{{$t('early.yxf')}}</el-radio-button><!-- 已下发 -->
                            <el-radio-button :label="3">{{$t('early.ycl')}}</el-radio-button><!-- 已处理 -->
                        </el-radio-group>
                    </el-col>
                    <el-col :span="12" style="text-align:right;">
                        <el-button size="small"  v-if="tabList=='0'">{{$t('early.plsc')}}</el-button><!-- 批量删除 -->
                        <el-button size="small" v-if="tabList=='1'"  @click="approvalItem()">{{$t('early.tjsp')}}</el-button><!-- 提交审批 -->
                        <el-button size="small" type="primary" v-if="tabList=='1' || tabList == '0'" @click="seeIssue()">{{$t('early.rwxf')}}</el-button><!-- 任务下发 -->
                        <el-button size="small" type="primary"  v-if="tabList=='0'" @click="seeIssue()">{{$t('early.qbxf')}}</el-button><!-- 全部下发 -->
                    </el-col>
                </el-row>
                <div class="table">
                    <div class="no" v-if="tabList == '0' || tabList == '1'"  >
                        <el-table
                            ref="multipleTable"
                            :data="notDistributed"
                            tooltip-effect="dark"
                            style="width: 100%;margin-top:15px;"
                            border
                            @selection-change="handleSelectionChange"
                            
                            >
                            <el-table-column  type="selection" width="55" align="center" > </el-table-column>
                            <el-table-column  prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                            <el-table-column  prop="jgh" :label="$t('remind.organizationNumber')" width="100" align="center" > </el-table-column><!-- 机构号 -->
                            <el-table-column  prop="khxm" :label="$t('quota.khxm')"  align="center" > </el-table-column><!-- 客户姓名 -->
                            <el-table-column  prop="zjlx" :label="$t('remind.documentType')"  align="center" > </el-table-column><!-- 证件类型 -->
                            <el-table-column  prop="zjhm" :label="$t('quota.zjhm')"  align="center" > </el-table-column><!-- 证件号码 -->
                            <el-table-column  prop="khfxdj" :label="$t('early.khfxdj')"  align="center" > </el-table-column><!-- 客户风险等级 -->
                            <el-table-column  prop="cljg" :label="$t('early.cljg')"  align="center" > </el-table-column><!-- 处理结果 -->
                            <el-table-column  prop="clsj" :label="$t('early.scsj')"  align="center" > </el-table-column><!-- 生成时间 -->
                            <!-- 操作 -->
                            <el-table-column :label="$t('Operation')" align="center" min-width="120px" v-if="tabList == '0' || tabList == '1'">
                                <template slot-scope="scope">
                                    <el-button size="mini" class="edit-btn" v-if="tabList == '0'" @click="doItem(scope.row)">
                                        <i class="el-icon-edit"></i>
                                        <span class="text">{{$t('early.cl')}}</span> <!-- 处理 -->
                                    </el-button>
                                    <el-button size="mini" class="edit-btn" v-if="tabList == '1'" @click="seeItem(scope.row)">
                                        <i class="el-icon-view"></i>
                                        <span class="text">{{$t('See')}}</span> <!-- 查看 -->
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="tabList == '2' || tabList == '3'">
                        <el-table
                            ref="multipleTable"
                            :data="notDistributed"
                            tooltip-effect="dark"
                            style="width: 100%;margin-top:15px;"
                            border
                            
                            >
                            <el-table-column  prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                            <el-table-column  prop="jgh" :label="$t('remind.organizationNumber')" width="100" align="center" > </el-table-column><!-- 机构号 -->
                            <el-table-column  prop="khxm" :label="$t('quota.khxm')"  align="center" > </el-table-column><!-- 客户姓名 -->
                            <el-table-column  prop="zjlx" :label="$t('remind.documentType')"  align="center" > </el-table-column><!-- 证件类型 -->
                            <el-table-column  prop="zjhm" :label="$t('quota.zjhm')"  align="center" > </el-table-column><!-- 证件号码 -->
                            <el-table-column  prop="khfxdj" :label="$t('early.khfxdj')"  align="center" > </el-table-column><!-- 客户风险等级 -->
                            <el-table-column  prop="cljg" :label="$t('early.cljg')"  align="center" v-if="tabList == '3'"> </el-table-column><!-- 处理结果 -->
                            <el-table-column  prop="clsj" :label="$t('early.scsj')"  align="center" v-if="tabList == '0' || tabList =='1'"> </el-table-column><!-- 生成时间 -->
                            <el-table-column  prop="clsj" :label="$t('early.clsj')"  align="center" v-if="tabList == '2' || tabList =='3'"> </el-table-column><!-- 处理时间 -->
                            <!-- 操作 -->
                            <!-- <el-table-column :label="$t('Operation')" align="center" min-width="120px" v-if="tabList == '0' || tabList == '1'">
                                <template slot-scope="scope">
                                    <el-button size="mini" class="edit-btn" @click="doItem(scope.row,'2')">
                                        <i class="el-icon-edit"></i>
                                        <span class="text">{{$t('early.cl')}}</span>
                                    </el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </div>
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
        </div>
        <!-- 处置列表模块结束 -->

        <!-- 下发弹框开始 -->
        <el-dialog title="下发" :visible.sync="issue">
            <el-form :model="search"  label-width="80px" style="border:1px solid #eee; padding:10px;">
                <el-row>
                    <el-col :span="8">
                        <el-form-item :label="$t('early.xm')" ><!-- 姓名 -->
                            <el-input v-model="search.xm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('early.gh')" ><!-- 工号 -->
                            <el-input v-model="search.gh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('early.jgh')" ><!-- 机构号 -->
                            <el-input v-model="search.jgh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" style="text-align:right;">
                        <el-button type="primary" >{{$t("Query")}}</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div class="card" style="margin-top:10px;">
                <h3>{{$t('remind.ckrzyzl')}}</h3><!-- 持卡人职业资料 -->
                <div class="cardMain table_body">
                    <div class="btn" style="text-align:right; padding:10px 0 10px;">
                        <el-button >{{$t('ratio.fh')}}</el-button><!-- 返回 -->
                        <el-button type="primary">{{$t('OK')}}</el-button><!-- 确 定 -->
                    </div>
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
                        <el-table-column  prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!-- 序号 -->
                        <el-table-column  prop="jgh" :label="$t('early.jgh')" align="center" > </el-table-column><!-- 机构号 -->
                        <el-table-column  prop="jgmc" :label="$t('quota.jgmc')" align="center" > </el-table-column><!-- 机构名称 -->
                        <el-table-column  prop="xm" :label="$t('early.xm')" align="center" > </el-table-column><!-- 姓名 -->
                        <el-table-column  prop="gh" :label="$t('early.gh')"  align="center" > </el-table-column><!-- 工号 -->
                        <el-table-column  prop="gw" :label="$t('remind.gw')"  align="center" > </el-table-column><!-- 岗位 -->
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
            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="ruleModal = false">取 消</el-button>
                <el-button type="primary" @click="ruleModal = false">确 定</el-button>
            </div> -->
        </el-dialog>
        <!-- 下发弹框结束 -->

        <!-- 处理弹框开始 -->
        <el-dialog title="处理" :visible.sync="handle">
            <el-row>
                <el-col :span="6">{{$t('early.khfxdj')}}：<span style="color:red">{{khfxdj}}</span></el-col><!-- 客户风险等级 -->
                <el-col :span="6">{{$t('early.khtxdj')}}<span style="color:red">{{khtxdj}}</span></el-col><!-- 客户套现等级 -->
            </el-row>
            <div class="card" >
                <h3>{{$t('early.mzfxd')}}</h3><!-- 命中风险点 -->
                <div class="cardMain table_body">
                    <el-table
                        ref="multipleTable"
                        :data="mzfxdData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border
                        >
                        <el-table-column  prop="heimd" :label="$t('early.heimd')" width="100" align="center" > </el-table-column><!-- 黑名单 -->
                        <el-table-column  prop="huimd" :label="$t('early.huimd')"  align="center" > </el-table-column><!-- 灰名单 -->
                        <el-table-column  prop="rxzx" :label="$t('early.rxzx')"  align="center" > </el-table-column><!-- 人行征信 -->
                        <el-table-column  prop="sqxt" :label="$t('early.sqxt')"  align="center" > </el-table-column><!-- 授权系统 -->
                        <el-table-column  prop="fkxt" :label="$t('early.fkxt')"  align="center" > </el-table-column><!-- 发卡系统 -->
                        <el-table-column  prop="txxw" :label="$t('early.txxw')"  align="center" > </el-table-column><!-- 套现行为 -->
                    </el-table>
                </div>
            </div>
            <div class="card" style="margin-top:20px;" >
                <h3>{{$t('early.cl')}}</h3><!-- 处理 -->
                <el-form :model="clData" :rules="rules" ref="clData" label-width="100px" style="padding:10px;">
                    <el-form-item :label="$t('early.cljg')" prop="cljg" class="cljg"><!-- 处理结果 -->
                        <el-checkbox-group v-model="clData.cljg" :disabled="!edit">
                        <el-checkbox label="1" >{{$t('early.zf')}}</el-checkbox><!-- 止付 -->
                        <el-checkbox label="2">{{$t('early.gbkpxfgn')}}</el-checkbox><!--关闭卡片消费功能  -->
                        <el-checkbox label="3">{{$t('early.gbkpqxgn')}}</el-checkbox><!-- 关闭卡片取现功能 -->
                        <el-checkbox label="4">{{$t('early.gbkpzzgn')}}</el-checkbox><!-- 关闭卡片转账功能 -->
                        <el-checkbox label="5">{{$t('early.wxcz')}}</el-checkbox><!-- 无需处置 -->
                        <el-checkbox label="6" disabled>{{$t('early.jded')}}</el-checkbox><!-- 降低额度 -->
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item :label="$t('liable.yj')" prop="yj"><!-- 意见 -->
                        <el-input type="textarea" v-model="clData.yj" style="width:300px;" :disabled="!edit"></el-input>
                        <span v-if="edit">0/80个字符</span>
                    </el-form-item>
                </el-form>
                <div class="upfj" v-if="edit">
                    <span>{{$t('early.scfj')}}</span><!-- 上传附件 -->
                    <div class="bord table_body">
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
                        <el-table :data="upData" border style="width: 100%;margin-top:10px;"   size='small' :empty-text="$t('noData')" >
                            <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px;"></el-table-column><!--序号-->
                            <el-table-column prop="khxm" :label="$t('liable.wj')" align="center" ></el-table-column><!-- 文件 -->
                            <el-table-column prop="documentNum" :label="$t('liable.scr')" align="center" ></el-table-column><!-- 上传人 -->
                            <el-table-column prop="jgh" :label="$t('liable.scsj')" align="center" ></el-table-column><!-- 上传时间 -->
                            <el-table-column :label="$t('Operation')" align="center" min-width="100px" >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
                                        <i class="el-icon-delete"></i>
                                        <span class="text">{{$t('Delete')}}</span><!-- 删除 -->
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button @click="cancel()">{{$t('ratio.fh')}}</el-button><!-- 返回 -->
                <el-button type="primary" @click="sure('clData')"  v-if="edit">{{$t('ratio.tj')}}</el-button><!-- 提交 -->
            </div>
        </el-dialog>
        <!-- 处理弹框结束 -->

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
                    pageSize: 10, //一页显示几条数据
                    pageIndex: 1, //需要传过去的参数
                    goPage: null,
                },
                currentPage: 1, //当前显示第几页 1开头
                totalCount: 0, //一共有多少条数据
                tabList:'0',//处置列表的四项选择
                notDistributed:[{}],//未下发列表
                issue:false,//下发弹框是否显示
                handle:false,//处理弹框是否显示
                edit:'',//是否可编辑
                search:{
                    xm:"",
                    gh:"",
                    jgh:""
                },
                radio:"",
                tableData:[
                    {jgh:'000',khxm:'明天你好',zjlx:'不知道',zjhm:'20190320',khfxdj:'一级'}
                ],//线上导入客户列表
                multipleSelection:[],//选择的项
                khfxdj:"无",//客户风险等级
                khtxdj:"无",//客户套现等级
                mzfxdData:[//命中风险点表
                    {heimd:"通过",huimd:"通过",rxzx:"通过",sqxt:"通过",fkxt:"通过",txxw:"通过"}
                ],
                clData:{
                    cljg:[],
                    yj:'',
                },
                upData:[],//上传附件中的列表
                fileList:[],//上传附件的内容
                rules:{
                    cljg: [
                        { required: true, message:"处理结果不能为空" },//处理结果不能为空
                    ],
                    yj: [
                        { required: true, message:"处理结果不能为空" },//意见不能为空
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
                //   return item.name == '总行贷中岗处置'
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

            //未下发列表的处理
            doItem(row){
                this.handle = true
                this.edit = true
            },

            //处理弹框返回
            cancel(){
                this.handle = false
                this.edit = false
            },

            //处理弹框的提交按钮
            sure(clData){

            },

            //未处理 查看按钮
            seeItem(row){
                this.handle = true
                this.edit = false
            },

            //未处理 提交审批
            approvalItem(){
                this.handle = true
                this.edit = true
            },


            //点击任务下发或者是全部下发
            seeIssue(){
                this.issue = true
            },

            //单选事件
            getCurrentRow(index,row){
                console.log(index)
                console.log(row)
            },

            

            //上传附件
            handlePreview(){},
            handleRemove(){},
            beforeRemove(){},
            handleExceed(){},
        }
    }
</script>

<style lang='scss' scoped>
.card{
    border:1px solid #eee;
    background:#fff;
    padding-bottom:5px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius: 10px;
    h3{
        line-height:40px; 
        box-sizing: border-box;
        padding:0 10px;
        background:#eee;
        background:$light-color;
    }
    .cardMain{
        padding:10px;
    }
    .el-form{
            .el-form-item__content{
                .el-checkbox-group{
                    line-height:14px;
                }
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
.upfj{
    // span{
    //     display: block; 
    //     width:100px; 
    //     text-align: right;
    //     box-sizing: border-box;
    // }
    box-sizing: border-box;
    padding:10px 20px;
}
.pad10{
    box-sizing:border-box;
    padding:10px;

}
</style>

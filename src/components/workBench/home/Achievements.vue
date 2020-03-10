<template>
    <div class="early">
        <div class="list_module">
            <div class="table_body">
                <h4>{{$t('channel.jxdbrw')}}</h4><!--绩效待办任务-->
                <el-radio-group v-model="obj.radio" size="small">
                    <el-radio-button label="0">{{$t('channel.dbrw')}}</el-radio-button><!--待办任务-->
                    <el-radio-button label="1">{{$t('channel.ybrw')}}</el-radio-button><!--已办任务-->
                </el-radio-group>
                <el-table
                    :data="earlyData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border>
                    <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.rwms')" align="center" min-width="100px"></el-table-column><!--任务描述-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.rwzt')" align="center" min-width="100px"></el-table-column><!--任务状态-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.clrgh')" align="center" min-width="100px"></el-table-column><!--处理人工号-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.clrxm')" align="center" min-width="100px"></el-table-column><!--处理人姓名-->
                    <el-table-column  prop="txxw" :label="$t('doTime')"  align="center" > </el-table-column><!-- 处理时间 -->
                    <el-table-column :label="$t('Operation')" align="center" min-width="190px"><!--操作-->
                        <template slot-scope="scope">
                                <el-button size="mini" type="danger" class="edit-btn" @click="doItem(scope.row)" v-if="obj.radio=='0'"><!-- v-if="funList.indexOf('查看') > -1" -->
                                    <!-- <i class="el-icon-view"></i> -->
                                    <span class="">{{$t('early.cl')}}</span><!--处理-->
                                </el-button>
                                <el-button size="mini"  class="edit-btn" @click="seeItem(scope.row)" v-if="obj.radio=='1'"><!-- v-if="funList.indexOf('查看') > -1" -->
                                    <!-- <i class="el-icon-view"></i> -->
                                    <span class="">{{$t('See')}}</span><!--查看	-->
                                </el-button>
                                <el-button size="mini" type="default" class="edit-btn" @click="openItem(scope.row)"  v-if="obj.radio=='1'"><!-- v-if="funList.indexOf('查看') > -1" -->
                                    <!-- <i class="el-icon-view"></i> -->
                                    <span class="">{{$t('channel.dqclrhjg')}}</span><!--当前处理人和结果	-->
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
        <!--处理面开始-->
        <el-dialog :title="dialogTitle" :visible.sync="doDialog">
            <div class="card" >
                <h3>客户列表</h3><!-- 客户列表 -->
                <div class="cardMain table_body">
                    <el-table
                        ref="multipleTable"
                        :data="mzfxdData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border
                        >
                        <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center"></el-table-column>
                        <el-table-column  prop="heimd" :label="$t('quota.khxm')" width="100" align="center" > </el-table-column><!-- 客户姓名 -->
                        <el-table-column  prop="heimd" :label="$t('ratio.zjhm')" width="100" align="center" > </el-table-column><!-- 证件号码 -->
                        <el-table-column  prop="heimd" :label="$t('liable.yjgh')" width="100" align="center" > </el-table-column><!-- 原机构号 -->
                        <el-table-column  prop="heimd" :label="$t('liable.xjgh')" width="100" align="center" > </el-table-column><!-- 现机构号 -->
                        <el-table-column  prop="heimd" :label="$t('liable.kh')" width="100" align="center" > </el-table-column><!-- 卡号 -->
                        <el-table-column  prop="heimd" :label="$t('channel.ysprgh')" width="100" align="center" > </el-table-column><!-- 原审批人工号 -->
                        <el-table-column  prop="heimd" :label="$t('channel.ysprgh')" width="100" align="center" > </el-table-column><!-- 现审批人工号 -->
                        <!-- <el-table-column  prop="heimd" :label="$t('early.heimd')" width="100" align="center" > </el-table-column>
                        <el-table-column  prop="heimd" :label="$t('early.heimd')" width="100" align="center" > </el-table-column> -->
                    </el-table>
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="page.pageIndex"
                        :page-size="page.pageSize"
                        layout="prev, pager, next, slot"
                        :total="page.totalCount">
                        <template slot>
                            <div class="slot_pag">
                                <el-select v-model="page.pageSize" size="mini" @change="handleSizeChange1" style="width:auto!important;">  <!-- 10条/页 -->
                                    <el-option :value="5" :label="'5'+$t('size')"></el-option>
                                    <el-option :value="10" :label="'10'+$t('size')"></el-option>
                                    <el-option :value="15" :label="'15'+$t('size')"></el-option>
                                </el-select>
                                <span>{{$t('total1')}} {{totalCount}} {{$t('article')}}</span> <!-- 共  条 -->
                                <span>{{$t('Jump_to')}} </span> <!-- 跳转至 -->
                                <el-input size="mini" v-model="page.goPage" type="number">
                                    </el-input><span>{{$t('Pag')}}</span><!-- 页 -->
                                <el-button  type="warning" @click="goPageSure1">{{$t('OK')}}</el-button><!-- 确定 -->
                            </div>
                        </template>
                    </el-pagination>
                </div>
            </div>
            <div class="card" style="margin-top:20px;">
                <h3>查询审批历史</h3><!-- 查询审批历史 -->
                <div class="cardMain table_body">
                    <el-table
                        ref="multipleTable"
                        :data="splsData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border
                        >
                        <el-table-column  prop="heimd" :label="$t('channel.clrgh')" width="100" align="center" > </el-table-column><!-- 处理人工号 -->
                        <el-table-column  prop="huimd" :label="$t('channel.clrxm')"  align="center" > </el-table-column><!-- 处理人姓名 -->
                        <el-table-column  prop="rxzx" :label="$t('toDoTasks.approvalOpinions')"  align="center" > </el-table-column><!-- 审批意见 -->
                        <el-table-column  prop="sqxt" :label="$t('liable.yj')"  align="center" > </el-table-column><!-- 意见-->
                        <el-table-column  prop="txxw" :label="$t('doTime')"  align="center" > </el-table-column><!-- 处理时间 -->
                    </el-table>
                </div>
            </div>
            <div class="card" style="margin-top:20px;" >
                <h3>审批</h3><!-- 审批 -->
                <el-form :model="clData" :rules="rules" ref="clData" label-width="100px" style="padding:10px;">
                    <el-form-item :label="$t('toDoTasks.approvalOpinions')"  v-if="edit" prop="spyj"><!-- 审批意见 -->
                        <el-select name="" id="" v-model="clData.spyj" prop="spyj">
                            <el-option label="通过" value="1" ></el-option>
                            <el-option label="拒绝" value="0" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('liable.yj')" prop="yj" v-if="edit"><!-- 意见 -->
                        <el-input type="textarea" v-model="clData.yj" style="width:300px;" :disabled="!edit"></el-input>
                        <span v-if="edit">0/80个字符</span>
                    </el-form-item>
                    <el-form-item label="审批人"  v-if="edit"><!-- 审批人 -->
                        11171
                    </el-form-item>
                </el-form>
                <div class="upfj">
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
                            :file-list="fileList"  v-if="edit">
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
        <!--处理页面结束-->
    </div>
</template>

<script>
export default {
    data(){
        return{
            obj: {
                legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
                radio:"0",
                pageSize: 10, //一页显示几条数据
                pageIndex: 1, //需要传过去的参数
                goPage: null,
            },
            page:{
                pageSize: 10, //一页显示几条数据
                pageIndex: 1, //需要传过去的参数
                goPage: null,
                totalCount:0
            },
            dialogTitle:"",
            currentPage: 1, //当前显示第几页 1开头
            totalCount: 0, //一共有多少条数据
            earlyData:[{}],
            doDialog:false,
            khfxdj:"无",
            khtxdj:"无",
            mzfxdData:[{}],
            splsData:[{}],
            edit:false,
            clData:{
                cljg:"",
                yj:"",
                spyj:"",
                sfjgzhbmfzr:""
            },
            upData:[{}],
            fileList:[],//上传附件的内容
            rules:{
                    spyj: [
                        { required: true, message:i18n.t('channel.spyjbnwk') },//审批意见不能为空
                    ],
                    yj: [
                        { required: true, message:i18n.t('channel.yjbnwk')},//意见不能为空
                    ],
                }
        }
    },
    methods:{
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
                // this.display()
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


        goPageSure1 () {
            if (this.page.goPage) {
                var mc=Math.ceil(this.page.totalCount/this.page.pageSize);
                if (this.page.goPage) {
                if(this.page.goPage>0&&this.page.goPage<=mc){
                    this.page.pageIndex = parseInt(this.page.goPage)
                }else{
                    this.page.pageIndex = parseInt(mc)
                }
                }
                this.display()
                this.page.goPage = null
            }
        },
        //改变每页显示多少条
        handleSizeChange1(val) {
            this.page.pageSize =  val;
            this.page.pageIndex = 1
            // this.display();
        },
        //选择页数改变数据
        handleCurrentChange1(val) {
            this.page.pageIndex =val;
            // this.display();
        },


        //点击处理
        doItem(row){
            this.dialogTitle=i18n.t('early.cl')
            this.doDialog=true,
            this.edit = true
        },

        //处理弹框返回
        cancel(){
            this.doDialog = false
            this.edit = false
        },

        //处理弹框的提交按钮
        sure(clData){
            this.$refs[clData].validate((valid) => {
              if(valid){

              }
            })
            
        },

        //查看弹框
        seeItem(row){
            this.dialogTitle=i18n.t('channel.xq')
            this.doDialog=true,
            this.edit = false
        },

        //点击当前处理人和结果
        openItem(row){
            this.$alert('当前处理人'+this.obj.radio+',当前节点'+this.obj.radio, '当前处理人和节点', {
                dangerouslyUseHTMLString: true,
            });
        },


        //上传附件
            handlePreview(){},
            handleRemove(){},
            beforeRemove(){},
            handleExceed(){},
    }
}
</script>

<style  lang='scss' scoped="scoped">
// .colorText{
//     line-height:12px;
//     font-size:12px;
//     padding-left:20px;
//     font-weight: bold;
//     margin-top:-10px;
//     margin-bottom:20px;
//     span{
//         color:red;
//         margin-right:20px;
//     }
// }
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
.card{
  border:1px solid #eee;
  .cardMain{
      padding:10px;
  }
  h3{
    line-height:30px; 
    box-sizing: border-box;
    padding:0 10px;
    background:#eee;
  }
}
</style>
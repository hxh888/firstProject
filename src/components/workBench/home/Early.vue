<template>
    <div class="early">
        <div class="list_module">
            <div class="table_body">
                <h4>{{$t('channel.yjdbrw')}}</h4><!--预警待办任务-->
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
                    <el-table-column prop="channelName" :label="$t('early.jgh')"  align="center" min-width="100px"> </el-table-column><!--机构号-->
                    <el-table-column prop="sourceId" :label="$t('quota.khxm')"  align="center" min-width="100px"> </el-table-column><!--客户姓名-->
                    <el-table-column prop="contactName" :label="$t('remind.documentType')" align="center" min-width="100px"></el-table-column><!--证件类型-->
                    <el-table-column prop="contactMobile" :label="$t('ratio.zjhm')" align="center" min-width="100px"></el-table-column><!--证件号码-->
                    <el-table-column prop="profitSharingCode" :label="$t('toDoTasks.businessType')" align="center" min-width="100px"></el-table-column><!--业务类型-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.rwms')" align="center" min-width="100px"></el-table-column><!--任务描述-->
                    <el-table-column prop="profitChannelBankName" :label="$t('channel.sqr')" align="center" min-width="100px"></el-table-column><!--申请人-->
                    <el-table-column prop="profitChannelBankCode" :label="$t('CreditCard.sqsj')" align="center" min-width="100px"></el-table-column><!--申请时间-->
                    <el-table-column :label="$t('Operation')" align="center" min-width="190px"><!--操作-->
                        <template slot-scope="scope">
                                <!-- <el-button size="mini" class="edit-btn" @click="editItem(scope.row)" >
                                    <i class="el-icon-edit"></i>
                                    <span class="">{{$t('Edit')}}</span> 
                                </el-button>--><!--编辑 -->
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
                                <!-- <el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" >
                                    <i class="el-icon-delete"></i>
                                    <span class="text">{{$t('Delete')}}</span> 
                                </el-button> --><!-- 删除 -->
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
        <el-dialog :title="$t('early.cl')" :visible.sync="doDialog">
            <el-row style="margin-top:-15px; margin-bottom:20px;">
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
            <div class="card" style="margin-top:20px;">
                <h3>{{$t('toDoTasks.applyHistory')}}</h3><!-- 审批历史 -->
                <div class="cardMain table_body">
                    <el-table
                        ref="multipleTable"
                        :data="splsData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border
                        >
                        <el-table-column  prop="heimd" :label="$t('toDoTasks.handleResult')" width="100" align="center" > </el-table-column><!-- 审批结果 -->
                        <el-table-column  prop="huimd" :label="$t('compoundPost.userName')"  align="center" > </el-table-column><!-- 审批人 -->
                        <el-table-column  prop="rxzx" :label="$t('toDoTasks.approvalOpinions')"  align="center" > </el-table-column><!-- 审批意见 -->
                        <el-table-column  prop="sqxt" :label="$t('toDoTasks.approvalNote')"  align="center" > </el-table-column><!-- 审批说明 approvalNote-->
                        <el-table-column  prop="fkxt" :label="$t('CreditCard.sqsj')"  align="center" > </el-table-column><!-- 申请时间 -->
                        <el-table-column  prop="txxw" :label="$t('doTime')"  align="center" > </el-table-column><!-- 处理时间 -->
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
                    <el-form-item :label="$t('liable.yj')" prop="yj" v-if="edit"><!-- 意见 -->
                        <el-input type="textarea" v-model="clData.yj" style="width:300px;" :disabled="!edit"></el-input>
                        <span v-if="edit">0/80个字符</span>
                    </el-form-item>
                    <el-form-item :label="$t('toDoTasks.approvalOpinions')"  v-if="edit"><!-- 审批意见 -->
                        <el-select name="" id="" v-model="clData.spyj" >
                            <el-option label="通过" value="1" ></el-option>
                            <el-option label="拒绝" value="0" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label=""  v-if="edit"><!-- 是否交给总行部门分责任 -->
                        <el-checkbox label="1" v-model="clData.sfjgzhbmfzr">是否交给总行部门分责任</el-checkbox><!-- 是否交给总行部门分责任 -->
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
                    cljg: [
                        { required: true, message:"处理结果不能为空" },//处理结果不能为空
                    ],
                    yj: [
                        { required: true, message:"意见不能为空" },//意见不能为空
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

        //点击处理
        doItem(row){
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
            
        },

        //查看弹框
        seeItem(row){
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
  h3{
    line-height:30px; 
    box-sizing: border-box;
    padding:0 10px;
    background:#eee;
  }
}
</style>
<template>
    <div class="early">
        <div class="list_module">
            <div class="table_body">
                <h4>{{$t('channel.eddbrw')}}</h4><!--额度待办任务-->
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
                    <el-table-column prop="profitSharingCode" :label="$t('toDoTasks.businessType')" align="center" min-width="100px"></el-table-column><!--业务类型-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.rwms')" align="center" min-width="100px"></el-table-column><!--任务描述-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('quota.edlx')" align="center" min-width="100px"></el-table-column><!--额度类型-->
                    <el-table-column prop="channelName" :label="$t('quota.tzlx')"  align="center" min-width="100px"> </el-table-column><!--调整类型-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.sped')" align="center" min-width="100px"></el-table-column><!--审批额度-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('channel.sqrgh')" align="center" min-width="100px"></el-table-column><!--申请人工号-->
                    <el-table-column prop="profitChannelCardCode" :label="$t('toDoTasks.customerName')" align="center" min-width="100px"></el-table-column><!--申请人姓名-->
                    <el-table-column prop="profitChannelBankCode" :label="$t('CreditCard.sqsj')" align="center" min-width="100px"></el-table-column><!--申请时间-->
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
        <el-dialog :title="$t('early.cl')" :visible.sync="doDialog">
            <div class="card" >
                <h3>{{$t('channel.edxx')}}</h3><!-- 额度信息 -->
                <div class="cardMain table_body">
                    <el-table
                        ref="multipleTable"
                        :data="mzfxdData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border
                        >
                        <el-table-column type  width="55" align="center" :label="$t('quota.dx')"><!-- 单选 -->
                            <template slot-scope="scope">
                                <el-radio
                                    @change.native="getCurrentRow(scope.$index,scope.row)"
                                    :label = "scope.$index"
                                    v-model="listRadio"
                                    class="textRadio"
                                >&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                        <el-table-column  prop="heimd" :label="$t('ratio.khxx')" width="100" align="center" > </el-table-column><!-- 客户信息 -->
                        <el-table-column  prop="huimd" :label="$t('early.jgh')"  align="center" > </el-table-column><!-- 机构号 -->
                        <el-table-column  prop="rxzx" :label="$t('quota.gded')"  align="center" > </el-table-column><!-- 固定额度 -->
                        <el-table-column  prop="sqxt" :label="$t('quota.lsed')"  align="center" > </el-table-column><!-- 临时额度 -->
                        <el-table-column  prop="fkxt" :label="$t('ratio.zjhm')"  align="center" > </el-table-column><!-- 证件号码 -->
                        <el-table-column  prop="txxw" :label="$t('liable.kh')"  align="center" > </el-table-column><!-- 卡号 -->
                        <el-table-column  prop="txxw" :label="$t('quota.cpmc')"  align="center" > </el-table-column><!-- 产品名称 -->
                        <el-table-column  prop="txxw" :label="$t('channel.mxjg')"  align="center" > </el-table-column><!-- 模型结果 -->
                        <el-table-column  prop="txxw" :label="$t('channel.mxed')"  align="center" > </el-table-column><!-- 模型额度 -->
                        <el-table-column  prop="txxw" :label="$t('channel.sqedlx')"  align="center" > </el-table-column><!-- 申请额度类型 -->
                        <el-table-column  prop="txxw" :label="$t('quota.tzlx')"  align="center" > </el-table-column><!-- 调整类型 -->
                        <el-table-column  prop="txxw" :label="$t('quota.sqed')"  align="center" > </el-table-column><!-- 申请额度 -->
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
                        <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                        <el-table-column  prop="heimd" :label="$t('channel.spjd')" width="100" align="center" > </el-table-column><!-- 审批节点 -->
                        <el-table-column  prop="huimd" :label="$t('compoundPost.userName')"  align="center" > </el-table-column><!-- 审批人 -->
                        <el-table-column  prop="rxzx" :label="$t('toDoTasks.approvalOpinions')"  align="center" > </el-table-column><!-- 审批意见 -->
                        <el-table-column  prop="sqxt" :label="$t('toDoTasks.approvalNote')"  align="center" > </el-table-column><!-- 审批说明 approvalNote-->
                        <el-table-column  prop="fkxt" :label="$t('channel.spsj')"  align="center" > </el-table-column><!-- 审批时间 -->
                        
                    </el-table>
                </div>
            </div>
            <div class="card" style="margin-top:20px;" >
                <h3>{{$t('channel.sp')}}</h3><!-- 审批 -->
                <el-form :model="clData" :rules="rules" ref="clData" label-width="100px" style="padding:10px;">
                    <el-form-item :label="$t('channel.sped')" v-if="edit">   <!-- 审批额度 -->
                        <el-input type="text"  v-model="clData.sped" ></el-input >
                    </el-form-item>
                    <el-form-item :label="$t('toDoTasks.approvalOpinions')" prop="spyj"  v-if="edit"><!-- 审批意见 -->
                        <el-select name="" id="" v-model="clData.spyj" >
                            <el-option label="通过" value="1" ></el-option>
                            <el-option label="拒绝" value="0" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('liable.yj')" prop="yj" v-if="edit"><!-- 意见 -->
                        <el-input type="textarea" v-model="clData.yj" style="width:300px;" :disabled="!edit"></el-input>
                        <span v-if="edit">0/80个字符</span>
                    </el-form-item>
                    
                    <el-form-item :label="$t('compoundPost.userName')"  v-if="edit"><!-- 审批人 -->
                        <span>{{clData.userName}}</span>
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
            listRadio:false,
            clData:{
                sped:"",
                yj:"",
                spyj:"",
                sfjgzhbmfzr:"",
                userName:""
            },
            upData:[{}],
            fileList:[],//上传附件的内容
            rules:{
                    spyj: [
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

        //单选
        getCurrentRow(index,row){
            console.log(index)
            console.log(row)
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
.upfj{
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
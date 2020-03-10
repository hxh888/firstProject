<template>
  <!-- 责任比拆分 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small" >
          <el-row>
            <el-col :span="22">
                <el-form-item :label="$t('remind.idNumber')">   <!-- 证件号码 -->
                    <el-input type="text"  v-model="obj.zjhm" ></el-input >
                </el-form-item>
                <el-form-item :label="$t('remind.cardNumber')">   <!-- 卡号 -->
                    <el-input type="text"  v-model="obj.kahao" ></el-input >
                </el-form-item>
                <el-form-item label="工号" >   <!-- 卡号 -->
                    <el-input type="text"  v-model="obj.gh" ></el-input >
                </el-form-item>
                 <el-form-item label="审批级别"> <!-- 岗位类型 -->
					<el-select v-model="obj.spjb" style="width:183px;" placeholder="">
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

		<!-- 列表模块 -->
    <div class="list_module">
	    <div class="table_body">
            <h4>{{$t('ratio.jxlb')}}</h4><!--绩效列表-->
            <el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
                <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px;"></el-table-column><!--序号-->
                <el-table-column prop="khxm" :label="$t('quota.khxm')" align="center" ></el-table-column><!-- 证件到期日 -->
                <el-table-column prop="documentNum" :label="$t('remind.idNumber')" align="center" ></el-table-column><!-- 证件号码 -->
                <el-table-column prop="cardNum" :label="$t('remind.cardNumber')" align="center" ></el-table-column><!-- 卡号 -->
                <el-table-column prop="do" :label="$t('Operation')"  align="center"><!-- 操作 -->
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)">
                        <i class="el-icon-view"></i>
                        <span class="text">{{$t('See')}}</span><!--查看	-->
                        </el-button> 
                        <el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
                            <i class="el-icon-edit"></i>
                            <span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
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
		<!--列表模块开始-->
		<!--详情弹框页面开始-->
    <el-dialog title="绩效管理/管户人修改" :visible.sync="seeDialog" :before-close="cancels"  :close-on-click-modal="false">
        <div class="card table_body" v-if="!edit">
            <h3 style="line-height:40px;">{{$t('ratio.splb')}}</h3><!--审批列表  -->
            <div class="pad10">
                <el-table :data="approvalData" border>
                    <el-table-column prop="xm" :label="$t('remind.cardNumber')" align="center"></el-table-column><!-- 卡号 -->
                    <el-table-column prop="sfz" :label="$t('Create_time')" align="center" width="105"></el-table-column><!-- 创建时间 -->
                    <el-table-column prop="kh" :label="$t('remind.czrxm')" align="center" width="105"></el-table-column><!-- 操作人姓名 -->
                    <el-table-column prop="fkjg" :label="$t('remind.czrgh')" align="center"></el-table-column><!-- 操作人工号 -->
                    <el-table-column prop="dkwybs" :label="$t('remind.czlx')" width="105" align="center"></el-table-column><!-- 操作类型 -->
                    <el-table-column prop="dkyqcs" :label="$t('remind.lymk')" align="center"></el-table-column><!-- 来源模块 -->
                    <el-table-column prop="djkyqcs" :label="$t('remind.sm')" align="center"></el-table-column><!-- 说明 -->
                </el-table>
            </div>
        </div>
        <div class="card cardInformation" v-if="edit">
            <h3 style="line-height:40px;">{{$t('ratio.khxx')}}</h3><!--客户信息  -->
            <el-row>
                <el-col :span="8"><span>{{$t('quota.khxm')}}：</span></el-col><!--客户姓名  -->
                <el-col :span="8"><span>{{$t('ratio.zjhm')}}：</span></el-col><!--证件号码  -->
                <el-col :span="8"><span>{{$t('ratio.jb')}}：</span></el-col><!--级别  -->
                <el-col :span="8"><span>原{{$t('ratio.ybl')}}：</span></el-col><!--原比例  -->
                <el-col :span="8"><span>{{$t('ratio.ysprxm')}}：</span></el-col><!--审批人姓名  -->
                <el-col :span="8"><span>{{$t('ratio.ygh')}}：</span></el-col><!--原工号  -->
            </el-row>
        </div>
        <div class="card table_body"  v-if="edit" style="margin-top:15px;">
            <h3 style="line-height:40px;">{{$t('ratio.xghxxlb')}}</h3><!--修改后信息列表  -->
            <div class="pad10">
                <el-table :data="editData" border>
                    <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
                    <el-table-column prop="gh" :label="$t('ratio.gh')" align="center"></el-table-column><!-- 工号 -->
                    <el-table-column prop="xm" :label="$t('ratio.xm')" align="center"></el-table-column><!-- 姓名 -->
                    <el-table-column prop="bl" :label="$t('ratio.bl')" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.bl" v-if="scope.$index == editIndex "></el-input>
                            <span v-else>{{scope.row.bl}}</span>
                        </template>
                    </el-table-column><!-- 比例(%) -->
                    <el-table-column prop="do" :label="$t('Operation')"  align="center"><!-- 操作 -->
                        <template slot-scope="scope">
                            <el-button size="mini" class="edit-btn" @click="editSonItem(scope.$index,scope.row)" v-if="scope.$index != editIndex ">
								<i class="el-icon-edit"></i>
								<span class="text">{{$t('Edit')}}</span> <!-- 编辑 -->
							</el-button>
							<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)" v-if="scope.$index != editIndex ">
								<i class="el-icon-delete"></i>
								<span class="text">{{$t('Delete')}}</span> <!-- 删除 -->
							</el-button>
                            <el-button size="mini" class="edit-btn" @click="updateItem(scope.$index,scope.row)" v-if="scope.$index == editIndex ">
								<i class="el-icon-refresh"></i>
								<span class="text">更新</span> <!-- 更新 -->
							</el-button>
							<el-button size="mini" type="danger" class="delete-btn" @click="cancelItem(scope.$index,scope.row)" v-if="scope.$index == editIndex ">
								<i class="el-icon-close"></i>
								<span class="text">取消</span> <!-- 取消 -->
							</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="card" v-if="edit"  style="margin-top:15px;">
            <h3>修改审批人</h3><!--修改审批人-->
            <el-form  :model="editCard" :ref="editCard" :rules="rules" label-width="80px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
                <el-col :span="8">
                    <el-form-item :label="$t('ratio.gh')" prop="gh"><!-- 工号 -->
                    <el-input v-model="editCard.gh" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('ratio.xm')" prop="xm"><!-- 姓名 -->
                    <el-input v-model="editCard.xm" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-button  type="primary" size="small" style="margin-top:10px; margin-left:10px;">{{$t('OK')}}</el-button><!-- 确定 -->
                </el-col>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align:center;">
            <!-- <el-button  type="primary" v-if="!edit">返回</el-button> -->
            
            <el-button type="primary" @click="sure('addForm')"  v-if="edit">{{$t('ratio.tj')}}</el-button><!-- 提交 -->
            <el-button :type="edit ? '':'primary'">{{$t('ratio.fh')}}</el-button><!-- 返回 -->
        </div>
    </el-dialog>
    <!--详情弹框页面结束-->
		
	

  </div>
</template>

<script>
export default {
    name: 'Billing',
    data () {
        return {
            tableData:[
                {khxm:'随便',documentNum:'000392',cardNum:'123793764984739'}
            ],  //user 列表数据
            obj: {
                pageSize:10,//一页显示几条数据
                pageIndex:1,  //需要传过去的参数
                legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
                name: '',
                zjhm:'',
                kahao:'',
                dqrq:'',
                spjb:''
            },
            currentPage:1,//当前显示第几页 1开头
            totalCount:0,//一共有多少条数据
            seeDialog:false,  //弹框	
            approvalData:[],//审批列表
            editData:[
                {gh:'001',xm:'张三',bl:'10'},
                {gh:'002',xm:'李四',bl:'20'},
                {gh:'003',xm:'王五',bl:'30'},
            ],//修改表格
            edit:false,//弹框是否是编辑
            row: {},
            editIndex:null,
            oldBl:'',
            editCard:{
                gh:'',
                xm:''
            },
            rules:{
                rqrq:[
                    { required: true, message: i18n.t('account.Please_choose_the_date_of_suncut'), trigger: 'blur' },
                ],
                gh:[
                    { required: true, message:i18n.t('ratio.ghbnwk'), trigger: 'blur' },
                ],
                xm:[
                    { required: true, message:i18n.t('ratio.xmbnwk'), trigger: 'blur' },
                ]
            },
            funList: []
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

        //点击查看出弹框
        seeItem(row){
        this.seeDialog = true;
        this.edit = false;
        console.log(row)
        },

        //修改后信息列表编辑
        editItem(row){
            this.seeDialog = true;
            this.edit = true;
        },

        //
        editSonItem(index,row){
            console.log(index)
            console.log(row)
            this.editIndex=index;
            this.oldBl = row.bl
        },

        //修改后信息列表更新
        updateItem(index,row){
            console.log(row)
            console.log(index)
            this.editIndex = null
            console.log(row.bl)
            console.log(this.editIndex)
        },

        //
        cancelItem(index,row){
            console.log(index)
            console.log(row)
            row.bl = this.oldBl;
            this.editIndex = null;
            console.log(row.bl)
            console.log(this.editIndex)
        },

        handleClick(tab, event) {
            console.log(tab, event);
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
.pad10{
    box-sizing:border-box;
    padding:10px;
}
</style>

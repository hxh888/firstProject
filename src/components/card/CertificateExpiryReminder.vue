<template>
  <!-- 证件到期提醒 -->
  <div class="content_box" id="contract_content">
		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="22">
              <el-form-item :label="$t('remind.name')" prop="name" >   <!-- 姓名 -->
                <el-input type="text"  v-model="obj.name" ></el-input >
              </el-form-item>
              <el-form-item :label="$t('remind.idNumber')" prop="zjhm" >   <!-- 证件号码 -->
                <el-input type="text"  v-model="obj.zjhm" ></el-input >
              </el-form-item>
              <el-form-item :label="$t('remind.cardNumber')" prop="kahao" >   <!-- 卡号 -->
                <el-input type="text"  v-model="obj.kahao" ></el-input >
              </el-form-item>
              <el-form-item :label="$t('remind.dueDate')" prop="dqrq" >   <!-- 到期日期 -->
                <el-date-picker
                  v-model="obj.dqrq"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  default-value="">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="edit_module_btn" style="margin-top: 10px;">
                <el-button type="warning" icon="el-icon-search"  @click="QueryUser()" size="small">{{$t("Query")}}</el-button> <!-- 查询 -->
                <!-- <el-button type="primary" icon="el-icon-setting" @click="editItem(tableData[0])" size="small" v-if="funList.indexOf('手工')>-1">{{$t("account.Manual_daily_cutting")}}</el-button> 手工日切 -->
              </div>
            </el-col>
          </el-row>  
        </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
          <h4>{{$t('remind.maturityList')}}</h4><!--到期列表-->
          <el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
            <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column><!--序号-->
            <el-table-column prop="ONumber" :label="$t('remind.organizationNumber')" align="center" ></el-table-column><!-- 机构号 -->
            <el-table-column prop="name" :label="$t('remind.name')" align="center" ></el-table-column><!-- 姓名 -->
            <el-table-column prop="documentType" :label="$t('remind.documentType')" align="center" width="135px"></el-table-column><!-- 证件类型 -->
            <el-table-column prop="documentNum" :label="$t('remind.idNumber')" align="center" width="170px"></el-table-column><!-- 证件号码 -->
            <el-table-column prop="cardNum" :label="$t('remind.cardNumber')" align="center" width="170px"></el-table-column><!-- 卡号 -->
            <el-table-column prop="zjdqr" :label="$t('remind.edoc')" align="center" width="135px"></el-table-column><!-- 证件到期日 -->
			      <el-table-column prop="do" :label="$t('Operation')"  align="center"><!-- 操作 -->
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" class="search-btn" @click="seeItem(scope.row)">
                      <i class="el-icon-view"></i>
                      <span class="text">{{$t('See')}}</span><!--查看	-->
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
    <el-dialog title="查看详情" :visible.sync="seeDialog" :before-close="cancels"  :close-on-click-modal="false">
      	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane :label="$t('remind.cardInformation')" name="first"><!-- 卡片信息 -->
                <div class="card">
                  <h3>{{$t('remind.cardInformation')}}</h3><!-- 卡片信息 -->
                  <el-form  :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.cardNumber')"><!-- 卡号 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.product')"><!-- 产品 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.cardStatus')"><!-- 卡片状态 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.accountStatus')"><!-- 账户状态 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.cardIssuer')"><!-- 发卡机构 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.dateCard')"><!-- 发卡日期 -->
                        <el-input v-model="card.num" type="date" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.lineCredit')"><!-- 信用额度 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.lail')"><!-- 大额分期额度 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.provisionalQuota')"><!-- 临时额度 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.efdotl')"><!-- 临时额度生效日期 -->
                        <el-input v-model="card.num" type="date" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.exdotl')"><!-- 临时额度失效日期 -->
                        <el-input v-model="card.num" type="date" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.kpdqr')"><!-- 卡片到期日 -->
                        <el-input v-model="card.num" type="date" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.ghrgh')"><!-- 管户人工号 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.ghrxm')"><!-- 管户人姓名 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('remind.dqtzye')"><!-- 当前透支余额 -->
                        <el-input v-model="card.num" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </div>
                
            </el-tab-pane>
            <el-tab-pane :label="$t('remind.ckrxx')" name="second"><!-- 持卡人信息 -->
              <div class="basic card">
                <h3>{{$t('remind.ckrjbzl')}}</h3><!-- 持卡人基本资料 -->
                <el-form  :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.name')"><!-- 姓名 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.pinyin')"><!-- 拼音 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.documentType')"><!-- 证件类型 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.idNumber')"><!-- 证件号码 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.zjyxq')"><!-- 证件有效期 -->
                      <el-input v-model="card.num" :disabled="true" type="date"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.xl')" ><!-- 学历 -->
                      <el-select v-model="card.num" placeholder="请选择" :disabled="true" style="width:100%;">
                        <el-option label="小学" value="0"></el-option>
                        <el-option label="初中" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.hyzk')" ><!-- 婚姻状况 -->
                      <el-select v-model="card.num" placeholder="请选择" :disabled="true" style="width:100%;"> 
                        <el-option label="未婚" value="0"></el-option>
                        <el-option label="已婚" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.sjhm')"><!-- 手机号码 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.jtdh')"><!-- 家庭电话 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.dzyx')"><!-- 电子邮箱 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item :label="$t('remind.zddz')"><!-- 账单地址 -->
                      <el-input v-model="card.num" :disabled="true" style="width:80px;"></el-input>{{$t('remind.province')}}<!-- 省 -->
                      <el-input v-model="card.num" :disabled="true" style="width:80px;"></el-input>{{$t('remind.city')}}<!-- 市 -->
                      <el-input v-model="card.num" :disabled="true" style="width:80px;"></el-input>{{$t('remind.quxian')}}<!-- 区县 -->
                      <el-input v-model="card.num" :disabled="true" style="width:180px;"></el-input>{{$t('remind.detailAdd')}}<!-- 详细地址 -->
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="Professional card" style="margin-top:10px;">
                <h3>{{$t('remind.ckrzyzl')}}</h3><!-- 持卡人职业资料 -->
                <el-form  :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.dwqc')"><!-- 单位全称 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.rzbm')"><!-- 任职部门 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.hylb')" ><!-- 行业类别 -->
                      <el-select v-model="card.num" placeholder="请选择" :disabled="true" style="width:100%;">
                        <el-option label="小学" value="0"></el-option>
                        <el-option label="初中" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.gw')"><!-- 岗位 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.gznx')"><!-- 工作年限 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.dwdh')"><!-- 单位电话 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.fjhm')"><!-- 分级号码 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.nsr')"><!-- 年收入 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="contact card" style="margin-top:10px;">
                <h3>{{$t('remind.lxrzl')}}</h3><!-- 联系人资料 -->
                <el-form :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.gx')"><!-- 关系 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.name')"><!-- 姓名 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.sjhm')"><!-- 手机号码 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.lxdh')"><!-- 联系电话 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.dwqc')"><!-- 单位全称 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="guarantor card" style="margin-top:10px;">
                <h3>{{$t('remind.dbrxx')}}</h3><!-- 担保人信息 -->
                <el-form :model="card" label-width="135px" size="small" class="demo-form-inline" style="padding:5px 10px;overflow:hidden;">
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.name')"><!-- 姓名 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.idNumber')"><!--证件号码  -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.cardNumber')"><!-- 卡号 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('remind.dblx')"><!-- 担保类型 -->
                      <el-input v-model="card.num" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('remind.zxsj')" name="third"><!-- 征信数据 -->
              <div class="card">
                <h3>{{$t('remind.grzxsj')}}</h3><!-- 个人征信数据 -->
                <el-table :data="personalData" border >
                  <el-table-column prop="xm" :label="$t('remind.name')" align="center"></el-table-column><!-- 姓名 -->
                  <el-table-column prop="sfz" :label="$t('remind.sfz')" align="center"></el-table-column><!-- 身份证 -->
                  <el-table-column prop="kh" :label="$t('remind.cardNumber')" align="center"></el-table-column><!-- 卡号 -->
                  <el-table-column prop="fkjg" :label="$t('remind.cardIssuer')" align="center"></el-table-column><!-- 发卡机构 -->
                  <el-table-column prop="dkwybs" :label="$t('remind.dkwybs')" width="110" align="center"></el-table-column><!-- 贷款违约笔数 -->
                  <el-table-column prop="dkyqcs" :label="$t('remind.dkyqcs')" width="110" align="center"></el-table-column><!-- 贷款逾期次数 -->
                  <el-table-column prop="djkyqcs" :label="$t('remind.djkyqcs')" width="130" align="center"></el-table-column><!-- 贷记卡逾期次数 -->
                  <el-table-column prop="djkzgyqcs" :label="$t('remind.djkzgyqs')" width="140" align="center"></el-table-column><!-- 贷记卡最高逾期数 -->
                  <el-table-column prop="zhycyqhkrq" :label="$t('remind.zhycyqhkrq')" width="165" align="center"></el-table-column><!-- 最后一次逾期还款日期 -->
                  <el-table-column prop="dqzhzt" :label="$t('remind.dqzhzt')" width="110" align="center"></el-table-column><!-- 当前账户状态 -->
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('remind.yjls')" name="fourth">
              <div class="card">
                <h3>{{$t('remind.fxyjls')}}</h3><!-- 风险预警历史 -->
                <el-table :data="riskData" border >
                  <el-table-column prop="xm" :label="$t('remind.yjrq')" align="center"></el-table-column><!-- 预警日期 -->
                  <el-table-column prop="sfz" :label="$t('remind.khfxjb')" align="center" width="105"></el-table-column><!-- 客户风险级别 -->
                  <el-table-column prop="kh" :label="$t('remind.mzfxbq')" align="center" width="105"></el-table-column><!-- 命中风险标签 -->
                  <el-table-column prop="fkjg" :label="$t('remind.clyj')" align="center"></el-table-column><!-- 处理意见 -->
                  <el-table-column prop="dkwybs" :label="$t('remind.clrygh')" width="105" align="center"></el-table-column><!-- 处理人员工号 -->
                  <el-table-column prop="dkyqcs" :label="$t('remind.cljg')" align="center"></el-table-column><!-- 处理机构 -->
                  <el-table-column prop="djkyqcs" :label="$t('remind.clsj')" align="center"></el-table-column><!-- 处理时间 -->
                  <el-table-column prop="djkzgyqcs" :label="$t('remind.cljg')" align="center"></el-table-column><!-- 处理结果 -->
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('remind.czrz')" name="fifth"><!--操作日志  -->
              <div class="card">
                <h3>{{$t('remind.czrz')}}</h3><!--操作日志  -->
                <el-table :data="riskData" border >
                  <el-table-column prop="xm" :label="$t('remind.cardNumber')" align="center"></el-table-column><!-- 卡号 -->
                  <el-table-column prop="sfz" :label="$t('Create_time')" align="center" width="105"></el-table-column><!-- 创建时间 -->
                  <el-table-column prop="kh" :label="$t('remind.czrxm')" align="center" width="105"></el-table-column><!-- 操作人姓名 -->
                  <el-table-column prop="fkjg" :label="$t('remind.czrgh')" align="center"></el-table-column><!-- 操作人工号 -->
                  <el-table-column prop="dkwybs" :label="$t('remind.czlx')" width="105" align="center"></el-table-column><!-- 操作类型 -->
                  <el-table-column prop="dkyqcs" :label="$t('remind.lymk')" align="center"></el-table-column><!-- 来源模块 -->
                  <el-table-column prop="djkyqcs" :label="$t('remind.sm')" align="center"></el-table-column><!-- 说明 -->
                </el-table>
              </div>
            </el-tab-pane>
        </el-tabs>
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
        {ONumber:'2000012',name:'随便',documentType:'谁知道',documentNum:'000392',cardNum:'123793764984739',zjdqr:'2019-12-09'}
      ],  //user 列表数据
      obj: {
        pageSize:10,//一页显示几条数据
        pageIndex:1,  //需要传过去的参数
        legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
        name: '',
        zjhm:'',
        kahao:'',
        dqrq:''
      },
      currentPage:1,//当前显示第几页 1开头
      totalCount:0,//一共有多少条数据
      seeDialog:false,  //弹框	
      activeName: 'first',
      card:{
        num:''
      },
      personalData:[//征信数据表格
        {xm:'1',sfz:'1',kh:'1',fkjg:'1',dkwybs:'1',dkyqcs:'1',djkyqcs:'1',djkzgyqcs:'1',zhycyqhkrq:'1',dqzhzt:'1'}
      ],
      riskData:[],//风险预警历史表格
      addForm:{
        companyName: '',
        runDate: '',
        rqrq: '',
        switchType: '',
        switchTime: '',
        createUser: this.$store.state.loginData.userLogin.userName,
        flag:false,   //是否可输入 默认可以
        edit:false	 //编辑标识
      },
      switchTypeList: [],
      useStatusList: [],
      row: {},
        rules:{
            rqrq:[
            { required: true, message: i18n.t('account.Please_choose_the_date_of_suncut'), trigger: 'blur' },
            ],
        },
    funList: []
    }
  },
  mounted(){
    this.getFunList()
    this.getParam()
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
      console.log(row)
    },

    handleClick(tab, event) {
        console.log(tab, event);
    },
    
    //取消弹框重置数据
    cancels(formName){
      this.seeDialog = false;
      this.addForm.flag=false;
      this.addForm.edit=false;
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
</style>

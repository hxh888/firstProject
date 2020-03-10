<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 证件到期提醒弹出框 -->
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
                <el-table :data="doData" border >
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
</template>

<script>
export default {
    name: 'paramSelect',
	props:{
        rowData:Object,
	},
    data() {
      return {
            options:[],
            activeName: 'first',
            personalData:[],//个人征信
            riskData:[],//风险预警
            doData:[],//操作日志
            card:{
                num:''
            },
      }
	},
	mounted(){
		
	},
	watch:{
		// select(val){
		// 	this.couponSelected =val;
		// }
	},
    methods: {
		handleClick(tab, event) {
            // console.log(tab, event);
        },
    },
   
  };
</script>

<style scoped="scoped" lang='scss'></style>
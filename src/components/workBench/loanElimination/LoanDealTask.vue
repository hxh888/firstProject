<template>
<!-- 消费贷可领取任务 -->
<div class="home" id="loantask">
    <div class="home_main clearfix">
          <div class="home_con clearfix">
              <h4 class="loan_title">{{$t('toDoTasks.rgspg')}}</h4><!-- 人工审批岗 -->
              <!-- 申请件信息和 -->
              <el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="loanForm"  ref="loanForm" id="loanForm" size="small"  label-width="130px">
                  <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.applyId')" prop="applyId"><!-- 申请件编号 -->
                          <el-input v-model="loanForm.applyId" disabled ></el-input>
                          
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.businessType')" prop="applyType" ><!-- 业务类型 -->
                          <el-input v-model="loanForm.applyType"  disabled></el-input>
                        </el-form-item>
                      </el-col>

                       <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.productName')" prop="productName"><!-- 产品名称 -->
                          <el-input v-model="loanForm.productName"  disabled></el-input>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.creditlimit')" prop="applyAmount"><!-- 授信额度 -->
                          <el-input v-model="loanForm.applyAmount" disabled ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.customerName')" prop="applyUserName"><!-- 申请人姓名 -->
                          <el-input v-model="loanForm.applyUserName"  disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.phoneNumber')"  prop="applyUserPhoneNumber"><!-- 手机号 -->
                          <el-input v-model="loanForm.applyUserPhoneNumber" disabled ></el-input>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.certificatesType')" ><!-- 证件类型 -->
                            <el-select v-model="loanForm.applyIdcardType" disabled placeholder="">
                                <el-option 
                                    v-for="(item,index) in applyIdcardTypeArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('toDoTasks.certificatesNumber')"  prop="applyIdcardTypeValue"><!-- 证件号码 -->
                          <el-input v-model="loanForm.applyIdcardTypeValue"  disabled></el-input>
                        </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row>
                    <el-form-item >
                      <ul class='loanStep clearfix'>
                        <li @click="openDtaile(index)" 	
                        v-for="(item,index) in loanStep" 
                        :key="index">{{item.name}}</li>
                      </ul>
                    </el-form-item>

                    <el-form-item  :label="$t('toDoTasks.handleDesc')" prop="aftificialInfo"><!-- 转人工原因 -->
                      <!-- <h4 class="loan_small_title"></h4> -->
                      <el-input type="textarea"  v-model="loanForm.aftificialInfo" maxlength="100" show-word-limit disabled ></el-input>
                    </el-form-item>
                    <el-form-item  :label="$t('toDoTasks.blackInfo')" prop="blackInfo" v-show="isShowThReson"><!-- 退回原因 -->
                      <!-- <h4  class="loan_small_title">退回</h4> -->
                      <el-input type="textarea" v-model="loanForm.blackInfo" maxlength="100" show-word-limit disabled></el-input>
                    </el-form-item>
                  </el-row>
              </el-form>
               <!-- 电话核查 -->
               <el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="loanForm1" ref="loanForm1"  :rules="$rules.approve" id="loanForm1" size="small"  label-width="130px">
                  <h5 class="loan_title">{{$t('toDoTasks.phoneCheck')}}</h5><!-- 电话核查 -->
                  <el-row>
                     <el-col :span="8">
                        <el-form-item   :label="$t('toDoTasks.checkLiaisonPhone')"  prop="checkLiaisonPhone"><!-- 联系人电话核查 -->
                            <el-select v-model="loanForm1.checkLiaisonPhone" placeholder="">
                                <el-option value=""  :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkLiaisonPhoneArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                         <el-form-item :label="$t('toDoTasks.checkLiaison')"    prop="checkLiaison"><!-- 联系人核查 -->
                            <el-select v-model="loanForm1.checkLiaison" placeholder="">
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkLiaisonArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                         <el-form-item :label="$t('toDoTasks.checkPhoneNum')"     prop="checkPhoneNum"><!-- 申请人手机号核查 -->
                             <el-select v-model="loanForm1.checkPhoneNum" placeholder="">
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkPhoneNumArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                     <el-col :span="8">
                        <el-form-item   :label="$t('toDoTasks.checkHomePhone')"     prop="checkHomePhone" ><!-- 家庭电话核查 -->
                             <el-select v-model="loanForm1.checkHomePhone" placeholder="">
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkHomePhoneArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>

                     <el-col :span="8">
                        <el-form-item   :label="$t('toDoTasks.checkUnit')"     prop="checkUnit" ><!-- 公司电话核查 -->
                             <el-select v-model="loanForm1.checkUnit" placeholder="">
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkUnitArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                         <el-form-item :label="$t('toDoTasks.checkUnitPhone')"     prop="checkUnitPhone" ><!-- 公司电话核查结果 -->
                              <el-select v-model="loanForm1.checkUnitPhone" placeholder="">
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkUnitPhoneArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                     <el-col :span="8">
                        <el-form-item   :label="$t('toDoTasks.zmrdhhc')"    prop="checkCertifierPhone"><!-- 证明人电话核查 -->
                            <el-select v-model="loanForm1.checkCertifierPhone" >
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkCertifierPhoneArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                         <el-form-item :label="$t('toDoTasks.zmrhc')"     prop="checkCertifier"><!-- 证明人核查 -->
                            <el-select v-model="loanForm1.checkCertifier" placeholder="">
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in checkCertifierArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-form-item  :label="$t('toDoTasks.checkExplain')"  prop="checkExplain" 
v-if="loanForm1.checkCertifier !='' || loanForm1.checkCertifierPhone !='' || loanForm1.checkUnitPhone !='' ||  loanForm1.checkUnit !=''  ||  loanForm1.checkHomePhone !='' ||  loanForm1.checkPhoneNum !=''||  loanForm1.checkLiaison !=''||  loanForm1.checkLiaisonPhone !='' " ><!-- 电话核查说明 -->
                        <el-input type="textarea" v-model="loanForm1.checkExplain" maxlength="100" show-word-limit ></el-input>
                  </el-form-item>

                  <el-form-item  :label="$t('toDoTasks.checkExplain')"   prop="checkExplain1"   v-else><!-- 电话核查说明 -->
                        <el-input type="textarea" v-model="loanForm1.checkExplain" maxlength="100" show-word-limit ></el-input>
                  </el-form-item>

                   <h5 class="loan_title">{{$t('toDoTasks.approvalOpinions')}}</h5><!-- 审批意见 -->
                  <el-row>
                      <el-col :span="12">
                        <el-form-item :label="$t('toDoTasks.handleResult')" prop="handleResult"><!-- 审批结果 -->
                          <el-radio-group v-model="loanForm1.handleResult">
                            <el-radio  label="1">{{$t('toDoTasks.adopt')}}</el-radio><!-- 通过 -->
                            <el-radio  label="0">{{$t('toDoTasks.refuse')}}</el-radio><!-- 拒绝 -->
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                         <el-form-item :label="$t('toDoTasks.handleResultState')"  prop="handleResultState" v-if="loanForm1.handleResult=='0'" ><!-- 拒绝码 -->
                            <el-select v-model="loanForm1.handleResultState"  @change="selectModel(loanForm1.handleResultState)" placeholder="">
                                <el-option value="" :label="$t('toDoTasks.pleaseChose')"></el-option><!-- 请选择 -->
                                <el-option 
                                    v-for="(item,index) in handleResultStateArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  >{{item.paramSname}}</el-option>
                              </el-select>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-form-item :label="$t('toDoTasks.approvalNote')"     prop="handleDesc" ><!-- 审批说明 -->
                      <el-input type="textarea" v-model="loanForm1.handleDesc" maxlength="100" show-word-limit ></el-input>
                  </el-form-item>
                  <el-row style="text-align:right" class="mt20">
                        <el-button  @click="resetForm('loanForm1')">{{$t('Reset')}}</el-button><!-- 重置 -->
			                  <el-button  type="primary" @click="submitLoanDbdp('loanForm1')" v-if=" row.bussinessType == '2'" :disabled="disabled">{{$t('toDoTasks.Submission')}}</el-button><!-- 提交 -->
                        <el-button  type="primary" @click="submitLoanSjsh('loanForm1')" v-if=" row.bussinessType == '3'" :disabled="disabled">{{$t('toDoTasks.Submission')}}</el-button><!-- 提交 -->
                  </el-row>
              </el-form>
          </div>
          <!--弹框页面开始-->
          <el-dialog :title="title" :visible.sync="dialogFormVisible"  :before-close="cancel" :close-on-click-modal="false">
                <!-- 申请件信息 -->
                <div v-if="flag==0"> 
                  <el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="detaileForm"  ref="detaileForm" id="detaileForm" size="small"  label-width="120px">
                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.applyId')" ><!-- 申请件编号 -->
                            <el-input v-model="detaileForm.applyId"  disabled></el-input>
                          </el-form-item>
                           
                        </el-col>
                    </el-row>
                    <el-col :span="24">
                      <p class="line"></p>
                    </el-col>

                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.cCustomerName')" ><!-- 客户姓名 -->
                            <el-input v-model="detaileForm.applyUserName"  disabled></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.birthday')" ><!-- 出生日期 -->
                            <!--<el-input v-model="detaileForm.birthday" disabled ></el-input>-->
                            <el-input v-model="detaileForm.applyUserBirth" disabled ></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.certificatesType')" ><!-- 证件类型 -->
                              <el-select v-model="detaileForm.applyIdcardType" disabled placeholder="">
                                <el-option 
                                    v-for="(item,index) in applyIdcardTypeArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                              </el-select>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.certificatesNumber')" ><!-- 证件号 -->
                            <el-input v-model="detaileForm.applyIdcardTypeValue"  disabled></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.education')" ><!-- 学历 -->
                            <el-select v-model="detaileForm.applyUserEducationIdName" disabled placeholder="">
                                <el-option 
                                    v-for="(item,index) in applyUserEducationIdNameArr" 
                                    :key="index"
                                    :label="item.paramSname"
                                    :value="item.paramValue"
                                  ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.phoneNumber')"><!-- 手机号码 -->
                            <el-input v-model="detaileForm.applyUserPhoneNumber"  disabled></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.familyAddress')" ><!-- 家庭地址 -->
                            <el-input v-model="detaileForm.applyHousingAddDetailed" disabled ></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.homeZipCode')" ><!-- 家庭邮编 -->
                            <el-input v-model="detaileForm.applyHousingZipCode"  disabled></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.companyName')"> <!-- 公司名称 -->
                            <el-input v-model="detaileForm.applyCompanyName"  disabled></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.position')" ><!-- 职位 -->
                            <el-input v-model="detaileForm.applyCompanyPost"  disabled></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.companyAddress')" ><!-- 公司地址 -->
                            <el-input v-model="detaileForm.applyCompanyAddDetailed"  disabled></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.companyZipCode')" ><!-- 公司邮编 -->
                            <el-input v-model="detaileForm.applyCompanyNameZipCode" disabled ></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.linkmanname')" ><!-- 联系人姓名 -->
                            <el-input v-model="detaileForm.applyRelationName" disabled ></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.linkmanrelationship')" ><!-- 与联系人关系 -->
                            <el-input v-model="detaileForm.applyRelatin"  disabled></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.linkmanphone')" ><!-- 联系人电话 -->
                            <el-input v-model="detaileForm.applyRelationTelephone" disabled ></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>
                 </el-form>
                </div>
                <!-- 影像调阅 -->
                <div v-if="flag==1"> 
                    <el-tabs v-model="activeName" >
                      <el-tab-pane :label="$t('toDoTasks.apply')" name="first">{{$t('toDoTasks.apply')}}</el-tab-pane><!-- 申请件 -->
                      <el-tab-pane :label="$t('toDoTasks.identityCertificate')" name="second">{{$t('toDoTasks.identityCertificate')}}</el-tab-pane><!-- 身份证明 -->
                      <el-tab-pane :label="$t('toDoTasks.workCertificate')" name="third">{{$t('toDoTasks.workCertificate')}}</el-tab-pane><!-- 工作证明 -->
                      <el-tab-pane :label="$t('toDoTasks.incomeCertificate')" name="fourth">{{$t('toDoTasks.incomeCertificate')}}</el-tab-pane><!-- 收入证明 -->
                      <el-tab-pane :label="$t('toDoTasks.creditCertificate')" name="five">{{$t('toDoTasks.creditCertificate')}}</el-tab-pane><!-- 资信证明 -->
                    </el-tabs>
                </div>
                <div v-if="flag==2">
                  <iframe :src="creditReport" style="width: 100%; min-height: 300px; border: none; overflow-y: auto;"></iframe>
                </div>
                <div v-if="flag==3" > 
                  <el-form :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :model="detaileForm1"  ref="detaileForm1" id="detaileForm1" size="small"  label-width="150px" >
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('toDoTasks.updateUser')" ><!-- 电话核查人员 -->
                            <el-input v-model="detaileForm1.updateUser"  disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-col :span="24">
                        <p class="line"></p>
                      </el-col>

                     <el-row>
                        <el-col :span="12">
                            <el-form-item   :label="$t('toDoTasks.checkLiaisonPhone')" ><!-- 联系人电话核查 -->
                                <el-select v-model="detaileForm1.checkLiaisonPhone" disabled placeholder="">
                                  <el-option 
                                      v-for="(item,index) in checkLiaisonPhoneArr" 
                                      :key="index"
                                      :label="item.paramSname"
                                      :value="item.paramValue"
                                    ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>

                          <el-col :span="12">
                            <el-form-item :label="$t('toDoTasks.checkLiaison')"  ><!-- 联系人核查 -->
                                <el-select v-model="detaileForm1.checkLiaison" disabled placeholder="">
                                  <el-option 
                                      v-for="(item,index) in checkLiaisonArr" 
                                      :key="index"
                                      :label="item.paramSname"
                                      :value="item.paramValue"
                                    ></el-option>
                               </el-select>
                            </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12">
                            <el-form-item :label="$t('toDoTasks.checkPhoneNum')"   ><!-- 申请人手机号核查 -->
                                <el-select v-model="detaileForm1.checkPhoneNum" disabled placeholder="">
                                    <el-option 
                                        v-for="(item,index) in checkPhoneNumArr" 
                                        :key="index"
                                        :label="item.paramSname"
                                        :value="item.paramValue"
                                      ></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>

                          <el-col :span="12">
                            <el-form-item   :label="$t('toDoTasks.checkHomePhone')"   ><!-- 家庭电话核查 -->
                                <el-select v-model="detaileForm1.checkHomePhone"  disabled placeholder="">
                                  <el-option 
                                      v-for="(item,index) in checkHomePhoneArr" 
                                      :key="index"
                                      :label="item.paramSname"
                                      :value="item.paramValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="12">
                            <el-form-item   :label="$t('toDoTasks.checkUnit')"    ><!-- 公司电话核查 -->
                                <el-select v-model="detaileForm1.checkUnit" disabled placeholder="">
                                    <el-option 
                                        v-for="(item,index) in checkUnitArr" 
                                        :key="index"
                                        :label="item.paramSname"
                                        :value="item.paramValue"
                                      ></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>

                          <el-col :span="12">
                            <el-form-item :label="$t('toDoTasks.checkUnitPhone')"  ><!-- 公司电话核查结果 -->
                                <el-select v-model="detaileForm1.checkUnitPhone" disabled placeholder="">
                                    <el-option 
                                        v-for="(item,index) in checkUnitPhoneArr" 
                                        :key="index"
                                        :label="item.paramSname"
                                        :value="item.paramValue"
                                      ></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="12">
                            <el-form-item   :label="$t('toDoTasks.zmrdhhc')"   ><!-- 证明人电话核查 -->
                               <el-select v-model="detaileForm1.checkCertifierPhone" disabled placeholder="">
                                  <el-option 
                                      v-for="(item,index) in checkCertifierPhoneArr" 
                                      :key="index"
                                      :label="item.paramSname"
                                      :value="item.paramValue"
                                    ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>

                          <el-col :span="12">
                            <el-form-item :label="$t('toDoTasks.zmrhc')"><!-- 证明人核查 -->
                                 <el-select v-model="detaileForm1.checkCertifier" disabled>
                                    <el-option value="" :label="$t('toDoTasks.pleaseChose')" placeholder=""></el-option><!-- 请选择 -->
                                    <el-option 
                                        v-for="(item,index) in checkCertifierArr" 
                                        :key="index"
                                        :label="item.paramSname"
                                        :value="item.paramValue"
                                      ></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                      </el-row>
                      <el-form-item  :label="$t('toDoTasks.checkExplain')"      prop="checkExplain"><!-- 电话核查说明 -->
                            <el-input type="textarea" v-model="detaileForm1.checkExplain" maxlength="100" show-word-limit disabled></el-input>
                      </el-form-item>
                  </el-form>
                </div>
                <!-- 审批信息 -->
                <div v-if="flag==4"> 
                    	<el-table :data="tableData" border style="width: 100%"   size='small' :empty-text="$t('noData')">
                          <!--序号-->
                          <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                          <!--审批岗位-->
                          <el-table-column prop="activityName" :label="$t('toDoTasks.activityName')"  align="center" min-width="215px"> </el-table-column>
                          <!--审批人员-->
                          <el-table-column prop="userName" :label="$t('toDoTasks.userName')"  align="center"  min-width="190px"> </el-table-column>
                          <!--处理日期-->
                          <el-table-column prop="doneDate" :label="$t('doDate')"  align="center"  min-width="130px">  </el-table-column>
                          <!--处理时间-->
                          <el-table-column prop="doneTime" :label="$t('doTime')"  align="center"  min-width="140px"> </el-table-column>
                          <!--审批结果-->
                          <el-table-column prop="handleResult" :label="$t('toDoTasks.handleResult')"  align="center"  min-width="240px">
                          </el-table-column>
                          <!--审批说明-->
                          <el-table-column prop="handleDesc" :label="$t('toDoTasks.approvalNote')"  align="center"  min-width="150px"> </el-table-column>
                      </el-table>
                </div>

                <!-- 审批历史信息 -->
                <div v-if="flag==5"> 
                    	<el-table :data="tableData1" border style="width: 100%"   size='small' :empty-text="$t('noData')">
                          <!--序号-->
                          <el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="135px"></el-table-column>
                          <!-- 申请件编号 -->
                          <el-table-column prop="applyId"  :label="$t('toDoTasks.applyId')" align="center"  min-width="160px"></el-table-column>
                          <!--审批岗位-->
                          <el-table-column prop="activityName" :label="$t('toDoTasks.activityName')"  align="center"  min-width="230px"> </el-table-column>
                          <!--审批人员-->
                          <el-table-column prop="userName" :label="$t('toDoTasks.userName')"  align="center"  min-width="180px"> </el-table-column>
                          <!--处理日期-->
                          <el-table-column prop="doneDate" :label="$t('doDate')"  align="center"  min-width="135px"> </el-table-column>
                          <!--处理时间-->
                          <el-table-column prop="doneTime" :label="$t('doTime')"  align="center"  min-width="120px"></el-table-column>
                          <!--审批结果-->
                          <el-table-column prop="handleResult" :label="$t('toDoTasks.handleResult')"  align="center"  min-width="230px"> 
                          </el-table-column>
                          <!--审批说明-->
                          <el-table-column prop="handleDesc" :label="$t('toDoTasks.approvalNote')"  align="center"  min-width="130px"> </el-table-column>
                      </el-table>
                </div>
              
              
          </el-dialog>
          <!--弹框页面结束-->
    </div>
</div>
</template>

<script>
export default {
  name: 'LoanDealTask',
  data () {
    return {
      row:this.$store.state.loanTaskData,
      loanType:'2',//2单笔单批 3是随借随还
      disbled:true, //
      dialogFormVisible:false, //弹框
      flag:0,
      loanForm:{ 
        applyId:'', //申请件编号
        applyType:'', //业务类型
        productName:'', //产品名称
        applyAmount:'', //授信额度
        applyUserName:'', //申请人姓名
        applyUserPhoneNumber:'', //手机号
        applyIdcardType:'', //证件类型
        applyIdcardTypeValue:'', //证件号码
        aftificialInfo:'', //转人工
        blackInfo:'', //退回
      },
      isShowThReson:false,
      loanForm1:{ //电话核查
          checkLiaisonPhone:'', //联系人电话核查
          checkLiaison:'', //联系人核查
          checkUnit:'', //公司电话核查
          checkUnitPhone:'', //公司电话核查结果
          checkHomePhone:'', //家庭电话核查
          checkPhoneNum:'', //申请人手机号核查
          checkCertifierPhone:'', //证明人电话核查
          checkCertifier:'', //证明人核查
          checkExplain:'', //电话检查说明
          id: '',
          handleResult:'',//审批结果
          handleDesc:'',//审批说明
          handleResultState:'',
          handleResultName:'',

      },
      loanStep:[ //查看详情的步骤
          {id:'1',name: i18n.t('toDoTasks.applyInformation')},//申请件信息
          {id:'2',name:i18n.t('toDoTasks.imageAccessChild')},//附件影像调阅
          {id:'3',name:i18n.t('toDoTasks.creditInvestigation')},//征信调阅
          {id:'4',name:i18n.t('toDoTasks.phoneCheckInformation')},	//电话核查信息
          {id:'5',name:i18n.t('toDoTasks.approvalInformation')},	//审批信息
          {id:'6',name:i18n.t('toDoTasks.approvalHistory')},//历史审批记录
      ], 
      title:'', //弹框title
      activeName:'first',
      detaileForm:{ //申请件信息
        applyId:'', //申请件编号
        applyUserName:'', //客户姓名
        birthday:'', //出生日期
        applyIdcardType:'', //证件类型
        applyIdcardTypeValue:'', //证件号码
        applyUserEducationIdName:'', //学历名称
        applyUserPhoneNumber:'', //手机号
        applyHousingAddDetailed:'', //家庭地址
        applyHousingZipCode:'', //邮编
        applyCompanyName:'', //公司名称
        applyCompanyPost:'', //职位
        applyCompanyAddDetailed:'', //公司地址
        applyCompanyNameZipCode:'', //邮编
        applyRelationName:'', //联系人姓名
        applyRelatin:'', //与联系人关系
        applyRelationTelephone:'', //联系人电话
      },
      detaileForm1:{ //电话核查信息
        updateUser:'', //电话检查人员
        checkLiaisonPhone:'', //联系人电话核查
        checkLiaison:'', //联系人检查
        checkUnit:'', //公司电话核查
        checkUnitPhone:'', //公司电话核查结果
        checkHomePhone:'', //家庭电话核查
        checkPhoneNum:'', //申请人手机号核查
        checkCertifierPhone:'', //证明人电话核查
        checkCertifier:'', //证明人核查
        checkExplain:'', //电话检查说明
      },
      tableData:[],
      tableData1:[], //审批历史信息
      
      applyIdcardTypeArr:[],//证件类型
      handleResultStateArr:[],
      checkLiaisonPhoneArr:[], //联系人电话核查
      checkLiaisonArr:[], //联系人核查
      checkUnitArr:[], //公司电话核查
      checkUnitPhoneArr:[], //公司电话核查结果
      checkHomePhoneArr:[], //家庭电话核查
      checkPhoneNumArr:[], //申请人手机号核查
      checkCertifierPhoneArr:[], //证明人电话核查
      checkCertifierArr:[], //证明人核查
      applyUserEducationIdNameArr:[],//学历
      creditReport: '',
      disabled:false//按钮防抖
    }
  },
  created(){
  },
  mounted(){
    this.getSelectData();
    if( this.row.bussinessType == '2'){
       this.initLoanDbdpData() //单笔单批
    }else if(this.row.bussinessType == '3'){
       this.initLoanSjshData() //随借随还
    }
  },
  methods:{
      selectModel(val){
        this.handleResultStateArr.forEach( res =>{
            if(res.paramValue==val){
              this.loanForm1.handleResultName = res.paramSname
            }
        })

      },
      creditReporting(){
				var obj={
					cCertificatesNumber:this.loanForm.applyIdcardTypeValue, //证件号码
				}
				this.$post(this.$approve + "/cardworkbench/creditInvestigation",obj).then(res=>{
					if(res.code=="000000"){
            this.creditReport = res.data
					}
				})
			},
      //获取单笔单批反显信息
      initLoanDbdpData(){
        if (this.$refs['loanForm1']!==undefined) {
            this.$refs['loanForm1'].resetFields();
        }
        var FunMsgData={
          "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
          "applyId":this.row.applyId, //申请件编号
        }
        this.$post(this.$approve + '/handlerSingleSelect',FunMsgData).then(res=>{
          if(res.code=="000000"){
                var  data = res.data;
                if( data.applyInfo !=null){
                    this.detaileForm = data.applyInfo; //查看详情申请件信息
                    this.loanForm = data.applyInfo;//申请件信息
                    this.loanForm.applyType = this.row.bussinessName
                }
                if( data.phoneInfo !=null){
                      this.detaileForm1 = data.phoneInfo; //查看详情申请件信息
                      this.loanForm1 = data.phoneInfo; //电话核查
                }

                if(data.blackInfo !=null){//退回
                  this.isShowThReson = true;
                  this.loanForm.blackInfo = data.blackInfo.handleDesc //退回
                }

                if(data.aftificialInfo !=null){ //转人工
                    this.loanForm.aftificialInfo = data.aftificialInfo.handleDesc  //转人工
                }

          }
        })
      },
      //获取随借随还反显信息
      initLoanSjshData(){
        if (this.$refs['loanForm1']!==undefined) {
            this.$refs['loanForm1'].resetFields();
        }
        var FunMsgData={
          "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
          "applyId":this.row.applyId, //申请件编号
        }
        this.$post(this.$approve + '/handlerSjshSelect',FunMsgData).then(res=>{
          if(res.code=="000000"){
                var  data = res.data;
                if( data.applyInfo !=null){
                    this.detaileForm = data.applyInfo; //查看详情申请件信息
                    this.loanForm = data.applyInfo;//申请件信息

                    this.loanForm.productName =  data.applyInfo.prodName;
                    this.loanForm.applyUserName =  data.applyInfo.applicantName;
                    this.loanForm.applyAmount =  data.applyInfo.applyCreeditLimit;
                    this.loanForm.applyIdcardTypeValue =data.applyInfo.idNum
                    this.loanForm.applyIdcardType =  data.applyInfo.idType;
                    this.loanForm.applyUserName =data.applyInfo.appplicantName
                    this.loanForm.applyUserPhoneNumber =data.applyInfo.phoneNum

                    this.detaileForm.applyUserBirth =data.applyInfo.birthday
                    this.detaileForm.applyUserName =  data.applyInfo.applicantName;
                    this.detaileForm.applyUserEducationIdName =  data.applyInfo.highestDegree;
                    this.detaileForm.applyHousingZipCode =  data.applyInfo.livePostCode
                    this.detaileForm.applyCompanyName =  data.applyInfo.workUnit
                    this.detaileForm.applyHousingAddDetailed =  data.applyInfo.liveAddress
                    this.detaileForm.applyCompanyPost =  data.applyInfo.workPosition
                    this.detaileForm.applyCompanyAddDetailed =  data.applyInfo.workAddress
                    this.detaileForm.applyCompanyNameZipCode =  data.applyInfo.workPostCode
                    this.detaileForm.applyRelationName =  data.applyInfo.liaisonName
                    this.detaileForm.applyRelatin =  data.applyInfo.liaisonRelation
                    this.detaileForm.applyRelationTelephone =  data.applyInfo.liaisonPhone
                    this.detaileForm.applyIdcardType =  data.applyInfo.idType;

                    this.loanForm.applyType = this.row.bussinessName
                }
                if( data.phoneInfo !=null){
                      this.detaileForm1 = data.phoneInfo; //查看详情申请件信息
                      this.loanForm1 = data.phoneInfo;
                }

                if(data.blackInfo !=null){//退回
                  this.isShowThReson =true;
                  this.loanForm.blackInfo = data.blackInfo.handleDesc //退回
                }

                if(data.aftificialInfo !=null){ //转人工
                    this.loanForm.aftificialInfo = data.aftificialInfo.handleDesc  //转人工
                }
          }
        })
      },
      // 监听标签变化
      watchTag(){
          const list = this.$store.state.tagList;
          const curItem = list.filter(item => {
              return item.path === this.$route.fullPath;
          })
          let index = list.indexOf(curItem)
          list.splice(index,1);
      },
      //提交 单笔单批
      submitLoanDbdp(formName){
         
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var FunMsgData={
                "taskId":this.row.taskId, //任务ID
                "userId":this.$store.state.loginData.userLogin.loginId,
                "handleResult":this.loanForm1.handleResult, //审批结果
                "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
                "applyId":this.row.applyId, //申请件编号
                //电话核查
                "phoneCheck":{ 
                  "updateUser":this.detaileForm1.updateUser,//电话核查人员
                  "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
                  "applyId":this.row.applyId, //申请件编号
                  "checkExplain":this.loanForm1.checkExplain, //电话检查说明
                  "checkCertifier":this.loanForm1.checkCertifier,
                  "checkCertifierPhone":this.loanForm1.checkCertifierPhone,
                  "checkPhoneNum":this.loanForm1.checkPhoneNum,
                  "checkHomePhone":this.loanForm1.checkHomePhone,
                  "checkUnitPhone":this.loanForm1.checkUnitPhone,
                  "checkUnit":this.loanForm1.checkUnit,
                  "checkLiaison":this.loanForm1.checkLiaison,
                  "checkLiaisonPhone":this.loanForm1.checkLiaisonPhone,
                  "id":this.loanForm1.id,
                },
                //审批历史
                "singleWfHis":{ 
                    "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
                    "legalPersonName":this.$store.state.loginData.userLogin.legalPersonName,//法人编号
                    "applyId":this.row.applyId, //申请件编号
                    "processInstanceId":this.row.processInstanceId,  //流程实力ID
                    "taskId":this.row.taskId, //任务ID
                    "activityId":this.row.activityId, //当前节点ID
                    "activityName":this.row.activityName,//当前节点名称
                    "userOrgNo":this.$store.state.loginData.userLogin.branchId, //登录人审批机构
                    "userOrgName":this.$store.state.loginData.userLogin.branchName,//审批机构名称
                    "userId":this.$store.state.loginData.userLogin.loginId,
                    "userName":this.$store.state.loginData.userLogin.userName,
                    "handleResult":this.loanForm1.handleResult,
                    "handleDesc":this.loanForm1.handleDesc,
                    "reasonId":this.loanForm1.handleResultState,
                    "reasonName":this.loanForm1.handleResultName ,
                    "peopleResource":this.row.peopleResource
                }
            }
            this.disabled = true;
            this.$post(this.$approve + '/HandleSingleExamCommit',FunMsgData).then(res=>{
                if(res.code=="000000"){
                    if (this.$refs[formName]!==undefined) {
                        this.$refs[formName].resetFields();
                    }
                    this.loanForm1.checkExplain = ''
                    this.$alert( i18n.t('toDoTasks.SuccessfulSubmission'), '', {//提交成功
                        confirmButtonText: i18n.t('OK'),//确定
                        callback: action => {
                           this.$router.push('/MainIndex/loanElimimate?id=1');
                           this.watchTag();
                        }
                      });
                }else{
                  var str = `
                    <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                    <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
                  `
                  this.$alert(str, i18n.t('toDoTasks.FailureSubmission'), {//提交失败
                    confirmButtonText: i18n.t('OK'),//确定
                    callback: action => {
                        this.$router.push('/MainIndex/loanElimimate?id=1');
                        this.watchTag();
                    }
                  });
                 
                }
            })

          }
        })
      },
      //提交 随借随还
      submitLoanSjsh(formName){
          this.$refs[formName].validate((valid) => {
           if (valid) {
              var FunMsgData={
                  "taskId":this.row.taskId, //任务ID
                  "userId":this.$store.state.loginData.userLogin.loginId,
                  "handleResult":this.loanForm1.handleResult, //审批结果
                  "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
                  "applyId":this.row.applyId, //申请件编号
                  //电话核查
                  "phoneCheck":{ 
                    "updateUser":this.detaileForm1.updateUser,//电话核查人员
                    "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
                    "applyId":this.row.applyId, //申请件编号
                    "checkExplain":this.loanForm1.checkExplain, //电话检查说明
                    "checkCertifier":this.loanForm1.checkCertifier,
                    "checkCertifierPhone":this.loanForm1.checkCertifierPhone,
                    "checkPhoneNum":this.loanForm1.checkPhoneNum,
                    "checkHomePhone":this.loanForm1.checkHomePhone,
                    "checkUnitPhone":this.loanForm1.checkUnitPhone,
                    "checkUnit":this.loanForm1.checkUnit,
                    "checkLiaison":this.loanForm1.checkLiaison,
                    "checkLiaisonPhone":this.loanForm1.checkLiaisonPhone,
                    "id":this.loanForm1.id
                  },
                  //审批历史
                  "sjshWfHis":{ 
                      "legalPersonName":this.$store.state.loginData.userLogin.legalPersonName,//法人编号
                      "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
                      "applyId":this.row.applyId, //申请件编号
                      "processInstanceId":this.row.processInstanceId,  //流程实力ID
                      "taskId":this.row.taskId, //任务ID
                      "activityId":this.row.activityId, //当前节点ID
                      "activityName":this.row.activityName,//当前节点名称
                      "userOrgNo":this.$store.state.loginData.userLogin.branchId, //登录人审批机构
                      "userOrgName":this.$store.state.loginData.userLogin.branchName,//审批机构名称
                      "userId":this.$store.state.loginData.userLogin.loginId,
                      "userName":this.$store.state.loginData.userLogin.userName,
                      "handleResult":this.loanForm1.handleResult,
                      "handleDesc":this.loanForm1.handleDesc,
                      
                      "reasonId":this.loanForm1.handleResultState,
                      "reasonName":this.loanForm1.handleResultName,

                      "peopleResource":this.row.peopleResource
                  }
              }
              this.disabled = true;
              this.$post(this.$approve + '/HandleSjshExamCommit',FunMsgData).then(res=>{
                  if(res.code=="000000"){
                      if (this.$refs[formName]!==undefined) {
                          this.$refs[formName].resetFields();
                      }
                      this.loanForm1.checkExplain = ''
                      this.$alert(i18n.t('toDoTasks.SuccessfulSubmission'), '', {
                        confirmButtonText: i18n.t('OK'),//确定
                        callback: action => {
                           this.$router.push('/MainIndex/loanElimimate?id=1');
                           this.watchTag();
                        }
                      });
                   
                  }else{
                    var str = `
                      <p>${i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                      <p>${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
                    `
                    this.$alert(str, i18n.t('toDoTasks.FailureSubmission'), {
                      confirmButtonText: i18n.t('OK'),//确定
                      callback: action => {
                          this.$router.push('/MainIndex/loanElimimate?id=1');
                          this.watchTag();
                      }
                    });
                  }
              })
           
           }
        })
      },  
      // 获取单笔单批审批信息
      getSingleWfHisList(){
          var FunMsgData={
            "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
            "applyId":this.row.applyId, //申请件编号
          }
          this.$post(this.$approve + '/SingleWfHisList',FunMsgData).then(res=>{
            if(res.code=="000000"){
                  var  data = res.data;
                  data.filter(item =>{
                     if(item.handleResult == 4 ){
                        item.handleResult = i18n.t('toDoTasks.zhuanrengong')//转人工
                     }else if(item.handleResult == 3){
                         item.handleResult = i18n.t('toDoTasks.bohui')//驳回
                     }else if(item.handleResult == 2){
                         item.handleResult = i18n.t('toDoTasks.return')//退回
                     }else if(item.handleResult == 1){
                         item.handleResult = i18n.t('toDoTasks.adopt')//通过
                     }else if(item.handleResult == 0){
                         item.handleResult = i18n.t('toDoTasks.refuse')//拒绝
                     }
                  })
                  this.tableData = data;
            }
          })
      },
      // 获取随借随还审批信息
      getSjshList(){
          var FunMsgData={
            "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
            "applyId":this.row.applyId, //申请件编号
          }
          this.$post(this.$approve + '/SjshWfHisList',FunMsgData).then(res=>{
            if(res.code=="000000"){
                  var  data = res.data;
                  data.filter(item =>{
                     if(item.handleResult == 4 ){
                        item.handleResult =  i18n.t('toDoTasks.zhuanrengong')//转人工
                     }else if(item.handleResult == 3){
                         item.handleResult =  i18n.t('toDoTasks.bohui')//驳回
                     }else if(item.handleResult == 2){
                         item.handleResult = i18n.t('toDoTasks.return')//退回
                     }else if(item.handleResult == 1){
                         item.handleResult = i18n.t('toDoTasks.adopt')//通过
                     }else if(item.handleResult == 0){
                         item.handleResult = i18n.t('toDoTasks.refuse')//拒绝
                     }
                  })
                  this.tableData = data;
            }
          })
      },
      //获取单笔单批审批历史信息
      singleHisByCardNo(){
           var FunMsgData={
            "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
            "cardNo":this.loanForm.applyIdcardTypeValue, //证件号码
          }
          this.$post(this.$approve + '/singleHisByCardNo',FunMsgData).then(res=>{
            if(res.code=="000000"){
                  var  data = res.data;
                  data.filter(item =>{
                     if(item.handleResult == 4 ){
                        item.handleResult = i18n.t('toDoTasks.zhuanrengong')//转人工
                     }else if(item.handleResult == 3){
                         item.handleResult = i18n.t('toDoTasks.bohui')//驳回
                     }else if(item.handleResult == 2){
                         item.handleResult = i18n.t('toDoTasks.return')//退回
                     }else if(item.handleResult == 1){
                         item.handleResult = i18n.t('toDoTasks.adopt')//通过
                     }else if(item.handleResult == 0){
                         item.handleResult = i18n.t('toDoTasks.refuse')//拒绝
                     }
                  })
                  this.tableData1 = data;
            }
          })
      },
      // 获取随借随还审批历史信息
      sjshHisByCardNo(){
          
           var FunMsgData={
            "legalPersonNum":this.$store.state.loginData.userLogin.legalPersonNum,//法人编号
            "cardNo":this.loanForm.applyIdcardTypeValue, //证件号码
          }
          
          this.$post(this.$approve + '/sjshHisByCardNo',FunMsgData).then(res=>{
            if(res.code=="000000"){
                  var  data = res.data;
                  data.filter(item =>{
                     if(item.handleResult == 4 ){
                        item.handleResult = i18n.t('toDoTasks.zhuanrengong')//转人工
                     }else if(item.handleResult == 3){
                         item.handleResult = i18n.t('toDoTasks.bohui')//驳回
                     }else if(item.handleResult == 2){
                         item.handleResult = i18n.t('toDoTasks.return')//退回
                     }else if(item.handleResult == 1){
                         item.handleResult = i18n.t('toDoTasks.adopt')//通过
                     }else if(item.handleResult == 0){
                         item.handleResult = i18n.t('toDoTasks.refuse')//拒绝
                     }
                  })
                  this.tableData1 = data;
            }
          })
      },
      //打开步骤详情
      openDtaile(i){
        this.dialogFormVisible = true;
        this.flag = i;
        var _this =this
        switch(i) {
            case 0:
                this.title = i18n.t('toDoTasks.applyInformation')//'申请件信息'
                break;
            case 1:
                this.title = i18n.t('toDoTasks.imageAccess')//'影像调阅'
                break;
            case 2:
                this.title = i18n.t('toDoTasks.creditInvestigation')//'征信调阅'
                this.creditReporting()
                break;
            case 3:
                this.title = i18n.t('toDoTasks.phoneCheckInformation')//'电话核查信息'
                break;
            case 4:
                this.title = i18n.t('toDoTasks.approvalInformation')//'审批信息'
                  if( _this.row.bussinessType == '2'){
                     _this.getSingleWfHisList();
                  }else if(_this.row.bussinessType == '3'){
                     _this.getSjshList() //随借随还
                  }
            break;
            case 5:
                this.title = i18n.t('toDoTasks.approvalHistory')//'历史审批记录'
                if( _this.row.bussinessType == '2'){
                    _this.singleHisByCardNo();//单笔单批
                }else if(_this.row.bussinessType == '3'){
                    _this.sjshHisByCardNo() //随借随还
                }
            break;
        } 
      },
      // 初始化参数
      getSelectData(){
         //学历
        var param={
          "paramCode":'EDUCATION_TYPE',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
          if(res.returnCode=="000000"){
             this.applyUserEducationIdNameArr =res.returnData
          }
        })
        //证件类型
        var param={
          "paramCode":'CARD_TYPE',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
          if(res.returnCode=="000000"){
             this.applyIdcardTypeArr =res.returnData
          }
        })

        
        var param={
          "paramCode":'LOAN_REASON_ID',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
          if(res.returnCode=="000000"){
             this.handleResultStateArr =res.returnData
          }
        })

        var param1={
          "paramCode":'CHECK_LIAISON_PHONE',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param1).then(res=>{
          if(res.returnCode=="000000"){
             this.checkLiaisonPhoneArr =res.returnData
          }
        })
        var param2={
          "paramCode":'CHECK_LIAISON',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param2).then(res=>{
          if(res.returnCode=="000000"){
             this.checkLiaisonArr =res.returnData
          }
        })
        var param3={
          "paramCode":'CHECK_UNIT',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param3).then(res=>{
          if(res.returnCode=="000000"){
             this.checkUnitArr =res.returnData
          }
        })
        var param41={
          "paramCode":'CHECK_UNIT_PHONE',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param41).then(res=>{
          if(res.returnCode=="000000"){
             this.checkUnitPhoneArr =res.returnData
          }
        })
        var param4={
          "paramCode":'CHECK_HOME_PHONE',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param4).then(res=>{
          if(res.returnCode=="000000"){
             this.checkHomePhoneArr =res.returnData
          }
        })
         var param5={
          "paramCode":'CHECK_PHONE_NUM',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param5).then(res=>{
          if(res.returnCode=="000000"){
             this.checkPhoneNumArr =res.returnData
          }
        })
         var param6={
          "paramCode":'CHECK_CERTIFIER_PHONE',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param6).then(res=>{
          if(res.returnCode=="000000"){
             this.checkCertifierPhoneArr =res.returnData
          }
        })
         var param7={
          "paramCode":'CHECK_CERTIFIER',
        }
        this.$post(this.$api + '/paramValues/findByParamCode',param7).then(res=>{
          if(res.returnCode=="000000"){
             this.checkCertifierArr =res.returnData
          }
        })
      },
      //取消
      cancel(){
          this.dialogFormVisible = false;
          if (this.$refs['addForm']!==undefined) {
            this.$refs['addForm'].resetFields();
          }
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
  }
}
</script>
<style lang='scss'>
#loantask{
	.el-dialog {
    width:80%!important;
    .el-dialog__body{
          min-height: 300px;
    }
  }
  .el-select{
    width: 100%!important;
  }
}

</style>

<style scoped lang='scss'>
.line{
  border-bottom: 1px solid ;
}
.home{
    height: 100%;
    background: #fff;
    .home_main{
        height: 100%;
        max-width:1300px;
        background: #fff;
        padding:40px 50px 40px 50px;
      .home_con{
        padding: 40px;
        border: 1px solid #aaa;
        border-radius: 8px;
      }
    }
}
.loan_title{
  line-height: 70px;
  text-align: center;
  color: #333;
  font-size: 18px;
  font-weight: normal;
}
.loanStep{
  width: 100%;
  li{
    width: 16.66666%;
    border: 1px solid $bordercolor;
    text-align: center;
    float: left;
    box-sizing: border-box;
    line-height: 50px;
    margin-left: -1px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>

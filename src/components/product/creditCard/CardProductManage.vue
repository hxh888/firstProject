<template>
  <!-- 信用卡产品管理 -->
  <div class="content_box" id="pm_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >信用卡</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >信用卡产品管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <el-row class="edit_module_search">
					<el-col :span="10">
            <div>
						  <el-input placeholder="请输入产品名称" v-model="query" name="query" @input="onChangequery()"> <!--请输入产品名称  -->
						      <template slot="prepend">产品名称</template>    <!-- 产品名称 -->
						  </el-input>
						</div>
          </el-col>
          <el-col :span="14">
			  		<div class="edit_module_btn">
			  			<el-button type="warning" icon="el-icon-search" @click="productManageSearch()" >查询</el-button>  <!--查询按钮-->
			  			<el-button type="primary" icon="el-icon-plus"  @click="xdProductAdd('addForm')">新增</el-button> <!--新增按钮-->
			  		</div>
			  	</el-col>
        </el-row>  
    </div>

	<!-- 列表模块 -->
	<div class="list_module">
		<div class="table_body">
				<h4>产品列表</h4>
				<el-table :data="tableData" border style="width: 100%"   size='small'>
						<el-table-column prop="index" type="index" :label="$t('Serial_number')" align="center" width="60px"></el-table-column><!--序号-->

						<el-table-column prop="bizAllName" label="产品名称"  align="center" > </el-table-column><!--产品名称-->

						<el-table-column prop="cardId" label="产品编号"  align="center"> </el-table-column><!--产品编号-->

						<el-table-column prop="bizTypeCode" label="产品代码"  align="center"> </el-table-column><!--产品代码-->

						<el-table-column prop="prodTypeFlag" label="产品类型"  align="center"> </el-table-column><!--产品类型-->
						
            <el-table-column label="操作" align="center" width="180px">
							<template slot-scope="scope">
                  <el-button size="mini" type="pramary" class="plus-btn" @click="moneyInfo(scope.row)">
                    <i class="el-icon-menu"></i>
                    <span class="text">电话核查模板管理</span>
                  </el-button>
                  <el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
                    <i class="el-icon-edit"></i>
                    <span class="text">编辑</span>
                  </el-button>
									<el-button size="mini" type="danger"  class="delete-btn" @click="deleteItem(scope.row)">
										<i class="el-icon-delete"></i>
										<span class="text">删除</span>
									</el-button>
							</template>
						</el-table-column>

				</el-table>
			  <el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[5, 10, 15, 20,25]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="totalCount"
							>
					</el-pagination>
			</div>
	</div>
	<!--弹框页面开始-->
	<el-dialog title="新增产品授信额度" :visible.sync="dialogFormVisible"  :before-close="cancel"  :close-on-click-modal="false" class="clearfix">
    <ul class="nav_tabs nav_tabs fl">
      <li  :class=" showContent == 1 ?'active':' '">基础参数</li>
      <li  :class=" showContent == 2 ?'active':' '">关联参数</li>
      <li  :class=" showContent == 3 ?'active':' '">资料清单</li>
      <li  :class=" showContent == 4 ?'active':' '">产品卡面</li>
    </ul>
    <div class="fr nav_con">
        <!-- 基础参数 -->
        <el-form :model="baseForm" :rules="rules" ref="baseForm" label-width="130px" v-if="showContent ==1 ">
          <el-row>
            <el-col :span="12">
                <el-form-item label="产品代码" prop="bizTypeCode">    
                  <el-input  v-model.number="baseForm.bizTypeCode"></el-input>      <!-- 产品代码 -->
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品编号" prop="cardId">    
                  <el-input v-model.number="baseForm.cardId"></el-input>      <!-- 产品编号 -->
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品名称" prop="bizAllName">    
                  <el-input v-model="baseForm.bizAllName"></el-input>      <!-- 产品名称 -->
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="主附卡标识" prop="bizTypeFlag">
                  <el-select v-model="baseForm.bizTypeFlag" placeholder="请选择">    <!-- 主附卡标识 -->
                    <el-option v-for="(item,index) in BIZTypeFlag" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
                  </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="产品类型" prop="prodTypeFlag">
                  <el-select v-model="baseForm.prodTypeFlag" placeholder="请选择">    <!-- 产品类型 -->
                    <el-option label="公务卡" value="0"></el-option>
                    <el-option label="普通卡" value="1"></el-option>
                    <el-option label="联名卡" value="2"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item  style="opacity:0;">
                  <el-input  ></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="卡片等级" prop="bizCardGrade">
                  <el-select v-model="baseForm.bizCardGrade" placeholder="请选择">    <!-- 卡片等级 -->
                    <el-option v-for="(item,index) in BIZCardGrade" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
                  </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="货币标识" prop="proCurryFlag">
                  <el-select v-model="baseForm.proCurryFlag" placeholder="请选择">    <!-- 货币标识 -->
                     <el-option v-for="(item,index) in PROCurryFlag" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
                  </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="本币代码" prop="proCatCurrCode" v-if="baseForm.proCurryFlag==1||baseForm.proCurryFlag==2"> 
                  <el-select v-model="baseForm.proCatCurrCode" placeholder="请选择">    <!-- 本币代码 -->
                    <el-option v-for="(item,index) in PROCatCurrCode" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
                  </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12" v-if="baseForm.proCurryFlag==1">
                <el-form-item  style="opacity:0;">
                  <el-input  ></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12" v-if="baseForm.proCurryFlag==3">
                <el-form-item  style="opacity:0;">
                  <el-input  ></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="外币代码" prop="proCatDualCurrCode" v-if="baseForm.proCurryFlag==3||baseForm.proCurryFlag==2">
                  <el-select v-model="baseForm.proCatDualCurrCode" placeholder="请选择">    <!-- 外币代码 -->
                    <el-option v-for="(item,index) in PROCatCurrCode" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
                  </el-select>
                </el-form-item>
            </el-col>
          
            <el-col :span="12">
                <el-form-item label="是否启用" prop="bizOther1">
                  <el-select v-model="baseForm.bizOther1" placeholder="请选择">    <!-- 是否启用 -->
                      <el-option v-for="(item,index) in YESNO" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
                  </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="产品品牌" prop="bizCardBrand">
                  <el-select v-model="baseForm.bizCardBrand" placeholder="请选择">    <!-- 产品品牌 -->
                      <el-option v-for="(item,index) in BIZCardBrand" 
														:key="index" 
														:label="item.bizTypePropName" 
														:value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
                  </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item label="产品简介" prop="bizCardDesc">
                  <el-input type="textarea" v-model="baseForm.bizCardDesc"></el-input>  <!-- 产品简介 -->
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item label="特色功能" prop="bizCardFeature">
                  <el-input type="textarea" v-model="baseForm.bizCardFeature"></el-input>  <!-- 特色功能 -->
                </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item class="step">
                <el-button @click="cancel()">取 消</el-button>
                <el-button  type="primary" @click="baseNextStep('baseForm')">下一步</el-button>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>

        <!-- 关联参数 -->
        <el-form :model="relevForm" :rules="rules" ref="relevForm" label-width="130px" v-if="showContent ==2">
            <h4>产品工作流配置</h4>
            <el-button  class="mt10" type="primary" size="mini" @click='addProductWorkflowEdit()' >增加配置</el-button> <!-- 增加配置 -->
            <div class="table_height mt10">
              <table aria-describedby="editable-sample_info" class="table" id="week-sample" >
                <thead>
                  <tr role="row">
                    <th colspan="1" rowspan="1" class="text-center sorting"><span	class="red">*</span>渠道类型<!-- 渠道类型--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>使用场景<!-- 使用场景--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>租户	<!-- 租户--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">键值<!-- 键值--></th>
                  </tr>
                </thead>
                <tbody >
                  <tr class="odd" v-for="(groupitem,index) in groupList" :key='index'>

                    <td class="text-center" >  <!-- 渠道类型-->
                      <el-select style="width: 93%!important;" size="mini" v-model="groupitem.appiChannel" placeholder="请选择"  id="appiChannel">
                            <el-option v-for="(item,index) in levelType" 
                              :key="index" 
                              :label="item.bizTypePropName" 
                              :value="item.bizTypePropCode">{{item.bizTypePropName}}
                            </el-option>
                      </el-select>
                    </td>

                    <td class="text-center" >  <!-- 使用场景-->
                      <el-select style="width: 93%!important;" size="mini" v-model="groupitem.autoApproveResult" placeholder="请选择"  id="autoApproveResult">
                            <el-option v-for="(item,index) in levelTypeScene" 
                              :key="index" 
                              :label="item.bizTypePropName" 
                              :value="item.bizTypePropCode">{{item.bizTypePropName}}
                            </el-option>
                      </el-select>
                    </td>

                    <td class="text-center" >  <!-- 租户-->
                      <el-select style="width: 93%!important;" size="mini" v-model="groupitem.tenantId" placeholder="请选择"  id="tenantId">
                            <el-option v-for="(item,index) in levelTypeTenant" 
                              :key="index" 
                              :label="item.bizTypePropName" 
                              :value="item.bizTypePropCode">{{item.bizTypePropName}}
                            </el-option>
                      </el-select>
                    </td>

                    <td class="text-center">  <!-- 键值-->
                        <el-input v-model="groupitem.processDefineKey"  id="processDefineKey"   placeholder="testAAS002"  size="mini"  class="form-control"></el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="mt20">产品表单关联</h4>
            <el-form-item label="表单列表" prop="formModel">
              <el-select v-model="relevForm.formModel" placeholder="请选择" style="width:50%!important;">    <!-- 表单列表 -->
                 <el-option v-for="(item,index) in formModelList" 
                        :key="index" 
                        :label="item.modelName" 
                        :value="item.modelId">{{item.modelName}}
                      </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="step">
              <el-button @click="cancel()">取 消</el-button>
              <el-button  type="primary" @click="showContent = 1 ">上一步</el-button>
              <el-button  type="primary" @click="relevNextStep()">下一步</el-button>
            </el-form-item>
        </el-form>

        <!-- 资料清单 -->
        <div v-if="showContent ==3">
            <div class="fl data_left">
                <el-tree :data="treeData" 
                         :props="defaultProps" 
                          node-key="id" 
                         :default-expanded-keys="[1]"
                         show-checkbox
                         check-strictly
                         @check-change="handleClick"
                         @node-click="handleNodeClick"
                         ref="treeForm" 
                         >
                </el-tree>  
            </div>
            <div class="fl data_right">
                <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="130px" >
                  
                  <el-form-item label="资料清单名称" prop="fileListName">
                      <el-input v-model="dataForm.fileListName" :disabled="true"></el-input>    <!-- 资料清单名称 -->  
                  </el-form-item>
                  
                  <el-form-item label="是否必填" prop="nessFlag">
                    <el-select v-model="dataForm.nessFlag" placeholder="请选择" >    <!-- 是否必填 -->
                      <el-option label="否" value="1"></el-option>
                      <el-option label="是" value="2"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="影像份数" prop="fileNum">
                      <el-input v-model.number="dataForm.fileNum"></el-input>     <!-- 影像份数 -->
                  </el-form-item>

                  <el-form-item class="step">
                    <el-button @click="cancel()">取 消</el-button>
                    <el-button  type="primary" @click="showContent = 2 ">上一步</el-button>
                    <el-button  type="primary" @click="dataNextStep('dataForm')">下一步</el-button>
                  </el-form-item>

                </el-form>
            </div>
        </div>
        <!-- 产品卡面 -->
        <div v-if="showContent ==4 ">
          <el-button  class="mt10" type="primary" size="mini" @click="dialogFormVisible1 = true"> <i class="el-icon-plus"></i>新增</el-button> <!-- 产品工作流配置 -->
          <div class="mt10">
            <div class="table_height mt10">
              <table aria-describedby="editable-sample_info" class="table" id="week-sample" >
                <thead>
                  <tr role="row">
                    <th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">卡面编号<!-- 卡面编号--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">租户	<!-- 卡面名称--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">预览<!-- 预览--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">描述<!-- 描述--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">备注<!-- 备注--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">启用状态<!-- 启用状态--></th>
                    <th colspan="1" rowspan="1" class="text-center sorting">操作<!-- 操作--></th>
                  </tr>
                </thead>
                <tbody >
                  <tr class="odd" v-for="(groupitem,index) in cardFaceList" :key='index'>
                    <td class="text-center ng-binding" >{{index}}</td>

                    <td class="text-center" >  <!-- 卡面编号-->
                        {{groupitem.cardFaceNum}}
                    </td>

                    <td class="text-center" >  <!-- 卡面名称-->
                        {{groupitem.cardFaceName}}
                    </td>

                    <td class="text-center" >  <!-- 预览-->
                       <a class="default" size='mini' @click="showCardFace(this)" >查看</a>
                    </td>

                    <td class="text-center" >  <!-- 描述-->
                        {{groupitem.cardFaceDesc}}
                    </td>

                    <td class="text-center" >  <!-- 备注-->
                        {{groupitem.cardFaceRemark}}
                    </td>

                    <td class="text-center" >  <!-- 启用状态-->
                        {{groupitem.cardFaceStatus}}
                    </td>

                    <td class="text-center">  <!-- 键值-->
                        <el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
                          <i class="el-icon-edit"></i>
                          <span class="text">编辑</span>
                        </el-button>
                        <el-button size="mini" type="danger"  class="delete-btn" >
                          <i class="el-icon-delete"></i>
                          <span class="text">删除</span>
                        </el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div class="mt20 step" >
            <el-button @click="cancel()">取 消</el-button>
            <el-button  type="primary" @click="showContent = 3 ">上一步</el-button>
            <el-button  type="primary" @click="submitAdd()">确定</el-button>
          </div>
        </div>
    </div>
    <div style="clear:both"></div>
    
	
	</el-dialog>
	<!--弹框页面结束-->

  <!--产品卡面-->
	<el-dialog title="产品卡面新增" :visible.sync="dialogFormVisible1"   :close-on-click-modal="false" class="clearfix">
      <el-form :model="cardForm" :rules="rules" ref="cardForm" label-width="130px" >
        <el-row>
          <el-col :span="12">
              <el-form-item label="卡面名称" prop="cardFaceName">    
                <el-input  v-model="cardForm.cardFaceName"></el-input>      <!-- 卡面名称 -->
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="卡面编号" prop="cardFaceNum">    
                <el-input v-model.number="cardForm.cardFaceNum"></el-input>      <!-- 卡面编号 -->
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="是否启用" prop="cardFaceStatus">
                <el-select v-model="cardForm.cardFaceStatus" placeholder="请选择">    <!-- 是否启用 -->
                  <el-option label="未启用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
        
          <el-col :span="12">
              <el-form-item  style="opacity:0;">
                <el-input  ></el-input>
              </el-form-item>
          </el-col>


          <el-col :span="24">
              <el-form-item label="卡面描述" prop="cardFaceDesc">
                <el-input type="textarea" v-model="cardForm.cardFaceDesc"></el-input>  <!-- 卡面描述 -->
              </el-form-item>
          </el-col>

          <el-col :span="24">
              <el-form-item label="卡面备注" prop="cardFaceRemark">
                <el-input type="textarea" v-model="cardForm.cardFaceRemark"></el-input>  <!-- 卡面备注 -->
              </el-form-item>
          </el-col>

          <el-col :span="24">
              <el-form-item label="产品卡面图片" >  <!-- 产品卡面图片 -->
                <el-upload
                  action="http://127.0.0.1:8081/setting/scanUpload"
                  list-type="picture-card"
                  accept="image/*" 
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item class="step">
              <el-button @click="cancel()">取 消</el-button>
              <el-button  type="primary" @click="saveCardForm('cardForm')">保存</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
	</el-dialog>
	<!--产品卡面-->


   <!--电话核查模板管理-->
	<el-dialog title="电话核查模板管理" :visible.sync="dialogFormVisible2"   :close-on-click-modal="false" class="clearfix">
      <div class="table_height">
        <table aria-describedby="editable-sample_info" class="table" id="week-sample" >
          <thead>
            <tr role="row">
              <th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
              <th colspan="1" rowspan="1" class="text-center sorting">话术类型<!-- 话术类型--></th>
              <th colspan="1" rowspan="1" class="text-center sorting">话术内容<!-- 话术内容--></th>
              <th colspan="1" rowspan="1" class="text-center sorting">操作<!-- 操作--></th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd" v-for="(item,index) in moneysList" :key='index'>
              <td class="text-center">{{index+1}}</td>   <!-- 序号-->

              <td class="text-center" >  <!-- 话术类型-->
                <el-select style="width:90% !important;" size="mini" v-model="item.formworkType" placeholder="请选择" >
                  <el-option v-for="(i,index) in caseLevelList" 
                    :key="index" 
                    :label="i.bizTypePropName" 
                    :value="i.bizTypePropCode">{{i.bizTypePropName}}
                  </el-option>
                </el-select>
              </td>

              <td class="text-center">  <!-- 话术内容-->
                <el-input type="textarea" v-model="item.formworkTxt"  size="mini"  class="form-control"></el-input>
              </td> 

              <td class="text-center">  <!-- 操作-->
                	<el-button size="mini" type="danger"  class="delete-btn" @click="delMoney(index)">
										<i class="el-icon-delete"></i>
										<span class="text">删除</span>
									</el-button>
              </td> 
            
            </tr>
          </tbody>
         
        </table>
        <div v-show="flag" class="nomore">
            暂无模板配置
        </div>
		  </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addMoney()">增加模板配置</el-button>
        <el-button type="primary" @click="addBonus()">确 定</el-button>
      </span>
	</el-dialog>
	<!--电话核查模板管理-->


  </div>
</template>

<script>
export default {
  data () {
    return {
      i:0,
			query:"",//查询的参数
			tableData:[],//table数据

			currentPage:1,//当前显示第几页 1开头
      pageSize:5,//一页显示几条数据
			totalCount:0,//一共有多少条数据
      indexNo:0,  //需要传过去的参数
      
      dialogFormVisible: false,//一级新增弹出框是否显示
      dialogFormVisible1:false,//产品卡面弹出框是否显示
      dialogFormVisible2:false,//电话核查模板管理

			groupList:[],//增加岗位限额

      BIZTypeFlag:[],//主附卡标识
      PROCatCurrCode:[],//本币代码、外币代码
      PROCurryFlag:[],//货币标识
      PROUseRate:[],//使用比例
      moneyList:[],//模板信息
      YESNO:[],//是否组
      BIZCardBrand:[],//产品品牌
      BIZCardGrade:[],//卡片等级
      CARDTypeFlag:[],//准贷/贷记卡
      PROPersonCardFlag:[],//个人/公司卡
      levelType:[],//渠道类型
      levelTypeScene:[],//使用场景
      levelTypeTenant:[],//租户

      flag:false,   //是否可输入 默认可以
      edit:false, 	 //编辑标识

      showContent:3,  //下一步显示
	    baseForm: {  //基础参数
        bizTypeCode: '',//产品代码
        cardId:'' ,//产品编号
        bizAllName:'' ,//产品名称
        bizTypeFlag:'' ,//主附卡标识
        prodTypeFlag:'' ,//产品类型
        bizCardGrade:'' ,//卡片等级
        proCurryFlag:'' ,//货币标识
        proCatCurrCode:'' ,//本币代码
        proCatDualCurrCode:'' ,//外币代码
        bizOther1:'' ,//是否启用

        bizCardBrand:'' ,//产品品牌
        bizCardDesc:'' ,//产品简介
        bizCardFeature:'' ,//特色功能
      },
      relevForm: {  //资料参数
        formModel: '',//表单列表
      },
      dataForm: {  //资料参数
        fileListName: '',//资料清单名称
        nessFlag:'', //是否必填
        fileNum:'',//影像份数
      },
      formModelList:[],//步骤二表单列表
      cardFaceList:[], //卡面表格数据
      treeData:[], //树形数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      dialogImageUrl: '',
      dialogVisible: false,
      cardForm:{
          cardFaceName:'',//卡面名称
          cardFaceNum:'',//卡面编号
          cardFaceStatus:'',//是否启用  
          cardFaceDesc:'',//卡面描述
          cardFaceRemark:'',//卡面备注
      },

	    rules:{
        cardFaceName:[
          {required: true, message: '请输入卡面名称' }
        ],cardFaceNum:[
          {required: true, message: '请输入卡面编号' },
          { type: 'number', message: '卡面编号必须为数字值'}
        ],cardFaceStatus:[
          {required: true, message: '请选择是否启用', trigger: 'change' }
        ],cardFaceDesc:[
          {required: true, message: '请输入卡面描述'}
        ],cardFaceRemark:[
          {required: true, message: '请输入卡面备注'}
        ],


        fileListName:[
          {required: true, message: '请选择资料清单名称', trigger: 'change' }
        ],
        nessFlag:[
          {required: true, message: '请选择是否必填', trigger: 'change' }
        ],
        bizTypeCode:[
          { required: true, message: '请输入产品代码'},
          { type: 'number', message: '产品代码必须为数字值'}
        ],
        cardId:[
          { required: true, message: '请输入产品编号'},
          { type: 'number', message: '产品编号必须为数字值'}
        ],
        bizAllName:[
          { required: true,  message: '请输入产品名称'},
        ],
        // bizTypeFlag:[
        //   {required: true, message: '请选择主附卡标识', trigger: 'change' }
        // ],
        // prodTypeFlag:[
        //   {required: true, message: '请选择产品类型', trigger: 'change' }
        // ],
        // bizCardGrade:[
        //   {required: true, message: '请选择卡片等级', trigger: 'change' }
        // ],
        // proCurryFlag:[
        //   {required: true, message: '请选择货币标识', trigger: 'change' }
        // ],
        // proCatCurrCode:[
        //   {required: true, message: '请选择本币代码', trigger: 'change' }
        // ],
        // proCatDualCurrCode:[
        //   {required: true, message: '请选择外币代码', trigger: 'change' }
        // ],
        // bizOther1:[
        //   {required: true, message: '请选择是否启用', trigger: 'change' }
        // ],
        // bizCardBrand: [
        //   { required: true, message: '请选择产品品牌', trigger: 'change'}
        // ],
        // bizCardDesc:[
        //   { required: true,  message: '请输入产品简介' },
        //   { max:250,  message: '最多可输入250个汉字' },
        // ],
        // bizCardFeature:[
        //   { required: true,  message: '请输入特色功能'},
        //   { max: 50, message: '最多可输入50个汉字'},
        // ],
      },
      
      moneysList:[], //话术内容
      caseLevelList:[],//话术类型

      messageCardId:'',
      loginMsg:this.$store.state.loginData
    }
  },
  mounted(){
		this.initProductManageList(); //初始化列表数据
		this.initCodeContent(); //初始化码表内容
  },
  methods:{
	//初始化信用卡产品管理列表
	initProductManageList(){
    var ProductListMsgData2 = {
        "channelNo": "1",
        "transCode": "SETPRODUCT300",
        "businessType" : '0',
        "indexNo":this.indexNo,
        "pageSize":this.pageSize,
    };
		this.$post(this.$api,ProductListMsgData2).then(res=>{
				if(res.returnMsg=="OK"){
          for(var i=0;i<res.rows.length;i++){
              var obj = res.rows[i];
              if(obj.prodTypeFlag == 0){
                obj.prodTypeFlag = '公务卡'
              }else if(obj.prodTypeFlag == 1){
                obj.prodTypeFlag = '普通卡'
              }else if(obj.prodTypeFlag == 2){
                obj.prodTypeFlag = '联名卡'
              }
          };
					this.tableData = res.rows
					this.totalCount = res.totalCount;
				}else{
					this.$message({
						message:res.returnMsg,
						type: 'warning' 
					})
				}
	
		})
		
  },
  //初始化码表内容
	initCodeContent(){
      // 码表-主附卡标识
      var ProductListMsgData4 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "PRO_MC_SC_TYPE"
      };
      this.$post(this.$api, ProductListMsgData4).then(res => {
          this.BIZTypeFlag = res.rows;
      });
      // 码表-本币代码、外币代码
      var ProductListMsgData5 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "CURRENCY"
      };
      this.$post(this.$api, ProductListMsgData5).then(res => {
          this.PROCatCurrCode = res.rows;
      });
      // 码表-货币标识
      var ProductListMsgData6 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "CURRENT_FLAG"
      };
      this.$post(this.$api, ProductListMsgData6).then(res => {
          this.PROCurryFlag = res.rows;
      });
      // 码表-使用比例
      var ProductListMsgData7 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "PMY_CASH_COMP"
      };
      this.$post(this.$api, ProductListMsgData7).then(res => {
          this.PROUseRate = res.rows;
      });
      //模板信息
      var FormWorkListMsgData = {
              "channelNo": "1",
              "transCode": "SETFWMLIST",
          };               
          this.$post(this.$api, FormWorkListMsgData).then(res => {
            this.moneyList = res.formworkList;
          }); 
      // 码表-是否组
      var ProductListMsgData8 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "YES_NO"
      };
      this.$post(this.$api, ProductListMsgData8).then(res => {
          this.YESNO = res.rows;
      });
      // 码表-产品品牌
      var ProductListMsgData9 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "PRODUCT_BRAND"
      };
      this.$post(this.$api, ProductListMsgData9).then(res => {
          this.BIZCardBrand = res.rows;
      });
      // 码表-卡片等级
      var ProductListMsgData10 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "CARD_GRADE"
      };
      this.$post(this.$api, ProductListMsgData10).then(res => {
          this.BIZCardGrade = res.rows;
      });
      // 码表-准贷/贷记卡
      var ProductListMsgData11 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "CREDIT_FLAG"
      };
      this.$post(this.$api, ProductListMsgData11).then(res => {
          this.CARDTypeFlag = res.rows;
      });
      // 码表-个人/公司卡
      var ProductListMsgData12 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "PRO_PERSON_CARD_FLAG"
      };
      this.$post(this.$api, ProductListMsgData12).then(res => {
          this.PROPersonCardFlag = res.rows;
      }); 
      // 渠道类型
      var FunMsgData11 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "APPI_SEND_FLAG"
      };
      this.$post(this.$api,FunMsgData11).then(res => {
           this.levelType = res.rows;
      });
      // 使用场景
      var FunMsgData13 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "PRO_USE_SCENE"
      };
      this.$post(this.$api,FunMsgData13).then(res => {
          this.levelTypeScene = res.rows;
      });
      // 租户
      var FunMsgData16 = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "TEMP_TENANT"
      };
      this.$post(this.$api, FunMsgData16).then(res => {
          this.levelTypeTenant = res.rows;
      });
      // 查询表单列表
      var formModelListData = {
          "channelNo": "1",
          "transCode": "SETBEFORM307"
      };
      this.$post(this.$api, formModelListData).then(res =>  {
          this.formModelList = res.rows;
      });
       // 码表--话术类型
      var formworkTypeData = {
          "channelNo": "1",
          "transCode": "SETPARARGS301",
          "bizTypeCode": "APPI_FORMWORK_TYPE"
      };
      this.$post(this.$api, formworkTypeData).then(res =>  {
          this.caseLevelList = res.rows;
      });
  },
  //查询参数
	productManageSearch(){
		if(this.query != undefined && this.query != ""){
      var ProductListMsgData1 = {
          "channelNo": "1",
          "transCode": "SETPRODUCT300",
          "bizAllName": this.query,
          "businessType" : '0',
          "indexNo": this.indexNo,
          "pageSize":this.pageSize
      };
			this.$post(this.$api,ProductListMsgData1).then( res =>{
				if(res.returnMsg=="OK"){
						this.tableData = res.rows
						this.totalCount = res.totalCount;
				}else{
				    this.tableData = [];
				}
			});
		}else{
			this.initProductManageList();
		}		
  },
  //点击新增按钮
	xdProductAdd(formName) {
		this.dialogFormVisible=true;
		this.edit=false;
  },
  //增加配置
	addProductWorkflowEdit(){
		if (this.groupList == undefined) {
			this.groupList = [{}];
		}else if(this.groupList.length<3){
			this.groupList.splice(0, 0, {});
    }else {
      	this.$message({
          message:'新增不能超过3条',
          type: 'warning' 
        })
		}
	},
  //确定增加
	submitAdd(){
	},
  //获取树节点初始化树
  getTreeObjData(){
    var OrgListMsgData4 = {
        "channelNo": "1",
        "transCode": "SETPROPROMAN302",
        "cardId":this.baseForm.cardId,
        "bizAllName": this.baseForm.bizAllName
    };
    this.$post(this.$api, OrgListMsgData4).then(res=> {
      this.toTree(res.rows)
      this.treeData.push(res.rows[0])
    });
  },
  toTree(data){
      var num = 0 ;
      // 删除 所有 children,以防止多次调用
      data.forEach(function (item) {
          delete item.children;
      });
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function (item) {
          map[item.id] = item;
      });
      var val = [];
      data.forEach(function (item) {
          // 以当前遍历项，的pid,去map对象中找到索引的id
          item.id = num++;
          item.label = item.fileListName;
          var parent = map[item.parentId];
          // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
          if (parent) {
              (parent.children || ( parent.children = [] )).push(item);
          } else {
              //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
              val.push(item);
          }
      });
      return val;
  },
  handleClick(data,checked, node) {
      this.i++;
      if(this.i%2==0){
          if(checked){
              this.$refs.treeForm.setCheckedNodes([]);
              this.$refs.treeForm.setCheckedNodes([data]);
              //交叉点击节点
          }else{
              this.$refs.treeForm.setCheckedNodes([]);
              //点击已经选中的节点，置空
          }
      }
  },
  handleNodeClick(data) {
      this.dataForm.fileListName =  data.fileListName;
  },
  // 基础参数下一步
  baseNextStep(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        this.showContent = 2;
        this.groupList.splice(0, 0, {});
      }
    })
  },
  relevNextStep(){
      // if( $('#appiChannel').val() == '' || $('#autoApproveResult').val() == '' || $('#tenantId').val() == ''){
      //   this.$message({
      //     message: '关联参数中有必填项未填',
      //     type: 'warning' 
      //   })
      //   return 
      // }
      this.showContent = 3;
      this.getTreeObjData();
  },
  dataNextStep(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        this.showContent = 4;
      }
    })
  },
  //保存产品卡面新增
  saveCardForm(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        this.dialogFormVisible1 = false
      }
    })
  },
  //上传图片
  handleRemove(file, fileList) {
  },
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  },
   //信用卡产品新增保存
  product_add() {
      //  this.productWorkflowSave();
      var ProductListMsgData13 = {
          "channelNo": "1",
          "transCode": "SETPROPROMAN000",
          "proCatType": this.proCatType_add,
          "proCatName": this.proCatName_add,
          "bizTypeCode": this.bizTypeCode_add,
          "cardId": this.cardId_add,
          "bizAllName": this.bizAllName_add,
          "tableId": this.tableId_add,
          "bizTypeFlag": this.bizTypeFlag_add,
          "proCatCurrCode": this.proCatCurrCode_add,
          "proLocalAccCode": this.proLocalAccCode_add,
          "proCatDualCurrCode": this.proCatDualCurrCode_add,
          "proCurryFlag": this.proCurryFlag_add,
          "proDualAccCode": this.proDualAccCode_add,
          "proUseRate": this.proUseRate_add,
          "bizRelegationProCode": this.bizRelegationProCode_add,
          "bizOther1": this.bizOther1_add,
          "bizCardImagePc": this.bizCardImagePc_add,
          "bizCardDesc": this.bizCardDesc_add,
          "bizCardBrand": this.bizCardBrand_add,
          "bizCardFeature": this.bizCardFeature_add,
          "bizCardGrade": this.bizCardGrade_add,
          "proInTypeCode": this.proInTypeCode_add,
          "proColorFlag": this.proColorFlag_add,
          "proStafFlag": this.proStafFlag_add,
          "proVipFlag": this.proVipFlag_add,
          "proPhotoFlag": this.proPhotoFlag_add,
          "branchPn": this.branchPn_add,
          "cardTypeFlag": this.cardTypeFlag_add,
          "proPersonCardFlag": this.proPersonCardFlag_add,
          "proMcScType": this.proMcScType_add,
          "proScMaxNumber": this.proScMaxNumber_add,
          // 产品工作流配置数据
          "productWorkflowList":this.newProductWorkflowList,
          "modelName": this.findModelName(this.formModel),
          "modelId": this.formModel,
          "prodTypeFlag": this.prodTypeFlag_add,
          "proFileList": this.proFileList,
          //产品卡面
          "cardFaceList":this.cardFaceList
      };
            this.$post(this.$api, ProductListMsgData13).then(res=> {
                this.queryUser = objc.returnMsg;
                
                if (this.queryUser == "OK") {
                    $('#levelssstates').val("");
                    $('#proCatType_add').val("");
                    $('#proCatName_add').val("");
                    $('#bizTypeCode_add').val("");
                    $('#cardId_add').val("");
                    $('#bizAllName_add').val("");
                    $('#tableId_add').val("");
                    $('#bizTypeFlag_add').val("");
                    $('#proCatCurrCode_add').val("");
                    $('#proLocalAccCode_add').val("");
                    $('#proCatDualCurrCode_add').val("");
                    $('#proCurryFlag_add').val("");
                    $('#proDualAccCode_add').val("");
                    $('#proUseRate_add').val("");
                    $('#bizRelegationProCode_add').val("");
                    $('#bizOther1_add').val("");
                    $('#bizCardDesc_add').val("");
                    $('#bizCardBrand_add').val("");
                    $('#bizCardFeature_add').val("");
                    $('#bizCardGrade_add').val("");
                    $('#proInTypeCode_add').val("");
                    $('#proColorFlag_add').val("");
                    $('#proStafFlag_add').val("");
                    $('#proVipFlag_add').val("");
                    $('#proPhotoFlag_add').val("");
                    $('#branchPn_add').val("");
                    $('#cardTypeFlag_add').val("");
                    $('#proPersonCardFlag_add').val("");
                    $('#proMcScType_add').val("");
                    $('#proScMaxNumber_add').val("");
                    $('#bizCardImagePc_add').val("");
                    $('#fileItem').val("");

                    $('#tenantId_add').val("");
                    $('#appiChannel_add').val("");
                    $('#autoApproveResult_add').val("");
                    $('#processDefineKey_add').val("");
                    $('#formModel').val("");
                    
                    this.prodMan_jccs_form_add.$setPristine();
                  this.prodMan_glcs_form_add.$setPristine();
                  
                    $.fn.zTree.destroy("can_operation_ztree");
                    this.organization_edit_form.$setPristine();
                  
                    uploader1.clearQueue();
                    $('#addUser').modal('hide');
                    setTimeout(function () {
                        $(".BeAlert_overlay,.BeAlert_box").remove();
                    }, 1300);
                    alert($translateFun('save_successfully'), '', function () {
                    }, {type: 'success', showConfirmButton: false});
                    this.selectProductList();
                } else {
                    setTimeout(function () {
                        $(".BeAlert_overlay,.BeAlert_box").remove();
                    }, 1300);
                    alert($translateFun('save_failed'), '', function () {
                    }, {type: 'error', showConfirmButton: false});
                };
            });
  },

	//点击单个删除
	deleteItem(row){
		  var ProductListMsgData15 = {
          "channelNo": "1",
          "transCode": "SETPROPROMAN100",
          "cardId": row.cardId,
      };
			var _this =this;
			this.$confirm('确定要删除吗?', i18n.t('Prompt'), {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
			}).then(() => {
				this.$post(this.$api,ProductListMsgData15).then(function(res){
					if(res.returnMsg == 'OK'){
						_this.initProductManageList();
						_this.$message({
							type: 'info',
							message: '删除成功'
						}); 
					}else{
						_this.$message({
							type: 'warning',
							message: res.returnMsg
						}); 
					}
				})
			}).catch(() => {
			
		});
  },
  //电话核查模板管理
  moneyInfo(row){
    this.messageCardId = row.cardId;

    var ProductListMsgData1 = {
        "channelNo": "1",
        "transCode": "SETCARDFWLIST",
        "queryFlag": "1",
        "productCardId":row.cardId,
    };
    this.$post(this.$api, ProductListMsgData1).then(res =>{
        if (res.formworkList.length > 0) {
          this.flag = false;
          this.moneysList = res.formworkList;
        }
        else {
          this.flag = true;
          this.moneysList = 0;
        }
    });
    this.dialogFormVisible2 =true;
  },
  //模板设置--新增
	addMoney() {
    //  this.moneyListDiv = true;
     this.flag = false;
      if (this.moneysList == 0) {
         this.moneysList = [{}];
      }else {
         this.moneysList.splice(0, 0, {});
      }
  },
  //模板设置--删除
  delMoney(i){
     this.moneysList.splice(i, 1);
  },
  //模板设置--提交
  addBonus(){
    var addMoneyNewList = [];
    for (var i = 0; i <this.moneysList.length; i++) {
        var addMoneyNew = {
            formworkID:this.moneysList[i].id,
            formworkType:this.moneysList[i].formworkType
        };
       addMoneyNewList.push(addMoneyNew);
    }
    var CoreUrl = {
        'channelNo': '1',
        "transCode": "SETCARDFWSAVE",
        "productCardId":this.messageCardId,
        "tuserId":this.loginMsg.userId,
        "branchId":this.loginMsg.branchId,
        "formworkList":addMoneyNewList
    }
    this.$post(this.$api, CoreUrl).then( res => {
        if (res.returnMsg == "OK") {
            this.$message({
              message:'模板设置成功',
              type: 'success' 
            })
            this.dialogFormVisible2 =false;
        } else {
            this.$message({
              message:res.returnMsg,
              type: 'warning' 
            })
            
        }
    });
  },


	
	//取消弹框重置数据
	cancel(){
		this.dialogFormVisible = false;
		this.resetForm('addForm');
		this.groupList = [];

		this.addForm.cardId='';
		this.addForm.proMaxLimit='';
		this.addForm.subCardLimitRatio='';
		this.addForm.cashAmountLimit='';
	
		this.addForm.flag=false;
		// this.addForm.edit=false;
	},
	//点击编辑
	editItem(row){
		this.dialogFormVisible=true;
		// var formModelListData = {
		// 	"channelNo": "1",
		// 	"transCode": "SETPROPROLIMIT302"
		// };
		// this.$post(this.$api, formModelListData).then( res => {
		// 	if(res.returnMsg=="OK"){
		// 		this.approvePost = res.rows
		// 	}else{
		// 		this.$message({
		// 			message:res.returnMsg,
		// 			type: 'warning' 
		// 		})
		// 	}
		// });
		this.addForm.cardId=row.cardId
		this.addForm.proMaxLimit=row.proMaxLimit
		this.addForm.subCardLimitRatio=row.subCardLimitRatio
		this.addForm.cashAmountLimit=row.cashAmountLimit
	
		this.addForm.flag=true;
		// this.addForm.edit=true;
	},

	//保存编辑
	editSave(){
		this.submitAdd('addForm');
	},

	//监听搜索框为空的时候展示全部数据
	onChangequery(){
		this.initProductManageList();
	},
	//改变每页显示多少条
	handleSizeChange(val) {
    this.pageSize =  val;
    this.indexNo = 0
		this.initProductManageList();
	},
	//选择页数改变数据
	handleCurrentChange(val){
		this.indexNo = (val-1)*this.pageSize ;
		this.initProductManageList(); 
	},

  }
}
</script>

<style  lang='scss'>
#pm_content{
  .el-dialog__body{
      height: 350px;
      overflow: auto
  }
	.el-dialog {
    width:80%!important;
    margin-top:1%!important;
  }
  .el-select{
    width:100%!important;
  }
}
.nav_tabs{
  width: 10%;
  li{
    width: 100px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    border-right: 1px solid $bordercolor;
    cursor: pointer;
  }
  .active{
    background: $deep-color;
    color: #fff;
  }
}
.nav_con{
  width: 85%;
}
.step{
  text-align: right
}
.data_left{
  width: 250px;
}
.nomore{
  text-align: center;
  line-height: 100px;
}

</style>
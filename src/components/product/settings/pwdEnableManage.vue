<template>
  <!-- 岗位密码有效期管理 -->
  <div class="content_box" id="contract_content">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item >通用设置</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >合同模板管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
        <div class="edit_module_btn">
            <el-button type="primary" icon="el-icon-plus"  @click="addMoney()">新增密码有效期配置</el-button> <!--新增按钮-->
        </div>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
      <div class="table_height">
							<table aria-describedby="editable-sample_info" class="table" id="week-sample" >
								<thead>
									<tr role="row">
										<th colspan="1" rowspan="1" class="text-center sorting">序号<!-- 序号--></th>
										<th colspan="1" rowspan="1" class="text-center sorting"><span	class="red">*</span>岗位类型<!-- 岗位类型--></th>
										<th colspan="1" rowspan="1" class="text-center sorting"><span class="red">*</span>密码有效期(单位：月)<!-- 密码有效期(单位：月)--></th>
										<th colspan="1" rowspan="1" class="text-center sorting">操作<!-- 操作--></th>
									</tr>
								</thead>
								<tbody >
									<tr class="odd" v-for="(money,index) in moneysList" :key='index'>
										<td class="text-center">{{index+1}}</td>   <!-- 序号-->

										<td class="text-center" >  <!-- 岗位类型-->
											<el-select style="width:90%;"  v-model="money.groupType" placeholder="请选择"  id="groupId">
														<el-option v-for="(item,index) in caseLevelList" 
															:key="index" 
															:label="item.bizTypePropName" 
															:value="item.bizTypePropCode">{{item.bizTypePropName}}
														</el-option>
											</el-select>
										</td>

										<td class="text-center">  <!-- 密码有效期(单位：月)-->
											<el-input v-model="money.pwdEnableTime"  id="messageId"   class="form-control"></el-input>
											
										</td> 
							
										<td class="text-center pt5 pb5">
											<el-button size="mini" type="danger" class="delete-btn" @click="delItem(index)">
												<i class="el-icon-delete"></i><!--删除 -->
												<span class="text">删除</span>
											</el-button>
										</td>
									</tr>
								</tbody>
							</table>
					</div>		
			</div>
      <div class="edit_module_btn" style="padding:30px;">
            <el-button type="primary" @click="addBonus()">确定</el-button> <!--确定-->
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moneysList:[], //列表数据
			currentPage:1,//当前显示第几页 1开头
      pageSize:5,//一页显示几条数据
			totalCount:10,//一共有多少条数据
      indexNo:0,  //需要传过去的参数

      caseLevelList:[], //岗位类型
    }
  },
  created(){
    this.initCaseLevelList(); //初始化岗位类型
  },
  mounted(){
		this.selectFormWorkList();  //初始化合同模板列表数据
  },
  methods:{
    //初始化岗位密码有效期管理列表数据
    selectFormWorkList() {
          var FormWorkListMsgData = {
              "channelNo": "1",
              "transCode": "SETPWDLIFELIST",
              "indexNo":this.indexNo,
              "pageSize":this.pageSize
          };               
          this.$post(this.$api,FormWorkListMsgData).then(res =>{
              if (res.rows.length > 0) {
                    this.ismoneys = false;
                    this.moneysList = res.rows;
                }else {
                    this.ismoneys = true;
                    this.moneysList = 0;
                }
                this.totalCount = res.totalCount;
            }); 
    },
    // 码表--岗位类型
    initCaseLevelList(){
        var formworkTypeData = {
            "channelNo": "1",
                "transCode": "SETPARARGS301",
                "bizTypeCode": "GROUP_TYPE"
        };
        this.$post(this.$api,formworkTypeData).then(res =>{
            this.caseLevelList = res.rows;
        });
    },
    //点击新增按钮
    addMoney() {
        if (this.moneysList == 0) {
            this.moneysList = [{}];
        }
        else {
            this.moneysList.splice(0, 0, {});
        }
    },
    //点击单个删除按钮
    delItem(row){
        this.moneysList.splice(row, 1);
    },
    //确定
    addBonus(){
      var addMoneyNewList = [];
      for (var i = 0; i < this.moneysList.length; i++) {
            var addMoneyNew = {
                groupType:this.moneysList[i].groupType,
                pwdEnableTime:this.moneysList[i].pwdEnableTime
            };
           addMoneyNewList.push(addMoneyNew);
      }
      var CoreUrl = {
          'channelNo': '1',
          "transCode": "SETPWDLIFESAVE", 
          "rows":addMoneyNewList
      };

      this.$post(this.$api,CoreUrl).then( res => {
            if (res.returnMsg == "OK") {
                this.selectFormWorkList();
                this.$message({
                  message:'密码有效期设置成功',
                  type: 'success' 
                })
            } else {
                this.$message({
                    message:res.returnMsg,
                    type: 'warning' 
                })
            }
      });

    },

  }
}
</script>

<style  lang='scss'>
#contract_content{
	.el-dialog {
		width:50%!important;
	}
}

</style>
<style scoped  lang='scss'>
.edit_module_btn{
  text-align: right;
  background: #fff;
}
.list_module{
  min-height: 300px;
}
</style>

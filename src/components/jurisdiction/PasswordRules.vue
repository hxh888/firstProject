<template>
<!-- 密码规则自定义 -->
  <div class="content_box" id="pass_content">
    <div class="list_module">
		<h4>密码规则定义</h4>   <!-- 密码规则自定义 -->
			<el-form :model="addForm"  ref="addForm" :rules="$rules.passwordRules" label-width="250px" class="demo-ruleForm" size="small">
				<el-form-item label="密码最大长度" prop="passMaxLength"> 
					<el-input   v-model="addForm.passMaxLength" type="number"></el-input>
				</el-form-item>

				<el-form-item label="密码最小长度"  prop="passMinLength">   
					<el-input   v-model="addForm.passMinLength" type="number"></el-input >
				</el-form-item>

				<el-form-item label="是否含有大写字符"   prop="isUpperCase">   
					<el-select v-model="addForm.isUpperCase" >
						<el-option label="否" value="0"></el-option>
						<el-option label="是" value="1"></el-option>
					</el-select>	
				</el-form-item>

				<el-form-item label="是否含有小写字符"   prop="isLowerCase">   
					<el-select v-model="addForm.isLowerCase" >
						<el-option label="否" value="0"></el-option>
						<el-option label="是" value="1"></el-option>
					</el-select>	
				</el-form-item>
			
				<el-form-item label="是否含有特殊字符"   prop="isSpecialCase">   
					<el-select v-model="addForm.isSpecialCase" >
						<el-option label="否" value="0"></el-option>
						<el-option label="是" value="1"></el-option>
					</el-select>	
				</el-form-item>

				<el-form-item style="text-align:right;"> 
					<el-button  type="primary" @click="passSave('addForm')">保存</el-button>
				</el-form-item>
		</el-form>		
				
	</div>

  </div>
</template>

<script>
export default {
//   name: 'PasswordRules',
  data () {
    return {
		addForm:{
			passMaxLength:'8', //密码最大长度
			passMinLength:'4', //密码最小长度
			isUpperCase:'0', //是否含有大写字符
			isLowerCase:'0', //是否含有小写字符
			isSpecialCase:'0', //是否含有特殊字符
		},
    }
  },
  methods:{
	  passSave(e){

	  }
  }
 
}
</script>

<style scoped lang='scss'>
.list_module{
	padding-right: 100px;
	.el-select{
		width: 100%;
	}
}
</style>

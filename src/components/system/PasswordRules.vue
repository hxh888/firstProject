<template>
<!-- 密码规则自定义 -->
  <div class="content_box" id="pass_content">
    <div class="list_module">
		<h4>{{$t('passrule.pass_rule_define')}}</h4>   <!-- 密码规则自定义 -->
			<el-form :model="addForm" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" ref="addForm" :rules="rules" label-width="180px" class="demo-ruleForm" size="small" style="width: 400px;">
				<el-form-item :label="$t('passrule.pass_max_length')" prop="passMaxLength">   <!-- 密码最大长度 -->
					<el-input   v-model="addForm.passMaxLength" type="number"></el-input>
				</el-form-item>

				<el-form-item :label="$t('passrule.pass_min_length')"  prop="passMinLength">    <!-- 密码最小长度 -->
					<el-input   v-model="addForm.passMinLength" type="number"></el-input >
				</el-form-item>

				<el-form-item :label="$t('passrule.isUpperCase')"   prop="isUpperCase">    <!-- 是否含有大写字符 -->
					<el-select v-model="addForm.isUpperCase" placeholder="">
						<el-option :label="$t('passrule.no')"  value="0"></el-option>  <!-- 否 -->
						<el-option :label="$t('passrule.yes')"  value="1"></el-option>   <!-- 是 -->
					</el-select>	
				</el-form-item>
 
				<el-form-item :label="$t('passrule.isLowerCase')"    prop="isLowerCase">      <!-- 是否含有小写字符 -->
					<el-select v-model="addForm.isLowerCase" placeholder="">
						<el-option :label="$t('passrule.no')"  value="0"></el-option>  <!-- 否 -->
						<el-option :label="$t('passrule.yes')"  value="1"></el-option>   <!-- 是 -->
					</el-select>	
				</el-form-item>
			
				<el-form-item :label="$t('passrule.isSpecialCase')"   prop="isSpecialCase">     <!-- 是否含有特殊字符 -->
					<el-select v-model="addForm.isSpecialCase" placeholder="">
						<el-option :label="$t('passrule.no')"  value="0"></el-option>  <!-- 否 -->
						<el-option :label="$t('passrule.yes')" value="1"></el-option>  <!-- 是 -->
					</el-select>	
				</el-form-item>

				<el-form-item style="text-align:right;" v-if="funList.indexOf('保存') > -1"> 
					<el-button  type="primary"   @click="passSave('addForm')" >{{$t('Save')}}</el-button>
				</el-form-item>
		</el-form>		
				
	</div>

  </div>
</template>

<script>
export default {
  name: 'PasswordRules',
  data () {
	var validateLengthMax = (rule, value, callback) => {
		if(this.addForm.passMinLength !=''){
			if (Number(value) <= Number(this.addForm.passMinLength)) {
				callback(new Error(  i18n.t('passrule.format6'))); // 密码最大长度不得小于等于密码最小长度
			} else {
				callback();
			}
		}
		
	};
	var validateLengthMix = (rule, value, callback) => {
		if(this.addForm.passMaxLength !=''){
			if (Number(value) >= Number(this.addForm.passMaxLength)) {
				callback(new Error( i18n.t('passrule.format7'))); //密码最小长度不得大于等于密码最大长度
			} else {
				callback();
			}
		}
		
	};
    return {
		addForm:{
			passMaxLength:'8', //密码最大长度
			passMinLength:'4', //密码最小长度
			isUpperCase:'0', //是否含有大写字符
			isLowerCase:'0', //是否含有小写字符
			isSpecialCase:'0', //是否含有特殊字符
			id:'',
		},
		rules:{
			//密码最大长度
			passMaxLength:[
				{required: true, message:i18n.t('passrule.format1')}, //密码最大长度不能为空
				{validator: validateLengthMax, trigger: 'blur' },
				// { max: 20, message: i18n.t('role.no_more_than_20_characters_in_length'), trigger: 'blur' }
			],
			//密码最小长度
			passMinLength:[
				{required: true, message: i18n.t('passrule.format2') }, //密码最小长度不能为空
				{validator: validateLengthMix, trigger: 'blur' },
				// { max: 20, message: i18n.t('role.no_more_than_20_characters_in_length'), trigger: 'blur' }
			],
			//是否含有大写字符
			isUpperCase:[
				{required: true, message: i18n.t('passrule.format3')}, //请选择是否含有大写字符
			],
			//是否含有小写字符
			isLowerCase:[
				{required: true, message: i18n.t('passrule.format4')}, //请选择是否含有小写字符
			],
			//是否含有特殊字符
			isSpecialCase:[
				{required: true, message: i18n.t('passrule.format5')}, //请选择是否含有特殊字符
			]
		},
		funList: []
	}

  },
  mounted(){
	  this.getFunList()
	  this.getInitPassRules(); //获取初始密码规则
  },
  methods:{
	  getFunList () {
		let obj = {}
		obj = this.$store.state.loginData.beMenuList.find(item => {
			return item.name == '密码规则管理'
		})
		this.$post(this.$api + '/user/findAuthorityFun', {loginId: this.$store.state.loginData.userLogin.loginId, menuId: obj.id}).then(res =>{
			if(res.returnCode == '000000'){
			this.funList = JSON.stringify(res.returnData)
			}
		});
	},
	  //获取初始密码规则
	  getInitPassRules(){
		this.$post(this.$api + '/passwordRule/detail').then(res=>{
			if(res.returnCode=="000000"){
				this.addForm.passMaxLength = res.returnData.maxPasswordLength
				this.addForm.passMinLength = res.returnData.minPasswordLength
				this.addForm.isUpperCase = res.returnData.upperLetter
				this.addForm.isLowerCase = res.returnData.lowerLetter
				this.addForm.isSpecialCase = res.returnData.specialCharacter
				this.addForm.id = res.returnData.id
			}
		})
	  },
	  passSave(formName){
		this.$refs[formName].validate((valid) => {
           if (valid) {
              var FunMsgData={
                  "maxPasswordLength":this.addForm.passMaxLength,
                  "minPasswordLength":this.addForm.passMinLength,
                  "upperLetter":this.addForm.isUpperCase,
                  "lowerLetter":this.addForm.isLowerCase,
				  "specialCharacter":this.addForm.isSpecialCase,
				  "id":this.addForm.id
              }
              this.$post(this.$api + '/passwordRule/save',FunMsgData).then(res=>{
                if(res.returnCode=="000000"){
					this.getInitPassRules();
					this.$alert(  i18n.t('passrule.save_success'), i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
                }else{
					var str = `
						<p>${ i18n.t('Error_code') }: <span style='color:#5bc0de'>${res.returnCode}</span></p>
						<p >${ i18n.t('reason') }:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
					`
					this.getInitPassRules();
					this.$alert(str, i18n.t('Prompt'), {
						dangerouslyUseHTMLString: true
					});
				}
              })
           }else {
				return false;
			}
        })
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

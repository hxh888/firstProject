<template>
	<el-select v-model="select"  @change="changeSelect()" :disabled="disabled">
		<el-option value=""  :label="$t('please_select')" ></el-option>
		<el-option 
				v-for="(item,index) in options" 
				:key="index"
				:label="item.paramSname"
				:value="item.paramValue"
			></el-option>
	</el-select>	
</template>

<script>
export default {
    name: 'paramSelect',
	props:{
		paramCode:String,
		select:String,
		disabled:Boolean
	},
    data() {
      return {
		  options:[],
      }
	},
	mounted(){
		this.getSelectData();
	},
	watch:{
		// select(val){
		// 	this.couponSelected =val;
		// }
	},
    methods: {
		changeSelect(){
			this.$emit('Selected', this.couponSelected)
		},	
		getSelectData(paramCode){
			var param={
				"paramCode":this.paramCode,
			}
			this.$post(this.$api + '/paramValues/findByParamCode',param).then(res=>{
				if(res.returnCode=="000000"){
					this.options =res.returnData
				}
			})
		},
    },
   
  };
</script>

<style scoped="scoped" lang='scss'></style>
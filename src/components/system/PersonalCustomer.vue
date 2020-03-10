<template>
  <div>
  	<customer-index v-show="showPage == '0'" @func="getPage"></customer-index>
  	<customer-add v-show="showPage == '1'" @fun="getPage"></customer-add>
  </div>
</template>

<script>
	import CustomerIndex from './customer/CustomerIndex'
	import CustomerAdd from './customer/CustomerAdd'
	export default {
	  name: 'Log',
	  data() {
	    return {
	      showPage:"0"
	    };
	  },
		components:{
			"customerIndex":CustomerIndex,
			"customerAdd":CustomerAdd
		},
		methods:{
			getPage(data){
				this.showPage = data
			}
		}
	};
</script>

<style  lang='scss' scoped="scoped">

</style>

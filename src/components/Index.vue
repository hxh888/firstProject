<template>
  <div class="home">
		<v-header></v-header>
    <card v-if="status == '2'"></card>
    <l-e v-if="status == '1'"></l-e>
  </div>
</template>

<script>
import vHeader from './common/Header.vue'
import Card from './workBench/creditCard'
import LE from './workBench/loanElimination'
export default {
  components:{
    vHeader,
    Card,
    LE
  },
  data () {
    return {
      status: '1' // 1消贷 2信用卡
    }
  },
  mounted(){  
    
    
  },
  methods:{
  }
}
</script>

<style scoped lang='scss'>
.home{
  height: 100%;
}
</style>

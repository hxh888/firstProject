<template>
    <div :id="id" :data="data"></div>
</template>
    
<script>
    export default {
        data() {
            return {
                ChartLineGraph:null,
            }
        },
        watch:{
            data:{
                handler(newValue, oldValue){
                    this.drawLineGraph(this.id,newValue)
                },
                deep:true
            }
        },
        props:["id","data"],
        mounted(){
            this.drawLineGraph(this.id,this.data)
        },
        methods:{
            drawLineGraph(id,data){
                let _this=this;
                let myChart=document.getElementById(id);
                this.ChartLineGraph = this.$echarts.init(myChart)
                this.ChartLineGraph.setOption(data)
                // window.addEventListener("resize",function(){
                //     _this.ChartLineGraph.resize()
                // })
            }
        },
        beforeDestroy(){
            if(this.ChartLineGraph){
                this.ChartLineGraph.clear();
            }
        }
    }
</script>


<style scoped lang='scss'>

</style>

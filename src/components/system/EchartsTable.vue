<template>
  <!-- 图形报表管理 -->
  <div class="content_box" id="contract_content">
    <div class="edit_module">
        <linegraph :id="'linegraph'" :data="option"></linegraph>
        <linegraph :id="'histogram'" :data="option1"></linegraph>
        <linegraph :id="'piegraph'" :data="option2"></linegraph>
    </div>
    

    
  </div>
</template>

<script>
import linegraph from '@/components/common/linegraph.vue'
export default {
  name: 'NewLog',
  data() {
    return {
      notAccess:false,
      ChartLineGraph2:null,
      option:{
        title: {
        text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {//各种颜色代表什么
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
      },
      option1:{
         xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
          }]
      },
      option2:{
        // title : {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x:'center'
        // },  
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        // },
        series : [
            {
                // name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      }
    };
  },
  mounted() {
  	this.getServerIp()
    // this.getFunList()
    // this.drawLine();//柱状图
    // this.drawPie();//饼状图
  },

  methods: {
    // 获取权限信息
    getFunList() {
      let obj = {};
      obj = this.$store.state.loginData.beMenuList.find(item => {
        return item.name == "图形报表";
      });
      this.$post(this.$api + "/user/findAuthorityFun", {
        loginId: this.$store.state.loginData.userLogin.loginId,
        menuId: obj.id
      }).then(res => {
        if (res.returnCode == "000000") {
          this.funList = JSON.stringify(res.returnData);
        }
      });
    },
    
    //获取服务器ip
    getServerIp(){
    	this.$post(this.$api+'/logRecordQuery/findServerIpList',{}).then(res=>{
    		// console.log(res)
    		this.serverIpArr=res.returnData
    	})
    },

    // drawLine(){
    //     // 基于准备好的dom，初始化echarts实例
    //     let myChart = this.$echarts.init(document.getElementById('myChart'))
    //     // 绘制图表
    //     myChart.setOption({
    //         title: { text: '柱状图' },
    //         tooltip: {},
    //         xAxis: {
    //             data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //         },
    //         yAxis: {},
    //         series: [{
    //             name: '销量',
    //             type: 'bar',
    //             data: [5, 20, 36, 10, 10, 20]
    //         }]
    //     });
    // },
    // drawPie(){
    //   let pieChart = this.$echarts.init(document.getElementById('pieChart'))
    //   pieChart.setOption({
    //     title : {
    //       text: '某站点用户访问来源',
    //       subtext: '纯属虚构',
    //       x:'center'
    //     },
    //     tooltip : {
    //         trigger: 'item',
    //         formatter: "{a} <br/>{b} : {c} ({d}%)"
    //     },
    //     legend: {
    //         orient: 'vertical',
    //         left: 'left',
    //         data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    //     },
    //     series : [
    //         {
    //             name: '访问来源',
    //             type: 'pie',
    //             radius : '55%',
    //             center: ['50%', '60%'],
    //             data:[
    //                 {value:335, name:'直接访问'},
    //                 {value:310, name:'邮件营销'},
    //                 {value:234, name:'联盟广告'},
    //                 {value:135, name:'视频广告'},
    //                 {value:1548, name:'搜索引擎'}
    //             ],
    //             itemStyle: {
    //                 emphasis: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                 }
    //             }
    //         }
    //     ]
    //   })
    // }
  },
  components:{
    linegraph
  }
  
};
</script>

<style  lang='scss' scoped="scoped">
#contract_content {
  .el-dialog {
    width: 60% !important;
  }
}
.el-upload__tip {
  margin-top: 0;
  margin-left: 10px;
}
.el-input-group__prepend {
  background: #3a8ee6;
  color: #fff;
  border: none;
}
#contract_content .el-input--suffix .el-input__inner{
	padding-right:30px!important;
}
.error{color:red; font-weight: bold;}
#linegraph,#histogram,#piegraph{ height:300px;}

</style>

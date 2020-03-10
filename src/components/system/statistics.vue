<template>
    <div id="chats">
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="24"><div id="sqjtj" class="bar" ref="bar"></div></el-col>
                    <el-select v-model="select1" size="mini" style="width:100px" @change="selectChange1">
                        <el-option :label="$t('statistics.7_days')" value="7" ></el-option>
                        <el-option :label="$t('statistics.6_months')" value="6"></el-option>
                        <el-option :label="$t('statistics.1_years')" value="12"></el-option>
                    </el-select>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="24"><div id="sqjtj2" class="bar" ref="bar"></div></el-col>
                    <el-select v-model="select2" size="mini" style="width:100px" @change="selectChange2">
                        <el-option :label="$t('statistics.7_days')" value="7" ></el-option>
                        <el-option :label="$t('statistics.6_months')" value="6"></el-option>
                        <el-option :label="$t('statistics.1_years')" value="12"></el-option>
                    </el-select>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="24"><div id="sqjtj3" class="bar" ref="bar"></div></el-col>
                    <el-select v-model="select3" size="mini" style="width:100px" @change="selectChange3">
                        <el-option :label="$t('statistics.7_days')" value="7" ></el-option>
                        <el-option :label="$t('statistics.6_months')" value="6"></el-option>
                        <el-option :label="$t('statistics.1_years')" value="12"></el-option>
                    </el-select>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="24"><div id="sqjtj4" class="bar" ref="bar"></div></el-col>
                    <el-select v-model="select4" size="mini" style="width:100px" @change="selectChange4">
                        <el-option :label="$t('statistics.7_days')" value="7" ></el-option>
                        <el-option :label="$t('statistics.6_months')" value="6"></el-option>
                        <el-option :label="$t('statistics.1_years')" value="12"></el-option>
                    </el-select>
                </el-row>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'Statistics',
    data () {
        return {
          select1: '6',
          select2: '6',
          select3: '6',
          select4: '6',
        }
    },
    mounted () {
        this.selectChange1()
        this.selectChange2()
        this.selectChange3()
        this.selectChange4()
    },
    methods: {
        // 申请件统计
        selectChange1 () {
          let self = this
          self.$get(self.$tab + '/api/consumerLoanCredit?mark=4&type='+ self.select1 +'&branchId=' + this.$store.state.loginData.userLogin.branchId +'&legalPersonNum=' + this.$store.state.loginData.userLogin.legalPersonNum).then(res =>{
            if(res.returnCode == '000000'){
              let arr = []
              if (self.select1 == '7') {
                  res.returnData.credit.map((item) => {
                  let o = {
                    day: item.day,
                    credit: item.count
                  }
                  arr.push(o)
                })
                for (let i=0; i< res.returnData.rows.length; i++) {
                  let f = false
                  for (let j=0; j< arr.length; j++) {
                    if (res.returnData.rows[i].day == arr[j].day) {
                      arr[j].xd = res.returnData.rows[i].count
                      f = true
                    }
                  }
                  if (!f) {
                    arr.push({
                      day: res.returnData.rows[i].day,
                      xd: res.returnData.rows[i].count
                    })
                  }
                }
                self.arr1 = arr
              } else {
                res.returnData.credit.map((item) => {
                  let o = {
                    day: item.month,
                    credit: item.count
                  }
                  arr.push(o)
                })
                for (let i=0; i< res.returnData.rows.length; i++) {
                  let f = false
                  for (let j=0; j< arr.length; j++) {
                    if (res.returnData.rows[i].month == arr[j].month) {
                      arr[j].xd = res.returnData.rows[i].count
                      f = true
                    }
                  }
                  if (!f) {
                    arr.push({
                      day: res.returnData.rows[i].month,
                      xd: res.returnData.rows[i].count
                    })
                  }
                }
                self.arr1 = arr
              }
              let myChart1 = echarts.init(document.getElementById('sqjtj'));
              myChart1.setOption({
                  title: {
                      text: i18n.t('statistics.Application_statistics'),
                      textAlign: 'center',
                      x: '50%',
                  },
                  legend: {
                      // orient: 'vertical',
                      left: 50,
                      top: 20
                  },
                  tooltip: {
                  },
                  dataset: {
                      dimensions: ['day', 'xd', 'credit'],
                      source: self.arr1
                  },
                  color: ['lightblue', 'orange'],
                  xAxis: {type: 'category'},
                  yAxis: {},
                  series: [
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Loan_elimination'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        }
                      },
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Credit_Card'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        }
                      }
                  ]
              });
            } else {
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
              `
              self.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
          });
        },
        // 通过率统计
        selectChange2 () {
          let self = this
          self.$get(self.$tab + '/api/consumerLoanCredit?mark=3&type='+ self.select2 + '&branchId=' + this.$store.state.loginData.userLogin.branchId +'&legalPersonNum=' + this.$store.state.loginData.userLogin.legalPersonNum).then(res =>{
            if(res.returnCode == '000000'){
              let arr = []
              let arr1 = []
              let arr2 = []
              if (self.select2 == '7') {
                res.returnData.credit.map((item) => {
                  arr.push(item.days)
                  arr2.push(parseFloat(item.rate))
                })
                res.returnData.rows.map((item) => {
                  arr1.push(parseFloat(item.rate))
                })
              } else {
                res.returnData.credit.map((item) => {
                    arr.push(item.months)
                    arr2.push(parseFloat(item.rate))
                  })
                  res.returnData.rows.map((item) => {
                    arr1.push(parseFloat(item.rate))
                  })
              }
              let myChart2 = echarts.init(document.getElementById('sqjtj2'));
              myChart2.setOption({
                  title: {
                      text: i18n.t('statistics.Pass_rate_statistics'),
                      textAlign: 'center',
                      x: '50%',
                  },
                  legend: {
                      // orient: 'vertical',
                      left: 50,
                      top: 20
                  },
                  tooltip: {
                    formatter: '{b}:{c} %'
                  },
                  color: ['lightblue', 'orange'],
                  xAxis: {type: 'category', data: arr},
                  yAxis: {
                    type: 'value',  
                    axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        formatter: '{value} %'  
                        },  
                    show: true  
                  },
                  series: [
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Loan_elimination'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c} %',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        },
                        data: arr1
                      },
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Credit_Card'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c} %',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        },
                        data: arr2
                      }
                  ]
              });
            } else {
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
              `
              self.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
          });
        },
        // 拒绝率统计
        selectChange3 () {
          let self = this
          self.$get(self.$tab + '/api/consumerLoanCredit?mark=5&type='+ self.select3 +'&branchId=' + this.$store.state.loginData.userLogin.branchId +'&legalPersonNum=' + this.$store.state.loginData.userLogin.legalPersonNum).then(res =>{
            if(res.returnCode == '000000'){
              let arr = []
              let arr1 = []
              let arr2 = []
              if (self.select3 == '7') {
                res.returnData.credit.map((item) => {
                  arr.push(item.days)
                  arr2.push(parseFloat(item.rate))
                })
                res.returnData.rows.map((item) => {
                  arr1.push(parseFloat(item.rate))
                })
              } else {
                res.returnData.credit.map((item) => {
                    arr.push(item.months)
                    arr2.push(parseFloat(item.rate))
                  })
                  res.returnData.rows.map((item) => {
                    arr1.push(parseFloat(item.rate))
                  })
              }

              let myChart3 = echarts.init(document.getElementById('sqjtj3'));
              myChart3.setOption({
                  title: {
                      text: i18n.t('statistics.Rejection_Rate_Statistics'),
                      textAlign: 'center',
                      x: '50%',
                  },
                  legend: {
                      // orient: 'vertical',
                      left: 50,
                      top: 20
                  },
                  tooltip: {
                    formatter: '{b}:{c} %'
                  },
                  color: ['lightblue', 'orange'],
                  xAxis: {type: 'category', data: arr},
                  yAxis: {
                    type: 'value',  
                    axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        formatter: '{value} %'  
                        },  
                    show: true  
                  },
                  series: [
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Loan_elimination'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c} %',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        },
                        data: arr1
                      },
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Credit_Card'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c} %',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        },
                        data: arr2
                      }
                  ]
              });
            } else {
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
              `
              self.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
          });
        },
        // 转人工率统计
        selectChange4 () {
          let self = this
          self.$get(self.$tab + '/api/consumerLoanCredit?mark=2&type='+ self.select4 +'&branchId=' + this.$store.state.loginData.userLogin.branchId +'&legalPersonNum=' + this.$store.state.loginData.userLogin.legalPersonNum).then(res =>{
            if(res.returnCode == '000000'){
              let arr = []
              let arr1 = []
              let arr2 = []
              if (self.select4 == '7') {
                res.returnData.credit.map((item) => {
                  arr.push(item.days)
                  arr2.push(parseFloat(item.rate))
                })
                res.returnData.rows.map((item) => {
                  arr1.push(parseFloat(item.rate))
                })
              } else {
                res.returnData.credit.map((item) => {
                    arr.push(item.months)
                    arr2.push(parseFloat(item.rate))
                  })
                  res.returnData.rows.map((item) => {
                    arr1.push(parseFloat(item.rate))
                  })
              }
              
              let myChart4 = echarts.init(document.getElementById('sqjtj4'));
              myChart4.setOption({
                  title: {
                      text: i18n.t('statistics.Statistics_of_turnover_rate'),
                      textAlign: 'center',
                      x: '50%',
                  },
                  legend: {
                      // orient: 'vertical',
                      left: 50,
                      top: 20
                  },
                  tooltip: {
                    formatter: '{b}:{c} %'
                  },
                  color: ['lightblue', 'orange'],
                  xAxis: {type: 'category', data: arr},
                  yAxis: {
                    type: 'value',  
                    axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        formatter: '{value} %'  
                        },  
                    show: true  
                  },
                  series: [
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Loan_elimination'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c} %',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        },
                        data: arr1
                      },
                      {
                        type: 'bar',
                        name : i18n.t('statistics.Credit_Card'),
                        itemStyle : {
                          normal : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c} %',
                                    textStyle: {
                                      color: 'black'
                                }
                            }
                          },
                        },
                        data: arr2
                      }
                  ]
              });
            } else {
              var str = `
                <p>${ i18n.t('Error_code')}: <span style='color:#5bc0de'>${res.code}</span></p>
                <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.message}</span></p>
              `
              self.$alert(str, i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
              });
            }
          });
        }
    }
}
</script>

<style>
#chats {
    height: 100%;
}
.bar {
    height: 350px;
    width: 100%;
}
#chats .el-row{
    padding: 20px 20px;
}
#chats .el-input--suffix .el-input__inner{
    padding-right: 0;
}
#chats .el-select{
    position: absolute;
    right: 80px;
}
</style>

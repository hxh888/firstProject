<template>
    <div class="content_box homePage" id="contract_content">
        <div class="tabMenu">
            <router-link :to="{name:'Early',query:{id:'1',type:'1'}}">
                <div>
                    <h3>预警管理</h3>
                    <p><strong>0</strong>待件处理</p>
                </div>
            </router-link>
            <router-link :to="{name:'Quota',query:{id:'1',type:'2'}}">
                <div>
                    <h3>额度管理</h3>
                    <p><strong>0</strong>待件处理</p>
                </div>
            </router-link>
            <router-link :to="{name:'Card',query:{id:'1',type:'3'}}">
                <div>
                    <h3>卡片管理</h3>
                    <p><strong>0</strong>待件处理</p>
                </div>
            </router-link>
            <router-link :to="{name:'Achievements',query:{id:'1',type:'4'}}">
                <div>
                    <h3>绩效管理</h3>
                    <p><strong>0</strong>待件处理</p>
                </div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Eary from './home/Early.vue'
export default {
    data(){
        return{
            obj: {
                legalPersonNum: this.$store.state.loginData.userLogin.legalPersonNum,
                radio:"0",
                pageSize: 10, //一页显示几条数据
                pageIndex: 1, //需要传过去的参数
                goPage: null,
            },
        }
    },
    components:{
    },
    methods:{
        
    }
}
</script>

<style  lang='scss' scoped="scoped">
.tabMenu{ 
    padding:10px 0 0;
    a{
        display: inline-block;
        padding:15px;
        width:130px;
        height:130px;
        box-sizing: border-box;
        background:#fff;
        border-radius:10px;
        margin-right:10px;
        h3{
            font-size:15px;
            color:#333;
            line-height:35px;
        }
        p{
            line-height:35px;
            margin-top:30px;
            color:#333;
            font-size:12px;
            strong{
                font-size:30px;
                margin-right:10px;
                font-weight: normal;
                color:$deep-color;
            }
        }
    }
}
</style>
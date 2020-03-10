import Vue from 'vue';
import Vuex from 'vuex'  
Vue.use(Vuex)

const state = {
    token:'',
    firstnav:[], //一级导航
    showleftNav:true,
    loginData:{}, //登录信息
    productManageView:{}, //消费贷产品录入查看功能
    loanTaskData:{},// 代办任务领取储存值
    tagList:[], //标签 数组
    lang: 'zh'
}

const actions = {//this.$store.dispatch('hideFooter')  //自定义触发mutations里函数的方法，context与store实例具有相同方法和属性,异步触发mutations里面的方法
   
};  

const mutations  = { //this.$store.commit('setToken') 同步事物  自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    setToken(state,data) {  //登录
        state.token = data
        window.sessionStorage.setItem('token',data)
    },
    removeToken(state){  //登出
        state.token = null
        window.sessionStorage.removeItem('token')
    },
    setFirstNav(state,data){  //设置一级菜单
        state.firstnav = data
    },
    saveLoginData(state,data){  //保存登录信息
        state.loginData = data
    },
    saveProductManageView(state,data){  //保存消费贷产品录入查看功能
        state.productManageView = data
    },
    setLoanTaskData(state,data){ //代办任务领取储存值
        state.loanTaskData = data
    },
    saveTag(state,data){ //保存领取任务标签
        state.tagList = data
    },
    setLang(state) {
        state.lang = window.sessionStorage.getItem('lang')
    }
}

const store = new Vuex.Store({
    state,
    actions,
    mutations
});
export default store;
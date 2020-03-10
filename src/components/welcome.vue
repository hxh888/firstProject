<template>
    <div>
        <transition name="el-fade-in">
            <span v-if="show">{{$t('header.welcomeTo')}} {{titles}}！</span><!-- 欢迎进入 -->
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            titles: '',
            show: false
        }
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path == '/MainIndex') {
        if (to.query.id == '1') {
            this.titles = i18n.t('header.workbench')//工作台
        } else if(to.query.id == '2') {
            this.titles = i18n.t('header.productCenter')//产品中心
        } else if(to.query.id == '3') {
            this.titles = i18n.t('header.organizational')//组织机构管理
        } else if(to.query.id == '4'){
            this.titles = i18n.t('header.postLoan')//贷后管理
        } else if(to.query.id == '5'){
            this.titles = i18n.t('header.reportForm')//报表管理
        } else if(to.query.id == '6'){
            this.titles = i18n.t('header.system')//系统管理
        } else if(to.query.id == '7'){
            this.titles = "卡片管理系统"
        }else{
            this.titles = i18n.t('header.letterTrial')//信审系统
        }
        this.show = true
      }
      next()
    },
    mounted () {
        this.display()
    },
    methods: {
        display () {
            if (this.$route.query.id == '1') {
                this.titles = i18n.t('header.workbench')//工作台
            } else if(this.$route.query.id == '2') {
                this.titles = i18n.t('header.productCenter')//产品中心
            } else if(this.$route.query.id == '3') {
                this.titles = i18n.t('header.organizational')//组织机构管理
            } else if(this.$route.query.id == '4'){
                this.titles = i18n.t('header.postLoan')//贷后管理
            } else if(this.$route.query.id == '5'){
                this.titles = i18n.t('header.reportForm')//报表管理
            } else if(this.$route.query.id == '6'){
                this.titles = i18n.t('header.system')//系统管理
            } else if(this.$route.query.id == '7'){//卡片管理
                this.titles = '卡片管理'
            }else if(this.$route.query.id == '8'){
                this.titles = '额度管理'
            }else{
                this.titles = i18n.t('header.letterTrial')//信审系统
            }
            this.show = true
        }
    }
}
</script>

<style lang="sass" scoped>
div{
    text-align: center;
    margin-top: 10%;
    font-size: 48px;
    color: #333;
}
</style>

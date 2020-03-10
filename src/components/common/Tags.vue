<template>
    <div class="tags">
        <div class="tab">
            <p class="tags_arror tags_left" @click="moveLeft()" ><i class="el-icon-d-arrow-left"></i> </p>
            <p class="tags_arror tags_right" @click="moveRight()"><i class="el-icon-d-arrow-right"></i></p>
            <ul class="ulBox">
                <li class="tags-li" v-for="(item,index) in tagsList" 
                                    :key="index"
                                    :class="{'active': isActive(item.path)}"
                                    >
                    <router-link :to="item.path" class="tags-li-title">
                        <span class="tit" :title="showmetas(item.path) + ' ' + item.title">{{item.path | showmeta}}&nbsp;{{item.title}}</span> 
                    </router-link>
                    <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
                </li>
            </ul>
        </div>
           
        
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="small" type="default">{{$t('tag.Tag_select')}}<i class="el-icon-arrow-down el-icon--right"></i>  <!--标签选项-->
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">{{$t('tag.Close_orther')}}</el-dropdown-item> <!--关闭其他-->
                    <el-dropdown-item command="all">{{$t('tag.Close_all')}}</el-dropdown-item>  <!--关闭所有-->
                </el-dropdown-menu> 
            </el-dropdown>
        </div>    

    </div>
</template>
    
<script>
    export default {
        data() {
            return {
                tagsList:[], //tags列表 
                ulNum:0,
                titles: ''
            }
        },
        created(){
            this.setTags(this.$route);
        },
        mounted(){
            this.$store.commit('saveTag',this.tagsList); 
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
                this.$store.commit('saveTag',this.tagsList);
            },
        },
        methods:{
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index){
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                } 
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                !isExist && this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.meta.name
                })
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                var fixLeft = 0;
                $(".ulBox").animate({left:fixLeft},260);
                this.tagsList = curItem;
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            //向右移动
            moveRight(){
                var wid = $(".tab").width();
                var setNum = parseInt(wid/130) -1;
                var tabItemArr = $(".ulBox").find(".tags-li");
                if(  tabItemArr.length <= setNum ){}
                else if( tabItemArr.length > setNum ){
					this.defartIndex--;
                    var fixLeft = -130*(tabItemArr.length - setNum);
					$(".ulBox").animate({left:fixLeft});
				}
            },
            //向左移动
            moveLeft(){
                var tabItemArr = $(".ulBox").find(".tags-li");
                var wid = $(".tab").width();
                var setNum = parseInt(wid/130) -1;
                if( tabItemArr.length <= setNum ){ }else  if( tabItemArr.length > setNum ){
                    this.defartIndex++;
                    var fixLeft = 0;
                    $(".ulBox").animate({left:fixLeft},260);
                }
            },
            showmetas (val) {
                if (val.indexOf('/MainIndex?') > -1) {
                    if (val.indexOf('/MainIndex?id=1') > -1) {
                        return i18n.t('header.workbench')
                    } else if(val.indexOf('/MainIndex?id=2') > -1) {
                        return i18n.t('header.productCenter')
                    } else if(val.indexOf('/MainIndex?id=3') > -1) {
                        return i18n.t('header.organizational')
                    } else if(val.indexOf('/MainIndex?id=4') > -1){
                        return i18n.t('header.postLoan')
                    } else if(val.indexOf('/MainIndex?id=5') > -1){
                        return i18n.t('header.reportForm')
                    } else if(val.indexOf('/MainIndex?id=6') > -1){
                        return i18n.t('header.system')
                    }
                } else {
                    return ''
                }
            }

        },
        filters: {
            showmeta (val) {
                if (val.indexOf('/MainIndex?') > -1) {
                    if (val.indexOf('/MainIndex?id=1') > -1) {
                        return i18n.t('header.workbench')
                    } else if(val.indexOf('/MainIndex?id=2') > -1) {
                        return i18n.t('header.productCenter')
                    } else if(val.indexOf('/MainIndex?id=3') > -1) {
                        return i18n.t('header.organizational')
                    } else if(val.indexOf('/MainIndex?id=4') > -1){
                        return i18n.t('header.postLoan')
                    } else if(val.indexOf('/MainIndex?id=5') > -1){
                        return i18n.t('header.reportForm')
                    } else if(val.indexOf('/MainIndex?id=6') > -1){
                        return i18n.t('header.system')
                    }
                } else {
                    return ''
                }
            }
        }
    }
</script>


<style scoped lang='scss'>
.tags {
    position: relative;
    height: 44px;
    overflow: hidden;
    background: #fff;
    // padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;
    ul {
        box-sizing: border-box;
        width: 5000px;
        height: 100%;
        margin-left: 45px;
            position: absolute;
    }
    .tags_arror{
        height: 44px;
        width: 44px;
        background: #fff;
        line-height: 44px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
    }
    .tags_left{
        border-right: 1px solid #f5f5f5;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .tags_right{
        border-right: 1px solid #f5f5f5;
        border-left: 1px solid #f5f5f5;
        position: absolute;
        top: 0;
        right: 100px;
        z-index: 100;
    }
}
.tags-li {
    float: left;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 44px;
    line-height: 44px;
    background: #fff;
    padding: 0 5px 0 15px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    transition: all .3s ease-in;
    border-right: 1px solid #f5f5f5;
    width: 100px;
    text-align: center;
    .tags-li-icon{
        margin-left: 5px;
        font-size: 14px;
        float: right;
    }
}
.tags-li:not(.active):hover {
    background: #f8f8f8;
}
.tags-li.active {
    color: #666;
    background: #eef9fc;
}
.tags-li-title {
    float: left;
    color: #666;
    width: 80%;
    .tit{
        display: inline-block;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

}
.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    z-index: 10;
    width: 100px;
    background: #fff;
    button{
        padding:15px 15px!important;
        border: none;
        border-radius: 0!important;
    }
}
</style>

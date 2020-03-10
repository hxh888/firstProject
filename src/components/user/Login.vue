<template>
  <div class="login" id="login">
      <ul class="imgList">
          <li><img src="../../assets/images/login1.jpg"></li>
          <!-- <li><img src="../../assets/images/login2.jpg" ></li>
          <li><img src="../../assets/images/login3.jpg" ></li> -->
      </ul>
      <div class="page-container">
          <div class="middle">
              <h1><img src="../../assets/images/logo2.png"></h1>

              <div class="form" >
                  <span ref="errorMsg" class="errorMsg"></span>  
                  <select name="legalPersonNum" id="legalPersonNum"  v-model='user.legalPersonNum' type="text"  :disabled="option.length == 1">
                      <option value="">{{$t("login.please_choose")}}</option>
                      <option :value="item.legalPersonNum" v-for="(item,index) in option" :key="index">{{item.legalPersonName}}</option>
                  </select>  
                  <input type="text"  v-model='user.loginId' class="username" :placeholder="$t('login.enter_username')">
                  
                  <input type="password"  v-model='user.password'  class="password" :placeholder="$t('login.enter_password')" @keyup.enter="toLogin()">

                <div class="Vcode">
                    <input type="text" v-model="user.imageCode" class="username" :placeholder="$t('login.please_enter_verification_code')">
                    <img :src="vCodeSrc" @click="refreshImg">
                </div>

                  <select v-model='user.lang' @change="changeLang">
                      <option value="zh">简体中文</option>
                      <option value="tw">繁体中文</option>
                      <option value="en">English</option>
                  </select>
                  <p class="forget_password">  <span @click="forgetPassword()">{{$t("login.forget_the_password")}}</span> </p>
                  <!-- <p class="forgetpass clearfix"><span class='error fl'>{{errorMsg}}</span> <a  class="fr" href="javascript:;">忘记密码</a></p>  -->

                  <button type="submit" class="sure" @click.prevent="toLogin()">{{$t("login.login")}}</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import * as uuidv1 from 'uuid/v1'
import * as CryptoJS from 'crypto-js'
import * as JsEncryptModlue from 'jsencrypt'
export default {
  name: 'Login',
  data () {
    return {
        user:{
            legalPersonNum:'',
            loginId:'',
            password:'',
            lang: window.sessionStorage.getItem('lang') || 'zh',
            formUUID:'',
            imageCode:''
        },
        option:[],
        dialogTableVisible:false,
        vCodeSrc:''
    }
  },
  mounted(){
    this.uuid();
    this.initLegalPersonNum(); //初始化选择项
    this.refreshImg()
    // this.toggleBackground(); //切换背景
  },
  methods:{
      //验证码
      refreshImg(){
          this.uuid();
          this.vCodeSrc = this.$api + '/captcha.jpg?uuid='+this.user.formUUID
      },

    // 多语言切换  
    changeLang () {
        window.sessionStorage.setItem('lang', this.user.lang)
        window.location.reload()
    },
   
    //切换背景图
    toggleBackground(){
        var $aLi=$(".imgList li");
        var num=0;
        var timer=null;
        funFade();
        funTime();
        function funFade(){
            $aLi.eq(num).fadeIn(2000).siblings().fadeOut()
        }
        function funTime(){
            timer=setInterval(function(){
                num++;
                num%=$aLi.length;
                funFade();
            },5000)
        }
    },

    getAesKey(){
        return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g,c => {
            const r = (Math.random()*16) | 0;
            const v = c === 'x' ? r : (r & 0x3) |0x8;
            return v.toString(16)
        })
    },
    uuid(){
        const uuid = uuidv1();
        console.log(uuid)
        this.user.formUUID =uuid;
        return uuid
    },
    async getSysTime() {
        return this.$get('bms/sys/getSysTime')
    },

    //初始化选择项
    initLegalPersonNum(){
        let _this = this;
        var legelPersonData = {
            "currentPage": "1",
            "pageSize": "1000",
            "init": 1,
            "flag": '1'
        };
        this.$post(this.$api + '/legalper/list',legelPersonData).then((res) => {
            if(res.returnCode == "000000"){
                _this.option = res.returnData.data;
                if (_this.option.length == 1) {
                    _this.user.legalPersonNum = _this.option[0].legalPersonNum
                }
            }
        })
    },
    //忘记密码
    forgetPassword(){
        const tel = '18535525591'
        const Email = '562357652@qq.com'
        this.$alert(i18n.t('login.phone') +': <span style="color:#5bc0de"> '+ tel +'</span><br>'  + i18n.t('login.Email') +': <span style="color:#5bc0de"> '+ Email +' </span>', i18n.t('login.Offline_contact_administrator_for_password_reset'), {
          dangerouslyUseHTMLString: true
        });
    },
    //去登录
    toLogin(){
        if (!this.user.legalPersonNum) {
            this.$alert(i18n.t('login.Please_choose_a_legal_person'), i18n.t('Prompt'), { //请选择法人！
                dangerouslyUseHTMLString: true
            });
            return;
        }
        if (!this.user.loginId) {
            /*温馨i18n.t('Prompt')*//*用户名和密码不能为空*/
            this.$alert(i18n.t('login.Username_can_not_be_empty'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
            });
            return;
        } else if (!this.user.password) {
            this.$alert(i18n.t('login.password_can_not_be_blank'), i18n.t('Prompt'), {
                dangerouslyUseHTMLString: true
            });
        }else if(!this.user.imageCode){
            this.$alert(i18n.t('login.verification_code_must_be_filled'),i18n.t('Prompt'),{
                dangerouslyUseHTMLString: true
            })
        }else{
            let _this = this;
            let lang = ''
            if (_this.user.lang == 'zh') {
                lang = 'zh_CN'
            } else if (_this.user.lang == 'en') {
                lang = 'en_US'
            } else {
                lang = 'zh_TW'
            }

            // this.uuid();
            let rsaPublicKey ='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC92yBGuV5kD/EGz9IS7ogUuD2D1Oz66o9nKP/SnjqbC2IVRZFbZvnjo6DCIIwpZnYhStKNhdRUITE8zSVtPnSo3aF4wGlM6LBRFgl60qlxLdTz4NSHYez7pFyg4StxomMoexkjM98+5tgIjOpik59v5fL18ZChqZDN8eyFK8tlTwIDAQAB'
            // 设置公钥
            const aesKey = this.getAesKey();
            // const sysTime = await this.loginService.getSysTime();
            const sysTime =  this.getSysTime();
            console.log(sysTime)
            const LoginMsgData = {
                "loginId": _this.user.loginId,
                "userP": _this.user.password, 
                "legalPersonNum": _this.user.legalPersonNum,
                "imageCode":_this.user.imageCode,
                "flag": 1,
                'init': 1,
                'bmsLanguage': lang,
                'uuid':_this.user.formUUID,
                'sysTime':sysTime.now
            };
            // const data = LoginMsgData.loginId | LoginMsgData.userP | LoginMsgData.legalPersonNum | LoginMsgData.flag | LoginMsgData.init | LoginMsgData.bmsLanguage | LoginMsgData.uuid | LoginMsgData.sysTime 
            // console.log(data)
            const aesData = CryptoJS.AES.encrypt(JSON.stringify(LoginMsgData),aesKey).toString();
            console.log(JSON.stringify(LoginMsgData))
            const rsa = new JsEncryptModlue.JSEncrypt()
            rsa.setPublicKey(rsaPublicKey)
            console.log(rsaPublicKey)
            const resEncrypt = rsa.encrypt(aesKey)
            console.log(resEncrypt)
            console.log(aesData)
            
            this.$post(this.$api + '/user/login',{key:resEncrypt,data:aesData}).then((res) => {

                if(res.returnCode == "000000"){
                    this.$store.commit('saveLoginData',res.returnData); //保存登录信息  
                    this.$store.commit('setLang');
                    this.$store.commit('setToken',res.token); 
                    this.$router.push({path:'/MainIndex?id=6'})
                    sessionStorage.setItem("store",JSON.stringify(this.$store.state))
                }else{
                    var str = `
                            <p >${i18n.t('reason')}:<span style='color:#5bc0de;'>${res.returnMsg}</span></p>
                        `
                        this.$alert(str, i18n.t('Prompt'), {
                            dangerouslyUseHTMLString: true
                        });
                    
                }
            })
           
        }
    }
  }
  
}
</script>

<style scoped lang="scss">
#login{
    .el-dialog{
        width: 20%;
    }
}
.imgList{
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
.imgList li{width: 100%;height: 100%;}

.page-container{
    text-align:  center;
    position: absolute;
    left: 50%;
    margin-left: -210px;
    top:120px;
    .Vcode{
        input{
            display: inline-block;
            width:220px;
            border-radius: 6px 0 0 6px;
        }
        img{
            display:inline-block;
            width:125px;
            vertical-align:bottom;
            cursor:pointer
        }
    }
    .middle {
        width: 420px;
        padding: 35px 0;
        height: 100%;
        background: rgba(255, 255, 255, .3);
        margin: 0 auto;
        
        h1 {
            font-size: 30px;
            font-weight: 700;
            text-shadow: 0 1px 4px rgba(0,0,0,.2);
            img{
              height:80px;
            }
        }
        .form{
            position: relative;
            margin: 15px auto 0 auto;
            text-align: center;
            select{
              option{
                height: 30px;
                background: #ded8d8;
                color: #666;
              }
            }
        }
    }
}
.forgetpass {
    padding: 0 35px;
    margin-top: 15px;
    a{
      color: #ef4300;
      text-decoration: none;
      font-size: 13px;
    }
    .error{
        color: #ef4300;
    }
}

input:-moz-placeholder { color: #fff; }
input:-ms-input-placeholder { color: #fff; }
input::-webkit-input-placeholder { color: #fff; }

input:focus {
    outline: none;
    -moz-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
}
input,select{
    box-sizing: border-box;
    width: 350px;
    height: 45px;
    margin-top: 20px;
    padding: 0 15px;
    background: #2d2d2d; /* browsers that don't support rgba */
    background: rgba(45,45,45,.15);
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #3d3d3d; /* browsers that don't support rgba */
    border: 1px solid rgba(255,255,255,.15);
    -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
}
button.sure {
    cursor: pointer;
    width: 350px;
    height: 44px;
    background: #ef4300;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #ff730e;
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
}

button.sure:hover {
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
}

button.sure:active {
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:        
        0 5px 8px 0 rgba(0,0,0,.1) inset,
        0 1px 4px 0 rgba(0,0,0,.1);

    border: 0px solid #ef4300;
}
.errorMsg{
    display: block;
    width: 350px;
    margin: 0 auto;
    text-align: left;
    color: #f60;
}
.forget_password{
    width: 350px;
    margin: 0 auto;
    text-align: right;
    color: #f60;
    line-height:50px;
    span{
        cursor: pointer;
    }
}
</style>


import Vue from 'vue'
//import CryptoJS from 'crypto-js'
import * as CryptoJS from 'crypto-js'

import* as JsEncryptModlue from 'encryptlong'



export default{

    getAesKey(){//任意16位的字符串做签名
        return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g,c=>{
            const r = (Math.random()*16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16)
        })
    },

    encrypt(data){//加密
        let rsaPublicKey = ''
        const aesKey = this.getAesKey();

        const aesData = CryptoJS.AES.encrypt(JSON.stringify(data),aesKey).toString();
        const rsa = new JsEncryptModlue.JSEncrypt()
        rsa.setPublicKey(rsaPublicKey)
        const resEncrypt = rsa.encryptLong(aesKey)
        return {key:resEncrypt,data:aesData}
    },










    decrypt(word){
        var keyStr = ''
        var decrypt1 = new JsEncryptModlue.JSEncrypt()
        decrypt1.setPrivateKey(keyStr)
        var decrypt = decrypt1.decryptLong(word,{
            mode: CryptoJS.mode.ECB,
            padding:CryptoJS.pad.Pkcs7,
            iv:'',
        })

        const Base64 = require('js-base64').Base64
        decrypt = JSON.parse(Base64.decode(decrypt))

        return decrypt;
    }
}
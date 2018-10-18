import Vue from 'vue'

import CryptoJS from 'crypto-js'

export default {
    install(Vue, options) {
        //时间戳转具体日期 time：时间戳 format:要转化的格式
        Vue.prototype.formatDuring = function (time,format) {
            if(!time){
                return ''
            }
            var date = new Date(parseInt(time));
            var month, day, hour, min,second;
            parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
            date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
            date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
            date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
            date.getSeconds() < 10 ? second = '0' + date.getSeconds() : second = date.getSeconds();
            switch(format)
            {
                //年月日时分秒
                case 'YY-MM-DD-HH-MM-SS':
                    return date.getFullYear().toString().substr(2) +'/' + [month, day].join('/') + '  ' + hour + ':' + min + ':' + second
                    break;
                case 'YY-MM-DD-HH-MM':
                    return date.getFullYear().toString().substr(2) +'/' + [month, day].join('/') + '  ' + hour + ':' + min
                    break;
                case 'YY-MM-DD-HH':
                    return date.getFullYear().toString().substr(2) +'/' + [month, day].join('/') + '  ' + hour
                    break;
                case 'YY-MM-DD':
                    return date.getFullYear().toString().substr(2) +'/' + [month, day].join('/')
                    break;
                case 'MM-DD':
                    return [month, day].join('/')
                    break;
                case 'MM-DD-HH':
                    return [month, day].join('/') + '' + hour
                    break;
                case 'MM-DD-HH-MM':
                    return [month, day].join('/') + '  ' + hour + ':' + min
                    break;
                case 'MM-DD-HH-MM-SS' :
                    return [month, day].join('/') + '  ' + hour + ':' + min + ':' + second
                    break;
                case 'MM-DD':
                    return [month, day].join('/')
                    break;
            }

        }
        //与app交互方法（不传参）
        Vue.prototype.appAction = function(fun) {
            var url = `seekfunbook://APPS.callBackApps?actionName=${fun}`
            var name = "callApp_"+ new Date().getTime()
            var iFrame = document.getElementById(name)
            if(iFrame==null){
                iFrame=document.createElement("iframe")
                iFrame.setAttribute("id",name)
            }
            iFrame.setAttribute("src",url)
            iFrame.setAttribute("style","display:none;")
            iFrame.setAttribute("height","0px")
            iFrame.setAttribute("width","0px")
            iFrame.setAttribute("frameborder","0")
            document.body.appendChild(iFrame)
            setTimeout(()=>{
                iFrame.parentNode.removeChild(iFrame)
                iFrame = null
            },10)
        },
        //3DES加密 message:加密值 key:密钥,iv:偏移
        Vue.prototype.encryptTripleDes = function(message,key,iv){
            const keyHex = CryptoJS.enc.Utf8.parse(key);
            const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
                iv:CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
             });
            return encrypted.toString()
        },
        //3DES解密 ciphertext:解密值 key:密钥,iv:偏移
        Vue.prototype.decryptTripleDes = function(ciphertext,key,iv){
            const keyHex = CryptoJS.enc.Utf8.parse(key);
            // direct decrypt ciphertext
            const decrypted = CryptoJS.TripleDES.decrypt({
                        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
             }, keyHex, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7,
                        iv:CryptoJS.enc.Utf8.parse(iv)
            });
            return decrypted.toString(CryptoJS.enc.Utf8)
        },
        //截取url中的key key:url中你想获取的属性名 return属性值
        Vue.prototype.getQueryString = function(key){
            var after = window.location.hash.split("?")[1]
                if(after)
                {
                    var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)")
                    var r = after.match(reg)
                    if(r != null)
                    {
                        return  decodeURIComponent(r[2])
                    }
                    else
                    {
                        return null
                    }
                }else{
                    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]);
                    return null;
                }
        },
        //与app交互分享信息和显示隐藏分享按钮方法（传参） fun:方法 1：share显示隐藏分享按钮 2:loadShareInfo 分享信息 shareInfo：分享内容
        Vue.prototype.share = function(fun,shareInfo){
            //如果是显示隐藏分享按钮
            if(fun === 'share'){
                var msg = encodeURI(JSON.stringify({"shareTitle":shareInfo.shareTitle, "shareContent":shareInfo.shareContent, "shareImg":shareInfo.shareImg,"shareUrl":shareInfo.shareUrl,"isHidden":shareInfo.isHidden}))
            }
            else if(fun === 'loadShareInfo'){
                var msg = encodeURI(JSON.stringify({"shareTitle":shareInfo.shareTitle, "shareContent":shareInfo.shareContent, "shareImg":shareInfo.shareImg,"shareUrl":shareInfo.shareUrl}))
            }
            var url = `https://APPS.callBackApps?actionName=${fun}&param=${msg}`
            var name = "callApp_"+ new Date().getTime()
            var iFrame = document.getElementById(name)
            if(iFrame==null){
                iFrame=document.createElement("iframe")
                iFrame.setAttribute("id",name)
            }
            iFrame.setAttribute("src",url)
            iFrame.setAttribute("style","display:none;")
            iFrame.setAttribute("height","0px")
            iFrame.setAttribute("width","0px")
            iFrame.setAttribute("frameborder","0")
            document.body.appendChild(iFrame)
            setTimeout(()=>{
                iFrame.parentNode.removeChild(iFrame)
                iFrame = null
            },10)
        },
        //判断是否PC
        Vue.prototype.isPC = function(){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ){
                return false;
            }
            else {
                return true;
            }
        },
        /*将数字转换为大写金额*/
        Vue.prototype.changeToChinese = function(Num){
            //判断如果传递进来的不是字符的话转换为字符
            if(typeof Num == "number") {
                Num = new String(Num);
            };
            Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
            Num = Num.replace(/ /g, "") //替换tomoney()中的空格
            Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
            if(isNaN(Num)) { //验证输入的字符是否为数字
                //alert("请检查小写金额是否正确");
                return "";
            };
            //字符处理完毕后开始转换，采用前后两部分分别转换
            var part = String(Num).split(".");
            var newchar = "";
            //小数点前进行转化
            for(var i = part[0].length - 1; i >= 0; i--) {
                if(part[0].length > 10) {
                    return "";
                    //若数量超过拾亿单位，提示
                }
                var tmpnewchar = ""
                var perchar = part[0].charAt(i);
                switch(perchar) {
                    case "0":
                        tmpnewchar = "零" + tmpnewchar;
                        break;
                    case "1":
                        tmpnewchar = "壹" + tmpnewchar;
                        break;
                    case "2":
                        tmpnewchar = "贰" + tmpnewchar;
                        break;
                    case "3":
                        tmpnewchar = "叁" + tmpnewchar;
                        break;
                    case "4":
                        tmpnewchar = "肆" + tmpnewchar;
                        break;
                    case "5":
                        tmpnewchar = "伍" + tmpnewchar;
                        break;
                    case "6":
                        tmpnewchar = "陆" + tmpnewchar;
                        break;
                    case "7":
                        tmpnewchar = "柒" + tmpnewchar;
                        break;
                    case "8":
                        tmpnewchar = "捌" + tmpnewchar;
                        break;
                    case "9":
                        tmpnewchar = "玖" + tmpnewchar;
                        break;
                }
                switch(part[0].length - i - 1) {
                    case 0:
                        tmpnewchar = tmpnewchar + "元";
                        break;
                    case 1:
                        if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                        break;
                    case 2:
                        if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                        break;
                    case 3:
                        if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                        break;
                    case 4:
                        tmpnewchar = tmpnewchar + "万";
                        break;
                    case 5:
                        if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                        break;
                    case 6:
                        if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                        break;
                    case 7:
                        if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                        break;
                    case 8:
                        tmpnewchar = tmpnewchar + "亿";
                        break;
                    case 9:
                        tmpnewchar = tmpnewchar + "拾";
                        break;
                }
                var newchar = tmpnewchar + newchar;
            }
            //小数点之后进行转化
            if(Num.indexOf(".") != -1) {
                if(part[1].length > 2) {
                    // alert("小数点之后只能保留两位,系统将自动截断");
                    part[1] = part[1].substr(0, 2)
                }
                for(i = 0; i < part[1].length; i++) {
                    tmpnewchar = ""
                    perchar = part[1].charAt(i)
                    switch(perchar) {
                        case "0":
                            tmpnewchar = "零" + tmpnewchar;
                            break;
                        case "1":
                            tmpnewchar = "壹" + tmpnewchar;
                            break;
                        case "2":
                            tmpnewchar = "贰" + tmpnewchar;
                            break;
                        case "3":
                            tmpnewchar = "叁" + tmpnewchar;
                            break;
                        case "4":
                            tmpnewchar = "肆" + tmpnewchar;
                            break;
                        case "5":
                            tmpnewchar = "伍" + tmpnewchar;
                            break;
                        case "6":
                            tmpnewchar = "陆" + tmpnewchar;
                            break;
                        case "7":
                            tmpnewchar = "柒" + tmpnewchar;
                            break;
                        case "8":
                            tmpnewchar = "捌" + tmpnewchar;
                            break;
                        case "9":
                            tmpnewchar = "玖" + tmpnewchar;
                            break;
                    }
                    if(i == 0) tmpnewchar = tmpnewchar + "角";
                    if(i == 1) tmpnewchar = tmpnewchar + "分";
                    newchar = newchar + tmpnewchar;
                }
            }
            //替换所有无用汉字
            while(newchar.search("零零") != -1)
            newchar = newchar.replace("零零", "零");
            newchar = newchar.replace("零亿", "亿");
            newchar = newchar.replace("亿万", "亿");
            newchar = newchar.replace("零万", "万");
            newchar = newchar.replace("零元", "元");
            newchar = newchar.replace("零角", "");
            newchar = newchar.replace("零分", "");
            if(newchar.charAt(newchar.length - 1) == "元") {
                newchar = newchar + "整"
            }
            return newchar;
        }
    }

}
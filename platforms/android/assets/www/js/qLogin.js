window.xlQuickLogin={};(function(){var Util,CONFIG,request,isIE6=!!("ActiveXObject"in window&&!("XMLHttpRequest"in window));CONFIG={LOGIN_ID:"",REGISTER_ID:"",ALL_HTTPS:false,SET_ROOT_DOMAIN:true,LOGIN_TYPE_COOKIE_NAME:"_x_t_",AUTO_LOGIN_COOKIE_NAME:"_x_a_",AUTO_LOGIN_EXPIRE_TIME:2592e3,LOGIN_TYPES:["account","mobile"],REGISTER_TYPES:["mobile"],UI_THEME:"embed",UI_STYLE:"",THIRD_LOGIN_DISPLAY:true,LOGIN_SUCCESS_FUNC:function(){location.reload()},REGISTER_SUCCESS_FUNC:function(){location.reload()},LOGIN_SUCCESS_URL:location.href,REGISTER_SUCCESS_URL:location.href,ON_UI_CHANGE:function(ui){},POPUP_MASK:true,POPUP_ALLOW_CLOSE:true,POPUP_CLOSE_FUNC:function(){},POPUP_PRELOAD:true,DEFUALT_BACKGROUND:"http://i.xunlei.com/login/theme/popup/images/layer_bg.png",DEFUALT_UI:"login",IFRAME_ALLOW_TRANSPARENCY:false,IFRAME_STYLE:"",IFRAME_ID:"loginIframe",LOGOUT_FUNC:function(){location.reload()},LOGIN_BUTTON_TEXT:"",REGISTER_BUTTON_TEXT:"",REGISTER_STAT_DATA:"",DOMAIN:"xunlei.com",DOMAIN_ALLOWED:["xunlei.com","kankan.com"],ALLOW_ACCOUNT_REGISTER_IDS:["vip_niu","niux_web","game"],VERSION:"2.5",DEBUG:false,DEFAULT_ACCOUNT:"",THIRD_LOGIN_TARGET_PARENT:false,ALERT_ERROR:false,USE_CDN:false};Util=function(){var binders=[],undef=void 0,self;self={randString:function(length,max){var random_string_chars="abcdefghijklmnopqrstuvwxyz0123456789",len=random_string_chars.length;max=max?Math.min(max,len):len;var i,ret=[];for(i=0;i<length;i++){ret.push(random_string_chars.charAt(Math.floor(Math.random()*max)))}return ret.join("")},isSessionid:function(key){return key&&key.length&&(key.length===128||key.length===160)?true:false},getCookie:function(param,decode){var c,cookie=document.cookie,t,i,l;decode=decode===undef?true:decode;if(param){c=cookie.match(new RegExp("(^| )"+param+"=([^;]*)"))==null?undef:RegExp.$2;if(decode&&c!==undef){try{c=decodeURIComponent(c)}catch(e){c=unescape(c)}}return c}else{var obj={};cookie=cookie.split("; ");for(i=0,l=cookie.length;i<l;++i){t=cookie[i].split("=");c=t.pop();if(decode&&c!==undef){try{c=decodeURIComponent(c)}catch(e){c=unescape(c)}}obj[t.shift()]=c}return obj}},setCookie:function(name,value,expire,domain,path,secure){var cookie,expire=expire?new Date((new Date).getTime()+expire).toGMTString():false;cookie=name+"="+escape(value);cookie+="; path="+(path?path:"/");if(domain){cookie+="; domain="+domain}if(secure){cookie+="; secure"}if(expire){cookie+="; expires="+expire}document.cookie=cookie},delCookie:function(name,domain,path,secure){self.setCookie(name,"",-6e4,domain,path,secure)},bind:function(obj,type,func,scope){if(typeof func!=="function"){return}if(typeof obj==="string"){obj=document.getElementById(obj)}if(!obj){throw new Error("bind on an undefined target")}function handler(e){e=e||window.event;if(!e.target){e.target=e.srcElement;e.preventDefault=function(){this.returnValue=false};e.stopPropagation=function(){this.cancelBubble=true}}if(false===func.call(scope||this,e)){e.preventDefault();e.stopPropagation()}}var true_type=type.split(".").shift();binders.push({obj:obj,handler:handler,type:type});if(obj.attachEvent){obj.attachEvent("on"+true_type,handler)}else{if(obj.addEventListener){obj.addEventListener(true_type,handler,false)}}},inArray:function(value,obj){if(typeof obj!="object"){return false}var k;for(k in obj){if(obj[k]===value){return true}}return false}};return self}();request=function(){var DOMAIN,SERVER_LOGIN=["https://login","https://login2","https://login3"],SERVER_CAPTCHA=["http://verify1","http://verify2","http://verify3"],SERVER_LOGIN_STATUS=[1,1,1],SERVER_CAPTCHA_STATUS=[1,1,1];function getServer(type,path){var servers=type==="captcha"?SERVER_CAPTCHA:SERVER_LOGIN,status,index,len=servers.length,count=0,flag,tmp;tmp=Util.getCookie("_s."+type+"_");if(tmp&&(tmp=tmp.split(","))&&tmp.length===len){status=tmp;type==="captcha"?SERVER_CAPTCHA_STATUS=status:SERVER_LOGIN_STATUS=status}else{status=type==="captcha"?SERVER_CAPTCHA_STATUS:SERVER_LOGIN_STATUS}index=(new Date).getTime()%len;while(count++<len){if(status[index]-1===0){flag=true;break}else{index=(index+1)%len}}if(!flag){index=(new Date).getTime()%len}return servers[index]+DOMAIN+(path?path:"")}function request(action,callback){DOMAIN="."+CONFIG.DOMAIN;switch(action){case"logout":(new Image).src=getServer("login","/unregister/?sessionid="+Util.getCookie("sessionid"));var xlCookies="VERIFY_KEY,blogresult,active,isspwd,score,downbyte,isvip,jumpkey,logintype,nickname,onlinetime,order,safe,downfile,sessionid,sex,upgrade,userid,usernewno,usernick,usertype,usrname,loginkey,xl_autologin",i,cookies=xlCookies.split(",");for(i=cookies.length;i>0;--i){Util.delCookie(cookies[i-1],CONFIG.DOMAIN)}Util.delCookie(CONFIG.LOGIN_TYPE_COOKIE_NAME,CONFIG.DOMAIN);callback&&callback();break;default:throw new Error("not support action: "+action)}}return request}();(function(){var inited=false,PARAMS={};xlQuickLogin={init:function(opts){if(typeof opts!=="object"||inited===true){return}var i,flag,host=location.host,p,domain;p=host.split(".");domain=p.pop();domain=(p.pop()+"."+domain).toLowerCase();for(i=CONFIG.DOMAIN_ALLOWED.length;i>0;--i){if(domain===CONFIG.DOMAIN_ALLOWED[i-1]){flag=true;break}}if(!flag){throw new Error("你的域名不支持此快速登录")}CONFIG.DOMAIN=domain;var k,_k,v,_v,_t,dfts={},key_map={},not_allowd={DEBUG:1,DOMAIN:1,DOMAIN_ALLOWED:1,VERSION:1,ALLOW_ACCOUNT_REGISTER_IDS:1,IFRAME_ID:1};for(k in CONFIG){if(!CONFIG.hasOwnProperty(k)||k in not_allowd){continue}_k=k.toLowerCase().replace(/[_\-]/g,"");dfts[_k]=CONFIG[k];key_map[_k]=k}var except=",UI_STYLE,LOGIN_ID,IFRAME_STYLE",setloginid=false;for(k in opts){if(!opts.hasOwnProperty(k)){continue}_k=k.toLowerCase().replace(/[_\-]/g,"");if(_k in dfts){_v=dfts[_k];v=opts[k];_t=typeof _v;_k=key_map[_k];if(_t==="boolean"&&except.indexOf(_k)===-1){v=!!v}if(v===_v&&_k!=="LOGIN_ID"){continue}if(_t===typeof v||except.indexOf(_k)>=0){if(_k==="LOGIN_ID"){setloginid=true}CONFIG[_k]=v}else{throw new Error("config key("+k+") error, type not match")}}else{throw new Error("config key("+k+") not exists")}}if(!setloginid){throw new Error("not init loginID, please init it")}if(CONFIG.SET_ROOT_DOMAIN){document.domain=CONFIG.DOMAIN}if(CONFIG.ALL_HTTPS&&CONFIG.SET_ROOT_DOMAIN){throw new Error("全https模式下，SET_ROOT_DOMAIN必须设置为false")}if(CONFIG.UI_THEME==="popup"&&!CONFIG.SET_ROOT_DOMAIN){throw new Error("适用弹窗主题，SET_ROOT_DOMAIN必须设置为true")}if(!CONFIG.IFRAME_STYLE){if(CONFIG.UI_THEME==="embed"){CONFIG.IFRAME_STYLE={width:"420px",height:"479px"}}else{if(CONFIG.UI_THEME==="popup"){var position=isIE6?"absolute":"fixed";CONFIG.IFRAME_STYLE={width:"420px",height:"395px",position:position,left:"50%",top:"50%",marginLeft:"-210px",marginTop:"-250px",zIndex:"1000000"}}}}inited=true;if(CONFIG.UI_THEME==="popup"&&CONFIG.POPUP_PRELOAD){this.getLoginIframe(document.body);document.getElementById(CONFIG.IFRAME_ID).style.display="none"}},getLoginIframe:function(div){if(!inited){throw new Error("please init first: xlQuickLogin.init()")}if(!div){throw new Error("param error")}var iframe=document.createElement("iframe"),params={},k,ary=[],registerTypes="",loginTypes="",url,style,dom;if(CONFIG.LOGIN_TYPES){for(k in CONFIG.LOGIN_TYPES){if(CONFIG.LOGIN_TYPES[k]==="account"){loginTypes+="1"}else{if(CONFIG.LOGIN_TYPES[k]==="mobile"&&CONFIG.REGISTER_ID){loginTypes+="2"}else{if(CONFIG.LOGIN_TYPES[k]==="client"){loginTypes+="3"}}}}}if(CONFIG.REGISTER_TYPES){if(CONFIG.REGISTER_TYPES.length>2){throw new Error("最多只能填2种注册方式")}if(!Util.inArray(CONFIG.REGISTER_ID,CONFIG.ALLOW_ACCOUNT_REGISTER_IDS)){if(Util.inArray("account",CONFIG.REGISTER_TYPES)){throw new Error("不允许使用字符串注册")}}for(k in CONFIG.REGISTER_TYPES){if(CONFIG.REGISTER_TYPES[k]==="mail"){registerTypes+="1"}else{if(CONFIG.REGISTER_TYPES[k]==="mobile"){registerTypes+="2"}else{if(CONFIG.REGISTER_TYPES[k]==="account"){registerTypes+="3"}}}}}params["r_d"]=CONFIG.SET_ROOT_DOMAIN?1:0;params["use_cdn"]=CONFIG.USE_CDN?1:0;if(!CONFIG.SET_ROOT_DOMAIN){params["l_id"]=CONFIG.LOGIN_ID;params["r_id"]=CONFIG.REGISTER_ID;params["a_t"]=CONFIG.AUTO_LOGIN_EXPIRE_TIME?CONFIG.AUTO_LOGIN_EXPIRE_TIME:0;params["a_h"]=CONFIG.ALL_HTTPS?1:0;params["a_e"]=CONFIG.ALERT_ERROR?1:0;params["r_d"]=CONFIG.SET_ROOT_DOMAIN?1:0;params["d_ui"]=CONFIG.DEFUALT_UI;params["tl_display"]=CONFIG.THIRD_LOGIN_DISPLAY?1:0;params["theme"]=CONFIG.UI_THEME;params["style"]=CONFIG.UI_STYLE;params["l_b_text"]=CONFIG.LOGIN_BUTTON_TEXT?CONFIG.LOGIN_BUTTON_TEXT:"";params["r_b_text"]=CONFIG.REGISTER_BUTTON_TEXT?CONFIG.REGISTER_BUTTON_TEXT:"";params["ls_url"]=encodeURIComponent(CONFIG.LOGIN_SUCCESS_URL);params["rs_url"]=encodeURIComponent(CONFIG.REGISTER_SUCCESS_URL);params["l_types"]=loginTypes;params["r_types"]=registerTypes;params["df_act"]=CONFIG.DEFAULT_ACCOUNT;params["tl_tp"]=CONFIG.THIRD_LOGIN_TARGET_PARENT}else{var paramsStr=",LOGIN_ID,REGISTER_ID,ALL_HTTPS,SET_ROOT_DOMAIN,AUTO_LOGIN_EXPIRE_TIME,LOGIN_TYPES,REGISTER_TYPES,UI_THEME,UI_STYLE,LOGIN_SUCCESS_URL,REGISTER_SUCCESS_URL,DEFUALT_BACKGROUND,DEFUALT_UI,LOGIN_BUTTON_TEXT,REGISTER_BUTTON_TEXT,THIRD_LOGIN_DISPLAY,ALERT_ERROR,THIRD_LOGIN_TARGET_PARENT,";for(k in CONFIG){if(k==="LOGIN_TYPES"){PARAMS[k]=loginTypes;continue}if(k==="REGISTER_TYPES"){PARAMS[k]=registerTypes;continue}if(paramsStr.indexOf(","+k+",")>=0){PARAMS[k]=CONFIG[k]}}}for(k in params){ary.push(k+"="+params[k])}url=(CONFIG.ALL_HTTPS===false?"http://":"https://")+"i."+CONFIG.DOMAIN+"/login/";url=url+"?"+ary.join("&")+"&timestamp="+(new Date).getTime()+"&refurl="+encodeURIComponent(document.location.href);iframe.src=url;iframe.id=CONFIG.IFRAME_ID;iframe.name=CONFIG.IFRAME_ID;iframe.frameBorder=0;iframe.scrolling="no";if(CONFIG.IFRAME_ALLOW_TRANSPARENCY==true){iframe.allowTransparency=true}style=iframe.style;for(k in CONFIG.IFRAME_STYLE){style[k]=CONFIG.IFRAME_STYLE[k]}if(typeof div==="string"){dom=document.getElementById(div)}else{dom=div}dom.appendChild(iframe);if(CONFIG.UI_THEME==="popup"){Util.bind(document,"keypress.xl",function(e){if(e.keyCode=="27"){xlQuickLogin.closeFunc()}})}},popup:function(){if(CONFIG.UI_THEME!=="popup"){throw new Error("该函数只适用弹窗主题")}if(CONFIG.SET_ROOT_DOMAIN!==true){throw new Error("使用弹窗主题，SET_ROOT_DOMAINB必须设置为true")}if(this.isLogined()){throw new Error("已有登录态，无法弹出登录框")}var mask,style;if(!document.getElementById(CONFIG.IFRAME_ID)){this.getLoginIframe(document.body)}else{document.getElementById(CONFIG.IFRAME_ID).style.display=""}if(isIE6){document.getElementById(CONFIG.IFRAME_ID).style.bottom="auto"}if(CONFIG.POPUP_MASK){if(typeof CONFIG.POPUP_MASK==="string"){mask=document.getElementById(CONFIG.POPUP_MASK);mask.style.display=""}if(!mask){mask=document.createElement("div");CONFIG.POPUP_MASK="xl_login_mask_"+Util.randString(6);mask.id=CONFIG.POPUP_MASK;style=mask.style;style.opacity="0.4";style.filter="alpha(opacity=40)";style.backgroundColor="black";style.position=isIE6?"absolute":"fixed";style.left="0";style.top="0";style.bottom="0";style.right="0";style.zIndex="999999";document.body.appendChild(mask)}if(isIE6){document.getElementById("loginIframe").style.top=500}}},isLogined:function(){if(!inited){throw new Error("please init first: xlQuickLogin.init()")}var c=Util.getCookie();if(Util.isSessionid(c.sessionid)&&c.userid&&c.userid>0){return true}return false},logout:function(callback){if(typeof callback==="function"){CONFIG.LOGOUT_FUNC=callback}if(this.isLogined()){request("logout",function(){CONFIG.LOGOUT_FUNC()})}else{CONFIG.LOGOUT_FUNC()}},nickname:function(){var nick=Util.getCookie("usernick");try{nick=decodeURIComponent(nick)}catch(e){nick=unescape(nick)}return nick},loginFunc:function(){CONFIG.LOGIN_SUCCESS_FUNC();if(CONFIG.UI_THEME==="popup"){document.getElementById(CONFIG.IFRAME_ID).style.display="none";if(typeof CONFIG.POPUP_MASK==="string"){document.getElementById(CONFIG.POPUP_MASK).style.display="none"}}},registerFunc:function(){CONFIG.REGISTER_SUCCESS_FUNC();if(CONFIG.UI_THEME==="popup"){document.getElementById(CONFIG.IFRAME_ID).style.display="none";if(typeof CONFIG.POPUP_MASK==="string"){document.getElementById(CONFIG.POPUP_MASK).style.display="none"}}},uiChangeFunc:function(ui){CONFIG.ON_UI_CHANGE(ui)},setBackgroud:function(url){if(CONFIG.SET_ROOT_DOMAIN!==true){throw new Error("使用setBackgroud方法，SET_ROOT_DOMAINB必须设置为true")}window.frames[CONFIG.IFRAME_ID].xlQuickLogin.setBackgroud(url)},closeFunc:function(){if(!CONFIG.POPUP_ALLOW_CLOSE){return}document.getElementById(CONFIG.IFRAME_ID).style.display="none";if(typeof CONFIG.POPUP_MASK==="string"){document.getElementById(CONFIG.POPUP_MASK).style.display="none"}CONFIG.POPUP_CLOSE_FUNC()},showUI:function(ui){if(CONFIG.SET_ROOT_DOMAIN!==true){throw new Error("使用showUI方法，SET_ROOT_DOMAINB必须设置为true")}if(ui!=="login"&&ui!=="register"){throw new Error("params error")}if(ui==="register"&&(CONFIG.REGISTER_ID===""||CONFIG.REGISTER_TYPES===[])){throw new Error("你的配置不支持注册")}if(ui==="login"&&CONFIG.LOGIN_TYPES===[]){throw new Error("你的配置不支持登录")}window.frames[CONFIG.IFRAME_ID].xlQuickLogin.showUI(ui)},PARAMS:PARAMS,getUsrname:function(){var c=Util.getCookie();return c.usrname},getLogintype:function(){var c=Util.getCookie();return c.logintype},getBlogresult:function(){var c=Util.getCookie();return c.blogresult},getUsernick:function(){var c=Util.getCookie();return c.usernick},getUpgrade:function(){var c=Util.getCookie();return c.upgrade},getIsvip:function(){var c=Util.getCookie();return c.isvip},getState:function(){var c=Util.getCookie();return c.state},getUsernewno:function(){var c=Util.getCookie();return c.usernewno},getScore:function(){var c=Util.getCookie();return c.score},getUserid:function(){var c=Util.getCookie();return c.userid},getUsertype:function(){var c=Util.getCookie();return c.usertype}}})()})();
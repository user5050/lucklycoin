// pv_alert('init');
;
(function(win) {
  // alert('in');

  var gOption = {
    "appid": "10003", //产品的appid
    "domain": win.location.host, //产品的web域名
    "xlbtid": "8" //产品xlbtid
  }
  var param = pv_getUrlParam('test');
  // alert(param)

  function pv_alert(str) {
    // alert('in')
    if (param == 'test') {
      alert(str);
    }
  }
  pv_alert('init');
  /*
   * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
   * Digest Algorithm, as defined in RFC 1321.
   * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
   * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
   * Distributed under the BSD License
   * See http://pajhome.org.uk/crypt/md5 for more info.
   */

  /*
   * Configurable variables. You may need to tweak these to be compatible with
   * the server-side, but the defaults work in most cases.
   */
  var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
  var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
  var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

  /*
   * These are the functions you'll usually want to call
   * They take string arguments and return either hex or base-64 encoded strings
   */
  function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
  }

  function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz));
  }

  function str_md5(s) {
    return binl2str(core_md5(str2binl(s), s.length * chrsz));
  }

  function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data));
  }

  function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data));
  }

  function str_hmac_md5(key, data) {
    return binl2str(core_hmac_md5(key, data));
  }

  /*
   * Perform a simple self-test to see if the VM is working
   */
  function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
  }

  /*
   * Calculate the MD5 of an array of little-endian words, and a bit length
   */
  function core_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;

      a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

  }

  /*
   * These functions implement the four basic operations the algorithm uses.
   */
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }

  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  /*
   * Calculate the HMAC-MD5, of a key and some data
   */
  function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16),
      opad = Array(16);
    for (var i = 0; i < 16; i++) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
  }

  /*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */
  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  /*
   * Bitwise rotate a 32-bit number to the left.
   */
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  /*
   * Convert a string to an array of little-endian words
   * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
   */
  function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
  }

  /*
   * Convert an array of little-endian words to a string
   */
  function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
      str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str;
  }

  /*
   * Convert an array of little-endian words to a hex string.
   */
  function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
  }

  /*
   * Convert an array of little-endian words to a base-64 string
   */
  function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
      var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
      for (var j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
        else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
      }
    }
    return str;
  }

  function trim(str) { //删除左右两端的空格
    　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
  }

  function hb_setCookie(name, value, hours, isBaseDomain) {
    // console.log(value)
    value = value + '';
    if (isBaseDomain != undefined && isBaseDomain == 1) {
      hb_setRealCookie(name, value, hours, 1);
    } else {
      var vipcookie = getRealCookie('vipcookie');
      if (trim(value) == '') { //删除cookie
        if (vipcookie != '') {
          var check = getCookie(name);
          if (check != '') {
            var cookies = vipcookie.split('&');
            var newcookie = new Array;
            for (var i = 0; i < cookies.length; i++) {
              ary = cookies[i].split('=');
              if (ary.length > 1 && ary[0] != name) {
                newcookie.push(cookies[i]);
              }
            }
            vipcookie = newcookie.join('&');
          }
        }
      } else { //添加cookie
        //删除原生cookie中的此值
        hb_setRealCookie(name, '', 0);
        if (vipcookie == '') {
          vipcookie = trim(name) + '=' + encodeURIComponent(value);
        } else {
          //check if has the same item , if so , replace it , otherwise add it.
          var check = getCookie(name);
          if (check != '') {
            var cookies = vipcookie.split('&');
            for (var i = 0; i < cookies.length; i++) {
              ary = cookies[i].split('=');
              if (ary.length > 1 && ary[0] == name) {
                cookies[i] = name + '=' + encodeURIComponent(value);
                break;
              }
            }
            vipcookie = cookies.join('&');
          } else {
            vipcookie = vipcookie + '&' + trim(name) + '=' + encodeURIComponent(value);
          }
        }
      }
      if (hours != undefined) {
        hb_setRealCookie('vipcookie', vipcookie, hours);
      } else {
        hb_setRealCookie('vipcookie', vipcookie);
      }
    }
  }


  function hb_setRealCookie(name, value, hours, isBaseDomain) {
    //console.log(config['domain'])
    if (win.location.href.indexOf('.xunlei.com') != -1) {
      domain = ".xunlei.com";
    } else {
      domain = ".xunlei.com";
    }
    if (arguments.length > 2) {
      var expireDate = new Date(new Date().getTime() + hours * 3600000);
      if (isBaseDomain != undefined && isBaseDomain == 1) {
        document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=.xunlei.com; expires=" + expireDate.toGMTString();
      } else {
        document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=.xunlei.com; expires=" + expireDate.toGMTString();
      }
    } else {
      document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=" + domain;
    }

  }


  function getCookie(name) {
    var val = getRealCookie(name);
    if (trim(val) == '') {
      var vipcookie = getRealCookie('vipcookie');
      if (trim(vipcookie) == '') {
        return '';
      }
      var cookies = vipcookie.split('&');
      for (var i = 0; i < cookies.length; i++) {
        ary = cookies[i].split('=');
        if (ary.length > 1 && ary[0] == name) {
          return decodeURIComponent(ary[1]);
        }
      }
      return '';
    } else {
      return trim(val); //如果cookie中有该值，优先使用该值
    }
  }


  function getRealCookie(name) {
    return (document.cookie.match(new RegExp("(^" + name + "| " + name + ")=([^;]*)")) == null) ? "" : decodeURIComponent(RegExp.$2);
  }


  function getnocacheurl(urlstr) {
    var returnurl = "";
    var cachetime = new Date().getTime();
    var index = urlstr.indexOf("cachetime=");
    var param = urlstr.indexOf("?");
    if (index == -1) {
      if (param == -1) {
        returnurl = urlstr + "?cachetime=" + cachetime;
      } else {
        returnurl = urlstr + "&cachetime=" + cachetime;
      }
    } else {
      if (param == -1) {
        returnurl = urlstr.substring(0, index) + "?cachetime=" + cachetime;
      } else {
        returnurl = urlstr.substring(0, index) + "&cachetime=" + cachetime;
      }
    }
    return returnurl.replace('&&', '&').replace('?&', '?');
  }

  //获取是什么会员
  function getVipType() {
    // 1 mini会员
    // 2 普通会员
    // 3 白金会员
    // 4 白金钻石会员
    // 5 超级会员
    // isvip == 1;
    var vas_type = getCookie('vas_type');
    var is_vip = getCookie('vip_isvip');
    var type = '雷友';
    var config = {
      1: {
        "name": "mini会员",
        "open_type": "升级"
      },
      2: {
        "name": "普通会员",
        "open_type": "升级"
      },
      3: {
        "name": "白金会员",
        "open_type": "升级"
      },
      4: {
        "name": "白金钻石会员",
        "open_type": "升级"
      },
      5: {
        "name": "超级会员",
        "open_type": "续费"
      },
      6: {
        "name": "雷友",
        "open_type": "开通"
      }
    }
    if (is_vip == 1) {
      return vas_type;
    } else {
      return 0;
    }
  }

  function clearCookie() {
    //清除子域名
    var ckeys = ["vipcookie", "vip_nickname", "ci_session", "vip_ci_session", "_x_a_"];
    for (var i = 0, len = ckeys.length; i < len; i++) {
      hb_setRealCookie(ckeys[i], "", 0);
    }
    //主域名
    var ckeys1 = ["sessionid", "usrname", "nickname", "usernick", "userid", "usertype", "usernewno", "blogresult", "score", "order", "isvip", "sex", "upgrade", "logintype", "checkans", "checkpwd", "jumpkey"];
    for (var i = 0, len = ckeys1.length; i < len; i++) {
      hb_setRealCookie(ckeys1[i], "", 0, 1);
    }
  }

  var c_getCookie = function(e) {
    var t = e + "=",
      n = document.cookie.indexOf(t);
    if (n != -1) {
      n += t.length;
      var r = document.cookie.indexOf(";", n);
      return r == -1 && (r = document.cookie.length), unescape(document.cookie.substring(n, r))
    }
    return ""
  };

  var c_hb_setCookie = function(d, e, t, n) {
    if (arguments.length > 3) {
      var i = new Date((new Date).getTime() + n * 36e5);
      document.cookie = e + "=" + escape(t) + ";path=/;domain=" + d + ";expires=" + i.toGMTString()
    } else
      document.cookie = e + "=" + escape(t) + ";path=/;domain=" + d
  };

  function pv_getUrlParam(parameter, url) {
    url = !url ? location.href : url;
    var reg = /[\#|\?]([^#]*)[\#|\?]?/;
    var result = url.match(reg);
    url = "&" + (!result ? "" : result[1]);
    result = url.match(new RegExp("&" + parameter + "=", "i"));
    // console.log(result)
    return !result ? undefined : url.substr(result.index + 1).split("&")[0].split("=")[1];
  }
  //获取cookieid
  habo_web_uid = c_getCookie("HABOWEBUID");
  if (!habo_web_uid || habo_web_uid == "undefined") {
    var random = Math.random();
    var browser = navigator.appName + "_" + navigator.appVersion + "_" + navigator.userAgent + "_" + navigator.appCodeName + "_" + navigator.platform;
    var nowtime = new Date;
    var nowtime_sec = nowtime.valueOf();
    habo_web_uid = hex_md5(nowtime_sec.toString() + browser + random.toString());
    c_hb_setCookie(gOption.domain, "HABOWEBUID", habo_web_uid, 87600)
  }


  //获取sessionid
  var habo_web_sessionid = c_getCookie("HABOWEBSESSIONID");
  if (!habo_web_sessionid || habo_web_sessionid == "undefined") {
    var random = Math.random();
    var browser = navigator.appName + "_" + navigator.appVersion + "_" + navigator.userAgent + "_" + navigator.appCodeName + "_" + navigator.platform;
    var nowtime = new Date;
    var nowtime_sec = nowtime.valueOf();
    habo_web_sessionid = hex_md5(nowtime_sec.toString() + browser + random.toString());
    c_hb_setCookie(gOption.domain, "HABOWEBSESSIONID", habo_web_sessionid, 0.5);
  }

  //获取xl账号ID,当用xl账号登陆成功时，需要c_hb_setCookie(gOption.domain,"userid",userid)
  var userid = c_getCookie("userid") && c_getCookie("HABOWEBSESSIONID") ? parseInt(c_getCookie("userid")) : 0;
  //获取useragent信息
  var userAgent = navigator.userAgent;
  var userAgent_e = encodeURIComponent(userAgent);
  //获取url
  var url = document.location.href;
  //获取来源页
  var ref = document.referrer;
  var habo_aid = win.habo_aid || '';
  if (win.active_cfg) {
    var actid = win.active_cfg['base']['actid'] || c_getCookie('actid');
    var actid_e = encodeURIComponent(actid);

  }

  var ref_e = encodeURIComponent(ref);
  var url_e = encodeURIComponent(url);
  var referfrom = pv_getUrlParam('referfrom') || c_getCookie('referfrom');
  var referfrom_e = encodeURIComponent(referfrom);

  var platform_e = '';
  try {
    var version = external.GetThunderVersion();
    if(/^9/.test(version)){
      platform_e = 'xl9';
    }
  } catch (e) {}
  
  //初始化哈勃上报公共数据
  function initCommonData(){
    return {
      'xlbtid': gOption.xlbtid, //
      'appid': gOption.appid,
      'cookieid' : habo_web_uid,
      'sessionid': habo_web_sessionid,
      'pageid':habo_aid, //页面id，运营提供
      'haboaid': habo_aid,
      'pageurl': url_e, //页面url
      'referurl':ref_e, //页面来源url
      'referfrom':referfrom_e, //来源统计点
      'actid':actid_e || '',//活动id ，用户活动记录
      'loadtimelength': '',//默认
      'browser': userAgent_e,//浏览器信息
      'userid': getCookie("userid") && c_getCookie("HABOWEBSESSIONID") ? parseInt(getCookie("userid")) : 0,
      'vas_type': getVipType(),
      'createtime': new Date().getTime(),
      'clickid': '',
      'blockid':'',
      'platform' : platform_e
    }

  }

  function objevent(objname, objevent, objfun) {
    var objname = String(objname);
    if (objevent == "") {
      objevent = "onclick";
    } else {
      var objevent = String(objevent);
    }

    var objfun = objfun,
      thisevent = function(evt) {
        evt = evt || win.event;
        var obj = evt.target || evt.srcElement,
          objnametemp1 = String(obj.tagName),
          objnametemp2 = String(objname);
        if (objnametemp1 == objnametemp2 || objname == "" || obj.parentNode.tagName == objnametemp2 || obj.parentNode.parentNode.tagName == objnametemp2) {
          if (objnametemp1 != objnametemp2)
            if (obj.parentNode.tagName == objnametemp2)
              obj = obj.parentNode;
            else if (obj.parentNode.parentNode.tagName == objnametemp2)
            obj = obj.parentNode.parentNode;
          else {
            if (obj.parentNode.parentNode.parentNode.tagName != objnametemp2)
              return;
            obj = obj.parentNode.parentNode.parentNode
          }
          objfun(obj, evt);

        }
        // evt.preventDefault();
      };
    if (browserRedirect() == 'wap') {
      // alert('objevent');
      document.addEventListener(objevent, thisevent);
    } else {
      document.body[objevent] = thisevent;
    }
    // evalobj=eval(thiseventtemp);evalobj
    // console.log(document.body.onclick)

  }
  //js绑定onclick事件
  function _clickon(e, event) {

    var e;

    send_web_click(e);

  }
  try {
    var _kk_click_pv_clickon_handler = function() {

      if (browserRedirect() == 'wap') {
         objevent("A", "touchstart", _clickon);
         objevent("DIV", "touchstart", _clickon);
         objevent("LI", "touchstart", _clickon);
         objevent("I", "touchstart", _clickon);
      } else {
         objevent("A", "onmouseup", _clickon);
         objevent("DIV", "onmouseup", _clickon);
         objevent("LI", "onmouseup", _clickon);
         objevent("I", "touchstart", _clickon);
      }
      // objevent("A","onkeydown","_clickon");
    };

    function kk_click_pv_rebind_capture() {
      win.attachEvent ? (win.detachEvent("onload", _kk_click_pv_clickon_handler), win.attachEvent("onload", _kk_click_pv_clickon_handler)) : (win.removeEventListener("load", _kk_click_pv_clickon_handler, !0), win.addEventListener("load", _kk_click_pv_clickon_handler, !0))
    }
    kk_click_pv_rebind_capture()
  } catch (e) {
    alert(e)
  }


  //判断浏览器
  function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/wins ce/i) == "wins ce";
    var bIsWM = sUserAgent.match(/wins mobile/i) == "wins mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return "wap";
    } else {
      return "pc";
    }

  }
  //页面展示的发包
  function send_web_pv(type, opt) {
    var defaultsData = initCommonData();
    var pvData = extendObj(defaultsData,{'eventtype' : type || 'pageshow' },opt);
    sendRequest(pvData);
  }

  function send_web_Data(opt) {
    var defaultsData = initCommonData();
    var sendData = extendObj(defaultsData,opt);
    sendRequest(sendData);
  }
  win.send_web_pv = send_web_pv; //注册到window作用域下
  win.send_web_Data = send_web_Data;
  send_web_pv();
  //点击事件的发包
  function jumpurl(clickurl) {
    location.href = clickurl;
  }
  //克隆对象
  function cloneObj(oldObj) { //复制对象方法
    if (typeof(oldObj) != 'object') return oldObj;
    if (oldObj == null) return oldObj;
    var newObj = new Object();
    for (var i in oldObj)
      newObj[i] = cloneObj(oldObj[i]);
    return newObj;
  };

  //扩展对象
  function extendObj() {
    var args = arguments;
    if (args.length < 2) return;
    var temp = cloneObj(args[0]); //调用复制对象方法
    for (var n = 1; n < args.length; n++) {
      for (var i in args[n]) {
        temp[i] = args[n][i];
      }
    }
    return temp;
  }

  function tranformStatData(str){
    var objArr= str.split('|');
    var resultObj = {};
    for(var i = 0 ,length = objArr.length ; i < length ; ++ i){
       var tempArr = objArr[i] + ''.split('=');
      if(tempArr.length == 2){
        resultObj[tempArr[0]] = tempArr[1];
      }
    }
    return resultObj;
  }
  //对象生成字符串
  function formQueryStr(opt) {
    var opt_arr = [],
      opt_str = '';
    if (typeof opt == 'object') {
      for (var i in opt) {
        opt_arr.push(i + '=' + opt[i])
      }
    }
    if (opt_arr.length) {
      opt_str = '&' + opt_arr.join('&');
    }
    return opt_str;
  }
  
  //发包
  function sendRequest(opt){

    var queryStr = formQueryStr(opt);
    var furl = "http://stat.download.xunlei.com:8099/?" + queryStr;
    var r = new Image;
    r.src = furl;
  }
  
  function send_web_click(e, opts) {
    target = e.target;
    
    var clickurl = e.getAttribute("_click_rcv_url");
    if (!clickurl || clickurl == "undefined") {
      clickurl = e.href;
    }

    var clickurl_e = encodeURIComponent(clickurl);
    var blockid = e.getAttribute("blockid") || '';
    var clickid = e.getAttribute('clickid');
    var eventtype = e.getAttribute('eventtype');
    var statInfo = e.getAttribute('stat-info');
    var pageid = e.getAttribute('pageid');
    var statObj = {};

  if (!clickid && typeof(clickid) != "undefined" && clickid != 0) {
      return;
    }

    var l_clickid = clickid.toLowerCase();

    var clicktype = eventtype||'click';

    if(l_clickid.indexOf('pay_btn') != -1){
      clicktype = 'payclick';
      clickid = clickid.replace('_pay_btn','');
    }
    
    //兼容旧版
    if(l_clickid.indexOf('pay_button') != -1){
      clicktype = 'payclick';
      clickid = clickid.replace('_pay_button','');
    }

    if(l_clickid.indexOf('ad_btn') != -1){
      clicktype = 'adclick';
      clickid = clickid.replace('_ad_btn','');
    }

    if(statInfo){
      statObj = tranformStatData(statInfo.replace(/(^\s*)|(\s*$)/g, "") + '');
    }
    


    if (win.ACTCONFIG) {
      var payid = win.ACTCONFIG['payid'] || c_getCookie('payid');
      var payid_e = encodeURIComponent(payid);
    } else {
      payid_e = '';
    }
    
    var defaultsData = initCommonData();
    var clickData = {
      'eventtype' : clicktype,
      'clickid': clickid,
      'blockid':blockid,
      'clickurl': clickurl,
      'pageid':pageid
    }
    var pvData = extendObj(defaultsData,clickData,statObj);
    sendRequest(pvData);
    
    if (typeof target == 'undefined' || target.indexOf('self') != -1 ) {
      return false;
    }

  }
  
  if (window.addEventListener) {
    window.addEventListener('unload', function(event) {
      var now = +new Date;
      while (new Date - now >= 10) {} // 阻塞 10ms
    });
  } else {
    window.attachEvent('unload', function() {
      var now = +new Date;
      while (new Date - now >= 10) {} // 阻塞 10ms
    })
  }


})(window);
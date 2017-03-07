(function(window){
var XDomReq = (function() {

  var prefix = "XDomReq.callbacks";
  var counter = 0;
  var callbacks = {};

  var send = function(url, callback) {
    var i = (counter++);
    var cbName = prefix + "_" + i + "";
    var request;
    callbacks[i] = function(data) {
      if (typeof callback !== 'undefined') {
        callback(data);
      }
      delete(callbacks[i]);
    };

    request = document.createElement("script");
    request.src = url + "&callback=" + cbName;
    document.body.appendChild(request);
  };

  var addParams = function(url, params) {
    if (url.indexOf("?") === -1) {
      url += "?";
    }
    if (typeof params !== 'undefined') {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          url += "&" + key + "=" + encodeURIComponent(params[key]);
        }
      }
    }
    return url;
  };

  return {
    send: send,
    addParams: addParams,
    callbacks: callbacks
  };

})();

var time = function() {
  // alert('in');
}

window.timeRecode.config = {
  FirstTimeout:1,
  timeout:1,
  config:1
}



window.uploadTimeRecode = function() {
  // console.log(timeRecode)

  var keys = [];
  for (var i in timeRecode) {
    if(!window.timeRecode.config[i]){
      keys.push(i + ':' + timeRecode[i]);
    }

  }
  // console.dir(timeRecode)
  if (!timeRecode.isupLoad) {
    XDomReq.send('http://dypay.vip.xunlei.com/user/speedstat/?url=' + encodeURIComponent(window.location.href) + '&speed=' + keys.join(';'), time);
    timeRecode.isupLoad = true;
  }

}

/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
  XDomReq.send('http://dypay.vip.xunlei.com/user/errorstat/?url=' + encodeURIComponent(window.location.href) + '&scriptURI=' + scriptURI + '&lineNumber=' + lineNumber + '&columnNumber=' + columnNumber + '&errorMessage=' + errorMessage + '&errorObj=' + errorObj);

}

window.timeRecode.FirstTimeout = setTimeout(function(){
  uploadTimeRecode();
},30*1000);//如果onload一直不执行,就5秒后主动发包



function alertonload() {
  window.timeRecode.timeout && clearTimeout(window.timeRecode.timeout);
  window.timeRecode.FirstTimeout && clearTimeout(window.timeRecode.FirstTimeout);
  window.timeRecode = window.timeRecode || {};
  var time = new Date();
  time = time.getTime();
  window.timeRecode.onload = time - window.createtime;
  window.timeRecode.config.key = window.timeUploadKey || "first";
  if (window.timeRecode[window.timeRecode.config.key]) {
    uploadTimeRecode();
  } else {
    window.timeRecode.timeout = setTimeout(function() {
      uploadTimeRecode();
    }, 5000);
  }
  return '';
}//绑定onload,如果有first参数,则立即上报,如果没有,那么延迟五秒后上报

var body = window.document.getElementsByTagName('body')[0];

body.setAttribute('onload',alertonload());

})(window);

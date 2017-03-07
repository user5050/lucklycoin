var qqShare = {};

qqShare.isSupport = function () {
    return typeof (QQSDK) != "undefined";
},
    qqShare.checkClientInstalled = function () {
        QQSDK.checkClientInstalled(function () {
            alert('client is installed');
        }, function () {
            // if installed QQ Client version is not supported sso,also will get this error
            alert('client is not installed');
        });
    };
qqShare.ssoLogin = function () {
    QQSDK.ssoLogin(function (args) {
        //alert("token is " + args.access_token);
        //alert("userid is " +args.userid);
        //alert("expires_time is "+ new Date(parseInt(args.expires_time)) + " TimeStamp is " +args.expires_time);
    }, function (failReason) {
        alert(failReason);
    });
};
qqShare.logout = function () {
    QQSDK.logout(function () {
        //alert('logout success');
    }, function (failReason) {
        alert(failReason);
    });
};
qqShare.shareText = function () {
    var args = {};
    args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
    args.text = "这个是Cordova QQ分享文字";
    QQSDK.shareText(function () {
        alert('shareText success');
    }, function (failReason) {
        alert(failReason);
    }, args);
};
qqShare.shareImage = function (scene, title, desc, imgUrl, sucCallBack) {
    var args = {};
    args.scene = scene;//QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
    args.title = title;//"这个是Cordova QQ图片分享的标题";
    args.description = desc;//"这个是Cordova QQ图片分享的描述";
    args.image = imgUrl;//"https://cordova.apache.org/static/img/cordova_bot.png";
    QQSDK.shareImage(function () {
        sucCallBack();
    }, function (failReason) {
        alert(failReason);
    }, args);
};
qqShare.shareBase64Image = function () {
    var base64 = "";
    var args = {};
    args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
    args.title = "这个是Cordova QQ图片分享的标题";
    args.description = "这个是Cordova QQ图片分享的描述";
    args.image = base64;
    QQSDK.shareImage(function () {
        alert('shareImage success');
    }, function (failReason) {
        alert(failReason);
    }, args);
};
qqShare.shareLocalImage = function () {
    var args = {};
    args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
    args.title = "这个是Cordova QQ图片分享的标题";
    args.description = "这个是Cordova QQ图片分享的描述";
    args.image = "https://cordova.apache.org/static/img/cordova_bot.png";//appintance.localImageUrl;
    navigator.camera.getPicture(function (pic) {
        args.image = pic.split("://")[1];
        console.log('pic is ', pic);
        QQSDK.shareImage(function () {
            alert('shareImage success');
        }, function (failReason) {
            alert(failReason);
        }, args);
    }, null, { targetWidth: 60, targetHeight: 60 }
    );
};
qqShare.shareNews = function (scene, title, desc, imgUrl, link, sucCallBack) {

    if (!qqShare.isSupport()) {
        A.showToast("分享失败:未安装插件");
        return;
    }

    var args = {};
    args.scene = scene;// QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
    args.url = link;// "https://cordova.apache.org/";
    args.title = title;//"这个是Cordova QQ新闻分享的标题";
    args.description = desc;// "这个是Cordova QQ新闻分享的描述";
    args.image = imgUrl;// "https://cordova.apache.org/static/img/cordova_bot.png";
    QQSDK.shareNews(function () {
        sucCallBack();
    }, function (failReason) {
        A.showToast("分享失败:" + failReason);
    }, args);
};
qqShare.shareAudio = function () {
    var args = {};
    args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
    args.url = "https://y.qq.com/portal/song/001OyHbk2MSIi4.html";
    args.title = "十年";
    args.description = "陈奕迅";
    args.image = "https://y.gtimg.cn/music/photo_new/T001R300x300M000003Nz2So3XXYek.jpg";
    args.flashUrl = "http://stream20.qqmusic.qq.com/30577158.mp3";
    QQSDK.shareAudio(function () {
        alert('shareAudio success');
    }, function (failReason) {
        A.showToast("分享失败:" + failReason);
    }, args);
};






/*
 *        Scene: {
                SESSION:  0, // 聊天界面
                TIMELINE: 1, // 朋友圈
                FAVORITE: 2  // 收藏
            },

            Wechat.Scene.TIMELINE
        */

var webchatShare = {};

webchatShare.isSupport = function () {
    return typeof (Wechat) != "undefined";
},

webchatShare.share = function (scene, title, desc, imgUrl, link, sucCallback) {

    if(!webchatShare.isSupport()) {
        A.showToast("分享失败:未安装插件");
        return;
    }

    var params = {
        scene: scene
    };

    id = "send-link-thumb-remote";

        /*if (id == 'send-text') {
            params.text = "在。";
        } else*/ {
        params.message = {
            //title: "[TEST]" + id,
            //description: "[TEST]Sending from test application",
            //mediaTagName: "TEST-TAG-001",
            //messageExt: "这是第三方带的测试字段",
            //messageAction: "<action>dotalist</action>",
            media: {}
        };

        switch (id) {
            case 'check-installed':
                Wechat.isInstalled(function (installed) {
                    alert("Wechat installed: " + (installed ? "Yes" : "No"));
                });
                return true;

            case 'send-photo-local':
                params.message.media.type = Wechat.Type.IMAGE;
                params.message.media.image = "www/img/res1.jpg";
                break;

            case 'send-photo-remote':
                params.message.media.type = Wechat.Type.IMAGE;
                params.message.media.image = "https://cordova.apache.org/images/cordova_256.png";
                break;

            case 'send-link-thumb-local':
                params.message.title = "专访张小龙：产品之上的世界观";
                params.message.description = "微信的平台化发展方向是否真的会让这个原本简洁的产品变得臃肿？在国际化发展方向上，微信面临的问题真的是文化差异壁垒吗？腾讯高级副总裁、微信产品负责人张小龙给出了自己的回复。";
                params.message.thumb = "www/img/res2.png";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = "http://tech.qq.com/";
                break;

            case 'send-link-thumb-remote':
                params.message.title = title;//"专访张小龙：产品之上的世界观";
                params.message.description = desc;// "微信的平台化发展方向是否真的会让这个原本简洁的产品变得臃肿？在国际化发展方向上，微信面临的问题真的是文化差异壁垒吗？腾讯高级副总裁、微信产品负责人张小龙给出了自己的回复。";
                params.message.thumb = imgUrl;// "https://cordova.apache.org/images/cordova_256.png";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = link;//"http://tech.qq.com/";
                break;

            case 'send-music':
                params.message.title = "一无所有";
                params.message.description = "崔健";
                params.message.thumb = "www/img/res3.jpg";
                params.message.media.type = Wechat.Type.MUSIC;
                params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=706F733D35227D";
                params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
                break;

            case 'send-video':
                params.message.title = "乔布斯访谈";
                params.message.description = "饿着肚皮，傻逼着。";
                params.message.thumb = "www/img/res7.png";
                params.message.media.type = Wechat.Type.VIDEO;
                params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
                break;

            case 'send-app':
                params.message.title = "App消息";
                params.message.description = "这种消息只有App自己才能理解，由App指定打开方式！";
                params.message.thumb = "www/img/res2.jpg";
                params.message.media.type = Wechat.Type.APP;
                params.message.media.extInfo = "<xml>extend info</xml>";
                params.message.media.url = "http://weixin.qq.com";
                break;

            case 'send-nongif':
                params.message.thumb = "www/img/res5thumb.png";
                params.message.media.type = Wechat.Type.EMOTION;
                params.message.media.emotion = "www/img/res5.jpg";
                break;

            case 'send-gif':
                params.message.thumb = "www/img/res6thumb.png";
                params.message.media.type = Wechat.Type.EMOTION;
                params.message.media.emotion = "www/img/res6.gif";
                break;

            case 'send-file':
                params.message.title = "iphone4.pdf";
                params.message.description = "Pro CoreData";
                params.message.thumb = "www/img/res2.jpg";
                params.message.media.type = Wechat.Type.FILE;
                params.message.media.file = "www/resources/iphone4.pdf";
                break;

            case 'auth':
                Wechat.auth("snsapi_userinfo", function (response) {
                    // you may use response.code to get the access token.
                    alert(JSON.stringify(response));
                }, function (reason) {
                    alert("分享失败: " + reason);
                });
                return true;

            default:
                alert(id + " can not be recognized!");
                return false;
        }
    }

    Wechat.share(params, function () {
        sucCallback();
    }, function (reason) {
        A.showToast("分享失败:" + reason);
    });
    return true;
};



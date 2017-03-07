var pushmgr={};

pushmgr.onDeviceReady = function () {
    pushmgr.initiateUI();
};

pushmgr.getRegistrationID = function () {
    window.plugins.jPushPlugin.getRegistrationID(pushmgr.onGetRegistrationID);
};

pushmgr.onGetRegistrationID = function (data) {
    try {
        if (data.length == 0) {
            var t1 = window.setTimeout(pushmgr.getRegistrationID, 1000);
        }
    } catch (exception) {
        console.log(exception);
    }
};

pushmgr.onTagsWithAlias = function (event) {
    try {
        console.log("onTagsWithAlias");
        var result = "result code:" + event.resultCode + " ";
        result += "tags:" + event.tags + " ";
        result += "alias:" + event.alias + " ";
        console.log(result);
    } catch (exception) {
        console.log(exception)
    }
};

pushmgr.onOpenNotification = function (event) {
    try {

        /*{
            "title": "lucklycoin",
            "alert": "sssss",
            "extras": {
                "cn.jpush.android.NOTIFICATION_TYPE": "0",
                "sdktype": "JPUSH",
                "jt": "0",
                "jp": "P001",
                "cn.jpush.android.EXTRA": {
                    "jt": "0",
                    "jp": "P001"
                },
                "app": "com.fireword.onecoin",
                "cn.jpush.android.MSG_ID": "3047211371",
                "cn.jpush.android.ALERT": "sssss",
                "cn.jpush.android.NOTIFICATION_ID": 183894526
            }
        }*/
        var alertContent;
        var jt;
        var jurl;
        if (device.platform == "Android") {
            alertContent = event.alert;
            jt = event.extras.jt;
            jurl = event.extras.jp;
        } else {
            alertContent = event.aps.alert;
            jt = event.jt;
            jurl = event.jp;
        }

        if(jt && jurl)
        {
            app_gotopage(jt,jurl);
        }

        console.log("open Notification:" + jt + ":" + jurl);
    } catch (exception) {
        console.log("JPushPlugin:onOpenNotification" + exception);
    }
};

pushmgr.onReceiveNotification = function (event) {
    try {
        var alertContent;
        if (device.platform == "Android") {
            alertContent = event.alert;
        } else {
            alertContent = event.aps.alert;
        } 
    } catch (exception) {
        console.log(exception)
    }
};

pushmgr.onReceiveMessage = function (event) {
    try {
        var message;
        if (device.platform == "Android") {
            message = event.message;
        } else {
            message = event.content;
        }
        console.log(message);
    } catch (exception) {
        console.log("JPushPlugin:onReceiveMessage-->" + exception);
    }
};

pushmgr.initiateUI = function () {
    try {
        window.plugins.jPushPlugin.init();
        window.setTimeout(pushmgr.getRegistrationID, 1000);
        if (device.platform != "Android") {
            window.plugins.jPushPlugin.setDebugModeFromIos();
            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        } else {
            window.plugins.jPushPlugin.setDebugMode(true);
            window.plugins.jPushPlugin.setStatisticsOpen(true);
        }
    } catch (exception) {
        console.log(exception);
    } 
};

pushmgr.setTags = function(tags)
{
    window.plugins.jPushPlugin.setTags(tags);
}

pushmgr.setAlias = function(alias)
{
    window.plugins.jPushPlugin.setAlias(alias);
}

pushmgr.setTagsWithAlias = function(tags,alias)
{
    try{
        window.plugins.jPushPlugin.setTagsWithAlias(tags,alias);
    }
    catch(e)
    {
    }
}

pushmgr.addEventListener =function()
{
    document.addEventListener("jpush.setTagsWithAlias", pushmgr.onTagsWithAlias, false); 
    document.addEventListener("jpush.openNotification", pushmgr.onOpenNotification, false);
    document.addEventListener("jpush.receiveNotification", pushmgr.onReceiveNotification, false);
    document.addEventListener("jpush.receiveMessage", pushmgr.onReceiveMessage, false);
}

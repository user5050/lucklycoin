var api = new Function();
api.domain = "http://123.56.42.48";
api.curUser = null;

api.product = {
    items: function (skip, take, callback) {// 商品列表
        var data = { "skip": skip, "take": take };

        callRemote("/Product/Index", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    detail: function (gameNo, pid, callback) { // 指定期号详情
        var data = { "gameNo": gameNo || "", "productId": pid || "" };

        callRemote("/Product/detail", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    description: function (pid, callback) { // 指定期号详情
        var data = { "productId": pid || "" };

        callRemote("/Product/desc", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    members: function (gameno, skip, take, callback) { // 获取指定期号参与用户列表
        var data = { "skip": skip, "take": take, "gameNo": gameno };

        callRemote("/Product/GetMembers", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    productlastinfo: function (productId, callback) { //获取指定商品最近状态
        var data = { "id": productId };

        callRemote("/Product/GetProductGameLastInfo", data, function (ret) {
            callback(ret, data);
        }, null, false);
    },
    getUpdateOngoinInfos: function (datas, callback) { //获取指定商品最近状态
        var data = { "datas": datas };

        callRemote("/Product/getUpdateOngoinInfos", data, function (ret) {
            callback(ret, data);
        }, null, false);
    },
    getGameShow: function (skip, take, callback) //获取晒单列表
    {
        var data = { "skip": skip, "take": take };

        callRemote("/Product/GetGameShow", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getGameShowOfGame: function (skip, take, pid, callback) //获取指定期号的晒单列表
    {
        var data = { "skip": skip, "take": take, "id": pid };

        callRemote("/Product/GetGameShowOfGame", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getWaitTime: function (callback) {
        callRemote("/Product/WaitTime", {}, function (ret) {
            callback(ret, {});
        }, null, true);
    },
    getWaitForCompute: function (skip, take, callback) //获取待揭晓列表
    {
        var data = { "skip": skip, "take": take };

        callRemote("/Product/WaitForCompute", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getJoinCntStat: function (gamenos, callback) //获取指定期号的最新参与人数
    {
        var data = { "id": gamenos };

        callRemote("/Product/JoinCntStat", data, function (ret) {
            callback(ret, data);
        }, null, false);
    },
    getPrvs: function (skip, take, pid, callback) //获取往期揭晓
    {
        var data = { "skip": skip, "take": take, "pid": pid };

        callRemote("/Product/getPrvs", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getComputeDetail: function (gameNo, callback) {
        var data = { "gameNo": gameNo };

        callRemote("/Product/ComputeDetail", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getJoinNos: function (gameNo, uid, callback) {
        var data = { "id": gameNo, "userid": uid };

        callRemote("/Product/JoinLog", data, function (ret) {
            callback(ret, data);
        }, null, true);
    }
};

api.banner = {
    gets: function (callback) // 获取滚动窗口
    {
        callRemote("/Banner/Get", {}, function (ret) {
            callback(ret, {});
        }, null, false);
    }
};

api.cache = {

    setMobile: function (mobile) {
        storage = window.localStorage;
        if (storage) {
            //赋值
            storage.setItem("onecoin_cache_mobile", mobile);
        }
    },
    getMobile: function () {
        storage = window.localStorage;
        if (storage) {
            //赋值
            return storage.getItem("onecoin_cache_mobile");
        }
    }
}

api.user = {

    __saveLogin: function (token, name, head) {
        api.curUser = { "token": token, "name": name, "head": head };

        api.user.__persistence(api.curUser);
    },

    __persistence: function (user) {
        storage = window.localStorage;
        if (storage) {
            //赋值
            storage.setItem("onecoin_token", user.token);
            storage.setItem("onecoin_name", user.name);
            storage.setItem("onecoin_head", user.head);
        }

    },
    __updateName: function (name) {
        storage = window.localStorage;
        if (storage) {
            //赋值 
            storage.setItem("onecoin_name", name);
        }

    },
    __get: function () {
        storage = window.localStorage;
        if (storage) {
            api.curUser = {};
            api.curUser.token = storage.getItem("onecoin_token");
            api.curUser.name = storage.getItem("onecoin_name");
            api.curUser.head = storage.getItem("onecoin_head");

            if (api.curUser.token) {
                return api.curUser;
            }
        }

        return null;
    },
    __getdt: function () {
        if (typeof (device) != "undefined") {
            return device.uuid;
        };

        return "nouuid";
    },
    __quit: function () {
        storage = window.localStorage;
        if (storage) {
            storage.setItem("onecoin_token", "");
            storage.setItem("onecoin_name", "");
            storage.setItem("onecoin_head", "");
        }
    },
    saveHead: function (head) {
        storage = window.localStorage;
        if (storage) {
            //赋值 
            storage.setItem("onecoin_head", head);
        }

    },
    isLogin: function () {
        return api.user.__get() != null;
    },

    login: function (mobile, vcode, callback) // 登录
    {
        var data = { "Mobile": mobile, "vcode": vcode };

        if (typeof (device) != "undefined") {
            data.model = device.model;
            data.platform = device.platform;
            data.uuid = device.uuid;
            data.version = device.version;
            data.manufacturer = device.manufacturer;
            data.isVirtual = device.isVirtual;
            data.serial = device.serial;
            data.devicetoken = device.uuid;
        }

        callRemote("/User/Login", data, function (ret) {

            if (ret.state == 0) {
                api.user.__saveLogin(ret.result.token, ret.result.nickname, ret.result.img);
                pushmgr.setTagsWithAlias("reged", mobile);
                main.loginRefresh();
            }

            callback(ret, data);
        }, null, true);
    },
    update: function (head, nickName, callback) {
        var data = { "head": head, "nickName": nickName };

        callRemote("/User/Update", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    gameLogs: function (type, skip, take, callback, limitgameNo) // type: 1进行中(待揭晓) 2已揭晓 3中奖
    {
        var data = { "skip": skip, "take": take, "type": type, "LimitGameNo": limitgameNo || "" };

        callRemote("/User/gameLogs", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    gameWinLogs: function (limitgameNo, callback) // type: 1进行中(待揭晓) 2已揭晓 3中奖
    {
        var data = { "type": 3, "LimitGameNo": limitgameNo || "" };

        callRemote("/User/gameLogs", data, function (ret) {
            callback(ret, data);
        }, null, false);
    },
    getAddress: function (callback) {
        var data = { "skip": 0, "take": 5 };

        callRemote("/User/GetAddress", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getAddressDetail: function (id, callback) {
        var data = { "id": id };

        callRemote("/User/GetAddressDetail", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    saveAddress: function (id, zip, name, contract, address, qq, callback) {
        var data = { "id": id, "zip": zip, "name": name, "contract": contract, "address": address, "qq": qq };

        callRemote("/User/SaveContract", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    removeAddress: function (id, callback) {
        var data = { "id": id };

        callRemote("/User/DelContract", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getGameShow: function (skip, take, callback) //获取我的晒单列表
    {
        var data = { "skip": skip, "take": take };

        callRemote("/User/GameShows", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    saveGameshow: function (gno, desc, imgs, callback) //获取我的晒单列表
    {
        var data = { "gameNo": gno, "imgs": imgs, "desc": desc };

        callRemote("/User/SaveGameShow", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    msgs: function (skip, take, callback) //获取我的消息列表
    {
        var data = { "skip": skip, "take": take };

        callRemote("/User/Msgs", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    delMsg: function (id, callback) //删除我的消息
    {
        var data = { "id": id };

        callRemote("/User/DelMsg", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    coupons: function (skip, take, callback) //获取我的优惠券列表
    {
        var data = { "skip": skip, "take": take };

        callRemote("/User/Coupons", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    notify: function (callback) //获取我的优惠券列表
    {
        var data = {};

        callRemote("/User/Notify", data, function (ret) {
            callback(ret, data);
        }, function () {/*会话异常不处理 */ }, false);
    },
    saveName: function (name, callback) {
        var data = { "name": name };

        callRemote("/User/Name", data, function (ret) {
            if (ret.state == 0) {
                api.user.__updateName(ret.result);
            }

            callback(ret, data);
        }, null, true);
    },
    quit: function (callback) {
        var data = {};

        callRemote("/User/Quit", data, function (ret) {
            if (ret.state == 0) {
                api.user.__quit();
            }

            callback(ret, data);
        }, null, true);
    },
    saveExpress: function (gno, addressId, callback,stateFaultCallBack) {
        var data = { "GameNo": gno, "ContractId": addressId };

        callRemote("/user/SaveExpress", data, function (ret) {
            callback(ret, data);
        }, stateFaultCallBack, true);
    },
    getExpress: function (gno, callback) {
        var data = { "id": gno };

        callRemote("/user/Express", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    confirmExpress: function (gno, callback) {
        var data = { "id": gno };

        callRemote("/user/ConfirmExpress", data, function (ret) {
            callback(ret, data);
        }, null, true);

    }

};

api.feedback = {
    save: function (title, content, vcode, callback) {
        var data = { "title": title, "content": content, "vcode": vcode };

        callRemote("/FeedBack/Save", data, function (ret) {
            callback(ret, data);
        }, null, true);
    }

}

api.pay = {
    couponsofcanuse: function (skip, take, orderMoney, callback) //获取我的优惠券列表
    {
        var data = { "skip": 0, "take": 50, "OrderMoney": orderMoney };

        callRemote("/Coupon/couponscanuse", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    getOrderNo: function (paymentType, money, couponeid, totalmoney, gameno, productId, desc, callback) {
        var data = { "OrderMoney": money, "PaymentType": paymentType, "CouponId": couponeid, "GameNo": gameno, "ProductId": productId, "totalmoney": totalmoney };

        callRemote("/Orders/GetOrderNo", data, function (ret) {
            callback(ret, data);
        }, null, true);
    },
    cancelOrder: function (orderNo) {
        var data = { "OrderNo": orderNo };

        callRemote("/Orders/CancelOrderNo", data, null, null, true);
    },
    confirmOrder: function (orderNo, callback) {
        var data = { "OrderNo": orderNo };

        callRemote("/Orders/ConfrimOrderNo", data, function (ret) {
            callback(ret, data);
        }, null, true);
    }
}

api.base = {
    gethomeNews: function (callback) {
        callRemote("/HomeNews/index", {}, function (ret) {
            callback(ret, {});
        }, null, true);
    }
}


api.vcode = {
    send: function (mobile, callback, statefaultcallback) {
        var data = { "mobile": mobile };

        callRemote("/Sms/Send", data, function (ret) {
            callback(ret, data);
        }, statefaultcallback, true);
    },
    IsValidImgCode: function (code, callback, statefaultcallback) {
        var data = { "code": code };

        callRemote("/Sms/IsValidImgCode", data, function (ret) {
            callback(ret, data);
        }, statefaultcallback, true);
    }
}


api.share = {
    get: function (type,gno, callback, statefaultcallback) {
        var data = { "type": type , "gno":gno };

        callRemote("/share/get", data, function (ret) {
            callback(ret, data);
        }, statefaultcallback, true);
    },
    getcoupon:function(platform,callback, statefaultcallback)
    {
        var data = { "platform": platform};

        callRemote("/Coupon/Share", data, function (ret) {
            callback(ret, data);
        }, statefaultcallback, true);
    },
    isHaveCoupon:function(callback,statefaultcallback)
    {
        callRemote("/Coupon/IsSharePrize", {}, function (ret) {
            callback(ret, {});
        }, statefaultcallback, false);
    }
}

api.remote = {
    url: function (url, callback) {
        try {
            $.ajax({
                url: url,
                dataType: "html",
                crossDomain: true,
                timeout: 10000,
                success: function (res) {
                    callback(res);
                },
                error: function (xht, state, msg) {
                }
            });
        }
        catch (e) {
        }
    }
}

function callRemote(path, datas, callback, statefaultCallback, showMask) {
    try {
        var user = api.user.__get();
        var parm = "";
        if (user) {
            parm = "?token=" + user.token;
        }

        parm += (parm ? "&" : "?") + "devicetoken=" + api.user.__getdt();

        if (showMask) A.showMask();


        $.ajax({
            type: "post",
            async: true,
            url: api.domain + path + parm,
            dataType: "jsonp",
            contentType: "application/json",
            data: datas,
            crossDomain: true,
            timeout: 10000,
            jsonp: "jsoncallback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success: function (ret) {
                if (showMask) A.hideMask();
                if (ret.state === 0) {
                    if (callback) {
                        callback(ret);
                    }
                }
                else {
                    if (ret.state == -1102001)//用户会话异常
                    {
                        api.user.__quit();
                        A.Controller.section("page/sec/sec_center_login.html");
                        return;
                    }

                    var msg = "";
                    switch (ret.state) {
                        case -1001001: { msg = "系统错误"; break; }
                        case -1001003: { msg = "参数错误"; break; }
                        case -1001005: { msg = "参数维护中"; break; }
                        case -1001007: { msg = "通讯错误"; break; }
                        case -1001012: { msg = "字符过长"; break; }
                        case -1001013: { msg = "手机号码不正确"; break; }
                        case -1001016: { msg = "验证码错误"; break; }
                        case -1001017: { msg = "操作过于频繁"; break; }
                        case -1001018: { msg = "数量超限"; break; }
                        default: { 
                            if (typeof (statefaultCallback) == "function") {
                                statefaultCallback(ret);
                            }
                            else
                            {
                                msg = "网络异常";     
                            }
                            break; 
                        }
                    }

                    if(showMask && msg) A.showToast(msg); 
                }
            },
            error: function (xht, state, msg) {
                if (showMask) A.hideMask();
                if (showMask) errorCallBack('fail'); //不展示加载效果的，不需要提示网络已断开
            }
        });


    }
    catch (e) {
        A.showToast(e);
    }
}

function errorCallBack(msg) {
    if (navigator) {
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE) {
            A.showToast("网络已断开");
            return;
        }
    }

    A.showToast("网络异常");
}
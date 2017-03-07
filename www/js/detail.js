function app_setValue(targetId, val) {
    val = eval(val); 
    $("#" + targetId).val(val);
}

function app_sub(targetId, val) {
    var cur = $("#" + targetId).val() || "0";

    var curInt = parseInt(cur, 0);
    $("#" + targetId).val(curInt >= 1 ? curInt - 1 : 0);
}

function app_add(targetId, val) {
    var cur = $("#" + targetId).val() || "0";

    var curInt = parseInt(cur, 0);
    $("#" + targetId).val(curInt + 1);
}

function app_saveaddr() {
    var name = $("#sec_center_address_name").val();
    var contract = $("#sec_center_address_phone").val();
    var address = $("#sec_center_address_addr").val();
    var zip = $("#sec_center_address_zip").val();
    var qq = $("#sec_center_address_qq").val();
    var id = $("#sec_center_address_id").val();

    api.user.saveAddress(id, zip, name, contract, address, qq, function (ret) {
        g_params.refreshAddress = true;
        app_showToastAndBack("保存成功");
    });
}


/*--------------*/

function app_showTarget(targetId) {
    $("#" + targetId).show();
}

function app_hideTarget(targetId) {
    $("#" + targetId).hide();
}

/*--------------*/

function app_buy(gameNo, pid, left, img) {
    curleft = left;
    $("#detail_buy_img").attr("src", img);
    $("#detail_byCnt").val(curleft >= 10 ? "10" : curleft);

    g_params.gameNo = gameNo;
    g_params.productId = pid;

    app_showTarget("detail_buy");
}

function app_tobuypage() {

    if (!api.user.isLogin()) {
        A.Controller.section("page/sec/sec_center_login.html");
        app_hideTarget("detail_buy");
        return;
    }

    g_params.totalMoney = parseInt($("#detail_byCnt").val(), 0);

    app_hideTarget("detail_buy");
    A.Controller.section("page/sec/sec_pay.html");
}


function app_buy_comfirm() {
    var payType = $("input[name='paytype']:checked").val();

    /*
    A.showToast('编号:' + g_params.gameNo + " 商品:" + g_params.productId
        + " 优惠券:" + g_params.couponId + " 优惠券:" + g_params.couponMoney
        + " 优惠券:" + g_params.couponName + " 订单:" + (g_params.totalMoney - g_params.couponMoney)
        + " 支付方式" + payType);*/

    api.pay.getOrderNo(payType, (g_params.totalMoney - g_params.couponMoney), g_params.couponId
        , g_params.totalMoney, g_params.gameNo, g_params.productId, "", function (ret) {
            if (ret.result && ret.result.orderno) {
                if (payType == 2) {
                    var info = ret.result.extre;
                    app_apy_alipay(info, ret.result.orderno);
                }
                else {
                    var info = ret.result.extre;
                    app_apy_webchat(info, ret.result.orderno);
                }
            }
            else {
                app_showToastAndHome("支付失败");
            }
        })
}

function app_test_pay(orderNo) {
    api.pay.confirmOrder(ret.result.orderno, function () {

        app_showToastAndHome("购买成功");
    })
}
 
function app_couponcanuse() { 
    A.Controller.aside("#sec_pay_article_coupon");  
}

function app_usecoupon(couponid, couponmoney, name) {
    g_params.couponId = couponid;
    g_params.couponMoney = parseInt(couponmoney, 0);
    g_params.couponName = name;

    if(g_params.couponMoney > 0)
    {
        $("#sec_pay_order_coupon_amount").html("-"+g_params.couponMoney);
    }
    else
    {
        $("#sec_pay_order_coupon_amount").html("");
    }
    

    $("b[mode='sec_pay_ordermoney_end']").html("￥" + (g_params.totalMoney - couponmoney));
    $("#sec_pay_btn_selectcoupon").html(name);

    A.Controller.aside();
}

/*--------------*/


function app_login() {
    var p = $("#sec_center_login_form_phone").val();
    var vcode = $("#sec_center_login_form_vcode").val();
    var icode = $("#sec_center_login_form_icode").val();

    if (!(/^([1][34578][0-9]{9})$/.test(p))) {
        A.showToast("手机号码有误");
        return false;
    }

    if (!(/^([0-9]{4})$/.test(vcode))) {
        A.showToast("短信验证码有误");
        return false;
    }

    api.user.login(p, vcode, function (ret) {
        api.cache.setMobile(p);
        app_showToastAndBack("登录成功");
    });

    return true;
}

function app_sendsmsvcode(mobile) {
    var p = $("#sec_center_login_form_phone").val();
    if (!(/^([1][34578][0-9]{9})$/.test(p))) {
        A.showToast("手机号码有误");
        return false;
    }

    api.vcode.send(p, function (ret) {
        A.showToast("短信已发送");
    }, function (ret) {
        if (ret.state == -1112002) {
            A.showToast("请先输入图片验证码")
            $("#sec_center_login_form_div_icode").show();
            $('#sec_center_login_form_vcode_btn').attr('disabled', "true");
            $('#sec_center_login_form_btn').attr('disabled', "true");

            $("#sec_center_login_form_icode_img").attr("src", api.domain + "/sms/ImgCode?i=" + Math.random() + "&DeviceToken=" + api.user.__getdt());
        }
    });

    return true;
}


function app_verifyicode(mobile, code) {
    var code = $("#sec_center_login_form_icode").val();
    if (code && code.length == 4) {
        api.vcode.IsValidImgCode(code, function (ret) {
            $('#sec_center_login_form_vcode_btn').removeAttr('disabled');
            $('#sec_center_login_form_btn').removeAttr('disabled');

            $("#sec_center_login_form_div_icode").hide();
        }, function (ret) {
            if (ret.state == -1001011) {
                A.showToast("图片验证码不正确");
            }
        });
    }

    return true;
}

function app_changeicode() {
    $(this).attr("src", api.domain + "/sms/ImgCode?i=" + Math.random() + "&DeviceToken=" + api.user.__getdt());
}

function app_feedback() {
    var t = $("#sec_center_feedback_type").val();
    var d = $("#sec_center_feedback_desc").val();
    var v = $("#sec_center_feedback_icode").val();

    if (!d || d.length < 15) {
        A.showToast("请填写问题描述(15字以上)");
        return false;
    }

    if (!v || v.length != 4) {
        A.showToast("请填写验证码");
        return false;
    }

    api.feedback.save(t, d, v, function () {
        app_showToastAndBack("提交成功，感谢您的反馈!");
    })
}


function app_showToastAndBack(title) {
    A.showToast(title, 1000);
    setTimeout(function () { A.Controller.close(); }, 1000);
}

function app_showToastAndHome(title) {
    A.showToast(title, 1000);
    setTimeout(function () { app_goHome(); }, 1000);
}

function app_goHome() {
    A.Controller.section("#sec_index");
    A.Controller.article("#art_goods");
}

function app_back() {
    A.Controller.close();
}



function app_checkAndJump(toUrl) {
    if (!api.user.isLogin()) {
        A.Controller.section("page/sec/sec_center_login.html");
    }
    else {
        A.Controller.section(toUrl);
    }
}

function app_saveName() {
    var t = $("#sec_center_name_val").val().replace(/(^\s*)|(\s*$)/g, "");

    if (!t || t.length < 1) {
        A.showToast("请填写名字");
        return false;
    }

    if (t.length > 8) {
        A.showToast("不能超过8个字符");
        return false;
    }

    api.user.saveName(t, function () {
        app_showToastAndBack("保存成功!");
    })
}


function app_quit() {
    api.user.quit(function (ret) {
        app_showToastAndHome("退出成功!");
    });
}


function app_gameshow() {
    var desc = $("#sec_center_dogameshow_desc").val().replace(/(^\s*)|(\s*$)/g, "");
    var gno = g_params.showgameno;
    if (!desc || desc.length <= 10) {
        A.showToast("请填写评价内容(10个字符以上)");
        return false;
    }

    var imgs = __app_getimgs("#sec_center_dogameshow_imgs");

    if (!imgs || imgs.length <= 5) {
        A.confirmme('英 雄', '中奖晒个图，好运连连来 ^_^', "晒图", "残忍拒绝",
            function () {
                api.user.saveGameshow(gno, desc, imgs, function (ret) {
                    g_params.refreshWinGameNo = gno;
                    app_showToastAndBack("晒单成功!");
                });
            },
            function () {
                app_openImgPk('gameshow', 360, 360);
            });
    }
    else {
        api.user.saveGameshow(gno, desc, imgs, function (ret) {
            g_params.refreshWinGameNo = gno;
            app_showToastAndBack("晒单成功!");
        });
    }
}


function __app_getimgs(target) {
    var items = $(target).find("img");
    var imgs = "";
    $(items).each(function () {
        var img = $(this).attr("ref");

        if (img) {
            if (imgs) imgs += ",";
            imgs += img;
        }
    });

    return imgs;
}



function app_removeAddress(id) {
    if (id) {
        A.confirm('提示', '确认要删除所选地址?',
            function () {
                api.user.removeAddress(id, function () {
                    A.showToast('删除成功!');
                    $("#sec_center_address_addbtn").show();
                    $("li[ref='address_" + id + "'").remove();
                });
            },
            function () {
            });
    }
}

function app_checkaddress() {
    var cnt = $("#sec_center_address").find("li[mode='user_address']").length;
    if (cnt >= 5) {
        A.showToast('地址最多允许5个，无法新增!');
        return false;
    }

    return true;
}


function app_selectAddress(id) {

    var gno = $("#template_center_address_select_gameno").val();
    if (id && gno) {
        A.confirm('提示', '确认选择此收货地址? <br/><span style="color:red">确认后无法修改</span>',
            function () {
                api.user.saveExpress(gno, id, function () {
                    g_params.refreshWinGameNo = gno;
                    app_showToastAndBack("设置成功!");
                }, function (ret) {
                    if (ret.state == -1118001) {
                        A.showToast('收货地址已无法修改!');
                    }
                });
            },
            function () {
            });
    }
}


function app_removeGameShowImg() {
    g_params.gameshowEditCmd.cmd = 1;

    A.Controller.close();
}


function app_editGameShowImg(target) {
    var src = $(target).attr("src");
    var id = $(target).attr("ref");
    if (src && id) {
        g_params.gameshowEditCmd.cmd = 0;
        g_params.gameshowEditCmd.id = id;
        g_params.gameshowEditCmd.src = src;

        A.Controller.section("page/sec/sec_center_viewimg.html");
    }
}

/*-------截图-------*/

function app_openImgPk(thumb, w, h) {
    g_params.cameraParams = { "thumb": thumb, "gameNo": g_params.showgameno };

    A.actionsheet([{
        text: '拍照',
        handler: function () {
            app_onFaceImgClick(0, w, h);
        }
				}, {
            text: '从手机相册选择',
            handler: function () {
                app_onFaceImgClick(1, w, h);
            }
        }]);
}


//flag:0  拍摄, 1 图片库
function app_onFaceImgClick(flag, w, h) {
    try {
        var w = w || 640;
        var h = h || 640;

        var quality = device.platform == "Android" ? 80 : 50;
        //log("device.platform=" + device.platform + ";quality=====" + quality);
        var cameraOptions;
        if (flag == 0) {
            cameraOptions = {
                quality: quality,//ios为了避免部分设备上出现内存错误，quality的设定值要低于50。
                destinationType: Camera.DestinationType.FILE_URI,//FILE_URI,DATA_URL
                sourceType: Camera.PictureSourceType.CAMERA,//CAMERA,SAVEDPHOTOALBUM
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,//JPEG,PNG
                targetWidth: w,
                targetHeight: h
            };
        } else {
            cameraOptions = {
                quality: quality,//ios为了避免部分设备上出现内存错误，quality的设定值要低于50。
                destinationType: Camera.DestinationType.FILE_URI,//FILE_URI,DATA_URL
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,//CAMERA,SAVEDPHOTOALBUM
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,//JPEG,PNG
                targetWidth: w,
                targetHeight: h
            };
        }

        navigator.camera.getPicture(app_onCameraSuccess, app_onCameraError, cameraOptions);
    }
    catch (e) {
        A.showToast(e);
    }
}



// 获取图片成功后执行回调函数onCameraSuccess，参数imageURI是拍照成功后返回的图片路径
function app_onCameraSuccess(imageURI) {//imageData
    try {
        //	log("data==="+imageURI);
        //	$("#my_profile_page #face").attr("src","data:image/jpeg;base64," + imageData);

        var user = api.user.__get() || { token: "" };

        //$("#my_profile_page #face").attr("src",user.imgOriginalUrl);
        //拍照成功后，需要上传文件
        var fileName = new Date().getTime() + ".jpg";//  imageURI.substr(imageURI.lastIndexOf('/') + 1);
        var options = new FileUploadOptions();
        options.fileKey = "uploadimg";//图片域名！！！
        options.fileName = fileName;

        options.mimeType = "image/jpeg";
        //options.mimeType = "multipart/form-data";
        options.chunkedMode = false;

        var uri = encodeURI(api.domain + "/upload?token=" + user.token + "&deicetoken=" + api.user.__getdt() +
            "&thumb=" + g_params.cameraParams.thumb + "&gameNo=" + g_params.cameraParams.gameNo);

        A.showMask();
        var ft = new FileTransfer();
        ft.upload(imageURI, uri, app_onFileUploadSuccess, app_onFileUploadFail, options);
    }
    catch (e) {
        A.hideMask();
        A.showToast(e);
    }
}

function app_onCameraError(message) {
    console.log('Failed because: ' + message);
}

function app_onFileUploadSuccess(res) {
    //返回实例 {"buytesSent":24001,"responseCode":200,"response":"","objectId":""}
    A.hideMask();

    var ret = eval("(" + res.response + ")");
    if (ret) {
        if (ret.state == 0) {
            if (g_params.cameraParams.thumb == "head") {
                $("#sec_center_setting_head").attr("src", ret.result);
                api.user.saveHead(ret.result);
            }
            else {
                var item = '<li><img onclick="javascript:app_editGameShowImg(this)" src="' + ret.result.full + '" ref="' + ret.result.img + '" style="width:60px;" /></li>';
                $(item).insertBefore($("#sec_center_dogameshow_imgs").find("a").parent());
                //$("#sec_center_dogameshow_imgs").append(item);

                if ($("#sec_center_dogameshow_imgs").find("img").length >= 5) {
                    $("#sec_center_dogameshow_imgs").find("a").hide();
                }
            }
        }
    }
    console.log("========onFileUploadSuccess===========");
}
function app_onFileUploadFail(error) {
    A.hideMask();

    A.showToast("上传失败");
    console.log("code = " + error.code + ";upload error source = " + error.source + ";upload error target = " + error.target);
}

/*-------截图-------*/


/*-------支付alipay--------*/
/*
9000 	订单支付成功
8000 	正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
4000 	订单支付失败
6001 	用户中途取消
6002 	网络连接出错
6004 	支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
其它 	其它支付错误
*/
function app_apy_alipay(payInfo, orderNo) {
    try {
        cordova.plugins.AliPay.pay(payInfo,
            function success(e) {
                alert("Success" + JSON.stringify(e));

                if (e.resultStatus == 9000) {
                    app_pay_Success(orderNo);
                }
            },
            function error(e) {
                // {memo:"",resultStatus:"9000"}
                app_pay_cancel(orderNo);
                //alert("fault" + JSON.stringify(e)); 
            });
    }
    catch (e) {
        A.showToast("支付失败" + e);
    }
}

function app_apy_webchat(params, orderNo) {
    try {
        Wechat.sendPaymentRequest(params, function (ret) {
            alert("Success" + JSON.stringify(ret));

            if (e.resultStatus == 9000) {
                app_pay_Success(orderNo);
            }

        }, function (reason) {
            app_pay_cancel(orderNo);
            //alert(JSON.stringify(reason));
        });
    }
    catch (e) {
        A.showToast("支付失败" + e);
    }
}

function app_pay_Success(orderNo) {
    if (orderNo) {
        api.pay.confirmOrder(orderNo, function () {
            A.Controller.section("page/sec/sec_pay_success.html?ono=" + orderNo);
        }, null, true);
    }
}

function app_pay_cancel(orderNo) {
    if (orderNo) {
        api.pay.cancelOrder(orderNo, null, null, false);
    }
}

/*-------支付--------*/


var __lastgotopagetimer = new Date();
function app_gotopage(t, url) {
    var interval = new Date().getTime() - __lastgotopagetimer.getTime();

    if (interval > 500) //0.5秒,小米2会触发两次点击事件,导致返回出错
    {
        __lastgotopagetimer = new Date();

        if(url)
        {
            // 0商品，1自定义路径,2网页内容
            var sec = "";
            if (t == 0) {
                sec = ("page/sec/sec_product_detail.html?pid=" + url + "&back=home");
            }
            else if (t == 1) {
                sec = (url);
            }
            else {
                sec = ("page/sec/sec_inner_html.html?url=" + url + "&back=home");
            }

            if (sec) A.Controller.section(sec);
        }

        console.log("click");
        return void (0);
    }
}


function app_confirmExpress() {
    var gno = $("#sec_center_express_gameNo").html();
    g_params.refreshWinGameNo = gno;
    if (gno) {
        api.user.confirmExpress(gno, function () {
            A.confirmme('提示', '操作成功', "暂不晒单", "立即晒单",
                function () {
                    A.Controller.section("page/sec/sec_center_dogameshow.html?gno=" + gno);
                },
                function () {
                    A.Controller.close();
                });
        })
    }
}

function app_showQQ() {
    A.alert('官方QQ群', appConfig.qq);
}

/****************分享 BEGIN */

function app_gameShowShare(gno)
{
    g_params.shareGno=gno;
    app_share_desc();
    app_showTarget('oneShareBox','')
}

function app_homeShare()
{
    g_params.shareGno=''; 
    app_share_desc();
    app_showTarget('oneShareBox','')
}

function app_share_desc()
{
    api.share.isHaveCoupon(function(){
        $("#lb_share_desc").html("立即分享,可收获优惠券.");
    },function(){
         $("#lb_share_desc").html("");
    });
}

function app_share_webchat(scene)
{
    gno=g_params.shareGno;

    api.share.get(scene,gno,function(ret){

        var title= ret.result.title;
        var description= ret.result.description;
        var thumb= ret.result.thumb;
        var webpageUrl= ret.result.webpageUrl;

        /*
        Scene: {
                SESSION:  0, // 聊天界面
                TIMELINE: 1, // 朋友圈
                FAVORITE: 2  // 收藏
            }
        */ 
        
        webchatShare.share(scene, title, description, thumb, webpageUrl, function(){
            var platform= scene == 0 ? "SESSION": "TIMELINE";
            api.share.getcoupon(platform,function(ret1){
                if(ret1.result > 0)
                {
                    A.confirm("贡献您获得"+ret1.result+"元优惠券.");
                }
            });
 
            A.showToast("分享成功");
        });
    });
}


function app_share_qq(scene)
{
    /*
    QQ:  0, // QQ 好友
    QQZone: 1, // QQ 空间
    Favorite: 2  // 收藏
    */ 
    //QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
    gno=g_params.shareGno;

    api.share.get(scene,gno,function(ret){
        var title= ret.result.title;
        var description= ret.result.description;
        var thumb= ret.result.thumb;
        var webpageUrl= ret.result.webpageUrl;

        
        qqShare.shareNews(scene, title, description, thumb, webpageUrl, function(){
            var platform= scene == QQSDK.Scene.QQ ? "QQ": "QQZone";
            api.share.getcoupon(platform,function(ret1){
                if(ret1.result > 0)
                {
                    A.confirm("贡献您获得"+ret1.result+"元优惠券.");
                }
            });
 
            A.showToast("分享成功");
        });
    });
}









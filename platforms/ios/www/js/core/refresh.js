/* 晒单列表 BEGIN */
(function () {

    var skip = 0;
    var isscrolling = true;

    $('#art_show').on('scrollInit', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                api.product.getGameShow(skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;
                    A.template('#template_show').renderAfter(ret);

                    if (ret.result.length > 0) { if (ret.result.length == appConfig.take) isscrolling = false; } else { A.showToast('没有更多内容') }
                });
            }
        });
    });


    $('#art_show').on('articleshow', function () {
        if (g_params.refreshShowGame) {
            g_params.refreshShowGame = false;

            doRefresh();
        }
    });


    $('#art_show').on('refreshInit', function () {
        var refresh = A.Refresh(this);

        refresh.on('pulldown', function () {
            doRefresh();
        });

        doRefresh();
    });


    var doRefresh = function () {
        //下拉刷新加载到前面用before
        skip = 0;
        A.template('#template_show_empty').renderReplace();

        api.product.getGameShow(skip, appConfig.take, function (ret, params) {
            if (ret.result) skip = ret.result.length;

            if (skip == 0) {
                A.template('#template_show_empty').renderReplace({ msg: "还没有晒单" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_show').renderReplace(ret);
        });
    };


})();
/* 晒单列表 END */


/* 商品&banner列表 BEGIN */
(function () {

    var skip = 0;
    var isscrolling = true;

    $('#art_goods').on('scrollInit', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                //上拉刷新加载到后面用after
                api.product.items(skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;

                    if (ret.result.length > 0) { isscrolling = false; } else { A.showToast('没有更多内容') }

                    A.template('#template_productlist').renderAfter(ret);
                });

            }
        });
    });

    $('#art_goods').on('articleshow', function () {
        if (g_params.refreshGoods) {
            g_params.refreshGoods = false;

            doRefresh();
            doBanner();
        }
    });

    var doRefresh = function () {
        skip = 0;
        api.product.items(skip, appConfig.take, function (ret, params) {
            if (ret.result) skip = ret.result.length;

            if (skip == appConfig.take) {
                isscrolling = false;
            }

            A.template('#template_productlist').renderReplace(ret);
        });
    };

    $('#art_goods').on('refreshInit', function () {
        var refresh = A.Refresh(this);

        refresh.on('pulldown', function () {
            //下拉刷新加载到前面用before
            doRefresh();
            doBanner();
        });

        var doBanner = function () {
            api.banner.gets(function (ret, params) {
                A.template('#template_banner').renderReplace(ret, function () {
                    app_banner_go();
                });
            });
        }

        doRefresh();
        doBanner();
    });

})();




(function () {

    var lastupdateTime = new Date();
    var isAutoUpate = true;

    function tryAutoUpate() {

        var interval = new Date().getTime() - lastupdateTime.getTime();
        if (interval > 10000) {
            //更新状态 
            if (isAutoUpate) {
                lastupdateTime = new Date();
                try { autoUpate(); } catch (e) { console.log(e); }
            }
        }

        setTimeout(tryAutoUpate, 5000);
    }

    function toDto(ref) {
        var items = ref.split(",");

        return { "GameNo": items[0], "ProductId": items[1], "Cur": items[2] }
    }

    function autoUpate() {
        var games = $("#art_goods").find("li[gametype='home']");

        if (games) {

            var datas = [];
            $(games).each(function () {
                datas.push(toDto($(this).attr("ref")));
            })

            api.product.getUpdateOngoinInfos(JSON.stringify(datas), function (ret) {
                if (ret.result) {
                    for (var i = 0; i < ret.result.length; i++) {
                        var html = A.template('#template_goods_item_g').render(ret.result[i]);
                        //console.log(html);
                        if (html) {
                            var target = $("#art_goods").find("li[productId='" + ret.result[i].productid + "']");
                            target.html(html);
                            A.Component.lazyload(target.find("img"));
                            showAnimate(target);

                            target.attr("ref", ret.result[i].gameno + "," + ret.result[i].productid + "," + ret.result[i].cur);
                        }
                    }
                }
            });
        }
    }

    $('#art_goods').on('articleshow', function () {
        isAutoUpate = true;
    });

    $('#art_goods').on('articlehide', function () {
        isAutoUpate = false;
    });

    $('#sec_index').on('sectionhide', function () {
        isAutoUpate = false;
    });

    $('#art_goods').on('articleload', function () {
        tryAutoUpate();
    });


    function showAnimate(target) {
        try {
            target.find(".bar")
                .animate({ backgroundColor: '#ff0000' }, 500)
                .animate({ backgroundColor: '#febe2f' }, 2000);
        }
        catch (e) {
            console.log(e)
        }
    }
})();

/* 商品&Banner列表 END */


/* 待揭晓列表 BEGIN */
(function () {
    var isscrolling = true;
    var skip = 0;


    $('#art_wait').on('scrollInit', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                //上拉刷新加载到后面用after 
                api.product.getWaitForCompute(skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;

                    if (ret.result.length > 0) { if (ret.result.length == appConfig.take) isscrolling = false; } else { A.showToast('没有更多内容') }
                    A.template('#template_wait').renderAfter(ret);
                });

            }
        });
    });


    $('#art_wait').on('articleshow', function () {
        if (g_params.refreshWait) {
            g_params.refreshWait = false;

            doRefresh();
        }
    });


    var doRefresh = function () {
        skip = 0;
        A.template('#template_wait_empty').renderReplace();

        api.product.getWaitForCompute(skip, appConfig.take, function (ret, params) {
            if (ret.result) skip = ret.result.length;

            if (skip == 0) {
                A.template('#template_wait_empty').renderReplace({ msg: "还没有待揭晓商品" });
            } else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_wait').renderReplace(ret);
        });
    };

    $('#art_wait').on('refreshInit', function () {
        var refresh = A.Refresh(this);
        skip = 0;

        refresh.on('pulldown', function () {
            //下拉刷新加载到前面用before
            doRefresh();
        });

        doRefresh();
    });

})();

/* 待揭晓列表 END */


/* 个人中心 BEGIN */
(function () {
    var isInit = false;
    var defaultHead = "images/head/d_face_002.png";
    function displayNotify(num, target, title) {
        if (num && num > 0) {
            $(target).html(title + '<i class="new_dot"></i>')
        }
        else {
            $(target).html(title)
        }
    }

    function refrushUi() {
        var user = api.user.__get() || { head: "", name: "", token: "" };

        if (user == null || !user.token) {
            $("#my_center_sec_login_div").show();
            $("#my_center_sec_info_div").hide();
            $("#my_center_sec_setting").hide();
            $("#my_center_sec_login_backimg").attr("src", defaultHead);
        }
        else {
            $("#my_center_sec_name").html(user.name);
            $("#my_center_sec_head").attr("src", user.head || defaultHead);
            $("#my_center_sec_login_backimg").attr("src", user.head || defaultHead);

            $("#my_center_sec_login_div").hide();
            $("#my_center_sec_info_div").show();
            $("#my_center_sec_setting").show();

            api.user.notify(function (ret) {
                if (ret.result) {
                    g_params.lastnotify = ret.result;

                    displayNotify(ret.result.j, "#my_center_sec_njoin", "参与记录");
                    displayNotify(ret.result.w, "#my_center_sec_nwin", "中奖记录");
                    displayNotify(ret.result.s, "#my_center_sec_nshow", "我的晒单");
                    displayNotify(ret.result.m, "#my_center_sec_nmsg", "消息中心");
                    displayNotify(ret.result.c, "#my_center_sec_ncoupon", "优惠券");
                    displayNotify(ret.result.a, "#my_center_sec_address", "收货地址");
                    displayNotify(ret.result.f, "#my_center_sec_feedback", "反馈");
                }
            });
        }
    }

    $('#art_center').on('articleshow', function () { if (isInit) { refrushUi(); } });

    $('#art_center').on("articleload", function () {
        A.template('#template_center').renderReplace({ head: "", name: "", token: "" }, function () {
            refrushUi();
            isInit = true;
        });

    });
})();
/* 个人中心 END */


/* 导航title控制 BEGIN */
(function () {

    function showHeader(title) {
        $("#header_title").html(title);
    }

    $('#art_center').on('articleshow', function () {
        showHeader("art_center");
    });
    $('#art_wait').on('articleshow', function () {
        showHeader("art_wait");
    });
    $('#art_goods').on('articleshow', function () {
        showHeader("art_goods");
    });
    $('#art_show').on('articleshow', function () {
        showHeader("art_show");
    });


})();

/* 导航title控制 END */


/* 商品往期列表 BEGIN */
(function () {

    var skip = 0;
    var pid = "";
    var isscrolling = true;

    $(document).on('scrollInit', '#sec_detail_art_history', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                api.product.getPrvs(skip, appConfig.take, pid, function (ret, params) {
                    if (ret.result) skip += ret.result.length;

                    if (ret.result.length > 0) { if (ret.result.length == appConfig.take) isscrolling = false; } else { A.showToast('没有更多内容') }

                    A.template('#template_detail_history').renderAfter(ret);

                });
            }
        });
    });


    $(document).on('sectionshow', '#sec_detail_history', function () {
        var params = A.Component.params(this);

        if (params.pid != pid) {
            pid = params.pid;
            skip = 0;
            doRefresh();
        }
    });



    $(document).on('refreshInit', '#sec_detail_art_history', function () {

        var refresh = A.Refresh(this);
        refresh.on('pulldown', function () {
            //下拉刷新加载到前面用before
            skip = 0;
            doRefresh();
        });
    });

    function doRefresh() {
        A.template('#template_detail_history_empty').renderReplace();

        api.product.getPrvs(skip, appConfig.take, pid, function (ret, params) {
            if (ret.result) skip += ret.result.length;
            if (skip == 0) {
                A.template('#template_detail_history_empty').renderReplace({ msg: "还没有历史记录" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_detail_history').renderReplace(ret);
        });
    }

})();
/* 商品往期列表 END */

 

/* 商品晒单列表 BEGIN */
(function () {

    var pid = "";
    var skip = 0;
    var isscrolling = true;


    $(document).on('scrollInit', '#sec_detail_art_gameshow', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;


                //上拉刷新加载到后面用after
                api.product.getGameShowOfGame(skip, appConfig.take, pid, function (ret, params) {
                    if (ret.result) skip += ret.result.length;

                    if (ret.result.length > 0) {
                        A.template('#template_detail_show').renderAfter(ret);

                        if (ret.result.length == appConfig.take) isscrolling = false;
                    }
                    else {
                        A.showToast('没有更多内容')
                    }
                });
            }
        });
    });


    $(document).on('sectionshow', '#sec_detail_gameshow', function () {
        var params = A.Component.params(this);

        if (params.pid != pid) {
            pid = params.pid;
            skip = 0;
            doRefresh();
        }
    });


    $(document).on('refreshInit', '#sec_detail_art_gameshow', function () {

        var refresh = A.Refresh(this);
        refresh.on('pulldown', function () {
            //下拉刷新加载到前面用before
            skip = 0;
            doRefresh();
        });
    });

    function doRefresh() {
        A.template('#template_detail_show_empty').renderReplace();

        api.product.getGameShowOfGame(skip, appConfig.take, pid, function (ret, params) {
            if (ret.result) skip = ret.result.length;
            if (skip == 0) {
                A.template('#template_detail_show_empty').renderReplace({ msg: "还没有晒单记录" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_detail_show').renderReplace(ret);

        });
    }

})();
/* 商品晒单列表 END */

/* 支付页面 BEGIN */
(function () {

    function showDetail(gameNo, pid) {
        g_params.gameNo = gameNo;
        g_params.productId = pid;
        skip=0;
        isscrolling=false;

        api.product.detail(gameNo, pid, function (ret) {

            var res = ret.result;
            $("#sec_product_detail_name").html(res.pi.name);
            curleft = res.pi.total - res.pi.cur;
            $("#detail_buy_img").attr("src", res.pi.img);
            $("#detail_byCnt").val(curleft >= 10 ? "10" : curleft);

            g_params.needTotal = res.pi.total;
            g_params.gameState = res.pi.state;

            if (curleft <= 0) { $("#sec_detail_buy_btn").hide(); } else { $("#sec_detail_buy_btn").show(); }

            //A.template('#template_detail_timebox').renderReplace(ret);
            A.template('#template_detail_winner').renderReplace(ret);
            A.template('#template_detail_main').renderReplace(ret);
            A.template('#template_detail_member').renderReplace(ret);
            A.template('#template_detail_member_empty').renderReplace();

            if (!res.mb || res.mb.length == 0) {
                A.template('#template_detail_member_empty').renderReplace({ "msg": "还没有参与记录", "type": 1 }); 
                isscrolling=true;
            }
            else
            { 
                if (res.mb.length < 10) isscrolling = true;
            }
        });
    }

 
    var isscrolling = false;

    $(document).on('scrollInit', '#sec_product_detail_art', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                var skip = $("#div_detail_product_members").find("div.join_feed").last().attr("ref");
                api.product.members(g_params.gameNo,skip, appConfig.take,  function (ret, params) {
                
                    if (ret.result.mb.length > 0) { 
                        if (ret.result.mb.length == appConfig.take) isscrolling = false; 
                    } 
                    else { A.showToast('没有更多内容') }

                    A.template('#template_detail_member').renderAfter(ret);
                });
            }
        });
    });



    $(document).on('sectionshow', '#sec_product_detail', function () {
        var params = A.Component.params(this);//获取所有参数，此处为{'gno':'1', 'pid':'Agile框架实战'}

        refresh_ModifyBack(params.back, "sec_product_detail");

        if (g_params.gameNo === params.gno) {

            if (g_params.gameState == 1 || g_params.gameState == 2) {
                api.product.getJoinCntStat(params.gno, function (ret) {
                    if (ret && ret.result) {
                        try {
                            var cur = ret.result[g_params.gameNo];

                            if (cur < g_params.needTotal) {
                                var left = g_params.needTotal - cur;
                                var leftPrecent = cur / g_params.needTotal * 100
                                $("#template_detail_main_left").html(left)
                                $("#template_detail_main_percent").css("width", leftPrecent + "%")
                            }
                            else {
                                showDetail(g_params.gameNo, g_params.productId);
                            }
                        }
                        catch (e) {

                            showDetail(g_params.gameNo, g_params.productId);
                        }
                    }
                });
            }

        }
        else {
            showDetail(params.gno, params.pid);
        }

    });


    $(document).on('sectionshow', '#sec_pay', function () {
        $("b[mode='sec_pay_ordermoney']").html("￥" + g_params.totalMoney);
        $("b[mode='sec_pay_ordermoney_end']").html("￥" + g_params.totalMoney);

        app_usecoupon("",0,"未使用");
    });


    $(document).on('asideshow', '#sec_pay_article_coupon', function () {
        var totalMoney = g_params.totalMoney;

        api.pay.couponsofcanuse(0, appConfig.take, totalMoney, function (ret, params) {
            if (ret.result && ret.result.length > 0) {
                A.template('#template_couponcanuse').renderReplace(ret);
            }
            else {
                A.template('#template_couponcanuse_empty').renderReplace({ "msg": "无可用优惠券" });
            }
        });
    });

    $(document).on('sectionshow', '#sec_detail_desc', function () {
        var params = A.Component.params(this);

        api.product.description(params.pid, function (ret, params) {
            $('#sec_detail_desc_content').html(ret.result);
        });
    });
})();
/* 支付页面 END */



/* 我的收货地址编码 BEGIN */
(function () {
    $(document).on('sectionshow', '#sec_center_address_edit', function () {

        var params = A.Component.params(this);
        var id = params.id;

        if (id) {
            api.user.getAddressDetail(id, function (ret) {
                if (ret.result) {
                    $("#sec_center_address_name").val(ret.result.name);
                    $("#sec_center_address_phone").val(ret.result.contract);
                    $("#sec_center_address_addr").val(ret.result.address);
                    $("#sec_center_address_zip").val(ret.result.zip);
                    $("#sec_center_address_qq").val(ret.result.qq);
                    $("#sec_center_address_id").val(ret.result.id);
                }
            });
        }
        else {
            $("#sec_center_address_name").val("");
            $("#sec_center_address_phone").val("");
            $("#sec_center_address_addr").val("");
            $("#sec_center_address_zip").val("");
            $("#sec_center_address_qq").val("");
            $("#sec_center_address_id").val("");
        }
    }); 
})();
/* 我的收货地址 END */


/* 我的消息 BEGIN */

(function () {

    var skip = 0;
    var isscrolling = true;
    var isinit = false;

    $(document).on('scrollInit', '#sec_center_msg_art', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;


                //上拉刷新加载到后面用after
                api.user.msgs(skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;

                    if (ret.result.length > 0) {
                        A.template('#template_sec_center_msg').renderAfter(ret);

                        if (ret.result.length == appConfig.take) isscrolling = false;
                    }
                    else {
                        A.showToast('没有更多内容')
                    }
                });
            }
        });
    });

    $(document).on('sectionshow', '#sec_center_msg', function () {

        if (!isinit) return;

        if (g_params.refreshMyMsg || g_params.lastnotify && g_params.lastnotify.m > 0) {
            g_params.lastnotify.m = 0;
            g_params.refreshMyMsg = false;

            skip = 0;
            doRefresh();
        }
    });


    $(document).on('refreshInit', '#sec_center_msg_art', function () {

        var refresh = A.Refresh(this);
        refresh.on('pulldown', function () {
            //下拉刷新加载到前面用before
            skip = 0;
            doRefresh();
        });

        doRefresh();
    });

    function doRefresh() {
        A.template('#template_sec_center_msg_empty').renderReplace();

        api.user.msgs(skip, appConfig.take, function (ret, params) {
            if (ret.result) skip = ret.result.length;
            if (skip == 0) {
                A.template('#template_sec_center_msg_empty').renderReplace({ msg: "还没有消息记录" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_sec_center_msg').renderReplace(ret);
            isinit = true;

        });
    }

})();

/* 我的消息列表 END */


/* 我的参与记录列表 BEGIN */
(function () {

    var skip = 0;
    var isscrolling = true;
    var isinit = false;

    $(document).on('scrollInit', '#sec_center_join_art', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                //上拉刷新加载到后面用after
                api.user.gameLogs(1, skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;

                    if (ret.result.length > 0) {
                        A.template('#template_center_join').renderAfter(ret);

                        if (ret.result.length == appConfig.take) isscrolling = false;
                    }
                    else {
                        A.showToast('没有更多内容')
                    }
                });
            }
        });
    });

    $(document).on('sectionshow', '#sec_center_join', function () {
        if (!isinit) return;

        var params = A.Component.params(this);
        var refresh = params.refresh; //支付成功后跳转刷新

        if (g_params.refreshMyJoin || refresh || (g_params.lastnotify && g_params.lastnotify.j > 0)) {
            g_params.lastnotify.j = 0;
            g_params.refreshMyJoin = false;

            skip = 0;
            doRefresh();
        }
    });


    $(document).on('refreshInit', '#sec_center_join_art', function () {

        var refresh = A.Refresh(this);
        refresh.on('pulldown', function () {
            //下拉刷新加载到前面用before
            skip = 0;
            doRefresh();
        });

        doRefresh();
    });

    function doRefresh() {
        A.template('#template_center_join_empty').renderReplace();

        api.user.gameLogs(1, skip, appConfig.take, function (ret, params) {
            if (ret.result) skip = ret.result.length;
            if (skip == 0) {
                A.template('#template_center_join_empty').renderReplace({ msg: "还没有参与记录" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_center_join').renderReplace(ret);
            isinit = true;
        });
    }

})();

/* 我的参与记录列表 END */

/* 我的晒单列表 BEGIN */
(function () {

    var skip = 0;
    var isscrolling = true;
    var isinit = false;

    $(document).on('scrollInit', '#sec_center_gameshow_art', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                api.user.getGameShow(skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;
                    A.template('#template_center_gameshow').renderAfter(ret);

                    if (ret.result.length > 0) { if (ret.result.length == appConfig.take) isscrolling = false; } else { A.showToast('没有更多内容') }
                });
            }
        });
    });

    $(document).on('sectionshow', '#sec_center_gameshow', function () {
        if (!isinit) return;

        if (g_params.refreshMyGameShow || g_params.lastnotify && g_params.lastnotify.s > 0) {
            g_params.lastnotify.s = 0;
            g_params.refreshMyGameShow = false;

            doRefresh();
        }
    });

    var doRefresh = function () {
        //下拉刷新加载到前面用before
        skip = 0;
        A.template('#template_center_gameshow_empty').renderReplace();

        api.user.getGameShow(skip, appConfig.take, function (ret, params) {
            if (ret.result) skip = ret.result.length;

            if (skip == 0) {
                A.template('#template_center_gameshow_empty').renderReplace({ msg: "还没有晒单" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_center_gameshow').renderReplace(ret);
            isinit = true;
        });
    };


    $(document).on('refreshInit', '#sec_center_gameshow_art', function () {

        var refresh = A.Refresh(this);

        refresh.on('pulldown', function () {
            doRefresh();
        });

        doRefresh();
    });

})();
/* 我的晒单列表 END */



/* 收货地址列表BEGIN */
(function () {

    $(document).on('sectionshow', '#sec_center_address', function () {
        if (g_params.refreshAddress) {
            doRefresh();

            g_params.refreshAddress = false;
        }
    });


    $(document).on('refreshInit', '#sec_center_address_art', function () {
        var refresh = A.Refresh(this);
        refresh.on('pulldown', function () {
            doRefresh();
        });

        doRefresh();
    });


    function doRefresh() {
        A.template('#template_sec_center_address_empty').renderReplace();

        api.user.getAddress(function (ret, params) {
            if (!ret.result || ret.result.length == 0) {
                A.template('#template_sec_center_address_empty').renderReplace({ msg: "还没有地址" });
            }

            if (ret.result && ret.result.length >= 5) {
                $("#sec_center_address_addbtn").hide();
            }
            else {
                $("#sec_center_address_addbtn").show();
            }

            A.template('#template_sec_center_address').renderReplace(ret);
        });
    }

})();

/* 收货地址列表End */


/* 收货地址选择BEGIN */
(function () {

    $(document).on('sectionshow', '#sec_center_address_select', function () {
        var params = A.Component.params(this);
        $("#template_center_address_select_gameno").val(params.gno);
        doRefresh();
    });


    $(document).on('refreshInit', '#sec_center_address_select_art', function () {
        var refresh = A.Refresh(this);
        refresh.on('pulldown', function () {
            doRefresh();
        });
    });


    function doRefresh() {
        A.template('#template_sec_center_selectaddress_empty').renderReplace();

        api.user.getAddress(function (ret, params) {
            if (!ret.result || ret.result.length == 0) {
                A.template('#template_sec_center_selectaddress_empty').renderReplace({ msg: "还没有地址" });
            }

            A.template('#template_sec_center_address_select').renderReplace(ret);
        });
    }
})();
/* 收货地址选择END */


/* 我的中奖列表 BEGIN */
(function () {

    var skip = 0;
    var isscrolling = true;

    $(document).on('scrollInit', '#sec_center_win_art', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                //上拉刷新加载到后面用after
                api.user.gameLogs(3, skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;

                    if (ret.result.length > 0) {
                        A.template('#template_center_win').renderAfter(ret);

                        if (ret.result.length == appConfig.take) isscrolling = false;
                    }
                    else {
                        A.showToast('没有更多内容')
                    }
                });
            }
        });
    });

    $(document).on('sectionshow', '#sec_center_win', function () {

        if (g_params.refreshWinGameNo) {
            api.user.gameWinLogs(g_params.refreshWinGameNo, function (ret, params) {
                var html = A.template('#template_center_win').render(ret);
                var target = $("#sec_center_win_art").find("[ref='li_center_win_" + g_params.refreshWinGameNo + "']");
                target.html($(html).html());
                A.Component.lazyload(target.find("img"));
                g_params.refreshWinGameNo = "";
            });
        }

        if (g_params.refreshMyWin || g_params.lastnotify && g_params.lastnotify.w > 0) {
            g_params.lastnotify.w = 0;
            g_params.refreshMyWin = false;

            skip = 0;
            doRefresh();
        }
    });


    $(document).on('refreshInit', '#sec_center_win_art', function () {

        var refresh = A.Refresh(this);
        refresh.on('pulldown', function () {
            //下拉刷新加载到前面用before
            skip = 0;
            doRefresh();
        });

        doRefresh();
    });

    function doRefresh() {
        A.template('#template_center_win_empty').renderReplace();

        api.user.gameLogs(3, skip, appConfig.take, function (ret, params) {
            if (ret.result) skip = ret.result.length;
            if (skip == 0) {
                A.template('#template_center_win_empty').renderReplace({ msg: "还没有获奖记录" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_center_win').renderReplace(ret);
        });
    }
})();
/* 我的中奖列表 END */

/* 我的优惠券列表 BEGIN */
(function () {

    var skip = 0;
    var isscrolling = true;
    var isinit = false;

    $(document).on('scrollInit', '#sec_center_coupon_art', function () {
        var scroll = A.Scroll(this);

        //监听滚动到底部事件，可以做一些逻辑操作
        scroll.on('scrollBottom', function () {
            if (!isscrolling) {
                isscrolling = true;

                api.user.coupons(skip, appConfig.take, function (ret, params) {
                    if (ret.result) skip += ret.result.length;
                    A.template('#template_center_coupon').renderAfter(ret);

                    if (ret.result.length > 0) { if (ret.result.length == appConfig.take) isscrolling = false; } else { A.showToast('没有更多内容') }
                });
            }
        });
    });


    $(document).on('sectionshow', '#sec_center_coupon', function () {
        if (!isinit) return;

        if (g_params.refreshMyCoupon || g_params.lastnotify && g_params.lastnotify.c > 0) {
            g_params.lastnotify.c = 0;
            g_params.refreshMyCoupon = false;

            doRefresh();
        }
    });


    var doRefresh = function () {
        //下拉刷新加载到前面用before
        skip = 0;
        A.template('#sec_center_coupon_empty').renderReplace();

        api.user.coupons(skip, appConfig.take, function (ret, params) {

            if (ret.result) skip = ret.result.length;

            if (skip == 0) {
                A.template('#sec_center_coupon_empty').renderReplace({ msg: "还没有优惠券" });
            }
            else {
                if (skip == appConfig.take) isscrolling = false;
            }

            A.template('#template_center_coupon').renderReplace(ret);
            isinit = true;
        });
    };


    $(document).on('refreshInit', '#sec_center_coupon_art', function () {

        var refresh = A.Refresh(this);

        refresh.on('pulldown', function () {
            doRefresh();
        });

        doRefresh();
    });

})();
/* 我的优惠券列表 END */


(function () {
    $(document).on('sectionshow', '#sec_center_login', function () {
        $("#sec_center_login_form_phone").val(api.cache.getMobile() || "");
    });

    $(document).on('sectionshow', '#sec_center_feedback', function () {
        $("#sec_center_feedback_img").attr("src", api.domain + "/sms/ImgCode?i=" + Math.random() + "&DeviceToken=" + api.user.__getdt());
    });
})();


(function () {

    var gno = "";

    function toStep1(ret) {
        var s = "";
        for (var i = 0; i < ret.stocks.length; i++) {
            if (s) s += " * ";
            s += ret.stocks[i].v + "(" + ret.stocks[i].n + ")"
        }

        return s += " = " + ret.step1;
    }

    function toStep2(ret) {
        var s = ret.step1 + "* 100 后取整数部分";

        return s += " = " + ret.step2;
    }


    function toStep3(ret) {
        return ret.step2 + " 对总参与人数 " + ret.total + " 取余数 + 1000001 = " + ret.winno;
    }

    function toStockTime(dateStr) {
        var str = dateStr.replace(/-/g, "/");
        var date = new Date(str);//将字符串转化为时间  

        /*
        myDate.getYear();      //获取当前年份(2位)    
        myDate.getFullYear(); //获取完整的年份(4位,1970-????)    
        myDate.getMonth();      //获取当前月份(0-11,0代表1月)    
        myDate.getDate();      //获取当前日(1-31)    
        myDate.getDay();        //获取当前星期X(0-6,0代表星期天)    
        myDate.getTime();      //获取当前时间(从1970.1.1开始的毫秒数)    
        myDate.getHours();      //获取当前小时数(0-23)    
        myDate.getMinutes();    //获取当前分钟数(0-59)    
        myDate.getSeconds();    //获取当前秒数(0-59)    
        myDate.getMilliseconds(); //获取当前毫秒数(0-999)    
        myDate.toLocaleDateString();    //获取当前日期    
        var mytime=myDate.toLocaleTimeString();    //获取当前时间    
        myDate.toLocaleString( );      //获取日期与时间----如果涉及到时分秒，直接使用即可。  
        */

        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
    }

    $(document).on('sectionshow', '#sec_detail_compute', function () {

        var params = A.Component.params(this)
        if (gno === params.gno) return;

        gno = params.gno;
        api.product.getComputeDetail(gno, function (ret) {
            if (ret.result) {
                $("#sec_detail_compute_title").html(ret.result.name);
                $("#sec_detail_compute_productName").html(ret.result.name);
                $("#sec_detail_compute_gameNo").html(ret.result.gameno);
                $("#sec_detail_compute_computeTime").html(ret.result.computetime);

                $("#sec_detail_compute_setp1").html(toStep1(ret.result));
                $("#sec_detail_compute_setp2").html(toStep2(ret.result));
                $("#sec_detail_compute_setp3").html(toStep3(ret.result));

                if (ret.result.stocks) {
                    var info = "";
                    for (var i = 0; i < ret.result.stocks.length; i++) {
                        info += ret.result.stocks[i].n + ":<b style='color:red'>" + ret.result.stocks[i].v + "</b></br>";
                    }
                    $("#sec_detail_compute_p").html(info);
                }

                $("#sec_detail_compute_stockTime").html(toStockTime(ret.result.computetime));
            }
        });
    });

})();



(function () {
    $(document).on('sectionshow', '#sec_center_setting', function () {
        var user = api.user.__get();
        if (user) {
            $("#sec_center_setting_name").html(user.name);
            $("#sec_center_setting_head").attr("src", user.head);
        }
    });
})();




(function () {
    $(document).on('sectionshow', '#sec_center_name', function () {
        var user = api.user.__get();
        if (user) {
            $("#sec_center_name_val").val(user.name);
        }
    });
})();


(function () {
    $(document).on('sectionshow', '#sec_center_viewimg', function () {
        if (g_params.gameshowEditCmd.id && g_params.gameshowEditCmd.src) {
            $("#sec_center_viewimg_src").attr("src", g_params.gameshowEditCmd.src);
        }
    });
})();


(function () {
    $(document).on('sectionshow', '#sec_center_dogameshow', function () {

        if (g_params.gameshowEditCmd.cmd == 1) {
            if (g_params.gameshowEditCmd.id) {
                $("#sec_center_dogameshow_imgs").find("img[ref='" + g_params.gameshowEditCmd.id + "']").parent().remove()

                if ($("#sec_center_dogameshow_imgs").find("img").length <= 4) {
                    $("#sec_center_dogameshow_imgs").find("a").show();
                }
            }
        }

        var params = A.Component.params(this);

        if (params) {
            if (params.gno) {
                g_params.showgameno = params.gno
                $("#sec_center_dogameshow_productimg").attr("src", params.img);
                $("#sec_center_dogameshow_productname").html(params.name);
            }

        }
    });
})();




(function () {

    function getimgs(div, curImg, content) {
        try {
            var imgs = $(div).find("img");
            var imgsrces = [];
            var index = 0;
            var findIndex = false;
            if (imgs) {
                for (var i = 0; i < imgs.length; i++) {
                    var img = $(imgs[i]).attr("src");
                    if (img) {
                        if (!findIndex) {
                            findIndex = img == curImg;
                            if (!findIndex) {
                                index++;
                            }
                        }
                        imgsrces.push({ imgURL: img.replace(/\/([0-9]+.jpg)/ig, "/l_$1"), content: content });
                    }
                }
            }

            return { index: index, imgs: imgsrces };
        }
        catch (e) {

        }
    }

    $(document).on(A.options.clickEvent, '.img_gviewthum_t img', function () {
        var thisimg = $(this).attr("src");
        var content = $(this).parent().parent().parent().find(".txt_share").html();

        var ret = getimgs($(this).parent().parent(), thisimg, content);

        A.Component.pictureShow({
            id: 'picture',
            index: ret.index,
            title: "晒单图片",
            list: ret.imgs
        });
    });
})();




(function () {
    $(document).on('sectionshow', '#sec_center_joinlog', function () {
        var params = A.Component.params(this);
        var gNo = params.gno;
        var pName = params.pn || "";
        var buycnt = params.bcnt;
        var winNo = params.lno || ""
        var uid = params.uid || "";

        if (gNo) {
            $("#sec_center_joinlog_pno").html(gNo);
            $("#sec_center_joinlog_pname").html(pName);
            $("#sec_center_joinlog_cnt").html(buycnt);

            api.product.getJoinNos(gNo, uid, function (ret) {
                if (ret.result) {
                    var html = "";
                    for (var i = 0; i < ret.result.length; i++) {
                        var time = ret.result[i].time;
                        var startNo = ret.result[i].sn;
                        var endNo = ret.result[i].en;

                        html += "<li>&nbsp;</li>";
                        html += "<li style='color:blue;text-align:center'>" + time + "</li>";
                        html += "<li>&nbsp;</li>";
                        for (var j = startNo; j <= endNo; j++) {
                            if (j == winNo) {
                                html += "<li style='color:red'>" + j + "</li>";
                            }
                            else {
                                html += "<li>" + j + "</li>";
                            }
                        }

                        if ((endNo - startNo + 1) % 3 != 0) {
                            for (var j = 0; j < 3 - ((endNo - startNo + 1) % 3); j++) {
                                html += "<li>&nbsp;</li>";
                            }
                        }
                    }

                    $("#sec_center_joinlog_joinNumber").html(html);
                }
            });
        }
    });
})();



(function () {
    $(document).on('sectionshow', '#sec_inner_html', function () {
        var params = A.Component.params(this);
        var url = params.url;
        refresh_ModifyBack(params.back, "sec_inner_html");

        if (url) {
            $("#sec_inner_html_content").html("");
            api.remote.url(url, function (html) {
                $("#sec_inner_html_content").html(html);
            });
        }
    });
})();



(function () {
    $(document).on('sectionshow', '#sec_center_express', function () {
        var params = A.Component.params(this);
        var gno = params.gno;

        $("#sec_center_express_productName").html("");
        $("#sec_center_express_gameNo").html("");
        $("#sec_center_express_expressNo").html("");
        $("#sec_center_express_detail").html("");
        $("#sec_center_express_confrimbtn").hide();


        if (gno) {
            api.user.getExpress(gno, function (ret) {
                if (ret && ret.result) {
                    if (ret.result.state == 1) {
                        $("#sec_center_express_confrimbtn").show();
                    }

                    $("#sec_center_express_productName").html(ret.result.name);
                    $("#sec_center_express_gameNo").html(ret.result.gameno);

                    if (!ret.result.expresno) {
                        $("#sec_center_express_expressNo").html('<b style="color:blue">发货中</b>');
                    }
                    else {
                        $("#sec_center_express_expressNo").html("服务商:" + ret.result.spname + "</br>快递号:" + ret.result.expresno);
                    }

                    $("#sec_center_express_detail").html(ret.result.desc);
                }
            });
        }
    });
})();


function refresh_ModifyBack(back, secId) {
    if (back && secId) {
        //$("#"+secId).find("a[data-toggle='back']").attr("href","javascript:app_goHome()");
    }
    else {
        //$("#"+secId).find("a[data-toggle='back']").attr("href","#");
    }
}

var main={};

main.init=function()
{     
};

main.loginRefresh=function()
{     
    g_params.refreshMyJoin=true;
    g_params.refreshMyWin=true;
    g_params.refreshMyGameShow=true;
    g_params.refreshMyMsg=true;
    g_params.refreshMyCoupon=true;
    g_params.refreshAddress=true;
};

 

var g_params={
    gameNo:"",
    gameState:0,
    productId:"",
    needTotal:0,
    totalMoney:0,
    couponId:"",
    couponMoney:0,
    couponName:"",
    showgameno:"",
    cameraParams:{},
    gameshowEditCmd:{id:"",cmd:0,gno:""},//1删除
    refreshAddress:false,//是否刷新地址
    refreshWinGameNo:"", //中奖列表刷新数据,
    lastnotify:{}, // 最近一次消息统计,红点
    refreshGoods:false, //是否刷新商品列表
    refreshWait:false, //是否刷新待揭晓列表
    refreshShowGame:false, //是否刷新晒单列表
    refreshMyJoin:false,//是否需要刷新我的参与记录
    refreshMyWin:false,//是否需要刷新我的中奖记录
    refreshMyGameShow:false,//是否需要刷新我的晒单记录
    refreshMyMsg:false,//是否需要刷新我的消息
    refreshMyCoupon:false,//是否需要刷新我的优惠券 
    shareGno:"",//分享期号
};



 

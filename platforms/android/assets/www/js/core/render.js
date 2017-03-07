var render = new Function();
 
render.product = {
    items: function (datas) {
        A.template('#template_productlist').renderReplace(datas);
    },
    itemsMore: function (datas) {
        A.template('#template_productlist').renderAfter(datas);
    },
    detail: function (data) {

    },
    members: function (data) {

    },
    productlastinfo: function (data) {

    },
    gameShows: function (data) {
        A.template('#template_show').renderReplace(datas);
    },
    gameShowsMore: function (data) {
        A.template('#template_show').renderAfter(datas);
    },
};


render.banner = {
    items: function (datas) {
        A.template('#template_banner').renderReplace(datas, function () {

            A.Slider('#slide', {
                dots: 'right',
                auto: true,
                loop: true
            });
        });
    }
};
 
 

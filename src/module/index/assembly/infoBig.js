/**
 * Created by Lishaobo on 2017/2/27.
 */
    /*使用例子
     var InfoBig = require("./modules/infoBig.js");
     var infoBig = new InfoBig();
     infoBig.init($("#info-big"));
     infoBig.show({"country": 36, "enterprise": 600, "National": 12, "brand": 1000});*/
var infoBig = function () {

}
infoBig.prototype = {
    _dom: null,
    _ul: null,
    _data: null,
    init: function (dom) {
        var me = this;
        me._dom = dom;

        me._ul = $("<ul class='info-small'></ul>");
        me._ul.html(" ")
        for (var i = 0; i < 4; i++) {
            me._ul.append("<li></li>");
        }
        me._ul.children().eq(0).append("<h1>参展国</h1><h2></h2>");
        me._ul.children().eq(1).append("<h1>参展企业</h1><h2></h2>");
        me._ul.children().eq(2).append("<h1>国家馆</h1><h2></h2>");
        me._ul.children().eq(3).append("<h1>参展品牌</h1><h2></h2>");
        me._dom.append(me._ul);
    },
    resize: function (s, w, h) {
        var me = this;
        $(me._dom).css({"transform":"scale("+s+","+s+")"});
    },
    show: function (data) {
        var me = this;
        me._data = data;
        me._ul.children().eq(0).children("h2").html(me._data.country);
        me._ul.children().eq(1).children("h2").html(me._data.Amount);
        me._ul.children().eq(2).children("h2").html(me._data.libary);
        me._ul.children().eq(3).children("h2").html(me._data.brand);

    },
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
}
module.exports = infoBig;

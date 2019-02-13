/**
 * Created by Lishaobo on 2017/2/27.
 */
    /*使用例子
     var InfoSmall = require("./modules/infoSmall.js");
     var infoSmall = new InfoSmall();
     infoSmall.init($("#info-small"));
     infoSmall.show({"country": 36, "enterprise": 600, "National": 12});*/
var infoSmall = function () {

}
infoSmall.prototype = {
    _dom: null,
    _ul: null,
    _data: null,
    init: function (dom) {
        var me = this;
        me._dom = dom;

        me._ul = $("<ul class='info-small'></ul>");
        for (var i = 0; i < 3; i++) {
            me._ul.append("<li></li>");
        }
        me._ul.children().eq(0).append("<h1>酒企总数量</h1><h2></h2>");
        me._ul.children().eq(1).append("<h1>规模以上企业</h1><h2></h2>");
        me._ul.children().eq(2).append("<h1>上市企业</h1><h2></h2>");
        me._dom.append(me._ul);
    },
    resize: function (s, w, h) {
        var me = this;
        $(me._dom).css({"transform": "scale(" + s + "," + s + ")"});
    },
    show: function (data) {
        var me = this;
        me._data = data;
        me._ul.children().eq(0).children("h2").html(me._data.total);
        me._ul.children().eq(2).children("h2").html(me._data.listed);
        me._ul.children().eq(1).children("h2").html(me._data.scale);
    },
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
}
module.exports = infoSmall;

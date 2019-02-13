window.createjs = {};
window.$ = require("./vendor/jquery/jquery-1.12.3.min.js");
window.jquery=window.jQuery=$;
window.echarts = require("./vendor/echarts/echarts.min.js");
window.d3 = require("./vendor/d3/d3.v4.js");
// window.tweenjs = require("./vendor/tweenjs/tweenjs-0.6.2.min.js");
// window.THREE = require("./module/memberFlow/chinaMap/three.min.js");
var MainController = require("./module/main/MainController");

$(window).load(function () {
    var mainController = new MainController()
        // 设置主容器
        .setMainDomElement(document.body)
        // 设置100%宽高
        .setFullSize(1280, 720)
        // 引入全部页面功能模块
        .setModules([
        	require("./module/header/Module"),
            require("./module/index/Module"),
            require("./module/realTimeShow/Module"),
            require("./module/wineConsume/Module"),
            require("./module/barMarketData/Module")
        ])
        .setDebugMode(false)
        // 初始化
        .init();
        
});

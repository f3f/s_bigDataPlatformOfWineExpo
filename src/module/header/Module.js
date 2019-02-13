var forge = require("../core/forge");
var ModuleBase = require("../core/ModuleBase");
var ModulePool = require("../main/ModulePool");

var realTimeShow = ModulePool.get('realTimeShow');
var homepage = ModulePool.get('homepage-main');
var barMarketData = ModulePool.get('barMarketData');
var wineConsume = ModulePool.get('wineConsume');
//var combo = require("../global/Combo.js");
/**
 * 标题
 * @author 贾鸣
 * @constructor
 */
var Module = function() {};
Module.prototype = forge(ModuleBase.prototype, {
    template: require("./template.html"),
    init: function() {
        var _index = 0;
        var timer;
        var flag2 = false
        var timer2;
        timer = ds(window.speed2);
        function nextFn() {
            $('header>div>a .hd_btns').removeClass('active')
            $('header>div>a').eq(_index).find('.hd_btns').addClass('active');
            $('body>div').hide();
            if (_index == 0) {
                $("#homepage-main").show();
                homepage.call('show');
            } else if (_index == 1) {
                $("#realTimeShow").show();
                realTimeShow.call('show');
            } else if (_index == 2) {
                $("#wineConsume").show();
                wineConsume.call('show');
            } else if (_index == 3) {
                $("#barMarketData").show();
                barMarketData.call('show');
            }
        }

        function ds(speed) {
            return setInterval(function() {
                flag2 = true
                _index++
                if (_index > 3) {
                    _index = 0
                }
                nextFn()
            }, speed)
        }
        $('.header_m').on('click', function() {
            if (flag2) {
                clearInterval(timer)
                flag2=false
            } else {
                timer = ds(window.speed2)
                _index++
                nextFn();
            }

        })
        $('html,body').click(function(e) {
            if (e.target.className != 'header_m_c') {
                clearInterval(timer)
                 flag2=false
            }
        })
        homepage.call('show')

        $('.barMarketData1').on('click', function(e) {
            $('body>div').hide();
            $("#barMarketData").show();
            barMarketData.call('show');
        })
        $('.pagehome1').on('click', function(e) {
            $('body>div').hide();
            $("#homepage-main").show();
            homepage.call('show')

        })

        $('.wineConsume1').on('click', function(e) {
            $('body>div').hide();
            $("#wineConsume").show();
            wineConsume.call('show')
        })

        $('.realTimeShow1').on('click', function(e) {
            $('body>div').hide();
            $("#realTimeShow").show();
            realTimeShow.call('show');

        })

        $('.hd_btns').on('click', function(e) {
            $(".hd_btns").removeClass("active");
            $(this).addClass("active");
            if (!$(this).hasClass('realTimeShow1')) {
                realTimeShow.call('hide');
            }
        })
    },
    dispose: function() {

    },
    show: function() {

    },
    hide: function() {

    },
    resize: function(scale, w, h) {}
});

module.exports = Module;
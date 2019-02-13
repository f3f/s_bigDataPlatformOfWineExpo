/**
 * Created by Lishaobo on 2017/2/27.
 */
/*使用例子
 var Radar = require("./modules/radar.js");
 var radar = new Radar();
 var indicator = [
 {name: '洋酒', max: 600},
 {name: '葡萄酒', max: 1600},
 {name: '红酒', max: 3000},
 {name: '啤酒', max: 3800},
 {name: '白酒', max: 5200},
 {name: '黄酒', max: 6000}
 ];
 var legend = ["2017", "2016", "2015", "2014", "2013"];
 var data = [
 {
 value: [430, 1000, 2800, 3500, 5000, 5000],
 name: "2017"
 },
 {
 value: [330, 1000, 2800, 3500, 5000, 5000],
 name: "2016"
 },
 {
 value: [420, 900, 2600, 3300, 4800, 4600],
 name: "2015"
 },
 {
 value: [400, 900, 2600, 3300, 4800, 4800],
 name: "2014"
 },
 {
 value: [320, 800, 2700, 3300, 4800, 4800],
 name: "2013"
 }
 ];
 radar.init($("#main")[0], indicator, data, legend);
 radar.show();*/
var radar = function () {

}
radar.prototype = {
    _dom: null,
    _mychart: null,
    _indicator: null,
    _data: null,
    _legend: null,
    init: function (dom, indicator, data, legend) {
        var me = this;
        me._dom = dom;
        me._indicator = indicator;
        me._data = data;
        me._legend = legend;

        me._max = Math.max.apply({}, data);
        me._mychart = echarts.init(dom);
        

    },
    resize: function (s, w, h) {
        var me = this;
        if (me._mychart)
            me._mychart.resize();
    },
    show: function () {
        var me = this;
        var seriesData = [];
        var colors =  ["#f1363d","#e98e47","#32e6c6","#4e53fb","#784ff2"];
        for(var i = 0;i<me._data.length;i++){
		    seriesData.push({
		    	name: me._data[i].name,
		        value: me._data[i].value,
		        symbolSize: 0,
		        lineStyle: {
		            normal: {
		                color: colors[i],
		                width: 1
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: colors[i],
		                borderWidth: 1
		            }
		        }
		    })	    
        }
        
        var option = {
            tooltip: {},
            legend: {
                textStyle: {
                    color: "#ffffff"
                },
                orient: 'vertical',
                right: '1%',
                top: '0%',
                bottom:"0%",
                data: [{
                    name: me._legend[0],
                    icon: "circle"
                },
                    {
                        name: me._legend[1],
                        icon: "circle"
                    },
                    {
                        name: me._legend[2],
                        icon: "circle"
                    },
                    {
                        name: me._legend[3],
                        icon: "circle"
                    },
                    {
                        name: me._legend[4],
                        icon: "circle"
                    }
                ]
            },
            radar: {
                indicator: me._indicator,
                splitArea: {
                    areaStyle: {
                        color: "rgba(255,255,255,0.1)"
                    }
                },
                nameGap: 4,
                center: ['45%', '50%'],
                radius: '65%',
//				startAngle: 60,
                name: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: "12px",
                        fontFamily: "微软雅黑"
                    }
                },
                splitNumber: 4,
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                        width: 2
                    }
                }
            },
            series:[{
            	type: 'radar',
            	data:seriesData
            }],

        };
        me._mychart.setOption(option, true);
    },
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
}
module.exports = radar;

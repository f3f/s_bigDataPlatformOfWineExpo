/**
 *使用例子:
 * //数据:
 var dataAxis = ['2012', '2013', '2014', '2015', '2016', '2017'];
 var data = [220, 182, 191, 234, 290, 330];
 var yMax = 500;
 var dataShadow = [];

 for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}
 //引用,调用
 var bar = require("./modules/barChart.js");
 var barChart = new bar();
 barChart.init($('#xxx')[0],dataShadow,data,dataAxis);
 barChart.show();
 */
var barChart = function () {
};
barChart.prototype = {
    _dom: null,
    _myChart: null,
    _data: null,
    _dataAxis: null,
    _dataShadow: null,
    init: function (dom, dataShadow, data, dataAxis) {
        var me = this;
        me._dom = dom;
        me._dataShadow = dataShadow;
        me._data = data;
        me._dataAxis = dataAxis;
        me._myChart = echarts.init(dom)
    },
    show: function () {
        var me = this;
        
        me._option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var tar = params[1];
                    if(me._dom.id == 'r_chart4' || me._dom.id == 'r_chart2'){
                    	return tar.name + ' : ' + tar.value + '亿元';
                    }else{
                    	return tar.name + ' : ' + tar.value + '人';
                    }
                    
                }
            },
            grid: {
                left: '2%',
                top: '10%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: {show: false},
                data: me._dataAxis,
                axisLabel: {
                    textStyle: {
                        color: '#768bd0'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#768bd0'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                nameGap: -6,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#626891',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#768bd0'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#768bd0'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: me._dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    barCategoryGap: '60%',
                    barGap: '-100%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#25a4fe'},
                                    {offset: 0.5, color: '#2e6eee'},
                                    {offset: 1, color: '#3639dd'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#21fad5'},
                                    {offset: 0.5, color: '#1ad2b3'},
                                    {offset: 1, color: '#13b195'}
                                ]
                            )
                        }
                    },
                    data: me._data
                }
            ]
        };
        if(me._dom.id == 'r_chart4' || me._dom.id == 'r_chart2'){
        		me._option.yAxis.name = '         亿元';
        };
        me._myChart.setOption(me._option);
    }
    ,
    resize: function (s,w, h) {
        var me = this;
        if(me._myChart)
        me._myChart.resize();
    }
    ,
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
};
module.exports = barChart;
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
    init: function (dom, dataShadow, data, dataAxis, tip) {
        var me = this;
        me._dom = dom;
        me._dataShadow = dataShadow;
        me._data = [];
        for (var i = 0; i < data.length; i++) {
            me._data.push({
                name: tip[i],
                value: data[i] / 1e8,
                tipValue: data[i]
            })
        }
        me._dataAxis = dataAxis;
        me._myChart = echarts.init(dom);
    },
    show: function () {
        var me = this;
        me._option = option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                confine:true,
                formatter: function (params) {
                    var tar = params[1];
                    return tar.data.name + ' : ' + tar.data.value.toFixed(2)+'亿';
                }
            },
            grid: {
                left: 50,
                top: 40,
                bottom:20
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
                name: '亿',
                max: me._data[0].value.toFixed(0) * 1 + 3,
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
        me._myChart.setOption(me._option);
    }
    ,
    resize: function (w, h) {
        var me = this;
        if(me._myChart != null){
        	me._myChart.resize();
        }
        
    }
    ,
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
};
module.exports = barChart;
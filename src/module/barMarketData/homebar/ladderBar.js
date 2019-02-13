/**
 *使用例子:
 * //数据:
 *
 var data = {
    xAxis: ['全部', '3-18', '3-19', '3-20', '3-21', '3-22'],
    emptyData: [0, 1700, 1400, 1200, 300, 0],
    serData: [2900, 1200, 300, 200, 900, 300]
};
 //引用,调用
 var bar = require("./modules/barChart.js");
 var barChart = new bar();
 barChart.init($('#xxx')[0],data);
 barChart.show();
 */
var barChart = function () {

};
barChart.prototype = {
    init: function (dom, data) {
        var me = this;
        me._dom = dom;
        me._myChart = echarts.init(dom);
        me._data = data;

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
                    return tar.name + ' : ' + tar.value;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: {show: false},
                data: me._data.xAxis,
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
                {
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: me._data.emptyData
                },
                {
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#25a3fe' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#3540df' // 100% 处的颜色
                            }], false)
                        }
                    },
                    data: me._data.serData
                }
            ]
        };
        me._myChart.setOption(me._option)
    },
    resize: function (w, h) {
        var me = this;
        me._myChart.resize();
    },
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
};
module.exports = barChart;
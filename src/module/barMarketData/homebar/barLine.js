/**
 *使用例子:
 * //数据:
 * var xAxis = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
 * var data=[
 * [2.0, 4.9, 7.0, 231.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
 * [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
 * ]
 //引用,调用
 var bar = require("./modules/barChart.js");
 var barChart = new bar();
 barChart.init($('#xxx')[0],data,xAxis);
 barChart.show();
 */
var barLine = function () {

};
barLine.prototype = {
    init: function (dom, data, xAxis) {
        var me = this;
        me._dom = dom;
        me._myChart = echarts.init(dom);
        me._data = data;
        me._xAxis = xAxis;
        me._max = Math.max.apply(this, me._data[0]);
    },
    show: function () {
        var me = this;
        me._option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data: [{
                    name: '产量',
                    icon: 'image://../resource/image/homebar/inner.png'
                }, {
                    name: '增长率',
                    icon: 'image://../resource/image/homebar/line.png'
                }],
                itemWidth: 20,
                itemHeight: 10,
                right: 10,
                textStyle: {
                    color: '#b7b8c2'
                }
            },
            grid: {
                left: 50,
                top: 40,
                bottom: 25,
                right: 40
            },
            xAxis: [
                {
                    type: 'category',
                    data: me._xAxis,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#b7b8c2',
                            fontSize: 12
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '万千斤',
                    min: 0,
                    max: me._max + 30,
                    interval: 50,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#b7b8c2',
                            fontSize: 12
                        }
                    },
                    nameTextStyle: {
                        color: '#b7b8c2'
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    type: 'value',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        textStyle: {
                            color: '#b7b8c2',
                            fontSize: 12
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '产量',
                    type: 'bar',
                    data: me._data[0],
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#33a9ff'},
                                    {offset: 0.5, color: '#356fed'},
                                    {offset: 1, color: '#3738dc'}
                                ]
                            )
                        },
                        emphasis: {
                            color: '#21fbd5'
                        }
                    }

                },

                {
                    name: '增长率',
                    type: 'line',
                    lineStyle: {
                        normal: {
                            color: '#03d5e2',
                            type: 'dashed'
                        },
                        emphasis: {
                            color: '#03d5e2',
                            type: 'dashed'
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff'
                        },
                        emphasis: {
                            color: '#6d8cff'
                        }
                    },
                    yAxisIndex: 1,
                    data: me._data[1]
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
module.exports = barLine;
/**
 *使用例子:
 * //数据:
 var dataAxis = ['2012', '2013', '2014', '2015', '2016', '2017'];
 var dataList =[220, 182, 191, 234, 290, 330];
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
    init: function (dom, dataShadow, dataList,dataList2, dataAxis) {
        var me = this;
        me._dom = dom;
        me._dataShadow = dataShadow;
        me._dataList = dataList;
        me._dataList2 = dataList2;
        me._dataAxis = dataAxis;
        me._myChart = echarts.init(dom);
        //me._max = Math.max.apply(this, me._dataList);
        me._max = Math.max.apply({}, dataList.concat(dataList2));
    },
    show: function () {
        var me = this;
        me._option = {
            legend: {
                data: [{
                    name: '国外企业',
                    icon: 'rect'
                }, {
                    name: '国内企业',
                    icon: 'rect'
                }],
                itemWidth: 10,
                itemHeight: 10,
                right: 30,
                textStyle: {
                    color: '#b7b8c2'
                }
            },
            grid: {
                left: 50,
                top: 30,
                bottom: 20
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
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
                max: me._max + 30,
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
                    name: "国外企业",
                    type: 'bar',
                    stack: '虚拟',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#33a8fe'},
                                    {offset: 0.5, color: '#3570ed'},
                                    {offset: 1, color: '#363bdd'}
                                ]
                            )
                        }
                    },
                    data: me._dataList2
                },
                // {
                //     type: 'bar',
                //     stack: '虚拟',
                //     itemStyle: {
                //         normal: {
                //             color: 'rgba(0,0,0,0.2)'
                //         }
                //     },
                //     data: me._dataList
                // },
                {
                    name: "国内企业",
                    type: 'bar',
                    stack: '真是',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#21fbd5'},
                                    {offset: 0.5, color: '#1ad5b5'},
                                    {offset: 1, color: '#13b196'}
                                ]
                            )
                        }
                    },
                    data: me._dataList
                },
                // {
                //     type: 'bar',
                //     stack: '真是',
                //     itemStyle: {
                //         normal: {
                //             color: 'rgba(0,0,0,0.2)'
                //         }
                //     },
                //     data: me._dataList
                // }
            ]
        };
        me._myChart.setOption(me._option);
    },
    resize: function (s,w, h) {
        var me = this;
        me._myChart.resize();

    },
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
};
module.exports = barChart;
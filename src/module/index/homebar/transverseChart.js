/**
 *使用例子:
 * //数据:
 var rightYaxis = ['0', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
 var legendList = ['红酒', '白酒', '啤酒', '黄酒', '米酒', '保健酒', '洋酒'];
 var leftYaxis = ['苏宁易购', '天猫', '大麦'];

 var data =[320, 302, 330];
 //引用,调用
 var bar = require("./modules/barChart.js");
 var barChart = new bar();
 barChart.init($('#xxx')[0],leftYaxis, rightYaxis, data, legendList);
 barChart.show();
 */
var barChart = function () {

};
barChart.prototype = {
    init: function (dom, leftYaxis, rightYaxis, data, legendList) {
        var me = this;
        me._colorList = ['#4948f4', '#7847f6', '#5dffee', '#40a4f0', '#30d5b4', '#31ccff', '#5487f8'];
        me._data = (function () {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                arr.push({
                    name: data[i].name,
                    type: 'bar',
                    stack: '总量',
                    barCategoryGap:'50%',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: me._colorList[i]
                        }
                    },
                    data: data[i].arr
                })
            }
            return arr;
        })();
        me._myChart = echarts.init(dom);
        me._dom = dom;
        me._leftYaxis = leftYaxis;
        me._rightYaxis = rightYaxis;
        me._legendList = legendList;
        me._max = (function () {
            var a = null;
            for (var i = 0; i < me._data.length; i++) {
                a += me._data[i]
            }
            return a + 30;
        })();
    },
    show: function () {
        var me = this;
        me._option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                top: '10',
                data: me._legendList,
                textStyle: {
                    color: '#b7b8c2'
                },
                itemWidth: 10,
                itemHeight: 10
            },
            grid: {
                left: '5',
                right: '30',
                top: '50',
                bottom: '10',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                max: me._max,
                axisLabel: {
                    formatter: function (d, i) {
                        return me._rightYaxis[i]
                    }
                    ,
                    textStyle: {
                        fontSize: 12,
                        color: '#b7b8c2'
                    }
                }
            },
            yAxis: {
            	name:"单位/万元",
            	nameGap:3,
            	nameTextStyle: {
					color: "#b7b8c2",
					fontSize: 12,
				},
                type: 'category',
                data: me._leftYaxis,
                axisLine: {
                    show: false
                }
                ,
                axisTick: {
                    show: false
                }
                ,
                splitLine: {
                    show: false
                }
                ,
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: '#b7b8c2'
                    }
                }
            }
            ,
            series: me._data
            // series: [
            //     {
            //         name: '红酒',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         itemStyle: {
            //             normal: {
            //                 color: '#4948f4'
            //             }
            //         },
            //         data: me._data
            //     },
            //     {
            //         name: '白酒',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         itemStyle: {
            //             normal: {
            //                 color: '#7847f6'
            //             }
            //         },
            //         data: me._data
            //     },
            //     {
            //         name: '啤酒',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         itemStyle: {
            //             normal: {
            //                 color: '#5dffee'
            //             }
            //         },
            //         data: me._data
            //     },
            //     {
            //         name: '黄酒',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         itemStyle: {
            //             normal: {
            //                 color: '#40a4f0'
            //             }
            //         },
            //         data: me._data
            //     },
            //     {
            //         name: '米酒',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         itemStyle: {
            //             normal: {
            //                 color: '#30d5b4'
            //             }
            //         },
            //         data: me._data
            //     },
            //     {
            //         name: '保健酒',
            //         type: 'bar',
            //         stack: '总量',
            //         itemStyle: {
            //             normal: {
            //                 color: '#31ccff'
            //             }
            //         },
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         data: me._data
            //     },
            //     {
            //         name: '洋酒',
            //         type: 'bar',
            //         stack: '总量',
            //         itemStyle: {
            //             normal: {
            //                 color: '#5487f8'
            //             }
            //         },
            //         label: {
            //             normal: {
            //                 show: false
            //             }
            //         },
            //         data: me._data
            //     }
            // ]
        }
        ;
        me._myChart.setOption(me._option)
    },
    resize: function (w, h) {
        var me = this;
        //me._myChart.resize();
        if (me._myChart != null) {
            me._myChart.resize();
        }
    },
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
};
module.exports = barChart;
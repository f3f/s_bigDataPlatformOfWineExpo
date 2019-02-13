/**
 * Created by Lishaobo on 2017/2/27.
 */
/*使用例子
 var AreaLineTwo = require("./modules/areaLineTwo.js");
 var areaLineTwo = new AreaLineTwo();
 var legend = ["正面", "中立", "负面"];
 var data = [[1000, 3000, 2500, 2000, 1500],
 [820, 1100, 3180, 2200, 1300],
 [800, 1000, 1500, 2500, 3000]
 ];
 var categories = ["2013", "2014", "2015", "2016", "2017"];
 areaLineTwo.init($("#line-two")[0], categories, data, legend);
 areaLineTwo.show();*/
var areaLineTwo = function () {

}
areaLineTwo.prototype = {
    _dom: null,
    _mychart: null,
    _categories: null,
    _data: null,
    _legend: null,
    init: function (dom, categories, data, legend) {
        var me = this;
        me._dom = dom;
        me._categories = categories;
        me._data = data;
        me._legend = legend;
        me._mychart = echarts.init(dom);
    },
    resize: function (s, w, h) {
        var me = this;
        if (me._mychart)
            me._mychart.resize();
    },
    show: function () {
        var me = this;
        var option = {
            grid: {
                top: "17%",
                left: "10%",
                right: "5%",
                bottom: "16%"
            },
            legend: {
                show: true,
                textStyle: {
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "微软雅黑"
                },
                itemWidth: 14,
                itemHeight: 14,
                top: "5%",
                right: "5%",
                itemGap: 10,
                data: [
                    {
                        name: me._legend[0],
                        icon: 'circle'
                    },
                    {
                        name: me._legend[1],
                        icon: 'circle'
                    },
                    {
                        name: me._legend[2],
                        icon: 'circle'
                    },
                    {
                        name: me._legend[3],
                        icon: 'circle'
                    },
                    {
                        name: me._legend[4],
                        icon: 'circle'
                    },
                    {
                        name: me._legend[5],
                        icon: 'circle'
                    }
                ]
            },
            tooltip: {
                trigger: 'item',
                padding: 3,
                borderWidth: 1,
                borderColor: "#239a8c",
                backgroundColor: "#0588c6",
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        color: "#8c89ab"
                    }
                }

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,//折线距离y轴有无距离
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#94aef9",
                        fontFamily: "微软雅黑"
                    },
                    margin: 10
                },
                axisTick: {
                    length: 0,
                    lineStyle: {
                        color: "#404E79",
                        width: 2
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#58699b"
                    }
                },
                data: me._categories
            },
            yAxis: {
                type: 'value',
                name: '单位/千',
                nameTextStyle: {
                	color: '#fff'
                },
//              nameGap: 10,
                min: 0,
                // max: 5000,
                // interval: 1000,
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: "#94aef9",
                        fontFamily: "微软雅黑"
                    },
                    formatter: function (v) {
                        return v;
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#47558a', //分割线颜色
                        type: "dashed",
                        opacity: 0.5
                    }
                }
            },
            color: ["#f43336", "#17b9ff", "#1eeeca", "#ff0068", "#ffb631", "#43d39a"],
            series: [
                {
                    name: me._legend[0],
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        },
                        emphasis: {
                            opacity: 1,
                            shadowColor: "#f43336",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#f43336'
                            }, {
                                offset: 1,
                                color: '#18175f'
                            }]),
                            opacity: 0.5

                        }
                    },
                    data: me._data[0]
                },
                {
                    name: me._legend[1],
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        },
                        emphasis: {
                            opacity: 1,
                            shadowColor: "#17b9ff",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#17b9ff'
                            }, {
                                offset: 1,
                                color: '#18175f'
                            }]),
                            opacity: 0.5

                        }
                    },
                    data: me._data[1]
                },
                {
                    name: me._legend[2],
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        },
                        emphasis: {
                            opacity: 1,
                            shadowColor: "#1eeeca",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#1eeeca'
                            }, {
                                offset: 1,
                                color: '#18175f'
                            }]),
                            opacity: 0.5

                        }
                    },
                    data: me._data[2]
                },
                {
                    name: me._legend[3],
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        },
                        emphasis: {
                            opacity: 1,
                            shadowColor: "#ff0068",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ff0068'
                            }, {
                                offset: 1,
                                color: '#18175f'
                            }]),
                            opacity: 0.5

                        }
                    },
                    data: me._data[3]
                },
                {
                    name: me._legend[4],
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        },
                        emphasis: {
                            opacity: 1,
                            shadowColor: "#ffb631",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ffb631'
                            }, {
                                offset: 1,
                                color: '#18175f'
                            }]),
                            opacity: 0.5

                        }
                    },
                    data: me._data[4]
                },
                {
                    name: me._legend[5],
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        },
                        emphasis: {
                            opacity: 1,
                            shadowColor: "#43d39a",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#43d39a'
                            }, {
                                offset: 1,
                                color: '#18175f'
                            }]),
                            opacity: 0.5

                        }
                    },
                    data: me._data[5]
                }
            ]
        };
        me._mychart.setOption(option, true);
    },
    hide: function () {
        var me = this;
        $(me._dom).hide();
    }
}
module.exports = areaLineTwo;

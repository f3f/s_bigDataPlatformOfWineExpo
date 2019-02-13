/**
 * Created by Lishaobo on 2017/2/27.
 */
    /*使用例子
     var AreaLine = require("./modules/areaLine.js");
     var areaLine = new AreaLine();
     var legend = ["啤酒", "白酒", "葡萄酒", "果露酒", "洋酒", "黄酒"];
     var data = [[1000, 3000, 2500, 2000, 1500],
     [820, 1100, 3180, 2200, 1300],
     [800, 1000, 1500, 2500, 3000],
     [400, 1050, 1560, 2170, 3180],
     [300, 800, 3000, 4000, 3000],
     [500, 900, 3000, 3000, 3000]
     ];
     var categories = ["2013", "2014", "2015", "2016", "2017"];
     areaLine.init($("#line-one")[0], categories, data, legend);
     areaLine.show();*/
var areaLine = function () {

}
areaLine.prototype = {
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
                left: "2%",
                right: "5%",
                top: "20%",
                bottom: "10%",
                containLabel: true
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
                left: "5%",
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
                },
                formatter: '{a}<br />{b} : {c}亿元'

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
                min: 0,
				name: '       亿元',
				nameTextStyle: {
					color: "#94aef9"
				},
				nameGap: -6,
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
            color: ["#7847f6", "#4c4bff", "#17b9ff", "#1ee7c6", "#eb8e3e", "#f43336"],
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
                            shadowColor: "#7847f6",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#7847f6'
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
                            shadowColor: "#4c4bff",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#4c4bff'
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
                            shadowColor: "#1ee7c6",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#1ee7c6'
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
                            shadowColor: "#eb8e3e",
                            shadowBlur: 15
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#eb8e3e'
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
module.exports = areaLine;

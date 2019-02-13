var Module = {
    exhibitorsNumberdatas: function(cb) { //参展企业数量走势数据
        getData(window.baseApiPath + "/enterpriseNumberTrend.json",function(value) {
            var data = {
                year: [],
                Foreign: [],
                Domestic: []
            }
            if (!value.data instanceof Array) return
            value.data.reverse().forEach(function(v) {
                data.year.push(v.YearDate)
                data.Foreign.push(v.Foreign)
                data.Domestic.push(v.Domestic)
            })
            cb(data)
        });

    },
    audienceNumberTrend: function(cb) { //观展人数走势接口定义
        getData(window.baseApiPath + "/audienceNumberTrend.json", function(value) {
            var data = {
                YearDate: [],
                Number: []
            }
            if (!value.data instanceof Array) return
            value.data.reverse().forEach(function(v) {
                data.YearDate.push(v.YearDate)
                data.Number.push(v.Number)
            })
            cb(data)
        });

    },
    tasteDistribution: function(cb) { //展品口味接口定义
        getData(window.baseApiPath + "/tasteDistribution.json",function(value) {
            if (!value.data instanceof Array) return
            value.data.forEach(function(v, i) {
                v.name = v.FlavorText
                v.value = v.Number
            })
            cb(value.data)
        });

    },
    exhibitType: function(cb) { //展品类型数量分布及走向接口定义
        getData(window.baseApiPath + "/exhibitType.json",function(value) {
            var data = {
                Number: [],
                Type: [],
                YearDate: [],
            }
            var array = []
            Object.keys(value.data[0]).forEach(function(v) {
                if (v != 'year') {
                    data.Type.push({
                        name: v
                    })
                    array.push(v)
                }
            })
            if (!value.data instanceof Array) return
            value.data.forEach(function(v, i) {
                if (i > 5) {
                    return }
                data.YearDate.push(v['year'])
                data.Number[i] = {}
                data.Number[i].name = v['year']
                data.Number[i].value = []
                var max = [].push
                data.Type[i].max = 0
                data.Type.forEach(function(k, j) {

                    if (v[k['name']] > data.Type[i].max) {
                        data.Type[i].max = v[k['name']]
                    }
                    data.Number[i].value.push(v[k['name']])

                })
            })
            cb(data)
        });

    },
    provinceRange: function(cb) { //观展企业数-省份排行接口定义
        getData(window.baseApiPath + "/provinceRange.json",function(value) {
            var data = [];
            if (!value.data instanceof Array) return
            value.data.forEach(function(v, i) {
                data.push({
                    index: i + 1,
                    previce: v.name,
                    pre: v.rownuma,
                    cur: v.rownumb
                })
            })
            cb(data)
        });

    },
    alcoholDistribution: function(cb) { //展品酒精度数分布接口定义
        var jsonData = {
            year: 2017
        };
        getData(window.baseApiPath + "/alcoholDistribution.json",function(value) {
            var data = {
                name: [],
            }
            if (!value.data instanceof Array) return
            value.data.forEach(function(v) {
                data.name.push(v.name)
            })
            cb(value)
        });

    },
    enterpriseType: function(cb) { //参展酒企类型分布接口定义
        getData(window.baseApiPath + "/enterpriseType.json",function(value) {
            var data = {
                Number: [],
                Number2: [],
                Type: [],
                YearDate: [],
            }
            var array = value.data.reverse()
            Object.keys(array[0]).forEach(function(v) {
                if (v != 'year') {
                    data.Type.push(v)
                }
            })
            data.Type.forEach(function(v, i) {
                data.Number2[i] = {
                    name: v,
                    list: []
                }
                array.forEach(function(k) {
                    data.Number2[i].list.push(k[data.Number2[i].name])
                })
            })
            array.forEach(function(v, i) {
                if (i > 5) {
                    return
                }
                data.YearDate.push(v['year'])
                data.Type.forEach(function(k) {})

            })
            data.Number2.forEach(function(v) {
                data.Number.push(v['list'])
            })
            cb(data)
        });

    },
    opinionHotWord: function(cb) { //舆情热词接口定义
        getData(window.baseApiPath + "/opinionHotWord.json",function(value) {
            var data = {
                Word: [],
            }
            if (!value.data instanceof Array) return
            value.data.forEach(function(v) {
                data.Word.push(v.word)
            })
            cb(data)
        });

    },
    opinionPush: function(cb) { //舆情推送接口定义
        getData(window.baseApiPath + "/opinionPush.json",function(value) {
            var data = []
            if (!value.data instanceof Array) return
            value.data.forEach(function(v, i) {
                if (i > 8) {
                    return }
                data.push({
                    title: v.title,
                    source: v.source,
                    id: v.id
                })
            })
            cb(data)
        });

    },
    opinionStatistics: function(cb) { //舆情统计接口定义
        getData(window.baseApiPath + "/opinionStatistics.json",function(value) {
            var data = []
            if (!value.data instanceof Array) return
            value.data.forEach(function(v, i) {
                if (i > 8) {
                    return }
                data.push({
                    timeNum: v.amount,
                    source: v.source.substring(0, 2)
                })
            })
            cb(data)
        });

    },
    opinionRange: function(cb) { //舆情文章类型分布接口定义
        getData(window.baseApiPath + "/opinionRange.json",function(value) {
            var data = {
                z: [],
                f: [],
                z1: [],
                year: [],
            }
            if (!value.data instanceof Array) return
            value.data.reverse().forEach(function(v) {
                data.year.push(v.year)
                data.z.push(v['正面'] / 1000)
                data.f.push(v['负面'] / 1000)
                data.z1.push(v['中立'] / 1000)
            })
            cb(data)
        });

    },
    indexAmount: function(cb) { //地图
        getData(window.baseApiPath + "/indexAmount.json",function(value) {
            if (!value.data instanceof Array) return
            value.data.forEach(function(v) {
                v.id = v.province
                v.gravity = v.number
            })
            cb(value.data)
        });

    },
    globleEnterprise: function(cb) { //地图2
        getData(window.baseApiPath + "/globleEnterprise.json",function(value) {
            if (!value.data instanceof Array) return
            value.data.forEach(function(v) {
                v.id = v.name
                v.gravity = v.amount
            })
            cb(value.data)
        });

    },
    conutryInfo: function(cb) { //参展国信息
        getData(window.baseApiPath + "/conutryInfo.json",function(value) {

            cb(value.data)
        });

    }

}

function getData(url, callback) {
    var value = null;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(val) {
            value = val;

            callback(value)
        },
        error: function(error) {
            console.error(error)
            return {};
        }
    });


}

module.exports = Module;

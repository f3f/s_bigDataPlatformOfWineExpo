/*var configs = {
	"baseUrl": "http://192.168.4.213:9090/jusfoun/gov/api/extend/", //基础路径
	"data": {}
}
*/
var Module = {
	//日均饮酒量排名数据(中间下边柱图)
	capacityByDay: function(cb) {
		//console.log(window.baseApiPath+"capacityStatistics/capacityByDay");
		getData(window.baseApiPath + "/capacityByDay.json",function(value) {
			var data = {
				quantity: [],
				province: []
			}
			value.data.forEach(function(v) {
				data.quantity.push(v.quantity)
				data.province.push(v.province)

			})
			cb(data)
		});
	},
	//销量排行(按品牌)数据(右下表格)
	yieldStatisticsSales: function(cb) {
		getData(window.baseApiPath + "/sales.json",function(value) {
			cb(value)
		});

	},
	//酒类电商品类销售额分布数据(左下饼图)
	yieldStatisticsWineTaste: function(cb) {
		getData(window.baseApiPath + "/wineTaste.json",function(value) {
			var data = [];
			value.data.forEach(function(v, i) {
				data[i] = {};
				data[i].name = v['NAME'];
				data[i].value = v['VALUE'];
			})
			cb(data)
		});

	},
	//白酒产量趋势及预测(左上柱图)
	yieldStatisticsWineProduction: function(cb, code) {
		var _code = code ? code : 2
		//console.log(code)
		getData(window.baseApiPath + "/wineProduction.json",function(value) {
			var data = {
				year: [],
				quantity: [],
				rate_of_growth: []
			}
			value.data.forEach(function(v) {
				data.year.push(v['YEAR'])
				data.quantity.push(v.quantity)
			})
			var data_true = {
				'xAxis': [],
				'data': [
					[],
					[]
				]
			}
			for(var i = 1; i < (value.data.length - 1); i++) {
				data_true.xAxis.push(data.year[i]);
				data_true.data[0].push(data.quantity[i]);
				data_true.data[1].push(((data.quantity[i] - data.quantity[i - 1]) / data.quantity[i - 1] * 100).toFixed(2));
			}
			//处理数据
			data_true.xAxis = data_true.xAxis.splice(1, 7);
			data_true.data[0] = data_true.data[0].splice(1, 7);
			data_true.data[1] = data_true.data[1].splice(1, 7);
			//获取当前时间
			var date=new Date;
 			var NowYear=date.getFullYear(); 
			data_true.xAxis.push(NowYear);
			var yearLength = value.data.length - 2;
			var averageGrowth1 = eval(data_true.data[1].join('+'));
			var averageGrowth = (averageGrowth1 / yearLength).toFixed(2);
			//data_true.data[1].push((averageGrowth / yearLength).toFixed(2));
			//var averageQuantity = eval(data_true.data[0].join('+'));
			
			var Quantity2016 = data_true.data[0][yearLength-2];
			var Quantity2017 = Quantity2016*(1+averageGrowth/100);
			data_true.data[0].push(Quantity2017);
			data_true.data[1].push(averageGrowth);
			
			cb(data_true);
			//console.log(data_true)
		});
	},
	//酒类电商品类销售额分布(左中柱图)
	yieldStatisticsEcommerceSales: function(cb) {
		getData(window.baseApiPath + "/ecommerceSales.json",function(value) {
			var data = {
				yname: [],
				winename: [],
				data: []
			}
			value.data.forEach(function(v, i) {
				if(data.yname.indexOf(v.ecommerce_text) < 0) {
					data.yname.push(v.ecommerce_text);
				}
				if(data.winename.indexOf(v.category_text) < 0) {
					data.winename.push(v.category_text);
				}
			})
			for(var i = 0; i < data.winename.length; i++) {
				data.data[i] = [];
				value.data.forEach(function(v, j) {
					if(j % (data.winename.length) == i) {
						data.data[i].push(v.quantity);
					}
				})
			}
			var datatrue = {
				yna: data.yname,
				data: [],
				winename: data.winename
			};
			for(var i = 0; i < data.winename.length; i++) {
				datatrue.data[i] = {};
				//datatrue.data[i][data.winename[i]] = data.data[i];
				datatrue.data[i].name = data.winename[i];
				datatrue.data[i].arr = data.data[i];
			}
			cb(datatrue)
		});
	},
	//参展企业热力图数据(中间地图)
	yieldStatisticsRegionSalesMap: function(cb, code) { //参展企业数量走势数据
		getData(window.baseApiPath + "/regionSales.json", function(value) {
			var data = [];
			value.data.forEach(function(v, i) {
				data[i] = {};
				data[i].id = v.code;
				data[i].value = v.amount;
			})
			cb(data)
		});

	},
	//产量最高(右侧左边表格)
	yieldStatisticsRegionSales: function(cb, code) {
		getData(window.baseApiPath + "/regionSales1.json", function(value) {
			var data = []
			value.data.forEach(function(v, i) {
				data.push({
					index: i + 1,
					provice: v.NAME
				})
			})
			cb(data)
		});

	},
	//销量最高(右侧右边表格)
	yieldStatisticsRegionSales2: function(cb, code) {
		getData(window.baseApiPath + "/regionSales2.json",function(value) {
			var data = []
			value.data.forEach(function(v, i) {
				data.push({
					index: i + 1,
					provice: v.NAME
				})
			})
			cb(data)
		});

	}
}

function getData(url,callback) {
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
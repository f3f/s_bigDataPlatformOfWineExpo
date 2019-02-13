var forge = require("../core/forge");
var ModuleBase = require("../core/ModuleBase");
var getData = require('../data/getData3');
/*var ModulePool = require("../main/ModulePool");
var homepage = ModulePool.get('homepage');
var memberflow = ModulePool.get('memberflow');*/
//下拉框引用
var combo = require('../global/Combo');
//中间下柱状图
var BarChart = require('./assembly/barChart');
//左上柱图	
var BarChart1 = require('../index/homebar/barLine');
//左中柱图	
var BarChart2 = require('../index/homebar/transverseChart');
//左下饼图	
var PieChart = require('./assembly/pie-chart/pie-chart');
//中间的地图
var wineChinaMap = require("./assembly/china-map-02/js/commonjs-simulator.min.js");
// 为了方便打包调用，THREE请置于全局空间
window.THREE = require('./assembly/china-map-02/js/three-rebuild.min.js');
var ChinaMap02 = require('./assembly/china-map-02/js/china-map-02.min.js');

//图表的List.min.js引用
var List = require('../../vendor/list/list.min.js')

var Module = function() {
	this.id = 'wineConsume';
	//this.commomLib = commomLib;
};

Module.prototype = forge(ModuleBase.prototype, {
	template: require("./template.html"),
	//中间下柱状图   
	creatObj: null,
	creatDom: null,
	creatData: null,
	//左上柱图		
	creatObj1: null,
	creatDom1: null,
	creatData1: null,
	//左中柱图	
	creatObj2: null,
	creatDom2: null,
	creatData2: null,
	//左下饼图	
	creatObj3: null,
	creatDom3: null,
	creatData3: null,

	init: function(domEle) {
		var me = this;
		//中间下柱状图      	   
		me.creatObj = new BarChart();
		me.creatDom = document.querySelector(".center-bottomLineEchart");
		//左上柱图	   	   
		me.creatObj1 = new BarChart1();
		me.creatDom1 = document.querySelector(".left-topLineEchart");
		//左中柱图	  	   
		me.creatObj2 = new BarChart2();
		me.creatDom2 = document.querySelector(".left-centerLineEchart");
		//左下饼图	   	   
		me.creatDom3 = $("#left-bottomPieEchart");
		me.creatObj3 = new PieChart();
		//切换效果的js
		$(".titleBtn .btnStyle").on("click", function() {
			$(this).addClass('active').siblings(".btnStyle").removeClass('active');
		});

		//白酒产量趋势及预测(左上柱图)
		//模拟下拉列表的组件引用
		var option = {};
		option.width = 90;
		option.height = 24;
		option.fontSize = 14;
		option.backgroundImage = "url('../resource/image/combo/combo.png')";
		option.backgroundColor = "transparent";
		option.backgroundHoverColor = "transparent";
		option.borderWidth = 0;
		option.borderColor = "transparent";
		option.textFontColor = "#FFFFFF";
		option.textFontHoverColor = "#FFFFFF";
		option.lineColor = "transparent";
		option.menuTextFontColor = "#FFFFFF";
		option.menuTextFontHoverColor = "#FFFFFF";
		option.menuBorderWidth = 1;
		option.menuBorderColor = "#06ebff";
		option.menuPositionX = 6;
		option.menuWidhtPositionX = 18;
		option.menuPositionY = 2.5;
		option.paddingLeft = 12;
		option.menuBackgroundColor = "#124475";
		option.menuBackgroundHoverColor = "#124475";
		option.list = ["白酒", "红酒", "葡萄酒", "啤酒", "黄酒"];
		option.selectedIndex = 0;
		//内容变更回调函数
		option.onchange = function(text, i) {
			var textName = $('.break-line').text();
			$('.titleName').text(textName + '产量趋势及预测');
			getData.yieldStatisticsWineProduction(function(data) {
				me.creatData1 = data;
				me.creatObj1.init(me.creatDom1, me.creatData1.data, me.creatData1.xAxis);
				me.creatObj1.show();
			}, i);
		};
		var com2 = document.createElement("div");
		com2.style.position = "absolute";
		//com2.style.left = "800px";
		com2.style.top = "10%";
		com2.style.zIndex = 50;
		document.getElementsByClassName('mnSelect')[0].appendChild(com2);
		var c1 = combo(com2, option);
		//初始化加载
		getData.yieldStatisticsWineProduction(function(data) {
			//console.log(data)
			me.creatData1 = data;
			me.creatObj1.init(me.creatDom1, me.creatData1.data, me.creatData1.xAxis);
			me.creatObj1.show();
		});

		//产量最高(右上左侧表格)
		getData.yieldStatisticsRegionSales(function(data) {
			var options = {
				valueNames: ['index', 'provice'],
				item: '<li><span class="index"></span><span class="provice"></span></li>'
			};
			var hackerList = new List('hacker-listwineLeft', options, data);
			hackerList.show(1, 5);
		});
		//销量最高(右上右侧表格)
		getData.yieldStatisticsRegionSales2(function(data) {
			var options = {
				valueNames: ['index', 'provice'],
				item: '<li><span class="index"></span><span class="provice"></span></li>'
			};
			var hackerList = new List('hacker-listwineRight', options, data);
			hackerList.show(1, 5);
		});

		//销量排行（按品牌）--右侧下面表格
		me.milliFormat = function(input) {
			return input && input.toString()
				.replace(/(^|\s)\d+/g, function(m) {
					return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
				});
		};
		getData.yieldStatisticsSales(function(data) {
			var options = {
				valueNames: ['wine_name', 'sales_volume', 'sales'],
				item: '<li><span class="index"></span><span class="wine_name"></span><span class="sales_volume"></span><span class="sales"></span></li>'
			};

			// Init list
			var mockData = data.data.slice(0, 15);
			var i;
			var len=mockData.length;
			var formatMockData=[];
			for(i=0;i<len;i++){
				mockData[i]['sales']=me.milliFormat(mockData[i]['sales']);
				mockData[i]['sales_volume']=me.milliFormat(mockData[i]['sales_volume']);
				formatMockData.push(mockData[i]);
			}
			var contactList = new List('hacker-list1', options, mockData);
		});
	},
	dispose: function() {

	},
	show: function() {
		(function() {
			var fullWidth = 1280;
			var fullHeight = 720;

			var scale = window.innerWidth / window.innerHeight <= fullWidth / fullHeight ?
				window.innerWidth / fullWidth : window.innerHeight / fullHeight;
			$(document.documentElement).css("font-size", Math.round(100 * scale) + "px");

		})();

		//页面布局调整
		var left_pare = $(".left-content-top").parent().height();
		$(".left-content-top").height(left_pare / 3);
		$(".left-content-center").height(left_pare / 3);
		$(".left-content-bottom").height(left_pare / 3);
		$(".center-content-top").height($(".center-content-top").parent().height() * 2 / 3);

		var me = this;
		var baseUrl = './assembly/map/';
		//日均饮酒量(中间下柱状图)     	
		getData.capacityByDay(function(data) {
			//console.log(data);
			me.creatData = {
				"dataAxis": data.province,
				"data": data.quantity
			}
			me.creatObj.init(me.creatDom);
			me.creatObj.show(me.creatData);
		});

		//酒类电商品类销售额分布(左中柱图)	
		getData.yieldStatisticsEcommerceSales(function(data) {
			//console.log(data)
			me.creatData2 = {
				'rightYaxis': ['0', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
				'legendList': data.winename,
				'leftYaxis': data.yna,
				'data': data.data
			}
			me.creatObj2.init(me.creatDom2, me.creatData2.leftYaxis, me.creatData2.rightYaxis, me.creatData2.data, me.creatData2.legendList);
			me.creatObj2.show();
		})

		//酒类电商品类销售额分布数据(左下饼图)
		getData.yieldStatisticsWineTaste(function(data) {
			var dataShadow = [];
			var yMax = 50;
			me.creatData3 = data;
			//me.creatData3 = data.data;
			for(var i = 0; i < me.creatData3.length; i++) {
				dataShadow.push(yMax);
			}
			me.creatObj3.init({
				id: 'left-bottomPieEchart',
				radius: ['40%', '70%'],
				center: ['46%', '50%'],
				color: ['#7946F7', '#4B47F2', '#5486FA', '#3FA4F0', '#9140EB', '#34C9FB', '#59FFEF'],
				isDoubleLabel: true, //true为内外层都显示标签，false为只显示外层标签
			});
			me.creatObj3.setData(me.creatData3)
		});

		//白酒产量趋势及预测(左上柱图)	
		getData.yieldStatisticsWineProduction(function(data) {
			me.creatData1 = data;
			me.creatObj1.init(me.creatDom1, me.creatData1.data, me.creatData1.xAxis);
			me.creatObj1.show();
		}, 2);

		//地图改变	
		//中间地图地图开始
		// 生成应用并添加到可见区	
		//设置地图无数据的颜色变量
		var _fillColor = 0x254bac;
		getData.yieldStatisticsRegionSalesMap(function(data) {
			app.mapItemData = data
		}, '1')
		var app = new ChinaMap02({
			fillColor: _fillColor
		});
		createmap();

		function createmap() {

			$('#wineMap').html('');
			$('#wineMap').html(app.domElement);
			// 监听尺寸变化并resize
			function window_resizeHandler() {

				app.resize(window.innerWidth / 2 - 40, (window.innerHeight - 120) * 2 / 3 - 40);
				//    app.resize( $('#wineMap').width() - 20, $('#wineMap').height() - 20);
			}
			window.addEventListener('resize', window_resizeHandler);
			window_resizeHandler();
			// 窗体失去焦点时停止渲染
			function window_blurHandler() {
				app.stop();
			}
			window.addEventListener('blur', window_blurHandler);

			// 窗体具备焦点时继续渲染
			function window_focusHandler() {
				app.start();
			}
			window.addEventListener('focus', window_focusHandler);

			// 执行入场
			app.appear();

			// 测试：双击时更换数据。
			/*var ids = ["110000", "120000", "130000", "140000", "150000", "210000", "220000", "230000", "310000", "320000", "330000", "340000", "350000", "360000", "370000", "410000", "420000", "430000", "440000", "450000", "460000", "500000", "510000", "520000", "530000", "540000", "610000", "620000", "630000", "640000", "650000", "710000", "810000", "820000"];
			window.addEventListener('dblclick', function() {
				app.mapItemData = ids.map(function(id) {
					return {
						id: id,
						value: Number((Math.random() * 0xFF).toFixed(2))
					};
				});
			});*/

			// 测试：监听事件，显示ToolTip等
			var tooltip = document.createElement('div');
			tooltip.className = 'tooltip';
			document.getElementsByClassName('center-topMapEchart')[0].appendChild(tooltip);

			app.on('mapItemClick', function(event) {
				// 板块点击事件
				console.log(event);
			});
			app.on('mapItemMouseOver', function(event) {
				// 板块基本信息，可获取板块的基本信息
				var feature = event.feature;
				// 板块附加信息，可获取用户传入的数据
				var item = event.item;

				var showName = $('#wineST .active').text();
				// 板块悬停事件
				tooltip.innerHTML = [
					/*'<div>地区代码：' + feature.id + '</div>',*/
					'<div>地区：' + feature.properties.name + '</div>',
					'<div>' + showName + '：' + (isNaN(item.value) ? '暂无数据' : item.value + ' 万千升') + '</div>'
				].join('\n');
				tooltip.style.display = 'block';
				tooltip.style.left = (event.mouseEvent.pageX + 5) + 'px';
				tooltip.style.top = (event.mouseEvent.pageY + 5) + 'px';
			});
			app.on('mapItemMouseOut', function() {
				// 板块移出事件
				tooltip.innerHTML = '';
				tooltip.style.display = 'none';
			});
		}
		//地图切换部分代码
		$('.flowOutS').click(function() {
			showFlowInto(1)
		})
		$('.flowIntoS').click(function() {
			showFlowInto(0)
		})

		function showFlowInto(code) {
			getData.yieldStatisticsRegionSalesMap(function(data) {
				app.stop();
				app = new ChinaMap02({
					fillColor: _fillColor
				});
				app.mapItemData = data;
				createmap();
				console.log(app.mapItemData);

			}, code)
		}
		/** 地图结束 */
	},
	hide: function() {

	},
	resize: function(scale, w, h) {

		//页面布局调整
		var left_pare = $(".left-content-top").parent().height();
		$(".left-content-top").height(left_pare / 3);
		$(".left-content-center").height(left_pare / 3);
		$(".left-content-bottom").height(left_pare / 3);
		$(".center-content-top").height($(".center-content-top").parent().height() * 2 / 3);

		var me = this;
		me.creatObj.resize(w, h);
		//左上柱图
		me.creatObj1.resize(w, h);

		me.creatObj2.resize(w, h);
		//左下饼图
		//me.creatObj3.resize(w, h);

	},
	showArt: function(dom) {

	}
});

module.exports = Module;
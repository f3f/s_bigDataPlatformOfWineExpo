var forge = require("../core/forge");
var ModuleBase = require("../core/ModuleBase");
var ModulePool = require("../main/ModulePool");

var getData = require("../data/getData2");

var homepage = ModulePool.get('homepage');
var memberflow = ModulePool.get('memberflow');

var AreaLine = require("./assembly/areaLine.js");
var FlopChart = require('./assembly/flopAnimate');
var DataBar2 = require('./assembly/homeBar');

var List = require("../../vendor/list/list.min");

/**
 * 导航
 * @author 贾鸣
 * @constructor
 */

var Module = function() {
	this.id = 'realTimeShow'
};

Module.prototype = forge(ModuleBase.prototype, {
	template: require("./template.html"),
	AreaLineDom: null,
	AreaLineObj: null,
	FlopChartDom: null,
	FlopChartObj: null,
	LNBarDom: null,
	LNBarObj: null,
	BCBarDom: null,
	BCBarObj: null,
	QDBarDom: null,
	QDBarObj: null,

	init: function() {

		var me = this;

		//  	参展酒类签约额走势		
		me.AreaLineDom = document.getElementById('r_chart3');
		me.AreaLineObj = new AreaLine();

		//		本次展会签到人数       
		me.FlopChartDom = document.getElementById('l_chart2');
		me.FlopChartObj = new FlopChart();

		//	          历年签约额增长走势
		me.LNBarDom = document.getElementById('r_chart4');
		me.LNBarObj = new DataBar2();

		//      本次展会签约额增长走势
		me.BCBarDom = document.getElementById('r_chart2');
		me.BCBarObj = new DataBar2();

		//		本次展会签到人数
		me.QDBarDom = document.getElementById('l_chart1');
		me.QDBarObj = new DataBar2();

		// 中间图表本次展会酒品签约额排行榜
		me.mid_options = {
			valueNames: ['index', 'name', 'amount', 'category'],
			item: '<li><span class="index"></span><span class="name"></span><span class="amount"></span><span class="category"></span></li>'
		};
		getData.categoryCode(function(data) {
			me.mid_mockData = data;
			me.contactList = new List('mid_list', me.mid_options, me.mid_mockData);
			($(me.contactList['listContainer'])).find('li:eq(0)');
			($(me.contactList['listContainer'])).find('li:eq(1)');
			($(me.contactList['listContainer'])).find('li:eq(2)');
			$("#mid_list>.list").hotComment({
				newsPerPage: 5,
				newsTickerInterval: 2500,
				direction: 'up'
			});
			me.contactList.timer = setInterval(function() { getListData() }, 50000);
		})

		function getListData(dom, code) {
			getData.categoryCode(function(data) {
				me.mid_mockData = data;
				me.contactList.clear();
				me.contactList.add(data, function() {
					me.contactList.update();
				});
				if(dom) {
					dom.addClass('active');
				}
			}, code);
		}

		$("#r_chart1 .nav>a").on('click', function(e) {
			var _this = $(this);
			_this.siblings().removeClass('active');
			if(e.target && e.target.nodeName.toUpperCase() === 'A') {
				switch($(this)[0].className) {
					case 'winea':
						getListData(_this);
						clearInterval(me.contactList.timer);
						me.contactList.timer = setInterval(function() { getListData(_this) }, 50000);
						break;
					case 'wine':
						getListData(_this, '1');
						clearInterval(me.contactList.timer);
						me.contactList.timer = setInterval(function() { getListData(_this, '1'); }, 50000);
						break;
					case 'wineb':
						getListData(_this, '2');
						clearInterval(me.contactList.timer);
						me.contactList.timer = setInterval(function() { getListData(_this, '2'); }, 50000);
						break;
					case 'winey':
						getListData(_this, '3');
						clearInterval(me.contactList.timer);
						me.contactList.timer = setInterval(function() { getListData(_this, '3'); }, 50000);
						break;
					case 'winee':
						getListData(_this, '0');
						clearInterval(me.contactList.timer);
						me.contactList.timer = setInterval(function() { getListData(_this, '0'); }, 50000);
						break;
					default:
						break;
				}
			}
		});

	},
	dispose: function() {},
	show: function() {
		(function() {
			var fullWidth = 1280;
			var fullHeight = 720;

			var scale = window.innerWidth / window.innerHeight <= fullWidth / fullHeight ?
				window.innerWidth / fullWidth : window.innerHeight / fullHeight;

			$(document.documentElement).css("font-size", Math.round(100 * scale) + "px");

		})();

		//调整布局尺寸
		$("#l_chart1").height($("#l_chart1").parent().height() * 0.28);
		$(".r_chart1").height($(".r_chart1").parent().height() * 0.52);

		var me = this;
		
		//  	参展酒类签约额走势		
		getData.wineSales(function(data) {
			me.AreaLineData = {
				'legend': data.name,
				'data': data.amount,
				'categories': data.year
			};
			me.AreaLineObj.init(me.AreaLineDom, me.AreaLineData.categories, me.AreaLineData.data, me.AreaLineData.legend);
			me.AreaLineObj.show();
		})

		//		本次展会签到人数
		getData.lastFairAudience(function(data) {
			me.FlopChartData = data;
			me.FlopChartObj.hide();
			me.FlopChartObj.init(me.FlopChartDom) //获取dom
			me.FlopChartObj.show(me.FlopChartData, 7, 1000); //数据，显示个数（不能少于3个），动画时间
		})

		//	          历年签约额增长走势
		getData.fairAmount(function(data) {
			me.LNBarData = {
				'data': data.amount,
				'dataAxis': data.time,
				'yMax': parseInt(Math.max.apply(Math, data.amount) * 1.2),
				'dataShadow': []
			};
			for(var i = 0; i < me.LNBarData.data.length; i++) {
				me.LNBarData.dataShadow.push(me.LNBarData.yMax);
			}
			me.LNBarObj.init(me.LNBarDom, me.LNBarData.dataShadow, me.LNBarData.data, me.LNBarData.dataAxis);
			me.LNBarObj.show();
		})

		//      本次展会签约额增长走势	
		getData.fairAmountByDaynce(function(data) {
			me.BCBarData = {
				'data': data.amount,
				'dataAxis': data.time,
				'yMax': parseInt(Math.max.apply(Math, data.amount) * 1.2),
				'dataShadow': []
			};
			for(var i = 0; i < me.BCBarData.data.length; i++) {
				me.BCBarData.dataShadow.push(me.BCBarData.yMax);
			}
			me.BCBarObj.init(me.BCBarDom, me.BCBarData.dataShadow, me.BCBarData.data, me.BCBarData.dataAxis);
			me.BCBarObj.show();
		})

		//		本次展会签到人数
		getData.thisFairAudience(function(data) {
			me.QDBarData = {
				'data': data.amount,
				'dataAxis': data.time,
				'yMax': parseInt(Math.max.apply(Math, data.amount) * 1.2),
				'dataShadow': []
			};
			for(var i = 0; i < me.QDBarData.data.length; i++) {
				me.QDBarData.dataShadow.push(me.QDBarData.yMax);
			}
			me.QDBarObj.init(me.QDBarDom, me.QDBarData.dataShadow, me.QDBarData.data, me.QDBarData.dataAxis);
			me.QDBarObj.show();
		});

		//当天签到人数
		var myDate = new Date();
		var year = myDate.getFullYear();
		var mon = myDate.getMonth() + 1;
		var day = myDate.getDate();
		getData.todayFairAudience(function(data) {
			$(".lt_t1").html(year + '-' + mon + '-' + day);
			$('#qdrs').html(data);
		})

		//当天签约总金额
		getData.todayFairAmount(function(data) {
			$(".rt_t1").html(year + '-' + mon + '-' + day);
			$('#gqy').html(data);
		})

		me.settimer = setInterval(function() {
			getData.todayFairAudience(function(data) {
				$(".lt_t1").html(year + '-' + mon + '-' + day);
				$('#qdrs').html(data);
			})
			getData.todayFairAmount(function(data) {
				$(".rt_t1").html(year + '-' + mon + '-' + day);
				$('#gqy').html(data);
			})

			getData.lastFairAudience(function(data) {
				me.FlopChartObj.add(data);
			})

		}, window.speed);

	},
	hide: function() {
		var me = this;
		me.FlopChartObj.hide();
		clearInterval(me.settimer);
	},
	resize: function(scale, w, h) {
		$("#l_chart1").height($("#l_chart1").parent().height() * 0.28);
		$(".r_chart1").height($(".r_chart1").parent().height() * 0.52);

		var me = this;
		me.FlopChartObj.resize(w, h);
		me.LNBarObj.resize(w, h);
		me.BCBarObj.resize(w, h);
		me.QDBarObj.resize(w, h);
		me.AreaLineObj.resize(scale, w, h);
	},
	showArt: function(dom) {

	}
});


module.exports = Module;
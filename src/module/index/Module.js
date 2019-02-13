var forge = require("../core/forge");
var ModuleBase = require("../core/ModuleBase");
// 引入图表文件
require("./assembly/bubble-cloud.min.js");
var AreaLineTwo = require("./assembly/areaLineTwo");
var AreaLine = require("./assembly/areaLine");
var InfoBig = require("./assembly/infoBig.js");
var Radar = require("./assembly/radar.js");
var bar = require("./homebar/homeBar");
var barBb = require("./homebar/homeDBBar");
var PieChart = require("./pie-chart/pie-chart");
//引入时间选择插件
var BarData = require('./barChart/barData');
var API = require("../data/getData1.js");
var List = require('../../vendor/list/list.min.js')

require('../../vendor/list/jquery-hotcomment.js');
require('../../vendor/layer/layer.js');
require('../../vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js');
require('../../vendor/perfect-scrollbar/css/perfect-scrollbar.min.css');


// 地图
window.THREE = require('./barChart/three-rebuild.min.js');
var AppTest01 = require('./assembly/maphot.min.js');
var Module = function() {
	this.id = 'homepage-main'
};
Module.prototype = forge(ModuleBase.prototype, {
	template: require("./template.html"),
	init: function() {
		var me = this;
		var yMax = 500;
		var dataShadow = [];
		var color = ['#4948f4', '#7847f6', '#5dffee', '#31ccff', '#3fa5f0', '#5487f8'];
		setTimeout(function(){
			var scale = window.innerWidth / window.innerHeight <= 1280 / 720 ? window.innerWidth / 1280 : window.innerHeight / 720;
         	$(document.documentElement).css("font-size", Math.round(100 * scale) + "px");
		},10)
		$('.main-bottom').height(($(window).height()-110)/3)
		me.creatObj = new AreaLine();
		me.creatObj1 = new AreaLineTwo();
		me.creatObj2 = new InfoBig();
		me.creatObj3 = new Radar();
		//参展企业数量走势
		me.creatObj4 = new barBb();
		me.creatObj5 = new bar();
		//展品口味分布和展品酒精度分布
		me.creatObj6 = new PieChart();
		me.creatObj7 = new PieChart();
		me.creatDom2 = $("#info-big");

		//舆情热词接口定义
		// setInterval(function(){
		// 	$("#bubbleCloud").html("");
		// 	$("#hacker-list3 ul").html("");
		// 	$("#hacker-list2 ul").html("");
		// 	opinionHotword();
		// 	opinionstatistics();
		// 	opinionpush();
		// },3000)
		function opinionHotword(){
			API.opinionHotWord(function(v) {
				var categories = [{
					name: "A",
					color: "#3f95ff"
				}, {
					name: "B",
					color: "#ff7e00"
				}, {
					name: "C",
					color: "#ff3f75"
				}, {
					name: "D",
					color: "#d83aff"
				}, {
					name: "E",
					color: "#1ee7c6"
				}, {
					name: "F",
					color: "#fffa66"
				}];
				var width = $('.main-bottom-center .c-item').eq(1).width();
				var height = $('.main-bottom-center .c-item').eq(1).height()-35;
				var data = [];
				v.Word.forEach(function(v, i) {
					data[i] = {};
					data[i].name = v
					data[i].size = 1 + Math.random() * 10
					data[i].group = categories[Math.floor(Math.random() * 6)].name
				})

				var chart1 = new BubbleCloudChart(document.getElementById("bubbleCloud"), width, height);
				chart1.categories = categories;
				// chart1.clickHandler = function(d) {};
				chart1.init();
				chart1.data(data);
			})
		}
		opinionHotword();
			//参展企业数-省份排行
			
		API.provinceRange(function(v) {
				var options = {
					valueNames: ['index', 'previce', 'pre', 'cur'],
					item: '<li><span class="index"></span><span class="previce"></span><span class="pre"></span><span class="cur"></span></li>'
				};
			
				var newMockData = v.filter(function(ele) {
					if (ele.index <= 3) {
						var foo = ele.index;
						ele.index = 'TOP' + foo;
					}
					return ele;
				});
				var listObj = new List('hacker-list', options, newMockData)

			})
			//舆情统计
			function opinionstatistics(){
				API.opinionStatistics(function(v) {
							
							var options = {
								valueNames: ['source', 'timeNum'],
								item: '<li><span class="source"></span><span class="timeNum"></span></li>'
							};
							var hackerList2 = new List('hacker-list2', options, v);
			
						})
					}
					opinionstatistics();
					//舆情推送
					function opinionpush(){
						API.opinionPush(function(v) {
					var options = {
						valueNames: ['title','source','id'],
						item: '<li id="id"><span class="title"></span><span class="source"></span><span class="id" style="display:none"></span></li>'
					};
					var hackerList3 = new List('hacker-list3', options, v);
					// 滚动列表
					$("#hacker-list3>.list").hotComment({
						newsPerPage: 8,
						newsTickerInterval: 2500
					});
					// 滚动列表弹出信息框？没有设计图，先都设置在这里了。
					
					$('#hacker-list3').on('click','li',function(e){
						
						// 应该在e里取出所需id
						var queryId=$(this).children(".id").html();
						// 调用ajax
						$.ajax({
								url:window.baseApiPath+'fair/showArticalInfo',
								type:'GET',
								data:'jsonData=' + JSON.stringify({id:queryId}),
								dataType:'json',
								success:function(val){
									var date = new Date(val.data[0].publish_time);
									Y = date.getFullYear() + '-';
									M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
									D = date.getDate();
									var p_time=Y+M+D;
									var p_author=val.data[0].author=='"null"'?'':val.data[0].author;
									var p_source=val.data[0].source;
		
									layer.open({
										type: 1
										,title: false //不显示标题栏
										,closeBtn: 2
										,area: ['7.8rem', '4rem']
										,shade: 0.5
										,id: 'LAY_layuipro' //设定一个id，防止重复弹出
										,anim:2
										,resize: false
										,moveType: 0 //拖拽模式，0或者1
										,content: '<h2>'+val.data[0].title+'</h2>'
											+'<h4><span>'+p_author+'</span><span>'+p_source+'</span><span>'+p_time+'</span></h4>'
											+'<textarea>'+val.data[0].content+'</textarea>'
										,success:function(){
											$('#LAY_layuipro textarea').perfectScrollbar();
										}
									});
								},
								error:function(error){
									console.error(error)
									return {};
								}
						});
					});
		
				})
			}
			opinionpush();
		me.creatData2 = {
			"country": 36,
			"enterprise": 600,
			"National": 12,
			"brand": 1000
		};
		me.creatObj2.init($("#info-big"));
		me.creatObj2.show(me.creatData2);
		//参展国信息
		API.conutryInfo(function(value){
			$("#info-big").html("");
			me.creatData2 = value[0];
			me.creatObj2.init($("#info-big"));
			me.creatObj2.show(me.creatData2);
		});

		$('#index-china-btn').click(function(){
			if (window.app) {
				app.stop();
				$('#indexMap').html("")
			}
			$(this).addClass('active').siblings().removeClass('active')
			showChina()
		})
		$('#index-world-btn').click(function(){
			if (window.app) {
				app.stop();
				$('#indexMap').html("")
			}
			$(this).addClass('active').siblings().removeClass('active')
			API.globleEnterprise(function(v){
				showWorld(v)
			})
			
		})
		function showChina() {
			
			API.indexAmount(function(v){
				app = new AppTest01({
					type: "china",
					nanhaiMap:window.basePath+'/visualization/resource/image/WechatIMG43.png',
					data: v
				});
				function window_resizeHandler() {
					app.resize( $('#indexMap').parent().width() - 20, $('#indexMap').parent().height() - 55);
				}

				function window_blurHandler() {
					app.stop();
				}

				function window_focusHandler() {
					app.start();
				}

				window.addEventListener("resize", window_resizeHandler);
				window.addEventListener("blur", window_blurHandler);
				window.addEventListener("focus", window_focusHandler);
				$('#indexMap').html(app.domElement)
				window_resizeHandler();
				app.appear();
			})

		}
		

		function showWorld(v) {
			if (app) {
				app.stop();
			}
			app = new AppTest01({
			    type: "world",
			    data: v
			});

			function window_resizeHandler() {
				app.resize( $('#indexMap').parent().width() - 20, $('#indexMap').parent().height() - 55);
			}

			function window_blurHandler() {
				app.stop();
			}

			function window_focusHandler() {
				app.start();
			}

			window.addEventListener("resize", window_resizeHandler);
			window.addEventListener("blur", window_blurHandler);
			window.addEventListener("focus", window_focusHandler);
			$('#indexMap').html(app.domElement)
			window_resizeHandler();
			app.appear();

		}
		
	},
	dispose: function() {

	},
	show: function() {
		var me = this;
		var color = ['#4948f4', '#7847f6', '#5dffee', '#31ccff', '#3fa5f0', '#5487f8'];

		showChina()
		function showChina() {
			
			API.indexAmount(function(v){
				app = new AppTest01({
					type: "china",
					nanhaiMap:window.basePath+'/visualization/resource/image/WechatIMG43.png',
					data: v
				});
				function window_resizeHandler() {
					app.resize( $('#indexMap').parent().width() - 20, $('#indexMap').parent().height() - 55);
				}

				function window_blurHandler() {
					app.stop();
				}

				function window_focusHandler() {
					app.start();
				}

				window.addEventListener("resize", window_resizeHandler);
				window.addEventListener("blur", window_blurHandler);
				window.addEventListener("focus", window_focusHandler);
				$('#indexMap').html(app.domElement)
				window_resizeHandler();
				app.appear();
			})

		}
		

		function showWorld(v) {
			if (app) {
				app.stop();
			}
			app = new AppTest01({
			    type: "world",
			    data: v
			});

			function window_resizeHandler() {
				app.resize( $('#indexMap').parent().width() - 20, $('#indexMap').parent().height() - 55);
			}

			function window_blurHandler() {
				app.stop();
			}

			function window_focusHandler() {
				app.start();
			}

			window.addEventListener("resize", window_resizeHandler);
			window.addEventListener("blur", window_blurHandler);
			window.addEventListener("focus", window_focusHandler);
			$('#indexMap').html(app.domElement)
			window_resizeHandler();

			app.appear();

		}

		// //参展企业数量走势
		API.exhibitorsNumberdatas(function(v) {
			var dataShadow = [];
			var max = Math.max.apply({}, v.Domestic.concat(v.Foreign))
			for (var i = 0; i < v.Domestic.length; i++) {
				dataShadow.push(max);
			}
			me.creatObj4.init($("#box3")[0], dataShadow, v.Domestic, v.Foreign, v.year);
			me.creatObj4.show();
		})
		// //观展人数走势接口定义
		API.audienceNumberTrend(function(v) {
			var dataShadow = [];
			var max = Math.max.apply({}, v.Number)
			for (var i = 0; i < v.Number.length; i++) {
				dataShadow.push(max);
			}
			me.creatObj5.init($("#box4")[0], dataShadow, v.Number, v.YearDate);
			me.creatObj5.show();

		})

		// //展品口味分布和展品酒精度分布
		API.tasteDistribution(function(v) {
			me.creatObj6.init({
				id: 'box5',
				radius: ['30%', '55%'],
				center: ['50%', '55%'],
				color: color,
				isDoubleLabel: true, //true为内外层都显示标签，false为只显示外层标签
			});
			me.creatObj6.setData(v)
		})

		// //参展酒企类型分布接口定义
		API.enterpriseType(function(v) {
				me.creatObj.init($("#box")[0], v.YearDate, v.Number, v.Type);
				me.creatObj.show();
			})

		//展品酒精度数分布接口定义
		API.alcoholDistribution(function(v) {
			var data = []
			Object.keys(v.data[0]).forEach(function(value, i) {
				data[i] = {};
				data[i].name = value;
				data[i].value = v.data[0][value];
			})
			me.creatObj7.init({
				id: 'box6',
				radius: ['30%', '55%'],
				center: ['50%', '65%'],
				color: color,
				isDoubleLabel: true, //true为内外层都显示标签，false为只显示外层标签
			});
			me.creatObj7.setData(data)

		})

		//舆情走势

		API.opinionRange(function(v) {
			me.creatDom1 = $("#box1")[0];
			me.creatCategories1 = v.year;
			me.creatData1 = [
				v.z,
				v.z1,
				v.f
			];
			me.creatLegend1 = ["正面", "中立", "负面"];
			me.creatObj1.init(me.creatDom1, me.creatCategories1, me.creatData1, me.creatLegend1);
			me.creatObj1.show();
		})
		API.exhibitType(function(v) {
			me.creatObj3.init($("#box2")[0], v.Type, v.Number, v.YearDate);
			me.creatObj3.show();

		})


		

	},
	hide: function() {

	},
	resize: function(scale, w, h) {
		var me = this;
		me.creatObj.resize();
		me.creatObj1.resize();
		me.creatObj2.resize(me.creatData2);
		me.creatObj3.resize();
		me.creatObj4.resize();
		me.creatObj5.resize();
	}
});

module.exports = Module;
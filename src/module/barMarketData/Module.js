var forge = require("../core/forge");
var ModuleBase = require("../core/ModuleBase");
// var combo = require("../global/Combo.js");
// var Table = require('../memberFlow/table/Module');
// 引入图表文件
var InfoSmall = require("./assembly/infoSmall.js");
var List = require("../../vendor/list/list.min.js");
var ColumnChart = require('./assembly/columnChart');
var bar = require("./homebar/homeBar");
var PieChart = require("./assembly/pie-chart/pie-chart");
var commomLib=require("./assembly/map/commonLibMap.min.js");


// var PieChartEight = require("./pieCharts/pieChartsEight/Module");
// var MapData = require('./selectMap/mapData');

// var AmountData = require('./memberAmount/Module');
// var MobilityData = require('./memberMobility/Module');
/*var partyBranch = require('./party/Module');*/

//引用公用数据借口
var API = require("../data/getData4.js");
/**
 * 首页
 * @author 贾鸣
 * @constructor
 */
var Module = function() {
    this.id = 'barMarketData';
    this.commomLib = commomLib;
};
Module.prototype = forge(ModuleBase.prototype, {
    template: require("./template.html"),
    creatObj:null,
    creatDom:null,
    creatColumnChart:null,
    creatColumnChartDom:null,
    creatColumnChartdata:null,
    creatObj1:null,
    creatDom1:null,
    creatdataAxis1:null,
    creatColumnChart1:null,
    creatDom1:null,
    creatData1:null,
    creatObj2:null,
    creatDom2:null,
    creatData2:null,
    creatObj3:null,
    creatDom3:null,
    creatData3:null,
    creatObj4:null,
    creatDom4:null,
    creatData4:null,
    creatObj5:null,
    creatData9:null,
    creatData10:null,
    init: function() {
      var me = this;
      var baseUrl ='/assembly/map/';
      
      //切换全球效果
     	String.prototype.rtrim=function(){
	　　    	return this.replace(/(\s*$)/g,"");
	　　 }
	    $(".barMarketData .btnStyle").on("click", function (){
	    	var text=$(this).text().rtrim();
	    	$("#area-type").text(text+"酒企分布图");
			$(this).addClass('active').siblings(".btnStyle").removeClass('active');
		});
      //下拉框选择
      me.creatDom=$("#rank");
      //酒企历史
      me.creatColumnChartDom=document.querySelector(".echart-history");
      //营收排行
      me.creatDom1=$("#rank-number")[0];
      //酒产品度数分布
      me.creatDom2=$("#echart-bus-num");
      //酒企规模分布
      me.creatDom3=$("#echart-bus-type");
      //酒企类型分布
      me.creatDom4=$("#echart-view-num");
      
      
      me.creatObj=new InfoSmall();
      me.creatColumnChar=new ColumnChart();
      me.creatObj1=new bar();
      me.creatObj2=new PieChart();
      me.creatObj3=new PieChart();
      me.creatObj4=new PieChart();
      
      
	//地图开始
      
      
    },
    dispose: function() {

    },
    show: function() {
      	var baseUrl ='./assembly/map/';
    	var me = this;
 		var dataShadow = [];
 		var color=['#4948f4', '#7847f6', '#5dffee', '#31ccff', '#3fa5f0', '#5487f8'];
 		//清空下拉框选择dom结构
    	$("#rank").html("");
    	//获取高
    	//左侧
    	$("#left-container").height($(window).height-70)
    	$("#left-container>div").eq(0).height( $("#left-container").height()*2/14 )
    	$("#left-container>div").eq(1).height( $("#left-container").height()*7/14 )
    	$("#left-container>div").eq(2).height( $("#left-container").height()*5/14 )
    	$("#rank-number").height($("#rank-number").height()-35);
    	//中间
	     $("#center_container>div").eq(0).height($("#center_container").height()*2/3)
	     $("#center_container>div").eq(1).height($("#center_container").height()/3)
		 $("#chinaMap").height($("#chinaMap").parent().parent().height()-35)
	     $("#chinaMap svg").height( $("#chinaMap").height() );
		//右侧
		$("#righr-container>div").height($("#righr-container").height()/3);
    	$(".flowOut").addClass("active");
    	$(".flowInto").removeClass("active");
    	$("#area-type").text("全国酒企分布图");
    	$(".barMarketData .list").html("");
    	//求数组 最大值
    	Array.prototype.max = function() { 
			var max = this[0];
			var len = this.length; 
			for (var i = 1; i < len; i++){ 
				if (this[i] > max) { 
					max = this[i]; 
				} 
			} 
			return max;
		}
    	
    	//实例化数据借口
    	//酒企历史
  		var data1=API.barHistory(function(value){
			me.creatColumnChartdata=value;
			me.creatColumnChar.init( me.creatColumnChartDom );
			me.creatColumnChar.show(me.creatColumnChartdata);
  		});
    	//酒企业信息
    	var data2=API.enterpriseInfo(function(value){
    		me.creatObj.init(me.creatDom);
    		me.creatObj.show(value)
  		});
    	//营收排行
		var data3=API.enterpriseAmount(function(value){
			var yMax=value.amount.max();
    		me.creatData1=value.amount;
    		me.creatxAxis1=value.name;
    		for (var i = 0; i < me.creatData1.length; i++) {
			    dataShadow.push(yMax);
			}
    		me.creatObj1.init(me.creatDom1,dataShadow,me.creatData1,me.creatxAxis1,value.allName);
    		me.creatObj1.show();
  		});
  		//酒产品度数分布
		var data4=API.enterpriseProof(function(value){
			me.creatData2=[{
					      value: value[0],
					      name: '高度数'
					    }, {
					      value: value[1],
					      name: '中度数'
					    }, {
					      value: value[2],
					      name: '低度数'
					    }];
			me.creatObj2.init(
	    		{
			      id: 'echart-bus-num',
			      radius: ['40%', '60%'],
			      center: ['46%', '50%'],
			      color: color,
			      isDoubleLabel: true, //true为内外层都显示标签，false为只显示外层标签
			    }
	    	);		    
			me.creatObj2.setData(me.creatData2);

  		});
   		//酒企规模分布
		var data5=API.enterpriseScale(function(value){
			me.creatData3=[{
					      value: value[2],
					      name: '小型'
					    }, {
					      value: value[1],
					      name: '中型'
					    }, {
					      value: value[0],
					      name: '大型'
					    }];
			me.creatObj3.init(
	    		{
			      id: 'echart-bus-type',
			      radius: ['40%', '60%'],
			      center: ['46%', '50%'],
			      color: color,
			      isDoubleLabel: true, //true为内外层都显示标签，false为只显示外层标签
			    }
	    	);		    
			me.creatObj3.setData(me.creatData3);

  		});
  		//酒企类型分布
		var data6=API.enterpriseType(function(value){
			me.creatData4=value;
			me.creatObj4.init(
	    		{
			      id: 'echart-view-num',
			      radius: ['40%', '60%'],
			      center: ['46%', '60%'],
			      color: color,
			      isDoubleLabel: true, //true为内外层都显示标签，false为只显示外层标签
			      isLabelShow:true
			    }
	    	);		    
			me.creatObj4.setData(me.creatData4);

  		});
		//酒企分布排行
		var data7=API.enterpriseRangeA(function(value){
			$("#sub-list01 .list").html("");
			var options = {
		      valueNames: ['name'],
		      item: '<li><span class="index"></span><span class="name"></span></li>'
		    };
			var values = value.data.slice(0,10);

		    var hackerList = new List('sub-list01', options, values);
  		});
		var data8=API.enterpriseRangeD(function(value){
			$("#sub-list02 .list").html("");
			var options = {
		      valueNames: ['name'],
		      item: '<li><span class="index"></span><span class="name"></span></li>'
		    };
			var values = value.data.slice(0,10);
		    var hackerList = new List('sub-list02', options, values);
  		});
  		var map = new this.commomLib.CMap({
		    dom: document.getElementById('chinaMap'),
		    data: {},
		    name: 'china',
		    //clickHandle: clickHandle
		  });
		//全国酒企分布图
		var data9=API.enterpriseMap(function(value){
			value.data.forEach(function(v){
				v.icon={
			        url: '../resource/image/map-point.png',
			        width: 14,
			        height: 20
			      }
			})
			//地图开始
	    	me.creatData9 = {
				  points: value.data
				};
				var map = new me.commomLib.CMap({
					dom: document.getElementById('chinaMap'),
					data: me.creatData9,
					name: 'china',
					clickHandle: clickHandle
				});
				var dps = 1000/60;
				window.addEventListener('resize',function(){
					setTimeout(function(){
						var map = new me.commomLib.CMap({
							dom: document.getElementById('chinaMap'),
							data: me.creatData9,
							name: 'china',
							clickHandle: clickHandle
						});
					},dps)
				})
				//地图点击事件	  
				function clickHandle(event, data, cmap) {
					  if (data._type == 'point') {
					    var $wrapper = $('#chinaMap');
					    var $tip = $('.map_popOver');
					    var $line = $('.china-line');
					    if (!$tip.length) {
					      var $tip = $('<div class="map_popOver">');
					      $wrapper.append($tip);
					    }
					    if (!$line.length) {
					      var $line = $('<img class="china-line" src="../resource/image/tooltip-line.png" alt="" />');
					      $wrapper.append($line);
					    }
					
					
					    var rect = event.target.getBoundingClientRect();
					    var wScrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    					var wScrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
					
					    $tip.html(popOver(data));
					    var offset = $wrapper.offset();
					    $tip.css({
					      left: (rect.right - rect.width / 2 - offset.left + wScrollX + 20) + 'px',
					      top: (rect.bottom - rect.height / 2 - offset.top + wScrollY - 200) + 'px',
					      display: 'block'
					    });
					    $line.css({
					      left: (rect.right - rect.width / 2 - offset.left + wScrollX - 10) + 'px',
					      top: (rect.bottom - rect.height / 2 - offset.top + wScrollY - 140) + 'px',
					      display: 'block'
					    });
					
					    d3.selectAll('#chinaMap path.all_map').each(function(item) {
					      if (item.properties.name == data.area) {
					        this.style.display = 'none';
					      }
					    })
				  }
				
				}
				
				document.body.addEventListener('click', function(e) {
				  var $tip = $('.map_popOver');
				  var $line = $('.china-line');
				  $tip.css('display', 'none');
				  $line.css('display', 'none');
				  d3.selectAll('#chinaMap path.all_map').each(function(item) {
				    this.style.display = 'block';
				  })
				}, true);
				
				
				function popOver(param) {
				  
				  return '<h4>' + (param.title) + '</h4>' +
				    '<p>' + (param.content) + '</p>'
				}
				$("#chinaMap").append("<img src='../resource/image/nanhai.png' style='width:5%;position:absolute;z-index:99999999999;bottom:0%;right:31%;'>")
	
			//地图开始
  		},true);
		//切换全国
		$('#btn1').on('click', function() {
				//全国酒企分布图
				var data9=API.enterpriseMap(function(value){
		
					value.data.forEach(function(v){
						v.icon={
					        url: '../resource/image/map-point.png',
					        width: 14,
					        height: 20
					      }
					})
					//地图开始
			    	me.creatData9 = {
						  points: value.data
						};
						
						//		showMap('chinaMap','china',data);
						var map = new me.commomLib.CMap({
							dom: document.getElementById('chinaMap'),
							data: me.creatData9,
							name: 'china',
							clickHandle: clickHandle
						});
						var dps = 1000/60;
						window.addEventListener('resize',function(){
							setTimeout(function(){
								var map = new me.commomLib.CMap({
									dom: document.getElementById('chinaMap'),
									data: me.creatData9,
									name: 'china',
									clickHandle: clickHandle
								});
							},dps)
						})
						//地图点击事件	  
						function clickHandle(event, data, cmap) {
							  if (data._type == 'point') {
							    var $wrapper = $('#chinaMap');
							    var $tip = $('.map_popOver');
							    var $line = $('.china-line');
							    if (!$tip.length) {
							      var $tip = $('<div class="map_popOver">');
							      $wrapper.append($tip);
							    }
							    if (!$line.length) {
							      var $line = $('<img class="china-line" src="../resource/image/tooltip-line.png" alt="" />');
							      $wrapper.append($line);
							    }
							
							
							    var rect = event.target.getBoundingClientRect();
							
							   var wScrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    					var wScrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
					
					    $tip.html(popOver(data));
					    var offset = $wrapper.offset();
					    $tip.css({
					      left: (rect.right - rect.width / 2 - offset.left + wScrollX + 20) + 'px',
					      top: (rect.bottom - rect.height / 2 - offset.top + wScrollY - 200) + 'px',
					      display: 'block'
					    });
					    $line.css({
					      left: (rect.right - rect.width / 2 - offset.left + wScrollX - 10) + 'px',
					      top: (rect.bottom - rect.height / 2 - offset.top + wScrollY - 140) + 'px',
					      display: 'block'
					    });
							
							    d3.selectAll('#chinaMap path.all_map').each(function(item) {
  							      if (item.properties.name == data.area) {
							        this.style.display = 'none';
							      }
							    })
						  }
						
						}
						
						document.body.addEventListener('click', function(e) {
						  var $tip = $('.map_popOver');
						  var $line = $('.china-line');
						  $tip.css('display', 'none');
						  $line.css('display', 'none');
						  d3.selectAll('#chinaMap path.all_map').each(function(item) {
						    this.style.display = 'block';
						  })
						}, true);
						
						
						function popOver(param) {
						  return '<h4>' + (param.title) + '</h4>' +
						    '<p>' + (param.content) + '</p>'
						}
						
						$("#chinaMap").append("<img src='../resource/image/nanhai.png' style='width:5%;position:absolute;z-index:99999999999;bottom:0%;right:31%;'>")
					//地图开始
		  		},true);
		})
		$('#btn2').on('click', function() {
				$("#chinaMap").html("")
				//全国酒企分布图
				var data10=API.enterpriseMap(function(value){
		
					value.data.forEach(function(v){
						v.icon={
					        url: '../resource/image/map-point.png',
					        width: 14,
					        height: 20
					      }
					})
					//地图开始
			    	me.creatData10 = {
						  points: value.data
						};

						var map = new me.commomLib.CMap({
							dom: document.getElementById('chinaMap'),
							data: me.creatData10,
							name: 'world',
							clickHandle: clickHandle
						});
						var dps = 1000/60;
						window.addEventListener('resize',function(){
							setTimeout(function(){
								var map = new me.commomLib.CMap({
									dom: document.getElementById('chinaMap'),
									data: me.creatData10,
									name: 'china',
									clickHandle: clickHandle
								});
							},dps)
						})
						//地图点击事件	  
						function clickHandle(event, data, cmap) {
							  if (data._type == 'point') {
							    var $wrapper = $('#chinaMap');
							    var $tip = $('.map_popOver');
							    var $line = $('.china-line');
							    if (!$tip.length) {
							      var $tip = $('<div class="map_popOver">');
							      $wrapper.append($tip);
							    }
							    if (!$line.length) {
							      var $line = $('<img class="china-line" src="../resource/image/tooltip-line.png" alt="" />');
							      $wrapper.append($line);
							    }
							
							
							    var rect = event.target.getBoundingClientRect();
							
							   var wScrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    					var wScrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
					
					    $tip.html(popOver(data));
					    var offset = $wrapper.offset();
					    $tip.css({
					      left: (rect.right - rect.width / 2 - offset.left + wScrollX + 20) + 'px',
					      top: (rect.bottom - rect.height / 2 - offset.top + wScrollY - 200) + 'px',
					      display: 'block'
					    });
					    $line.css({
					      left: (rect.right - rect.width / 2 - offset.left + wScrollX - 10) + 'px',
					      top: (rect.bottom - rect.height / 2 - offset.top + wScrollY - 140) + 'px',
					      display: 'block'
					    });
							
							    d3.selectAll('#chinaMap path.all_map').each(function(item) {
							      if (item.properties.name == data.area) {
							        this.style.display = 'none';
							      }
							    })
						  }
						
						}
						
						document.body.addEventListener('click', function(e) {
						  var $tip = $('.map_popOver');
						  var $line = $('.china-line');
						  $tip.css('display', 'none');
						  $line.css('display', 'none');
						  d3.selectAll('#chinaMap path.all_map').each(function(item) {
						    this.style.display = 'block';
						  })
						}, true);
						
						
						function popOver(param) {
						  return '<h4>' + (param.title) + '</h4>' +
						    '<p>' + (param.content) + '</p>'
						}
						
						
					//地图开始
		  		},false);
			
		})	
    },
    hide: function() {
		
    },
    resize: function(scale, w, h) {
    	var me = this;
//  	me.creatObj3.setData(me.creatData3);
//  	me.creatObj2.setData(me.creatData2);
//  	me.creatObj4.setData(me.creatData4);
	 	me.creatObj1.resize();
    	me.creatColumnChar.resize();
    	me.creatObj.resize();
    }
});



module.exports = Module;

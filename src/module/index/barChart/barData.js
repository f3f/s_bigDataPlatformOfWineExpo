var BarModule = require('./barChart');
var barModule = new BarModule();

function BarData() {
 
}
BarData.prototype = {
	init:function(dom){
		var me = this;
		var yMax = 500;
		var dataShadow = [];
		
		var yMax = 500;
		var dataShadow = [];
		
		for (var i = 0; i < 7; i++) {
		    dataShadow.push(yMax);
		}
		
		var option = {
		    color: ['#fb4726','#ffbc00'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter:function(d){
		        	if(d[1].name=="中央转基层")return "中央转基层:"+ (-d[0].value)+"</br>基层转中央:"+d[1].value;
		        	if(d[1].name=="政府转事业单位")return "政府转事业单位:"+ (-d[1].value)+"</br>事业单位转政府:"+d[0].value;
		        	if(d[1].name=="政府转私企")return "政府转私企:"+ (-d[0].value)+"</br>私企转政府:"+d[1].value;
		        	if(d[1].name=="事业单位转私企")return "事业单位转私企:"+ (-d[1].value)+"</br>私企转事业单位:"+d[0].value;
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        top:'0',
		        containLabel: true
		    },
		    xAxis: {
		        type : 'value',
		        position: 'top',
		        splitNumber:2,
		        axisLabel:{
		        	formatter:function(d){
		        		if(d<0) return -d;
		        		return d;
		        	}
		        },
		        splitLine: {lineStyle:{type:'dashed'}},
		    },
		    yAxis: {
		        type : 'category',
		        axisLine: {show: false},
		        axisLabel: {show: false},
		        axisTick: {show: false},
		        splitLine: {show: false},
		        data : [ '事业单位转私企','政府转私企','政府转事业单位', '中央转基层'],
		        splitArea: {
		            show: true,
		            interval:0
		        }
		    },
		    series : [
		        {
		            type:'bar',
		            stack: '总量',
		            barWidth: '30%',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    formatter:function(d){
		                      if(d.name=="政府转事业单位") return "事业单位转政府"
		                      if(d.name=="事业单位转私企") return "私企转事业单位"
		                      return d.name;
		                    },
		                    textStyle:{
		                    	color:"#000000"
		                    }
		                }
		            },
		            data:[420, -302, 341, -474]
		        },
		        {
		            type:'bar',
		            stack: '总量',
		            barWidth: '30%',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    formatter:function(d){
		                       if(d.name=="政府转私企") return "私企转政府"
		                      if(d.name=="中央转基层") return "基层转中央"
		                       return d.name;
		                    },
		                    textStyle:{
		                    	color:"#000000"
		                    }
		                }
		            },
		            data:[-309, 232, -381, 134]
		        }
		    ]
		}
		
		barModule.init(dom,option);
	},
	show:function(){
		var data = [];
		barModule.setData(data);

	}
}
module.exports = BarData;




/**
 * Created by liudandan on 2017/2/27.
 */
    /*使用例子
        地图下面的柱形图
		
		var ColumnChart = require('./assembly/columnChart');
		var columnChart = new ColumnChart();
		
		var columnData ={
			"dataAxis":['成立1年以内', '成立1-5年','成立5-10年','成立10-15年','成立15-30年','成立30年以上'],
			"data": [20, 182, 391, 434, 290, 210]
		}
		columnChart.init(document.querySelector(".column"))
		columnChart.show(columnData);
	*/


function ColumnChart() {
 
}

ColumnChart.prototype = {
  
    init: function (domEle) {
   	   var me = this;
   	   me._dom = domEle;
   	   me._echart = echarts.init(me._dom);
    },
    show:function(columnData){
    	var me = this;
    	var dataAxis = columnData.dataAxis;
    	var data = columnData.data.reverse();
		var color = ["#7847F6","#5DFFEE","#479BF4","#31CCFF","#479BF4","#4948F4"];
		var _value = 0,_s=0;
		
		for(var i =0;i<data.length;i++){
			_s +=data[i];
		}
		_value = ((data[data.length-1]/_s)*100).toFixed(2)+"%";
		
		var seriesData = [];
		data.forEach(function(item,i){
			seriesData.push({
				value:item,
                itemStyle: {normal:{color:color[i]}}
			})
		})
		
		option = {
		    title:{
		    	text: '成立30年以上的企业占全部酒企的' +_value,
		    	textStyle:{
		    		color:"#5A75D7",
		    		fontFamily:"微软雅黑",
		    		fontSize:12
		    	},
		    	top:"84%",
		    	left:92
		    },
		    tooltip:{
		    },
		    grid: {
		        left: 100,
		    	top:"4%",
		    	right:"8%",
		    },
		    xAxis: {
		        type: 'value',
		        boundaryGap: [0, 0.01],
		        axisLine: {
		            show: false, 
		        },
		        splitLine:{
		        	lineStyle:{
		        		color:"#38448F"
		        	}
		        },
		        axisTick: {
		            show: false
		        },
		        axisLabel: {
		            textStyle: {
		                color: '#fff'
		            }
		        }
		    },
		    yAxis: {
		        type: 'category',
		        data: dataAxis,
		        inverse:true,
		        axisLabel: {
		            textStyle: { color: "#94AEF9"}
		        },
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		            show: false
		        },
		    },
		    series: [
		        {
		            type: 'bar',
		            barWidth: '60%',
		            data: seriesData
		        }
		    ]
		};
		
	
		me._echart.setOption(option,true);
    },
    hide:function(){
    	
    },
    resize:function(width, height){
    	var me = this;
//  	console.log(me._echart)
    	if(me._echart)me._echart.resize();
    }

}
module.exports = ColumnChart;
/**
 * Created by liudandan on 2017/2/27.
 */
    /*使用例子
        地图下面的柱形图
		
		var BarChart = require('./assembly/barChart');
		var barChart = new BarChart();
		
		var barData ={
			"dataAxis":['山东', '广州','上海','山东','山东','山东','山东','山东','山东','山东'],
			"data": [220, 182, 191, 234, 290, 330, 310, 123, 442, 220]
		}
		
		barChart.init(document.querySelector(".bar"));
		barChart.show(barData);
	*/



function BarChart() {
 
}

BarChart.prototype = {
  
    init: function (domEle) {
   	   var me = this;
   	   me._dom = domEle;
   	   me._echart = echarts.init(me._dom);
   	   
    },
    show:function(barData){
    	var me = this;
    	var dataAxis = barData.dataAxis;
    	var data = barData.data;
		var color= ["#373ADD","#0092FF","#7847F6","#8BB3FA","#8BB3FA","#8BB3FA","#8BB3FA","#8BB3FA","#8BB3FA","#8BB3FA"];
		var yMax = Math.ceil(Math.max.apply(null, data)/100)*100;
		var dataShadow = [];
		var image = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNDgwMTE3NDA3MjA2ODExODIyQUUyQjk4NjNCM0MwRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RkUzODc1NkZGMjkxMUU2OEJGMUJEQTE4RjJBM0M2MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RkUzODc1NUZGMjkxMUU2OEJGMUJEQTE4RjJBM0M2MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmQwNDE3NDc2LTg0ZTktNDIzNi1hNjBhLWI3OGM4NzRlMmJkYSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjY1NDM2MjhhLTNlZmEtMTE3YS1hZDM2LWE2M2Q0ZDRjYmNiMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvQ3CLYAAAC3SURBVHjaYvj//z8DEg4F4o1A/BaI3wHxJqgYXA2MYQTEJ//jBiehauAa8ClG1sTACCRCGBgYVgMxw99/DAybzzMwnH0ANAjIN1FgYPA1ZGBgZmKAAV8WIBEL422+wMBw+BZcEsxmBarw1ocLpYL02sB4Z+8zYIATd1C4NkwMJAKQhiMwjrEipgJzZRTuEZCGxXAfGTAw2KoxMHCyQTCI7amHomEOycFKdsQhJ41N0GSBNWkABBgAqoAcaxYGqsoAAAAASUVORK5CYII=';
		var seriesData = [];
		data.forEach(function(item,i){
			seriesData.push({
				value:item,
                itemStyle: {normal:{
                	color:new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#21FBD5'},
		                            {offset: 0.7, color: color[i]},
		                        ]
		                    )
                	}}
			})
		})
		
		
		for (var i = 0; i < data.length; i++) {
		    dataShadow.push(yMax);
		}
		
		option = {
		    tooltip:{
		    	
		    },
		    grid:{
		    	top:"20%",
		    	left:"6%",
		    	right:"3%",
		    	bottom:"17%",
		    },
		    xAxis: {
		        data: dataAxis,
		        axisLabel: {
		            textStyle: {
		                color: '#fff'
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        axisLine: {
		            show: false
		        },
//		        z: 10
		    },
		    yAxis: {
		        name:"单位/毫升",
		        nameTextStyle: {
					color: "#fff",
					fontSize: 12,
				},
		        type:"value",
		        axisLine: {
		            show: false, 
		        },
		        splitLine:{
		        	lineStyle:{
		        		type:"dashed",
		        		color:"#26579A"
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
		    dataZoom: [
		        {
		            type: 'inside'
		        }
		    ],
		    series: [
		        { 
		            type: 'bar',
		            itemStyle: {
		                normal: {color: 'rgba(83,98,144,0.3)'}
		            },
		            barGap:'-100%',
		            barCategoryGap:'40%',
		            barWidth: '30%',
		            data: dataShadow,
		            animation: false
		        },
		        {
		            type: 'bar',
		            barWidth: '30%',
		            data: seriesData
		       },
		        {
		            type:'line',
		            symbol:image,
		            symbolSize:15,
		            lineStyle:{
		            	normal:{
		            		color:"#F23573",
		            		type:"dashed"
		            	}
		            },
		            
//		            animation: false,
		            data:data
		        }
		    ]
		};
		
		// Enable data zoom when user click bar.
		var zoomSize = 6;
		me._echart.on('click', function (params) {
		    me._echart.dispatchAction({
		        type: 'dataZoom',
//		        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//		        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
		    });
		});
		
		me._echart.setOption(option,true);
    },
    hide:function(){
    	
    },
    resize:function(width, height){
    	var me = this;
    	if(me._echart)me._echart.resize();
    }

}
module.exports = BarChart;
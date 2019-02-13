//var echarts = require("../../../vendor/echarts/echarts.min.js");
function barChart() {
 
}

barChart.prototype = {
    _data:null,
    
    init: function (domEle,option) {
   	   var me = this;
   	   me._dom = domEle;
   	   me._option = option;
   	   me._myChart = echarts.init(me._dom[0]);
   	  
    },
    setData:function(data){
   	    var me = this;
// 	    me._data = data;
// 	    me._option.series[0].data = data;
		me._myChart.setOption(me._option,true);
    },
}
module.exports = barChart;
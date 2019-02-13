(function(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports["PieChart"] = factory();
  else
    root["PieChart"] = factory();
})(this, function() {


  function PieChart() {
    this.chart = null;
    this.isDoubleLabel = true;
    this.labelOption = {
      normal: {
        show: false,
        position: 'center'
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: '20',
          fontWeight: 'bold'
        }
      }
    };
    var aaa = 123;
    this.labellineOption = {
      normal: {
        show: false
      }
    };
    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      series: []
    };
  }

  PieChart.prototype = {
    init: function(param) {
      this._createChart(param);
    },
    setData: function(data) {
      this.option.series.forEach(function(item) {
        item.data = data;
      })
   this.chart.setOption(this.option, true);
    },
    _createChart: function(data) {
      this.chart = echarts.init(document.getElementById(data.id));
      this.isDoubleLabel = data.isDoubleLabel;
      // 通过传入的参数处理option数据
      this._handleData(data);
      window.onresize = this.chart.resize;
    },
    _handleData: function(data) {
      this.option.color = data.color;
      var seriesData1 = {
        type: 'pie',
        radius: data.radius,
        center: data.center,
        data: []
      };
      this.option.series.push(seriesData1);
      if (this.isDoubleLabel) {
        var seriesData2 = {
          type: 'pie',
          radius: data.radius,
          center: data.center,
          data: [],
          avoidLabelOverlap: false,
          label: this.labelOption,
          labelLine: this.labellineOption
        };
        this.option.series.push(seriesData2);
      }
    }
  }

  return PieChart;
});


function getSeriesData(data) {
  var seriesData1 = {
    type: 'pie',
    radius: data.radius,
    center: data.center,
    data: data.data
  };
}

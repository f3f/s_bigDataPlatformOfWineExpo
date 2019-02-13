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
        formatter: "{d}%",
        textStyle: {
          fontSize: '14',
          fontWeight: 'bold'
        }
      }
    };
    this.pEle = null;
    this.labellineOption = {
      normal: {
        show: false
      }
    };
    this.option = {
      tooltip: {
        trigger: 'item',
       //formatter: "{b}: {c}万元 ({d}%)"
       formatter: " {b} ： {d}%"
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
      if(this.isLabelShow){
        var contentObj = getMax(data);

        this.pEle.innerHTML = contentObj[0].name + '企业数量最多，占总量的' + contentObj.percent + '%';
      }
    },
    _createChart: function(data) {
      var domElement = document.getElementById(data.id);
      this.chart = echarts.init(domElement);

      this.isDoubleLabel = data.isDoubleLabel;
      this.isLabelShow = data.isLabelShow;
      // 通过传入的参数处理option数据
      this._handleData(data);
      window.onresize = this.chart.resize;

      if(this.isLabelShow){
        this.pEle = document.createElement('p');
        this.pEle.setAttribute('class','title-label');
        domElement.appendChild(this.pEle);
      }

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

function getMax(data){
  var arr = [],max,maxObj,sum=0;
  data.forEach(function(item){
    arr.push(item.value);
  });
  arr = arr.sort(function(value1,value2){
    return value1 - value2;
  });
  max = arr[arr.length-1];
  maxObj = data.filter(function(item){
    return item.value == max;
  })
  arr.forEach(function(item){
    sum+=item;
  })
  maxObj.percent = (max/sum*100).toFixed(2);
  return maxObj;
}


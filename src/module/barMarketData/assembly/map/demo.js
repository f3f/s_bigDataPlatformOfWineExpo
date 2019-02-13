var data = {
  points: [
    {
      "log": "116.3",
      "lat": "39.9",
      area: '北京',
      title: '贵州茅台酒股份有限公司',
      content: '茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，',
      "icon": {
        url: 'imgs/map-point.png',
        width: 14,
        height: 20
      }
    },
    {
      "log": "121.4",
      "lat": "31.2",
      area: '浙江',
      title: '百度集团',
      content: '茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，',
      "icon": {
        url: 'imgs/map-point.png',
        width: 14,
        height: 20
      }
    },
    {
      "log": "110.3",
      "lat": "25.3",
      area: '广西',
      title: '阿里巴巴股份有限公司',
      content: '茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，',
      "icon": {
        url: 'imgs/map-point.png',
        width: 14,
        height: 20
      }
    },
    {
      "log": "87.6",
      "lat": "43.8",
      area: '新疆',
      title: '东亚集团',
      content: '茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，',
      "icon": {
        url: 'imgs/map-point.png',
        width: 14,
        height: 20
      }
    },
    {
      "log": "91.2",
      "lat": "29.7",
      area: '西藏',
      title: '外星位置集团',
      content: '茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，茅台酒股份有限公司是由中国贵州茅台酒股份有限公司、贵州茅台酒厂等，',
      "icon": {
        url: 'imgs/map-point.png',
        width: 14,
        height: 20
      }
    }
  ]
};


function clickHandle(event, data, cmap) {
  if (data._type == 'point') {
    var $wrapper = $('#chinaMap');
    var $tip = $('.map_popOver');
    var $line = $('.china-line');
    if (!$tip.length) {
      alert($tip.length)
      var $tip = $('<div class="map_popOver">');
      $wrapper.append($tip);
    }
    if (!$line.length) {
      var $line = $('<img class="china-line" src="./imgs/tooltip-line.png" alt="" />');
      $wrapper.append($line);
    }


    var rect = event.target.getBoundingClientRect();

    $tip.html(popOver(data));
    var offset = $wrapper.offset();
    $tip.css({
      left: (rect.right - rect.width / 2 - offset.left + window.scrollX + 20) + 'px',
      top: (rect.bottom - rect.height / 2 - offset.top + window.scrollY - 200) + 'px',
      display: 'block'
    });
    $line.css({
      left: (rect.right - rect.width / 2 - offset.left + window.scrollX - 10) + 'px',
      top: (rect.bottom - rect.height / 2 - offset.top + window.scrollY - 140) + 'px',
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
    '<p title="'+(param.content)+'">' + (param.content) + '</p>'
}

function showMap(id, name) {
  var map = new commonLib.CMap({
    dom: document.getElementById(id),
    data: data,
    name: name,
    clickHandle: clickHandle
  });
  return map;
}


var cmap = showMap('chinaMap', 'china');

$('#btn1').on('click', function() {
  var cmap = showMap('chinaMap', 'china');
})
$('#btn2').on('click', function() {
  var cmap1 = showMap('chinaMap', 'world');
})

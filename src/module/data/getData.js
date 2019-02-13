var configs={
	"baseUrl":"http://192.168.4.213:9090/jusfoun/gov/api/extend/",//基础路径
	"data":{}
}

var Module={
  exhibitorsNumberdatas:function(cb){//参展企业数量走势数据
  	    getData(configs.baseUrl+"fair/enterpriseNumberTrend",{},function(value){
		var data={
			year:[],
			Foreign:[],
			Domestic:[]
		}
		value.data.forEach(function(v){
			data.year.push(v.YearDate)
			data.Foreign.push(v.Foreign)
			data.Domestic.push(v.Domestic)
		})
		cb(data)
  	});
	
  },
  "exhibitorsNumberdata":function(){//参展企业数量走势数据
	return getData(configs.baseUrl+"");
  },
  "exhibitorsNumberdata":function(){//参展企业数量走势数据
	return getData(configs.baseUrl+"");
  },
  "wineTypedata":function(){//参展酒企类型走势数据
	return getData(configs.baseUrl+"");
  },
  "visitPeopleNumberdata":function(){//观展人数走势数据
	return getData(configs.baseUrl+"");
  },
  "thermodynamicdata":function(){//参展企业热力图数据
	return getData(configs.baseUrl+"");
  },
  "provinceRankdata":function(){//参展企业数量-省份排行数据
	return getData(configs.baseUrl+"");
  },
  "publicOpinionWords":function(){//舆情热词数据
	return getData(configs.baseUrl+"");
  },
  "statisticsPublicOpinion":function(){//舆情统计数据
	return getData(configs.baseUrl+"");
  },
  "public0pinionPush":function(){//舆情推送数据
	return getData(configs.baseUrl+"");
   },
  thisFairAudience:function(cb){//本次展会签到人数
	getData(configs.baseUrl+"fairAudience/thisFairAudience",{},function(value){
		var data={
			amount:[],
			time:[]
		}
		value.data.forEach(function(v){
			data.amount.push(v.amount)
			data.time.push(v.time)
		})
		cb(data)
  	})
   },
  fairAmountByDaynce:function(cb){//今年签约额增长走势
	getData(configs.baseUrl+"contract/fairAmountByDay",{beginDate:'',
		endDate:''},function(value){
		var data={
			amount:[],
			time:[]
		}
		value.data.forEach(function(v){
			data.amount.push(v.amount)
			data.time.push(v.time)
		})
		cb(data)
  	})
   }

}

function getData(url,param,callback){
	var value=null;
		$.ajax({
				url:url,
				type:"GET",
				data:param?param:{},
				dataType:"json",
				success:function(val){
					value=val;
					callback(value)
				},
				error:function(error){
					console.error(error)
					return {};
				}
		});
	
	
}

module.exports = Module;
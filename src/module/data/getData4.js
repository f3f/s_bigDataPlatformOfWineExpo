var Module={
  barHistory:function(cb){//参展企业数量走势数据
  	    getData(window.baseApiPath+"/enterpriseProportion.json",function(value){
			var data={
				"dataAxis":['成立30年以上','成立15-30年','成立10-15年','成立5-10年','成立1-5年','成立1年以内'],
				"data": []
			}
		
			for(var i in value.data[0]){ 
				data.data.push(value.data[0][i])
			} 
			cb(data);
	
  		});
	
  },
  enterpriseInfo:function(cb){
  		getData(window.baseApiPath+"/enterpriseInfo.json",function(value){
			
			cb(value.data[0]);
	
  		});
  },
  enterpriseAmount:function(cb){
  		getData(window.baseApiPath+"/enterpriseAmount.json",function(value){
			var data={
					"amount":[],
					"name":[],
					"allName":[]
				};
			$.each(value.data,function(i,v){	
					data.amount.push(v.amount);
					data.name.push(v.name.substr(0,4));
					data.allName.push(v.name);
			});
			cb(data);
	
  		});
  },
  enterpriseProof:function(cb){
  		getData(window.baseApiPath+"/enterpriseProof.json",function(value){
			var num=[];

			$.each(value.data[0],function(i,v){
				num.push(v)
			});
			cb(num);
	
  		});
  },
  enterpriseScale:function(cb){
  		getData(window.baseApiPath+"/enterpriseScale.json",function(value){
			var num=[];

			$.each(value.data[0],function(i,v){
				num.push(v)
			});
			cb(num);
	
  		});
  },
  enterpriseType:function(cb){
  		getData(window.baseApiPath+"/enterpriseType1.json",function(value){
			var datas=[];
			value.data.forEach(function(v,i){
				if(v.name!=undefined&&v.value!=undefined){
					datas.push(v)
				}
			});
			cb(datas);
  		});
  },
  enterpriseRangeA:function(cb){
  		getData(window.baseApiPath+"/enterpriseRange.json",function(value){
			var data={};
			
			cb(value);
	
  		});
  },
  enterpriseRangeD:function(cb){
  		getData(window.baseApiPath+"/enterpriseRange1.json",function(value){
			
			cb(value);
	
  		});
  },
  enterpriseMap:function(cb,isChange){
  		getData(window.baseApiPath+"/enterpriseMap.json",function(value){
			
			cb(value);
	
  		});
  }

}

function getData(url,callback){
	var value=null;
		$.ajax({
				url:url,
				type:"GET",
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
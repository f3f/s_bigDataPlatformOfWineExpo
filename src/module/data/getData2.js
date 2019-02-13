

var Module = {

	fairAmountByDaynce: function(cb) { //今年签约额增长走势
		getData(window.baseApiPath + "/fairAmountByDay.json",function(value) {
			var data = {
				amount: [],
				time: []
			}
			value.data.forEach(function(v) {
				var num = v.amount/10000;
				data.amount.push(num.toFixed(2));
				data.time.push(v.time);
			})
			cb(data)
		})
	},
	thisFairAudience: function(cb) { //本次展会签到人数
		getData(window.baseApiPath + "/thisFairAudience.json",function(value) {
			var data = {
				amount: [],
				time: []
			}
			value.data.forEach(function(v) {

				data.amount.push(v.count)
				data.time.push(v.entrance_time)
			})
			cb(data)
		})
	},
	fairAmount: function(cb) { //历年签约额增长走势
		getData(window.baseApiPath + "/fairAmount.json",function(value) {
			var data = {
				amount: [],
				time: []
			};
			value.data.forEach(function(v) {
				var num = v['sum(amount)']/10000;
				data.amount.push(num.toFixed(2));
				if(v.counts){
					var tim = v.counts.substr(0,4);
				}
				
				data.time.push(tim);
			});
			if(parseInt(value.dataSize)>6){
				data.amount = data.amount.slice(-6);
				data.time = data.time.slice(-6);
			};
			cb(data)

			
		})
	},
	wineSales: function(cb) { //参展酒类签约额走势接口
		getData(window.baseApiPath + "/wineSales.json", function(value) {
			var data={
				year:[],
				amount:[],
				name:[]
			};
			var ii = 0;
			value.data.forEach(function(v,i){
				var na = v['category_name'];

				if(data.name.indexOf(na) < 0){
					data.name.push(na);
					data.amount[ii] = [(v.amount/100000000).toFixed(2)];
					ii++;
				}else{
					data.amount[(ii-1)].push((v.amount/100000000).toFixed(2));
				};
				var ye = v['YEAR'];
				if(data.year.indexOf(ye) < 0){
					data.year.push(ye);
				}
			})
			cb(data)
		})
	},
	todayFairAudience: function(cb) { //签到人数
		getData(window.baseApiPath + "/todayFairAudience.json", function(value) {
			var data = value.data[0]['COUNT(*)'];
			cb(data)
		})
	},
	todayFairAmount: function(cb) { //共签约
		getData(window.baseApiPath + "/todayFairAmount.json",function(value) {
			var data = value.data[0];
			if(!data){
				data = '0';
			}
			cb(data)
		})
	},
	categoryCode: function(cb,code) { //本次展会签约额排行
		if(code){
			getData(window.baseApiPath + "/contractBycategoryCode.json", function(value) {
				var data = [];
				value.data.forEach(function(v,i) {
					data[i] = {};
					data[i].index = (i+1);
					data[i].name = v['enterprise_name'];
					data[i].amount = (v.amount/10000).toFixed(2) + '万元';
					data[i].category = v['industry_category_text'];
				});
				cb(data)
			})
		}else{
			getData2(window.baseApiPath + "/contractBycategoryCode1.json", function(value) {
				var data = [];
				value.data.forEach(function(v,i) {
					data[i] = {};
					data[i].index = (i+1);
					data[i].name = v['enterprise_name'];
					data[i].amount = (v.amount/10000).toFixed(2) + '万元';
					data[i].category = v['industry_category_text'];
				});
				cb(data)
			})
		}
	},
	lastFairAudience: function(cb) { //本次展会签到人数
		getData(window.baseApiPath + "/lastFairAudience.json", function(value) {
			var data = [];
			value.data.forEach(function(v,i) {
				data[i] = {};
				data[i].number = v.webchat;
				var tim = new Date(v.entrance_time);
				data[i].time = tim.getFullYear()+"-"+(tim.getMonth()+1)+"-"+tim.getDate()+" "+tim.getHours()+":"+tim.getMinutes();
			});
			cb(data);
		})
	},
}

function getData(url,callback){
	var value=null;
		$.ajax({
				url:url,
				type:"GET",
				dataType:"json",
				success:function(val){
					value=val;
					callback(value);
				},
				error:function(error){
					console.error(error)
					return {};
				}
		});
	
	
}
function getData2(url,callback){
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
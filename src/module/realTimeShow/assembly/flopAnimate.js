/**
 * Created by liudandan on 2017/2/27.
 */
    /*使用例子
      手机号滚动的组件
	  
	  
	  手机号没有做处理，暂时默认都是11位的，要求后台传数都是11位（目前是8组数组写死了的，，有时间再改）
        
		var FlopChart = require('./assembly/flopAnimate');
		var flop = new FlopChart();
		
		var  data = [
    	   {
    	   	number:"13126596256",
    	   	time:"2017-02-24 08:54"
    	   },
    	   {
    	   	number:"13126596256",
    	   	time:"2017-02-24 09:24"
    	   },
    	   {
    	   	number:"13126596256",
    	   	time:"2017-02-25 10:45"
    	   },
    	   {
    	   	number:"13126596546",
    	   	time:"2017-02-25 10:45"
    	   },
    	   {
    	   	number:"13126333356",
    	   	time:"2017-02-25 10:45"
    	   },
    	   {
    	   	number:"13111116256",
    	   	time:"2017-02-25 13:45"
    	   },
    	   {
    	   	number:"13126596256",
    	   	time:"2017-02-25 14:45"
    	   },
    	   {
    	   	number:"13126596256",
    	   	time:"2017-02-25 15:45"
    	   },
    	   {
    	   	number:"13126596256",
    	   	time:"2017-02-25 16:45"
    	   },
    	   {
    	   	number:"13129999256",
    	   	time:"2017-02-25 17:45"
    	   },
    	   {
    	   	number:"13126597777",
    	   	time:"2017-02-25 18:45"
    	   },
    	   {
    	   	number:"13126566666",
    	   	time:"2017-02-25 19:45"
    	   },
    	   {
    	   	number:"15126596256",
    	   	time:"2017-02-27 20:45"
    	   }
    	]

		flop.init(document.querySelector(".fanpai"))   //获取dom
		flop.show(data,500,500,7,1000);   //数据，宽，高，显示个数（不能少于3个），动画时间
	*/



function FlopChart() {
 
}
FlopChart.prototype = {
  
    init: function (domEle) {
   	   var me = this;
   	   me._dom = domEle;
   	   me._ul = $("<ul class='flop-num'></ul>").css({
   	   	   position: "relative"
   	   });
   	   $(me._dom).append(me._ul);
   	   me._timer = null;
    },
    show:function(data,showNum,aniTime){
    	var me = this;  
    	me._w = me._dom.clientWidth;
    	me._h = me._dom.clientHeight;
    	me._h = me._h+30;
    	me._showNum = showNum;
    	me._aniTime = aniTime;
    	me._data = data;
    	if(data.length<showNum){
    		for(var i =0;i<data.length;i++){
		    	me._ul.append(me._render(data[i],i));
    		}
    	}else{
//  		超过showNum个数据执行动画
    		if($(".flop-num-holder").length<showNum+2){
	  		    for(var i=0;i<showNum+2;i++){
					me._li = me._render(data[i],i)
					me._ul.append(me._li)
		    	}
	    	}
    		
    		me._timer = setInterval(function(){
		    	/*把第一个数据挪到最后*/
		    	for(var i=1;i<$(".flop-num-holder").length;i++){
		    		$(".flop-num-holder").eq(i).removeClass().addClass("flop-num-holder flop-num-holder"+(i-1)+"").css({
		    			top:(i-1)*0.5+"rem",
//		    			top:(i-1)*me._h/(me._showNum+2)/200+"rem",
		    			opacity:i==1?0:1
		    		})
		    	}
			    $(".flop-num-holder").eq(0).remove();
                data = data.concat(data.splice(0, 1))
			    me._ul.append(me._render(data[showNum+1],showNum+1));
			    
    		},me._aniTime)	
    	}

    },
    /*实时新增加的数据*/
     add:function(newData){
    	var me = this;
    	me._newData = newData ||[];
    	me._data = me._data.concat(me._newData);
    },
    
    /*得到数据的展示形式*/
    _render:function(data,m){
    	var me = this;
    	var oDiv = $("<div class='flop-number-info'></div>").css({
    		float: "left",
//			width: 0.58*me._w/150+"rem",
			margin: "0 0.1rem",
			width:"2rem",
			minWidth:"2rem",
    	}).html("");
    	var numberString = data.number==null?"XXXXXXXXXXX":data.number.substring(0,3) + "XXXX"+data.number.substring(7,11);
    	for(var i=0;i<numberString.length;i++){
    		var info=$("<p class='flop-number-info-p'></p>").css({
	    		border: "solid 1px #6D7191",
				borderRadius: "0.03rem",
				width: "0.12rem",
				height:"0.2rem",
				lineHeight:"0.2rem",
				backgroundColor:"#161B55",
				textAlign: "center",
				float: "left",
				marginRight:(i==2||i==6)?"0.07rem":"0.02rem"
	    	});
    		info.html(numberString[i]);
    		oDiv.append(info);
    	}
    	
    	var oTime = $("<p class='flop-number-time'></p>").html(data.time).css({
    		float: "left",
//			width: 0.31*me._w/150+"rem",
			width:"1rem",
			marginLeft:"0.15rem",
			minWidth:"1rem",
			color: "#26A2FE"
    	})
    	var _li = $("<li class='flop-num-holder'></li>").css({
    		cursor: "pointer",
			transition: "all "+me._aniTime/1000+"s ease-in-out",
			listStyle: "none",
			color: "#FFFFFF",
			height:"0.2rem",
			lineHeight:"0.2rem",
			fontFamily: "微软雅黑",
			display: "inline-block",
			fontSize: "0.12rem"
    	})

    	_li.addClass("flop-num-holder"+m+"").css({
    		position:"absolute",
//  		top:m*me._h/(me._showNum+2)/200+"rem",
    		top:m*0.5+"rem",

    		opacity:(m>0 && m < me._showNum+1)?1:0
    	})

    	_li.append(oDiv);
    	_li.append(oTime);
    	return _li;
    },

    hide:function(){
    	var me = this;
    	clearInterval(me._timer);
    },
    resize:function(width, height){
    	var me = this;
    	if(me._dom){
	    	me._w = me._dom.clientWidth;
	    	me._h = me._dom.clientHeight+30;
    	}
    	
    }

}
module.exports = FlopChart;
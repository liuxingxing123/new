require(["config"], function(){
	require(["jquery","template", "include", "cookie"], function($,template){
		$(function(){
		$.cookie.json = true;
		(function(){
			var oli = $("#container li"),
				len = oli.length,
				currentIndex = 0,
				nextIndex = 1,
				timer = null,
				circles = [];
				timer = setInterval(move,3000);
				function move(){
					$(oli[currentIndex]).show().stop().animate({opacity:0},400);
					$(oli[nextIndex]).show().stop().animate({opacity:1},400);
					$(circles[currentIndex]).addClass("");
					$(circles[nextIndex]).addClass("active");
					currentIndex = nextIndex;
					nextIndex++;
					for(var i=0;i<len;i++)
						$(circles[i]).removeClass("active");
					$(circles[currentIndex]).addClass("active");
					if(nextIndex>=len)
						nextIndex = 0;
				}
				for(var i = 0;i<len;i++){
					var _div = document.createElement("div");
					$("#container .pages").append(_div);
					circles.push(_div);
					_div.index = i;
					if(i == 0)
						$(_div).addClass("active");
					$(_div).click(function(){
						var index = this.index;
						nextIndex = index;
						move();
					});
				}
				$("#container .prev").click(function(){
					nextIndex = currentIndex - 1;
					if(nextIndex<0)
						nextIndex = len-1;
					move();
				});
				$("#container .next").click(function(){
					move();
				});
				$("#container").mouseenter(function(){
					clearInterval(timer);
					$("#container .prev,#container .next").show();
				});
				$("#container").mouseleave(function(){
					timer = setInterval(move,3000);
					$("#container .prev,#container .next").hide();
				});
		}());
			$.get("http://localhost/new/json/list.json",function(resData){
			var data = {
				list : resData
			};
			var html = template("temp1",data);
			$(".temp1").append(html);
			});
		function djs(){
				var leftseconds = 14*60*60;
				var timer = null;
					timer = setInterval(getTime,1000);
					function getTime(){
					leftseconds--;
					var days = ("0"+Math.floor(leftseconds/(24*60*60))%24).slice(-2);
					var hours = ("0"+Math.floor(leftseconds/(60*60))%60).slice(-2);
					var minutes = ("0"+Math.floor(leftseconds/60)%60).slice(-2);
					var seconds = ("0"+Math.floor(leftseconds)%60).slice(-2);
					var html ="仅剩："+days+"天"+hours+"小时"+minutes+"分"+seconds+"秒";
					if(leftseconds<0)
						clearInterval(timer);
					$("#main .super_temp .djs").text(html);
			}
	}
		djs();
					
					
					

});
});
});
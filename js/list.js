require(["config"], function(){
	require(["jquery", "template", "include"], function($, template){
		$(function(){
			var num = 0;
			$("#main .sortList").on("click",".btn_close",function(){
				if(num % 2 == 0){
				$("#main .sortList .submenu").hide();
				$(this).parents(".sortList").find(".submenu").show();
				$("#main .sortList .btn_close").css("backgroundImage","url(../img/list_img/list_close.jpg)");
				$(this).css("backgroundImage","url(../img/list_img/list_open.jpg)");
				}else{
					$("#main .sortList .submenu").hide();
					$("#main .sortList .btn_close").css("backgroundImage","url(../img/list_img/list_close.jpg)");
				}
				num++;
			});
			$("#main .sortList .submenu").on("click",".myCatLink",function(){
				var text = $(this).html();
				$("#main .show_type").html('<span><a href="homepage.html">首页</a></span>><span><a href="list.html">面部护肤</a></span>><span><a href="list.html">'+text+'</a></span>');
			});
			
		$.get("http://localhost/new/json/list_jack.json",function(resdata){
			var data = {
				list :resdata
			};
			var html = template("order",data);
			$(".order").html(html);
		});
		$.get("http://localhost/new/json/list_jack.json",function(resdata){
			var data = {
				list :resdata
			};
			var html = template("like",data);
			$(".like").html(html);
		});
		$.get("http://localhost/new/json/list_jack.json",function(resdata){
			var data = {
				list :resdata
			};
			var html = template("wenkday",data);
			$(".wenkday").html(html);
		});
		var one=0,two=0,three=0,fours=0;
		$("#main .select_type  .one").on("click",".more",function(){
			if($(this).is(".one .more") && one %2 == 0){
				$(this).parents(".select_type").animate({height:80},400);
				$(this).css("backgroundImage","url(../img/list_img/nomore1.jpg)");
			}else{
				$("#main .select_type").animate({height:40},400);
				$("#main .select_type .more").css("backgroundImage","url(../img/list_img/more1.jpg)");
			}
			one++;
		});	
		$("#main .select_type  .two").on("click",".more",function(){
			if($(this).is(".two .more") && two %2 == 0){
				$(this).parents(".select_type").animate({height:270},400);
				$(this).css("backgroundImage","url(../img/list_img/nomore1.jpg)");
			}else{
				$("#main .select_type").animate({height:40},400);
				$("#main .select_type .more").css("backgroundImage","url(../img/list_img/more1.jpg)");
			}
			two++;
		});	
		$("#main .select_type .three").on("click",".more",function(){
			if($(this).is(".three .more") && three %2 == 0){
				$(this).parents(".select_type").animate({height:60},400);
				$(this).css("backgroundImage","url(../img/list_img/nomore1.jpg)");
			}else{
				$("#main .select_type").animate({height:40},400);
				$("#main .select_type .more").css("backgroundImage","url(../img/list_img/more1.jpg)");
			}
			three++;
		});	
		$("#main .select_type  .fours").on("click",".more",function(){
			if($(this).is(".fours .more") && fours %2 == 0){
				$(this).parents(".select_type").animate({height:90},400);
				$(this).css("backgroundImage","url(../img/list_img/nomore1.jpg)");
			}else{
				$("#main .select_type").animate({height:40},400);
				$("#main .select_type .more").css("backgroundImage","url(../img/list_img/more1.jpg)");
			}
			fours++;
		});	
			
		});

	});
});
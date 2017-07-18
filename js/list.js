require(["config"], function(){
	require(["jquery", "template", "include"], function($, template){
		$(function(){
			var num = 0;
			$("#main .sortList").on("click",".btn_close",function(){
				$(this).parents(".sortList").find(".submenu").stop().show().end().siblings(".sortList").find(".submenu").hide();
				$(this).parents(".sortList").find(".btn_close")
				.css("backgroundImage","url(../img/list_img/list_open.jpg)").end()
				.siblings(".sortList").find(".btn_close").css("backgroundImage","url(../img/list_img/list_close.jpg)");
				if(num%2 !==0)
				$(this).parents(".sortList").find(".submenu").hide().end()
						.find(".btn_close").css("backgroundImage","url(../img/list_img/list_close.jpg)");
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
		
		$.get("http://localhost/new/json/list_jack.json",function(resData){
			var m = Math.floor(resData.length/20);
			for(var i=1;i<=m;i++){
			$(".page_num").append("<button>"+i+"</button>");
			}
			$(".page_num").append("<button class='next_page'>下一页</button>");
			$(".page_num").on("click","button:not(:last)",function(){
				var arr = [];
				var n = Number($(this).text());
				//$(this).css("background","red");
				$("#pages button").removeClass("curr");
				$(this).addClass("curr");

				
				arr.push(resData.slice((n-1)*20,n*20));
				var page_data = arr[0];
				var data = {list:page_data};
				var html=template("temp_product",data);
				$(".main_right .detail_product").empty().html(html);
			});
			var int = 0;
			$(".page_num").on("click",".next_page",function(){
				var arr = [];
				arr.push(resData.slice(int*20,(int+1)*20));
				var page_data = arr[0];
				var data = {list:page_data};
				var html=template("temp_product",data);
				$(".main_right .detail_product").empty().html(html);
				$("#pages button").removeClass("curr");
				$("#pages button").eq(int).addClass("curr");
				int++;
				if(int>=4)
				int=0;

			});
			var data = {list:resData};
			var html=template("temp_product",data);
			$(".main_right .detail_product").append(html);
			$("#pages button").eq(0).addClass("curr");
			
		});
		$(".detail_product").on("click",".list_opacity a",function(){
			$(this).css({
				"background-image":"url(../img/homepage_img/index_icon.png)",
				"background-position":"-60px -4px"
			});
			$(this).parents("span").css({
				color:"#ed145b"
			});
		});
		
		$(".detail_product").on("mouseenter",".temp_list",function(){
			$(this).find(".none_div").show();
			var thisLeft = Number($(this).position().left);
			if(thisLeft>430){
			$(this).find(".none_div").css({"right":250});
			}
			else
			$(this).find(".none_div").css({"left":250});
			
		});
		$(".detail_product").on("mouseleave",".temp_list",function(){
			$(this).find(".none_div").hide();
		});
		$(".detail_product").on("click",".temp_btn",function(){
			var title = $(this).parents(".temp_list").find(".list_title a").text();
			var price_now = $(this).parents(".temp_list").find(".price em").text();
			$("#pop").find(".prod_name span").text(title).end()
			.find(".prod_price span").text(price_now).end().fadeIn(3000).stop().fadeOut(4000);
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		});
	});
});
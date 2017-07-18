require(["config"], function(){
	require(["jquery", "template", "fly","include","cookie"], function($, template,cookie,fly){
		$(function(){
			$.cookie.json=true;
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

		$(".manginify_left").on("click",".public63",function(){
			if(!$.cookie("login_User").username)
				return;
			$(".defined").html('<div class="text_pinlun clearfix"><textarea name="" ></textarea><button class="send">评论</button></div>');
		});
		$(".manginify_left").on("click",".send",function(){
			if(!$.cookie("login_User").username)
				return;
			var value =$(this).parents(".text_pinlun").find("textarea").val();
				if($(".divs div").size())
					$(".divs").prepend("<div>"+$.cookie("login_User").username+"说："+value+"</div>");
				else
					$(".divs").append("<div>"+$.cookie("login_User").username+"说："+value+"</div>");
		$(this).parents(".text_pinlun").find("textarea").val("");
		$(".divs div").animate({height:20},400,function(){
			$(this).animate({opacity:1},400);
		});
		if($(".divs div").length >0)
			$(".divs").show();
		else
			$(".divs").hide();

		});
		var scrollTop = $(".goup").offset().top;
		$(window).scroll(function(){
			var _scrollTop = $(window).scrollTop();
			if(_scrollTop>=scrollTop){
				$(".goup").css({
					"position":"fixed",
					"zIndex":"999",
					"top":0
				});
			}else{
				$(".goup").css({
					"position":"static",
				});
			}
		});
			
	$(".tab_div").on("mouseover","div",function(){
		var m = $(this).index();
		$(".tab_div div").css({
			"boxShadow":"none",
			"zIndex":"0"
		});
		$(this).css({
			"boxShadow":"0 0 4px 5px #0f0",
			"zIndex":"1"
		});
		$(".tab_over .tab_pic div").hide();
		$(this).parents(".tab_over").find(".tab_pic div").eq(m).show();
	});
	$(window).resize(function(){
	var obox = document.getElementById("cart");
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var t = parseInt((document.documentElement.clientHeight - obox.offsetHeight)/2);
	$(obox).animate({top:scrollTop+t},400);
	});
	$(window).scroll(function(){
	var obox = document.getElementById("cart");
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var t = parseInt((document.documentElement.clientHeight - obox.offsetHeight)/2);
	$(obox).animate({top:scrollTop+t},400);
	});
	$(window).load(function(){
	var obox = document.getElementById("cart");
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var _scrollTop = Number(scrollTop);
	var t = parseInt((document.documentElement.clientHeight - obox.offsetHeight)/2);
	$(obox).animate({top:_scrollTop+t},400);
	});
		var close=true;
		$("#cart .c_tools").click(function(){
			if(close){
				$("#cart").animate({right:"-185px"},800);
				close=false;
			}else{
				$("#cart").animate({right:"0px"},800);
				close=true;
			}
		}).click();

	(function(){
	var obtn=document.getElementById("come_top");
	var timer = null;
	var bSys = true;//系统拖动的滚动条
	window.onscroll=function(){//用户拖动了滚动条
		if(!bSys){
			clearInterval(timer);
		}
		bSys=false;
	}
	obtn.onclick=function(){
		timer = setInterval(function(){
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var iSpeed = Math.floor(-scrollTop/18);
			if(scrollTop == 0){
				clearInterval(timer);
			}
				bSys = true;
			document.documentElement.scrollTop=document.body.scrollTop=scrollTop+iSpeed;

		},30);
	}
	})();

	var lenWidth=parseInt($(".len").css("width")),
		lenHeight=parseInt($(".len").css("height")),
		bigwidth=parseInt($(".container").css("width")),
		bigheight=parseInt($(".container").css("height")),
		middlewidth=$(".container").width(),
		middleheight=$(".container").height(),
		rateX = bigwidth/lenWidth,
		rateY = bigheight/lenHeight;
		$(".zoomImg").width(middlewidth*rateX);
		$(".zoomImg").height(middleheight*rateY);
	$(".container").hover(function(){
		$(this).children(".len").show();
		$(this).next().show();
		$(this).children(".cover").show();
	},function(){
		$(this).children(".len").hide();
		$(this).next().hide();
		$(this).children(".cover").hide();
	}).trigger("mouseleave");
	$(".container").mousemove(function(e){
		$(".len").offset({
			top:e.pageY-lenHeight/2,
			left:e.pageX -lenWidth/2
		});
		var _left = $(".len").position().left,
			_top = $(".len").position().top;
			if(_left<0)
			_left=0;
			else if(_left>middlewidth-lenWidth)
				_left=middlewidth-lenWidth;
			if(_top<0)
				_top=0;
			else if(_top>middleheight-lenHeight)
				_top=middleheight-lenHeight;
			$(".len").css({left:_left,top:_top});
			$(".len").css({
				backgroundPositionX:-_left,
				backgroundPositionY:-_top
			});
			$(".zoomImg").css({
				"top":-_top*rateY,
				"left":-_left*rateX
			});
	});
			
	$(".small_img").on("mouseenter","img",function(){
		var imgSrc = $(this).attr("src");
		$(this).parents(".man_left").find(".container img").attr("src",imgSrc);
		$(this).parents(".man_left").find(".container .len").css({
			"backgroundImage":"url("+imgSrc+")"
		});
		$(this).parents(".man_left").find(".big img").attr("src",imgSrc);
	}).mouseenter();
	
	$(".man_left").on("mouseenter",".share",function(){
		$(".man_left .sprit .sprit_top").show(1000);
	});
	$(".man_left").on("mouseleave",".share",function(){
		$(".man_left .sprit .sprit_top").hide();
	});
	
		//点击之后添加到购物车   通过cookie或者php保存数据
	$(".add_shopcar,.can_add_shopcar").on("click",function(event){
		var _img =  $(this).parents("#detail_main").find(".container img").attr("src");
		var _name = $(this).parents("#detail_main").find(".prod_detail h3").text();
		var _price = $(this).parents("#detail_main").find(".xz_price span").eq(1).text();
		var _pid = $(this).parents("#detail_main").find(".prod_id .id").text();
		var _amount =  $(this).parents("#detail_main").find(".change_num input").val();
		var _desc =  $(this).parents("#detail_main").find(".prod_id .pinpai").text();
		var _user =$.cookie("login_User").username;
		if(!_user)
		return;
		var product = {
			id:_pid,
			name:_name,
			price:_price,
			desc:_desc,
			amount:_amount,
			img:_img
		};
		var products = $.cookie("products") || [];
		var index = exist(_pid,products);
		if(index === -1){
			products.push(product);
			$.post("http://localhost/new/php/products.php",{
				action:"add",
				username:_user,
				id:_pid,
				name:_name,
				price:_price,
				desc:_desc,
				amount:1
			});
		}
		else{
			products[index].amount++;
			$.post("http://localhost/new/php/products.php",{
				action:"modify",
				username:_user,
				name:_name,
				id:_pid,
				amount : products[index].amount
			});
		}
		$.cookie("products",products,{expires:7,paths:"/"});
		
		var img = $("#detail_main .container img").attr("src");
		var offset = $("#cart .c_icon").offset(),
			_left = $(".container img").offset().left,
			_top = $(".container img").offset().top,
		     $flyer = $("<img src='"+img+"'>");
		 $flyer = $flyer.clone().css({
		 	width:100,
		 	borderRadius:50,
		 	height:100
		 });
		$flyer.fly({
			start:{
				left:_left,
				top:_top
			},
			end:{
				left:offset.left,
				top:offset.top,
				width:30,
				height:30
			},
			speed:0.5
		}).fadeOut(6000);
		
		total();
		oli();
		});
		var products = $.cookie("products") || [];
		var index = exist($("#detail_main").find(".prod_id .id").text(),products);
		if(products.length==0)
			return;
		function total(){
			var sum_amount=0,sum_price=0;
			products.forEach(function(product){
				sum_amount += Number(product.amount);
				sum_price += Number(product.amount)*Number(product.price);
			});
			var product = products[index];
			$(".c_amount").text(product.amount);
			$(".all_amount").text(sum_amount);
			$(".all_price").text(sum_price);
		}
		total();
		function oli(){
		var html="";
		if(products.length!==0){
		//var img = $("#detail_main .container img").attr("src");
		products.forEach(function(product){
			html+="<li class='oli clearfix'><a href='javascript:void(0);'>"
				+"<img src='"+product.img+"' width='50px' height='50px'/></a>"
				+"<span class='c_span'>"+product.name+"</span>"
				+"<span class='c_amount'>"+product.amount+"</span>件"
				+"<span class='c_price'>"+product.price+"</span>元"
				+"</li>"
		});
		$("#cart .c_ul").html(
				html
		).fadeIn(6000);}
		}
		oli();
		
		//添加商品至购物车   页面上的效果
		
		$("#cart").on("click","li",function(){
			$(this).remove();
			var index = exist($("#detail_main").find(".prod_id .id"),products);
				products.splice(index,1);
			$.cookie("products",products,{expires:7});
			total();
		});
			
		var _amount = 0;
		$(".amount").focus(function(){
			_amount = $(this).val();
		});
		$(".amount").blur(function(){
			if(!/^[1-9]\d*$/.test($(this).val())){
				$(this).val(_amount);
				alert("你输入的数量格式有误");
				return;
			}
			if($(this).val() === _amount)
				return;
			var $tr = $(this).parents(".prod_detail");
			var index = exist($tr.find(".id").text(),products);
			var product = products[index];
			product.amount = $(this).val();
			$.cookie("products",products,{expires:7});
			total();
		});
		function exist(id,products){
			for(var i=0;i<products.length;i++){
				if(products[i].id === id)
					return i;
			}
			return -1;
		}
	
	$("#cart .qingkong").click(function(){
		$(".c_ul").empty();
		$.cookie("products",null);
		total();
	});
	var products=$.cookie('products') || [];
	if(products.length === 0)
	return;
	$(".minux,.add").click(function(){
		var $tr = $(this).parents(".prod_detail");
		var index = exist($tr.find(".id").text(),products);
		var product = products[index];
		if($(this).is(".add"))
			product.amount++;
		else{
			if(product.amount<=1)
				return;
			product.amount--;
		}
		$.cookie("products",products,{expires:7});
		$tr.find(".amount").val(product.amount);
	});
	$(document).ready(function(){
		var product_info = JSON.parse($.cookie("product_info"));
	  	var html1="";
	  	var img_arr = [];
	  	for(var attr in product_info.imgsrc){
	  		img_arr.push(product_info.imgsrc[attr]);
	  	}
		for(var i=0;i<img_arr.length;i++){
			html1+='<div class="new_img"><img style="width: 55px;height: 55px;" src="'+img_arr[i]+'"/></div>';
		}
		$(".bg_prev").after(html1).siblings(".replaced").remove();
		$("#detail_main .container img").attr("src",img_arr[0]);
		$("#detail_main .prod_detail h3").text(product_info.p_info);
		$("#detail_main .prod_id .pinpai").text(product_info.p_titile);
		$("#detail_main .prod_id .id").text(product_info.id);
		$("#detail_main .prod_detail .sc_price span").text(product_info.old_price);
		$("#detail_main .prod_detail .xz_price span:last").text(product_info.now_price);
		$("#detail_main .prod_detail .get_score span").text(product_info.score);
		$("#detail_main .prod_detail .p_s").text(product_info.num);
		$("#detail_main .prod_detail .p_l").text(product_info.looked);
		$("#detail_main .xd_price span").text("￥"+product_info.now_price);
	});
	$(".xiding li a").click(function(){
		$(".xiding li a").css({
			"border-bottom":"none",
			"color":"#000"
		});
		$(this).css({
			"border-bottom":"2px solid #fd7469",
			"color":"#fd7469"
		});
	});
			
			
			
			
			
		});
	});
});
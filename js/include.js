define(["jquery","cookie"],function($){
	$.cookie.json = true;
	//console.log($.cookie("login_User"));
	$.get("http://localhost/new/include/header.html").then(function(data){
		var _user = $.cookie("login_User");
		if(_user){
				$(data).filter("#top").find(".top_right .login_info .username").text(_user.username).end().end()
					.filter("#top").find(".top_right .login_info").show().end().end()
					.find(".register").hide().end()
					.find(".login").hide().end()
					.appendTo(".header");
			}else{
				$(data).appendTo(".header");
		}
		var string = window.location.href;
		var reg = /homepage/;
	if(reg.test(string)){
			$(".header").find(".list .silder").css("display","block")
			.end().find(".list li:first").css("background","#e73a77");
		}
	});	
		
	$.get("http://localhost/new/include/footer.html").then(function(data){
			$(data).appendTo(".footer");
	});
});

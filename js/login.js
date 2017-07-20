require(["config"], function(){
	require(["jquery", "cookie", "include"], function($){
		$(function(){
	$.cookie.json = true;
	var _username = $.cookie("username");
		if (_username)
			$("#login .label_user input").val(_username);

	$("#login .label_user input").focus(function(){
			$("#login .label_user .danger").show();
	});
	$("#login .label_user input").blur(function(){
		$("#login .label_user .danger").hide();
		$.post("http://localhost/new/php/check_username.php",{
			phone:$(this).val()
		},function(data){
			if(data == "no exist")
				alert("您还未注册呢，请注册之后再来登录^.^");
		});
	});	
	$("#login .label_pwd input").focus(function(){
			$("#login .label_pwd .danger").show();
	});
	$("#login .label_pwd input").blur(function(){
		$("#login .label_pwd .danger").hide();
	});	
	$("#login .btnLogin").click(function(e){
		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		$.post("http://localhost/new/php/login.php",{
			phone:$("#login .label_user input").val(),
			password:$("#login .label_pwd input").val()
		},function(resData){
			if(resData.status === 1){
				if ($("#login .label_remember input").prop("checked")) { // 记住
						$.cookie("username", $("#login .label_user input").val(), {expires:365, path:"/"});
						} else { // 不需要记住
							$.removeCookie("username", {path:"/"});
						}
						// 将登录成功的用户数据保存到 cookie 中
				$.cookie("login_User", resData.user_info, {path:"/"});
				location.href = "http://localhost/new/html/homepage.html";
			}
			else
				$("#login .login_right .login_info").show();
		},"json");
	});
	});
});
});
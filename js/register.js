require(["config"], function(){
	require(["jquery", "template", "include"], function($){
		$(function(){
			var p_reg = /^[1]{1}\d{10}$/;
			var passwordError = true,
				phoneError = true,
				pwdTwoError = true,
				user_name = "xz"+Math.floor(Math.random()*89999999+10000000),
				validateCodeError = true;
				var isExist = true;//标记用户是否存在   默认存在
				$("form")[0].onsubmit = function(e){
					e = e || event;
					if(isExist)
						e.preventDefault ? e.preventDefault() : (e.returnValue = false);
				}

			$("#register_page .phone input").blur(function(){
				var p_value = $(this).val();
				if(p_reg.test(p_value)){
					$("#register_page .phone .icon-gouxuanmian").show();
					$("#register_page .phone .check").hide();
					phoneError = false;
					$.post("http://localhost/new/php/check_username.php",{
					phone:p_value
					},function(data){
						if(data === "exist"){
							isExist = true;
						$("#register_page .phone .icon-gouxuanmian").hide();
						$("#register_page .phone .check").text("您已经注册过了，请直接登录^^").show();
						}else{
							isExist=false;
						}
					});
				}else{
					$("#register_page .phone .icon-gouxuanmian").hide();
					$("#register_page .phone .check").text("电话号码必须是以1开头，11位数哟").show();
					phoneError = true;
				}
			});

			$("#register_page .yzm").click(function(){
				var _url = "http://route.showapi.com/932-2?showapi_appid=33221&showapi_sign=e4d386ab80e448a8ad788ae6f1595f11&length=4&specials=false";
				$.getJSON(_url,function(data){
					data = data.showapi_res_body;
					$("#register_page .yzm img").attr("src",data.image);
					$("#register_page .yzm img").data("sid",data.sid);
				});
			}).trigger("click");
			
			$("#register_page .checkunm input").blur(function(){
				var _url = "http://route.showapi.com/932-1?showapi_appid=33221&showapi_sign=e4d386ab80e448a8ad788ae6f1595f11&checkcode="+ $(this).val() +"&sid=" + $("#register_page .yzm img").data("sid");
				$.get(_url,function(data){
					if(data.showapi_res_body.valid){
						$("#register_page .checkunm .icon-gouxuanmian").show();
						$("#register_page .checkunm .check").hide();
						validateCodeError = false;
					}else{
						$("#register_page .checkunm .icon-gouxuanmian").hide();
						$("#register_page .checkunm .check").text("亲,您所输入的验证码有所不符").show();
						validateCodeError = true;
					}
				});
			});
			var pwd_reg = /^\w{6,16}$/;
			
			$("#register_page .password input").blur(function(){
				var pwd_value = $(this).val();
				if(pwd_reg.test(pwd_value)){
					$("#register_page .password .icon-gouxuanmian").show();
					$("#register_page .password .check").hide();
				    if(pwd_value.length == 14)
						$("#register_page .password .check").text("密码中可以使用以下字符：a-z、A-Z、0-9 以及下划线“_”").show();
					$("#register_page .password .check").data("pwd",pwd_value);
					passwordError = false;
				}else{
					$("#register_page .password .icon-gouxuanmian").hide();
					if(pwd_value.length<6)
						$("#register_page .password .check").text("密码至少要有6位").show();
					else if(pwd_value.length>16)
						$("#register_page .password .check").text("密码最多不超过16位").show();
						passwordError = true;
				}
			});
			
			$("#register_page .password_check input").blur(function(){
				var pwd_value_check = $(this).val();
				if(pwd_value_check == $("#register_page .password .check").data("pwd")){
					$("#register_page .password_check .icon-gouxuanmian").show();
					$("#register_page .password_check .check").hide();
					pwdTwoError = false;

				}else{
					$("#register_page .password_check .icon-gouxuanmian").hide();
					$("#register_page .password_check .check").text("两次输入的密码不一致").show();
					pwdTwoError = true;
				}
			});
			$("#register_page .btn_register").click(function(e){
				e.preventDefault ? e.preventDefault() : (e.returnValue = false);
				$("#register_page .password input").blur();
				$("#register_page .phone input").blur();
				$("#register_page .checkunm input").blur();
				$("#register_page .password_check input").blur();
				if(pwdTwoError || passwordError || validateCodeError || phoneError || !$("#register_page .yes input").attr("checked")){
					return;
				}
				$.post("http://localhost/new/php/register.php",{
					username:user_name,
					password:$("#register_page .password input").val(),
					phone:$("#register_page .phone input").val()
				},function(data){
					console.log(data);
					if(data.status == 1){
							location.href = "login.html";
					}else{
							location.href = "register.html";
					}
				},"json");
		});
	});
});
});

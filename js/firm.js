require(["config"], function(){
	require(["jquery", "template", "include","cookie"], function($, template,cookie){
		$(function(){
			$.cookie.json = true;
			address_msg = $.cookie("address_info");
			if(address_msg){
			$("#province").val(address_msg.province);
			$("#city").val(address_msg.city);
			$("#district").val(address_msg.district);
			}
			var products = $.cookie("products") || [];
			var data = {
				list:products
			}
			var html = template("test",data);
			$("table tr:last").after(html);
			$(".shopcar_firm tr:nth-child(odd)").css("background","#fff");
			var $tr = $(".shopcar_firm tr:not(:first)");
			var sum_all_price = 0;
			$tr.each(function(index,element){
			sum_all_price += Number($(element).children(".xz_all_pay").text())*Number($(element).children(".xz_all_amount").text());
			});
		$(".success_money span").text(sum_all_price+".00");
		$(".detail_adress input").focus(function(){
			$(this).attr("placeholder","");
		});
		$(".detail_adress input").blur(function(){
			$(this).attr("placeholder","请填写收货人详细地址");
		});
		var addresses = {};
		$.get("http://localhost/new/js/addresses.json").then(function(data){
			var provinces = data.regions ;
			provinces.forEach(function(province){
				addresses[province.name] = {};
				var cities = province.regions || [];
				cities.forEach(function(city){
					addresses[province.name][city.name] = city.regions;
				});
			});
			initProvince();
		});
		$("#province").change(initCity);
		$("#city").change(initDistrict);
		function initProvince(){
			var html="";
			for(var attr in addresses){
			  html+="<option value='"+attr+"'>"+attr+"</option>";
			}
			$("#province").append(html);
			initCity();
		}
		
		function initCity(){
			var currProvince = $("#province").val();
			var html="";
			var cities = addresses[currProvince];
			for(var attr in cities){
				html+="<option value='"+attr+"'>"+attr+"</option>";
			}
			$("#city").empty().append(html);
			initDistrict();
		}
		
		function initDistrict(){
			var currProvince = $("#province").val(),
				currCity = $("#city").val(),
				html="";
			var districts = addresses[currProvince][currCity] || [];
				districts.forEach(function(district){
					 html+="<option value='"+district.name+"'>"+district.name+"</option>";
				});
			$("#district").empty().append(html);	
		}
		
		
		$("select").blur(function(){
			if($("#province").val()!==""){
				$("#submit_btn").click(function(e){
					e.preventDefault ? e.preventDefault() : (e.returnValue = false);
			var address = {
				province:$("#province").val(),
				city:$("#city").val(),
				district:$("#district").val()
			}
			
			$.cookie("address_info",address,{expires:30,paths:"/"});
			$(this).css({
				"background":"green",
				"color":"white"
			});
			});
			}
		})
		});
	});
});
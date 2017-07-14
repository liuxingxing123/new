require(["config"], function(){
	require(["jquery", "template", "include"], function($, template){
		$(function(){
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

			

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		});
	});
});
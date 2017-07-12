<?php
	header("Access-Control-Allow-Origin:*");
	$phone = $_POST["phone"];
	$password = $_POST["password"];
	$con = mysql_connect("localhost:3306","root","");
	mysql_select_db("new",$con);
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	$sql = "SELECT * FROM `register` WHERE phone = '$phone' AND password = '$password'";
	$result = mysql_query($sql);
	if($row = mysql_fetch_array($result,MYSQL_ASSOC)){
		$row["password"] = "";
		echo '{"status":1,"message":"success","user_info":'.json_encode($row).'}';
	}else{
		echo '{"status":0,"message":"failed","user_info":{}}';
	}
	mysql_close($con);
?>
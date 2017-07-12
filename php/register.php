<?php
	header("Access-Control-Allow-Origin:*");
	$username = $_POST["username"];
	$password = $_POST["password"];
	$phone = $_POST["phone"];

	$con = mysql_connect("localhost:3306","root","");
	mysql_select_db("new",$con);
	$sql = "INSERT INTO  `new`.`register` VALUES (
	NULL ,  '$username',  '$password',  '$phone'
	)";
	
	$result = mysql_query($sql,$con);
	if($result)
		echo '{"status":1,"message":"success"}';
	else
		echo '{"status":0,"message":"failed"}';
	mysql_close($con);
?>
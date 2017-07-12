<?php
	header("Access-Control-Allow-Origin:*");
	$phone = $_POST["phone"];
	$con = mysql_connect("localhost:3306","root","");
	mysql_select_db("new",$con);
	$sql = "SELECT COUNT(*) FROM `register` WHERE phone = '$phone'";
	$result = mysql_query($sql,$con);
	if($row = mysql_fetch_array($result)){
		if($row[0] >= 1)
			echo "exist";
		else
			echo "no exist";
	}else{
		echo "error";
	}
	mysql_close($con);
?>
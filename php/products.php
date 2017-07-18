<?php 	
	header("Access-Control-Allow-Origin:*");
	$conn = mysql_connect("localhost", "root", "");
	mysql_select_db("h51703", $conn);
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

	$action = $_REQUEST["action"];
	$username = $_REQUEST["username"];
	if ($action == "load") { // 加载用户的购物车信息
		$sql = "SELECT * FROM products WHERE username='$username' and status=0";
		$result = mysql_query($sql);
		$arr = array();
		while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			$arr[] = $row;
		}
		echo '{"status":1, "message":"success", "info":'. json_encode($arr) .'}';
	} else if ($action == "add") { // 添加购物车信息
		$pid = $_REQUEST["id"];
		$name = $_REQUEST["name"];
		$price = $_REQUEST["price"];
		$desc = $_REQUEST["desc"];
		$amount = $_REQUEST["amount"];
		$img = $_REQUEST["img"];
		$sql = "INSERT INTO products VALUES (NULL, '$username', '$pid', '$name', '$price', '$amount', '$desc', '$img',0)";
		$result = mysql_query($sql);
		if ($result)
			echo '{"status":1, "message":"success"}';
		else
			echo '{"status":0, "message":"failed"}';
	} else if ($action == "confirm") { // 确认购物车订单
		$pids = $_REQUEST["ids"];
		$sql = "UPDATE products SET status=1 WHERE username='$username' AND pid IN ($pids) and status=0";
		$result = mysql_query($sql);
		if ($result)
			echo '{"status":1, "message":"success"}';
		else
			echo '{"status":0, "message":"failed"}';
	} else if ($action == "modify") { // 修改商品数量
		$pid = $_REQUEST["id"];
		$amount = $_REQUEST["amount"];
		$sql = "UPDATE products SET amount='$amount' WHERE username='$username' AND pid='$pid' and status=0";
		$result = mysql_query($sql);
		if ($result)
			echo '{"status":1, "message":"success"}';
		else
			echo '{"status":0, "message":"failed"}';
	} else if ($action == "del") { // 删除单件商品
		$pid = $_REQUEST["id"];
		$sql = "UPDATE products SET status=-1 WHERE username='$username' AND pid='$pid' and status=0)";
		$result = mysql_query($sql);
		if ($result)
			echo '{"status":1, "message":"success"}';
		else
			echo '{"status":0, "message":"failed"}';
	} else if ($action == "del_checked") { // 删除选中商品
		$pids = $_REQUEST["ids"];
		$sql = "UPDATE products SET status=-1 WHERE username='$username' AND pid IN ($pids) and status=0";
		$result = mysql_query($sql);
		if ($result)
			echo '{"status":1, "message":"success"}';
		else
			echo '{"status":0, "message":"failed"}';
	} else if ($action == "clear") { // 清空购物车
		$sql = "UPDATE products SET status=-1 WHERE username='$username' and status=0";
		$result = mysql_query($sql);
		if ($result)
			echo '{"status":1, "message":"success"}';
		else
			echo '{"status":0, "message":"failed"}';
	}
	
	// 关闭数据库连接
	mysql_close();
 ?>
<?php 
	require_once 'connect_db.php';
	require_once 'updateDB.php';
	require_once 'selectDB.php';
	echo $conn->rowCount();
	echo $stmt->rowCount();
	$conn=null;
 ?>

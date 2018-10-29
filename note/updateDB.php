<?php 
	$sql="update note set title=:title,content=:content where id=:id";
	$stmt=$conn->prepare($sql);
	$stmt->bindParam(':title',$title);
	$stmt->bindParam(':content',$content);
	$stmt->bindParam(':id',$id);
	$id=73;
	$title="Hello";
	$content="How are u?";
	$stmt->execute();
	echo "Update successfully";

 ?>
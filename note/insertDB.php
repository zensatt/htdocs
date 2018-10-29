<?php 
	$json=file_get_contents('data.json');
	$data=json_decode($json,true);
	$stmt=$conn->prepare("INSERT INTO note(title,content,createAt) VALUES(:title,:content,:createAt)");
	$stmt->bindParam(':title',$title);
	$stmt->bindParam(':content',$content);
	$stmt->bindParam(':createAt',$createAt);
	foreach ($data as $key => $value) {
		$title = $value['title'];
		$content = $value['content'];
		$createAt = $value['createAt'];
		$stmt->execute();
	}
	echo 'Insert data successfully';
 ?>
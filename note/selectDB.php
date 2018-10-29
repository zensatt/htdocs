<?php 
	$sql="select * from note limit 5,5";
	$stmt=$conn->prepare($sql);
	$stmt->setFetchMode(PDO::FETCH_ASSOC);
	$stmt->execute();
	echo "<table>";
	echo "<tr><th>id</th><th>tilte</th><th>content</th><th>date</th></tr>";
	
	while ($row = $stmt->fetch()) {
		$time = strtotime($row['CreateAt']);
		$i=date('Y-m-d h:i:s',$time);
		echo "<tr>";
		echo "<td>{$row['ID']}</td><td>{$row['Title']}</td><td>{$row['Content']}</td><td>{$i}</td>";
		echo "</tr>";
	}
	echo "</table>";

 ?>
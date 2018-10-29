<?php 
	$host="localhost";
	$username="root";
	$password="";
	$dbname="mydb";
	try{
		$conn=new PDO("mysql:host=$host;dbname=$dbname",$username,$password);
		$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		echo "Connect sucessfully!<br/>";
		
		$sql="SELECT count(*) as count
			FROM information_schema.tables 
			WHERE table_schema = 'mydb' 
			AND table_name = 'note'
			";
		$existdb=$conn->query($sql);
		foreach ($existdb as $value) {
			 if($value['count']==='0'){
			 	$sql="CREATE TABLE note (
					ID int NOT NULL AUTO_INCREMENT,
					Title varchar(255) NOT NULL,
					Content text,
					CreateAt datetime NOT NULL,
					PRIMARY KEY(ID)
				);";
				$GLOBALS['conn']->exec($sql);
				echo "Created table successfully<br>";
			 }
		}

		
	}
	catch(PDOException $e){
		echo "Error: " .$e->get_Message();	
	}
	
 ?>
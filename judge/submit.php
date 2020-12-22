<?php
	file_put_contents('cnt.txt', ((int) file_get_contents('cnt.txt')) + 1);
	$x = strval(((int) file_get_contents('cnt.txt')));
	$uploaddir = "/var/www/html/subs/";
	$uploadfile = $uploaddir . "$x.cpp";
	move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile);

	echo shell_exec("cd /var/www/html/subs/ && /var/www/html/subs/run.sh /var/www/html/subs/ $x > /var/www/html/subs/$x.html");
	header("Location: /subs/$x.html");
?>

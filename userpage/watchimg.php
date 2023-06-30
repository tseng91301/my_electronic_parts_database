<?php include "general_settings.php";
$img_name=$_GET['img_name'];
$path=$img_path.$img_name;
header('Content-Type: image/jpeg');
readfile($path);
?>
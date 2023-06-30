<?php include "general_settings.php";
$delid=$_POST['id'];
if($delid==null){
    return;
}
$db = new SQLite3($db_loc);
$db->query("DELETE FROM parts WHERE ID=$delid");
?>

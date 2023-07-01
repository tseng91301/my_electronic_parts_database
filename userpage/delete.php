<?php include "general_settings.php";
$delid=$_POST['id'];
if($delid==null){
    return;
}
$db = new SQLite3($db_loc);
$old_img_name_1=$db->query("SELECT picture_link FROM parts WHERE ID=$delid");
//轉換查詢結果為Array
$res_json_1=[];
$tmp=0;
while ($row = $old_img_name_1->fetchArray()) {
    $res_json_1[$tmp]['picture_link']=$row['picture_link'];

    // 處理每一行的資料
    // $row 是包含欄位值的陣列或關聯陣列
    //print_r($row);
    $tmp++;
}
$old_img_name=$res_json_1[0]['picture_link'];
//刪除舊圖片
if($old_img_name!="images/null"){
    exec("rm $img_path$old_img_name");
}
$db->query("DELETE FROM parts WHERE ID=$delid");
?>

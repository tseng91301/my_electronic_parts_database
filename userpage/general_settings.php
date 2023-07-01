<?php
$db_loc="/home/tseng/electronic_parts_db/sqlite/myparts.db";
$img_path="/home/tseng/electronic_parts_db/";

function generateRandomString($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $string = '';

    for ($i = 0; $i < $length; $i++) {
        $randomIndex = rand(0, strlen($characters) - 1);
        $string .= $characters[$randomIndex];
    }

    return $string;
}
function generate_img_name(){
    $db = new SQLite3($db_loc);
    $name=generateRandomString();
    // 執行查詢
    $searchresult = $db->query("SELECT * FROM parts WHERE picture_link LIKE '%images/$name%'");

    // 检查查询是否成功执行
    if ($searchresult) {
        generate_img_name();
    } else {
        return $name;
        // 查询失败的错误处理逻辑
        //echo "Query failed.";
    }
}
?>
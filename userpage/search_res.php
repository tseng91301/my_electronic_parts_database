<?php include "general_settings.php";

$word=$_POST['word'];
// 建立或連接到 SQLite 資料庫
$db = new SQLite3($db_loc);

// 執行查詢
$result;
$word=escapeshellcmd($word);
if($word=="all"){
    $query = "SELECT * FROM parts";
    $result = $db->query($query);
}else{
    $query = "SELECT * FROM parts WHERE lower(name) LIKE '%$word%'";
    $result = $db->query($query);
}


// 處理查詢結果
$tmp=0;
$res_json_1=[];
while ($row = $result->fetchArray()) {
    $res_json_1[$tmp]['ID']=$row['ID'];

    $res_json_1[$tmp]['name']=$row['name'];
    $res_json_1[$tmp]['name']=htmlentities($res_json_1[$tmp]['name']);

    $res_json_1[$tmp]['remaining']=$row['remaining'];

    $res_json_1[$tmp]['location']=$row['location'];
    $res_json_1[$tmp]['location']=htmlentities($res_json_1[$tmp]['location']);

    $res_json_1[$tmp]['other_description']=$row['other_description'];
    $res_json_1[$tmp]['other_description']=htmlentities($res_json_1[$tmp]['other_description']);
    
    $res_json_1[$tmp]['picture_link']=$row['picture_link'];

    // 處理每一行的資料
    // $row 是包含欄位值的陣列或關聯陣列
    //print_r($row);
    $tmp++;
}
$res_json=json_encode($res_json_1);
echo($res_json);

// 關閉資料庫連接
$db->close();
?>

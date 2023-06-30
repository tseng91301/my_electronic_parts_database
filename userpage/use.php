<?php include "general_settings.php";
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $change_amount=$_POST['amo'];
    $change_id=$_POST['id'];
    $change_amount=intval($change_amount);
    $change_id=intval($change_id);
    if($change_id==null){
        return;
    }
    $db = new SQLite3($db_loc);
    $initial_amo=$db->query("SELECT remaining FROM parts WHERE ID=$change_id");
    //轉換查詢結果為Array
    $res_json_1=[];
    $tmp=0;
    while ($row = $initial_amo->fetchArray()) {
        $res_json_1[$tmp]['remaining']=$row['remaining'];

        // 處理每一行的資料
        // $row 是包含欄位值的陣列或關聯陣列
        //print_r($row);
        $tmp++;
    }
    $initial_amo=$res_json_1[0]['remaining'];

    $changed_amo=$initial_amo-$change_amount;
    $db->query("UPDATE parts SET remaining=$changed_amo WHERE ID=$change_id");
}
?>
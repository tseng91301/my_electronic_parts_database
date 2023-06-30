<?php include "general_settings.php";
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $change_sec=$_POST['sec'];
    $change_id=$_POST['id'];
    $change_val=$_POST['val'];
    $change_id=intval($change_id);
    $change_sec=escapeshellcmd($change_sec);
    $change_val=escapeshellcmd($change_val);
    
    if($change_id==null||$change_sec==null){
        echo("[E2]");
        return;
    }
    if($change_sec!="name"&&$change_sec!="place"&&$change_sec!="des"){
        echo("[E2]");
        return;
    }
    if($change_sec=="name"||$change_sec=="place"){
        if($change_val==null){
            echo("[E0]");
            return;
        }
    }
    $db = new SQLite3($db_loc);
    if($change_sec=="name"){
        $initial_name=$db->query("SELECT * FROM parts WHERE name='$change_val'");
            //轉換查詢結果為Array
        $res_json_1=[];
        $tmp=0;
        while ($row = $initial_name->fetchArray()) {
            $res_json_1[$tmp]['name']=$row['name'];

            // 處理每一行的資料
            // $row 是包含欄位值的陣列或關聯陣列
            //print_r($row);
            $tmp++;
        }
        if(count($res_json_1)!=0){
            echo("[E1]");
            return;
        }

    }
    if($change_sec=="place"){
        $change_sec="location";
    }
    if($change_sec=="des"){
        $change_sec="other_description";
    }
    $db->query("UPDATE parts SET $change_sec='$change_val' WHERE ID=$change_id");
    echo("success");
    return;
}
?>
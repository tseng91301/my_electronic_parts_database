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
    if($change_sec!="name"&&$change_sec!="place"&&$change_sec!="des"&&$change_sec!="pic_li"){
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
    if($change_sec=="pic_li"){
        // 檢查文件是否成功上傳
        $old_img_name_1=$db->query("SELECT picture_link FROM parts WHERE ID=$change_id");
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
        $filename;
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] == UPLOAD_ERR_OK) {

            
            // 獲取上傳的文件信息
            $file = $_FILES["image"];
            
            // 獲取文件名和臨時文件路徑
            $filename = $file["name"];
            //echo($filename);
            $tmpFilePath = $file["tmp_name"];
            //echo($tmpFilePath);
            
            $extension = pathinfo($filename, PATHINFO_EXTENSION);
            // 移動文件到目標目錄

            
            $filename=generate_img_name().'.'.$extension;
            //echo($filename);
            $targetDir = $img_path."images/"; // 目標目錄的路徑
            $targetPath = $targetDir . $filename;
            move_uploaded_file($tmpFilePath, $targetPath);
            
            
            // 在這裡進行其他文件處理操作，如存儲到數據庫等
        } else {
            $filename="null";
            //echo("[E0]");
            //return;
        }
    }
    
    if($change_sec=="place"){
        $change_sec="location";
    }
    if($change_sec=="des"){
        $change_sec="other_description";
    }
    if($change_sec=="pic_li"){
        $change_sec="picture_link";
        $change_val="images/".$filename;
    }
    $db->query("UPDATE parts SET $change_sec='$change_val' WHERE ID=$change_id");
    echo("success");
    return;
}
?>
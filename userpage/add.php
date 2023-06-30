<?php include "general_settings.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 確保表單已提交

    // 檢查文件是否成功上傳
    $filename;
    if (isset($_FILES["image"]) && $_FILES["image"]["error"] == UPLOAD_ERR_OK) {
        // 獲取上傳的文件信息
        $file = $_FILES["image"];
        
        // 獲取文件名和臨時文件路徑
        $filename = $file["name"];
        //echo($filename);
        $tmpFilePath = $file["tmp_name"];
        //echo($tmpFilePath);
        
        // 移動文件到目標目錄
        $targetDir = $img_path."images/"; // 目標目錄的路徑
        $targetPath = $targetDir . $filename;
        move_uploaded_file($tmpFilePath, $targetPath);
        
        // 在這裡進行其他文件處理操作，如存儲到數據庫等
    } else {
        echo("[E0]");
        return;
    }
    $name=$_POST['name'];
    $name=escapeshellcmd($name);
    $num=$_POST['num'];
    $num=escapeshellcmd($num);
    $loc=$_POST['loc'];
    $loc=escapeshellcmd($loc);
    $des=$_POST['des'];
    $des=escapeshellcmd($des);
    //check
    if($name==null){
        echo("[E1]");
        return;
    }
    if($num==null){
        echo("E2");
        return;
    }
    if($loc==null){
        echo("E3");
        return;
    }

    //adding to database
    $db = new SQLite3($db_loc);

    // 執行查詢
    $searchresult;

    $query = "SELECT * FROM parts WHERE name='$name'";
    $searchresult = $db->query($query);

    //轉換查詢結果為Array
    $res_json_1=[];
    $tmp=0;
    while ($row = $searchresult->fetchArray()) {
        $res_json_1[$tmp]['ID']=$row['ID'];
        $res_json_1[$tmp]['name']=$row['name'];
        $res_json_1[$tmp]['remaining']=$row['remaining'];
        $res_json_1[$tmp]['location']=$row['location'];
        $res_json_1[$tmp]['other_description']=$row['other_description'];
        $res_json_1[$tmp]['picture_link']=$row['picture_link'];

        // 處理每一行的資料
        // $row 是包含欄位值的陣列或關聯陣列
        //print_r($row);
        $tmp++;
    }
    if(count($res_json_1)!=0){
        echo("[E4]");
        return;
    }

    //adding script
    $insert_link="images/$filename";
    $db->query("INSERT INTO parts (name,remaining,location,other_description,picture_link) VALUES ('$name',$num,'$loc','$des','$insert_link')");
    echo("success");
}
?>
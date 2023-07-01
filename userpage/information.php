<?php include "general_settings.php";?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>詳細資訊</title>
</head>
<body>
    <?php
    $eleid=$_GET['id'];

    //adding to database
    $db = new SQLite3($db_loc);

    // 執行查詢
    $searchresult;

    $query = "SELECT * FROM parts WHERE ID='$eleid'";
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
    ?>
    <h1>電子零件詳細資訊</h1>
    <h2>名稱： <?php echo(htmlentities($res_json_1[0]['name']))?> <input type="text" id="change_name_inp" placeholder="修改名稱"><button id="change_name_but">確認</button></h2>
    <h2>QRcode條碼(本網頁)：<img id="qrcode_spawn_loc"></img></h2>
    <h2>剩餘數量： <?php echo($res_json_1[0]['remaining'])?> </h2>
    <h2>存放位置： <?php echo(htmlentities($res_json_1[0]['location']))?> <input type="text" id="change_place_inp" placeholder="修改存放位置"><button id="change_place_but">確認</button></h2>
    <h2>其他說明： <?php echo(htmlentities($res_json_1[0]['other_description']))?> <textarea id="change_des_inp" placeholder="修改其他說明"></textarea><button id="change_des_but">確認</button></h2>
    <h2>電子零件圖片： <div id="ele_img_o">
        <button id="show_img_butt">顯示圖片</button>
    </div><?php
    $img_url="watchimg.php?img_name=".$res_json_1[0]['picture_link'];
    echo("<script>var img_place_url='$img_url';</script>");?></h2><input id="chg_part-pic" type="file"><button id="chg_part-pic_sub">更改圖片</button>
    <h2>使用此零件</h2>
    <input type="hidden" id="eleid" <?php
    
    echo("value=\"$eleid\"");?>>
    <h3>數量： <input type="number" id="use_num" value="1"><button id="use_but">使用</button></h3>
    <h2>添加此零件</h2>
    <h3>數量： <input type="number" id="add_num" value="1"><button id="add_but">添加</button></h3>
    <style>
        img{
            max-width: 400px;
        }
        a{
            text-decoration: none;
        }
        .general{
            color: blue;
        }
        .warming{
            color: red;
        }
    </style>
    <h2><a href="#" class="warming" id="remove_ele">刪除元件</a></h2>
    <script src="jquery.min.js"></script>
    <script src="jquery.qrcode.min.js"></script>
    <script src="information.js"></script>
    <script src="deleteele.js"></script>
    <script src="qrcodespawn.js"></script>
    
</body>
</html>

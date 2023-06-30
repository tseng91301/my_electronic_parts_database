$(document).ready(function(){
    //生成QRcode條碼
    var qrcodeData = location.href; // QR碼的內容
    spawnimgqr("qrcode_spawn_loc",qrcodeData);  

    //使用元件
    $("#use_but").click(function(){
        update_use($("#eleid").val(),$("#use_num").val())
    });
    //添加元件
    $("#add_but").click(function(){
        update_use($("#eleid").val(),($("#add_num").val())*(-1))
    });
    //顯示圖片
    $("#show_img_butt").click(function(){
        picid=$("#eleid").val();
        $("#ele_img_o").html("<img src='"+img_place_url+"' id='ele_img'>");
    })

    //變更元件名稱
    $("#change_name_but").click(function(){
        change_name();
    });
    $("#change_name_inp").focus(function(){
        $(document).keypress(function(event) {
            // 鍵盤按下事件
            if(event.keyCode==13){
                change_name();
            }
        });
    });
    //變更元件存放位置
    $("#change_place_but").click(function(){
        change_place();
    });
    $("#change_place_inp").focus(function(){
        $(document).keypress(function(event) {
            // 鍵盤按下事件
            if(event.keyCode==13){
                change_place();
            }
        });
    });

    //變更元件說明
    $("#change_des_but").click(function(){
        change_des();
    });
});
function change_name(){
    change_prop($("#eleid").val(),"name",$("#change_name_inp").val());
}
function change_place(){
    change_prop($("#eleid").val(),"place",$("#change_place_inp").val());
}
function change_des(){
    change_prop($("#eleid").val(),"des",$("#change_des_inp").val());
}
function update_use(id,amo){
    //console.log(id);
    //console.log(amo);
    $.ajax({
        url: 'use.php',
        type: 'POST',
        data: {
            "id":id,
            "amo":amo
        },
        beforeSend:()=>{
            
        },
        success: function(response) {
            alert("修改成功");
            location.reload();
            // 处理成功响应
        },
        error: function(xhr, status, error) {
            console.log(error);
            alert("系統錯誤");
            // 处理错误响应
        }
        
    });
}
function change_prop(id,sec,val){
    
    $.ajax({
        url: 'change_property.php',
        type: 'POST',
        data: {
            "id":id,
            "sec":sec,
            "val":val
        },
        beforeSend:()=>{
            console.log(id);
            console.log(sec);
            console.log(val);
        },
        success: function(response) {
            console.log(response);
            handleerror(response);
            
            // 处理成功响应
        },
        error: function(xhr, status, error) {
            console.log(error);
            alert("系統錯誤");
            // 处理错误响应
        }
        
    });
}
function handleerror(inp){
    if(inp=="[E0]"){
        alert("改動位置之值不能為空");
    }
    if(inp=="[E1]"){
        alert("已有同名稱之元件，請更改元件名稱");
    }
    if(inp=="[E2]"){
        alert("不要壞壞!!!!!!!!!!!!!!!");
    }
    if(inp=="success"){
        alert("修改成功!");
        location.reload();
    }

    return;
}
/*$(document).ready(function(){
    $("#search_but").click(function(){
        getsearchresult($("#search_inp").val())
        .then(function(res_text){
            console.log("test:"+res_text);
            var res_dec=JSON.parse(res_text);
            showresult(res_dec);
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
        
    })
});
function getsearchresult(searchword){
    res=$.ajax({
        url:"search_res.php",
        method:"POST",
        data:{
            "word":searchword
        },
        beforeSend:()=>{
            $("#search_but").html("搜尋中...");
        },
        success:()=>{
            console.log(searchword+" search success!");
        },
        error:()=>{
            console.log(searchword+" search error!");
            alert("系統出錯，請重試");
        },
        complete:function(){
            $("#search_but").html("搜索");
            var ret=res.responseText
            console.log(ret);
            return ret;
        }
    });
    
}*/
$(document).ready(function(){
    //search block
    $("#search_but").click(function(){
        getsearchresult($("#search_inp").val())
            .then(function(res_text) {
                var res_dec = JSON.parse(res_text);
                showresult(res_dec);
            })
            .catch(function(error) {
                console.error("Error:", error);
            });
    });
    $("#search_inp").focus(function(){
        $(document).keypress(function(event) {
            // 鍵盤按下事件
            //console.log('按下了鍵盤按鍵：' + event.keyCode);
            if(event.keyCode==13){
                getsearchresult($("#search_inp").val())
                    .then(function(res_text) {
                        var res_dec = JSON.parse(res_text);
                        showresult(res_dec);
                    })
                    .catch(function(error) {
                        console.error("Error:", error);
                    });
            }
        });
    });
    //add block
    $("#add_part-finish").click(function(){
        var name=$("#add_part-name").val();
        var num=$("#add_part-num").val();
        var loc=$("#add_part-loc").val();
        var des=$("#other_des").val();
        //var imageinput1=$("#add_part-pic");
        var imageinput1=document.getElementById("add_part-pic");
        var imageinput=imageinput1.files[0];
        var formData = new FormData();
        formData.append('name',name);
        formData.append('num',num);
        formData.append('loc',loc);
        formData.append('des',des);
        formData.append('image',imageinput);
        $.ajax({
            url: 'add.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend:()=>{
                $("#add_part-finish").html("添加中...");
            },
            success: function(response) {
                console.log(response);
                console.log('上传成功');
                $("#add_part-finish").html("添加元件至資料庫");
                handleerror(response);
                
                // 处理成功响应
            },
            error: function(xhr, status, error) {
              console.log('上传出错:', error);
              $("#add_part-finish").html("添加元件至資料庫");
              // 处理错误响应
            }
            
        });
    });
    $("#reset_add_form").click(function(){
        $("#add_part-name").val("");
        $("#add_part-num").val("");
        $("#add_part-loc").val("");
        $("#other_des").val("");
        document.getElementById("add_part-pic").value='';
    });

});

function handleerror(inp){
    if(inp=="[E0]"){
        alert("圖片上傳失敗");
    }
    if(inp=="[E1]"){
        alert("元件名稱不得為空");
    }
    if(inp=="[E2]"){
        alert("數量不得為空");
    }
    if(inp=="[E3]"){
        alert("存放位置不得為空");
    }
    if(inp=="[E4]"){
        alert("已有同名稱之元件，請更改元件名稱");
    }
    if(inp=="success"){
        alert("添加成功!");
        getsearchresult($("#search_inp").val())
            .then(function(res_text) {
                var res_dec = JSON.parse(res_text);
                showresult(res_dec);
            })
            .catch(function(error) {
                console.error("Error:", error);
            });
    }

    return;
}

function getsearchresult(searchword) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "search_res.php",
            method: "POST",
            data: {
                "word": searchword
            },
            beforeSend: function() {
                $("#search_but").html("搜尋中...");
            },
            success: function() {
                console.log(searchword + " search success!");
            },
            error: function() {
                console.log(searchword + " search error!");
                alert("系統出錯，請重試");
                reject("Search error");
            },
            complete: function(res) {
                $("#search_but").html("搜索");
                var ret = res.responseText;
                //console.log(ret);
                resolve(ret);
            }
        });
    });
}

function showresult(jsondata){
    var printhtml="";
    if(jsondata.length==0){
        $("#ele_list_i").html("沒有相符電子元/器件");
        return;
    }else{
        var jsondata_len=jsondata.length;
        //console.log(jsondata_len);
        for(a=0;a<jsondata_len;a++){
            if(a%3==0){
                if(a!=0){
                    printhtml+="</tr>";
                }
                printhtml+="<tr>";
            }
            printhtml+="<td>";
            printhtml+="<h3>"+(a+1)+"</h3>";
            printhtml+="<h3> 名稱： "+jsondata[a].name+"</h3>";
            printhtml+="<h3> QRcode條碼： <img id='qrcode_spawner-"+jsondata[a].ID+"'></img></h3>";
            printhtml+="<h3> 剩餘數量： "+jsondata[a].remaining+"</h3>";
            printhtml+="<h3> 存放位置： "+jsondata[a].location+"</h3>";
            printhtml+="<h3> 其他說明： ";
            if(jsondata[a].other_description==null){
                printhtml+="無";
            }else{
                printhtml+=jsondata[a].other_description;
            }
            printhtml+="</h3>";
            printhtml+="<a class='general' href=\"information.php?id="+jsondata[a].ID+"\"><h3>詳細資訊</h3></a>";
            printhtml+="<a class='warming' href=\"#\" onclick=\"deleteid("+jsondata[a].ID+")\"><h3>刪除元/器件</h3></a>";
            printhtml+="</td>";
            if(a==(jsondata_len-1)){
                printhtml+="</tr>";
            }
        }
        $("#ele_list_i").html(printhtml);

        //spawn qrcode
        for(a=0;a<jsondata_len;a++){
            var qrcodeData = "http://tbsapi.ddns.net:4765/information.php?id="+jsondata[a].ID; // QR碼的內容
            spawnimgqr("qrcode_spawner-"+jsondata[a].ID,qrcodeData);  
        }
    }
}

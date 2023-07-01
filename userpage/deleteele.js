function deleteid2(idin){
    if(confirm("確定要刪除元件嗎?")){
        $.ajax({
            url: "delete.php",
            method: "POST",
            data: {
                "id": idin
            },
            success: function() {
                alert("成功刪除");
                console.log("delete success!");
                return 1;
            },
            error: function() {
                console.log(searchword + " search error!");
                alert("系統出錯，請重試");
                reject("Search error");
            },
            complete: function(res) {
                
            }
        });
        
    }else{
        return 0;
    }
    
}
function deleteid2(idin){
    return new Promise(function(resolve, reject){
        if(confirm("確定要刪除元件嗎?")){
            $.ajax({
                url: "delete.php",
                method: "POST",
                data: {
                    "id": idin
                },
                success: function() {
                    alert("成功刪除");
                    console.log("delete success!");
                    resolve(0);
                },
                error: function() {
                    console.log(searchword + " search error!");
                    alert("系統出錯，請重試");
                    reject("Search error");
                },
            });
            
        }else{
            reject("authorization failed");
        }
    });
    
    
}
function deleteid(idin){
    deleteid2(idin)
        .then(function(){
            getsearchresult($("#search_inp").val())
            .then(function(res_text) {
                var res_dec = JSON.parse(res_text);
                showresult(res_dec);
            })
            .catch(function(error) {
                console.error("Error:", error);
            });
        })
        .catch(function(error){
            console.log("Error: "+error);
        });
}
$(document).ready(function(){
    $("#remove_ele").click(function(){
        delid=$("#eleid").val();
        deleteid2(delid)
            .then(function(){
                location.href="http://tbsapi.ddns.net:4765/";
            })
            .catch(function(error){
                console.log("Error: "+error);
            });
    })
})
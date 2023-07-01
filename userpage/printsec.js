var chk_data;
function getsearchresult(searchword) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "search_res.php",
            method: "POST",
            data: {
                "word": searchword
            },
            beforeSend: function() {
                
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
                var ret = res.responseText;
                resolve(ret);
            }
        });
    });
}
function showresult(jsondata,target){
    var printhtml="";
    if(jsondata.length==0){
        return;
    }else{
        var jsondata_len=jsondata.length;
        //console.log(jsondata_len);
        for(a=0;a<jsondata_len;a++){
            printhtml+="<h3 id='"+target+"-"+jsondata[a].ID+"' onclick='selchk("+jsondata[a].ID+")'>"+jsondata[a].name+"</h3>";
        }
        $("#"+target).html(printhtml);
    }
}
$(document).ready(function(){
    getsearchresult("all")
        .then(function(aa){
            chk_data=JSON.parse(aa);
            chk_data=initchk(chk_data)
            showresult(chk_data,"ele_sel");
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
});
$(document).ready(function(){
    $("#ele_sel-search_but").click(function(){
        search_ele();
    });
    $("#ele_sel-search_inp").focus(function(){
        $(document).keypress(function(event) {
            // 鍵盤按下事件
            //console.log('按下了鍵盤按鍵：' + event.keyCode);
            if(event.keyCode==13){
                search_ele();
            }
        });
    });

    $("#ele_all_select").click(function(){
        var aa=chk_data.length;
        for(b=0;b<aa;b++){
            selchk(chk_data[b]['ID'],1);
        }
    })

    $("#printsel").click(function(){
        $("#print_del").hide();
        print_selected_ele()
            .then(function(){
                print();
            })
    })
});
function search_ele(){
    getsearchresult($("#ele_sel-search_inp").val())
        .then(function(aa){
            aa1=JSON.parse(aa);
            showresult(aa1,"ele_sel-search_res");
            update_selected();
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
}
function initchk(data){
    var len=data.length;
    for(a=0;a<len;a++){
        data[a]['checked']=0;
    }
    return data;
}
function selchk(id,all=0){
    if(all){
        chk_data[findidloc(id)]['checked']=1;
    }else{
        if(findchk(id)){
            chk_data[findidloc(id)]['checked']=0;
        }else{
            chk_data[findidloc(id)]['checked']=1;
        }
    }
    update_selected();
    return;
}
function findidloc(id){
    var aa=chk_data.length;
    var tmp1=0;
    for(a=0;a<aa;a++){
        if(chk_data[a]['ID']==id){
            break;
        }
        tmp1++;
    }
    return tmp1;
}
function findchk(id){
    return(chk_data[findidloc(id)]['checked']);
}
function update_selected(){
    var aa=chk_data.length;
    var printhtml="";
    for(a=0;a<aa;a++){
        if(chk_data[a]['checked']){
            printhtml+="<h3 id='selected-"+chk_data[a].ID+"'>"+chk_data[a].name+"&emsp;<input type='number' value='1' placeholder='輸入列印數量' id='prnum-"+chk_data[a].ID+"'></h3><button onclick='selchk("+chk_data[a].ID+")'>取消選取</button><hr/> \r\n";
        }
        change_sel_color(chk_data[a].ID,chk_data[a]['checked'],"ele_sel-search_res");
        change_sel_color(chk_data[a].ID,chk_data[a]['checked'],"ele_sel");
    }
    $("#selected").html(printhtml);
    return;
}
function change_sel_color(id,checked,target){
    if(checked){
        $("#"+target+"-"+id).css({
            "color":"#3bf93b"
        });
    }else{
        $("#"+target+"-"+id).css({
            "color":"black"
        });
    }
}
function print_selected_ele(){
    return new Promise(function(resolve,reject){
        var htmloutp="";
        var aa=chk_data.length;

        //列印格式設定
        var print_num=0;
        var paper_num=0;
        var row_num=1;
        var qualify_check=$("#qualify_check").prop('checked');

        for(a=0;a<aa;a++){
            
            if(chk_data[a]['checked']){
                var same_qr_num=$("#prnum-"+chk_data[a].ID).val();
                chk_data[a].qrnum=same_qr_num;
                for(b=0;b<same_qr_num;b++){
                    if(print_num%10==0){
                        if(a!=0){
                            console.log($("#print_fin-tb").height());
                            if($("#print_fin-tb").height()+80*row_num+150-(1510*paper_num)>1510 && qualify_check){
                                console.log(123);
                                paper_num++;
                                htmloutp+="</tr><tr>";
                                for(c=0;c<10;c++){
                                    htmloutp+="<td style='width:2.5cm; height:4cm;'></td>";
                                }
                            }
                            row_num++;
                            htmloutp+="</tr>";
                            $("#print_fin-tb").html(htmloutp);
                        }
                        htmloutp+="<tr>";
                    }
                    print_num++;
                    htmloutp+="<td>";
                    htmloutp+="<img id='qr-"+chk_data[a].ID+"-"+b+"' /><br/>";
                    htmloutp+=chk_data[a]['name'];
                    htmloutp+="</td>";
                }
                
            }
            if(a==(aa-1)){
                htmloutp+="</tr>";
            }
        }

        var tmp1=0;
        $("#print_fin-tb").html(htmloutp);

        for(b=0;b<aa;b++){

            if (chk_data[b]['checked']) {
                var tmp2=chk_data[b]['qrnum'];
                for(c=0;c<tmp2;c++){
                    tmp1++;
                    (function(b,d) {
                        spawnimgqr_promise('qr-' + chk_data[b].ID+'-'+d, "http://tbsapi.ddns.net:4765/information.php?id=" + chk_data[b].ID)
                            .then(function() {
                            console.log("qr_generate-success");
                        });
                    })(b,c);
                }
                
            }
            
        }
        resolve(1);
    })
    
    
    
    
}

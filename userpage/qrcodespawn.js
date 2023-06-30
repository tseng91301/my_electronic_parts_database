function spawnimgqr(imgid,inf,widhi=80){
    var qrcodeData = inf; // QR碼的內容
    var $qrcodeImg = $("#"+imgid);

    // 生成QR碼圖像
    $qrcodeImg.qrcode({
    text: qrcodeData,
    width: widhi,
    height: widhi
    // 其他選項...
    });

    // 將QR碼圖像設置為<img>元素的src屬性
    var qrcodeSrc = $qrcodeImg
    .children("canvas") // 獲取生成的QR碼圖像
    .get(0)
    .toDataURL("image/png"); // 將圖像轉換為DataURL

    $qrcodeImg.attr("src", qrcodeSrc); // 將QR碼圖像設置為<img>元素的src屬性
}
const canvas = document.getElementById("canvas");
const canvasForToumei = document.getElementById("canvasForToumei");
const ctx = canvas.getContext("2d");
const canvassoto = document.getElementById("canvassoto");

var myscale = 4; //sliderが動いたら、ここの値を書き換える

//画像オブジェクトを生成
var img = document.getElementById("editimg");
img.src = "test.jpeg";

ctx.fillRect(0, 0, 360, 270);

draw();

function draw() {
    videoPosition = canvassoto.getBoundingClientRect();
    //canvasの大きさ
    canvas.width = videoPosition.width;
    canvas.height = videoPosition.height;
    //canvasForToumeiの大きさ
    canvasForToumei.width = videoPosition.width;
    canvasForToumei.height = videoPosition.height;
    //imgの大きさ
    img.width = videoPosition.width;
    img.height = videoPosition.height;
};

//
//ファイル読み込み関連
//
var file = document.getElementById('file');
var uploadImgSrc;

function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if (!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
            // Canvasの後ろに表示する
            uploadImgSrc = reader.result;
            imgDraw();
        }
        // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

//
//ファイル読み込み関連ここまで
//

// Canvasの後ろに画像を表示する
function imgDraw() {
    // canvas内の要素をクリアする
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvasの後ろに画像を表示
    img.src = uploadImgSrc;
}


//
//描画関連
//
//マウスを操作する
var mouse = { x: 0, y: 0, x1: 0, y1: 0, color: "black" };
var drawflug = false;

var mouseX1;
var mouseY1;

//ペンの太さのデフォルト値
ctx.lineWidth = 10;
//ペンのデフォルトの色は緑(透明にする部分を選択モード)
ctx.strokeStyle = "rgba(0, 255, 0, 1.0)";

//マウスの座標を取得する
canvas.addEventListener("mousemove", function(e) {
    //console.log('moving!');
    var rect = e.target.getBoundingClientRect();
    //ctx.lineWidth = document.getElementById("lineWidth").value;

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    //クリック状態なら描画をする
    if (drawflug === true) {
        //console.log('drawing!');
        ctx.beginPath();
        //console.log(mouseX, mouseY, mouseX1, mouseY1);
        ctx.moveTo(mouseX1, mouseY1);
        ctx.lineTo(mouseX, mouseY);
        ctx.lineCap = "round";
        ctx.stroke();
        mouseX1 = mouseX;
        mouseY1 = mouseY;

    }
});

//クリックしたら描画をOKの状態にする
canvas.addEventListener("mousedown", function(e) {
    drawflug = true;
    mouseX1 = mouseX;
    mouseY1 = mouseY;
    undoImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //console.log("clicked!");
});

//クリックを離したら、描画を終了する
canvas.addEventListener("mouseup", function(e) {
    drawflug = false;
});

//ペンの太さ変え
const smallpen = document.getElementById("smallpen");
const mediumpen = document.getElementById("mediumpen");
const largepen = document.getElementById("largepen");
smallpen.onclick = function() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0, 255, 0, 1.0)";
    ctx.globalCompositeOperation = 'source-over';
}
mediumpen.onclick = function() {
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(0, 255, 0, 1.0)";
    ctx.globalCompositeOperation = 'source-over';
}
largepen.onclick = function() {
        ctx.lineWidth = 30;
        ctx.strokeStyle = "rgba(0, 255, 0, 1.0)";
        ctx.globalCompositeOperation = 'source-over';
    }
    //消しゴムモード
const erace = document.getElementById("erace");
erace.onclick = function() {
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";
    ctx.globalCompositeOperation = 'destination-out';
}

//全消去
const deleteall = document.getElementById("deleteall");
deleteall.onclick = function() {
    if (!confirm('本当に消去しますか？')) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //通常ペンに戻す
    ctx.strokeStyle = "rgba(0, 255, 0, 1.0)";
    ctx.globalCompositeOperation = 'source-over';
}


//
//選択部分を透明にする部分
//
const toEditedPic = document.getElementById("toEditedPic");
const ctxForToumei = canvasForToumei.getContext("2d");
toEditedPic.onclick = function() {
    // canvasForToumeiに背景の画像を書き込む
    //ctxForToumei.drawImage(document.getElementById("editimg"), 0, 0, videoPosition.width, videoPosition.height);
    console.log("1!");

    //今のcanvas(線引いたやつ)を、canvasForToumeiに書き込むためのあれこれ
    //一旦、tempに今のcanvas(線引いたやつ)を格納
    var temp = canvas.toDataURL();
    //tempcanvasimgに書き込む
    var tempcanvasimg = document.getElementById("tempcanvasimg");
    tempcanvasimg.src = temp;
    //tempcanvasimg → canvasForToumei
    ctxForToumei.drawImage(document.getElementById("tempcanvasimg"), 0, 0, videoPosition.width, videoPosition.height);
    console.log("2!");


    var png = canvasForToumei.toDataURL();
    document.getElementById("testimg").src = png;
}
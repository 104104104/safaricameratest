const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvassoto = document.getElementById("canvassoto");

var myscale = 4; //sliderが動いたら、ここの値を書き換える

//画像オブジェクトを生成
var img = document.getElementById("editimg");
img.src = "test.jpeg";

ctx.fillRect(0, 0, 360, 270);

ctx.fillRect(0, 0, 360, 270);
//ここに具体的な描画内容を指定する
ctx.lineWidth = 20;
//新しいパスを開始する
ctx.beginPath();
//パスの開始座標を指定する
ctx.moveTo(100, 20);
//座標を指定してラインを引いていく
ctx.lineTo(150, 100);
ctx.lineTo(50, 100);
//パスを閉じる（最後の座標から開始座標に向けてラインを引く）
ctx.closePath();
//現在のパスを輪郭表示する
ctx.stroke();

requestAnimationFrame(draw);

function draw() {
    //videoPositionは毎フレーム更新
    videoPosition = canvassoto.getBoundingClientRect();
    //canvasの大きさ
    canvas.width = videoPosition.width;
    canvas.height = videoPosition.height;
    //imgの大きさ
    img.width = videoPosition.width;
    img.height = videoPosition.height;

    //手前の画像表示
    temae();

    requestAnimationFrame(draw);
};

//手前の画像関連
function temae() {
    //画像をcanvasに設定
    //元々の画像がスマホの写真なので、画像の縦横比が壊れる問題は、大丈夫か？
    //だって、合成先もスマホのカメラだからな…
    //ctx.drawImage(img, 0, 0, canvas.width / 4 * myscale, canvas.height / 4 * myscale); //400x300に縮小表示
};



//ファイル読み込み関連
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

//マウスの座標を取得する
canvas.addEventListener("mousemove", function(e) {
    console.log('moving!');
    var rect = e.target.getBoundingClientRect();
    //ctx.lineWidth = document.getElementById("lineWidth").value;
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#0000ff";
    //ctx.globalAlpha = document.getElementById("alpha").value / 100;
    //ctx.globalAlpha = 1;

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;


    //console.log(e);


    //クリック状態なら描画をする
    if (drawflug === true) {
        console.log('drawing!');
        ctx.beginPath();
        //console.log(mouseX, mouseY, mouseX1, mouseY1);
        ctx.moveTo(0, 0);
        ctx.lineTo(100, 100);
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
    console.log("clicked!");
});

//クリックを離したら、描画を終了する
canvas.addEventListener("mouseup", function(e) {
    drawflug = false;
});
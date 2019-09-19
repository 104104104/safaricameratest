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
        ctx.lineCap = "square";
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
var f = 1;
var f2 = 1;
const toEditedPic = document.getElementById("toEditedPic");
const ctxForToumei = canvasForToumei.getContext("2d");
toEditedPic.onclick = function() {
    // canvasForToumeiに背景の画像を書き込む
    ctxForToumei.drawImage(document.getElementById("editimg"), 0, 0, videoPosition.width, videoPosition.height);

    //今のcanvas(線引いたやつ)を、canvasForToumeiに書き込むためのあれこれ
    //一旦、tempに今のcanvas(線引いたやつ)を格納
    var temp = canvas.toDataURL();
    //tempcanvasimgに書き込む
    var tempcanvasimg = document.getElementById("tempcanvasimg");
    tempcanvasimg.src = temp;
    //tempcanvasimg → canvasForToumei

    //いか、データURIが読み込み終わってからする
    tempcanvasimg.onload = function() {
        if (f) {
            console.log("a");
            //線をcanvasForToumeiに書き込む
            ctxForToumei.drawImage(document.getElementById("tempcanvasimg"), 0, 0, videoPosition.width, videoPosition.height);
            console.log('aa');
            /*
            //処理が重すぎるので、画質を落とす
            //出来上がった線+背景画像を、またtempに書き込む
            temp = canvasForToumei.toDataURL();
            //tempcanvasimgに書き込む
            tempcanvasimg = document.getElementById("tempcanvasimg");
            tempcanvasimg.src = temp;
            //temocanvasimgをcanvasForToumeiに戻しながら、画質を落とす
            var neww = 400;
            var newratio = neww / temp.width;
            var newh = temp.height * newratio;
            ctxForToumei.drawImage(tempcanvasimg, 0, 0, neww, newh);
            */

            //ここから、緑部分を透明にする部分
            console.log('b');
            toToumeiData = ctxForToumei.getImageData(0, 0, videoPosition.width, videoPosition.height);
            //console.log(toToumeiData);

            //透過用のdataを作成
            console.log('start');
            for (var i = 0; i < toToumeiData.data.length; i += 4) {
                /*
                if (i % 500 == 0) {
                    console.log(toToumeiData.data[i], toToumeiData.data[i + 1], toToumeiData.data[i + 2], toToumeiData.data[i + 3]);
                }
                */
                //console.log('a');
                //console.log(toToumeiData[i], toToumeiData[i + 1], toToumeiData[i + 2], toToumeiData[i + 3]);
                //0,255,0,を見つけたら、アルファチャンネルを0にする
                /*
                toToumeiData.data[i] = 255;
                toToumeiData.data[i + 1] = 255;
                toToumeiData.data[i + 2] = 255;
                */
                //if ((0 <= toToumeiData.data[i] && toToumeiData.data[i] <= 20) && (245 <= toToumeiData.data[i + 1] && toToumeiData.data[i + 1] <= 255) && (0 <= toToumeiData.data[i + 2] && toToumeiData.data[i + 2] <= 20)) {
                //if ((toToumeiData.data[i] <= 20) && (230 <= toToumeiData.data[i + 1]) && (toToumeiData.data[i + 2] <= 20)) {
                //一番緑が大きな値かつめっちゃ緑が大きい か 緑そこそこ大きくて他の色が極端に小さい
                if (((220 <= toToumeiData.data[i + 1]) && (toToumeiData.data[i] < toToumeiData.data[i + 1]) && (toToumeiData.data[i + 2] < toToumeiData.data[i + 1])) ||
                    ((160 <= toToumeiData.data[i + 1]) && (toToumeiData.data[i] < 10) && (toToumeiData.data[i + 2] < 10))) {
                    toToumeiData.data[i + 3] = 0;
                    //console.log('GET!');
                }
            }
            console.log("finish");
            //加工したデータを戻す
            ctxForToumei.putImageData(toToumeiData, 0, 0);
            //console.log(ctxForToumei.getImageData(0, 0, videoPosition.width, videoPosition.height).data);

            var png = canvasForToumei.toDataURL();
            document.getElementById("testimg").src = png;

            //生成した画像を、写真撮影モードに渡す
            window.open('localhost:1313/?' + png, '_blank'); // 新しいタブを開き、ページを表示
            //var toTakePhoto = document.getElementById('toTakePhoto');
            //toTakePhoto.href = 'localhost:1313/?' + png;

            f = 0;
        }
    }

}
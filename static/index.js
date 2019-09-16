//本番用(リアカメラ)
/*
const medias = {
    audio: false,
    video: {
        facingMode: {
            exact: "environment"
        }
    }
};
*/
//PCのテスト用(フロントカメラ)
const medias = {
    audio: false,
    video: true
};
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const promise = navigator.mediaDevices.getUserMedia(medias);
var videoPosition = video.getBoundingClientRect();

//画像オブジェクトを生成
var img = new Image();
img.src = "test.jpeg";

promise.then(successCallback)
    .catch(errorCallback);

function successCallback(stream) {
    video.srcObject = stream;
    requestAnimationFrame(draw);
};

function errorCallback(err) {
    alert(err);
};

function draw() {
    //videoPositionは毎フレーム更新
    videoPosition = video.getBoundingClientRect();
    canvas.width = videoPosition.width;
    canvas.height = videoPosition.height;
    //ctx.drawImage(video, 0, 0);

    //手前の画像表示
    temae();

    //ボタンの描画
    button();

    requestAnimationFrame(draw);
};

//手前の画像関連
function temae() {
    //画像をcanvasに設定
    ctx.drawImage(img, 0, 0, videoPosition.width / 4, videoPosition.height / 4); //400x300に縮小表示
};


//ボタン描画
function button() {
    //黒の背景
    //videoのいちに合わせて表示する
    //document.getElementById('mybutton').style.top = videoPosition.bottom - 70 + "px";
    document.getElementById('mybutton').style.top = "90%";
    document.getElementById('mybutton').style.left = 0;
    document.getElementById('mybutton').style.width = "100%";
    document.getElementById('mybutton').style.height = "70px";
};


//ボタンが押された時に、canvas→画像する部分
var aImg = document.getElementById('aImg');
aImg.addEventListener('click', function() {
    console.log('click');
    ctx.drawImage(video, 0, 0, videoPosition.width, videoPosition.height); // canvasに関数実行時の動画のフレームを描画
    temae();
    var png = canvas.toDataURL();
    aImg.href = png;
    aImg.download = 'cancas.png'
    aImg.click();
});
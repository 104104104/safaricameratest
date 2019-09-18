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

var myscale = 1; //sliderが動いたら、ここの値を書き換える

//画像オブジェクトを生成
var img = new Image();
img.src = "test.png";

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
    //元々の画像がスマホの写真なので、画像の縦横比が壊れる問題は、大丈夫か？
    //だって、合成先もスマホのカメラだからな…
    ctx.drawImage(img, 0 + diff.x, 0 + diff.y, videoPosition.width / 4 * myscale, videoPosition.height / 4 * myscale); //400x300に縮小表示
};

const slider = document.getElementById('zoom-slider');
slider.value = 1;
// 倍率の最小・最大値
slider.min = 0.01;
slider.max = 4;
// 粒度
slider.step = 'any';

// スライダーが動いたら拡大・縮小して再描画する
slider.addEventListener('input', e => {
    //console.log(myscale);
    // 一旦クリア 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 倍率変更
    myscale = e.target.value;
});


//ドラッグで移動するためのあれこれ
// ドラッグ状態かどうか
let isDragging = false;
// ドラッグ開始位置
let start = {
    x: 0,
    y: 0
};
// ドラッグ中の位置
let diff = {
    x: 0,
    y: 0
};
// ドラッグ終了後の位置
let end = {
    x: 0,
    y: 0
}
canvas.addEventListener('mousedown', event => {
    isDragging = true;
    start.x = event.clientX;
    start.y = event.clientY;
});
canvas.addEventListener('mousemove', event => {
    console.log(event);
    if (isDragging) {
        diff.x = (event.clientX - start.x) + end.x;
        diff.y = (event.clientY - start.y) + end.y;
    }
});
canvas.addEventListener('mouseup', event => {
    isDragging = false;
    end.x = diff.x;
    end.y = diff.y;
});


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
    //console.log('click');
    ctx.drawImage(video, 0, 0, videoPosition.width, videoPosition.height); // canvasに関数実行時の動画のフレームを描画
    temae();
    var png = canvas.toDataURL();
    aImg.href = png;
    aImg.download = 'cancas.png'
    aImg.click();
});
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(video, 0, 0);

    //ボタンの描画
    //button();


    /*
    ctx.rect(0, canvas.height - canvas.height / 9, canvas.width, canvas.height / 9);
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fill();
    */

    //button(400, 400, 50, 50);

    requestAnimationFrame(draw);
};

/*
//ボタン描画
function button() {
    //黒の背景
    document.getElementById('mybutton').style.top = "90%";
    document.getElementById('mybutton').style.left = 0;
    document.getElementById('mybutton').style.width = "100%";
    document.getElementById('mybutton').style.height = "10%";
};

//ボタンが押された時に、canvas→画像する部分
var aImg = document.getElementById('aImg');
aImg.addEventListener('click', function() {
    console.log('click');
    var png = canvas.toDataURL();
    aImg.href = png;
    aImg.download = 'cancas.png'
    aImg.click();
});
*/
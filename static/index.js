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
const promise = navigator.mediaDevices.getUserMedia(medias);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

promise.then(successCallback)
    .then(errorCallback);

function successCallback(stream) {
    video.srcObject = stream;
    requestAnimationFrame(draw);
};

function errorCallback(err) {
    //alert(err);
};

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(video, 0, 0);

    //ボタンの描画
    button();


    /*
    ctx.rect(0, canvas.height - canvas.height / 9, canvas.width, canvas.height / 9);
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fill();
    */

    //button(400, 400, 50, 50);

    requestAnimationFrame(draw);
};

//ボタン描画
function button() {
    document.getElementById('mybutton').style.top = "90%";
    document.getElementById('mybutton').style.left = 0;
    document.getElementById('mybutton').style.width = "100%";
    document.getElementById('mybutton').style.height = "10%";
};
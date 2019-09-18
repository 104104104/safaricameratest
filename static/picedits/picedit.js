const canvas = document.getElementById("piceditcanvas");
const ctx = canvas.getContext("2d");

//画像オブジェクトを生成
var img = new Image();
img.src = "test.png";

draw();

function draw() {
    ctx.drawImage(img, 0, 0, canvas.width / 4, canvas.height / 4);
    console.log("aaa");

    window.requestAnimationFrame(draw);
};
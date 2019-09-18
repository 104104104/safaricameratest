const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvassoto = document.getElementById("canvassoto");

var myscale = 4; //sliderが動いたら、ここの値を書き換える

//画像オブジェクトを生成
var img = document.getElementById("editimg");
img.src = "test.jpeg";

requestAnimationFrame(draw);

function draw() {
    //videoPositionは毎フレーム更新
    videoPosition = canvassoto.getBoundingClientRect();
    canvas.width = videoPosition.width;
    canvas.height = videoPosition.height;
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
    ctx.drawImage(img, 0, 0, canvas.width / 4 * myscale, canvas.height / 4 * myscale); //400x300に縮小表示
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
            // Canvas上に表示する
            uploadImgSrc = reader.result;
            canvasDraw();
        }
        // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw() {
    // canvas内の要素をクリアする
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas上に画像を表示
    img.src = uploadImgSrc;
}
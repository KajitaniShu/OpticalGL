
//********************************************************//
// InputManagerクラス                                      //
// → デバイスからの入力を受け取り各種コマンドを渡す               //
//********************************************************//
class InputManager{
    constructor(character, camera, fcamera, canvas){
        // コントロールする対象
        this.character      = character;                                                // キャラクター
        this.camera         = camera;                                                   // 三人称視点用カメラ
        this.fCamera        = fcamera;                                                  // 一人称視点用カメラ

        // 外部ライブラリによる画面コントロール
        this.canvas         = canvas;
        this.controls       = new THREE.OrbitControls(this.camera, this.canvas);        // 三人称視点のカメラコントロール
        this.controls.maxDistance = 200;                                                // 三人称視点で遠ざかれる最大距離
        this.controls.minDistance = 40;                                                 // 三人称視点で近づける最小距離
        this.controls.enableDamping = true;                                             // カメラが滑らかに動くようにする
        this.pControls      = new THREE.PointerLockControls(this.fCamera, this.canvas); // 一人称視点のカメラコントロール

        // スマホ操作計算用
        this.startX         = null;
        this.startX         = null;

        // 受け付けるキー入力リストと変換するコマンド
        this.key = {
            // w a s d で移動
            'w':            'forward',
            's':            'back',
            'a':            'left',
            'd':            'right',
            
            // ↑ ↓ ← → で移動
            'ArrowUp':      'forward',
            'ArrowDown':    'back',
            'ArrowLeft' : 'left',
            'ArrowRight': 'right',

            // 指 で移動
            'touchUp'    : 'forward',
            'touchDown'  : 'back',
            'touchLeft'  : 'left',
            'touchRight' : 'right',

            // スペースで視点切り替え
            ' ':            'view',
        };

        // キーボード
        // キーから手を離したとき
        document.addEventListener('keyup', (event) => {
            // キーから手を離したら各移動フラグをfalseにする
            if(this.key[event.key]) this.character.command('reset');
            event.preventDefault();
        }, {passive:false});
        // キーを押したとき
        document.addEventListener('keydown', (event) => {
            if(this.key[event.key]) this.character.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});


        // スマートフォン・タブレット
        // 画面にタッチしたとき
        document.addEventListener('touchstart', (event)=>{
            // 画面に最初にタッチした位置を記録(指がどちらにスライドされたか知るため)
            this.recordStartPoint(event.touches[0].clientX, event.touches[0].clientY);
            event.preventDefault();
        }, {passive:false});
        // 指を移動させたとき
        document.addEventListener('touchmove', (event)=>{
            // 画面に最初にタッチした位置との差分を計算
            this.touchMove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            event.preventDefault();
        }, {passive:false});
        // 指を離したとき
        document.addEventListener('touchend', (event)=>{
            this.startX = null;
            this.startY = null;
            event.preventDefault();
        }, {passive:false});
        

        // マウス
        // マウスクリック
        document.addEventListener('mousedown', (event) => {
            if(this.key[event.key]) this.character.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});
        // マウスを移動させたとき
        document.addEventListener('mousemove', (event) => {
            if(this.key[event.key]) this.character.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});
        // マウスのクリックを離したとき
        document.addEventListener('mouseup', (event) => {
            if(this.key[event.key]) this.character.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});
    }
    // 更新を必要とするもの(OrbitControls等)の更新
    update(delta, x, y){
        this.controls.update(delta);
        this.controls.target.set(x, 5, y);                                              // 三人称視点の中心を更新
    }

    // スマホの指移動処理
    // 最初にタッチした位置を記録
    recordStartPoint(x, y){
        this.startX = x;
        this.startY = y;
    }
    // 指をスライドしたときの計算
    touchMove(x, y){
        var diffX = this.startX - x;
        var diffY = this.startY - y;

        if(Math.abs(diffX) > 0 || Math.abs(diffY) > 0){
            // x, y座標方向の移動のどちらを採用するか
            if(Math.abs(diffX) > Math.abs(diffY)){
                if(diffX > 0) {
                    this.character.command("left");
                }else{ 
                    this.character.command("right");
                }
            }
            else{
                if(diffY > 0) { 
                    this.character.command("forward");
                }else{
                    this.character.command("back");
                }
            }
        }
    }

}
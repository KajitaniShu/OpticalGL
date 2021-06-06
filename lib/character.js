
//********************************************************//
// Characterクラス                                         //
// → 自分自身の位置・角度等を保持                              //
//********************************************************//
class Character{
    constructor(scene, type){
        // シーン(キャラクターモデル追加用)
        this.scene          = scene;
        // プレイヤーモデル
        this.type           = type;                                                         // プレイヤー画像の種類
        this.playerImage    =  new THREE.MeshBasicMaterial({                                // プレイヤー画像をテクスチャにする
            map: new THREE.TextureLoader().load('./lib/img/player' + this.type + '.png'),
            color:0xffffff,
            transparent:true,
        });
        this.playerImage.map.repeat.x = 0.33;                                               // 画像の折り返し設定 (x)   
        this.playerImage.map.repeat.y = 0.25;                                               // 画像の折り返し設定 (y)
        this.geometry       = new THREE.PlaneGeometry(5, 5, 5);                             // 画像を張り付ける板ポリ
        this.sprite         = new THREE.Mesh(this.geometry, this.playerImage);              // プレイヤーモデル
        this.scene.add(this.sprite);                                                        // シーンに追加
        // キャラクターの位置座標
        this.x              = 0;
        this.y              = 0;
        this.z              = 2.5;
        this.angle          = 0;
        
        // プレイヤーのアニメーション
        this.imageType      = 0.0;                                                          // 画像の切取り(縦)
        this.step           = 1;                                                            // 足踏みアニメーション切り替え用
        this.offset         = 0.02;                                                         // 画像の切取り(横)
        this.playerImage.map.offset.set(this.offset, this.imageType);                       // 画像の切取り部分を指定

        // 初期位置指定
        this.changeAngle(this.angle);
        this.sprite.position.set(this.x, this.z, this.y);

        // 各種フラグ
        this.moveForward    = false;                                                        // 前移動フラグ
        this.moveBack       = false;                                                        // 後移動フラグ
        this.moveLeft       = false;                                                        // 左移動フラグ
        this.moveRight      = false;                                                        // 右移動フラグ
    }

    // 入力処理から送られてきたコマンドを処理する
    command(command){
        switch(command){
            case "forward":
                this.moveForward = true;
                break;
            case "back":
                this.moveBack    = true;
                break;
            case "left":
                this.moveLeft    = true;
                break;
            case "right":
                this.moveRight   = true;
                break;
            case "reset":
                this.moveForward = false;
                this.moveBack    = false;
                this.moveLeft    = false;
                this.moveRight   = false;
                break;
        }
    }

    changeAngle(rot){
        this.angle = rot;
        this.sprite.rotation.set(0, this.angle, 0);
        this.playerImage.map.offset.set(this.offset, this.imageType);
    }

    // 移動しているかどうか(これがtrueの時に足踏みアニメーションをかける)
    isMove(){
        if(this.moveForward || this.moveBack || this.moveLeft || this.moveRight) return true;
        else return false;
    } 

    // 位置座標変更
    updatePosition(x, y){
        this.x = x;
        this.y = y;
        this.sprite.position.set(this.x, this.z, this.y);                                   // キャラクターの位置を変更
    }

    // 足踏みアニメーション
    nextStep(){
        if(this.isMove()) {
            this.step = ( this.step + 1 ) % 4;
            // 画像の切取る場所を変更する
            switch(this.step){
                case 1:
                    this.offset = 0.02;
                    break;
                case 2:
                    this.offset = 0.35;
                    break;
                case 3:
                    this.offset = 0.69;
                    break;
                case 0:
                    this.offset = 0.35;
                    break;
            }
            this.playerImage.map.offset.set(this.offset, this.imageType);                   // 切取り位置を更新
        }
    }

    // 移動
    move(){
        if     (this.moveForward) this.forward(1);
        else if(this.moveBack)     this.forward(-1);
        else if(this.moveRight)    this.right(1);
        else if(this.moveLeft)     this.right(-1);
    }

    // 前後移動
    forward(distance){
        this.x -= distance*Math.sin(this.angle);
        this.y -= distance*Math.cos(this.angle);
        this.updatePosition(this.x, this.y);
    }

    // 左右移動
    right(distance){
        this.x += distance*Math.cos(this.angle);
        this.y -= distance*Math.sin(this.angle);
        this.updatePosition(this.x, this.y);
    }
};
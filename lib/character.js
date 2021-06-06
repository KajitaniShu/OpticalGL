
//********************************************************//
// Characterクラス                                         //
// → 自分自身の位置・角度等を保持                              //
//********************************************************//
class Character{
    constructor(scene, type){
        // システム
        this.scene          = scene;
        // プレイヤーモデル
        this.type           = type;                                                         // プレイヤー画像の種類
        this.playerImage    =  new THREE.MeshBasicMaterial({                                // プレイヤー画像
            map: new THREE.TextureLoader().load('./lib/img/player' + this.type + '.png'),
            color:0xffffff,
            transparent:true,
        });
        this.playerImage.map.repeat.x = 0.33;                                               // 画像の折り返し設定 (x)   
        this.playerImage.map.repeat.y = 0.25;                                               // 画像の折り返し設定 (y)
        this.geometry       = new THREE.PlaneGeometry(5, 5, 5);                             // 画像を張り付ける板ポリ
        this.sprite         = new THREE.Mesh(this.geometry, this.playerImage);              // プレイヤーモデル
        // キャラクターの位置座標
        this.x              = 0;
        this.y              = 0;
        this.z              = 2.5;
        
        this.angle          = 270;
        this.imageType      = 0.0;
        // プレイヤーのアニメーション
        this.step           = 1;                                                            // 足踏みアニメーション切り替え用
        this.offset         = 0.02;                                                         // 使う画像を指定(前向きや横向き等)
        this.playerImage.map.offset.set(this.offset, this.imageType);
        this.changeAngle(this.angle);
        this.sprite.position.set(this.x, this.z, this.y);

        // 各種フラグ
        this.moveForward    = false;                                                    // 前移動フラグ
        this.moveBack       = false;                                                    // 後移動フラグ
        this.moveLeft       = false;                                                    // 左移動フラグ
        this.moveRight      = false;                                                    // 右移動フラグ
    }

    // 入力処理から送られてきたコマンドを処理する
    command(command){
        console.log(command);
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

        this.sprite.position.set(this.x, this.z, this.y);
    }

    // 足踏みアニメーション
    nextStep(){
        if(this.isMove()) {
            this.step = ( this.step + 1 ) % 4;
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
            this.playerImage.map.offset.set(this.offset, this.imageType);
        }
    }

    // 移動
    move(){
        if      (this.moveForward){
            this.forward(1);
        }else if(this.moveBack){
            this.forward(-1);
        }else if(this.moveRight){
            this.right(1);
        }else if(this.moveLeft){
            this.right(-1);
        }
    }

    // 前後移動
    forward(distance){
        this.x = this.x - distance*Math.sin(this.angle);
        this.y = this.y - distance*Math.cos(this.angle);

        this.updatePosition(this.x, this.y);
    }

    // 左右移動
    right(distance){
        this.x = this.x + distance*Math.cos(this.angle);
        this.y = this.y - distance*Math.sin(this.angle);
        this.updatePosition(this.x, this.y);
    }
};
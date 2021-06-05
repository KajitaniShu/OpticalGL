
//********************************************************//
// Characterクラス                                         //
// → 自分自身の位置・角度等を保持                              //
//********************************************************//
class Character{
    constructor(x, y, z){
        this.orbitCamera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 3000);
        this.fpsCamera   = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 300);

        // 基準(キャラクター位置)
        this.CharacterX  = x; 
        this.CharacterY  = y; 
        this.CharacterZ  = z; 

        // 各種フラグ
        this.isFirstView = false;           // 一人称視点 or 三人称視点 (trueは一人称)
        this.moveForward    = false;        // 前移動フラグ
        this.moveBack       = false;        // 後移動フラグ
        this.moveLeft       = false;        // 左移動フラグ
        this.moveRight      = false;        // 右移動フラグ
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
            case "view":
                this.firstView = !this.firstView;
                break;
        }
    }

    // 位置座標変更
    updatePosition(x, y){
        this.x = x;
        this.y = y;

        this.sprite.position.set(this.x, this.z, this.y);
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

    getCurrentCamera(){
        if(this.isFirstView) return this.fpsCamera;
        else                 return this.orbitCamera;
    }

    update(x, y, z){
        this.fpsCamera.position.x
    }
};

//********************************************************//
// Characterクラス                                         //
// → 自分自身の位置・角度等を保持                              //
//********************************************************//
class CameraManager{
    constructor(x, y, z, canvas){
        this.orbitCamera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 3000);
        this.fpsCamera   = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 300);

        // 外部ライブラリによる画面コントロール
        this.canvas         = canvas;
        this.controls       = new THREE.OrbitControls(this.orbitCamera, this.canvas);        // 三人称視点のカメラコントロール
        this.controls.maxDistance = 200;                                                // 三人称視点で遠ざかれる最大距離
        this.controls.minDistance = 40;                                                 // 三人称視点で近づける最小距離
        this.controls.enableDamping = true;                                             // カメラが滑らかに動くようにする
        this.pControls      = new THREE.PointerLockControls(this.fpsCamera, this.canvas); // 一人称視点のカメラコントロール

        // 基準(キャラクター位置)
        this.characterX    = x; 
        this.characterY    = y; 
        this.characterZ    = z; 
        this.caracterAngle = 0;

        // 各種フラグ
        this.isFirstView = false;           // 一人称視点 or 三人称視点 (trueは一人称)
        this.moveForward    = false;        // 前移動フラグ
        this.moveBack       = false;        // 後移動フラグ
        this.moveLeft       = false;        // 左移動フラグ
        this.moveRight      = false;        // 右移動フラグ
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
            case "view":
                this.firstView = !this.firstView;
                break;
        }
    }

    // 位置座標変更
    updatePosition(x, y){
        this.characterX = x;
        this.characterY = y;
        this.controls.target.set(x, 5, y);     // orbitカメラの中心を更新
    }

    // 移動
    move(delta, x, y){
        if      (this.moveForward){
            this.forward(1);
        }else if(this.moveBack){
            this.forward(-1);
        }else if(this.moveRight){
            this.right(1);
        }else if(this.moveLeft){
            this.right(-1);
        }
        
        this.controls.update(delta);
        this.updatePosition(x, y);
    }

    // 前後移動
    forward(distance){
        this.characterX = this.characterX - distance*Math.sin(this.caracterAngle);
        this.characterY = this.characterY - distance*Math.cos(this.caracterAngle);
        this.orbitCamera.position.x -= distance*Math.sin(this.caracterAngle);
        this.orbitCamera.position.z -= distance*Math.cos(this.caracterAngle);
        this.updatePosition(this.characterX, this.characterY);
    }

    // 左右移動
    right(distance){
        this.characterX = this.characterX + distance*Math.cos(this.caracterAngle);
        this.characterY = this.characterY - distance*Math.sin(this.caracterAngle);
        this.orbitCamera.position.x += distance*Math.cos(this.caracterAngle);
        this.orbitCamera.position.z -= distance*Math.sin(this.caracterAngle);
        this.updatePosition(this.characterX, this.characterY);
    }

    getCurrentCamera(){
        if(this.isFirstView) return this.fpsCamera;
        else                 return this.orbitCamera;
    }
};
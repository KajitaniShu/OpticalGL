
//********************************************************//
// CameraManagerクラス                                     //
// → カメラの位置・角度等を保持                               //
// → 一人称・三人称の二つのカメラを管理                        //
//********************************************************//
class CameraManager{
    constructor(x, y, z, canvas){
        this.orbitCamera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 3000);  // 三人称カメラ
        this.fpsCamera   = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 300);   // 一人称カメラ
        this.orbitCamera.position.set(x, z, y);

        // 外部ライブラリによる画面コントロール
        this.canvas                     = canvas;
        this.orbitControl               = new THREE.OrbitControls(this.orbitCamera, this.canvas);               // 三人称視点のカメラコントロール
        this.orbitControl.maxDistance   = 200;                                                                  // 三人称視点で遠ざかれる最大距離
        this.orbitControl.minDistance   = 40;                                                                   // 三人称視点で近づける最小距離
        this.orbitControl.enableDamping = true;                                                                 // カメラが滑らかに動くようにする
        this.fpsControl                 = new THREE.PointerLockControls(this.fpsCamera, this.canvas);           // 一人称視点のカメラコントロール

        // 基準(キャラクター位置・角度)
        this.characterX    = x; 
        this.characterY    = y; 
        this.characterZ    = z; 
        this.caracterAngle = 0;

        // 各種フラグ
        this.isFirstView    = false;        // 一人称視点 or 三人称視点 (trueは一人称)
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
                if(this.firstView) this.fpsControl.lock();      // カーソルを隠す
                else               this.fpsControl.unlock();    // カーソルを出す
                break;
        }
    }

    // 位置座標変更
    updatePosition(x, y){
        this.characterX = x;
        this.characterY = y;
        this.orbitControl.target.set(x, 5, y);                  // orbitカメラの中心を更新
        this.fpsCamera.position.set(x, 5, y);
    }

    // 移動
    move(delta, x, y){
        // 現在のキャラクターの位置座標を記録
        this.characterX = x;
        this.characterY = y;

        if     (this.moveForward) this.forward(1);
        else if(this.moveBack)    this.forward(-1);
        else if(this.moveRight)   this.right(1);
        else if(this.moveLeft)    this.right(-1);

        // カメラが切り替わったときに角度がそろうようにする( ← この実装だとなってない時があるので改善が必要)
        this.orbitCamera.rotation.set(0, this.getCurrentAngle(), 0);
        this.fpsCamera.rotation.set(0, this.getCurrentAngle(), 0);
        // OrbitControlsの更新
        this.orbitControl.update(delta);
    }

    // 前後移動
    forward(distance){
        this.orbitCamera.position.x -= distance*Math.sin(this.getCurrentAngle());
        this.orbitCamera.position.z -= distance*Math.cos(this.getCurrentAngle());
        this.updatePosition(this.characterX, this.characterY);
    }

    // 左右移動
    right(distance){
        this.orbitCamera.position.x += distance*Math.cos(this.getCurrentAngle());
        this.orbitCamera.position.z -= distance*Math.sin(this.getCurrentAngle());
        this.updatePosition(this.characterX, this.characterY);
    }

    // 現在使用中のカメラを渡す
    getCurrentCamera(){
        if(this.firstView)   return this.fpsCamera;
        else                 return this.orbitCamera;
    }

    // カメラの角度を渡す
    getCurrentAngle(){
        // fpsCameraの角度を計算
        var cameraangle = new THREE.Vector3();
        this.fpsCamera.getWorldDirection(cameraangle);
        var fpsAngle = Math.atan2(cameraangle.x,cameraangle.z) + Math.PI;
        // 現在使用中のカメラの角度を返す
        if(this.firstView) return fpsAngle;
        else               return this.orbitControl.getAzimuthalAngle();
    }
};
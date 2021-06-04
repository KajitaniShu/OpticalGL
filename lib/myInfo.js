
//********************************************************//
// myInfoクラス                                           //
// → 自分自身の位置・角度等を保持し、サーバーへ送信する  //
//********************************************************//
//********************************************************//
// MyInfoクラス                                           //
//********************************************************//
class MyInfo{
    constructor(world, scene, type, camera, fPersonCamera){
        this.world          = world;
        this.scene          = scene;
        this.type           = type;
        this.camera         = camera;
        this.fCamera        = fPersonCamera;
        this.playerImage    =  new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./lib/img/player' + this.type + '.png'),
            color:0xffffff,
            transparent:true,
        });
        this.playerImage.map.repeat.x = 0.33;
        this.playerImage.map.repeat.y = 0.25; 
        this.geometry       = new THREE.PlaneGeometry(5, 5, 5);
        this.sprite         = new THREE.Mesh(this.geometry, this.playerImage);
        this.step           = 1;
        this.offset         = 0.02;
        this.x              = 0;
        this.y              = 0;
        this.z              = 2.5;
        this.pos            = null;
        this.beforeX        = 0;
        this.beforeY        = 0;
        this.moveForward    = false;
        this.moveBack       = false;
        this.moveRight      = false;
        this.moveLeft       = false;
        this.startX         = null;
        this.startY         = null;
        this.angle          = 270;
        this.imageType      = 0.0;
        this.playerImage.map.offset.set(this.offset, this.imageType);
        this.changeAngle(this.angle);
        this.sprite.position.set(this.x, this.z, this.y);
        
        const camerahelper = new THREE.CameraHelper(this.fCamera);
        this.scene.add(this.sprite,/*camerahelper*/);

        
    }

    changeAngle(rot){
        this.angle = rot;
        console.log(this.angle);
        this.sprite.rotation.set(0, this.angle, 0);
        this.playerImage.map.offset.set(this.offset, this.imageType);
    }

    isMove(){
        if(this.moveForward || this.moveBack || this.moveLeft || this.moveRight) return true;
        else return false;
    } 

    updatePosition(x, y){
        this.beforeX = this.x;
        this.beforeY = this.y;
        
        this.x = x;
        this.y = y;

        this.sprite.position.set(this.x, this.z, this.y);
    }

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
        this.setCamera();
    }

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
                this.world.isFirstView = !this.world.isFirstView;
                if(this.world.isFirstView) this.world.pEnabled = true;
                break;
        }
    }

    forward(distance){
        this.x = this.x - distance*Math.sin(this.angle);
        this.y = this.y - distance*Math.cos(this.angle);
        if(!this.world.isFirstView){
            this.camera.position.x -= distance*Math.sin(this.angle);
            this.camera.position.z -= distance*Math.cos(this.angle);
        }
        this.updatePosition(this.x, this.y);
    }

    right(distance){
        this.x = this.x + distance*Math.cos(this.angle);
        this.y = this.y - distance*Math.sin(this.angle);
        this.updatePosition(this.x, this.y);
    }

    setCamera(){
        this.camera.lookAt(this.x, 5, this.y);
        this.fCamera.position.set(this.x, this.z, this.y);
        
    }

    recordStartPoint(x, y){
        this.startX = x;
        this.startY = y;
    }

    touchMove(x, y){
        var diffX = this.startX - x;
        var diffY = this.startY - y;

        if(Math.abs(diffX) > 0 || Math.abs(diffY) > 0){
            // x, y座標方向の移動のどちらを採用するか
            if(Math.abs(diffX) > Math.abs(diffY)){
                if(diffX > 0) {
                    this.command("left");
                }else{ 
                    this.command("right");
                }
            }
            else{
                if(diffY > 0) { 
                    this.command("forward");
                }else{
                    this.command("back");
                }
            }
        }
    }

    hideCharactor(){
        this.scene.remove(this.sprite);
    }
};
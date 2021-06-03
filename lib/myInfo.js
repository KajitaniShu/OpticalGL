
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
            side:THREE.DoubleSide
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
        this.scene.add(this.sprite, camerahelper);

        
    }

    changeAngle(angle){
        if(angle != this.angle){
            this.angle = angle;
            this.imageType = 0.75 - (this.angle / 90 ) * 0.25;
            this.playerImage.map.offset.set(this.offset, this.imageType);
        }
        
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
            this.changeAngle(0);
        }else if(this.moveBack){
            this.forward(-1);
            this.changeAngle(Math.PI);
        }else if(this.moveRight){
            this.right(1);
            this.changeAngle(Math.PI/2);
        }else if(this.moveLeft){
            this.right(-1);
            this.changeAngle(3*Math.PI/2);
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
                break;
        }
    }

    forward(distance){
        var newY = this.y - distance;
        this.updatePosition(this.x, newY);
    }

    right(distance){
        var newX = this.x + distance;
        this.updatePosition(newX, this.y);
    }

    setCamera(){
        this.camera.lookAt(this.x, 5, this.y);
        this.fCamera.position.set(this.x, this.z, this.y);
        console.log(this.angle);
        this.fCamera.lookAt(this.x + 2*Math.sin(this.angle), this.z ,this.y - 2*Math.cos(this.angle));

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
};
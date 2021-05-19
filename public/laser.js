
//********************************************************//
// Laserクラス                                             // 
// → レーザーを作成し、管理する                               // 
//********************************************************//
class Laser{
    constructor(socket, scene){
        this.socket  = socket;
        this.id      = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16);
        this.scene   = scene;
        this.image2D =  new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./public/img/lazer.png'),
            color:0xFFFFFF,
            transparent:true
        });
        this.geo2D  = new THREE.PlaneGeometry(5, 5, 5);
        this.sprite = new THREE.Mesh(this.geo2D, this.image2D);
        this.geo3D  = new THREE.BoxBufferGeometry(5, 5, 5);
        this.tex3D  = new THREE.MeshBasicMaterial({color:0xff6701});
        this.model  = new THREE.Mesh(this.geo3D, this.tex3D);
        this.x = 117;
        this.y = 140;
        this.z = -250;
        this.isActive = true;
        this.angle = 0;
        this.sprite.position.set(this.x, this.y, this.z);
        this.sprite.scale.set(3, 3, 3);
        this.sprite.rotation.z = 0;
        this.model.position.set(this.x, 2.5, 0)
        this.scene.add(this.sprite, this.model);
    }

    setRotation(angle){
        this.sprite.rotation.z = angle;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.sprite.position.set(this.x, this.y, this.z);
    }

    setStartPos(){
    }
}
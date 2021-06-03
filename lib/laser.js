
//********************************************************//
// Laserクラス                                             // 
// → レーザーを作成し、管理する                               // 
//********************************************************//
class Laser{
    constructor(scene, group){
        this.id      = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16);
        this.scene   = scene;
        this.group   = group;
        this.loader  = new Loader();
        this.laser   = new THREE.Group();
        this.model   = new THREE.Object3D();

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angle = 0;

        this.load();
        this.group.add(this.laser);
    }

    async load(){
        const geo3D = new THREE.BoxBufferGeometry(5, 5, 5);
        const tex3D = new THREE.MeshBasicMaterial({color:0xff6701});
        this.model  = new THREE.Mesh(geo3D, tex3D);
        this.model.position.set(this.x, 0, this.y);
        this.laser.add(this.model);
    }

    setRotation(angle){
        if(this.angle != angle){
            this.angle = angle;
            this.laser.rotation.set(0, this.angle, 0);
        }
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.laser.position.set(this.x, 0, this.y);
    }
}